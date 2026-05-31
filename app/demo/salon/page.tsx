"use client";

import { useState, useEffect, useRef } from "react";

// ── Color Palettes ────────────────────────────────────────────────────────────
const darkTheme = {
  bg: "#0D0611",
  surface: "rgba(255,255,255,0.04)",
  text: "#F5F0F7",
  accent: "#F472B6",
  secondary: "#C084FC",
  warmAccent: "#EC4899",
  border: "rgba(244,114,182,0.15)",
  card: "rgba(255,255,255,0.05)",
  glow: "rgba(244,114,182,0.25)",
  navBg: "rgba(13,6,17,0.92)",
  inputBg: "rgba(255,255,255,0.05)",
  footerBg: "#08040D",
  muted: "rgba(245,240,247,0.5)",
  secondaryText: "#A78BFA",
  cardHover: "rgba(244,114,182,0.08)",
  gradientAccent: "linear-gradient(135deg, #F472B6, #C084FC)",
  gradientWarm: "linear-gradient(135deg, #EC4899, #F472B6)",
};

const lightTheme = {
  bg: "#FDF2F8",
  surface: "rgba(255,255,255,0.8)",
  text: "#1c1917",
  accent: "#db2777",
  secondary: "#a855f7",
  warmAccent: "#be185d",
  border: "rgba(219,39,119,0.15)",
  card: "rgba(255,255,255,0.95)",
  glow: "rgba(219,39,119,0.2)",
  navBg: "rgba(253,242,248,0.95)",
  inputBg: "rgba(255,255,255,0.9)",
  footerBg: "#FBC8E8",
  muted: "rgba(28,25,23,0.5)",
  secondaryText: "#9333EA",
  cardHover: "rgba(219,39,119,0.06)",
  gradientAccent: "linear-gradient(135deg, #db2777, #a855f7)",
  gradientWarm: "linear-gradient(135deg, #be185d, #db2777)",
};

// ── Canvas Animation ──────────────────────────────────────────────────────────
function PolishDripCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Drip {
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      color: string;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      color: string;
    }

    const drips: Drip[] = Array.from({ length: 8 }, (_, i) => ({
      x: canvas.width * (0.08 + i * 0.12),
      y: Math.random() * -100,
      speed: 1.2 + Math.random() * 0.8,
      length: 60 + Math.random() * 40,
      opacity: 0.4 + (i % 4) * 0.08,
      color: isDark ? "#F472B6" : "#db2777",
    }));

    const particles: Particle[] = Array.from({ length: 4 }, (_, i) => ({
      x: canvas.width * (0.15 + i * 0.25),
      y: canvas.height * (0.6 + Math.random() * 0.3),
      vx: 0.3 + Math.random() * 0.2,
      vy: -0.8 - Math.random() * 0.4,
      size: 2 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.2,
      life: 1,
      color: isDark ? "#C084FC" : "#a855f7",
    }));

    let frame: number;
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseOpacity = isDark ? 0.6 : 0.4;
      const dripColor = isDark ? "#F472B6" : "#db2777";
      const particleColor = isDark ? "#C084FC" : "#a855f7";

      // Polish drips
      drips.forEach((drip) => {
        const gradient = ctx.createLinearGradient(drip.x, drip.y, drip.x, drip.y + drip.length);
        gradient.addColorStop(0, `rgba(${isDark ? "244,114,182" : "219,39,119"},${drip.opacity * baseOpacity})`);
        gradient.addColorStop(0.5, `rgba(${isDark ? "192,132,252" : "168,85,247"},${drip.opacity * baseOpacity * 0.7})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.moveTo(drip.x - 1.5, drip.y);
        ctx.lineTo(drip.x + 1.5, drip.y);
        ctx.lineTo(drip.x + 0.5, drip.y + drip.length);
        ctx.lineTo(drip.x - 0.5, drip.y + drip.length);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Head blob
        ctx.beginPath();
        ctx.arc(drip.x, drip.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isDark ? "244,114,182" : "219,39,119"},${drip.opacity * baseOpacity})`;
        ctx.fill();

        drip.y += drip.speed;
        if (drip.y > canvas.height + 100) {
          drip.y = -drip.length - Math.random() * 50;
          drip.x = canvas.width * (0.05 + Math.random() * 0.9);
        }
      });

      // Shimmer particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isDark ? "192,132,252" : "168,85,247"},${p.opacity * baseOpacity})`;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 15, p.y - p.vy * 15);
        ctx.strokeStyle = `rgba(${isDark ? "244,114,182" : "219,39,119"},${p.opacity * baseOpacity * 0.4})`;
        ctx.lineWidth = p.size * 0.6;
        ctx.stroke();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10 || p.x > canvas.width + 10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });

      frame = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
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
  );
}

