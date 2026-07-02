"use client";

import { useEffect, useState, type CSSProperties } from "react";

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

const heroPoster = "/higgsfield/recording-studio/hero-poster-nano-banana-pro.png";
const heroLoop = "/higgsfield/recording-studio/hero-loop-kling-3.mp4";
const liquidMaterial = "/higgsfield/recording-studio/liquid-glass-material-gpt-image-2.png";

const tokens = {
  bg: "#03050D",
  ink: "#F7FAFF",
  muted: "rgba(247, 250, 255, 0.68)",
  dim: "rgba(247, 250, 255, 0.42)",
  panel: "rgba(9, 14, 29, 0.62)",
  panelStrong: "rgba(12, 18, 34, 0.82)",
  line: "rgba(226, 232, 255, 0.18)",
  lineStrong: "rgba(226, 232, 255, 0.34)",
  lavender: "#A59BFF",
  cyan: "#38D8E6",
  amber: "#FFC857",
  red: "#FF3B30",
};

const fallbackServices = [
  {
    name: "Vocal Booth",
    description: "Tight smoked-glass capture for leads, ad libs, harmonies, and fast comp notes.",
    price: "from $--/hr",
  },
  {
    name: "Control Room",
    description: "Producer-led tracking with console visibility, take notes, and room discipline.",
    price: "from $--/block",
  },
  {
    name: "Mix/Master Suite",
    description: "Critical listening, vocal polish, reference checks, and release-ready delivery.",
    price: "quote by scope",
  },
  {
    name: "Podcast / Voiceover",
    description: "Controlled capture for interviews, drops, ads, narration, and creator episodes.",
    price: "from $--/session",
  },
];

const proofTiles = ["24/7 Intake", "Room Match", "Quote + Deposit", "Engineer Brief", "Files Ready"];

const transcript = [
  ["Artist", "Need a session tonight. Two hours for vocals, melodic rap, beat is ready."],
  ["AI", "Vocal Booth is the cleanest match. I can hold 7:30 PM with light tuning prep."],
  ["Artist", "Send the total."],
  ["AI", "Quote is ready: 2-hour vocal session plus optional rough mix. Deposit link generated."],
  ["AI", "Beat upload rail is open. Engineer notes are being prepared before arrival."],
];

const pipeline = ["Intent", "Room", "Quote", "Deposit", "Engineer Notes"];

const primitives = [
  ["Booking capsule", "Room, time, vocal chain, and intake status in one frosted control."],
  ["Quote card", "The quote appears with deposit link state, file request, and hold timer."],
  ["Session-prep drawer", "Engineer notes, beat upload, references, and rough lyrics queued."],
];

