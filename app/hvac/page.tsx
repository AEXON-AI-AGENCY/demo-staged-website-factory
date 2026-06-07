"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Inter } from "next/font/google";

const interDisplay = Inter({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});

const interBody = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const darkColors = {
  bg: "#09090b",
  bgSoft: "#111114",
  bgPanel: "rgba(255,255,255,0.04)",
  bgPanelStrong: "rgba(255,255,255,0.06)",
  text: "#f4f4f5",
  textSoft: "#d4d4d8",
  textMuted: "#a1a1aa",
  accent: "#22d3ee",
  accentStrong: "#67e8f9",
  accentMuted: "rgba(34,211,238,0.18)",
  border: "rgba(34,211,238,0.22)",
  borderStrong: "rgba(34,211,238,0.35)",
  glow: "rgba(34,211,238,0.2)",
  glowStrong: "rgba(34,211,238,0.34)",
  shadow: "rgba(0,0,0,0.44)",
  shadowSoft: "rgba(0,0,0,0.24)",
  input: "rgba(255,255,255,0.03)",
  nav: "rgba(9,9,11,0.82)",
  heroGlow:
    "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.22), rgba(34,211,238,0.06) 38%, rgba(9,9,11,0) 72%)",
  heroLine:
    "linear-gradient(90deg, rgba(34,211,238,0), rgba(34,211,238,0.65), rgba(34,211,238,0))",
  footer: "#060608",
  successBg: "rgba(34,211,238,0.08)",
  successBorder: "rgba(34,211,238,0.28)",
  canvasCore: "34, 211, 238",
  canvasGlow: "103, 232, 249",
  canvasSheen: "244, 244, 245",
  headlineShadow:
    "0 1px 0 rgba(0,0,0,0.92), 0 6px 24px rgba(0,0,0,0.54), 0 0 32px rgba(34,211,238,0.16)",
};

const lightColors = {
  bg: "#f6fdff",
  bgSoft: "#e8fbff",
  bgPanel: "rgba(255,255,255,0.72)",
  bgPanelStrong: "rgba(255,255,255,0.88)",
  text: "#0f172a",
  textSoft: "#1e293b",
  textMuted: "#475569",
  accent: "#0f9db4",
  accentStrong: "#0891b2",
  accentMuted: "rgba(15,157,180,0.14)",
  border: "rgba(15,157,180,0.22)",
  borderStrong: "rgba(15,157,180,0.3)",
  glow: "rgba(15,157,180,0.14)",
  glowStrong: "rgba(15,157,180,0.22)",
  shadow: "rgba(15,23,42,0.12)",
  shadowSoft: "rgba(15,23,42,0.08)",
  input: "rgba(255,255,255,0.92)",
  nav: "rgba(246,253,255,0.82)",
  heroGlow:
    "radial-gradient(circle at 50% 0%, rgba(15,157,180,0.16), rgba(15,157,180,0.05) 42%, rgba(246,253,255,0) 74%)",
  heroLine:
    "linear-gradient(90deg, rgba(15,157,180,0), rgba(15,157,180,0.42), rgba(15,157,180,0))",
  footer: "#ecfbff",
  successBg: "rgba(15,157,180,0.08)",
  successBorder: "rgba(15,157,180,0.24)",
  canvasCore: "15, 157, 180",
  canvasGlow: "125, 211, 252",
  canvasSheen: "255, 255, 255",
  headlineShadow:
    "0 1px 0 rgba(255,255,255,0.55), 0 10px 32px rgba(15,23,42,0.08), 0 0 28px rgba(15,157,180,0.12)",
};

type ThemeMode = "dark" | "light";

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  unitAge: string;
  serviceNeeded: string;
  urgency: string;
  notes: string;
};

type MistParticle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  seed: number;
  opacity: number;
};

type IconProps = {
  size?: number;
};

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  unitAge: "",
  serviceNeeded: "",
  urgency: "",
  notes: "",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const rgba = (token: string, alpha: number) =>
  `rgba(${token}, ${clamp(alpha, 0, 1)})`;

function CoolingMark({ size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v20" />
      <path d="M4.93 4.93 19.07 19.07" />
      <path d="M2 12h20" />
      <path d="M19.07 4.93 4.93 19.07" />
      <path d="m12 2 2.2 3.8" />
      <path d="m12 2-2.2 3.8" />
      <path d="m12 22 2.2-3.8" />
      <path d="m12 22-2.2-3.8" />
    </svg>
  );
}

function RepairIcon({ size = 26 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 1 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
      <path d="M8 3v4" />
      <path d="M6 5h4" />
    </svg>
  );
}

