'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { DM_Sans, JetBrains_Mono, Manrope } from 'next/font/google';

const displayFont = Manrope({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--plumbing-display',
  display: 'swap',
});

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--plumbing-body',
  display: 'swap',
});

const labelFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--plumbing-label',
  display: 'swap',
});

type ThemeName = 'dark' | 'light';
type FieldName = 'name' | 'phone' | 'service' | 'address' | 'message';

function syncDocumentTheme(nextTheme: ThemeName) {
  const nextBg = nextTheme === 'dark' ? '#060D1A' : '#F4F9FF';
  document.documentElement.setAttribute('data-theme', nextTheme);
  document.body.style.background = nextBg;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 22, height: 22 }}>
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4L5.3 5.3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 22, height: 22 }}>
      <path
        d="M20.4 14.2A8.8 8.8 0 0 1 9.8 3.6a8.9 8.9 0 1 0 10.6 10.6Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function DropletMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={{ width: 24, height: 24 }}>
      <path
        d="M16 3.2c4.6 5.7 9.4 10 9.4 15.7A9.4 9.4 0 0 1 16 28.3 9.4 9.4 0 0 1 6.6 18.9C6.6 13.2 11.4 8.9 16 3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PipeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20 }}>
      <path
        d="M3 9.5h6.5a4.5 4.5 0 0 1 4.5 4.5v1.5a3 3 0 0 0 3 3H21"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="3" cy="9.5" r="1.6" fill="currentColor" />
      <circle cx="21" cy="18.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

function HeaterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20 }}>
      <rect
        x="6"
        y="3.5"
        width="12"
        height="17"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 8.5c-1.7 1.7-2.3 3-2.3 4.1a2.3 2.3 0 1 0 4.6 0c0-1.1-.6-2.4-2.3-4.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LeakIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20 }}>
      <path
        d="M12 3.1c4.1 5 6.8 7.8 6.8 11.4A6.8 6.8 0 0 1 12 21.3a6.8 6.8 0 0 1-6.8-6.8C5.2 10.9 7.9 8.1 12 3.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M12 9.2v4.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="12" cy="17.1" r="1" fill="currentColor" />
    </svg>
  );
}

function FixtureIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20 }}>
      <path
        d="M13.7 4.1a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8l-1.6 1.6-4.2-4.2 1.6-1.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m10.8 6.8 6.4 6.4-7.7 7.7a2.5 2.5 0 0 1-3.5-3.5l4.8-4.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 18, height: 18 }}>
      <path
        d="M12 3 5.8 5.5v5.4c0 4 2.4 7.5 6.2 9.1 3.8-1.6 6.2-5.1 6.2-9.1V5.5L12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m9.2 12.2 1.9 1.9 3.7-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 18, height: 18 }}>
      <path
        d="M12 3v4M12 17v4M21 12h-4M7 12H3M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8M18.4 18.4l-2.8-2.8M8.4 8.4 5.6 5.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 18, height: 18 }}>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.8v4.6l3 1.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function PlumbingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [mounted, setMounted] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: 'Emergency leak',
    address: '',
    message: '',
  });

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const nextTheme: ThemeName = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
    syncDocumentTheme(nextTheme);
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';
  const c = isDark
    ? {
        bg: '#060D1A',
        bg2: '#0B1829',
        bg3: '#0F2040',
        text: '#F0F6FF',
        text2: '#8BA3C7',
        accent: '#0EA5E9',
        accent2: '#38BDF8',
        warm: '#F97316',
        warm2: '#FB923C',
        border: 'rgba(14, 165, 233, 0.18)',
        card: 'rgba(11, 24, 41, 0.84)',
        cardStrong: 'rgba(15, 32, 64, 0.94)',
        glow: 'rgba(14, 165, 233, 0.24)',
        shimmer: 'rgba(56, 189, 248, 0.26)',
        wash: 'rgba(59, 130, 246, 0.18)',
        shadow: 'rgba(2, 8, 23, 0.48)',
        shadowSoft: 'rgba(2, 8, 23, 0.22)',
        success: '#67E8F9',
        paper: '#FFFFFF',
        paperMuted: 'rgba(255, 255, 255, 0.8)',
      }
    : {
        bg: '#F4F9FF',
        bg2: '#E8F4FF',
        bg3: '#D0E8FF',
        text: '#060D1A',
        text2: '#3D6B8A',
        accent: '#0284C7',
        accent2: '#0EA5E9',
        warm: '#EA580C',
        warm2: '#FB923C',
        border: 'rgba(2, 132, 199, 0.2)',
        card: 'rgba(255, 255, 255, 0.88)',
        cardStrong: 'rgba(244, 249, 255, 0.98)',
        glow: 'rgba(2, 132, 199, 0.14)',
        shimmer: 'rgba(14, 165, 233, 0.18)',
        wash: 'rgba(191, 219, 254, 0.56)',
        shadow: 'rgba(15, 23, 42, 0.12)',
        shadowSoft: 'rgba(15, 23, 42, 0.08)',
        success: '#0369A1',
        paper: '#FFFFFF',
        paperMuted: 'rgba(255, 255, 255, 0.8)',
      };

  useEffect(() => {
    if (!mounted) {
      return;
    }

    syncDocumentTheme(theme);
  }, [mounted, theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.maxRadius = 22 + Math.random() * 24;
        this.opacity = isDark ? 0.52 : 0.32;
        this.speed = 1 + Math.random() * 1.2;
      }

      update() {
        this.radius += this.speed;
        this.opacity = Math.max(0, this.opacity - 0.012);
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) {
          return;
        }

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = c.accent;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius * 1.6, this.radius * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      isDone() {
        return this.opacity <= 0 || this.radius >= this.maxRadius;
      }
    }

    class Drop {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      wobble: number;
      wobbleStep: number;
      splashDone: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = -40 - Math.random() * 120;
        this.size = 3 + Math.random() * 6;
        this.speed = 2.1 + Math.random() * 2.8;
        this.opacity = 0;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleStep = 0.04 + Math.random() * 0.04;
        this.splashDone = false;
      }

      update(ripples: Ripple[]) {
        this.y += this.speed;
        this.wobble += this.wobbleStep;

        if (this.y > height * 0.1) {
          this.opacity = Math.min(isDark ? 0.78 : 0.46, this.opacity + 0.03);
        }

        if (!this.splashDone && this.y >= height - 48) {
          ripples.push(new Ripple(this.x, height - 42));
          this.splashDone = true;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) {
          return;
        }

        const currentX = this.x + Math.sin(this.wobble) * 5;

        ctx.save();
        ctx.globalAlpha = this.opacity;

        const glow = ctx.createRadialGradient(currentX, this.y, 0, currentX, this.y, this.size * 3.1);
        glow.addColorStop(0, c.accent2);
        glow.addColorStop(0.48, c.accent);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(currentX, this.y, this.size * 3.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = this.opacity * (isDark ? 0.94 : 0.82);
        ctx.fillStyle = c.accent;
        ctx.beginPath();
        ctx.moveTo(currentX, this.y - this.size * 1.4);
        ctx.quadraticCurveTo(currentX + this.size, this.y - this.size * 0.5, currentX + this.size * 0.65, this.y + this.size * 0.9);
        ctx.arc(currentX, this.y + this.size * 0.25, this.size * 0.9, Math.PI * 0.1, Math.PI * 0.9);
        ctx.quadraticCurveTo(currentX - this.size, this.y - this.size * 0.5, currentX, this.y - this.size * 1.4);
        ctx.fill();
        ctx.restore();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -40 - Math.random() * 140;
        this.size = 3 + Math.random() * 6;
        this.speed = 2.1 + Math.random() * 2.8;
        this.opacity = 0;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleStep = 0.04 + Math.random() * 0.04;
        this.splashDone = false;
      }

      isDone() {
        return this.y > height + 64;
      }
    }

    class Bubble {
      x: number;
      y: number;
      size: number;
      speed: number;
      sway: number;
      swayStep: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 120;
        this.size = 5 + Math.random() * 10;
        this.speed = 0.8 + Math.random() * 1.2;
        this.sway = Math.random() * Math.PI * 2;
        this.swayStep = 0.02 + Math.random() * 0.03;
        this.opacity = isDark ? 0.34 + Math.random() * 0.18 : 0.2 + Math.random() * 0.12;
      }

      update() {
        this.y -= this.speed;
        this.sway += this.swayStep;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const currentX = this.x + Math.sin(this.sway) * 12;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = c.accent;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(currentX, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = this.opacity * 0.45;
        ctx.fillStyle = c.accent2;
        ctx.beginPath();
        ctx.arc(currentX - this.size * 0.3, this.y - this.size * 0.35, this.size * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 120;
        this.size = 5 + Math.random() * 10;
        this.speed = 0.8 + Math.random() * 1.2;
        this.sway = Math.random() * Math.PI * 2;
        this.swayStep = 0.02 + Math.random() * 0.03;
        this.opacity = isDark ? 0.34 + Math.random() * 0.18 : 0.2 + Math.random() * 0.12;
      }

      isDone() {
        return this.y < -32;
      }
    }

    const drops = Array.from({ length: 14 }, () => new Drop());
    const bubbles = Array.from({ length: 8 }, () => new Bubble());
    const ripples: Ripple[] = [];

    const drawBackdrop = () => {
      context.clearRect(0, 0, width, height);

      const topGlow = context.createRadialGradient(width * 0.22, height * 0.12, 0, width * 0.22, height * 0.12, width * 0.42);
      topGlow.addColorStop(0, c.wash);
      topGlow.addColorStop(1, 'transparent');
      context.fillStyle = topGlow;
      context.fillRect(0, 0, width, height);

      const sideGlow = context.createRadialGradient(width * 0.84, height * 0.02, 0, width * 0.84, height * 0.02, width * 0.28);
      sideGlow.addColorStop(0, c.glow);
      sideGlow.addColorStop(1, 'transparent');
      context.fillStyle = sideGlow;
      context.fillRect(0, 0, width, height);
    };

    const drawStaticFrame = () => {
      drawBackdrop();
      drops.slice(0, 8).forEach((drop, index) => {
        drop.y = height * (0.12 + index * 0.08);
        drop.opacity = isDark ? 0.34 : 0.2;
        drop.draw(context);
      });

      bubbles.slice(0, 4).forEach((bubble, index) => {
        bubble.y = height - 120 - index * 90;
        bubble.draw(context);
      });

      [0.18, 0.44, 0.7].forEach((ratio) => {
        const ripple = new Ripple(width * ratio, height - 42);
        ripple.radius = 12;
        ripple.opacity = isDark ? 0.22 : 0.15;
        ripple.draw(context);
      });
    };

    const animate = () => {
      drawBackdrop();

      drops.forEach((drop) => {
        drop.update(ripples);
        drop.draw(context);
        if (drop.isDone()) {
          drop.reset();
        }
      });

      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw(context);
        if (bubble.isDone()) {
          bubble.reset();
        }
      });

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        ripples[index].update();
        ripples[index].draw(context);
        if (ripples[index].isDone()) {
          ripples.splice(index, 1);
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      drawStaticFrame();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [c.accent, c.accent2, c.glow, c.wash, isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
          } else {
            entry.target.removeAttribute('data-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('[data-scroll-tile]').forEach((el) => {
      observer.observe(el);
    });
  }, []);

  const themeVars = {
    '--bg': c.bg,
    '--bg2': c.bg2,
    '--bg3': c.bg3,
    '--text': c.text,
    '--text2': c.text2,
    '--accent': c.accent,
    '--accent2': c.accent2,
    '--warm': c.warm,
    '--warm2': c.warm2,
    '--border': c.border,
    '--card': c.card,
    '--card-strong': c.cardStrong,
    '--glow': c.glow,
    '--shimmer': c.shimmer,
    '--wash': c.wash,
    '--shadow': c.shadow,
    '--shadow-soft': c.shadowSoft,
    '--success': c.success,
    '--paper': c.paper,
    '--paper-muted': c.paperMuted,
  } as CSSProperties;

  const services = [
    {
      code: '01',
      title: 'Drain clearing',
      description: 'Kitchen lines, tubs, toilets, and mainline backups handled with the least disruptive fix first.',
      note: 'Clear diagnosis before work begins',
      icon: <PipeIcon />,
    },
    {
      code: '02',
      title: 'Water heater work',
      description: 'Repair, replacement, and tankless decisions mapped to recovery time, footprint, and budget.',
      note: 'Same-visit replacement planning',
      icon: <HeaterIcon />,
    },
    {
      code: '03',
      title: 'Leak response',
      description: 'Active leaks, failed shutoffs, slab concerns, and supply-line failures triaged for fastest containment.',
      note: 'Emergency-first dispatch logic',
      icon: <LeakIcon />,
    },
    {
      code: '04',
      title: 'Fixture installs',
      description: 'Faucets, toilets, shower trim, disposal swaps, and finish upgrades installed cleanly and square.',
      note: 'Final fit and cleanup included',
      icon: <FixtureIcon />,
    },
  ];

  const trustItems = [
    {
      label: 'Licensed crews',
      text: 'Work is assigned to qualified plumbers, not generic day-rate labor.',
      icon: <ShieldIcon />,
    },
    {
      label: 'Clear estimates',
      text: 'You see the scope, arrival window, and pricing posture before anyone starts cutting pipe.',
      icon: <SparkIcon />,
    },
    {
      label: 'Respectful cleanup',
      text: 'Protective mats, wipe-downs, and closeout photos keep the home side of the job under control.',
      icon: <ClockIcon />,
    },
  ];

  const demoMessages = [
    { speaker: 'Homeowner', tone: 'client', time: '7:42 PM', text: 'Kitchen shutoff failed and water is pooling under the sink. Can someone come tonight?' },
    { speaker: 'AquaFlow AI', tone: 'agent', time: '7:42 PM', text: 'Yes. I marked this as an emergency leak, opened the 8:15–8:45 PM route, and queued a plumber with shutoff kits and supply lines.' },
    { speaker: 'Homeowner', tone: 'client', time: '7:43 PM', text: 'Perfect. Gate code is 4126 and I can send a photo now.' },
    { speaker: 'AquaFlow AI', tone: 'agent', time: '7:43 PM', text: 'Booked. Photo link sent, dispatch confirmed, and your technician ETA will update automatically if traffic shifts.' },
  ];

  const handleThemeToggle = () => {
    const nextTheme: ThemeName = isDark ? 'light' : 'dark';
    syncDocumentTheme(nextTheme);
    window.localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const updateField = (field: FieldName, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (field: FieldName): CSSProperties => ({
    width: '100%',
    borderRadius: 16,
    border: `1px solid ${focusedField === field ? 'var(--accent)' : 'var(--border)'}`,
    background: focusedField === field ? 'var(--bg3)' : 'var(--card)',
    color: 'var(--text)',
    padding: '14px 16px',
    fontSize: 15,
    lineHeight: 1.5,
    outline: 'none',
    boxShadow: focusedField === field ? '0 0 0 4px var(--glow)' : 'none',
    transition: 'border-color 160ms ease, background 160ms ease, box-shadow 160ms ease',
  });

  return (
    <div
      data-theme={theme}
      className={`${displayFont.variable} ${bodyFont.variable} ${labelFont.variable}`}
      style={{
        ...themeVars,
        position: 'relative',
        minHeight: '100vh',
        color: 'var(--text)',
        fontFamily: 'var(--plumbing-body), sans-serif',
      }}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        @keyframes pipeFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes pulseDot {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.72);
            opacity: 0.45;
          }
        }

        @keyframes ctaGlow {
          0%,
          100% {
            box-shadow: 0 14px 34px var(--shadow-soft), 0 0 0 0 var(--glow);
          }
          50% {
            box-shadow: 0 18px 44px var(--shadow-soft), 0 0 0 10px transparent;
          }
        }

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        [data-scroll-tile] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 560ms ease, transform 560ms ease;
        }

        [data-scroll-tile][data-visible='true'] {
          opacity: 1;
          transform: translateY(0);
        }

        [data-scroll-tile][data-visible='true'] article:nth-child(1) { transition-delay: 0ms; }
        [data-scroll-tile][data-visible='true'] article:nth-child(2) { transition-delay: 90ms; }
        [data-scroll-tile][data-visible='true'] article:nth-child(3) { transition-delay: 180ms; }
        [data-scroll-tile][data-visible='true'] article:nth-child(4) { transition-delay: 270ms; }

        @media (max-width: 920px) {
          .plumbing-hero-grid,
          .plumbing-demo-grid,
          .plumbing-contact-grid,
          .plumbing-footer-grid {
            grid-template-columns: 1fr !important;
          }

          .plumbing-nav-row {
            gap: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background:
            'radial-gradient(circle at 14% 18%, var(--wash), transparent 28%), radial-gradient(circle at 84% 0%, var(--glow), transparent 24%), linear-gradient(180deg, var(--bg), var(--bg) 52%, var(--bg2))',
        }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          zIndex: 3,
          background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent2), var(--accent), transparent)',
          backgroundSize: '200% 100%',
          animation: 'pipeFlow 2.8s linear infinite',
          opacity: 0.92,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          zIndex: 3,
          background: 'repeating-linear-gradient(90deg, var(--warm), var(--warm) 24px, transparent 24px, transparent 48px)',
          opacity: isDark ? 0.74 : 0.46,
        }}
      />

      

      <div style={{ position: 'relative', zIndex: 4, background: 'transparent' }}>
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 200,
            padding: '18px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--card-strong)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div
            className="plumbing-nav-row"
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '16px 16px 16px 8px',
                  background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--paper)',
                  boxShadow: '0 14px 30px var(--glow)',
                }}
              >
                <DropletMark />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--plumbing-display), sans-serif',
                    fontSize: 18,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  AquaFlow Plumbing
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: 'var(--plumbing-label), monospace',
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: 'var(--text2)',
                    textTransform: 'uppercase',
                  }}
                >
                  Fast response. Clean finish.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label="Toggle light and dark mode"
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--accent)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'transform 160ms ease, border-color 160ms ease',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-2px)';
                event.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'translateY(0)';
                event.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : null}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#services"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text2)',
                  fontSize: 14,
                  padding: '10px 14px',
                }}
              >
                Services
              </a>
              <a
                href="#demo"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text2)',
                  fontSize: 14,
                  padding: '10px 14px',
                }}
              >
                AI Booking
              </a>
              <a
                href="#contact"
                style={{
                  textDecoration: 'none',
                  color: 'var(--text)',
                  fontFamily: 'var(--plumbing-label), monospace',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '12px 18px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                }}
              >
                Get Quote
              </a>
            </div>
          </div>
        </nav>

        <main style={{ padding: '0 20px 42px' }}>
          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 0 40px' }}>
            <div
              className="plumbing-hero-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)',
                gap: 28,
                alignItems: 'start',
              }}
            >
              <div style={{ animation: 'riseIn 680ms ease forwards' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 16px',
                    borderRadius: 999,
                    background: 'var(--warm)',
                    color: 'var(--paper)',
                    boxShadow: '0 16px 34px var(--shadow-soft)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: 'var(--paper)',
                      animation: 'pulseDot 1.5s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--plumbing-label), monospace',
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    24/7 Emergency Response
                  </span>
                </div>

                <div style={{ marginTop: 30 }}>
                  <h1
                    style={{
                      margin: 0,
                      fontFamily: 'var(--plumbing-display), sans-serif',
                      fontSize: 'clamp(3.7rem, 9vw, 7.2rem)',
                      lineHeight: 0.88,
                      letterSpacing: '-0.06em',
                    }}
                  >
                    Plumbing
                  </h1>
                  <h1
                    style={{
                      margin: '4px 0 0',
                      fontFamily: 'var(--plumbing-display), sans-serif',
                      fontSize: 'clamp(3.7rem, 9vw, 7.2rem)',
                      lineHeight: 0.88,
                      letterSpacing: '-0.06em',
                      color: 'var(--accent)',
                    }}
                  >
                    Done Right.
                  </h1>
                </div>

                <p
                  style={{
                    maxWidth: 560,
                    margin: '26px 0 0',
                    color: 'var(--text2)',
                    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                    lineHeight: 1.7,
                  }}
                >
                  Clear dispatch, calm communication, and clean repair work. This plumbing demo is built to feel
                  dependable before the first call is even answered.
                </p>

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
                  <a
                    href="#contact"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--paper)',
                      fontWeight: 700,
                      padding: '15px 24px',
                      borderRadius: 999,
                      background: 'linear-gradient(135deg, var(--warm), var(--warm2))',
                      animation: 'ctaGlow 2.8s ease-in-out infinite',
                    }}
                  >
                    Book Service
                  </a>
                  <a
                    href="tel:5557429103"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--accent)',
                      fontFamily: 'var(--plumbing-label), monospace',
                      letterSpacing: '0.08em',
                      padding: '15px 22px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      background: 'var(--card)',
                    }}
                  >
                    Call (555) 742-9103
                  </a>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    marginTop: 34,
                  }}
                >
                  {['Licensed & insured', 'Upfront estimates', 'Emergency dispatch', 'Clean work zones'].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '12px 14px',
                        borderRadius: 999,
                        border: '1px solid var(--border)',
                        background: 'var(--card)',
                        color: 'var(--text2)',
                        fontFamily: 'var(--plumbing-label), monospace',
                        fontSize: 12,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ color: 'var(--accent)' }}>+</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <aside
                style={{
                  animation: 'riseIn 820ms ease forwards',
                  background: 'linear-gradient(180deg, var(--card-strong), var(--card))',
                  border: '1px solid var(--border)',
                  borderRadius: 28,
                  padding: 24,
                  boxShadow: '0 28px 70px var(--shadow-soft)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -90,
                    right: -70,
                    width: 220,
                    height: 220,
                    borderRadius: 999,
                    background: 'radial-gradient(circle, var(--glow), transparent 68%)',
                  }}
                />
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--plumbing-label), monospace',
                        fontSize: 11,
                        letterSpacing: '0.16em',
                        color: 'var(--text2)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Dispatch board
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: 'var(--plumbing-display), sans-serif',
                        fontSize: 28,
                        lineHeight: 1,
                      }}
                    >
                      Tonight&apos;s flow
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: 999,
                      background: 'var(--bg3)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--plumbing-label), monospace',
                      fontSize: 11,
                      color: 'var(--accent)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Live route logic
                  </div>
                </div>

                <div style={{ marginTop: 22, display: 'grid', gap: 14 }}>
                  {[
                    ['Leak triage', 'AI labels urgency, missing shutoff info, and likely parts before dispatch.'],
                    ['Window lock', 'Open slots tighten automatically when emergency jobs cross the threshold.'],
                    ['Crew prep', 'The ticket hands the plumber a parts-first note, not just a callback request.'],
                  ].map(([title, text], index) => (
                    <div
                      key={title}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '52px minmax(0, 1fr)',
                        gap: 14,
                        alignItems: 'start',
                        padding: 16,
                        borderRadius: 20,
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 18,
                          display: 'grid',
                          placeItems: 'center',
                          background: index === 1 ? 'linear-gradient(135deg, var(--warm), var(--warm2))' : 'var(--bg3)',
                          color: index === 1 ? 'var(--paper)' : 'var(--accent)',
                        }}
                      >
                        {index === 0 ? <LeakIcon /> : index === 1 ? <ClockIcon /> : <ShieldIcon />}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--plumbing-label), monospace',
                            fontSize: 12,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--text2)',
                          }}
                        >
                          0{index + 1}
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            fontFamily: 'var(--plumbing-display), sans-serif',
                            fontSize: 22,
                            lineHeight: 1.08,
                          }}
                        >
                          {title}
                        </div>
                        <p style={{ margin: '8px 0 0', color: 'var(--text2)', fontSize: 15, lineHeight: 1.6 }}>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section id="services" style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 0 34px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
                gap: 24,
                flexWrap: 'wrap',
                marginBottom: 22,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--plumbing-label), monospace',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Services 01-04
                </div>
                <h2
                  style={{
                    margin: '10px 0 0',
                    fontFamily: 'var(--plumbing-display), sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.05em',
                  }}
                >
                  Service cards that feel like an actual crew.
                </h2>
              </div>
              <p style={{ maxWidth: 420, margin: 0, color: 'var(--text2)', lineHeight: 1.7 }}>
                The layout stays numbered and operational, not decorative. Each card reads like a real dispatch lane.
              </p>
            </div>

            <div
              data-scroll-tile
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 20,
              }}
            >
              {services.map((service, index) => {
                const isHovered = hoveredService === index;

                return (
                  <article
                    key={service.code}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: 280,
                      padding: 22,
                      borderRadius: 26,
                      border: '1px solid var(--border)',
                      background: isHovered ? 'var(--card-strong)' : 'var(--card)',
                      boxShadow: isHovered ? '0 28px 56px var(--shadow-soft), 0 0 0 8px var(--glow)' : '0 16px 36px var(--shadow-soft)',
                      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                      transition: 'transform 200ms ease, box-shadow 200ms ease, background 200ms ease',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '-20% auto -20% -32%',
                        width: '44%',
                        transform: isHovered ? 'translateX(285%) skewX(-18deg)' : 'translateX(-10%) skewX(-18deg)',
                        opacity: isHovered ? 1 : 0,
                        background: 'linear-gradient(90deg, transparent, var(--shimmer), transparent)',
                        transition: 'transform 520ms ease, opacity 220ms ease',
                        pointerEvents: 'none',
                      }}
                    />

                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 18,
                          display: 'grid',
                          placeItems: 'center',
                          background: 'var(--bg3)',
                          color: isHovered ? 'var(--warm)' : 'var(--accent)',
                          transition: 'color 160ms ease',
                        }}
                      >
                        {service.icon}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 14,
                          letterSpacing: '0.12em',
                          color: 'var(--text2)',
                        }}
                      >
                        {service.code}
                      </div>
                    </div>

                    <div style={{ position: 'relative', marginTop: 18 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: 'var(--plumbing-display), sans-serif',
                          fontSize: 28,
                          lineHeight: 1,
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {service.title}
                      </h3>
                      <p style={{ margin: '14px 0 0', color: 'var(--text2)', lineHeight: 1.72, fontSize: 15 }}>{service.description}</p>
                    </div>

                    <div
                      style={{
                        position: 'relative',
                        marginTop: 18,
                        paddingTop: 16,
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--text2)',
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 12,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {service.note}
                      </span>
                      <span
                        style={{
                          color: isHovered ? 'var(--warm)' : 'var(--accent)',
                          fontWeight: 700,
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 180ms ease, color 180ms ease',
                        }}
                      >
                        Learn more →
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="demo" style={{ maxWidth: 1180, margin: '0 auto', padding: '46px 0 34px' }}>
            <div
              className="plumbing-demo-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.88fr) minmax(320px, 1.12fr)',
                gap: 24,
                alignItems: 'start',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--plumbing-label), monospace',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Concierge Agent
                </div>
                <h2
                  style={{
                    margin: '12px 0 0',
                    fontFamily: 'var(--plumbing-display), sans-serif',
                    fontSize: 'clamp(2.2rem, 4.2vw, 4rem)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.05em',
                  }}
                >
                  The booking widget acts like a dispatcher, not a chatbot.
                </h2>
                <p style={{ margin: '18px 0 0', color: 'var(--text2)', lineHeight: 1.74, fontSize: 16 }}>
                  This mockup shows the AI collecting urgency, route window, arrival details, and prep notes in one pass.
                  The tone stays practical and calm because plumbing emergencies already bring enough noise.
                </p>

                <div data-scroll-tile style={{ display: 'grid', gap: 14, marginTop: 26 }}>
                  {[
                    ['Urgency detection', 'Burst lines and failed shutoffs are escalated immediately instead of buried in a contact queue.'],
                    ['Route-aware promises', 'The reply offers a real arrival window, not a vague "someone will reach out soon."'],
                    ['Crew prep notes', 'Dispatch bundles photos, access instructions, and likely parts before the truck moves.'],
                  ].map(([title, text], index) => (
                    <div
                      key={title}
                      style={{
                        padding: 18,
                        borderRadius: 22,
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 16px 32px var(--shadow-soft)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 12,
                          color: index === 1 ? 'var(--warm)' : 'var(--accent)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        0{index + 1}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          fontFamily: 'var(--plumbing-display), sans-serif',
                          fontSize: 24,
                          lineHeight: 1.05,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        {title}
                      </div>
                      <p style={{ margin: '10px 0 0', color: 'var(--text2)', lineHeight: 1.7 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 30,
                  border: '1px solid var(--border)',
                  background: 'linear-gradient(180deg, var(--card-strong), var(--card))',
                  boxShadow: '0 28px 70px var(--shadow-soft)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    padding: '18px 20px',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--plumbing-display), sans-serif',
                        fontSize: 24,
                        lineHeight: 1,
                      }}
                    >
                      Emergency booking
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        color: 'var(--text2)',
                        fontFamily: 'var(--plumbing-label), monospace',
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      AquaFlow AI • live handoff mock
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: 999,
                      background: 'var(--bg3)',
                      color: 'var(--accent)',
                      fontFamily: 'var(--plumbing-label), monospace',
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Confirmed route
                  </div>
                </div>

                <div style={{ padding: 20, display: 'grid', gap: 14 }}>
                  {demoMessages.map((message) => {
                    const isAgent = message.tone === 'agent';

                    return (
                      <div
                        key={`${message.speaker}-${message.time}`}
                        style={{
                          display: 'grid',
                          justifyItems: isAgent ? 'start' : 'end',
                        }}
                      >
                        <div
                          style={{
                            maxWidth: '88%',
                            padding: '16px 18px',
                            borderRadius: isAgent ? '22px 22px 22px 8px' : '22px 22px 8px 22px',
                            background: isAgent ? 'var(--bg3)' : 'linear-gradient(135deg, var(--warm), var(--warm2))',
                            color: isAgent ? 'var(--text)' : 'var(--paper)',
                            border: isAgent ? '1px solid var(--border)' : '1px solid transparent',
                            boxShadow: '0 12px 24px var(--shadow-soft)',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: 12,
                              marginBottom: 8,
                              fontFamily: 'var(--plumbing-label), monospace',
                              fontSize: 11,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: isAgent ? 'var(--accent)' : 'var(--paper-muted)',
                            }}
                          >
                            <span>{message.speaker}</span>
                            <span>{message.time}</span>
                          </div>
                          <div style={{ lineHeight: 1.7, fontSize: 15 }}>{message.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 12,
                    padding: '0 20px 20px',
                  }}
                >
                  {[
                    ['Detected', 'Emergency leak'],
                    ['Booked', 'Tonight • 8:15–8:45 PM'],
                    ['Prep note', 'Shutoff kit + supply lines'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        padding: 16,
                        borderRadius: 20,
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 11,
                          color: 'var(--text2)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          fontFamily: 'var(--plumbing-display), sans-serif',
                          fontSize: 22,
                          lineHeight: 1.08,
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 0 34px' }}>
            <div
              style={{
                padding: '24px 22px',
                borderRadius: 28,
                background: 'linear-gradient(135deg, var(--card-strong), var(--card))',
                border: '1px solid var(--border)',
                boxShadow: '0 22px 42px var(--shadow-soft)',
              }}
            >
              <div
                data-scroll-tile
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 16,
                }}
              >
                {trustItems.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: 18,
                      borderRadius: 22,
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      minHeight: 164,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 14,
                        display: 'grid',
                        placeItems: 'center',
                        background: 'var(--bg3)',
                        color: 'var(--accent)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        marginTop: 16,
                        fontFamily: 'var(--plumbing-display), sans-serif',
                        fontSize: 24,
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {item.label}
                    </div>
                    <p style={{ margin: '10px 0 0', color: 'var(--text2)', lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" style={{ maxWidth: 1180, margin: '0 auto', padding: '42px 0 28px' }}>
            <div
              className="plumbing-contact-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.9fr) minmax(320px, 1.1fr)',
                gap: 24,
                alignItems: 'start',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--plumbing-label), monospace',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Contact form
                </div>
                <h2
                  style={{
                    margin: '12px 0 0',
                    fontFamily: 'var(--plumbing-display), sans-serif',
                    fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.05em',
                  }}
                >
                  Start with the job details. Let the page do the sorting.
                </h2>
                <p style={{ margin: '18px 0 0', color: 'var(--text2)', lineHeight: 1.74, fontSize: 16 }}>
                  This form is intentionally simple: who you are, what failed, where the crew is going, and whether the
                  issue is urgent. From there, the AI layer can route, summarize, and prep the ticket.
                </p>

                <div style={{ display: 'grid', gap: 12, marginTop: 28 }}>
                  {[
                    'Emergency leak routing stays separate from non-urgent installs.',
                    'Service notes are written for the dispatcher and the plumber, not just marketing CRM fields.',
                    'Every handoff should reduce follow-up calls instead of creating more of them.',
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px minmax(0, 1fr)',
                        gap: 12,
                        alignItems: 'start',
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 999,
                          display: 'grid',
                          placeItems: 'center',
                          background: 'var(--bg3)',
                          color: 'var(--accent)',
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 12,
                        }}
                      >
                        ✓
                      </div>
                      <div style={{ color: 'var(--text2)', lineHeight: 1.7 }}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: 30,
                  border: '1px solid var(--border)',
                  background: 'linear-gradient(180deg, var(--card-strong), var(--card))',
                  boxShadow: '0 28px 70px var(--shadow-soft)',
                  padding: 24,
                }}
              >
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <label
                      htmlFor="plumbing-name"
                      style={{
                        fontFamily: 'var(--plumbing-label), monospace',
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--text2)',
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="plumbing-name"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Jordan Lee"
                      style={inputStyle('name')}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <label
                        htmlFor="plumbing-phone"
                        style={{
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 11,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--text2)',
                        }}
                      >
                        Phone
                      </label>
                      <input
                        id="plumbing-phone"
                        value={form.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="(555) 742-9103"
                        style={inputStyle('phone')}
                      />
                    </div>

                    <div style={{ display: 'grid', gap: 8 }}>
                      <label
                        htmlFor="plumbing-service"
                        style={{
                          fontFamily: 'var(--plumbing-label), monospace',
                          fontSize: 11,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--text2)',
                        }}
                      >
                        Service
                      </label>
                      <select
                        id="plumbing-service"
                        value={form.service}
                        onChange={(event) => updateField('service', event.target.value)}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        style={inputStyle('service')}
                      >
                        <option>Emergency leak</option>
                        <option>Drain clearing</option>
                        <option>Water heater</option>
                        <option>Fixture install</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <label
                      htmlFor="plumbing-address"
                      style={{
                        fontFamily: 'var(--plumbing-label), monospace',
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--text2)',
                      }}
                    >
                      Address or access note
                    </label>
                    <input
                      id="plumbing-address"
                      value={form.address}
                      onChange={(event) => updateField('address', event.target.value)}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Unit, gate code, parking, or building details"
                      style={inputStyle('address')}
                    />
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <label
                      htmlFor="plumbing-message"
                      style={{
                        fontFamily: 'var(--plumbing-label), monospace',
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--text2)',
                      }}
                    >
                      What happened
                    </label>
                    <textarea
                      id="plumbing-message"
                      value={form.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Describe the leak, noise, backup, or install request."
                      rows={5}
                      style={{
                        ...inputStyle('message'),
                        resize: 'vertical',
                        minHeight: 132,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      border: 'none',
                      borderRadius: 999,
                      background: 'linear-gradient(135deg, var(--warm), var(--warm2))',
                      color: 'var(--paper)',
                      padding: '16px 22px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      animation: 'ctaGlow 2.8s ease-in-out infinite',
                      zIndex: 10,
                      transition: 'transform 160ms ease, box-shadow 160ms ease',
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.transform = 'translateY(-2px)';
                      event.currentTarget.style.boxShadow = '0 22px 48px var(--shadow-soft), 0 0 0 6px var(--glow)';
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.transform = 'translateY(0)';
                      event.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Send Request
                  </button>

                  <div
                    style={{
                      minHeight: 26,
                      color: submitted ? 'var(--success)' : 'var(--text2)',
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {submitted
                      ? 'Demo request captured. In production, this would hand off to dispatch and the AI booking flow.'
                      : 'Demo form only. Use it to show routing, intake, and booking behavior.'}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer style={{ padding: '26px 20px 48px' }}>
          <div
            className="plumbing-footer-grid"
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 0.6fr)',
              gap: 20,
              padding: 24,
              borderRadius: 28,
              background: 'linear-gradient(180deg, var(--card-strong), var(--card))',
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '16px 16px 16px 8px',
                    background: 'linear-gradient(135deg, var(--accent2), var(--accent))',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--paper)',
                  }}
                >
                  <DropletMark />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--plumbing-display), sans-serif',
                      fontSize: 26,
                      lineHeight: 1,
                    }}
                  >
                    AquaFlow Plumbing
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      fontFamily: 'var(--plumbing-label), monospace',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--text2)',
                    }}
                  >
                    Plumbing demo for Hallmark review
                  </div>
                </div>
              </div>

              <p style={{ margin: '18px 0 0', maxWidth: 620, color: 'var(--text2)', lineHeight: 1.74 }}>
                Service-first structure, water-motion background, light and dark themes, and an AI emergency-booking
                mockup designed to feel premium without turning into a generic home-services template.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
              <div
                style={{
                  fontFamily: 'var(--plumbing-label), monospace',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text2)',
                }}
              >
                Footer
              </div>
              <a href="tel:5557429103" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: 16 }}>
                (555) 742-9103
              </a>
              <div style={{ color: 'var(--text2)', lineHeight: 1.7 }}>Dispatch hours: always on for emergencies.</div>
              <a
                href="https://aexonai.com/#consultation"
                style={{
                  marginTop: 4,
                  width: 'fit-content',
                  textDecoration: 'none',
                  color: 'var(--accent)',
                  fontFamily: 'var(--plumbing-label), monospace',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Talk to us →
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