const packages = [
  ["Record", "Hourly room + engineer", "Hold room"],
  ["Polish", "Comp, tune, rough mix", "Build quote"],
  ["Release", "Mix/master package", "Prep scope"],
  ["Content", "Podcast / voiceover", "Route brief"],
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
  const [reduceMotion, setReduceMotion] = useState(false);
  const services = mergeServices(prospect.services);
  const businessName = prospect.businessName ?? prospect.name ?? DEFAULT_RECORDING_STUDIO_PROSPECT.businessName ?? "Backblock Studioz";
  const shortName = prospect.shortName ?? businessName;
  const city = [prospect.city, prospect.state].filter(Boolean).join(", ") || DEFAULT_RECORDING_STUDIO_PROSPECT.city;
  const bookingUrl = prospect.bookingUrl ?? "#booking";
  const heroImageUrl = prospect.heroImageUrl ?? prospect.heroImage ?? heroPoster;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);

    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: "-5% 0px -10% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="studioPage"
      style={
        {
          "--bg": tokens.bg,
          "--ink": tokens.ink,
          "--muted": tokens.muted,
          "--dim": tokens.dim,
          "--panel": tokens.panel,
          "--panel-strong": tokens.panelStrong,
          "--line": tokens.line,
          "--line-strong": tokens.lineStrong,
          "--lavender": tokens.lavender,
          "--cyan": tokens.cyan,
          "--amber": tokens.amber,
          "--red": tokens.red,
          "--prospect-image": `url("${heroImageUrl}")`,
          "--material-image": `url("${liquidMaterial}")`,
        } as CSSProperties
      }
    >
      <style>{`
        .studioPage {
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at 72% -8%, rgba(56,216,230,0.16), transparent 32rem),
            radial-gradient(circle at 10% 22%, rgba(165,155,255,0.18), transparent 30rem),
            linear-gradient(180deg, #03050d 0%, #070a14 48%, #02040a 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .studioPage * { box-sizing: border-box; }
        .studioPage a { color: inherit; }
        .studioPage h1, .studioPage h2, .studioPage h3, .studioPage p { margin-top: 0; }

        .hero {
          position: relative;
          min-height: 100vh;
          padding: 18px clamp(14px, 3.8vw, 48px) 28px;
          isolation: isolate;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          overflow: hidden;
        }

        .heroVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -4;
          filter: saturate(1.1) contrast(1.05);
          background: var(--prospect-image) center / cover no-repeat;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -3;
          background:
            linear-gradient(90deg, rgba(3,5,13,0.94) 0%, rgba(3,5,13,0.62) 42%, rgba(3,5,13,0.24) 100%),
            linear-gradient(180deg, rgba(3,5,13,0.08) 0%, rgba(3,5,13,0.24) 55%, #03050d 100%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 5px);
        }

        .hero::after {
          content: "";
          position: absolute;
          inset: -22% -30%;
          z-index: -2;
          background:
            linear-gradient(108deg, transparent 30%, rgba(165,155,255,0.22) 42%, rgba(56,216,230,0.12) 48%, transparent 58%),
            linear-gradient(78deg, transparent 44%, rgba(255,200,87,0.10) 49%, transparent 56%);
          filter: blur(18px);
          opacity: .82;
          transform: translate3d(-8%, 0, 0) rotate(-3deg);
          animation: sweep 8s ease-in-out infinite alternate;
        }

        .nav, .glass, .commandCenter, .bookingScene {
          border: 1px solid var(--line);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045) 44%, rgba(56,216,230,0.055)),
            var(--panel);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.20),
            inset 0 -1px 0 rgba(0,0,0,0.28),
            0 24px 70px rgba(0,0,0,0.36);
          backdrop-filter: blur(22px) saturate(145%);
          -webkit-backdrop-filter: blur(22px) saturate(145%);
        }

        .nav {
          width: min(1220px, 100%);
          margin: 0 auto;
          border-radius: 999px;
          min-height: 58px;
          padding: 8px 10px 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }

        .nav::after, .glass::after, .commandCenter::after, .bookingScene::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.36), transparent 20%, transparent 76%, rgba(56,216,230,0.22)),
            radial-gradient(circle at 12% 0%, rgba(255,255,255,0.28), transparent 28%);
          opacity: .54;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          text-decoration: none;
          font-weight: 900;
        }

        .brandMark {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          flex: 0 0 auto;
          background:
            radial-gradient(circle, var(--red) 0 22%, transparent 24%),
            conic-gradient(from 140deg, var(--lavender), var(--cyan), var(--amber), var(--lavender));
          box-shadow: 0 0 30px rgba(165,155,255,0.45);
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 22px);
          color: var(--muted);
          font-size: 13px;
          font-weight: 800;
        }

        .mono, .eyebrow {
          font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 11px;
        }

        .eyebrow { color: var(--cyan); }
        .mono { color: var(--dim); }

        .heroFrame {
          width: min(1220px, 100%);
          margin: auto;
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(300px, 0.58fr);
          gap: clamp(18px, 4vw, 56px);
          align-items: end;
          padding: 54px 0 22px;
        }

        .heroCopyBlock {
          max-width: 760px;
        }

        .recLine {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          background: rgba(3,5,13,0.44);
          margin-bottom: 18px;
        }

        .recDot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--red);
          box-shadow: 0 0 18px rgba(255,59,48,0.86);
          animation: recPulse 1.4s ease-in-out infinite;
        }

        h1 {
          max-width: 790px;
          margin-bottom: 18px;
          font-size: clamp(44px, 7.4vw, 104px);
          line-height: .91;
          letter-spacing: 0;
          font-weight: 950;
        }

        .heroText {
          max-width: 640px;
          color: var(--muted);
          font-size: clamp(17px, 2vw, 22px);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .buttonRow {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        .button {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 18px;
          text-decoration: none;
          font-weight: 900;
          font-size: 14px;
          border: 1px solid var(--line);
          background: rgba(8,12,25,0.62);
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }

        .button.primary {
          color: #02040a;
          border-color: rgba(255,255,255,0.25);
          background: linear-gradient(135deg, var(--lavender), var(--cyan) 55%, var(--amber));
          box-shadow: 0 0 34px rgba(56,216,230,0.24);
        }

        .button:hover {
          transform: translateY(-1px);
          border-color: var(--line-strong);
          box-shadow: 0 18px 46px rgba(56,216,230,0.15);
        }

        .button:focus-visible, .nav a:focus-visible, .footer a:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 4px;
        }

        .sessionCard {
          position: relative;
          border-radius: 28px;
          padding: 18px;
          overflow: hidden;
          align-self: end;
        }

        .sessionGrid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          align-items: start;
          margin-bottom: 18px;
        }

        .sessionCard h2 {
          margin-bottom: 8px;
          font-size: clamp(25px, 3vw, 36px);
          line-height: 1;
          letter-spacing: 0;
        }

        .proofCapsule {
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 18px;
          padding: 12px;
          background: rgba(3,5,13,0.42);
        }

        .meterStrip {
          display: grid;
          grid-template-columns: repeat(18, 1fr);
          gap: 4px;
          align-items: end;
          height: 62px;
          margin-top: 16px;
        }

        .meterStrip span, .waveform span {
          display: block;
          border-radius: 999px;
          background: linear-gradient(180deg, var(--cyan), var(--lavender) 54%, var(--amber));
          transform-origin: bottom;
          animation: meter 1.8s ease-in-out infinite;
          animation-delay: calc(var(--level) * -90ms);
          opacity: .78;
        }

        .meterStrip span { height: calc(15px + var(--level) * 5px); }

        .peekConsole {
          width: min(1220px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          transform: translateY(18px);
        }

        .proofTile {
          position: relative;
          border-radius: 16px;
          padding: 14px;
          min-height: 92px;
          overflow: hidden;
        }

        .progressBeam {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 12px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          overflow: hidden;
        }

        .progressBeam::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 62%;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--amber));
          transform: translateX(-100%);
          animation: beam 2.5s ease-in-out infinite;
          animation-delay: calc(var(--tile) * -220ms);
        }

        .section {
          width: min(1220px, calc(100% - 28px));
          margin: 0 auto;
          padding: clamp(48px, 7vw, 86px) 0;
        }

        .sectionTight { padding-top: clamp(34px, 5vw, 60px); }

        .sectionHead {
          display: grid;
          grid-template-columns: minmax(0, .82fr) minmax(260px, .5fr);
          gap: 24px;
          align-items: end;
          margin-bottom: 22px;
        }

        .section h2 {
          margin-bottom: 0;
          font-size: clamp(34px, 5.6vw, 72px);
          line-height: .96;
          letter-spacing: 0;
        }

        .sectionHead p, .muted {
          color: var(--muted);
          line-height: 1.65;
        }

        .commandCenter {
          position: relative;
          border-radius: 30px;
          padding: clamp(16px, 2.4vw, 26px);
          display: grid;
          grid-template-columns: minmax(0, .92fr) minmax(330px, 1.08fr);
          gap: 18px;
          overflow: hidden;
        }

        .commandCenter::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 34px 34px;
          opacity: .34;
          mask-image: linear-gradient(180deg, #000, transparent 88%);
        }

        .chatStack, .pipelinePanel, .fileRail {
          position: relative;
          z-index: 1;
        }

        .chatRow {
          display: grid;
          grid-template-columns: 66px minmax(0, 1fr);
          gap: 12px;
          padding: 14px 12px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(3,5,13,0.42);
          border-radius: 16px;
          margin-bottom: 10px;
        }

        .chatRow:nth-child(2), .chatRow:nth-child(4) {
          border-color: rgba(56,216,230,0.28);
          box-shadow: 0 0 28px rgba(56,216,230,0.10);
        }

        .chatRow:last-child p::after {
          content: "";
          display: inline-block;
          width: 7px;
          height: 1em;
          margin-left: 5px;
          vertical-align: -2px;
          background: var(--cyan);
          animation: cursor 1s steps(1) infinite;
        }

        .chatRow p {
          margin: 0;
          color: rgba(247,250,255,0.88);
          line-height: 1.5;
        }

        .pipelinePanel {
          display: grid;
          align-content: stretch;
          gap: 12px;
        }

        .nodeMap {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
        }

        .node {
          position: relative;
          min-height: 128px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.13);
          background:
            radial-gradient(circle at 50% 12%, rgba(56,216,230,0.24), transparent 38%),
            rgba(3,5,13,0.46);
          padding: 12px;
          overflow: hidden;
        }

        .node::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 12px;
          height: 28px;
          border-radius: 999px;
          background: repeating-linear-gradient(90deg, rgba(56,216,230,0.8) 0 3px, transparent 3px 8px);
          opacity: .45;
          animation: scan 2.4s linear infinite;
        }

        .operationsLog {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .logItem {
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 12px;
          background: rgba(3,5,13,0.44);
          min-height: 96px;
        }

        .fileRail {
          grid-column: 1 / -1;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          padding: 12px;
          background: rgba(3,5,13,0.46);
          display: grid;
          grid-template-columns: 180px minmax(0, 1fr) 130px;
          gap: 14px;
          align-items: center;
        }

        .waveform {
          display: grid;
          grid-template-columns: repeat(28, 1fr);
          align-items: center;
          gap: 3px;
          height: 58px;
        }

        .waveform span { height: calc(12px + var(--level) * 4px); }

        .roomReel {
          display: grid;
          grid-template-columns: .78fr 1.22fr;
          gap: 16px;
          align-items: stretch;
        }

        .serviceRail {
          display: grid;
          gap: 10px;
        }

        .serviceTab {
          position: relative;
          min-height: 86px;
          border-radius: 18px;
          padding: 14px;
          overflow: hidden;
        }

        .serviceTab:nth-child(1) {
          border-color: rgba(56,216,230,0.38);
          box-shadow: 0 0 34px rgba(56,216,230,0.11);
        }

        .roomStage {
          position: relative;
          min-height: 500px;
          border-radius: 30px;
          overflow: hidden;
          display: grid;
          align-content: end;
          padding: clamp(18px, 3vw, 30px);
          background:
            linear-gradient(180deg, transparent 0%, rgba(3,5,13,0.86) 76%),
            radial-gradient(circle at 66% 28%, rgba(255,200,87,0.22), transparent 24rem),
            var(--prospect-image) center / cover no-repeat,
            url("${heroPoster}") center / cover no-repeat;
        }

        .roomStage::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 24px;
          box-shadow: inset 0 0 70px rgba(56,216,230,0.11);
          pointer-events: none;
        }

        .stageCopy {
          position: relative;
          max-width: 570px;
        }

        .stageCopy h3 {
          font-size: clamp(32px, 5vw, 64px);
          line-height: .96;
          margin-bottom: 12px;
        }

        .materialGrid {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
          gap: 16px;
        }

        .materialVisual {
          min-height: 520px;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(3,5,13,0.1), rgba(3,5,13,0.82)),
            var(--material-image) center / cover no-repeat;
        }

        .materialVisual::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 18px),
            linear-gradient(120deg, transparent, rgba(56,216,230,0.18), transparent);
          mix-blend-mode: screen;
          animation: sweep 7s ease-in-out infinite alternate;
        }

        .primitiveStack {
          display: grid;
          gap: 12px;
        }

        .primitive {
          position: relative;
          border-radius: 24px;
          padding: 18px;
          min-height: 154px;
          overflow: hidden;
        }

        .primitive::before {
          content: "";
          position: absolute;
          inset: auto 18px 18px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--lavender), var(--cyan), var(--amber));
          animation: beam 2.8s ease-in-out infinite;
        }

        .packageGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .package {
          min-height: 230px;
          border-radius: 22px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .package h3, .primitive h3, .serviceTab h3, .logItem h3 {
          margin-bottom: 8px;
          font-size: 22px;
        }

        .package p, .primitive p, .serviceTab p, .stageCopy p {
          color: var(--muted);
          line-height: 1.58;
        }

        .package .button {
          margin-top: auto;
          width: 100%;
        }

        .bookingScene {
          position: relative;
          border-radius: 30px;
          padding: clamp(20px, 4vw, 42px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, .48fr);
          gap: 24px;
          align-items: center;
          overflow: hidden;
        }

        .bookingScene::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 8%, rgba(165,155,255,0.26), transparent 22rem),
            radial-gradient(circle at 92% 22%, rgba(56,216,230,0.18), transparent 20rem);
        }

        .bookingScene > * {
          position: relative;
          z-index: 1;
        }

        .bookingScene h2 { margin-bottom: 12px; }

        .footer {
          width: min(1220px, calc(100% - 28px));
          margin: 0 auto;
          padding: 22px 0 42px;
          border-top: 1px solid rgba(255,255,255,0.10);
          color: var(--dim);
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footerLinks {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 650ms ease, transform 650ms ease;
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes sweep {
          0% { transform: translate3d(-8%, 0, 0) rotate(-3deg); opacity: .46; }
          100% { transform: translate3d(8%, 2%, 0) rotate(4deg); opacity: .9; }
        }

        @keyframes recPulse {
          0%, 100% { opacity: .48; transform: scale(.86); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes meter {
          0%, 100% { transform: scaleY(.42); filter: brightness(.86); }
          50% { transform: scaleY(1); filter: brightness(1.24); }
        }

        @keyframes beam {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(165%); }
        }

        @keyframes cursor {
          0%, 48% { opacity: 1; }
          49%, 100% { opacity: 0; }
        }

        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 28px 0; }
        }

        @media (max-width: 980px) {
          .heroFrame, .sectionHead, .commandCenter, .roomReel, .materialGrid, .bookingScene {
            grid-template-columns: 1fr;
          }

          .peekConsole, .packageGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .roomStage { min-height: 430px; }
        }

        @media (max-width: 680px) {
          .hero {
            min-height: 100svh;
            padding: 12px 12px 22px;
          }

          .nav {
            border-radius: 22px;
            align-items: flex-start;
          }

          .brand span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .navLinks a:not(.button) { display: none; }
          .navLinks .button { min-height: 40px; padding: 0 14px; }
          .heroFrame { padding-top: 34px; }
          .sessionCard { padding: 14px; }
          .peekConsole, .nodeMap, .operationsLog, .packageGrid {
            grid-template-columns: 1fr;
          }

          .fileRail {
            grid-template-columns: 1fr;
          }

          .chatRow {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .buttonRow .button, .bookingScene .button {
            width: 100%;
          }

          .materialVisual { min-height: 380px; }
          .roomStage { min-height: 360px; }
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

      <section className="hero" id="top">
        <video
          className="heroVideo"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/higgsfield/recording-studio/hero-poster-nano-banana-pro.png"
        >
          {!reduceMotion ? <source src="/higgsfield/recording-studio/hero-loop-kling-3.mp4" type="video/mp4" /> : null}
        </video>

        <nav className="nav" aria-label="Recording studio navigation">
          <a className="brand" href="#top" aria-label={`${businessName} home`}>
            <span className="brandMark" aria-hidden="true" />
            <span>{shortName}</span>
          </a>
          <div className="navLinks">
            <a href="#concierge">Concierge</a>
            <a href="#rooms">Rooms</a>
            <a href="#material">Glass</a>
            <a className="button" href={bookingUrl}>Book</a>
          </div>
        </nav>

        <div className="heroFrame">
          <div className="heroCopyBlock" data-reveal>
            <div className="recLine">
              <span className="recDot" aria-hidden="true" />
              <span className="mono">REC 02:00 AM / {city}</span>
            </div>
            <p className="eyebrow">{businessName}</p>
            <h1>Where rough vocals become finished records.</h1>
            <p className="heroText">
              The room, quote, files, and engineer notes move before the artist walks in.
            </p>
            <div className="buttonRow">
              <a className="button primary" href={bookingUrl}>Start session hold</a>
              <a className="button" href="#concierge">Watch concierge flow</a>
            </div>
          </div>

          <aside className="sessionCard glass" data-reveal>
            <div className="sessionGrid">
              <div>
                <p className="mono">Tonight's session</p>
                <h2>7:30 PM / Vocal Booth</h2>
              </div>
              <span className="recDot" aria-label="Recording indicator" />
            </div>
            <div className="proofCapsule">
              <p className="mono">Proof capsule</p>
              <p className="muted" style={{ marginBottom: 0 }}>
                AI picked the room, made the quote, generated the deposit link, opened file upload, and prepared engineer notes.
              </p>
            </div>
            <div className="meterStrip" aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => (
                <span key={index} style={{ "--level": (index % 7) + 1 } as CSSProperties} />
              ))}
            </div>
          </aside>
        </div>

        <div className="peekConsole" aria-label="Motion proof strip">
          {proofTiles.map((tile, index) => (
            <div className="proofTile glass" key={tile} style={{ "--tile": index + 1 } as CSSProperties}>
              <p className="mono">0{index + 1}</p>
              <strong>{tile}</strong>
              <div className="progressBeam" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="section sectionTight" id="concierge">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">AI concierge command center</p>
            <h2>The booking desk moves like a studio console.</h2>
          </div>
          <p>
            Artist asks for session. AI picks room. Quote appears. Deposit link appears. Engineer notes get prepared.
          </p>
        </div>

        <div className="commandCenter" data-reveal>
          <div className="chatStack" aria-label="Animated booking transcript">
            {transcript.map(([name, line]) => (
              <div className="chatRow" key={`${name}-${line}`}>
                <span className="mono">{name}</span>
                <p>{line}</p>
              </div>
            ))}
          </div>

          <div className="pipelinePanel">
            <div className="nodeMap" aria-label="Booking pipeline nodes">
              {pipeline.map((node, index) => (
                <div className="node" key={node}>
                  <p className="mono">0{index + 1}</p>
                  <strong>{node}</strong>
                </div>
              ))}
            </div>
            <div className="operationsLog">
              <div className="logItem">
                <p className="mono">Quote live</p>
                <h3>$180 hold</h3>
                <p className="muted">Session quote appears with deposit link state.</p>
              </div>
              <div className="logItem">
                <p className="mono">Engineer brief</p>
                <h3>Notes ready</h3>
                <p className="muted">Melodic rap, beat uploaded, light tuning prep.</p>
              </div>
            </div>
          </div>

          <div className="fileRail">
            <div>
              <p className="mono">File upload rail</p>
              <strong>Beat.wav / rough lyrics / references</strong>
            </div>
            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 28 }, (_, index) => (
                <span key={index} style={{ "--level": ((index * 3) % 8) + 1 } as CSSProperties} />
              ))}
            </div>
            <a className="button" href={bookingUrl}>Send files</a>
          </div>
        </div>
      </section>

      <section className="section" id="rooms">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">Room sequence</p>
            <h2>Not service cards. Four scenes in the same trailer.</h2>
          </div>
          <p>
            The active rail keeps the rooms scannable while the Higgsfield still and edge light carry the cinematic studio object.
          </p>
        </div>

        <div className="roomReel">
          <div className="serviceRail">
            {services.map((service, index) => (
              <article className="serviceTab glass" data-reveal key={service.name}>
                <p className="mono">Scene 0{index + 1} / {service.price ?? "quote by scope"}</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <div className="roomStage glass" data-reveal>
            <div className="stageCopy">
              <p className="eyebrow">Active service rail</p>
              <h3>{services[0]?.name ?? "Vocal Booth"} is already staged.</h3>
              <p>
                Glass tabs, amber LEDs, room match language, and animated signal lines turn the package list into a studio reel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="material">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">Liquid glass material system</p>
            <h2>The interface borrows from the actual Higgsfield material frame.</h2>
          </div>
          <p>
            The GPT Image 2 material reference is used as a visual tile while the product controls translate it into booking components.
          </p>
        </div>

        <div className="materialGrid">
          <div className="materialVisual glass" data-reveal aria-label="Liquid glass material visual reference" />
          <div className="primitiveStack">
            {primitives.map(([title, copy]) => (
              <article className="primitive glass" data-reveal key={title}>
                <p className="mono">Primitive</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="sectionHead" data-reveal>
          <div>
            <p className="eyebrow">Console-ready packages</p>
            <h2>Packages behave like routing decisions.</h2>
          </div>
          <p>
            Rates can stay prospect-specific, but every package has an operational action the concierge can trigger.
          </p>
        </div>

        <div className="packageGrid">
          {packages.map(([name, detail, action]) => (
            <article className="package glass" data-reveal key={name}>
              <p className="mono">{detail}</p>
              <h3>{name}</h3>
              <p className="muted">The AI checks room fit, files, timeline, quote, deposit status, and engineer notes before recommending it.</p>
              <a className="button" href={bookingUrl}>{action}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="booking">
        <div className="bookingScene" data-reveal>
          <div>
            <p className="eyebrow">Final booking scene</p>
            <h2>Put the session in motion.</h2>
            <p className="muted">
              The concierge converts the first message into a room match, quote, deposit link, file rail, and engineer brief.
            </p>
          </div>
          <div>
            <a className="button primary" href={bookingUrl}>Open booking flow</a>
            <p className="mono" style={{ marginTop: 14 }}>
              {businessName} / {city} / AI intake online
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong style={{ color: tokens.ink }}>{businessName}</strong>
          <div>{city}</div>
        </div>
        <div className="footerLinks">
          <a href="#rooms">Rooms</a>
          <a href={bookingUrl}>Booking</a>
          {prospect.phone ? <a href={prospect.phoneHref ?? `tel:${prospect.phone.replace(/[^0-9+]/g, "")}`}>{prospect.phone}</a> : null}
          {prospect.email ? <a href={prospect.emailHref ?? `mailto:${prospect.email}`}>{prospect.email}</a> : null}
          <a href="https://aexonai.com/#consultation" target="_blank" rel="noopener noreferrer">AEXON demo CTA</a>
        </div>
      </footer>
    </main>
  );
}
