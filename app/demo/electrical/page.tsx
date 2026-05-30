"use client";

import { useState } from "react";

export default function CurrentElectricPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    propertyType: "",
    urgency: "",
    description: "",
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
      {/* Page-level electrical pulse traces — ambient, CSS-only, position:fixed */}
      <div className="pulse-traces" aria-hidden="true">
        <PulseTrace index={0} />
        <PulseTrace index={1} />
        <PulseTrace index={2} />
        <PulseTrace index={3} />
        <PulseTrace index={4} />
      </div>

      <div
        className="electrical-page"
        style={{
          minHeight: "100vh",
          background: "#0a0a0f",
          color: "#f0f0f5",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {/* ── Nav ───────────────────────────────────────────────────────────── */}
        <nav
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            borderBottom: "1px solid rgba(0,229,255,0.08)",
            background: "rgba(10,10,15,0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle
                cx="14"
                cy="14"
                r="13"
                stroke="#00e5ff"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <path
                d="M14 5 L17 11 L14 9 L11 11 Z"
                fill="#00e5ff"
                opacity="0.9"
              />
              <path
                d="M14 23 L11 17 L14 19 L17 17 Z"
                fill="#00e5ff"
                opacity="0.9"
              />
              <path
                d="M5 14 L11 11 L9 14 L11 17 Z"
                fill="#00e5ff"
                opacity="0.7"
              />
              <path
                d="M23 14 L17 17 L19 14 L17 11 Z"
                fill="#00e5ff"
                opacity="0.7"
              />
              <circle cx="14" cy="14" r="3" fill="#00e5ff" />
            </svg>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#f0f0f5",
              }}
            >
              Current Electric LLC
            </span>
          </div>
          <a
            href="tel:+160****0234"
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#00e5ff",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            (602) 555-0234
          </a>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            zIndex: 10,
            padding: "6rem 2rem 5rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 70%)",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 1rem",
              borderRadius: "999px",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#00e5ff",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00e5ff",
                display: "inline-block",
              }}
            />
            Licensed Electrical Contractors
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
              color: "#ffffff",
              textShadow:
                "0 1px 0 #000, 0 2px 3px #000, 0 4px 6px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.4)",
              WebkitTextStroke: "1px rgba(0,229,255,0.3)",
              paintOrder: "stroke fill",
              filter: "drop-shadow(0 0 20px rgba(0,229,255,0.15))",
              maxWidth: "800px",
            }}
          >
            Power On.
          </h1>

          {/* Subline */}
          <p
            style={{
              fontSize: "1.0625rem",
              color: "#8888a0",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "2.5rem",
            }}
          >
            Professional electrical services you can trust. From panel upgrades
            to new installations — done right, code-compliant, on time.
