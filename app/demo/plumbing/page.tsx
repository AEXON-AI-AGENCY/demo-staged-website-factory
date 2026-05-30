// Plumbing Demo — AEXON AI
// Design: Manrope + DM Sans + JetBrains Mono | Water droplet animation | Light/Dark theme

'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

// ─── Theme-aware CSS styles (injected via style tag so data-theme selectors work) ───
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  [data-theme="dark"] {
    --bg: #060D1A;
    --bg-secondary: #0B1829;
    --bg-tertiary: #0F2040;
    --text-primary: #F0F6FF;
    --text-secondary: #8BA3C7;
    --accent: #0EA5E9;
    --accent-secondary: #38BDF8;
    --accent-glow: rgba(14, 165, 233, 0.25);
    --accent-warm: #F97316;
    --border: rgba(14, 165, 233, 0.15);
    --droplet-opacity: 0.55;
    --card-border: rgba(14, 165, 233, 0.12);
    --card-glow: 0 8px 32px rgba(14, 165, 233, 0.15);
    --ripple-color: rgba(14, 165, 233, 0.3);
    --nav-bg: rgba(6, 13, 26, 0.85);
    --form-bg: #0B1829;
    --input-bg: #0F2040;
    --footer-bg: #040A14;
  }

  [data-theme="light"] {
    --bg: #F4F9FF;
    --bg-secondary: #E8F4FF;
    --bg-tertiary: #D0E8FF;
    --text-primary: #060D1A;
    --text-secondary: #3D6B8A;
    --accent: #0284C7;
    --accent-secondary: #0EA5E9;
    --accent-glow: rgba(2, 132, 199, 0.15);
    --accent-warm: #EA580C;
    --border: rgba(2, 132, 199, 0.2);
    --droplet-opacity: 0.35;
    --card-border: rgba(2, 132, 199, 0.15);
    --card-glow: 0 8px 32px rgba(2, 132, 199, 0.12);
    --ripple-color: rgba(2, 132, 199, 0.25);
    --nav-bg: rgba(244, 249, 255, 0.88);
    --form-bg: #E8F4FF;
    --input-bg: #F4F9FF;
    --footer-bg: #DDEEFF;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes dropletFall {
    0% { transform: translateY(-20px) translateX(0); opacity: 0; }
    10% { opacity: var(--droplet-opacity, 0.55); }
    85% { opacity: var(--droplet-opacity, 0.55); }
    100% { transform: translateY(105vh) translateX(var(--wobble, 8px)); opacity: 0; }
  }
  @keyframes ripple {
    0% { transform: scale(0.3); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow); }
    50% { box-shadow: 0 0 18px 4px var(--accent-glow); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(250%) skewX(-15deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-up { animation: fadeUp 0.7s ease forwards; opacity: 0; }
  .animate-fade-in { animation: fadeIn 0.5s ease forwards; opacity: 0; }
`;

// ─── Droplet config ───
const droplets = [
  { left: '8%', delay: '0s', duration: '3.2s', size: 5, wobble: '6px' },
  { left: '22%', delay: '0.7s', duration: '4.1s', size: 7, wobble: '-10px' },
  { left: '36%', delay: '1.4s', duration: '3.6s', size: 4, wobble: '8px' },
  { left: '50%', delay: '0.3s', duration: '3.9s', size: 6, wobble: '-6px' },
  { left: '63%', delay: '1.9s', duration: '4.4s', size: 8, wobble: '12px' },
  { left: '76%', delay: '0.9s', duration: '3.4s', size: 5, wobble: '-8px' },
  { left: '88%', delay: '2.2s', duration: '4.0s', size: 6, wobble: '10px' },
  { left: '95%', delay: '1.1s', duration: '3.7s', size: 4, wobble: '-5px' },
];

// ─── Ripple config (splash points at bottom) ───
const ripples = [
  { left: '8%', bottom: '0%', delay: '3.0s' },
  { left: '22%', bottom: '2%', delay: '4.5s' },
  { left: '36%', bottom: '1%', delay: '3.8s' },
  { left: '50%', bottom: '0%', delay: '5.1s' },
  { left: '63%', bottom: '1.5%', delay: '4.0s' },
  { left: '76%', bottom: '0.5%', delay: '3.5s' },
  { left: '88%', bottom: '2%', delay: '4.8s' },
  { left: '95%', bottom: '1%', delay: '3.2s' },
];

// ─── Page data ───
const services = [
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    title: 'Drain Cleaning',
    desc: 'Professional unclogging and hydro-jetting for sinks, toilets, and main lines.',
    num: '01',
  },
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>`,
    title: 'Water Heater',
    desc: 'Install, repair, and replace tank and tankless water heaters. All brands.',
    num: '02',
  },
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
    title: 'Leak Repair',
    desc: 'Fast response to pipe leaks, slab leaks, and fixture failures. Guaranteed seal.',
    num: '03',
  },
  {
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    title: 'Fixture Install',
    desc: 'Faucets, toilets, showers, and appliance connections — installed right the first time.',
    num: '04',
  },
];

