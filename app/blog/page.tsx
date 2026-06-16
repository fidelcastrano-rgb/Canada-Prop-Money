"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, User, Clock, ArrowRight, Landmark } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export default function BlogListingPage() {
  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section className="bg-slate-950/40 border-b border-slate-900 py-16 relative overflow-hidden" id="blog-listing-hero">
        <div className="absolute top-1/2 left-1/4 w-[250px] h-[250px] bg-[#6A8E4E]/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <nav className="flex justify-center items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-2" aria-label="Breadcrumb navigation trail">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-[#FF6B1A]">Articles & Regulations</span>
          </nav>
          
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none max-w-2xl mx-auto">
            The Canadian Prop Money Journal
          </h1>
          <p className="text-slate-450 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Essential guides regarding federal guidelines, paper properties for extreme closeups, and budgeting strategies for production houses.
          </p>
        </div>
      </section>

      {/* Blog Grid of All Articles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="blog-listing-feed-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="blog-posts-list-grid">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="bg-[#0F1522] border border-slate-900 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-[#FF6B1A]/20 transition-all duration-300 flex flex-col justify-between shadow-lg"
              id={`blog-item-${post.slug}`}
            >
              <div>
                {/* Hero Image in List */}
                <div className="relative aspect-[16/10] bg-slate-950 border-b border-slate-900 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-75"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-mono uppercase bg-[#FF6B1A] text-[#070A0F] font-bold px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 space-y-3">
                  {/* Meta Bar */}
                  <div className="flex items-center space-x-4 text-[10px] sm:text-xs text-slate-500 font-mono">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-display font-semibold text-lg text-white tracking-tight hover:text-[#FF6B1A] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-slate-405 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="p-6 pt-0 border-t border-slate-950 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-white hover:text-[#FF6B1A] text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-all"
                  aria-label={`Read full article: ${post.title}`}
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Brief */}
      <section className="py-16 bg-slate-950/40 border-t border-slate-900/60" id="blog-legal-notebg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Landmark className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="font-display font-semibold text-slate-200">Regulatory Adherence & Training Guidelines</h3>
          <p className="text-xs text-slate-450 leading-relaxed max-w-xl mx-auto">
            Our journal provides procedural training for media departments. No entries advocate, suggest, or support the circulation of replica currency bills as live tender. We adhere strictly to federal rules.
          </p>
        </div>
      </section>

      {/* Floating Elements & Cart */}
      <FloatingElements />

      <Footer />
    </>
  );
}
