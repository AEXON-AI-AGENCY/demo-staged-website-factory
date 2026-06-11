"use client";

import React, { useEffect, useState } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { VERTICALS } from "@/lib/verticals";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "800"] });

const vertical = VERTICALS["law-firm"];

const c = {
  dark: {
    bg: "#080d18", nav: "rgba(8,13,24,0.93)", card: "rgba(12,22,38,0.95)", border: "rgba(78,112,153,0.28)",
    text: "#e6efff", textSoft: "rgba(230,239,255,0.72)", textMuted: "rgba(230,239,255,0.5)",
    accent: "#1E3A5F", accentDark: "#2f5684", accentGlow: "rgba(78,112,153,0.36)",
    success: "#8fb8de", selection: "rgba(78,112,153,0.36)", onAccent: "#ffffff",
    borderStrong: "rgba(129,165,205,0.52)", inputBg: "rgba(255,255,255,0.065)",
  },
  light: {
    bg: "#f5f7fb", nav: "rgba(245,247,251,0.95)", card: "rgba(255,255,255,0.98)", border: "rgba(21,41,74,0.18)",
    text: "#0a1428", textSoft: "rgba(10,20,40,0.68)", textMuted: "rgba(10,20,40,0.5)",
    accent: "#15294a", accentDark: "#10203b", accentGlow: "rgba(21,41,74,0.18)",
    success: "#1E3A5F", selection: "rgba(21,41,74,0.18)", onAccent: "#ffffff",
    borderStrong: "rgba(21,41,74,0.38)", inputBg: "rgba(10,20,40,0.045)",
  },
};

