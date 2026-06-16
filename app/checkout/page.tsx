"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ShoppingBag,
  CreditCard,
  MapPin,
  Truck,
  ShieldCheck,
  Award,
  AlertTriangle,
  Coins,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ShippingOption {
  id: string;
  name: string;
  cost: number;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "sameday", name: "Same Day Shipping", cost: 40 },
  { id: "normal", name: "Normal Shipping (Canada / US Post)", cost: 20 },
  { id: "intl", name: "International Shipping (Express Air)", cost: 50 },
  { id: "australia", name: "Local Shipping (Australia)", cost: 40 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalCost, clearOrder } = useCart();

  // Redirect if cart is empty, unless we are viewing a submission outcome
  useEffect(() => {
    if (items.length === 0 && !submittedOrder) {
      // Small timeout to prevent screen jump during clears
      const t = setTimeout(() => {
        router.push("/products");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [items]);

  // Form Fields State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Canada");
  const [state, setState] = useState("");
  const [notes, setNotes] = useState("");

  // Shipping & Payments
  const [selectedShipping, setSelectedShipping] = useState<string>("normal");
  const [selectedPayment, setSelectedPayment] = useState<string>("crypto");

  // Loading / Submit States
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [validationError, setValidationError] = useState("");

  // Calculate current costs
  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === selectedShipping)?.cost || 0;
  const grandTotal = totalCost + shippingCost;

  // Track dynamic Country configurations to auto-select compliant payment options
  // Page 13:
  // CANADA: Crypto, E-Transfer, PayPal (Friends & Family Only), Credit Card (Mastercard Only)
  // UNITED STATES: Crypto, Zelle, Apple Cash, Chime, Credit Card
  // ALL OTHER: Crypto, PayPal (Friends & Family Only), Credit Card
  const getPaymentOptions = () => {
    const defaultCrypto = { id: "crypto", name: "Crypto (Bitcoin, USDT, USDC, ETH) - Preferred", desc: "Preferred for fast, secure and discreet ordering." };
    const cc = { id: "cc", name: "Credit Card (Secure Billing Link)", desc: "Our secure card payment link will be emailed or WhatsApped to you after we receive and review your order." };
    const paypal = { id: "paypal", name: "PayPal (Friends & Family)", desc: "PayPal Friends & Family payments only." };

    if (country.toLowerCase() === "canada") {
      return [
        defaultCrypto,
        { id: "etransfer", name: "Interac E-Transfer", desc: "Instantly transacts across all Canadian banking apps." },
        paypal,
        { id: "cc-mastercard", name: "Credit Card (Mastercard Only)", desc: "Our secure card payment link will be emailed or WhatsApped to you after we receive and review your order." }
      ];
    } else if (country.toLowerCase() === "united states" || country.toLowerCase() === "usa" || country.toLowerCase() === "us") {
      return [
        defaultCrypto,
        { id: "zelle", name: "Zelle Transfer", desc: "This payment option will be emailed or WhatsApped to you once we receive and review your order." },
        { id: "applecash", name: "Apple Cash", desc: "This payment option will be emailed or WhatsApped to you once we receive and review your order." },
        { id: "chime", name: "Chime Pay", desc: "This payment option will be emailed or WhatsApped to you once we receive and review your order." },
        cc
      ];
    } else {
      return [
        defaultCrypto,
        paypal,
        cc
      ];
    }
  };

  const paymentOptions = getPaymentOptions();

  // Reset selected payment if it doesn't exist in current country list
  useEffect(() => {
    const exists = paymentOptions.some((o) => o.id === selectedPayment);
    if (!exists && paymentOptions.length > 0) {
      setTimeout(() => {
        setSelectedPayment(paymentOptions[0].id);
      }, 0);
    }
  }, [country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Simple Server-side Simulation Validation
    if (!firstName || !lastName || !email || !phone || !address || !country || !state) {
      setValidationError("All asterisk (*) fields are required to secure coupon courier routes.");
      return;
    }

    setSubmitting(true);

    try {
      const activeOption = SHIPPING_OPTIONS.find((o) => o.id === selectedShipping);
      const activePaymentOption = paymentOptions.find((p) => p.id === selectedPayment);

      const payload = {
        firstName,
        lastName,
        email,
        phone,
        address,
        country,
        state,
        notes,
        shippingMethod: activeOption?.name || "Normal Shipping",
        shippingCost,
        paymentMethod: activePaymentOption?.name || "Crypto (Preferred)",
        items: items.map((it) => ({
          name: it.name,
          variant: it.variant,
          price: it.price,
          qty: it.qty,
        })),
        subtotal: totalCost,
        total: grandTotal,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedOrder(data.order);
        clearOrder(); // empties shopping cart matching cart constraints
      } else {
        setValidationError(data.error || "A severe database binding fault occurred on checkout.");
      }
    } catch (err) {
      setValidationError("Failed connecting with logistics REST client.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Main Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="checkout-main-segment">
        
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="text-slate-500 hover:text-[#FF6B1A] text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Building Spec</span>
          </Link>
        </div>

        {/* If successfully submitted order, render success screens with emails preview */}
        {submittedOrder ? (
          <div className="space-y-8 max-w-3xl mx-auto" id="checkout-success-container">
            
            {/* Thank You Main Card */}
            <div className="bg-[#0F1522] border border-emerald-505/25 rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-2xl animate-fade-in">
              <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-450/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <Sparkles className="w-8 h-8 font-bold" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-500/20 px-2.5 py-1 rounded-full">Spec Registered successfully</span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none pt-2 uppercase">
                  Thank You For Your Order!
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-emerald-400 font-semibold font-sans">{submittedOrder.firstName}</span>! Your cinematic propMoney specifications are locked into our server D1 logs.
                </p>
              </div>

              {/* Order Number & Status Row */}
              <div className="grid grid-cols-2 gap-4 bg-[#070A0F] border border-slate-900 rounded-xl p-4 text-xs font-mono">
                <div className="text-left">
                  <span className="text-slate-500 block uppercase text-[10px]">Order Number:</span>
                  <strong className="text-white text-sm font-bold">{submittedOrder.orderNumber}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-505 block uppercase text-[10px]">Order Status:</span>
                  <strong className="text-[#FF6B1A] text-sm font-bold uppercase">{submittedOrder.status}</strong>
                </div>
              </div>

              {/* Dynamic Items Receipt Table */}
              <div className="border border-slate-900 rounded-xl bg-slate-950/20 text-xs text-left" id="thankyou-items-grid">
                <div className="bg-slate-950/40 p-3 font-mono text-slate-500 rounded-t-xl uppercase text-[10px] tracking-wider block font-bold border-b border-slate-900">
                  Ordered Spec Summary
                </div>
                <div className="p-4 divide-y divide-slate-950 space-y-3">
                  {submittedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center pt-2 first:pt-0 text-slate-350 font-mono">
                      <div className="space-y-0.5">
                        <strong className="text-white font-sans">{item.name}</strong>
                        {item.variant && <span className="text-[10px] text-slate-500 block leading-none">{item.variant}</span>}
                      </div>
                      <div className="space-x-3 shrink-0">
                        <span className="text-slate-500">Qty: {item.qty}</span>
                        <strong className="text-emerald-400 font-extrabold">${(item.price * item.qty).toFixed(2)} CAD</strong>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-slate-950/40 rounded-b-xl border-t border-slate-900 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-450 font-bold block">PROJECT GRAND TOTAL:</span>
                  <strong className="text-emerald-400 text-sm font-extrabold">${submittedOrder.total?.toFixed(2)} CAD</strong>
                </div>
              </div>

              {/* Dynamic Payment instructions inside thank you page */}
              <div className="text-left space-y-2">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Inbound Billing Gateway instructions</span>
                
                {submittedOrder.paymentMethod.toLowerCase().includes("crypto") ? (
                  <div className="p-5 border border-[#FF6B1A]/20 bg-slate-950/40 rounded-xl space-y-3 font-mono">
                    <div className="flex items-center space-x-2 text-emerald-400 font-display">
                      <Coins className="w-4 h-4 shrink-0" />
                      <span className="font-bold text-xs uppercase tracking-wider">Discreet Crypto Invoicing Details</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      Transfer exact value using Bitcoin, USDT, or USDC to the following corporate treasury terminal wallet:
                    </p>
                    <div className="p-3 bg-[#070A0F] rounded text-[10px] border border-slate-900 flex items-center justify-between gap-2 font-bold select-all select-text text-slate-300">
                      <span>1CPMVa6t9Lre7zS5sA482663104829JpZ3</span>
                      <span className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded font-extrabold text-[8px] uppercase shrink-0">Supported Coins: BTC / USDT / USDC / ETH</span>
                    </div>
                    <p className="text-[9px] text-slate-500 italic block leading-relaxed font-sans">
                      ✔ Transaction automatically synchronized within 15 minutes. Download your audit PDF invoice attached below.
                    </p>
                  </div>
                ) : submittedOrder.paymentMethod.toLowerCase().includes("e-transfer") || submittedOrder.paymentMethod.toLowerCase().includes("interac") ? (
                  <div className="p-5 border border-red-500/10 bg-slate-950/40 rounded-xl space-y-3 font-mono">
                    <div className="flex items-center space-x-2 text-red-500 font-display">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span className="font-bold text-xs uppercase tracking-wider">Interac E-Transfer Details</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      Please send Canadian Interac E-Transfer payment to:
                    </p>
                    <div className="p-4 bg-[#070A0F] border border-slate-910 rounded space-y-2 text-xs text-slate-350">
                      <div><span className="text-slate-550 text-[10px] block font-sans">Recipient Email:</span> <strong className="text-white">dispatch@canadianpropmoney.org</strong></div>
                      <div className="pt-2"><span className="text-slate-550 text-[10px] block font-sans">Secret Question:</span> <strong className="text-white">What is this order for?</strong></div>
                      <div><span className="text-slate-550 text-[10px] block font-sans">Secret Answer:</span> <strong className="text-white font-mono">cinemagear</strong></div>
                    </div>
                    <p className="text-[10px] text-[#FF6B1A] font-bold leading-normal pt-1 flex items-start gap-1.5 font-sans">
                      <span>⚠️ Memo Required: Enter text ID matches <strong>{submittedOrder.orderNumber}</strong> in your banking notes.</span>
                    </p>
                  </div>
                ) : submittedOrder.paymentMethod.toLowerCase().includes("zelle") ? (
                  <div className="p-5 border border-purple-500/10 bg-slate-950/40 rounded-xl space-y-3 font-mono">
                    <div className="flex items-center space-x-2 text-purple-400 font-display">
                      <Send className="w-4 h-4 shrink-0" />
                      <span className="font-bold text-xs uppercase tracking-wider">Zelle Transfer Instructions</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      Please send your Zelle payment to:
                    </p>
                    <div className="p-4 bg-[#070A0F] border border-slate-910 rounded space-y-1 text-xs text-slate-350">
                      <div><span className="text-slate-550 text-[10px] block font-sans">Zelle Pay Identifier:</span> <strong className="text-white">treasury@canadianpropmoney.org</strong></div>
                      <div><span className="text-slate-550 text-[10px] block font-sans">Recipient:</span> <strong className="text-white font-sans">CPM Studios Ltd</strong></div>
                      <div className="pt-2"><span className="text-slate-550 text-[10px] block font-sans">Payment Note Required:</span> <strong className="text-white font-mono">{submittedOrder.orderNumber}</strong></div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 border border-white/5 bg-slate-950/20 rounded-xl font-sans text-xs text-slate-450 leading-relaxed">
                    <p>
                      Our secure credit card payment link is automatically compiled and dispatched to <strong>{submittedOrder.email}</strong> after our production coordinators verify the compliance metrics of your film currency specifications list. No further steps are requested right now.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/track-order?orderNumber=${submittedOrder.orderNumber}&email=${encodeURIComponent(submittedOrder.email)}`}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] text-xs font-bold uppercase tracking-wider rounded-md text-center cursor-pointer transition-colors"
                >
                  Track My Order &rarr;
                </Link>
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-md text-center cursor-pointer transition-colors"
                >
                  Return to Catalogue
                </Link>
              </div>

            </div>

            {/* Simulated Email Previews (from server responses logs) */}
            <div className="text-left space-y-6">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold text-center">Injected Email Logs (2 Outputs)</span>
              
              {/* Customer Email */}
              <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 font-mono text-[10px] leading-relaxed text-slate-400 overflow-x-auto select-none shadow-xl">
                <div className="flex items-center space-x-2 text-white pb-3 border-b border-slate-950 mb-3 font-display text-xs uppercase font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Customer Confirmation Email (Simulated Log)</span>
                </div>
                <pre className="whitespace-pre-wrap">{submittedOrder.customerEmailLogs?.trim()}</pre>
              </div>

              {/* Admin Email */}
              <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 font-mono text-[10px] leading-relaxed text-slate-400 overflow-x-auto select-none shadow-xl">
                <div className="flex items-center space-x-2 text-white pb-3 border-b border-slate-950 mb-3 font-display text-xs uppercase font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B1A]" />
                  <span>Admin Dispatch Notification (Simulated Log)</span>
                </div>
                <pre className="whitespace-pre-wrap">{submittedOrder.adminEmailLogs?.trim()}</pre>
              </div>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="checkout-form-grid">
            {/* Form Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8" id="checkout-billing-form">
              <div className="space-y-1">
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">Delivery Dispatch Checkout</h1>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your filming coordination and shipping profiles. We verify data and email detailed invoices with secure custom tracking links.
                </p>
              </div>

              {validationError && (
                <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-xl flex items-center space-x-3 text-xs text-red-400 font-mono">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: Customer Details */}
              <div className="space-y-4" id="form-step-details">
                <h3 className="font-display font-bold text-white text-base border-b border-slate-900 pb-2 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 text-[#FF6B1A] px-2 py-0.5 rounded-full">1</span>
                  Recipient Production Coordinator
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-semibold block" htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                      placeholder="e.g. Jean-Luc"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-semibold block" htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                      placeholder="e.g. Tremblay"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-semibold block" htmlFor="email">Email Address (Invoicing) *</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                      placeholder="e.g. billing@torontofilms.ca"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-semibold block" htmlFor="phone">Phone Number (For WhatsApp) *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                      placeholder="e.g. +1 (416) 555-0199"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping address */}
              <div className="space-y-4" id="form-step-shipping">
                <h3 className="font-display font-bold text-white text-base border-b border-slate-900 pb-2 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 text-[#FF6B1A] px-2 py-0.5 rounded-full">2</span>
                  Delivery Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-slate-400 font-semibold block" htmlFor="country">Country *</label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-slate-400 font-semibold block" htmlFor="state">Province / State / Region *</label>
                    <input
                      type="text"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                      placeholder="e.g. Ontario / California"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-slate-400 font-semibold block" htmlFor="address">Shipping Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors"
                      placeholder="e.g. 248 Pinewood Studios Rd"
                    />
                  </div>
                </div>

                <div className="text-xs space-y-1.5">
                  <label className="text-slate-400 font-semibold block" htmlFor="notes">Order Specality Notes (e.g., custom denoms list, aging request)</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/30 outline-none rounded p-3 text-white transition-colors resize-none"
                    placeholder="Describe denomination requirements or urgent locker pickup codes..."
                  />
                </div>
              </div>

              {/* Step 3: Shipping Option selection */}
              <div className="space-y-4" id="form-step-speeds">
                <h3 className="font-display font-bold text-white text-base border-b border-slate-900 pb-2 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 text-[#FF6B1A] px-2 py-0.5 rounded-full">3</span>
                  Select Shipping Speed Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedShipping(opt.id)}
                      className={`p-4 border rounded-xl text-left transition-all flex items-center justify-between ${
                        selectedShipping === opt.id
                          ? "bg-[#FF6B1A]/10 border-[#FF6B1A] text-white"
                          : "bg-[#0F1522] border-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div>
                        <span className="font-display font-bold text-xs sm:text-sm block">{opt.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Arrives securely packaged</span>
                      </div>
                      <span className="font-mono text-xs font-extrabold text-emerald-400 shrink-0">
                        ${opt.cost.toFixed(2)} CAD
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Payments selection */}
              <div className="space-y-4" id="form-step-payments">
                <h3 className="font-display font-bold text-white text-base border-b border-white/10 pb-2 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-[#D91E18]/10 border border-[#D91E18]/20 text-[#D91E18] px-2 py-0.5 rounded-none">4</span>
                  Select Billing Invoicing Method
                </h3>

                {/* Crypto Highlighted Message */}
                <div className="bg-[#101912] border border-emerald-500/25 p-4 rounded-none text-xs text-emerald-400 flex items-start space-x-2.5 shadow-lg">
                  <Coins className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider block">CRYPTO PREFERRED METHOD</span>
                    <p className="leading-relaxed">
                      &quot;Crypto is our preferred payment method for fast, secure and discreet ordering.&quot;
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPayment(opt.id)}
                      className={`p-4 border rounded-none text-left transition-all ${
                        selectedPayment === opt.id
                          ? "bg-[#121214] border-[#D91E18] text-white"
                          : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${selectedPayment === opt.id ? "border-[#FF6B1A]" : "border-slate-800"}`}>
                          {selectedPayment === opt.id && <span className="w-2 h-2 bg-[#FF6B1A] rounded-full" />}
                        </span>
                        <span className="font-display font-bold text-xs sm:text-sm">{opt.name}</span>
                      </div>
                      
                      {/* Notices as required on page 13 & 14 */}
                      <p className="text-[11px] text-slate-500 mt-2 font-sans pl-5 leading-normal">
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit triggers */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-[0.99] flex items-center justify-center space-x-2"
                id="submit-order-master-btn"
              >
                <span>{submitting ? "Synchronizing database security..." : "Submit Spec Invoicing Request ➔"}</span>
              </button>
            </form>

            {/* Right Column: Order items summary card */}
            <div className="lg:col-span-5" id="checkout-sidebar-summary">
              <div className="lg:sticky lg:top-28 bg-[#0F1522] border border-slate-900 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex items-center space-x-2 pb-4 border-b border-slate-950/50">
                  <ShoppingBag className="w-5 h-5 text-[#FF6B1A]" />
                  <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">Specifications Summary</h3>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto dark-scrollbar pr-1">
                  {items.map((item) => (
                    <div key={item.key} className="flex justify-between items-start text-xs border-b border-slate-950 pb-3">
                      <div className="space-y-0.5 pr-4">
                        <h4 className="text-white font-semibold leading-tight">{item.name}</h4>
                        <span className="text-[10px] text-slate-500 font-mono block leading-none">{item.variant}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">Qty: {item.qty}</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold shrink-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals panel */}
                <div className="space-y-2 border-t border-slate-950 pt-4 text-xs">
                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>SPEC SUB-TOTAL:</span>
                    <span className="text-white font-bold">${totalCost.toFixed(2)} CAD</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>SECURE COURIER COST:</span>
                    <span className="text-white font-bold">${shippingCost.toFixed(2)} CAD</span>
                  </div>
                  <div className="flex justify-between text-slate-505 font-mono pt-2 border-t border-slate-950 text-sm font-bold">
                    <span className="text-white">PROJECT GRAND TOTAL:</span>
                    <span className="text-emerald-400 font-mono">${grandTotal.toFixed(2)} CAD</span>
                  </div>
                </div>

                {/* Subsections compliance stamp */}
                <div className="bg-[#101912] border border-emerald-500/15 p-4 rounded-xl flex items-start space-x-3 text-[11px] text-emerald-500 leading-relaxed font-sans">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    Every replica stack includes a Certificate of Authenticity (COA) specifying legal compliance. Cleared for major televisions, cinema sets, and music videos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </>
  );
}
