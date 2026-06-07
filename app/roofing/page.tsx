"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

// ─── Color Palettes ──────────────────────────────────────────────────────────

const darkTheme = {
  bg: "#0c0a08",
  bgAlt: "#161209",
  bgSoft: "#1e1a10",
  text: "#faf5ea",
  textMuted: "#c4b99a",
  textSoft: "#8a7d62",
  accent: "#f97316",
  accentStrong: "#ea650c",
  accentSoft: "rgba(249, 115, 22, 0.14)",
  accentGlow: "rgba(249, 115, 22, 0.32)",
  border: "rgba(249, 115, 22, 0.18)",
  borderStrong: "rgba(249, 115, 22, 0.3)",
  line: "rgba(250, 245, 234, 0.07)",
  nav: "rgba(12, 10, 8, 0.82)",
  card: "rgba(18, 14, 8, 0.94)",
  cardAlt: "rgba(22, 18, 10, 0.92)",
  panel: "rgba(12, 10, 8, 0.94)",
  input: "rgba(22, 18, 10, 0.96)",
  inputBorder: "rgba(249, 115, 22, 0.2)",
  chip: "rgba(255, 255, 255, 0.04)",
  success: "#fbbf24",
  successSoft: "rgba(251, 191, 36, 0.12)",
  footer: "#080604",
  shadow: "rgba(0, 0, 0, 0.48)",
  selection: "#ea650c",
  onAccent: "#fff9ef",
  shingleCore: "#c2410c",
  shingleGlow: "rgba(249, 115, 22, 0.5)",
  shingleSheen: "rgba(254, 215, 170, 0.8)",
  ambientA: "rgba(249, 115, 22, 0.1)",
  ambientB: "rgba(234, 88, 12, 0.08)",
  ambientRgbA: "249, 115, 22",
  ambientRgbB: "234, 88, 12",
};

const lightTheme = {
  bg: "#fdf6ee",
  bgAlt: "#f5e8d5",
  bgSoft: "#fff8f0",
  text: "#1c140a",
  textMuted: "#6b4f32",
  textSoft: "#9a7a58",
  accent: "#c2410c",
  accentStrong: "#b53809",
  accentSoft: "rgba(194, 65, 12, 0.12)",
  accentGlow: "rgba(194, 65, 12, 0.24)",
  border: "rgba(194, 65, 12, 0.2)",
  borderStrong: "rgba(194, 65, 12, 0.32)",
  line: "rgba(28, 20, 10, 0.08)",
  nav: "rgba(253, 246, 238, 0.86)",
  card: "rgba(255, 252, 246, 0.96)",
  cardAlt: "rgba(253, 246, 238, 0.96)",
  panel: "rgba(255, 252, 246, 0.96)",
  input: "rgba(255, 252, 246, 0.98)",
  inputBorder: "rgba(194, 65, 12, 0.22)",
  chip: "rgba(28, 20, 10, 0.04)",
  success: "#9a3412",
  successSoft: "rgba(154, 52, 18, 0.1)",
  footer: "#f5e5d0",
  shadow: "rgba(61, 43, 13, 0.12)",
  selection: "#c2410c",
  onAccent: "#fff9ef",
  shingleCore: "#ea650c",
  shingleGlow: "rgba(249, 115, 22, 0.4)",
  shingleSheen: "rgba(254, 215, 170, 0.9)",
  ambientA: "rgba(194, 65, 12, 0.08)",
  ambientB: "rgba(234, 88, 12, 0.06)",
  ambientRgbA: "194, 65, 12",
  ambientRgbB: "234, 88, 12",
};

type ThemeColors = typeof darkTheme;

// ─── Falling Shingle Animation ───────────────────────────────────────────────

type Shingle = {
  id: number;
  x: number;
  startY: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  opacity: number;
  delay: number;
  type: "shingle" | "raindrop";
};