function HeatIcon({ size = 26 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3c1.6 2.8 3.9 4.8 5.2 6.7a6.5 6.5 0 1 1-10.4 0C8.1 7.8 10.4 5.8 12 3Z" />
      <path d="M12 10c.9 1 1.8 2.1 1.8 3.7a1.8 1.8 0 1 1-3.6 0c0-1.6.9-2.7 1.8-3.7Z" />
    </svg>
  );
}

function ShieldIcon({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9.5 12 1.7 1.7 3.5-4" />
    </svg>
  );
}

function CircuitIcon({ size = 26 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9h2v2H9z" />
      <path d="M13 9h2v6h-2z" />
      <path d="M9 13h6" />
      <path d="M7 2v2" />
      <path d="M17 2v2" />
      <path d="M7 20v2" />
      <path d="M17 20v2" />
    </svg>
  );
}

function ChatIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  );
}

function ClockIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h3" />
      <path d="M13 14h3" />
    </svg>
  );
}

function CheckIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function MailIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PinIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowIcon({ size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SunIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="m4.9 4.9 1.8 1.8" />
      <path d="m17.3 17.3 1.8 1.8" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="m4.9 19.1 1.8-1.8" />
      <path d="m17.3 6.7 1.8-1.8" />
    </svg>
  );
}

function MoonIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.7A8.7 8.7 0 1 1 11.3 3 7.2 7.2 0 0 0 21 12.7Z" />
    </svg>
  );
}

