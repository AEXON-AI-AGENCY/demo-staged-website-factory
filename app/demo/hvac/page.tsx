"use client";

import { useState } from "react";

export default function CoolProPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    unitAge: "",
    service: "",
    urgency: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Page-level airflow particles — ambient, CSS-only, position:fixed */}
      <div className="airflow-particles" aria-hidden="true">
        <Particle index={0} />
        <Particle index={1} />
        <Particle index={2} />
        <Particle index={3} />
        <Particle index={4} />
        <Particle index={5} />
        <Particle index={6} />
        <Particle index={7} />
        <Particle index={8} />
        <Particle index={9} />
        <Particle index={10} />
        <Particle index={11} />
        <Particle index={12} />
        <Particle index={13} />
        <Particle index={14} />
        <Particle index={15} />
        <Particle index={16} />
        <Particle index={17} />
        <Particle index={18} />
        <Particle index={19} />
        <Particle index={20} />
        <Particle index={21} />
        <Particle index={22} />
        <Particle index={23} />
        <Particle index={24} />
        <Particle index={25} />
        <Particle index={26} />
        <Particle index={27} />
        <Particle index={28} />
        <Particle index={29} />
        <Particle index={30} />
        <Particle index={31} />
        <Particle index={32} />
        <Particle index={33} />
        <Particle index={34} />
        <Particle index={35} />
        <Particle index={36} />
        <Particle index={37} />
        <Particle index={38} />
        <Particle index={39} />
      </div>

      <div
        className="hvac-page"
        style={{ minHeight: "100vh", background: "#09090b", color: "#f4f4f5", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* ── Nav ───────────────────────────────────────────────────────────── */}
        <nav style={{
          position: "relative", zIndex: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(9,9,11,0.85)",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />
              <path d="M14 6 L17 12 L14 10 L11 12 Z" fill="#22d3ee" opacity="0.8" />
              <path d="M14 22 L11 16 L14 18 L17 16 Z" fill="#22d3ee" opacity="0.8" />
              <path d="M6 14 L12 11 L10 14 L12 17 Z" fill="#22d3ee" opacity="0.6" />
              <path d="M22 14 L16 17 L18 14 L16 11 Z" fill="#22d3ee" opacity="0.6" />
              <circle cx="14" cy="14" r="3" fill="#22d3ee" />
            </svg>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f4f4f5" }}>
              CoolPro HVAC
            </span>
          </div>
          <a
            href="tel:+16025550198"
            style={{ fontSize: "0.875rem", fontWeight: 600, color: "#22d3ee", textDecoration: "none", letterSpacing: "0.02em" }}
          >
            (602) 555-0198
          </a>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section style={{
          position: "relative", zIndex: 10,
          padding: "6rem 2rem 5rem",
          textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,211,238,0.07) 0%, transparent 70%)",
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.375rem 1rem", borderRadius: "999px",
            fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#22d3ee", background: "rgba(34,211,238,0.08)",
            border: "1px solid rgba(34,211,238,0.2)",
            marginBottom: "2rem",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22d3ee", display: "inline-block" }} />
            Phoenix&apos;s Trusted HVAC Experts
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: "-0.04em", marginBottom: "1.5rem",
            color: "#ffffff",
            textShadow: "0 1px 0 #000, 0 2px 3px #000, 0 4px 6px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.4)",
            WebkitTextStroke: "1px rgba(34,211,238,0.3)",
            paintOrder: "stroke fill",
            filter: "drop-shadow(0 0 20px rgba(34,211,238,0.15))",
            maxWidth: "800px",
          }}>
            Cool Air. Always.
          </h1>

          {/* Subline */}
          <p style={{
            fontSize: "1.0625rem", color: "#a1a1aa", lineHeight: 1.7,
            maxWidth: "540px", marginBottom: "2.5rem",
          }}>
            Professional HVAC services you can trust. Repairs, installations, and maintenance — done right, on time.
          </p>

          {/* CTA */}
          <a
            href="#quote-form"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 2rem", borderRadius: "999px",
              fontSize: "0.9375rem", fontWeight: 700,
              background: "#22d3ee", color: "#09090b", textDecoration: "none",
              boxShadow: "0 0 24px rgba(34,211,238,0.3)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(34,211,238,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(34,211,238,0.3)";
            }}
          >
            Get a Free Quote
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </section>

        {/* ── Services ─────────────────────────────────────────────────────── */}
        <section style={{
          position: "relative", zIndex: 10,
          padding: "4rem 2rem",
          maxWidth: "900px", margin: "0 auto",
        }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22d3ee", marginBottom: "0.75rem" }}>
              What We Do
            </p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.2 }}>
              Services Built Around Your Comfort
            </h2>
          </div>

          {/* 2x2 Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {/* AC Repair */}
            <ServiceCard
              icon={<ACRepairIcon />}
              title="AC Repair"
              description="Fast diagnosis and repair for all makes and models. We get it cool — fast."
            />
            {/* Heating */}
            <ServiceCard
              icon={<HeatingIcon />}
              title="Heating"
              description="Furnace service, heat pump installation, and emergency heating for the cold months."
            />
            {/* Maintenance */}
            <ServiceCard
              icon={<MaintenanceIcon />}
              title="Maintenance"
              description="Annual tune-ups that extend equipment life and prevent costly breakdowns."
            />
            {/* Installation */}
            <ServiceCard
              icon={<InstallationIcon />}
              title="Installation"
              description="New unit installs with transparent pricing, permits handled, and warranty support."
            />
          </div>
        </section>

        {/* ── Trust Badges ────────────────────────────────────────────────── */}
        <section style={{
          position: "relative", zIndex: 10,
          padding: "3rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{
            display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem", maxWidth: "860px", margin: "0 auto",
          }}>
            <TrustBadge
              icon={<ShieldIcon />}
              label="Licensed & Insured"
              sub="ROC #298475"
            />
            <TrustBadge
              icon={<ClockIcon />}
              label="24/7 Emergency"
              sub="Same-day response"
            />
            <TrustBadge
              icon={<StarIcon />}
              label="15+ Years"
              sub="Serving Phoenix"
            />
          </div>
        </section>

        {/* ── AI Quote Form ────────────────────────────────────────────────── */}
        <section id="quote-form" style={{
          position: "relative", zIndex: 10,
          padding: "5rem 2rem",
          maxWidth: "640px", margin: "0 auto",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22d3ee", marginBottom: "0.75rem" }}>
            Free Estimate
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.2, marginBottom: "0.75rem" }}>
            Request a Quote
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "#71717a", marginBottom: "2.5rem", lineHeight: 1.6 }}>
            Tell us about your needs. We&apos;ll get back to you within 2 hours.
          </p>

          {submitted ? (
            <div style={{
              padding: "3rem 2rem",
              background: "rgba(34,211,238,0.05)",
              border: "1px solid rgba(34,211,238,0.2)",
              borderRadius: "1rem",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f4f4f5", marginBottom: "0.5rem" }}>
                Request Received!
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#71717a", lineHeight: 1.6 }}>
                We&apos;ll be in touch within 2 hours. For urgent issues, call us directly at{" "}
                <a href="tel:+16025550198" style={{ color: "#22d3ee", textDecoration: "none", fontWeight: 600 }}>
                  (602) 555-0198
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gap: "1rem", textAlign: "left" }}>
                {/* Name + Phone row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Name" name="name" type="text" placeholder="John Smith" value={formData.name} onChange={handleChange} required />
                  <Field label="Phone" name="phone" type="tel" placeholder="(602) 555-0000" value={formData.phone} onChange={handleChange} required />
                </div>
                {/* Email */}
                <Field label="Email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                {/* Address */}
                <Field label="Address" name="address" type="text" placeholder="7842 W Camelback Rd, Phoenix, AZ" value={formData.address} onChange={handleChange} required />
                {/* Unit Age + Service row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <SelectField label="AC Unit Age" name="unitAge" value={formData.unitAge} onChange={handleChange} options={["Under 5 years", "5–10 years", "10–15 years", "15+ years"]} required />
                  <SelectField label="Service Needed" name="service" value={formData.service} onChange={handleChange} options={["Repair", "Installation", "Maintenance", "Replacement"]} required />
                </div>
                {/* Urgency */}
                <SelectField label="Urgency" name="urgency" value={formData.urgency} onChange={handleChange} options={["Not urgent", "Some urgency", "Urgent", "Emergency"]} required />
                {/* Notes */}
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#a1a1aa", marginBottom: "0.5rem" }}>
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Describe your issue or any specific concerns..."
                    value={formData.notes}
                    onChange={handleChange}
                    style={{
                      width: "100%", padding: "0.75rem 1rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.75rem",
                      color: "#f4f4f5", fontSize: "0.9375rem",
                      fontFamily: "inherit",
                      resize: "vertical", outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: "100%", marginTop: "1.5rem",
                  padding: "1rem 2rem",
                  background: "#22d3ee", color: "#09090b",
                  fontSize: "0.9375rem", fontWeight: 700,
                  border: "none", borderRadius: "999px",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(34,211,238,0.25)",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(34,211,238,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(34,211,238,0.25)";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Get My Free Quote →
              </button>
            </form>
          )}
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer style={{
          position: "relative", zIndex: 10,
          padding: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.875rem", color: "#71717a" }}>📍 Phoenix, AZ</span>
              <span style={{ fontSize: "0.875rem", color: "#71717a" }}>📞 (602) 555-0198</span>
              <span style={{ fontSize: "0.875rem", color: "#71717a" }}>✉ service@coolprohvac.com</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <a href="https://aexonai.com/#consultation" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#22d3ee", textDecoration: "none" }}>
                Talk to us →
              </a>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#3f3f46" }}>
              This is a demo site built by{" "}
              <a href="https://aexonai.com" target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", textDecoration: "none" }}>
                Aexon AI
              </a>{" "}
              — not a real business. © 2025 CoolPro HVAC.
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 640px) {
          form div:first-child > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ServiceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(34,211,238,0.15)",
      borderRadius: "1rem",
      padding: "1.75rem",
      textAlign: "left",
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = "translateY(-4px)";
      el.style.borderColor = "rgba(34,211,238,0.35)";
      el.style.boxShadow = "0 8px 32px rgba(34,211,238,0.1)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = "translateY(0)";
      el.style.borderColor = "rgba(34,211,238,0.15)";
      el.style.boxShadow = "none";
    }}
    >
      <div style={{
        width: "44px", height: "44px", borderRadius: "0.75rem",
        background: "rgba(34,211,238,0.08)",
        border: "1px solid rgba(34,211,238,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1rem", color: "#22d3ee",
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f4f4f5", marginBottom: "0.5rem", lineHeight: 1.3 }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "#71717a", lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

function TrustBadge({ icon, label, sub }: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "999px",
        background: "rgba(34,211,238,0.06)",
        border: "1px solid rgba(34,211,238,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#22d3ee", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f4f4f5" }}>{label}</div>
        <div style={{ fontSize: "0.75rem", color: "#71717a" }}>{sub}</div>
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder, value, onChange, required }: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#a1a1aa", marginBottom: "0.5rem" }}>
        {label}{required && <span style={{ color: "#22d3ee", marginLeft: "2px" }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%", padding: "0.75rem 1rem",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "0.75rem",
          color: "#f4f4f5", fontSize: "0.9375rem",
          fontFamily: "inherit", outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
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
    <div>
      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#a1a1aa", marginBottom: "0.5rem" }}>
        {label}{required && <span style={{ color: "#22d3ee", marginLeft: "2px" }}>*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%", padding: "0.75rem 1rem",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "0.75rem",
          color: value ? "#f4f4f5" : "#71717a",
          fontSize: "0.9375rem", fontFamily: "inherit", outline: "none",
          boxSizing: "border-box", cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%2371717a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          paddingRight: "2.5rem",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        <option value="" disabled>Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: "#18181b", color: "#f4f4f5" }}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function ACRepairIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function HeatingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 4-4 6-4 10a6 6 0 0 0 12 0c0-4-4-6-4-10z" />
      <path d="M12 12c0 2.2-1.8 4-1.8 4s1.8 1.8 1.8 4" />
    </svg>
  );
}

function MaintenanceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function InstallationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Airflow Particle ────────────────────────────────────────────────────────
// 40 unique particles with pseudo-randomized positions, sizes, colors, speeds
function Particle({ index }: { index: number }) {
  // Deterministic pseudo-random from index — no JS Math.random per render
  const seeds = [
    { x: 5,   y: 105, sz: 5, op: 0.55, dur: 22, delay: 0    },
    { x: 12,  y: 108, sz: 4, op: 0.35, dur: 18, delay: -4    },
    { x: 28,  y: 102, sz: 7, op: 0.4,  dur: 28, delay: -8    },
    { x: 40,  y: 110, sz: 3, op: 0.25, dur: 16, delay: -2    },
    { x: 55,  y: 106, sz: 6, op: 0.5,  dur: 24, delay: -12   },
    { x: 68,  y: 103, sz: 4, op: 0.3,  dur: 20, delay: -6    },
    { x: 80,  y: 109, sz: 5, op: 0.45, dur: 26, delay: -10   },
    { x: 92,  y: 104, sz: 3, op: 0.28, dur: 15, delay: -3    },
    { x: 8,   y: 107, sz: 6, op: 0.5,  dur: 23, delay: -14   },
    { x: 22,  y: 105, sz: 4, op: 0.38, dur: 19, delay: -7    },
    { x: 36,  y: 111, sz: 5, op: 0.42, dur: 21, delay: -11   },
    { x: 50,  y: 108, sz: 7, op: 0.55, dur: 27, delay: -1    },
    { x: 63,  y: 104, sz: 3, op: 0.3,  dur: 17, delay: -9    },
    { x: 75,  y: 106, sz: 5, op: 0.48, dur: 25, delay: -5    },
    { x: 88,  y: 102, sz: 4, op: 0.35, dur: 18, delay: -13   },
    { x: 15,  y: 110, sz: 6, op: 0.5,  dur: 22, delay: -15   },
    { x: 32,  y: 105, sz: 3, op: 0.28, dur: 16, delay: -4    },
    { x: 47,  y: 109, sz: 5, op: 0.44, dur: 24, delay: -8    },
    { x: 60,  y: 103, sz: 4, op: 0.38, dur: 20, delay: -2    },
    { x: 73,  y: 107, sz: 6, op: 0.52, dur: 26, delay: -6    },
    { x: 85,  y: 111, sz: 3, op: 0.3,  dur: 17, delay: -12   },
    { x: 3,   y: 106, sz: 5, op: 0.46, dur: 23, delay: -10   },
    { x: 18,  y: 104, sz: 7, op: 0.55, dur: 28, delay: -3    },
    { x: 33,  y: 108, sz: 4, op: 0.34, dur: 19, delay: -7    },
    { x: 48,  y: 102, sz: 6, op: 0.5,  dur: 25, delay: -11   },
    { x: 62,  y: 110, sz: 3, op: 0.28, dur: 15, delay: -1    },
    { x: 76,  y: 105, sz: 5, op: 0.42, dur: 21, delay: -14   },
    { x: 90,  y: 109, sz: 4, op: 0.36, dur: 18, delay: -5    },
    { x: 10,  y: 107, sz: 6, op: 0.48, dur: 23, delay: -9    },
    { x: 25,  y: 103, sz: 5, op: 0.44, dur: 22, delay: -13   },
    { x: 38,  y: 111, sz: 3, op: 0.3,  dur: 16, delay: -2    },
    { x: 52,  y: 106, sz: 4, op: 0.38, dur: 20, delay: -8    },
    { x: 66,  y: 104, sz: 7, op: 0.55, dur: 27, delay: -4    },
    { x: 78,  y: 108, sz: 5, op: 0.5,  dur: 24, delay: -12   },
    { x: 2,   y: 105, sz: 3, op: 0.28, dur: 17, delay: -6    },
    { x: 20,  y: 110, sz: 6, op: 0.52, dur: 26, delay: -10   },
    { x: 42,  y: 103, sz: 4, op: 0.34, dur: 19, delay: -1    },
    { x: 58,  y: 107, sz: 5, op: 0.46, dur: 23, delay: -15   },
    { x: 83,  y: 109, sz: 3, op: 0.3,  dur: 16, delay: -7    },
    { x: 96,  y: 105, sz: 4, op: 0.36, dur: 18, delay: -3    },
  ];
  const s = seeds[index % seeds.length];
  const driftSign = index % 2 === 0 ? 1 : -1;
  return (
    <div
      className="airflow-particle"
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.sz}px`,
        height: `${s.sz}px`,
        background: `rgba(34,211,238,${s.op * 0.5})`,
        boxShadow: `0 0 ${s.sz * 2}px rgba(34,211,238,${s.op * 0.3})`,
        "--op": s.op,
        "--dur": `${s.dur}s`,
        "--delay": `${s.delay}s`,
        "--drift": `${driftSign * (s.x * 0.4)}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}