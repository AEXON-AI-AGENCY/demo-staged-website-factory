/* Hallmark · genre: modern-minimal · macrostructure: bento-grid */
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { VERTICALS } from "@/lib/verticals";

export const metadata: Metadata = {
  title: "Aexon AI — Industry Demos",
  description: "See what AI-built websites look like across 12 industries. Premium, conversion-focused designs for local businesses.",
};

// Industry icons as inline SVGs
const icons: Record<string, React.ReactNode> = {
  plumbing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M9 19l3-3m0 0l3 3m-3-3v12"/>
    </svg>
  ),
  hvac: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  electrician: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  roofer: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  "auto-repair": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
      <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6"/>
      <path d="M9 17h-5"/>
      <path d="M10 6l-1-2h4l-1 2"/>
    </svg>
  ),
  salon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
      <line x1="4" y1="21" x2="20" y2="21"/>
      <line x1="12" y1="16" x2="12" y2="21"/>
    </svg>
  ),
  restaurant: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
      <path d="M7 2v20"/>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
    </svg>
  ),
  "real-estate": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-8l-7-4.5V3h10v5l-7 4.5v4.5l7 4.5v0z"/>
      <path d="M19 14.5V3"/>
      <path d="M12 21v-6l-5-3V3h10v9l-5 3v6"/>
    </svg>
  ),
  "law-firm": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      <path d="M19 3v4"/>
      <path d="M21 5h-4"/>
    </svg>
  ),
  insurance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  clothing: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2l4 4h4l2 4-2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V12l-2-2 2-4h4L6 2z"/>
      <path d="M12 2v8"/>
    </svg>
  ),
  ecommerce: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
};

