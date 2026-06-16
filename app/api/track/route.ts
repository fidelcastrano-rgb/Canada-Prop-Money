import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber");
    const email = searchParams.get("email");

    if (!orderNumber || !email) {
      return NextResponse.json({ error: "Missing required lookup parameter elements." }, { status: 400 });
    }

    const db = getDB();

    // Query order joined with customer
    const order = await db.prepare(`
      SELECT 
        o.id,
        o.order_number as orderNumber,
        o.subtotal,
        o.shipping,
        o.total,
        o.payment_method as paymentMethod,
        o.status,
        o.created_at as date,
        c.first_name as firstName,
        c.last_name as lastName,
        c.email,
        c.phone,
        c.address,
        c.state,
        c.country
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE LOWER(o.order_number) = ? AND LOWER(c.email) = ?
    `).bind(orderNumber.trim().toLowerCase(), email.trim().toLowerCase()).first() as any;

    if (!order) {
      return NextResponse.json({ error: "No matching registered cinematic order was matched." }, { status: 404 });
    }

    // Retrieve corresponding track items
    const { results: items } = await db.prepare(`
      SELECT product_name as name, quantity as qty, price
      FROM order_items
      WHERE order_id = ?
    `).bind(order.id).all();

    // Retrieve order status history timeline
    const { results: timeline } = await db.prepare(`
      SELECT status, created_at as date
      FROM order_status_history
      WHERE order_id = ?
      ORDER BY id DESC
    `).bind(order.id).all();

    return NextResponse.json({
      success: true,
      order,
      items,
      timeline,
    });
  } catch (e: any) {
    console.error("Tracking lookup route failed", e);
    return NextResponse.json({ error: "Server lookup timeline timeout." }, { status: 500 });
  }
}