export default function LawFirmPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("morrison-law-theme") as "dark" | "light" | null;
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
  const eyebrowColor = theme === "light" ? colors.accentDark : "#b9d7f2";
  const placeholderColor = theme === "dark" ? "rgba(230,239,255,0.54)" : "rgba(10,20,40,0.56)";

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("morrison-law-theme", next);
  };

  if (!mounted) {
    return (
      <div style={{ background: c.dark.bg, minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ color: c.dark.textSoft, fontFamily: dmSans.style.fontFamily }}>Loading...</div>
      </div>
    );
  }

  const services = [
    { number: "01", title: vertical.services[0], description: "Representation for serious auto collisions, premises injuries, medical recovery, lost wages, settlements, and verdict strategy.", tag: "No fee unless you win" },
    { number: "02", title: vertical.services[1], description: "Clear counsel for divorce, custody, parenting time, support, and negotiated agreements when family decisions carry lasting consequences.", tag: "Plan · File · Resolve" },
    { number: "03", title: vertical.services[2], description: "Rapid defense for investigations, arrests, bond hearings, motions, plea negotiations, and trial preparation across Cook County courts.", tag: "Protect your rights" },
    { number: "04", title: vertical.services[4], description: "Practical litigation support for contract disputes, shareholder conflicts, depositions, injunctions, and settlement negotiations.", tag: "Dispute · Depose · Litigate" },
  ];

  const chatMessages = [
    { role: "user", text: "I was rear-ended on the Kennedy Expressway last Tuesday. The other driver's insurance is calling me already. I have a herniated disc and missed a week of work. What should I do?" },
    { role: "ai", text: "I'm sorry to hear that. First, do not give a recorded statement to the other insurer until you have spoken with an attorney. Second, document medical visits, lost wages, photos, and vehicle damage. I can connect you with a personal injury attorney for a free case review today." },
    { role: "user", text: "Yes please. Does it cost anything upfront?" },
    { role: "ai", text: "No. We handle personal injury cases on contingency, so you pay nothing unless we recover for you. The consultation is free and there is no obligation. I can hold a 3pm slot today with Attorney Chen, who focuses on auto accident claims." },
    { role: "user", text: "3pm works. Thank you." },
    { role: "ai", text: "Confirmed. Attorney Chen's office is at 225 W Wacker Dr, Suite 1500. Bring medical records and the police report if you have them. He will review your case, explain your options, and answer your questions at no cost." },
  ];

  const processSteps = [
    { step: "01", title: "Free Case Review", desc: "Tell us what happened, who is involved, your deadline concerns, and what outcome you need." },
    { step: "02", title: "Attorney Match", desc: "We route your intake to the practice team best suited for your facts, venue, and urgency." },
    { step: "03", title: "Strategy Session", desc: "An attorney reviews liability, documents, statutes, retainer options, and the immediate next steps." },
    { step: "04", title: "Resolution", desc: "We pursue negotiation, filing, discovery, settlement, or trial with clear communication at every stage." },
  ];

  const trustBadges = [
    { icon: "🏛", label: "Super Lawyers 2024", sub: "Recognized Chicago counsel" },
    { icon: "⚖", label: "AV Preeminent Rating", sub: "Peer-reviewed legal ability" },
    { icon: "🎓", label: "25+ Years Combined", sub: "Courtroom and settlement work" },
    { icon: "🤝", label: "Se Habla Español", sub: "Accessible consultations" },
  ];

  const features = [
    { title: "Instant Case Evaluation", desc: "Collect the facts that matter: incident date, parties, evidence, injuries, deadlines, and current court status." },
    { title: "Attorney Matching", desc: "Route each matter to the right attorney for personal injury, family law, criminal defense, or business litigation." },
    { title: "Statute of Limitations Alerts", desc: "Flag timing risks early so clients do not miss urgent filing windows or evidence preservation steps." },
    { title: "Confidential Intake", desc: "Organize sensitive details for attorney review with a professional, privacy-first intake experience." },
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
      background: `linear-gradient(180deg, ${colors.bg} 0%, rgba(0,0,0,0.0) 100%), url('https://images.unsplash.com/photo-1751750017056-b5ef60d07ff5?w=1920&q=80') center/cover no-repeat fixed`,
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
        .legal-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .legal-dot { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: ${colors.borderStrong}; opacity: 0; bottom: -20px; box-shadow: 0 0 18px ${colors.accentGlow}; animation: legalRise 12s linear infinite; }
        .legal-sweep { position: absolute; top: 18%; left: -30%; width: 38%; height: 1px; background: linear-gradient(90deg, transparent, ${colors.borderStrong}, transparent); opacity: 0.32; animation: legalSweep 16s ease-in-out infinite; }
        @keyframes legalRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          14% { opacity: 0.34; }
          72% { opacity: 0.16; }
          100% { transform: translateY(-105vh) translateX(18px); opacity: 0; }
        }
        @keyframes legalSweep {
          0%, 100% { transform: translateX(0); opacity: 0; }
          35%, 65% { opacity: 0.28; }
          100% { transform: translateX(340%); }
        }
        .dot-1 { left: 7%; animation-delay: 0s; animation-duration: 13s; }
        .dot-2 { left: 24%; animation-delay: 2.4s; animation-duration: 15s; }
        .dot-3 { left: 46%; animation-delay: 1.1s; animation-duration: 12.5s; }
        .dot-4 { left: 68%; animation-delay: 3.2s; animation-duration: 16s; }
        .dot-5 { left: 87%; animation-delay: 1.8s; animation-duration: 14s; }
        .scroll-animate { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0); }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.18); }
        .nav-link:hover { color: ${colors.accentDark} !important; }
        .law-firm-input::placeholder { color: ${placeholderColor}; font-weight: 500; opacity: 1; }
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

      <div className="legal-overlay" aria-hidden="true">
        <div className="legal-sweep" />
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`legal-dot dot-${n}`} />
        ))}
      </div>

      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: colors.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${colors.border}`, padding: "0 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "68px", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
            <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "8px", background: colors.accent, color: colors.onAccent, display: "grid", placeItems: "center", fontFamily: playfair.style.fontFamily, fontWeight: 800, fontSize: "0.92rem" }}>M&A</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.05rem", fontWeight: 700, color: colors.text, lineHeight: 1, whiteSpace: "nowrap" }}>{vertical.name}</div>
              <div style={{ display: "inline-flex", fontSize: "0.62rem", letterSpacing: "0.14em", color: eyebrowColor, textTransform: "uppercase", marginTop: "5px", fontWeight: 700, border: `1px solid ${colors.border}`, borderRadius: "999px", padding: "0.16rem 0.48rem" }}>{vertical.tagline}</div>
            </div>
          </div>
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[
              { label: "Practice Areas", href: "#practice-areas" },
              { label: "AI Intake", href: "#ai-intake" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a key={link.label} href={link.href} style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.86rem", fontWeight: 600, letterSpacing: "0.03em", transition: "color 0.2s" }} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a className="nav-phone" href={`tel:${vertical.phone.replace(/[^0-9]/g, "")}`} style={{ color: colors.textSoft, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap" }}>{vertical.phone}</a>
            <button className="theme-button" onClick={toggleTheme} aria-label="Toggle color theme" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "0.45rem 0.85rem", cursor: "pointer", color: colors.text, fontSize: "0.8rem", fontFamily: dmSans.style.fontFamily, display: "flex", alignItems: "center", gap: "0.4rem", transition: "transform 0.2s" }}>
              {theme === "dark" ? "☀" : "☾"} {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section" style={{ position: "relative", zIndex: 2, padding: "6rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="responsive-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 800 }}>Free Consultations - Chicago Metro</div>
            <h1 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(2.5rem, 5vw, 4.6rem)", lineHeight: 1.08, color: colors.text, margin: "0 0 1.5rem" }}>
              Serious Counsel, <br /><span style={{ color: colors.accentDark }}>Relentless Advocacy.</span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: bodyTextColor, lineHeight: 1.72, margin: "0 0 2.5rem", maxWidth: "520px", fontWeight: 600 }}>
              {vertical.about} Our attorneys guide clients through consultations, evidence review, depositions, settlement strategy, and litigation with clear communication.
            </p>
            <div className="hero-actions" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a className="pill-button" href="#contact" style={{ background: colors.accent, color: colors.onAccent, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 800, fontSize: "0.9rem", boxShadow: `0 0 24px ${colors.accentGlow}`, transition: "transform 0.2s" }}>Free Case Review</a>
              <a className="pill-button" href="#about" style={{ border: `1.5px solid ${colors.borderStrong}`, color: colors.text, background: colors.card, padding: "0.85rem 2rem", borderRadius: "999px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", transition: "transform 0.2s" }}>Meet Our Attorneys</a>
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 24px 64px rgba(0,0,0,0.42)", border: `1px solid ${colors.border}` }}>
            <img src="https://images.unsplash.com/photo-1695792105226-dec2a0c09f76?w=900&q=80" alt="Chicago River and downtown architecture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", background: "rgba(2,6,23,0.78)", backdropFilter: "blur(10px)", borderRadius: "10px", padding: "0.85rem 1.15rem", border: "1px solid rgba(255,255,255,0.14)" }}>
              <div style={{ fontSize: "0.72rem", color: "#c9dff5", fontWeight: 800, marginBottom: "3px", letterSpacing: "0.12em" }}>CHICAGO LEGAL ADVOCACY</div>
              <div style={{ fontSize: "0.86rem", color: "white", fontWeight: 600 }}>Free consultations, same-day intake, and attorney-led strategy.</div>
            </div>
          </div>
        </div>

        <div className="responsive-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "4rem", padding: "1.75rem 2rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
          {[
            { label: "Office Hours", value: vertical.hours },
            { label: "Office Location", value: vertical.address },
            { label: "Speak to an Attorney", value: `${vertical.phone}\n${vertical.cta_sub}` },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: eyebrowColor, fontWeight: 800, textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.label}</div>
              <div style={{ fontSize: "0.9rem", color: bodyTextColor, whiteSpace: "pre-line", lineHeight: 1.6, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="practice-areas" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 800 }}>Practice Areas</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Legal Help When the Stakes Are High</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {services.map((s) => (
            <div key={s.number} className="scroll-animate card-hover" style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "14px", padding: "2rem" }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "2.8rem", color: colors.accentDark, opacity: 0.42, lineHeight: 1, marginBottom: "1rem" }}>{s.number}</div>
              <h3 style={{ fontFamily: playfair.style.fontFamily, fontSize: "1.35rem", fontWeight: 700, color: colors.text, margin: "0 0 0.75rem" }}>{s.title}</h3>
              <p style={{ fontSize: "0.95rem", color: bodyTextColor, lineHeight: 1.7, margin: "0 0 1.25rem", fontWeight: 600 }}>{s.description}</p>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: eyebrowColor, fontWeight: 800, textTransform: "uppercase" }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="ai-intake" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: eyebrowColor, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 800 }}>AI Intake</div>
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>Confidential Intake Before You Arrive</h2>
          <p style={{ fontSize: "1.05rem", color: bodyTextColor, marginTop: "1rem", maxWidth: "620px", margin: "1rem auto 0", fontWeight: 600, lineHeight: 1.7 }}>Start with a professional case review flow that gathers deadlines, facts, documents, and urgency so an attorney can respond quickly.</p>
        </div>
        <div className="responsive-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", background: colors.accent, display: "grid", placeItems: "center", color: colors.onAccent, fontSize: "1rem", fontWeight: 800 }}>AI</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: colors.text }}>Morrison AI Intake</div>
                <div style={{ fontSize: "0.75rem", color: colors.success, fontWeight: 700 }}>● Online - confidential case review</div>
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
              <input className="law-firm-input" type="text" placeholder="Describe your legal issue confidentially..." readOnly style={{ ...inputStyle, flex: 1, borderRadius: "999px" }} />
              <button style={{ background: colors.accent, color: colors.onAccent, border: "none", borderRadius: "999px", padding: "0.75rem 1.5rem", fontWeight: 800, cursor: "pointer", fontSize: "0.88rem" }}>Send</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {features.map((feat) => (
              <div key={feat.title} className="scroll-animate" style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: colors.card, borderRadius: "12px", border: `1px solid ${colors.border}` }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: colors.accentGlow, display: "grid", placeItems: "center", flexShrink: 0, color: colors.accentDark, fontSize: "1.1rem", fontWeight: 800 }}>✓</div>
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
          <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: 0 }}>From Intake to Resolution</h2>
        </div>
        <div className="responsive-four" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {processSteps.map((step) => (
            <div key={step.step} className="scroll-animate" style={{ textAlign: "center", padding: "2rem 1.5rem", background: colors.card, borderRadius: "14px", border: `1px solid ${colors.border}` }}>
              <div style={{ fontFamily: playfair.style.fontFamily, fontSize: "3.5rem", color: colors.accentDark, opacity: 0.42, lineHeight: 1, marginBottom: "1rem" }}>{step.step}</div>
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
            <h2 style={{ fontFamily: playfair.style.fontFamily, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: colors.text, margin: "0 0 1.25rem" }}>Schedule a Free Consultation</h2>
            <p style={{ fontSize: "1rem", color: bodyTextColor, lineHeight: 1.75, marginBottom: "2rem", fontWeight: 600 }}>Contact our Chicago office for a confidential consultation. We will review your situation, identify urgent deadlines, and explain your legal options before you commit to next steps.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { label: "Address", value: vertical.address },
                { label: "Phone", value: vertical.phone },
                { label: "Hours", value: vertical.hours },
                { label: "Email", value: vertical.email },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: eyebrowColor, width: "70px", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.9rem", color: bodyTextColor, fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Consultation request received. Morrison & Associates Law will follow up shortly."); }} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "18px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input className="law-firm-input" required type="text" placeholder="Your Name" style={inputStyle} />
              <input className="law-firm-input" required type="email" placeholder="Email Address" style={inputStyle} />
            </div>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input className="law-firm-input" required type="tel" placeholder="Phone Number" style={inputStyle} />
              <input className="law-firm-input" required type="text" placeholder="Best Time to Call" style={inputStyle} />
            </div>
            <select required style={inputStyle} defaultValue="">
              <option value="" disabled>Practice area</option>
              <option>Personal Injury</option>
              <option>Family Law</option>
              <option>Criminal Defense</option>
              <option>Business Litigation</option>
              <option>Other</option>
            </select>
            <select required style={inputStyle} defaultValue="">
              <option value="" disabled>How urgent</option>
              <option>Emergency</option>
              <option>Within a week</option>
              <option>Within a month</option>
              <option>Just researching</option>
            </select>
            <textarea className="law-firm-input" placeholder="Briefly describe your situation..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            <button type="submit" style={{ background: colors.accent, color: colors.onAccent, border: "none", borderRadius: "999px", padding: "1rem", fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: `0 0 24px ${colors.accentGlow}`, fontFamily: dmSans.style.fontFamily }}>
              Request Free Consultation
            </button>
            <div style={{ color: colors.textSoft, fontSize: "0.78rem", lineHeight: 1.55, fontStyle: "italic", fontWeight: 600 }}>
              Your information is confidential and protected by attorney-client privilege. We respond within 1 business hour.
            </div>
          </form>
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${colors.border}`, padding: "3rem 2rem", background: colors.card }}>
        <div className="responsive-three" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "2rem", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ width: "2rem", height: "2rem", borderRadius: "8px", background: colors.accent, color: colors.onAccent, display: "grid", placeItems: "center", fontFamily: playfair.style.fontFamily, fontWeight: 800, fontSize: "0.78rem" }}>M&A</span>
              <span style={{ fontFamily: playfair.style.fontFamily, fontSize: "0.95rem", fontWeight: 700, color: colors.text }}>{vertical.name}</span>
            </div>
            <div style={{ color: colors.textSoft, fontSize: "0.85rem", fontWeight: 600 }}>{vertical.tagline}</div>
          </div>
          <div style={{ fontSize: "0.84rem", color: colors.textSoft, fontWeight: 600, lineHeight: 1.8 }}>{vertical.address}<br />{vertical.phone}<br />{vertical.email}</div>
          <div style={{ textAlign: "left" }}>
            <a href="#contact" style={{ color: eyebrowColor, textDecoration: "none", fontSize: "0.9rem", fontWeight: 800 }}>Free Case Review →</a>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "2rem auto 0", textAlign: "center", fontSize: "0.8rem", color: colors.text, fontWeight: 600 }}>
          © 2026 {vertical.name}. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
