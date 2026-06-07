"use client";

import { useEffect, useRef, useState } from "react";
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

const darkTheme = {
  bg: "#050507",
  bgAlt: "#0d0d11",
  bgSoft: "#16161c",
  text: "#f6f2e8",
  textMuted: "#c0baa9",
  textSoft: "#8e8677",
  accent: "#fbbf24",
  accentStrong: "#f59e0b",
  accentSoft: "rgba(251, 191, 36, 0.16)",
  accentGlow: "rgba(251, 191, 36, 0.34)",
  warm: "#f97316",
  warmSoft: "rgba(249, 115, 22, 0.18)",
  warmGlow: "rgba(249, 115, 22, 0.28)",
  border: "rgba(251, 191, 36, 0.17)",
  borderStrong: "rgba(249, 115, 22, 0.32)",
  line: "rgba(255, 244, 214, 0.08)",
  nav: "rgba(5, 5, 7, 0.78)",
  card: "rgba(16, 16, 20, 0.92)",
  cardAlt: "rgba(26, 18, 10, 0.84)",
  panel: "rgba(10, 10, 12, 0.92)",
  input: "rgba(17, 17, 21, 0.96)",
  inputBorder: "rgba(251, 191, 36, 0.18)",
  chip: "rgba(255, 255, 255, 0.04)",
  chatUser: "rgba(249, 115, 22, 0.14)",
  chatAssistant: "rgba(251, 191, 36, 0.1)",
  success: "#fde68a",
  successSoft: "rgba(253, 230, 138, 0.14)",
  footer: "#060608",
  warningStripeA: "#fbbf24",
  warningStripeB: "#f97316",
  warningStripeC: "#19120a",
  shadow: "rgba(0, 0, 0, 0.42)",
  selection: "#f59e0b",
  onAccent: "#050507",
  boltCore: "#fff7d6",
  boltFlash: "rgba(255, 247, 214, 0.95)",
  boltGlow: "rgba(251, 191, 36, 0.52)",
  ambientA: "rgba(251, 191, 36, 0.12)",
  ambientB: "rgba(249, 115, 22, 0.1)",
  ambientRgbA: "251, 191, 36",
  ambientRgbB: "249, 115, 22",
  rail: "rgba(255, 250, 235, 0.1)",
};

const lightTheme = {
  bg: "#f8f1df",
  bgAlt: "#efe2c7",
  bgSoft: "#fff7e7",
  text: "#19140e",
  textMuted: "#554636",
  textSoft: "#7a644f",
  accent: "#c97b12",
  accentStrong: "#b25f0d",
  accentSoft: "rgba(201, 123, 18, 0.14)",
  accentGlow: "rgba(201, 123, 18, 0.26)",
  warm: "#d86411",
  warmSoft: "rgba(216, 100, 17, 0.15)",
  warmGlow: "rgba(216, 100, 17, 0.22)",
  border: "rgba(201, 123, 18, 0.2)",
  borderStrong: "rgba(216, 100, 17, 0.28)",
  line: "rgba(25, 20, 14, 0.1)",
  nav: "rgba(248, 241, 223, 0.84)",
  card: "rgba(255, 251, 242, 0.94)",
  cardAlt: "rgba(255, 245, 228, 0.94)",
  panel: "rgba(255, 252, 246, 0.96)",
  input: "rgba(255, 251, 244, 0.98)",
  inputBorder: "rgba(201, 123, 18, 0.2)",
  chip: "rgba(25, 20, 14, 0.04)",
  chatUser: "rgba(216, 100, 17, 0.12)",
  chatAssistant: "rgba(201, 123, 18, 0.1)",
  success: "#8b5a10",
  successSoft: "rgba(139, 90, 16, 0.08)",
  footer: "#f2e5c8",
  warningStripeA: "#d29a2e",
  warningStripeB: "#de6d1a",
  warningStripeC: "#d9ccb0",
  shadow: "rgba(61, 43, 13, 0.14)",
  selection: "#c97b12",
  onAccent: "#fff9ef",
  boltCore: "#fff8e5",
  boltFlash: "rgba(255, 248, 229, 0.94)",
  boltGlow: "rgba(201, 123, 18, 0.4)",
  ambientA: "rgba(201, 123, 18, 0.1)",
  ambientB: "rgba(216, 100, 17, 0.08)",
  ambientRgbA: "201, 123, 18",
  ambientRgbB: "216, 100, 17",
  rail: "rgba(25, 20, 14, 0.08)",
};

type ThemeColors = typeof darkTheme;

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  property: string;
  urgency: string;
  message: string;
};

