"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RefreshCw,
  User,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  DollarSign,
  Briefcase,
  Download,
  Mail,
  Trash2,
  ExternalLink,
  Eye,
  ArrowUpDown,
  FileSpreadsheet
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, highest, lowest

  // UI state for inspect modal
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setError("Failed loading orders from DB.");
      }
    } catch {
      setError("Failed connecting with administrative REST routes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchOrders();
    }, 0);
  }, []);

  // Update order status trigger
  const updateStatus = async (orderNumber: string, nextStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, status: nextStatus }),
      });

      if (res.ok) {
        // Update local state
        setOrders(prev =>
          prev.map(o => (o.order_number === orderNumber ? { ...o, status: nextStatus } : o))
        );
        if (selectedOrder && selectedOrder.order_number === orderNumber) {
          setSelectedOrder((prev: any) => ({ ...prev, status: nextStatus }));
        }
      } else {
        alert("Failed mutating database status.");
      }
    } catch {
      alert("Database status mutation timeout.");
    }
  };

  // Re-send core confirmation emails
  const handleResendEmail = async (orderNumber: string, emailType: "customer" | "admin") => {
    setActionLoading(true);
    setActionSuccess("");
    setActionError("");

    try {
      const res = await fetch("/api/orders/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, emailType }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActionSuccess(`Successfully re-dispatched ${emailType} notification! (Log ID: ${data.logId})`);
      } else {
        setActionError(data.error || "Failed re-sending email.");
      }
    } catch {
      setActionError("Logistics connection timeout.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete absolute order record
  const handleDeleteOrder = async (orderNumber: string) => {
    if (!confirm(`⚠️ ARE YOU ABSOLUTELY SURE? This will permanently delete Order ${orderNumber} from the Cloudflare D1 / SQLite database. This is irreversible!`)) {
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber }),
      });

      if (res.ok) {
        setOrders(prev => prev.filter(o => o.order_number !== orderNumber));
        setSelectedOrder(null);
        alert(`Order ${orderNumber} cleaned from database successfully.`);
      } else {
        const data = await res.json();
        alert(data.error || "Failed deleting order from database.");
      }
    } catch {
      alert("Database connection failure on deletion.");
    }
  };

  // Excel CSV Export tool
  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Order Number", "Date", "First Name", "Last Name", "Email", "Phone", "Address", "City", "State", "Country", "Postal Code", "Payment Method", "Subtotal", "Shipping", "Grand Total", "Status"];
    const rows = orders.map(o => [
      o.order_number,
      o.date ? new Date(o.date).toLocaleDateString("en-CA") : "",
      o.firstName,
      o.lastName,
      o.email,
      o.phone,
      o.address,
      o.city || "",
      o.state,
      o.country,
      o.postalCode || "",
      o.payment_method,
      o.subtotal,
      o.shipping,
      o.total,
      o.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CPM_Warehouse_Orders_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Process search, filtering and sorting
  const filteredOrders = orders
    .filter((o) => {
      const query = searchQuery.toLowerCase();
      const matchNumber = o.order_number.toLowerCase().includes(query);
      const matchName = `${o.firstName} ${o.lastName}`.toLowerCase().includes(query);
      const matchEmail = o.email.toLowerCase().includes(query);
      const searchMatch = matchNumber || matchName || matchEmail;

      const statusMatch = statusFilter === "all" || o.status.toLowerCase() === statusFilter;

      return searchMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "highest") {
        return b.total - a.total;
      }
      if (sortBy === "lowest") {
        return a.total - b.total;
      }
      return 0;
    });

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending" || s === "pending payment") return "bg-amber-950/40 text-amber-550 border border-amber-500/20";
    if (s === "processing" || s === "payment received") return "bg-sky-950/40 text-sky-450 border border-sky-500/20";
    if (s === "completed" || s === "shipped" || s === "delivered") return "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20";
    return "bg-red-950/40 text-red-400 border border-red-500/25"; // cancelled or refunded
  };

  return (
    <>
      <Navbar />

      {/* SEO Noindex header label */}
      <div className="w-full bg-red-950/30 border-b border-red-900/40 text-[10px] py-1.5 text-center font-mono text-red-500 uppercase select-none">
        ⚠️ SECURE ADMIN GATEWAY LOCKS ACTIVE • STRICT ROBOTS: NOINDEX CONSTRAINTS APPLIED
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[600px]" id="admin-orders-dashboard-wrapper">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-900">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[#FF6B1A]">
              <Briefcase className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold">CPM Warehouse Central</span>
            </div>
            <h1 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight leading-tight uppercase">
              Specifications & Orders Dispatch logs
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-900 border border-slate-800 text-slate-350 hover:text-white rounded-lg transition-all text-xs font-mono active:scale-95 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchOrders}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#0F1522] border border-slate-900 hover:border-slate-800 text-slate-350 hover:text-white rounded-lg transition-all text-xs font-mono active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Synchronize DB</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-[#0F1522] p-4 rounded-xl border border-slate-900 text-xs">
          
          {/* Row 1: Search */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-550" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070A0F] border border-slate-900 outline-none rounded p-3.5 pl-10 text-white transition-all placeholder:text-slate-600 focus:border-[#FF6B1A]/20"
              id="admin-dashboard-search-bar"
            />
          </div>

          {/* Row 2: Status Filter tabs */}
          <div className="lg:col-span-5 flex flex-wrap gap-1">
            {([
              { id: "all", name: "All Logs" },
              { id: "pending", name: "Pending" },
              { id: "processing", name: "Processing" },
              { id: "completed", name: "Completed" },
              { id: "cancelled", name: "Cancelled" },
              { id: "on-hold", name: "On-hold" }
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`py-2 px-3 tracking-wide font-medium rounded transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-[#FF6B1A]/10 text-white border-b-2 border-[#FF6B1A] font-bold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Row 3: Sorter */}
          <div className="lg:col-span-3 flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-550 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#070A0F] border border-slate-900 outline-none rounded p-3 text-white transition-all cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Value: High to Low</option>
              <option value="lowest">Value: Low to High</option>
            </select>
          </div>

        </div>

        {/* Orders Table Panel */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-mono text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#FF6B1A] mb-3" />
            <span>Connecting with secure Cloudflare D1 database...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-950/20 border border-red-900/40 text-red-500 font-mono text-xs max-w-xl mx-auto rounded-xl">
            <XCircle className="w-6 h-6 mx-auto mb-2" />
            <span>{error}</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-[#0F1522] border border-slate-900 p-8 rounded-xl space-y-3">
            <span className="text-3xl">📂</span>
            <p className="text-slate-400 font-mono text-xs">No registered specifications correspond with match definitions.</p>
            {orders.length === 0 && (
              <p className="text-[10px] text-slate-650 leading-none">Complete a mock checkout simulation first to register items!</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-900 bg-[#0F1522] shadow-2xl" id="admin-orders-table-container">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/40 border-b border-slate-900 text-slate-500 font-mono">
                  <th className="p-4">LOG ID</th>
                  <th className="p-4">CLIENT RECIPIENT</th>
                  <th className="p-4">SPEC ITEMS</th>
                  <th className="p-4">LOGISTICS</th>
                  <th className="p-4">BILLING METHOD</th>
                  <th className="p-4 text-right">TOTAL PRICE</th>
                  <th className="p-4">DISPATCH STATUS</th>
                  <th className="p-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-950/40 text-slate-400">
                {filteredOrders.map((o) => (
                  <tr key={o.order_number} className="hover:bg-slate-950/20 transition-all font-sans" id={`admin-tr-order-${o.order_number}`}>
                    
                    {/* Log ID */}
                    <td className="p-4 font-mono font-bold text-white">
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold">{o.order_number}</span>
                        <span className="text-[9px] text-slate-650 font-medium leading-none mt-1">
                          {new Date(o.date).toLocaleDateString("en-CA")}
                        </span>
                      </div>
                    </td>

                    {/* Client Recipient */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{o.firstName} {o.lastName}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 font-mono">{o.email}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{o.phone}</span>
                      </div>
                    </td>

                    {/* Spec Items */}
                    <td className="p-4 max-w-[180px]">
                      <div className="flex flex-col space-y-1">
                        {o.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-[10px] bg-slate-950/60 border border-slate-900 px-1.5 py-0.5 rounded font-mono">
                            <span className="truncate pr-2 text-slate-400">{item.name}</span>
                            <span className="text-[#FF6B1A] font-bold font-mono shrink-0">x{item.qty}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Logistics */}
                    <td className="p-4 text-[10px] font-mono leading-relaxed">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-300">Ground Secure</span>
                        <span className="text-slate-550 truncate max-w-[130px]">{o.address}, {o.state}, {o.country}</span>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="p-4 font-mono text-[10px]">
                      <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-white inline-block uppercase font-bold text-[9px]">
                        {o.payment_method}
                      </span>
                    </td>

                    {/* Total Price */}
                    <td className="p-4 text-right font-mono text-emerald-400 font-bold text-sm">
                      ${o.total?.toFixed(2)}
                    </td>

                    {/* Dispatch Status */}
                    <td className="p-4">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.order_number, e.target.value)}
                        className={`text-[10px] p-2 pr-4 rounded-md font-mono font-bold outline-none leading-none cursor-pointer ${getStatusStyle(o.status)}`}
                      >
                        <option value="Pending">Pending Payment</option>
                        <option value="Payment Received">Payment Received</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>

                    {/* Actions button */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="p-1.5 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded text-slate-300 hover:text-white transition-all cursor-pointer"
                          title="View order details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(o.order_number)}
                          className="p-1.5 bg-red-950/30 border border-red-950/50 hover:border-red-650/40 rounded text-red-400 hover:text-white transition-all cursor-pointer"
                          title="Delete absolute order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal: Selected Order Details inspection panel */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="admin-inspect-modal">
            <div className="bg-[#0D131F] border border-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              {/* Close link */}
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setActionSuccess("");
                  setActionError("");
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-xs uppercase font-mono cursor-pointer"
              >
                ✕ Close
              </button>

              {/* Title Header */}
              <div className="border-b border-slate-950 pb-4 space-y-1.5">
                <span className="font-mono text-[10px] text-[#FF6B1A] uppercase tracking-wider block font-bold">Deep Spec Inspection Panel</span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="font-display font-bold text-white text-xl sm:text-2xl">{selectedOrder.order_number}</h2>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wide border self-start sm:self-auto ${getStatusStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Core Information Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs" id="inspect-modal-grid-blocks">
                {/* Billing Profile */}
                <div className="bg-[#070A0F] p-4 rounded-xl border border-slate-900 space-y-2">
                  <h4 className="text-sky-400 font-mono tracking-wider font-semibold uppercase text-[10px]">Client Recipient Profile</h4>
                  <div className="space-y-1 leading-normal font-sans">
                    <p><span className="text-slate-500 font-mono">Name:</span> <strong className="text-white">{selectedOrder.firstName} {selectedOrder.lastName}</strong></p>
                    <p><span className="text-slate-500 font-mono">Email:</span> <strong className="text-white font-mono">{selectedOrder.email}</strong></p>
                    <p><span className="text-slate-500 font-mono">Phone:</span> <strong className="text-white font-mono">{selectedOrder.phone}</strong></p>
                  </div>
                </div>

                {/* Logistics Profile */}
                <div className="bg-[#070A0F] p-4 rounded-xl border border-slate-900 space-y-2">
                  <h4 className="text-sky-400 font-mono tracking-wider font-semibold uppercase text-[10px]">Logistics Destination</h4>
                  <div className="space-y-1 leading-normal font-sans text-slate-350">
                    <p><span className="text-slate-500 font-mono">Street Address:</span> {selectedOrder.address}</p>
                    <p><span className="text-slate-500 font-mono">City / State:</span> {selectedOrder.city || "Unspecified"}, {selectedOrder.state}</p>
                    <p><span className="text-slate-500 font-mono">Country:</span> {selectedOrder.country} ({selectedOrder.postalCode || "N/A"})</p>
                  </div>
                </div>
              </div>

              {/* Specification Cart Table */}
              <div className="space-y-2">
                <h4 className="text-slate-500 font-mono tracking-widest font-semibold uppercase text-[9px] border-b border-slate-950 pb-1.5">Package spec items</h4>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3 bg-[#070A0F] rounded-lg border border-slate-925 font-mono">
                      <div>
                        <strong className="text-white block font-sans">{item.name}</strong>
                        <span className="text-[10px] text-slate-500">Unit Cost: ${item.price.toFixed(2)} CAD</span>
                      </div>
                      <span className="font-extrabold text-[#FF6B1A] bg-[#FF6B1A]/5 border border-[#FF6B1A]/20 px-2 py-0.5 rounded text-xs">
                        x{item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure invoice / Total info */}
              <div className="p-4 bg-slate-950/20 border border-slate-920 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <div><span className="text-slate-550">Billing Method:</span> <strong className="text-white uppercase text-[10px]">{selectedOrder.payment_method}</strong></div>
                  <div><span className="text-slate-550">Grand Total:</span> <strong className="text-emerald-400 text-sm font-extrabold">${selectedOrder.total?.toFixed(2)} CAD</strong></div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`/invoices/${selectedOrder.order_number}.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#FF6B1A] hover:bg-[#e05a10] text-slate-950 rounded font-sans font-bold text-[11px] transition-colors uppercase cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Invoice</span>
                  </a>
                  <Link
                    href={`/track-order?orderNumber=${selectedOrder.order_number}&email=${encodeURIComponent(selectedOrder.email)}`}
                    target="_blank"
                    className="flex items-center space-x-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded font-sans font-medium text-[11px] border border-slate-800 transition-colors uppercase"
                  >
                    <ExternalLink className="w-3.5 h-3.5 font-bold" />
                    <span>Track UI</span>
                  </Link>
                </div>
              </div>

              {/* Resend mail actions */}
              <div className="border-t border-slate-950 pt-4 space-y-4">
                <h4 className="text-slate-500 font-mono tracking-widest font-semibold uppercase text-[9px]">Email Re-dispatch control panel</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleResendEmail(selectedOrder.order_number, "customer")}
                    disabled={actionLoading}
                    className="flex items-center justify-center space-x-2 p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all text-xs font-sans rounded-lg active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Resend Customer Email</span>
                  </button>
                  <button
                    onClick={() => handleResendEmail(selectedOrder.order_number, "admin")}
                    disabled={actionLoading}
                    className="flex items-center justify-center space-x-2 p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all text-xs font-sans rounded-lg active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#FF6B1A]" />
                    <span>Resend Admin Email</span>
                  </button>
                </div>

                {actionSuccess && (
                  <p className="p-3 bg-emerald-950/20 border border-emerald-505/20 text-emerald-400 rounded-lg text-[10px] font-mono leading-relaxed">
                    ✔ {actionSuccess}
                  </p>
                )}

                {actionError && (
                  <p className="p-3 bg-red-950/20 border border-red-500/20 text-red-500 rounded-lg text-[10px] font-mono leading-relaxed">
                    ❌ {actionError}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

      </section>

      <Footer />
    </>
  );
}