function useFallingAnimation(colors: ThemeColors) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const shingles: Shingle[] = [];
    const SHINGLE_COUNT = 28;
    const lastShingleTime: Record<number, number> = {};
    const SHINGLE_INTERVAL = 220;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const createShingle = (id: number): Shingle => ({
      id,
      x: Math.random() * width,
      startY: -60 - Math.random() * 80,
      y: -60,
      rotation: (Math.random() - 0.5) * 0.6,
      rotationSpeed: (Math.random() - 0.5) * 1.8,
      scale: 0.7 + Math.random() * 0.5,
      speed: 1.2 + Math.random() * 1.4,
      sway: 0,
      swaySpeed: 0.4 + Math.random() * 0.6,
      opacity: 0.55 + Math.random() * 0.35,
      delay: 0,
      type: Math.random() > 0.6 ? "raindrop" : "shingle",
    });

    const drawShingle = (s: Shingle) => {
      ctx.save();
      ctx.translate(s.x + s.sway, s.y);
      ctx.rotate(s.rotation);
      ctx.scale(s.scale, s.scale);
      ctx.globalAlpha = s.opacity;

      if (s.type === "shingle") {
        // Draw an asphalt shingle shape
        const w = 28;
        const h = 10;
        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(-w / 2 + 2, -h / 2 + 2, w, h);
        // Base
        ctx.fillStyle = colors.shingleCore;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        // Gradient sheen
        const sheen = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
        sheen.addColorStop(0, colors.shingleSheen);
        sheen.addColorStop(0.5, "transparent");
        sheen.addColorStop(1, "rgba(0,0,0,0.3)");
        ctx.fillStyle = sheen;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        // Edge lines
        ctx.strokeStyle = "rgba(0,0,0,0.4)";
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-w / 2, -h / 2, w, h);
        // Texture dots
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        for (let i = 0; i < 4; i++) {
          const dx = -w / 2 + 4 + i * 7;
          const dy = -h / 2 + 3;
          ctx.beginPath();
          ctx.arc(dx, dy, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Raindrop
        const dropLen = 16 * s.scale;
        const gradient = ctx.createLinearGradient(0, -dropLen, 0, 0);
        gradient.addColorStop(0, colors.accentGlow);
        gradient.addColorStop(1, colors.accent);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, -dropLen);
        ctx.bezierCurveTo(3, -dropLen * 0.6, 3, 0, 0, 0);
        ctx.bezierCurveTo(-3, 0, -3, -dropLen * 0.6, 0, -dropLen);
        ctx.fill();
      }

      ctx.restore();
    };

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, width, height);

      // Ambient glow
      const pulse = 0.5 + Math.sin(elapsed / 1200) * 0.15;
      const ambient = ctx.createRadialGradient(
        width * 0.7, height * 0.12, 0,
        width * 0.7, height * 0.12, width * 0.5
      );
      ambient.addColorStop(0, `rgba(${colors.ambientRgbA}, ${0.18 * pulse})`);
      ambient.addColorStop(0.6, `rgba(${colors.ambientRgbB}, ${0.1 * pulse})`);
      ambient.addColorStop(1, "transparent");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      // Spawn shingles
      const nowMs = Math.floor(now);
      for (let i = 0; i < SHINGLE_COUNT; i++) {
        if (!lastShingleTime[i] || nowMs - lastShingleTime[i] > SHINGLE_INTERVAL + Math.random() * 300) {
          if (!shingles.find(s => s.id === i)) {
            shingles.push(createShingle(i));
            lastShingleTime[i] = nowMs;
          }
        }
      }

      // Update and draw
      for (let i = shingles.length - 1; i >= 0; i--) {
        const s = shingles[i];
        s.y += s.speed;
        s.sway = Math.sin(elapsed / 1000 * s.swaySpeed) * 20;
        s.rotation += s.rotationSpeed * 0.008;
        s.opacity = Math.max(0, s.opacity - 0.0008);

        if (s.y > height + 60 || s.opacity <= 0) {
          shingles.splice(i, 1);
          delete lastShingleTime[s.id];
        } else {
          drawShingle(s);
        }
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return canvasRef;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function RoofIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 21h18M4 21V10l8-7 8 7v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M4 10h16" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M12 21s7-3.6 7-9.2V5.6L12 3 5 5.6v6.2C5 17.4 12 21 12 21Z" />
      <path d="m9.2 12.1 1.8 1.8 3.8-4" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function LayerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L4 12.5" />
      <path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L4 17.5" />
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25a2.8 2.8 0 0 0-4-.4 2.8 2.8 0 0 1-4-.4L9.4 7.4a2.8 2.8 0 0 1 0-4l1.25-1.25" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M7 3v4M17 3v4M3.5 9.5h17" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M21 16.7v2.9a1.9 1.9 0 0 1-2.1 1.9A18.8 18.8 0 0 1 10.7 19 18.3 18.3 0 0 1 5 13.3a18.8 18.8 0 0 1-2.5-8.1A1.9 1.9 0 0 1 4.4 3h2.9a1.9 1.9 0 0 1 1.9 1.6c.1.9.3 1.7.7 2.5a1.9 1.9 0 0 1-.4 2L8.2 10.4a15.3 15.3 0 0 0 5.4 5.4l1.3-1.3a1.9 1.9 0 0 1 2-.4c.8.4 1.6.6 2.5.7a1.9 1.9 0 0 1 1.6 1.9Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.5 1.5M17.8 17.8l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.5-1.5M17.8 6.2l1.5-1.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20.2 14.2A7.8 7.8 0 1 1 9.8 3.8a8.6 8.6 0 1 0 10.4 10.4Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    number: "01",
    title: "Roof Replacement",
    description: "Full tear-off and re-roofing with architectural shingles, underlayment, flashing, and ventilation for a lasting system.",
    icon: <RoofIcon />,
    note: "Permit + disposal included",
  },
  {
    number: "02",
    title: "Roof Repair",
    description: "Leak detection, flashing correction, shingle replacement, and storm damage triage before water intrusion spreads.",
    icon: <HammerIcon />,
    note: "Emergency same-day response",
  },
  {
    number: "03",
    title: "Storm Damage",
    description: "Hail and wind impact assessment with drone imagery, insurance documentation, and direct insurer coordination.",
    icon: <WindIcon />,
    note: "Claim assistance available",
  },
  {
    number: "04",
    title: "Roof Inspection",
    description: "Thorough 27-point inspection with written report, photography, and honest scope-of-work for planning or sale.",
    icon: <ShieldIcon />,
    note: "No-obligation quote",
  },
];

