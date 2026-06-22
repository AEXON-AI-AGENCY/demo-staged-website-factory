"use client";

import React, { useEffect, useState } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import type { ProspectData } from "@/lib/prospect-data";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "800"] });

export const DEFAULT_REAL_ESTATE_PROSPECT: ProspectData = {
  name: "Horizon Realty Group",
  shortName: "HRG",
  phone: "(303) 555-0847",
  phoneHref: "tel:+130****0847",
  email: "listings@horizonrealtyco.com",
  emailHref: "mailto:listings@horizonrealtyco.com",
  city: "Denver",
  state: "CO",
  address: "1600 Champa St, Denver, CO 80202",
  hours: "Mon–Sun: 9AM–7PM",
  about: "Denver's most trusted boutique real estate team. Average 18 years experience per agent.",
  tagline: "Your Home. Our Mission.",
  ctaLabel: "Browse Listings",
  ctaSubLabel: "Free market analysis",
  services: [
    { title: "Home Buyers" },
    { title: "Home Sellers" },
    { title: "Investment Properties" },
    { title: "Relocation Services" },
    { title: "Property Management" },
  ],
  expires: "2099-12-31",
  vertical: "real-estate",
};

const c = {
  dark: {
    bg: "#0a0e1a", nav: "rgba(10,14,26,0.92)", card: "rgba(15,23,42,0.94)", border: "rgba(37,99,235,0.22)",
    text: "#e6efff", textSoft: "rgba(230,239,255,0.68)", textMuted: "rgba(230,239,255,0.46)",
    accent: "#2563EB", accentDark: "#1D4ED8", accentGlow: "rgba(37,99,235,0.34)",
    success: "#38bdf8", selection: "rgba(37,99,235,0.28)", onAccent: "#ffffff",
    borderStrong: "rgba(96,165,250,0.48)", inputBg: "rgba(255,255,255,0.06)",
  },
  light: {
    bg: "#f8fafc", nav: "rgba(248,250,252,0.94)", card: "rgba(255,255,255,0.97)", border: "rgba(37,99,235,0.2)",
    text: "#0f172a", textSoft: "rgba(15,23,42,0.66)", textMuted: "rgba(15,23,42,0.45)",
    accent: "#1D4ED8", accentDark: "#1E40AF", accentGlow: "rgba(29,78,216,0.18)",
    success: "#0369a1", selection: "rgba(37,99,235,0.16)", onAccent: "#ffffff",
    borderStrong: "rgba(29,78,216,0.4)", inputBg: "rgba(15,23,42,0.045)",
  },
};

