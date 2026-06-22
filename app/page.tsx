"use client";

import Image from "next/image";
import AexonOrbitalAnimation from "@/components/AexonOrbitalAnimation";

// ─── Icon map (inline SVGs, no external deps) ─────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  hvac: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  electrician: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  salon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z"/>
      <path d="M12 8v4l3 3"/>
    </svg>
  ),
  plumbing: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h6v6H4zM14 4h6v6h-6zM4 14l4-4M14 10l4 4"/>
    </svg>
  ),
  "auto-repair": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3"/>
      <path d="M2 17L6.5 8.5a4.5 4.5 0 0 1 6.4-2.5L14 9l4 4-2.1 2.1a4.5 4.5 0 0 1-2.8 6.7L6 20l-2-1z"/>
    </svg>
  ),
  clothing: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2l-4 1-4-1L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  ),
  restaurant: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
    </svg>
  ),
  "real-estate": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  "law-firm": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 17V9M15 17V9M9 9h6"/>
    </svg>
  ),
  insurance: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  ecommerce: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  "tech-company": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  roofer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  "recording-studio": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
  streetwear: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  barbershop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/>
    </svg>
  ),
  "influencer-brand": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  "health-supplements": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 20.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
      <path d="M10.5 13.5L13 11M10.5 9.5L13 7"/>
    </svg>
  ),
  "food-brand": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 6 5 9 5 13a7 7 0 0 0 14 0c0-4-3-7-7-11z"/>
    </svg>
  ),
};

// ─── Vertical data ────────────────────────────────────────────────────────────
const VERTICALS = {
  hvac:          { name: "CoolPro HVAC",               industry: "HVAC",           accent: "#f97316", description: "Seasonal HVAC website with urgency-driven CTAs, maintenance plans showcase, and fast quote request forms that capture high-intent leads.", demoUrl: "/hvac" },
  electrician:   { name: "Current Electric LLC",        industry: "Electrical",     accent: "#00e5ff", description: "Professional electrical services website with safety certifications front-and-center, service-specific landing pages, and instant scheduling.", demoUrl: "/electrical" },
  salon:          { name: "Glow Studio Salon",          industry: "Salon & Spa",    accent: "#ec4899", description: "Elegant salon website with visual stylist portfolios, service menu with pricing, and seamless online booking integration.", demoUrl: "/salon" },
  plumbing:       { name: "Bay Area Plumbing Co.",      industry: "Plumbing",       accent: "#0ea5e9", description: "Service-focused plumbing website with instant booking, service area mapping, and trust signals that convert browsers into booked appointments.", demoUrl: "/plumbing" },
  "auto-repair": { name: "Apex Auto Care",               industry: "Auto Repair",    accent: "#dc2626", description: "Trust-building auto repair website with transparent pricing, service reminder features, and appointment scheduling that reduces no-shows.", demoUrl: "/auto-repair" },
  roofer:         { name: "TopTier Roofing",            industry: "Roofing",        accent: "#EA580C", description: "Roofing contractor website with project galleries, insurance claim guidance, and inspection request forms optimized for storm damage season.", demoUrl: "/roofing" },
  clothing:       { name: "NOIR Apparel",                industry: "Clothing Brand",  accent: "#8b5cf6", description: "Fashion-forward brand website with lookbook aesthetics, product storytelling, and email capture for drop notifications.", demoUrl: "/clothing" },
  restaurant:     { name: "Mama Rosa's Italian Kitchen", industry: "Restaurant",    accent: "#f59e0b", description: "Restaurant website with embedded menu, reservation system, and catering inquiry forms that capture group booking revenue.", demoUrl: "/restaurant" },
  "real-estate": { name: "Horizon Realty Group",         industry: "Real Estate",    accent: "#10b981", description: "Boutique real estate website with agent profiles, listing showcases, and lead capture forms for buyer/seller inquiries.", demoUrl: "/real-estate" },
  "law-firm":    { name: "Morrison & Associates Law",    industry: "Law Firm",       accent: "#6366f1", description: "Professional law firm website with practice area pages, attorney credentials, and confidential consultation request forms.", demoUrl: "/law-firm" },
  insurance:      { name: "Shield Insurance Partners",   industry: "Insurance",      accent: "#22d3ee", description: "Insurance agency website with carrier comparisons, quote request forms, and trust-building testimonials from satisfied clients.", demoUrl: "/insurance" },
  ecommerce:      { name: "Vitality Nutrition",           industry: "E-Commerce",     accent: "#84cc16", description: "Clean supplement e-commerce website with ingredient transparency, customer reviews, and subscription options for recurring revenue.", demoUrl: "/ecommerce" },
  "tech-company":{ name: "Nexus AI",                      industry: "Tech Company",   accent: "#a78bfa", description: "Enterprise AI platform demo with agentic workflows, data intelligence, and scalable automation showcase.", demoUrl: "/tech-company" },
  // ─── Staged verticals (added 2026-06-13, not yet built — see "Coming soon" badge in card) ───
  "recording-studio":   { name: "Backblock Studioz",     industry: "Recording Studio",   accent: "#ef4444", description: "Recording studio website with session booking, beat store, mix/master service tiers, and artist roster showcase.", demoUrl: "/recording-studio" },
  "streetwear":         { name: "NOIR Apparel",          industry: "Streetwear Brand",   accent: "#facc15", description: "Drop-driven streetwear brand site with countdown timers, restock alerts, and lookbook storytelling that converts hype to checkout.", demoUrl: "/streetwear" },
  "influencer-brand":   { name: "Maya Cole Skincare",    industry: "Influencer Brand",   accent: "#f472b6", description: "Creator-led brand site with founder story, product education, reviews, and email capture that builds a real DTC list (not just Linktree).", demoUrl: "/influencer-brand" },
  "health-supplements": { name: "Vitality Nutrition",    industry: "Health / Supplements", accent: "#c6ff2e", description: "DTC supplement protocol cockpit with ingredient transparency, label lab guidance, and subscription clarity for routine compliance.", demoUrl: "/health-supplements" },
  "food-brand":         { name: "Ember & Oak Hot Sauce", industry: "Food / Beverage Brand", accent: "#f97316", description: "DTC food brand with stockist map, recipe content, subscription bundles, and wholesale inquiry form.", demoUrl: "/food-brand" },
  barbershop:        { name: "Bayside Barbershop",      industry: "Barbershop",         accent: "#dc2626", description: "Neighborhood barbershop website with service menu, barber profiles, online booking, and a vibe that turns first-timers into regulars.", demoUrl: "/barbershop" },
} as const;

