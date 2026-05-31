"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Hallmark / Electrical
   Display: Bebas Neue  |  Mono label: JetBrains Mono  |  Body: Inter 400
   ═══════════════════════════════════════════════════════════════════ */

const darkTheme = {
  bg: "#050507",
  text: "#f5f5f7",
  textMuted: "#a1a1aa",
  accent: "#fbbf24",
  accentDim: "rgba(251,191,36,0.4)",
  warm: "#f97316",
  surface: "rgba(255,255,255,0.02)",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(251,191,36,0.15)",
  glow: "rgba(251,191,36,0.2)",
  navBg: "rgba(5,5,7,0.92)",
  inputBg: "rgba(255,255,255,0.04)",
  footerBg: "#030305",
  cardHover: "rgba(251,191,36,0.05)",
  shadow: "rgba(0,0,0,0.6)",
  canvasDark: "rgba(251,191,36,0.9)",
  canvasLight: "rgba(251,191,36,0.5)",
};

const lightTheme = {
  bg: "#FFFBEB",
  text: "#1c1917",
  textMuted: "#78716c",
  accent: "#d97706",
  accentDim: "rgba(217,119,6,0.4)",
  warm: "#ea580c",
  surface: "rgba(0,0,0,0.03)",
  card: "rgba(255,255,255,0.95)",
  border: "rgba(217,119,6,0.2)",
  glow: "rgba(217,119,6,0.15)",
  navBg: "rgba(255,251,235,0.94)",
  inputBg: "rgba(255,255,255,0.85)",
  footerBg: "#FEF3C7",
  cardHover: "rgba(217,119,6,0.05)",
  shadow: "rgba(0,0,0,0.08)",
  canvasDark: "rgba(217,119,6,0.7)",
  canvasLight: "rgba(217,119,6,0.35)",
};

/* ═══════════════════════════════════════════════════════════════════
   CANVAS — Lightning bolts + ambient charge lines
   ═══════════════════════════════════════════════════════════════════ */

interface Bolt {
  x: number;
  y: number;
  length: number;
  opacity: number;
  speed: number;
  active: boolean;
  flashTimer: number;
  points: { x: number; y: number }[];
}

interface ChargeLine {
  x: number;
  y: number;
  width: number;
  opacity: number;
  speed: number;
}

