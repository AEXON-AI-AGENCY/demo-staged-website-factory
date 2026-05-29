/* Hallmark · macrostructure: Manifesto · theme: Studio · accent: indigo */
"use client";
import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import "./globals.css";
import { VERTICALS } from "@/lib/verticals";
import AexonOrbitalAnimation from "@/components/AexonOrbitalAnimation";

// ─── Industry icons ───────────────────────────────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  plumbing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M9 19l3-3m0 0l3 3m-3-3v12"/>
    </svg>
  ),
  hvac: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/><circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  electrician: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  roofer: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  "auto-repair": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6M9 17h-5"/>
    </svg>
  ),
  salon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/><line x1="12" y1="16" x2="12" y2="21"/>
    </svg>
  ),
  restaurant: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
    </svg>
  ),
  "real-estate": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-8l-7-4.5V3h10v5l-7 4.5v4.5l7 4.5v0z"/><path d="M19 14.5V3"/><path d="M12 21v-6l-5-3V3h10v9l-5 3v6"/>
    </svg>
  ),
  "law-firm": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
    </svg>
  ),
  insurance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  clothing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2l4 4h4l2 4-2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V12l-2-2 2-4h4L6 2z"/><path d="M12 2v8"/>
    </svg>
  ),
  ecommerce: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  "tech-company": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/>
      <line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/>
      <line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/>
      <line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/>
      <line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
};