type VerticalKey = keyof typeof VERTICALS;

// Verticals that are staged for the prospect pipeline but not yet built as live demos.
// These appear on the landing page as "Coming soon" cards (lower opacity, badge).
const STAGED: Record<VerticalKey, boolean> = {
  hvac: false,
  electrician: false,
  salon: false,
  plumbing: false,
  "auto-repair": false,
  roofer: false,
  clothing: false,
  restaurant: false,
  "real-estate": false,
  "law-firm": false,
  insurance: false,
  ecommerce: false,
  "tech-company": false,
  "recording-studio": false,
  streetwear: false,
  "influencer-brand": false,
  "health-supplements": false,
  "food-brand": false,
  barbershop: false,
};

// ─── Vertical card ─────────────────────────────────────────────────────────────
function VerticalCard({ id, name, industry, accent, description, demoUrl }: {
  id: string; name: string; industry: string; accent: string;
  description: string; demoUrl: string;
}) {
  const isStaged = (STAGED as Record<string, boolean>)[id] ?? false;
  return (
    <a
      href={isStaged ? "#" : demoUrl}
      onClick={isStaged ? (e) => e.preventDefault() : undefined}
      aria-disabled={isStaged}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(24, 24, 27, 0.8)",
        border: `1px solid rgba(63, 63, 70, 0.5)`,
        boxShadow: `0 0 40px ${accent}15`,
        textDecoration: "none",
        color: "#f4f4f5",
        minHeight: "160px",
        transition: "all 0.3s ease",
        cursor: isStaged ? "not-allowed" : "pointer",
        opacity: isStaged ? 0.55 : 1,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 60px ${accent}30`;
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 40px ${accent}15`;
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      {/* Accent bar */}
      <div style={{ width: "40px", height: "3px", borderRadius: "99px", background: accent, marginBottom: "16px", opacity: 0.85 }} />

      {/* Coming soon badge (staged verticals only) */}
      {isStaged && (
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          padding: "3px 8px",
          borderRadius: "99px",
          background: `${accent}30`,
          color: accent,
          fontSize: "9px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          Coming soon
        </div>
      )}

      {/* Icon + industry */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: `${accent}20`, color: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {icons[id]}
        </div>
        <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: accent }}>
          {industry}
        </span>
      </div>

      {/* Business name */}
      <div style={{ fontSize: "15px", fontWeight: 600, color: "#f4f4f5", marginBottom: "6px", lineHeight: 1.3 }}>
        {name}
      </div>

      {/* Description */}
      <div style={{ fontSize: "12px", color: "#a1a1aa", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
        {description}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: accent, marginTop: "auto" }}>
        <span>{isStaged ? "In pipeline" : "View demo"}</span>
        {!isStaged && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        )}
      </div>
    </a>
  );
}

