"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Design System ──────────────────────────────────────────────────────── */
const darkTheme = {
  bg: "#09090b",
  text: "#f4f4f5",
  textMuted: "#71717a",
  accent: "#22d3ee",
  secondary: "#06b6d4",
  warm: "#f97316",
  surface: "rgba(255,255,255,0.03)",
  card: "rgba(255,255,255,0.04)",
  border: "rgba(34,211,238,0.15)",
  glow: "rgba(34,211,238,0.2)",
  navBg: "rgba(9,9,11,0.92)",
  inputBg: "rgba(255,255,255,0.03)",
  footerBg: "#030305",
  heading: "#ffffff",
  inputBorder: "rgba(255,255,255,0.1)",
  cardHover: "rgba(34,211,238,0.07)",
};

const lightTheme = {
  bg: "#f8fafc",
  text: "#0f172a",
  textMuted: "#64748b",
  accent: "#0891b2",
  secondary: "#06b6d4",
  warm: "#ea580c",
  surface: "rgba(0,0,0,0.03)",
  card: "rgba(0,0,0,0.04)",
  border: "rgba(8,145,178,0.2)",
  glow: "rgba(8,145,178,0.15)",
  navBg: "rgba(248,250,252,0.92)",
  inputBg: "rgba(255,255,255,0.8)",
  footerBg: "#f1f5f9",
  heading: "#0f172a",
  inputBorder: "rgba(0,0,0,0.1)",
  cardHover: "rgba(8,145,178,0.06)",
};

/* ─── Canvas Mist Particles ──────────────────────────────────────────────── */
interface MistDrop {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  phase: number;
}

