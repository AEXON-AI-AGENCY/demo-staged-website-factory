"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "./page.module.css";

type ThemeMode = "dark" | "light";

/* ─── Drop data (concrete product labels — no fabricated metrics) ─────────── */
const drops = [
  {
    code: "DROP 03 / NO. 014",
    title: "Concrete Hoodie",
    silhouette: "hoodie",
    desc: "500 GSM heavyweight French terry. Boxed silhouette, raw-edge kangaroo patch, and an acid-yellow bar-tack on the left seam.",
    price: "$148",
    sizes: "XS – XXL",
    badge: "Limited 200",
    tag: "FW26",
  },
  {
    code: "DROP 03 / NO. 015",
    title: "Volt Utility Jacket",
    silhouette: "jacket",
    desc: "Recycled nylon ripstop with welded seams, three cargo pockets, and a fold-away storm hood. Taped inside placket.",
    price: "$245",
    sizes: "S – XL",
    badge: "Almost gone",
    tag: "FW26",
  },
  {
    code: "DROP 03 / NO. 016",
    title: "Asphalt Graphic Tee",
    silhouette: "tee",
    desc: "Garment-dyed 240 GSM cotton tee. Wheatpaste-printed front graphic, ribbed collar, double-stitched hem.",
    price: "$62",
    sizes: "XS – XXL",
    badge: "Restocked",
    tag: "FW26",
  },
  {
    code: "DROP 03 / NO. 017",
    title: "Cargo Wide Pant",
    silhouette: "pant",
    desc: "Brushed twill with gusseted crotch, six-pocket cargo layout, and an articulated knee. Drawstring hem.",
    price: "$178",
    sizes: "28 – 38",
    badge: "New in",
    tag: "FW26",
  },
];

const trustBadges = [
  { label: "Capsule Runs", sub: "≤ 250 units" },
  { label: "NYC Stockists", sub: "Pickup only" },
  { label: "Free Size Swap", sub: "14 days" },
  { label: "Drop Alerts", sub: "48h notice" },
  { label: "Secure Checkout", sub: "Stripe 3DS" },
  { label: "Creator Inquiries", sub: "Wholesale / collab" },
];

const chat = [
  {
    role: "user",
    text: "Yo, I want the Concrete Hoodie but I'm between L and XL. I run relaxed, usually a size up. Restock?",
  },
  {
    role: "ai",
    text: "L is back at the warehouse, XL is sold out. Based on a relaxed fit and the hoodie running slightly boxy, I'd lock L now and add you to the XL restock alert — we're cutting 60 more next Friday. Want me to drop a 48-hour heads-up when they're live?",
  },
  {
    role: "user",
    text: "Yeah do that. Also is the Volt Utility Jacket true to size or do I size down?",
  },
  {
    role: "ai",
    text: "True to size with room for a hoodie underneath. If you want a slimmer line, go down one. I'm holding an M in Volt for 30 minutes while you decide — just say the word.",
  },
  {
    role: "user",
    text: "Lock it. Add me to the drop list for FW27 too.",
  },
  {
    role: "ai",
    text: "Done. Concrete Hoodie L reserved, Volt Jacket M held, FW27 waitlist confirmed. Drop alert goes out Friday 10 AM EST. Check your email for the hold receipt.",
  },
];

const lookbook = [
  { label: "Look 01 — Concrete", num: "01" },
  { label: "Look 02 — Volt", num: "02" },
  { label: "Look 03 — Asphalt", num: "03" },
  { label: "Look 04 — Cargo", num: "04" },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  size: "",
  interest: "FW27 Waitlist",
  alert: "All drops",
  notes: "",
};

