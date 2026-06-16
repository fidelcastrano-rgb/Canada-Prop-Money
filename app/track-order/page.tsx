"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Clock,
  ShieldCheck,
  AlertCircle,
  Truck,
  Box,
  CheckCircle,
  Coins,
  Send,
  CreditCard,
  Building,
  KeyRound,
  FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackResult, setTrackResult] = useState<any | null>(null);

  const executeQuery = async (num: string, mail: string) => {
    setLoading(true);
    setError("");
    setTrackResult(null);

    try {
      const res = await fetch(`/api/track?orderNumber=${encodeURIComponent(num)}&email=${encodeURIComponent(mail)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setTrackResult(data);
      } else {
        setError(data.error || "No matching registered cinematic order was matched.");
      }
    } catch {
      setError("Logistics connection alert. Failed reaching dispatch desk.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill from URL parameters if provided
  useEffect(() => {
    if (!searchParams) return;
    const urlNum = searchParams.get("orderNumber");
    const urlEmail = searchParams.get("email");
    if (urlNum && urlEmail) {
      setTimeout(() => {
        setOrderNumber(urlNum);
        setEmail(urlEmail);
        executeQuery(urlNum, urlEmail);
      }, 0);
    }
  }, [searchParams]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) {
      setError("Please fill in both fields.");
      return;
    }
    // Update URL to make it shareable/refreshable
    router.push(`/track-order?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
    executeQuery(orderNumber, email);
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("pending")) return "text-amber-500 border-amber-500/20 bg-amber-950/20";
    if (s.includes("processing") || s.includes("payment received")) return "text-blue-400 border-blue-500/20 bg-blue-950/20";
    if (s.includes("shipped") || s.includes("delivered") || s.includes("completed")) return "text-emerald-400 border-emerald-500/20 bg-emerald-950/20";
    return "text-red-400 border-red-500/20 bg-red-950/20";
  };

  const renderPaymentInstructions = (paymentMethod: string) => {
    const pm = paymentMethod.toLowerCase();

    if (pm.includes("crypto") || pm.includes("bitcoin")) {
      return (
        <div className="p-5 border border-[#FF6B1A]/20 bg-[#0F1522] rounded-xl space-y-3" id="crypto-pay-instructions">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Coins className="w-5 h-5 shrink-0" />
            <h4 className="font-display font-medium text-xs sm:text-sm uppercase tracking-wider">Dynamic Crypto Payment Details</h4>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-normal">
            To coordinate dispatch fast, transfer exact order cost in BTC, USDT (TRC-20), or USDC to the following secure treasury wallet address.
          </p>
          <div className="bg-slate-950 p-3 rounded border border-slate-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-[10px] text-slate-350">
            <span className="truncate select-all select-text font-bold">1CPMVa6t9Lre7zS5sA482663104829JpZ3</span>
            <span className="shrink-0 text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded font-bold">USDT (TRC20) & BTC Accepted</span>
          </div>
          <p className="text-[10px] text-slate-500 italic block">
            ✔ Transaction automatically verified within 15 minutes of block completion. Notify logistics on dispatch chat for immediate package release.
          </p>
        </div>
      );
    }

    if (pm.includes("e-transfer") || pm.includes("interac")) {
      return (
        <div className="p-5 border border-red-500/10 bg-[#0F1522] rounded-xl space-y-3" id="etransfer-pay-instructions">
          <div className="flex items-center space-x-2 text-red-400">
            <Building className="w-5 h-5 shrink-0" />
            <h4 className="font-display font-medium text-xs sm:text-sm uppercase tracking-wider">Interac E-Transfer Verification</h4>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-normal">
            For secure Canadian Interac E-Transfer, transmit funds to:
          </p>
          <div className="p-4 bg-slate-950 border border-slate-900 rounded space-y-2 font-mono text-xs text-slate-350">
            <div><span className="text-slate-500 text-[10px] block uppercase font-sans">Recipient Email:</span> <strong className="text-white">dispatch@canadianpropmoney.org</strong></div>
            <div className="pt-2"><span className="text-slate-500 text-[10px] block uppercase font-sans">Security Question:</span> <strong className="text-white">What is this order for?</strong></div>
            <div><span className="text-slate-500 text-[10px] block uppercase font-sans">Security Answer:</span> <strong className="text-white">cinemagear</strong></div>
          </div>
          <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
            Please include your registered Order ID <strong>{trackResult?.order?.orderNumber}</strong> in the transfer message memo field to guarantee fast verification.
          </p>
        </div>
      );
    }

    if (pm.includes("zelle")) {
      return (
        <div className="p-5 border border-purple-500/10 bg-[#0F1522] rounded-xl space-y-3" id="zelle-pay-instructions">
          <div className="flex items-center space-x-2 text-purple-400">
            <Send className="w-5 h-5 shrink-0" />
            <h4 className="font-display font-medium text-xs sm:text-sm uppercase tracking-wider">Zelle Transfer Instructions</h4>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-normal">
            Please send your Zelle payment to:
          </p>
          <div className="p-4 bg-slate-950 border border-slate-900 rounded space-y-1 font-mono text-xs text-slate-350">
            <div><span className="text-slate-500 text-[10px] block uppercase font-sans">Zelle Pay Identifier:</span> <strong className="text-white">treasury@canadianpropmoney.org</strong></div>
            <div><span className="text-slate-500 text-[10px] block uppercase font-sans">Recipient Class:</span> <strong className="text-white">CPM Studios Ltd</strong></div>
          </div>
          <p className="text-[10px] text-slate-550 italic leading-relaxed">
            Specify order matching <strong>{trackResult?.order?.orderNumber}</strong> in the payment notes to avoid verification delays. Address dispatched immediately upon confirmation.
          </p>
        </div>
      );
    }

    return (
      <div className="p-5 border border-slate-800 bg-[#0F1522] rounded-xl space-y-2.5" id="creditcard-pay-instructions">
        <div className="flex items-center space-x-2 text-sky-400">
          <CreditCard className="w-5 h-5 shrink-0" />
          <h4 className="font-display font-medium text-xs sm:text-sm uppercase tracking-wider">Credit Card Invoicing Link</h4>
        </div>
        <p className="text-[11px] text-slate-400 leading-normal font-sans">
          Our secure credit card payment link is automatically generated and dispatched to your email (and WhatsApp/SMS) after our production coordinators verify the dimensions and local legality parameters of your prop currency order.
        </p>
        <p className="text-[10px] text-slate-500 italic block">
          ✔ No further manual billing action is required. Please watch your inbox and WhatsApp message panels.
        </p>
      </div>
    );
  };

  return (
    <>
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="tracker-landing-section">
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B1A] font-bold">Secure Delivery Gateway</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Cinematic Dispatch Tracking Panel
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-sans">
            Review live status coordinates, payment instructions, and official logs of your Canadian Prop Money packages.
          </p>
        </div>

        {/* Search Engine Form */}
        <div className="bg-[#0F1522] border border-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl max-w-xl mx-auto">
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-slate-400 font-bold block" htmlFor="orderInput">Order Number *</label>
                <input
                  type="text"
                  id="orderInput"
                  placeholder="e.g. CPM-2026-000001"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full bg-[#070A0F] border border-slate-900 outline-none p-3.5 rounded text-white text-xs placeholder:text-slate-700 font-mono transition-all focus:border-[#FF6B1A]/20"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-slate-400 font-bold block" htmlFor="emailInput">Registration Email *</label>
                <input
                  type="email"
                  id="emailInput"
                  placeholder="e.g. director@filmpanels.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070A0F] border border-slate-900 outline-none p-3.5 rounded text-white text-xs placeholder:text-slate-700 font-sans transition-all focus:border-[#FF6B1A]/20"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded flex items-center space-x-2 text-[10px] leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] font-bold uppercase tracking-widest text-xs rounded transition-all active:scale-[0.99] flex items-center justify-center space-x-2 font-sans cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{loading ? "Authenticating details..." : "Query Dispatch logs"}</span>
            </button>
          </form>
        </div>

        {/* Dynamic query outcome results */}
        {trackResult && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="query-outcome-results">
            
            {/* Column Left: Details & Payment instructions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Core Details panel */}
              <div className="bg-[#0F1522] border border-slate-900 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-950">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#FF6B1A] font-mono uppercase tracking-wider block font-bold">Cinematic Record Authenticated</span>
                    <h3 className="font-display font-bold text-white text-lg">Order {trackResult.order.orderNumber}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wide border ${getStatusColor(trackResult.order.status)}`}>
                    {trackResult.order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Recipient Client:</span>
                    <strong className="text-white font-sans">{trackResult.order.firstName} {trackResult.order.lastName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Registered Date:</span>
                    <strong className="text-white font-mono">{new Date(trackResult.order.date).toLocaleDateString("en-CA")}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Billing Option:</span>
                    <strong className="text-[#FF6B1A] uppercase font-mono">{trackResult.order.paymentMethod}</strong>
                  </div>
                  {trackResult.order.invoicePath && (
                    <div>
                      <span className="text-slate-500 block">Audit Invoice File:</span>
                      <a
                        href={trackResult.order.invoicePath}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 font-bold underline inline-flex items-center gap-1 hover:text-emerald-300"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Download PDF Invoice</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Items tables */}
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block font-bold">Package Contents</span>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {trackResult.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-950/60 border border-slate-900/60 p-3 rounded">
                        <div className="text-xs">
                          <strong className="text-white font-sans block">{item.name}</strong>
                          <span className="text-[10px] text-slate-500 font-mono">Unit Price: ${item.price.toFixed(2)} CAD</span>
                        </div>
                        <span className="font-mono text-[#FF6B1A] text-xs font-extrabold bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 px-2 py-0.5 rounded">
                          x{item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secure Total info */}
                <div className="pt-4 border-t border-slate-950 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">DISPATCH TOTAL:</span>
                  <strong className="text-emerald-400 font-mono text-base">${trackResult.order.total.toFixed(2)} CAD</strong>
                </div>
              </div>

              {/* Payment Instructions Board if Pending */}
              {trackResult.order.status.toLowerCase().includes("pending") && (
                <div className="space-y-3">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-bold">Billing Resolution Desk</span>
                  {renderPaymentInstructions(trackResult.order.paymentMethod)}
                </div>
              )}

            </div>

            {/* Column Right: Interactive Horizontal timeline */}
            <div className="lg:col-span-5 bg-[#0F1522] border border-slate-900 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="pb-4 border-b border-slate-950 flex items-center space-x-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">Logistics Routing Audit</h3>
              </div>

              {/* Vertical timeline items */}
              <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-905">
                {trackResult.timeline?.map((step: any, idx: number) => {
                  const isFirst = idx === 0;
                  return (
                    <div key={idx} className="relative text-xs text-left" id={`timeline-trace-step-${idx}`}>
                      {/* Circle dot marker */}
                      <span className={`absolute -left-[20px] top-1 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isFirst 
                          ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)] animate-pulse" 
                          : "bg-slate-950 border-slate-800"
                      }`} />
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <strong className={`font-bold uppercase font-mono ${isFirst ? "text-emerald-400" : "text-slate-300"}`}>
                            {step.status}
                          </strong>
                          {isFirst && <span className="text-[9px] text-emerald-400 font-bold uppercase font-mono bg-emerald-950/50 border border-emerald-500/20 px-1 py-0.2 rounded">Latest</span>}
                        </div>
                        <span className="text-[10px] text-slate-550 block font-mono">
                          {new Date(step.date).toLocaleDateString("en-CA")} @ {new Date(step.date).toLocaleTimeString()}
                        </span>
                        <p className="text-[11px] text-slate-500 leading-normal font-sans pt-1">
                          {step.status.toLowerCase() === "pending" && "Specifications submitted and are undergoing anti-counterfeiting compliance verification."}
                          {step.status.toLowerCase() === "processing" && "Invoice cleared. Production has initialized precision polymers plating of your replica bills."}
                          {step.status.toLowerCase() === "shipped" && "Courier handoff authenticated. Package tracking coordinates registered and sent to client."}
                          {step.status.toLowerCase() === "delivered" && "Delivery completed successfully. Safe physical drop certificate received."}
                          {step.status.toLowerCase() === "cancelled" && "This cinematic specification has been cancelled by dispatcher request."}
                          {step.status.toLowerCase() === "on-hold" && "Compliance request holds active. Coordinates await authorization details."}
                          {!["pending", "processing", "shipped", "delivered", "cancelled", "on-hold"].includes(step.status.toLowerCase()) && "Administrative log modification recorded."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer self-protection message */}
              <div className="bg-slate-950/60 border border-slate-920 p-4 rounded-xl flex items-start space-x-2.5 text-[10px] text-slate-500 leading-relaxed font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  Every order includes live audit security codes. Never share your track-order URL parameters with public media groups or unverified third party accounts.
                </p>
              </div>

            </div>

          </div>
        )}
      </section>
    </>
  );
}

export default function TrackOrderPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="text-center py-32 text-slate-500 font-mono text-xs">
          <span>Initializing secure logistics tracking...</span>
        </div>
      }>
        <TrackOrderContent />
      </Suspense>
      <Footer />
    </>
  );
}
