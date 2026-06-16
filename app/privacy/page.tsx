import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export const metadata: Metadata = {
  title: "Privacy Regulations (noindex) | Canadian Prop Money Systems",
  description: "Privacy policy regarding customer transaction data for our prop money company.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="privacy-content-segment">
        <div className="space-y-2 pb-6 border-b border-white/10">
          <span className="font-mono text-xs uppercase text-[#D91E18] tracking-wider block">CPM SECURITY COMPLIANCE</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Privacy & Information Regulations
          </h1>
          <p className="text-slate-500 text-xs font-mono">Last updated: June 14, 2026 • STRICT NOINDEX ACTIVE</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
          <p>
            Canadian Prop Money Systems (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) values the confidentiality and discretion expected by professional film producers, scenic coordinators, and theatrical groups. This policy coordinates how we compile, store, and process logistics data collected through Site interactions.
          </p>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">1. Sourced Information</h3>
            <p>
              We compile data strictly necessary to complete logistics inquiries. This includes customer name, film studio credentials, corporate email coordinates, telephone numbers, and secure delivery addresses provided in the order checkout builders.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">2. Zero Default Cookies</h3>
            <p>
              We operate a lightweight, high-speed website to maximize Core Web Vitals. No marketing cookies, tracking pixels, or advertisement widgets from third-party networks (Google AdSense, Meta, etc.) are embedded, protecting your browser anonymity.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-display font-semibold text-base uppercase tracking-wider">3. Retention & Compliance Disclosures</h3>
            <p>
              We preserve customer invoice histories on-site securely. However, because our products are high-fidelity currency replicas, we coordinate with the Bank of Canada and federal investigators. Data is never shared or sold unless mandated by legal warrant or during active compliance audits resulting from public misuse of duplicates.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-[#FF6B1A] font-display font-semibold text-base uppercase tracking-wider">4. Contact Admin Desk</h3>
            <p>
              If you have questions regarding database records or want to scrub your production logbook from our records after a wrap, contact manager desks via sales@canadianpropmoney.org.
            </p>
          </div>
        </div>
      </section>

      <FloatingElements />

      <Footer />
    </>
  );
}
