"use client";

import React, { useState, useEffect } from "react";
import { DM_Sans, Playfair_Display, Bebas_Neue } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const c = {
  dark: {
    bg: "#0c0c0f", nav: "rgba(12,12,15,0.92)", card: "rgba(20,20,24,0.9)", border: "rgba(168,85,247,0.2)",
    text: "#f5f5f5", textSoft: "rgba(245,245,245,0.6)", textMuted: "rgba(245,245,245,0.4)",
    accent: "#a855f7", accentDark: "#7c3aed", accentGlow: "rgba(168,85,247,0.35)",
    success: "#22c55e", error: "#ef4444", selection: "rgba(168,85,247,0.3)",
    onAccent: "#ffffff", borderStrong: "rgba(168,85,247,0.5)", inputBg: "rgba(255,255,255,0.05)",
  },
  light: {
    bg: "#faf7ff", nav: "rgba(250,247,255,0.92)", card: "rgba(255,255,255,0.95)", border: "rgba(168,85,247,0.15)",
    text: "#1a1a1a", textSoft: "rgba(26,26,26,0.6)", textMuted: "rgba(26,26,26,0.4)",
    accent: "#7c3aed", accentDark: "#6d28d9", accentGlow: "rgba(124,58,237,0.25)",
    success: "#16a34a", error: "#dc2626", selection: "rgba(124,58,237,0.2)",
    onAccent: "#ffffff", borderStrong: "rgba(124,58,237,0.4)", inputBg: "rgba(0,0,0,0.04)",
  },
};