function useLightningCanvas(isDark: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const boltsRef = useRef<Bolt[]>([]);
  const linesRef = useRef<ChargeLine[]>([]);
  const timeRef = useRef<number>(0);

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

    // Init 5 lightning bolts
    const positions = [0.12, 0.28, 0.45, 0.62, 0.8];
    boltsRef.current = positions.map((xRatio, i) => {
      const startX = window.innerWidth * xRatio;
      const startY = -100;
      return {
        x: startX,
        y: startY,
        length: 0,
        opacity: 0,
        speed: 60 + i * 10,
        active: false,
        flashTimer: 0,
        points: generateBoltPoints(startX, startY),
      };
    });

    // Init ambient charge lines
    linesRef.current = Array.from({ length: 6 }, (_, i) => ({
      x: -200 - i * 60,
      y: window.innerHeight * (0.15 + i * 0.14),
      width: 180 + Math.random() * 120,
      opacity: 0,
      speed: 4 + Math.random() * 3,
    }));

    const generateBoltPoints = (startX: number, startY: number): { x: number; y: number }[] => {
      const pts: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let cx = startX;
      let cy = startY;
      const steps = 8;
      for (let i = 0; i < steps; i++) {
        const delta = 18 + Math.random() * 30;
        const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.6;
        cx += Math.cos(angle) * delta;
        cy += Math.sin(angle) * delta * 0.7;
        pts.push({ x: cx, y: cy });
      }
      return pts;
    };

    const drawBolt = (bolt: Bolt) => {
      if (bolt.opacity <= 0 || bolt.points.length < 2) return;

      const accentDark = isDark ? "251,191,36" : "217,119,6";
      const accentLight = isDark ? "249,115,22" : "ea580c";

      // Outer glow
      ctx.save();
      ctx.globalAlpha = bolt.opacity * 0.4;
      ctx.strokeStyle = `rgba(${accentLight},1)`;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgba(${accentDark},0.8)`;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
      for (let i = 1; i < bolt.points.length; i++) {
        ctx.lineTo(bolt.points[i].x, bolt.points[i].y);
      }
      ctx.stroke();
      ctx.restore();

      // Core bolt
      ctx.save();
      ctx.globalAlpha = bolt.opacity;
      ctx.strokeStyle = isDark ? "#fbbf24" : "#d97706";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(251,191,36,0.9)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
      for (let i = 1; i < bolt.points.length; i++) {
        ctx.lineTo(bolt.points[i].x, bolt.points[i].y);
      }
      ctx.stroke();
      ctx.restore();

      // Bright tip flash
      if (bolt.flashTimer > 0) {
        ctx.save();
        ctx.globalAlpha = bolt.flashTimer * 0.8;
        ctx.fillStyle = isDark ? "#fef08a" : "#fef9c3";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(bolt.points[bolt.points.length - 1].x, bolt.points[bolt.points.length - 1].y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const accentDark = isDark ? "251,191,36" : "217,119,6";
      const accentLight = isDark ? "249,115,22" : "ea580c";

      timeRef.current += 1;

      // Draw ambient charge lines
      linesRef.current.forEach((line) => {
        line.x += line.speed;
        if (line.x > canvas.width + 50) {
          line.x = -line.width - Math.random() * 100;
          line.y = Math.random() * canvas.height;
          line.width = 150 + Math.random() * 150;
        }

        // Fade in/out
        const fadeIn = Math.min(1, (line.x + line.width) / 100);
        const fadeOut = Math.max(0, (canvas.width - line.x) / 100);
        line.opacity = Math.min(fadeIn, fadeOut) * 0.6;

        if (line.opacity > 0.01) {
          const grad = ctx.createLinearGradient(line.x, 0, line.x + line.width, 0);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.3, `rgba(${accentDark},${line.opacity})`);
          grad.addColorStop(0.7, `rgba(${accentDark},${line.opacity})`);
          grad.addColorStop(1, "transparent");

          ctx.save();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = `rgba(${accentDark},0.8)`;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + line.width, line.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Lightning bolts
      boltsRef.current.forEach((bolt, i) => {
        if (!bolt.active) {
          // Trigger flash at staggered intervals
          const triggerTime = 150 + i * 35;
          if (timeRef.current % triggerTime === 0 || bolt.y < -50) {
            bolt.active = true;
            bolt.y = -100;
            bolt.opacity = 0;
            bolt.flashTimer = 0;
            const startX = window.innerWidth * (0.12 + i * 0.17);
            bolt.points = generateBoltPoints(startX, -100);
          }
        }

        if (bolt.active) {
          bolt.y += bolt.speed;
          const fallProgress = Math.min(1, (bolt.y + 100) / (canvas.height * 0.6));
          bolt.opacity = fallProgress < 0.2
            ? fallProgress / 0.2 * (isDark ? 0.8 : 0.5)
            : fallProgress > 0.85
            ? (1 - (fallProgress - 0.85) / 0.15) * (isDark ? 0.8 : 0.5)
            : (isDark ? 0.8 : 0.5);

          bolt.flashTimer = bolt.flashTimer > 0 ? bolt.flashTimer - 0.06 : 0;
          if (fallProgress > 0.15 && fallProgress < 0.25) {
            bolt.flashTimer = 1;
          }

          // Update bolt points to follow the falling head
          if (bolt.points.length > 1) {
            bolt.points[0].y = bolt.y;
          }

          if (bolt.y > canvas.height + 200) {
            bolt.active = false;
            bolt.y = -200;
          }

          drawBolt(bolt);
        }
      });

      // Ambient glow pulse
      const glowPulse = 0.5 + Math.sin(timeRef.current * 0.02) * 0.3;
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.2, 0,
        canvas.width / 2, canvas.height * 0.2, canvas.width * 0.5
      );
      grad.addColorStop(0, `rgba(${accentDark},${0.06 * glowPulse})`);
      grad.addColorStop(0.5, `rgba(${accentLight},${0.03 * glowPulse})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      boltsRef.current.forEach((_, i) => {
        const startX = window.innerWidth * (0.12 + i * 0.17);
        boltsRef.current[i].points = generateBoltPoints(startX, -100);
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return canvasRef;
}

/* ═══════════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════════ */

const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const PanelIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2"/>
    <line x1="6" y1="7" x2="6" y2="7.01"/>
    <line x1="10" y1="7" x2="10" y2="7.01"/>
    <line x1="14" y1="7" x2="14" y2="7.01"/>
    <line x1="18" y1="7" x2="18" y2="7.01"/>
    <line x1="6" y1="11" x2="6" y2="11.01"/>
    <line x1="10" y1="11" x2="10" y2="11.01"/>
    <line x1="14" y1="11" x2="14" y2="11.01"/>
    <line x1="18" y1="11" x2="18" y2="11.01"/>
    <line x1="6" y1="15" x2="18" y2="15"/>
  </svg>
);
const WireIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="10" y1="9" x2="14" y2="15"/>
    <line x1="14" y1="9" x2="10" y2="15"/>
  </svg>
);
const LightIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    <circle cx="12" cy="12" r="5"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function ElectricalPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    service: "", property: "", urgency: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useLightningCanvas(isDark);

  useEffect(() => {
    const stored = localStorage.getItem("electrical-theme");
    if (stored) setIsDark(stored === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("electrical-theme", next ? "dark" : "light");
  };

  const c = isDark ? darkTheme : lightTheme;

  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: ${c.bg}; }
    .electric-page * { font-family: var(--font-inter), system-ui, sans-serif; }
    .bebas { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; }
    .mono { font-family: var(--font-jetbrains), 'JetBrains Mono', monospace; }
    ::selection { background: ${c.accent}; color: ${isDark ? "#050507" : "white"}; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${c.bg}; }
    ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: ${c.accent}; }
    html { scroll-behavior: smooth; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes blinkDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }
    @keyframes amberPulse {
      0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
      50%       { opacity: 1;   transform: translateX(-50%) scale(1.05); }
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
    .animate-blink   { animation: blinkDot 1.8s ease-in-out infinite; }
    .animate-slide-down { animation: slideDown 0.4s ease forwards; }
  `;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const services = [
    { num: "01", icon: <PanelIcon />, title: "ELECTRICAL PANELS", desc: "Outdated panels and maxed-out breakers — we replace and upgrade to handle modern loads safely.", tag: "Permits Handled" },
    { num: "02", icon: <WireIcon />, title: "WIRING & REWIRING", desc: "Knob-and-tube? Aluminum wiring? Bring your home up to code with full rewire or partial updates.", tag: "Code Compliant" },
    { num: "03", icon: <LightIcon />, title: "LIGHTING INSTALL", desc: "LED conversions, recessed lighting, chandeliers, landscape lights — indoor and outdoor installations.", tag: "Energy Efficient" },
    { num: "04", icon: <AlertIcon />, title: "EMERGENCY REPAIR", desc: "Power outages, sparks, burning smell, tripped breakers — we respond fast to restore your power.", tag: "Same-Day" },
  ];

  const stats = [
    { value: "18+", label: "Years", sub: "In Business" },
    { value: "12K+", label: "Jobs", sub: "Completed" },
    { value: "4.9★", label: "Google", sub: "Rating" },
    { value: "<1hr", label: "Response", sub: "Avg. Arrival" },
  ];

  const whyUs = [
    { icon: <ShieldCheckIcon />, title: "Licensed & Insured", desc: "TX Lic. #45821. Every job backed by our workmanship guarantee — no exceptions." },
    { icon: <ClockIcon />, title: "Same-Day Service", desc: "Call by noon, we arrive today. Flexible scheduling for all non-emergency work." },
    { icon: <ZapIcon />, title: "Transparent Pricing", desc: "We quote before we touch your home. No surprise bills — ever." },
  ];

  const trustBadges = [
    { label: "Licensed Electrician", sub: "TX #45821" },
    { label: "Bonded & Insured", sub: "Full Coverage" },
    { label: "24/7 Emergency", sub: "Always On" },
    { label: "Same-Day Service", sub: "No Waiting" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ══ CANVAS ANIMATION ══════════════════════════════════════ */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          zIndex: 0, pointerEvents: "none",
        }}
      />

      {/* ══ THEME TOGGLE — top right floating ════════════════════ */}
      {mounted && (
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            position: "fixed", top: "18px", right: "18px", zIndex: 200,
            width: "46px", height: "46px", borderRadius: "50%",
            border: `1.5px solid ${c.border}`,
            background: c.card, backdropFilter: "blur(16px)",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 16px ${c.shadow}`,
            transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            color: c.textMuted,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "scale(1.1)";
            el.style.borderColor = c.accent;
            el.style.color = c.accent;
            el.style.boxShadow = `0 4px 20px ${c.shadow}, 0 0 14px ${c.glow}`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "scale(1)";
            el.style.borderColor = c.border;
            el.style.color = c.textMuted;
            el.style.boxShadow = `0 4px 16px ${c.shadow}`;
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      )}

      {/* ══ PAGE ════════════════════════════════════════════════════ */}
      <div className="electric-page" style={{
        position: "relative", zIndex: 10,
        minHeight: "100vh", background: c.bg, color: c.text,
        overflowX: "hidden",
      }}>

        {/* ── NAV ──────────────────────────────────────────────── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: `1px solid ${c.border}`,
          background: c.navBg, backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{ fontSize: "1.4rem", color: c.accent }}>⚡</span>
            <span className="bebas" style={{
              fontSize: "1.125rem", letterSpacing: "0.12em", color: c.text,
            }}>CURRENT ELECTRIC</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="tel:+15125550231" style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.8125rem", fontWeight: 600,
              color: c.accent, textDecoration: "none",
              display: "flex", alignItems: "center", gap: "0.4rem",
              letterSpacing: "0.04em",
            }}>
              <span className="animate-blink" style={{
                display: "inline-block", width: "7px", height: "7px",
                borderRadius: "50%", background: c.warm,
                boxShadow: `0 0 6px ${c.warm}`,
              }} />
              Emergency: (512) 555-0231
            </a>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section style={{
          padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: "960px", margin: "0 auto",
          textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2rem" }}>
            {["LICENSED & INSURED", "AUSTIN TX", "FREE ESTIMATES"].map((tag, i) => (
              <span key={i} className="mono" style={{
                fontSize: "0.6875rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: c.accent,
                background: c.surface, border: `1px solid ${c.border}`,
                padding: "0.25rem 0.75rem", borderRadius: "2px",
              }}>{tag}</span>
            ))}
          </div>

          {/* Headline */}
          <h1 className="bebas" style={{
            fontSize: "clamp(5rem, 16vw, 13rem)",
            lineHeight: 0.88, letterSpacing: "0.02em",
            marginBottom: "1.75rem",
          }}>
            <span style={{ color: c.text }}>POWER</span>
            <br />
            <span style={{ color: c.accent, textShadow: `0 0 40px ${c.glow}, 0 0 80px rgba(251,191,36,0.3)` }}>ON.</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", color: c.textMuted, maxWidth: "480px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Panel upgrades. EV chargers. New construction wiring.<br />
            Commercial and residential — done to code, on time.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 2.25rem",
              background: c.accent, color: isDark ? "#050507" : "white",
              fontWeight: 700, fontSize: "0.9375rem",
              textDecoration: "none", borderRadius: "4px",
              boxShadow: `0 0 24px ${c.glow}`,
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = `0 0 32px ${c.glow}`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.boxShadow = `0 0 24px ${c.glow}`; }}
            >
              <BoltIcon /> Get a Free Quote
            </a>
            <a href="tel:+15125550231" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 2rem",
              border: `1.5px solid ${c.border}`, color: c.text,
              fontWeight: 600, fontSize: "0.9375rem",
              textDecoration: "none", borderRadius: "4px",
              background: "transparent", transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.accent; el.style.color = c.accent; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.border; el.style.color = c.text; }}
            >
              <PhoneIcon /> Call Now
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="bebas" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: c.accent, lineHeight: 1 }}>{s.value}</div>
                <div className="mono" style={{ fontSize: "0.625rem", color: c.textMuted, letterSpacing: "0.12em", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EMERGENCY BADGE ──────────────────────────────────── */}
        <div style={{
          maxWidth: "860px", margin: "0 auto 3rem",
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
          display: "flex", justifyContent: "center",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "1rem",
            background: "rgba(249,115,22,0.1)", border: `1px solid rgba(249,115,22,0.3)`,
            borderRadius: "8px", padding: "1rem 2rem",
            boxShadow: `0 0 20px rgba(249,115,22,0.1)`,
          }}>
            <span className="animate-blink" style={{
              display: "inline-block", width: "10px", height: "10px",
              borderRadius: "50%", background: c.warm,
              boxShadow: `0 0 10px ${c.warm}`,
            }} />
            <span className="mono" style={{
              fontSize: "0.8125rem", fontWeight: 700,
              letterSpacing: "0.14em", color: c.warm,
              textTransform: "uppercase",
            }}>24/7 Emergency Response — We&apos;re Live. Call Now.</span>
          </div>
        </div>

        {/* ── TRUST BADGES ──────────────────────────────────────── */}
        <section style={{
          padding: "0 clamp(1.5rem, 5vw, 3rem) 3rem",
          maxWidth: "960px", margin: "0 auto",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
          }}>
            {trustBadges.map((badge, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                background: c.card, border: `1px solid ${c.border}`,
                borderRadius: "6px", padding: "0.875rem 1rem",
              }}>
                <CheckIcon />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: c.text }}>{badge.label}</div>
                  <div className="mono" style={{ fontSize: "0.625rem", color: c.textMuted, letterSpacing: "0.1em", marginTop: "0.125rem" }}>{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION DIVIDER ───────────────────────────────────── */}
        <div style={{
          maxWidth: "960px", margin: "0 auto 3rem",
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
          display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <div style={{ flex: 1, height: "1px", background: c.border }} />
          <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.2em", color: c.accent, textTransform: "uppercase" }}>Services</span>
          <div style={{ flex: 1, height: "1px", background: c.border }} />
        </div>

        {/* ── SERVICES GRID ──────────────────────────────────────── */}
        <section style={{
          padding: "0 clamp(1.5rem, 5vw, 3rem) 4rem",
          maxWidth: "960px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {services.map((svc, i) => (
            <div key={i} style={{
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: "8px",
              padding: "1.75rem",
              transition: "all 0.25s ease",
              position: "relative",
              overflow: "hidden",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = c.accent;
                el.style.background = c.cardHover;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 8px 32px ${c.shadow}, 0 0 20px ${c.glow}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = c.border;
                el.style.background = c.card;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Number badge */}
              <div className="mono" style={{
                fontSize: "0.6875rem", fontWeight: 700, color: c.accent,
                letterSpacing: "0.12em", marginBottom: "1.25rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "28px", height: "28px",
                  border: `1px solid ${c.border}`, borderRadius: "4px",
                  background: c.surface, fontSize: "0.75rem",
                }}>{svc.num}</span>
                <span style={{ width: "20px", height: "1px", background: c.border }} />
                <span style={{ fontSize: "0.625rem", color: c.textMuted, letterSpacing: "0.1em" }}>{svc.tag}</span>
              </div>

              {/* Icon */}
              <div style={{
                color: c.accent, marginBottom: "1rem",
                filter: `drop-shadow(0 0 8px ${c.glow})`,
              }}>{svc.icon}</div>

              {/* Title */}
              <h3 className="bebas" style={{
                fontSize: "1.5rem", letterSpacing: "0.08em",
                color: c.text, marginBottom: "0.75rem",
                lineHeight: 1.1,
              }}>{svc.title}</h3>

              {/* Desc */}
              <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.65 }}>{svc.desc}</p>
            </div>
          ))}
        </section>

        {/* ── WHY US ─────────────────────────────────────────────── */}
        <section style={{
          padding: "4rem clamp(1.5rem, 5vw, 3rem)",
          background: c.surface,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
        }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.16em", color: c.accent, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Why Us</span>
              <h2 className="bebas" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.06em", color: c.text }}>THE CURRENT DIFFERENCE</h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}>
              {whyUs.map((item, i) => (
                <div key={i} style={{
                  background: c.card, border: `1px solid ${c.border}`,
                  borderRadius: "8px", padding: "1.75rem",
                  textAlign: "center",
                }}>
                  <div style={{ color: c.accent, marginBottom: "1rem", display: "flex", justifyContent: "center" }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text, marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ─────────────────────────────────────────── */}
        <section style={{
          padding: "4rem clamp(1.5rem, 5vw, 3rem)",
          textAlign: "center",
          background: `linear-gradient(135deg, rgba(251,191,36,0.06) 0%, transparent 60%)`,
          borderBottom: `1px solid ${c.border}`,
        }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.5rem",
            }}>
              <span className="animate-blink" style={{
                display: "inline-block", width: "8px", height: "8px",
                borderRadius: "50%", background: c.warm,
                boxShadow: `0 0 8px ${c.warm}`,
              }} />
              <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", color: c.warm, textTransform: "uppercase" }}>Emergency Service</span>
            </div>
            <h2 className="bebas" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "0.05em", color: c.text, lineHeight: 0.95, marginBottom: "1.25rem" }}>
              POWER EMERGENCY?<br />
              <span style={{ color: c.accent }}>WE&apos;RE LIVE.</span>
            </h2>
            <p style={{ fontSize: "1.0625rem", color: c.textMuted, lineHeight: 1.65, marginBottom: "2rem" }}>
              Don&apos;t wait for a minor issue to become a major one.<br />Call us now — we arrive fast, we fix it right.
            </p>
            <a href="tel:+15125550231" style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              padding: "1rem 2.5rem",
              background: c.warm, color: "white",
              fontWeight: 700, fontSize: "1rem",
              textDecoration: "none", borderRadius: "6px",
              boxShadow: `0 0 28px rgba(249,115,22,0.4)`,
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "scale(1.04)"; el.style.boxShadow = `0 0 40px rgba(249,115,22,0.5)`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "scale(1)"; el.style.boxShadow = `0 0 28px rgba(249,115,22,0.4)`; }}
            >
              <PhoneIcon /> Call (512) 555-0231
            </a>
          </div>
        </section>

        {/* ── CONTACT FORM ──────────────────────────────────────── */}
        <section id="contact" style={{
          padding: "5rem clamp(1.5rem, 5vw, 3rem)",
          maxWidth: "720px", margin: "0 auto",
        }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="mono" style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.16em", color: c.accent, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Get Estimate</span>
            <h2 className="bebas" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "0.06em", color: c.text }}>REQUEST A QUOTE</h2>
          </div>

          {submitted ? (
            <div style={{
              textAlign: "center", padding: "3rem",
              background: c.card, border: `1px solid ${c.border}`,
              borderRadius: "8px",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", color: c.accent }}>⚡</div>
              <h3 className="bebas" style={{ fontSize: "2rem", letterSpacing: "0.06em", color: c.text, marginBottom: "0.75rem" }}>REQUEST RECEIVED!</h3>
              <p style={{ color: c.textMuted, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                We&apos;ll call you within 2 hours. For immediate help, call us now at{" "}
                <a href="tel:+15125550231" style={{ color: c.accent, fontWeight: 600 }}>(512) 555-0231</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                  { label: "Full Name", name: "name", type: "text", placeholder: "Mike Johnson", required: true },
                  { label: "Phone", name: "phone", type: "tel", placeholder: "(512) 555-0000", required: true },
                ].map(f => (
                  <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label className="mono" style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: c.textMuted, textTransform: "uppercase" }}>
                      {f.label} <span style={{ color: c.warm }}>*</span>
                    </label>
                    <input
                      type={f.type} name={f.name} placeholder={f.placeholder}
                      required={f.required}
                      value={formData[f.name as keyof typeof formData]}
                      onChange={handleChange}
                      style={{
                        padding: "0.875rem 1rem",
                        background: c.inputBg,
                        border: `1px solid ${c.border}`,
                        borderRadius: "6px",
                        color: c.text, fontSize: "0.9375rem",
                        outline: "none", transition: "border-color 0.2s",
                        fontFamily: "inherit",
                      }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = c.accent; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = c.border; }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label className="mono" style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: c.textMuted, textTransform: "uppercase" }}>
                  Email <span style={{ color: c.warm }}>*</span>
                </label>
                <input
                  type="email" name="email" placeholder="mike@austinpower.com"
                  required value={formData.email} onChange={handleChange}
                  style={{
                    padding: "0.875rem 1rem",
                    background: c.inputBg,
                    border: `1px solid ${c.border}`,
                    borderRadius: "6px",
                    color: c.text, fontSize: "0.9375rem",
                    outline: "none", transition: "border-color 0.2s",
                    fontFamily: "inherit",
                  }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = c.accent; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = c.border; }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                  {
                    label: "Service Type", name: "service", options: ["Electrical Repair", "Panel Upgrade", "EV Charger Install", "New Installation / Remodel", "Safety Inspection", "Other"],
                  },
                  {
                    label: "Property Type", name: "property", options: ["Residential", "Commercial", "Industrial"],
                  },
                ].map(f => (
                  <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label className="mono" style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: c.textMuted, textTransform: "uppercase" }}>
                      {f.label} <span style={{ color: c.warm }}>*</span>
                    </label>
                    <select
                      name={f.name} required value={formData[f.name as keyof typeof formData]} onChange={handleChange}
                      style={{
                        padding: "0.875rem 1rem",
                        background: c.inputBg,
                        border: `1px solid ${c.border}`,
                        borderRadius: "6px",
                        color: c.text, fontSize: "0.9375rem",
                        outline: "none", cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                      onFocus={e => { (e.target as HTMLSelectElement).style.borderColor = c.accent; }}
                      onBlur={e => { (e.target as HTMLSelectElement).style.borderColor = c.border; }}
                    >
                      <option value="" style={{ background: c.bg }}>Select...</option>
                      {f.options.map(opt => <option key={opt} value={opt} style={{ background: c.bg }}>{opt}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label className="mono" style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: c.textMuted, textTransform: "uppercase" }}>
                  Urgency <span style={{ color: c.warm }}>*</span>
                </label>
                <select
                  name="urgency" required value={formData.urgency} onChange={handleChange}
                  style={{
                    padding: "0.875rem 1rem",
                    background: c.inputBg,
                    border: `1px solid ${c.border}`,
                    borderRadius: "6px",
                    color: c.text, fontSize: "0.9375rem",
                    outline: "none", cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                  onFocus={e => { (e.target as HTMLSelectElement).style.borderColor = c.accent; }}
                  onBlur={e => { (e.target as HTMLSelectElement).style.borderColor = c.border; }}
                >
                  <option value="" style={{ background: c.bg }}>Select timeline...</option>
                  {["Flexible timeline", "Within 1 week", "Within 48 hours", "Emergency — ASAP"].map(o => (
                    <option key={o} value={o} style={{ background: c.bg }}>{o}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label className="mono" style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", color: c.textMuted, textTransform: "uppercase" }}>
                  Describe the Job
                </label>
                <textarea
                  name="message" rows={4} placeholder="Old panel keeps tripping. Home built in 1987, 200amp service..."
                  value={formData.message} onChange={handleChange}
                  style={{
                    padding: "0.875rem 1rem",
                    background: c.inputBg,
                    border: `1px solid ${c.border}`,
                    borderRadius: "6px",
                    color: c.text, fontSize: "0.9375rem",
                    outline: "none", resize: "vertical",
                    fontFamily: "inherit", lineHeight: 1.6,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = c.accent; }}
                  onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = c.border; }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "1rem",
                  background: c.accent, color: isDark ? "#050507" : "white",
                  fontWeight: 700, fontSize: "1rem",
                  border: "none", borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  boxShadow: `0 0 20px ${c.glow}`,
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = `0 0 32px ${c.glow}`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = `0 0 20px ${c.glow}`;
                }}
              >
                <BoltIcon /> Get My Free Estimate →
              </button>
            </form>
          )}
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <footer style={{
          background: c.footerBg,
          borderTop: `1px solid ${c.border}`,
          padding: "3rem clamp(1.5rem, 5vw, 3rem)",
          position: "relative",
        }}>
          {/* Warning stripe */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "5px",
            background: `repeating-linear-gradient(90deg, ${c.accent} 0px, ${c.accent} 20px, transparent 20px, transparent 40px)`,
            opacity: 0.4,
          }} />

          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2.5rem", marginBottom: "3rem",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.25rem", color: c.accent }}>⚡</span>
                  <span className="bebas" style={{ fontSize: "1rem", letterSpacing: "0.12em", color: c.text }}>CURRENT ELECTRIC</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.6 }}>
                  5501 Congress Ave<br />Austin, TX 78745
                </p>
              </div>

              <div>
                <span className="mono" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", color: c.textMuted, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Service Area</span>
                <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.8 }}>
                  Austin • Round Rock<br />Cedar Park • Pflugerville<br />Buda
                </p>
              </div>

              <div>
                <span className="mono" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", color: c.textMuted, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Hours</span>
                <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.8 }}>
                  Mon–Sat: 7AM–6PM<br />
                  <span style={{ color: c.warm }}>Emergency: 24/7</span>
                </p>
              </div>

              <div>
                <span className="mono" style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", color: c.textMuted, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Contact</span>
                <p style={{ fontSize: "0.875rem", color: c.textMuted, lineHeight: 1.8 }}>
                  (512) 555-0231<br />
                  <a href="tel:+15125550231" style={{ color: c.accent, textDecoration: "none", fontWeight: 600 }}>24/7 Emergency Line</a>
                </p>
              </div>
            </div>

            <div style={{
              borderTop: `1px solid ${c.border}`,
              paddingTop: "1.5rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "1rem",
            }}>
              <a href="https://aexonai.com/#consultation" style={{
                fontSize: "0.875rem", fontWeight: 600, color: c.accent, textDecoration: "none",
              }}>
                Talk to AEXON AI →
              </a>
              <span className="mono" style={{ fontSize: "0.6875rem", color: c.textMuted, letterSpacing: "0.06em" }}>
                © 2025 Current Electric LLC · AEXON AI Demo · Not a real business
              </span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}