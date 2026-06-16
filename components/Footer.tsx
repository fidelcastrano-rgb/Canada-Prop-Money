"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Landmark, Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040609] border-t border-slate-900 pt-16 pb-8 text-slate-400 text-sm" id="site-footer-layout">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Coordinates */}
          <div className="flex flex-col space-y-4" id="footer-col-brand">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt="Canadian Prop Money Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                CANADIAN<span className="text-[#D91E18]">PROP</span>MONEY
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Canada&apos;s premium, most trusted realistic currency reproduction company. Formatted explicitly to meet federal prop replication criteria for television, cinema, theatre, and training.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D91E18] shrink-0" />
                <span>Toronto Depot • Vancouver Lockers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (843) 732-0661 (WhatsApp ONLY)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>sales@canadianpropmoney.org</span>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col space-y-3" id="footer-col-products">
            <h3 className="font-display font-semibold text-white tracking-wider text-xs uppercase pt-1">Denominations</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/frontier-100-stack" className="hover:text-amber-400 transition-colors">
                  $100 Gold Maple Stacks
                </Link>
              </li>
              <li>
                <Link href="/products/frontier-50-stack" className="hover:text-rose-400 transition-colors">
                  $50 Crimson Stacks
                </Link>
              </li>
              <li>
                <Link href="/products/frontier-20-stack" className="hover:text-emerald-400 transition-colors">
                  $20 Spruce Green Stacks
                </Link>
              </li>
              <li>
                <Link href="/products/frontier-10-stack" className="hover:text-purple-450 transition-colors">
                  $10 Violet Stacks
                </Link>
              </li>
              <li>
                <Link href="/products/frontier-5-stack" className="hover:text-blue-400 transition-colors">
                  $5 Ocean Blue Stacks
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#D91E18] font-semibold transition-colors flex items-center gap-1">
                  View All Vault Bundles &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Research / Legislation */}
          <div className="flex flex-col space-y-3" id="footer-col-research">
            <h3 className="font-display font-semibold text-white tracking-wider text-xs uppercase pt-1">Production Research</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog/where-to-buy-prop-money-canada" className="hover:text-white transition-colors">
                  Sourcing Replicas Legally in CA
                </Link>
              </li>
              <li>
                <Link href="/blog/choosingpropbills-4k-8k" className="hover:text-white transition-colors">
                  DP Guide: Matte vs Glare Coatings
                </Link>
              </li>
              <li>
                <Link href="/blog/prop-money-price-guide-comparison" className="hover:text-white transition-colors">
                  Prop Master Sandwich Trick Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#D91E18] transition-colors">
                  All Film Production Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Company */}
          <div className="flex flex-col space-y-3" id="footer-col-company">
            <h3 className="font-display font-semibold text-white tracking-wider text-xs uppercase pt-1">Administration</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin/scraper" className="hover:text-amber-400 font-bold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  ⚡ Live Catalog Scraper
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Media Story & Values
                </Link>
              </li>
              <li>
                <Link href="/about#scam-warning" className="hover:text-[#D91E18] font-semibold transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Crucial Scam Warnings
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Client FAQs & Database
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Dispatch Desk
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Filming Use (noindex)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Regulations (noindex)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyrights and Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-4 border-t border-slate-900 text-xs text-slate-600">
          <div>
            &copy; {currentYear} Canadian Prop Money Systems Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Formulated for maximum realism & legal peace of mind</span>
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>in Hollywood North.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
