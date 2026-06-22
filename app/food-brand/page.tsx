"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import styles from "./page.module.css";

type ThemeMode = "dark" | "light";

const sauces = [
  {
    name: "Ember Original",
    batch: "LOT EO-071",
    heat: "4/10",
    scoville: "18k SHU",
    image: "/food-brand/ember-original.jpg",
    notes: "fermented cayenne, apple cider vinegar, smoked garlic",
    pairing: "eggs, tacos, roasted potatoes",
    diet: "vegan / gluten-free / contains garlic",
  },
  {
    name: "Smoked Oak",
    batch: "LOT SO-044",
    heat: "6/10",
    scoville: "42k SHU",
    image: "/food-brand/smoked-oak.jpg",
    notes: "chipotle mash, charred onion, black lime",
    pairing: "wings, grilled meat, black bean chili",
    diet: "vegan / soy-free / no added sugar",
  },
  {
    name: "Mango Ghost",
    batch: "LOT MG-019",
    heat: "8/10",
    scoville: "128k SHU",
    image: "/food-brand/mango-ghost.jpg",
    notes: "mango, ghost pepper, ginger, toasted coriander",
    pairing: "fish tacos, fried chicken, mocktails",
    diet: "vegan / gluten-free / contains mango",
  },
  {
    name: "Verde Spark",
    batch: "LOT VS-233",
    heat: "3/10",
    scoville: "9k SHU",
    image: "/food-brand/verde-spark.jpg",
    notes: "jalapeno, tomatillo, pickle brine, cilantro stem",
    pairing: "breakfast burritos, vegetables, grilled shrimp",
    diet: "vegan / gluten-free / contains cilantro",
  },
];

const tickets = [
  ["Taco Night", "Verde Spark + Ember Original", "bright brine first, slow ember finish"],
  ["Wing Tray", "Smoked Oak", "charred pepper depth without syrupy sweetness"],
  ["Egg Counter", "Ember Original", "clean vinegar snap for breakfast service"],
  ["Market Veg", "Mango Ghost", "fruit heat for carrots, squash, and cauliflower"],
];

const badges = [
  "Ingredient transparency",
  "Small-batch lot labels",
  "Allergen notes",
  "Shelf-stable shipping",
  "Wholesale case routing",
  "Secure checkout path",
];

const chat = [
  ["customer", "I am making tacos for mixed heat tolerance. One person loves ghost pepper, two are mild."],
  ["ai", "Build the Heat Pack: Verde Spark for the table, Ember Original for the center lane, and one Mango Ghost bottle on the side. I would add recipe cards for citrus slaw and charred corn."],
  ["customer", "Can a local grocer order this by the case?"],
  ["ai", "Yes. Capture buyer type as stockist, route to 12-bottle mixed cases, and flag shelf-stable shipping plus allergen notes before sending the wholesale sheet."],
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  buyerType: "Home cook",
  tolerance: "Medium heat",
  interest: "Build a Heat Pack",
  notes: "",
};

