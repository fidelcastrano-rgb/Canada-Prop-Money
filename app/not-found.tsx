"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, CornerDownLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden bg-[#0A0A0B]">
        {/* Ambient background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-650/5 blur-[120px] pointer-events-none" />

        <div className="max-w-md space-y-6 relative z-10">
          <div className="inline-flex p-4 rounded-full bg-red-950/20 border border-red-500/20 text-[#D91E18] mb-2 animate-pulse">
            <ShieldAlert className="w-10 h-10" />
          </div>
          
          <h1 className="font-display font-medium text-4xl text-white tracking-tight leading-none uppercase">
            Vault Denomination NotFound
          </h1>
          
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            Our central dispatch Desk was unable to locate dynamic film prop structures at this URL. The catalog index may have shifted.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 border border-white/20 text-white font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all inline-flex items-center justify-center gap-1.5"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span>Return to Base</span>
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-6 py-3 bg-[#D91E18] text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#b81712] transition-all inline-flex items-center justify-center gap-1.5"
            >
              <span>Build Spec List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
