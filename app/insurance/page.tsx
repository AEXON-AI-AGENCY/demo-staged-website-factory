"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

type Theme = "light" | "dark";

const colors = {
  light: {
    bg: "#ffffff",
    band: "#f4f4f4",
    layer: "#e0e0e0",
    text: "#161616",
    muted: "#525252",
    subtle: "#6f6f6f",
    border: "#c6c6c6",
    accent: "#0f62fe",
    accentSoft: "#edf5ff",
    dark: "#161616",
    dark2: "#262626",
    inverse: "#f4f4f4",
    inverseMuted: "#c6c6c6",
  },
  dark: {
    bg: "#161616",
    band: "#262626",
    layer: "#393939",
    text: "#f4f4f4",
    muted: "#c6c6c6",
    subtle: "#8d8d8d",
    border: "#525252",
    accent: "#4589ff",
    accentSoft: "rgba(69, 137, 255, 0.16)",
    dark: "#161616",
    dark2: "#262626",
    inverse: "#f4f4f4",
    inverseMuted: "#c6c6c6",
  },
} as const;

const rates = [
  { carrier: "Progressive", annual: "$1,847", semi: "$947", monthly: "$167", deductible: "$500", coverage: "Liability + Collision", rating: "A+" },
  { carrier: "GEICO", annual: "$1,923", semi: "$985", monthly: "$173", deductible: "$500", coverage: "Liability + Collision", rating: "A++" },
  { carrier: "State Farm", annual: "$1,756", semi: "$899", monthly: "$158", deductible: "$1,000", coverage: "Liability + Collision", rating: "A+" },
  { carrier: "Allstate", annual: "$2,012", semi: "$1,030", monthly: "$181", deductible: "$250", coverage: "Premium", rating: "A+" },
  { carrier: "Liberty Mutual", annual: "$1,694", semi: "$868", monthly: "$152", deductible: "$1,000", coverage: "Standard", rating: "A" },
];

const productLines = [
  {
    title: "Auto policies built around premium, deductible, and driver profile.",
    cta: "Get an auto quote",
    bg: "#161616",
    bullets: ["Liability, collision, comprehensive, uninsured motorist", "Deductible options from $250 to $1,000", "Carrier comparisons for clean record, multi-car, and bundle discounts"],
  },
  {
    title: "Homeowners coverage with limits that match replacement cost.",
    cta: "Get a home quote",
    bg: "#262626",
    bullets: ["Dwelling, personal property, loss-of-use, and liability limits", "Wind, flood, endorsement, and rider review for Florida risk", "Bundle checks against current mortgage and escrow requirements"],
  },
  {
    title: "Business policies for liability, property, and continuity.",
    cta: "Get a business quote",
    bg: "#161616",
    bullets: ["General liability, BOP, workers comp, and commercial auto", "Certificate routing for vendors, landlords, and job sites", "Annual policy review before renewal and premium increases"],
  },
];

const carriers = ["Progressive", "GEICO", "State Farm", "Allstate", "Liberty Mutual", "Nationwide", "Travelers", "Chubb", "AIG", "MetLife", "Prudential", "Humana"];

const contactRows = [
  ["Address", "1000 Brickell Ave, Miami, FL 33131"],
  ["Phone", "(305) 555-0176"],
  ["Hours", "Mon-Fri: 9AM-5PM"],
  ["Email", "quotes@shieldinsurancepartners.com"],
];