// ── Icons (SVG) ────────────────────────────────────────────────────────────────
const Icons = {
  Heart: ({ color }: { color?: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color || "currentColor"}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Scissors: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" />
    </svg>
  ),
  Droplet: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Flower: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M12 16a3 3 0 0 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M4.93 4.93a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24z" />
      <path d="M19.07 19.07a3 3 0 0 0-4.24-4.24 3 3 0 0 0 4.24 4.24z" />
      <path d="M2 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0z" />
      <path d="M16 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0z" />
    </svg>
  ),
  Star: ({ filled }: { filled?: boolean }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Phone: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

// ── Services Data ─────────────────────────────────────────────────────────────
const services = [
  {
    icon: <Icons.Scissors />,
    title: "Hair Styling",
    desc: "Precision cuts, balayage, blowouts, and keratin treatments by award-winning stylists.",
    tag: "From $85",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
  },
  {
    icon: <Icons.Sparkle />,
    title: "Facial & Skin",
    desc: "Clinical facials, chemical peels, microneedling, and glow-boosting treatments.",
    tag: "From $95",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
  },
  {
    icon: <Icons.Droplet />,
    title: "Nails & Spa",
    desc: "Gel manicures, pedicures, nail art, and luxurious hand and foot treatments.",
    tag: "From $45",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
  },
  {
    icon: <Icons.Flower />,
    title: "Body Treatments",
    desc: "Body wraps, scrubs, aromatherapy massage, and contouring sessions.",
    tag: "From $120",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
  },
];

const trustBadges = [
  "Licensed Esthéticians",
  "5-Star Salon",
  "Organic Products",
  "Same-Day Availability",
];

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "8,400+", label: "Happy Clients" },
  { value: "4.9", label: "Star Rating" },
  { value: "200+", label: "Products Used" },
];

