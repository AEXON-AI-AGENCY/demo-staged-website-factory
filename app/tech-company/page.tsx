"use client";

import React, { useEffect, useState } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

type Theme = "light" | "dark";

const themes = {
  light: {
    page: "#ffffff",
    bgOverlay: "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.68) 50%, rgba(255,255,255,0.86) 100%)",
    text: "#111827",
    muted: "#52525b",
    subtle: "#71717a",
    faint: "#f7fbfc",
    card: "rgba(255,255,255,0.92)",
    cardSolid: "#ffffff",
    border: "rgba(8, 145, 178, 0.16)",
    borderStrong: "rgba(8, 145, 178, 0.36)",
    accent: "#0891b2",
    accentBright: "#22d3ee",
    accentDeep: "#0e7490",
    accentSoft: "rgba(8, 145, 178, 0.1)",
    shadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(34, 211, 238, 0.08)",
    nav: "rgba(255,255,255,0.78)",
    inverse: "#0a0a0a",
    inverseText: "#fafafa",
  },
  dark: {
    page: "#0a0a0a",
    bgOverlay: "linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.82) 100%)",
    text: "#f8fafc",
    muted: "#d4d4d8",
    subtle: "#a1a1aa",
    faint: "#101820",
    card: "rgba(14, 18, 22, 0.9)",
    cardSolid: "#0f1419",
    border: "rgba(34, 211, 238, 0.18)",
    borderStrong: "rgba(34, 211, 238, 0.5)",
    accent: "#22d3ee",
    accentBright: "#67e8f9",
    accentDeep: "#0891b2",
    accentSoft: "rgba(34, 211, 238, 0.12)",
    shadow: "0 1px 2px rgba(0,0,0,0.28), 0 8px 24px rgba(34, 211, 238, 0.1)",
    nav: "rgba(10,10,10,0.76)",
    inverse: "#ffffff",
    inverseText: "#0a0a0a",
  },
};

const navLinks = ["Platform", "Solutions", "Developers", "Pricing", "Security"];
const logos = ["Acme Corp", "Globex", "Initech", "Umbrella", "Hooli", "Stark Industries"];

const features = [
  {
    title: "Agentic Workflows",
    description: "Design, deploy, and monitor production agents that coordinate work across systems without brittle handoffs.",
  },
  {
    title: "Data Intelligence",
    description: "Ground every agent in governed business context from warehouses, documents, and operational event streams.",
  },
  {
    title: "Scalable Automation",
    description: "Ship resilient automations in days, then scale invocations across regions with enterprise-grade observability.",
  },
];

const stats = [
  ["200+", "ENTERPRISES DEPLOYED"],
  ["4.2s", "MEDIAN FIRST-RUN LATENCY"],
  ["99.99%", "PLATFORM UPTIME SLA"],
  ["12B", "AGENT INVOCATIONS / MONTH"],
];

const tiers = [
  {
    name: "Starter",
    description: "For teams exploring agentic AI",
    price: "Free",
    suffix: "/month",
    cta: "Start free",
    features: ["Up to 5 agents", "10k invocations/month", "Community support", "1 integration", "Basic observability"],
  },
  {
    name: "Growth",
    description: "For teams scaling automation",
    price: "$2,400",
    suffix: "/month",
    cta: "Start 30-day trial",
    popular: true,
    features: ["Up to 50 agents", "500k invocations/month", "Priority support (4h SLA)", "Unlimited integrations", "Advanced observability + alerts", "SOC 2 + GDPR reports"],
  },
  {
    name: "Enterprise",
    description: "For organizations with custom needs",
    price: "Custom",
    suffix: "",
    cta: "Contact sales",
    features: ["Unlimited agents", "Custom invocation volume", "Dedicated CSM", "Custom integrations", "On-prem / VPC deployment option", "Custom SLAs"],
  },
];

const testimonials = [
  {
    name: "Maya Chen",
    title: "Head of Platform, Acme Corp",
    quote: "Sample customer quote: Nexus AI helped our platform team move from one-off scripts to observable agent workflows with clear ownership.",
    initials: "MC",
  },
  {
    name: "Jordan Vale",
    title: "VP Data, Globex",
    quote: "Sample customer quote: The governance model and deployment controls made it practical to bring automation into our core data operations.",
    initials: "JV",
  },
  {
    name: "Priya Shah",
    title: "Head of Operations, Initech",
    quote: "Sample customer quote: We cut manual routing work without sacrificing auditability. The time-to-value was measured in days.",
    initials: "PS",
  },
];

