"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import type { ProspectData } from "@/lib/prospect-data";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const DEFAULT_ECOMMERCE_PROSPECT: ProspectData = {
  name: "Vitality Nutrition",
  shortName: "Vitality Nutrition",
  phone: "(971) 555-0674",
  phoneHref: "tel:+197****0674",
  email: "support@vitalitynutrition.co",
  emailHref: "mailto:support@vitalitynutrition.co",
  city: "Portland",
  state: "OR",
  address: "2100 SE Burnside Rd, Portland, OR",
  tagline: "Fuel Your Best Self.",
  expires: "2099-12-31",
  vertical: "ecommerce",
};

type Theme = "light" | "dark";

const themeColors = {
  light: {
    page: "#faf7f2",
    pageRgb: "250, 247, 242",
    pageSoft: "#fffdf8",
    text: "#173126",
    muted: "#525252",
    subtle: "#6b7280",
    border: "rgba(5, 150, 105, 0.18)",
    card: "rgba(255, 253, 248, 0.92)",
    cardSolid: "#fffdf8",
    panel: "rgba(236, 253, 245, 0.78)",
    accent: "#059669",
    accentDeep: "#047857",
    accentSoft: "rgba(5, 150, 105, 0.12)",
    accentGlow: "rgba(5, 150, 105, 0.26)",
    forest: "#0d1f17",
    nav: "rgba(255, 253, 248, 0.78)",
    overlay: "linear-gradient(180deg, rgba(250,247,242,0.82) 0%, rgba(250,247,242,0.68) 42%, rgba(250,247,242,0.86) 100%)",
    shadow: "0 4px 12px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.06)",
    shadowStrong: "0 10px 24px rgba(16, 24, 20, 0.08), 0 24px 52px rgba(16, 24, 20, 0.14)",
  },
  dark: {
    page: "#0d1f17",
    pageRgb: "13, 31, 23",
    pageSoft: "#142b21",
    text: "#f6fff9",
    muted: "#c7d7ce",
    subtle: "#98afa4",
    border: "rgba(16, 185, 129, 0.26)",
    card: "rgba(18, 43, 32, 0.9)",
    cardSolid: "#132b20",
    panel: "rgba(10, 56, 38, 0.84)",
    accent: "#10b981",
    accentDeep: "#059669",
    accentSoft: "rgba(16, 185, 129, 0.16)",
    accentGlow: "rgba(16, 185, 129, 0.34)",
    forest: "#0d1f17",
    nav: "rgba(13, 31, 23, 0.76)",
    overlay: "linear-gradient(180deg, rgba(13,31,23,0.82) 0%, rgba(13,31,23,0.68) 42%, rgba(13,31,23,0.86) 100%)",
    shadow: "0 4px 12px rgba(0,0,0,0.16), 0 12px 28px rgba(0,0,0,0.22)",
    shadowStrong: "0 12px 28px rgba(0,0,0,0.24), 0 28px 58px rgba(0,0,0,0.34)",
  },
};

const products = [
  {
    name: "Grass-Fed Whey Isolate",
    size: "5lb bag",
    price: "$54.99",
    serving: "$1.79/serving",
    rating: "4.9",
    reviews: "2,847 reviews",
    tagline: "25g protein · Unflavored",
    chip: "Bestseller",
    category: "Protein",
    height: 320,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Plant Protein Blend",
    size: "1.5lb bag",
    price: "$42.99",
    serving: "$2.04/serving",
    rating: "4.7",
    reviews: "1,203 reviews",
    tagline: "20g plant protein · Vanilla",
    chip: "New",
    category: "Protein",
    height: 380,
    image: "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Pump Pre-Workout",
    size: "30 servings",
    price: "$34.99",
    serving: "$1.17/serving",
    rating: "4.8",
    reviews: "876 reviews",
    tagline: "200mg caffeine · Blue Raspberry",
    chip: "Clean energy",
    category: "Pre-Workout",
    height: 300,
    image: "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Daily Multivitamin",
    size: "60 capsules",
    price: "$24.99",
    serving: "$0.42/day",
    rating: "4.6",
    reviews: "3,102 reviews",
    tagline: "Whole-food sourced",
    chip: "Bestseller",
    category: "Vitamins",
    height: 350,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Magnesium Glycinate 400mg",
    size: "90 capsules",
    price: "$19.99",
    serving: "$0.22/day",
    rating: "4.9",
    reviews: "1,567 reviews",
    tagline: "Sleep + recovery",
    chip: "Subscribe & save 15%",
    category: "Vitamins",
    height: 280,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Creatine Monohydrate Micronized",
    size: "300g",
    price: "$29.99",
    serving: "$0.50/serving",
    rating: "4.8",
    reviews: "942 reviews",
    tagline: "5g per serving · Unflavored",
    chip: "Lab-tested",
    category: "Protein",
    height: 330,
    image: "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Hydration Electrolyte Powder",
    size: "40 stick packs",
    price: "$32.99",
    serving: "$0.82/serving",
    rating: "4.7",
    reviews: "634 reviews",
    tagline: "1,000mg sodium · Lemon",
    chip: "New",
    category: "Pre-Workout",
    height: 390,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Sleep + Calm Blend",
    size: "30 capsules",
    price: "$27.99",
    serving: "$0.93/night",
    rating: "4.8",
    reviews: "489 reviews",
    tagline: "L-theanine + GABA",
    chip: "Night stack",
    category: "Vitamins",
    height: 315,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Founders Bundle",
    size: "3-pack",
    price: "$119.99",
    serving: "Save 20%",
    rating: "4.9",
    reviews: "412 reviews",
    tagline: "Whey + Multivitamin + Magnesium",
    chip: "Save 20%",
    category: "Bundles",
    height: 410,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Gift Card",
    size: "$50 / $100 / $150",
    price: "$50.00",
    serving: "Delivered instantly",
    rating: "4.9",
    reviews: "87 reviews",
    tagline: "Delivered instantly",
    chip: "Gift-ready",
    category: "Sale",
    height: 270,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=900&q=85&auto=format&fit=crop",
  },
];

