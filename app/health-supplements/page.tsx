"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProspectData } from "@/lib/prospect-data";
import styles from "./page.module.css";

export const DEFAULT_HEALTH_SUPPLEMENTS_PROSPECT: ProspectData = {
  name: "Vitality Nutrition",
  shortName: "VN",
  phone: "(555) 018-2210",
  phoneHref: "tel:+155****2210",
  email: "labeldesk@vitality.example",
  emailHref: "mailto:labeldesk@vitality.example",
  city: "",
  state: "",
  address: "",
  tagline: "Supplement Facts Operating System / Lot VN-2026-A",
  expires: "2099-12-31",
  vertical: "health-supplements",
};

const protocols = [
  {
    name: "Hydration Primer",
    code: "H2-EL-041",
    image: "/health-supplements/protocol-hydration.jpg",
    use: "Pre-training electrolyte base for heavy sweat sessions.",
    timing: "20-30 min before training or first liter of water.",
    flags: ["Caffeine: none", "Allergens: coconut", "Avoid: high-sodium diets"],
    facts: ["Sodium 420 mg", "Potassium 190 mg", "Magnesium 55 mg", "No artificial dye"],
  },
  {
    name: "Daily Greens",
    code: "DG-MIC-118",
    image: "/health-supplements/protocol-greens.jpg",
    use: "Daily micronutrient routine support when produce intake is inconsistent.",
    timing: "Morning with food; separate from thyroid medication.",
    flags: ["Caffeine: none", "Allergens: wheatgrass handled", "Avoid: anticoagulant conflicts"],
    facts: ["Greens blend 6 g", "Vitamin C 90 mg", "Zinc 8 mg", "Sample label values"],
  },
  {
    name: "Night Magnesium",
    code: "NM-GLY-224",
    image: "/health-supplements/protocol-magnesium.jpg",
    use: "Evening mineral protocol for people reducing stimulant load.",
    timing: "60 min before bed; do not combine with sedatives without guidance.",
    flags: ["Caffeine: none", "Allergens: none declared", "Avoid: kidney disease caution"],
    facts: ["Magnesium glycinate 200 mg", "Glycine 1 g", "Melatonin: none", "Illustrative panel"],
  },
  {
    name: "Protein Repair",
    code: "PR-WHY-072",
    image: "/health-supplements/protocol-protein.jpg",
    use: "Post-lift protein serving for straightforward macro planning.",
    timing: "Within meal window after training or as a low-prep snack.",
    flags: ["Caffeine: none", "Allergens: milk", "Avoid: dairy intolerance"],
    facts: ["Protein 25 g", "Leucine 2.5 g", "Sugar 2 g", "Third-party test placeholder"],
  },
];

const coachMessages = [
  ["user", "Goal: 5 AM lifting, lactose sensitive, no caffeine after noon, wants fewer tubs on the counter."],
  ["ai", "Sample protocol: Hydration Primer before training, Daily Greens with breakfast, vegan protein swap after lift, Night Magnesium only on non-alcohol evenings."],
  ["ai", "Subscription capture: 30-day hydration + magnesium, 45-day greens reminder, pause-anytime checkout path. This is illustrative and not medical advice."],
];

