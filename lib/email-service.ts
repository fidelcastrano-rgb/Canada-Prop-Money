import { Resend } from "resend";
import { getDB } from "./db";

let resendInstance: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ [Resend Email API] RESEND_API_KEY is not defined. Emails will be logged in sqlite DB instead of sent physically.");
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export interface EmailPayload {
  orderId: number;
  orderNumber: string;
  recipientEmail: string;
  customerName: string;
  total: number;
  paymentMethod: string;
  address: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  invoicePath?: string;
  invoiceBase64?: string;
  phone?: string;
}

export async function sendCustomerConfirmation(payload: EmailPayload): Promise<{ success: boolean; logId: number }> {
  const db = getDB();
  const subject = `Order Confirmation #${payload.orderNumber}`;
  const trackingLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://canadianpropmoney.org"}/track-order?orderNumber=${payload.orderNumber}&email=${encodeURIComponent(payload.recipientEmail)}`;

  const itemsHtml = payload.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 12px 0; color: #f1f5f9; font-size: 14px;">${item.name}</td>
      <td style="padding: 12px 0; color: #94a3b8; font-size: 14px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 0; color: #10b981; font-size: 14px; text-align: right; font-weight: bold;">$${(item.quantity * item.price).toFixed(2)} CAD</td>
    </tr>
  `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070a0f; color: #b4fbfb;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #0d131f; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; border-top: 4px solid #d91e18;">
          <tr>
            <td style="padding: 40px; text-align: center;">
              <h1 style="color: #d91e18; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">CANADIAN PROP MONEY</h1>
              <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">Cinema & Theatric Reproductions</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="font-size: 16px; color: #f1f5f9; margin-top: 0;">Hi <strong>${payload.customerName}</strong>,</p>
              <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
                Thank you for choosing Canadian Prop Money. Your film specifications are successfully synchronized. Our dispatch desk is currently reviewing your order package.
              </p>
              
              <!-- Core Details Summary Card -->
              <table border="0" cellpadding="15" cellspacing="0" width="100%" style="background-color: #070a0f; border-radius: 8px; margin: 25px 0; border: 1px solid #1e293b;">
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: bold; padding-bottom: 4px;">Order Number</td>
                        <td style="color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: bold; padding-bottom: 4px; text-align: right;">Date</td>
                      </tr>
                      <tr>
                        <td style="color: #ffffff; font-size: 15px; font-weight: bold;">${payload.orderNumber}</td>
                        <td style="color: #ffffff; font-size: 15px; font-weight: bold; text-align: right;">${payload.date}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Product Table -->
              <h3 style="color: #f1f5f9; font-size: 14px; text-transform: uppercase; font-weight: bold; border-bottom: 2px solid #1e293b; padding-bottom: 8px; margin: 30px 0 10px 0;">Spec Cart Items</h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="padding: 20px 0 10px 0; color: #94a3b8; font-size: 14px; font-weight: bold; text-align: right;">Grand Total:</td>
                  <td style="padding: 20px 0 10px 0; color: #10b981; font-size: 18px; font-weight: bold; text-align: right; border-top: 1px dashed #1e293b;">$${payload.total.toFixed(2)} CAD</td>
                </tr>
              </table>

              <!-- Action button for tracking -->
              <div style="text-align: center; margin: 35px 0 25px 0;">
                <a href="${trackingLink}" style="display: inline-block; padding: 14px 28px; background-color: #d91e18; color: #ffffff; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 6px;">Track My Order</a>
              </div>

              <!-- Shipping/Payment Address Info -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; border-top: 1px solid #1e293b; padding-top: 20px;">
                <tr>
                  <td width="50%" valign="top" style="padding-right: 15px;">
                    <h4 style="color: #f1f5f9; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase;">Shipping Destination</h4>
                    <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">${payload.address}</p>
                  </td>
                  <td width="50%" valign="top">
                    <h4 style="color: #f1f5f9; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase;">Payment Registered</h4>
                    <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">
                      Method: <strong>${payload.paymentMethod}</strong><br>
                      <em>An email containing payment instructions is attached to this order message.</em>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size: 11px; color: #475569; line-height: 1.5; margin-top: 40px; text-align: center; border-top: 1px solid #1e293b; padding-top: 20px;">
                This document is proof of a cinematic prop transaction. Our items contain structural, legal alterations making them compliant with Bank of Canada standards. Intended for motion picture and theater use only.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  let sendStatus = "pending";
  const resend = getResend();

  if (resend) {
    try {
      const attachments = [];
      if (payload.invoiceBase64) {
        attachments.push({
          content: payload.invoiceBase64,
          filename: `${payload.orderNumber}-invoice.pdf`,
        });
      }

      await resend.emails.send({
        from: "Canadian Prop Money <onboarding@resend.dev>",
        to: payload.recipientEmail,
        subject: subject,
        html: emailHtml,
        attachments: attachments,
      });
      sendStatus = "sent";
    } catch (e: any) {
      console.error(`❌ [Resend API Error] Failed sending confirmation to ${payload.recipientEmail}:`, e);
      sendStatus = "failed";
    }
  } else {
    sendStatus = "logged_virtual";
  }

  // Save trace in database
  const result = await db.prepare(`
    INSERT INTO email_logs (order_id, email_type, recipient, status, created_at)
    VALUES (?, ?, ?, ?, datetime('now'))
  `).bind(payload.orderId, "customer_confirmation", payload.recipientEmail, sendStatus).run();

  return { success: sendStatus === "sent" || sendStatus === "logged_virtual", logId: Number(result.meta.last_row_id) };
}

export async function sendAdminNotification(payload: EmailPayload): Promise<{ success: boolean; logId: number }> {
  const db = getDB();
  const adminEmail = process.env.ADMIN_EMAIL || "yamahaoutboardss@gmail.com";
  const subject = `New Order Received #${payload.orderNumber}`;

  const adminPortalUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://canadianpropmoney.org"}/admin/orders`;

  const itemsHtml = payload.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #1e293b;">
      <td style="padding: 10px 0; color: #f1f5f9; font-size: 13px;">${item.name}</td>
      <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px 0; color: #34d399; font-size: 13px; text-align: right; font-weight: bold;">$${(item.quantity * item.price).toFixed(2)} CAD</td>
    </tr>
  `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #070a0f; color: #b4fbfb;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #0d131f; border-radius: 12px; border: 1px solid #d91e18; overflow: hidden;">
          <tr>
            <td style="padding: 30px; background-color: #d91e18; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: bold; letter-spacing: -0.5px;">🔴 ADMIN LOGISTICS RECIPIENT</h1>
              <p style="color: #ffb3b0; font-size: 11px; margin: 5px 0 0 0; text-transform: uppercase; font-weight: bold;">New Prop Money Spec Received</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 15px; color: #f1f5f9; margin-top: 0;">A new order specifications dispatch has been registered under: <strong>${payload.orderNumber}</strong></p>
              
              <!-- Customer Details block -->
              <h3 style="color: #38bdf8; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #1e293b; padding-bottom: 6px; margin: 25px 0 10px 0;">Customer Profile</h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
                <tr>
                  <td width="30%" style="font-weight: bold; color: #f1f5f9;">Name:</td>
                  <td>${payload.customerName}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #f1f5f9;">Email:</td>
                  <td>${payload.recipientEmail}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #f1f5f9;">Phone:</td>
                  <td>${payload.phone}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #f1f5f9; valign: top;">Address:</td>
                  <td>${payload.address}</td>
                </tr>
              </table>

              <!-- Order items block -->
              <h3 style="color: #38bdf8; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #1e293b; padding-bottom: 6px; margin: 30px 0 10px 0;">Specifications Configured</h3>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="padding: 15px 0 5px 0; color: #94a3b8; font-size: 13px; font-weight: bold; text-align: right;">Total Price:</td>
                  <td style="padding: 15px 0 5px 0; color: #10b981; font-size: 16px; font-weight: bold; text-align: right;">$${payload.total.toFixed(2)} CAD</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 5px 0; color: #94a3b8; font-size: 13px; font-weight: bold; text-align: right;">Method:</td>
                  <td style="padding: 5px 0; color: #ffffff; font-size: 13px; font-weight: bold; text-align: right; font-family: monospace;">${payload.paymentMethod}</td>
                </tr>
              </table>

              <!-- Action Link -->
              <div style="text-align: center; margin: 35px 0 15px 0;">
                <a href="${adminPortalUrl}" style="display: inline-block; padding: 12px 24px; background-color: #34d399; color: #022c22; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 6px;">Manage Status & Log</a>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  let sendStatus = "pending";
  const resend = getResend();

  if (resend) {
    try {
      const attachments = [];
      if (payload.invoiceBase64) {
        attachments.push({
          content: payload.invoiceBase64,
          filename: `${payload.orderNumber}-invoice.pdf`,
        });
      }

      await resend.emails.send({
        from: "Canadian Prop Money <onboarding@resend.dev>",
        to: adminEmail,
        subject: subject,
        html: emailHtml,
        attachments: attachments,
      });
      sendStatus = "sent";
    } catch (e: any) {
      console.error(`❌ [Resend API Error] Failed sending admin notification email to ${adminEmail}:`, e);
      sendStatus = "failed";
    }
  } else {
    sendStatus = "logged_virtual";
  }

  // Save trace in database
  const result = await db.prepare(`
    INSERT INTO email_logs (order_id, email_type, recipient, status, created_at)
    VALUES (?, ?, ?, ?, datetime('now'))
  `).bind(payload.orderId, "admin_notification", adminEmail, sendStatus).run();

  return { success: sendStatus === "sent" || sendStatus === "logged_virtual", logId: Number(result.meta.last_row_id) };
}
