import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export const metadata: Metadata = {
  title: "Terms of Filming Use (noindex) | Canadian Prop Money Systems",
  description: "Terms and regulations regarding utilization of our currency replicas.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="terms-content-segment">
        <div className="space-y-2 pb-6 border-b border-slate-900">
          <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">CPM LEGAL CODE</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Terms of Representative Filming Use
          </h1>
          <p className="text-slate-500 text-xs font-mono">Last updated: June 14, 2026 • STRICT NOINDEX ACTIVE</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
          <p>
            Welcome to the Canadian Prop Money website (the &quot;Site&quot;). By exploring our catalog, pre-building specifications, requesting custom quotes, or purchasing our prop money products, you enter into a binding, legal agreement governed by these Terms of Use and federal prop copying regulations.
          </p>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">1. Legal Filming Certification</h3>
            <p>
              All products sold by Canadian Prop Money are designed and manufactured strictly for theatrical, cinematic, training, commercial media, and illustrative use. Under no circumstances may our props be circulated or presenting in real retail settings, restaurants, banks, or vending registers. Doing so constitutes a severe federal offense (counterfeiting/fraud) which carries severe prosecution.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">2. Registration & Traceability</h3>
            <p>
              To maintain absolute transparency under set audits, Canadian Prop Money log all customer invoices, delivery addresses, and WhatsApp coordinates. We coordinate with national security agencies and investigative divisions. By buying our prop money, you agree that we may share logistics histories with domestic agencies (RCMP, regional police desks) if any related products are found in public circulation avenues.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">3. Non-Reflective Coating Limitations</h3>
            <p>
              Our exclusive non-reflective matte lacquer is calibrated to perform under cinematic lightings (ARRI, Red camera rigs). We make no guarantee that products will pass physical scans in teller automation or automatic counts, as they are intentionally recompiled without active holograms or metallic foil layers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">4. Billing and Quote Invoicing</h3>
            <p>
              Completion of order builders constitutes a custom request, not a finished checkout deal. No browser payment models occur by default. Our accounting desk emails discrete transactional billing details and invoices, matching safety parameters. All sales are final once express parcels have left our shipping centrally.
            </p>
          </div>
        </div>
      </section>

      <FloatingElements />

      <Footer />
    </>
  );
}