export default function ClothingPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("clothing-theme") as "dark" | "light" | null;
    if (stored) setTheme(stored);
    setMounted(true);
  }, []);

  const colors = c[theme];

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("clothing-theme", next);
  };

  if (!mounted) {
    return (
      <div style={{ background: c.dark.bg, minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ color: c.dark.textSoft, fontFamily: dmSans.style.fontFamily }}>Loading...</div>
      </div>
    );
  }

  const services = [
    { number: "01", title: "Custom Tees & Apparel", description: "Premium blank garments ready for your brand. DTG, screen print, or embroidery. No minimums on select styles.", tag: "DTG • Screen • Embroidery" },
    { number: "02", title: "Brand Identity Packages", description: "Logo design, color theory, and lookbook curation. We build the visual language your audience remembers.", tag: "Logo • Lookbook • Labels" },
    { number: "03", title: "Private Label Manufacturing", description: "Full-cycle production from fabric sourcing to final stitch. Shipped direct to your warehouse or customers.", tag: "MOQ 50 units" },
    { number: "04", title: "AI Style Intelligence", description: "Our AI analyzes fit preferences, style inspiration, and body profile to recommend pieces that actually work for you.", tag: "Personalized curation" },
  ];

  const trustBadges = [
    { icon: "🌿", label: "Ethically Sourced", sub: "Fair labor, sustainable fabrics" },
    { icon: "🇺🇸", label: "Made in USA", sub: "Domestic production network" },
    { icon: "↩️", label: "Free Returns", sub: "30-day hassle-free returns" },
    { icon: "🤖", label: "AI Curated", sub: "Personalized to your style" },
  ];

  const chatMessages = [
    { role: "user", text: "I'm looking for elevated basics for a capsule wardrobe. Minimalist, high quality, neutral tones." },
    { role: "ai", text: "Love that. What's your budget range and fit preference — relaxed or more tailored?" },
    { role: "user", text: "Around $150–$200 per piece, and I usually go for a slightly relaxed fit. Not too baggy though." },
    { role: "ai", text: "Perfect. I'd recommend our Relaxed Weight French Terry Crew in Stone and our Wide-Leg Cargo in Graphite. Both from our premium line — pre-washed for that lived-in feel without the break-in time. Want me to reserve your sizes and ship them for free returns try-on?" },
    { role: "user", text: "Yes that sounds great. Can you also send some options for outerwear?" },
    { role: "ai", text: "Absolutely. Based on your vibe I'm pulling three options: (1) Unstructured Linen Blazer in Oatmeal — layerable, breathable. (2) Cropped Utility Jacket in Washed Black — streetwear meets tailored. (3) Lightweight Puffer in Charcoal — technical fabric but still clean enough for smart casual. I'll link them in your profile now. Which works best for your climate?" },
  ];

  const processSteps = [
    { step: "01", title: "Style Profile", desc: "Share your vibe, fit preferences, and budget. Our AI learns your taste instantly." },
    { step: "02", title: "Curated Picks", desc: "Receive 5–8 hand-selected pieces matched to your profile. No algorithmic noise." },
    { step: "03", title: "Try-On at Home", desc: "We ship your selection with free returns. Only pay for what you keep." },
    { step: "04", title: "Build Your Wardrobe", desc: "Keep what works. Return the rest. Build a rotation that fits your life." },
  ];

  return (
    <div style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, rgba(0,0,0,0.0) 100%), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80') center/cover no-repeat`,
      backgroundAttachment: "fixed",
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
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${colors.borderStrong}; border-radius: 3px; }
        .thread-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .thread { position: absolute; height: 1.5px; border-radius: 2px; opacity: 0.25; }
        @keyframes threadDrift {
          0% { transform: translateX(-200px) translateY(0) rotate(12deg); opacity: 0; }
          8% { opacity: 0.25; }
          92% { opacity: 0.25; }
          100% { transform: translateX(110vw) translateY(80px) rotate(12deg); opacity: 0; }
        }
        .thread-1 { top: 8%;  width: 220px; left: -220px; animation: threadDrift 7s   linear 0s   infinite; background: linear-gradient(90deg, transparent, ${colors.accent}, transparent); }
        .thread-2 { top: 22%; width: 160px; left: -160px; animation: threadDrift 6s   linear 1.5s infinite; background: linear-gradient(90deg, transparent, ${colors.textSoft}, transparent); }
        .thread-3 { top: 38%; width: 200px; left: -200px; animation: threadDrift 8s   linear 0.8s infinite; background: linear-gradient(90deg, transparent, ${colors.accent}, transparent); }
        .thread-4 { top: 55%; width: 140px; left: -140px; animation: threadDrift 5.5s linear 2.2s infinite; background: linear-gradient(90deg, transparent, ${colors.textSoft}, transparent); }
        .thread-5 { top: 70%; width: 180px; left: -180px; animation: threadDrift 7.5s linear 0.4s infinite; background: linear-gradient(90deg, transparent, ${colors.accent}, transparent); }
        .thread-6 { top: 85%; width: 130px; left: -130px; animation: threadDrift 6.5s linear 3s   infinite; background: linear-gradient(90deg, transparent, ${colors.textSoft}, transparent); }
        .scroll-animate { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0); }
        .chat-bubble { transition: all 0.3s ease; }
        .chat-bubble:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(168,85,247,0.15); }
        .nav-link:hover { color: ${colors.accent} !important; }
      `}</style>

      {/* Thread animation overlay */}
      <div className="thread-overlay" aria-hidden="true">
        <div className="thread thread-1" />
        <div className="thread thread-2" />
        <div className="thread thread-3" />
        <div className="thread thread-4" />
        <div className="thread thread-5" />
        <div className="thread thread-6" />
      </div>

      {/* ─── NAVIGATION ─────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: colors.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${colors.border}`, padding: "0 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "2.6rem", height: "2.6rem", borderRadius: "50%", background: colors.accent, display: "grid", placeItems: "center", boxShadow: `0 0 18px ${colors.accentGlow}` }}>
              <span style={{ color: "white", fontSize: "1.1rem" }}>⊛</span>
            </div>
            <div>
              <div style={{ fontFamily: bebas.style.fontFamily, fontSize: "1.05rem", letterSpacing: "0.12em", color: colors.text, lineHeight: 1 }}>THREAD & THIRD</div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: colors.textMuted, textTransform: "uppercase", marginTop: "2px" }}>Elevated Basics</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {["Shop", "AI Style Advisor", "About", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                style={{ color: colors.textMuted, textDecoration: "none", fontSize: "0.86rem", fontWeight: 500, letterSpacing: "0.04em", transition: "color 0.2s" }}
                className="nav-link">
                {link}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a href="tel:+18005550199" style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>+1 (800) 555-0199</a>
            <button onClick={toggleTheme} style={{
              background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "8px",
              padding: "0.45rem 0.9rem", cursor: "pointer", color: colors.text, fontSize: "0.8rem",
              fontFamily: dmSans.style.fontFamily, display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              {theme === "dark" ? "☀" : "☾"} {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 2, padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: colors.accent, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>New Season — Spring 2025</div>
            <h1 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.08, color: colors.text, margin: "0 0 1.5rem" }}>
              Wear Your <br /><span style={{ color: colors.accent }}>Identity.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: colors.textSoft, lineHeight: 1.7, margin: "0 0 2.5rem", maxWidth: "480px" }}>
              Premium basics, private label, and AI-curated style — engineered for brands that care about craft. No fluff, just fit.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#shop" style={{ background: colors.accent, color: "white", padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", boxShadow: `0 0 24px ${colors.accentGlow}`, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 32px ${colors.accentGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 24px ${colors.accentGlow}`; }}>
                Shop Now
              </a>
              <a href="#ai-style-advisor" style={{ border: `1.5px solid ${colors.border}`, color: colors.text, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem", transition: "all 0.2s" }}>
                Chat with our Concierge
              </a>
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", boxShadow: `0 24px 64px rgba(0,0,0,0.4)` }}>
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80" alt="Premium apparel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "0.75rem 1.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: "0.75rem", color: colors.accent, fontWeight: 600, marginBottom: "2px" }}>AI CURATED</div>
              <div style={{ fontSize: "0.8rem", color: "white" }}>Spring 2025 Lookbook →</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "5rem", padding: "2rem", background: colors.card, borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          {[{ value: "50+", label: "Brand Partners" }, { value: "12K+", label: "Pieces Delivered" }, { value: "98%", label: "Client Retention" }, { value: "3–5", label: "Day Turnaround" }].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: bebas.style.fontFamily, fontSize: "2.5rem", color: colors.accent, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginTop: "0.35rem", letterSpacing: "0.06em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────────────── */}
      <section id="shop" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: colors.accent, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>What We Do</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Everything a Modern Brand Needs</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <div key={s.number} className="scroll-animate card-hover" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "14px", padding: "2rem", transition: "all 0.25s", animationDelay: `${i * 80}ms` }}>
              <div style={{ fontFamily: bebas.style.fontFamily, fontSize: "2.8rem", color: colors.accent, opacity: 0.4, lineHeight: 1, marginBottom: "1rem" }}>{s.number}</div>
              <h3 style={{ fontFamily: bebas.style.fontFamily, fontSize: "1.4rem", letterSpacing: "0.06em", color: colors.text, margin: "0 0 0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.9rem", color: colors.textSoft, lineHeight: 1.65, margin: "0 0 1.25rem" }}>{s.description}</p>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: colors.accent, fontWeight: 600, textTransform: "uppercase" }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI CONCIERGE ──────────────────────────────────────────────── */}
      <section id="ai-style-advisor" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: colors.accent, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>Powered by AI</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Your Personal Style Concierge</h2>
          <p style={{ fontSize: "1rem", color: colors.textSoft, marginTop: "1rem", maxWidth: "540px", margin: "1rem auto 0" }}>Describe what you&apos;re looking for and our AI builds a curated lookbook in seconds — then books your fitting appointment.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", background: colors.accent, display: "grid", placeItems: "center" }}>
                <span style={{ color: "white", fontSize: "1rem" }}>⊛</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: colors.text }}>Style Concierge</div>
                <div style={{ fontSize: "0.75rem", color: colors.success }}>● Online — responds in seconds</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {chatMessages.map((msg, i) => (
                <div key={i} className="chat-bubble" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "78%", padding: "0.85rem 1.1rem",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? colors.accent : colors.inputBg,
                    color: msg.role === "user" ? "white" : colors.text,
                    fontSize: "0.88rem", lineHeight: 1.6,
                    border: `1px solid ${msg.role === "user" ? "transparent" : colors.border}`,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
              <input type="text" placeholder="Describe your style..." readOnly style={{ flex: 1, background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "999px", padding: "0.75rem 1.25rem", color: colors.text, fontSize: "0.88rem", fontFamily: dmSans.style.fontFamily }} />
              <button style={{ background: colors.accent, color: "white", border: "none", borderRadius: "999px", padding: "0.75rem 1.5rem", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem" }}>Send</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { title: "Fit Profile Analysis", desc: "Tell us your measurements, fit preferences, and style inspiration. Our AI builds a profile that gets smarter with every interaction." },
              { title: "Curated Lookbooks", desc: "Receive 5–8 pieces matched to your aesthetic, budget, and occasion. No scrolling through thousands of options." },
              { title: "Virtual Try-On", desc: "See how pieces look on body types similar to yours. AI-generated fit visualization before you buy." },
              { title: "Booking & Scheduling", desc: "When you find something you love, the AI books a virtual fitting or ships for free try-on at home." },
            ].map((feat, i) => (
              <div key={i} className="scroll-animate" style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: colors.card, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: colors.accentGlow, display: "grid", placeItems: "center", flexShrink: 0, fontSize: "1.1rem", color: colors.accent }}>✓</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: colors.text, marginBottom: "0.35rem" }}>{feat.title}</div>
                  <div style={{ fontSize: "0.83rem", color: colors.textSoft, lineHeight: 1.6 }}>{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: colors.accent, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>How It Works</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>From Profile to Wardrobe</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {processSteps.map((step, i) => (
            <div key={step.step} className="scroll-animate" style={{ textAlign: "center", padding: "2rem 1.5rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              <div style={{ fontFamily: bebas.style.fontFamily, fontSize: "3.5rem", color: colors.accent, opacity: 0.5, lineHeight: 1, marginBottom: "1rem" }}>{step.step}</div>
              <h3 style={{ fontFamily: bebas.style.fontFamily, fontSize: "1.1rem", letterSpacing: "0.08em", color: colors.text, margin: "0 0 0.75rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.85rem", color: colors.textSoft, lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST BADGES ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 2, padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          {trustBadges.map((badge, i) => (
            <div key={badge.label} className="scroll-animate" style={{ textAlign: "center", padding: "1.75rem 1rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{badge.icon}</div>
              <div style={{ fontFamily: bebas.style.fontFamily, fontSize: "0.95rem", letterSpacing: "0.08em", color: colors.text, marginBottom: "0.35rem" }}>{badge.label}</div>
              <div style={{ fontSize: "0.75rem", color: colors.textMuted }}>{badge.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: colors.accent, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>Get in Touch</div>
            <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: "0 0 1.25rem" }}>Let&apos;s Build Something Great</h2>
            <p style={{ fontSize: "0.95rem", color: colors.textSoft, lineHeight: 1.7, marginBottom: "2rem" }}>Whether you need custom blanks, private label, or AI-curated inventory — tell us about your brand and we&apos;ll build a plan that works.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[{ label: "Email", value: "hello@threadandthird.com" }, { label: "Phone", value: "+1 (800) 555-0199" }, { label: "Location", value: "Los Angeles, CA — New York, NY" }].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: colors.accent, width: "70px", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", color: colors.textSoft }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={e => { e.preventDefault(); alert("Message sent! We'll be in touch within 24 hours."); }} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input required type="text" placeholder="Your Name" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontFamily: dmSans.style.fontFamily }} />
              <input required type="email" placeholder="Email Address" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontFamily: dmSans.style.fontFamily }} />
            </div>
            <input required type="tel" placeholder="Phone Number" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontFamily: dmSans.style.fontFamily }} />
            <select style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontFamily: dmSans.style.fontFamily }}>
              <option value="">What are you interested in?</option>
              <option>Custom Tees & Apparel</option>
              <option>Private Label Manufacturing</option>
              <option>Brand Identity Package</option>
              <option>AI Style Intelligence</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Tell us about your brand..." rows={4} style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontFamily: dmSans.style.fontFamily, resize: "vertical" }} />
            <button type="submit" style={{ background: colors.accent, color: "white", border: "none", borderRadius: "999px", padding: "1rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: `0 0 24px ${colors.accentGlow}`, fontFamily: dmSans.style.fontFamily }}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${colors.border}`, padding: "3rem 2rem", background: colors.card }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: colors.accent, display: "grid", placeItems: "center" }}>
              <span style={{ color: "white", fontSize: "0.85rem" }}>⊛</span>
            </div>
            <span style={{ fontFamily: bebas.style.fontFamily, fontSize: "0.95rem", letterSpacing: "0.1em", color: colors.text }}>THREAD & THIRD</span>
          </div>
          <div style={{ fontSize: "0.8rem", color: colors.textMuted }}>hello@threadandthird.com · +1 (800) 555-0199</div>
          <a href="#contact" style={{ color: colors.accent, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>Get Started →</a>
        </div>
        <div style={{ maxWidth: "1200px", margin: "1.5rem auto 0", textAlign: "center", fontSize: "0.75rem", color: colors.textMuted }}>
          © 2025 Thread & Third. All rights reserved.
        </div>
      </footer>

      {/* Bidirectional scroll animation */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          var els = document.querySelectorAll('.scroll-animate');
          var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              if (e.isIntersecting) e.target.classList.add('scroll-animated');
            });
          }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
          els.forEach(function(el) { obs.observe(el); });
        });
      ` }} />
    </div>
  );
}