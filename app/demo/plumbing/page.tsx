'use client';

import { useState, useEffect, useRef } from 'react';

export default function PlumbingPage() {
  const [theme, setTheme] = useState('dark');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const final = stored === 'light' || stored === 'dark' ? stored : 'dark';
    setTheme(final);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const isDark = theme === 'dark';
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── Canvas animation ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Water drop class
    class Drop {
      x: number; y: number; speed: number; size: number; opacity: number;
      wobble: number; wobbleDir: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = -20 - Math.random() * 60;
        this.speed = 2.5 + Math.random() * 3;
        this.size = 3 + Math.random() * 7;
        this.opacity = 0;
        this.wobble = 0;
        this.wobbleDir = Math.random() > 0.5 ? 1 : -1;
      }
      update(h: number, w: number, accent: string, accent2: string, isDark: boolean) {
        this.y += this.speed;
        this.wobble += 0.08 * this.wobbleDir;
        if (this.y > h * 0.1) this.opacity = Math.min(0.75, this.opacity + 0.04);
        if (this.y > h * 0.85) this.opacity = Math.max(0, this.opacity - 0.05);
      }
      draw(ctx: CanvasRenderingContext2D, accent: string, accent2: string, isDark: boolean) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity * (isDark ? 1 : 0.6);
        // Glow
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
        grad.addColorStop(0, accent2);
        grad.addColorStop(0.5, accent);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Core drop
        ctx.globalAlpha = this.opacity * 0.9;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(this.x + this.wobble, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      reset(w: number) {
        this.x = Math.random() * w;
        this.y = -30 - Math.random() * 80;
        this.speed = 2.5 + Math.random() * 3;
        this.size = 3 + Math.random() * 7;
        this.opacity = 0;
        this.wobble = 0;
        this.wobbleDir = Math.random() > 0.5 ? 1 : -1;
      }
    }

    // Bubble class
    class Bubble {
      x: number; y: number; speed: number; size: number; opacity: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = h + 10;
        this.speed = 0.8 + Math.random() * 1.5;
        this.size = 4 + Math.random() * 12;
        this.opacity = 0.3 + Math.random() * 0.3;
      }
      update(h: number, w: number) {
        this.y -= this.speed;
        this.x += Math.sin(this.y * 0.02) * 0.5;
        if (this.y < -this.size * 3) {
          this.y = h + 10;
          this.x = Math.random() * w;
        }
      }
      draw(ctx: CanvasRenderingContext2D, accent: string, isDark: boolean) {
        ctx.save();
        ctx.globalAlpha = this.opacity * (isDark ? 1 : 0.5);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        // Highlight
        ctx.fillStyle = accent;
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.25, this.y - this.size * 0.25, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      reset(w: number, h: number) {
        this.y = h + 10;
        this.x = Math.random() * w;
        this.size = 4 + Math.random() * 12;
        this.opacity = 0.3 + Math.random() * 0.3;
      }
    }

    // Ripple class
    class Ripple {
      x: number; y: number; r: number; maxR: number; opacity: number; speed: number;
      constructor(x: number, y: number, w: number) {
        this.x = x;
        this.y = y;
        this.r = 4;
        this.maxR = 30 + Math.random() * 40;
        this.opacity = 0.5;
        this.speed = 1 + Math.random() * 1.5;
      }
      update() {
        this.r += this.speed;
        this.opacity = Math.max(0, 0.5 - (this.r / this.maxR) * 0.5);
      }
      draw(ctx: CanvasRenderingContext2D, accent: string) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.r, this.r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      isDone() { return this.r >= this.maxR; }
    }

    const drops: Drop[] = Array.from({ length: 14 }, () => new Drop(canvas.width, canvas.height));
    const bubbles: Bubble[] = Array.from({ length: 8 }, () => new Bubble(canvas.width, canvas.height));
    const ripples: Ripple[] = [];

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use c.canvasAccent for BOTH dark and light mode (both now have proper colors)
      const accent = c.canvasAccent;
      const accent2 = c.canvasAccent2;

      // Draw drops
      drops.forEach(drop => {
        drop.update(canvas.height, canvas.width, accent, accent2, isDark);
        drop.draw(ctx, accent, accent2, isDark);
        if (drop.y > canvas.height + 20) drop.reset(canvas.width);
      });

      // Draw bubbles
      bubbles.forEach(bubble => {
        bubble.update(canvas.height, canvas.width);
        bubble.draw(ctx, accent, isDark);
      });

      // Periodically spawn ripples at bottom
      if (frame % 45 === 0 && drops.length > 0) {
        const randomDrop = drops[Math.floor(Math.random() * drops.length)];
        if (randomDrop.y > canvas.height * 0.7) {
          ripples.push(new Ripple(randomDrop.x, canvas.height - 10, canvas.width));
        }
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw(ctx, accent);
        if (ripples[i].isDone()) ripples.splice(i, 1);
      }

      frame++;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDark]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // ── Theme colors ──────────────────────────────────────────────────
  // ── Light mode water colors ─────────────────────────────────────
  const lightAccent = '#0369A1';
  const lightAccent2 = '#0284C7';
  const darkAccent = '#0EA5E9';
  const darkAccent2 = '#38BDF8';

  // ── Theme colors ──────────────────────────────────────────────────
  const c = isDark ? {
    bg: '#060D1A',
    bg2: '#0B1829',
    bg3: '#0F2040',
    text: '#F0F6FF',
    text2: '#7A9CC0',
    accent: darkAccent,
    accent2: darkAccent2,
    warm: '#F97316',
    warm2: '#FB923C',
    border: 'rgba(14,165,233,0.18)',
    card: 'rgba(11,24,41,0.9)',
    glow: 'rgba(14,165,233,0.25)',
    navBg: 'rgba(6,13,26,0.92)',
    inputBg: '#0F2040',
    footerBg: '#040A14',
    shadow: 'rgba(0,0,0,0.5)',
    canvasAccent: darkAccent,
    canvasAccent2: darkAccent2,
  } : {
    bg: '#EFF6FF',
    bg2: '#DBEAFE',
    bg3: '#BFDBFE',
    text: '#060D1A',
    text2: '#2563A8',
    accent: lightAccent,
    accent2: lightAccent2,
    warm: '#C2410C',
    warm2: '#EA580C',
    border: 'rgba(2,86,161,0.18)',
    card: 'rgba(255,255,255,0.92)',
    glow: 'rgba(2,132,199,0.12)',
    navBg: 'rgba(239,246,255,0.94)',
    inputBg: '#FFFFFF',
    footerBg: '#DBEAFE',
    shadow: 'rgba(0,0,0,0.08)',
    canvasAccent: lightAccent,
    canvasAccent2: lightAccent2,
  };

  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: ${c.bg}; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 ${c.glow}; }
      50%       { box-shadow: 0 0 22px 6px ${c.glow}; }
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.7); }
    }
    @keyframes shimmerSweep {
      0%   { transform: translateX(-150%) skewX(-12deg); opacity: 0.6; }
      100% { transform: translateX(250%) skewX(-12deg); opacity: 0; }
    }
    @keyframes pipeFlow {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    ::selection { background: ${c.accent}; color: white; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${c.bg}; }
    ::-webkit-scrollbar-thumb { background: ${c.accent}; border-radius: 3px; }
    html { scroll-behavior: smooth; }
  `;

  const anim = (delay: number) => ({
    style: {
      animation: `fadeUp 0.7s ease forwards`,
      animationDelay: `${delay}s`,
      opacity: 0,
    },
  });

  // ── Data ─────────────────────────────────────────────────────────
  const services = [
    { icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`, title: 'Drain Cleaning', num: '01', desc: 'Hydro-jetting & snaking for sinks, toilets, main lines. Water-run guaranteed.', tag: 'Most Common' },
    { icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>`, title: 'Water Heater', num: '02', desc: 'Tank & tankless installs, repairs, replacements. All brands serviced.', tag: 'Same-Day' },
    { icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`, title: 'Leak Repair', num: '03', desc: 'Pipe leaks, slab leaks, fixture failures. Fast response. Guaranteed seal.', tag: 'Emergency' },
    { icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`, title: 'Fixture Install', num: '04', desc: 'Faucets, toilets, showers professionally installed. Right the first time.', tag: 'Warranty' },
  ];

  const whyUs = [
    { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`, title: 'Upfront Pricing', sub: 'No hidden fees. We quote before we work.' },
    { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, title: 'Licensed & Insured', sub: 'Every tech is background-checked & covered.' },
    { icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`, title: '2-Year Guarantee', sub: 'Parts & labor guaranteed. We come back if needed.' },
  ];

  const stats = [
    { num: '20+', label: 'Years', icon: '🏆' },
    { num: '50K+', label: 'Jobs Done', icon: '🔧' },
    { num: '4.9★', label: 'Google', icon: '⭐' },
    { num: '24/7', label: 'Always On', icon: '📞' },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ─── Canvas Animation Layer ─── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* ─── Static gradient overlay so text is readable ─── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: isDark
          ? 'radial-gradient(ellipse 90% 50% at 50% -5%, rgba(14,165,233,0.08) 0%, transparent 60%)'
          : 'radial-gradient(ellipse 90% 50% at 50% -5%, rgba(2,132,199,0.05) 0%, transparent 60%)',
      }} />

      {/* ─── Top animated water line ─── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '4px',
        zIndex: 2,
        background: `linear-gradient(90deg, transparent, ${c.accent}, ${c.accent2}, ${c.accent}, transparent)`,
        backgroundSize: '200% 100%',
        animation: 'pipeFlow 3s linear infinite',
        opacity: 0.8,
      }} />

      {/* ─── Bottom hazard stripe ─── */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: '5px',
        zIndex: 2,
        background: `repeating-linear-gradient(90deg, ${c.warm}, ${c.warm} 28px, transparent 28px, transparent 56px)`,
        opacity: isDark ? 0.75 : 0.5,
      }} />

      {/* ─── Theme Toggle ─── */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: `2px solid ${c.border}`,
          background: c.card,
          backdropFilter: 'blur(16px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px ${c.shadow}`,
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          fontSize: '22px',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.transform = 'scale(1.12)';
          el.style.boxShadow = `0 6px 28px ${c.shadow}, 0 0 18px ${c.glow}`;
          el.style.borderColor = c.accent;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.transform = 'scale(1)';
          el.style.boxShadow = `0 4px 20px ${c.shadow}`;
          el.style.borderColor = c.border;
        }}
      >
        {mounted && isDark ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : mounted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : null}
      </button>

      {/* ─── Page content ─── */}
      <div style={{ position: 'relative', zIndex: 1, background: c.bg, color: c.text, fontFamily: "var(--font-dm-sans), system-ui, sans-serif", minHeight: '100vh' }}>

        {/* ─── Nav ─── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: c.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${c.border}`, padding: '14px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px', height: '38px',
                background: `linear-gradient(135deg, ${c.accent2}, ${c.accent})`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 14px ${c.glow}`,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: '18px', color: c.accent, letterSpacing: '0.04em' }}>AQUAFLOW</div>
                <div style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '9px', color: c.text2, letterSpacing: '0.2em', marginTop: '-1px' }}>PLUMBING CO.</div>
              </div>
            </div>
            <a href="https://aexonai.com/#consultation" style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontWeight: 600, fontSize: '14px',
              color: c.accent, textDecoration: 'none',
              border: `1.5px solid ${c.border}`, borderRadius: '8px',
              padding: '8px 20px', transition: 'all 0.2s ease',
              background: 'transparent',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.bg3; el.style.borderColor = c.accent; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = c.border; }}
            >
              Get Quote
            </a>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section style={{ padding: 'clamp(60px, 10vw, 100px) 24px clamp(50px, 8vw, 80px)', maxWidth: '1200px', margin: '0 auto' }}>
          <div {...anim(0.1)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: c.warm, borderRadius: '50px', padding: '8px 20px', marginBottom: '28px',
            boxShadow: `0 4px 18px rgba(249,115,22,0.4)`,
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'pulseDot 1.5s ease infinite' }} />
            <span style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 500, color: 'white', letterSpacing: '0.12em' }}>24/7 EMERGENCY RESPONSE</span>
          </div>

          <h1 {...anim(0.2)} style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 9vw, 104px)', lineHeight: 0.88, color: c.text, marginBottom: '0px', letterSpacing: '-0.02em' }}>Plumbing</h1>
          <h1 {...anim(0.3)} style={{
            fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(48px, 9vw, 104px)', lineHeight: 0.88,
            background: `linear-gradient(135deg, ${c.accent}, ${c.accent2})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '28px', letterSpacing: '-0.02em',
          }}>Done Right.</h1>

          <p {...anim(0.4)} style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: c.text2, maxWidth: '520px', lineHeight: 1.65, marginBottom: '40px' }}>
            Licensed pros. Transparent pricing. No surprises.
            From drippy faucets to full re-pipes — we handle it all.
          </p>

          <div {...anim(0.5)} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <a href="#contact" style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontWeight: 600, fontSize: '16px',
              background: `linear-gradient(135deg, ${c.warm}, ${c.warm2})`, color: 'white',
              textDecoration: 'none', borderRadius: '12px', padding: '14px 36px', display: 'inline-block',
              animation: 'pulseGlow 3s ease infinite',
              boxShadow: `0 4px 18px rgba(249,115,22,0.35)`,
              transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
            >Book Service →</a>
            <a href="tel:5557429103" style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontWeight: 600, fontSize: '16px',
              color: c.accent, textDecoration: 'none', border: `1.5px solid ${c.border}`,
              borderRadius: '12px', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s ease', background: c.card,
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.accent; el.style.background = c.bg3; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.border; el.style.background = c.card; }}
            >📞 (555) 742-9103</a>
          </div>

          <div {...anim(0.6)} style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {[{ icon: '🛡️', text: 'Licensed & Insured' }, { icon: '🏆', text: '20+ Years' }, { icon: '⭐', text: '4.9★ Google' }, { icon: '⚡', text: 'Same-Day Arrival' }].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '14px', color: c.text2 }}>
                <span style={{ fontSize: '16px' }}>{b.icon}</span>{b.text}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Services Grid ─── */}
        <section style={{ padding: '64px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div {...anim(0.7)} style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '11px', color: c.accent, letterSpacing: '0.2em', marginBottom: '14px' }}>WHAT WE DO</div>
          <h2 {...anim(0.75)} style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', color: c.text, marginBottom: '44px' }}>Our Services</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {services.map((svc, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                {...anim(0.8 + i * 0.1)}
                style={{
                  background: c.card,
                  border: `1.5px solid ${hoveredCard === i ? c.accent : c.border}`,
                  borderRadius: '20px', padding: '28px',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: hoveredCard === i ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === i ? `0 16px 40px ${c.shadow}, 0 0 24px ${c.glow}` : `0 4px 16px ${c.shadow}`,
                }}
              >
                {hoveredCard === i && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '55%', height: '100%',
                    background: `linear-gradient(90deg, transparent, rgba(14,165,233,0.08), transparent)`,
                    animation: 'shimmerSweep 0.6s ease forwards', pointerEvents: 'none',
                  }} />
                )}
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '9px', color: c.warm,
                  background: isDark ? 'rgba(249,115,22,0.12)' : 'rgba(194,65,12,0.08)',
                  border: `1px solid ${isDark ? 'rgba(249,115,22,0.25)' : 'rgba(194,65,12,0.15)'}`,
                  borderRadius: '20px', padding: '3px 10px', letterSpacing: '0.05em',
                }}>
                  {svc.tag}
                </div>
                <div style={{
                  color: hoveredCard === i ? c.accent : c.accent2,
                  marginBottom: '18px', transition: 'color 0.3s ease',
                  display: 'inline-block',
                  background: isDark ? 'rgba(14,165,233,0.1)' : 'rgba(2,132,199,0.07)',
                  borderRadius: '12px', padding: '10px',
                }}
                  dangerouslySetInnerHTML={{ __html: svc.icon }}
                />
                <div style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '11px', color: hoveredCard === i ? c.accent : c.text2, letterSpacing: '0.12em', marginBottom: '12px', transition: 'color 0.3s ease' }}>
                  {svc.num}
                </div>
                <h3 style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 700, fontSize: '22px', color: c.text, marginBottom: '10px' }}>{svc.title}</h3>
                <p style={{ fontSize: '14px', color: c.text2, lineHeight: 1.6 }}>{svc.desc}</p>
                <div style={{ marginTop: '20px', fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '14px', fontWeight: 600, color: c.accent, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Learn more <span style={{ fontSize: '16px' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section style={{ padding: '48px 24px', background: `linear-gradient(135deg, ${c.bg2} 0%, ${c.bg3} 100%)`, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', textAlign: 'center' }}>
              {stats.map((s, i) => (
                <div key={i} {...anim(1.2 + i * 0.1)}>
                  <div style={{ fontSize: '40px', marginBottom: '4px' }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 4vw, 52px)', color: c.accent, lineHeight: 1, marginBottom: '6px' }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '13px', color: c.text2, letterSpacing: '0.04em' }}>{s.label}</div>
                  <div style={{ width: '28px', height: '2px', background: c.warm, margin: '10px auto 0', borderRadius: '1px' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Us ─── */}
        <section style={{ padding: '72px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div {...anim(1.4)} style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '11px', color: c.accent, letterSpacing: '0.2em', marginBottom: '14px' }}>THE AQUAFLOW DIFFERENCE</div>
          <h2 {...anim(1.45)} style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: c.text, marginBottom: '48px' }}>Why Homeowners Trust Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {whyUs.map((w, i) => (
              <div key={i} {...anim(1.55 + i * 0.1)} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '28px', backdropFilter: 'blur(12px)' }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: isDark ? 'rgba(14,165,233,0.12)' : 'rgba(2,132,199,0.08)',
                  border: `1px solid ${c.border}`, borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px', color: c.accent,
                }}
                  dangerouslySetInnerHTML={{ __html: w.icon }}
                />
                <h3 style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 700, fontSize: '18px', color: c.text, marginBottom: '8px' }}>{w.title}</h3>
                <p style={{ fontSize: '14px', color: c.text2, lineHeight: 1.6 }}>{w.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section style={{ padding: '80px 24px', textAlign: 'center', background: c.bg2 }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <h2 {...anim(1.8)} style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 60px)', color: c.text, marginBottom: '16px', lineHeight: 1 }}>Got a Plumbing Emergency?</h2>
            <p {...anim(1.9)} style={{ fontSize: '18px', color: c.text2, marginBottom: '36px' }}>Don't wait — our licensed team is standing by around the clock.</p>
            <a href="#contact" {...anim(2.0)} style={{
              display: 'inline-block', fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontWeight: 600, fontSize: '17px',
              background: `linear-gradient(135deg, ${c.warm}, ${c.warm2})`, color: 'white',
              textDecoration: 'none', borderRadius: '12px', padding: '16px 48px',
              animation: 'pulseGlow 3s ease infinite',
              boxShadow: `0 4px 22px rgba(249,115,22,0.4)`,
              transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
            >Get Emergency Service →</a>
          </div>
        </section>

        {/* ─── Contact Form ─── */}
        <section id="contact" style={{ padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>
          <div {...anim(2.1)} style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '11px', color: c.accent, letterSpacing: '0.2em', marginBottom: '14px' }}>SERVICE REQUEST</div>
          <h2 {...anim(2.15)} style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: c.text, marginBottom: '40px' }}>Book a Service Call</h2>

          {formSubmitted ? (
            <div {...anim(0.5)} style={{ background: c.card, border: `1.5px solid ${c.accent}`, borderRadius: '20px', padding: '56px 40px', textAlign: 'center', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚿</div>
              <h3 style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 700, fontSize: '28px', color: c.text, marginBottom: '10px' }}>Request Received!</h3>
              <p style={{ color: c.text2, fontSize: '16px', lineHeight: 1.6 }}>We will contact you within 30 minutes to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>YOUR NAME</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Michael Rodriguez" style={{
                    width: '100%', padding: '14px 16px', background: c.inputBg,
                    border: `1.5px solid ${c.border}`, borderRadius: '12px',
                    color: c.text, fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '15px', outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                    onFocus={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                    onBlur={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>PHONE NUMBER</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 742-9103" style={{
                    width: '100%', padding: '14px 16px', background: c.inputBg,
                    border: `1.5px solid ${c.border}`, borderRadius: '12px',
                    color: c.text, fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '15px', outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                    onFocus={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                    onBlur={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>SERVICE TYPE</label>
                <select required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} style={{
                  width: '100%', padding: '14px 16px', background: c.inputBg,
                  border: `1.5px solid ${c.border}`, borderRadius: '12px',
                  color: c.text, fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '15px', outline: 'none',
                  appearance: 'none', cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                  onFocus={e => { const el = e.target as HTMLSelectElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                  onBlur={e => { const el = e.target as HTMLSelectElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                >
                  <option value="" style={{ background: c.bg2 }}>Select a service...</option>
                  <option value="drain" style={{ background: c.bg2 }}>Drain Cleaning</option>
                  <option value="water-heater" style={{ background: c.bg2 }}>Water Heater</option>
                  <option value="leak" style={{ background: c.bg2 }}>Leak Repair</option>
                  <option value="fixture" style={{ background: c.bg2 }}>Fixture Installation</option>
                  <option value="emergency" style={{ background: c.bg2 }}>Emergency / After Hours</option>
                  <option value="other" style={{ background: c.bg2 }}>Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>DESCRIBE THE ISSUE</label>
                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us what's going on — the more detail the better..." rows={4} style={{
                  width: '100%', padding: '14px 16px', background: c.inputBg,
                  border: `1.5px solid ${c.border}`, borderRadius: '12px',
                  color: c.text, fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '15px', outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                  onFocus={e => { const el = e.target as HTMLTextAreaElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                  onBlur={e => { const el = e.target as HTMLTextAreaElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                />
              </div>
              <button type="submit" style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontWeight: 600, fontSize: '16px',
                background: `linear-gradient(135deg, ${c.warm}, ${c.warm2})`, color: 'white', border: 'none',
                borderRadius: '12px', padding: '16px 48px', cursor: 'pointer', width: 'fit-content',
                boxShadow: `0 4px 16px rgba(249,115,22,0.3)`,
                transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}
              >Submit Request →</button>
            </form>
          )}
        </section>

        {/* ─── Footer ─── */}
        <footer style={{ background: c.footerBg, borderTop: `1px solid ${c.border}`, padding: '40px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontWeight: 800, fontSize: '16px', color: c.accent, marginBottom: '8px', letterSpacing: '0.05em' }}>AQUAFLOW PLUMBING</div>
              <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '14px', color: c.text2 }}>1420 N Cahuenga Blvd, Los Angeles, CA 90028</div>
              <div style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace", fontSize: '12px', color: c.text2, marginTop: '4px' }}>Mon–Sat 7AM–8PM • Sun 9AM–5PM</div>
            </div>
            <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: '13px', color: c.text2 }}>
              Powered by <span style={{ color: c.accent }}>AEXON AI</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}