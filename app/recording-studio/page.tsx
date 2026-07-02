"use client";

import { useEffect, type CSSProperties } from "react";

export type RecordingStudioProspect = {
  businessName?: string;
  name?: string;
  shortName?: string;
  city?: string;
  state?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  emailHref?: string;
  bookingUrl?: string;
  heroImageUrl?: string;
  heroImage?: string;
  heroImageAlt?: string;
  services?: Array<{
    name?: string;
    title?: string;
    description?: string;
    body?: string;
    price?: string;
  }>;
};

export const DEFAULT_RECORDING_STUDIO_PROSPECT: RecordingStudioProspect = {
  businessName: "Backblock Studioz",
  name: "Backblock Studioz",
  city: "Brooklyn, NY",
};

const studioTokens = {
  bgVoid: "#050711",
  bgNavy: "#0B1020",
  bgPanel: "rgba(20, 24, 38, 0.66)",
  bgPanelStrong: "rgba(24, 29, 45, 0.84)",
  glassBorder: "rgba(229, 229, 255, 0.16)",
  glassBorderStrong: "rgba(229, 229, 255, 0.28)",
  ink: "#F8FAFF",
  muted: "rgba(248, 250, 255, 0.68)",
  dim: "rgba(248, 250, 255, 0.42)",
  platinum: "#E5E5FF",
  lavender: "#978EFF",
  lavenderSoft: "#BCBBFF",
  cyan: "#2EBAC6",
  magenta: "#B6509E",
  amberLed: "#FFC857",
  recordRed: "#FF3B30",
};

const GENERATED_HERO_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3F3JYuspwrqOd8cxGsJUj4NHi61/hf_20260629_003646_99d7c46f-bb56-48d5-a456-b48718d405dc.png";

const fallbackServices = [
  {
    name: "Vocal Booth",
    description: "Smoked-glass vocal room for clean takes, ad libs, harmonies, and fast comping.",
    price: "from $--/hr",
  },
  {
    name: "Control Room",
    description: "Console-led tracking room for producers who need the take organized while it happens.",
    price: "from $--/block",
  },
  {
    name: "Mix/Master Suite",
    description: "Critical listening, vocal polish, release prep, and revision notes in one flow.",
    price: "quote by scope",
  },
  {
    name: "Podcast / Voiceover Room",
    description: "Quiet, controlled capture for interviews, drops, ads, and creator episodes.",
    price: "from $--/session",
  },
];

const metrics = [
  ["24/7", "booking intake"],
  ["4 hr", "revision window placeholder"],
  ["3 rooms", "recording / podcast / mix"],
  ["1 AI", "concierge for booking + prep"],
];

const conciergeSteps = ["booking intent", "room match", "quote", "engineer notes"];

const messages = [
  ["Artist", "I need two hours tonight to cut vocals. Melodic rap, I have the beat and rough lyrics."],
  ["Concierge", "I can get you into the vocal booth at 7:30 PM. For melodic rap, I would book the vocal chain with light tuning prep and a 30-minute engineer setup."],
  ["Artist", "What's the total?"],
  ["Concierge", "Two-hour vocal session: $180. Optional same-night rough mix: +$75. Want me to hold the 7:30 slot and send the deposit link?"],
  ["Artist", "Yes, hold it."],
  ["Concierge", "Locked. I sent the deposit link, added your beat upload request, and gave the engineer your session notes."],
];

const creativeTiles = [
  { label: "Console LEDs", text: "Meters pulse low while the booking notes stay locked to the session." },
  { label: "Booth Glass", text: "Smoked acrylic, lavender edge light, no wasted visual noise." },
  { label: "Waveform Prep", text: "Beat upload, rough lyrics, room choice, engineer brief." },
  { label: "Gear Rack", text: "Premium object cards instead of commodity room rentals." },
  { label: "Session Notes", text: "A real intake trail before anyone touches record." },
];

const packages = [
  ["Record", "Hourly room + engineer", "from $--"],
  ["Polish", "Vocal comp + rough mix", "quote"],
  ["Release", "Mix/master package", "quote"],
  ["Content", "Podcast / voiceover block", "from $--"],
];

function mergeServices(prospectServices: RecordingStudioProspect["services"]) {
  if (!prospectServices?.length) return fallbackServices;
  return fallbackServices.map((fallback, index) => {
    const prospectService = prospectServices[index];
    return {
      ...fallback,
      name: prospectService?.name ?? prospectService?.title ?? fallback.name,
      description: prospectService?.description ?? prospectService?.body ?? fallback.description,
      price: prospectService?.price ?? fallback.price,
    };
  });
}

