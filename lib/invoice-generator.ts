import { jsPDF } from "jspdf";
import path from "path";
import fs from "fs";

export interface InvoiceData {
  orderNumber: string;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

export async function generateInvoicePDF(data: InvoiceData): Promise<string> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryColor = "#D91E18"; // Canadian Prop Red
  const darkTextColor = "#0F172A"; // Slate 900
  const lightTextColor = "#64748B"; // Slate 500
  const borderColor = "#E2E8F0"; // Slate 200

  // Title / Brand
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryColor);
  doc.text("CANADIAN PROP MONEY", 15, 20);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(lightTextColor);
  doc.text("Premium Cinema & Theatrical Carbon-Poly Duplications", 15, 25);
  doc.text("Secured Studio Delivery Hubs: Montreal | Toronto | Vancouver", 15, 29);

  // Invoice Text
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(darkTextColor);
  doc.text("INVOICE / RECEIPT", 140, 20);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(lightTextColor);
  doc.text(`Invoice ID: ${data.orderNumber}`, 140, 26);
  doc.text(`Date Registered: ${data.date}`, 140, 31);
  doc.text(`Payment: ${data.paymentMethod.toUpperCase()}`, 140, 36);

  // Draw dividers
  doc.setDrawColor(borderColor);
  doc.setLineWidth(0.5);
  doc.line(15, 42, 195, 42);

  // Customer Details Block
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(darkTextColor);
  doc.text("SHIP & DISPATCH TO:", 15, 50);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkTextColor);
  doc.text(`${data.firstName} ${data.lastName}`, 15, 56);
  doc.setTextColor(lightTextColor);
  doc.text(`Address: ${data.address}`, 15, 61);
  doc.text(`City: ${data.city || ""}, State: ${data.state}, Postal Code: ${data.postalCode || ""}`, 15, 66);
  doc.text(`Country: ${data.country}`, 15, 71);
  doc.text(`Phone: ${data.phone}`, 15, 76);
  doc.text(`Email: ${data.email}`, 15, 81);

  // Items Table Header
  doc.setDrawColor(borderColor);
  doc.setFillColor("#F8FAFC");
  doc.rect(15, 90, 180, 8, "F");

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(darkTextColor);
  doc.text("Product Spec Description", 18, 95);
  doc.text("Unit Price (CAD)", 110, 95);
  doc.text("Qty", 150, 95);
  doc.text("Total (CAD)", 170, 95);

  let currentY = 104;
  doc.setFont("Helvetica", "normal");

  data.items.forEach((item, index) => {
    // Check page height limit just in case
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }

    doc.setTextColor(darkTextColor);
    doc.text(item.name, 18, currentY);
    doc.text(`$${item.price.toFixed(2)}`, 110, currentY);
    doc.text(`${item.quantity}`, 150, currentY);
    doc.text(`$${(item.quantity * item.price).toFixed(2)}`, 170, currentY);

    doc.line(15, currentY + 3, 195, currentY + 3);
    currentY += 10;
  });

  // Calculate position with padding
  currentY += 5;
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }

  // Summary block
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(lightTextColor);
  doc.text("Subtotal:", 130, currentY);
  doc.setTextColor(darkTextColor);
  doc.text(`$${data.subtotal.toFixed(2)}`, 170, currentY);

  currentY += 6;
  doc.setTextColor(lightTextColor);
  doc.text("Studio Dispatch Shipping:", 130, currentY);
  doc.setTextColor(darkTextColor);
  doc.text(`$${data.shipping.toFixed(2)}`, 170, currentY);

  currentY += 8;
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(1);
  doc.line(130, currentY - 4, 195, currentY - 4);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryColor);
  doc.text("Total Registered:", 130, currentY);
  doc.text(`$${data.total.toFixed(2)} CAD`, 170, currentY);

  // Footer compliance/authenticity certificate note
  doc.setFont("Helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(lightTextColor);
  doc.text("SPECIFICATION & COMPLIANCE CERTIFICATE", 15, 260);
  doc.text("This invoice constitutes verified proof of acquisition. All currency replicas are configured", 15, 264);
  doc.text("with standard, cleared legal marks of compliance strictly compliant with the Bank of Canada Act", 15, 268);
  doc.text("and Federal replica limits. Insolvent, fake use strictly prohibited. Intended only for on-set filming.", 15, 272);

  // Save the invoice locally
  const invoiceDir = path.join(process.cwd(), "public", "invoices");
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }

  const invoiceFilePath = path.join(invoiceDir, `${data.orderNumber}.pdf`);
  const pdfArrayBuffer = doc.output("arraybuffer");
  fs.writeFileSync(invoiceFilePath, Buffer.from(pdfArrayBuffer));

  return `/invoices/${data.orderNumber}.pdf`;
}
