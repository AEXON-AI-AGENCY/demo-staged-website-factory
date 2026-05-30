"use client";

import { useState } from "react";

// ── Animation ─────────────────────────────────────────────────────────────────
// Lightning strike: bolt fires from top, branches appear on impact
// Ambient glow: slow amber pulse on the background
// Reduced-motion: static amber glow instead

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ElectricalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    property: "",
    urgency: "",
    message: "",
  });

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
      {/* ── Lightning background animation ───────────────────────────────────── */}
      <div className="electrical-bg" aria-hidden="true">
        {/* Crackle overlay — ambient electrical field */}
        <div className="crackle-overlay" />
        {/* Ambient amber glow */}
        <div className="ambient-glow" />
        {/* Continuous charge lines */}
        <div className="charge-line charge-line-1" />
        <div className="charge-line charge-line-2" />
        <div className="charge-line charge-line-3" />
        <div className="charge-line charge-line-4" />
        <div className="charge-line charge-line-5" />
        {/* 5 lightning bolts */}
        <svg className="bolt bolt-1" viewBox="0 0 40 120" fill="none">
          <path d="M20 0 L8 50 L18 50 L10 120 L22 55 L14 55 L20 0Z"
            fill="#fbbf24" opacity="0.9" />
        </svg>
        <svg className="bolt bolt-2" viewBox="0 0 40 120" fill="none">
          <path d="M20 0 L8 50 L18 50 L10 120 L22 55 L14 55 L20 0Z"
            fill="#fbbf24" opacity="0.7" />
        </svg>
        <svg className="bolt bolt-3" viewBox="0 0 40 120" fill="none">
          <path d="M20 0 L8 50 L18 50 L10 120 L22 55 L14 55 L20 0Z"
            fill="#fbbf24" opacity="0.6" />
        </svg>
        <svg className="bolt bolt-4" viewBox="0 0 40 120" fill="none">
          <path d="M20 0 L8 50 L18 50 L10 120 L22 55 L14 55 L20 0Z"
            fill="#fbbf24" opacity="0.5" />
        </svg>
        <svg className="bolt bolt-5" viewBox="0 0 40 120" fill="none">
          <path d="M20 0 L8 50 L18 50 L10 120 L22 55 L14 55 L20 0Z"
            fill="#fbbf24" opacity="0.4" />
        </svg>
        {/* Warning stripe bottom */}
        <div className="warning-stripe" />
      </div>

      {/* ── Page ─────────────────────────────────────────────────────────────── */}
      <div className="electrical-page">

        {/* Nav */}
        <nav className="electrical-nav">
          <div className="nav-brand">
            <span className="nav-brand-icon">⚡</span>
            <span className="nav-brand-name">CURRENT ELECTRIC</span>
          </div>
          <a href="tel:+15125550231" className="nav-phone">
            <span className="nav-phone-dot" />
            Emergency: (512) 555-0231
          </a>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="eyebrow-tag">LICENSED &amp; INSURED</span>
            <span className="eyebrow-dot">•</span>
            <span className="eyebrow-tag">AUSTIN, TX</span>
            <span className="eyebrow-dot">•</span>
            <span className="eyebrow-tag">FREE ESTIMATES</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-power">POWER</span>
            <span className="headline-on">ON.</span>
          </h1>

          <p className="hero-sub">
            Panel upgrades. EV chargers. New construction wiring.<br />
            Commercial and residential — done to code, on time.
          </p>

          <div className="hero-cta-row">
            <a href="#quote" className="cta-primary">Get a Free Quote</a>
            <a href="tel:+15125550231" className="cta-secondary">Call Now</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">18+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">4.9</span>
              <span className="stat-label">Google Rating</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">12K+</span>
              <span className="stat-label">Jobs Done</span>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider">
          <span className="divider-text"> SERVICES </span>
        </div>

        {/* Services */}
        <section className="services-section">
          <ServiceCard
            number="01"
            title="ELECTRICAL REPAIR"
            description="Faulty outlets, flickering lights, breaker tripping — we diagnose fast, repair right."
            tag="Same-Day Available"
          />
          <ServiceCard
            number="02"
            title="PANEL UPGRADES"
            description="Outdated panel? Maxed out breaker? We replace and upgrade to handle modern loads."
            tag="Permits Handled"
          />
          <ServiceCard
            number="03"
            title="EV CHARGER INSTALL"
            description="Level 2 home charger setup. Tesla, Rivian, any EV — done in one visit."
            tag="Certified Installer"
          />
          <ServiceCard
            number="04"
            title="NEW INSTALLATION"
            description="New construction wiring, additions, remodels. Full permit-to-inspection service."
            tag="Code Compliant"
          />
        </section>

        {/* Trust bar */}
        <section className="trust-bar">
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Licensed Electrician — TX Lic. #45821</span>
          </div>
          <div className="trust-sep" />
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Free On-Site Estimates</span>
          </div>
          <div className="trust-sep" />
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>No Overtime Charges</span>
          </div>
        </section>

        {/* Section divider */}
        <div className="section-divider">
          <span className="divider-text"> GET YOUR ESTIMATE </span>
        </div>

        {/* Quote Form */}
        <section id="quote" className="form-section">
          {submitted ? (
            <div className="form-success">
              <div className="success-icon">⚡</div>
              <h2>Request Received!</h2>
              <p>We&apos;ll call you within 2 hours. For immediate help, call us now at <a href="tel:+15125550231">(512) 555-0231</a>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quote-form" noValidate>
              <div className="form-row">
                <FormField label="Full Name" name="name" type="text" placeholder="Mike Johnson" value={formData.name} onChange={handleChange} required />
                <FormField label="Phone" name="phone" type="tel" placeholder="(512) 555-0000" value={formData.phone} onChange={handleChange} required />
              </div>
              <FormField label="Email" name="email" type="email" placeholder="mike@austinpower.com" value={formData.email} onChange={handleChange} required />
              <div className="form-row">
                <SelectField label="Service Type" name="service" value={formData.service} onChange={handleChange} options={["Electrical Repair", "Panel Upgrade", "EV Charger Install", "New Installation / Remodel", "Safety Inspection", "Other"]} required />
                <SelectField label="Property Type" name="property" value={formData.property} onChange={handleChange} options={["Residential", "Commercial", "Industrial"]} required />
              </div>
              <SelectField label="Urgency" name="urgency" value={formData.urgency} onChange={handleChange} options={["Flexible timeline", "Within 1 week", "Within 48 hours", "Emergency — ASAP"]} required />
              <TextareaField label="Describe the job" name="message" placeholder="Old panel keeps tripping. Home built in 1987, 200amp service..." value={formData.message} onChange={handleChange} />
              <button type="submit" className="submit-btn">
                Get My Free Estimate →
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="electrical-footer">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-brand">⚡ CURRENT ELECTRIC</div>
              <p className="footer-address">
                5501 Congress Ave<br />
                Austin, TX 78745
              </p>
            </div>
            <div className="footer-col">
              <p className="footer-label">SERVICE AREA</p>
              <p className="footer-value">Austin • Round Rock • Cedar Park • Pflugerville • Buda</p>
            </div>
            <div className="footer-col">
              <p className="footer-label">HOURS</p>
              <p className="footer-value">Mon–Sat: 7AM–6PM<br />Emergency service 24/7</p>
            </div>
          </div>
          <div className="footer-bottom">
            <a href="https://aexonai.com/#consultation" className="footer-link">Talk to us →</a>
            <span className="footer-copy">This is a demo by Aexon AI — not a real business. © 2025 Current Electric LLC.</span>
          </div>
        </footer>

      </div>

      {/* ── Styles ─────────────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Fonts ─────────────────────────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        /* ── Page ──────────────────────────────────────────────────────────────── */
        .electrical-page {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          background: transparent;
          color: #f5f5f7;
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
        }

        /* ── Background ────────────────────────────────────────────────────────── */
        .electrical-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #050507;
          overflow: hidden;
        }

        .ambient-glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse at center,
            rgba(251,191,36,0.08) 0%,
            rgba(249,115,22,0.04) 40%,
            transparent 70%);
          animation: amberPulse 4s ease-in-out infinite;
        }

        /* Lightning bolts */
        .bolt {
          position: absolute;
          width: 40px;
          height: 120px;
          top: -120px;
        }

        .bolt-1 {
          left: 15%;
          animation: lightningStrike 4s ease-out 0s infinite;
          filter: drop-shadow(0 0 6px rgba(251,191,36,0.95)) drop-shadow(0 0 14px rgba(251,191,36,0.6));
        }
        .bolt-2 {
          left: 38%;
          animation: lightningStrike 4s ease-out 1.1s infinite;
          transform: scaleX(-1);
          filter: drop-shadow(0 0 6px rgba(251,191,36,0.7)) drop-shadow(0 0 14px rgba(251,191,36,0.4));
        }
        .bolt-3 {
          left: 60%;
          animation: lightningStrike 4s ease-out 2.3s infinite;
          filter: drop-shadow(0 0 6px rgba(251,191,36,0.6)) drop-shadow(0 0 14px rgba(251,191,36,0.3));
        }
        .bolt-4 {
          left: 78%;
          animation: lightningStrike 4s ease-out 0.7s infinite;
          transform: scaleX(-1);
          filter: drop-shadow(0 0 6px rgba(251,191,36,0.5)) drop-shadow(0 0 14px rgba(251,191,36,0.25));
        }
        .bolt-5 {
          left: 91%;
          animation: lightningStrike 4s ease-out 1.8s infinite;
          filter: drop-shadow(0 0 6px rgba(251,191,36,0.4)) drop-shadow(0 0 14px rgba(251,191,36,0.2));
        }

        /* Continuous background charge lines */
        .charge-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.6) 20%, rgba(251,191,36,0.8) 50%, rgba(251,191,36,0.6) 80%, transparent 100%);
          animation: chargeAcross var(--duration, 3s) linear infinite;
          animation-delay: var(--delay, 0s);
          opacity: 0;
        }

        .charge-line-1 { top: 18%; --duration: 2.2s; --delay: 0s; width: 100%; left: -100%; }
        .charge-line-2 { top: 35%; --duration: 2.8s; --delay: 0.6s; width: 80%; left: -80%; }
        .charge-line-3 { top: 52%; --duration: 1.9s; --delay: 1.2s; width: 90%; left: -90%; }
        .charge-line-4 { top: 67%; --duration: 3.1s; --delay: 0.3s; width: 70%; left: -70%; }
        .charge-line-5 { top: 82%; --duration: 2.5s; --delay: 0.9s; width: 85%; left: -85%; }

        /* Global electrical crackle layer */
        .crackle-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 2px 80px at 12% 20%, rgba(251,191,36,0.15) 0%, transparent 100%),
            radial-gradient(ellipse 1px 60px at 45% 45%, rgba(251,191,36,0.1) 0%, transparent 100%),
            radial-gradient(ellipse 2px 90px at 78% 30%, rgba(251,191,36,0.12) 0%, transparent 100%),
            radial-gradient(ellipse 1px 70px at 30% 75%, rgba(251,191,36,0.08) 0%, transparent 100%),
            radial-gradient(ellipse 1px 50px at 65% 85%, rgba(251,191,36,0.1) 0%, transparent 100%);
          animation: cracklePulse 0.15s ease-in-out infinite alternate;
        }

        /* Warning stripe */
        .warning-stripe {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            #fbbf24 0px,
            #fbbf24 16px,
            #050507 16px,
            #050507 32px
          );
          opacity: 0.3;
        }

        /* ── Nav ──────────────────────────────────────────────────────────────── */
        .electrical-nav {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2.5rem;
          border-bottom: 1px solid rgba(251,191,36,0.2);
          background: rgba(5,5,7,0.9);
          backdrop-filter: blur(12px);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-brand-icon {
          font-size: 1.25rem;
          color: #fbbf24;
        }

        .nav-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.125rem;
          letter-spacing: 0.15em;
          color: #f5f5f7;
        }

        .nav-phone {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #fbbf24;
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        .nav-phone-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fbbf24;
          animation: blinkDot 1.5s ease-in-out infinite;
        }

        /* ── Hero ─────────────────────────────────────────────────────────────── */
        .hero {
          position: relative;
          z-index: 10;
          padding: 7rem 2.5rem 5rem;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .eyebrow-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #fbbf24;
          text-transform: uppercase;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.25);
          padding: 0.25rem 0.75rem;
          border-radius: 2px;
        }

        .eyebrow-dot {
          color: rgba(251,191,36,0.4);
          font-size: 0.75rem;
        }

        .hero-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 14vw, 11rem);
          line-height: 0.88;
          letter-spacing: 0.02em;
          margin: 0 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .headline-power {
          color: #f5f5f7;
          text-shadow: 0 1px 0 #000, 0 3px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.5);
        }

        .headline-on {
          color: #fbbf24;
          text-shadow:
            0 0 20px rgba(251,191,36,0.7),
            0 0 60px rgba(251,191,36,0.4),
            0 1px 0 #000,
            0 3px 8px rgba(0,0,0,0.8);
        }

        .hero-sub {
          font-size: 1.0625rem;
          color: #a1a1aa;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 2.5rem;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2.5rem;
          background: #fbbf24;
          color: #050507;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 2px;
          letter-spacing: 0.01em;
          box-shadow: 0 0 28px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 48px rgba(251,191,36,0.55), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2rem;
          background: transparent;
          color: #f5f5f7;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 2px;
          border: 1px solid rgba(245,245,247,0.25);
          transition: all 0.2s;
        }

        .cta-secondary:hover {
          border-color: rgba(245,245,247,0.5);
          background: rgba(245,245,247,0.05);
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-top: 0;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 2rem;
        }

        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #f5f5f7;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #71717a;
        }

        .stat-sep {
          width: 1px;
          height: 36px;
          background: rgba(251,191,36,0.2);
        }

        /* ── Section divider ──────────────────────────────────────────────────── */
        .section-divider {
          display: flex;
          align-items: center;
          padding: 0 2.5rem;
          margin: 1rem 0;
          gap: 1.5rem;
        }

        .section-divider::before,
        .section-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.25), transparent);
        }

        .divider-text {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.2em;
          color: rgba(251,191,36,0.5);
          white-space: nowrap;
        }

        /* ── Services ──────────────────────────────────────────────────────────── */
        .services-section {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          padding: 2rem 2.5rem 3rem;
          max-width: 960px;
          margin: 0 auto;
        }

        /* ── Trust bar ────────────────────────────────────────────────────────── */
        .trust-bar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          padding: 1.75rem 2.5rem;
          border-top: 1px solid rgba(251,191,36,0.15);
          border-bottom: 1px solid rgba(251,191,36,0.15);
          background: rgba(251,191,36,0.03);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 2rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #f5f5f7;
          letter-spacing: 0.04em;
        }

        .trust-icon {
          color: #fbbf24;
          font-size: 0.875rem;
        }

        .trust-sep {
          width: 1px;
          height: 20px;
          background: rgba(251,191,36,0.2);
        }

        /* ── Form ─────────────────────────────────────────────────────────────── */
        .form-section {
          position: relative;
          z-index: 10;
          padding: 4rem 2.5rem;
          max-width: 680px;
          margin: 0 auto;
        }

        .quote-form {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(251,191,36,0.15);
          border-radius: 4px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #a1a1aa;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          color: #f5f5f7;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          appearance: none;
        }

        .form-input::placeholder,
        .form-textarea::placeholder { color: #52525b; }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(251,191,36,0.5);
        }

        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%2371717a' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .form-textarea { resize: vertical; min-height: 100px; }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          background: #fbbf24;
          color: #050507;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 0 24px rgba(251,191,36,0.25);
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          margin-top: 0.5rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(251,191,36,0.45);
        }

        .submit-btn:active { transform: translateY(0); }

        /* Success state */
        .form-success {
          text-align: center;
          padding: 3rem 2rem;
          border: 1px solid rgba(251,191,36,0.25);
          border-radius: 4px;
          background: rgba(251,191,36,0.04);
        }

        .success-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          animation: boltFlash 0.5s ease-out;
        }

        .form-success h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 0.05em;
          color: #f5f5f7;
          margin: 0 0 0.75rem;
        }

        .form-success p {
          color: #a1a1aa;
          font-size: 0.9375rem;
          line-height: 1.7;
          margin: 0;
        }

        .form-success a {
          color: #fbbf24;
          text-decoration: none;
          font-weight: 600;
        }

        /* ── Footer ──────────────────────────────────────────────────────────── */
        .electrical-footer {
          position: relative;
          z-index: 10;
          padding: 3rem 2.5rem 2rem;
          border-top: 1px solid rgba(251,191,36,0.12);
          background: rgba(5,5,7,0.95);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto 2.5rem;
        }

        .footer-col {}

        .footer-brand {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.12em;
          color: #fbbf24;
          margin-bottom: 0.75rem;
        }

        .footer-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #71717a;
          margin: 0 0 0.5rem;
        }

        .footer-value {
          font-size: 0.875rem;
          color: #a1a1aa;
          line-height: 1.6;
          margin: 0;
        }

        .footer-address {
          font-size: 0.875rem;
          color: #71717a;
          line-height: 1.6;
          margin: 0;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .footer-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: #fbbf24;
          text-decoration: none;
        }

        .footer-copy {
          font-size: 0.75rem;
          color: #3f3f46;
        }

        /* ── Keyframes ─────────────────────────────────────────────────────────── */
        @keyframes lightningStrike {
          0%   { transform: translateY(-200px) scaleY(0.3); opacity: 0; }
          8%   { transform: translateY(0) scaleY(1.1); opacity: 1; }
          12%  { transform: translateY(0) scaleY(1); opacity: 0.9; }
          28%  { transform: translateY(0) scaleY(1); opacity: 0; }
          100% { transform: translateY(0) scaleY(1); opacity: 0; }
        }

        @keyframes chargeAcross {
          0%   { transform: translateX(0); opacity: 0; }
          5%   { opacity: 0.7; }
          50%  { opacity: 1; }
          95%  { opacity: 0.5; }
          100% { transform: translateX(calc(100vw + 100%)); opacity: 0; }
        }

        @keyframes cracklePulse {
          0%   { opacity: 0.3; }
          100% { opacity: 0.7; }
        }

        @keyframes amberPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        @keyframes blinkDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        @keyframes boltFlash {
          0%   { opacity: 0; transform: scale(0.5); }
          50%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ── Service card ──────────────────────────────────────────────────────── */
        .service-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(251,191,36,0.12);
          border-top: 3px solid rgba(251,191,36,0.4);
          border-radius: 3px;
          padding: 1.75rem 1.5rem;
          text-align: left;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #fbbf24, transparent);
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: left;
        }

        .service-card:hover {
          border-color: rgba(251,191,36,0.4);
          border-top-color: #fbbf24;
          background: rgba(251,191,36,0.05);
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 16px 48px rgba(251,191,36,0.12),
            0 0 0 1px rgba(251,191,36,0.1),
            inset 0 1px 0 rgba(251,191,36,0.15);
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover .service-card-number {
          color: #fbbf24;
        }

        .service-card-number {
          transition: color 0.3s;
        }

        /* ── Trust bar hover ──────────────────────────────────────────────────── */
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 2rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: #f5f5f7;
          letter-spacing: 0.04em;
          transition: color 0.2s;
          cursor: default;
        }

        .trust-item:hover { color: #fbbf24; }
        .trust-item:hover .trust-icon { transform: scale(1.3); }

        .trust-icon {
          color: #fbbf24;
          font-size: 0.875rem;
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1);
        }

        .service-card-number {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.15em;
          color: rgba(251,191,36,0.5);
          margin-bottom: 0.75rem;
          display: block;
        }

        .service-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.375rem;
          letter-spacing: 0.06em;
          color: #f5f5f7;
          margin: 0 0 0.75rem;
          line-height: 1.1;
        }

        .service-card-desc {
          font-size: 0.875rem;
          color: #71717a;
          line-height: 1.65;
          margin: 0 0 1rem;
        }

        .service-card-tag {
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(251,191,36,0.7);
          background: rgba(251,191,36,0.07);
          border: 1px solid rgba(251,191,36,0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 2px;
        }

        /* ── Reduced motion ────────────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .bolt { animation: none; opacity: 0.3; }
          .ambient-glow { animation: none; }
          .nav-phone-dot { animation: none; }
          .success-icon { animation: none; }
        }

        /* ── Responsive ────────────────────────────────────────────────────────── */
        @media (max-width: 640px) {
          .electrical-nav { padding: 0.875rem 1.25rem; }
          .hero { padding: 5rem 1.25rem 3rem; }
          .hero-headline { font-size: clamp(4rem, 18vw, 6rem); }
          .services-section { padding: 1.5rem 1.25rem 2rem; }
          .form-section { padding: 3rem 1.25rem; }
          .quote-form { padding: 1.5rem; }
          .form-row { grid-template-columns: 1fr; }
          .trust-bar { gap: 0.5rem; }
          .trust-item { padding: 0.5rem 1rem; }
          .trust-sep { display: none; }
          .footer-grid { gap: 1.5rem; }
          .stat { padding: 0 1rem; }
          .stat-num { font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ServiceCard({ number, title, description, tag }: {
  number: string;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <div className="service-card">
      <span className="service-card-number">{number}</span>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{description}</p>
      <span className="service-card-tag">{tag}</span>
    </div>
  );
}

function FormField({ label, name, type, placeholder, value, onChange, required }: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'name'}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; required?: boolean;
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <select className="form-select" name={name} value={value} onChange={onChange} required={required}>
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function TextareaField({ label, name, placeholder, value, onChange }: {
  label: string; name: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <textarea
        className="form-textarea"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
      />
    </div>
  );
}