function Silhouette({ kind }: { kind: string }) {
  // Inline SVG product silhouettes — no external images, no emoji
  const stroke = "currentColor";
  const w = 120;
  const h = 140;
  const common = {
    width: w,
    height: h,
    viewBox: "0 0 120 140",
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "hoodie") {
    return (
      <svg {...common}>
        <path d="M40 22 C40 14 80 14 80 22 L92 30 L104 44 L94 56 L86 52 L86 124 C86 128 82 132 78 132 L42 132 C38 132 34 128 34 124 L34 52 L26 56 L16 44 L28 30 Z" />
        <path d="M52 22 C52 36 68 36 68 22" />
        <path d="M44 70 L76 70 L72 96 L48 96 Z" />
      </svg>
    );
  }
  if (kind === "jacket") {
    return (
      <svg {...common}>
        <path d="M38 24 L48 18 L60 22 L72 18 L82 24 L98 36 L104 50 L94 60 L86 56 L86 124 C86 128 82 132 78 132 L42 132 C38 132 34 128 34 124 L34 56 L26 60 L16 50 L22 36 Z" />
        <path d="M60 22 L60 80" />
        <rect x="40" y="86" width="14" height="14" />
        <rect x="66" y="86" width="14" height="14" />
      </svg>
    );
  }
  if (kind === "tee") {
    return (
      <svg {...common}>
        <path d="M40 24 L50 18 L60 22 L70 18 L80 24 L96 36 L102 50 L92 58 L84 54 L84 124 C84 128 80 132 76 132 L44 132 C40 132 36 128 36 124 L36 54 L28 58 L18 50 L24 36 Z" />
        <path d="M50 18 C50 30 70 30 70 18" />
        <rect x="44" y="62" width="32" height="38" />
      </svg>
    );
  }
  // pant
  return (
    <svg {...common}>
      <path d="M42 18 L78 18 L82 36 L78 132 L66 132 L60 60 L54 132 L42 132 L38 36 Z" />
      <line x1="42" y1="40" x2="78" y2="40" />
      <rect x="40" y="48" width="14" height="12" />
      <rect x="66" y="48" width="14" height="12" />
      <line x1="58" y1="22" x2="58" y2="36" />
    </svg>
  );
}