const faqs = [
  {
    q: "How does pricing work?",
    a: "Plans are based on automation scale, integration needs, and support requirements. Growth covers most scaling teams, while Enterprise is sales-led for custom deployment models.",
  },
  {
    q: "What about data security?",
    a: "Nexus AI is designed for SOC 2, GDPR, and HIPAA-aligned workflows with encryption, audit trails, role controls, and configurable data retention.",
  },
  {
    q: "Can I self-host?",
    a: "Enterprise customers can deploy in a private VPC or on-prem environment with custom SLAs and dedicated implementation support.",
  },
];

const footerColumns = [
  ["Product", "Platform", "Workflows", "Data", "Automation", "Integrations"],
  ["Solutions", "By industry", "By role", "By use case", "Migration guide"],
  ["Resources", "Documentation", "API reference", "Blog", "Status", "Changelog"],
  ["Company", "About", "Customers", "Careers", "Press", "Contact"],
  ["Legal", "Privacy", "Terms", "Security", "DPA", "Cookie policy"],
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3.25 8.25L6.35 11.25L12.75 4.75" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="54" height="34" viewBox="0 0 54 34" fill="none">
      <path d="M17.2 27.2H40.8C45.4 27.2 49.1 23.7 49.1 19.4C49.1 15.2 45.7 11.8 41.4 11.5C39.8 6.4 34.9 2.8 29.2 2.8C23.6 2.8 18.8 6.3 17.1 11.2H15.8C9.8 11.2 4.9 15.8 4.9 21.2C4.9 24.5 8.1 27.2 17.2 27.2Z" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function ThemeToggle({ theme, toggle }: { theme: Theme; toggle: () => void }) {
  return (
    <button className="themeToggle" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default function TechCompanyPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [openFaq, setOpenFaq] = useState(0);
  const c = themes[theme];
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const stored = localStorage.getItem("nexus-ai-theme") as Theme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-animated");
          } else {
            entry.target.classList.remove("scroll-animated");
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".scroll-animate").forEach((node) => {
      if (reduceMotion) node.classList.add("scroll-animated");
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const toggleTheme = () => {
    setTheme(nextTheme);
    localStorage.setItem("nexus-ai-theme", nextTheme);
  };

  if (!mounted) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: inter.style.fontFamily, background: themes.light.page, color: themes.light.text }}>
        Loading Nexus AI...
      </main>
    );
  }

  return (
    <main
      className={`${inter.className} nexus-page ${theme}`}
      style={{
        background: `${c.bgOverlay}, url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80') center/cover no-repeat fixed`,
        color: c.text,
        minHeight: "100vh",
        width: "100%",
        flex: "1 0 auto",
        borderRadius: 0,
        overflowX: "hidden",
        position: "relative",
        ["--page" as string]: c.page,
        ["--text" as string]: c.text,
        ["--muted" as string]: c.muted,
        ["--subtle" as string]: c.subtle,
        ["--faint" as string]: c.faint,
        ["--card" as string]: c.card,
        ["--card-solid" as string]: c.cardSolid,
        ["--border" as string]: c.border,
        ["--border-strong" as string]: c.borderStrong,
        ["--accent" as string]: c.accent,
        ["--accent-bright" as string]: c.accentBright,
        ["--accent-deep" as string]: c.accentDeep,
        ["--accent-soft" as string]: c.accentSoft,
        ["--shadow" as string]: c.shadow,
        ["--nav" as string]: c.nav,
        ["--inverse" as string]: c.inverse,
        ["--inverse-text" as string]: c.inverseText,
        ["--mono" as string]: jetBrains.style.fontFamily,
      }}
    >
      <style>{`
        /* Hallmark · macrostructure: Stripe-Style Enterprise Landing · tone: elegant-technical
         * theme: Nexus Cyan · accent: Cyan #22d3ee (dark) / #0891b2 (light) · mono: JetBrains Mono
         * display: Inter weight 200-300 · body: Inter weight 400 · single-font page
         * differs from last 4: cyan accent (was blue/emerald/amber/navy) · Inter (was Plex/Fraunces/Playfair) ·
         *   8-12px radius (was 0/14-20/16-24) · cyan radial glow (was photo bg) · bento grid
         *   (was masonry/rate table/4-card) · hex/bracket particles (was shield/leaf) · 11 components
         *   (not 12 — Stripe pattern doesn't need that many)
         */
        .nexus-page * { box-sizing: border-box; }
        .nexus-page a { color: inherit; text-decoration: none; }
        .nexus-page button { font: inherit; }
        .nexus-shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; position: relative; z-index: 2; }
        .nav { position: sticky; top: 0; z-index: 20; height: 64px; display: flex; align-items: center; border-bottom: 1px solid var(--border); backdrop-filter: blur(18px); background: var(--nav); }
        .navInner { width: min(1220px, calc(100% - 32px)); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text); letter-spacing: 0; }
        .brandMark { width: 32px; height: 32px; border-radius: 8px; display: grid; place-items: center; color: var(--accent); border: 1px solid var(--border-strong); background: radial-gradient(circle at 30% 20%, rgba(34,211,238,.28), transparent 54%), var(--card); box-shadow: var(--shadow); }
        .navLinks { display: flex; align-items: center; gap: 26px; font-size: 14px; color: var(--muted); }
        .navLink { position: relative; padding: 22px 0; transition: color 180ms ease; }
        .navLink::after { content: ""; position: absolute; left: 0; right: 100%; bottom: 16px; height: 2px; background: var(--accent); transition: right 220ms ease; }
        .navLink:hover { color: var(--text); }
        .navLink:hover::after { right: 0; }
        .navActions { display: flex; align-items: center; gap: 14px; font-size: 14px; }
        .themeToggle { color: var(--muted); background: transparent; border: 0; cursor: pointer; padding: 8px 0; }
        .signIn { color: var(--muted); transition: color 180ms ease; }
        .signIn:hover, .themeToggle:hover { color: var(--text); }
        .primaryBtn, .pricingBtn, .ctaButton { position: relative; border: 0; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; overflow: hidden; background: var(--accent); color: #ffffff; box-shadow: 0 10px 24px rgba(34, 211, 238, 0.18); transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .primaryBtn::before, .pricingBtn::before, .ctaButton::before { content: ""; position: absolute; inset: 0 auto 0 -70%; width: 45%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent); transform: skewX(-18deg); transition: left 520ms ease; }
        .primaryBtn:hover, .pricingBtn:hover { transform: translateY(-2px); background: var(--accent-deep); box-shadow: 0 16px 34px rgba(34, 211, 238, 0.3); }
        .primaryBtn:hover::before, .pricingBtn:hover::before, .ctaButton:hover::before { left: 130%; }
        .primaryBtn { padding: 10px 16px; font-weight: 700; font-size: 14px; }
        .hero { min-height: 760px; padding: 106px 0 72px; position: relative; text-align: center; }
        .heroGlow { position: absolute; left: 50%; top: 86px; width: 760px; height: 620px; transform: translateX(-50%); background: radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(34, 211, 238, 0.09) 34%, transparent 70%); filter: blur(4px); pointer-events: none; z-index: 0; }
        .eyebrow { color: var(--accent); font: 600 12px/1 var(--mono); letter-spacing: .16em; text-transform: uppercase; }
        .hero h1 { max-width: 960px; margin: 24px auto 0; font-size: clamp(48px, 7vw, 72px); line-height: .98; letter-spacing: 0; font-weight: 200; }
        .heroText { max-width: 720px; margin: 24px auto 0; color: var(--muted); font-size: 20px; line-height: 1.6; font-weight: 400; }
        .heroCtas { display: flex; justify-content: center; align-items: center; gap: 24px; margin-top: 34px; flex-wrap: wrap; }
        .hero .primaryBtn { min-height: 48px; padding: 0 22px; border-radius: 8px; }
        .ghostLink, .learnLink, .docLink { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-weight: 700; position: relative; transition: color 180ms ease, transform 180ms ease; }
        .ghostLink::after { content: ""; position: absolute; left: 0; right: 100%; bottom: -5px; height: 1px; background: currentColor; transition: right 220ms ease; }
        .ghostLink:hover, .learnLink:hover, .docLink:hover { color: var(--accent-deep); transform: translateX(3px); }
        .ghostLink:hover::after { right: 0; }
        .trusted { margin-top: 52px; }
        .logoRow { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-top: 18px; }
        .logoBox { border: 1px solid var(--border); border-radius: 8px; min-height: 54px; display: grid; place-items: center; color: var(--subtle); filter: grayscale(1); opacity: .74; background: var(--card); transition: color 180ms ease, filter 180ms ease, opacity 180ms ease, border-color 180ms ease, transform 180ms ease; }
        .logoBox:hover { color: var(--accent); filter: grayscale(0); opacity: 1; border-color: var(--border-strong); transform: translateY(-2px); }
        .demoCard { margin: 34px auto 0; max-width: 840px; aspect-ratio: 16/9; border-radius: 12px; border: 1px solid rgba(34,211,238,.22); overflow: hidden; background: #0a0a0a; box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 24px 70px rgba(34,211,238,.14); text-align: left; position: relative; }
        .demoTop { height: 42px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-bottom: 1px solid rgba(34,211,238,.14); color: #a1a1aa; font: 12px var(--mono); }
        .demoBody { font: 13px/1.8 var(--mono); color: #d4d4d8; padding: 24px; display: grid; gap: 8px; }
        .watchBtn { position: absolute; right: 20px; bottom: 20px; background: rgba(255,255,255,.92); color: #0a0a0a; border: 0; border-radius: 8px; min-height: 40px; padding: 0 14px; font-weight: 700; box-shadow: 0 12px 30px rgba(0,0,0,.32); cursor: pointer; }
        .section { padding: 96px 0; }
        .sectionHeader { max-width: 720px; margin-bottom: 36px; }
        .sectionHeader.center { margin: 0 auto 42px; text-align: center; }
        .section h2 { margin: 12px 0 0; font-size: clamp(34px, 5vw, 56px); line-height: 1.04; font-weight: 200; letter-spacing: 0; }
        .sectionIntro { color: var(--muted); font-size: 17px; line-height: 1.7; margin-top: 16px; }
        .featureRow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .card { border: 1px solid var(--border); border-radius: 12px; background: var(--card); box-shadow: var(--shadow); }
        .productCard { padding: 26px; min-height: 280px; transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
        .productCard:hover, .bentoTile:hover { transform: translateY(-2px); border-color: var(--border-strong); box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 14px 34px rgba(34, 211, 238, 0.16); }
        .iconBox { width: 46px; height: 46px; border-radius: 8px; display: grid; place-items: center; color: var(--accent); background: var(--accent-soft); border: 1px solid var(--border); margin-bottom: 32px; }
        .productCard h3, .bentoTile h3, .pricingCard h3 { margin: 0; font-size: 22px; line-height: 1.2; font-weight: 600; letter-spacing: 0; }
        .productCard p, .bentoTile p, .pricingCard p { color: var(--muted); line-height: 1.65; margin: 14px 0 0; }
        .learnLink { margin-top: 24px; font-size: 14px; }
        .bentoGrid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(220px, auto); gap: 18px; }
        .bentoTile { padding: 26px; overflow: hidden; position: relative; transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
        .bentoTile:hover .pulseTarget { animation: pulseCyan 700ms ease; }
        .tileWide { grid-column: span 2; }
        .tileFull { grid-column: 1 / -1; display: grid; grid-template-columns: 1.4fr .8fr; align-items: center; gap: 24px; }
        .chart { width: 100%; height: 168px; margin-top: 24px; }
        .cloudRow { display: flex; gap: 10px; margin-top: 28px; }
        .cloudChip { flex: 1; min-height: 70px; border: 1px solid var(--border); border-radius: 8px; display: grid; place-items: center; background: var(--accent-soft); }
        .badgeRow { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 24px; }
        .badge { color: #fff; background: var(--accent); border-radius: 8px; padding: 9px 11px; font-weight: 700; font-size: 12px; letter-spacing: .08em; }
        .codeInset { margin-top: 22px; border-radius: 8px; background: #0a0a0a; color: #e5e7eb; padding: 18px; font: 13px/1.75 var(--mono); border: 1px solid rgba(34,211,238,.2); overflow: auto; }
        .bigLatency { color: var(--accent); font-size: clamp(44px, 7vw, 56px); font-weight: 200; line-height: 1; font-family: var(--font-inter, inherit); }
        .terminalBand { background: #0a0a0a; color: #fafafa; padding: 96px 0; position: relative; overflow: hidden; }
        .terminalBand::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(180deg, rgba(34,211,238,.04), rgba(34,211,238,.04) 1px, transparent 1px, transparent 4px); pointer-events: none; }
        .terminalBand h2 { color: #fff; text-align: center; font-size: clamp(30px, 4vw, 32px); font-weight: 300; margin: 0 0 32px; }
        .terminalWindow { max-width: 920px; margin: 0 auto; aspect-ratio: 16/9; border-radius: 12px; border: 1px solid rgba(34,211,238,.22); background: #050607; overflow: hidden; box-shadow: 0 28px 80px rgba(34,211,238,.14); position: relative; }
        .terminalHeader { height: 44px; display: grid; grid-template-columns: 120px 1fr 120px; align-items: center; padding: 0 16px; border-bottom: 1px solid rgba(34,211,238,.14); color: #a1a1aa; font: 12px var(--mono); }
        .lights { display: flex; gap: 8px; }
        .light { width: 11px; height: 11px; border-radius: 50%; }
        .terminalTitle { text-align: center; }
        .terminalBody { padding: clamp(20px, 5vw, 42px); font: 14px/2 var(--mono); color: #d4d4d8; white-space: pre-wrap; }
        .terminalLinks { display: flex; justify-content: center; gap: 28px; margin-top: 22px; position: relative; z-index: 1; }
        .terminalLinks a:first-child { color: #22d3ee; }
        .terminalLinks a:last-child { color: #fff; }
        .statBand { padding: 76px 0; background: radial-gradient(circle at 10% 50%, rgba(34,211,238,.14), transparent 42%), var(--faint); border-block: 1px solid var(--border); }
        .statLabel { text-align: center; color: var(--subtle); font: 12px var(--mono); margin-bottom: 28px; }
        .statsGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .statCell { text-align: center; padding: 20px 12px; }
        .statNumber { color: var(--accent); font-size: clamp(46px, 7vw, 72px); line-height: 1; font-weight: 200; letter-spacing: 0; }
        .statName { margin-top: 14px; color: var(--subtle); font-size: 13px; font-weight: 400; letter-spacing: .32px; }
        .pricingGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; align-items: stretch; }
        .pricingCard { padding: 28px; position: relative; min-height: 580px; display: flex; flex-direction: column; transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
        .pricingCard:hover { transform: translateY(-2px); border-color: var(--border-strong); }
        .pricingCard.featured { border: 2px solid var(--accent); transform: translateY(-8px); box-shadow: 0 1px 2px rgba(0,0,0,.05), 0 20px 54px rgba(34,211,238,.2); }
        .pricingCard.featured:hover { transform: translateY(-8px) scale(1.02); }
        .popularTag { position: absolute; top: 18px; right: 18px; color: var(--accent); background: var(--accent-soft); border: 1px solid var(--border-strong); border-radius: 8px; padding: 7px 10px; font: 700 11px var(--mono); letter-spacing: .08em; }
        .price { margin-top: 32px; font-size: clamp(42px, 6vw, 56px); font-weight: 200; line-height: 1; letter-spacing: 0; }
        .price small { display: block; margin-top: 8px; color: var(--subtle); font-size: 13px; font-weight: 400; }
        .featureList { list-style: none; padding: 0; margin: 28px 0; display: grid; gap: 14px; color: var(--muted); font-size: 14px; }
        .featureList li { display: flex; gap: 10px; align-items: flex-start; }
        .pricingBtn { width: 100%; min-height: 46px; margin-top: auto; font-weight: 800; }
        .testimonialGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .quoteCard { padding: 26px; min-height: 278px; display: flex; flex-direction: column; justify-content: space-between; }
        .quoteCard blockquote { margin: 0; color: var(--text); line-height: 1.65; font-size: 16px; }
        .person { display: flex; align-items: center; gap: 12px; margin-top: 28px; }
        .avatar { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); border: 1px solid var(--border); font-weight: 800; }
        .personName { font-weight: 700; }
        .personTitle { color: var(--subtle); font-size: 13px; margin-top: 3px; }
        .faqList { max-width: 820px; margin: 0 auto; display: grid; gap: 12px; }
        .faqItem { overflow: hidden; }
        .faqQuestion { width: 100%; min-height: 62px; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 0 22px; background: transparent; color: var(--text); border: 0; cursor: pointer; text-align: left; font-weight: 700; }
        .faqAnswer { color: var(--muted); padding: 0 22px 22px; line-height: 1.65; }
        .plus { color: var(--accent); font-size: 24px; font-weight: 200; }
        .finalCta { min-height: 280px; padding: 64px 20px; text-align: center; display: grid; place-items: center; color: white; background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); }
        .finalCta h2 { margin: 0; font-size: clamp(34px, 5vw, 48px); font-weight: 200; line-height: 1.05; }
        .finalCta p { margin: 16px auto 26px; max-width: 600px; opacity: .85; line-height: 1.65; }
        .ctaButton { min-height: 48px; padding: 0 22px; background: white; color: #075985; box-shadow: 0 10px 28px rgba(255,255,255,.18); font-weight: 800; }
        .ctaButton:hover { transform: translateY(-1px) scale(1.02); box-shadow: 0 16px 38px rgba(255,255,255,.34); }
        .footer { background: #0a0a0a; color: #fafafa; padding: 70px 0 34px; }
        .footerGrid { display: grid; grid-template-columns: 1.3fr repeat(5, 1fr); gap: 30px; }
        .footerBrand { color: #22d3ee; font-weight: 700; font-size: 20px; }
        .footerTag { color: #71717a; margin-top: 12px; line-height: 1.6; font-size: 14px; }
        .footerCol h3 { margin: 0 0 14px; font-size: 13px; color: #fff; }
        .footerCol a { display: block; color: #a1a1aa; font-size: 13px; margin: 10px 0; transition: color 180ms ease; }
        .footerCol a:hover { color: #22d3ee; }
        .footerBottom { border-top: 1px solid rgba(255,255,255,.12); margin-top: 46px; padding-top: 22px; color: #71717a; font: 12px var(--mono); }
        .particles { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
        .hexParticle { position: absolute; bottom: -40px; width: 16px; height: 14px; opacity: .22; animation: hexRise linear infinite; }
        .hexParticle::before { content: ""; position: absolute; inset: 0; border: 1px solid var(--accent); clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
        .scroll-animate { opacity: 0; transform: translateY(36px) scale(.96); transition: opacity 620ms ease, transform 620ms cubic-bezier(.2,.8,.2,1); transition-delay: var(--delay, 0ms); }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0) scale(1); }
        @keyframes hexRise { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(-115vh) rotate(180deg); } }
        @keyframes pulseCyan { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .72; transform: scale(1.02); } }
        @media (max-width: 1200px) { .featureRow, .pricingGrid, .testimonialGrid { grid-template-columns: repeat(2, 1fr); } .bentoGrid { grid-template-columns: repeat(2, 1fr); } .tileWide, .tileFull { grid-column: span 2; } .statsGrid { grid-template-columns: repeat(2, 1fr); } .footerGrid { grid-template-columns: repeat(3, 1fr); } .footerLead { grid-column: 1 / -1; } }
        @media (max-width: 920px) { .navLinks, .signIn { display: none; } .hero { padding-top: 78px; min-height: auto; } .logoRow { grid-template-columns: repeat(3, 1fr); } .terminalWindow { aspect-ratio: auto; min-height: 420px; } .tileFull { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .nexus-shell { width: min(100% - 28px, 1180px); } .featureRow, .pricingGrid, .testimonialGrid, .bentoGrid, .statsGrid, .footerGrid { grid-template-columns: 1fr; } .tileWide, .tileFull { grid-column: span 1; } .logoRow { grid-template-columns: repeat(2, 1fr); } .navActions { gap: 8px; } .themeToggle { display: none; } .heroCtas, .terminalLinks { flex-direction: column; gap: 14px; } .section { padding: 72px 0; } .pricingCard.featured, .pricingCard.featured:hover { transform: none; } .footerGrid { gap: 18px; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 1ms !important; animation-delay: 0ms !important; transition-duration: 1ms !important; scroll-behavior: auto !important; } .scroll-animate { opacity: 1; transform: none; } }
      `}</style>

      <div className="particles" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            className="hexParticle"
            key={i}
            style={{
              left: `${(i * 47) % 100}%`,
              width: `${12 + (i % 4) * 2}px`,
              height: `${11 + (i % 4) * 2}px`,
              animationDuration: `${18 + (i % 7)}s`,
              animationDelay: `${i * 0.85}s`,
            }}
          />
        ))}
      </div>

      <nav className="nav">
        <div className="navInner">
          <a className="brand" href="#top">
            <span className="brandMark">N</span>
            <span>Nexus AI</span>
          </a>
          <div className="navLinks" aria-label="Primary navigation">
            {navLinks.map((link, i) => (
              <a className="navLink scroll-animate" style={{ ["--delay" as string]: `${i * 70}ms` }} href={`#${link.toLowerCase()}`} key={link}>
                {link}
              </a>
            ))}
          </div>
          <div className="navActions">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <a className="signIn" href="#signin">Sign in</a>
            <a className="primaryBtn" href="#pricing">Request Demo →</a>
          </div>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroGlow" aria-hidden="true" />
        <div className="nexus-shell">
          <div className="eyebrow scroll-animate">Intelligent Automation for Modern Enterprises</div>
          <h1 className="scroll-animate" style={{ ["--delay" as string]: "80ms" }}>Deploy enterprise AI agents without rebuilding your stack.</h1>
          <p className="heroText scroll-animate" style={{ ["--delay" as string]: "150ms" }}>
            Nexus AI gives platform teams the workflow engine, data layer, integrations, and observability to ship automation in days, not months.
          </p>
          <div className="heroCtas scroll-animate" style={{ ["--delay" as string]: "220ms" }}>
            <a className="primaryBtn" href="#pricing">Request Demo →</a>
            <a className="ghostLink" href="#developers">View Documentation →</a>
          </div>

          <div className="trusted scroll-animate" style={{ ["--delay" as string]: "290ms" }}>
            <div className="eyebrow">Trusted by 200+ enterprises</div>
            <div className="logoRow">
              {logos.map((logo, i) => (
                <div className="logoBox scroll-animate" style={{ ["--delay" as string]: `${i * 70}ms` }} key={logo}>{logo}</div>
              ))}
            </div>
          </div>

          <div className="demoCard scroll-animate" style={{ ["--delay" as string]: "360ms" }}>
            <div className="demoTop"><span>nexus-demo.workflow</span><span>prod · us-east-1</span></div>
            <div className="demoBody">
              <span style={{ color: "#67e8f9" }}>$ nexus deploy workflow.json</span>
              <span>validating schema · resolving integrations · provisioning cluster</span>
              <span>agent.sales-intel ready on /v1/workflows/sales-intel</span>
              <span style={{ color: "#a7f3d0" }}>deployment complete in 4.2s</span>
            </div>
            <button className="watchBtn">▶ Watch 2-min demo</button>
          </div>
        </div>
      </section>

      <section className="section" id="platform">
        <div className="nexus-shell">
          <div className="featureRow">
            {features.map((feature, i) => (
              <article className="card productCard scroll-animate" style={{ ["--delay" as string]: `${i * 80}ms` }} key={feature.title}>
                <div className="iconBox pulseTarget">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L19.8 7.5V16.5L12 21L4.2 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8.5 12H15.5M12 8.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a className="learnLink" href="#solutions">Learn more →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="solutions">
        <div className="nexus-shell">
          <div className="sectionHeader">
            <div className="eyebrow">Platform capabilities</div>
            <h2>Everything your team needs to put agents into production.</h2>
            <p className="sectionIntro">A technical control plane for the full lifecycle: design, connect, deploy, observe, and optimize every workflow.</p>
          </div>
          <div className="bentoGrid">
            <article className="card bentoTile tileWide scroll-animate">
              <h3>Real-time observability dashboard</h3>
              <p>Track agent runs, tool calls, cost, latency, and escalation paths from a single command surface.</p>
              <svg className="chart pulseTarget" viewBox="0 0 620 180" fill="none" aria-label="Rising observability line chart">
                {Array.from({ length: 8 }).map((_, i) => <path key={`v-${i}`} d={`M${40 + i * 78} 16V156`} stroke="currentColor" opacity=".08" />)}
                {Array.from({ length: 5 }).map((_, i) => <path key={`h-${i}`} d={`M40 ${30 + i * 30}H590`} stroke="currentColor" opacity=".08" />)}
                <path d="M40 138C86 126 102 130 140 112C188 90 214 102 260 80C310 56 344 74 386 54C432 32 472 46 514 28C546 16 570 18 590 12" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                <path d="M40 150C92 142 116 145 158 132C214 114 244 122 300 94C360 64 402 70 450 42C504 12 548 26 590 18" stroke="var(--accent-bright)" strokeWidth="2" strokeLinecap="round" opacity=".62" />
                <path d="M40 156H590" stroke="currentColor" opacity=".18" />
              </svg>
            </article>
            <article className="card bentoTile scroll-animate" style={{ ["--delay" as string]: "70ms" }}>
              <h3>Multi-cloud deployment</h3>
              <p>Run agents close to your data across cloud, private VPC, and region-specific infrastructure.</p>
              <div className="cloudRow pulseTarget">
                {[0, 1, 2].map((item) => <div className="cloudChip" key={item}><CloudIcon color={c.accent} /></div>)}
              </div>
            </article>
            <article className="card bentoTile scroll-animate" style={{ ["--delay" as string]: "140ms" }}>
              <h3>SOC 2 + GDPR + HIPAA</h3>
              <p>Compliance artifacts, audit logs, data retention controls, and security workflows are built in.</p>
              <div className="badgeRow pulseTarget">
                {["SOC 2", "GDPR", "HIPAA"].map((badge) => <span className="badge" key={badge}>{badge}</span>)}
              </div>
            </article>
            <article className="card bentoTile tileWide scroll-animate" style={{ ["--delay" as string]: "210ms" }} id="developers">
              <h3>Custom integrations via API</h3>
              <p>Use the SDK to wire agents into your CRM, collaboration tools, warehouse, and internal services.</p>
              <pre className="codeInset pulseTarget">{`import { Nexus } from '@nexus-ai/sdk'

const agent = await Nexus.create({
  workflow: 'sales-intel',
  integrations: ['salesforce', 'slack']
});`}</pre>
            </article>
            <article className="card bentoTile tileFull scroll-animate" style={{ ["--delay" as string]: "280ms" }}>
              <div>
                <h3>Sub-second agent response times</h3>
                <p>Latency budgets, queue controls, and regional routing keep customer-facing workflows responsive at scale.</p>
              </div>
              <div className="bigLatency pulseTarget">&lt;800ms p99</div>
            </article>
          </div>
        </div>
      </section>

      <section className="terminalBand">
        <div className="nexus-shell">
          <h2 className="scroll-animate">Deploy in minutes, scale globally</h2>
          <div className="terminalWindow scroll-animate" style={{ ["--delay" as string]: "90ms" }}>
            <div className="terminalHeader">
              <div className="lights"><span className="light" style={{ background: "#ff5f57" }} /><span className="light" style={{ background: "#ffbd2e" }} /><span className="light" style={{ background: "#28c840" }} /></div>
              <div className="terminalTitle">nexus-cli — 80×24</div>
              <div />
            </div>
            <pre className="terminalBody">{`$ nexus deploy workflow.json --target prod
✓ Validating workflow...
✓ Provisioning agent cluster (3 nodes)
✓ Loading knowledge base (12.4k docs)
✓ Establishing integrations (Salesforce, Slack, Snowflake)
✓ Deploy complete — first run in 4.2s`}</pre>
          </div>
          <div className="terminalLinks scroll-animate" style={{ ["--delay" as string]: "160ms" }}>
            <a href="#developers">↳ Try the CLI</a>
            <a href="#developers">View full documentation →</a>
          </div>
        </div>
      </section>

      <section className="statBand" data-note="Sample platform stats — your real metrics here">
        <div className="nexus-shell">
          <div className="statLabel">Sample platform stats — your real metrics here</div>
          <div className="statsGrid">
            {stats.map(([number, label], i) => (
              <div className="statCell scroll-animate" style={{ ["--delay" as string]: `${i * 75}ms` }} key={number}>
                <div className="statNumber">{number}</div>
                <div className="statName">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="nexus-shell">
          <div className="sectionHeader center">
            <div className="eyebrow">Integrated pricing</div>
            <h2>Start small, scale with the workflows that matter.</h2>
            <p className="sectionIntro">Simple SaaS packaging for platform teams, with enterprise deployment options when your environment needs them.</p>
          </div>
          <div className="pricingGrid">
            {tiers.map((tier, i) => (
              <article className={`card pricingCard scroll-animate ${tier.popular ? "featured" : ""}`} style={{ ["--delay" as string]: `${i * 80}ms` }} key={tier.name}>
                {tier.popular ? <div className="popularTag">← MOST POPULAR</div> : null}
                <h3>{tier.name}</h3>
                <p>{tier.description}</p>
                <div className="price">{tier.price}<small>{tier.suffix}</small></div>
                <ul className="featureList">
                  {tier.features.map((item) => (
                    <li key={item}><CheckIcon color={c.accent} /><span>{item}</span></li>
                  ))}
                </ul>
                <a className="pricingBtn" href="mailto:contact@nexus-ai.com">{tier.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="nexus-shell">
          <div className="sectionHeader center">
            <div className="eyebrow">Illustrative customer proof</div>
            <h2>Built for teams that own critical systems.</h2>
          </div>
          <div className="testimonialGrid">
            {testimonials.map((item, i) => (
              <article className="card quoteCard scroll-animate" style={{ ["--delay" as string]: `${i * 80}ms` }} key={item.name}>
                <blockquote>“{item.quote}”</blockquote>
                <div className="person">
                  <div className="avatar">{item.initials}</div>
                  <div>
                    <div className="personName">{item.name}</div>
                    <div className="personTitle">{item.title}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="nexus-shell">
          <div className="sectionHeader center">
            <div className="eyebrow">FAQ</div>
            <h2>Procurement-ready answers.</h2>
          </div>
          <div className="faqList">
            {faqs.map((faq, i) => (
              <article className="card faqItem scroll-animate" style={{ ["--delay" as string]: `${i * 80}ms` }} key={faq.q}>
                <button className="faqQuestion" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  <span>{faq.q}</span>
                  <span className="plus">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i ? <div className="faqAnswer">{faq.a}</div> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="finalCta">
        <div>
          <h2>Ready to deploy intelligent automation?</h2>
          <p>Get a 30-minute demo with a platform engineer. No slide decks.</p>
          <a className="ctaButton" href="mailto:contact@nexus-ai.com">Request Demo →</a>
        </div>
      </section>

      <footer className="footer">
        <div className="nexus-shell">
          <div className="footerGrid">
            <div className="footerLead">
              <div className="footerBrand">Nexus AI</div>
              <div className="footerTag">Intelligent automation for modern enterprises.</div>
            </div>
            {footerColumns.map(([heading, ...links]) => (
              <div className="footerCol" key={heading}>
                <h3>{heading}</h3>
                {links.map((link) => <a href="#top" key={link}>{link}</a>)}
              </div>
            ))}
          </div>
          <div className="footerBottom">© 2026 Nexus AI · Made in Austin, TX · SOC 2 Type II · GDPR · HIPAA</div>
        </div>
      </footer>
    </main>
  );
}