export default function FoodBrandPage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(`.${styles.revealTarget}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.isVisible, entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: "-3% 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className={styles.page} data-theme={theme}>
      <div className={styles.seedDrift} aria-hidden="true" />
      <nav className={styles.nav}>
        <a className={styles.brand} href="#top" aria-label="Ember and Oak home">
          <span className={styles.brandSeal}>E&O</span>
          <span>Ember & Oak</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#sauces">Sauces</a>
          <a href="#heat-map">Heat Map</a>
          <a href="#concierge">Sauce Concierge</a>
          <a href="#stockists">Stockists</a>
        </div>
        <button className={styles.themeToggle} type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "Light label" : "Dark batch"}
        </button>
      </nav>

      <section id="top" className={styles.hero}>
        <div className={`${styles.heroCopy} ${styles.revealTarget}`}>
          <p className={styles.kicker}>Pepper Dispatch / Batch Ledger / Lot EO-2026</p>
          <h1>Small-batch heat routed from crate to bottle.</h1>
          <p>
            Ember & Oak sells hot sauce like a field dispatch: lot codes, flame index, recipe tickets,
            stockist slips, and a concierge that builds the right heat pack before checkout.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.primaryCta} href="#stockists">Build a Heat Pack</a>
            <a className={styles.secondaryCta} href="#concierge">Ask the Sauce Concierge</a>
          </div>
        </div>

        <div className={`${styles.ledgerBoard} ${styles.revealTarget}`}>
          <div className={styles.heroImage}>
            <Image src="/food-brand/hero-hot-sauce.jpg" alt="Hot sauce bottles ready for dispatch" fill priority sizes="(max-width: 860px) 100vw, 46vw" />
          </div>
          <div className={styles.batchCard}>
            <span className={styles.stamp}>BATCH CARD</span>
            <h2>Crate 19-A</h2>
            <dl>
              <div><dt>Ferment</dt><dd>21 days</dd></div>
              <div><dt>Flame index</dt><dd>medium to wild</dd></div>
              <div><dt>Route</dt><dd>market / DTC / stockist</dd></div>
            </dl>
          </div>
          <div className={styles.routeStrip} aria-hidden="true">
            <span>seed</span><i /><span>mash</span><i /><span>barrel</span><i /><span>bottle</span>
          </div>
        </div>
      </section>

      <section id="sauces" className={styles.section}>
        <div className={`${styles.sectionHead} ${styles.revealTarget}`}>
          <p className={styles.kicker}>Stamped Sauce Modules</p>
          <h2>Four bottles, each with a heat lane and pairing ticket.</h2>
        </div>
        <div className={styles.sauceGrid}>
          {sauces.map((sauce) => (
            <article className={`${styles.sauceCard} ${styles.revealTarget}`} key={sauce.name}>
              <div className={styles.sauceImage}>
                <Image src={sauce.image} alt={`${sauce.name} hot sauce visual`} fill sizes="(max-width: 760px) 100vw, 25vw" />
              </div>
              <div className={styles.cardText}>
                <div className={styles.cardTop}><span>{sauce.batch}</span><b>{sauce.heat}</b></div>
                <h3>{sauce.name}</h3>
                <p>{sauce.notes}</p>
                <div className={styles.flameMeter} style={{ "--heat": sauce.heat.split("/")[0] } as React.CSSProperties}>
                  <span />
                </div>
                <dl>
                  <div><dt>Heat route</dt><dd>{sauce.scoville}</dd></div>
                  <div><dt>Pairing</dt><dd>{sauce.pairing}</dd></div>
                  <div><dt>Diet note</dt><dd>{sauce.diet}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="heat-map" className={`${styles.section} ${styles.mapSection}`}>
        <div className={`${styles.routeMap} ${styles.revealTarget}`}>
          <div>
            <p className={styles.kicker}>Scoville Route Map</p>
            <h2>Heat moves like a dispatch lane, not a product shelf.</h2>
            <p>
              Visitors can read the flavor route from bright brine to smoked oak to ghost-pepper fruit before
              choosing a bottle, bundle, stockist pickup, or wholesale case.
            </p>
          </div>
          <svg className={styles.mapSvg} viewBox="0 0 640 260" role="img" aria-label="Heat route from Verde Spark to Mango Ghost">
            <path className={styles.mapPath} d="M48 196 C145 90 225 228 318 128 S485 72 592 42" />
            {sauces.map((sauce, index) => (
              <g key={sauce.name} transform={`translate(${70 + index * 170} ${190 - index * 44})`}>
                <circle r="22" />
                <text y="5">{sauce.heat}</text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.sectionHead} ${styles.revealTarget}`}>
          <p className={styles.kicker}>Recipe Dispatch Tickets</p>
          <h2>Meal decisions become sauce routes.</h2>
        </div>
        <div className={styles.ticketGrid}>
          {tickets.map(([meal, sauce, note], index) => (
            <article className={`${styles.ticket} ${styles.revealTarget}`} key={meal}>
              <span>DISPATCH 0{index + 1}</span>
              <h3>{meal}</h3>
              <b>{sauce}</b>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="concierge" className={`${styles.section} ${styles.concierge}`}>
        <div className={`${styles.chatPanel} ${styles.revealTarget}`}>
          <div className={styles.clipboardHead}>
            <p className={styles.kicker}>AI Sauce Concierge</p>
            <h2>Routes heat tolerance into a bottle, bundle, or stockist action.</h2>
          </div>
          <div className={styles.messages}>
            {chat.map(([role, text], index) => (
              <div className={role === "ai" ? styles.aiBubble : styles.customerBubble} key={`${role}-${index}`}>
                <span>{role === "ai" ? "E&O AI" : "Customer"}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.badgeWall} ${styles.revealTarget}`}>
          {badges.map((badge) => <span key={badge}>{badge}</span>)}
        </div>
      </section>

      <section id="stockists" className={`${styles.section} ${styles.formSection}`}>
        <form className={`${styles.dispatchForm} ${styles.revealTarget}`} onSubmit={submitForm}>
          <div className={styles.formHead}>
            <p className={styles.kicker}>Wholesale Clipboard / Stockist Slip</p>
            <h2>Route a heat pack, restock reminder, or wholesale case inquiry.</h2>
          </div>
          <div className={styles.formGrid}>
            <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Rivera" /></label>
            <label>Email / phone<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="buyer@example.com" /></label>
            <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 014-0199" /></label>
            <label>Buyer type<select value={form.buyerType} onChange={(e) => setForm({ ...form, buyerType: e.target.value })}><option>Home cook</option><option>Independent grocer</option><option>Restaurant buyer</option><option>Specialty market</option></select></label>
            <label>Heat tolerance<select value={form.tolerance} onChange={(e) => setForm({ ...form, tolerance: e.target.value })}><option>Mild heat</option><option>Medium heat</option><option>High heat</option><option>Ghost lane</option></select></label>
            <label>Product interest<select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}><option>Build a Heat Pack</option><option>Restock subscription</option><option>Stockist inquiry</option><option>Wholesale case sheet</option></select></label>
          </div>
          <label className={styles.notes}>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Tell us the meal, shelf, market, or case count." /></label>
          <button className={styles.primaryCta} type="submit">{submitted ? "Dispatch queued" : "Send Dispatch Slip"}</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <div><b>Ember & Oak Hot Sauce</b><span>hello@emberandoak.example · (555) 019-0710</span></div>
        <a className={styles.secondaryCta} href="#top">Back to batch ledger</a>
      </footer>
    </main>
  );
}
