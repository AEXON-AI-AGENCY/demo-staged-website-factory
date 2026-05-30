// AquaFlow Plumbing — AEXON AI Demo
// Manrope + DM Sans + JetBrains Mono | Water drop animation | Light/Dark theme

'use client';

import { useState, useEffect } from 'react';

export default function PlumbingPage() {
  const [theme, setTheme] = useState('dark');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // ── Theme colors ──────────────────────────────────────────────────
  const c = isDark ? {
    bg: '#060D1A',
    bg2: '#0B1829',
    bg3: '#0F2040',
    bg4: '#152338',
    text: '#F0F6FF',
    text2: '#8BA3C7',
    accent: '#0EA5E9',
    accent2: '#38BDF8',
    warm: '#F97316',
    warm2: '#FB923C',
    border: 'rgba(14,165,233,0.18)',
    card: 'rgba(11,24,41,0.85)',
    glow: 'rgba(14,165,233,0.22)',
    dropBg: 'rgba(14,165,233,0.9)',
    ripple: 'rgba(14,165,233,0.35)',
    navBg: 'rgba(6,13,26,0.88)',
    inputBg: '#0F2040',
    footerBg: '#040A14',
    shadow: 'rgba(0,0,0,0.5)',
  } : {
    bg: '#EFF6FF',
    bg2: '#DBEAFE',
    bg3: '#BFDBFE',
    bg4: '#93C5FD',
    text: '#060D1A',
    text2: '#2563A8',
    accent: '#0369A1',
    accent2: '#0284C7',
    warm: '#C2410C',
    warm2: '#EA580C',
    border: 'rgba(2,86,161,0.18)',
    card: 'rgba(255,255,255,0.9)',
    glow: 'rgba(2,132,199,0.15)',
    dropBg: 'rgba(2,132,199,0.85)',
    ripple: 'rgba(2,132,199,0.3)',
    navBg: 'rgba(239,246,255,0.92)',
    inputBg: '#FFFFFF',
    footerBg: '#DBEAFE',
    shadow: 'rgba(0,0,0,0.08)',
  };

  // ── Page styles ───────────────────────────────────────────────────
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes dropFall {
      0%   { transform: translateY(-60px) translateX(0px); opacity: 0; }
      8%   { opacity: 0.7; }
      80%  { opacity: 0.6; }
      100% { transform: translateY(110vh) translateX(var(--wobble, 6px)); opacity: 0; }
    }
    @keyframes rippleOut {
      0%   { transform: scale(0.3); opacity: 0.9; border-width: 3px; }
      100% { transform: scale(3.5); opacity: 0; border-width: 0.5px; }
    }
    @keyframes rippleOut2 {
      0%   { transform: scale(0.5); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes waveFloat {
      0%, 100% { transform: translateX(0) translateY(0); }
      25%       { transform: translateX(4px) translateY(-3px); }
      50%       { transform: translateX(-2px) translateY(4px); }
      75%       { transform: translateX(3px) translateY(2px); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 ${c.glow}; }
      50%       { box-shadow: 0 0 20px 5px ${c.glow}; }
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.7); }
    }
    @keyframes shimmerSweep {
      0%   { transform: translateX(-150%) skewX(-12deg); opacity: 0.5; }
      100% { transform: translateX(250%) skewX(-12deg); opacity: 0; }
    }
    @keyframes bubbleRise {
      0%   { transform: translateY(0) scale(1); opacity: 0.6; }
      50%  { transform: translateY(-40px) scale(1.1); opacity: 0.8; }
      100% { transform: translateY(-90px) scale(0.8); opacity: 0; }
    }
    @keyframes pipeFlow {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    ::selection { background: ${c.accent}; color: white; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${c.bg}; }
    ::-webkit-scrollbar-thumb { background: ${c.accent}; border-radius: 3px; }
    html { scroll-behavior: smooth; }
  `;

  // ── Droplet data ──────────────────────────────────────────────────
  const drops = [
    { x: '8%',  d: '0s',    s: '3.5s', size: 7, wobble: '10px',  delay2: '3.3s' },
    { x: '18%', d: '1.1s',  s: '4.2s', size: 9, wobble: '-12px', delay2: '4.0s' },
    { x: '30%', d: '0.4s',  s: '3.7s', size: 5, wobble: '7px',   delay2: '3.6s' },
    { x: '44%', d: '2.2s',  s: '4.5s', size: 8, wobble: '-8px',  delay2: '4.3s' },
    { x: '57%', d: '0.8s',  s: '3.9s', size: 6, wobble: '9px',   delay2: '3.7s' },
    { x: '68%', d: '1.6s',  s: '4.1s', size: 10, wobble: '-6px', delay2: '3.9s' },
    { x: '78%', d: '0.3s',  s: '3.6s', size: 5, wobble: '5px',   delay2: '3.4s' },
    { x: '90%', d: '2.8s',  s: '4.4s', size: 7, wobble: '-10px', delay2: '4.2s' },
    { x: '95%', d: '1.9s',  s: '3.8s', size: 6, wobble: '8px',   delay2: '3.6s' },
  ];

  const bubbles = [
    { x: '15%', d: '0s',   s: '5s',   size: 12, opacity: 0.5 },
    { x: '40%', d: '2s',   s: '6s',   size: 8,  opacity: 0.4 },
    { x: '65%', d: '0.5s', s: '4.5s', size: 15, opacity: 0.3 },
    { x: '82%', d: '3s',   s: '5.5s', size: 10, opacity: 0.45 },
  ];

  // ── Data ─────────────────────────────────────────────────────────
  const services = [
    {
      icon: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      title: 'Drain Cleaning', num: '01',
      desc: 'Hydro-jetting & snaking for sinks, toilets, main lines. Water-run guaranteed.',
      tag: 'Most Common'
    },
    {
      icon: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>`,
      title: 'Water Heater', num: '02',
      desc: 'Tank & tankless installs, repairs, replacements. All brands serviced.',
      tag: 'Same-Day Available'
    },
    {
      icon: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      title: 'Leak Repair', num: '03',
      desc: 'Pipe leaks, slab leaks, fixture failures. Fast response. Guaranteed seal.',
      tag: 'Emergency'
    },
    {
      icon: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      title: 'Fixture Install', num: '04',
      desc: 'Faucets, toilets, showers professionally installed. Right the first time.',
      tag: 'Warranty'
    },
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

  // ── Helpers ───────────────────────────────────────────────────────
  const g = (x: number) => `${x}px`;
  const anim = (delay: number, duration = 0.7) => ({
    animation: `fadeUp ${duration}s ease forwards`,
    animationDelay: `${delay}s`,
    opacity: 0,
  });

  return (
    <>
      <style>{styles}</style>

      {/* ─── Theme Toggle Button ─── */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
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
          boxShadow: `0 4px 20px ${c.shadow}, 0 0 0 1px ${c.border}`,
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          fontSize: '22px',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.transform = 'scale(1.1)';
          el.style.boxShadow = `0 4px 24px ${c.shadow}, 0 0 16px ${c.glow}`;
          el.style.borderColor = c.accent;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.transform = 'scale(1)';
          el.style.boxShadow = `0 4px 20px ${c.shadow}, 0 0 0 1px ${c.border}`;
          el.style.borderColor = c.border;
        }}
      >
        {mounted && isDark ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        ) : mounted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : null}
      </button>

      {/* ─── Animated Background ─── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Gradient base */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.12) 0%, transparent 70%)`
            : `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(2,132,199,0.08) 0%, transparent 70%)`,
        }} />

        {/* Water droplets */}
        {drops.map((d, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: d.x,
            top: 0,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${c.accent2}, ${c.dropBg})`,
            opacity: 0,
            animation: `dropFall ${d.s} ${d.d} infinite`,
            ['--wobble' as string]: d.wobble,
            boxShadow: `0 0 ${d.size * 2}px ${c.glow}`,
          }} />
        ))}

        {/* Ripple splashes at bottom */}
        {drops.map((d, i) => (
          <div key={`r${i}`} style={{
            position: 'absolute',
            left: d.x,
            bottom: '2%',
            width: '24px',
            height: '8px',
            borderRadius: '50%',
            border: `2px solid ${c.ripple}`,
            opacity: 0,
            animation: `rippleOut 1.4s ${d.delay2} infinite`,
          }} />
        ))}

        {/* Rising bubbles */}
        {bubbles.map((b, i) => (
          <div key={`b${i}`} style={{
            position: 'absolute',
            left: b.x,
            bottom: '-20px',
            width: `${b.size}px`,
            height: `${b.size}px`,
            borderRadius: '50%',
            border: `1.5px solid ${c.accent}`,
            opacity: b.opacity,
            animation: `bubbleRise ${b.s} ${b.d} infinite`,
          }} />
        ))}

        {/* Animated water wave line at top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${c.accent}, ${c.accent2}, ${c.accent}, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'pipeFlow 4s linear infinite',
          opacity: 0.6,
        }} />

        {/* Bottom hazard stripe */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: `repeating-linear-gradient(90deg, ${c.warm}, ${c.warm} 20px, transparent 20px, transparent 40px)`,
          opacity: isDark ? 0.7 : 0.5,
        }} />
      </div>

      {/* ─── Main content ─── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: c.bg,
        color: c.text,
        fontFamily: "'DM Sans', sans-serif",
        minHeight: '100vh',
      }}>

        {/* ─── Nav ─── */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: c.navBg,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${c.border}`,
          padding: '14px 24px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Water drop logo */}
              <div style={{
                width: '36px', height: '36px',
                background: `linear-gradient(135deg, ${c.accent2}, ${c.accent})`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 12px ${c.glow}`,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '17px', color: c.accent, letterSpacing: '0.04em' }}>
                  AQUAFLOW
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', marginTop: '-2px' }}>
                  PLUMBING CO.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="tel:5557429103" style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: c.text2,
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '16px' }}>📞</span>
                <span style={{ display: 'none' }}>(555) 742-9103</span>
              </a>
              <a href="https://aexonai.com/#consultation" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                color: c.accent,
                textDecoration: 'none',
                border: `1.5px solid ${c.border}`,
                borderRadius: '8px',
                padding: '8px 20px',
                transition: 'all 0.2s ease',
                background: 'transparent',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.bg3; el.style.borderColor = c.accent; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = c.border; }}
              >
                Get Quote
              </a>
            </div>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section style={{ padding: 'clamp(60px, 10vw, 100px) 24px clamp(50px, 8vw, 80px)', maxWidth: '1200px', margin: '0 auto' }}>

          {/* Emergency badge */}
          <div {...anim(0.1)} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: c.warm,
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '28px',
            boxShadow: `0 4px 16px rgba(249,115,22,0.35)`,
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'white',
              animation: 'pulseDot 1.5s ease infinite',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px', fontWeight: 500,
              color: 'white', letterSpacing: '0.1em',
            }}>
              24/7 EMERGENCY RESPONSE
            </span>
          </div>

          {/* Headline */}
          <h1 {...anim(0.2)} style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(48px, 9vw, 104px)',
            lineHeight: 0.9,
            color: c.text,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            Plumbing
          </h1>
          <h1 {...anim(0.3)} style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(48px, 9vw, 104px)',
            lineHeight: 0.9,
            background: `linear-gradient(135deg, ${c.accent}, ${c.accent2})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '28px',
            letterSpacing: '-0.02em',
          }}>
            Done Right.
          </h1>

          {/* Sub */}
          <p {...anim(0.4)} style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: c.text2,
            maxWidth: '540px',
            lineHeight: 1.65,
            marginBottom: '40px',
          }}>
            Licensed pros. Transparent pricing. No surprises.
            From drippy faucets to full re-pipes — we handle it all.
          </p>

          {/* CTAs */}
          <div {...anim(0.5)} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <a
              href="#contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                background: `linear-gradient(135deg, ${c.warm}, ${c.warm2})`,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                padding: '14px 36px',
                display: 'inline-block',
                animation: 'pulseGlow 3s ease infinite',
                transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: `0 4px 16px rgba(249,115,22,0.3)`,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
            >
              Book Service →
            </a>
            <a
              href="tel:5557429103"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: c.accent,
                textDecoration: 'none',
                border: `1.5px solid ${c.border}`,
                borderRadius: '12px',
                padding: '14px 28px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s ease',
                background: c.card,
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.accent; el.style.background = c.bg3; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = c.border; el.style.background = c.card; }}
            >
              📞 (555) 742-9103
            </a>
          </div>

          {/* Trust badges */}
          <div {...anim(0.6)} style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {[
              { icon: '🛡️', text: 'Licensed & Insured' },
              { icon: '🏆', text: '20+ Years' },
              { icon: '⭐', text: '4.9★ Google' },
              { icon: '⚡', text: 'Same-Day Arrival' },
            ].map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                color: c.text2,
              }}>
                <span style={{ fontSize: '16px', filter: 'drop-shadow(0 0 4px currentColor)' }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Services Grid ─── */}
        <section style={{ padding: '64px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div {...anim(0.7)} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px', color: c.accent,
            letterSpacing: '0.2em', marginBottom: '14px',
          }}>WHAT WE DO</div>
          <h2 {...anim(0.75)} style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: c.text,
            marginBottom: '44px',
          }}>Our Services</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {services.map((svc, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                {...anim(0.8 + i * 0.1)}
                style={{
                  background: c.card,
                  border: `1.5px solid ${hoveredCard === i ? c.accent : c.border}`,
                  borderRadius: '20px',
                  padding: '28px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: hoveredCard === i ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === i ? `0 16px 40px ${c.shadow}, 0 0 24px ${c.glow}` : `0 4px 16px ${c.shadow}`,
                }}
              >
                {/* Shimmer */}
                {hoveredCard === i && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '55%', height: '100%',
                    background: `linear-gradient(90deg, transparent, rgba(14,165,233,0.07), transparent)`,
                    animation: 'shimmerSweep 0.6s ease forwards',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px', color: c.warm,
                  background: isDark ? 'rgba(249,115,22,0.12)' : 'rgba(194,65,12,0.1)',
                  border: `1px solid ${isDark ? 'rgba(249,115,22,0.3)' : 'rgba(194,65,12,0.2)'}`,
                  borderRadius: '20px',
                  padding: '3px 10px',
                  letterSpacing: '0.05em',
                }}>
                  {svc.tag}
                </div>

                {/* Icon */}
                <div style={{
                  color: hoveredCard === i ? c.accent : c.accent2,
                  marginBottom: '18px',
                  transition: 'color 0.3s ease',
                  display: 'inline-block',
                  background: isDark ? 'rgba(14,165,233,0.1)' : 'rgba(2,132,199,0.08)',
                  borderRadius: '12px',
                  padding: '10px',
                }}
                  dangerouslySetInnerHTML={{ __html: svc.icon }}
                />

                {/* Number */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: hoveredCard === i ? c.accent : c.text2,
                  letterSpacing: '0.12em', marginBottom: '12px',
                  transition: 'color 0.3s ease',
                }}>
                  {svc.num}
                </div>

                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '22px', color: c.text, marginBottom: '10px',
                }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '14px', color: c.text2, lineHeight: 1.6 }}>
                  {svc.desc}
                </p>
                <div style={{
                  marginTop: '20px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px', fontWeight: 600,
                  color: c.accent, display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'gap 0.2s ease',
                }}>
                  Learn more <span style={{ fontSize: '16px' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Stats Bar ─── */}
        <section style={{
          padding: '48px 24px',
          background: `linear-gradient(135deg, ${c.bg2} 0%, ${c.bg3} 100%)`,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}>
              {stats.map((s, i) => (
                <div key={i} {...anim(1.2 + i * 0.1)}>
                  <div style={{
                    fontSize: '40px', marginBottom: '4px', filter: 'drop-shadow(0 0 8px currentColor)',
                  }}>{s.icon}</div>
                  <div style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    color: c.accent, lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px', color: c.text2, letterSpacing: '0.04em',
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    width: '28px', height: '2px',
                    background: c.warm,
                    margin: '10px auto 0',
                    borderRadius: '1px',
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Us ─── */}
        <section style={{ padding: '72px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div {...anim(1.4)} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px', color: c.accent,
            letterSpacing: '0.2em', marginBottom: '14px',
          }}>THE AQUAFLOW DIFFERENCE</div>
          <h2 {...anim(1.45)} style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: c.text, marginBottom: '48px',
          }}>Why Homeowners Trust Us</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {whyUs.map((w, i) => (
              <div
                key={i}
                {...anim(1.55 + i * 0.1)}
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: '16px',
                  padding: '28px',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div style={{
                  width: '48px', height: '48px',
                  background: `linear-gradient(135deg, ${c.accent}22, ${c.accent}11)`,
                  border: `1px solid ${c.border}`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px',
                  color: c.accent,
                }}
                  dangerouslySetInnerHTML={{ __html: w.icon }}
                />
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700, fontSize: '18px', color: c.text, marginBottom: '8px',
                }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: '14px', color: c.text2, lineHeight: 1.6 }}>
                  {w.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section style={{ padding: '80px 24px', textAlign: 'center', background: c.bg2 }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <h2 {...anim(1.8)} style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: c.text,
              marginBottom: '16px',
              lineHeight: 1,
            }}>
              Got a Plumbing Emergency?
            </h2>
            <p {...anim(1.9)} style={{
              fontSize: '18px', color: c.text2,
              marginBottom: '36px',
            }}>
              Don't wait — our licensed team is standing by around the clock.
            </p>
            <a
              href="#contact"
              {...anim(2.0)}
              style={{
                display: 'inline-block',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '17px',
                background: `linear-gradient(135deg, ${c.warm}, ${c.warm2})`,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                padding: '16px 48px',
                animation: 'pulseGlow 3s ease infinite',
                boxShadow: `0 4px 20px rgba(249,115,22,0.35)`,
                transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
            >
              Get Emergency Service →
            </a>
          </div>
        </section>

        {/* ─── Contact Form ─── */}
        <section id="contact" style={{ padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>
          <div {...anim(2.1)} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px', color: c.accent,
            letterSpacing: '0.2em', marginBottom: '14px',
          }}>SERVICE REQUEST</div>
          <h2 {...anim(2.15)} style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: c.text, marginBottom: '40px',
          }}>Book a Service Call</h2>

          {formSubmitted ? (
            <div {...anim(0.5)} style={{
              background: c.card,
              border: `1.5px solid ${c.accent}`,
              borderRadius: '20px',
              padding: '56px 40px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚿</div>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '28px', color: c.text, marginBottom: '10px' }}>
                Request Received!
              </h3>
              <p style={{ color: c.text2, fontSize: '16px', lineHeight: 1.6 }}>
                We will contact you within 30 minutes to confirm your appointment.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'grid', gap: '20px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Michael Rodriguez"
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: c.inputBg,
                      border: `1.5px solid ${c.border}`,
                      borderRadius: '12px',
                      color: c.text,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px', outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onFocus={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                    onBlur={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel" required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 742-9103"
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: c.inputBg,
                      border: `1.5px solid ${c.border}`,
                      borderRadius: '12px',
                      color: c.text,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '15px', outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onFocus={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                    onBlur={e => { const el = e.target as HTMLInputElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                  SERVICE TYPE
                </label>
                <select
                  required value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: c.inputBg,
                    border: `1.5px solid ${c.border}`,
                    borderRadius: '12px',
                    color: c.text,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px', outline: 'none',
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
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.text2, letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                  DESCRIBE THE ISSUE
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's going on — the more detail the better..."
                  rows={4}
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: c.inputBg,
                    border: `1.5px solid ${c.border}`,
                    borderRadius: '12px',
                    color: c.text,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px', outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={e => { const el = e.target as HTMLTextAreaElement; el.style.borderColor = c.accent; el.style.boxShadow = `0 0 0 3px ${c.glow}`; }}
                  onBlur={e => { const el = e.target as HTMLTextAreaElement; el.style.borderColor = c.border; el.style.boxShadow = 'none'; }}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: '16px',
                  background: `linear-gradient(135deg, ${c.warm}, ${c.warm2})`,
                  color: 'white', border: 'none',
                  borderRadius: '12px',
                  padding: '16px 48px',
                  cursor: 'pointer',
                  width: 'fit-content',
                  boxShadow: `0 4px 16px rgba(249,115,22,0.3)`,
                  transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}
              >
                Submit Request →
              </button>
            </form>
          )}
        </section>

        {/* ─── Footer ─── */}
        <footer style={{
          background: c.footerBg,
          borderTop: `1px solid ${c.border}`,
          padding: '40px 24px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '16px', color: c.accent, marginBottom: '8px', letterSpacing: '0.05em' }}>
                AQUAFLOW PLUMBING
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: c.text2 }}>
                1420 N Cahuenga Blvd, Los Angeles, CA 90028
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: c.text2, marginTop: '4px' }}>
                Mon–Sat 7AM–8PM • Sun 9AM–5PM
              </div>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: c.text2 }}>
              Powered by <span style={{ color: c.accent }}>AEXON AI</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}