export default function InsurancePage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [zip, setZip] = useState("33131");
  const [coverageType, setCoverageType] = useState("Auto");
  const [selectedCarrier, setSelectedCarrier] = useState("State Farm");
  const [savings, setSavings] = useState(0);
  const [tableFlash, setTableFlash] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const c = colors[theme];
  const oppositeTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const stored = localStorage.getItem("shield-insurance-theme") as Theme | null;
    const mountTimer = window.setTimeout(() => {
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
      }
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const reduceTimer = window.setTimeout(() => setSavings(847), 0);
      return () => window.clearTimeout(reduceTimer);
    }

    let frame = 0;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSavings(Math.round(eased * 847));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("insurance-js");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animated");
          }
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".scroll-animate").forEach((node) => {
      if (reduceMotion) node.classList.add("scroll-animated");
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const tableStatus = useMemo(() => {
    const cleanZip = zip.match(/^\d{5}$/) ? zip : "33131";
    return `Showing estimated rates for ZIP ${cleanZip} · 30yr old driver · clean record · 2022 Honda Civic. Adjust in step 2 →`;
  }, [zip]);

  const toggleTheme = () => {
    setTheme(oppositeTheme);
    localStorage.setItem("shield-insurance-theme", oppositeTheme);
  };

  const submitQuote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTableFlash(true);
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => setTableFlash(false), 900);
  };

  if (!mounted) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: colors.light.bg, color: colors.light.text, fontFamily: plexSans.style.fontFamily }}>
        Loading quote tool...
      </main>
    );
  }

  return (
    <main style={{ background: c.bg, color: c.text, fontFamily: plexSans.style.fontFamily, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
/* Hallmark · macrostructure: Tool-Led Hero · tone: institutional-engineering
 * theme: IBM Carbon · accent: IBM Blue 60 (#0f62fe) · mono: IBM Plex Mono
 * display: IBM Plex Sans weight 300 · body: IBM Plex Sans weight 400
 * differs from last 3: 0px radius (was 14-20px) · flat bands (was Unsplash) ·
 *   tool-led hero (was 2-col text+image) · IBM Plex (was Playfair+DM Sans) ·
 *   data-table (was 4-card grid) · 3 dark product bands (was 4 process steps)
 */
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${c.accent}; color: #ffffff; }
        a, button, input, select { font: inherit; }
        button, input, select, .panel, .rate-table, .chat-card { border-radius: 0; }
        .mono { font-family: ${plexMono.style.fontFamily}; }
        .container { width: min(1200px, calc(100vw - 48px)); margin: 0 auto; }
        .scroll-animate { opacity: 1; transform: none; transition: opacity 560ms ease, transform 560ms ease; }
        .insurance-js .scroll-animate { opacity: 1; transform: none; }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0); }
        .input-line, .select-line {
          width: 100%;
          height: 48px;
          border: 0;
          border-bottom: 2px solid ${c.border};
          border-radius: 0;
          background: ${c.band};
          color: ${c.text};
          padding: 0 16px;
          outline: none;
        }
        .input-line:focus, .select-line:focus { border-bottom-color: ${c.accent}; }
        .contact-input {
          height: 40px;
          border: 0;
          border-bottom: 2px solid transparent;
          border-radius: 0;
          background: ${c.band};
          color: ${c.text};
          padding: 0 12px;
          outline: none;
        }
        .contact-input:focus { border-bottom-color: ${c.accent}; }
        .primary-button {
          height: 48px;
          border: 0;
          border-radius: 0;
          background: ${c.accent};
          color: #ffffff;
          cursor: pointer;
          padding: 14px 63px 14px 15px;
        }
        .link-button { color: ${c.accent}; background: transparent; border: 0; border-radius: 0; cursor: pointer; padding: 0; text-align: left; }
        .rate-grid { min-width: 980px; }
        .table-flash { animation: tableFlash 900ms ease; }
        @keyframes tableFlash {
          0% { background: ${c.accentSoft}; }
          100% { background: transparent; }
        }
        .ticker-mark { display: inline-block; width: 12px; height: 12px; border: 2px solid #525252; border-top-color: ${colors.dark.accent}; animation: spin 900ms linear infinite; margin-left: 8px; vertical-align: middle; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
          .scroll-animate { opacity: 1; transform: none; }
        }
        @media (max-width: 920px) {
          .hero-grid, .contact-grid, .chat-grid { grid-template-columns: 1fr !important; }
          .hero-copy h1 { font-size: 48px !important; }
          .product-band { padding: 72px 0 !important; }
          .nav-links { display: none !important; }
        }
        @media (max-width: 640px) {
          .container { width: min(100% - 32px, 1200px); }
          .hero-copy h1 { font-size: 40px !important; }
          .hero-form { grid-template-columns: 1fr !important; }
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-strip, .coverage-grid, .footer-grid { grid-template-columns: 1fr !important; }
          .product-headline { font-size: 34px !important; }
        }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: 48, background: "#161616", color: "#f4f4f4", borderBottom: "1px solid #393939" }}>
        <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#quote" style={{ color: "#f4f4f4", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>Shield Insurance Partners</a>
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 32, height: "100%" }}>
            {["Quote", "Rates", "Coverage", "AI Advisor", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{ height: "100%", display: "grid", placeItems: "center", color: "#c6c6c6", textDecoration: "none", fontSize: 13, borderBottom: item === "Quote" ? `3px solid ${colors.light.accent}` : "3px solid transparent" }}>{item}</a>
            ))}
          </div>
          <button onClick={toggleTheme} style={{ height: 48, border: 0, borderLeft: "1px solid #393939", borderRight: "1px solid #393939", background: "#262626", color: "#f4f4f4", borderRadius: 0, padding: "0 16px", cursor: "pointer", fontSize: 13 }}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </nav>

      <section id="quote" style={{ background: c.bg, minHeight: "70vh", display: "grid", alignItems: "center", padding: "96px 0 80px" }}>
        <div className="container hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 3fr) minmax(320px, 2fr)", gap: 48, alignItems: "stretch" }}>
          <div className="hero-copy scroll-animate" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="mono" style={{ color: c.accent, fontSize: 12, letterSpacing: "0.32px", marginBottom: 24 }}>INDEPENDENT AGENCY · MIAMI FL</div>
            <h1 style={{ fontSize: 60, lineHeight: 1.05, fontWeight: 300, letterSpacing: 0, margin: "0 0 24px", maxWidth: 680 }}>30+ Carriers. One Form. Best Rate.</h1>
            <p style={{ color: c.muted, fontSize: 18, lineHeight: 1.55, maxWidth: 640, margin: "0 0 40px" }}>We shop 30+ top-rated carriers so you don&apos;t have to. Average customer saves $847/yr.</p>
            <form onSubmit={submitQuote} className="hero-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 16, alignItems: "end", maxWidth: 900 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span className="mono" style={{ fontSize: 12, color: c.subtle }}>STEP 1 · ZIP</span>
                <input className="input-line mono" inputMode="numeric" maxLength={5} pattern="[0-9]{5}" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} aria-label="ZIP code" />
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span className="mono" style={{ fontSize: 12, color: c.subtle }}>STEP 2 · COVERAGE</span>
                <select className="select-line" value={coverageType} onChange={(event) => setCoverageType(event.target.value)} aria-label="Coverage type">
                  {["Auto", "Home", "Bundle", "Other"].map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <button className="primary-button" type="submit" style={{ whiteSpace: "nowrap" }}>See my quotes →</button>
            </form>
            <p className="mono" style={{ color: c.subtle, fontSize: 12, margin: "16px 0 0" }}>Step 3 · {coverageType} quote request · No spam, no pressure</p>
          </div>
          <aside className="panel scroll-animate" style={{ background: "#161616", color: "#f4f4f4", padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 440 }}>
            <div>
              <div className="mono" style={{ color: "#8d8d8d", fontSize: 12, letterSpacing: "0.32px", marginBottom: 20 }}>ESTIMATED SAVINGS<span className="ticker-mark" aria-hidden="true" /></div>
              <div className="mono" style={{ fontSize: 48, lineHeight: 1, color: "#f4f4f4" }}>${savings.toLocaleString()}</div>
              <div className="mono" style={{ color: "#8d8d8d", fontSize: 12, marginTop: 12 }}>your rate varies by profile</div>
            </div>
            <ul className="mono" style={{ listStyle: "none", padding: 0, margin: "48px 0 0", display: "grid", gap: 16, color: "#c6c6c6", fontSize: 13, lineHeight: 1.5 }}>
              <li>✓ 30+ carriers compared</li>
              <li>✓ No spam, no obligation</li>
              <li>✓ A+ BBB rated agency</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="rates" ref={tableRef} style={{ background: c.band, padding: "88px 0" }}>
        <div className="container scroll-animate">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", marginBottom: 32 }}>
            <div>
              <div className="mono" style={{ color: c.accent, fontSize: 12, letterSpacing: "0.32px", marginBottom: 12 }}>LIVE RATE COMPARISON</div>
              <h2 style={{ fontSize: 36, lineHeight: 1.15, fontWeight: 300, margin: 0 }}>Estimated carrier quotes</h2>
            </div>
            <div className="mono" style={{ color: c.subtle, fontSize: 12 }}>Selected: {selectedCarrier}</div>
          </div>
          <div className={`rate-table ${tableFlash ? "table-flash" : ""}`} style={{ overflowX: "auto", background: c.bg }}>
            <div className="rate-grid" role="table" aria-label="Estimated insurance rate comparison">
              <div role="row" style={{ display: "grid", gridTemplateColumns: "1.35fr repeat(6, 1fr) 0.9fr", background: c.layer, color: c.text, minHeight: 48, alignItems: "center" }}>
                {["Carrier", "Annual", "Semi-Annual", "Monthly", "Deductible", "Coverage", "Rating", "Select"].map((heading) => (
                  <div role="columnheader" key={heading} style={{ padding: "14px 16px", fontSize: 12, letterSpacing: "0.32px", color: c.muted }}>{heading}</div>
                ))}
              </div>
              {rates.map((rate) => {
                const selected = selectedCarrier === rate.carrier;
                return (
                  <div role="row" key={rate.carrier} style={{ display: "grid", gridTemplateColumns: "1.35fr repeat(6, 1fr) 0.9fr", minHeight: 56, alignItems: "center", background: selected ? c.accentSoft : c.bg, borderLeft: selected ? `2px solid ${c.accent}` : "2px solid transparent", borderTop: `1px solid ${c.band}` }}>
                    <div role="cell" style={{ padding: "14px 16px", fontWeight: 500 }}>{rate.carrier}</div>
                    {[rate.annual, rate.semi, rate.monthly, rate.deductible].map((value) => (
                      <div role="cell" className="mono" key={value} style={{ padding: "14px 16px", fontSize: 14 }}>{value}</div>
                    ))}
                    <div role="cell" style={{ padding: "14px 16px", color: c.muted, fontSize: 14 }}>{rate.coverage}</div>
                    <div role="cell" className="mono" style={{ padding: "14px 16px", fontSize: 14 }}>{rate.rating}</div>
                    <div role="cell" style={{ padding: "14px 16px" }}>
                      <button className="link-button" onClick={() => setSelectedCarrier(rate.carrier)} type="button">Select →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p style={{ color: c.subtle, fontSize: 13, lineHeight: 1.6, margin: "16px 0 0" }}>{tableStatus}</p>
        </div>
      </section>

      <section id="coverage">
        {productLines.map((line) => (
          <div key={line.title} className="product-band" style={{ background: line.bg, color: "#f4f4f4", padding: "96px 0" }}>
            <div className="container scroll-animate" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(240px, 360px)", gap: 48, alignItems: "end" }}>
              <div>
                <h2 className="product-headline" style={{ fontSize: 42, lineHeight: 1.16, fontWeight: 300, margin: "0 0 32px", maxWidth: 780 }}>{line.title}</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16, color: "#c6c6c6", fontSize: 16, lineHeight: 1.55 }}>
                  {line.bullets.map((bullet) => (
                    <li key={bullet} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 8 }}><span style={{ color: "#4589ff" }}>→</span><span>{bullet}</span></li>
                  ))}
                </ul>
              </div>
              <a href="#contact" style={{ color: "#4589ff", textDecoration: "none", justifySelf: "end", fontSize: 16 }}>{line.cta} →</a>
            </div>
          </div>
        ))}
      </section>

      <section id="ai-advisor" style={{ background: c.bg, padding: "88px 0" }}>
        <div className="container scroll-animate chat-card" style={{ background: "#161616", color: "#f4f4f4", padding: 40 }}>
          <div className="mono" style={{ color: "#4589ff", fontSize: 12, letterSpacing: "0.32px", marginBottom: 12 }}>AI ADVISOR</div>
          <h2 style={{ fontSize: 18, fontWeight: 400, margin: "0 0 32px" }}>Ask anything. We respond in 60 seconds.</h2>
          <div className="chat-grid" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 40 }}>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                ["User", "ZIP 33131, 30yo driver, clean record, 2022 Civic. Auto only. Best rate?"],
                ["AI", "Scanning 30 carriers... Best match: State Farm at $1,756/yr with $1,000 deductible. Runner-up: Liberty Mutual at $1,694/yr. Want me to lock in a quote with your real info?"],
                ["User", "Lock State Farm. Call me."],
                ["AI", "Locked. An agent will call you within 1 business hour at the number on file. Reference: SH-7842. Anything else?"],
              ].map(([role, text]) => (
                <div key={text} style={{ background: role === "AI" ? "#262626" : "#393939", padding: 16, maxWidth: role === "AI" ? "92%" : "78%", justifySelf: role === "AI" ? "start" : "end" }}>
                  <div className="mono" style={{ color: role === "AI" ? "#4589ff" : "#c6c6c6", fontSize: 11, marginBottom: 8 }}>{role}</div>
                  <div style={{ color: "#f4f4f4", fontSize: 14, lineHeight: 1.55 }}>{text}</div>
                </div>
              ))}
            </div>
            <aside style={{ borderLeft: "1px solid #393939", paddingLeft: 32 }}>
              <div className="mono" style={{ color: "#8d8d8d", fontSize: 12, letterSpacing: "0.32px", marginBottom: 20 }}>WHAT SHIELD&apos;S AI DOES</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#c6c6c6", display: "grid", gap: 16, fontSize: 14, lineHeight: 1.55 }}>
                <li>Compares 30+ carriers in 4 seconds</li>
                <li>Pre-fills your application from quote data</li>
                <li>Routes you to a licensed agent for binding</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section style={{ background: c.bg, padding: "0 0 88px" }}>
        <div className="container scroll-animate">
          <div className="mono" style={{ color: c.accent, fontSize: 12, letterSpacing: "0.32px", marginBottom: 12 }}>RATED & CERTIFIED</div>
          <h2 style={{ fontSize: 32, lineHeight: 1.2, fontWeight: 300, margin: "0 0 32px" }}>Carriers & Ratings</h2>
          <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {carriers.map((carrier, index) => (
              <div key={carrier} style={{ minHeight: 84, display: "grid", placeItems: "center", background: index % 2 === 0 ? c.band : c.bg, color: c.text, fontWeight: 600, fontSize: 14 }}>
                {carrier}
              </div>
            ))}
          </div>
          <div className="stat-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: c.band, marginTop: 32 }}>
            {[["A+", "BBB Rating"], ["A++", "AM Best"], ["4.8★", "Google Reviews"]].map(([value, label]) => (
              <div key={label} style={{ padding: 32 }}>
                <div className="mono" style={{ fontSize: 48, lineHeight: 1, color: c.text }}>{value}</div>
                <div style={{ color: c.muted, fontSize: 12, marginTop: 10 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#161616", color: "#f4f4f4", padding: "96px 0" }}>
        <div className="container scroll-animate">
          <div className="mono" style={{ color: "#8d8d8d", fontSize: 12, letterSpacing: "0.32px", marginBottom: 16 }}>FLORIDA COVERAGE · ILLUSTRATIVE AVERAGES · YOUR RATE VARIES BY PROFILE</div>
          <div className="coverage-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#393939" }}>
            {[["MIAMI 33131", "$2,140", "avg annual auto premium"], ["ORLANDO 32801", "$1,890", "avg annual auto premium"], ["TAMPA 33602", "$1,975", "avg annual auto premium"]].map(([city, amount, label]) => (
              <div key={city} style={{ background: "#161616", padding: 32 }}>
                <div className="mono" style={{ color: "#8d8d8d", fontSize: 14, marginBottom: 20 }}>{city}</div>
                <div className="mono" style={{ color: "#f4f4f4", fontSize: 48, lineHeight: 1 }}>{amount}</div>
                <div style={{ color: "#c6c6c6", fontSize: 12, marginTop: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ background: c.band, padding: "88px 0" }}>
        <div className="container panel scroll-animate" style={{ background: c.bg, color: c.text, padding: 48 }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }}>
            <div>
              <div className="mono" style={{ color: c.accent, fontSize: 12, letterSpacing: "0.32px", marginBottom: 16 }}>GET IN TOUCH</div>
              <h2 style={{ fontSize: 32, lineHeight: 1.2, fontWeight: 300, margin: "0 0 16px" }}>Request a Callback</h2>
              <p style={{ color: c.muted, fontSize: 16, lineHeight: 1.6, margin: "0 0 40px" }}>An independent agent — not a call center — will return your request within 1 business hour.</p>
              <div style={{ display: "grid", gap: 16 }}>
                {contactRows.map(([label, value]) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, alignItems: "baseline", color: c.muted, fontSize: 12, letterSpacing: "0.32px", lineHeight: 1.5 }}>
                    <span className="mono" style={{ color: c.subtle }}>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} onSubmit={(event) => event.preventDefault()}>
              <input className="contact-input" placeholder="Your Name" aria-label="Your Name" />
              <input className="contact-input" placeholder="Email" type="email" aria-label="Email" />
              <input className="contact-input" placeholder="Phone" type="tel" aria-label="Phone" />
              <input className="contact-input mono" placeholder="ZIP" inputMode="numeric" aria-label="ZIP" />
              <select className="contact-input" defaultValue="Auto" aria-label="Coverage type">
                {["Auto", "Home", "Bundle", "Other"].map((option) => <option key={option}>{option}</option>)}
              </select>
              <select className="contact-input" defaultValue="Morning" aria-label="Best time to call">
                {["Morning", "Afternoon", "End of day"].map((option) => <option key={option}>{option}</option>)}
              </select>
              <button className="primary-button" type="submit" style={{ gridColumn: "1 / -1", justifySelf: "start", marginTop: 8 }}>Get a Quote</button>
              <p style={{ gridColumn: "1 / -1", color: c.subtle, fontSize: 12, lineHeight: 1.6, margin: "8px 0 0" }}>By submitting, you consent to a callback from a Shield Insurance Partners agent. We do not sell your data.</p>
            </form>
          </div>
        </div>
      </section>

      <footer style={{ background: "#161616", color: "#f4f4f4", padding: "64px 0 32px" }}>
        <div className="container">
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: 40 }}>
            <div>
              <div style={{ fontSize: 32, lineHeight: 1.15, fontWeight: 300, marginBottom: 12 }}>Shield Insurance Partners</div>
              <div style={{ color: "#c6c6c6", fontSize: 14 }}>Protection You Can Count On.</div>
            </div>
            {[
              ["Coverage", "Auto", "Home", "Business", "Life", "Health"],
              ["Company", "About", "Careers", "Press", "Contact"],
              ["Resources", "FAQ", "Claims", "Carrier Login", "Privacy"],
            ].map(([heading, ...links]) => (
              <div key={heading}>
                <div className="mono" style={{ color: "#8d8d8d", fontSize: 12, letterSpacing: "0.32px", marginBottom: 16 }}>{heading}</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {links.map((link) => <a key={link} href="#quote" style={{ color: "#c6c6c6", textDecoration: "none", fontSize: 14 }}>{link}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mono" style={{ borderTop: "1px solid #393939", marginTop: 56, paddingTop: 24, color: "#8d8d8d", fontSize: 12, letterSpacing: "0.32px" }}>© 2026 Shield Insurance Partners · Licensed in FL, NY, TX · CA License #0G84829</div>
        </div>
      </footer>
    </main>
  );
}
