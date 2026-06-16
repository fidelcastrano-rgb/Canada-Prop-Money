"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  Clock,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ShoppingBag,
  Info
} from "lucide-react";
import { BLOG_POSTS, PRODUCTS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
          <h1 className="text-2xl font-bold font-display text-white">Article not found in logs</h1>
          <p className="text-slate-400 text-sm">Our editorial desk does not hold any publication at this address.</p>
          <Link href="/blog" className="inline-block py-2.5 px-5 bg-[#FF6B1A] text-[#070A0F] font-bold rounded">
            Return to journal archive
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Find 3 other blog posts for recommendations
  const relatedArticles = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Find products associated with this post
  const associatedProducts = PRODUCTS.filter((p) => post.productSlugs.includes(p.slug));

  // Dynamic editorial article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "image": `https://canadianpropmoney.org${post.heroImage}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Canadian Prop Money Ltd.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://canadianpropmoney.org/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://canadianpropmoney.org/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
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
        "name": "Blog",
        "item": "https://canadianpropmoney.org/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://canadianpropmoney.org/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <Navbar />

      {/* Dynamic Article & Breadcrumb Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id={`blog-post-${post.slug}`}>
        {/* Back Link & Category */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="text-slate-500 hover:text-[#FF6B1A] text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
            id="back-to-blog-link"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Go back to articles</span>
          </Link>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight" id="blog-post-h1-title">
          {post.title}
        </h1>

        {/* Meta Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-y border-slate-900 py-3" id="blog-metadata">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium">{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Disclaimer Warning Box */}
        <div className="bg-amber-950/15 border border-amber-500/10 p-4 rounded-xl flex items-start space-x-3 text-xs" id="blog-post-disclaimer">
          <Info className="w-5 h-5 text-[#FF6B1A] shrink-0 mt-0.5" />
          <p className="text-slate-450 leading-relaxed italic">{post.disclaimer}</p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-900">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Long form Body Content (Structured rendering) */}
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-350 leading-relaxed font-sans space-y-6 pt-4" id="blog-body-content">
          <p className="text-slate-250 font-medium text-sm sm:text-base leading-relaxed">
            {post.summary}
          </p>

          {/* Simple parse contents by line to inject high quality formatted headers/paragraphs dynamically */}
          <div className="space-y-6 text-slate-355" id="parsed-article-body">
            {post.contentMarkdown.split("\n\n").map((chunk, idx) => {
              if (chunk.startsWith("### ")) {
                return (
                  <h2 key={idx} className="font-display font-semibold text-white text-xl sm:text-2xl mt-8 pt-4 border-b border-slate-1000 pb-2">
                    {chunk.replace("### ", "")}
                  </h2>
                );
              }
              if (chunk.startsWith("## ")) {
                return (
                  <h3 key={idx} className="font-display font-semibold text-white text-lg sm:text-xl mt-6">
                    {chunk.replace("## ", "")}
                  </h3>
                );
              }
              if (chunk.startsWith("* ")) {
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5">
                    {chunk.split("\n").map((li, lIdx) => (
                      <li key={lIdx} className="leading-relaxed">
                        {li.replace("* ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (chunk.match(/^\d+\./)) {
                return (
                  <ol key={idx} className="space-y-2 list-decimal pl-5">
                    {chunk.split("\n").map((li, lIdx) => (
                      <li key={lIdx} className="leading-relaxed">
                        {li.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="leading-relaxed font-sans">
                  {chunk}
                </p>
              );
            })}
          </div>
        </div>

        {/* SPECIFIC INFO BOXES (Tip and Warning) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6" id="critical-info-boxes">
          {/* Tip Info box (orange border) */}
          <div className="border-l-4 border-amber-500 bg-[#16120E] p-5 rounded-r-xl space-y-2">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              💡 Production Tip: The Sandwich Trick
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              Lines producers can conserve project budget by sand-wiching blank paper dividers or distress filler notes in the middle of prop cash straps, placing high-fidelity single denomination reproducs specifically on the exterior top and bottom.
            </p>
          </div>

          {/* Warning Info box (red border) */}
          <div className="border-l-4 border-red-500 bg-[#160E0E] p-5 rounded-r-xl space-y-2">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-red-400">
              ⚠️ Strict Handling Regulations
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              Under federal laws, under no conditions may movie bills be spent inside public registers. Store all stacks securely under locker wraps at sunset wraps to prevent legal alerts or public disruptions.
            </p>
          </div>
        </div>

        {/* Associated Products Section (Internal Linking) */}
        {associatedProducts.length > 0 && (
          <div className="bg-[#0F1522] border border-slate-900 rounded-xl p-6 space-y-4" id="associated-linked-products">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider">
              Featured Props in this Article
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {associatedProducts.map((p) => (
                <div key={p.id} className="bg-slate-950/40 border border-slate-900/60 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-bold text-white text-xs">{p.name}</h5>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">${p.basePrice}.00 CAD</span>
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="py-1.5 px-3 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] font-bold text-[9px] uppercase tracking-wider rounded"
                  >
                    Inspect Stack
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles Box (3 links) */}
        <div className="border-t border-slate-900 pt-8" id="related-articles-box">
          <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">
            Related Journal Entries
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="related-posts-mini-cards">
            {relatedArticles.map((art) => (
              <div
                key={art.slug}
                className="bg-[#0F1522] border border-slate-900/80 rounded-xl p-4 flex flex-col justify-between hover:border-[#FF6B1A]/10 transition-all"
              >
                <div>
                  <span className="text-[8px] font-mono font-medium text-slate-500 uppercase block">{art.category}</span>
                  <h5 className="font-display font-bold text-white text-xs line-clamp-2 mt-1 leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h5>
                </div>
                <Link
                  href={`/blog/${art.slug}`}
                  className="text-[#FF6B1A] hover:underline font-bold text-[9px] uppercase tracking-wider mt-4 block"
                >
                  Read &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* The functional bottom CTA Box (WhatsApp + Catalog Shop buttons) */}
        <div className="bg-[#0A0D14] border border-slate-900 rounded-2xl p-6 text-center space-y-4" id="blog-cta-conclusion-bar">
          <ShieldAlert className="w-8 h-8 text-[#FF6B1A] mx-auto opacity-80" />
          <div className="space-y-1.5">
            <h4 className="font-display font-semibold text-white text-base">Preparing filming specs or require quotations?</h4>
            <p className="text-slate-450 text-xs">Browse the catalog to add items or contact secure dispatch on WhatsApp today.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
            <Link
              href="/products"
              className="py-2.5 px-6 bg-[#FF6B1A] hover:bg-[#e05a10] text-[#070A0F] font-bold text-xs uppercase tracking-wider rounded text-center flex items-center justify-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              <span>Browse Catalog</span>
            </Link>
            <a
              href="https://wa.me/18437320661"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-350 border border-slate-800 font-bold text-xs uppercase tracking-wider rounded text-center flex items-center justify-center space-x-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/10" />
              <span>Chat Dispatcher</span>
            </a>
          </div>
        </div>

      </article>

      {/* Floating Elements & Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