// ─── Vertical card ─────────────────────────────────────────────────────────────
function VerticalCard({ id, name, industry, accent, description, demoUrl }: {
  id: string; name: string; industry: string; accent: string;
  description: string; demoUrl: string;
}) {
  return (
    <a
      href={demoUrl}
      className="vertical-card group block rounded-2xl p-5 border"
      style={{
        background: `rgba(24,24,27,0.6)`,
        borderColor: `rgba(63,63,70,0.5)`,
        boxShadow: `--card-glow, ${accent}15`,
        "--card-glow": `0 0 40px ${accent}20`,
      } as React.CSSProperties}
    >
      {/* Accent bar at top */}
      <div
        className="h-0.5 rounded-full mb-4 transition-all duration-500 group-hover:opacity-100 opacity-60"
        style={{ background: accent }}
      />

      {/* Icon + industry */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}20`, color: accent }}
        >
          {icons[id]}
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
          {industry}
        </span>
      </div>

      {/* Business name */}
      <h3 className="text-base font-semibold text-zinc-100 mb-2 leading-snug">
        {name}
      </h3>

      {/* Description */}
      <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-xs font-medium transition-all duration-300 group-hover:gap-2.5" style={{ color: accent }}>
        <span>View demo</span>
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
}

// ─── Cursor spotlight ──────────────────────────────────────────────────────────
function CursorSpotlight() {
  React.useEffect(() => {
    const el = document.getElementById("hero-spotlight");
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", handler);
    return () => el.removeEventListener("pointermove", handler);
  }, []);
  return null;
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-zinc-100">

      <CursorSpotlight />

      {/* ── Brain animation — page-level fixed background ──────────────────── */}
      <AexonOrbitalAnimation />

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/aexon-logo.png" alt="AEXON AI" width={56} height={38} className="h-auto" />
            <span className="text-sm font-semibold text-zinc-200">Aexon AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
              13 live demos
            </span>
            <a
              href="https://aexonai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              aexonai.com →
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero — Manifesto with cursor spotlight ─────────────────────────── */}
      <section
        id="hero-spotlight"
        className="hero-spotlight relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
      >
        {/* Grid background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <svg className="w-full h-full opacity-[0.035]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#818cf8" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Eyebrow */}
          <div className="animate-fade-up animate-delay-100 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-medium mb-8"
            style={{
              background: "rgba(129,140,248,0.08)",
              borderColor: "rgba(129,140,248,0.25)",
              color: "var(--color-accent)"
            }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)" }}/>
            AI-built websites for local businesses
          </div>

          {/* Headline — manifesto large type */}
          <h1 className="animate-fade-up animate-delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] mb-6 text-zinc-100">
            <span className="text-3d">Your competitors</span>
            <br />
            <span className="gradient-text">already have</span>
            <br />
            <span className="text-3d">a website.</span>
          </h1>

          {/* Lede */}
          <p className="animate-fade-up animate-delay-300 text-base md:text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
            These aren&apos;t templates. They&apos;re full AI-built sites — built for your industry, 
            your customers, your revenue goals. Pick yours, make it yours.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-delay-400 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#demos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--color-accent)", color: "#09090b" }}
            >
              Browse 12 demos
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </a>
            <a
              href="https://aexonai.com/#consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-zinc-800/50"
              style={{ borderColor: "rgba(255,255,255,0.12)", color: "var(--color-text)" }}
            >
              Talk to us
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up animate-delay-500 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-zinc-600">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1.5">
            <div className="w-0.5 h-2 rounded-full animate-bounce" style={{ background: "var(--color-accent)" }}/>
          </div>
        </div>
      </section>

      {/* ── Demo grid ──────────────────────────────────────────────────────── */}
      <section id="demos" className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-12 flex items-baseline gap-4">
            <h2 className="text-2xl font-bold text-zinc-100">Industry demos</h2>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }}/>
            <span className="text-xs text-zinc-600">13 verticals</span>
          </div>

          {/* Bento-style grid with varying card sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Row 1: 3 normals */}
            {(["hvac", "electrician", "salon"] as const).map((key, i) => {
              const v = VERTICALS[key];
              return (
                <div key={key} className={`animate-fade-up animate-delay-${(i + 1) * 100}`}>
                  <VerticalCard id={key} name={v.name} industry={v.industry} accent={v.accent} description={v.description} demoUrl={v.demoUrl} />
                </div>
              );
            })}

            {/* Row 2: plumber wide, 2 normals */}
            {(["plumbing", "auto-repair", "clothing"] as const).map((key, i) => {
              const v = VERTICALS[key];
              return (
                <div key={key} className={key === "plumbing" ? "lg:col-span-2" : ""}>
                  <VerticalCard id={key} name={v.name} industry={v.industry} accent={v.accent} description={v.description} demoUrl={v.demoUrl} />
                </div>
              );
            })}

            {/* Row 3: 3 normals */}
            {(["restaurant", "real-estate", "law-firm"] as const).map((key) => {
              const v = VERTICALS[key];
              return (
                <div key={key}>
                  <VerticalCard id={key} name={v.name} industry={v.industry} accent={v.accent} description={v.description} demoUrl={v.demoUrl} />
                </div>
              );
            })}

            {/* Row 4: insurance (wide), ecommerce, tech-company */}
            {(["insurance", "ecommerce", "tech-company"] as const).map((key, i) => {
              const v = VERTICALS[key];
              return (
                <div key={key} className={i === 0 ? "lg:col-span-1" : ""}>
                  <VerticalCard id={key} name={v.name} industry={v.industry} accent={v.accent} description={v.description} demoUrl={v.demoUrl}  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA strip ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-16 md:py-20 text-center border"
            style={{
              background: "linear-gradient(135deg, rgba(129,140,248,0.08) 0%, rgba(24,24,27,0.9) 60%)",
              borderColor: "rgba(129,140,248,0.2)"
            }}
          >
            {/* Glow */}
            <div className="absolute inset-0" aria-hidden="true" style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,140,248,0.12), transparent)"
            }}/>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
                Want your site to look like this?
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
                We build conversion-focused websites for local businesses in days, not weeks. 
                Starting at competitive prices with dedicated AI-powered support.
              </p>
              <a
                href="https://aexonai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={{ background: "var(--color-accent)", color: "#09090b" }}
              >
                Get started
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span>Built with AI by</span>
            <a href="https://aexonai.com" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
              Aexon AI
            </a>
          </div>
          <p className="text-sm text-zinc-700">© 2025 Aexon AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}