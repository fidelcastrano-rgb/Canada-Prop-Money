"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Play,
  CheckCircle,
  Download,
  AlertCircle,
  Database,
  Save,
  Globe,
  ChevronRight,
  Sparkles,
  Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CatalogScraperPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [targetUrl, setTargetUrl] = useState("https://propcounterfeitnotes.com/category/fake-canadian-dollar-bills");
  const [htmlSource, setHtmlSource] = useState("");
  const [scrapeMethod, setScrapeMethod] = useState<"url" | "html">("url");

  const [logs, setLogs] = useState<string[]>([]);
  const [scrapedProducts, setScrapedProducts] = useState<any[]>([]);
  const [saveStatus, setSaveStatus] = useState<{
    success?: boolean;
    message?: string;
    loading?: boolean;
  }>({});

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleStartScrape = async () => {
    setIsRunning(true);
    setScrapedProducts([]);
    setLogs([]);
    setSaveStatus({});
    
    addLog("Initializing secure connection with target servers...");
    if (scrapeMethod === "url") {
      addLog(`Requesting: ${targetUrl}`);
    } else {
      addLog(`Parsing provided HTML source code...`);
    }

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "scrape",
          targetUrl: scrapeMethod === "url" ? targetUrl : undefined,
          htmlSource: scrapeMethod === "html" ? htmlSource : undefined
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP target error code: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.success) {
        addLog(`Category page matching completed.`);
        addLog(`Parser found ${data.products?.length || 0} valid products in list.`);
        
        // Simulating stepwise log output for great user experience visual feedback
        data.products.forEach((p: any, idx: number) => {
          addLog(`Crawled & structured product [${p.id}]: "${p.name}" with ${p.variants?.length || 0} variant sets.`);
        });

        setScrapedProducts(data.products);
        addLog("Scraping operation finished successfully! Product catalogue preview ready.");
      } else {
        addLog(`Scraping failed: ${data.error || "Unknown server-side index error"}`);
      }

    } catch (err: any) {
      addLog(`Secure proxy client collapsed: ${err.message || String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveToDatabase = async (mode: "merge" | "overwrite") => {
    if (scrapedProducts.length === 0) return;
    
    setSaveStatus({ loading: true });
    addLog(`Initiating catalog update inside main database. Mode selected: ${mode.toUpperCase()}`);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: scrapedProducts,
          mode
        })
      });

      const data = await res.json();

      if (data.success) {
        setSaveStatus({
          success: true,
          message: `Durable file write completed. Mode: ${mode.toUpperCase()}. Tracked and recorded ${data.count} products into /lib/data.ts.`
        });
        addLog(`System updated securely. Overwritten /lib/data.ts with ${data.count} active product entries.`);
      } else {
        setSaveStatus({
          success: false,
          message: `Database update failed: ${data.error || "Internal engine failure"}`
        });
        addLog(`CRITICAL: Database physical file write failed! Error: ${data.error}`);
      }
    } catch (err: any) {
      setSaveStatus({
        success: false,
        message: `Database connection abort: ${err.message || String(err)}`
      });
      addLog(`CRITICAL DETAILS: Database connection failed. DETAILS: ${err.message}`);
    } finally {
      setSaveStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="bg-[#070A10] min-h-screen text-slate-300" id="scraper-webpage-viewport">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Decorative Header */}
        <div className="border-b border-white/10 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-widest text-[#D91E18] uppercase flex items-center gap-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
               Live Administrative Crawler Console
            </span>
            <h1 className="font-display font-medium text-3xl text-white uppercase font-sans tracking-tight leading-tight">
              Product Catalog Scraper
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Dynamically scrape, parse, and structure high-fidelity Canadian movie prop currencies directly from live verified suppliers to update the application database entries in real time.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleStartScrape}
              disabled={isRunning}
              className="px-6 py-3 bg-[#D91E18] hover:bg-[#b81712] text-white text-xs font-bold font-mono tracking-widest uppercase rounded-none transition-all duration-300 flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Crawling target...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white text-white" />
                  Run Live Scraper
                </>
              )}
            </button>
          </div>
        </div>

        {/* Informative Warning box */}
        <div className="bg-[#10141D] border border-white/15 p-4 rounded-none mb-8 text-xs text-slate-400 flex items-start space-x-3">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="font-bold text-white uppercase block tracking-wider">Compliance & System Transparency</span>
            <p>
              This scraper connects securely via internal server relays to fetch catalog profiles. It reads titles, pictures, and nested pricing selectors to output beautiful structural catalog elements under Canadian compliant schema. Once saved, it physically rewrites <code>/lib/data.ts</code> on the backend storage layer.
            </p>
          </div>
        </div>

        {/* Input Settings */}
        <div className="bg-[#090C11] border border-white/10 p-5 rounded-none mb-8 space-y-4">
           <div className="flex items-center space-x-6 border-b border-white/5 pb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="scrapeMethod" 
                  checked={scrapeMethod === "url"} 
                  onChange={() => setScrapeMethod("url")}
                  className="accent-[#D91E18]"
                />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Target URL</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="scrapeMethod" 
                  checked={scrapeMethod === "html"} 
                  onChange={() => setScrapeMethod("html")}
                  className="accent-[#D91E18]"
                />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Raw HTML Source</span>
              </label>
           </div>
           
           {scrapeMethod === "url" ? (
             <div className="space-y-2">
               <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">URL to Scrape</label>
               <input 
                  type="text" 
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="w-full bg-[#10141D] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D91E18]/50"
                  placeholder="https://example.com/category/..."
               />
             </div>
           ) : (
             <div className="space-y-2">
               <label className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block">Paste HTML Source Code</label>
               <textarea 
                  value={htmlSource}
                  onChange={(e) => setHtmlSource(e.target.value)}
                  className="w-full h-40 bg-[#10141D] border border-white/10 px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#D91E18]/50 custom-scrollbar"
                  placeholder="<!DOCTYPE html>..."
               />
             </div>
           )}
        </div>

        {/* Split Grid: Left Logs / Right Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Logs Terminal Panel */}
          <div className="lg:col-span-7 bg-[#090C11] border border-white/10 p-5 rounded-none h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Console Operations Log</span>
                <span className="font-mono text-[9px] text-[#D91E18] uppercase">Active Relay</span>
              </div>
              <div className="font-mono text-[11px] text-zinc-400 overflow-y-auto space-y-1.5 h-[270px] pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <p className="text-slate-650 italic py-8 text-center text-xs">Waiting to initialize client connection request...</p>
                ) : (
                  logs.map((log, lIdx) => (
                    <div key={lIdx} className="leading-relaxed border-l-2 border-white/5 pl-2">
                      <span className="text-zinc-650">{log.slice(0, 10)}</span>
                      <span className="text-slate-200">{log.slice(10)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 text-[10px] text-slate-600 font-mono text-right capitalize">
              Status: {isRunning ? "Crawling in progress..." : scrapedProducts.length > 0 ? "Scrape complete" : "IDLE"}
            </div>
          </div>

          {/* Catalog Writer Control Panel */}
          <div className="lg:col-span-5 bg-[#090C11] border border-white/10 p-6 rounded-none space-y-5">
            <div className="border-b border-white/5 pb-3">
              <span className="font-mono text-[10px] uppercase text-[#D91E18] tracking-widest block font-bold">Catalog Integration</span>
              <h3 className="font-display font-medium text-lg text-white mt-1 uppercase">Write to local storage</h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Verify your scraped dataset below. You can overwrite your catalog completely or safely merge the entries to append the new products.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleSaveToDatabase("merge")}
                disabled={scrapedProducts.length === 0 || saveStatus.loading}
                className="w-full py-3 bg-[#101912] hover:bg-[#162319] border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-none flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-emerald-400" />
                Merge Scraped Catalog
              </button>

              <button
                onClick={() => handleSaveToDatabase("overwrite")}
                disabled={scrapedProducts.length === 0 || saveStatus.loading}
                className="w-full py-3 bg-[#191010] hover:bg-[#251616] border border-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-none flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                <Database className="w-4 h-4 text-red-400" />
                Wipe & Overwrite Catalog
              </button>
            </div>

            {/* Error or Success notification block */}
            {saveStatus.message && (
              <div className={`p-4 border text-xs leading-relaxed rounded-none flex items-start space-x-2.5 ${
                saveStatus.success 
                  ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-400 animate-fade-in"
                  : "bg-red-950/20 border-red-500/25 text-red-400 animate-fade-in"
              }`}>
                {saveStatus.success ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider block">
                    {saveStatus.success ? "PHYSICAL WRITE COMPLETE" : "SYSTEM ERROR DETAILS"}
                  </span>
                  <p>{saveStatus.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scraped Catalog Preview Area */}
        {scrapedProducts.length > 0 && (
          <div className="space-y-6" id="scraped-results-view-segment">
            <h2 className="font-display font-medium text-lg text-white uppercase border-b border-white/10 pb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D91E18]" />
              Scraped Product Catalogue Preview ({scrapedProducts.length} Items)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scrapedProducts.map((p: any) => (
                <div
                  key={p.id}
                  className="bg-[#0A0D15] border border-white/10 p-5 rounded-none flex flex-col justify-between hover:border-white/20 transition-all space-y-4"
                >
                  <div className="space-y-3">
                    {/* Image frame */}
                    <div className="relative aspect-[4/3] bg-black/60 overflow-hidden border border-white/5 group">
                      <img
                        src={p.imageSet[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/85 border border-[#D91E18]/40 text-white font-mono text-[9px] uppercase tracking-wider">
                        ${p.basePrice} Base
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase text-amber-500 tracking-wider">Denomination Stack</span>
                      <h3 className="font-display font-bold text-white text-base leading-tight uppercase">{p.name}</h3>
                      <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mt-1">{p.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    {/* Variants list in scraped entity */}
                    <div>
                      <span className="font-mono text-[9px] uppercase text-slate-500 block mb-1.5 font-bold">Extracted Pricing Scales:</span>
                      <div className="space-y-1">
                        {p.variants.slice(0, 3).map((v: any, vIdx: number) => (
                          <div key={vIdx} className="flex justify-between items-center text-[10px] font-mono py-1 border-b border-white/5 last:border-0 bg-white/2 p-2">
                            <span className="text-slate-300 truncate max-w-[170px]">{v.name}</span>
                            <span className="text-white font-semibold block">${v.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Slug / ID metadata fields */}
                    <div className="flex justify-between items-center font-mono text-[8px] text-slate-600 bg-black/30 p-2">
                      <span>ID: {p.id}</span>
                      <span>Slug: {p.slug}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
