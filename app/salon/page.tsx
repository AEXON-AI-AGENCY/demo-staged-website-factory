"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Cinzel, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useProspectParams } from "../_hooks/useProspectParams";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

type Theme = {
  bg: string;
  bgSoft: string;
  surface: string;
  surfaceStrong: string;
  surfaceMuted: string;
  text: string;
  textSoft: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  accentWash: string;
  secondary: string;
  secondarySoft: string;
  border: string;
  borderStrong: string;
  glow: string;
  glowSoft: string;
  heroMesh: string;
  panelGradient: string;
  footerGradient: string;
  lineGradient: string;
  screenFade: string;
  photoOverlay: string;
  cardPhotoOverlay: string;
  orbPink: string;
  orbPinkFade: string;
  orbPurple: string;
  orbPurpleFade: string;
  buttonText: string;
  shadow: string;
  shadowSoft: string;
  accentRgb: string;
  secondaryRgb: string;
  textRgb: string;
};

const darkTheme: Theme = {
  bg: "#0D0611",
  bgSoft: "#16091C",
  surface: "rgba(26,14,38,0.84)",
  surfaceStrong: "rgba(35,18,49,0.96)",
  surfaceMuted: "rgba(255,255,255,0.05)",
  text: "#FAF5FF",
  textSoft: "#E9D8F8",
  textMuted: "#C7ACDF",
  accent: "#F472B6",
  accentSoft: "#F9A8D4",
  accentWash: "rgba(244,114,182,0.18)",
  secondary: "#C084FC",
  secondarySoft: "#DDD6FE",
  border: "rgba(244,114,182,0.18)",
  borderStrong: "rgba(192,132,252,0.36)",
  glow: "rgba(244,114,182,0.18)",
  glowSoft: "rgba(192,132,252,0.12)",
  heroMesh:
    "radial-gradient(circle at top, rgba(244,114,182,0.16) 0%, rgba(244,114,182,0) 40%), radial-gradient(circle at 80% 20%, rgba(192,132,252,0.18) 0%, rgba(192,132,252,0) 36%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
  panelGradient:
    "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
  footerGradient:
    "linear-gradient(135deg, rgba(244,114,182,0.18) 0%, rgba(192,132,252,0.16) 100%)",
  lineGradient:
    "linear-gradient(90deg, rgba(244,114,182,0) 0%, rgba(244,114,182,0.75) 30%, rgba(192,132,252,0.75) 70%, rgba(192,132,252,0) 100%)",
  screenFade:
    "linear-gradient(180deg, rgba(13,6,17,0) 0%, rgba(13,6,17,0.04) 100%)",
  photoOverlay:
    "linear-gradient(180deg, rgba(0,0,0,0) 24%, rgba(8,4,12,0.72) 100%)",
  cardPhotoOverlay:
    "linear-gradient(180deg, rgba(0,0,0,0.04) 8%, rgba(9,5,13,0.72) 100%)",
  orbPink: "rgba(244,114,182,0.26)",
  orbPinkFade: "rgba(244,114,182,0)",
  orbPurple: "rgba(192,132,252,0.24)",
  orbPurpleFade: "rgba(192,132,252,0)",
  buttonText: "#16091C",
  shadow: "0 28px 80px rgba(3,1,5,0.5)",
  shadowSoft: "0 16px 44px rgba(3,1,5,0.28)",
  accentRgb: "244,114,182",
  secondaryRgb: "192,132,252",
  textRgb: "250,245,255",
};

const lightTheme: Theme = {
  bg: "#FFF7FB",
  bgSoft: "#FCECF6",
  surface: "rgba(255,255,255,0.82)",
  surfaceStrong: "rgba(255,255,255,0.96)",
  surfaceMuted: "rgba(89,31,74,0.04)",
  text: "#2E1631",
  textSoft: "#5E2E67",
  textMuted: "#8D5E92",
  accent: "#F472B6",
  accentSoft: "#EC4899",
  accentWash: "rgba(244,114,182,0.14)",
  secondary: "#C084FC",
  secondarySoft: "#7C3AED",
  border: "rgba(143,66,118,0.16)",
  borderStrong: "rgba(192,132,252,0.28)",
  glow: "rgba(244,114,182,0.14)",
  glowSoft: "rgba(192,132,252,0.08)",
  heroMesh:
    "radial-gradient(circle at top, rgba(244,114,182,0.14) 0%, rgba(244,114,182,0) 40%), radial-gradient(circle at 84% 18%, rgba(192,132,252,0.16) 0%, rgba(192,132,252,0) 32%), linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)",
  panelGradient:
    "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(250,233,246,0.68) 100%)",
  footerGradient:
    "linear-gradient(135deg, rgba(244,114,182,0.12) 0%, rgba(192,132,252,0.1) 100%)",
  lineGradient:
    "linear-gradient(90deg, rgba(244,114,182,0) 0%, rgba(244,114,182,0.72) 30%, rgba(192,132,252,0.72) 70%, rgba(192,132,252,0) 100%)",
  screenFade:
    "linear-gradient(180deg, rgba(255,247,251,0) 0%, rgba(255,247,251,0.14) 100%)",
  photoOverlay:
    "linear-gradient(180deg, rgba(255,255,255,0) 24%, rgba(84,36,77,0.24) 100%)",
  cardPhotoOverlay:
    "linear-gradient(180deg, rgba(255,255,255,0.02) 8%, rgba(84,36,77,0.22) 100%)",
  orbPink: "rgba(244,114,182,0.18)",
  orbPinkFade: "rgba(244,114,182,0)",
  orbPurple: "rgba(192,132,252,0.18)",
  orbPurpleFade: "rgba(192,132,252,0)",
  buttonText: "#FFF7FB",
  shadow: "0 28px 80px rgba(98,54,95,0.14)",
  shadowSoft: "0 16px 44px rgba(98,54,95,0.08)",
  accentRgb: "244,114,182",
  secondaryRgb: "192,132,252",
  textRgb: "46,22,49",
};

