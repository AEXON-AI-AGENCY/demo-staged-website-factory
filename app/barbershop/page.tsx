"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ProspectData } from "../salon/page";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const DEFAULT_BARBERSHOP_PROSPECT: ProspectData = {
  name: "Bayside Barbershop",
  phone: "(718) 555-0100",
  phoneHref: "tel:+17185550100",
  email: "hello@baysidebarbers.com",
  city: "Brooklyn",
  state: "NY",
  address: "Brooklyn, NY",
  tagline: "Neighborhood cuts and clean fades",
  vertical: "barber",
};

const services = [
  { title: "Classic Cut", price: "$25", copy: "Scissor or clipper cut finished sharp, clean, and ready for the week." },
  { title: "Skin Fade", price: "$30", copy: "Low, mid, or high fade with tight blend work and a crisp neck finish." },
  { title: "Beard Trim", price: "$15", copy: "Shape, taper, and detail work for clean lines without overdoing it." },
  { title: "Hot Towel Shave", price: "$35", copy: "Warm towel prep, straight razor detail, and a calm finish." },
  { title: "Kids Cut", price: "$18", copy: "Fast, patient cuts for kids who need clean style without the fuss." },
  { title: "Line-Up Only", price: "$20", copy: "Edges, neck, beard perimeter, and quick polish between full cuts." },
];

const trustBadges = ["Master Barbers", "Walk-Ins Welcome", "Hot Towel Service", "Est. 2014"];

const demoMessages = [
  ["Guest", "Can I get a skin fade and beard trim after 5 today?"],
  ["Bayside AI", "Marcus has 5:40 open. I can hold a fade, beard trim, and hot towel finish."],
  ["Guest", "Book it and text me the address."],
  ["Bayside AI", "You're set for 5:40. Confirmation and directions are on the way."],
];

function ScissorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.2rem", height: "1.2rem" }}>
      <circle cx="6" cy="7" r="3" />
      <circle cx="6" cy="17" r="3" />
      <path d="M8.3 8.7 21 3" />
      <path d="M8.3 15.3 21 21" />
      <path d="m11.5 12 3-1.35" />
      <path d="m11.5 12 3 1.35" />
    </svg>
  );
}