// ─── Bento row helper ──────────────────────────────────────────────────────────
function Row({ keys }: { keys: VerticalKey[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {keys.map((key) => {
        const v = VERTICALS[key];
        return (
          <VerticalCard
            key={key}
            id={key}
            name={v.name}
            industry={v.industry}
            accent={v.accent}
            description={v.description}
            demoUrl={v.demoUrl}
          />
        );
      })}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#09090b", color: "#f4f4f5", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Orbital animation — fixed background, first child, z-index 0 */}
      <AexonOrbitalAnimation />

      {/* Nav */}
      <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="/aexon-logo.png" alt="AEXON AI" width={56} height={38} style={{ height: "auto" }} />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#e4e4e7" }}>Aexon AI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 500, background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            19 live · 0 coming soon
          </span>
          <a href="https://aexonai.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "#a1a1aa", textDecoration: "none" }}>
            aexonai.com →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 500, background: "rgba(34,211,238,0.08)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.15)", marginBottom: "32px" }}>
          AI-built websites for local businesses
        </div>

        {/* Headline — line-height 1.0 for proper descender clearance */}
        <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 900, lineHeight: 1.0, marginBottom: "32px", letterSpacing: "-0.03em" }}>
          <span style={{
            display: "block",
            color: "#ffffff",
            textShadow: "0 1px 0 #000, 0 2px 3px #000, 0 4px 6px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.4)",
          }}>
            Your competitors
          </span>
          <span style={{
            display: "block",
            background: "linear-gradient(90deg, #ffffff 0%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 1px 0 #000) drop-shadow(0 2px 3px #000) drop-shadow(0 4px 6px rgba(0,0,0,0.8)) drop-shadow(0 8px 24px rgba(0,0,0,0.6)) drop-shadow(0 16px 48px rgba(0,0,0,0.4))",
          }}>
            already have
          </span>
          <span style={{
            display: "block",
            color: "#ffffff",
            textShadow: "0 1px 0 #000, 0 2px 3px #000, 0 4px 6px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.4)",
          }}>
            a website.
          </span>
        </h1>

        <p style={{ fontSize: "18px", color: "#a1a1aa", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          These aren't templates. They're full AI-built sites — built for your industry, your customers, your revenue goals. Pick yours, make it yours.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#demos" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "99px", fontSize: "14px", fontWeight: 600, background: "#22d3ee", color: "#09090b", textDecoration: "none", transition: "opacity 0.2s" }}>
            Browse 19 demos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
          <a href="https://aexonai.com/#consultation" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "99px", fontSize: "14px", fontWeight: 600, background: "rgba(255,255,255,0.06)", color: "#f4f4f5", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>
            Talk to us
          </a>
        </div>
      </section>

      {/* Demo cards */}
      <section id="demos" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#f4f4f5", whiteSpace: "nowrap" }}>Industry demos</h2>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: "12px", color: "#52525b", whiteSpace: "nowrap" }}>18 verticals</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Row keys={["hvac", "electrician", "salon"]} />
          <Row keys={["plumbing", "auto-repair", "roofer"]} />
          <Row keys={["clothing", "restaurant", "real-estate"]} />
          <Row keys={["law-firm", "insurance", "ecommerce"]} />
          <Row keys={["tech-company", "recording-studio", "streetwear"]} />
          <Row keys={["influencer-brand", "health-supplements", "food-brand"]} />
          <Row keys={["barbershop"]} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", padding: "64px 32px", borderRadius: "24px", border: "1px solid rgba(129,140,248,0.2)", background: "linear-gradient(135deg, rgba(129,140,248,0.08) 0%, rgba(24,24,27,0.9) 60%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,140,248,0.12), transparent)", pointerEvents: "none" }} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#f4f4f5", marginBottom: "12px", position: "relative" }}>
            Want your site to look like this?
          </h2>
          <p style={{ fontSize: "16px", color: "#a1a1aa", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7, position: "relative" }}>
            We build conversion-focused websites for local businesses in days, not weeks. Starting at competitive prices with dedicated AI-powered support.
          </p>
          <a href="https://aexonai.com/#consultation" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "99px", fontSize: "14px", fontWeight: 600, background: "#22d3ee", color: "#09090b", textDecoration: "none", position: "relative" }}>
            Get started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#52525b" }}>
            <span>Built with AI by</span>
            <a href="https://aexonai.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", fontWeight: 500, color: "#a1a1aa", textDecoration: "none" }}>Aexon AI</a>
          </div>
          <p style={{ fontSize: "14px", color: "#3f3f46" }}>© 2025 Aexon AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
