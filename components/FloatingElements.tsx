"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ShoppingBag, X, Plus, Minus, Send, Mail, Play } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function FloatingElements() {
  const {
    items,
    removeItem,
    updateQty,
    clearOrder,
    totalItems,
    totalCost,
    isOrderBuilderVisible,
    setIsOrderBuilderVisible,
    sendWhatsApp,
    sendEmail
  } = useCart();

  // If order builder is active but items are empty, hide it.
  const shouldShowBuilder = isOrderBuilderVisible && items.length > 0;

  return (
    <>
      {/* 1. WhatsApp Float: Bottom-Left Fixed */}
      <a
        href="https://wa.me/18437320661"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-[#20ba5a] active:scale-95 transition-all shadow-lg hover:shadow-[#25D366]/20 font-bold text-xs sm:text-sm group tracking-wider uppercase"
        aria-label="Chat with us on WhatsApp"
        id="whatsapp-floating-trigger"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="max-sm:hidden md:inline block">Chat with dispatch</span>
        <span className="sm:hidden inline">Chat</span>
      </a>

      {/* 2. Order Builder Panel: Bottom-Right Fixed Drawer */}
      <div
        className={`fixed bottom-6 right-6 z-40 w-full max-w-[370px] bg-[#0F1522] border-2 border-[#FF6B1A] rounded-xl shadow-2xl transition-all duration-500 ease-out transform ${
          shouldShowBuilder 
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto" 
            : "translate-y-20 opacity-0 scale-95 pointer-events-none"
        }`}
        id="order-builder-drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900/60 p-4 bg-slate-950/40 rounded-t-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-ping" />
            <span className="font-display font-medium text-xs tracking-widest text-[#FF6B1A] uppercase flex items-center gap-1.5">
              🇨🇦 SPEC ORDER BUILDER <span className="text-slate-500 font-mono">({totalItems})</span>
            </span>
          </div>
          <button
            onClick={() => setIsOrderBuilderVisible(false)}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all active:scale-90"
            aria-label="Minimize Order Builder"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Spec Stacks */}
        <div className="p-4 max-h-[220px] overflow-y-auto space-y-3 dark-scrollbar">
          {items.map((item) => (
            <div
              key={item.key}
              className="bg-slate-950/60 border border-slate-900 rounded-lg p-3 flex flex-col justify-between"
              id={`cart-item-${item.key.replace("|", "_")}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display font-medium text-white text-xs leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-none font-mono">
                    {item.variant}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.key)}
                  className="text-slate-600 hover:text-red-400 text-[10px] font-mono hover:underline"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2 bg-slate-950 px-2 py-1 rounded border border-slate-920">
                  <button
                    onClick={() => updateQty(item.key, item.qty - 1)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold font-mono text-white px-1">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.key, item.qty + 1)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Subtotal and Action Panel */}
        <div className="border-t border-slate-900/60 p-4 bg-slate-950/30 rounded-b-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Spec Subtotal</span>
            <span className="text-sm font-bold text-[#FF6B1A] font-mono">
              ${totalCost.toFixed(2)} CAD
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={sendWhatsApp}
              className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-[#1F2937] hover:bg-slate-800 text-[#25D366] text-[11px] font-bold tracking-wider rounded-md transition-all active:scale-95 text-center"
              title="Submit Inquiry direct to WhatsApp Dispatch Desk"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Inquire</span>
            </button>
            <button
              onClick={sendEmail}
              className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-[#1F2937] hover:bg-slate-800 text-blue-400 text-[11px] font-bold tracking-wider rounded-md transition-all active:scale-95 text-center"
              title="Submit Inquiry via email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Inquire</span>
            </button>
          </div>

          {/* Secure Interactive Delivery Checkout */}
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center space-x-2 py-3 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] font-bold text-xs tracking-wider uppercase rounded-md transition-all active:scale-95 text-center"
            id="proceed-to-checkout-btn"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Proceed to checkout dispatch ➔</span>
          </Link>

          {/* Clear Cart Button */}
          <div className="flex justify-center pt-1 border-t border-slate-900/40">
            <button
              onClick={clearOrder}
              className="text-[10px] text-slate-600 hover:text-slate-400 font-mono tracking-widest uppercase transition-colors"
            >
              Clear Specification List
            </button>
          </div>
        </div>
      </div>

      {/* Miniature Cart Icon Trigger in corner if Builder is hidden, but cart has items */}
      {!shouldShowBuilder && items.length > 0 && (
        <button
          onClick={() => setIsOrderBuilderVisible(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#FF6B1A] text-slate-950 p-4 rounded-full shadow-2xl hover:bg-[#e05a10] active:scale-95 transition-all flex items-center justify-center group border border-[#FF6B1A]/20"
          aria-label="Open Order Builder"
          id="back-to-order-builder-mini-btn"
        >
          <ShoppingBag className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
}