/* Generate a barcode-strip from a numeric string (deterministic widths). */
function BarcodeStrip({ value }: { value: string }) {
  const widths = value.split("").map((c, i) => {
    const code = c.charCodeAt(0);
    return 1 + ((code + i) % 4);
  });
  const bars: { w: number; gap: boolean }[] = [];
  widths.forEach((w, i) => {
    bars.push({ w, gap: false });
    if (i < widths.length - 1) bars.push({ w: 1, gap: true });
  });
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        gap: 0,
        height: "100%",
        alignItems: "stretch",
      }}
    >
      {bars.map((b, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: `${b.w}px`,
            background: b.gap ? "transparent" : "currentColor",
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}

export default function StreetwearPage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [chatDraft, setChatDraft] = useState("");

  useEffect(() => {
    // Bidirectional scroll reveal — class toggled on entry/exit, observer.disconnect() in cleanup.
    const targets = document.querySelectorAll<HTMLElement>(`.${styles.revealTarget}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          } else {
            entry.target.classList.remove(styles.isVisible);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const updateForm = <K extends keyof typeof initialForm>(
    key: K,
    value: (typeof initialForm)[K],
  ) => setForm((current) => ({ ...current, [key]: value }));

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const submitChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChatDraft("");
  };

  return (
    <main className={styles.page} data-theme={theme}>
      {/* ─── Nav ──────────────────────────────────────────────────────── */}
      <div className={styles.navWrap}>
        <div className={`${styles.shell} ${styles.nav}`}>
          <a className={styles.brand} href="#top" aria-label="NOIR Apparel home">
            <span className={styles.brandMark} aria-hidden="true">
              N
            </span>
            <span>NOIR Apparel</span>
          </a>
          <nav className={styles.navLinks} aria-label="NOIR Apparel sections">
            <a href="#drop">Drop</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#stylist">AI Stylist</a>
            <a href="#waitlist">Join Waitlist</a>
          </nav>
          <div className={styles.navActions}>
            <a className={styles.phone} href="tel:+171****0192">
              (718) 555-0192
            </a>
            <button
              className={styles.toggle}
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Hero: oversized drop poster + wheatpaste ──────────────────── */}
      <section className={styles.shell} id="top">
        <div className={styles.hero}>
          <div className={`${styles.heroCopy} ${styles.revealTarget}`}>
            <p className={styles.kicker}>
              <span className={styles.kickerDot} aria-hidden="true" />
              Drop 03 · FW26 · 48h notice
            </p>
            <h1 className={styles.heroHeadline}>
              The third drop
              <em>isn&apos;t a restock.</em>
            </h1>
            <p className={styles.heroLede}>
              Capsule runs cut in Brooklyn. No markdown, no reprint, no spam —
              just 4 pieces, 200 units each, and a waitlist that earns you first
              crack at the next one.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.primaryCta} href="#waitlist">
                Join Drop List
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a className={styles.secondaryCta} href="#stylist">
                Chat with our Stylist
              </a>
            </div>
          </div>

          <div className={`${styles.heroCopy} ${styles.revealTarget}`}>
            <div
              className={`${styles.heroPoster} ${styles.posterTilt}`}
              role="img"
              aria-label="Drop 03 wheatpaste poster — capsule preview"
            >
              <span className={styles.heroPosterCorner}>03</span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    margin: "0 0 10px",
                  }}
                >
                  No. 014 — 017 / FW26
                </p>
                <h2 className={styles.heroPosterTitle}>
                  Concrete
                  <em>&amp; volt.</em>
                </h2>
              </div>
              <div>
                <div className={styles.heroPosterMeta}>
                  <span>04 styles</span>
                  <span>200 ea.</span>
                  <span>NYC</span>
                </div>
                <div
                  style={{
                    color: "var(--tag-ink)",
                    marginTop: 8,
                  }}
                >
                  <BarcodeStrip value="NOIR-DROP-03-FW26" />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    margin: "6px 0 0",
                    color: "var(--tag-ink)",
                  }}
                >
                  N-03-FW26 · NO REPRINT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Always-visible marquee ticker ─────────────────────────────── */}
      <section aria-label="Drop 03 ticker">
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            <span>Drop 03 live</span>
            <span>FW26 capsule</span>
            <span>200 units per style</span>
            <span>NYC pickup</span>
            <span>No reprint</span>
            <span>Drop 04 — waitlist open</span>
            {/* duplicate set for seamless loop */}
            <span>Drop 03 live</span>
            <span>FW26 capsule</span>
            <span>200 units per style</span>
            <span>NYC pickup</span>
            <span>No reprint</span>
            <span>Drop 04 — waitlist open</span>
          </div>
        </div>
      </section>

      {/* ─── Drops / product cards (garment-tag feel) ──────────────────── */}
      <section className={styles.shell} id="drop">
        <div className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.revealTarget}`}>
            <h2>
              The drop <em>— four pieces.</em>
            </h2>
            <p className={styles.sectionMeta}>
              FW26 · capsule 03
              <br />
              ships from Brooklyn
            </p>
          </div>

          <div className={styles.dropGrid}>
            {drops.map((d) => (
              <article
                key={d.code}
                className={`${styles.dropCard} ${styles.stitchScan} ${styles.revealTarget}`}
              >
                <div className={styles.dropCardMedia}>
                  <span className={styles.dropCardBadge}>{d.badge}</span>
                  <span className={`${styles.dropCardTag} ${styles.tagSwing}`}>
                    {d.tag}
                  </span>
                  <div className={styles.dropCardSilhouette}>
                    <Silhouette kind={d.silhouette} />
                  </div>
                </div>
                <div className={styles.dropCardBody}>
                  <span className={styles.dropCardCode}>{d.code}</span>
                  <h3 className={styles.dropCardTitle}>{d.title}</h3>
                  <p className={styles.dropCardDesc}>{d.desc}</p>
                  <div className={styles.dropCardFoot}>
                    <span className={styles.dropCardPrice}>
                      <strong>{d.price}</strong>
                    </span>
                    <span className={styles.dropCardSizes}>{d.sizes}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lookbook film strip ───────────────────────────────────────── */}
      <section className={styles.shell} id="lookbook">
        <div className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.revealTarget}`}>
            <h2>
              Lookbook <em>— Drop 03.</em>
            </h2>
            <p className={styles.sectionMeta}>
              Shot on Super 8
              <br />
              Brooklyn · 04/2026
            </p>
          </div>

          <div className={`${styles.lookbook} ${styles.revealTarget}`}>
            {lookbook.map((l) => (
              <div className={styles.lookFrame} key={l.num}>
                <span className={styles.lookFrameNum}>{l.num}</span>
                <span className={styles.lookFrameLabel}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Stylist chat ───────────────────────────────────────────── */}
      <section className={styles.shell} id="stylist">
        <div className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.revealTarget}`}>
            <h2>
              AI Stylist <em>— fits, drops, swaps.</em>
            </h2>
            <p className={styles.sectionMeta}>
              Avg response 6s
              <br />
              Real-time waitlist capture
            </p>
          </div>

          <div className={`${styles.chatWrap} ${styles.revealTarget}`}>
            <div className={styles.chatIntro}>
              <h2>
                Ask the
                <br />
                <em>drop concierge.</em>
              </h2>
              <p>
                The NOIR stylist answers in plain streetwear — sizing runs,
                how the Concrete Hoodie shrinks after wash, when the Volt
                Jacket restocks, and where to grab it locally if you&apos;re in
                NYC.
              </p>
              <ul className={styles.chatCapabilityList}>
                <li>Size + fit recommendation</li>
                <li>Restock alerts and holds</li>
                <li>NYC stockist pickup routing</li>
                <li>Drop-list signup capture</li>
                <li>Wholesale / creator inquiries</li>
              </ul>
            </div>

            <div className={styles.chatPanel} aria-label="AI Stylist conversation">
              <header className={styles.chatHeader}>
                <div className={styles.chatHeaderTitle}>
                  <span className={styles.chatHeaderDot} aria-hidden="true" />
                  <span>NOIR Stylist</span>
                </div>
                <span className={styles.chatHeaderMeta}>Live · Drop 03</span>
              </header>
              <div className={styles.chatLog}>
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className={`${styles.chatMsg} ${
                      m.role === "user" ? styles.chatMsgUser : styles.chatMsgAi
                    }`}
                  >
                    <span className={styles.chatMsgRole}>
                      {m.role === "user" ? "You" : "Stylist"}
                    </span>
                    <div className={styles.chatBubble}>{m.text}</div>
                  </div>
                ))}
              </div>
              <form className={styles.chatForm} onSubmit={submitChat}>
                <input
                  className={styles.chatInput}
                  type="text"
                  placeholder="Ask about sizing, restocks, or the next drop…"
                  value={chatDraft}
                  onChange={(e) => setChatDraft(e.target.value)}
                  aria-label="Message the stylist"
                />
                <button className={styles.chatSend} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust / proof badges (garment care label feel) ────────────── */}
      <section className={styles.shell}>
        <div className={`${styles.section} ${styles.revealTarget}`}>
          <div className={styles.sectionHead}>
            <h2>
              What <em>comes standard.</em>
            </h2>
            <p className={styles.sectionMeta}>6 guarantees · every drop</p>
          </div>

          <div className={styles.trustWrap}>
            {trustBadges.map((b) => (
              <div className={styles.trustBadge} key={b.label}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2L3 7v6c0 5 4 9 9 11 5-2 9-6 9-11V7l-9-5z" />
                </svg>
                <span className={styles.trustBadgeLabel}>{b.label}</span>
                <span className={styles.trustBadgeSub}>{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Waitlist / contact form (drop-list signup sheet) ──────────── */}
      <section className={styles.shell} id="waitlist">
        <div className={styles.formSection}>
          <div className={`${styles.formWrap} ${styles.revealTarget}`}>
            <div className={styles.formIntro}>
              <span className={styles.formTag}>Drop Sheet · FW26/27</span>
              <h2>
                Get the next drop
                <br />
                <em>before the public.</em>
              </h2>
              <p>
                Fill the sheet below and you&apos;ll get a 48-hour heads-up on
                the next capsule — with first dibs on sizing, NYC pickup
                routing, and wholesale/creator routing if you run a label.
              </p>
              <p>
                Or reach the studio directly:{" "}
                <a
                  href="mailto:hello@noir-apparel.shop"
                  style={{ color: "var(--accent)" }}
                >
                  hello@noir-apparel.shop
                </a>{" "}
                · (718) 555-0192
              </p>
            </div>

            <form onSubmit={submitForm} aria-label="Drop waitlist form">
              <div className={styles.formGrid}>
                <label className={styles.formField}>
                  <span className={styles.formLabel}>Name</span>
                  <input
                    className={styles.formInput}
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Your name"
                  />
                </label>
                <label className={styles.formField}>
                  <span className={styles.formLabel}>Email</span>
                  <input
                    className={styles.formInput}
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="you@domain.com"
                  />
                </label>
                <label className={styles.formField}>
                  <span className={styles.formLabel}>Phone (optional)</span>
                  <input
                    className={styles.formInput}
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="(718) 555-…"
                  />
                </label>
                <label className={styles.formField}>
                  <span className={styles.formLabel}>Preferred size</span>
                  <select
                    className={styles.formSelect}
                    value={form.size}
                    onChange={(e) => updateForm("size", e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                    <option>28</option>
                    <option>30</option>
                    <option>32</option>
                    <option>34</option>
                    <option>36</option>
                    <option>38</option>
                  </select>
                </label>
                <label className={styles.formField}>
                  <span className={styles.formLabel}>Item interest</span>
                  <select
                    className={styles.formSelect}
                    value={form.interest}
                    onChange={(e) => updateForm("interest", e.target.value)}
                  >
                    <option>FW27 Waitlist</option>
                    <option>Concrete Hoodie (restock)</option>
                    <option>Volt Utility Jacket</option>
                    <option>Asphalt Graphic Tee</option>
                    <option>Cargo Wide Pant</option>
                    <option>Wholesale / stockist</option>
                    <option>Creator collab</option>
                  </select>
                </label>
                <label className={styles.formField}>
                  <span className={styles.formLabel}>Drop alert preference</span>
                  <select
                    className={styles.formSelect}
                    value={form.alert}
                    onChange={(e) => updateForm("alert", e.target.value)}
                  >
                    <option>All drops</option>
                    <option>FW27 only</option>
                    <option>Restock only</option>
                    <option>No alerts</option>
                  </select>
                </label>
                <label
                  className={`${styles.formField} ${styles.formFieldFull}`}
                >
                  <span className={styles.formLabel}>
                    Notes (fit questions, NYC pickup, etc.)
                  </span>
                  <textarea
                    className={styles.formTextarea}
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    placeholder="Optional — tell us what you're looking for."
                  />
                </label>
              </div>
              <button className={styles.formSubmit} type="submit">
                Submit drop sheet
              </button>
              {submitted && (
                <p className={styles.formStatus} role="status">
                  ✓ You&apos;re on the list. Drop alert hits your inbox 48h
                  before the public release.
                </p>
              )}
              <p className={styles.formLegal}>
                No spam · unsubscribe in one click · we never sell your email
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerInner}>
            <div>
              <p className={styles.footerBrand}>NOIR Apparel</p>
              <p className={styles.footerTag}>
                Brooklyn capsule streetwear. Limited runs, no reprint, no
                algorithm.
              </p>
              <div
                className={styles.footerBarcode}
                aria-hidden="true"
                style={{ color: "var(--ink)" }}
              >
                <BarcodeStrip value="NOIR-NYC-FW26-200" />
              </div>
            </div>
            <div className={styles.footerCol}>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="tel:+171****0192">(718) 555-0192</a>
                </li>
                <li>
                  <a href="mailto:hello@noir-apparel.shop">
                    hello@noir-apparel.shop
                  </a>
                </li>
                <li>1047 Wythe Ave, Brooklyn NY</li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Shop</h4>
              <ul>
                <li>
                  <a href="#drop">Drop 03</a>
                </li>
                <li>
                  <a href="#lookbook">Lookbook</a>
                </li>
                <li>
                  <a href="#stylist">AI Stylist</a>
                </li>
                <li>
                  <a href="#waitlist">Join Waitlist</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Wholesale</h4>
              <ul>
                <li>
                  <a href="mailto:wholesale@noir-apparel.shop">
                    wholesale@noir-apparel.shop
                  </a>
                </li>
                <li>NYC stockists: 4 doors</li>
                <li>Creator collab: open FW27</li>
              </ul>
              <a className={styles.footerCta} href="#waitlist">
                Apply for FW27
              </a>
            </div>
          </div>

          <div className={styles.footerLegal}>
            <span>© 2026 NOIR Apparel · Brooklyn NY</span>
            <span>Drop 03 · FW26 · No reprint</span>
            <span>Built by Aexon AI</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
