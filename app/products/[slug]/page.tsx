"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Award,
  Truck,
  Layers,
  HelpCircle,
  MessageCircle,
  Mail,
  Check,
  AlertTriangle,
  FileCheck
} from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

// Variant selection interface
export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Resolve params Promise in Next.js 15
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = PRODUCTS.find((p) => p.slug === slug);

  // Cart logic & UI states
  const { addToOrder } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"contents" | "storage" | "supply">("contents");
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
          <h1 className="text-2xl font-bold font-display text-white">Denomination stack not found in vault</h1>
          <p className="text-slate-400 text-sm">Our delivery logistics desk could not find a coin-stack matching this URL.</p>
          <Link href="/products" className="inline-block py-2.5 px-6 border border-white/20 hover:bg-white hover:text-black text-white font-bold rounded-none text-[10px] tracking-widest uppercase transition-colors">
            Return to shop catalog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

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

  const prefilledWhatsApp = () => {
    const text = `🇨🇦 *CANADIAN PROP MONEY INQUIRY*\n\nRequesting *${product.name}*\nVariant selected: *${selectedVariant.name}*\nPrice: *$${price.toFixed(2)} CAD*\n\nPlease specify transaction process and shipping rates. Thank you.`;
    window.open(`https://wa.me/18437320661?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const prefilledEmail = () => {
    const subject = `Inquiry: ${product.name} Prop Stacks`;
    const body = `Hello Canadian Prop Money Delivery Desk,\n\nI would like to inquire about the following theatrical prop money stack:\n\n- Product: ${product.name}\n- Variant Selected: ${selectedVariant.name} (Price: $${price.toFixed(2)} CAD)\n\nPlease coordinate billing invoice and dispatch schedule details.\n\nThank you.`;
    const mailtoUrl = `mailto:sales@canadianpropmoney.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = mailtoUrl;
      link.click();
    }
  };

  // Find 4 related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Dynamic products structured schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": `${product.tagline} ${product.description}`,
    "image": `https://canadianpropmoney.org${product.imageSet[0]}`,
    "category": product.category,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "CAD",
      "lowPrice": product.variants[0]?.price || 40,
      "highPrice": product.variants[product.variants.length - 1]?.price || 150,
      "offerCount": product.variants.length,
      "availability": "https://schema.org/InStock",
      "url": `https://canadianpropmoney.org/products/${product.slug}`
    },
    "brand": {
      "@type": "Brand",
      "name": "Canadian Prop Money"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  const breadcrumbMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://canadianpropmoney.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Monies",
        "item": "https://canadianpropmoney.org/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://canadianpropmoney.org/products/${product.slug}`
      }
    ]
  };

  return (
    <>
      <Navbar />

      {/* Dynamic SEO Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbMarkup) }}
      />

      {/* Breadcrumb section */}
      <div className="bg-slate-950/40 border-b border-slate-900 py-4" id="product-detail-breadcrumbs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-widest" aria-label="Breadcrumb navigation trail">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <Link href="/products" className="hover:text-slate-300">Monies</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-[#FF6B1A] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main detail segment */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="product-detail-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image switcher */}
          <div className="lg:col-span-6 space-y-4" id="detail-images-column">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-900 flex items-center justify-center">
              <img
                src={product.imageSet[activeImageIdx]}
                alt={`${product.name} view ${activeImageIdx + 1}`}
                className="w-full h-full object-cover opacity-85 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <span className="text-[9px] bg-slate-950/80 border border-white/5 text-slate-300 px-2 py-1 rounded font-mono uppercase tracking-widest">
                  HD Cine Certified
                </span>
              </div>
            </div>

            {/* Switcher Thumbnails (3 images) */}
            <div className="grid grid-cols-3 gap-4" id="image-thumbnail-switcher-container">
              {product.imageSet.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[3/2] rounded-xl overflow-hidden border transition-all ${
                    activeImageIdx === idx
                      ? "border-[#FF6B1A] ring-1 ring-[#FF6B1A]/20"
                      : "border-slate-900 hover:border-slate-800"
                  }`}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Informative Panel */}
          <div className="lg:col-span-6 space-y-6" id="detail-specs-column">
            {/* Category Tag */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] sm:text-xs font-mono font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded uppercase">
                {product.category}
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-medium text-amber-400 bg-amber-950/30 border border-amber-500/20 px-2.5 py-1 rounded uppercase">
                Frontier Series
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              {product.tagline}
            </p>

            {/* Pricing Section ("from" + In-Stock Badge) */}
            <div className="bg-slate-950/35 border border-slate-900 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-baseline space-x-2">
                <span className="text-[10px] text-slate-500 font-mono text-left">FROM SPEC RATE:</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  ${price.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">CAD</span>
                {originalPrice && (
                  <span className="text-xs text-slate-500 line-through font-mono ml-2">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* In Stock Badge */}
              <div className="flex items-center space-x-1.5 bg-[#101912] border border-emerald-500/25 px-2.5 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">In Stock</span>
              </div>
            </div>

            {/* Variant select buttons with savings */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                Select Bill Count Configuration
              </span>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`w-full flex items-center justify-between p-3 text-xs rounded transition-all text-left ${
                      selectedVariantIdx === idx
                        ? "bg-[#FF6B1A]/15 border border-[#FF6B1A]/40 text-white"
                        : "bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${selectedVariantIdx === idx ? "border-[#FF6B1A]" : "border-slate-800"}`}>
                        {selectedVariantIdx === idx && <span className="w-1.5 h-1.5 bg-[#FF6B1A] rounded-full" />}
                      </span>
                      <span className="font-semibold">{v.name}</span>
                    </div>
                    {v.savingsLabel && (
                      <span className="bg-emerald-600/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                        {v.savingsLabel}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive Order triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={prefilledWhatsApp}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs tracking-wider uppercase rounded transition-all active:scale-95 flex items-center justify-center space-x-2"
                aria-label="Order via WhatsApp prefilled message"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order via WhatsApp</span>
              </button>
              <button
                onClick={prefilledEmail}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 font-bold text-xs tracking-wider uppercase rounded border border-slate-800 transition-all active:scale-95 flex items-center justify-center space-x-2"
                aria-label="Request custom email order"
              >
                <Mail className="w-4 h-4" />
                <span>Email order invoice</span>
              </button>
            </div>

            {/* Master Add to Spec action */}
            <button
              onClick={handleAdd}
              className={`w-full py-4 text-center font-bold text-xs uppercase tracking-widest rounded-none shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2 ${
                isAdded ? "bg-emerald-600 text-white" : "bg-[#D91E18] hover:bg-[#b81712] text-white"
              }`}
            >
              <span>{isAdded ? "✓ Added To Specification Drawer" : "Add to Order Builder Catalog"}</span>
            </button>

            {/* How ordering works box (red left border) */}
            <div className="border-l-4 border-[#D91E18] bg-[#121214] p-4 rounded-none space-y-1">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
                How Ordering Works
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Add desired items to your spec builder, then click &apos;Proceed to Checkout&apos;. Our delivery managers will receive your dispatch checklist and coordinate custom security billing and courier shipping options to your set location. No card is charged on-site.
              </p>
            </div>

            {/* Safety protocol box (red left border) */}
            <div className="border-l-4 border-red-500 bg-[#121214] p-4 rounded-none space-y-1">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                Compliance Safety Protocol
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Replicas include permanent, distinct graphic markings stating &quot;FOR MOTION PICTURE USE ONLY&quot;. By requesting quotes or purchasing prop stacks, you legally contract that you will never attempt to pass these off as authentic tender, which carries federal penalties.
              </p>
            </div>

            {/* COA verification link button */}
            <Link
              href="/about"
              className="w-full flex items-center justify-between border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-4 rounded-none text-xs text-slate-405 hover:text-white transition-all"
            >
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-[#D91E18]" />
                <span className="font-mono tracking-tight font-medium">Verify Subsection compliance details</span>
              </div>
              <span>Read Laws &rarr;</span>
            </Link>

            {/* 3 tabs: Package Contents / Storage / Supply Chain */}
            <div className="bg-slate-950/40 rounded-xl border border-slate-900 p-4 space-y-4">
              <div className="flex border-b border-slate-900 pb-2 text-[10px] uppercase font-mono tracking-wider space-x-4">
                <button
                  onClick={() => setActiveTab("contents")}
                  className={`pb-1 transition-all border-b ${activeTab === "contents" ? "border-[#FF6B1A] text-[#FF6B1A]" : "border-transparent text-slate-500 hover:text-slate-350"}`}
                >
                  Package Contents
                </button>
                <button
                  onClick={() => setActiveTab("storage")}
                  className={`pb-1 transition-all border-b ${activeTab === "storage" ? "border-[#FF6B1A] text-[#FF6B1A]" : "border-transparent text-slate-500 hover:text-slate-350"}`}
                >
                  Storage Guidelines
                </button>
                <button
                  onClick={() => setActiveTab("supply")}
                  className={`pb-1 transition-all border-b ${activeTab === "supply" ? "border-[#FF6B1A] text-[#FF6B1A]" : "border-transparent text-slate-500 hover:text-slate-350"}`}
                >
                  Supply Chain
                </button>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed min-h-[100px]">
                {activeTab === "contents" && (
                  <ul className="space-y-1.5 list-disc pl-4" id="contents-tab-container">
                    {product.packageContents.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {activeTab === "storage" && (
                  <p id="storage-tab-container">{product.storageInstructions}</p>
                )}
                {activeTab === "supply" && (
                  <p id="supply-tab-container">{product.supplyChain}</p>
                )}
              </div>
            </div>

            {/* 4 trust badges grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-900 text-center" id="trust-badges-grid">
              <div className="space-y-1.5 p-3 bg-slate-950/20 border border-slate-900 rounded-lg">
                <Award className="w-5 h-5 text-emerald-400 mx-auto" />
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">Registered</span>
                <span className="text-[10px] font-bold text-white block leading-none">COA Included</span>
              </div>
              <div className="space-y-1.5 p-3 bg-slate-950/20 border border-slate-900 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-[#FF6B1A] mx-auto" />
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">Federal Rules</span>
                <span className="text-[10px] font-bold text-white block leading-none">100% Legal</span>
              </div>
              <div className="space-y-1.5 p-3 bg-slate-950/20 border border-slate-900 rounded-lg">
                <Layers className="w-5 h-5 text-[#2E5FA8] mx-auto" />
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">Film Grade</span>
                <span className="text-[10px] font-bold text-white block leading-none">No Cine Glare</span>
              </div>
              <div className="space-y-1.5 p-3 bg-slate-950/20 border border-slate-900 rounded-lg">
                <Truck className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">Logistics</span>
                <span className="text-[10px] font-bold text-white block leading-none">Same Day</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related products grid (4 cards) */}
      <section className="py-20 bg-slate-950/40 border-t border-slate-900/60" id="related-product-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left">
            <span className="font-mono text-xs uppercase text-[#FF6B1A] tracking-wider block">RECOMMENDED FOR PRODUCTION</span>
            <h3 className="font-display font-semibold text-2xl text-white mt-1">
              Add Denomination Variety Stacks
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="related-cards-grid">
            {relatedProducts.map((p) => {
              const basePrice = p.variants[0].price;
              return (
                <div
                  key={p.id}
                  className="bg-[#0F1522] border border-slate-900 rounded-xl p-4 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="aspect-[4/3] w-full rounded bg-slate-950 overflow-hidden">
                      <img src={p.imageSet[0]} alt={p.name} className="w-full h-full object-cover opacity-75" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#6A8E4E] uppercase tracking-wider block">{p.category}</span>
                      <h4 className="font-display font-bold text-[#F3F4F6] text-xs sm:text-sm truncate mt-0.5">{p.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{p.tagline}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-950/80 pt-3 mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 font-mono">${basePrice.toFixed(2)} CAD</span>
                    <Link href={`/products/${p.slug}`} className="text-[#FF6B1A] hover:underline font-semibold font-mono text-[10px] uppercase">
                      Inspect &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Elements & Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
