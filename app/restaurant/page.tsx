"use client";

import React, { useState, useEffect } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "800"] });

const c = {
  dark: {
    bg: "#0f0b08", nav: "rgba(15,11,8,0.92)", card: "rgba(28,20,14,0.92)", border: "rgba(245,158,11,0.18)",
    text: "#fef3e2", textSoft: "rgba(254,243,226,0.6)", textMuted: "rgba(254,243,226,0.38)",
    accent: "#f59e0b", accentDark: "#d97706", accentGlow: "rgba(245,158,11,0.3)",
    success: "#22c55e", error: "#ef4444", selection: "rgba(245,158,11,0.25)",
    onAccent: "#0f0b08", borderStrong: "rgba(245,158,11,0.45)", inputBg: "rgba(255,255,255,0.05)",
  },
  light: {
    bg: "#fffbf5", nav: "rgba(255,251,245,0.92)", card: "rgba(255,255,255,0.96)", border: "rgba(245,158,11,0.18)",
    text: "#1a1209", textSoft: "rgba(26,18,9,0.6)", textMuted: "rgba(26,18,9,0.38)",
    textWarm: "#3a2a1a",
    accent: "#d97706", accentDark: "#b45309", accentGlow: "rgba(217,119,6,0.2)",
    success: "#16a34a", error: "#dc2626", selection: "rgba(245,158,11,0.15)",
    onAccent: "#ffffff", borderStrong: "rgba(217,119,6,0.4)", inputBg: "rgba(0,0,0,0.04)",
  },
};