export default function HealthSupplementsPage({
  prospect = DEFAULT_HEALTH_SUPPLEMENTS_PROSPECT,
}: {
  prospect?: ProspectData;
}) {
  const shop = { ...DEFAULT_HEALTH_SUPPLEMENTS_PROSPECT, ...prospect };
  const [light, setLight] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.revealed, entry.isIntersecting);
        });
      },
      { threshold: 0.18, rootMargin: "-4% 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`${styles.page} ${light ? styles.light : ""}`}>
      <div className={styles.backdrop} aria-hidden="true">
        <Image src="/health-supplements/background-lab.jpg" alt="" fill priority sizes="100vw" />
      </div>
      <div className={styles.pulseRail} aria-hidden="true">
        <svg viewBox="0 0 1200 42" preserveAspectRatio="none">
          <path d="M0 22H180l18-14 22 28 28-28 18 14h190l16-10 18 20 24-20 18 10h668" />
        </svg>
      </div>

      <nav className={styles.nav}>
        <a className={styles.brand} href="#top" aria-label={`${shop.name} home`}>
          <span className={styles.brandMark}>{shop.shortName}</span>
          <span>{shop.name}</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#protocols">Protocols</a>
          <a href="#label-lab">Label Lab</a>
          <a href="#coach">Stack Coach</a>
          <a href="#subscribe">Subscribe</a>
        </div>
        <button className={styles.toggle} type="button" onClick={() => setLight((value) => !value)}>
          {light ? "Dark scan" : "Light label"}
        </button>
      </nav>

      <section id="top" className={styles.hero}>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.kicker}>{shop.tagline}</p>
          <h1>Dosing Protocol Cockpit for transparent daily stacks.</h1>
          <p>
            Vitality Nutrition turns subscription supplements into a label-first operating screen: timing, allergen
            flags, stimulant rules, and refill logic visible before checkout.
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.primaryCta} href="#subscribe">Build My Stack</a>
            <a className={styles.secondaryCta} href="#coach">Ask the Stack Coach</a>
          </div>
        </div>

        <div className={styles.cockpit} data-reveal>
          <div className={styles.mediaFrame}>
            <Image src="/health-supplements/hero-lab.jpg" alt="Supplement bottles and lab inspection surface" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
            <div className={styles.scanLine} />
          </div>
          <div className={styles.factPanel}>
            <span>PROTOCOL PANEL</span>
            <h2>Daily Stack 04</h2>
            <div className={styles.dosageTicks}>
              {["05:10", "07:30", "13:00", "21:40"].map((tick) => <i key={tick}>{tick}</i>)}
            </div>
            <dl>
              <div><dt>Stimulant ceiling</dt><dd>0 mg after 12 PM</dd></div>
              <div><dt>Allergen pass</dt><dd>milk / coconut checked</dd></div>
              <div><dt>Batch status</dt><dd>third-party test placeholder</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="protocols" className={styles.section}>
        <div className={styles.sectionHead} data-reveal>
          <p className={styles.kicker}>Protocol Modules</p>
          <h2>Every product card behaves like an inspection label.</h2>
        </div>
        <div className={styles.protocolGrid}>
          {protocols.map((item) => (
            <article className={styles.protocolCard} data-reveal key={item.name}>
              <div className={styles.protocolImage}>
                <Image src={item.image} alt={`${item.name} protocol visual`} fill sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTopline}><span>{item.code}</span><b>SAMPLE</b></div>
                <h3>{item.name}</h3>
                <p>{item.use}</p>
                <strong>{item.timing}</strong>
                <ul className={styles.flags}>
                  {item.flags.map((flag) => <li key={flag}>{flag}</li>)}
                </ul>
                <div className={styles.facts}>
                  {item.facts.map((fact) => <span key={fact}>{fact}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="label-lab" className={`${styles.section} ${styles.labSection}`}>
        <div className={styles.labelLab} data-reveal>
          <div>
            <p className={styles.kicker}>Label Lab</p>
            <h2>Ingredient transparency without clinical theater.</h2>
            <p>
              Panels show what is in the sample protocol, when it belongs in the day, and what should trigger a
              conversation with a qualified professional.
            </p>
          </div>
          <div className={styles.nutritionPanel}>
            <h3>Supplement Facts</h3>
            {[
              ["Serving schedule", "Goal-dependent; sample protocol only"],
              ["Stimulants", "Marked per product before checkout"],
              ["Allergen logic", "Milk, coconut, wheatgrass, soy handling flags"],
              ["Lot lookup", "Batch code education + placeholder COA link"],
              ["Warnings", "Medication conflicts and condition cautions surfaced"],
            ].map(([term, detail]) => (
              <div className={styles.factRow} key={term}>
                <span>{term}</span>
                <b>{detail}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coach" className={styles.section}>
        <div className={styles.coachGrid}>
          <div className={styles.coachPanel} data-reveal>
            <p className={styles.kicker}>AI Stack Coach</p>
            <h2>Guidance captures goals, restrictions, schedule, and subscription preference.</h2>
            <div className={styles.chatWindow}>
              {coachMessages.map(([role, message], index) => (
                <div className={role === "ai" ? styles.aiBubble : styles.userBubble} key={`${role}-${index}`}>
                  <span>{role === "ai" ? "VN Coach" : "Customer"}</span>
                  <p>{message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.trustPanel} data-reveal>
            {["Lot-code lookup", "Allergen flagging", "Third-party testing placeholder", "Pause subscription anytime", "Ingredient education", "Secure checkout path"].map((item) => (
              <div className={styles.badge} key={item}>
                <span />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="subscribe" className={styles.section}>
        <form className={styles.form} data-reveal>
          <div>
            <p className={styles.kicker}>Subscribe / Contact</p>
            <h2>Route the right sample protocol before the first refill.</h2>
          </div>
          <label>Name<input name="name" placeholder="Jordan Lee" /></label>
          <label>Email or phone<input name="contact" placeholder="jordan@example.com" /></label>
          <label>Goal<input name="goal" placeholder="Morning training, hydration, sleep routine" /></label>
          <label>Dietary restriction<input name="restriction" placeholder="Lactose sensitive, gluten-free, vegan..." /></label>
          <label>Stimulant sensitivity<select name="stimulants" defaultValue=""><option value="" disabled>Choose one</option><option>None</option><option>Low tolerance</option><option>No caffeine after noon</option></select></label>
          <label>Subscription preference<select name="subscription" defaultValue=""><option value="" disabled>Choose one</option><option>One-time sample kit</option><option>30-day refill</option><option>45-day reminder</option><option>Coach follow-up first</option></select></label>
          <label className={styles.full}>Notes<textarea name="notes" placeholder="Medications, training days, flavors to avoid, checkout questions..." /></label>
          <button type="button">Generate Sample Stack</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <div><b>{shop.name}</b><span>{shop.email} · {shop.phone}</span></div>
        <a href="#subscribe">Build a transparent stack</a>
      </footer>
    </main>
  );
}
