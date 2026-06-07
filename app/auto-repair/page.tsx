"use client";

import React, { useState, useRef, useEffect } from "react";
import { DM_Sans, Bebas_Neue, JetBrains_Mono } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const cDark = {
  bg: "#0f0f0f",
  bgAlt: "#1a1a1a",
  text: "#f0f0f0",
  textMuted: "#9a9a9a",
  accent: "#dc2626",
  accentAlt: "#ef4444",
  accentGlow: "rgba(220, 38, 38, 0.35)",
  surface: "#1f1f1f",
  surfaceAlt: "#2a2a2a",
  border: "#333333",
  ambientA: "rgba(220, 38, 38, 0.12)",
  ambientB: "rgba(220, 38, 38, 0.05)",
};

const cLight = {
  bg: "#f5f5f5",
  bgAlt: "#e8e8e8",
  text: "#1a1a1a",
  textMuted: "#666666",
  accent: "#dc2626",
  accentAlt: "#b91c1c",
  accentGlow: "rgba(220, 38, 38, 0.25)",
  surface: "#ffffff",
  surfaceAlt: "#efefef",
  border: "#d0d0d0",
  ambientA: "rgba(220, 38, 38, 0.08)",
  ambientB: "rgba(220, 38, 38, 0.03)",
};

export default function AutoRepair() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    vehicle: "",
    urgency: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const c = isDark ? cDark : cLight;

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") setIsDark(false);
  }, []);

  const handleThemeToggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const css = `
    .auto-root {
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
      color: ${c.text};
      background-color: ${c.bg};
      background-image:
        linear-gradient(180deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.78) 50%, rgba(15,15,15,0.90) 100%),
        url('https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1920&q=80');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      font-family: ${dmSans.style.fontFamily}, system-ui, sans-serif;
    }

    .display-font {
      font-family: ${bebasNeue.style.fontFamily}, sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .mono-font {
      font-family: ${jetbrainsMono.style.fontFamily}, monospace;
    }

    .nav-sticky {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: ${c.bg}cc;
      border-bottom: 1px solid ${c.border};
    }

    .theme-toggle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1.5px solid ${c.border};
      background: ${c.surface};
      color: ${c.text};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.2s, background 0.2s;
      flex-shrink: 0;
    }
    .theme-toggle:hover {
      border-color: ${c.accent};
      background: ${c.surfaceAlt};
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.75rem;
      background: ${c.accent};
      color: #fff;
      border: none;
      border-radius: 6px;
      font-family: ${dmSans.style.fontFamily}, sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
      text-decoration: none;
    }
    .btn-primary:hover {
      background: ${c.accentAlt};
      transform: translateY(-2px);
      box-shadow: 0 6px 20px ${c.accentGlow};
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.75rem;
      background: transparent;
      color: ${isDark ? c.text : c.accent};
      border: 1.5px solid ${isDark ? c.border : c.accent};
      border-radius: 6px;
      font-family: ${dmSans.style.fontFamily}, sans-serif;
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s, transform 0.15s;
      text-decoration: none;
    }
    .btn-secondary:hover {
      border-color: ${c.accent};
      color: ${c.accent};
      transform: translateY(-2px);
    }

    .card {
      background: ${c.surface};
      border: 1px solid ${c.border};
      border-radius: 10px;
      padding: 1.5rem;
      transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      border-color: ${c.accent};
      transform: translateY(-3px);
      box-shadow: 0 8px 28px rgba(0,0,0,0.12);
    }

    .section-eyebrow {
      font-family: ${jetbrainsMono.style.fontFamily}, monospace;
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${c.accent};
      margin-bottom: 0.6rem;
    }

    .trust-badge {
      background: ${c.surface};
      border: 1px solid ${c.border};
      border-radius: 8px;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: border-color 0.2s;
    }
    .trust-badge:hover {
      border-color: ${c.accent};
    }

    .chat-bubble {
      border-radius: 12px;
      padding: 1rem 1.25rem;
      max-width: 85%;
      line-height: 1.6;
      font-size: 0.92rem;
    }
    .chat-ai {
      background: ${c.surfaceAlt};
      border: 1px solid ${c.border};
      border-bottom-left-radius: 4px;
    }
    .chat-customer {
      background: ${c.accent};
      color: #fff;
      border-bottom-right-radius: 4px;
      margin-left: auto;
    }

    .form-input {
      width: 100%;
      padding: 0.7rem 1rem;
      background: ${c.surfaceAlt};
      border: 1.5px solid ${c.border};
      border-radius: 6px;
      color: ${c.text};
      font-family: ${dmSans.style.fontFamily}, sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .form-input:focus {
      border-color: ${c.accent};
    }
    .form-input::placeholder {
      color: ${c.textMuted};
    }

    .form-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: ${c.textMuted};
      margin-bottom: 0.4rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .scroll-hidden {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .scroll-hidden-left {
      opacity: 0;
      transform: translateX(-28px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .scroll-hidden-right {
      opacity: 0;
      transform: translateX(28px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .scroll-visible {
      opacity: 1;
      transform: translate(0);
    }

    .tile-hidden {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .tile-visible {
      opacity: 1;
      transform: translate(0);
    }
    .tile-visible.tile-up {
      animation: tileEntrance 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .tile-visible.tile-left {
      animation: tileEntranceLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .tile-visible.tile-right {
      animation: tileEntranceRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes tileEntrance {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes tileEntranceLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes tileEntranceRight {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .stripe-overlay {
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      overflow: hidden;
    }
    .stripe {
      position: absolute;
      height: 4px;
      border-radius: 2px;
      opacity: 0.18;
      animation: stripePulse 3s ease-in-out infinite;
    }
    .stripe-1 { top: 18%; left: -5%; right: -5%; background: ${c.accent}; animation-delay: 0s; }
    .stripe-2 { top: 22%; left: -5%; right: -5%; background: ${c.accent}; animation-delay: 0.4s; }
    .stripe-3 { top: 26%; left: -5%; right: -5%; background: ${c.accent}; animation-delay: 0.8s; }
    .stripe-4 { bottom: 18%; left: -5%; right: -5%; background: ${c.accent}; animation-delay: 1.2s; }
    .stripe-5 { bottom: 22%; left: -5%; right: -5%; background: ${c.accent}; animation-delay: 1.6s; }
    .stripe-6 { bottom: 26%; left: -5%; right: -5%; background: ${c.accent}; animation-delay: 2s; }
    .stripe-7 { top: 45%; left: -5%; right: -5%; background: ${isDark ? "rgba(255,255,255,0.3)" : c.accent}; animation-delay: 0.6s; }
    .stripe-8 { bottom: 45%; left: -5%; right: -5%; background: ${isDark ? "rgba(255,255,255,0.3)" : c.accent}; animation-delay: 1s; }

    @keyframes stripePulse {
      0%   { opacity: 0.08; transform: scaleX(0.4); }
      50%  { opacity: 0.28; transform: scaleX(1); }
      100% { opacity: 0.08; transform: scaleX(0.4); }
    }

    .wrench-svg {
      position: absolute;
      opacity: 0;
      animation: wrenchFloat ease-in-out infinite;
      filter: drop-shadow(0 0 8px rgba(220,38,38,0.8));
    }
    .wrench-1 { left: 4%; top: 8%; animation: wrenchFloat 12s ease-in-out 0s infinite, wrenchFade 3s ease-in-out 0s infinite; }
    .wrench-2 { right: 6%; top: 20%; animation: wrenchFloat 10s ease-in-out 4s infinite, wrenchFade 3s ease-in-out 0.5s infinite; transform: scaleX(-1); }
    .wrench-3 { left: 8%; bottom: 20%; animation: wrenchFloat 14s ease-in-out 2s infinite, wrenchFade 3s ease-in-out 1s infinite; }
    .wrench-4 { right: 10%; bottom: 12%; animation: wrenchFloat 11s ease-in-out 6s infinite, wrenchFade 3s ease-in-out 1.5s infinite; transform: scaleX(-1); }

    .wrench-svg::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: ${isDark ? "transparent" : "rgba(15,15,15,0.25)"};
      z-index: -1;
    }

    @keyframes wrenchFloat {
      0%   { transform: translateY(0) rotate(0deg); }
      50%  { transform: translateY(20px) rotate(180deg); }
      100% { transform: translateY(0) rotate(360deg); }
    }
    @keyframes wrenchFade {
      0%   { opacity: 0; }
      20%  { opacity: 0.8; }
      80%  { opacity: 0.8; }
      100% { opacity: 0; }
    }
  `;

  const obsRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    obsRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("scroll-visible");
            } else {
              entry.target.classList.remove("scroll-visible");
            }
          });
        },
        { threshold: 0.12 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const obs = (i: number) => (el: HTMLElement | null) => {
    obsRefs.current[i] = el;
  };

  // Tile observer
  const tileRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    tileRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("tile-visible");
            }
          });
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const tileObs = (i: number) => (el: HTMLElement | null) => {
    tileRefs.current[i] = el;
  };

  return (
    <>
      <style>{css}</style>

      <div className="stripe-overlay" aria-hidden="true">
        <div className="stripe stripe-1" />
        <div className="stripe stripe-2" />
        <div className="stripe stripe-3" />
        <div className="stripe stripe-4" />
        <div className="stripe stripe-5" />
        <div className="stripe stripe-6" />
        <div className="stripe stripe-7" />
        <div className="stripe stripe-8" />
        <svg className="wrench-svg wrench-1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        <svg className="wrench-svg wrench-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        <svg className="wrench-svg wrench-3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        <svg className="wrench-svg wrench-4" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>

      <div className="auto-root" style={{ position: "relative", zIndex: 2 }}>
        {/* ── NAV ────────────────────────────────────────────── */}
        <nav className="nav-sticky">
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0.85rem 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🔧</span>
              <span
                className="display-font"
                style={{ fontSize: "1.3rem", color: c.text, letterSpacing: "0.06em" }}
              >
                APEX AUTO
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <a
                href="#services"
                style={{
                  color: c.textMuted,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
              >
                Services
              </a>
              <a
                href="#ai-demo"
                style={{
                  color: c.textMuted,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
              >
                Chat with our Concierge
              </a>
              <a
                href="#contact"
                style={{
                  color: c.textMuted,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
              >
                Contact
              </a>
              <a
                href="tel:+15557429911"
                style={{
                  color: c.accent,
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  fontFamily: jetbrainsMono.style.fontFamily,
                  letterSpacing: "0.04em",
                }}
              >
                (555) 742-9911
              </a>
              <button
                type="button"
                className="theme-toggle"
                onClick={handleThemeToggle}
                aria-label="Toggle light and dark mode"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ───────────────────────────────────────────── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
          <div
            ref={obs(0)}
            className="scroll-hidden"
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            <p className="section-eyebrow">ASE CERTIFIED • HONEST REPAIRS • FAIR PRICING</p>
          </div>

          <div ref={obs(1)} className="scroll-hidden" style={{ textAlign: "center" }}>
            <h1
              className="display-font"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                lineHeight: 0.92,
                color: isDark ? c.text : "#ffffff",
                textShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.7)",
                margin: "0 0 1.25rem",
              }}
            >
              APEX
              <br />
              <span style={{ color: c.accent }}>AUTO</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: c.textMuted,
                maxWidth: 520,
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              Real mechanics. Upfront estimates. AI-assisted scheduling so your car gets seen
              before you wait on hold.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="#contact" className="btn-primary">
                Book Service
              </a>
              <a href="#ai-demo" className="btn-secondary">
                Chat with our Concierge
              </a>
            </div>
          </div>

          {/* Stats bar */}
          <div
            ref={obs(2)}
            className="scroll-hidden"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1px",
              background: c.border,
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "3.5rem",
              border: `1px solid ${c.border}`,
            }}
          >
            {[
              { label: "Years in Business", value: "18+" },
              { label: "ASE Certifications", value: "12" },
              { label: "CARS SERVED", value: "8,400+" },
              { label: "5-Star Reviews", value: "4.9★" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: c.surface,
                  padding: "1.25rem 1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  className="display-font"
                  style={{ fontSize: "2rem", color: c.accent, marginBottom: "0.25rem" }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: c.textMuted,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: jetbrainsMono.style.fontFamily,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ────────────────────────────────────────── */}
        <section id="services" style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div ref={obs(3)} className="scroll-hidden" style={{ marginBottom: "2rem" }}>
            <p className="section-eyebrow">What We Fix</p>
            <h2
              className="display-font"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: c.text, margin: 0 }}
            >
              SERVICE ROUNDS
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                num: "01",
                title: "ENGINE DIAGNOSIS",
                body: "Check engine light, misfires, oil leaks, and compression issues. We diagnose before we quote — no surprises.",
                tag: "DRIVABILITY",
              },
              {
                num: "02",
                title: "BRAKE SERVICE",
                body: "Pads, rotors, calipers, and lines. We show you the wear and give you options, not pressure.",
                tag: "SAFETY-FIRST",
              },
              {
                num: "03",
                title: "SUSPENSION + STEERING",
                body: "Shocks, struts, ball joints, tie rods, and alignment. Get it driving straight and quiet again.",
                tag: "HANDLING",
              },
              {
                num: "04",
                title: "TRANS + CLUTCH",
                body: "Automatic or manual. Fluid changes, leak repair, clutch replacement, and transmission service.",
                tag: "POWERTRAIN",
              },
            ].map((svc, i) => (
              <div
                key={svc.num}
                ref={tileObs(i)}
                className="card tile-hidden tile-up"
                style={{ padding: "1.75rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    className="display-font"
                    style={{ fontSize: "2.8rem", color: c.accent, lineHeight: 1 }}
                  >
                    {svc.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontFamily: jetbrainsMono.style.fontFamily,
                      letterSpacing: "0.14em",
                      color: c.textMuted,
                      textTransform: "uppercase",
                      background: c.surfaceAlt,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                    }}
                  >
                    {svc.tag}
                  </span>
                </div>
                <h3
                  className="display-font"
                  style={{
                    fontSize: "1.25rem",
                    color: c.text,
                    margin: "0 0 0.6rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {svc.title}
                </h3>
                <p style={{ color: c.textMuted, fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI DEMO ─────────────────────────────────────────── */}
        <section
          id="ai-demo"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}
        >
          <div ref={obs(4)} className="scroll-hidden" style={{ marginBottom: "2rem" }}>
            <p className="section-eyebrow">AI Concierge Agent</p>
            <h2
              className="display-font"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: c.text, margin: "0 0 0.75rem" }}
            >
              INTAKE THAT OPENS A BAY
            </h2>
            <p style={{ color: c.textMuted, fontSize: "0.95rem", maxWidth: 540 }}>
              Describe the issue, get a quote range, and book a drop-off window — all from a
              conversation. No app download, no voicemail.
            </p>
          </div>

          <div
            ref={tileObs(4)}
            className="tile-hidden tile-up"
            style={{
              background: c.surface,
              border: `1px solid ${c.border}`,
              borderRadius: "12px",
              padding: "1.75rem",
              maxWidth: 680,
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <p className="section-eyebrow">LIVE INTAKE</p>
              <div
                style={{
                  background: c.surfaceAlt,
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontSize: "0.82rem",
                  color: c.textMuted,
                  fontFamily: jetbrainsMono.style.fontFamily,
                }}
              >
                <span style={{ color: c.accent }}>●</span>
                <span>Panel upgrade + EV scope</span>
                <span style={{ marginLeft: "auto" }}>Breaker trip pattern captured</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div className="chat-bubble chat-customer">
                My check engine light came on last week and the car shakes when I hit 60. Can you fit me in?
              </div>
              <div className="chat-bubble chat-ai">
                I can get you in tomorrow at 8 AM. Your symptom — shaking at highway speed with a CEL — points to either a motor mount or an axle half-shaft. I'll have the tech take a look before giving you a quote range. Sound good?
              </div>
              <div className="chat-bubble chat-customer">
                Yeah that's great. It's a 2019 Honda Accord. I'll drop it off at 8.
              </div>
              <div className="chat-bubble chat-ai">
                Perfect. I logged your 2019 Accord under intake #2847. Drop-off at 8 AM tomorrow. I'll text you the written quote by noon and a photo of whatever the tech finds before we proceed.
              </div>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                background: c.surfaceAlt,
                borderRadius: "8px",
                border: `1px solid ${c.border}`,
              }}
            >
              <p
                className="section-eyebrow"
                style={{ marginBottom: "0.5rem" }}
              >
                SCHEDULER SUMMARY
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {[
                  "2019 Honda Accord logged",
                  "Drop-off: Tomorrow 8 AM",
                  "Symptom: CEL + highway shake",
                  "Written quote by noon",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.82rem",
                      color: c.textMuted,
                    }}
                  >
                    <span style={{ color: c.accent, fontSize: "0.7rem" }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ─────────────────────────────────────── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div ref={obs(5)} className="scroll-hidden" style={{ marginBottom: "2rem" }}>
            <p className="section-eyebrow">Why Apex</p>
            <h2
              className="display-font"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: c.text, margin: 0 }}
            >
              HONESTY BEFORE THE LIFT
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              {
                icon: "🔍",
                title: "DIAGNOSIS-FIRST QUOTING",
                body: "We look before we quote. Every estimate includes a written finding, not a guess.",
              },
              {
                icon: "📷",
                title: "PHOTO EVIDENCE",
                body: "We text photos of worn parts and problem areas so you see exactly what we see.",
              },
              {
                icon: "⚖️",
                title: "NO UNNECESSARY REPAIRS",
                body: "We'll tell you what's urgent, what can wait, and what doesn't need doing at all.",
              },
              {
                icon: "🏆",
                title: "ASE CERTIFIED TECHNICIANS",
                body: "Every tech on our floor holds current ASE certification in their specialty.",
              },
            ].map((badge, i) => (
              <div
                key={badge.title}
                ref={obs(6 + i)}
                className="trust-badge scroll-hidden"
              >
                <span style={{ fontSize: "1.6rem" }}>{badge.icon}</span>
                <div>
                  <div
                    className="display-font"
                    style={{
                      fontSize: "0.9rem",
                      color: c.text,
                      marginBottom: "0.3rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {badge.title}
                  </div>
                  <div style={{ color: c.textMuted, fontSize: "0.85rem", lineHeight: 1.55 }}>
                    {badge.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT FORM ─────────────────────────────────────── */}
        <section
          id="contact"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}
        >
          <div ref={obs(10)} className="scroll-hidden" style={{ marginBottom: "2rem" }}>
            <p className="section-eyebrow">Get Your Car Seen</p>
            <h2
              className="display-font"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: c.text, margin: "0 0 0.75rem" }}
            >
              OPEN A SERVICE TICKET
            </h2>
            <p style={{ color: c.textMuted, fontSize: "0.95rem", maxWidth: 480 }}>
              Tell us what you're hearing, seeing, or feeling — we'll confirm the drop-off time and
              have a quote to you within hours.
            </p>
          </div>

          <div ref={obs(11)} className="scroll-hidden">
            {submitted ? (
              <div
                style={{
                  background: c.surface,
                  border: `1px solid ${c.accent}`,
                  borderRadius: "12px",
                  padding: "2.5rem",
                  textAlign: "center",
                  maxWidth: 560,
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    filter: `drop-shadow(0 0 12px ${c.accentGlow})`,
                  }}
                >
                  ✓
                </div>
                <h3
                  className="display-font"
                  style={{ fontSize: "1.6rem", color: c.text, marginBottom: "0.75rem" }}
                >
                  TICKET #{Math.floor(2800 + Math.random() * 200)} RECEIVED
                </h3>
                <p style={{ color: c.textMuted, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  We have your request. Expect a text confirmation within 15 minutes and a written
                  quote before end of business today.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  borderRadius: "12px",
                  padding: "2rem",
                  maxWidth: 700,
                  display: "grid",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="form-label" htmlFor="vehicle">Vehicle (Year / Make / Model)</label>
                    <input
                      id="vehicle"
                      name="vehicle"
                      type="text"
                      className="form-input"
                      placeholder="e.g. 2019 Honda Accord"
                      value={formData.vehicle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="service">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      className="form-input"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select service</option>
                      <option value="engine">Engine / Check Engine</option>
                      <option value="brakes">Brakes</option>
                      <option value="suspension">Suspension / Steering</option>
                      <option value="trans">Transmission / Clutch</option>
                      <option value="oil">Oil / Fluids</option>
                      <option value="ac">A/C / Heating</option>
                      <option value="electrical">Electrical / Battery</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="urgency">Urgency</label>
                    <select
                      id="urgency"
                      name="urgency"
                      className="form-input"
                      value={formData.urgency}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select urgency</option>
                      <option value="flexible">Flexible — within the week</option>
                      <option value="soon">Soon — 1–2 days</option>
                      <option value="urgent">Urgent — today if possible</option>
                      <option value="breakdown">Stranded / Breakdown</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="notes">What are you noticing?</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-input"
                    rows={3}
                    placeholder="Describe the sound, smell, behavior — anything you've noticed..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Open Service Ticket
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: `1px solid ${c.border}`,
            background: c.surface,
            padding: "2rem 1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.3rem" }}>🔧</span>
              <span
                className="display-font"
                style={{ fontSize: "1.1rem", color: c.text, letterSpacing: "0.06em" }}
              >
                APEX AUTO
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="tel:+15557429911"
                style={{
                  color: c.accent,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: jetbrainsMono.style.fontFamily,
                }}
              >
                (555) 742-9911
              </a>
              <a
                href="mailto:intake@apexauto.example"
                style={{
                  color: c.textMuted,
                  textDecoration: "none",
                  fontSize: "0.88rem",
                }}
              >
                intake@apexauto.example
              </a>
              <a
                href="#contact"
                style={{
                  color: c.textMuted,
                  textDecoration: "none",
                  fontSize: "0.88rem",
                }}
              >
                Open a ticket →
              </a>
            </div>
          </div>
          <div
            style={{
              maxWidth: 1100,
              margin: "1.5rem auto 0",
              borderTop: `1px solid ${c.border}`,
              paddingTop: "1rem",
              textAlign: "center",
              fontSize: "0.78rem",
              color: c.textMuted,
              fontFamily: jetbrainsMono.style.fontFamily,
              letterSpacing: "0.06em",
            }}
          >
            © 2026 APEX AUTO — ASE CERTIFIED • HONEST REPAIRS • FAIR PRICING
          </div>
        </footer>
      </div>
    </>
  );
}