export default function RestaurantPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("golden-fork-theme") as "dark" | "light" | null;
    if (stored) setTheme(stored);
    setMounted(true);
  }, []);

  const colors = c[theme];
  const bodyTextColor = theme === "dark" ? colors.text : c.light.textWarm;
  const eyebrowColor = theme === "light" ? colors.accentDark : colors.accent;
  const placeholderColor = theme === "dark" ? "rgba(254,243,226,0.5)" : "rgba(26,18,9,0.55)";

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("golden-fork-theme", next);
  };

  if (!mounted) {
    return (
      <div style={{ background: c.dark.bg, minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ color: c.dark.textSoft, fontFamily: dmSans.style.fontFamily }}>Loading...</div>
      </div>
    );
  }

  const services = [
    { number: "01", title: "Seasonal Tasting Menu", description: "A seven-course journey through the season's finest — sourced within 50 miles, plated with precision. Changes weekly.", tag: "7 Courses · Seasonal" },
    { number: "02", title: "Private Events & Buyouts", description: "Intimate dinners for 12 to full-restaurant buyouts for 120. Custom menus, dedicated service team, and sommelier pairing.", tag: "12–120 Guests" },
    { number: "03", title: "Catering & Off-Site", description: "We bring The Golden Fork to your event — plated service, stations, or family-style spreads. Same quality, any venue.", tag: "Custom Menus" },
    { number: "04", title: "AI Table Recommender", description: "Tell our AI your mood, dietary needs, and preferences. We'll build a custom tasting sequence just for your table.", tag: "Personalized" },
  ];

  const trustBadges = [
    { icon: "🍽", label: "Michelin Recommended", sub: "2023, 2024, 2025" },
    { icon: "🌱", label: "Farm to Table", sub: "Local sourcing within 50 mi" },
    { icon: "🍷", label: "AI Wine Pairings", sub: "Curated to your meal" },
    { icon: "🛋", label: "Private Dining", sub: "3 elegant rooms available" },
  ];

  const chatMessages = [
    { role: "user", text: "We're celebrating an anniversary next Saturday. Want something romantic but not too fussy. About 6pm, party of 2." },
    { role: "ai", text: "Congratulations! For an anniversary I'd recommend our Window Garden alcove — it's private, candlelit, and has the best view in the house. Want me to reserve it for 6pm with a complimentary glass of Champagne to start?" },
    { role: "user", text: "Yes! Also one of us is vegetarian — can you do a custom tasting for that?" },
    { role: "ai", text: "Absolutely. Our vegetarian tasting is actually one of our most requested — the miso-glazed eggplant and the wild mushroom risotto are showstoppers. I'll build a custom 5-course sequence around those. Any aversions or allergies I should know about?" },
    { role: "user", text: "No nuts, but otherwise we're open. Surprise us." },
    { role: "ai", text: "Done. I'll note no nuts and build you a custom tasting: amuse-bouche, the eggplant, risotto, a rotating fish course, and a surprise dessert with a small anniversary cake. I'll also pre-pair wines by the glass. See you Saturday at 6pm — I've noted the Window Garden. Can't wait to celebrate with you both." },
  ];

  const processSteps = [
    { step: "01", title: "Choose Your Experience", desc: "Tasting menu, à la carte, or let our AI build something custom based on your preferences." },
    { step: "02", title: "Reserve Your Table", desc: "Use our AI concierge or call us directly. Private dining rooms available on request." },
    { step: "03", title: "Arrive & Enjoy", desc: "You'll be greeted by name, seated in your preferred atmosphere, and guided through every course." },
    { step: "04", title: "Savor Every Moment", desc: "Our team handles everything — so you can focus on the food, the company, and the occasion." },
  ];

  return (
    <div style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, rgba(0,0,0,0.0) 100%), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80') center/cover no-repeat fixed`,
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
        .sparkle-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .sparkle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: ${colors.accent}; opacity: 0; bottom: -10px; box-shadow: 0 0 6px ${colors.accentGlow}; }
        @keyframes sparkleRise {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 0.7; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        .sparkle-1 { left: 8%;  animation: sparkleRise 7s  linear 0s    infinite; width: 3px; height: 3px; }
        .sparkle-2 { left: 18%; animation: sparkleRise 8s  linear 1.2s  infinite; width: 4px; height: 4px; }
        .sparkle-3 { left: 28%; animation: sparkleRise 6s  linear 0.6s  infinite; width: 2px; height: 2px; }
        .sparkle-4 { left: 40%; animation: sparkleRise 9s  linear 2.1s  infinite; width: 5px; height: 5px; }
        .sparkle-5 { left: 52%; animation: sparkleRise 7.5s linear 0.3s  infinite; width: 3px; height: 3px; }
        .sparkle-6 { left: 63%; animation: sparkleRise 6.5s linear 1.8s  infinite; width: 2px; height: 2px; }
        .sparkle-7 { left: 75%; animation: sparkleRise 8.5s linear 0.9s  infinite; width: 4px; height: 4px; }
        .sparkle-8 { left: 87%; animation: sparkleRise 7s  linear 2.5s  infinite; width: 3px; height: 3px; }
        .sparkle-9 { left: 94%; animation: sparkleRise 9s  linear 1.5s  infinite; width: 2px; height: 2px; }
        .sparkle-10 { left: 33%; animation: sparkleRise 6s linear 3s infinite; width: 3px; height: 3px; }
        .sparkle-11 { left: 72%; animation: sparkleRise 8s linear 3.5s infinite; width: 4px; height: 4px; }
        .scroll-animate { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0); }
        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
        .nav-link:hover { color: ${colors.accent} !important; }
        .gold-glow { box-shadow: 0 0 20px ${colors.accentGlow}; }
        .restaurant-input::placeholder { color: ${placeholderColor}; font-weight: 500; opacity: 1; }
      `}</style>

      {/* Rising sparkle overlay */}
      <div className="sparkle-overlay" aria-hidden="true">
        {[1,2,3,4,5,6,7,8,9,10,11].map(n => <div key={n} className={`sparkle sparkle-${n}`} />)}
      </div>

      {/* ─── NAVIGATION ─────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: colors.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${colors.border}`, padding: "0 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ fontSize: "1.6rem" }}>🍴</div>
            <div>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.05rem", fontWeight: 700, color: colors.text, lineHeight: 1 }}>The Golden Fork</div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: eyebrowColor, textTransform: "uppercase", marginTop: "2px", fontWeight: 600 }}>Farm to Table</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {["Menu", "AI Reservation Agent", "About", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.86rem", fontWeight: 500, letterSpacing: "0.04em", transition: "color 0.2s" }}
                className="nav-link">
                {link}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a href="tel:+12125550199" style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>+1 (212) 555-0199</a>
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
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 700 }}>New Spring Menu — Now Available</div>
            <h1 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.08, color: colors.text, margin: "0 0 1.5rem" }}>
              Where Every Meal <br /><span style={{ color: colors.accent }}>Becomes a Memory.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: bodyTextColor, lineHeight: 1.7, margin: "0 0 2.5rem", maxWidth: "480px", fontWeight: 500 }}>
              Farm-to-table fine dining in the heart of the city. Seasonal ingredients, thoughtful preparation, and an AI concierge that knows your preferences before you sit down.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#menu" style={{ background: colors.accent, color: colors.onAccent, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", boxShadow: `0 0 24px ${colors.accentGlow}`, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 32px ${colors.accentGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 24px ${colors.accentGlow}`; }}>
                View Menu
              </a>
              <a href="#ai-reservation-agent" style={{ border: `1.5px solid ${colors.border}`, color: colors.text, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem", transition: "all 0.2s" }}>
                Chat with our Concierge
              </a>
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", boxShadow: `0 24px 64px rgba(0,0,0,0.5)` }}>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Beautifully plated seasonal dish" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "0.75rem 1.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: "0.75rem", color: colors.accent, fontWeight: 600, marginBottom: "2px" }}>SEASONAL MENU</div>
              <div style={{ fontSize: "0.8rem", color: "white" }}>Spring 2025 now available →</div>
            </div>
          </div>
        </div>

        {/* Hours + location strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "4rem", padding: "1.75rem 2rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
          {[
            { label: "Hours", value: "Tue–Sun: 5pm–11pm\nMon: Closed" },
            { label: "Location", value: "14 West 46th Street\nNew York, NY 10036" },
            { label: "Reservations", value: "+1 (212) 555-0199\nor chat with our AI" },
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: eyebrowColor, fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.label}</div>
              <div style={{ fontSize: "0.85rem", color: bodyTextColor, whiteSpace: "pre-line", lineHeight: 1.6, fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────────────── */}
      <section id="menu" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>What We Offer</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Dining Experiences</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {services.map((s, i) => (
            <div key={s.number} className="scroll-animate card-hover" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "14px", padding: "2rem", transition: "all 0.25s" }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "2.8rem", color: colors.accent, opacity: 0.35, lineHeight: 1, marginBottom: "1rem" }}>{s.number}</div>
              <h3 style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.35rem", fontWeight: 700, color: colors.text, margin: "0 0 0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.9rem", color: bodyTextColor, lineHeight: 1.65, margin: "0 0 1.25rem", fontWeight: 500 }}>{s.description}</p>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: eyebrowColor, fontWeight: 700, textTransform: "uppercase" }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI CONCIERGE ──────────────────────────────────────────────── */}
      <section id="ai-reservation-agent" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>Powered by AI</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Your Personal Reservation Agent</h2>
          <p style={{ fontSize: "1rem", color: bodyTextColor, marginTop: "1rem", maxWidth: "520px", margin: "1rem auto 0", fontWeight: 500, lineHeight: 1.65 }}>Describe your occasion, dietary needs, and preferences. Our AI builds a custom tasting and books your table — all in one conversation.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", background: colors.accent, display: "grid", placeItems: "center" }}>
                <span style={{ color: colors.onAccent, fontSize: "1rem" }}>🍴</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: colors.text }}>Reservation Agent</div>
                <div style={{ fontSize: "0.75rem", color: colors.success }}>● Online — book anytime</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "78%", padding: "0.85rem 1.1rem",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? colors.accent : colors.inputBg,
                    color: msg.role === "user" ? colors.onAccent : colors.text,
                    fontSize: "0.88rem", lineHeight: 1.6,
                    border: `1px solid ${msg.role === "user" ? "transparent" : colors.border}`,
                    fontFamily: dmSans.style.fontFamily,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
              <input className="restaurant-input" type="text" placeholder="Describe your perfect dinner..." readOnly style={{ flex: 1, background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "999px", padding: "0.75rem 1.25rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }} />
              <button style={{ background: colors.accent, color: colors.onAccent, border: "none", borderRadius: "999px", padding: "0.75rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "0.88rem" }}>Send</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { title: "Custom Tasting Builder", desc: "Tell us your dietary needs and we'll craft a personalized tasting sequence — no menu anxiety, just pure discovery." },
              { title: "Smart Table Matching", desc: "Anniversary? Birthday? Business dinner? Our AI recommends the best tables and private rooms for your occasion." },
              { title: "Wine & Cocktail Pairing", desc: "Pre-pair wines, cocktails, or non-alcoholic options to your chosen courses. Adjust any time before you arrive." },
              { title: "Instant Confirmation", desc: "When you're ready, the AI confirms your reservation, sends a calendar invite, and notes any dietary flags for the kitchen." },
            ].map((feat, i) => (
              <div key={i} className="scroll-animate" style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: colors.card, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: colors.accentGlow, display: "grid", placeItems: "center", flexShrink: 0, color: colors.accent, fontSize: "1.1rem" }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: colors.text, marginBottom: "0.35rem" }}>{feat.title}</div>
                  <div style={{ fontSize: "0.83rem", color: bodyTextColor, lineHeight: 1.6, fontWeight: 500 }}>{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>How It Works</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Your Evening, Perfected</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {processSteps.map((step, i) => (
            <div key={step.step} className="scroll-animate" style={{ textAlign: "center", padding: "2rem 1.5rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "3.5rem", color: colors.accent, opacity: 0.45, lineHeight: 1, marginBottom: "1rem" }}>{step.step}</div>
              <h3 style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.1rem", fontWeight: 800, color: colors.text, margin: "0 0 0.75rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.85rem", color: bodyTextColor, lineHeight: 1.65, fontWeight: 500 }}>{step.desc}</p>
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
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "0.95rem", fontWeight: 700, color: colors.text, marginBottom: "0.35rem" }}>{badge.label}</div>
              <div style={{ fontSize: "0.75rem", color: colors.textSoft, fontWeight: 500 }}>{badge.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 700 }}>Get in Touch</div>
            <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: "0 0 1.25rem" }}>Reserve Your Table</h2>
            <p style={{ fontSize: "0.95rem", color: bodyTextColor, lineHeight: 1.7, marginBottom: "2rem", fontWeight: 500 }}>For private events, large party reservations, or special dietary requirements, reach out directly and our team will personally curate your experience.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { label: "Address", value: "14 West 46th Street, New York, NY 10036" },
                { label: "Phone", value: "+1 (212) 555-0199" },
                { label: "Hours", value: "Tue–Sun: 5pm–11pm · Mon: Closed" },
                { label: "Email", value: "reservations@thegoldenfork.com" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: eyebrowColor, width: "70px", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", color: bodyTextColor, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={e => { e.preventDefault(); alert("Reservation request received! We'll confirm within 2 hours."); }} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input className="restaurant-input" required type="text" placeholder="Your Name" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }} />
              <input className="restaurant-input" required type="email" placeholder="Email Address" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input className="restaurant-input" required type="tel" placeholder="Phone Number" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }} />
              <input className="restaurant-input" required type="number" min="1" max="20" placeholder="Party size" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }} />
            </div>
            <input required type="date" style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }} />
            <select style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily }}>
              <option value="">Experience preference</option>
              <option>Tasting Menu</option>
              <option>À La Carte</option>
              <option>Private Dining Room</option>
              <option>Full Restaurant Buyout</option>
            </select>
            <textarea className="restaurant-input" placeholder="Special requests, dietary needs, occasion details..." rows={3} style={{ background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: "10px", padding: "0.85rem 1rem", color: colors.text, fontSize: "0.88rem", fontWeight: 500, fontFamily: dmSans.style.fontFamily, resize: "vertical" }} />
            <button type="submit" style={{ background: colors.accent, color: colors.onAccent, border: "none", borderRadius: "999px", padding: "1rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: `0 0 24px ${colors.accentGlow}`, fontFamily: dmSans.style.fontFamily }}>
              Request Reservation
            </button>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${colors.border}`, padding: "3rem 2rem", background: colors.card }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.4rem" }}>🍴</span>
            <span style={{ fontFamily: playfair.style.fontFamily, fontSize: "0.95rem", fontWeight: 700, color: colors.text }}>The Golden Fork</span>
          </div>
          <div style={{ fontSize: "0.8rem", color: colors.textSoft, fontWeight: 500 }}>14 West 46th St · New York · +1 (212) 555-0199</div>
          <a href="#contact" style={{ color: eyebrowColor, textDecoration: "none", fontSize: "0.85rem", fontWeight: 700 }}>Reserve a Table →</a>
        </div>
        <div style={{ maxWidth: "1200px", margin: "1.5rem auto 0", textAlign: "center", fontSize: "0.8rem", color: colors.text, fontWeight: 600 }}>
          © 2025 The Golden Fork. All rights reserved.
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