export default function BarbershopPage({
  prospect = DEFAULT_BARBERSHOP_PROSPECT,
}: {
  prospect?: ProspectData;
}) {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    service: services[0].title,
    time: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#0A0A0B";
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className={`${bebas.variable} ${plexMono.variable} ${plexSans.variable}`}
      style={{
        minHeight: "100vh",
        background: "#0A0A0B",
        color: "#F8F5EC",
        fontFamily: "var(--font-plex-sans), sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes barberSlide { from { background-position: 0 0; } to { background-position: 120px 0; } }
        @keyframes scissorPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(228, 232, 235, 0)); } 50% { transform: scale(1.14); filter: drop-shadow(0 0 18px rgba(228, 232, 235, 0.5)); } }
        @keyframes cardRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "0.65rem",
          zIndex: 80,
          background:
            "repeating-linear-gradient(115deg, #B91C1C 0 18px, #F8F5EC 18px 36px, #F4B400 36px 54px, #F8F5EC 54px 72px)",
          animation: "barberSlide 7s linear infinite",
          boxShadow: "0 0 28px rgba(244,180,0,0.36)",
        }}
      />

      <nav
        style={{
          position: "sticky",
          top: "0.65rem",
          zIndex: 60,
          background: "rgba(10,10,11,0.86)",
          borderBottom: "1px solid rgba(244,180,0,0.2)",
          backdropFilter: "blur(18px)",
          padding: "1rem clamp(1rem, 4vw, 3rem)",
        }}
      >
        <div style={{ maxWidth: "76rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#" style={{ color: "#F8F5EC", textDecoration: "none", display: "grid", gap: "0.1rem" }}>
            <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.8rem", letterSpacing: "0.04em" }}>{prospect.name}</span>
            <span style={{ color: "#B8B3A6", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.72rem", textTransform: "uppercase" }}>{prospect.city}, {prospect.state}</span>
          </a>
          <div style={{ display: "flex", gap: "0.9rem", alignItems: "center", flexWrap: "wrap", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.78rem", textTransform: "uppercase" }}>
            <a href="#services" style={{ color: "#B8B3A6", textDecoration: "none" }}>Services</a>
            <a href="#ai-demo" style={{ color: "#B8B3A6", textDecoration: "none" }}>Book by chat</a>
            <a href={prospect.phoneHref} style={{ color: "#0A0A0B", background: "#F4B400", textDecoration: "none", padding: "0.72rem 1rem", borderRadius: "999px", fontWeight: 700 }}>{prospect.phone}</a>
          </div>
        </div>
      </nav>

      <main>
        <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem) 3rem" }}>
          <div style={{ maxWidth: "76rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
            <div style={{ display: "grid", gap: "1.3rem" }}>
              <div style={{ color: "#F4B400", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>Walk-ins, appointments, real chair time</div>
              <h1 style={{ margin: 0, fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(4.4rem, 14vw, 9rem)", lineHeight: 0.84, letterSpacing: "0.02em" }}>
                Sharp cuts.
                <br />
                Clean fades.
                <br />
                Real conversation.
              </h1>
              <p style={{ margin: 0, maxWidth: "35rem", color: "#D6D0C4", fontSize: "1.08rem", lineHeight: 1.75 }}>
                A modern neighborhood barbershop built for clean blends, steady hands, and booking that gets you in the chair without phone tag.
              </p>
              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                <a href="#contact" style={{ color: "#0A0A0B", background: "#F4B400", textDecoration: "none", padding: "0.95rem 1.2rem", borderRadius: "999px", fontWeight: 800 }}>Book a chair</a>
                <a href="#services" style={{ color: "#F8F5EC", border: "1px solid rgba(248,245,236,0.18)", textDecoration: "none", padding: "0.95rem 1.2rem", borderRadius: "999px" }}>See prices</a>
              </div>
            </div>
            <div style={{ position: "relative", minHeight: "34rem", border: "1px solid rgba(244,180,0,0.22)", background: "#151516", overflow: "hidden", boxShadow: "0 30px 90px rgba(0,0,0,0.42)" }}>
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80" alt="Barber cutting hair in a barbershop" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.74) contrast(1.08)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,11,0.04) 0%, rgba(10,10,11,0.78) 100%)" }} />
              <div style={{ position: "absolute", left: "1.2rem", right: "1.2rem", bottom: "1.2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))", gap: "0.75rem" }}>
                {trustBadges.map((badge) => (
                  <div key={badge} style={{ background: "rgba(10,10,11,0.72)", border: "1px solid rgba(248,245,236,0.14)", padding: "0.9rem", backdropFilter: "blur(12px)", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.72rem", textTransform: "uppercase", color: "#F8F5EC" }}>{badge}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Trust bar" style={{ borderTop: "1px solid rgba(244,180,0,0.2)", borderBottom: "1px solid rgba(244,180,0,0.2)", background: "#111112", padding: "1rem clamp(1rem, 4vw, 3rem)" }}>
          <div style={{ maxWidth: "76rem", margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ color: "#E4E8EB", animation: "scissorPulse 2.8s ease-in-out infinite" }}><ScissorIcon /></div>
            {trustBadges.map((badge) => (
              <span key={badge} style={{ color: "#D6D0C4", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{badge}</span>
            ))}
          </div>
        </section>

        <section id="services" style={{ padding: "4rem clamp(1rem, 4vw, 3rem)" }}>
          <div style={{ maxWidth: "76rem", margin: "0 auto", display: "grid", gap: "1.5rem" }}>
            <div>
              <div style={{ color: "#F4B400", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Menu board</div>
              <h2 style={{ margin: 0, fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 0.9 }}>Cuts priced clean.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "1rem" }}>
              {services.map((service, index) => (
                <article key={service.title} style={{ border: "1px solid rgba(244,180,0,0.2)", background: index % 2 ? "rgba(255,255,255,0.04)" : "rgba(244,180,0,0.07)", padding: "1.2rem", minHeight: "13rem", display: "grid", alignContent: "space-between", gap: "1rem", animation: `cardRise 520ms ease ${index * 70}ms both` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "start" }}>
                    <h3 style={{ margin: 0, fontFamily: "var(--font-bebas), sans-serif", fontSize: "2.4rem", lineHeight: 0.92 }}>{service.title}</h3>
                    <span style={{ color: "#F4B400", fontFamily: "var(--font-plex-mono), monospace", fontWeight: 700 }}>{service.price}</span>
                  </div>
                  <p style={{ margin: 0, color: "#C9C2B6", lineHeight: 1.65 }}>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ai-demo" style={{ padding: "1rem clamp(1rem, 4vw, 3rem) 4rem" }}>
          <div style={{ maxWidth: "76rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))", gap: "1.2rem" }}>
            <div style={{ border: "1px solid rgba(244,180,0,0.2)", background: "#121213", padding: "1.4rem", display: "grid", gap: "1rem" }}>
              <div style={{ color: "#F4B400", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>Book by chat</div>
              <h2 style={{ margin: 0, fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 0.9 }}>Your chair, held.</h2>
              <p style={{ margin: 0, color: "#D6D0C4", lineHeight: 1.7 }}>Guests can text for a fade, beard trim, kids cut, or hot towel shave. The concierge confirms the service, time, and barber before the shop has to pick up the phone.</p>
            </div>
            <div style={{ border: "1px solid rgba(248,245,236,0.14)", background: "#171718", padding: "1rem", display: "grid", gap: "0.8rem" }}>
              {demoMessages.map(([label, text]) => (
                <div key={text} style={{ justifySelf: label === "Guest" ? "end" : "start", maxWidth: "88%", background: label === "Guest" ? "rgba(244,180,0,0.14)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "0.85rem 0.95rem" }}>
                  <div style={{ color: "#F4B400", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.68rem", textTransform: "uppercase", marginBottom: "0.35rem" }}>{label}</div>
                  <div style={{ color: "#F8F5EC", lineHeight: 1.55 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={{ padding: "0 clamp(1rem, 4vw, 3rem) 5rem" }}>
          <div style={{ maxWidth: "76rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))", gap: "1.2rem" }}>
            <div style={{ background: "#111112", border: "1px solid rgba(244,180,0,0.2)", padding: "1.4rem", display: "grid", alignContent: "start", gap: "1rem" }}>
              <h2 style={{ margin: 0, fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 0.9 }}>Pull up clean.</h2>
              <p style={{ margin: 0, color: "#D6D0C4", lineHeight: 1.7 }}>{prospect.address}</p>
              <a href={prospect.phoneHref} style={{ color: "#F4B400", textDecoration: "none", fontWeight: 700 }}>{prospect.phone}</a>
              <a href={`mailto:${prospect.email}`} style={{ color: "#B8B3A6", textDecoration: "none" }}>{prospect.email}</a>
            </div>
            <form onSubmit={handleSubmit} style={{ background: "#171718", border: "1px solid rgba(248,245,236,0.14)", padding: "1.4rem", display: "grid", gap: "0.9rem" }}>
              {[
                ["name", "Name", "text"],
                ["phone", "Phone", "tel"],
                ["time", "Preferred time", "text"],
              ].map(([name, label, type]) => (
                <label key={name} style={{ display: "grid", gap: "0.45rem" }}>
                  <span style={{ color: "#B8B3A6", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.72rem", textTransform: "uppercase" }}>{label}</span>
                  <input name={name} type={type} value={formState[name as "name" | "phone" | "time"]} onChange={handleChange} style={{ background: "#0A0A0B", border: "1px solid rgba(244,180,0,0.18)", color: "#F8F5EC", padding: "0.9rem 1rem", font: "inherit" }} />
                </label>
              ))}
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ color: "#B8B3A6", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.72rem", textTransform: "uppercase" }}>Service</span>
                <select name="service" value={formState.service} onChange={handleChange} style={{ background: "#0A0A0B", border: "1px solid rgba(244,180,0,0.18)", color: "#F8F5EC", padding: "0.9rem 1rem", font: "inherit" }}>
                  {services.map((service) => <option key={service.title}>{service.title}</option>)}
                </select>
              </label>
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ color: "#B8B3A6", fontFamily: "var(--font-plex-mono), monospace", fontSize: "0.72rem", textTransform: "uppercase" }}>Notes</span>
                <textarea name="note" value={formState.note} onChange={handleChange} rows={4} style={{ background: "#0A0A0B", border: "1px solid rgba(244,180,0,0.18)", color: "#F8F5EC", padding: "0.9rem 1rem", font: "inherit", resize: "vertical" }} />
              </label>
              <button type="submit" style={{ border: 0, background: "#F4B400", color: "#0A0A0B", padding: "0.95rem 1.1rem", fontWeight: 800, cursor: "pointer" }}>{submitted ? "Request received" : "Request a barber appointment"}</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
