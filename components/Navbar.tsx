"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Landmark, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Articles & Laws", href: "/blog" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact Dispatch", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  }, [pathname]);

  return (
    <>
      {/* Notice/Announcement Bar - Scrolling Marquee */}
      <div className="w-full bg-[#0A0A0B] border-b border-white/5 text-[10px] uppercase tracking-wider py-2 overflow-hidden text-[#D91E18] font-mono select-none" id="announcement-marquee">
        <div className="animate-marquee inline-flex space-x-12">
          <span>🇨🇦 100% REGULATION COMPLIANT FILM PROP MONIES — INCORPORATES OFFICIALLY REGISTERED GRAPHIC ALTERATIONS</span>
          <span>⚡ SAME-DAY DISPATCH TO METRO TORONTO, MONTREAL & VANCOUVER SCREEN STUDIOS</span>
          <span>📜 CERTIFICATE OF AUTHENTICITY (COA) SHIPPED WITH EACH REGISTERED VAULT STACK</span>
          <span>🎥 ENGINEERED SPECIFICALLY FOR 4K, 8K & ANA-MORPHIC CINEMATIC CAPTURE GRIDS</span>
          {/* Repeat for seamless loop */}
          <span>🇨🇦 100% REGULATION COMPLIANT FILM PROP MONIES — INCORPORATES OFFICIALLY REGISTERED GRAPHIC ALTERATIONS</span>
          <span>⚡ SAME-DAY DISPATCH TO METRO TORONTO, MONTREAL & VANCOUVER SCREEN STUDIOS</span>
          <span>📜 CERTIFICATE OF AUTHENTICITY (COA) SHIPPED WITH EACH REGISTERED VAULT STACK</span>
          <span>🎥 ENGINEERED SPECIFICALLY FOR 4K, 8K & ANA-MORPHIC CINEMATIC CAPTURE GRIDS</span>
        </div>
      </div>

      {/* Sticky Glassmorphic Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0B]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
            : "bg-transparent border-b border-transparent py-5"
        }`}
        id="main-navigation-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt="Canadian Prop Money Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base tracking-[0.1em] text-white flex items-center leading-none">
                  CANADIAN<span className="text-[#D91E18]">PROP</span>MONEY
                </span>
                <span className="font-mono text-[8px] tracking-widest text-[#C5A059] uppercase leading-none mt-1">Cinema Reproduction Ltd.</span>
              </div>
            </Link>

            {/* Links Right - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[11px] uppercase tracking-widest transition-all ${
                      isActive
                        ? "text-[#D91E18] font-semibold border-b-2 border-[#D91E18] pb-1"
                        : "text-slate-300 hover:text-white pb-1"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Shopping Cart Indicator badge */}
              <Link
                href="/products"
                className="relative p-2 text-slate-300 hover:text-[#D91E18] transition-colors"
                aria-label="View products"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D91E18] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Order Now Call to Action Button */}
              <Link
                href="/products"
                className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-none font-bold"
              >
                Build Spec Order
              </Link>
            </nav>

            {/* Mobile Hamburger / Cart Toggle button */}
            <div className="flex items-center space-x-4 lg:hidden">
              <Link
                href="/products"
                className="relative p-2 text-slate-300 hover:text-[#D91E18] transition-colors"
                aria-label="View products"
              >
                <ShoppingBag className="w-5.5 h-5.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D91E18] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-850 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen with animations */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0B] flex flex-col pt-24 px-6 lg:hidden animate-fade-in">
          <div className="flex flex-col space-y-6 text-center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-widest font-display font-medium py-2 ${
                    isActive ? "text-[#D91E18]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 border border-white/20 text-white font-bold tracking-widest uppercase rounded-none text-center text-xs hover:bg-white hover:text-black transition-colors"
              >
                Order Now
              </Link>
              <div className="text-center font-mono text-xs text-slate-500">
                Secure WhatsApp Checkout Available
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
