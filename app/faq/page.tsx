"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQItem[];
}

const FAQ_DATABASE: FAQCategory[] = [
  {
    id: "buying",
    name: "Buying & Ordering",
    faqs: [
      {
        q: "How can I buy premium prop money on this website?",
        a: "Order lists can be drafted directly in our interactive checkout order builder. Once you compile your selected stacks, clicking 'Proceed to Checkout' passes your specification list directly to our dispatch desk. We will verify your production details and email secure billing invoices. No transactions occur directly on the browser."
      },
      {
        q: "What payment configurations do you accept?",
        a: "We support major secure, discrete transactional methods. This includes secure cryptocurrency transfers (BTC, USDT, USDC, ETH), Interac E-Transfers across Canada, PayPal (Friends & Family), and Mastercard (via discrete invoice billing links sent upon checking)."
      },
      {
        q: "Is there a minimum order count for film sets?",
        a: "Our single denomination Frontier stacks start from $35, which is accessible for low-budget student projects. There are no strict minimum items, though value bundles like the Director's Vault Bundle offer substantial discounts for production departments."
      },
      {
        q: "Can I coordinate custom bill configurations?",
        a: "Absolutely! If our standard bundles do not match your exact heist scene specs, you can specify your desired custom denominations in the 'Order Notes' during checkout of the Hollywood North Jumbo Pack."
      }
    ]
  },
  {
    id: "compliance",
    name: "Legal Compliance",
    faqs: [
      {
        q: "Is it completely legal to own prop Canadian bills?",
        a: "Yes! Owning and utilizing our prop money in theatrical plays, movie sets, educational training, and advertising is 100% legal under federal guidelines. We re-engineer the currency plates to integrate altered features, portraits, and a permanent watermark stating 'FOR MOTION PICTURE USE ONLY' to ensure compliance with federal prop regulations."
      },
      {
        q: "Do police departments audit film sets over prop money?",
        a: "Yes. Metropolitan police departments (especially in Toronto and Vancouver) may inspect movie sets, particularly during street action scenes or bank-heist sequences. Every CPM order includes a laminated, signed Certificate of Authenticity (COA) specifying Subsection compliance. Keep this license on set to show inspectors!"
      },
      {
        q: "Can your prop money be scanned in ATMs or retail tills?",
        a: "No. Our bills do not include bank-grade magnetic security strips, real holographic optical grids, or original polymers. Any attempt to use our props in vending machines or automated cash registers will fail, keeping your crew legally safe from counterfeiting claims."
      },
      {
        q: "Are the prop bills printed on both sides?",
        a: "Yes, our stacks feature double-sided, high-resolution prints. To comply with Bank of Canada guidelines, we incorporate prominent legal markings ('PROP COPY', 'FOR FILM USE') within the graphics to prevent transactional misuse."
      }
    ]
  },
  {
    id: "quality",
    name: "Product & Quality",
    faqs: [
      {
        q: "How do you stop studio lighting reflection hotspots?",
        a: "Cheap glossy paper creates giant white hotspots under film lights. Our bills receive an exclusive micro-matte non-reflective coat. This disperses incoming rays to maintain accurate green, red, and golden banknote tones even under heavy spot arrays."
      },
      {
        q: "Do the bills feel like real Canadian polymer?",
        a: "While polymer materials are legally reserved, we print props on heavy-gauge synthetic long-fiber sheets. They mimic the slip coefficient and count factor of polymer, enabling realistic handling and counting loops by actors."
      },
      {
        q: "Are the bills pre-aged or brand new?",
        a: "Our standard stacks are issued in crisp, brand new conditions (resembling newly printed bills). If your scene requires distressed, street-used bills, you can gently crinkle and distress individual sheets by hand without damaging the matte ink bond."
      },
      {
        q: "What is the resolution detail on close-ups?",
        a: "Our replicas are printed under 2400 DPI physical vectors. Portrait engraving details, micro-borders, and currency typography render beautifully crisp, even under closeups on 8K anamorphic cinemaglobes."
      }
    ]
  },
  {
    id: "delivery",
    name: "Logistics & Delivery",
    faqs: [
      {
        q: "What are your standard shipping speeds?",
        a: "We offer Same Day Courier Express ($40) within Toronto and Vancouver metros. Normal Tracked Shipping ($20) takes 2-4 business days across Canada, and secure U.S. priority express shipping is standard $50."
      },
      {
        q: "Do you support immediate locker pickups?",
        a: "Yes! For major studio departments on tight timelines, we maintain emergency secure lockers in central Toronto and North Vancouver, where you can pick up pre-billed packages 24/7."
      },
      {
        q: "Are shipping packages discreet?",
        a: "Always. We ship in heavy-duty impact-proof heavy cardboard tubes or generic shipping parcels without any 'Counterfeit' or 'Prop Money' labels, ensuring secure delivery to your studio or office."
      }
    ]
  },
  {
    id: "bulk",
    name: "Bulk Rates & Custom Services",
    faqs: [
      {
        q: "Do you support commercial lease options for large volume scenes?",
        a: "For background vault fillers or scene briefcases requiring millions in prop wealth, we coordinate bulk pricing contracts. Reach out to our billing desk via sales@canadianpropmoney.org."
      },
      {
        q: "Is there a discount for recurring television series?",
        a: "Yes! We run partnership programs for union productions, scenic agencies, and theater groups. Registered studios enjoy priority locker dispatches and bulk ledger terms."
      }
    ]
  },
  {
    id: "safe-handling",
    name: "Safe Handling Guidelines",
    faqs: [
      {
        q: "Can I leave prop money in vehicles or on set overnight?",
        a: "No! Secure logistics require prop coordinators to log and secure all prop money stacks at wrapping time. Under no circumstances should crew members leave props visible in vehicles, as this can trigger public panic or local enforcement alerts."
      },
      {
        q: "Can the prop notes be ironed or steamed?",
        a: "We do not recommend direct hot ironing, which can damage the synthetic matte overlays. If bills require quick flattening, press them under heavy books inside a cool, dry folder."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Create FAQ schema dynamically for search engine crawling
  const schemaList = FAQ_DATABASE.flatMap((cat) => cat.faqs).map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }));

  const faqSchemaJSON = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaList
  };

  // Filter FAQs based on query and tab
  const filteredDatabase = FAQ_DATABASE.map((cat) => {
    // Filter the items of each category
    const matches = cat.faqs.filter((faq) => {
      const qMatch = faq.q.toLowerCase().includes(searchQuery.toLowerCase());
      const aMatch = faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return qMatch || aMatch;
    });

    return {
      ...cat,
      faqs: matches
    };
  }).filter((cat) => {
    // Category match
    if (activeTab !== "all" && cat.id !== activeTab) return false;
    return cat.faqs.length > 0;
  });

  return (
    <>
      <Navbar />

      {/* Inject FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJSON) }}
      />

      {/* Hero Header */}
      <section className="bg-slate-950/40 border-b border-slate-900 py-16 relative overflow-hidden" id="faq-hero-block">
        <div className="absolute top-1/2 left-1/4 w-[250px] h-[250px] bg-blue-600/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <nav className="flex justify-center items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-2" aria-label="Breadcrumb navigation trail">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-[#FF6B1A]">FAQ Database</span>
          </nav>
          
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none max-w-2xl mx-auto">
            Logistical, Legal & Technical FAQs
          </h1>
          <p className="text-slate-450 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Need clarifications regarding federal duplication guidelines compliance, priority logistics pick-ups, or camera performance? Search our comprehensive database below.
          </p>

          {/* Search bar filtering questions in real time */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search compliance, shipping, coating, or payment questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F1522] border border-slate-900 focus:border-[#FF6B1A]/40 outline-none rounded-xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white transition-all shadow-inner placeholder:text-slate-600"
              id="faq-realtime-search-bar"
            />
          </div>
        </div>
      </section>

      {/* Main FAQ Board */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="faq-board-segment">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sticky Sidebar with Category Navigation */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-4" id="faq-sticky-sidebar">
              <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase block pl-3">Skip To Segment</span>
              <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-3 flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`w-full text-left py-2 px-3 text-xs font-medium rounded transition-all ${
                    activeTab === "all"
                      ? "bg-[#FF6B1A]/10 text-white border-l-2 border-[#FF6B1A]"
                      : "text-slate-450 hover:text-white"
                  }`}
                >
                  All Categories ({FAQ_DATABASE.length})
                </button>
                {FAQ_DATABASE.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full text-left py-2 px-3 text-xs font-medium rounded transition-all ${
                      activeTab === cat.id
                        ? "bg-[#FF6B1A]/10 text-white border-l-2 border-[#FF6B1A]"
                        : "text-slate-450 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Lists */}
          <div className="lg:col-span-3 space-y-12">
            {filteredDatabase.map((cat) => (
              <div key={cat.id} className="space-y-6" id={`faq-cat-${cat.id}`}>
                <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                  <HelpCircle className="w-5 h-5 text-[#FF6B1A]" />
                  <h3 className="font-display font-semibold text-lg text-white uppercase tracking-wider">
                    {cat.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {cat.faqs.map((faq, idx) => (
                    <div
                      key={faq.q}
                      className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-2 select-none"
                    >
                      <h4 className="font-display font-semibold text-white text-sm sm:text-base pr-4">
                        {faq.q}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1.5 border-t border-slate-900/40 mt-1">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filteredDatabase.length === 0 && (
              <div className="text-center py-20 bg-[#0F1522] border border-slate-900 p-8 rounded-xl space-y-4">
                <span className="text-3xl">🔍</span>
                <p className="text-slate-400 font-mono text-xs">No matching questions found in catalog database.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 rounded font-mono text-xs"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* High-impact bottom CTA */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-900/60" id="faq-cta-bottom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <MessageCircle className="w-10 h-10 text-emerald-400 mx-auto" />
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-2xl text-white">Have a unique production specification?</h3>
            <p className="text-slate-450 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              If your heist scene, music video, or background vault setup requires customized dimensions, distressing, or custom bundles, contact our dispatcher direct.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 py-3 px-8 bg-[#FF6B1A] hover:bg-[#e05a10] text-slate-950 font-bold text-xs tracking-wider uppercase rounded-md shadow-md active:scale-95 transition-all"
            id="faq-bottom-cta-btn"
          >
            <span>Speak with dispatch desk</span>
            <ArrowRight className="w-4 h-4 text-slate-950 font-bold" />
          </Link>
        </div>
      </section>

      {/* Floating Elements & Dynamic Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