const whyUsCards = [
  {
    title: "Expert Team",
    desc: "Our licensed estheticians and stylists bring decades of combined experience to every appointment.",
  },
  {
    title: "Premium Products",
    desc: "We exclusively use organic, cruelty-free products from the world's most trusted beauty brands.",
  },
  {
    title: "Personalized Care",
    desc: "Every treatment is customized to your unique skin, hair, and wellness needs for maximum results.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, tag, imageUrl, c }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
  imageUrl: string;
  c: typeof darkTheme;
}) {
  return (
    <div
      className="service-card"
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
      }}
    >
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.85)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="service-img"
        />
        <div
          className="shimmer-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "50%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${c.glow}, transparent)`,
            pointerEvents: "none",
            transition: "left 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <div style={{ padding: "1.75rem 1.5rem 2rem", textAlign: "center" }}>
        <div style={{ color: c.accent, marginBottom: "0.75rem", display: "flex", justifyContent: "center" }}>
          {icon}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-cinzel), 'Cinzel', serif",
            fontSize: "0.8125rem",
            letterSpacing: "0.18em",
            color: c.text,
            marginBottom: "0.75rem",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: c.secondaryText,
            lineHeight: 1.65,
            marginBottom: "1.25rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {desc}
        </p>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-cinzel), 'Cinzel', serif",
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            color: c.secondary,
            border: `1px solid ${c.border}`,
            padding: "0.2rem 0.75rem",
            borderRadius: "20px",
            fontWeight: 500,
          }}
        >
          {tag}
        </span>
      </div>
      <style>{`
        .service-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 60px ${c.glow}, 0 0 0 1px ${c.border}; border-color: ${c.accent}40; }
        .service-card:hover .shimmer-overlay { left: 150%; }
        .service-card:hover .service-img { transform: scale(1.05); }
      `}</style>
    </div>
  );
}

function WhyUsCard({ title, desc, c, isDark }: {
  title: string;
  desc: string;
  c: typeof darkTheme;
  isDark: boolean;
}) {
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: "16px",
        padding: "2rem 1.75rem",
        textAlign: "center",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      className="why-card"
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: c.gradientAccent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.25rem",
          boxShadow: `0 0 20px ${c.glow}`,
        }}
      >
        <span style={{ color: isDark ? "#0D0611" : "#fff", fontSize: "0.875rem", fontWeight: 700 }}>
          ✦
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "1.375rem",
          fontWeight: 700,
          color: c.text,
          marginBottom: "0.75rem",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.875rem",
          color: c.muted,
          lineHeight: 1.7,
          fontFamily: "'DM Sans', sans-serif",
          margin: 0,
        }}
      >
        {desc}
      </p>
      <style>{`
        .why-card:hover { transform: translateY(-6px); border-color: ${c.accent}40; box-shadow: 0 12px 40px ${c.glow}; }
      `}</style>
    </div>
  );
}

function FormField({ label, name, type, placeholder, value, onChange, required, c }: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  c: typeof darkTheme;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        style={{
          fontFamily: "var(--font-cinzel), 'Cinzel', serif",
          fontSize: "0.625rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: c.secondaryText,
          fontWeight: 600,
        }}
      >
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
          border: `1px solid ${c.border}`,
          borderRadius: "10px",
          color: c.text,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9375rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          backdropFilter: "blur(8px)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = `${c.accent}80`;
          e.target.style.boxShadow = `0 0 0 3px ${c.glow}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = c.border;
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required, c }: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  c: typeof darkTheme;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        style={{
          fontFamily: "var(--font-cinzel), 'Cinzel', serif",
          fontSize: "0.625rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: c.secondaryText,
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          background: c.inputBg,
          border: `1px solid ${c.border}`,
          borderRadius: "10px",
          color: c.text,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9375rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='${encodeURIComponent(c.secondaryText)}' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          paddingRight: "2.5rem",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = `${c.accent}80`;
          e.target.style.boxShadow = `0 0 0 3px ${c.glow}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = c.border;
          e.target.style.boxShadow = "none";
        }}
      >
        <option value="">Select service...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({ label, name, placeholder, value, onChange, c }: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  c: typeof darkTheme;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        style={{
          fontFamily: "var(--font-cinzel), 'Cinzel', serif",
          fontSize: "0.625rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: c.secondaryText,
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          background: c.inputBg,
          border: `1px solid ${c.border}`,
          borderRadius: "10px",
          color: c.text,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9375rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          resize: "vertical",
          minHeight: "96px",
          backdropFilter: "blur(8px)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = `${c.accent}80`;
          e.target.style.boxShadow = `0 0 0 3px ${c.glow}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = c.border;
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function SalonPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("salon-theme");
    if (stored !== null) {
      setIsDark(stored === "dark");
    } else {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("salon-theme", newIsDark ? "dark" : "light");
  };

  const c = isDark ? darkTheme : lightTheme;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600&family=Cinzel:wght@400;500;600&display=swap');
        html, body { background: ${c.bg}; transition: background 0.4s ease; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
      `}</style>

      {/* Canvas Animation */}
      <PolishDripCanvas isDark={isDark} />

      {/* Page */}
      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", color: c.text, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Nav ────────────────────────────────────────────────────────────── */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2.5rem",
            borderBottom: `1px solid ${c.border}`,
            background: c.navBg,
            backdropFilter: "blur(20px)",
            transition: "background 0.4s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ color: c.accent, display: "flex", alignItems: "center" }}>
              <Icons.Heart />
            </span>
            <span
              style={{
                fontFamily: "var(--font-cinzel), 'Cinzel', serif",
                fontSize: "0.9375rem",
                letterSpacing: "0.2em",
                color: c.text,
                fontWeight: 600,
              }}
            >
              GLOW STUDIO
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  background: "transparent",
                  border: `1px solid ${c.border}`,
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: c.text,
                  transition: "all 0.2s",
                  padding: 0,
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = c.surface; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = "transparent"; }}
              >
                {isDark ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            )}
            <a
              href="#book"
              style={{
                fontFamily: "var(--font-cinzel), 'Cinzel', serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                color: isDark ? c.accent : c.accent,
                background: c.gradientAccent,
                padding: "0.5rem 1.25rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 600,
                boxShadow: `0 0 20px ${c.glow}`,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.target as HTMLAnchorElement).style.boxShadow = `0 4px 24px ${c.glow}`; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.transform = "translateY(0)"; (e.target as HTMLAnchorElement).style.boxShadow = `0 0 20px ${c.glow}`; }}
            >
              Book Now
            </a>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section style={{ padding: "7rem 2.5rem 5rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {["Los Angeles, CA", "♡", "Open 7 Days", "♡", "By Appointment"].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-cinzel), 'Cinzel', serif",
                  fontSize: "0.625rem",
                  letterSpacing: "0.15em",
                  color: c.secondaryText,
                  border: `1px solid ${c.border}`,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "20px",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <h1 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 0.9, marginBottom: "2rem", letterSpacing: "-0.01em" }}>
            <span style={{ display: "block", color: c.text }}>GLOW STUDIO</span>
            <span style={{ display: "block", fontSize: "0.55em", fontWeight: 500, fontStyle: "italic", background: c.gradientAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginTop: "0.25em" }}>
              SALON & SPA
            </span>
          </h1>

          <p style={{ fontSize: "1.125rem", color: c.secondaryText, lineHeight: 1.75, maxWidth: "480px", margin: "0 auto 2.5rem", fontStyle: isDark ? "normal" : "italic" }}>
            Your Glow, Elevated.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a
              href="#book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2.5rem",
                background: c.gradientAccent,
                color: isDark ? "#0D0611" : "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: "50px",
                letterSpacing: "0.02em",
                boxShadow: `0 0 32px ${c.glow}`,
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.02)"; (e.target as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${c.glow}`; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.transform = "translateY(0) scale(1)"; (e.target as HTMLAnchorElement).style.boxShadow = `0 0 32px ${c.glow}`; }}
            >
              Book Your Glow-Up
            </a>
            <a
              href="#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                background: "transparent",
                color: c.text,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "50px",
                border: `1px solid ${c.border}`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.borderColor = `${c.accent}50`; (e.target as HTMLAnchorElement).style.background = c.surface; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.borderColor = c.border; (e.target as HTMLAnchorElement).style.background = "transparent"; }}
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0" }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 2rem", borderRight: i < stats.length - 1 ? `1px solid ${c.border}` : "none" }}>
                <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: c.text, lineHeight: 1, marginBottom: "0.25rem" }}>
                  {stat.value}
                </span>
                <span style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: c.secondaryText }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust Badges ────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0",
            padding: "1.5rem 2rem",
            borderTop: `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            background: c.surface,
          }}
        >
          {trustBadges.map((badge, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontFamily: "var(--font-cinzel), 'Cinzel', serif",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                color: c.secondary,
                padding: "0.5rem 1.5rem",
                borderRight: i < trustBadges.length - 1 ? `1px solid ${c.border}` : "none",
              }}
            >
              <span style={{ color: c.accent, display: "flex", alignItems: "center" }}><Icons.Check /></span>
              {badge}
            </span>
          ))}
        </div>

        {/* ── Services Grid ──────────────────────────────────────────────────── */}
        <section id="services" style={{ padding: "4rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: c.accent, display: "block", marginBottom: "0.75rem" }}>
              What We Offer
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: c.text, lineHeight: 1.1, margin: 0 }}>
              Our Services
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} c={c} />
            ))}
          </div>
        </section>

        {/* ── Why Us ─────────────────────────────────────────────────────────── */}
        <section style={{ padding: "4rem 2.5rem", maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: c.accent, display: "block", marginBottom: "0.75rem" }}>
              The Glow Difference
            </span>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: c.text, lineHeight: 1.1, margin: 0 }}>
              Why Choose Us
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {whyUsCards.map((card, i) => (
              <WhyUsCard key={i} {...card} c={c} isDark={isDark} />
            ))}
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
        <section style={{ padding: "5rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: c.gradientAccent,
              opacity: isDark ? 0.15 : 0.1,
              zIndex: 0,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: c.text, lineHeight: 1.05, marginBottom: "1rem" }}>
              Ready to Glow?
            </h2>
            <p style={{ fontSize: "1rem", color: c.muted, marginBottom: "2rem", lineHeight: 1.7 }}>
              Book your appointment today and let our expert team bring out your best glow.
            </p>
            <a
              href="#book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2.5rem",
                background: c.gradientAccent,
                color: isDark ? "#0D0611" : "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: "50px",
                boxShadow: `0 0 40px ${c.glow}`,
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.03)"; (e.target as HTMLAnchorElement).style.boxShadow = `0 8px 40px ${c.glow}`; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.transform = "translateY(0) scale(1)"; (e.target as HTMLAnchorElement).style.boxShadow = `0 0 40px ${c.glow}`; }}
            >
              Book Your Glow-Up
              <span style={{ display: "flex", alignItems: "center" }}><Icons.Arrow /></span>
            </a>
          </div>
        </section>

        {/* ── Booking Form ───────────────────────────────────────────────────── */}
        <section id="book" style={{ padding: "4rem 2.5rem", maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: c.text, lineHeight: 1.1, marginBottom: "0.5rem" }}>
              Reserve Your Spot
            </h2>
            <p style={{ fontSize: "0.9375rem", color: c.secondaryText, margin: 0 }}>
              We&apos;ll confirm your appointment within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 2rem",
                border: `1px solid ${c.border}`,
                borderRadius: "16px",
                background: c.surface,
              }}
            >
              <div style={{ color: c.accent, fontSize: "2.5rem", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                <Icons.Heart color={c.accent} />
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: c.text, marginBottom: "0.75rem" }}>
                You&apos;re Booked!
              </h3>
              <p style={{ color: c.secondaryText, fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
                We&apos;ll send a confirmation to {formData.email || "your email"}. See you soon!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: "16px",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Shimmer overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "60%",
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, ${c.glow}20, transparent)`,
                  animation: "formShimmer 4s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
              <style>{`
                @keyframes formShimmer {
                  0% { left: -100%; }
                  50% { left: 150%; }
                  100% { left: 150%; }
                }
              `}</style>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <FormField label="Full Name" name="name" type="text" placeholder="Aaliyah Johnson" value={formData.name} onChange={handleChange} required c={c} />
                <FormField label="Phone" name="phone" type="tel" placeholder="(310) 555-0000" value={formData.phone} onChange={handleChange} required c={c} />
              </div>
              <FormField label="Email" name="email" type="email" placeholder="aaliyah@example.com" value={formData.email} onChange={handleChange} required c={c} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <SelectField
                  label="Service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                  options={["Hair Styling", "Facial & Skin", "Nails & Spa", "Body Treatments", "Full Day Package"]}
                  required
                  c={c}
                />
                <FormField label="Preferred Date" name="date" type="date" placeholder="" value={formData.date} onChange={handleChange} required c={c} />
              </div>
              <TextareaField label="Special Requests" name="message" placeholder=" Any skin allergies, nail art inspiration, or preferences..." value={formData.message} onChange={handleChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void} c={c} />
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem 2rem",
                  background: c.gradientAccent,
                  color: isDark ? "#0D0611" : "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  letterSpacing: "0.03em",
                  boxShadow: `0 0 28px ${c.glow}`,
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  marginTop: "0.5rem",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.target as HTMLButtonElement).style.boxShadow = `0 4px 48px ${c.glow}`; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = "translateY(0)"; (e.target as HTMLButtonElement).style.boxShadow = `0 0 28px ${c.glow}`; }}
              >
                Reserve My Spot
                <span style={{ display: "flex", alignItems: "center" }}><Icons.Heart color={isDark ? "#0D0611" : "#fff"} /></span>
              </button>
            </form>
          )}
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <footer
          style={{
            padding: "3rem 2.5rem 2rem",
            borderTop: "3px solid transparent",
            backgroundImage: `linear-gradient(${c.bg}, ${c.bg}), linear-gradient(90deg, ${c.accent}, ${c.secondary}, ${c.accent})`,
            backgroundSize: "100% 100%, 100% 3px",
            backgroundPosition: "0 0, 0 0",
            backgroundRepeat: "no-repeat",
            transition: "background-image 0.4s ease",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: c.accent, display: "flex", alignItems: "center" }}><Icons.Heart /></span>
                  <span style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif", fontSize: "0.875rem", letterSpacing: "0.15em", color: c.accent, fontWeight: 600 }}>
                    GLOW STUDIO
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: c.muted, lineHeight: 1.65, margin: 0 }}>
                  8520 Melrose Ave<br />West Hollywood, CA 90069
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: c.secondaryText, marginBottom: "0.5rem" }}>
                  Hours
                </p>
                <p style={{ fontSize: "0.875rem", color: c.muted, lineHeight: 1.65, margin: 0 }}>
                  Mon–Sat: 10AM–8PM<br />Sun: 11AM–6PM
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif", fontSize: "0.5625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: c.secondaryText, marginBottom: "0.5rem" }}>
                  Contact
                </p>
                <p style={{ fontSize: "0.875rem", color: c.muted, lineHeight: 1.65, margin: 0 }}>
                  (310) 555-0198<br />hello@glowstudio.la
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", paddingTop: "2rem", borderTop: `1px solid ${c.border}` }}>
              <a
                href="https://aexonai.com/#consultation"
                style={{ fontSize: "0.875rem", fontWeight: 600, color: c.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.375rem" }}
              >
                Talk to us <span style={{ display: "flex", alignItems: "center" }}><Icons.Arrow /></span>
              </a>
              <span style={{ fontSize: "0.75rem", color: c.muted }}>
                This is a demo by Aexon AI — not a real business. &copy; 2025 Glow Studio LLC.
              </span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}