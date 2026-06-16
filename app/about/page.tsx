"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Calendar,
  Layers,
  Heart,
  FileCheck,
  Award,
  AlertOctagon,
  XCircle,
  HelpCircle,
  Shield,
  Zap,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* 1. Hero Section with Large Background Text */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-slate-900" id="about-hero-section">
        {/* Large Bg Typography */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none z-0">
          <span className="font-display font-black text-[15vw] tracking-widest text-white uppercase whitespace-nowrap">
            EST. 2012 • FOR FILMING USE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-widest block">CREATIVE SECURITY ARCHITECTS</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none max-w-3xl mx-auto">
            The Elite Standard of Hollywood North Props.
          </h1>
          <p className="text-slate-450 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded by veteran scenic design technicians, Canadian Prop Money Systems produces photorealistic currency replicas designed specifically to shine under camera lighting while ensuring absolute federal compliance.
          </p>
        </div>
      </section>

      {/* 2. Stats Row (4 key numbers) */}
      <section className="bg-slate-950/40 border-b border-slate-900 overflow-hidden py-10" id="about-stats-row">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-400 block font-mono">14+ Years</span>
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-1 block">Production Seniority</span>
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#FF6B1A] block font-mono">$50M+</span>
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-1 block">Cinematic Spec Delivered</span>
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-blue-400 block font-mono">24 Hour</span>
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-1 block">Emergency Dispatches</span>
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-amber-500 block font-mono">0</span>
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-1 block">Legal Disruptions</span>
          </div>
        </div>
      </section>

      {/* 3. Our Story — 2-column: copy left, COA data card right */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-our-story">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy Left */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase text-[#C0397B] font-bold tracking-widest block">HOW WE COMPLY</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight">
              When Screen Representation Demanded Raw Tactility
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
              Prior to our lab&apos;s research, prop masters faced massive hurdles. Under production spot lighting, typical polymer overlays and plain printing papers reflected massive glares. Standard props felt lightweight and flat, forcing actors to look unconvincing while counting money in heist scenes.
            </p>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
              We adjusted our approach by formulating an exact 70% organic cotton and 30% linen blend. This was paired with specialized anti-glare polyurethane seals to resolve reflection glare entirely. When special effects teams requested bills that could withstand physical inspection, our offset engraving system was integrated.
            </p>
          </div>

          {/* COA Data Card Right */}
          <div className="lg:col-span-5 bg-[#0F1522] border border-slate-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden" id="about-coa-data-card-box">
            <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#6A8E4E]/5 blur-3xl rounded-full" />
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-950/55">
              <Award className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-[#F3F4F6] text-sm uppercase tracking-wide">Official COA Verification</h3>
                <span className="font-mono text-[9px] text-[#6A8E4E] tracking-widest block font-semibold">LEGISLATION MASTER AGREEMENT</span>
              </div>
            </div>

            <div className="py-6 space-y-4 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-950/30 pb-2">
                <span className="text-slate-500">SECTION COMPLIANCE:</span>
                <span className="text-white font-bold">FEDERAL LAW COMPLIANT</span>
              </div>
              <div className="flex justify-between border-b border-slate-950/30 pb-2">
                <span className="text-slate-500">PLATE MODIFICATION ID:</span>
                <span className="text-white font-bold">CPM-774-VOLTY</span>
              </div>
              <div className="flex justify-between border-b border-slate-950/30 pb-2">
                <span className="text-slate-500">REGISTERED LOCATIONST:</span>
                <span className="text-white font-bold">TORONTO / VANCOUVER DEPS</span>
              </div>
              <div className="flex justify-between border-b border-slate-950/30 pb-2">
                <span className="text-slate-500">PORTRAIT MODIFICATION:</span>
                <span className="text-white font-bold">CUSTOM VECTOR HAND-MADE</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">COA DEPT LICENSING:</span>
                <span className="text-[#FF6B1A] font-bold">LAMINATED MASTER INCLUDED</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-snug bg-slate-950/65 border border-slate-900 p-3 rounded-lg font-sans">
              &quot;We confirm that CPM prop banknote products integrate mandated alterations. They are fully certified as artistic filming instruments.&quot;
            </p>
          </div>

        </div>
      </section>

      {/* 4. Our Values — 6-card grid */}
      <section className="py-24 bg-slate-950/40 border-y border-slate-900/60" id="about-our-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center md:max-w-xl mx-auto space-y-1">
            <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">OUR DIRECTING CODE</span>
            <h2 className="font-display font-semibold text-3xl text-white tracking-tight">
              Built on strict values of security and photorealism.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-bold text-white text-base">Absolute Legal Integrity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We design and print within exact parameters recommended by governmental agencies, ensuring your security is never at hazard.
              </p>
            </div>
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3">
              <Zap className="w-5 h-5 text-[#FF6B1A]" />
              <h3 className="font-display font-bold text-white text-base">Matte Optical Coating</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We hate studio light hotspots. Our exclusive non-reflective layer eliminates glare in 4K closeup scene requirements.
              </p>
            </div>
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-bold text-white text-base">Long-Fiber Feel</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Props must feel organic. Our synthetic bills count smoothly on camera, enabling realistic counting loops.
              </p>
            </div>
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3">
              <Calendar className="w-2.5 h-2.5 text-blue-400" />
              <h3 className="font-display font-bold text-white text-base">Same-Day Logistics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                With priority courier networks, we dispatch bundles to major film studios within tight schedules.
              </p>
            </div>
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3">
              <Heart className="w-5 h-5 text-rose-500" />
              <h3 className="font-display font-bold text-white text-base">Support for Independant Art</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                From luxury studio action budgets to gritty indie student projects, we customize rates and orders fairly.
              </p>
            </div>
            <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-3">
              <FileCheck className="w-5 h-5 text-purple-400" />
              <h3 className="font-display font-bold text-white text-base">Discreet Billings</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All client catalogs and spec lists are confidential. We bill with simple, legal invoicing descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Company Timeline — 5 milestone items */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-timelines">
        <div className="mb-16 text-center md:max-w-xl mx-auto space-y-1">
          <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">THE DEPOSIT ROADMATH</span>
          <h2 className="font-display font-semibold text-3xl text-white tracking-tight">Milestones of Hollywood North Props</h2>
        </div>

        <div className="relative border-l-2 border-slate-900 ml-4 md:ml-32 space-y-12">
          {/* Milestone 1 */}
          <div className="relative pl-8 md:pl-12" id="timeline-milestone-1">
            <span className="absolute -left-[11px] top-1 bg-emerald-500 border-4 border-[#070A0F] w-5 h-5 rounded-full" />
            <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4">
              <span className="font-mono text-[#D4AF37] font-bold text-sm">2012</span>
              <h4 className="font-display font-bold text-white text-base">The Toronto Print Desk</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Founded our first printing locker in East York, Toronto, specifically creating standard bills for regional commercials and indie drama series.
            </p>
          </div>

          {/* Milestone 2 */}
          <div className="relative pl-8 md:pl-12" id="timeline-milestone-2">
            <span className="absolute -left-[11px] top-1 bg-[#FF6B1A] border-4 border-[#070A0F] w-5 h-5 rounded-full" />
            <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4">
              <span className="font-mono text-[#D4AF37] font-bold text-sm">2016</span>
              <h4 className="font-display font-bold text-white text-base">Frontier Series Engineering</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Overhauled our plates system specifically to recreate the complex ochre, green, and crimson colours of the polymer frontier series with matte non-reflective specs.
            </p>
          </div>

          {/* Milestone 3 */}
          <div className="relative pl-8 md:pl-12" id="timeline-milestone-3">
            <span className="absolute -left-[11px] top-1 bg-blue-500 border-4 border-[#070A0F] w-5 h-5 rounded-full" />
            <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4">
              <span className="font-mono text-[#D4AF37] font-bold text-sm">2019</span>
              <h4 className="font-display font-bold text-white text-base">Vancouver Depot Launch</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Expanded our security storage facilities to North Vancouver to service major international television networks filming on the West Coast.
            </p>
          </div>

          {/* Milestone 4 */}
          <div className="relative pl-8 md:pl-12" id="timeline-milestone-4">
            <span className="absolute -left-[11px] top-1 bg-[#C0397B] border-4 border-[#070A0F] w-5 h-5 rounded-full" />
            <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4">
              <span className="font-mono text-[#D4AF37] font-bold text-sm">2022</span>
              <h4 className="font-display font-bold text-white text-base">Federal Compliance Integration</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Re-registered all chemical polymer sheets to comply with local police set audits. Issued official signed COAs with all shipments.
            </p>
          </div>

          {/* Milestone 5 */}
          <div className="relative pl-8 md:pl-12" id="timeline-milestone-5">
            <span className="absolute -left-[11px] top-1 bg-amber-500 border-4 border-[#070A0F] w-5 h-5 rounded-full" />
            <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4">
              <span className="font-mono text-[#D4AF37] font-bold text-sm">2026</span>
              <h4 className="font-display font-bold text-white text-base">The Digital Order Builder</h4>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Introduced our customizable website order builder, enabling prop coordinators to pre-compile exact specifications and dispatch directly to regional storage lockers.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Scam Warning Section (Red themed) */}
      <section className="bg-red-950/20 border-t border-red-900/40 py-24 relative overflow-hidden" id="scam-warning">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-650/5 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Warning Banner */}
          <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left max-w-4xl mx-auto">
            <ShieldAlert className="w-12 h-12 text-red-500 shrink-0" />
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-red-400 text-lg sm:text-xl uppercase tracking-wider">
                FEDERAL WARNING: AVOID ILLICIT TELEGRAM PRODUCTS & COMPETING IMITATION SCAMS
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed">
                A wave of illegal Telegram accounts, sketchy counterfeit suppliers, and cheap social media pages are scamming directors and individuals by offering double-sided, un-altered &quot;real lookalike polymer&quot; notes. These operations are illegal federal counterfeit rackets, do not ship, or fail visual closeups entirely.
              </p>
            </div>
          </div>

          {/* 3 Scam Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Scam Card 1 */}
            <div className="bg-[#120F11] border border-red-900/25 rounded-xl p-5 space-y-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h4 className="font-display font-bold text-white text-sm">1. Fake Mirror Domains</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Illicit domain operations mirror reputable prop websites to steal financial data or ship cheap, low-end paper printouts with severe reflection flaws that ruin 4K filming sets.
              </p>
            </div>

            {/* Scam Card 2 */}
            <div className="bg-[#120F11] border border-red-900/25 rounded-xl p-5 space-y-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h4 className="font-display font-bold text-white text-sm">2. Telegram / Discord Cash Chains</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anonymized accounts claim they sell authentic or dual-sided bank notes. They demand cryptocurrency or steam cards upfront and exit the channel immediately once paid.
              </p>
            </div>

            {/* Scam Card 3 */}
            <div className="bg-[#120F11] border border-red-900/25 rounded-xl p-5 space-y-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h4 className="font-display font-bold text-white text-sm">3. Low-Cost Untrademarked Repros</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cheap marketplaces print directly on highly glossy cardstock. Their products fail closeups and lack necessary legal text modifications, risking criminal prosecution.
              </p>
            </div>
          </div>

          {/* Price Comparison Table (cheap vs legitimate) */}
          <div className="max-w-4xl mx-auto space-y-4" id="scam-pricing-comparison">
            <div className="text-center">
              <h4 className="font-display font-bold text-white text-sm sm:text-base uppercase tracking-wider">
                Prop Money Pricing Matrix: Legitimate vs. Counterfeit Risks
              </h4>
            </div>

            <div className="overflow-x-auto rounded-xl border border-red-900/30 bg-[#0F1014]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-red-950/20 border-b border-red-900/30 text-red-400 font-mono">
                    <th className="p-4 uppercase">Aesthetic Trait</th>
                    <th className="p-4 uppercase text-red-500">Cheap Imitations ($15 - $25)</th>
                    <th className="p-4 uppercase text-emerald-400">Canadian Prop Money ($45 - $65)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-950/20 text-slate-400">
                  <tr>
                    <td className="p-4 font-semibold text-white">Non-Reflective Layer</td>
                    <td className="p-4">❌ No. High gloss, causing camera hotspots</td>
                    <td className="p-4 text-white">✅ Yes. Spec-calibrated micro-matte varnish</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Synthetic Feel / Weight</td>
                    <td className="p-4">❌ Heavy stiff construction paper. Sticks easily</td>
                    <td className="p-4 text-white">✅ Long-fiber synthetic matching polypropylene slip coefficient</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Legal COA Certification</td>
                    <td className="p-4">❌ None. High risk under regional set audits</td>
                    <td className="p-4 text-white">✅ Signed laminated COA specifying Subsection compliance</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Plate Deviations (Legal)</td>
                    <td className="p-4">❌ None or poorly altered. Violates federal rules</td>
                    <td className="p-4 text-white">✅ Compliant altered graphics, portraits & text overlays</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Secure Delivery Logistics</td>
                    <td className="p-4">❌ Shipped in standard envelopes. High tear risk</td>
                    <td className="p-4 text-white">✅ Hard heavy-gauge tubing, tracked nationwide</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5-Step Verification Guide */}
          <div className="max-w-4xl mx-auto bg-slate-950/80 border border-slate-900 rounded-xl p-6 sm:p-8 space-y-6" id="scam-verification-guide">
            <div className="flex items-center space-x-2 text-white">
              <AlertOctagon className="w-5 h-5 text-[#FF6B1A]" />
              <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider">
                5-Step Legitimate Prop Money Verification Protocol
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center font-mono text-[10px] sm:text-xs">
              
              {/* Step 1 */}
              <div className="p-4 bg-[#0F1522] border border-slate-900 rounded-lg space-y-2">
                <span className="text-emerald-400 font-extrabold text-base block">01</span>
                <span className="text-white font-bold block uppercase leading-tight">Verify The COA</span>
                <p className="text-[10px] text-slate-500 leading-snug">Ensure a signed, physical laminated compliance license is enclosed in shipment.</p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-[#0F1522] border border-slate-900 rounded-lg space-y-2">
                <span className="text-emerald-400 font-extrabold text-base block">02</span>
                <span className="text-white font-bold block uppercase leading-tight">Test Glare</span>
                <p className="text-[10px] text-slate-500 leading-snug">Expose note at 45° angle under a heavy spot. Verified matte overlays will disperse glare.</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-[#0F1522] border border-slate-900 rounded-lg space-y-2">
                <span className="text-emerald-400 font-extrabold text-base block">03</span>
                <span className="text-white font-bold block uppercase leading-tight">Check Alterations</span>
                <p className="text-[10px] text-slate-500 leading-snug">Confirm &quot;PROP COPY&quot; Watermark is printed cleanly along the borders.</p>
              </div>

              {/* Step 4 */}
              <div className="p-4 bg-[#0F1522] border border-slate-900 rounded-lg space-y-2">
                <span className="text-emerald-400 font-extrabold text-base block">04</span>
                <span className="text-white font-bold block uppercase leading-tight">Count Speed</span>
                <p className="text-[10px] text-slate-500 leading-snug">Flick separate notes. High quality synthetic bills feel crisp and count seamlessly.</p>
              </div>

              {/* Step 5 */}
              <div className="p-4 bg-[#0F1522] border border-slate-900 rounded-lg space-y-2">
                <span className="text-emerald-400 font-extrabold text-base block">05</span>
                <span className="text-white font-bold block uppercase leading-tight">No ATM Work</span>
                <p className="text-[10px] text-slate-500 leading-snug">Pass note near retail sensors. Safe prop money will fail scans, protecting crew.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Floating elements and Order Builder */}
      <FloatingElements />

      <Footer />
    </>
  );
}
