import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { generateInvoicePDF } from "@/lib/invoice-generator";
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/email-service";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  try {
    const db = getDB();
    
    // Joint query to fetch all orders with customer details
    const orders = db.prepare(`
      SELECT 
        o.id,
        o.order_number,
        o.subtotal,
        o.shipping,
        o.discount,
        o.total,
        o.payment_method,
        o.status,
        o.created_at as date,
        c.first_name as firstName,
        c.last_name as lastName,
        c.email,
        c.phone,
        c.address,
        c.city,
        c.state,
        c.country,
        c.postal_code as postalCode
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.id DESC
    `).all() as any[];

    // Fetch items for each order
    for (const order of orders) {
      const items = db.prepare(`
        SELECT product_id as id, product_name as name, quantity as qty, price
        FROM order_items
        WHERE order_id = ?
      `).all(order.id);
      
      order.items = items;
    }

    return NextResponse.json(orders);
  } catch (e: any) {
    console.error("GET orders fail", e);
    return NextResponse.json({ error: e.message || "Generic orders database fetch route failure." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      country,
      state,
      notes,
      shippingMethod,
      shippingCost,
      paymentMethod,
      items,
      subtotal,
      total,
      city = "",
      postalCode = "",
    } = body;

    // Server-side validation
    if (!firstName || !lastName || !email || !phone || !address || !country || !state || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required checkout parameters. Please fill in all fields." }, { status: 400 });
    }

    const db = getDB();

    // 1. Transaction-safe insert order logic
    const createOrderTx = db.transaction(() => {
      // Create customer first
      const customerResult = db.prepare(`
        INSERT INTO customers (first_name, last_name, email, phone, country, state, city, address, postal_code, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).run(firstName, lastName, email, phone, country, state, city, address, postalCode);
      const customerId = Number(customerResult.lastInsertRowid);

      // Generate visual sequential 2026 order number
      const ordersCountObj = db.prepare(`SELECT count(*) as total FROM orders`).get() as { total: number };
      const sequentialNum = String(ordersCountObj.total + 1).padStart(6, "0");
      const orderNumber = `CPM-2026-${sequentialNum}`;

      // Insert order details
      const orderResult = db.prepare(`
        INSERT INTO orders (order_number, customer_id, subtotal, shipping, discount, total, payment_method, status, created_at)
        VALUES (?, ?, ?, ?, 0, ?, ?, ?, datetime('now'))
      `).run(orderNumber, customerId, subtotal, shippingCost, total, paymentMethod, "Pending");
      const orderId = Number(orderResult.lastInsertRowid);

      // Insert all individual cart items
      const insertItemStmt = db.prepare(`
        INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
        VALUES (?, ?, ?, ?, ?)
      `);
      for (const item of items) {
        insertItemStmt.run(orderId, item.id || item.name, item.name, item.qty, item.price);
      }

      // Initialize history state timeline
      db.prepare(`
        INSERT INTO order_status_history (order_id, status, created_at)
        VALUES (?, 'Pending', datetime('now'))
      `).run(orderId);

      return { orderId, customerId, orderNumber };
    });

    const { orderId, customerId, orderNumber } = createOrderTx();
    const formattedDate = new Date().toLocaleDateString("en-CA");

    // 2. Generate PDF Invoice dynamically
    let invoicePath = "";
    try {
      invoicePath = await generateInvoicePDF({
        orderNumber,
        date: formattedDate,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        country,
        postalCode,
        items: items.map((it: any) => ({
          name: it.name,
          quantity: it.qty,
          price: it.price,
        })),
        subtotal,
        shipping: shippingCost,
        total,
        paymentMethod,
      });
    } catch (err: any) {
      console.error("PDF Invoice Builder crash", err);
    }

    // 3. Fire automated transaction triggers
    const emailPayload = {
      orderId,
      orderNumber,
      recipientEmail: email,
      customerName: `${firstName} ${lastName}`,
      total,
      paymentMethod,
      address: `${address}, ${state}, ${country} ${postalCode}`,
      date: formattedDate,
      items: items.map((it: any) => ({ name: it.name, quantity: it.qty, price: it.price })),
      invoicePath,
      phone,
    };

    // Customer confirmation email
    const customerEmailResult = await sendCustomerConfirmation(emailPayload);

    // Admin notifier email
    const adminEmailResult = await sendAdminNotification(emailPayload);

    // Retrieve database model for client
    const savedOrder = {
      id: orderId,
      orderNumber,
      firstName,
      lastName,
      email,
      phone,
      address,
      country,
      state,
      paymentMethod,
      items,
      subtotal,
      total,
      status: "Pending",
      date: new Date().toISOString(),
      invoicePath,
      adminEmailLogs: `========================================
ADMIN EMAIL NOTIFICATION
Status: ${adminEmailResult.success ? "Success/Sent" : "Queued/Simulated"}
Log ID: ${adminEmailResult.logId}
========================================
Order Number: ${orderNumber}
Customer: ${firstName} ${lastName} (${email} / ${phone})
Subtotal: $${subtotal.toFixed(2)} CAD
Grand Total: $${total.toFixed(2)} CAD`,
      customerEmailLogs: `========================================
CUSTOMER CONFIRMATION EMAIL
Status: ${customerEmailResult.success ? "Success/Sent" : "Queued/Simulated"}
Log ID: ${customerEmailResult.logId}
========================================
Recipient: ${email}
Tracking: /track-order?orderNumber=${orderNumber}&email=${encodeURIComponent(email)}`,
    };

    return NextResponse.json({
      success: true,
      orderNumber,
      order: savedOrder,
    });
  } catch (e: any) {
    console.error("Checkout route fail", e);
    return NextResponse.json({ error: e.message || "Generic server-side checkout fault." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { orderNumber, status } = await req.json();
    if (!orderNumber || !status) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const db = getDB();

    // Find the order
    const order = db.prepare("SELECT * FROM orders WHERE order_number = ?").get(orderNumber) as any;
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update order status
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, order.id);

    // Log status history transition
    db.prepare(`
      INSERT INTO order_status_history (order_id, status, created_at)
      VALUES (?, ?, datetime('now'))
    `).run(order.id, status);

    // Fetch customer details to automatically email customer regarding status update
    const customer = db.prepare("SELECT * FROM customers WHERE id = ?").get(order.customer_id) as any;
    const items = db.prepare(`
      SELECT product_name as name, quantity as qty, price
      FROM order_items
      WHERE order_id = ?
    `).all(order.id) as any[];

    // Trigger automated status email notification
    let emailStatus = "pending";
    const resendApiKey = process.env.RESEND_API_KEY;
    const trackingLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://canadianpropmoney.org"}/track-order?orderNumber=${orderNumber}&email=${encodeURIComponent(customer.email)}`;

    const statusHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: sans-serif; background-color: #070a0f; color: #f1f5f9; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0d131f; padding: 40px; border-radius: 8px; border: 1px solid #1e293b;">
            <h2 style="color: #d91e18;">Your Order Status is updated to: ${status}</h2>
            <p>Hi ${customer.first_name},</p>
            <p>This is an automated shipping dispatch alert. Your order <strong>${orderNumber}</strong> has transitioned to <strong>${status}</strong>.</p>
            <p>Click below to track your packages or review current logistics timelines.</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${trackingLink}" style="background-color: #d91e18; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase;">Track status</a>
            </p>
            <hr style="border: none; border-top: 1px solid #1e293b; margin: 30px 0;">
            <p style="color: #64748b; font-size: 11px;">Canadian Prop Money Logistics Desks. Protected transaction cert.</p>
          </div>
        </body>
      </html>
    `;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Canadian Prop Money <onboarding@resend.dev>",
          to: customer.email,
          subject: `Order Update: ${status} #${orderNumber}`,
          html: statusHtml,
        });
        emailStatus = "sent";
      } catch (err) {
        console.error("Failed sending status transition email update", err);
        emailStatus = "failed";
      }
    } else {
      emailStatus = "logged_virtual";
    }

    // Log the automatic status update email
    db.prepare(`
      INSERT INTO email_logs (order_id, email_type, recipient, status, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).run(order.id, `status_updated_to_${status.toLowerCase()}`, customer.email, emailStatus);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("PUT order status fail", e);
    return NextResponse.json({ error: "Generic server mutation fault." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { orderNumber } = await req.json();
    if (!orderNumber) {
      return NextResponse.json({ error: "Missing orderNumber parameter" }, { status: 400 });
    }

    const db = getDB();
    const result = db.prepare("DELETE FROM orders WHERE order_number = ?").run(orderNumber);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("DELETE order failed", e);
    return NextResponse.json({ error: "Database deletion timeout." }, { status: 500 });
  }
}