</p>

          {/* CTA */}
          <a
            href="#contact-form"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              borderRadius: "999px",
              fontSize: "0.9375rem",
              fontWeight: 700,
              background: "#00e5ff",
              color: "#0a0a0f",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(0,229,255,0.3)",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              (
                e.currentTarget as HTMLAnchorElement
              ).style.transform = "translateY(-2px)";
              (
                e.currentTarget as HTMLAnchorElement
              ).style.boxShadow = "0 0 40px rgba(0,229,255,0.5)";
            }}
            onMouseLeave={(e) => {
              (
                e.currentTarget as HTMLAnchorElement
              ).style.transform = "translateY(0)";
              (
                e.currentTarget as HTMLAnchorElement
              ).style.boxShadow = "0 0 24px rgba(0,229,255,0.3)";
            }}
          >
            Request a Quote
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </section>

        {/* ── Services ─────────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            zIndex: 10,
            padding: "4rem 2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#00e5ff",
                marginBottom: "0.75rem",
              }}
            >
              What We Do
            </p>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#f0f0f5",
                lineHeight: 1.2,
              }}
            >
              Electrical Services
            </h2>
          </div>

          {/* 3-column Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {/* Electrical Repair */}
            <ServiceCard
              icon={<BoltIcon />}
              title="Electrical Repair"
              description="Fast, reliable repairs for outlets, switches, breakers, and wiring issues. We diagnose and fix it right the first time."
            />
            {/* Panel Upgrade */}
            <ServiceCard
              icon={<PanelIcon />}
              title="Panel Upgrade"
              description="Outdated panel? We handle full panel replacements and upgrades to keep your home safe and up to code."
            />
            {/* New Installation */}
            <ServiceCard
              icon={<InstallIcon />}
              title="New Installation"
              description="New construction wiring, lighting installs, EV chargers, and more. Code-compliant from day one."
            />
          </div>
        </section>

        {/* ── Trust Badges ────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            zIndex: 10,
            padding: "3rem 2rem",
            borderTop: "1px solid rgba(0,229,255,0.05)",
            borderBottom: "1px solid rgba(0,229,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            <TrustBadge
              icon={<ShieldIcon />}
              label="Licensed Electrician"
              sub="ROC #310892"
            />
            <TrustBadge
              icon={<ClockIcon />}
              label="Same-Day Service"
              sub="Call before noon"
            />
            <TrustBadge
              icon={<EstimateIcon />}
              label="Free Estimates"
              sub="On-site or virtual"
            />
          </div>
        </section>

        {/* ── Contact Form ────────────────────────────────────────────────── */}
        <section
          id="contact-form"
          style={{
            position: "relative",
            zIndex: 10,
            padding: "5rem 2rem",
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#00e5ff",
              marginBottom: "0.75rem",
            }}
          >
            Contact Us
          </p>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#f0f0f5",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            Request a Quote
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "#8888a0",
              marginBottom: "2.5rem",
              lineHeight: 1.6,
            }}
          >
            Tell us about your project. We'll get back to you within 2
            hours.
          </p>

          {submitted ? (
            <div
              style={{
                padding: "3rem 2rem",
                background: "rgba(0,229,255,0.05)",
                border: "1px solid rgba(0,229,255,0.2)",
                borderRadius: "1rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#f0f0f5",
                  marginBottom: "0.5rem",
                }}
              >
                Request Received!
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "#8888a0",
                  lineHeight: 1.6,
                }}
              >
                We'll be in touch within 2 hours. For urgent issues, call us
                directly at{" "}
                <a
                  href="tel:+160****0234"
                  style={{
                    color: "#00e5ff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  (602) 555-0234
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gap: "1rem", textAlign: "left" }}>
                {/* Name + Phone row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="(602) 555-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Email */}
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {/* Service Type + Property Type row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <SelectField
                    label="Service Type"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    options={[
                      "Electrical Repair",
                      "Panel Upgrade",
                      "New Installation",
                      "Inspection",
                      "Other",
                    ]}
                    required
                  />
                  <SelectField
                    label="Property Type"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    options={[
                      "Single Family Home",
                      "Townhouse",
                      "Condo/Apartment",
                      "Commercial",
                      "Other",
                    ]}
                    required
                  />
                </div>
                {/* Urgency */}
                <SelectField
                  label="Urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  options={[
                    "Not urgent",
                    "Some urgency",
                    "Urgent",
                    "Emergency",
                  ]}
                  required
                />
                {/* Description */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "#8888a0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Describe your electrical needs..."
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.75rem",
                      color: "#f0f0f5",
                      fontSize: "0.9375rem",
                      fontFamily: "inherit",
                      resize: "vertical",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(0,229,255,0.4)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "1.5rem",
                  padding: "1rem 2rem",
                  background: "#00e5ff",
                  color: "#0a0a0f",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: "999px",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(0,229,255,0.25)",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.transform = "translateY(-2px)";
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.boxShadow = "0 0 36px rgba(0,229,255,0.45)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.transform = "translateY(0)";
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.boxShadow = "0 0 20px rgba(0,229,255,0.25)";
                }}
                onMouseDown={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.transform = "translateY(0)";
                }}
              >
                Get My Free Quote →
              </button>
            </form>
          )}
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer
          style={{
            position: "relative",
            zIndex: 10,
            padding: "2rem",
            borderTop: "1px solid rgba(0,229,255,0.05)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#8888a0" }}>
                📍 Phoenix, AZ
              </span>
              <span style={{ fontSize: "0.875rem", color: "#8888a0" }}>
                📞 (602) 555-0234
              </span>
              <span style={{ fontSize: "0.875rem", color: "#8888a0" }}>
                ✉ service@currentelectric.com
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <a
                href="https://aexonai.com/#consultation"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#00e5ff",
                  textDecoration: "none",
                }}
              >
                Talk to us →
              </a>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#3f3f46" }}>
              This is a demo site built by{" "}
              <a
                href="https://aexonai.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#52525b", textDecoration: "none" }}
              >
                Aexon AI
              </a>{" "}
              — not a real business. © 2025 Current Electric LLC.
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

function PulseTrace({ index }: { index: number }) {
  const delays = ["0s", "0.4s", "0.8s", "1.2s", "1.6s"];
  const tops = ["12%", "28%", "44%", "60%", "76%"];
  const widths = ["55%", "70%", "60%", "75%", "50%"];
  return (
    <div
      className="pulse-trace"
      style={{
        position: "fixed",
        top: tops[index],
        left: "-10%",
        width: widths[index],
        height: "1px",
        background:
          "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.8) 40%, rgba(0,229,255,0.3) 80%, transparent 100%)",
        animationDelay: delays[index],
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,229,255,0.12)",
        borderRadius: "1rem",
        padding: "1.75rem",
        textAlign: "left",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "rgba(0,229,255,0.3)";
        el.style.boxShadow = "0 8px 32px rgba(0,229,255,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "rgba(0,229,255,0.12)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "0.75rem",
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          color: "#00e5ff",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#f0f0f5",
          marginBottom: "0.5rem",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#8888a0",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function TrustBadge({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "999px",
          background: "rgba(0,229,255,0.06)",
          border: "1px solid rgba(0,229,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00e5ff",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f0f0f5" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#8888a0" }}>{sub}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "#8888a0",
          marginBottom: "0.5rem",
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
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "0.75rem",
          color: "#f0f0f5",
          fontSize: "0.9375rem",
          fontFamily: "inherit",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "#8888a0",
          marginBottom: "0.5rem",
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
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "0.75rem",
          color: value ? "#f0f0f5" : "#52525b",
          fontSize: "0.9375rem",
          fontFamily: "inherit",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────────

function BoltIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  );
}

function InstallIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function EstimateIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}
