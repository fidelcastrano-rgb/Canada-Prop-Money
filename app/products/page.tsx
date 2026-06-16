"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Filter, Grid, Sliders, Landmark } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import HomepageProductCard from "@/app/page"; // We can reuse or build our product card easily. Since HomepageProductCard is local above, we can quickly write a clean grid layout.

function ListingProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const { addToOrder } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

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

  return (
    <div
      className="glass-card rounded-xl p-5 border border-slate-900 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B1A]/20"
      id={`product-listing-${product.id}`}
      data-sp={price}
      data-sv={selectedVariant.name}
    >
      <div>
        <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-mono tracking-widest text-[#6A8E4E]">
          <span>{product.category}</span>
          {product.badge && (
            <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest text-[8px]">
              {product.badge}
            </span>
          )}
        </div>

        <div className="relative w-full h-[160px] rounded-lg overflow-hidden mb-4 bg-slate-950/80 border border-slate-900">
          <img
            src={product.imageSet[0]}
            alt={product.name}
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <h2 className="font-display font-semibold text-white tracking-tight text-base mb-1">
          {product.name}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[48px]">
          {product.description}
        </p>

        {/* Variant list */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Select Denom Configuration</span>
          <div className="space-y-1">
            {product.variants.map((v, idx) => (
              <button
                key={v.name}
                onClick={() => setSelectedVariantIdx(idx)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-[10px] rounded transition-all text-left ${
                  selectedVariantIdx === idx
                    ? "bg-[#FF6B1A]/10 border border-[#FF6B1A]/30 text-white"
                    : "bg-slate-950/40 border border-slate-900 text-slate-450 hover:text-white"
                }`}
              >
                <span className="truncate pr-2">{v.name}</span>
                {v.savingsLabel && (
                  <span className="text-[8px] bg-emerald-600/20 text-emerald-400 font-mono px-1 rounded">
                    {v.savingsLabel}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900/60 pt-4 mt-auto">
        <div className="flex items-baseline justify-between mb-3 font-mono text-xs">
          <div>
            <span className="text-slate-500 text-[9px] mr-1">FROM:</span>
            <span className="text-sm font-bold text-emerald-400">${price.toFixed(2)}</span>
            <span className="text-[9px] text-slate-500 ml-1">CAD</span>
          </div>
          {originalPrice && (
            <span className="text-xs text-slate-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="py-2.5 bg-slate-950/60 hover:bg-slate-900 text-slate-300 text-center text-[11px] font-semibold rounded border border-slate-900 transition-all active:scale-95"
          >
            View Specs
          </Link>
          <button
            onClick={handleAdd}
            className={`py-2.5 font-bold text-[11px] uppercase tracking-wider rounded transition-all active:scale-95 text-center ${
              isAdded ? "bg-emerald-600 text-white" : "bg-[#FF6B1A] hover:bg-[#e05a10] text-slate-950"
            }`}
          >
            {isAdded ? "✓ Added" : "Add to order"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useCart } from "@/hooks/use-cart";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Canadian Dollars" | "US Dollars" | "Australian Dollars" | "Euro">("All");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section className="bg-slate-950/40 border-b border-slate-900 py-12 relative overflow-hidden" id="products-listing-header">
        <div className="absolute top-1/2 left-10 w-[200px] h-[200px] bg-emerald-600/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation on subpages */}
          <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-4" aria-label="Breadcrumb navigation trail">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-[#FF6B1A] font-medium">All Banknote Stacks</span>
          </nav>

          <div className="max-w-xl space-y-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Approved Prop Banknote Stacks
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every prop stack is printed with specialized color-matched inks, processed with a high-fidelity matte layer to stop reflections, and issued with an official laminated Certificate of Authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Products Section (Sticky Category filter bar + grid) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="products-listing-section">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / Filter (Sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6" id="products-sticky-filter-bar">
              <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-5 space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-950/40 text-white">
                  <Filter className="w-4 h-4 text-[#FF6B1A]" />
                  <span className="font-display font-semibold text-xs uppercase tracking-widest">Denom Categories</span>
                </div>

                <div className="flex flex-col space-y-1">
                  {(["All", "Euro", "US Dollars", "Australian Dollars", "Canadian Dollars"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left py-2 px-3 text-xs font-medium rounded transition-all ${
                        activeCategory === cat
                          ? "bg-[#FF6B1A]/10 border-l-2 border-[#FF6B1A] text-white"
                          : "text-slate-450 hover:text-white hover:bg-slate-900/30"
                      }`}
                    >
                      {cat === "All" ? "View All Monies" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compliance Box Sidebar */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 text-xs text-slate-500 leading-relaxed space-y-3">
                <div className="flex items-center space-x-1.5 text-white font-semibold">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  <span className="font-display uppercase tracking-wider text-[10px]">Secure Logistics</span>
                </div>
                <p className="text-[11px]">
                  All order lists can be completed and requested securely through email or WhatsApp. No digital credit-card payment gateways is loaded directly by default, ensuring maximum discretion and customized contract billing procedures.
                </p>
              </div>
            </div>
          </div>

          {/* Product Grid of All matching items */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((prod) => (
                <ListingProductCard key={prod.id} product={prod} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-[#0F1522] rounded-xl border border-slate-900 p-8 space-y-4">
                <span className="text-3xl">📂</span>
                <p className="text-slate-450 font-mono text-xs">No matching denominations found in warehouse.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Elements & Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