function useCanvasAnimation(isDark: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dropsRef = useRef<MistDrop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Init drops
    dropsRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 80 + 30,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * 100,
    }));

    const accentColor = isDark ? "34,211,238" : "8,145,178";
    const globalAlpha = isDark ? 0.5 : 0.35;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dropsRef.current.forEach((d) => {
        d.y -= d.speed;
        d.wobble += d.wobbleSpeed;
        d.x += Math.sin(d.wobble) * 0.4;

        if (d.y + d.radius < 0) {
          d.y = canvas.height + d.radius;
          d.x = Math.random() * canvas.width;
        }

        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
        grad.addColorStop(0, `rgba(${accentColor},${d.opacity * globalAlpha})`);
        grad.addColorStop(1, `rgba(${accentColor},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return canvasRef;
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const SnowflakeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <line x1="12" y1="2" x2="10.5" y2="6" />
    <line x1="12" y1="2" x2="13.5" y2="6" />
    <line x1="12" y1="22" x2="10.5" y2="18" />
    <line x1="12" y1="22" x2="13.5" y2="18" />
    <line x1="2" y1="12" x2="6" y2="10.5" />
    <line x1="2" y1="12" x2="6" y2="13.5" />
    <line x1="22" y1="12" x2="18" y2="10.5" />
    <line x1="22" y1="12" x2="18" y2="13.5" />
  </svg>
);
const FlameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
const WrenchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const BoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ThumbsUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);
const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ─── Logo ───────────────────────────────────────────────────────────────── */
function Logo({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="13.5" stroke={accent} strokeWidth="1.5" opacity="0.7" />
        <path d="M15 6L19 13L15 11L11 13Z" fill={accent} opacity="0.85" />
        <path d="M15 24L11 17L15 19L19 17Z" fill={accent} opacity="0.85" />
        <path d="M6 15L13 11L11 15L13 19Z" fill={accent} opacity="0.65" />
        <path d="M24 15L17 19L19 15L17 11Z" fill={accent} opacity="0.65" />
        <circle cx="15" cy="15" r="3.5" fill={accent} />
      </svg>
      <span style={{
        fontSize: "0.8125rem",
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "inherit",
      }}>
        CoolAir HVAC
      </span>
    </div>
  );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function CoolAirPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const canvasRef = useCanvasAnimation(isDark);

  useEffect(() => {
    const stored = localStorage.getItem("hvac-theme");
    if (stored) setIsDark(stored === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("hvac-theme", next ? "dark" : "light");
  };

  const c = isDark ? darkTheme : lightTheme;

  const styles = `
    html, body { background: ${c.bg}; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .hvac-page * { font-family: var(--font-inter), system-ui, sans-serif; }
    .mono { font-family: var(--font-jetbrains), monospace; }
    ::selection { background: ${c.accent}; color: ${c.bg}; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${c.bg}; }
    ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${c.accent}; }
    @keyframes float-up {
      0% { transform: translateY(0px) scale(1); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-8px) scale(1.05); opacity: 0; }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-float { animation: float-up 4s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }
  `;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* ── Section helpers ── */
  const SectionLabel = ({ text }: { text: string }) => (
    <div className="mono" style={{
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: c.accent,
      marginBottom: "0.75rem",
    }}>{text}</div>
  );

  const SectionTitle = ({ text }: { text: string }) => (
    <h2 style={{
      fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
      fontWeight: 900,
      letterSpacing: "-0.03em",
      color: c.heading,
      lineHeight: 1.15,
      marginBottom: "0.5rem",
    }}>{text}</h2>
  );

  /* ── Stats data ── */
  const stats = [
    { value: "28", label: "Years", sub: "In business" },
    { value: "50K+", label: "Jobs", sub: "Completed" },
    { value: "4.9", label: "Rating", sub: "Google Reviews" },
    { value: "<1hr", label: "Response", sub: "Avg. arrival" },
  ];

  /* ── Services data ── */
  const services = [
    { num: "01", icon: <SnowflakeIcon />, title: "AC Repair", desc: "Fast diagnosis & repair for all makes and models. We restore cool comfort fast — guaranteed." },
    { num: "02", icon: <FlameIcon />, title: "Heating", desc: "Furnace service, heat pump installation & emergency heating for those bitter cold months." },
    { num: "03", icon: <WrenchIcon />, title: "Maintenance", desc: "Annual tune-ups that extend equipment life and prevent costly mid-season breakdowns." },
    { num: "04", icon: <BoltIcon />, title: "Emergency", desc: "24/7 emergency response. When it breaks down at midnight, we're there before sunrise." },
  ];

  /* ── Why us data ── */
  const whyUs = [
    { icon: <ThumbsUpIcon />, title: "Upfront Pricing", desc: "No surprise bills. We quote before we touch your system — always." },
    { icon: <AwardIcon />, title: "Certified Technicians", desc: "EPA-certified, factory-trained experts. Every job backed by our workmanship guarantee." },
    { icon: <ZapIcon />, title: "Same-Day Availability", desc: "Call by noon, we arrive today. Regular scheduling available, too." },
  ];

  /* ── Trust badges ── */
  const trustBadges = [
    { icon: <ShieldIcon />, label: "Licensed & Insured", sub: "ROC #298475" },
    { icon: <ClockIcon />, label: "24/7 Service", sub: "Always on call" },
    { icon: <StarIcon />, label: "5-Star Rated", sub: "4.9 / 5.0" },
    { icon: <CheckIcon />, label: "Same-Day Repairs", sub: "No waiting" },
  ];

  return (
    <>
      <style>{styles}</style>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="hvac-page" style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        background: c.bg,
        color: c.text,
        overflowX: "hidden",
      }}>

        {/* ══ NAV ══════════════════════════════════════════════════════════ */}
        <nav style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: `1px solid ${c.border}`,
          background: c.navBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}>
          <Logo accent={c.accent} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a href="tel:+16025550198" style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: c.accent,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}>
              <PhoneIcon />
              (602) 555-0198
            </a>

            {/* Theme toggle with mounted guard */}
            {mounted ? (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  border: `1px solid ${c.border}`,
                  background: c.surface,
                  color: c.textMuted,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  fontSize: 0,
                }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            ) : (
              <div style={{ width: "36px", height: "36px" }} />
            )}

            <a href="#contact" style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "999px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              background: c.accent,
              color: c.bg,
              textDecoration: "none",
              transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: `0 0 20px ${c.glow}`,
            }}>
              Get Quote
            </a>
          </div>
        </nav>

        {/* ══ HERO ════════════════════════════════════════════════════════ */}
        <section style={{
          padding: "8rem 2rem 6rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: `radial-gradient(ellipse 80% 55% at 50% -5%, ${c.glow} 0%, transparent 65%)`,
          minHeight: "70vh",
          justifyContent: "center",
        }}>
          {/* Eyebrow pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.375rem 1.125rem",
            borderRadius: "999px",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: c.accent,
            background: c.surface,
            border: `1px solid ${c.border}`,
            marginBottom: "2rem",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: c.accent,
              display: "inline-block",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            Phoenix&apos;s Premier HVAC Specialists
          </div>

          {/* Brand name */}
          <div style={{
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: c.accent,
            marginBottom: "1.5rem",
            opacity: 0.8,
          }}>
            CoolAir HVAC
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(3rem, 9vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            color: c.heading,
            marginBottom: "2rem",
            maxWidth: "900px",
            textShadow: isDark
              ? "0 1px 0 rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.3)"
              : "none",
            filter: isDark ? `drop-shadow(0 0 30px ${c.glow})` : "none",
          }}>
            WE DON&apos;T JUST FIX AIR.
            <br />
            <span style={{ color: c.accent }}>WE FIX COMFORT.</span>
          </h1>

          {/* Subline */}
          <p style={{
            fontSize: "1.0625rem",
            color: c.textMuted,
            lineHeight: 1.7,
            maxWidth: "520px",
            marginBottom: "3rem",
          }}>
            Professional heating & cooling services for Phoenix homeowners.
            Fast, reliable, and done right the first time.
          </p>

          {/* CTA */}
          <a href="#contact" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.9375rem 2.5rem",
            borderRadius: "999px",
            fontSize: "0.9375rem",
            fontWeight: 800,
            background: c.accent,
            color: isDark ? "#09090b" : "#ffffff",
            textDecoration: "none",
            boxShadow: `0 0 32px ${c.glow}`,
            transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
            letterSpacing: "0.01em",
          }}>
            Book Service
            <ArrowIcon />
          </a>

          {/* Scroll indicator */}
          <div style={{
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: c.textMuted,
            animation: "float-up 2s ease-in-out infinite",
          }}>
            <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${c.accent}, transparent)` }} />
            <span className="mono" style={{ fontSize: "0.625rem", letterSpacing: "0.12em" }}>SCROLL</span>
          </div>
        </section>

        {/* ══ TRUST BADGES ══════════════════════════════════════════════════ */}
        <section style={{
          padding: "2.5rem 2rem",
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          background: c.surface,
        }}>
          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}>
            {trustBadges.map((badge, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.875rem",
                padding: "0.75rem",
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.accent,
                  flexShrink: 0,
                }}>
                  {badge.icon}
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: c.text, lineHeight: 1.2 }}>{badge.label}</div>
                  <div className="mono" style={{ fontSize: "0.6875rem", color: c.textMuted, marginTop: "0.125rem" }}>{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SERVICES GRID ═════════════════════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel text="What We Do" />
            <SectionTitle text="Services Built Around Your Comfort" />
            <p style={{ fontSize: "1rem", color: c.textMuted, maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
              From emergency breakdowns to scheduled maintenance — we do it all with care.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}>
            {services.map((svc, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === i ? c.cardHover : c.card,
                  border: `1px solid ${hoveredCard === i ? c.accent : c.border}`,
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  textAlign: "left",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "default",
                  transform: hoveredCard === i ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredCard === i ? `0 12px 40px ${c.glow}` : "none",
                }}
              >
                {/* Number label */}
                <div className="mono" style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: c.accent,
                  marginBottom: "1rem",
                  opacity: 0.7,
                }}>
                  {svc.num}
                </div>

                {/* Icon container */}
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "0.875rem",
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: c.accent,
                  transition: "all 0.25s",
                  ...(hoveredCard === i ? { background: c.surface, borderColor: c.accent } : {}),
                }}>
                  {svc.icon}
                </div>

                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: c.heading,
                  marginBottom: "0.625rem",
                  letterSpacing: "-0.01em",
                }}>
                  {svc.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem",
                  color: c.textMuted,
                  lineHeight: 1.65,
                }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STATS BAR ════════════════════════════════════════════════════ */}
        <section style={{
          padding: "3.5rem 2rem",
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          background: c.surface,
        }}>
          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            textAlign: "center",
          }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: c.accent,
                  lineHeight: 1,
                  marginBottom: "0.375rem",
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: c.text, marginBottom: "0.25rem" }}>
                  {stat.label}
                </div>
                <div className="mono" style={{ fontSize: "0.6875rem", color: c.textMuted }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHY US ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel text="Why CoolAir" />
            <SectionTitle text="Why Phoenix Trusts Us" />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: "1rem",
                padding: "2rem",
                textAlign: "left",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "0.875rem",
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: c.accent,
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: c.heading,
                  marginBottom: "0.5rem",
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA BANNER ═══════════════════════════════════════════════════ */}
        <section style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 70%)`,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
        }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 1rem",
              borderRadius: "999px",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: c.warm,
              background: `rgba(249,115,22,0.1)`,
              border: `1px solid rgba(249,115,22,0.25)`,
              marginBottom: "1.5rem",
            }}>
              <span style={{ fontSize: "1rem" }}>⚡</span>
              Emergency Service Available Now
            </div>
            <h2 style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: c.heading,
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}>
              Don&apos;t Wait in the Heat
            </h2>
            <p style={{ fontSize: "1rem", color: c.textMuted, marginBottom: "2rem", lineHeight: 1.65 }}>
              Your AC won&apos;t fix itself. Book now and we&apos;ll be there within the hour.
            </p>
            <a href="tel:+16025550198" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.9375rem 2.5rem",
              borderRadius: "999px",
              fontSize: "0.9375rem",
              fontWeight: 800,
              background: c.warm,
              color: "#ffffff",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(249,115,22,0.35)",
              transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
            }}>
              Call (602) 555-0198
              <ArrowIcon />
            </a>
          </div>
        </section>

        {/* ══ CONTACT FORM ══════════════════════════════════════════════════ */}
        <section id="contact" style={{ padding: "5rem 2rem" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel text="Get Your Free Quote" />
              <SectionTitle text="Request a Service Call" />
              <p style={{ fontSize: "0.9375rem", color: c.textMuted, marginTop: "0.75rem", lineHeight: 1.6 }}>
                Tell us what you need. We respond within 2 hours — guaranteed.
              </p>
            </div>

            {submitted ? (
              <div style={{
                padding: "3rem 2rem",
                background: c.surface,
                border: `1px solid ${c.accent}`,
                borderRadius: "1.25rem",
                textAlign: "center",
              }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "999px",
                  background: c.surface,
                  border: `2px solid ${c.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: c.accent,
                }}>
                  <CheckIcon />
                </div>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 800, color: c.heading, marginBottom: "0.5rem" }}>
                  Request Received!
                </h3>
                <p style={{ fontSize: "0.9375rem", color: c.textMuted, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  We&apos;ll be in touch within 2 hours. For urgent issues, call us directly at{" "}
                  <a href="tel:+16025550198" style={{ color: c.accent, textDecoration: "none", fontWeight: 600 }}>
                    (602) 555-0198
                  </a>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: "0.625rem 1.5rem",
                    borderRadius: "999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: `1px solid ${c.border}`,
                    background: c.surface,
                    color: c.text,
                    cursor: "pointer",
                  }}
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {/* Name + Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <FormField
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      c={c}
                      required
                    />
                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="(602) 555-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      c={c}
                      required
                    />
                  </div>

                  {/* Service select */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: c.textMuted,
                      marginBottom: "0.5rem",
                    }}>
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: c.inputBg,
                        border: `1px solid ${c.inputBorder}`,
                        borderRadius: "0.75rem",
                        color: c.text,
                        fontSize: "0.9375rem",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        outline: "none",
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                      }}
                    >
                      <option value="">Select a service...</option>
                      <option value="ac-repair">AC Repair</option>
                      <option value="heating">Heating / Furnace</option>
                      <option value="maintenance">Maintenance / Tune-Up</option>
                      <option value="installation">New Installation</option>
                      <option value="emergency">Emergency Repair</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: c.textMuted,
                      marginBottom: "0.5rem",
                    }}>
                      What&apos;s the issue?
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Describe the problem or what you need help with..."
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: c.inputBg,
                        border: `1px solid ${c.inputBorder}`,
                        borderRadius: "0.75rem",
                        color: c.text,
                        fontSize: "0.9375rem",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        resize: "vertical",
                        outline: "none",
                        lineHeight: 1.6,
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = c.inputBorder; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "1rem 2rem",
                      background: c.accent,
                      color: isDark ? "#09090b" : "#ffffff",
                      fontSize: "0.9375rem",
                      fontWeight: 800,
                      border: "none",
                      borderRadius: "999px",
                      cursor: "pointer",
                      boxShadow: `0 0 24px ${c.glow}`,
                      transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                      letterSpacing: "0.01em",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = `0 0 40px ${c.accent}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = `0 0 24px ${c.glow}`;
                    }}
                  >
                    Get My Free Quote →
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <footer style={{
          padding: "3rem 2rem 2rem",
          background: c.footerBg,
          borderTop: `1px solid ${c.border}`,
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2.5rem",
              marginBottom: "3rem",
            }}>
              {/* Brand column */}
              <div>
                <Logo accent={c.accent} />
                <p style={{ fontSize: "0.875rem", color: c.textMuted, marginTop: "0.875rem", lineHeight: 1.65 }}>
                  Phoenix&apos;s most trusted HVAC service since 1997. Licensed, insured, and committed to your comfort.
                </p>
              </div>

              {/* Contact column */}
              <div>
                <div className="mono" style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: c.accent,
                  marginBottom: "1rem",
                }}>
                  Contact
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a href="tel:+16025550198" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: c.text, textDecoration: "none", fontSize: "0.875rem" }}>
                    <PhoneIcon />
                    (602) 555-0198
                  </a>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: c.text, fontSize: "0.875rem" }}>
                    <LocationIcon />
                    Phoenix, AZ & Surrounding Areas
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: c.text, fontSize: "0.875rem" }}>
                    <MailIcon />
                    service@coolairhvac.com
                  </div>
                </div>
              </div>

              {/* Hours column */}
              <div>
                <div className="mono" style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: c.accent,
                  marginBottom: "1rem",
                }}>
                  Hours
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { day: "Mon–Fri", time: "7:00 AM – 8:00 PM" },
                    { day: "Saturday", time: "8:00 AM – 6:00 PM" },
                    { day: "Sunday", time: "Emergency Only" },
                    { day: "24/7", time: "Emergency Line" },
                  ].map((row) => (
                    <div key={row.day} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                      <span style={{ color: c.textMuted }}>{row.day}</span>
                      <span style={{ color: c.text }}>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              borderTop: `1px solid ${c.border}`,
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}>
              <p className="mono" style={{ fontSize: "0.6875rem", color: c.textMuted, letterSpacing: "0.06em" }}>
                © 2025 CoolAir HVAC · Phoenix, AZ · ROC #298475
              </p>
              <p style={{ fontSize: "0.75rem", color: c.textMuted }}>
                Demo site built by{" "}
                <a href="https://aexonai.com" target="_blank" rel="noopener noreferrer" style={{ color: c.accent, textDecoration: "none" }}>
                  Aexon AI
                </a>
                {" "}— not a real business.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

/* ─── Form Field Helper ───────────────────────────────────────────────────── */
function FormField({
  label, name, type, placeholder, value, onChange, c, required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  c: typeof darkTheme;
  required?: boolean;
}) {
  return (
    <div>
      <label style={{
        display: "block",
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: c.textMuted,
        marginBottom: "0.5rem",
      }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          background: c.inputBg,
          border: `1px solid ${c.inputBorder}`,
          borderRadius: "0.75rem",
          color: c.text,
          fontSize: "0.9375rem",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = c.inputBorder; e.currentTarget.style.boxShadow = "none"; }}
      />
    </div>
  );
}