function CoolingLogo({ accent, textColor }: { accent: string; textColor: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.85rem",
      }}
    >
      <div
        style={{
          width: "2.9rem",
          height: "2.9rem",
          borderRadius: "999px",
          border: `1px solid ${accent}`,
          background: `radial-gradient(circle at 30% 30%, ${accent}, transparent 72%)`,
          color: accent,
          display: "grid",
          placeItems: "center",
          boxShadow: `0 0 24px ${accent}`,
        }}
      >
        <CoolingMark size={22} />
      </div>
      <div style={{ display: "grid", gap: "0.2rem" }}>
        <span
          className={interDisplay.className}
          style={{
            color: textColor,
            fontSize: "0.95rem",
            lineHeight: 1,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          CoolPro HVAC
        </span>
        <span
          style={{
            color: textColor,
            opacity: 0.72,
            fontSize: "0.74rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Precision comfort systems
        </span>
      </div>
    </div>
  );
}

export default function HvacPage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [servicesVisible, setServicesVisible] = useState(false);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const [trustVisible, setTrustVisible] = useState(false);
  const trustSectionRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";
  const c = isDark ? darkColors : lightColors;

  useEffect(() => {
    const stored = window.localStorage.getItem("hvac-theme");
    const nextTheme: ThemeMode =
      stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(nextTheme);
    setMounted(true);
    document.body.style.background =
      nextTheme === "dark" ? darkColors.bg : lightColors.bg;
    document.body.style.color =
      nextTheme === "dark" ? darkColors.text : lightColors.text;
  }, []);

  useEffect(() => {
    document.body.style.background = c.bg;
    document.body.style.color = c.text;

    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, [c.bg, c.text]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hvac-scroll-visible");
          } else {
            entry.target.classList.remove("hvac-scroll-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = document.querySelectorAll(".hvac-scroll-animate");
    targets.forEach((el) => observer.observe(el));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let particles: MistParticle[] = [];

    const buildParticle = (spawnFromBottom: boolean): MistParticle => ({
      x: Math.random() * width,
      y: spawnFromBottom
        ? height + Math.random() * height * 0.18
        : Math.random() * height,
      radius: 3 + Math.random() * 6,
      speed: 0.35 + Math.random() * 0.7,
      sway: 10 + Math.random() * 28,
      swaySpeed: 0.004 + Math.random() * 0.012,
      seed: Math.random() * Math.PI * 2,
      opacity: 0.12 + Math.random() * 0.18,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      particles = Array.from({ length: 48 }, () => buildParticle(false));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.y -= particle.speed;
        particle.seed += particle.swaySpeed;

        const drawX = particle.x + Math.sin(particle.seed + index * 0.11) * particle.sway;
        const fadeIn = clamp((height - particle.y) / (height * 0.22), 0, 1);
        const fadeOut = clamp((particle.y + particle.radius * 10) / (height * 0.28), 0, 1);
        const alpha = particle.opacity * fadeIn * fadeOut * (isDark ? 1 : 0.78);

        const glowRadius = particle.radius * 3.4;
        const gradient = context.createRadialGradient(
          drawX,
          particle.y,
          0,
          drawX,
          particle.y,
          glowRadius,
        );

        gradient.addColorStop(0, rgba(c.canvasCore, alpha));
        gradient.addColorStop(0.48, rgba(c.canvasGlow, alpha * 0.52));
        gradient.addColorStop(1, rgba(c.canvasSheen, 0));

        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(
          drawX,
          particle.y,
          particle.radius * 1.3,
          particle.radius * 3.2,
          Math.sin(particle.seed) * 0.18,
          0,
          Math.PI * 2,
        );
        context.fill();

        context.fillStyle = rgba(c.canvasSheen, alpha * 0.25);
        context.beginPath();
        context.arc(drawX, particle.y - particle.radius * 0.35, particle.radius * 0.4, 0, Math.PI * 2);
        context.fill();

        if (particle.y < -particle.radius * 8) {
          particles[index] = buildParticle(true);
        }
      });

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [c.canvasCore, c.canvasGlow, c.canvasSheen, isDark]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = isDark ? "light" : "dark";
    const nextColors = nextTheme === "dark" ? darkColors : lightColors;
    document.body.style.background = nextColors.bg;
    document.body.style.color = nextColors.text;
    window.localStorage.setItem("hvac-theme", nextTheme);
    setTheme(nextTheme);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const shellStyle: CSSProperties = {
    width: "min(1120px, calc(100% - 2rem))",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  };

  const sectionLabelStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.5rem 0.9rem",
    borderRadius: "999px",
    border: `1px solid ${c.border}`,
    background: c.bgPanel,
    color: c.accent,
    letterSpacing: "0.14em",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    backdropFilter: "blur(18px)",
  };

  const panelStyle: CSSProperties = {
    background: c.bgPanel,
    border: `1px solid ${c.border}`,
    borderRadius: "1.6rem",
    boxShadow: `0 24px 80px ${c.shadowSoft}`,
    backdropFilter: "blur(20px)",
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    borderRadius: "1rem",
    border: `1px solid ${c.border}`,
    background: c.input,
    color: c.text,
    padding: "0.95rem 1rem",
    fontSize: "0.98rem",
    outline: "none",
    boxShadow: `inset 0 0 0 1px ${c.accentMuted}`,
  };

  const services = [
    {
      title: "AC Repair",
      description:
        "Weak airflow, frozen coils, and noisy startups handled with diagnostics first, replacement second.",
      detail: "Built for same-day triage when comfort drops fast.",
      icon: RepairIcon,
    },
    {
      title: "Heating Tune-Ups",
      description:
        "Quiet furnace and heat-pump maintenance that catches pressure, ignition, and airflow issues before winter does.",
      detail: "For systems that should start clean and stay efficient.",
      icon: HeatIcon,
    },
    {
      title: "Maintenance Plans",
      description:
        "Seasonal inspections, filter cadence, and performance notes your team and your tenants can actually use.",
      detail: "The boring details that keep comfort predictable.",
      icon: ShieldIcon,
    },
    {
      title: "Smart Installations",
      description:
        "New system design with load, layout, and controls aligned before the equipment arrives on-site.",
      detail: "No overselling. No mystery sizing.",
      icon: CircuitIcon,
    },
  ];

  const trustBadges = [
    {
      title: "Licensed & insured",
      copy: "Clean documentation, covered crews, and clear arrival windows.",
      icon: ShieldIcon,
    },
    {
      title: "Emergency dispatch",
      copy: "Fast routing for loss-of-cooling calls when the schedule shifts.",
      icon: ClockIcon,
    },
    {
      title: "Maintenance reminders",
      copy: "Service cadence tracked before small issues become expensive ones.",
      icon: CalendarIcon,
    },
    {
      title: "Human follow-through",
      copy: "AI handles triage; a technician closes the loop before the truck rolls.",
      icon: CheckIcon,
    },
  ];

  const chatLines = [
    {
      role: "customer",
      label: "Homeowner",
      text: "Hi, I need a maintenance visit for the upstairs AC. Airflow is softer than usual.",
    },
    {
      role: "agent",
      label: "CoolPro AI",
      text: "I can help schedule that. Has the unit been serviced in the last 12 months?",
    },
    {
      role: "customer",
      label: "Homeowner",
      text: "No, it has been over a year. Afternoons are better this week.",
    },
    {
      role: "agent",
      label: "CoolPro AI",
      text: "I found a maintenance slot Thursday from 2:00 PM to 4:00 PM. I can hold it and note the airflow concern for the technician.",
    },
    {
      role: "customer",
      label: "Homeowner",
      text: "Perfect. Please book it.",
    },
    {
      role: "agent",
      label: "CoolPro AI",
      text: "Booked. You will get a confirmation text now and a technician reminder before arrival.",
    },
  ];

  const styles = `
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; }
    a { color: inherit; text-decoration: none; }
    button, input, select, textarea { font: inherit; }
    ::selection { background: ${c.accent}; color: ${c.bg}; }
    ::placeholder { color: ${c.textMuted}; opacity: 0.8; }
    .hvac-page {
      min-height: 100vh;
      background:
        linear-gradient(180deg, ${rgba(c.canvasSheen, isDark ? 0.015 : 0.32)}, transparent 26%),
        linear-gradient(180deg, ${c.bg} 0%, ${c.bgSoft} 48%, ${c.bg} 100%);
      color: ${c.text};
    }
    .hvac-panel-lift {
      transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease;
    }
    .hvac-panel-lift:hover {
      transform: translateY(-4px);
      border-color: ${c.borderStrong};
      box-shadow: 0 28px 80px ${c.glow};
    }
    .hvac-input:focus {
      border-color: ${c.borderStrong};
      box-shadow: 0 0 0 1px ${c.accentMuted}, 0 0 0 6px ${rgba(c.canvasCore, isDark ? 0.08 : 0.12)};
    }
    .hvac-link-line {
      position: relative;
    }
    .hvac-link-line::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.2rem;
      width: 100%;
      height: 1px;
      background: ${c.heroLine};
      transform: scaleX(0.3);
      transform-origin: left;
      transition: transform 180ms ease;
    }
    .hvac-link-line:hover::after {
      transform: scaleX(1);
    }
    @keyframes hvac-fade {
      from { opacity: 0; transform: translateY(26px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hvac-pulse {
      0%, 100% { opacity: 0.45; transform: scale(0.96); }
      50% { opacity: 1; transform: scale(1); }
    }
    .hvac-scroll-animate {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 500ms ease, transform 500ms ease;
    }
    .hvac-scroll-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .hvac-scroll-delay-1 { transition-delay: 100ms; }
    .hvac-scroll-delay-2 { transition-delay: 200ms; }
    .hvac-scroll-delay-3 { transition-delay: 300ms; }
    .hvac-scroll-delay-4 { transition-delay: 400ms; }
    .hvac-cta-primary {
      transition: transform 200ms ease, box-shadow 200ms ease, filter 200ms ease;
    }
    .hvac-cta-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 24px 68px ${c.glowStrong};
      filter: brightness(1.06);
    }
    .hvac-cta-secondary {
      transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
    }
    .hvac-cta-secondary:hover {
      transform: translateY(-2px);
      border-color: ${c.borderStrong};
      background: ${c.bgPanelStrong};
    }
    @media (max-width: 820px) {
      .hvac-nav-meta {
        width: 100%;
        justify-content: space-between;
      }
      .hvac-hero-copy {
        padding-top: 2.5rem;
      }
    }
    @media (max-width: 720px) {
      .hvac-services-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className={`${interBody.className} hvac-page`}>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            opacity: isDark ? 0.88 : 0.62,
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: c.heroGlow,
          }}
        />

        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(24px)",
            background: c.nav,
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          <div
            className="hvac-nav-bar"
            style={{
              ...shellStyle,
              minHeight: "5.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
              paddingTop: "0.8rem",
              paddingBottom: "0.8rem",
            }}
          >
            <a href="#top" aria-label="CoolPro HVAC home">
              <CoolingLogo accent={c.accent} textColor={c.text} />
            </a>

            <div
              className="hvac-nav-meta"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="tel:+1-555-014-2247"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.78rem 1rem",
                  borderRadius: "999px",
                  border: `1px solid ${c.border}`,
                  background: c.bgPanel,
                  color: c.text,
                }}
              >
                <PhoneIcon />
                <span style={{ letterSpacing: "0.06em", fontSize: "0.88rem" }}>
                  (555) 014-2247
                </span>
              </a>

              <a
                href="https://aexonai.com/#consultation"
                target="_blank"
                rel="noreferrer"
                className="hvac-link-line"
                style={{
                  color: c.textSoft,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "0.78rem",
                }}
              >
                Chat with our concierge
              </a>

              <button
                type="button"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
                style={{
                  width: "2.9rem",
                  height: "2.9rem",
                  borderRadius: "999px",
                  border: `1px solid ${c.border}`,
                  background: c.bgPanelStrong,
                  color: c.text,
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: `0 14px 36px ${c.shadowSoft}`,
                }}
              >
                {mounted ? (
                  isDark ? (
                    <SunIcon />
                  ) : (
                    <MoonIcon />
                  )
                ) : (
                  <span style={{ width: "1rem", height: "1rem", display: "block" }} />
                )}
              </button>
            </div>
          </div>
        </nav>

        <main id="top">
          <section
            style={{
              ...shellStyle,
              paddingTop: "5.2rem",
              paddingBottom: "6.2rem",
              textAlign: "center",
            }}
          >
            <div
              className="hvac-hero-copy"
              style={{
                position: "relative",
                zIndex: 1,
                animation: "hvac-fade 820ms ease both",
              }}
            >
              <div style={sectionLabelStyle}>
                <CoolingMark size={14} />
                <span>Hallmark HVAC Demo</span>
              </div>

              <div
                style={{
                  width: "min(46rem, 100%)",
                  margin: "1.5rem auto 0",
                  padding: "1.1rem 0 0",
                }}
              >
                <p
                  style={{
                    color: c.textMuted,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                    margin: 0,
                  }}
                >
                  Less noise. Better airflow. Zero guesswork.
                </p>

                <h1
                  className={interDisplay.className}
                  style={{
                    margin: "1rem 0 0",
                    color: c.text,
                    fontSize: "clamp(3.6rem, 11vw, 7.2rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.07em",
                    textShadow: c.headlineShadow,
                  }}
                >
                  Cool air.
                  <br />
                  <span style={{ color: c.accent }}>Always.</span>
                </h1>

                <p
                  style={{
                    width: "min(41rem, 100%)",
                    margin: "1.6rem auto 0",
                    color: c.textSoft,
                    fontSize: "1.08rem",
                    lineHeight: 1.8,
                  }}
                >
                  Premium HVAC care for homes that need a clean diagnosis, a clear
                  timeline, and a system that feels invisible once it is working
                  right. Repairs, upgrades, and maintenance handled with calm,
                  technical precision.
                </p>

                <div
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.9rem",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="#contact"
                    className="hvac-cta-primary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.95rem 1.4rem",
                      borderRadius: "999px",
                      background: c.accent,
                      color: c.bg,
                      boxShadow: `0 18px 54px ${c.glowStrong}`,
                      fontWeight: 700,
                    }}
                  >
                    Get a free quote
                    <ArrowIcon />
                  </a>

                  <a
                    href="#agent-demo"
                    className="hvac-cta-secondary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.95rem 1.4rem",
                      borderRadius: "999px",
                      border: `1px solid ${c.border}`,
                      background: c.bgPanel,
                      color: c.text,
                    }}
                  >
                    Chat with our concierge
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="services"
            style={{
              ...shellStyle,
              paddingBottom: "6.8rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "1.9rem",
              }}
            >
              <div>
                <div style={sectionLabelStyle}>Service stack</div>
                <h2
                  className={interDisplay.className}
                  style={{
                    margin: "1rem 0 0",
                    color: c.text,
                    fontSize: "clamp(2.2rem, 6vw, 4rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.05em",
                  }}
                >
                  Four ways we keep the air clean, quiet, and dependable.
                </h2>
              </div>

              <p
                style={{
                  width: "min(25rem, 100%)",
                  margin: 0,
                  color: c.textMuted,
                  lineHeight: 1.7,
                }}
              >
                Hallmark HVAC stays centered and service-first. No bento gimmicks,
                no borrowed orbital background, and no fake proof points.
              </p>
            </div>

            <div
              className="hvac-services-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1.1rem",
              }}
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                const isHovered = hoveredService === index;
                const delayClass = `hvac-scroll-delay-${(index % 4) + 1}`;

                return (
                  <article
                    key={service.title}
                    className={`hvac-panel-lift hvac-scroll-animate ${delayClass}`}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    style={{
                      ...panelStyle,
                      padding: "1.75rem",
                      minHeight: "17.5rem",
                      textAlign: "center",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      borderColor: isHovered ? c.borderStrong : c.border,
                      boxShadow: isHovered
                        ? `0 32px 90px ${c.glow}`
                        : `0 18px 60px ${c.shadowSoft}`,
                    }}
                  >
                    <div
                      style={{
                        width: "3.8rem",
                        height: "3.8rem",
                        borderRadius: "1.2rem",
                        margin: "0 auto",
                        display: "grid",
                        placeItems: "center",
                        color: c.accent,
                        border: `1px solid ${c.border}`,
                        background: c.accentMuted,
                        boxShadow: `0 0 38px ${c.glow}`,
                      }}
                    >
                      <Icon />
                    </div>

                    <h3
                      className={interDisplay.className}
                      style={{
                        margin: "1.25rem 0 0",
                        color: c.text,
                        fontSize: "1.55rem",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        margin: "0.95rem 0 0",
                        color: c.textSoft,
                        lineHeight: 1.75,
                        fontSize: "0.99rem",
                      }}
                    >
                      {service.description}
                    </p>

                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        margin: "1.25rem 0 1rem",
                        background: c.heroLine,
                      }}
                    />

                    <p
                      style={{
                        margin: 0,
                        color: c.textMuted,
                        lineHeight: 1.65,
                        fontSize: "0.9rem",
                      }}
                    >
                      {service.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            id="agent-demo"
            style={{
              ...shellStyle,
              paddingBottom: "6.8rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.4rem",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  ...panelStyle,
                  padding: "1.9rem",
                  display: "grid",
                  alignContent: "start",
                  gap: "1.2rem",
                }}
              >
                <div style={sectionLabelStyle}>
                  <ChatIcon size={16} />
                  <span>Concierge Agent</span>
                </div>

                <h2
                  className={interDisplay.className}
                  style={{
                    margin: 0,
                    color: c.text,
                    fontSize: "clamp(2.1rem, 5vw, 3.6rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.05em",
                  }}
                >
                  Scheduling that feels calm before a human ever picks up the phone.
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: c.textSoft,
                    lineHeight: 1.8,
                    fontSize: "1rem",
                  }}
                >
                  This widget is intentionally concrete: the agent confirms the
                  issue, narrows the window, flags the airflow note, and hands a
                  ready appointment to dispatch without pretending to replace the
                  technician.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "0.8rem",
                    marginTop: "0.4rem",
                  }}
                >
                  {[
                    "Captures maintenance intent without a dead-end form.",
                    "Pins the appointment window and the reason for the visit.",
                    "Creates a cleaner handoff from AI triage to field tech.",
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "start",
                        color: c.textSoft,
                      }}
                    >
                      <span
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          flex: "0 0 auto",
                          borderRadius: "999px",
                          background: c.accentMuted,
                          color: c.accent,
                          display: "grid",
                          placeItems: "center",
                          marginTop: "0.1rem",
                        }}
                      >
                        <CheckIcon size={12} />
                      </span>
                      <span style={{ lineHeight: 1.75 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  ...panelStyle,
                  padding: "1.2rem",
                  display: "grid",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "0.9rem 1rem",
                    borderRadius: "1.2rem",
                    background: c.bgPanelStrong,
                    border: `1px solid ${c.border}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <div
                      style={{
                        width: "2.7rem",
                        height: "2.7rem",
                        borderRadius: "999px",
                        background: c.accentMuted,
                        color: c.accent,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <ChatIcon />
                    </div>
                    <div>
                      <div
                        className={interDisplay.className}
                        style={{
                          color: c.text,
                          fontSize: "1rem",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        CoolPro AI Dispatch
                      </div>
                      <div style={{ color: c.textMuted, fontSize: "0.88rem" }}>
                        Maintenance scheduling flow
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: c.accent,
                      fontSize: "0.78rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        width: "0.62rem",
                        height: "0.62rem",
                        borderRadius: "999px",
                        background: c.accent,
                        animation: "hvac-pulse 2.2s ease-in-out infinite",
                      }}
                    />
                    Agent active
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "0.8rem",
                  }}
                >
                  {chatLines.map((line, index) => {
                    const isAgent = line.role === "agent";
                    return (
                      <div
                        key={`${line.label}-${index}`}
                        style={{
                          display: "flex",
                          justifyContent: isAgent ? "flex-start" : "flex-end",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "88%",
                            padding: "0.95rem 1rem",
                            borderRadius: isAgent
                              ? "1.2rem 1.2rem 1.2rem 0.4rem"
                              : "1.2rem 1.2rem 0.4rem 1.2rem",
                            border: `1px solid ${isAgent ? c.border : c.borderStrong}`,
                            background: isAgent ? c.bgPanelStrong : c.accentMuted,
                            color: c.text,
                            boxShadow: `0 16px 40px ${c.shadowSoft}`,
                          }}
                        >
                          <div
                            style={{
                              color: isAgent ? c.accent : c.textSoft,
                              fontSize: "0.74rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.14em",
                              marginBottom: "0.45rem",
                            }}
                          >
                            {line.label}
                          </div>
                          <p
                            style={{
                              margin: 0,
                              lineHeight: 1.68,
                              color: c.textSoft,
                            }}
                          >
                            {line.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "0.8rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  }}
                >
                  {[
                    {
                      label: "Reserved window",
                      value: "Thu 2:00 PM - 4:00 PM",
                      icon: CalendarIcon,
                    },
                    {
                      label: "Visit type",
                      value: "Maintenance + airflow note",
                      icon: CoolingMark,
                    },
                    {
                      label: "Customer update",
                      value: "Text confirmation sent",
                      icon: CheckIcon,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        style={{
                          padding: "1rem",
                          borderRadius: "1.15rem",
                          border: `1px solid ${c.border}`,
                          background: c.bgPanel,
                          display: "grid",
                          gap: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            width: "2.2rem",
                            height: "2.2rem",
                            borderRadius: "999px",
                            background: c.accentMuted,
                            color: c.accent,
                            placeItems: "center",
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <span
                          style={{
                            color: c.textMuted,
                            fontSize: "0.74rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          className={interDisplay.className}
                          style={{
                            color: c.text,
                            fontSize: "1rem",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              ...shellStyle,
              paddingBottom: "6.8rem",
            }}
          >
            <div
              style={{
                marginBottom: "1.9rem",
              }}
            >
              <div style={sectionLabelStyle}>Trust badges</div>
              <h2
                className={interDisplay.className}
                style={{
                  margin: "1rem 0 0",
                  color: c.text,
                  fontSize: "clamp(2rem, 4.8vw, 3.2rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.05em",
                }}
              >
                Proof framed as operating discipline, not inflated numbers.
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <article
                    key={badge.title}
                    style={{
                      ...panelStyle,
                      padding: "1.35rem",
                      display: "grid",
                      gap: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "999px",
                        border: `1px solid ${c.border}`,
                        background: c.accentMuted,
                        color: c.accent,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon />
                    </div>
                    <h3
                      className={interDisplay.className}
                      style={{
                        margin: 0,
                        color: c.text,
                        fontSize: "1.18rem",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {badge.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: c.textMuted,
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                      }}
                    >
                      {badge.copy}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            id="contact"
            style={{
              ...shellStyle,
              paddingBottom: "6rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.3rem",
              }}
            >
              <div
                style={{
                  ...panelStyle,
                  padding: "1.9rem",
                  display: "grid",
                  gap: "1.2rem",
                  alignContent: "start",
                }}
              >
                <div style={sectionLabelStyle}>Contact form</div>

                <h2
                  className={interDisplay.className}
                  style={{
                    margin: 0,
                    color: c.text,
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.05em",
                  }}
                >
                  Tell us what the system is doing before it becomes a real problem.
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: c.textSoft,
                    lineHeight: 1.8,
                  }}
                >
                  This demo keeps the form practical. We ask for the details a
                  dispatcher needs, then return a calm confirmation instead of a
                  hard reload.
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "0.85rem",
                    marginTop: "0.35rem",
                  }}
                >
                  {[
                    {
                      icon: PhoneIcon,
                      label: "Call",
                      value: "(555) 014-2247",
                      href: "tel:+1-555-014-2247",
                    },
                    {
                      icon: MailIcon,
                      label: "Email",
                      value: "dispatch@coolprohvac.demo",
                      href: "mailto:dispatch@coolprohvac.demo",
                    },
                    {
                      icon: PinIcon,
                      label: "Service area",
                      value: "Metro coverage with planned maintenance routes",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div
                        style={{
                          display: "flex",
                          gap: "0.8rem",
                          alignItems: "start",
                          padding: "0.95rem 1rem",
                          borderRadius: "1.1rem",
                          background: c.bgPanelStrong,
                          border: `1px solid ${c.border}`,
                        }}
                      >
                        <div
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "999px",
                            background: c.accentMuted,
                            color: c.accent,
                            display: "grid",
                            placeItems: "center",
                            flex: "0 0 auto",
                          }}
                        >
                          <Icon />
                        </div>
                        <div style={{ display: "grid", gap: "0.25rem" }}>
                          <span
                            style={{
                              color: c.textMuted,
                              fontSize: "0.74rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.14em",
                            }}
                          >
                            {item.label}
                          </span>
                          <span style={{ color: c.textSoft, lineHeight: 1.6 }}>
                            {item.value}
                          </span>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a key={item.label} href={item.href}>
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  ...panelStyle,
                  padding: "1.4rem",
                }}
              >
                {!submitted ? (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "grid",
                      gap: "0.95rem",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "0.95rem",
                      }}
                    >
                      <label style={{ display: "grid", gap: "0.45rem" }}>
                        <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>Name</span>
                        <input
                          className="hvac-input"
                          style={inputStyle}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Alex Morgan"
                          required
                        />
                      </label>

                      <label style={{ display: "grid", gap: "0.45rem" }}>
                        <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>Phone</span>
                        <input
                          className="hvac-input"
                          style={inputStyle}
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 555-0123"
                          required
                        />
                      </label>
                    </div>

                    <label style={{ display: "grid", gap: "0.45rem" }}>
                      <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>Email</span>
                      <input
                        className="hvac-input"
                        style={inputStyle}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </label>

                    <label style={{ display: "grid", gap: "0.45rem" }}>
                      <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>Address</span>
                      <input
                        className="hvac-input"
                        style={inputStyle}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="1234 Harbor View Drive"
                        required
                      />
                    </label>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "0.95rem",
                      }}
                    >
                      <label style={{ display: "grid", gap: "0.45rem" }}>
                        <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>AC unit age</span>
                        <select
                          className="hvac-input"
                          style={inputStyle}
                          name="unitAge"
                          value={formData.unitAge}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="under-5">Under 5 years</option>
                          <option value="5-10">5 to 10 years</option>
                          <option value="10-15">10 to 15 years</option>
                          <option value="15-plus">15+ years</option>
                        </select>
                      </label>

                      <label style={{ display: "grid", gap: "0.45rem" }}>
                        <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>Service needed</span>
                        <select
                          className="hvac-input"
                          style={inputStyle}
                          name="serviceNeeded"
                          value={formData.serviceNeeded}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="repair">Repair</option>
                          <option value="installation">Installation</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="replacement">Replacement</option>
                        </select>
                      </label>

                      <label style={{ display: "grid", gap: "0.45rem" }}>
                        <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>Urgency</span>
                        <select
                          className="hvac-input"
                          style={inputStyle}
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="not-urgent">Not urgent</option>
                          <option value="some-urgency">Some urgency</option>
                          <option value="urgent">Urgent</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </label>
                    </div>

                    <label style={{ display: "grid", gap: "0.45rem" }}>
                      <span style={{ color: c.textMuted, fontSize: "0.88rem" }}>
                        Additional notes
                      </span>
                      <textarea
                        className="hvac-input"
                        style={{
                          ...inputStyle,
                          minHeight: "8.2rem",
                          resize: "vertical",
                        }}
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Weak airflow upstairs, rattling on startup, or anything else worth flagging."
                      />
                    </label>

                    <button
                      type="submit"
                      style={{
                        marginTop: "0.3rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.65rem",
                        width: "100%",
                        padding: "1rem 1.25rem",
                        borderRadius: "1rem",
                        border: "none",
                        background: c.accent,
                        color: c.bg,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: `0 20px 56px ${c.glowStrong}`,
                      }}
                    >
                      Book your consultation
                      <ArrowIcon />
                    </button>
                  </form>
                ) : (
                  <div
                    style={{
                      minHeight: "100%",
                      display: "grid",
                      placeItems: "center",
                      padding: "2.2rem 1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "min(28rem, 100%)",
                        textAlign: "center",
                        padding: "2rem",
                        borderRadius: "1.6rem",
                        background: c.successBg,
                        border: `1px solid ${c.successBorder}`,
                        boxShadow: `0 24px 70px ${c.glow}`,
                      }}
                    >
                      <div
                        style={{
                          width: "4rem",
                          height: "4rem",
                          margin: "0 auto 1rem",
                          borderRadius: "999px",
                          background: c.accentMuted,
                          color: c.accent,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <CheckIcon size={24} />
                      </div>

                      <h3
                        className={interDisplay.className}
                        style={{
                          margin: 0,
                          color: c.text,
                          fontSize: "2rem",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        We&apos;ll be in touch within 2 hours.
                      </h3>

                      <p
                        style={{
                          margin: "0.9rem 0 0",
                          color: c.textSoft,
                          lineHeight: 1.75,
                        }}
                      >
                        Your request is staged like a real dispatch handoff: issue
                        details captured, urgency recorded, and a human callback next.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <footer
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: `1px solid ${c.border}`,
            background: c.footer,
          }}
        >
          <div
            style={{
              ...shellStyle,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              paddingTop: "1.8rem",
              paddingBottom: "2rem",
            }}
          >
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <CoolingLogo accent={c.accent} textColor={c.text} />
              <p
                style={{
                  margin: 0,
                  color: c.textMuted,
                  lineHeight: 1.7,
                }}
              >
                HVAC design language built as a manifesto page: centered hero,
                refrigerant mist, quiet UI chrome, and clear service routing.
              </p>
            </div>

            <div style={{ display: "grid", gap: "0.65rem", alignContent: "start" }}>
              <span
                style={{
                  color: c.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: "0.74rem",
                }}
              >
                Links
              </span>
              <a href="#services" className="hvac-link-line" style={{ width: "fit-content" }}>
                Services
              </a>
              <a href="#agent-demo" className="hvac-link-line" style={{ width: "fit-content" }}>
                Chat with our concierge
              </a>
              <a href="#contact" className="hvac-link-line" style={{ width: "fit-content" }}>
                Contact
              </a>
            </div>

            <div style={{ display: "grid", gap: "0.65rem", alignContent: "start" }}>
              <span
                style={{
                  color: c.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: "0.74rem",
                }}
              >
                Contact
              </span>
              <a href="tel:+1-555-014-2247">(555) 014-2247</a>
              <a href="mailto:dispatch@coolprohvac.demo">dispatch@coolprohvac.demo</a>
              <span style={{ color: c.textSoft }}>Metro comfort coverage</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