type BoltPath = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  points: Array<{ x: number; y: number }>;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useLightningCanvas(colors: ThemeColors) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let cycleIndex = -1;
    let width = 0;
    let height = 0;
    let bolts: BoltPath[] = [];
    const startTime = performance.now();
    const boltCount = 12;
    const staggerMs = 45;
    const strikeMs = 80;
    const holdMs = 60;
    const fadeMs = 180;
    const boltLifetime = strikeMs + holdMs + fadeMs; // 320ms total per bolt
    const lastBoltFinish = (boltCount - 1) * staggerMs + boltLifetime; // 815ms
    const resetMs = 100;
    const cycleMs = lastBoltFinish + resetMs; // 915ms

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Only create bolts if we have valid dimensions
      if (width > 0 && height > 0) {
        bolts = Array.from({ length: boltCount }, (_, index) => createBolt(index));
      }
    };

    const createBolt = (index: number): BoltPath => {
      const startX = width * (0.08 + index * 0.14);
      const startY = -80 - Math.random() * 60;
      const endX = startX + width * (0.12 + Math.random() * 0.07);
      const endY = height * (0.34 + Math.random() * 0.24);
      const steps = 7;
      const points = [{ x: startX, y: startY }];

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        const drift = (Math.random() - 0.5) * width * 0.025;
        const kick = (Math.random() - 0.5) * 24;
        points.push({
          x: startX + (endX - startX) * progress + drift,
          y: startY + (endY - startY) * progress + kick,
        });
      }

      points[points.length - 1] = { x: endX, y: endY };

      return {
        startX,
        startY,
        endX,
        endY,
        points,
      };
    };

    const drawAmbient = (time: number) => {
      const pulse = 0.55 + Math.sin(time / 850) * 0.18;
      const gradient = ctx.createRadialGradient(
        width * 0.72,
        height * 0.18,
        0,
        width * 0.72,
        height * 0.18,
        width * 0.45,
      );

      gradient.addColorStop(0, `rgba(${colors.ambientRgbA}, ${0.22 * pulse})`);
      gradient.addColorStop(0.5, `rgba(${colors.ambientRgbB}, ${0.14 * pulse})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.rail;
      ctx.globalAlpha = 0.5;
      for (let rail = 0; rail < 4; rail += 1) {
        const y = height * (0.18 + rail * 0.16);
        ctx.beginPath();
        ctx.moveTo(width * 0.05, y);
        ctx.lineTo(width * 0.35, y + 26);
        ctx.lineTo(width * 0.6, y - 12);
        ctx.lineTo(width * 0.92, y + 18);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawPartialBolt = (bolt: BoltPath, visibleProgress: number, opacity: number, flash: number) => {
      const visibleCount = clamp(
        Math.ceil(visibleProgress * (bolt.points.length - 1)) + 1,
        2,
        bolt.points.length,
      );
      const visiblePoints = bolt.points.slice(0, visibleCount);

      ctx.save();
      ctx.globalAlpha = opacity * 0.92;
      ctx.strokeStyle = colors.boltGlow;
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = colors.boltGlow;
      ctx.shadowBlur = 42;
      ctx.beginPath();
      ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
      visiblePoints.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = colors.boltCore;
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = colors.boltFlash;
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
      visiblePoints.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.stroke();
      ctx.restore();

      const impact = bolt.points[bolt.points.length - 1];
      if (flash > 0.02) {
        ctx.save();
        ctx.globalAlpha = flash;
        const flashGradient = ctx.createRadialGradient(impact.x, impact.y, 0, impact.x, impact.y, 56);
        flashGradient.addColorStop(0, colors.boltFlash);
        flashGradient.addColorStop(0.35, colors.boltGlow);
        flashGradient.addColorStop(1, "transparent");
        ctx.fillStyle = flashGradient;
        ctx.beginPath();
        ctx.arc(impact.x, impact.y, 56, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    let frameCount = 0;
    let lastLogTime = 0;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const activeCycle = Math.floor(elapsed / cycleMs);

      if (activeCycle !== cycleIndex) {
        cycleIndex = activeCycle;
        bolts = Array.from({ length: boltCount }, (_, index) => createBolt(index));
      }

      // Ensure bolts exist if we have valid dimensions (handles initial state before resize)
      if (bolts.length === 0 && width > 0 && height > 0) {
        bolts = Array.from({ length: boltCount }, (_, index) => createBolt(index));
      }

      const cycleElapsed = elapsed % cycleMs;

      ctx.clearRect(0, 0, width, height);
      drawAmbient(elapsed);

      let boltsDrawn = 0;
      bolts.forEach((bolt, index) => {
        const strikeStart = index * staggerMs;
        const strikeElapsed = cycleElapsed - strikeStart;

        if (strikeElapsed < 0 || strikeElapsed > strikeMs + holdMs + fadeMs) {
          return;
        }

        let progress = 1;
        let opacity = 1;
        let flash = 0;

        if (strikeElapsed <= strikeMs) {
          progress = clamp(strikeElapsed / strikeMs, 0.05, 1);
          opacity = 0.85 + progress * 0.15;
          flash = clamp((strikeElapsed - strikeMs * 0.5) / (strikeMs * 0.5), 0, 1);
        } else if (strikeElapsed <= strikeMs + holdMs) {
          progress = 1;
          opacity = 1;
          flash = 1;
        } else {
          const fadeProgress = 1 - (strikeElapsed - strikeMs - holdMs) / fadeMs;
          progress = 1;
          opacity = clamp(fadeProgress, 0, 1);
          flash = clamp(fadeProgress * 0.7, 0, 1);
        }

        drawPartialBolt(bolt, progress, opacity, flash);
        boltsDrawn++;
      });

      frameCount++;
      if (now - lastLogTime > 2000) {
        console.log(`[LightningCanvas] frame=${frameCount} elapsed=${elapsed.toFixed(0)} cycleElapsed=${cycleElapsed.toFixed(0)} boltsDrawn=${boltsDrawn}/${bolts.length} width=${width} height=${height} canvasSize=${canvas.width}x${canvas.height}`);
        lastLogTime = now;
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    console.log(`[LightningCanvas] Init: width=${width} height=${height} canvas=${canvas.width}x${canvas.height} bolts=${bolts.length}`);
    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return canvasRef;
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13.1 2.2 4.8 13.1h5.8l-1.2 8.7 8.8-11h-5.7l.6-8.6Z" />
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

function PanelIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 7.5h.01M12 7.5h.01M16 7.5h.01M8 11.5h.01M12 11.5h.01M16 11.5h.01M8 16h8" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M7 9V4m10 5V4M8 9h8v2a4 4 0 0 1-4 4v5" />
      <path d="M10 20h4" />
    </svg>
  );
}

function CircuitIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 12h5l2-6 2 12 2-6h5" />
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

const services = [
  {
    number: "01",
    title: "Panel Upgrades",
    description: "Load calculations, 200A upgrade planning, breaker replacement, and cleaner distribution layouts for modern equipment.",
    icon: <PanelIcon />,
    note: "Inspection-first quoting",
  },
  {
    number: "02",
    title: "Circuit + Device Work",
    description: "Dedicated circuits, receptacle correction, switch replacement, GFCI protection, and code cleanup where old work drifts.",
    icon: <CircuitIcon />,
    note: "Residential or commercial",
  },
  {
    number: "03",
    title: "EV + Equipment Power",
    description: "Garage charging circuits, disconnect placement, conduit runs, and power prep for higher draw equipment.",
    icon: <PlugIcon />,
    note: "Permit-ready scope",
  },
  {
    number: "04",
    title: "Troubleshooting",
    description: "Intermittent trips, burnt conductors, dead rooms, and service calls that need a fast diagnosis before failure spreads.",
    icon: <LightningIcon />,
    note: "Triage with photo intake",
  },
];

const demoMessages = [
  {
    role: "homeowner",
    label: "Customer",
    text: "I need a panel upgrade before we install an EV charger. Breakers trip when the oven and dryer run together.",
  },
  {
    role: "assistant",
    label: "AI Agent",
    text: "I can open a panel-upgrade intake now. Is the property residential or commercial, and do you want the charger permit scoped at the same visit?",
  },
  {
    role: "homeowner",
    label: "Customer",
    text: "Residential. Please scope the charger too. Can someone inspect next week?",
  },
  {
    role: "assistant",
    label: "AI Agent",
    text: "Yes. I held Tuesday at 10:30 AM for an inspection and added a note for load calculation + charger planning before the electrician confirms.",
  },
];

const stats = [
  { value: "04", label: "Service tracks" },
  { value: "200A+", label: "Panel upgrade path" },
  { value: "AI", label: "Intake + scheduling" },
  { value: "01", label: "Inspection hold flow" },
];

const trustBadges = [
  { title: "Code-first scoping", body: "Intake is framed around load, safety, and permit questions before a truck rolls." },
  { title: "Real appointment holds", body: "The assistant can reserve inspection windows instead of leaving the request in voicemail limbo." },
  { title: "Industrial visual language", body: "Amber hazard tones, numbered service blocks, and diagonal motion keep this vertical distinct." },
  { title: "Theme persistence", body: "Dark and light modes stay synced in local storage with a mounted guard to avoid hydration drift." },
];

export default function ElectricalPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleTiles, setVisibleTiles] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    property: "",
    urgency: "",
    message: "",
  });

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem("current-electric-theme");
      if (storedTheme === "light") {
        setIsDark(false);
      }
    } catch {
      // Ignore storage reads and keep the default theme.
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tiles = document.querySelectorAll("[data-animate-tile]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.animateTile as string;
          if (entry.isIntersecting) {
            setVisibleTiles((prev) => new Set(prev).add(id));
          } else {
            setVisibleTiles((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    tiles.forEach((tile) => observer.observe(tile));
  }, [mounted]);

  const c = isDark ? darkTheme : lightTheme;
  const canvasRef = useLightningCanvas(c);

  const css = `
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: ${c.bg};
    }

    ::selection {
      background: ${c.selection};
      color: ${c.onAccent};
    }

    .electrical-root {
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
      color: ${c.text};
      background:
        repeating-linear-gradient(
          100deg,
          transparent 0px,
          transparent 40px,
          rgba(251, 191, 36, 0.06) 40px,
          rgba(251, 191, 36, 0.06) 42px,
          transparent 42px,
          transparent 200px
        ),
        repeating-linear-gradient(
          80deg,
          transparent 0px,
          transparent 80px,
          rgba(255, 247, 214, 0.04) 80px,
          rgba(255, 247, 214, 0.04) 82px,
          transparent 82px,
          transparent 300px
        ),
        radial-gradient(circle at 20% 10%, ${c.ambientA} 0%, transparent 28%),
        linear-gradient(180deg, ${c.bg} 0%, ${c.bgAlt} 55%, ${c.bg} 100%);
      background-attachment: fixed;
      font-family: ${dmSans.style.fontFamily}, system-ui, sans-serif;
    }

    .display-font {
      font-family: ${bebasNeue.style.fontFamily}, sans-serif;
      text-transform: uppercase;
    }

    .mono-font {
      font-family: ${jetbrainsMono.style.fontFamily}, monospace;
    }

    .page-shell {
      position: relative;
      z-index: 2;
      width: min(1120px, calc(100% - 2rem));
      margin: 0 auto;
      padding-bottom: 4rem;
    }

    .nav-link,
    .plain-link {
      color: inherit;
      text-decoration: none;
    }

    .nav-link {
      position: relative;
      font-size: 0.76rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${c.textSoft};
      transition: color 180ms ease;
    }

    .nav-link:hover {
      color: ${c.accent};
    }

    .nav-link::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0.35rem;
      height: 1px;
      background: ${c.accent};
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 180ms ease;
    }

    .nav-link:hover::after {
      transform: scaleX(1);
    }

    .hero-grid,
    .demo-grid,
    .contact-grid,
    .footer-grid {
      display: grid;
      gap: 1.4rem;
    }

    .hero-grid {
      grid-template-columns: 1.2fr 0.8fr;
      align-items: stretch;
    }

    .demo-grid {
      grid-template-columns: 1.08fr 0.92fr;
      align-items: stretch;
    }

    .contact-grid {
      grid-template-columns: 0.82fr 1.18fr;
      align-items: start;
    }

    .footer-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .section-shell {
      position: relative;
      border: 1px solid ${c.border};
      background: linear-gradient(145deg, ${c.card} 0%, ${c.cardAlt} 100%);
      box-shadow: 0 24px 60px ${c.shadow};
      overflow: hidden;
    }

    .angled-panel {
      border-radius: 28px 14px 26px 14px;
    }

    .service-grid,
    .stats-grid,
    .trust-grid,
    .field-grid {
      display: grid;
      gap: 1rem;
    }

    .service-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .stats-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .trust-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .field-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .service-card,
    .badge-card,
    .stat-card {
      transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
    }

    .service-card:hover,
    .badge-card:hover,
    .stat-card:hover {
      transform: translateY(-4px);
      border-color: ${c.borderStrong};
      box-shadow: 0 20px 45px ${c.shadow};
    }

    .button-primary,
    .button-secondary,
    .theme-toggle {
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, color 180ms ease, background 180ms ease;
    }

    .button-primary:hover,
    .button-secondary:hover,
    .theme-toggle:hover {
      transform: translateY(-2px);
    }

    .button-primary:hover {
      box-shadow: 0 24px 50px ${c.accentGlow};
    }

    .button-secondary:hover,
    .theme-toggle:hover {
      border-color: ${c.borderStrong};
      box-shadow: 0 16px 34px ${c.shadow};
    }

    .chat-line {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      max-width: 92%;
    }

    .chat-line[data-role="homeowner"] {
      margin-left: auto;
      align-items: flex-end;
    }

    .chat-line[data-role="assistant"] {
      align-items: flex-start;
    }

    .chat-bubble {
      padding: 0.95rem 1rem;
      border: 1px solid ${c.border};
      border-radius: 16px;
      line-height: 1.65;
      font-size: 0.94rem;
      background: ${c.chatAssistant};
    }

    .chat-line[data-role="homeowner"] .chat-bubble {
      background: ${c.chatUser};
      border-color: ${c.borderStrong};
    }

    .field {
      width: 100%;
      border: 1px solid ${c.inputBorder};
      border-radius: 12px;
      background: ${c.input};
      color: ${c.text};
      padding: 0.95rem 1rem;
      font: inherit;
      line-height: 1.4;
      outline: none;
      transition: border-color 180ms ease, box-shadow 180ms ease;
    }

    .field:focus {
      border-color: ${c.borderStrong};
      box-shadow: 0 0 0 4px ${c.accentSoft};
    }

    .field::placeholder {
      color: ${c.textSoft};
    }

    .footer-stripe {
      height: 20px;
      background-image: repeating-linear-gradient(
        -45deg,
        ${c.warningStripeA} 0 24px,
        ${c.warningStripeB} 24px 48px,
        ${c.warningStripeC} 48px 72px
      );
      border-top: 1px solid ${c.borderStrong};
      border-bottom: 1px solid ${c.borderStrong};
    }

    @media (max-width: 980px) {
      .hero-grid,
      .demo-grid,
      .contact-grid,
      .footer-grid,
      .service-grid,
      .stats-grid,
      .trust-grid,
      .field-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .page-shell {
        width: min(100%, calc(100% - 1rem));
      }
    }

    @keyframes tileEntrance {
      from {
        opacity: 0;
        transform: translateY(28px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes tileEntranceLeft {
      from {
        opacity: 0;
        transform: translateX(-22px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    @keyframes tileEntranceRight {
      from {
        opacity: 0;
        transform: translateX(22px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    .tile-visible {
      animation-duration: 0.55s;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    .tile-visible.tile-up {
      animation-name: tileEntrance;
    }

    .tile-visible.tile-left {
      animation-name: tileEntranceLeft;
    }

    .tile-visible.tile-right {
      animation-name: tileEntranceRight;
    }

    .lightning-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
      pointer-events: none;
      overflow: hidden;
    }
    .bolt {
      position: absolute;
      width: 12px;
      background: linear-gradient(180deg, #ffffff 0%, #fbbf24 25%, #f59e0b 60%, rgba(245,158,11,0.3) 100%);
      border-radius: 6px;
      opacity: 0;
      box-shadow: 0 0 16px 4px rgba(251,191,36,1), 0 0 40px 8px rgba(245,158,11,0.6);
      transform-origin: top center;
    }
    .bolt-1 { left: 12%; top: -180px; animation: boltFall 2.5s linear 0.0s infinite; }
    .bolt-2 { left: 28%; top: -180px; animation: boltFall 2.5s linear 0.35s infinite; }
    .bolt-3 { left: 44%; top: -180px; animation: boltFall 2.5s linear 0.7s infinite; }
    .bolt-4 { left: 60%; top: -180px; animation: boltFall 2.5s linear 1.05s infinite; }
    .bolt-5 { left: 76%; top: -180px; animation: boltFall 2.5s linear 1.4s infinite; }
    .bolt-6 { left: 90%; top: -180px; animation: boltFall 2.5s linear 1.75s infinite; }
    .bolt-7 { left: 20%; top: -180px; animation: boltFall 2.5s linear 2.1s infinite; }
    .bolt-8 { left: 52%; top: -180px; animation: boltFall 2.5s linear 0.52s infinite; }
    @keyframes boltFall {
      0%   { transform: translateY(-200px); opacity: 0; }
      8%   { opacity: 1; }
      60%  { opacity: 0.85; }
      75%  { transform: translateY(calc(100vh + 200px)); opacity: 0; }
      100% { transform: translateY(calc(100vh + 200px)); opacity: 0; }
    }
  `;

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

  return (
    <>
      <style>{css}</style>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 1,
        }}
      />

      <div className="lightning-overlay" aria-hidden="true">
        <div className="bolt bolt-1" />
        <div className="bolt bolt-2" />
        <div className="bolt bolt-3" />
        <div className="bolt bolt-4" />
        <div className="bolt bolt-5" />
        <div className="bolt bolt-6" />
        <div className="bolt bolt-7" />
        <div className="bolt bolt-8" />
      </div>

      

      <button
        type="button"
        className="theme-toggle"
        onClick={() => {
          const nextThemeIsDark = !isDark;
          setIsDark(nextThemeIsDark);
          try {
            window.localStorage.setItem(
              "current-electric-theme",
              nextThemeIsDark ? "dark" : "light",
            );
          } catch {
            // Ignore storage writes if access is blocked.
          }
        }}
        aria-label="Toggle color theme"
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 5,
          width: "3rem",
          height: "3rem",
          display: "grid",
          placeItems: "center",
          borderRadius: "999px",
          border: `1px solid ${c.border}`,
          background: c.nav,
          color: c.text,
          backdropFilter: "blur(16px)",
          cursor: "pointer",
          boxShadow: `0 18px 40px ${c.shadow}`,
        }}
      >
        {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : null}
      </button>

      <div className="electrical-root">
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(18px)",
            background: c.nav,
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          <div
            className="page-shell"
            style={{
              paddingTop: "0.95rem",
              paddingBottom: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "12px 8px 12px 8px",
                  display: "grid",
                  placeItems: "center",
                  background: `linear-gradient(135deg, ${c.accentSoft} 0%, ${c.warmSoft} 100%)`,
                  color: c.accent,
                  border: `1px solid ${c.border}`,
                }}
              >
                <LightningIcon />
              </div>
              <div>
                <div className="display-font" style={{ fontSize: "1.7rem", letterSpacing: "0.08em", lineHeight: 0.92 }}>
                  Current Electric
                </div>
                <div className="mono-font" style={{ fontSize: "0.66rem", letterSpacing: "0.18em", color: c.textSoft }}>
                  PANEL WORK / TROUBLESHOOTING / POWER PLANNING
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", flexWrap: "wrap" }}>
              <a href="#services" className="nav-link">
                Services
              </a>
              <a href="#agent-demo" className="nav-link">
                Chat with our concierge
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
              <a
                href="tel:+15125550128"
                className="plain-link mono-font"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  color: c.accent,
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <PhoneIcon />
                (512) 555-0128
              </a>
            </div>
          </div>
        </nav>

        <section
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
            borderBottom: `1px solid ${c.border}`,
            background: `linear-gradient(180deg, ${c.bgAlt} 0%, ${c.bg} 100%)`,
          }}
        >
          <div style={{ maxWidth: '76rem', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.1rem',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${c.accentSoft} 0%, ${c.warmSoft} 100%)`,
                  display: 'grid',
                  placeItems: 'center',
                  color: c.accent,
                  border: `1px solid ${c.border}`,
                }}
              >
                <LightningIcon />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: c.textMuted,
                }}
              >
                Licensed Electrical Contractors
              </div>
            </div>
            <div
              className="display-font"
              style={{
                fontSize: 'clamp(4.7rem, 14vw, 9.5rem)',
                lineHeight: 0.84,
                letterSpacing: '0.04em',
                color: c.text,
                marginBottom: '0.35rem',
              }}
            >
              Current
            </div>
            <div
              className="display-font"
              style={{
                fontSize: 'clamp(4.9rem, 14vw, 10rem)',
                lineHeight: 0.84,
                letterSpacing: '0.05em',
                color: c.accent,
                textShadow: `0 0 40px ${c.accentGlow}`,
                marginBottom: '1.5rem',
              }}
            >
              Electric
            </div>
            <p
              style={{
                maxWidth: '44rem',
                margin: '0 0 1.75rem',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: c.textMuted,
              }}
            >
              Industrial warmth instead of a generic tech reskin. This route frames electrical work as
              fast-moving, code-aware, and inspection-led, with a live intake assistant that can capture a
              panel-upgrade request and hold the next inspection window.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                className="button-primary plain-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.95rem 1.35rem',
                  borderRadius: '999px',
                  background: `linear-gradient(135deg, ${c.accent} 0%, ${c.warm} 100%)`,
                  color: c.onAccent,
                  fontWeight: 700,
                  boxShadow: `0 18px 36px ${c.accentGlow}`,
                }}
              >
                <LightningIcon />
                Request Electrical Review
              </a>
              <a
                href="#agent-demo"
                className="button-secondary plain-link mono-font"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.95rem 1.25rem',
                  borderRadius: '999px',
                  border: `1px solid ${c.border}`,
                  background: c.chip,
                  color: c.text,
                  fontSize: '0.76rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <CalendarIcon />
                Chat with our concierge
              </a>
            </div>
          </div>
        </section>

        <main className="page-shell" style={{ paddingTop: '1.5rem' }}>
          <section
            className="hero-grid"
            style={{
              marginBottom: '1.5rem',
            }}
          >
            <div
              className="section-shell"
              style={{
                padding: "clamp(1.5rem, 3vw, 2.3rem)",
                display: 'grid',
                gap: '1.2rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: c.accent,
                  marginBottom: '0.5rem',
                }}
              >
                ⚡ Our Services
              </div>

              {[
                { num: '01', label: 'Panel Work', desc: 'Breaker replacements, subpanel installs, capacity upgrades' },
                { num: '02', label: 'Troubleshooting', desc: 'Outlet diagnostics, surge analysis, code compliance' },
                { num: '03', label: 'Power Planning', desc: 'EV charger circuits, appliance hookups, generator tie-ins' },
              ].map((s) => (
                <div
                  key={s.num}
                  style={{
                    padding: '1rem 1.1rem',
                    borderRadius: '14px',
                    border: `1px solid ${c.border}`,
                    background: c.card,
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '0.68rem', color: c.accent, letterSpacing: '0.1em', marginBottom: '0.35rem' }}>{s.num}</div>
                  <div style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1.35rem', letterSpacing: '0.06em', color: c.text, marginBottom: '0.25rem' }}>{s.label}</div>
                  <div style={{ fontSize: '0.82rem', color: c.textMuted, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>

            <div
              className="section-shell angled-panel"
              style={{
                padding: "1.35rem",
                display: "grid",
                gap: "1rem",
                alignContent: "space-between",
              }}
            >
              <div
                className="mono-font"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: c.textSoft,
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <span>Charge rail</span>
                <span style={{ color: c.accent }}>Live intake</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "0.85rem",
                  padding: "1rem",
                  borderRadius: "18px 12px 18px 12px",
                  border: `1px solid ${c.border}`,
                  background: c.panel,
                }}
              >
                {[
                  "Panel upgrade + EV scope",
                  "Breaker trip pattern captured",
                  "Inspection hold suggested",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        width: "0.7rem",
                        height: "0.7rem",
                        marginTop: "0.3rem",
                        borderRadius: "999px",
                        background: c.accent,
                        boxShadow: `0 0 16px ${c.accentGlow}`,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ lineHeight: 1.7, color: c.textMuted }}>{item}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "1rem",
                  borderRadius: "18px 12px 18px 12px",
                  border: `1px solid ${c.borderStrong}`,
                  background: `linear-gradient(135deg, ${c.warmSoft} 0%, ${c.accentSoft} 100%)`,
                }}
              >
                <div className="mono-font" style={{ fontSize: "0.68rem", letterSpacing: "0.16em", color: c.warm, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Held appointment
                </div>
                <div className="display-font" style={{ fontSize: "2rem", letterSpacing: "0.05em", lineHeight: 0.95 }}>
                  Tue 10:30
                </div>
                <p style={{ margin: "0.5rem 0 0", color: c.textMuted, lineHeight: 1.65 }}>
                  AI capture logs the panel concern, load note, and inspection window before a human confirms.
                </p>
              </div>
            </div>
          </section>

          <section id="services" style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: "1rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div className="mono-font" style={{ fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, marginBottom: "0.45rem" }}>
                  Service Blocks
                </div>
                <h2 className="display-font" style={{ fontSize: "3.4rem", lineHeight: 0.9, letterSpacing: "0.05em", margin: 0 }}>
                  01 / 04
                </h2>
              </div>
              
            </div>

            <div className="service-grid">
              {services.map((service, i) => (
                <article
                  key={service.number}
                  data-animate-tile={`service-${service.number}`}
                  data-tile-direction={i % 2 === 0 ? "left" : "right"}
                  className={`section-shell angled-panel service-card ${visibleTiles.has(`service-${service.number}`) ? "tile-visible tile-" + (i % 2 === 0 ? "left" : "right") : ""}`}
                  style={{
                    padding: "1.2rem",
                    display: "grid",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "start" }}>
                    <div
                      className="mono-font"
                      style={{
                        minWidth: "3.4rem",
                        padding: "0.45rem 0.6rem",
                        borderRadius: "10px",
                        border: `1px solid ${c.border}`,
                        background: c.chip,
                        color: c.accent,
                        fontSize: "0.78rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      {service.number}
                    </div>
                    <div
                      style={{
                        width: "2.7rem",
                        height: "2.7rem",
                        borderRadius: "14px 10px 14px 10px",
                        display: "grid",
                        placeItems: "center",
                        border: `1px solid ${c.border}`,
                        background: `linear-gradient(135deg, ${c.accentSoft} 0%, ${c.warmSoft} 100%)`,
                        color: c.accent,
                      }}
                    >
                      {service.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="display-font" style={{ fontSize: "2.1rem", lineHeight: 0.92, letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
                      {service.title}
                    </h3>
                    <p style={{ margin: 0, color: c.textMuted, lineHeight: 1.72 }}>{service.description}</p>
                  </div>

                  <div
                    className="mono-font"
                    style={{
                      width: "fit-content",
                      padding: "0.48rem 0.75rem",
                      borderRadius: "999px",
                      border: `1px solid ${c.border}`,
                      background: c.chip,
                      color: c.textSoft,
                      fontSize: "0.69rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {service.note}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="agent-demo" className="demo-grid" style={{ marginBottom: "1.5rem" }}>
            <div
              className="section-shell angled-panel"
              style={{
                padding: "1.3rem",
                display: "grid",
                gap: "1rem",
              }}
            >
              <div>
                <div className="mono-font" style={{ fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, marginBottom: "0.45rem" }}>
                  Concierge Agent
                </div>
                <h2 className="display-font" style={{ fontSize: "3.15rem", lineHeight: 0.92, letterSpacing: "0.05em", margin: 0 }}>
                  Intake That Holds The Inspection
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "0.9rem",
                  padding: "1rem",
                  borderRadius: "22px 14px 22px 14px",
                  border: `1px solid ${c.border}`,
                  background: c.panel,
                }}
              >
                {demoMessages.map((message) => (
                  <div key={message.text} className="chat-line" data-role={message.role}>
                    <div className="mono-font" style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: message.role === "assistant" ? c.accent : c.warm }}>
                      {message.label}
                    </div>
                    <div className="chat-bubble">{message.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="section-shell angled-panel"
              style={{
                padding: "1.3rem",
                display: "grid",
                gap: "1rem",
              }}
            >
              <div
                className="mono-font"
                style={{
                  color: c.textSoft,
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Scheduler Summary
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "0.8rem",
                  padding: "1rem",
                  borderRadius: "18px 12px 18px 12px",
                  background: `linear-gradient(135deg, ${c.accentSoft} 0%, ${c.warmSoft} 100%)`,
                  border: `1px solid ${c.borderStrong}`,
                }}
              >
                <div className="display-font" style={{ fontSize: "2.35rem", lineHeight: 0.92, letterSpacing: "0.05em" }}>
                  Panel Upgrade Inquiry
                </div>
                <div style={{ color: c.textMuted, lineHeight: 1.72 }}>
                  The assistant captures the symptom, maps it to an upgrade + charger scope, and holds an
                  inspection before handing the request to the electrician.
                </div>
              </div>

              <div style={{ display: "grid", gap: "0.8rem" }}>
                {[
                  "Residential property tagged",
                  "Breaker-trip note attached",
                  "Tuesday 10:30 AM inspection reserved",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "center",
                      padding: "0.85rem 0.95rem",
                      borderRadius: "14px 10px 14px 10px",
                      border: `1px solid ${c.border}`,
                      background: c.chip,
                    }}
                  >
                    <span
                      style={{
                        width: "0.7rem",
                        height: "0.7rem",
                        borderRadius: "999px",
                        background: c.accent,
                        boxShadow: `0 0 14px ${c.accentGlow}`,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: c.textMuted }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "1.5rem" }}>
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-animate-tile={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`section-shell angled-panel stat-card ${visibleTiles.has(`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}`) ? "tile-visible tile-up" : ""}`}
                  style={{
                    padding: "1.05rem 1.1rem",
                    display: "grid",
                    gap: "0.35rem",
                  }}
                >
                  <div className="display-font" style={{ fontSize: "2.6rem", lineHeight: 0.9, letterSpacing: "0.05em", color: c.accent }}>
                    {stat.value}
                  </div>
                  <div className="mono-font" style={{ fontSize: "0.71rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: "1.5rem" }}>
            <div style={{ marginBottom: "0.95rem" }}>
              <div className="mono-font" style={{ fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, marginBottom: "0.45rem" }}>
                Trust Badges
              </div>
              <h2 className="display-font" style={{ fontSize: "3rem", lineHeight: 0.92, letterSpacing: "0.05em", margin: 0 }}>
                Built Around Clear Signals
              </h2>
            </div>

            <div className="trust-grid">
              {trustBadges.map((badge, i) => (
                <div
                  key={badge.title}
                  data-animate-tile={`trust-${badge.title.replace(/\s+/g, '-').toLowerCase()}`}
                  className={`section-shell angled-panel badge-card ${visibleTiles.has(`trust-${badge.title.replace(/\s+/g, '-').toLowerCase()}`) ? "tile-visible tile-" + (i % 2 === 0 ? "left" : "right") : ""}`}
                  style={{
                    padding: "1.1rem",
                    display: "grid",
                    gap: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      width: "2.55rem",
                      height: "2.55rem",
                      borderRadius: "14px 10px 14px 10px",
                      display: "grid",
                      placeItems: "center",
                      border: `1px solid ${c.border}`,
                      background: `linear-gradient(135deg, ${c.accentSoft} 0%, ${c.warmSoft} 100%)`,
                      color: c.accent,
                    }}
                  >
                    <ShieldIcon />
                  </div>
                  <div>
                    <div className="display-font" style={{ fontSize: "1.72rem", lineHeight: 0.92, letterSpacing: "0.05em", marginBottom: "0.35rem" }}>
                      {badge.title}
                    </div>
                    <p style={{ margin: 0, color: c.textMuted, lineHeight: 1.68 }}>{badge.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="contact-grid" style={{ marginBottom: "1.6rem" }}>
            <div
              className="section-shell angled-panel"
              style={{
                padding: "1.3rem",
                display: "grid",
                gap: "1rem",
              }}
            >
              <div>
                <div className="mono-font" style={{ fontSize: "0.74rem", letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, marginBottom: "0.45rem" }}>
                  Contact Form
                </div>
                <h2 className="display-font" style={{ fontSize: "3rem", lineHeight: 0.92, letterSpacing: "0.05em", margin: 0 }}>
                  Start The Inspection Request
                </h2>
              </div>

              <p style={{ margin: 0, color: c.textMuted, lineHeight: 1.72 }}>
                This intake keeps the copy honest: it captures the actual issue, the service path, the urgency, and
                whether the visit should include panel-upgrade planning or a broader equipment review.
              </p>

              <div
                style={{
                  padding: "1rem",
                  borderRadius: "18px 12px 18px 12px",
                  background: c.panel,
                  border: `1px solid ${c.border}`,
                  display: "grid",
                  gap: "0.85rem",
                }}
              >
                {[
                  "Panel upgrade",
                  "Property type",
                  "Urgency",
                  "Inspection notes",
                ].map((chip) => (
                  <div
                    key={chip}
                    className="mono-font"
                    style={{
                      width: "fit-content",
                      padding: "0.46rem 0.72rem",
                      borderRadius: "999px",
                      border: `1px solid ${c.border}`,
                      background: c.chip,
                      color: c.textSoft,
                      fontSize: "0.69rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>

            <div className="section-shell angled-panel" style={{ padding: "1.3rem" }}>
              {submitted ? (
                <div
                  style={{
                    minHeight: "100%",
                    display: "grid",
                    alignContent: "center",
                    gap: "1rem",
                    padding: "1rem 0",
                  }}
                >
                  <div
                    style={{
                      width: "3.3rem",
                      height: "3.3rem",
                      borderRadius: "18px 12px 18px 12px",
                      display: "grid",
                      placeItems: "center",
                      background: c.successSoft,
                      color: c.success,
                      border: `1px solid ${c.borderStrong}`,
                    }}
                  >
                    <CalendarIcon />
                  </div>
                  <div className="display-font" style={{ fontSize: "3rem", lineHeight: 0.92, letterSpacing: "0.05em" }}>
                    Request Logged
                  </div>
                  <p style={{ margin: 0, color: c.textMuted, lineHeight: 1.75 }}>
                    The form state is complete, the inspection request is staged, and the follow-up path can move to a
                    human electrician without losing the panel-upgrade context.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                  <div className="field-grid">
                    <div>
                      <label className="mono-font" htmlFor="name" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                        Name
                      </label>
                      <input id="name" className="field" name="name" value={formData.name} onChange={handleChange} placeholder="Jordan Ellis" required />
                    </div>
                    <div>
                      <label className="mono-font" htmlFor="phone" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                        Phone
                      </label>
                      <input id="phone" className="field" name="phone" value={formData.phone} onChange={handleChange} placeholder="(512) 555-0148" required />
                    </div>
                  </div>

                  <div className="field-grid">
                    <div>
                      <label className="mono-font" htmlFor="email" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                        Email
                      </label>
                      <input id="email" className="field" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jordan@example.com" required />
                    </div>
                    <div>
                      <label className="mono-font" htmlFor="service" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                        Service
                      </label>
                      <select id="service" className="field" name="service" value={formData.service} onChange={handleChange} required>
                        <option value="">Select service</option>
                        <option value="Panel Upgrade">Panel Upgrade</option>
                        <option value="Circuit Work">Circuit Work</option>
                        <option value="EV Charger">EV Charger</option>
                        <option value="Troubleshooting">Troubleshooting</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-grid">
                    <div>
                      <label className="mono-font" htmlFor="property" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                        Property
                      </label>
                      <select id="property" className="field" name="property" value={formData.property} onChange={handleChange} required>
                        <option value="">Select property</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Mixed-use">Mixed-use</option>
                      </select>
                    </div>
                    <div>
                      <label className="mono-font" htmlFor="urgency" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                        Urgency
                      </label>
                      <select id="urgency" className="field" name="urgency" value={formData.urgency} onChange={handleChange} required>
                        <option value="">Select urgency</option>
                        <option value="Flexible">Flexible</option>
                        <option value="This Week">This Week</option>
                        <option value="Within 48 Hours">Within 48 Hours</option>
                        <option value="Urgent Same Day">Urgent Same Day</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mono-font" htmlFor="message" style={{ display: "block", marginBottom: "0.45rem", fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase", color: c.textSoft }}>
                      Notes
                    </label>
                    <textarea
                      id="message"
                      className="field"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Built in 1994. Breakers trip when the dryer and oven run together. We also want an EV charger scoped."
                    />
                  </div>

                  <button
                    type="submit"
                    className="button-primary"
                    style={{
                      width: "fit-content",
                      padding: "0.98rem 1.35rem",
                      borderRadius: "999px",
                      border: "none",
                      background: `linear-gradient(135deg, ${c.accent} 0%, ${c.warm} 100%)`,
                      color: c.onAccent,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: `0 18px 36px ${c.accentGlow}`,
                    }}
                  >
                    Submit Inspection Request
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>

        <div className="footer-stripe" />

        <footer
          style={{
            borderTop: `1px solid ${c.border}`,
            background: c.footer,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="page-shell" style={{ paddingTop: "1.4rem", paddingBottom: "2.4rem" }}>
            <div className="footer-grid">
              

              <div>
                <div className="mono-font" style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, marginBottom: "0.45rem" }}>
                  Reach
                </div>
                <div style={{ display: "grid", gap: "0.4rem", color: c.textMuted }}>
                  <a className="plain-link" href="tel:+15125550128">
                    (512) 555-0128
                  </a>
                  <a className="plain-link" href="mailto:intake@current-electric.example">
                    intake@current-electric.example
                  </a>
                  <a className="plain-link" href="#contact">
                    Start inspection request
                  </a>
                </div>
              </div>

              
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