const warrantyOptions = [
  { years: "10", label: "Workmanship Guarantee", desc: "We stand behind every installation" },
  { years: "25", label: "Manufacturer Warranty", desc: "Full material defect coverage" },
  { years: "50", label: "Extended Protection", desc: "Optional premium coverage plans" },
];

const processSteps = [
  { step: "01", title: "Free Inspection", desc: "We assess your roof in person or via drone and provide a detailed written estimate within 24 hours." },
  { step: "02", title: "Insurance Coordination", desc: "We work directly with your insurer, handling Xactimate scoping and supplemental claims so you don't have to." },
  { step: "03", title: "Professional Install", desc: "Licensed crews arrive on schedule, with a dedicated project manager tracking every detail from tear-off to final walkthrough." },
  { step: "04", title: "Final Inspection", desc: "We conduct a multi-point post-install inspection, confirm ventilation and flashing, and hand over your warranty documentation." },
];

const stats = [
  { value: "500+", label: "Roofs Completed" },
  { value: "25-yr", label: "Average shingle warranty" },
  { value: "100%", label: "Claim success assist" },
  { value: "24hr", label: "Post-storm response" },
];

const testimonials = [
  {
    quote: "After the hailstorm took out half our roof, TopTier had a crew here within 48 hours and handled the entire insurance claim. We didn't pay a dime out of pocket.",
    author: "Michelle T.",
    location: "Auburn Hills, MI",
    service: "Full Replacement + Claim Assist",
  },
  {
    quote: "I've worked with a lot of contractors. TopTier is the only one who sent a formal inspection report with photos before quoting. Transparency like that is rare.",
    author: "Robert K.",
    location: "Troy, MI",
    service: "Roof Inspection",
  },
  {
    quote: "The crew cleaned up every nail and shingle fragment. You couldn't tell they were here except the roof looked brand new.",
    author: "Sandra L.",
    location: "Rochester Hills, MI",
    service: "Full Replacement",
  },
];

