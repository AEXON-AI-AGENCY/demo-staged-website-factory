"use client";

import { useState } from "react";

export default function SalonPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
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
      {/* ── Background animation ─────────────────────────────────────────── */}
      <div className="salon-bg" aria-hidden="true">
        {/* Polish drip particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="drip"
            style={{
              left: `${8 + i * 12}%`,
              animationDelay: `${i * 1.4}s`,
              animationDuration: `${3.5 + (i % 3) * 0.7}s`,
              opacity: 0.25 + (i % 4) * 0.08,
            }}
          />
        ))}

        {/* Shimmer lines — horizontal streaks */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`shimmer-${i}`}
            className="shimmer-line"
            style={{
              top: `${18 + i * 22}%`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${4 + i * 0.6}s`,
            }}
          />
        ))}

        {/* Ambient glow orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Floating sparkle particles */}
        {["✦", "✧", "⋆", "✦", "✧", "⋆"].map((s, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${10 + i * 14}%`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${5 + i * 0.8}s`,
              fontSize: `${10 + (i % 3) * 4}px`,
              opacity: 0.3 + (i % 3) * 0.15,
            }}
          >
            {s}
          </span>
        ))}

        {/* Gradient bottom */}
        <div className="salon-gradient-bottom" />
      </div>

      {/* ── Page ─────────────────────────────────────────────────────────── */}
      <div className="salon-page">

        {/* Nav */}
        <nav className="salon-nav">
          <div className="nav-brand">
            <span className="nav-brand-icon">♡</span>
            <span className="nav-brand-name">GLAM STUDIO</span>
          </div>
          <a href="tel:+13105550198" className="nav-phone">
            Book: (310) 555-0198
          </a>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-badge-row">
            <span className="badge">Los Angeles, CA</span>
            <span className="badge-sep">♡</span>
            <span className="badge">Open 7 Days</span>
            <span className="badge-sep">♡</span>
            <span className="badge">By Appointment</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-line">GLOW.</span>
            <span className="headline-line accent">GLAM.</span>
            <span className="headline-line">GO.</span>
          </h1>

          <p className="hero-sub">
            Nail art that speaks. Extensions that last.<br />
            Luxe manicures and pedicures in the heart of LA.
          </p>

          <div className="hero-cta-row">
            <a href="#book" className="cta-primary">Book My Appointment</a>
            <a href="#services" className="cta-secondary">Our Services</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">15+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">4.9</span>
              <span className="stat-label">Google Rating</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">8K+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="services-section">
          <ServiceCard
            icon="💅"
            title="MANICURE"
            desc="Classic gel, hard gel extensions,Builder gel. Your nails, elevated."
            tag="From $45"
          />
          <ServiceCard
            icon="🦶"
            title="PEDICURE"
            desc="Spa pedicure with callus treatment, paraffin mask, and extended massage."
            tag="From $55"
          />
          <ServiceCard
            icon="✨"
            title="NAIL ART"
            desc="Chrome, hand-painted designs, 3D charms, French tips, encapsulation."
            tag="Custom Pricing"
          />
        </section>

        {/* Trust ribbon */}
        <div className="trust-ribbon">
          <span className="ribbon-item">✓ Licensed &amp; Certified</span>
          <span className="ribbon-sep">♡</span>
          <span className="ribbon-item">✓ Cruelty-Free Products</span>
          <span className="ribbon-sep">♡</span>
          <span className="ribbon-item">✓ Sanitized Tools</span>
          <span className="ribbon-sep">♡</span>
          <span className="ribbon-item">✓ By Appointment Only</span>
        </div>

        {/* Booking Form */}
        <section id="book" className="form-section">
          <div className="form-header">
            <h2 className="form-title">Reserve Your Spot</h2>
            <p className="form-sub">We&apos;ll confirm your appointment within 2 hours.</p>
          </div>

          {submitted ? (
            <div className="form-success">
              <span className="success-icon">♡</span>
              <h3>You&apos;re Booked!</h3>
              <p>We&apos;ll send a confirmation to {formData.email}. See you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quote-form" noValidate>
              <div className="form-row">
                <FormField label="Full Name" name="name" type="text"
                  placeholder="Aaliyah Johnson" value={formData.name}
                  onChange={handleChange} required />
                <FormField label="Phone" name="phone" type="tel"
                  placeholder="(310) 555-0000" value={formData.phone}
                  onChange={handleChange} required />
              </div>
              <FormField label="Email" name="email" type="email"
                placeholder="aaliyah@example.com" value={formData.email}
                onChange={handleChange} required />
              <div className="form-row">
                <SelectField label="Service" name="service"
                  value={formData.service} onChange={handleChange}
                  options={["Manicure", "Gel Manicure", "Hard Gel Extensions", "Builder Gel", "Pedicure", "Nail Art / Custom", "Full Set + Art"]}
                  required />
                <FormField label="Preferred Date" name="date" type="date"
                  placeholder="" value={formData.date}
                  onChange={handleChange} required />
              </div>
              <TextareaField label="Special Requests" name="message"
                placeholder=" Nail art inspiration, skin allergies, anything we should know..."
                value={formData.message} onChange={handleChange} />
              <button type="submit" className="submit-btn">
                Reserve My Spot ♡
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="salon-footer">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-brand">♡ GLAM STUDIO</div>
              <p className="footer-address">
                8520 Melrose Ave<br />
                West Hollywood, CA 90069
              </p>
            </div>
            <div className="footer-col">
              <p className="footer-label">HOURS</p>
              <p className="footer-value">Mon–Sat: 10AM–8PM<br />Sun: 11AM–6PM</p>
            </div>
            <div className="footer-col">
              <p className="footer-label">CONTACT</p>
              <p className="footer-value">(310) 555-0198<br />hello@glamstudio.la</p>
            </div>
          </div>
          <div className="footer-bottom">
            <a href="https://aexonai.com/#consultation" className="footer-link">Talk to us →</a>
            <span className="footer-copy">This is a demo by Aexon AI — not a real business. © 2025 Glam Studio LLC.</span>
          </div>
        </footer>

      </div>

      {/* ── Styles ────────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Fonts ─────────────────────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&family=Cinzel:wght@500;600&display=swap');

        /* ── Page ──────────────────────────────────────────────────────────── */
        .salon-page {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          background: transparent;
          color: #faf5ff;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* ── Background ────────────────────────────────────────────────────── */
        .salon-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: #0d0611;
          overflow: hidden;
        }

        /* Polish drip */
        .drip {
          position: absolute;
          top: -80px;
          width: 3px;
          height: 80px;
          background: linear-gradient(180deg,
            rgba(244,114,182,0.8) 0%,
            rgba(192,132,252,0.5) 50%,
            transparent 100%);
          border-radius: 2px;
          animation: dripFall var(--duration, 3.5s) ease-in infinite;
          animation-delay: var(--delay, 0s);
        }

        /* Shimmer lines */
        .shimmer-line {
          position: absolute;
          left: -100%;
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(244,114,182,0.4) 30%,
            rgba(192,132,252,0.6) 50%,
            rgba(244,114,182,0.4) 70%,
            transparent 100%);
          animation: shimmerMove var(--duration, 4s) linear infinite;
          animation-delay: var(--delay, 0s);
        }

        /* Ambient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          top: -30%;
          left: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%);
          animation: orbPulse1 6s ease-in-out infinite;
        }

        .orb-2 {
          bottom: 10%;
          right: 5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 70%);
          animation: orbPulse2 7s ease-in-out infinite;
        }

        /* Sparkles */
        .sparkle {
          position: absolute;
          color: #f472b6;
          bottom: -20px;
          animation: sparkleFloat 5s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          text-shadow: 0 0 8px rgba(244,114,182,0.6);
        }

        /* Bottom gradient border */
        .salon-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f472b6, #c084fc, #f472b6);
        }

        /* ── Nav ──────────────────────────────────────────────────────────── */
        .salon-nav {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2.5rem;
          border-bottom: 1px solid rgba(192,132,252,0.2);
          background: rgba(13,6,17,0.85);
          backdrop-filter: blur(16px);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-brand-icon {
          font-size: 1.25rem;
          color: #f472b6;
        }

        .nav-brand-name {
          font-family: 'Cinzel', serif;
          font-size: 0.9375rem;
          letter-spacing: 0.2em;
          color: #faf5ff;
        }

        .nav-phone {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #f472b6;
          text-decoration: none;
        }

        /* ── Hero ─────────────────────────────────────────────────────────── */
        .hero {
          position: relative;
          z-index: 10;
          padding: 7rem 2.5rem 5rem;
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .badge {
          font-family: 'Cinzel', serif;
          font-size: 0.625rem;
          letter-spacing: 0.15em;
          color: #a78bfa;
          border: 1px solid rgba(167,139,250,0.25);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .badge-sep {
          color: rgba(244,114,182,0.4);
          font-size: 0.625rem;
        }

        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: clamp(4rem, 12vw, 9.5rem);
          line-height: 0.9;
          margin: 0 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1em;
        }

        .headline-line {
          display: block;
          color: #faf5ff;
          text-shadow: 0 2px 0 rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4);
        }

        .headline-line.accent {
          background: linear-gradient(135deg, #f472b6 0%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.0625rem;
          color: #a78bfa;
          line-height: 1.75;
          max-width: 480px;
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
          background: linear-gradient(135deg, #f472b6, #c084fc);
          color: #0d0611;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 50px;
          letter-spacing: 0.02em;
          box-shadow: 0 0 32px rgba(244,114,182,0.4), 0 4px 16px rgba(244,114,182,0.25);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }

        .cta-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 56px rgba(244,114,182,0.55), 0 8px 24px rgba(244,114,182,0.3);
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 2rem;
          background: transparent;
          color: #faf5ff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 50px;
          border: 1px solid rgba(250,245,255,0.25);
          transition: all 0.2s;
        }

        .cta-secondary:hover {
          border-color: rgba(250,245,255,0.5);
          background: rgba(250,245,255,0.05);
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 2rem;
        }

        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #faf5ff;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-family: 'Cinzel', serif;
          font-size: 0.5625rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a78bfa;
        }

        .stat-sep {
          width: 1px;
          height: 36px;
          background: rgba(192,132,252,0.25);
        }

        /* ── Services ─────────────────────────────────────────────────────── */
        .services-section {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          padding: 2.5rem 2.5rem 3rem;
          max-width: 960px;
          margin: 0 auto;
        }

        /* ── Trust ribbon ─────────────────────────────────────────────────── */
        .trust-ribbon {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          padding: 1.5rem 2rem;
          border-top: 1px solid rgba(192,132,252,0.15);
          border-bottom: 1px solid rgba(192,132,252,0.15);
          background: rgba(192,132,252,0.04);
        }

        .ribbon-item {
          font-family: 'Cinzel', serif;
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          color: #c084fc;
          padding: 0 1.5rem;
        }

        .ribbon-sep {
          font-size: 0.5rem;
          color: rgba(244,114,182,0.4);
        }

        /* ── Form ─────────────────────────────────────────────────────────── */
        .form-section {
          position: relative;
          z-index: 10;
          padding: 4rem 2.5rem;
          max-width: 680px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #faf5ff;
          margin: 0 0 0.5rem;
          line-height: 1.1;
        }

        .form-sub {
          font-size: 0.9375rem;
          color: #a78bfa;
          margin: 0;
        }

        .quote-form {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(192,132,252,0.2);
          border-radius: 16px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        /* Shimmer overlay on form */
        .quote-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(244,114,182,0.06), transparent);
          animation: formShimmer 4s ease-in-out infinite;
          pointer-events: none;
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
          font-family: 'Cinzel', serif;
          font-size: 0.625rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #faf5ff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          appearance: none;
        }

        .form-input::placeholder,
        .form-textarea::placeholder { color: rgba(167,139,250,0.35); }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(244,114,182,0.5);
          box-shadow: 0 0 0 3px rgba(244,114,182,0.12);
        }

        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23a78bfa' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .form-textarea { resize: vertical; min-height: 96px; }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #f472b6, #c084fc);
          color: #0d0611;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 0.03em;
          box-shadow: 0 0 28px rgba(244,114,182,0.35);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          margin-top: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: btnShimmer 3s ease-in-out infinite;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 48px rgba(244,114,182,0.55);
        }

        .submit-btn:active { transform: translateY(0); }

        /* Success state */
        .form-success {
          text-align: center;
          padding: 3rem 2rem;
          border: 1px solid rgba(244,114,182,0.25);
          border-radius: 16px;
          background: rgba(244,114,182,0.04);
        }

        .success-icon {
          font-size: 2.5rem;
          color: #f472b6;
          display: block;
          margin-bottom: 1rem;
        }

        .form-success h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #faf5ff;
          margin: 0 0 0.75rem;
        }

        .form-success p {
          color: #a78bfa;
          font-size: 0.9375rem;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Footer ───────────────────────────────────────────────────────── */
        .salon-footer {
          position: relative;
          z-index: 10;
          padding: 3rem 2.5rem 2rem;
          border-top: 3px solid transparent;
          border-image: linear-gradient(90deg, #f472b6, #c084fc, #f472b6) 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto 2.5rem;
        }

        .footer-brand {
          font-family: 'Cinzel', serif;
          font-size: 0.875rem;
          letter-spacing: 0.15em;
          color: #f472b6;
          margin-bottom: 0.75rem;
        }

        .footer-label {
          font-family: 'Cinzel', serif;
          font-size: 0.5625rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a78bfa;
          margin: 0 0 0.5rem;
        }

        .footer-value {
          font-size: 0.875rem;
          color: rgba(250,245,255,0.6);
          line-height: 1.65;
          margin: 0;
        }

        .footer-address {
          font-size: 0.875rem;
          color: rgba(250,245,255,0.45);
          line-height: 1.65;
          margin: 0;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(192,132,252,0.12);
        }

        .footer-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: #f472b6;
          text-decoration: none;
        }

        .footer-copy {
          font-size: 0.75rem;
          color: rgba(167,139,250,0.3);
        }

        /* ── Service card ──────────────────────────────────────────────────── */
        .service-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(192,132,252,0.15);
          border-radius: 16px;
          padding: 2rem 1.75rem;
          text-align: center;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        /* Shimmer on hover */
        .service-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg,
            transparent,
            rgba(244,114,182,0.08),
            rgba(192,132,252,0.12),
            transparent);
          transition: left 0.6s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }

        .service-card:hover {
          border-color: rgba(244,114,182,0.4);
          background: rgba(244,114,182,0.05);
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 20px 60px rgba(244,114,182,0.15),
            0 0 0 1px rgba(244,114,182,0.1);
        }

        .service-card:hover::after {
          left: 150%;
        }

        .service-icon {
          font-size: 2.25rem;
          display: block;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 8px rgba(244,114,182,0.4));
        }

        .service-title {
          font-family: 'Cinzel', serif;
          font-size: 0.875rem;
          letter-spacing: 0.18em;
          color: #faf5ff;
          margin: 0 0 0.75rem;
        }

        .service-desc {
          font-size: 0.875rem;
          color: #a78bfa;
          line-height: 1.65;
          margin: 0 0 1.25rem;
        }

        .service-tag {
          display: inline-block;
          font-family: 'Cinzel', serif;
          font-size: 0.5625rem;
          letter-spacing: 0.12em;
          color: #c084fc;
          border: 1px solid rgba(192,132,252,0.3);
          padding: 0.2rem 0.75rem;
          border-radius: 20px;
        }

        /* ── Keyframes ─────────────────────────────────────────────────────── */
        @keyframes dripFall {
          0%   { transform: translateY(-80px) scaleY(0.5); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }

        @keyframes shimmerMove {
          0%   { transform: translateX(0); opacity: 0; }
          8%   { opacity: 1; }
          50%  { opacity: 0.8; }
          92%  { opacity: 0.5; }
          100% { transform: translateX(calc(166vw)); opacity: 0; }
        }

        @keyframes orbPulse1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50%       { transform: translate(30px, -20px) scale(1.15); opacity: 1; }
        }

        @keyframes orbPulse2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          50%       { transform: translate(-20px, 20px) scale(1.1); opacity: 0.9; }
        }

        @keyframes sparkleFloat {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translateY(-90vh) rotate(180deg) scale(0.5); opacity: 0; }
        }

        @keyframes formShimmer {
          0%   { left: -100%; }
          50%  { left: 150%; }
          100% { left: 150%; }
        }

        @keyframes btnShimmer {
          0%   { left: -100%; }
          100% { left: 100%; }
        }

        /* ── Reduced motion ───────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .drip, .shimmer-line, .sparkle, .orb { animation: none; }
          .service-card::after, .quote-form::before { display: none; }
        }

        /* ── Responsive ────────────────────────────────────────────────────── */
        @media (max-width: 640px) {
          .salon-nav { padding: 0.875rem 1.25rem; }
          .hero { padding: 5rem 1.25rem 3rem; }
          .hero-headline { font-size: clamp(3.5rem, 16vw, 6rem); }
          .services-section { padding: 1.5rem 1.25rem 2rem; }
          .form-section { padding: 3rem 1.25rem; }
          .quote-form { padding: 1.5rem; border-radius: 12px; }
          .form-row { grid-template-columns: 1fr; }
          .trust-ribbon { gap: 0.5rem; }
          .ribbon-item { padding: 0.5rem 1rem; }
          .stat { padding: 0 1rem; }
          .stat-num { font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ServiceCard({ icon, title, desc, tag }: {
  icon: string;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <div className="service-card">
      <span className="service-icon">{icon}</span>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{desc}</p>
      <span className="service-tag">{tag}</span>
    </div>
  );
}

function FormField({ label, name, type, placeholder, value, onChange, required }: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({ label, name, placeholder, value, onChange }: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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