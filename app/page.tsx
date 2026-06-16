"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Printer,
  ShieldAlert,
  Compass,
  CheckCircle,
  Truck,
  DollarSign,
  HelpCircle,
  MessageCircle,
  Package,
  Layers,
  Award,
  ChevronDown,
  ArrowRight,
  Shield,
  ShieldCheck,
  Clock,
  ThumbsUp,
  Landmark
} from "lucide-react";
import { PRODUCTS, FAQ_CATEGORIES } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

// Individual Product Card Component to handle interactive UI changes per product
function HomepageProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const { addToOrder } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedVariant = product.variants[selectedVariantIdx];
  const price = selectedVariant.price;
  const originalPrice = product.originalPrice 
    ? Math.round(product.originalPrice * (selectedVariant.billCount / 100)) 
    : undefined;

  const handleAdd = () => {
    setIsAdded(true);
    addToOrder(product.name, product.slug, selectedVariant.name, price, 1);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="glass-card rounded-xl p-5 border border-slate-900 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-[#FF6B1A]/20 hover:shadow-xl hover:shadow-black/50 overflow-visible"
      id={`product-card-${product.id}`}
      data-sp={price}
      data-sv={selectedVariant.name}
    >
      <div className="relative">
        {/* Badge & Category Tag */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#6A8E4E] bg-emerald-950/30 px-2 py-1 rounded">
            {product.category}
          </span>
          {product.badge && (
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-950 bg-amber-400 px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-4 bg-slate-950/80 border border-slate-900 group">
          <img
            src={product.imageSet[0]}
            alt={product.name}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${product.id.includes("100") ? "from-amber-950/20" : "from-[#070A0F]/40"} to-transparent`} />
          <div className="absolute bottom-2 left-2 flex space-x-1">
            <span className="font-mono text-[9px] bg-slate-950/85 text-slate-400 px-2 py-0.5 rounded border border-white/5 uppercase">
              HD FILM GRADE
            </span>
          </div>
        </div>

        {/* COA Strip */}
        <div className="bg-[#101912] border border-emerald-900/30 rounded p-2 mb-3.5 flex items-center space-x-1.5 glow-primary">
          <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[10px] text-emerald-400 font-mono tracking-tight leading-tight">
            Registered COA Included (Legally Compliant)
          </span>
        </div>

        {/* Name and Tagline */}
        <h3 className="font-display font-semibold tracking-tight text-base sm:text-lg mb-1 leading-snug">
          <Link href={`/products/${product.slug}`} className="text-white hover:text-[#FF6B1A] transition-colors duration-200">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-slate-400 leading-normal mb-4 min-h-[48px]">
          {product.description}
        </p>

        {/* Variant Selectors with Dropdown Menu */}
        <div className="space-y-1.5 mb-5 relative" ref={dropdownRef}>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
            Select Spec Stack Size
          </span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] rounded transition-all bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-white font-medium text-left focus:outline-none cursor-pointer"
              aria-expanded={isDropdownOpen}
              aria-label="Select stack size variation"
            >
              <span className="truncate pr-2 flex items-center space-x-2">
                <span className="text-white">{selectedVariant.name}</span>
                {selectedVariant.savingsLabel && (
                  <span className="bg-emerald-600/25 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0">
                    {selectedVariant.savingsLabel}
                  </span>
                )}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 bg-slate-950/95 border border-slate-800 rounded-lg shadow-2xl z-50 py-1 divide-y divide-slate-900/60 overflow-hidden backdrop-blur-md">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => {
                      setSelectedVariantIdx(idx);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[11px] text-left transition-colors ${
                      selectedVariantIdx === idx
                        ? "bg-[#FF6B1A]/10 text-white font-semibold"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <span className="truncate pr-2">{v.name}</span>
                    <div className="flex items-center space-x-2 shrink-0">
                      {v.savingsLabel && (
                        <span className="bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono">
                          {v.savingsLabel}
                        </span>
                      )}
                      <span className="text-slate-300 font-mono text-[10px]">${v.price.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Add Trigger */}
      <div className="border-t border-slate-900/60 pt-4 mt-auto">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-500 font-mono">SPEC PRICE:</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              ${price.toFixed(2)}
            </span>
            <span className="text-[9px] text-slate-500 font-mono">CAD</span>
          </div>
          {originalPrice && (
            <span className="text-xs text-slate-500 line-through font-mono">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="py-2.5 px-3 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-900 hover:border-slate-850 text-center text-xs font-semibold rounded transition-all active:scale-95"
            aria-label={`View details of ${product.name}`}
          >
            View Details
          </Link>
          <button
            onClick={handleAdd}
            className={`py-2.5 px-3 font-bold text-xs rounded uppercase tracking-wider transition-all active:scale-95 text-center ${
              isAdded
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40"
                : "bg-[#FF6B1A] hover:bg-[#e05a10] text-slate-950"
            }`}
            aria-label={`Add ${product.name} to order`}
          >
            {isAdded ? "✓ Added!" : "Add To Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { totalItems } = useCart();
  const [faqOpen, setFaqOpen] = useState<number[]>([0]); // first open by default

  const toggleFaq = (index: number) => {
    if (faqOpen.includes(index)) {
      setFaqOpen(faqOpen.filter((i) => i !== index));
    } else {
      setFaqOpen([...faqOpen, index]);
    }
  };

  // Get first 6 FAQs for the homepage
  const homepageFaqs = FAQ_CATEGORIES.flatMap((c) => c.faqs).slice(0, 6);

  // High-performance SEO Schema Markup
  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Canadian Prop Money Ltd.",
      "url": "https://canadianpropmoney.org",
      "logo": "https://canadianpropmoney.org/logo.webp",
      "description": "Canada's premium, most trusted realistic currency reproduction company for film, TV, theatrical productions, and training.",
      "sameAs": [
        "https://www.facebook.com/canadianpropmoney",
        "https://www.instagram.com/canadianpropmoney"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Canadian Prop Money",
      "url": "https://canadianpropmoney.org",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://canadianpropmoney.org/products?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://canadianpropmoney.org"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": homepageFaqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Prop Money Canada Collection",
      "url": "https://canadianpropmoney.org/products",
      "description": "Browse and buy certified Canadian Prop Money banknotes and realistic prop cash packages for film, TV production, music videos, and photoshoot sets.",
      "hasPart": PRODUCTS.map(p => ({
        "@type": "Product",
        "name": p.name,
        "description": p.description,
        "image": "https://canadianpropmoney.org" + p.imageSet[0],
        "category": p.category,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "CAD",
          "lowPrice": p.variants[0]?.price || 40,
          "highPrice": p.variants[p.variants.length - 1]?.price || 150,
          "offerCount": p.variants.length
        }
      }))
    }
  ];

  return (
    <>
      <Navbar />

      {/* Structured Schema */}
      {schemaMarkup.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32" id="homepage-hero-block">
        {/* Large background typography */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none z-0">
          <span className="font-display font-extrabold text-[12vw] sm:text-[10vw] tracking-widest leading-none text-white whitespace-nowrap">
            MONTREAL • TORONTO • VANCOUVER
          </span>
        </div>

        {/* Ambient background glows representing different currency colours */}
        <div className="absolute top-1/4 left-10 w-[250px] h-[250px] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 bg-emerald-950/45 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] sm:text-xs font-mono font-medium text-emerald-400 tracking-wide uppercase">
                  Approved Bank of Canada Legal Modifications Applied
                </span>
              </div>

              {/* H1 Primary Header - Section 1 optimized */}
              <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight uppercase font-sans">
                Canadian Prop Money & <br />
                <span className="text-[#D91E18]">
                  Cinema Replicas.
                </span>
              </h1>

              {/* Subheading - Section 1 optimized */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Engineered for pristine high-definition screen presence, our non-glare, photorealistic <strong>Canadian Prop Money</strong> matches the thickness, dimensional precision, and weight of circulating notes under 4K and 8K scrutiny. Fully cleared for domestic media productions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-[#D91E18] hover:bg-[#b81712] text-white font-bold text-center text-xs tracking-widest uppercase rounded-none border border-white/10 active:scale-[0.98] transition-all"
                >
                  Explore Stacks Catalog
                </Link>
                <Link
                  href="/about#scam-warning"
                  className="px-8 py-4 bg-slate-900/60 hover:bg-slate-850 hover:text-white text-slate-300 text-center text-xs font-bold tracking-widest uppercase rounded-none border border-white/10 transition-all"
                >
                  Legal Safety Brief
                </Link>
              </div>

              {/* Section 3: Why Productions Use Prop Money (250-300 words) - Placed below trust badges */}
              <div className="pt-6 border-t border-white/10 max-w-xl space-y-4">
                <h3 className="font-sans font-semibold text-xs text-[#FF6B1A] uppercase tracking-wider">
                  The Critical Role of Professional Prop Money Canada on Set
                </h3>
                <div className="font-sans text-xs text-slate-400 leading-relaxed space-y-3">
                  <p>
                    Bringing authentic currency onto creative sets introduces severe liability, theft exposures, and massive insurance premiums for director houses. Professional crews instead choose specialized <strong>Prop Money Canada</strong> for their replica cash needs. High-quality, modern <strong>Film Prop Money</strong> is engineered to withstand extreme closeup camera movements. Standard bond paper copies look cheap and flat, reflecting hot studio lights as blinding white hotspots. Our custom cotton-poly synthetic substrates disperse glare flawlessly to guarantee real contrast index.
                  </p>
                  <p>
                    Furthermore, premium <strong>Movie Prop Money</strong> coordinates realistic slip index, enabling actors to stack and count money naturally without friction or sticking. From detailing vault scenes for TV dramas to simple retail checkouts, using certified replica currency provides legal protection and visual safety across your entire creative production timeline.
                  </p>
                </div>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-6 border-t border-white/10 max-w-lg grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Compliance</span>
                  <span className="text-white font-bold font-display text-xs sm:text-sm flex items-center gap-1">
                    Legal Compliance <CheckCircle className="w-3.5 h-3.5 text-[#D91E18]" />
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Coating</span>
                  <span className="text-white font-bold font-display text-xs sm:text-sm">
                    Non-Reflective
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Delivery</span>
                  <span className="text-white font-bold font-display text-xs sm:text-sm">
                    Same-Day Courier
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Product Artwork Right */}
            <div className="lg:col-span-5 relative" id="hero-artwork-segment">
              <div className="relative w-full max-w-[430px] mx-auto aspect-square rounded-none overflow-hidden glass-card p-4 border border-white/10 flex items-center justify-center glow-red">
                <img
                  src="/hero1.png"
                  alt="Elite Canadian Banknote Props Artwork"
                  className="rounded-xl w-full h-full object-cover opacity-85"
                />
                {/* Floating highlight cards inside hero */}
                <div className="absolute top-6 right-6 bg-[#0F1522]/90 backdrop-blur-md border border-amber-500/30 p-3 rounded-lg flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase font-bold">$100 Frontier Maple Ready</span>
                </div>
                <div className="absolute bottom-6 left-6 bg-[#0F1522]/90 backdrop-blur-md border border-emerald-500/30 p-3 rounded-lg flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[9px] tracking-widest text-[#6A8E4E] uppercase font-bold">$20 Frontier Spruce Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Horizontal Scroll Strip: Autoscrolling feature ribbon */}
      <section className="w-full bg-slate-950/60 border-y border-slate-900 overflow-hidden py-4 text-slate-400 text-xs font-mono select-none" id="horizontal-features-strip">
        <div className="animate-marquee inline-flex space-x-12">
          <span>👑 NON-GLARE TECH LAYER (MATTE FINISH)</span>
          <span>💎 Polymer-Feel Synthetic Base Sheets</span>
          <span>📐 Absolute Microtext Graphics Alteration</span>
          <span>🎬 Ultra HD 4K, 8K & Cine-Lens Optimized</span>
          <span>🎨 Exact Original Colour Channel Replication</span>
          <span>📂 Official Studio Certified Authentication Coas Included</span>
          {/* Repeat */}
          <span>👑 NON-GLARE TECH LAYER (MATTE FINISH)</span>
          <span>💎 Polymer-Feel Synthetic Base Sheets</span>
          <span>📐 Absolute Microtext Graphics Alteration</span>
          <span>🎬 Ultra HD 4K, 8K & Cine-Lens Optimized</span>
          <span>🎨 Exact Original Colour Colour Replication</span>
          <span>📂 Official Studio Certified Authentication Coas Included</span>
        </div>
      </section>

      {/* Section 2 – What Is Prop Money? (300–400 words) */}
      <section className="py-20 bg-[#070A0F]/60 border-b border-slate-900 relative" id="what-is-prop-money">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-600/[0.02] blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase text-[#D91E18] tracking-widest block font-semibold">
                Comprehensive Cine Guide
              </span>
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                What Is Realistic Prop Money and How is it Crafted?
              </h2>
              <div className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed space-y-4">
                <p>
                  When viewing high-stakes bank heists, suitcase trades, or premium music videos, the cash stacks captured on screen are designated as professional <strong>Prop Money</strong>. Meticulously designed replica bank bills are key artistic props created to simulate the exact visual weight and presence of genuine currency. In cinema, television, theater, and marketing, prop currency acts as an essential driver of visual realism, maintaining the audience’s suspension of disbelief without the danger of carrying real cash on location.
                </p>
                <p>
                  Real banknotes incorporate dozens of intricate, highly protected features (like color-shifting ribbons, raised intaglio plate engraving, and magnetic seals) specifically made to deter reproduction. Because of this, high-performance <strong>Canadian Prop Money</strong> is designed from the ground up with strict, law-compliant alterations. By adjusting individual portrait characteristics, swapping tiny text segments, tweaking dimensional boundaries, and substituting optical security foils under Bank of Canada regulations, we produce a product that looks completely genuine to camera lenses while remaining completely useless to automatic vending or scanning machines.
                </p>
                <p>
                  Whether you are an independent filmmaker coordinating a small table transition or a seasoned art director filling a secure glass vault, selecting high-grade production supplies ensures that your set remains safe, fully legal, and visually flawless. This mock cash ensures absolute legal peace of mind while conveying a premium physical weight that adds a tangible touch of realism for your actors during live physical counting.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="p-6 border border-white/10 rounded-xl bg-slate-950/80 shadow-2xl space-y-4">
                <h3 className="font-display font-semibold text-xs text-emerald-400 uppercase tracking-wider font-mono">
                  Tactile Alterations & Compliance Standards
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Real prop materials implement precise legal modifications to comply with counterfeiting laws:
                </p>
                <ul className="space-y-3.5 text-xs text-slate-400 font-mono">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF6B1A] mt-1 shrink-0">✔</span>
                    <span><strong>Dual-Sided Text:</strong> Overlaid with explicit, high-contrast, camera-concealed markings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF6B1A] mt-1 shrink-0">✔</span>
                    <span><strong>&quot;Motion Picture&quot; Labeling:</strong> Conspicuously features legal clear warnings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#FF6B1A] mt-1 shrink-0">✔</span>
                    <span><strong>No Holographic Foils:</strong> Formulated without optical metallics to prevent hot spot flares under 8K cine lenses.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features / Precision Section */}
      <section className="py-24 relative overflow-hidden" id="precision-specifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Column */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="relative rounded-none overflow-hidden bg-slate-950/80 border border-white/10 p-3 aspect-[4/3] max-w-[480px] mx-auto">
                <img
                  src="/OIP.webp"
                  alt="Prop Money Detailed Inspection under Cine Grid"
                  className="w-full h-full object-cover rounded-none opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-none border border-white/10">
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">Camera Test Report</span>
                  <p className="text-xs text-white font-semibold mt-1">
                    &quot;Passed ARRI Alexa color testing with zero hot spots or visual glare under 5000W spots.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Copy Column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase text-[#D91E18] tracking-wider block">THEATRIC DESIGN ETHOS</span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Designed to Capture perfectly under Cinema Studio Lights.
              </h2>
              <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                Cheap replica prop money reflections render bills unreadable as bright glowing blobs, instantly ruining the scene&apos;s tension. Our proprietary anti-reflective matte coating disperses standard studio lighting.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 bg-slate-950 border border-slate-900 w-fit p-1.5 rounded-lg">
                    <Layers className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-display font-semibold text-white text-sm">Polymer Slip Factor</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Printed on high-density German synthetic substrate matching the slip index of polymer, enabling seamless actor-hand counting without static friction.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 bg-slate-950 border border-slate-900 w-fit p-1.5 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                  </div>
                  <h4 className="font-display font-semibold text-white text-sm">100% Legal Clearance</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Includes meticulously designed graphic adjustments that bypass bank automation, keeping directors and cashiers legally fully protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Products Grid Section */}
      <section className="py-24 bg-slate-950/40 border-t border-slate-900/60" id="products-catalog-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">REGULATED VAULT SECTIONS</span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight">
              Premium Canadian Banknote replica Stacks
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strictly cleared for cinematography use, available in individual polymer-style strapped bundles or curated production-ready suitcase packs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <HomepageProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 – Photography, Music Videos & Training (250–300 words) */}
      <section className="py-24 bg-slate-950/20 border-t border-slate-900/60 relative overflow-hidden" id="photography-music-training">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block font-semibold">
                Versatile Media Applications
              </span>
              <h2 className="font-display font-medium text-3xl text-white tracking-tight">
                Photography Props, Music Videos & Training Simulations
              </h2>
              <div className="font-sans text-xs sm:text-sm text-slate-440 leading-relaxed space-y-4">
                <p>
                  Outside of traditional long-form theatrical and cinematic sets, professional-grade <strong>Prop Money</strong> serves an extensive spectrum of creative and instructional needs. In editorial fashion photography, high-concept portfolio displays, and print campaigns, currency is repeatedly featured as a bold thematic subject or high-contrast filler prop. Standard copy sheets feel weightless and look artificial under close focus, but our premium <strong>Realistic Prop Money</strong> provides the authentic depth, precise thickness, and crisp paper edges required for microscopic macro lenses.
                </p>
                <p>
                  In the music entertainment sector, high-energy music videos rely on cash stacks to project raw visual weight. Rapid physical movements, drone passes, and dynamic strobe lights can wash out cheap replicas, reducing them to blank paper cutouts. Our custom bills maintain deep contrast parameters, precise detailing, and visual strength under intense lasers and flashing stages.
                </p>
                <p>
                  Furthermore, national financial institutes, police academies, security companies, and corporate teams utilize our prop notes to conduct realistic checkout training drills, bank heist simulation scenarios, and retail counting checks. Preparing staff with life-like copies allows teams to develop robust response protocols in safe, compliant scenarios.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-500 font-mono block uppercase">Music Videos</span>
                <p className="text-xs text-slate-400 mt-2">Durable under high-intensity strobe rigs; maintains color fidelity on camera pans.</p>
              </div>
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[10px] text-slate-500 font-mono block uppercase">Photography</span>
                <p className="text-xs text-slate-400 mt-2">Realistic paper tactile quality and deep colors for macro lens closeups.</p>
              </div>
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-900 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-mono block uppercase">Tactical Academies & Corporate Training</span>
                <p className="text-xs text-slate-400 mt-2">Perfect weight and bundle styling matching commercial guidelines to teach compliance and handling safety protocols.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Proven Data / Stats Section */}
      <section className="py-20 relative bg-[#070A0F]" id="proven-stats-indicators">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 text-center shadow-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-display font-extrabold text-3xl sm:text-4xl block">
                12,000+
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-mono tracking-wider mt-2 block">
                Stacks Distributed
              </span>
            </div>
            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 text-center shadow-lg">
              <span className="text-[#FF6B1A] font-display font-extrabold text-3xl sm:text-4xl block">
                100%
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-mono tracking-wider mt-2 block">
                Legal Compliance
              </span>
            </div>
            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 text-center shadow-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 font-display font-extrabold text-3xl sm:text-4xl block">
                180+
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-mono tracking-wider mt-2 block">
                Cine Productions
              </span>
            </div>
            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 text-center shadow-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 To-yellow-500 font-display font-extrabold text-3xl sm:text-4xl block">
                0
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-mono tracking-wider mt-2 block">
                Legal Compliance Issues
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 – Canadian Prop Money for Film & TV (250–300 words) */}
      <section className="py-24 bg-[#0A0D14] border-t border-b border-slate-900 relative" id="film-tv-prop-guide">
        {/* Decorative background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-widest block">
                Creative Production Supplies
              </span>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight">
                Pristine Canadian Prop Money for Film & Television Sets
              </h2>
              <div className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed space-y-4">
                <p>
                  In major global motion picture hubs like Montreal, Toronto, and Vancouver, prop masters require certified <strong>Canadian Prop Money</strong> to fulfill strict art-direction and federal compliance standards. Modern digital cinema systems equipped with ultra-sharp prime lenses capture every detail of a stage in raw detail. Traditional flat-printed bills fail camera inspections due to inaccurate color representations, but our specialized duplication plates undergo meticulous pigment calibration to match real-world Maple Green, Frontier Amber, and Spruce Spruce polymer/paper tones flawlessly.
                </p>
                <p>
                  When selecting <strong>Prop Money Canada</strong>, respecting local laws is just as vital as securing physical authenticity. Our custom vectors contain hand-carved portrait variations, asymmetrical detail lines, altered text identifiers, and distinct &quot;FOR MOTION PICTURE USE ONLY&quot; elements. This allows close-focus camera pans to run smoothly without creating any financial hazard or legal violations. Give your camera crew the confidence they need.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-slate-950/40 p-6 rounded-xl border border-slate-900 space-y-4">
              <h3 className="font-mono text-xs text-[#FF6B1A] uppercase block font-semibold">Camera Spec Verification</h3>
              <div className="space-y-3.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span>Color Gamut:</span>
                  <span className="text-emerald-400">Cine-Match Calibrated</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span>Backlight Angle:</span>
                  <span className="text-emerald-400">Low-glare Dispersal</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span>Certification:</span>
                  <span className="text-emerald-400">Registered COA Attached</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Cards/Features Bento Grid: White background section transition */}
      <section className="py-24 bg-[#F8FAFC] text-slate-900" id="editorial-bento-grid-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:max-w-xl mb-16 space-y-3">
            <span className="font-mono text-xs uppercase text-[#C0397B] font-bold tracking-widest block">
              OPERATIONAL COMPLIANCE
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-slate-950 tracking-tight">
              Built Securely. Handled Legally. Shipped Safely.
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We operate at the intersection of cinematic artistry and regulatory safety, providing film professionals complete peace of mind across production cycles.
            </p>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bento Card 1: 8cols top row */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="max-w-md space-y-3">
                <Printer className="w-6 h-6 text-[#C0397B]" />
                <h3 className="font-display font-bold text-xl text-slate-950">
                  Cinema-Grade Precision Printing
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Our prop banknotes are manufactured using high-fidelity industrial offset printing presses. We apply specialized non-glare matte coatings, ultra-crisp lithographic plate-aligned ink layering, and authentic physical texture bonding. Each individual bill undergoes rigorous micrometer-level mechanical cutting to guarantee realistic edge profile and feel under high-definition cameras.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center space-x-2 text-xs font-mono font-bold text-[#C0397B] uppercase">
                <span>Explore our craftsmanship process</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bento Card 2: 4cols top row */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <ShieldAlert className="w-6 h-6 text-orange-600" />
                <h3 className="font-display font-bold text-lg text-slate-950">
                  Strict Anti-Scam Policy
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Canadian Prop Money objects are created specifically for cameras. We maintain a zero-tolerance policy against scams, transactional double-counting, or street misuse. All orders are logged with client names and verified credentials.
                </p>
              </div>
              <div className="text-xs text-[#C0397B] font-semibold pt-4">Registered Studios Verified</div>
            </div>

            {/* Bento Card 3: 4cols bottom row */}
            <div className="lg:col-span-4 bg-[#0F1522] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <Compass className="w-6 h-6 text-emerald-400" />
                <h3 className="font-display font-bold text-lg">
                  Locker Pickups (Toronto & Vancouver)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Need prop money stacks within hours? For registered media productions, we support emergency secure terminal lockers in downtown Toronto and central Vancouver, available 24/7 for digital key entries.
                </p>
              </div>
              <div className="text-xs text-[#FF6B1A] font-mono tracking-widest uppercase font-bold pt-4">Locker Depot Services</div>
            </div>

            {/* Bento Card 4: 8cols bottom row */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <Truck className="w-6 h-6 text-[#2E5FA8]" />
                  <h3 className="font-display font-bold text-xl text-slate-950">
                    Tracked Canadian Wide Priority Shipping
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We package your registered prop money inside professional impact-proof heavy-gauge shipping containers. Priority express dispatches arrive within 24 hours to major Canadian metropolitans.
                  </p>
                </div>
                <div className="bg-[#F1F5F9] rounded-xl p-4 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Toronto Metro Express:</span>
                    <span className="text-[#2E5FA8] font-bold">Same Day ($40)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>National Standard Flight:</span>
                    <span className="text-[#2E5FA8] font-bold">2-4 Days ($20)</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>U.S. Express Flight:</span>
                    <span className="text-[#2E5FA8] font-bold">3-5 Days ($50)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 – Why Choose Us (200–250 words) */}
      <section className="py-24 bg-slate-950/40 border-t border-slate-900/60 relative" id="why-choose-us-semprev">
        {/* Ambient background glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-widest block">
              Market Superiority & Craftsmanship
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
              Why Creative Crews Choose Our Prop Money Solutions
            </h2>
            <div className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              When ordering production gear, choosing a recognized studio-certified partner is critically important. Over the last decade, our Scenic Art laboratory has set the gold standard for compliant, ultra-realistic <strong>Prop Money Canada</strong>. We combine premium organic cotton-linen paper blends with an offset engraving system that completely eliminates surface glare, allowing you to film closeups under heavy lighting without hotspot reflections.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-950/60 border border-slate-900 rounded-xl space-y-3">
              <span className="text-xl">🛡</span>
              <h3 className="font-display font-semibold text-white text-sm">Full Domestic Legal Safety</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Each order incorporates rigorous graphic changes registered and cleared under Bank of Canada counterfeiting guidelines, making them completely safe for movie screens.
              </p>
            </div>
            <div className="p-6 bg-slate-950/60 border border-slate-900 rounded-xl space-y-3">
              <span className="text-xl">💵</span>
              <h3 className="font-display font-semibold text-white text-sm">Tactile Texture Realism</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Formulated using a custom 70% cotton and 30% linen blend that avoids standard wood pulp flatness, giving props the realistic weight and crisp snap actors count on.
              </p>
            </div>
            <div className="p-6 bg-slate-950/60 border border-slate-950 rounded-xl space-y-3">
              <span className="text-xl">⚡</span>
              <h3 className="font-display font-semibold text-white text-sm">Same-Day Studio Shipping</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Includes impact-proof shipping vaults with dynamic certification documents. Ships same-day from Vancouver, Toronto, and Montreal hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 – FAQ Intro (100–150 words) */}
      <section className="pt-24 bg-[#0A0D14]" id="faq-intro-editorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block font-semibold">
            Compliance & Specifications Desk
          </span>
          <h2 className="font-display font-semibold text-3xl text-white tracking-tight">
            Learn More About Using Prop Money Canada Legally
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans">
            Navigating domestic and international regulations surrounding the production, purchase, and filming of replica cash is essential for keeping your media project secure. Our Legal Compliance team and production specialists have compiled a complete, straightforward guide to answer all your technical design, paper texture, and shipping questions. Explore the details below to protect your team.
          </p>
        </div>
      </section>

      {/* 11. FAQ Accordion Section */}
      <section className="py-24 relative overflow-hidden" id="homepage-faq-accordions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">ANSWERS TO PRODUCTION DIRECTORS</span>
            <h2 className="font-display font-semibold text-3xl text-white tracking-tight">
              Frequently Asked Legal & Technical Questions
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Our experts explain the details of compliance, screen testing under cine grids, and priority secure logistics options.
            </p>
          </div>

          <div className="space-y-4">
            {homepageFaqs.map((faq, idx) => {
              const isOpen = faqOpen.includes(idx);
              return (
                <div
                  key={faq.q}
                  className="bg-[#0F1522]/80 border border-slate-900 rounded-xl overflow-hidden transition-all duration-300"
                  id={`home-faq-item-${idx}`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-white hover:text-[#FF6B1A] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-medium text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FF6B1A]" : ""}`} />
                  </button>

                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] opacity-100 border-t border-slate-950/40" : "max-h-0 opacity-0 pointer-events-none"}`}>
                    <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/30">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="text-white text-xs font-mono font-bold tracking-wider hover:text-[#FF6B1A] uppercase inline-flex items-center gap-1.5 transition-colors"
            >
              Access Complete Questions Database &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 12. CTA Section & Trust Bar (4 items) */}
      <section className="py-24 bg-gradient-to-t from-slate-950 to-[#0A0D14] border-t border-slate-950 relative overflow-hidden" id="homepage-cta-block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <Landmark className="w-12 h-12 text-[#FF6B1A] mx-auto opacity-80" />
          
          <div className="space-y-3">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Ready to Deck out your film set, television series, or training program?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Build your customized spec order using our interactive builder. Submit instantly to our WhatsApp desk or email managers for swift billing invoices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] font-bold text-xs tracking-widest uppercase rounded shadow-lg active:scale-95 transition-all text-center"
            >
              Order Prop Stacks Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#0F1522] border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 text-xs font-bold tracking-widest uppercase rounded active:scale-95 transition-all text-center"
            >
              Custom Production Inquiries
            </Link>
          </div>

          {/* Trust Bar Section with 4 items at the bottom */}
          <div className="border-t border-slate-900 pt-12 mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 text-slate-500 text-left" id="homepage-trust-bar">
            <div className="flex items-start space-x-3">
              <Truck className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Courier Delivery</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Nationwide courier with standard security packaging.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#FF6B1A] mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Certified Compliance</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Compliant with federal prop regulations.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Layers className="w-5 h-5 text-[#2E5FA8] mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Non-Reflective Coating</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Calibrated specifically for IMAX and high-powered LED arrays.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bulk Pricing Options</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Bulk packages optimized for large heist film designs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Buttons: WhatsApp & Slide Up Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