const categories = ["All", "Protein", "Pre-Workout", "Vitamins", "Bundles", "Sale"];

const reviews = [
  {
    initials: "SM",
    name: "Sarah M.",
    product: "Whey Isolate",
    quote:
      "Tastes like nothing, which is exactly what I want. Mixes clean, no bloating, and my recovery is noticeably faster. Subscribed monthly.",
  },
  {
    initials: "JK",
    name: "James K.",
    product: "Pump Pre-Workout",
    quote:
      "I've tried 8 pre-workouts. This is the first one that doesn't make me crash. Clean energy for 90 minutes, no jitters. Worth every dollar.",
  },
  {
    initials: "PR",
    name: "Priya R.",
    product: "Daily Multivitamin",
    quote:
      "Took a blood test before and 6 months after. My D and B12 levels are now in range for the first time in years. Whole-food sourced matters.",
  },
];

const trustCards = [
  {
    title: "NSF Certified for Sport",
    text: "Independently tested for banned substances.",
  },
  {
    title: "Third-Party Lab Tested",
    text: "Every batch tested for purity and potency.",
  },
  {
    title: "60-Day Money-Back Guarantee",
    text: "Don't love it? Full refund, no questions.",
  },
];

const faqs = [
  {
    question: "How do Subscribe & Save orders work?",
    answer:
      "Choose Subscribe & Save on eligible products and get 15% off each recurring shipment. You can skip, swap, pause, or cancel from your account before the next billing date.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders placed before 1PM Pacific usually ship the same business day from our Oregon warehouse. Standard delivery is typically 2-5 business days in the continental US.",
  },
  {
    question: "Are these safe if I'm pregnant or nursing?",
    answer:
      "Please ask your physician before using supplements while pregnant or nursing. We publish full ingredient panels so your clinician can review dosage, allergens, and interactions.",
  },
  {
    question: "What's your return policy?",
    answer:
      "You have 60 days to try Vitality Nutrition. If a product is not a fit, contact support and we will refund your order, even if the bag or bottle is open.",
  },
];