export default function RecordingStudioPage({
  prospect = DEFAULT_RECORDING_STUDIO_PROSPECT,
}: {
  prospect?: RecordingStudioProspect;
}) {
  const services = mergeServices(prospect.services);
  const businessName = prospect.businessName ?? prospect.name ?? DEFAULT_RECORDING_STUDIO_PROSPECT.businessName ?? "Backblock Studioz";
  const city = [prospect.city, prospect.state].filter(Boolean).join(", ") || DEFAULT_RECORDING_STUDIO_PROSPECT.city;
  const bookingUrl = prospect.bookingUrl ?? "#booking";
  const heroImageUrl = prospect.heroImageUrl ?? prospect.heroImage ?? GENERATED_HERO_IMAGE;

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="studioPage"
      style={
        {
          "--bg-void": studioTokens.bgVoid,
          "--bg-navy": studioTokens.bgNavy,
          "--panel": studioTokens.bgPanel,
          "--panel-strong": studioTokens.bgPanelStrong,
          "--glass-border": studioTokens.glassBorder,
          "--glass-border-strong": studioTokens.glassBorderStrong,
          "--ink": studioTokens.ink,
          "--muted": studioTokens.muted,
          "--dim": studioTokens.dim,
          "--platinum": studioTokens.platinum,
          "--lavender": studioTokens.lavender,
          "--lavender-soft": studioTokens.lavenderSoft,
          "--cyan": studioTokens.cyan,
          "--magenta": studioTokens.magenta,
          "--amber-led": studioTokens.amberLed,
          "--record-led": studioTokens.recordRed,
          "--hero-image": `url("${heroImageUrl}")`,
        } as CSSProperties
      }
    >
      <style>{`
        .studioPage {
          min-height: 100vh;
          color: var(--ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 18% 18%, rgba(151, 142, 255, 0.22), transparent 34%),
            radial-gradient(circle at 82% 22%, rgba(46, 186, 198, 0.16), transparent 30%),
            linear-gradient(180deg, var(--bg-void) 0%, var(--bg-navy) 46%, var(--bg-void) 100%);
          overflow-x: hidden;
        }

        .studioPage * { box-sizing: border-box; }
        .studioPage a { color: inherit; }

        .hero {
          min-height: 96vh;
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          padding: 22px clamp(16px, 4vw, 48px) 64px;
          background:
            linear-gradient(90deg, rgba(5, 7, 17, 0.92) 0%, rgba(5, 7, 17, 0.68) 43%, rgba(5, 7, 17, 0.42) 100%),
            linear-gradient(180deg, rgba(5, 7, 17, 0.1) 0%, var(--bg-void) 100%),
            var(--hero-image) center / cover no-repeat;
        }

        .hero::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 34%;
          background: linear-gradient(180deg, transparent, var(--bg-void));
          z-index: -1;
        }

        .liquidGlass {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.055) 42%, rgba(151,142,255,0.08));
          border: 1px solid var(--glass-border);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.22),
            0 20px 60px rgba(0,0,0,0.34),
            0 0 28px rgba(151,142,255,0.10);
          backdrop-filter: blur(22px) saturate(150%);
          -webkit-backdrop-filter: blur(22px) saturate(150%);
        }

        .liquidGlass::before,
        .glassButton::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background:
            linear-gradient(120deg, rgba(255,255,255,.38), transparent 24%, transparent 72%, rgba(46,186,198,.18)),
            radial-gradient(circle at 12% 0%, rgba(255,255,255,.34), transparent 28%);
          opacity: .65;
          padding: 1px;
          -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          mask-composite: exclude;
        }

        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .liquidGlass { background: rgba(24, 29, 45, 0.96); }
        }

        .nav {
          width: min(1180px, 100%);
          margin: 0 auto;
          border-radius: 999px;
          padding: 10px 12px 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          z-index: 3;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          font-weight: 800;
          letter-spacing: 0;
        }

        .brandMark {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--lavender), var(--magenta) 42%, var(--cyan));
          box-shadow: 0 0 24px rgba(151,142,255,0.44);
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }

        .brandMark::after {
          content: "";
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--record-led);
          box-shadow: 0 0 14px rgba(255,59,48,0.72);
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 24px);
          color: var(--muted);
          font-size: 13px;
          font-weight: 700;
        }

        .heroGrid {
          width: min(1180px, 100%);
          margin: auto auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.64fr);
          gap: clamp(28px, 5vw, 70px);
          align-items: end;
          padding-top: 96px;
        }

        .eyebrow, .mono {
          font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 11px;
          color: var(--lavender-soft);
        }

        h1, h2, h3, p { margin-top: 0; }

        h1 {
          max-width: 820px;
          margin-bottom: 22px;
          font-size: clamp(46px, 9vw, 112px);
          line-height: 0.92;
          letter-spacing: 0;
          font-weight: 900;
        }

        .heroCopy {
          max-width: 680px;
          color: var(--muted);
          font-size: clamp(17px, 2.2vw, 22px);
          line-height: 1.55;
          margin-bottom: 28px;
        }

        .buttonRow {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .glassButton {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 20px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 850;
          font-size: 14px;
          border: 1px solid var(--glass-border);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .glassButton.primary {
          color: #050711;
          background: linear-gradient(135deg, var(--lavender) 0%, var(--magenta) 42%, var(--cyan) 100%);
          box-shadow: 0 0 38px rgba(151,142,255,0.34), inset 0 1px 0 rgba(255,255,255,0.28);
        }

        .glassButton.secondary {
          color: var(--ink);
          background: rgba(20, 24, 38, 0.62);
        }

        .glassButton:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 42px rgba(46,186,198,0.16), 0 0 38px rgba(151,142,255,0.18);
          border-color: var(--glass-border-strong);
        }

        .glassButton:focus-visible,
        .nav a:focus-visible,
        .footer a:focus-visible {
          outline: 2px solid var(--lavender-soft);
          outline-offset: 4px;
        }

        .proofCard {
          border-radius: 28px;
          padding: 22px;
          align-self: end;
        }

        .recordingLine {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        .led {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--record-led);
          box-shadow: 0 0 16px rgba(255,59,48,0.72);
          animation: ledPulse 2.2s ease-in-out infinite;
        }

        .section {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
          padding: clamp(64px, 10vw, 118px) 0;
        }

        .sectionHead {
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(260px, 0.52fr);
          gap: 28px;
          align-items: end;
          margin-bottom: 28px;
        }

        .section h2 {
          font-size: clamp(34px, 6vw, 72px);
          line-height: 0.98;
          letter-spacing: 0;
          margin-bottom: 0;
        }

        .sectionHead p, .muted {
          color: var(--muted);
          line-height: 1.7;
        }

        .signalGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .metric {
          min-height: 136px;
          border-radius: 22px;
          padding: 18px;
        }

        .metric strong {
          display: block;
          font-size: clamp(28px, 4vw, 46px);
          line-height: 1;
          margin-bottom: 18px;
        }

        .concierge {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 18px;
        }

        .chatPanel {
          border-radius: 30px;
          padding: clamp(18px, 3vw, 30px);
        }

        .message {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(229,229,255,0.1);
        }

        .message:last-child { border-bottom: 0; }
        .messageName { color: var(--lavender-soft); font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; font-size: 12px; }
        .message p { margin: 0; color: var(--platinum); line-height: 1.62; }

        .sideRail {
          border-radius: 30px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .railItem {
          border: 1px solid rgba(229,229,255,0.12);
          border-radius: 18px;
          padding: 14px;
          background: rgba(5,7,17,0.26);
        }

        .roomGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .roomCard {
          min-height: 330px;
          border-radius: 28px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .roomVisual {
          height: 128px;
          border-radius: 22px;
          margin-bottom: 20px;
          background:
            radial-gradient(circle at 20% 20%, rgba(188,187,255,0.44), transparent 28%),
            radial-gradient(circle at 78% 30%, rgba(46,186,198,0.32), transparent 30%),
            linear-gradient(135deg, rgba(229,229,255,0.12), rgba(5,7,17,0.18)),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 15px);
          border: 1px solid rgba(229,229,255,0.12);
        }

        .roomCard h3, .package h3 { margin-bottom: 10px; font-size: 22px; }
        .roomCard p, .package p { color: var(--muted); line-height: 1.62; }
        .roomMeta { margin-top: auto; display: grid; gap: 10px; }

        .creativeGrid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr;
          grid-auto-rows: minmax(150px, auto);
          gap: 16px;
        }

        .tile {
          border-radius: 28px;
          padding: 20px;
          overflow: hidden;
        }

        .tile:nth-child(1) { grid-row: span 2; }
        .tile:nth-child(3) { grid-row: span 2; }

        .visualTile {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background:
            radial-gradient(circle at 22% 18%, rgba(151,142,255,0.32), transparent 28%),
            linear-gradient(145deg, rgba(255,255,255,0.14), rgba(46,186,198,0.12)),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 20px);
        }

        .waveform {
          display: grid;
          grid-template-columns: repeat(18, 1fr);
          align-items: center;
          gap: 4px;
          height: 88px;
          margin-bottom: 24px;
        }

        .waveform span {
          display: block;
          height: calc(18px + var(--i) * 4px);
          border-radius: 999px;
          background: linear-gradient(180deg, var(--lavender), var(--cyan));
          opacity: 0.76;
          animation: wave 2.8s ease-in-out infinite;
          animation-delay: calc(var(--i) * -70ms);
        }

        .packageGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .package {
          border-radius: 28px;
          padding: 22px;
          min-height: 240px;
          display: flex;
          flex-direction: column;
        }

        .price {
          margin-top: auto;
          color: var(--platinum);
          font-size: 24px;
          font-weight: 900;
        }

        .bookingPanel {
          border-radius: 34px;
          padding: clamp(24px, 5vw, 52px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(270px, 0.5fr);
          gap: 28px;
          align-items: center;
          background:
            radial-gradient(circle at 12% 20%, rgba(151,142,255,0.28), transparent 34%),
            radial-gradient(circle at 90% 14%, rgba(46,186,198,0.22), transparent 30%),
            rgba(24, 29, 45, 0.72);
        }

        .bookingPanel h2 { margin-bottom: 18px; }

        .footer {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
          padding: 30px 0 46px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: var(--dim);
          border-top: 1px solid rgba(229,229,255,0.1);
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 640ms ease, transform 640ms ease;
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes ledPulse {
          0%, 100% { opacity: 0.52; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.62); opacity: 0.48; }
          50% { transform: scaleY(1); opacity: 0.92; }
        }

        @media (max-width: 920px) {
          .heroGrid, .sectionHead, .concierge, .bookingPanel {
            grid-template-columns: 1fr;
          }

          .signalGrid, .roomGrid, .packageGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .creativeGrid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .hero {
            min-height: auto;
            padding: 14px 12px 54px;
          }

          .nav {
            border-radius: 24px;
            align-items: flex-start;
          }

          .navLinks a:not(.glassButton) { display: none; }
          .brand span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .heroGrid { padding-top: 62px; }
          h1 { font-size: clamp(42px, 15vw, 64px); }
          .buttonRow { align-items: stretch; }
          .glassButton { width: 100%; padding: 0 16px; white-space: nowrap; }
          .signalGrid, .roomGrid, .creativeGrid, .packageGrid { grid-template-columns: 1fr; }
          .message { grid-template-columns: 1fr; gap: 6px; }
          .tile:nth-child(1), .tile:nth-child(3) { grid-row: auto; }
          .footer { flex-direction: column; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }

          [data-reveal] {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section className="hero">
        <nav className="nav liquidGlass" aria-label="Recording studio navigation">
          <a className="brand" href="#top" aria-label={`${businessName} home`}>
            <span className="brandMark" aria-hidden="true" />
            <span>{businessName}</span>
          </a>
          <div className="navLinks">
            <a href="#concierge">Concierge</a>
            <a href="#rooms">Rooms</a>
            <a href="#packages">Packages</a>
            <a className="glassButton secondary" href={bookingUrl}>Book</a>
          </div>
        </nav>

        <div className="heroGrid" id="top">
          <div data-reveal>
            <p className="eyebrow">{businessName} - {city}</p>
            <h1>Where rough vocals become finished records.</h1>
            <p className="heroCopy">
              A cinematic recording studio demo built for artists who need booking, rates, files, and follow-up handled before they even step in the booth.
            </p>
            <div className="buttonRow">
              <a className="glassButton primary" href={bookingUrl}>Book a session</a>
              <a className="glassButton secondary" href="#concierge">Hear the AI concierge</a>
            </div>
          </div>

          <aside className="proofCard liquidGlass" data-reveal>
            <div className="recordingLine">
              <span className="mono">Tonight's session</span>
              <span className="led" aria-label="Recording indicator" />
            </div>
            <h2 style={{ fontSize: "32px", lineHeight: 1, marginBottom: 12 }}>7:30 PM - Vocal booth</h2>
            <p className="muted" style={{ marginBottom: 0 }}>
              AI concierge collected the artist brief, selected the room, quoted the block, and prepped the engineer notes.
            </p>
          </aside>
        </div>
      </section>

      <section className="section" aria-label="Recording studio proof metrics">
        <div className="signalGrid">
          {metrics.map(([value, label]) => (
            <div className="metric liquidGlass" data-reveal key={value}>
              <strong>{value}</strong>
              <span className="mono">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="concierge">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">AI concierge demo</p>
            <h2>The intake before the engineer hits record.</h2>
          </div>
          <p>
            Rates, rooms, files, and session notes - organized before the artist arrives. This is the AEXON product layer, not a placeholder chatbot.
          </p>
        </div>

        <div className="concierge">
          <div className="chatPanel liquidGlass" data-reveal>
            {messages.map(([name, text]) => (
              <div className="message" key={`${name}-${text.slice(0, 18)}`}>
                <div className="messageName">{name}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <aside className="sideRail liquidGlass" data-reveal>
            {conciergeSteps.map((step, index) => (
              <div className="railItem" key={step}>
                <div className="mono">0{index + 1}</div>
                <h3 style={{ margin: "8px 0 0", fontSize: 18 }}>{step}</h3>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section" id="rooms">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">Rooms as premium objects</p>
            <h2>Book the room. Capture the take. Ship the record.</h2>
          </div>
          <p>
            Each module gives the artist a use case, a starting point, and the exact action the concierge can take for the session.
          </p>
        </div>

        <div className="roomGrid">
          {services.map((service) => (
            <article className="roomCard liquidGlass" data-reveal key={service.name}>
              <div className="roomVisual" aria-hidden="true" />
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="roomMeta">
                <span className="mono">{service.price ?? "quote by scope"}</span>
                <span className="mono" style={{ color: studioTokens.cyan }}>AI matches room + prep</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-label="Inside the rooms">
        <div className="creativeGrid">
          {creativeTiles.map((tile, index) => (
            <article className={`tile liquidGlass ${index === 0 || index === 2 ? "visualTile" : ""}`} data-reveal key={tile.label}>
              {index === 2 && (
                <div className="waveform" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, i) => (
                    <span key={i} style={{ "--i": (i % 7) + 1 } as React.CSSProperties} />
                  ))}
                </div>
              )}
              <p className="mono">{tile.label}</p>
              <h3 style={{ fontSize: index === 0 || index === 2 ? 30 : 22, lineHeight: 1.05, marginBottom: 0 }}>{tile.text}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="packages">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">Packages / rates</p>
            <h2>Precise enough to quote. Flexible enough to customize.</h2>
          </div>
          <p>
            Honest placeholder rates stay visible until final Backblock numbers are supplied. The layout is ready for prospect-specific pricing.
          </p>
        </div>

        <div className="packageGrid">
          {packages.map(([name, detail, price]) => (
            <article className="package liquidGlass" data-reveal key={name}>
              <p className="mono">{detail}</p>
              <h3>{name}</h3>
              <p className="muted">The concierge recommends this only when the artist's brief fits the room, files, and timeline.</p>
              <div className="price">{price}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="booking">
        <div className="bookingPanel liquidGlass" data-reveal>
          <div>
            <p className="eyebrow">Final booking panel</p>
            <h2>Tell the concierge what you're making.</h2>
            <p className="muted">
              It will recommend the room, quote the session, collect the files, and prep the engineer before the artist arrives.
            </p>
          </div>
          <div>
            <a className="glassButton primary" href={bookingUrl}>Start a booking</a>
            <p className="mono" style={{ marginTop: 18, color: studioTokens.dim }}>
              Built for studios that lose time to DMs, missed calls, and half-written booking requests.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong style={{ color: studioTokens.ink }}>{businessName}</strong>
          <div>{city}</div>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <a href="#rooms">Services</a>
          <a href={bookingUrl}>Booking</a>
          {prospect.phone ? <a href={`tel:${prospect.phone.replace(/[^0-9+]/g, "")}`}>{prospect.phone}</a> : null}
          {prospect.email ? <a href={`mailto:${prospect.email}`}>{prospect.email}</a> : null}
          <a href="https://aexonai.com/#consultation" target="_blank" rel="noopener noreferrer">AEXON demo CTA</a>
        </div>
      </footer>
    </main>
  );
}