const whyUs = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    title: 'Transparent Pricing',
    desc: 'We quote before we quote. No hidden fees, no surprise add-ons. You approve everything.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Licensed & Insured',
    desc: 'Every technician is licensed, background-checked, and covered. Your home is protected.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    title: 'Guaranteed Work',
    desc: "Parts and labor backed by our 2-year guarantee. We come back if it's not right.",
  },
];

const stats = [
  { num: '20+', label: 'Years Experience' },
  { num: '50K+', label: 'Jobs Completed' },
  { num: '4.9★', label: 'Google Rating' },
  { num: '24/7', label: 'Always Available' },
];

export default function PlumbingPage() {
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <style>{pageStyles}</style>

      {/* ─── Theme Toggle ─── */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '1.5px solid var(--border)',
          background: 'var(--bg-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
      >
        {theme === 'dark' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      {/* ─── Water Droplet Background ─── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {droplets.map((d, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: d.left,
            top: 0,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0,
            animation: `dropletFall ${d.duration} ${d.delay} infinite`,
            ['--wobble' as string]: d.wobble,
            boxShadow: `0 0 ${d.size}px var(--accent-glow)`,
          }} />
        ))}
        {ripples.map((r, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: r.left,
            bottom: r.bottom,
            width: '30px',
            height: '10px',
            borderRadius: '50%',
            border: '1.5px solid var(--ripple-color)',
            opacity: 0,
            animation: `ripple 1.2s ${r.delay} infinite`,
          }} />
        ))}
      </div>

      {/* ─── Page Content ─── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'var(--bg)',
        color: 'var(--text-primary)',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: '100vh',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}>

        {/* ─── Nav ─── */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '18px', color: 'var(--accent)', letterSpacing: '0.05em' }}>
              AQUAFLOW PLUMBING
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: 'var(--text-secondary)', display: 'none' }}>
                📞 (555) 742-9103
              </span>
              <a
                href="https://aexonai.com/#consultation"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  border: '1.5px solid var(--border)',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  transition: 'all 0.2s ease',
                }}
              >
                Get Quote
              </a>
            </div>
          </div>
        </nav>

        {/* ─── Hero ─── */}
        <section style={{ padding: '80px 24px 64px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.1s', opacity: 0 }}>
            {/* Emergency badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent-warm)',
              borderRadius: '50px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'pulse-dot 1.5s ease infinite' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 500, color: 'white', letterSpacing: '0.08em' }}>
                24/7 EMERGENCY SERVICE
              </span>
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.92,
            color: 'var(--text-primary)',
            marginBottom: '24px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.2s',
            opacity: 0,
          }}>
            Plumbing<br />
            <span style={{ color: 'var(--accent)' }}>Done Right.</span>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            lineHeight: 1.6,
            marginBottom: '40px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.3s',
            opacity: 0,
          }}>
            Licensed pros. Transparent pricing. No surprises.<br />
            From drippy faucets to full re-pipes — we handle it all.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.4s',
            opacity: 0,
          }}>
            <a
              href="#contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                background: 'var(--accent-warm)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                padding: '14px 32px',
                animation: 'pulse-glow 3s ease infinite',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
            >
              Book Service
            </a>
            <a
              href="tel:5557429103"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: 'var(--accent)',
                textDecoration: 'none',
                border: '1.5px solid var(--border)',
                borderRadius: '10px',
                padding: '14px 32px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--accent)';
                el.style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--border)';
                el.style.background = 'transparent';
              }}
            >
              📞 (555) 742-9103
            </a>
          </div>

          {/* Trust row */}
          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            marginTop: '48px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.5s',
            opacity: 0,
          }}>
            {['Licensed & Insured', '20+ Years', '4.9★ Google', 'Same-Day Arrival'].map((badge, i) => (
              <div key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{ color: 'var(--accent)', fontSize: '14px' }}>✓</span>
                {badge}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Services Grid ─── */}
        <section style={{ padding: '64px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            marginBottom: '16px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.6s',
            opacity: 0,
          }}>
            WHAT WE DO
          </div>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: 'var(--text-primary)',
            marginBottom: '48px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '0.7s',
            opacity: 0,
          }}>
            Our Services
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {services.map((svc, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: `1px solid ${hoveredCard === i ? 'var(--accent)' : 'var(--card-border)'}`,
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hoveredCard === i ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === i ? 'var(--card-glow)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'fadeUp 0.7s ease forwards',
                  animationDelay: `${0.8 + i * 0.1}s`,
                  opacity: 0,
                  cursor: 'pointer',
                }}
              >
                {/* Shimmer on hover */}
                {hoveredCard === i && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.06), transparent)',
                    animation: 'shimmer 0.6s ease forwards',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Number badge */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: hoveredCard === i ? 'var(--accent)' : 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                  transition: 'color 0.3s ease',
                }}>
                  {svc.num}
                </div>

                {/* Icon */}
                <div style={{
                  color: hoveredCard === i ? 'var(--accent)' : 'var(--accent-secondary)',
                  marginBottom: '16px',
                  transition: 'color 0.3s ease',
                }}
                  dangerouslySetInnerHTML={{ __html: svc.icon }}
                />

                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '20px',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                }}>
                  {svc.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {svc.desc}
                </p>
                <a
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'gap 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '8px'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '4px'}
                >
                  Learn more <span style={{ fontSize: '16px' }}>→</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Why Us ─── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-secondary)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              marginBottom: '16px',
              animation: 'fadeUp 0.7s ease forwards',
              animationDelay: '1.1s',
              opacity: 0,
            }}>
              WHY CHOOSE US
            </div>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: 'var(--text-primary)',
              marginBottom: '48px',
              animation: 'fadeUp 0.7s ease forwards',
              animationDelay: '1.2s',
              opacity: 0,
            }}>
              The AquaFlow Difference
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}>
              {whyUs.map((item, i) => (
                <div
                  key={i}
                  style={{
                    animation: 'fadeUp 0.7s ease forwards',
                    animationDelay: `${1.3 + i * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                    style={{ color: 'var(--accent)', marginBottom: '16px' }}
                  />
                  <h3 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: '20px',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section style={{ padding: '64px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px',
            textAlign: 'center',
          }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  animation: 'fadeUp 0.7s ease forwards',
                  animationDelay: `${1.6 + i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(40px, 5vw, 56px)',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.05em',
                }}>
                  {s.label}
                </div>
                <div style={{
                  width: '32px',
                  height: '2px',
                  background: 'var(--accent-warm)',
                  margin: '12px auto 0',
                  borderRadius: '1px',
                }} />
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section style={{ padding: '80px 24px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              animation: 'fadeUp 0.7s ease forwards',
              animationDelay: '2.0s',
              opacity: 0,
            }}>
              Got a Plumbing Emergency?
            </div>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              animation: 'fadeUp 0.7s ease forwards',
              animationDelay: '2.1s',
              opacity: 0,
            }}>
              Don't wait — our team is standing by around the clock.
            </p>
            <a
              href="#contact"
              style={{
                display: 'inline-block',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                background: 'var(--accent-warm)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                padding: '14px 40px',
                animation: 'pulse-glow 3s ease infinite, fadeUp 0.7s ease forwards',
                animationDelay: '2.2s',
                opacity: 0,
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
            >
              Get Emergency Service →
            </a>
          </div>
        </section>

        {/* ─── Contact Form ─── */}
        <section id="contact" style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            marginBottom: '16px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '2.3s',
            opacity: 0,
          }}>
            SERVICE REQUEST
          </div>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'var(--text-primary)',
            marginBottom: '40px',
            animation: 'fadeUp 0.7s ease forwards',
            animationDelay: '2.4s',
            opacity: 0,
          }}>
            Book a Service Call
          </h2>

          {formSubmitted ? (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent)',
              borderRadius: '16px',
              padding: '48px',
              textAlign: 'center',
              animation: 'fadeUp 0.5s ease forwards',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Request Received!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                We'll contact you within 30 minutes to confirm your appointment.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'grid',
                gap: '20px',
                animation: 'fadeUp 0.7s ease forwards',
                animationDelay: '2.5s',
                opacity: 0,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Michael Rodriguez"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--input-bg)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 742-9103"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--input-bg)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                  SERVICE TYPE
                </label>
                <select
                  required
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'var(--input-bg)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                  onFocus={e => (e.target as HTMLSelectElement).style.borderColor = 'var(--accent)'}
                  onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'var(--border)'}
                >
                  <option value="" style={{ background: 'var(--bg-secondary)' }}>Select a service...</option>
                  <option value="drain" style={{ background: 'var(--bg-secondary)' }}>Drain Cleaning</option>
                  <option value="water-heater" style={{ background: 'var(--bg-secondary)' }}>Water Heater</option>
                  <option value="leak" style={{ background: 'var(--bg-secondary)' }}>Leak Repair</option>
                  <option value="fixture" style={{ background: 'var(--bg-secondary)' }}>Fixture Installation</option>
                  <option value="emergency" style={{ background: 'var(--bg-secondary)' }}>Emergency / After Hours</option>
                  <option value="other" style={{ background: 'var(--bg-secondary)' }}>Other</option>
                </select>
              </div>

              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                  DESCRIBE THE ISSUE
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's going on — the more detail the better..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'var(--input-bg)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent)'}
                  onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '16px',
                  background: 'var(--accent-warm)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '16px 40px',
                  cursor: 'pointer',
                  animation: 'pulse-glow 3s ease infinite',
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}
              >
                Submit Request
              </button>
            </form>
          )}
        </section>

        {/* ─── Footer ─── */}
        <footer style={{
          background: 'var(--footer-bg, var(--bg-secondary))',
          borderTop: '1px solid var(--border)',
          padding: '40px 24px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '16px', color: 'var(--accent)', marginBottom: '8px' }}>
                AQUAFLOW PLUMBING
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--text-secondary)' }}>
                1420 N Cahuenga Blvd, Los Angeles, CA 90028
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Mon-Sat 7AM-8PM • Sun 9AM-5PM
              </div>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--text-secondary)' }}>
              Powered by <span style={{ color: 'var(--accent)' }}>AEXON AI</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}