function LeafIcon({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M25 5C16.2 5.5 8.1 9.6 5 18.7C10.9 20.8 20.9 19.4 25 5Z" fill={color} opacity="0.18" />
      <path d="M24.2 5.8C16.3 8.3 10.4 13.1 6 22.8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 17.5C11.8 17.7 15.8 17.8 19.2 15.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Stars({ rating, color }: { rating: string; color: string }) {
  const muted = Number(rating) < 4.8;
  return (
    <span aria-label={`${rating} out of 5 stars`} style={{ color, letterSpacing: 1 }}>
      ★★★★<span style={{ color: muted ? "rgba(148, 163, 184, 0.68)" : color }}>★</span>
    </span>
  );
}

export default function EcommercePage({
  prospect = DEFAULT_ECOMMERCE_PROSPECT,
}: {
  prospect?: ProspectData;
}) {
  const shop = { ...DEFAULT_ECOMMERCE_PROSPECT, ...prospect };
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [activeCategory, setActiveCategory] = useState("All");
  const [subscribe, setSubscribe] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [cartCount, setCartCount] = useState(2);

  useEffect(() => {
    const stored = window.localStorage.getItem("vitality-nutrition-theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll(".scroll-animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || reduceMotion) {
            entry.target.classList.add("scroll-animated");
          } else {
            entry.target.classList.remove("scroll-animated");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [mounted, activeCategory]);

  const colors = themeColors[theme];
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const visibleProducts = useMemo(
    () => (activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)),
    [activeCategory],
  );

  const toggleTheme = () => {
    setTheme(oppositeTheme);
    window.localStorage.setItem("vitality-nutrition-theme", oppositeTheme);
  };

  if (!mounted) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: themeColors.light.page,
          color: themeColors.light.text,
          fontFamily: dmSans.style.fontFamily,
        }}
      >
        Loading Vitality Nutrition...
      </main>
    );
  }

  return (
    <main
      data-theme={theme}
      style={{
        minHeight: "100vh",
        color: colors.text,
        background: `${colors.overlay}, url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920&q=85&auto=format&fit=crop') center/cover fixed no-repeat, ${colors.page}`,
        fontFamily: dmSans.style.fontFamily,
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        /* Hallmark · macrostructure: Visual Catalogue (Pinterest masonry) · tone: friendly-editorial
         * theme: Botanical Cream · accent: Emerald #059669 (light) / #10b981 (dark) · mono: JetBrains Mono
         * display: Fraunces (serif, soft & modern) · body: DM Sans
         * differs from insurance: serif display (was IBM Plex) · 16-24px radius (was 0px) · soft shadows ·
         *   botanical bg (was Miami blue) · Pinterest masonry grid (was rate table) · leaf particles
         *   (was shield outlines) · FAQ accordion (was 4 numbered process steps)
         */
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${colors.accentSoft}; color: ${colors.text}; }
        .ecom-shell a { color: inherit; }
        .ecom-section { position: relative; z-index: 2; max-width: 1180px; margin: 0 auto; padding: 4.5rem 1.5rem; }
        .ecom-eyebrow { font-family: ${jetBrains.style.fontFamily}; font-size: 0.72rem; letter-spacing: 0.32px; text-transform: uppercase; color: ${colors.accent}; font-weight: 600; }
        .display { font-family: ${fraunces.style.fontFamily}; letter-spacing: 0; }
        .soft-card { background: ${colors.card}; border: 1px solid ${colors.border}; border-radius: 22px; box-shadow: ${colors.shadow}; backdrop-filter: blur(18px); }
        .primary-btn, .cart-btn, .bundle-btn { position: relative; overflow: hidden; border: 0; border-radius: 999px; background: ${colors.accent}; color: white; cursor: pointer; font-family: ${dmSans.style.fontFamily}; font-weight: 700; transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease; box-shadow: 0 10px 24px ${colors.accentGlow}; }
        .primary-btn::after, .cart-btn::after, .bundle-btn::after { content: ""; position: absolute; inset: 0; transform: translateX(-120%) skewX(-18deg); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent); transition: transform 520ms ease; }
        .primary-btn:hover, .cart-btn:hover, .bundle-btn:hover { transform: translateY(-2px); background: ${colors.accentDeep}; box-shadow: 0 14px 30px ${colors.accentGlow}; }
        .primary-btn:hover::after, .cart-btn:hover::after, .bundle-btn:hover::after { transform: translateX(120%) skewX(-18deg); }
        .bundle-btn { animation: bundlePulse 2s ease-in-out infinite; }
        @keyframes bundlePulse { 0%, 100% { box-shadow: 0 10px 24px ${colors.accentGlow}; } 50% { box-shadow: 0 12px 34px ${colors.accentGlow}; } }
        .category-pill { border: 1px solid ${colors.border}; border-radius: 999px; background: ${colors.card}; color: ${colors.text}; cursor: pointer; font-family: ${dmSans.style.fontFamily}; font-size: 0.9rem; font-weight: 700; padding: 0.72rem 1.15rem; transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease; }
        .category-pill:hover, .category-pill.active { transform: translateY(-2px); background: ${colors.accent}; color: white; border-color: ${colors.accent}; }
        .nav-link { position: relative; text-decoration: none; color: ${colors.muted}; font-weight: 700; font-size: 0.88rem; transition: color 180ms ease; }
        .nav-link::after, .footer-link::after { content: ""; position: absolute; left: 0; bottom: -5px; width: 100%; height: 2px; transform: scaleX(0); transform-origin: left; background: ${colors.accent}; transition: transform 180ms ease; }
        .nav-link:hover { color: ${colors.accent}; }
        .nav-link:hover::after, .footer-link:hover::after { transform: scaleX(1); }
        .leaf-field { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
        .leaf-particle { position: absolute; bottom: -42px; width: 22px; height: 14px; border-radius: 90% 10% 90% 10%; background: ${colors.accent}; opacity: 0.14; transform: rotate(-28deg); animation: leafRise linear infinite; }
        .leaf-particle::after { content: ""; position: absolute; left: 6px; top: 6px; width: 14px; height: 1px; background: rgba(255,255,255,0.52); transform: rotate(-18deg); }
        @keyframes leafRise {
          0% { transform: translate3d(0, 0, 0) rotate(-28deg); opacity: 0; }
          12% { opacity: 0.14; }
          52% { transform: translate3d(24px, -50vh, 0) rotate(18deg); opacity: 0.12; }
          100% { transform: translate3d(-18px, -108vh, 0) rotate(68deg); opacity: 0; }
        }
        .scroll-animate { opacity: 0; transform: translateY(36px) scale(0.96); transition: opacity 620ms ease, transform 620ms cubic-bezier(.2,.8,.2,1); transition-delay: var(--stagger, 0ms); }
        .scroll-animate.scroll-animated { opacity: 1; transform: translateY(0) scale(1); }
        .masonry { column-count: 3; column-gap: 1.35rem; }
        .product-card { display: inline-block; width: 100%; margin: 0 0 1.35rem; break-inside: avoid; border-radius: 24px; overflow: hidden; background: ${colors.cardSolid}; border: 1px solid ${colors.border}; box-shadow: ${colors.shadow}; transition: transform 220ms ease, box-shadow 220ms ease; }
        .product-card:hover { transform: translateY(-6px); box-shadow: ${colors.shadowStrong}; }
        .product-media { position: relative; overflow: hidden; border-radius: 22px 22px 0 0; background: ${colors.accentSoft}; }
        .product-media img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 420ms ease; }
        .product-card:hover .product-media img { transform: scale(1.04); }
        .product-chip { position: absolute; top: 1rem; left: 1rem; border-radius: 999px; background: rgba(${colors.pageRgb}, 0.88); color: ${colors.accentDeep}; border: 1px solid ${colors.border}; padding: 0.38rem 0.72rem; font-size: 0.72rem; font-weight: 800; backdrop-filter: blur(10px); }
        .cart-btn { width: 100%; height: 36px; transform: translateY(8px); opacity: 0.92; }
        .product-card:hover .cart-btn { transform: translateY(0) scale(1.01); opacity: 1; background: ${colors.accentDeep}; }
        .review-card, .trust-card, .faq-item { transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease; }
        .review-card:hover, .trust-card:hover { transform: translateY(-4px); box-shadow: ${colors.shadowStrong}; }
        .faq-item { position: relative; overflow: hidden; background: ${colors.cardSolid}; }
        .faq-item::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: ${colors.accent}; transition: width 180ms ease; }
        .faq-item:hover::before, .faq-item.open::before { width: 4px; }
        .faq-item:hover { background: ${colors.panel}; }
        .faq-answer { max-height: 0; overflow: hidden; transition: max-height 240ms ease, opacity 200ms ease, padding 200ms ease; opacity: 0; }
        .faq-item.open .faq-answer { max-height: 180px; opacity: 1; padding-top: 0.8rem; }
        .chevron { transition: transform 200ms ease; }
        .faq-item.open .chevron { transform: rotate(180deg); }
        .subscribe-toggle { width: 58px; height: 32px; border-radius: 999px; border: 1px solid ${colors.border}; background: ${subscribe ? colors.accent : colors.cardSolid}; padding: 3px; cursor: pointer; transition: background 180ms ease, border-color 180ms ease; }
        .subscribe-toggle span { display: block; width: 24px; height: 24px; border-radius: 50%; background: white; transform: translateX(${subscribe ? "26px" : "0"}); transition: transform 180ms ease; box-shadow: 0 4px 12px rgba(0,0,0,0.16); }
        .footer-link { position: relative; display: block; width: fit-content; color: #c6c6c6; text-decoration: none; margin: 0.68rem 0; font-size: 0.92rem; transition: color 180ms ease; }
        .footer-link:hover, .social-link:hover { color: ${colors.accent}; }
        .social-link { color: #c6c6c6; transition: color 180ms ease, transform 180ms ease; }
        .social-link:hover { transform: translateY(-2px); }
        @media (max-width: 920px) {
          .hero-grid, .bundle-grid, .reviews-grid, .trust-grid, .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .masonry { column-count: 2; }
          .nav-links { display: none !important; }
        }
        @media (max-width: 640px) {
          .ecom-section { padding: 3.25rem 1rem; }
          .hero-grid, .bundle-grid, .reviews-grid, .trust-grid, .footer-grid { grid-template-columns: 1fr !important; }
          .masonry { column-count: 1; }
          .hero-actions, .filter-strip { align-items: stretch !important; flex-direction: column; }
          .hero-actions a, .hero-actions button, .filter-strip button { width: 100%; }
          .desktop-phone { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 1ms !important; transition-delay: 0ms !important; }
        }
      `}</style>

      <div className="ecom-shell">
        <div aria-hidden="true" className="leaf-field">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              className="leaf-particle"
              key={index}
              style={{
                left: `${(index * 67) % 100}%`,
                width: `${16 + (index % 4) * 4}px`,
                height: `${11 + (index % 3) * 3}px`,
                animationDuration: `${16 + (index % 7)}s`,
                animationDelay: `${(index * 1.18).toFixed(2)}s`,
              }}
            />
          ))}
        </div>

        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: colors.nav,
            borderBottom: `1px solid ${colors.border}`,
            backdropFilter: "blur(18px)",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "0 1.5rem",
              height: 74,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: colors.accent,
                  display: "grid",
                  placeItems: "center",
                  boxShadow: `0 10px 22px ${colors.accentGlow}`,
                }}
              >
                <LeafIcon color="white" />
              </span>
              <span>
                <span className="display" style={{ display: "block", fontSize: "1.28rem", fontWeight: 700, lineHeight: 1 }}>
                  {shop.name}
                </span>
                <span style={{ display: "block", color: colors.muted, fontSize: "0.78rem", marginTop: 3 }}>
                  Fuel Your Best Self.
                </span>
              </span>
            </a>

            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "1.55rem" }}>
              {["Shop", "Bundles", "Reviews", "Quiz"].map((link) => (
                <a className="nav-link" href={`#${link.toLowerCase()}`} key={link}>
                  {link}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <a
                className="desktop-phone"
                href={shop.phoneHref}
                style={{ color: colors.muted, textDecoration: "none", fontSize: "0.86rem", fontWeight: 700 }}
              >
                {shop.phone}
              </a>
              <button
                type="button"
                aria-label="Cart"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: `1px solid ${colors.border}`,
                  background: colors.card,
                  color: colors.text,
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 7h14l-1.5 8.5H7.2L6 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M6 7 5.4 4H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8.4 20.2a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2ZM17.2 20.2a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: colors.accent,
                    color: "white",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {cartCount}
                </span>
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                style={{
                  border: `1px solid ${colors.border}`,
                  background: colors.card,
                  color: colors.text,
                  borderRadius: 999,
                  padding: "0.7rem 0.9rem",
                  cursor: "pointer",
                  fontFamily: dmSans.style.fontFamily,
                  fontWeight: 800,
                }}
              >
                {theme === "light" ? "Dark" : "Light"}
              </button>
            </div>
          </div>
        </nav>

        <section className="ecom-section" style={{ paddingTop: "5.5rem" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: "2rem", alignItems: "center" }}>
            <div className="scroll-animate" style={{ "--stagger": "0ms" } as React.CSSProperties}>
              <div className="ecom-eyebrow">Portland lab-tested supplements</div>
              <h1
                className="display"
                style={{
                  margin: "0.8rem 0 1rem",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  lineHeight: 0.92,
                  maxWidth: 680,
                }}
              >
                Clean ingredients. Real results.
              </h1>
              <p style={{ color: colors.muted, fontSize: "1.12rem", lineHeight: 1.75, maxWidth: 570, margin: "0 0 1.7rem" }}>
                Science-backed protein, vitamins, and performance stacks made with clean ingredients. Free shipping over $50 and a 60-day money-back guarantee.
              </p>
              <div className="hero-actions" style={{ display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" }}>
                <a
                  className="primary-btn"
                  href="#shop"
                  style={{
                    display: "inline-flex",
                    minHeight: 48,
                    padding: "0 1.35rem",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  Shop Whey Protein →
                </a>
                <button
                  type="button"
                  className="category-pill"
                  onClick={() => setSubscribe((current) => !current)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem" }}
                >
                  <span>Subscribe & Save</span>
                  <span aria-hidden="true" className="subscribe-toggle">
                    <span />
                  </span>
                </button>
              </div>
            </div>

            <div className="soft-card scroll-animate" style={{ padding: "1rem", "--stagger": "80ms" } as React.CSSProperties}>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 510, background: colors.accentSoft }}>
                <img
                  src="https://images.unsplash.com/photo-1622480916113-9000ac49b79d?w=1000&q=90&auto=format&fit=crop"
                  alt="Featured Vitality Nutrition protein supplement"
                  style={{ width: "100%", height: 510, objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "auto 1rem 1rem 1rem",
                    borderRadius: 20,
                    padding: "1.15rem",
                    background: `rgba(${colors.pageRgb}, 0.9)`,
                    border: `1px solid ${colors.border}`,
                    backdropFilter: "blur(16px)",
                    color: colors.text,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "start" }}>
                    <div>
                      <div className="display" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                        Grass-Fed Whey Isolate
                      </div>
                      <div style={{ color: colors.muted, fontSize: "0.94rem", marginTop: 4 }}>25g protein · 5lb bag · NSF certified</div>
                    </div>
                    <div className="display" style={{ color: colors.accentDeep, fontSize: "1.35rem", fontWeight: 800 }}>
                      $54.99
                    </div>
                  </div>
                  <div style={{ marginTop: "0.9rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "0.88rem", color: colors.muted }}>
                      <Stars rating="4.9" color={colors.accent} /> <strong style={{ color: colors.text }}>4.9</strong> · 2,847 reviews
                    </div>
                    <button type="button" className="primary-btn" onClick={() => setCartCount((count) => count + 1)} style={{ minHeight: 42, padding: "0 1rem" }}>
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="ecom-section" style={{ paddingTop: "2rem" }}>
          <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
            <div className="scroll-animate" style={{ "--stagger": "0ms" } as React.CSSProperties}>
              <div className="ecom-eyebrow">Shop the catalogue</div>
              <h2 className="display" style={{ margin: "0.5rem 0 0", fontSize: "clamp(2.1rem, 4vw, 3.4rem)", lineHeight: 1 }}>
                Your daily stack, image-first.
              </h2>
            </div>
            <div className="filter-strip scroll-animate" style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", "--stagger": "80ms" } as React.CSSProperties}>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`category-pill ${activeCategory === category ? "active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="masonry">
            {visibleProducts.map((product, index) => (
              <article
                key={product.name}
                className="product-card scroll-animate"
                style={{ "--stagger": `${50 + (index % 10) * 42}ms` } as React.CSSProperties}
              >
                <div className="product-media" style={{ height: product.height }}>
                  <img src={product.image} alt={`${product.name} supplement product`} />
                  <span className="product-chip">{product.chip}</span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "0.8rem" }}>
                    <div>
                      <div className="display" style={{ fontSize: "1.12rem", fontWeight: 700, lineHeight: 1.18 }}>
                        {product.name}
                      </div>
                      <div style={{ color: colors.muted, fontSize: "0.85rem", marginTop: 5 }}>{product.size}</div>
                    </div>
                    <div className="display" style={{ color: colors.accentDeep, fontSize: "1.13rem", fontWeight: 800, whiteSpace: "nowrap" }}>
                      {product.price}
                    </div>
                  </div>
                  <div style={{ color: colors.muted, fontSize: "0.86rem", marginTop: "0.82rem" }}>{product.tagline}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem", marginTop: "0.8rem", alignItems: "center" }}>
                    <div style={{ fontSize: "0.78rem", color: colors.muted }}>
                      <Stars rating={product.rating} color={colors.accent} /> {product.rating} · {product.reviews}
                    </div>
                    <span style={{ color: colors.subtle, fontSize: "0.76rem", whiteSpace: "nowrap" }}>{product.serving}</span>
                  </div>
                  <button type="button" className="cart-btn" onClick={() => setCartCount((count) => count + 1)} style={{ marginTop: "0.9rem" }}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="bundles" className="ecom-section">
          <div
            className="soft-card scroll-animate"
            style={{
              "--stagger": "0ms",
              position: "relative",
              overflow: "hidden",
              padding: "clamp(1.1rem, 4vw, 2rem)",
              background: `linear-gradient(15deg, ${colors.accentSoft}, rgba(${colors.pageRgb}, 0.96) 54%, ${colors.cardSolid})`,
            } as React.CSSProperties}
          >
            <span
              style={{
                position: "absolute",
                top: "1.2rem",
                right: "1.2rem",
                zIndex: 2,
                borderRadius: 999,
                background: colors.accent,
                color: "white",
                padding: "0.42rem 0.82rem",
                fontSize: "0.78rem",
                fontWeight: 800,
              }}
            >
              15% OFF
            </span>
            <div className="bundle-grid" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: "2rem", alignItems: "center" }}>
              <div style={{ minHeight: 360, position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=720&q=85&auto=format&fit=crop"
                  alt="Protein powder bundle product"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 20,
                    width: "62%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 24,
                    boxShadow: colors.shadowStrong,
                    border: `1px solid ${colors.border}`,
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=720&q=85&auto=format&fit=crop"
                  alt="Daily multivitamin bundle product"
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: "58%",
                    height: 270,
                    objectFit: "cover",
                    borderRadius: 24,
                    boxShadow: colors.shadowStrong,
                    border: `1px solid ${colors.border}`,
                  }}
                />
              </div>
              <div>
                <div className="ecom-eyebrow">Bundle builder</div>
                <h2 className="display" style={{ margin: "0.55rem 0 0.9rem", fontSize: "clamp(2.3rem, 4.5vw, 3.9rem)", lineHeight: 0.98 }}>
                  Build Your Bundle
                </h2>
                <p style={{ color: colors.muted, fontSize: "1.05rem", lineHeight: 1.72, maxWidth: 520 }}>
                  Save 15% when you bundle 3+ products. Free shipping on every bundle, plus serving-size guidance for your training, sleep, and daily RDA goals.
                </p>
                <button type="button" className="bundle-btn" onClick={() => setCartCount((count) => count + 3)} style={{ minHeight: 48, padding: "0 1.35rem", marginTop: "0.7rem" }}>
                  Build your stack →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="ecom-section">
          <div className="scroll-animate" style={{ textAlign: "center", marginBottom: "1.7rem", "--stagger": "0ms" } as React.CSSProperties}>
            <div className="ecom-eyebrow">Sample reviews</div>
            <h2 className="display" style={{ margin: "0.5rem 0 0", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              What buyers say after checkout.
            </h2>
          </div>
          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.1rem" }}>
            {reviews.map((review, index) => (
              <article
                key={review.name}
                className="review-card soft-card scroll-animate"
                style={{ padding: "1.25rem", "--stagger": `${80 + index * 70}ms` } as React.CSSProperties}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: colors.accent,
                        color: "white",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                      }}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800 }}>{review.name}</div>
                      <div style={{ color: colors.muted, fontSize: "0.82rem" }}>{review.product}</div>
                    </div>
                  </div>
                  <span style={{ borderRadius: 999, background: colors.accentSoft, color: colors.accentDeep, padding: "0.3rem 0.55rem", fontSize: "0.72rem", fontWeight: 800 }}>
                    Verified Buyer
                  </span>
                </div>
                <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                  <Stars rating="4.9" color={colors.accent} />
                </div>
                <blockquote
                  className="display"
                  style={{
                    margin: "0.9rem 0 0",
                    fontSize: "1.02rem",
                    fontStyle: "italic",
                    lineHeight: 1.56,
                    color: colors.text,
                  }}
                >
                  "{review.quote}"
                </blockquote>
              </article>
            ))}
          </div>
        </section>

        <section className="ecom-section">
          <div style={{ background: colors.panel, borderRadius: 24, border: `1px solid ${colors.border}`, padding: "1.25rem", boxShadow: colors.shadow }}>
            <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {trustCards.map((card, index) => (
                <article
                  key={card.title}
                  className="trust-card scroll-animate"
                  style={{
                    "--stagger": `${70 + index * 70}ms`,
                    borderRadius: 20,
                    background: colors.cardSolid,
                    border: `1px solid ${colors.border}`,
                    padding: "1.15rem",
                    boxShadow: colors.shadow,
                  } as React.CSSProperties}
                >
                  <LeafIcon color={colors.accent} />
                  <h3 className="display" style={{ margin: "0.6rem 0 0.35rem", fontSize: "1.15rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ color: colors.muted, margin: 0, lineHeight: 1.55, fontSize: "0.95rem" }}>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quiz" className="ecom-section">
          <div
            className="soft-card scroll-animate"
            style={{
              "--stagger": "0ms",
              maxWidth: 820,
              margin: "0 auto",
              padding: "1.25rem",
              borderColor: colors.accent,
              background: `rgba(${colors.pageRgb}, 0.94)`,
            } as React.CSSProperties}
          >
            <div className="ecom-eyebrow">AI Supplement Quiz</div>
            <h2 className="display" style={{ margin: "0.45rem 0 1rem", fontSize: "1.65rem" }}>
              Find your stack in 60 seconds.
            </h2>
            <div style={{ display: "grid", gap: "0.72rem" }}>
              {[
                ["User", "I'm 35, lift 4x/week, sleep poorly. What should I take?"],
                ["AI", "For your goals: Whey Isolate (recovery) + Magnesium Glycinate (sleep) + Creatine (strength). Want me to build a 3-pack bundle — saves you 15%?"],
                ["User", "Yes, build it."],
                ["AI", "Done. Founders Bundle added to your cart. 3 products, $119.99, free shipping. Want to keep shopping or checkout?"],
              ].map(([role, message], index) => (
                <div
                  key={`${role}-${index}`}
                  style={{
                    justifySelf: role === "User" ? "end" : "start",
                    maxWidth: "88%",
                    borderRadius: role === "User" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: role === "User" ? colors.accent : colors.cardSolid,
                    color: role === "User" ? "white" : colors.text,
                    border: role === "User" ? "0" : `1px solid ${colors.border}`,
                    padding: "0.82rem 0.95rem",
                    boxShadow: colors.shadow,
                  }}
                >
                  <div style={{ fontFamily: jetBrains.style.fontFamily, fontSize: "0.68rem", letterSpacing: 0.32, opacity: 0.78, marginBottom: 4 }}>{role}</div>
                  <div style={{ lineHeight: 1.52, fontSize: "0.94rem" }}>{message}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ecom-section" style={{ paddingTop: "2.5rem" }}>
          <div className="scroll-animate" style={{ marginBottom: "1.2rem", "--stagger": "0ms" } as React.CSSProperties}>
            <div className="ecom-eyebrow">FAQ</div>
            <h2 className="display" style={{ margin: "0.45rem 0 0", fontSize: "clamp(2rem, 4vw, 3.1rem)" }}>
              Orders, subscriptions, returns.
            </h2>
          </div>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {faqs.map((faq, index) => (
              <article
                key={faq.question}
                className={`faq-item soft-card scroll-animate ${openFaq === index ? "open" : ""}`}
                style={{ "--stagger": `${60 + index * 65}ms` } as React.CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                  style={{
                    width: "100%",
                    border: 0,
                    background: "transparent",
                    color: colors.text,
                    textAlign: "left",
                    padding: "1.05rem 1.1rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "center",
                    fontFamily: fraunces.style.fontFamily,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {faq.question}
                  <svg className="chevron" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="m6 9 6 6 6-6" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <p style={{ color: colors.muted, padding: "0 1.1rem 1.1rem", margin: 0, lineHeight: 1.7, fontSize: "0.96rem" }}>{faq.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer style={{ position: "relative", zIndex: 2, background: "#0d1f17", color: "#f6fff9", padding: "3.4rem 1.5rem 1.4rem" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr repeat(4, 1fr)", gap: "2rem" }}>
              <div>
                <div className="display" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {shop.name}
                </div>
                <p style={{ color: "#c6c6c6", lineHeight: 1.65, maxWidth: 260 }}>Fuel Your Best Self. Science-backed supplements made in Portland, OR.</p>
                <div style={{ display: "flex", gap: "0.95rem", marginTop: "1.1rem" }}>
                  {["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4h-4V7a1 1 0 0 1 1-1h3V2Z", "M12 2v13.5a3.5 3.5 0 1 1-3.5-3.5", "M21 8.5s-.2-1.4-.8-2a2.9 2.9 0 0 0-2-.8C15.4 5.5 12 5.5 12 5.5s-3.4 0-6.2.2a2.9 2.9 0 0 0-2 .8c-.6.6-.8 2-.8 2S2.8 10.1 2.8 11.8v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2a2.9 2.9 0 0 0 2 .8c2.8.2 6.2.2 6.2.2s3.4 0 6.2-.2a2.9 2.9 0 0 0 2-.8c.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.4c0-1.7-.2-3.3-.2-3.3Z", "M4 4l16 16M20 4 4 20"].map((path, index) => (
                    <a className="social-link" href="#" aria-label={["Instagram", "TikTok", "YouTube", "X"][index]} key={path}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              {[
                ["Shop", "Protein", "Pre-Workout", "Vitamins", "Bundles", "Sale"],
                ["Learn", "Science", "Blog", "Quiz", "FAQ"],
                ["Company", "About", "Sustainability", "Careers", "Press"],
                ["Support", "Contact", "Shipping", "Returns", "Track Order"],
              ].map(([heading, ...links]) => (
                <div key={heading}>
                  <h3 className="display" style={{ margin: "0 0 0.8rem", fontSize: "1rem" }}>{heading}</h3>
                  {links.map((link) => (
                    <a href="#" className="footer-link" key={link}>
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "1.2rem",
                borderTop: "1px solid rgba(198,198,198,0.18)",
                color: "#c6c6c6",
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                fontSize: "0.9rem",
              }}
            >
              <span>© 2026 {shop.name} · Made in {shop.city}, {shop.state} · NSF Certified</span>
              <span>{shop.email} · {shop.address}</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