const faqs = [
  {
    q: "How do I know if I need a full replacement or just repairs?",
    a: "If your roof is over 20 years old, has widespread curling or missing shingles, or has sustained significant storm damage, a replacement is typically more cost-effective long-term. We provide a free inspection with honest recommendations — no upselling.",
  },
  {
    q: "Will you work with my insurance company?",
    a: "Yes. We have a dedicated claims specialist who coordinates directly with your insurer, ensures all damage is documented in Xactimate, and can assist with supplemental claims to maximize your coverage.",
  },
  {
    q: "How long does a roof replacement take?",
    a: "Most residential re-roofs are completed in 1–2 days. We monitor weather closely and will only proceed when conditions are safe for proper installation.",
  },
  {
    q: "What type of shingles do you recommend?",
    a: "We primarily install architectural dimensional shingles (Class 4 impact-rated where applicable) from trusted manufacturers like GAF and Owens Corning. We'll help you select the right weight, color, and profile for your home.",
  },
  {
    q: "What does your warranty cover?",
    a: "All installations carry a 10-year workmanship warranty. Manufacturer warranties (typically 25–50 years) cover material defects. We walk you through the full coverage details before signing.",
  },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  urgency: string;
  notes: string;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  urgency: "",
  notes: "",
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function RoofingPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const canvasRef = useFallingAnimation(darkTheme);
  const formRef = useRef<HTMLFormElement>(null);

  const colors = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData(initialFormState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const accentBtnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.6rem",
    background: colors.accent,
    color: colors.onAccent,
    border: "none",
    borderRadius: "6px",
    fontFamily: dmSans.style.fontFamily,
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "all 0.2s ease",
    boxShadow: `0 0 20px ${colors.accentGlow}`,
  };

  const outlineBtnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.6rem",
    background: "transparent",
    color: colors.accent,
    border: `1.5px solid ${colors.borderStrong}`,
    borderRadius: "6px",
    fontFamily: dmSans.style.fontFamily,
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "all 0.2s ease",
  };

  const sectionLabel: CSSProperties = {
    fontFamily: jetbrainsMono.style.fontFamily,
    fontSize: "0.72rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: colors.accent,
    marginBottom: "0.75rem",
  };

  const headingStyle: CSSProperties = {
    fontFamily: bebasNeue.style.fontFamily,
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    lineHeight: 1.05,
    letterSpacing: "0.02em",
    color: colors.text,
    marginBottom: "1rem",
  };

  const cardStyle: CSSProperties = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.75rem",
    transition: "all 0.25s ease",
  };

  if (!mounted) {
    return (
      <div style={{ background: colors.bg, minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ color: colors.textMuted, fontFamily: dmSans.style.fontFamily }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ background: colors.bg, color: colors.text, fontFamily: dmSans.style.fontFamily, minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${colors.selection}; color: ${colors.onAccent}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${colors.borderStrong}; border-radius: 3px; }
        .faq-answer { overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; }
        .faq-item.open .faq-answer { max-height: 400px; opacity: 1; }
        .faq-item:not(.open) .faq-answer { max-height: 0; opacity: 0; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); }
        .faq-chevron { transition: transform 0.25s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      {/* Canvas Background */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* ─── NAVIGATION ─────────────────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: colors.nav, backdropFilter: "blur(16px)", borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{ width: "2.8rem", height: "2.8rem", borderRadius: "8px", background: colors.accent, display: "grid", placeItems: "center", boxShadow: `0 0 18px ${colors.accentGlow}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M4 21V10l8-7 8 7v11" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "1rem", letterSpacing: "0.1em", color: colors.text, lineHeight: 1 }}>TopTier Roofing</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: colors.textSoft, textTransform: "uppercase", marginTop: "2px" }}>Michigan&apos;s Choice</div>
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {["Services", "Process", "Testimonials", "FAQ", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: colors.textMuted, textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s", letterSpacing: "0.03em" }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.textMuted)}>
                {link}
              </a>
            ))}
          </div>

          {/* CTA + Theme */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{ background: colors.chip, border: `1px solid ${colors.border}`, borderRadius: "8px", width: "36px", height: "36px", display: "grid", placeItems: "center", cursor: "pointer", color: colors.textMuted, transition: "all 0.2s" }}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#contact" style={{ ...accentBtnStyle, padding: "0.6rem 1.2rem", fontSize: "0.84rem", textDecoration: "none" }}>Free Inspection</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: "140px", paddingBottom: "100px", textAlign: "center", background: `radial-gradient(ellipse at 50% 0%, ${colors.ambientA} 0%, transparent 60%)` }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
            <div style={{ ...sectionLabel, marginBottom: "1.25rem" }}>Licensed • Insured • Michigan Owned</div>
            <h1 style={{ ...headingStyle, fontSize: "clamp(2.8rem, 6vw, 4.8rem)", marginBottom: "1.5rem" }}>
              Protect Your Home<br />
              <span style={{ color: colors.accent }}>From the Top Down</span>
            </h1>
            <p style={{ color: colors.textMuted, fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 2.5rem" }}>
              Professional roofing, siding, and exterior restoration for Michigan homeowners. Free inspections, transparent estimates, and craftsmanship backed by a 10-year warranty.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contact" style={{ ...accentBtnStyle, textDecoration: "none" }}>
                Schedule Free Inspection <ArrowIcon />
              </a>
              <a href="#services" style={{ ...outlineBtnStyle, textDecoration: "none" }}>
                View Services
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="animate-fade-up" style={{ animationDelay: "120ms", marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: colors.border, borderRadius: "12px", overflow: "hidden", border: `1px solid ${colors.border}` }}>
            {stats.map(stat => (
              <div key={stat.label} style={{ background: colors.card, padding: "1.25rem 1rem", textAlign: "center" }}>
                <div style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "1.8rem", color: colors.accent, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "0.75rem", color: colors.textSoft, marginTop: "4px", letterSpacing: "0.05em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" style={{ position: "relative", zIndex: 1, padding: "80px 0", background: colors.bgAlt }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={sectionLabel}>What We Do</div>
            <h2 style={headingStyle}>Roofing Services</h2>
            <p style={{ color: colors.textMuted, maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>From emergency repairs to complete replacements, we deliver professional results Michigan homeowners trust.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {services.map((s, i) => (
              <div key={s.number} style={{ ...cardStyle, cursor: "default" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = colors.borderStrong;
                  el.style.boxShadow = `0 8px 32px ${colors.shadow}, 0 0 0 1px ${colors.border}`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = colors.border;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}>
                <div style={{ color: colors.accent, marginBottom: "1rem" }}>{s.icon}</div>
                <div style={{ fontFamily: jetbrainsMono.style.fontFamily, fontSize: "0.7rem", color: colors.textSoft, letterSpacing: "0.15em", marginBottom: "0.5rem" }}>{s.number}</div>
                <h3 style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "1.4rem", letterSpacing: "0.04em", color: colors.text, marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ color: colors.textMuted, fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>{s.description}</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.75rem", background: colors.accentSoft, border: `1px solid ${colors.border}`, borderRadius: "20px", fontSize: "0.75rem", color: colors.accent, fontWeight: 500 }}>
                  <CheckIcon /> {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ───────────────────────────────────────────────────────── */}
      <section id="process" style={{ position: "relative", zIndex: 1, padding: "80px 0", background: colors.bg }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={sectionLabel}>How It Works</div>
            <h2 style={headingStyle}>Our Process</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0" }}>
            {processSteps.map((step, i) => (
              <div key={step.step} style={{ padding: "2rem", position: "relative", borderLeft: i > 0 ? `1px solid ${colors.border}` : "none" }}>
                <div style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "3rem", color: colors.accent, opacity: 0.35, lineHeight: 1, marginBottom: "0.5rem" }}>{step.step}</div>
                <h3 style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "1.2rem", letterSpacing: "0.05em", color: colors.text, marginBottom: "0.6rem" }}>{step.title}</h3>
                <p style={{ color: colors.textMuted, fontSize: "0.88rem", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WARRANTY BANNER ───────────────────────────────────────────────── */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 0", background: colors.bgAlt, borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
          <div>
            <div style={sectionLabel}>Peace of Mind</div>
            <h2 style={{ ...headingStyle, marginBottom: 0, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Warranty Protection You Can Count On</h2>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {warrantyOptions.map(w => (
              <div key={w.years} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "2.2rem", color: colors.accent, lineHeight: 1 }}>{w.years}</div>
                <div style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>Years</div>
                <div style={{ fontSize: "0.85rem", color: colors.textMuted, marginTop: "4px" }}>{w.label}</div>
                <div style={{ fontSize: "0.75rem", color: colors.textSoft, marginTop: "2px" }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section id="testimonials" style={{ position: "relative", zIndex: 1, padding: "80px 0", background: colors.bg }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={sectionLabel}>Homeowner Stories</div>
            <h2 style={headingStyle}>What Our Clients Say</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ ...cardStyle, position: "relative" }}>
                <div style={{ color: colors.accent, fontSize: "1.5rem", lineHeight: 1, marginBottom: "1rem" }}>&ldquo;</div>
                <p style={{ color: colors.textMuted, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: "1rem" }}>
                  <div style={{ fontWeight: 600, color: colors.text, fontSize: "0.9rem" }}>{t.author}</div>
                  <div style={{ fontSize: "0.78rem", color: colors.textSoft, marginTop: "2px" }}>{t.location} · {t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ position: "relative", zIndex: 1, padding: "80px 0", background: colors.bgAlt }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={sectionLabel}>Common Questions</div>
            <h2 style={headingStyle}>FAQ</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "10px", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
                  <span style={{ fontFamily: dmSans.style.fontFamily, fontWeight: 600, fontSize: "0.95rem", color: colors.text }}>{faq.q}</span>
                  <svg className="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <div style={{ padding: "0 1.5rem 1.25rem", color: colors.textMuted, fontSize: "0.9rem", lineHeight: 1.7 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM ──────────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "80px 0", background: colors.bg }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            {/* Left */}
            <div>
              <div style={sectionLabel}>Get Started</div>
              <h2 style={headingStyle}>Schedule Your<br /><span style={{ color: colors.accent }}>Free Inspection</span></h2>
              <p style={{ color: colors.textMuted, lineHeight: 1.7, marginBottom: "2rem" }}>Fill out the form and a TopTier specialist will reach out within 2 hours to confirm your appointment or request more details.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: <PhoneIcon />, label: "Call or Text", value: "(248) 555-ROOF" },
                  { icon: <CalendarIcon />, label: "Available", value: "Mon–Sat, 7 AM – 7 PM" },
                  { icon: <ShieldIcon />, label: "Coverage", value: "Macomb, Oakland, Wayne & Genesee" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: colors.accentSoft, border: `1px solid ${colors.border}`, display: "grid", placeItems: "center", color: colors.accent, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: "0.92rem", color: colors.text, fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "16px", padding: "2rem" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: colors.successSoft, border: `1px solid ${colors.success}40`, display: "grid", placeItems: "center", margin: "0 auto 1.25rem", color: colors.accent }}>
                    <CheckIcon />
                  </div>
                  <h3 style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "1.5rem", color: colors.text, marginBottom: "0.75rem" }}>Request Received!</h3>
                  <p style={{ color: colors.textMuted, fontSize: "0.9rem", lineHeight: 1.65 }}>A TopTier specialist will contact you within 2 hours to confirm your inspection appointment.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Full Name *</label>
                      <input required name="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Phone *</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="(248) 555-0100" style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" type="email" style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily }} />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Service Needed *</label>
                    <select required name="service" value={formData.service} onChange={handleChange} style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily }}>
                      <option value="" style={{ background: colors.bg }}>Select a service</option>
                      <option value="replacement" style={{ background: colors.bg }}>Roof Replacement</option>
                      <option value="repair" style={{ background: colors.bg }}>Roof Repair</option>
                      <option value="storm" style={{ background: colors.bg }}>Storm Damage</option>
                      <option value="inspection" style={{ background: colors.bg }}>Roof Inspection</option>
                      <option value="siding" style={{ background: colors.bg }}>Siding / Gutters</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Urgency</label>
                    <select name="urgency" value={formData.urgency} onChange={handleChange} style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily }}>
                      <option value="" style={{ background: colors.bg }}>Select urgency</option>
                      <option value="routine" style={{ background: colors.bg }}>Routine — within 2 weeks</option>
                      <option value="soon" style={{ background: colors.bg }}>Soon — within 3–5 days</option>
                      <option value="urgent" style={{ background: colors.bg }}>Urgent — active leak</option>
                      <option value="emergency" style={{ background: colors.bg }}>Emergency — storm damage</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Property Address *</label>
                    <input required name="address" value={formData.address} onChange={handleChange} placeholder="123 Oak St, Troy, MI 48083" style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily }} />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.78rem", color: colors.textSoft, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Additional Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Describe any damage, leak locations, or specific concerns..." rows={3} style={{ width: "100%", padding: "0.65rem 0.9rem", background: colors.input, border: `1px solid ${colors.inputBorder}`, borderRadius: "8px", color: colors.text, fontSize: "0.9rem", outline: "none", transition: "border 0.2s", fontFamily: dmSans.style.fontFamily, resize: "vertical" }} />
                  </div>

                  <button type="submit" style={{ ...accentBtnStyle, width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                    Request Free Inspection <ArrowIcon />
                  </button>

                  <p style={{ fontSize: "0.72rem", color: colors.textSoft, textAlign: "center", lineHeight: 1.5 }}>No obligation. No spam. We respond within 2 hours during business hours.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ background: colors.footer, borderTop: `1px solid ${colors.border}`, padding: "48px 0 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "2.4rem", height: "2.4rem", borderRadius: "6px", background: colors.accent, display: "grid", placeItems: "center" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M4 21V10l8-7 8 7v11M9 21v-6h6v6" />
                  </svg>
                </div>
                <span style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "0.95rem", letterSpacing: "0.08em", color: colors.text }}>TopTier Roofing</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: colors.textSoft, lineHeight: 1.65, maxWidth: "280px" }}>Michigan&apos;s trusted residential roofing contractor. Licensed, insured, and committed to quality craftsmanship on every project.</p>
            </div>

            {[
              { title: "Services", links: ["Roof Replacement", "Roof Repair", "Storm Damage", "Roof Inspection", "Siding & Gutters"] },
              { title: "Company", links: ["About Us", "Our Process", "Warranty", "Service Areas", "Careers"] },
              { title: "Contact", links: ["(248) 555-ROOF", "info@toptiermi.com", "Troy, MI 48083", "Mon–Sat 7AM–7PM"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: bebasNeue.style.fontFamily, fontSize: "0.9rem", letterSpacing: "0.1em", color: colors.text, marginBottom: "1rem" }}>{col.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {col.links.map(link => (
                    <span key={link} style={{ fontSize: "0.83rem", color: colors.textSoft, cursor: "default" }}>{link}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.78rem", color: colors.textSoft }}>© 2026 TopTier Roofing LLC. All rights reserved.</span>
            <span style={{ fontSize: "0.78rem", color: colors.textSoft }}>Serving Macomb, Oakland, Wayne & Genesee Counties</span>
          </div>
        </div>
      </footer>
    </div>
  );
}