// Bento card component with personality
function BentoCard({ 
  id, 
  name, 
  industry, 
  accent, 
  description, 
  demoUrl,
  size = "normal",
  featured = false 
}: { 
  id: string; 
  name: string; 
  industry: string; 
  accent: string; 
  description: string; 
  demoUrl: string;
  size?: "normal" | "large" | "wide";
  featured?: boolean;
}) {
  return (
    <a 
      href={demoUrl}
      className={`
        group relative block overflow-hidden rounded-2xl 
        bg-[var(--color-surface)] border border-[var(--color-border)]
        transition-all duration-500 ease-out
        hover:border-transparent hover:shadow-[var(--shadow-hover)]
        ${size === "large" ? "md:col-span-2 md:row-span-2" : ""}
        ${size === "wide" ? "md:col-span-2" : ""}
        ${featured ? "ring-2 ring-offset-2" : ""}
      `}
      style={featured ? { "--tw-ring-color": accent } as React.CSSProperties : undefined}
    >
      {/* Background gradient accent */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`
        }}
      />
      
      {/* Top accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: accent }}
      />
      
      <div className="relative p-6 md:p-8 h-full flex flex-col">
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${accent}15`,
            color: accent 
          }}
        >
          {icons[id]}
        </div>
        
        {/* Industry label */}
        <p 
          className="text-xs font-medium uppercase tracking-wider mb-2"
          style={{ color: accent }}
        >
          {industry}
        </p>
        
        {/* Business name */}
        <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-text)]">
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1">
          {description}
        </p>
        
        {/* Arrow indicator */}
        <div className="flex items-center gap-2 mt-5 text-sm font-medium transition-all duration-300 group-hover:gap-3">
          <span style={{ color: accent }}>View demo</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-lg font-semibold text-[var(--color-text)]">Aexon AI</span>
          </div>
          
          <a
            href="https://aexonai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Learn more
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            <span className="text-sm font-medium text-[var(--color-muted)]">12 Industry Demos Available</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-[1.1] tracking-tight mb-6">
            Websites built to
            <span 
              className="relative inline-block mx-2"
            >
              <span className="relative z-10">convert</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            <br />
            visitors into clients
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Every demo is a complete, production-ready website tailored to its industry. 
            See what AI-built web presence looks like for your vertical.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#demos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-text)] text-white font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              Browse demos
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </a>
            <a
              href="https://aexonai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--color-border)] text-[var(--color-text)] font-medium rounded-full hover:bg-[var(--color-surface)] transition-colors"
            >
              Get started
            </a>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="demos" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            
            {/* Featured: Plumbing (large card) */}
            <BentoCard
              id="plumbing"
              name={VERTICALS.plumbing.name}
              industry={VERTICALS.plumbing.industry}
              accent={VERTICALS.plumbing.accent}
              description={VERTICALS.plumbing.description}
              demoUrl={VERTICALS.plumbing.demoUrl}
              size="large"
              featured
            />

            {/* HVAC */}
            <BentoCard
              id="hvac"
              name={VERTICALS.hvac.name}
              industry={VERTICALS.hvac.industry}
              accent={VERTICALS.hvac.accent}
              description={VERTICALS.hvac.description}
              demoUrl={VERTICALS.hvac.demoUrl}
            />

            {/* Electrician */}
            <BentoCard
              id="electrician"
              name={VERTICALS.electrician.name}
              industry={VERTICALS.electrician.industry}
              accent={VERTICALS.electrician.accent}
              description={VERTICALS.electrician.description}
              demoUrl={VERTICALS.electrician.demoUrl}
            />

            {/* Roofer (wide) */}
            <BentoCard
              id="roofer"
              name={VERTICALS.roofer.name}
              industry={VERTICALS.roofer.industry}
              accent={VERTICALS.roofer.accent}
              description={VERTICALS.roofer.description}
              demoUrl={VERTICALS.roofer.demoUrl}
              size="wide"
            />

            {/* Auto Repair */}
            <BentoCard
              id="auto-repair"
              name={VERTICALS["auto-repair"].name}
              industry={VERTICALS["auto-repair"].industry}
              accent={VERTICALS["auto-repair"].accent}
              description={VERTICALS["auto-repair"].description}
              demoUrl={VERTICALS["auto-repair"].demoUrl}
            />

            {/* Salon */}
            <BentoCard
              id="salon"
              name={VERTICALS.salon.name}
              industry={VERTICALS.salon.industry}
              accent={VERTICALS.salon.accent}
              description={VERTICALS.salon.description}
              demoUrl={VERTICALS.salon.demoUrl}
            />

            {/* Restaurant (featured) */}
            <BentoCard
              id="restaurant"
              name={VERTICALS.restaurant.name}
              industry={VERTICALS.restaurant.industry}
              accent={VERTICALS.restaurant.accent}
              description={VERTICALS.restaurant.description}
              demoUrl={VERTICALS.restaurant.demoUrl}
              featured
            />

            {/* Real Estate */}
            <BentoCard
              id="real-estate"
              name={VERTICALS["real-estate"].name}
              industry={VERTICALS["real-estate"].industry}
              accent={VERTICALS["real-estate"].accent}
              description={VERTICALS["real-estate"].description}
              demoUrl={VERTICALS["real-estate"].demoUrl}
            />

            {/* Law Firm (wide) */}
            <BentoCard
              id="law-firm"
              name={VERTICALS["law-firm"].name}
              industry={VERTICALS["law-firm"].industry}
              accent={VERTICALS["law-firm"].accent}
              description={VERTICALS["law-firm"].description}
              demoUrl={VERTICALS["law-firm"].demoUrl}
              size="wide"
            />

            {/* Insurance */}
            <BentoCard
              id="insurance"
              name={VERTICALS.insurance.name}
              industry={VERTICALS.insurance.industry}
              accent={VERTICALS.insurance.accent}
              description={VERTICALS.insurance.description}
              demoUrl={VERTICALS.insurance.demoUrl}
            />

            {/* Clothing */}
            <BentoCard
              id="clothing"
              name={VERTICALS.clothing.name}
              industry={VERTICALS.clothing.industry}
              accent={VERTICALS.clothing.accent}
              description={VERTICALS.clothing.description}
              demoUrl={VERTICALS.clothing.demoUrl}
            />

            {/* E-Commerce */}
            <BentoCard
              id="ecommerce"
              name={VERTICALS.ecommerce.name}
              industry={VERTICALS.ecommerce.industry}
              accent={VERTICALS.ecommerce.accent}
              description={VERTICALS.ecommerce.description}
              demoUrl={VERTICALS.ecommerce.demoUrl}
            />

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-text)] px-8 py-16 md:px-16 md:py-20 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>
              </svg>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to stand out online?
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
                Get a custom website built in days, not weeks. Starting at competitive prices with dedicated support.
              </p>
              <a
                href="https://aexonai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-text)] font-semibold rounded-full hover:bg-zinc-100 transition-colors"
              >
                Get your website
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span>Built with AI by</span>
            <a 
              href="https://aexonai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-text)] hover:underline"
            >
              Aexon AI
            </a>
          </div>
          <p className="text-sm text-[var(--color-muted-light)]">
            © 2025 Aexon AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