type SalonService = {
  eyebrow: string;
  title: string;
  copy: string;
  tag: string;
  price: string;
  image: string;
};

type IndustryContent = {
  navDescriptor: string;
  badge: string;
  headline: string;
  defaultSubhead: string;
  servicesHeading: string;
  aiSummary: string;
  chatPills: string[];
  liveOutcome: string;
  liveNote: string;
  contactHeading: string;
  contactCopy: string;
  primaryCta: string;
  secondaryCta: string;
  requestCta: string;
  heroStats: { value: string; label: string }[];
  services: SalonService[];
  trustBadges: string[];
  footerNotes: string[];
  heroImage: string;
  heroImageAlt: string;
};

const INDUSTRY_CONTENT: Record<"nail-salon" | "hair-braiding" | "barber" | "beauty", IndustryContent> = {
  "nail-salon": {
    navDescriptor: "Quiet luxury beauty studio",
    badge: "Appointment-led beauty studio",
    headline: "Glow.\nGlam.\nGo.",
    defaultSubhead:
      "Editorial styling, consult-first color, and detail-driven nail work in a plum-dark studio built for clients who want polish without noise.",
    servicesHeading:
      "Image-first treatments with enough restraint to still feel expensive.",
    aiSummary:
      "The demo below shows the salon agent holding a haircut slot, honoring a preferred stylist, and saving appointment notes without sending the client through a form maze.",
    chatPills: [
      "Preferred stylist memory",
      "Evening slot lookup",
      "Text confirmation ready",
    ],
    liveOutcome: "Hair appointment held with Maya at 6:30 PM.",
    liveNote: "Quiet service note saved. Text confirmation queued.",
    contactHeading: "Start with the service, then shape the details together.",
    contactCopy:
      "Use the form for first-time visits, color corrections, or any appointment where timing matters. We reply with a real plan, not a generic autoresponder.",
    primaryCta: "Reserve your time",
    secondaryCta: "Chat with our concierge",
    requestCta: "Request a slot",
    heroStats: [
      { value: "Thu 6:30", label: "Maya open" },
      { value: "Quiet note", label: "Saved" },
      { value: "Text reply", label: "Enabled" },
    ],
    services: [
      {
        eyebrow: "Cut + style",
        title: "Manicure",
        copy: "Clean prep, careful shaping, and a high-shine finish for everyday polish or event-ready hands.",
        tag: "from $45",
        price: "from $45",
        image:
          "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        eyebrow: "Color studio",
        title: "Pedicure",
        copy: "Softening soak, detailed cuticle work, and color that feels composed from sandal season to special nights.",
        tag: "from $60",
        price: "from $60",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
      },
      {
        eyebrow: "Hands + detail",
        title: "Nail Art",
        copy: "Modern accents, fine-line details, and repair-focused prep for clients who want polish that reads clean, not loud.",
        tag: "from $75",
        price: "from $75",
        image:
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    trustBadges: ["15+ Years", "4.9 Google", "8K+ Clients", "Consult First"],
    footerNotes: ["Tue-Fri 10-8", "Sat 9-6", "Sun 10-4", "By appointment for color work"],
    heroImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    heroImageAlt: "Salon chair and editorial beauty styling",
  },
  "hair-braiding": {
    navDescriptor: "Protective styling and braid studio",
    badge: "Protective style booking studio",
    headline: "Crown your confidence.\nBraids crafted with love.",
    defaultSubhead: "Built for {prospectName} by AEXON AI",
    servicesHeading:
      "Braids, twists, loc care, and protective styles planned around your hair goals.",
    aiSummary:
      "The demo below shows the braiding agent matching a style request, checking same-day availability, and saving appointment notes before the client ever fills out a long form.",
    chatPills: ["Style preference saved", "Same-day lookup", "Prep notes ready"],
    liveOutcome: "Knotless braid appointment held for Thursday at 6:30 PM.",
    liveNote: "Hair length, color, and prep notes saved. Text confirmation queued.",
    contactHeading: "Choose the style, then let the details get handled.",
    contactCopy:
      "Use the form for braids, twists, loc care, or wig work. We collect style notes, timing, and contact details so the appointment starts prepared.",
    primaryCta: "Book Your Braids",
    secondaryCta: "View Our Work",
    requestCta: "Request a braid slot",
    heroStats: [
      { value: "Today", label: "Same-day" },
      { value: "All textures", label: "Welcome" },
      { value: "Text reply", label: "Enabled" },
    ],
    services: [
      { eyebrow: "Protective style", title: "Box Braids", copy: "Classic sectioning, clean parts, and a comfortable finish for long-wear protective styling.", tag: "from $85", price: "from $85", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Lightweight finish", title: "Knotless Braids", copy: "Tension-aware installs with a natural start and polished movement from day one.", tag: "from $120", price: "from $120", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Clean pattern", title: "Cornrows", copy: "Straight-back, stitch, or custom braid patterns finished with neat edges and hold.", tag: "from $60", price: "from $60", image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Soft texture", title: "Twists", copy: "Two-strand, passion, or Senegalese-inspired twists shaped for the length and fullness you want.", tag: "from $70", price: "from $70", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Care plan", title: "Loc Maintenance", copy: "Retwist and maintenance appointments that keep your parts clean and your locs healthy.", tag: "from $50", price: "from $50", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Custom unit", title: "Braided Wigs", copy: "Consult-led braided wig work for clients who want protective styling with flexible wear.", tag: "from $200", price: "from $200", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80" },
    ],
    trustBadges: ["5★ Google", "Licensed & Insured", "Same-Day Appointments", "All Hair Types Welcome"],
    footerNotes: ["Tue-Fri 10-7", "Sat 8-6", "Sun by appointment", "Deposit may be required for long styles"],
    heroImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=80",
    heroImageAlt: "Protective braiding studio styling detail",
  },
  barber: {
    navDescriptor: "Barber chair and grooming studio",
    badge: "Chair-ready grooming studio",
    headline: "Sharp cuts.\nClean fades.\nReal conversation.",
    defaultSubhead: "Built for {prospectName} by AEXON AI",
    servicesHeading:
      "Cuts, fades, shaves, and line work with timing tight enough for repeat clients.",
    aiSummary:
      "The demo below shows the barber agent finding an open chair, saving cut preferences, and confirming the visit by text.",
    chatPills: ["Cut preference saved", "Chair lookup", "Walk-in routing"],
    liveOutcome: "Fade and beard trim held for Thursday at 6:30 PM.",
    liveNote: "Preferred barber, guard length, and text confirmation saved.",
    contactHeading: "Book the chair, keep the cut notes ready.",
    contactCopy:
      "Use the form for cuts, fades, shaves, or kids appointments. The concierge keeps preferences attached so repeat visits feel easy.",
    primaryCta: "Book a Chair",
    secondaryCta: "Walk In Today",
    requestCta: "Request a chair",
    heroStats: [
      { value: "Next chair", label: "Available" },
      { value: "Hot towel", label: "Ready" },
      { value: "Text reply", label: "Enabled" },
    ],
    services: [
      { eyebrow: "Signature cut", title: "Classic Cut", copy: "Clean scissor or clipper work shaped around your routine and preferred finish.", tag: "from $25", price: "from $25", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Blend work", title: "Fade", copy: "Low, mid, high, or skin fades with balanced weight and a crisp final shape.", tag: "from $30", price: "from $30", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Beard detail", title: "Beard Trim", copy: "Shape, taper, and clean-up work for beards that need structure without overcutting.", tag: "from $15", price: "from $15", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Razor service", title: "Hot Towel Shave", copy: "Warm towel prep, close razor work, and a calm finish for a clean reset.", tag: "from $35", price: "from $35", image: "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Edges", title: "Line-Up", copy: "Sharp perimeter work for hairline, neckline, and beard edges between full cuts.", tag: "from $20", price: "from $20", image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Young clients", title: "Kids Cut", copy: "Patient, efficient cuts for school weeks, picture days, and family appointments.", tag: "from $18", price: "from $18", image: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=80" },
    ],
    trustBadges: ["Master Barbers", "Walk-Ins Welcome", "Est. 2018", "Hot Towel Service"],
    footerNotes: ["Mon-Fri 9-7", "Sat 8-5", "Walk-ins welcome", "Appointments recommended for shaves"],
    heroImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80",
    heroImageAlt: "Barbershop chair and grooming tools",
  },
  beauty: {
    navDescriptor: "Beauty ritual and treatment studio",
    badge: "Treatment-led beauty studio",
    headline: "Beauty rituals,\nyour way.",
    defaultSubhead: "Built for {prospectName} by AEXON AI",
    servicesHeading:
      "Skin, lashes, brows, and beauty rituals booked with the right prep notes.",
    aiSummary:
      "The demo below shows the beauty agent pairing a treatment request with availability, capturing preferences, and confirming the appointment by text.",
    chatPills: ["Treatment match", "Prep notes saved", "Text confirmation ready"],
    liveOutcome: "Facial appointment held for Thursday at 6:30 PM.",
    liveNote: "Skin goals, product sensitivities, and confirmation saved.",
    contactHeading: "Start with the treatment, then personalize the visit.",
    contactCopy:
      "Use the form for facials, waxing, lashes, brows, makeup, or skincare. The concierge keeps preferences organized before the appointment.",
    primaryCta: "Book a Treatment",
    secondaryCta: "Explore Services",
    requestCta: "Request a treatment",
    heroStats: [
      { value: "Skin notes", label: "Saved" },
      { value: "Clean care", label: "Products" },
      { value: "Text reply", label: "Enabled" },
    ],
    services: [
      { eyebrow: "Skin care", title: "Facials", copy: "Goal-led skin treatments for reset, glow, hydration, or barrier support.", tag: "from $65", price: "from $65", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Smooth finish", title: "Waxing", copy: "Efficient waxing appointments with clean prep, aftercare notes, and careful timing.", tag: "from $35", price: "from $35", image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Lash studio", title: "Lashes", copy: "Lift, tint, or extension appointments shaped around the look and upkeep you want.", tag: "from $85", price: "from $85", image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Brow shape", title: "Brows", copy: "Shape, tint, lamination, and maintenance for brows that frame without overpowering.", tag: "from $45", price: "from $45", image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Event ready", title: "Makeup", copy: "Soft glam, event makeup, and camera-ready looks with timing built into the booking.", tag: "from $95", price: "from $95", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80" },
      { eyebrow: "Skin plan", title: "Skincare", copy: "Consult-led regimens and treatment plans for clients who want progress between visits.", tag: "from $120", price: "from $120", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80" },
    ],
    trustBadges: ["Licensed Estheticians", "Clean Products", "Est. 2018", "Gift Cards"],
    footerNotes: ["Tue-Fri 10-7", "Sat 9-5", "Sun by appointment", "Gift cards available"],
    heroImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80",
    heroImageAlt: "Beauty spa facial treatment room",
  },
};

const navItems = [
  { label: "Services", href: "#services" },
  { label: "AI Booking", href: "#ai-demo" },
  { label: "Contact", href: "#contact" },
];

const demoMessages = [
  {
    role: "guest",
    label: "Guest",
    text: "I need a haircut next Thursday after work. Maya is my first choice if she has evening availability.",
  },
  {
    role: "assistant",
    label: "Aura AI",
    text: "Maya has 6:30 PM on Thursday. I can hold that slot for a signature cut and finish. Would you like me to save a quiet appointment note as well?",
  },
  {
    role: "guest",
    label: "Guest",
    text: "Yes please. Make it quiet, shoulder-length trim, and text me the confirmation.",
  },
  {
    role: "assistant",
    label: "Aura AI",
    text: "Done. Maya, Thursday 6:30 PM, signature hair appointment, quiet note saved, confirmation set to text.",
  },
];

function getIndustryKey(industry: string | null): keyof typeof INDUSTRY_CONTENT {
  const normalized = (industry || "").trim().toLowerCase();

  if (!normalized) return "nail-salon";
  if (normalized.includes("barber")) return "barber";
  if (
    normalized.includes("braid") ||
    normalized.includes("hair") ||
    normalized.includes("loc")
  ) {
    return "hair-braiding";
  }
  if (
    normalized.includes("spa") ||
    normalized.includes("beauty") ||
    normalized.includes("esthetic") ||
    normalized.includes("skin") ||
    normalized.includes("lash") ||
    normalized.includes("brow")
  ) {
    return "beauty";
  }
  if (normalized.includes("nail")) return "nail-salon";

  return "beauty";
}

function getProspectContent(searchParams: URLSearchParams) {
  return INDUSTRY_CONTENT[getIndustryKey(searchParams.get("industry"))];
}

function readParam(searchParams: URLSearchParams, key: string) {
  return (searchParams.get(key) || "").trim();
}

function formatWithProspect(value: string, prospectName: string) {
  return value.replaceAll("{prospectName}", prospectName);
}

function getFirstBusinessWord(name: string) {
  return name.trim().split(/\s+/)[0] || "Glow";
}

function alpha(rgb: string, value: number) {
  return `rgba(${rgb},${value})`;
}

function SalonCanvas({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    let width = 0;
    let height = 0;
    let frame = 0;

    class Drip {
      x: number;
      y: number;
      speed: number;
      length: number;
      width: number;
      opacity: number;
      sway: number;

      constructor(seed: number) {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.length = 0;
        this.width = 0;
        this.opacity = 0;
        this.sway = seed;
        this.reset(true);
      }

      reset(initial = false) {
        this.x = width * (0.08 + Math.random() * 0.84);
        this.y = initial ? -Math.random() * height : -80 - Math.random() * 120;
        this.speed = 0.7 + Math.random() * 0.8;
        this.length = 120 + Math.random() * 150;
        this.width = 4 + Math.random() * 6;
        this.opacity = 0.16 + Math.random() * 0.18;
      }

      update(time: number) {
        this.y += this.speed;
        this.x += Math.sin(time * 0.00045 + this.sway) * 0.08;
        if (this.y - this.length > height + 40) {
          this.reset();
        }
      }

      draw() {
        const top = this.y - this.length;
        const gradient = context.createLinearGradient(this.x, top, this.x, this.y + 18);
        gradient.addColorStop(0, alpha(theme.accentRgb, 0));
        gradient.addColorStop(0.22, alpha(theme.accentRgb, this.opacity));
        gradient.addColorStop(0.7, alpha(theme.secondaryRgb, this.opacity * 0.72));
        gradient.addColorStop(1, alpha(theme.secondaryRgb, 0));

        context.save();
        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(this.x - this.width / 2, top + 8);
        context.quadraticCurveTo(this.x, top, this.x + this.width / 2, top + 8);
        context.lineTo(this.x + this.width / 2, this.y);
        context.quadraticCurveTo(
          this.x + this.width,
          this.y + this.width * 1.4,
          this.x,
          this.y + this.width * 2.2,
        );
        context.quadraticCurveTo(
          this.x - this.width,
          this.y + this.width * 1.4,
          this.x - this.width / 2,
          this.y,
        );
        context.closePath();
        context.fill();

        const highlight = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.width * 2.8,
        );
        highlight.addColorStop(0, alpha(theme.accentRgb, this.opacity * 1.4));
        highlight.addColorStop(1, alpha(theme.accentRgb, 0));
        context.fillStyle = highlight;
        context.beginPath();
        context.arc(this.x, this.y, this.width * 2.8, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      spin: number;

      constructor(seed: number) {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = 0;
        this.spin = seed;
        this.reset(true);
      }

      reset(initial = false) {
        this.x = width * (0.12 + Math.random() * 0.76);
        this.y = initial ? height * (0.58 + Math.random() * 0.34) : height + 20;
        this.size = 6 + Math.random() * 5;
        this.speedX = -0.18 + Math.random() * 0.36;
        this.speedY = 0.5 + Math.random() * 0.45;
        this.opacity = 0.18 + Math.random() * 0.18;
      }

      update(time: number) {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(time * 0.0006 + this.spin) * 0.12;
        if (this.y < -40) {
          this.reset();
        }
      }

      draw(time: number) {
        const twinkle = 0.65 + Math.sin(time * 0.002 + this.spin) * 0.25;
        const currentOpacity = this.opacity * twinkle;
        context.save();
        context.translate(this.x, this.y);
        context.rotate(time * 0.00045 + this.spin);
        context.strokeStyle = alpha(theme.secondaryRgb, currentOpacity);
        context.lineWidth = 1.25;
        context.beginPath();
        context.moveTo(-this.size, 0);
        context.lineTo(this.size, 0);
        context.moveTo(0, -this.size);
        context.lineTo(0, this.size);
        context.stroke();

        context.fillStyle = alpha(theme.accentRgb, currentOpacity * 1.1);
        context.beginPath();
        context.arc(0, 0, this.size * 0.28, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const drips = Array.from({ length: 8 }, (_, index) => new Drip(index));
    const particles = Array.from({ length: 4 }, (_, index) => new Particle(index));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      drips.forEach((drip) => {
        drip.update(time);
        drip.draw();
      });
      particles.forEach((particle) => {
        particle.update(time);
        particle.draw(time);
      });
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function LogoMark({ color }: { color: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ width: "1.1rem", height: "1.1rem", color }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 17c0-4.5 3.1-8.4 7.6-9.6" />
      <path d="M18 7c0 4.5-3.1 8.4-7.6 9.6" />
      <path d="M8.5 6.5c.5 1.2 1.4 2.2 2.6 2.7" />
      <path d="M12.9 14.7c1.2.5 2.1 1.5 2.6 2.8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ width: "1rem", height: "1rem" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="M4.93 4.93l1.77 1.77" />
      <path d="M17.3 17.3l1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="M4.93 19.07l1.77-1.77" />
      <path d="M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ width: "1rem", height: "1rem" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a7 7 0 0 0 10.2 10.2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ width: "1rem", height: "1rem" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      style={{ width: "0.9rem", height: "0.9rem" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.7 19.7 0 0 1-3.1-8.6A2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L7.1 9a16 16 0 0 0 7.9 7.9l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.8a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function Badge({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.5rem 0.9rem",
        borderRadius: "999px",
        border: `1px solid ${theme.border}`,
        background: theme.surfaceMuted,
        color: theme.textSoft,
        fontFamily: "var(--font-cinzel), serif",
        fontSize: "0.68rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ContactField({
  label,
  value,
  name,
  type,
  onChange,
  theme,
}: {
  label: string;
  value: string;
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  theme: Theme;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
        position: "relative",
      }}
    >
      <span
        style={{
          color: theme.textMuted,
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "0.66rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          border: `1px solid ${theme.border}`,
          background: theme.surfaceMuted,
          color: theme.text,
          borderRadius: "1.1rem",
          padding: "0.95rem 1rem",
          outline: "none",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.95rem",
          boxShadow: `inset 0 1px 0 ${theme.surfaceStrong}`,
        }}
      />
    </label>
  );
}

export default function SalonPage() {
  return (
    <Suspense fallback={null}>
      <SalonExperience />
    </Suspense>
  );
}

function SalonExperience() {
  const TEMPLATE = { name: 'Hallmark Salon', phone: '(555) 010-4455', email: '' };
  const prospect = useProspectParams(TEMPLATE);
  const searchParams = useSearchParams();
  const content = getProspectContent(searchParams);
  const city = readParam(searchParams, "city");
  const state = readParam(searchParams, "state");
  const customTagline = readParam(searchParams, "tagline");
  const hasCustomLocation = Boolean(city && state);
  const addressHeader = hasCustomLocation
    ? `Proudly serving ${city}, ${state}`
    : "Visit the studio";
  const addressLine = hasCustomLocation
    ? `Central ${city}, ${city}, ${state}`
    : "18 Mercer Row, Studio 4, New York, NY";
  const heroSubhead = customTagline || formatWithProspect(content.defaultSubhead, prospect.name);
  const firstBusinessWord = getFirstBusinessWord(prospect.name);
  const demoMessagesForProspect = [
    {
      role: "assistant",
      label: "Aura AI",
      text: `Welcome to ${firstBusinessWord}! I can help with services, timing, and appointment notes. What would you like to book?`,
    },
    ...demoMessages,
  ];
  const trustBadgesForProspect = [
    ...content.trustBadges.map((badge) =>
      hasCustomLocation && badge === "5★ Google" ? `5★ Google ${city}` : badge,
    ),
    `${prospect.name} — Live demo for 5 days`,
  ];
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [visibleTiles, setVisibleTiles] = useState<Set<number>>(new Set());
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const tileRefs = useRef<(HTMLElement | null)[]>([]);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    service: content.services[0]?.title || "Manicure",
    date: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = window.localStorage.getItem("salon-theme");
    if (savedTheme === "light") {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("salon-theme", isDark ? "dark" : "light");
    document.body.style.backgroundColor = isDark ? darkTheme.bg : lightTheme.bg;
  }, [isDark, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const observers: IntersectionObserver[] = [];

    tileRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleTiles((prev) => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });
            } else {
              setVisibleTiles((prev) => {
                const next = new Set(prev);
                next.delete(index);
                return next;
              });
            }
          });
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [mounted, content.services.length]);

  const c = isDark ? darkTheme : lightTheme;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      data-theme={isDark ? "dark" : "light"}
      className={`${cormorant.variable} ${cinzel.variable} ${dmSans.variable}`}
      style={{
        minHeight: "100vh",
        backgroundColor: c.bg,
        backgroundImage: c.heroMesh,
        color: c.text,
        fontFamily: "var(--font-dm-sans), sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SalonCanvas theme={c} />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: c.screenFade,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-8rem",
          left: "-6rem",
          width: "24rem",
          height: "24rem",
          borderRadius: "999px",
          zIndex: 1,
          pointerEvents: "none",
          background: `radial-gradient(circle, ${c.orbPink} 0%, ${c.orbPinkFade} 72%)`,
          filter: "blur(18px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "18rem",
          right: "-8rem",
          width: "28rem",
          height: "28rem",
          borderRadius: "999px",
          zIndex: 1,
          pointerEvents: "none",
          background: `radial-gradient(circle, ${c.orbPurple} 0%, ${c.orbPurpleFade} 72%)`,
          filter: "blur(20px)",
        }}
      />

      <button
        type="button"
        aria-label="Toggle theme"
        onClick={() => setIsDark((current) => !current)}
        style={{
          position: "fixed",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 100,
          width: "2.9rem",
          height: "2.9rem",
          borderRadius: "999px",
          border: `1px solid ${c.border}`,
          background: c.surface,
          color: c.text,
          backdropFilter: "blur(18px)",
          boxShadow: c.shadowSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <span style={{ width: "1rem", height: "1rem" }} />}
      </button>

      <div style={{ position: "relative", zIndex: 10 }}>
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            padding: "1rem clamp(1.25rem, 4vw, 3rem)",
            backdropFilter: "blur(18px)",
            background: c.surface,
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          <div
            style={{
              maxWidth: "76rem",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "999px",
                  display: "grid",
                  placeItems: "center",
                  background: c.accentWash,
                  border: `1px solid ${c.border}`,
                }}
              >
                <LogoMark color={c.accent} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.82rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: c.textSoft,
                  }}
                >
                  {prospect.name}
                </div>
                <div
                  style={{
                    fontSize: "0.86rem",
                    color: c.textMuted,
                  }}
                >
                  {content.navDescriptor}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.9rem",
                flexWrap: "wrap",
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    color: c.textMuted,
                    textDecoration: "none",
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.82rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={prospect.phoneHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.72rem 1rem",
                  borderRadius: "999px",
                  border: `1px solid ${c.border}`,
                  color: c.text,
                  textDecoration: "none",
                  background: c.surfaceMuted,
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <PhoneIcon />
                {prospect.phone}
              </a>
            </div>
          </div>
        </nav>

        <main>
          {/* Page-level header */}
          <div
            style={{
              padding: "0 clamp(1.25rem, 4vw, 3rem)",
              borderBottom: `1px solid ${c.border}`,
            }}
          >
            <div
              style={{
                maxWidth: "76rem",
                margin: "0 auto",
                padding: "1.2rem 0 1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: c.textMuted,
                  }}
                >
                  {prospect.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 600,
                    color: c.text,
                    lineHeight: 1,
                  }}
                >
                  Services & Booking
                </div>
              </div>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.65rem 1.1rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  color: c.buttonText,
                  background: `linear-gradient(135deg, ${c.accent} 0%, ${c.secondary} 100%)`,
                  boxShadow: `0 10px 26px ${c.glow}`,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                }}
                onMouseEnter={() => setHoveredButton("hero-primary")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {content.primaryCta}
                <ArrowIcon />
              </a>
            </div>
          </div>

          <section
            style={{
              padding: "clamp(4.5rem, 9vw, 8rem) clamp(1.25rem, 4vw, 3rem) 4rem",
            }}
          >
            <div
              style={{
                maxWidth: "76rem",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))",
                gap: "clamp(2rem, 5vw, 5rem)",
                alignItems: "center",
              }}
            >
              <div style={{ display: "grid", gap: "1.35rem" }}>
                <Badge theme={c}>{content.badge}</Badge>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(4rem, 14vw, 8.6rem)",
                    lineHeight: 0.84,
                    letterSpacing: "-0.05em",
                    fontWeight: 600,
                  }}
                >
                  {content.headline.split("\n").map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h1>
                <p
                  style={{
                    margin: 0,
                    maxWidth: "32rem",
                    color: c.textSoft,
                    fontSize: "1.08rem",
                    lineHeight: 1.8,
                  }}
                >
                  {heroSubhead}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.9rem",
                    alignItems: "center",
                  }}
                >
                  <a
                    href="#contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.95rem 1.3rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      color: c.buttonText,
                      background: `linear-gradient(135deg, ${c.accent} 0%, ${c.secondary} 100%)`,
                      boxShadow: hoveredButton === "hero-cta"
                        ? `0 20px 48px ${c.glow}`
                        : `0 14px 34px ${c.glow}`,
                      fontWeight: 700,
                      transform: hoveredButton === "hero-cta" ? "translateY(-2px)" : "translateY(0)",
                      transition: "transform 200ms ease, box-shadow 200ms ease",
                    }}
                    onMouseEnter={() => setHoveredButton("hero-cta")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {content.primaryCta}
                    <ArrowIcon />
                  </a>
                  <a
                    href="#ai-demo"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.95rem 1.3rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      color: c.text,
                      border: `1px solid ${c.border}`,
                      background: c.surfaceMuted,
                    }}
                  >
                    {content.secondaryCta}
                  </a>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  minHeight: "31rem",
                  borderRadius: "2rem",
                  overflow: "hidden",
                  background: c.panelGradient,
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                }}
              >
                <img
                  src={content.heroImage}
                  alt={content.heroImageAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: isDark ? "brightness(0.74)" : "brightness(0.96)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: c.photoOverlay,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "1.2rem",
                    right: "1.2rem",
                    bottom: "1.2rem",
                    display: "grid",
                    gap: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(8.5rem, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {content.heroStats.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          background: alpha(c.textRgb, isDark ? 0.08 : 0.72),
                          border: `1px solid ${alpha(c.textRgb, isDark ? 0.08 : 0.12)}`,
                          borderRadius: "1.15rem",
                          padding: "0.85rem 0.9rem",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "1.45rem",
                            lineHeight: 1,
                          }}
                        >
                          {item.value}
                        </div>
                        <div
                          style={{
                            color: c.secondarySoft,
                            fontFamily: "var(--font-cinzel), serif",
                            fontSize: "0.62rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            marginTop: "0.4rem",
                          }}
                        >
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "0.4rem",
                      color: c.textSoft,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "0.66rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: c.accentSoft,
                      }}
                    >
                      Studio note
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "2rem",
                        lineHeight: 1.05,
                      }}
                    >
                      Soft lighting, slow appointments, and booking that already
                      knows your stylist preference.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            aria-hidden="true"
            style={{
              height: "4.5rem",
              background: c.surface,
              clipPath: "polygon(0 26%, 100% 0, 100% 78%, 0 100%)",
              borderTop: `1px solid ${c.border}`,
              borderBottom: `1px solid ${c.border}`,
            }}
          />

          <section
            id="services"
            style={{
              padding: "4rem clamp(1.25rem, 4vw, 3rem)",
            }}
          >
            <div
              style={{
                maxWidth: "76rem",
                margin: "0 auto",
                display: "grid",
                gap: "1.25rem",
              }}
            >
              <div style={{ maxWidth: "40rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: c.accentSoft,
                    marginBottom: "0.85rem",
                  }}
                >
                  Services
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(2.6rem, 7vw, 4.6rem)",
                    lineHeight: 0.94,
                    fontWeight: 600,
                  }}
                >
                  {content.servicesHeading}
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                  gap: "1.2rem",
                }}
              >
                {content.services.map((service, index) => {
                  const isActive = hoveredService === index;
                  const isVisible = visibleTiles.has(index);
                  return (
                    <article
                      ref={(el) => { tileRefs.current[index] = el; }}
                      key={service.title}
                      onMouseEnter={() => setHoveredService(index)}
                      onMouseLeave={() => setHoveredService(null)}
                      style={{
                        borderRadius: "1.8rem",
                        overflow: "hidden",
                        border: `1px solid ${isActive ? c.borderStrong : c.border}`,
                        background: c.surfaceStrong,
                        boxShadow: isActive
                          ? `0 22px 56px ${c.glow}`
                          : c.shadowSoft,
                        transform: isActive
                          ? "translateY(-8px) scale(1.02)"
                          : isVisible
                          ? "translateY(0) scale(1)"
                          : "translateY(2.5rem) scale(0.97)",
                        opacity: isVisible ? 1 : 0,
                        transition:
                          "transform 380ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease, border-color 220ms ease, opacity 420ms cubic-bezier(0.22,1,0.36,1), filter 300ms ease",
                        transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
                        willChange: "transform, opacity",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          height: "18rem",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: isActive ? "scale(1.06)" : "scale(1)",
                            transition: "transform 260ms ease",
                            filter: isDark
                              ? "brightness(0.76)"
                              : "brightness(0.94)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: c.cardPhotoOverlay,
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(110deg, transparent 24%, ${alpha(
                              c.accentRgb,
                              isActive ? 0.2 : 0,
                            )} 50%, transparent 76%)`,
                            transform: isActive
                              ? "translateX(35%)"
                              : "translateX(-40%)",
                            transition: "transform 420ms ease",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "1.15rem",
                            right: "1.15rem",
                            bottom: "1.15rem",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-cinzel), serif",
                              fontSize: "0.64rem",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: c.secondarySoft,
                              marginBottom: "0.5rem",
                            }}
                          >
                            {service.eyebrow}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-cormorant), serif",
                              fontSize: "2rem",
                              lineHeight: 1,
                            }}
                          >
                            {service.title}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "1.35rem 1.2rem 1.4rem",
                          display: "grid",
                          gap: "0.9rem",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: c.textSoft,
                            lineHeight: 1.75,
                            fontSize: "0.98rem",
                          }}
                        >
                          {service.copy}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              padding: "0.55rem 0.85rem",
                              borderRadius: "999px",
                              border: `1px solid ${c.border}`,
                              background: c.accentWash,
                              color: c.text,
                              fontFamily: "var(--font-cinzel), serif",
                              fontSize: "0.64rem",
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                            }}
                          >
                            {service.price}
                          </span>
                          <a
                            href="#contact"
                            style={{
                              color: c.text,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.45rem",
                            }}
                          >
                            {content.requestCta}
                            <ArrowIcon />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="ai-demo"
            style={{
              padding: "1rem clamp(1.25rem, 4vw, 3rem) 4.5rem",
            }}
          >
            <div
              style={{
                maxWidth: "76rem",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))",
                gap: "1.4rem",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  padding: "1.6rem",
                  borderRadius: "1.8rem",
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadowSoft,
                  display: "grid",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: c.accentSoft,
                  }}
                >
                  Concierge Agent
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(2.4rem, 6.5vw, 4.2rem)",
                    lineHeight: 0.98,
                    fontWeight: 600,
                  }}
                >
                  Let the booking assistant handle the back-and-forth.
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: c.textSoft,
                    lineHeight: 1.75,
                  }}
                >
                  {content.aiSummary}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
                    gap: "0.85rem",
                  }}
                >
                  {content.chatPills.map((item) => (
                    <div
                      key={item}
                      style={{
                        borderRadius: "1.2rem",
                        padding: "0.95rem 1rem",
                        border: `1px solid ${c.border}`,
                        background: c.surfaceMuted,
                        color: c.textSoft,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: "1.8rem",
                  background: c.surfaceStrong,
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "1rem 1.15rem",
                    borderBottom: `1px solid ${c.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "0.64rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: c.textMuted,
                      }}
                    >
                      Book by chat
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.75rem",
                        lineHeight: 1,
                      }}
                    >
                      {`${prospect.name} AI`} concierge
                    </div>
                  </div>
                  <span
                    style={{
                      borderRadius: "999px",
                      padding: "0.55rem 0.85rem",
                      background: c.accentWash,
                      color: c.text,
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Stylist preference saved
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "0.85rem",
                    padding: "1.1rem",
                  }}
                >
                  {demoMessagesForProspect.map((message) => {
                    const isAssistant = message.role === "assistant";
                    return (
                      <div
                        key={message.text}
                        style={{
                          display: "grid",
                          justifyItems: isAssistant ? "start" : "end",
                          gap: "0.35rem",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-cinzel), serif",
                            fontSize: "0.6rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: c.textMuted,
                          }}
                        >
                          {message.label}
                        </div>
                        <div
                          style={{
                            maxWidth: "27rem",
                            padding: "0.95rem 1rem",
                            borderRadius: isAssistant
                              ? "1.1rem 1.1rem 1.1rem 0.35rem"
                              : "1.1rem 1.1rem 0.35rem 1.1rem",
                            background: isAssistant
                              ? c.surfaceMuted
                              : `linear-gradient(135deg, ${c.accent} 0%, ${c.secondary} 100%)`,
                            color: isAssistant ? c.text : c.buttonText,
                            lineHeight: 1.7,
                            boxShadow: isAssistant ? "none" : `0 14px 32px ${c.glow}`,
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    );
                  })}

                  <div
                    style={{
                      marginTop: "0.6rem",
                      padding: "1rem",
                      borderRadius: "1.3rem",
                      border: `1px solid ${c.border}`,
                      background: c.footerGradient,
                      display: "grid",
                      gap: "0.45rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: c.textMuted,
                      }}
                    >
                      Live outcome
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "2rem",
                        lineHeight: 1,
                      }}
                    >
                      {content.liveOutcome}
                    </div>
                    <div style={{ color: c.textSoft }}>
                      {content.liveNote}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              padding: "0 clamp(1.25rem, 4vw, 3rem) 4rem",
            }}
          >
            <div
              style={{
                maxWidth: "76rem",
                margin: "0 auto",
                display: "flex",
                gap: "0.8rem",
                flexWrap: "wrap",
              }}
            >
              {trustBadgesForProspect.map((badge) => (
                <div
                  key={badge}
                  style={{
                    padding: "0.8rem 1rem",
                    borderRadius: "999px",
                    border: `1px solid ${c.border}`,
                    background: c.surface,
                    color: c.text,
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    boxShadow: c.shadowSoft,
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </section>

          <section
            id="contact"
            style={{
              padding: "0 clamp(1.25rem, 4vw, 3rem) 5rem",
            }}
          >
            <div
              style={{
                maxWidth: "76rem",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))",
                gap: "1.4rem",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  padding: "1.6rem",
                  borderRadius: "1.8rem",
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadowSoft,
                  display: "grid",
                  gap: "0.95rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: c.accentSoft,
                  }}
                >
                  Contact
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(2.4rem, 6vw, 4rem)",
                    lineHeight: 0.96,
                    fontWeight: 600,
                  }}
                >
                  {content.contactHeading}
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: c.textSoft,
                    lineHeight: 1.75,
                  }}
                >
                  {content.contactCopy}
                </p>

                <div
                  style={{
                    marginTop: "0.8rem",
                    paddingTop: "1rem",
                    borderTop: `1px solid ${c.border}`,
                    display: "grid",
                    gap: "0.7rem",
                  }}
                >
                  {content.footerNotes.map((note) => (
                    <div key={note} style={{ color: c.text }}>
                      {note}
                    </div>
                  ))}
                  <div style={{ color: c.textMuted }}>
                    <strong style={{ color: c.text }}>{addressHeader}</strong>
                    <br />
                    {addressLine}
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "1.6rem",
                  borderRadius: "1.8rem",
                  background: c.surfaceStrong,
                  border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                  display: "grid",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <ContactField
                    label="Name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    theme={c}
                  />
                  <ContactField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    theme={c}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <ContactField
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    theme={c}
                  />
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.55rem",
                    }}
                  >
                    <span
                      style={{
                        color: c.textMuted,
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "0.66rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Service
                    </span>
                    <select
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      style={{
                        border: `1px solid ${c.border}`,
                        background: c.surfaceMuted,
                        color: c.text,
                        borderRadius: "1.1rem",
                        padding: "0.95rem 1rem",
                        outline: "none",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.95rem",
                      }}
                    >
                      {content.services.map((service) => (
                        <option key={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <ContactField
                  label="Preferred Date"
                  name="date"
                  type="text"
                  value={formState.date}
                  onChange={handleChange}
                  theme={c}
                />

                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  }}
                >
                  <span
                    style={{
                      color: c.textMuted,
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "0.66rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Notes
                  </span>
                  <textarea
                    name="note"
                    value={formState.note}
                    onChange={handleChange}
                    rows={5}
                    style={{
                      border: `1px solid ${c.border}`,
                      background: c.surfaceMuted,
                      color: c.text,
                      borderRadius: "1.1rem",
                      padding: "0.95rem 1rem",
                      outline: "none",
                      resize: "vertical",
                      minHeight: "8rem",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.95rem",
                    }}
                  />
                </label>

                <button
                  type="submit"
                  style={{
                    border: "none",
                    borderRadius: "999px",
                    padding: "1rem 1.3rem",
                    cursor: "pointer",
                    background: `linear-gradient(135deg, ${c.accent} 0%, ${c.secondary} 100%)`,
                    color: c.buttonText,
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 700,
                    boxShadow: hoveredButton === "form-submit"
                      ? `0 24px 52px ${c.glow}`
                      : `0 16px 36px ${c.glow}`,
                    transform: hoveredButton === "form-submit" ? "translateY(-2px)" : "translateY(0)",
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                  }}
                  onMouseEnter={() => setHoveredButton("form-submit")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Request appointment
                </button>

                {submitted ? (
                  <div
                    style={{
                      padding: "0.95rem 1rem",
                      borderRadius: "1.1rem",
                      border: `1px solid ${c.border}`,
                      background: c.accentWash,
                      color: c.text,
                    }}
                  >
                    Appointment request staged. The demo salon will follow up
                    with timing and stylist confirmation.
                  </div>
                ) : null}
              </form>
            </div>
          </section>
        </main>

        <footer
          style={{
            padding: "0 clamp(1.25rem, 4vw, 3rem) 2.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "76rem",
              margin: "0 auto",
              borderRadius: "2rem",
              overflow: "hidden",
              border: `1px solid ${c.border}`,
              background: c.surfaceStrong,
              boxShadow: c.shadowSoft,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                height: "3px",
                background: c.lineGradient,
              }}
            />
            <div
              style={{
                padding: "1.4rem 1.35rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: c.textMuted,
                    marginBottom: "0.6rem",
                  }}
                >
                  Hallmark studio
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "2rem",
                    lineHeight: 1,
                  }}
                >
                  Pink polish, plum depth, no template energy.
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "0.45rem",
                  color: c.textSoft,
                  alignContent: "start",
                }}
              >
                <a href="#services" style={{ color: c.textSoft, textDecoration: "none" }}>
                  Services
                </a>
                <a href="#ai-demo" style={{ color: c.textSoft, textDecoration: "none" }}>
                  AI booking demo
                </a>
                <a href="#contact" style={{ color: c.textSoft, textDecoration: "none" }}>
                  Contact
                </a>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "0.45rem",
                  color: c.textSoft,
                  alignContent: "start",
                }}
              >
                <span>Instagram</span>
                <span>Pinterest</span>
                <span>Text confirmations available</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
