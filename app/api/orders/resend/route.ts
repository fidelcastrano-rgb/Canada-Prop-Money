import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/email-service";

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, emailType } = await req.json();

    if (!orderNumber || !emailType) {
      return NextResponse.json({ error: "Missing required parameters." }, { status: 400 });
    }

    const db = getDB();

    // Query order joined with customer
    const order = db.prepare(`
      SELECT 
        o.id,
        o.order_number as orderNumber,
        o.subtotal,
        o.shipping,
        o.total,
        o.payment_method as paymentMethod,
        c.first_name || ' ' || c.last_name as customerName,
        c.email as recipientEmail,
        c.phone,
        c.address || ', ' || c.city || ' ' || c.state || ' ' || c.country || ' ' || c.postal_code as address
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.order_number = ?
    `).get(orderNumber) as any;

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Query items
    const items = db.prepare(`
      SELECT product_name as name, quantity as qty, price
      FROM order_items
      WHERE order_id = ?
    `).all(order.id) as any[];

    const emailPayload = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      recipientEmail: order.recipientEmail,
      customerName: order.customerName,
      total: order.total,
      paymentMethod: order.paymentMethod,
      address: order.address,
      date: new Date().toLocaleDateString("en-CA"),
      items: items.map((it: any) => ({ name: it.name, quantity: it.qty, price: it.price })),
      invoicePath: `/invoices/${order.orderNumber}.pdf`,
      phone: order.phone,
    };

    let result;
    if (emailType === "customer") {
      result = await sendCustomerConfirmation(emailPayload);
    } else {
      result = await sendAdminNotification(emailPayload);
    }

    if (result.success) {
      return NextResponse.json({ success: true, logId: result.logId });
    } else {
      return NextResponse.json({ error: "Failed to dispatch email via SMTP service." }, { status: 500 });
    }
  } catch (e: any) {
    console.error("Resend endpoint failed", e);
    return NextResponse.json({ error: "Failed executing re-send." }, { status: 500 });
  }
}
