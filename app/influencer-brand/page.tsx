"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import styles from "./page.module.css";

type ThemeMode = "light" | "dark";

const products = [
  {
    sku: "MC / 01",
    name: "Dew Ledger Serum",
    use: "dullness + uneven tone",
    note: "Niacinamide, snow mushroom, and panthenol for a glassy finish without fragrance.",
    image: "/influencer-brand/serum-lab.jpg",
    alt: "Serum bottle and skincare texture on a lab-style surface",
  },
  {
    sku: "MC / 02",
    name: "Barrier Edit Cream",
    use: "dry barrier days",
    note: "Ceramide-rich cushion cream for nights after actives or weather swings.",
    image: "/influencer-brand/skincare-shelf.jpg",
    alt: "Minimal skincare bottles and cream jars on a shelf",
  },
  {
    sku: "MC / 03",
    name: "Soft Reset Cleanser",
    use: "AM cleanse + SPF melt",
    note: "Low-foam gel cleanse for sensitive skin questions that hit Maya's DMs every week.",
    image: "/influencer-brand/routine-mirror.jpg",
    alt: "Beauty routine scene near a bathroom mirror",
  },
  {
    sku: "MC / 04",
    name: "Cloud Mist SPF Prep",
    use: "day routine finish",
    note: "Mineral-blue hydration mist designed to layer before sunscreen and makeup.",
    image: "/influencer-brand/founder-vanity.jpg",
    alt: "Vanity table with skincare and beauty products",
  },
];

const chat = [
  { role: "Maya follower", text: "My cheeks get tight but my T-zone shines by lunch. I want the drop, but I don't know what to start with." },
  { role: "Routine AI", text: "Sounds combination-leaning with barrier sensitivity. Are you currently using vitamin C, retinoid, or exfoliating acids?" },
  { role: "Maya follower", text: "Retinoid two nights a week. Fragrance breaks me out." },
  { role: "Routine AI", text: "Start Soft Reset in the morning, Dew Ledger on non-retinoid nights, and Barrier Edit after retinoid. The formulas are fragrance-free. Want me to save this routine and text you when the bundle opens?" },
  { role: "Maya follower", text: "Yes. Email first, SMS for drop day only." },
  { role: "Routine AI", text: "Saved. You're on email education now and SMS only for the launch alert. I also tagged your profile as combination + fragrance-sensitive for support." },
];

const proof = [
  "Owned email/SMS list capture",
  "Ingredient transparency",
  "Routine quiz handoff",
  "Creator and retailer routing",
  "Secure checkout path",
  "Skin match guidance",
];

const reels = [
  { title: "AM sink note", label: "cleanse / mist / SPF", image: "/influencer-brand/routine-mirror.jpg" },
  { title: "Lab label pull", label: "niacinamide / panthenol", image: "/influencer-brand/serum-lab.jpg" },
  { title: "Shelf restock", label: "bundle education", image: "/influencer-brand/skincare-shelf.jpg" },
];

const initialForm = {
  name: "",
  contact: "",
  concern: "Barrier repair",
  interest: "Launch bundle",
  preference: "Email first",
  inquiry: "Customer waitlist",
  notes: "",
};