export default function RealEstatePage({
  prospect = DEFAULT_REAL_ESTATE_PROSPECT,
}: {
  prospect?: ProspectData;
}) {
  const shop = { ...DEFAULT_REAL_ESTATE_PROSPECT, ...prospect };
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("horizon-realty-theme") as "dark" | "light" | null;
    if (stored) setTheme(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const elements = document.querySelectorAll(".scroll-animate");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("scroll-animated");
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [mounted]);

  const colors = c[theme];
  const bodyTextColor = theme === "dark" ? colors.text : colors.text;
  const eyebrowColor = theme === "light" ? colors.accentDark : "#7dd3fc";
  const placeholderColor = theme === "dark" ? "rgba(230,239,255,0.52)" : "rgba(15,23,42,0.56)";

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("horizon-realty-theme", next);
  };

  if (!mounted) {
    return (
      <div style={{ background: c.dark.bg, minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ color: c.dark.textSoft, fontFamily: dmSans.style.fontFamily }}>Loading...</div>
      </div>
    );
  }

  const services = [
    { number: "01", title: shop.services![0].title, description: "Buyer representation built around your lifestyle, target neighborhoods, school priorities, commute, and offer strategy.", tag: "Search · Tour · Offer" },
    { number: "02", title: shop.services![1].title, description: "Data-backed pricing, prep guidance, listing launch plans, and negotiation support that protects your equity.", tag: "Comps · Staging · Close" },
    { number: "03", title: shop.services![2].title, description: "Rental yield review, cap-rate screening, neighborhood trend analysis, and acquisition support for long-term holds.", tag: "Analyze · Acquire" },
    { number: "04", title: shop.services![3].title, description: "A smooth move into Denver with neighborhood shortlists, virtual previews, private walkthroughs, and closing coordination.", tag: "Relocate · Settle" },
  ];

  const chatMessages = [
    { role: "user", text: "We're relocating from Austin with two kids. Looking for a 4-bed in Wash Park or Cherry Creek, budget around $1.2M, good schools." },
    { role: "ai", text: "Welcome to Denver. Wash Park and Cherry Creek are both strong family picks. I found three listings that match, including one with a finished basement near Steele Elementary. Want private tours this Saturday?" },
    { role: "user", text: "Saturday works. Can you also pull school ratings and recent comps for the streets we're seeing?" },
    { role: "ai", text: "Done. I attached school ratings, six months of comps within a half-mile, and HOA notes for each property. The Cherry Creek home has the strongest value per square foot right now." },
    { role: "user", text: "Perfect. Hold all three." },
    { role: "ai", text: "Held. I reserved 10am, 1pm, and 3pm Saturday. I'll text you the addresses that morning with one-tap navigation for each tour. Welcome to Denver. Let's find you home." },
  ];

  const processSteps = [
    { step: "01", title: "Tell Us What You Want", desc: "Share your price range, timing, must-haves, and favorite Denver neighborhoods." },
    { step: "02", title: "AI Matches Listings", desc: "Our concierge ranks active and quiet-market homes against your criteria and recent comps." },
    { step: "03", title: "Tour Homes", desc: "Book private walkthroughs, virtual previews, or weekend tour blocks with your agent." },
    { step: "04", title: "Close with Confidence", desc: "We guide offer terms, inspection strategy, appraisal review, and closing details." },
  ];

  const trustBadges = [
    { icon: "🏔", label: "Denver's Top 1%", sub: "Boutique metro team" },
    { icon: "🏠", label: "$2B+ Sold", sub: "Residential transactions" },
    { icon: "⭐", label: "5-Star Rated", sub: "Buyer and seller clients" },
    { icon: "🤝", label: "18 Years Avg Experience", sub: "Per agent" },
  ];

  const features = [
    { title: "Smart Search", desc: "Rank listings by commute, schools, price history, inspection flags, and walkability instead of basic filters." },
    { title: "Neighborhood Intel", desc: "Compare Wash Park, Cherry Creek, Highlands, Sloan's Lake, and suburbs with local market context." },
    { title: "Offer Strategy", desc: "Review comps, days on market, escalation options, concessions, and inspection terms before you write." },
    { title: "Instant Tour Booking", desc: "Hold private walkthroughs with your agent and receive route links, notes, and reminders automatically." },
  ];

  const inputStyle: React.CSSProperties = {
    background: colors.inputBg,
    border: `1px solid ${colors.border}`,
    borderRadius: "10px",
    padding: "0.85rem 1rem",
    color: colors.text,
    fontSize: "0.88rem",
    fontWeight: 500,
    fontFamily: dmSans.style.fontFamily,
    minWidth: 0,
  };

  return (
    <div style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, rgba(0,0,0,0.0) 100%), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80') center/cover no-repeat fixed`,
      color: colors.text,
      fontFamily: dmSans.style.fontFamily,
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${colors.selection}; color: ${colors.onAccent}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${colors.borderStrong}; border-radius: 3px; }
        .key-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .key-spark { position: absolute; width: 34px; height: 34px; opacity: 0; bottom: -40px; color: ${colors.accent}; filter: drop-shadow(0 0 8px ${colors.accentGlow}); animation: keyRise 9s linear infinite; }
        .key-spark svg { width: 100%; height: 100%; }
        @keyframes keyRise {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(0.7); opacity: 0; }
          12% { opacity: 0.34; }
          70% { opacity: 0.18; }
          100% { transform: translateY(-105vh) translateX(32px) rotate(14deg) scale(1); opacity: 0; }
        }
        .key-1 { left: 8%; animation-delay: 0s; animation-duration: 10s; }
        .key-2 { left: 22%; animation-delay: 2.4s; animation-duration: 12s; transform-origin: center; }
        .key-3 { left: 42%; animation-delay: 1.1s; animation-duration: 11s; }
        .key-4 { left: 67%; animation-delay: 3.2s; animation-duration: 13s; }
        .key-5 { left: 86%; animation-delay: 1.8s; animation-duration: 10.5s; }
        .scroll-animate { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0); }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.18); }
        .nav-link:hover { color: ${colors.accent} !important; }
        .real-estate-input::placeholder { color: ${placeholderColor}; font-weight: 500; opacity: 1; }
        .theme-button:hover, .pill-button:hover { transform: translateY(-2px); }
        @media (max-width: 920px) {
          .desktop-links { display: none !important; }
          .responsive-two, .responsive-four { grid-template-columns: 1fr !important; }
          .responsive-three { grid-template-columns: 1fr !important; }
          .hero-section { padding-top: 4rem !important; }
        }
        @media (max-width: 620px) {
          .nav-phone { display: none !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .hero-actions { flex-direction: column !important; }
          .hero-actions a { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="key-overlay" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`key-spark key-${n}`}>
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="2.5" />
              <path d="M14 14L25 25M21 21L25 17M18 18L22 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: colors.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${colors.border}`, padding: "0 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "68px", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
            <div style={{ fontSize: "1.55rem" }}>🏡</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.05rem", fontWeight: 700, color: colors.text, lineHeight: 1, whiteSpace: "nowrap" }}>{shop.name}</div>
              <div style={{ display: "inline-flex", fontSize: "0.62rem", letterSpacing: "0.14em", color: eyebrowColor, textTransform: "uppercase", marginTop: "5px", fontWeight: 700, border: `1px solid ${colors.border}`, borderRadius: "999px", padding: "0.16rem 0.48rem" }}>{shop.tagline}</div>
            </div>
          </div>
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {["Listings", "AI Concierge", "About", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`} style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.86rem", fontWeight: 600, letterSpacing: "0.03em", transition: "color 0.2s" }} className="nav-link">
                {link}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a className="nav-phone" href={shop.phoneHref} style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap" }}>{shop.phone}</a>
            <button className="theme-button" onClick={toggleTheme} aria-label="Toggle color theme" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "0.45rem 0.85rem", cursor: "pointer", color: colors.text, fontSize: "0.8rem", fontFamily: dmSans.style.fontFamily, display: "flex", alignItems: "center", gap: "0.4rem", transition: "transform 0.2s" }}>
              {theme === "dark" ? "☀" : "☾"} {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section" style={{ position: "relative", zIndex: 2, padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="responsive-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 800 }}>Now Selling — Denver Metro</div>
            <h1 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(2.5rem, 5vw, 4.6rem)", lineHeight: 1.08, color: colors.text, margin: "0 0 1.5rem" }}>
              Your Denver Move, <br /><span style={{ color: colors.accent }}>Guided with Precision.</span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: bodyTextColor, lineHeight: 1.72, margin: "0 0 2.5rem", maxWidth: "520px", fontWeight: 600 }}>
              {shop.about} From first search to final signature, our agents pair local market judgment with AI-assisted listing intelligence.
            </p>
            <div className="hero-actions" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a className="pill-button" href="#listings" style={{ background: colors.accent, color: colors.onAccent, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 800, fontSize: "0.9rem", boxShadow: `0 0 24px ${colors.accentGlow}`, transition: "transform 0.2s" }}>{shop.ctaLabel}</a>
              <a className="pill-button" href="#contact" style={{ border: `1.5px solid ${colors.borderStrong}`, color: colors.text, background: colors.card, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", transition: "transform 0.2s" }}>Schedule a Walkthrough</a>
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 24px 64px rgba(0,0,0,0.42)", border: `1px solid ${colors.border}` }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80" alt="Modern Denver home exterior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", background: "rgba(2,6,23,0.76)", backdropFilter: "blur(10px)", borderRadius: "10px", padding: "0.85rem 1.15rem", border: "1px solid rgba(255,255,255,0.14)" }}>
              <div style={{ fontSize: "0.72rem", color: "#93c5fd", fontWeight: 800, marginBottom: "3px", letterSpacing: "0.12em" }}>FEATURED DENVER LISTINGS</div>
              <div style={{ fontSize: "0.86rem", color: "white", fontWeight: 600 }}>Private tours, comps, and offer strategy in one flow →</div>
            </div>
          </div>
        </div>

        <div className="responsive-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "4rem", padding: "1.75rem 2rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
          {[
            { label: "Office Hours", value: shop.hours },
            { label: "Office Location", value: shop.address },
            { label: "Speak to an Agent", value: `${shop.phone}\n${shop.ctaSubLabel}` },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: eyebrowColor, fontWeight: 800, textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.label}</div>
              <div style={{ fontSize: "0.9rem", color: bodyTextColor, whiteSpace: "pre-line", lineHeight: 1.6, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="listings" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 800 }}>What We Handle</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Real Estate Services</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {services.map((s) => (
            <div key={s.number} className="scroll-animate card-hover" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "14px", padding: "2rem" }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "2.8rem", color: colors.accent, opacity: 0.35, lineHeight: 1, marginBottom: "1rem" }}>{s.number}</div>
              <h3 style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.35rem", fontWeight: 700, color: colors.text, margin: "0 0 0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.95rem", color: bodyTextColor, lineHeight: 1.7, margin: "0 0 1.25rem", fontWeight: 600 }}>{s.description}</p>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: eyebrowColor, fontWeight: 800, textTransform: "uppercase" }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="ai-concierge" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 800 }}>AI Concierge</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>A Smarter Way to Find Home</h2>
          <p style={{ fontSize: "1.05rem", color: bodyTextColor, marginTop: "1rem", maxWidth: "560px", margin: "1rem auto 0", fontWeight: 600, lineHeight: 1.7 }}>Ask about neighborhoods, comps, school data, walkthroughs, and offer timing before you ever step inside a listing.</p>
        </div>
        <div className="responsive-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", background: colors.accent, display: "grid", placeItems: "center", color: colors.onAccent, fontSize: "1rem" }}>AI</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: colors.text }}>{`${shop.name.split(' ')[0]} AI Concierge`}</div>
                <div style={{ fontSize: "0.75rem", color: colors.success, fontWeight: 700 }}>● Online — tours, comps, and listings</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "78%", padding: "0.85rem 1.1rem", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.role === "user" ? colors.accent : colors.inputBg, color: msg.role === "user" ? colors.onAccent : colors.text, fontSize: "0.88rem", lineHeight: 1.6, border: `1px solid ${msg.role === "user" ? "transparent" : colors.border}`, fontFamily: dmSans.style.fontFamily, fontWeight: 600 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
              <input className="real-estate-input" type="text" placeholder="Describe your ideal Denver home..." readOnly style={{ ...inputStyle, flex: 1, borderRadius: "999px" }} />
              <button style={{ background: colors.accent, color: colors.onAccent, border: "none", borderRadius: "999px", padding: "0.75rem 1.5rem", fontWeight: 800, cursor: "pointer", fontSize: "0.88rem" }}>Send</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {features.map((feat) => (
              <div key={feat.title} className="scroll-animate" style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: colors.card, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: colors.accentGlow, display: "grid", placeItems: "center", flexShrink: 0, color: colors.accent, fontSize: "1.1rem", fontWeight: 800 }}>✓</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: colors.text, marginBottom: "0.35rem" }}>{feat.title}</div>
                  <div style={{ fontSize: "0.9rem", color: bodyTextColor, lineHeight: 1.65, fontWeight: 600 }}>{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 800 }}>How It Works</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>From Search to Closing</h2>
        </div>
        <div className="responsive-four" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {processSteps.map((step) => (
            <div key={step.step} className="scroll-animate" style={{ textAlign: "center", padding: "2rem 1.5rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "3.5rem", color: colors.accent, opacity: 0.42, lineHeight: 1, marginBottom: "1rem" }}>{step.step}</div>
              <h3 style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.1rem", fontWeight: 800, color: colors.text, margin: "0 0 0.75rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.9rem", color: bodyTextColor, lineHeight: 1.7, fontWeight: 600 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 2, padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="responsive-four" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          {trustBadges.map((badge) => (
            <div key={badge.label} className="scroll-animate" style={{ textAlign: "center", padding: "1.75rem 1rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{badge.icon}</div>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "0.95rem", fontWeight: 700, color: colors.text, marginBottom: "0.35rem" }}>{badge.label}</div>
              <div style={{ fontSize: "0.75rem", color: colors.textSoft, fontWeight: 600 }}>{badge.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "5rem 2rem", maxWidth: "1200px", margin: "2rem auto", background: colors.bg, borderRadius: "20px", border: `1px solid ${colors.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div className="responsive-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 800 }}>Get in Touch</div>
            <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: "0 0 1.25rem" }}>Schedule a Walkthrough</h2>
            <p style={{ fontSize: "1rem", color: bodyTextColor, lineHeight: 1.75, marginBottom: "2rem", fontWeight: 600 }}>Ready to buy, sell, or explore your options in Denver? Tell us what you need and an agent will follow up with listings, comps, and next steps.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { label: "Address", value: shop.address },
                { label: "Phone", value: shop.phone },
                { label: "Hours", value: shop.hours },
                { label: "Email", value: shop.email },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: eyebrowColor, width: "70px", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", color: bodyTextColor, fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Walkthrough request received. A Horizon Realty Group agent will follow up shortly."); }} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input className="real-estate-input" required type="text" placeholder="Your Name" style={inputStyle} />
              <input className="real-estate-input" required type="email" placeholder="Email Address" style={inputStyle} />
            </div>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input className="real-estate-input" required type="tel" placeholder="Phone Number" style={inputStyle} />
              <input className="real-estate-input" required type="text" placeholder="Budget Range" style={inputStyle} />
            </div>
            <select required style={inputStyle} defaultValue="">
              <option value="" disabled>I'm looking to</option>
              <option>Buy</option>
              <option>Sell</option>
              <option>Both</option>
              <option>Explore</option>
            </select>
            <select required style={inputStyle} defaultValue="">
              <option value="" disabled>Timeline</option>
              <option>0–3 months</option>
              <option>3–6 months</option>
              <option>6–12 months</option>
              <option>Just browsing</option>
            </select>
            <textarea className="real-estate-input" placeholder="Tell us about your ideal home…" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            <button type="submit" style={{ background: colors.accent, color: colors.onAccent, border: "none", borderRadius: "999px", padding: "1rem", fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: `0 0 24px ${colors.accentGlow}`, fontFamily: dmSans.style.fontFamily }}>
              Schedule a Walkthrough
            </button>
          </form>
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${colors.border}`, padding: "3rem 2rem", background: colors.card }}>
        <div className="responsive-three" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "2rem", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>🏡</span>
              <span style={{ fontFamily: playfair.style.fontFamily, fontSize: "0.95rem", fontWeight: 700, color: colors.text }}>{shop.name}</span>
            </div>
            <div style={{ color: colors.textSoft, fontSize: "0.85rem", fontWeight: 600 }}>{shop.tagline}</div>
          </div>
          <div style={{ fontSize: "0.84rem", color: colors.textSoft, fontWeight: 600, lineHeight: 1.8 }}>{shop.address}<br />{shop.phone}<br />{shop.email}</div>
          <div style={{ textAlign: "left" }}>
            <a href="#contact" style={{ color: eyebrowColor, textDecoration: "none", fontSize: "0.9rem", fontWeight: 800 }}>Schedule a Walkthrough →</a>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "2rem auto 0", textAlign: "center", fontSize: "0.8rem", color: colors.text, fontWeight: 600 }}>
          © 2026 {shop.name}. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
