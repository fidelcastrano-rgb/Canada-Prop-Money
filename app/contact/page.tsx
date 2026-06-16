"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  HelpCircle,
  ShieldAlert,
  MapPin,
  Clock,
  Truck,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export default function ContactPage() {
  const openWhatsApp = () => {
    window.open("https://wa.me/18437320661", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section className="bg-slate-950/40 border-b border-slate-900 py-16 text-center relative overflow-hidden" id="contact-hero-block">
        <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-emerald-600/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">CPM SHIPPING DESK</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none max-w-xl mx-auto">
            Contact Cinematic Dispatch & Logistics
          </h1>
          <p className="text-slate-450 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Have a filming schedule deadline or bulk vault request? Reach out to our secure dispatch managers via WhatsApp or secure email. 
          </p>
        </div>
      </section>

      {/* Main 2-column contact segment */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-main-board">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: WhatsApp Card + Email Card + 4-Step Flow */}
          <div className="lg:col-span-6 space-y-8" id="contact-left-col">
            
            {/* WhatsApp Card (Recommended, Green Border, Response Times) */}
            <div className="border border-[#25D366] bg-[#0C1511]/70 rounded-2xl p-6 space-y-4 glow-primary" id="contact-whatsapp-recommended-card">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-950/40">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-[#25D366] fill-[#25D366]/10" />
                  <div>
                    <h3 className="font-display font-bold text-white text-base">WhatsApp Direct Dispatch</h3>
                    <span className="text-[10px] text-emerald-400 font-mono font-medium tracking-wide uppercase">RECOMMENDED / DIRECT</span>
                  </div>
                </div>
                <span className="bg-emerald-650/20 text-emerald-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                  FASTEST SPEED
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Click below to launch an instant conversation with our secure delivery coordinators. pre-fill lists, coordinate locker pickcodes, or arrange same-day terminal couriers directly.
              </p>

              {/* Response speeds table */}
              <div className="bg-slate-950/65 border border-slate-900 rounded-lg overflow-hidden p-3.5 space-y-2">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-semibold">Active Response Slots</span>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400">
                  <div className="border-r border-slate-900 pr-2">
                    <span className="text-slate-500 block">MORNINGS</span>
                    <span className="text-emerald-400 font-bold font-sans">Immediate &lt; 5m</span>
                  </div>
                  <div className="border-r border-slate-900 pr-2">
                    <span className="text-slate-500 block">AFTERNOONS</span>
                    <span className="text-emerald-400 font-bold font-sans">Immediate &lt; 5m</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NIGHTS/WEEKEN</span>
                    <span className="text-amber-500 font-bold font-sans">Under 15m</span>
                  </div>
                </div>
              </div>

              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-emerald-950/20"
                aria-label="Contact us on WhatsApp recommended card"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Submit inquiry direct &rarr;</span>
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-[#0F1522] border border-slate-900 rounded-2xl p-6 space-y-4" id="contact-email-card">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-950/40 text-white">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-display font-semibold text-sm sm:text-base">Custom Production Billing</h3>
                  <span className="font-mono text-[10px] text-slate-500 tracking-wider block leading-none">sales@canadianpropmoney.org</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For commercial leasing agreements, recurrent series logistics, customized bundles, or studio billing paperwork, email coordinate with our account managers. 
              </p>
              <a
                href="mailto:sales@canadianpropmoney.org?subject=Production%20Prop%20Money%2520Inquiry"
                className="w-full block text-center py-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-300 hover:text-white font-semibold text-xs rounded-lg transition-all active:scale-95"
                aria-label="Email our dispatch desk"
              >
                Draft corporate email inquiry
              </a>
            </div>

            {/* 4-Step Order Flow */}
            <div className="bg-slate-950/30 border border-slate-900 rounded-2xl p-6 space-y-4" id="contact-order-flow">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-semibold">How Order Dispatch Works (4 Steps)</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Step 1 */}
                <div className="space-y-1">
                  <span className="text-emerald-400 font-bold block font-mono">01. BROWSE CATALOG</span>
                  <p className="text-[11px] text-slate-500 leading-snug">Add desired Frontier stacks to the online spec builder.</p>
                </div>
                {/* Step 2 */}
                <div className="space-y-1">
                  <span className="text-emerald-400 font-bold block font-mono">02. DISPATCH MATCH</span>
                  <p className="text-[11px] text-slate-500 leading-snug">Proceed to checkout and hand dispatch details to managers.</p>
                </div>
                {/* Step 3 */}
                <div className="space-y-1">
                  <span className="text-emerald-400 font-bold block font-mono">03. BILLING CLEARST</span>
                  <p className="text-[11px] text-slate-500 leading-snug">Our managers evaluate specs and email custom billing invoices.</p>
                </div>
                {/* Step 4 */}
                <div className="space-y-1">
                  <span className="text-emerald-400 font-bold block font-mono">04. SECURE DISPATCH</span>
                  <p className="text-[11px] text-slate-500 leading-snug">Once invoiced, priority parcels or locker codes are released.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Red Banner + Safety Rules + Lockers Cards + Shipping Table */}
          <div className="lg:col-span-6 space-y-8" id="contact-right-col">
            
            {/* No In-Store Banner (Red) */}
            <div className="bg-red-950/25 border border-red-500/25 p-5 rounded-xl flex items-start space-x-4" id="contact-no-instore-alert-banner">
              <ShieldAlert className="w-8 h-8 text-red-500 shrink-0 sm:mt-1" />
              <div className="space-y-1">
                <h4 className="text-red-400 font-display font-bold text-xs uppercase tracking-wider">
                  ⚠️ NOTICE: STRICTLY NO IN-STORE RETAIL WALKS PERMITTED
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  To abide strictly with federal banking security guidelines, our storage workshops are secure industrial spaces. We carry no in-person point of sale tills or retail showcases. All purchases are arranged exclusively in advance, with secure couriers or locker releases. Attempted walk-ins will be denied access.
                </p>
              </div>
            </div>

            {/* Safety Rules List */}
            <div className="bg-[#0F1522] border border-slate-900 rounded-2xl p-6 space-y-3" id="contact-safety-rules">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-semibold">Strict Safe Handling Code (4 Rules)</span>
              
              <ul className="space-y-2 text-xs text-slate-350">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B1A] font-bold shrink-0 font-mono">✓ RULE 01:</span>
                  <span>Prop cash must never be circulated, presented, or spent as legitimate tender in public, retail, or hospitality registers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B1A] font-bold shrink-0 font-mono">✓ RULE 02:</span>
                  <span>Keep physical laminated COA certified compliance card on set at all times during scene recording loops.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B1A] font-bold shrink-0 font-mono">✓ RULE 03:</span>
                  <span>Log all stacks in and out during filming wraps to protect against accidental crew displacement.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FF6B1A] font-bold shrink-0 font-mono">✓ RULE 04:</span>
                  <span>Report lost or displaced stacks immediately to studio supervisors or local police inspectors.</span>
                </li>
              </ul>
            </div>

            {/* Locations Cards (2 cities, e.g. Toronto & Vancouver) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="contact-locations">
              {/* Toronto Card */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-2">
                <div className="flex items-center space-x-1 text-white">
                  <MapPin className="w-4 h-4 text-[#FF6B1A]" />
                  <h4 className="font-display font-semibold text-xs sm:text-sm uppercase tracking-wider">Toronto Depot</h4>
                </div>
                <p className="text-[11px] text-slate-400">Downtown East Corridor Terminal locker nodes. Servicing major union studios in Ontario.</p>
                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>24/7 Pin Entry Pickups</span>
                </div>
              </div>

              {/* Vancouver Card */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-2">
                <div className="flex items-center space-x-1 text-white">
                  <MapPin className="w-4 h-4 text-[#2E5FA8]" />
                  <h4 className="font-display font-semibold text-xs sm:text-sm uppercase tracking-wider">Vancouver Lockers</h4>
                </div>
                <p className="text-[11px] text-slate-400">North Vancouver Terminal locker node. Servicing Hollywood North productions across B.C.</p>
                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>24/7 Pin Entry Pickups</span>
                </div>
              </div>
            </div>

            {/* Shipping Table */}
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3" id="contact-shipping-table">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-semibold">Tracked Dispatch Speeds</span>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] font-mono">
                  <thead>
                    <tr className="border-b border-slate-950/40 text-slate-500">
                      <th className="pb-2">Zone</th>
                      <th className="pb-2">Speed Option</th>
                      <th className="pb-2 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-950/20 text-slate-400">
                    <tr>
                      <td className="py-2.5 font-bold text-white">Toronto Metro</td>
                      <td className="py-2.5">Same-Day Courier handoff</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">$40 CAD</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">Vancouver Metro</td>
                      <td className="py-2.5">Same-Day Courier handoff</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">$40 CAD</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">National (CA)</td>
                      <td className="py-2.5">2-4 Days secure parcel</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">$20 CAD</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">United States</td>
                      <td className="py-2.5">3-5 Days Priority Air cargo</td>
                      <td className="py-2.5 text-right font-bold text-emerald-400">$50 CAD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Floating Elements & Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