export default function InfluencerBrandPage() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={styles.page} data-theme={theme}>
      <div className={styles.reelRail} aria-hidden="true">
        {["routine", "barrier", "drop list", "skin match", "retailer"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <nav className={styles.nav} aria-label="Maya Cole Skincare">
        <a className={styles.brand} href="#top" aria-label="Maya Cole Skincare home">
          <span className={styles.brandMark}>MC</span>
          <span>Maya Cole Skincare</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#story">Story</a>
          <a href="#products">Products</a>
          <a href="#routine-ai">Routine AI</a>
          <a href="#join-list">Join List</a>
        </div>
        <button className={styles.toggle} type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </nav>

      <section id="top" className={`${styles.hero} ${styles.revealTarget}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Creator-led skincare, owned by the list</p>
          <h1>Maya turns routine questions into product education and launch demand.</h1>
          <p className={styles.lede}>
            A founder dispatch board for skincare drops, routine matching, and creator-native follow-up. Followers get clarity;
            Maya gets an owned audience beyond the bio link.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.primaryCta} href="#join-list">Join the Drop List</a>
            <a className={styles.secondaryCta} href="#routine-ai">Chat with our Routine AI</a>
          </div>
        </div>
        <div className={styles.heroBoard} aria-label="Founder and product dossier">
          <figure className={styles.founderCard}>
            <Image src="/influencer-brand/founder-vanity.jpg" alt="Founder vanity scene for Maya Cole Skincare" width={720} height={900} priority />
            <figcaption>founder note / drop desk</figcaption>
          </figure>
          <div className={styles.noteCard}>
            <span>DM pattern</span>
            <strong>fragrance-free, barrier-first, routine-literate</strong>
          </div>
          <div className={styles.labelSticker}>DROP EDUCATION HUB</div>
        </div>
      </section>

      <section id="story" className={`${styles.story} ${styles.revealTarget}`}>
        <div>
          <p className={styles.eyebrow}>Creator dossier</p>
          <h2>Not a Linktree. A brand room that remembers the question.</h2>
        </div>
        <p>
          The page folds Maya's product notes, skin-type routing, retail inquiries, and waitlist capture into one polished
          destination for social traffic.
        </p>
      </section>

      <section id="products" className={styles.productShelf} aria-label="Product routine cards">
        {products.map((product) => (
          <article className={`${styles.productCard} ${styles.revealTarget}`} key={product.sku}>
            <Image src={product.image} alt={product.alt} width={640} height={520} />
            <div>
              <span>{product.sku}</span>
              <h3>{product.name}</h3>
              <p className={styles.useLabel}>{product.use}</p>
              <p>{product.note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={`${styles.reels} ${styles.revealTarget}`} aria-label="Creator reel contact sheet">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Contact sheet</p>
          <h2>Routine content that can route the next click.</h2>
        </div>
        <div className={styles.reelGrid}>
          {reels.map((reel, index) => (
            <figure key={reel.title}>
              <Image src={reel.image} alt={`${reel.title} skincare reel frame`} width={420} height={620} />
              <figcaption><span>0{index + 1}</span>{reel.title}<small>{reel.label}</small></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="routine-ai" className={`${styles.aiPanel} ${styles.revealTarget}`}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Routine AI demo</p>
          <h2>Answers like a trained brand assistant, then captures the list.</h2>
        </div>
        <div className={styles.chatWindow}>
          {chat.map((message) => (
            <div className={message.role === "Routine AI" ? styles.aiMessage : styles.userMessage} key={message.text}>
              <span>{message.role}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.proofBand} ${styles.revealTarget}`} aria-label="Trust and proof badges">
        {proof.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="join-list" className={`${styles.waitlist} ${styles.revealTarget}`}>
        <div>
          <p className={styles.eyebrow}>Drop-list quiz</p>
          <h2>Route buyers, creators, and retailers without losing the skincare context.</h2>
          <p>
            Sample form flow for collecting contact preference, product interest, skin concern, and inquiry type in one readable panel.
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name<input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Maya Cole" /></label>
          <label>Email or phone<input value={form.contact} onChange={(event) => updateField("contact", event.target.value)} placeholder="maya@example.com" /></label>
          <label>Skin concern<select value={form.concern} onChange={(event) => updateField("concern", event.target.value)}><option>Barrier repair</option><option>Uneven tone</option><option>Dryness</option><option>Sensitive routine</option></select></label>
          <label>Product interest<select value={form.interest} onChange={(event) => updateField("interest", event.target.value)}><option>Launch bundle</option><option>Dew Ledger Serum</option><option>Barrier Edit Cream</option><option>Soft Reset Cleanser</option></select></label>
          <label>Alert preference<select value={form.preference} onChange={(event) => updateField("preference", event.target.value)}><option>Email first</option><option>SMS drop day only</option><option>Email and SMS</option></select></label>
          <label>Inquiry type<select value={form.inquiry} onChange={(event) => updateField("inquiry", event.target.value)}><option>Customer waitlist</option><option>Creator collaboration</option><option>Retailer inquiry</option></select></label>
          <label className={styles.full}>Notes<textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Tell us what your routine needs to avoid or solve." /></label>
          <button className={styles.submit} type="submit">{submitted ? "Routine Saved" : "Save My Routine + Alert"}</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <span>Maya Cole Skincare</span>
        <a href="mailto:hello@mayacoleskincare.example">hello@mayacoleskincare.example</a>
        <a href="tel:+15550141028">(555) 014-1028</a>
        <a href="#join-list">Join the next drop</a>
      </footer>
    </main>
  );
}
