"use client";

import { useEffect, useState, type CSSProperties, type ChangeEvent, type FormEvent } from "react";
import styles from "./page.module.css";

type ThemeMode = "dark" | "light";

export type RecordingStudioService = {
  code: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export type RecordingStudioProspect = {
  name: string;
  shortName?: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref?: string;
  city: string;
  state: string;
  tagline?: string;
  heroKicker?: string;
  heroHeadline?: string;
  heroLede?: string;
  heroImage?: string;
  heroImageAlt?: string;
  liveRoomLabel?: string;
  aiLabel?: string;
  footerLine?: string;
  services?: RecordingStudioService[];
};

export const DEFAULT_RECORDING_STUDIO_PROSPECT: RecordingStudioProspect = {
  name: "Backblock Studioz",
  shortName: "Backblock",
  phone: "(718) 555-0192",
  phoneHref: "tel:+171****0192",
  email: "bookings@backblockstudioz.demo",
  city: "Brooklyn",
  state: "NY",
  tagline: "Brooklyn rooms. Clean booking. Warm records.",
  heroKicker: "Brooklyn rooms. Clean booking. Warm records.",
  heroHeadline: "Turn late-night ideas into booked studio time.",
  heroLede: "Backblock Studioz gives artists, podcasters, and managers a premium room to hear the vibe, check the services, and reserve a session without a messy DM thread.",
  liveRoomLabel: "BACKBLOCK LIVE ROOM",
  aiLabel: "Backblock AI",
  footerLine: "Backblock Studioz is ready for the next take.",
};

const defaultServices: RecordingStudioService[] = [
  {
    code: "CH 01",
    title: "Recording sessions",
    body: "Two-hour, half-day, and late-night vocal blocks with treated booth, engineer setup, and clean take organization.",
  },
  {
    code: "CH 02",
    title: "Mixing / mastering",
    body: "Stem prep, vocal tuning, mix revisions, and release-ready masters delivered through a secure file room.",
  },
  {
    code: "CH 03",
    title: "Podcast production",
    body: "Multi-mic recording, remote guest capture, edit passes, intro beds, and export packages for every platform.",
  },
  {
    code: "CH 04",
    title: "Beat + artist packages",
    body: "Beat selection, hook sketching, session direction, cover-art handoff, and rollout assets for independent artists.",
  },
];

const trustBadges = [
  "Treated vocal booth",
  "Engineer included",
  "Same-day rough bounce",
  "Secure file delivery",
  "Deposit-ready booking",
  "Callback routing",
];

const chat = [
  {
    role: "artist",
    text: "Need a 2-hour vocal session this Friday night. Can I get the booth and an engineer?",
  },
  {
    role: "ai",
    text: "Studio B is open Friday 8:30-10:30 PM. Engineer Malik is available. Session total is $180; $45 deposit locks the room.",
  },
  {
    role: "artist",
    text: "What if I bring stems for a mix/master instead?",
  },
  {
    role: "ai",
    text: "I can route that as a Mix + Master package: stem upload today, engineer callback by 6 PM, first mix window held for Sunday.",
  },
];

const initialForm = {
  name: "",
  contact: "",
  service: "Recording session",
  length: "2 hours",
  date: "",
  notes: "",
};

function TapeDeck({ liveRoomLabel }: { liveRoomLabel: string }) {
  return (
    <div className={styles.deck} aria-label="Animated tape deck and studio meters">
      <div className={styles.deckHeader}>
        <span>{liveRoomLabel}</span>
        <span className={styles.recLight}>REC</span>
      </div>
      <div className={styles.reels} aria-hidden="true">
        <div className={styles.reel}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.tapePath} />
        <div className={styles.reel}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.waveform} aria-hidden="true">
        {Array.from({ length: 36 }).map((_, index) => (
          <i
            key={index}
            style={
              {
                "--i": index,
                "--level": `${18 + (index % 9) * 8}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.meterBank} aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            style={
              {
                "--i": index,
                "--level": `${24 + (index % 5) * 13}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.faders} aria-hidden="true">
        {["VOX", "BUS", "AUX", "MIX"].map((label, index) => (
          <div className={styles.fader} key={label}>
            <span>{label}</span>
            <i style={{ "--i": index } as CSSProperties} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecordingStudioPage({
  prospect = DEFAULT_RECORDING_STUDIO_PROSPECT,
}: {
  prospect?: RecordingStudioProspect;
}) {
  const shop = { ...DEFAULT_RECORDING_STUDIO_PROSPECT, ...prospect };
  const services = shop.services ?? defaultServices;
  const emailHref = shop.emailHref ?? `mailto:${shop.email}`;
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.isVisible, entry.isIntersecting);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const updateForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className={styles.page} data-theme={theme}>
      <header className={styles.navWrap}>
        <nav className={styles.nav} aria-label={`${shop.name} navigation`}>
          <a className={styles.brand} href="#top" aria-label={`${shop.name} home`}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span>{shop.name}</span>
          </a>
          <div className={styles.navLinks}>
            <a href="#services">Services</a>
            <a href="#concierge">AI Concierge</a>
            <a href="#book">Book Session</a>
          </div>
          <div className={styles.navActions}>
            <a className={styles.phone} href={shop.phoneHref}>{shop.phone}</a>
            <button
              className={styles.toggle}
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            >
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        </nav>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.kicker}>{shop.heroKicker}</p>
          <h1>{shop.heroHeadline}</h1>
          <p className={styles.lede}>
            {shop.heroLede}
          </p>
          <div className={styles.ctaRow}>
            <a className={styles.primaryCta} href="#book">Book Studio Time</a>
            <a className={styles.secondaryCta} href="#concierge">Chat with our Concierge</a>
          </div>
        </div>
        <div className={styles.heroConsole} data-reveal>
          {shop.heroImage ? (
            <img
              className={styles.heroImage}
              src={shop.heroImage}
              alt={shop.heroImageAlt ?? `${shop.name} studio`}
              loading="eager"
            />
          ) : (
            <TapeDeck liveRoomLabel={shop.liveRoomLabel ?? "LIVE ROOM"} />
          )}
        </div>
      </section>

      <section className={styles.services} id="services" aria-labelledby="services-title">
        <div className={styles.sectionIntro} data-reveal>
          <p className={styles.kicker}>Session menu</p>
          <h2 id="services-title">Rack-ready services for the next take.</h2>
        </div>
        <div className={styles.serviceRack}>
          {services.map((service) => (
            <article className={styles.channelStrip} data-reveal key={service.title}>
              {service.image ? (
                <div className={styles.serviceMedia}>
                  <img
                    src={service.image}
                    alt={service.imageAlt ?? `${shop.name} ${service.title}`}
                    loading="lazy"
                  />
                </div>
              ) : null}
              <span>{service.code}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.concierge} id="concierge" aria-labelledby="concierge-title">
        <div className={styles.conciergeCopy} data-reveal>
          <p className={styles.kicker}>AI Concierge</p>
          <h2 id="concierge-title">A booking flow that sounds like the studio.</h2>
          <p>
            The concierge answers with room availability, engineer coverage, deposit
            details, and callback routing so session interest turns into a held slot.
          </p>
        </div>
        <div className={styles.chatConsole} data-reveal>
          <div className={styles.consoleTop}>
            <span>SESSION ROUTER</span>
            <span>ARMED</span>
          </div>
          {chat.map((message, index) => (
            <div
              className={`${styles.message} ${
                message.role === "ai" ? styles.messageAi : styles.messageUser
              }`}
              key={`${message.role}-${index}`}
            >
              <span>{message.role === "ai" ? shop.aiLabel : "Artist"}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.trust} aria-label="Studio trust badges">
        {trustBadges.map((badge) => (
          <span data-reveal key={badge}>{badge}</span>
        ))}
      </section>

      <section className={styles.booking} id="book" aria-labelledby="book-title">
        <div className={styles.bookingPanel} data-reveal>
          <div className={styles.bookingCopy}>
            <p className={styles.kicker}>Book session</p>
            <h2 id="book-title">Hold the room before the night fills up.</h2>
            <p>
              Send the essentials and the studio can confirm the right room, engineer,
              file handoff, and deposit path.
            </p>
          </div>
          <form className={styles.form} onSubmit={submitForm}>
            <label>
              Name
              <input name="name" value={form.name} onChange={updateForm} autoComplete="name" />
            </label>
            <label>
              Phone / email
              <input name="contact" value={form.contact} onChange={updateForm} autoComplete="email" />
            </label>
            <label>
              Service type
              <select name="service" value={form.service} onChange={updateForm}>
                <option>Recording session</option>
                <option>Mixing / mastering</option>
                <option>Podcast production</option>
                <option>Beat / artist package</option>
              </select>
            </label>
            <label>
              Session length
              <select name="length" value={form.length} onChange={updateForm}>
                <option>2 hours</option>
                <option>Half day</option>
                <option>Full day</option>
                <option>Callback first</option>
              </select>
            </label>
            <label>
              Preferred date / time
              <input name="date" value={form.date} onChange={updateForm} placeholder="Friday after 8 PM" />
            </label>
            <label className={styles.notes}>
              Project notes
              <textarea
                name="notes"
                value={form.notes}
                onChange={updateForm}
                placeholder="Artist name, track count, podcast format, stems ready..."
              />
            </label>
            <button className={styles.submit} type="submit">Request Session Hold</button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>{shop.footerLine ?? `${shop.name} is ready for the next take.`}</p>
        <div>
          <a href={shop.phoneHref}>{shop.phone}</a>
          <a href={emailHref}>{shop.email}</a>
          <a href="#book">Book Studio Time</a>
        </div>
      </footer>
    </main>
  );
}
