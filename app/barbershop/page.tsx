"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Bodoni_Moda, DM_Serif_Text, IBM_Plex_Mono } from "next/font/google";
import { CalendarDays, Clock3, Moon, Phone, Scissors, Send, Sparkles, Sun } from "lucide-react";

import { AnimatedNumber } from "@/components/ui/animated-number";

import styles from "./page.module.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barber-display",
  display: "swap",
});

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-barber-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barber-mono",
  display: "swap",
});

type BarbershopProspect = {
  name?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  city?: string;
  state?: string;
  address?: string;
  tagline?: string;
  vertical?: string;
  expires?: string;
};

const DEFAULT_BARBERSHOP_PROSPECT: BarbershopProspect = {
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
  { title: "Classic Cut", price: 25, copy: "Scissor or clipper work finished with a clean neck shave." },
  { title: "Skin Fade", price: 30, copy: "Low, mid, or high fade with steady blend work and sharp edges." },
  { title: "Beard Trim", price: 15, copy: "Shape, taper, and detail lines without taking the character out." },
  { title: "Hot Towel Shave", price: 35, copy: "Steam towel prep, straight razor detail, and a brass-clean finish." },
  { title: "Kids Cut", price: 18, copy: "Patient chair time for clean school cuts and weekend shape-ups." },
  { title: "Line-Up Only", price: 20, copy: "Edges, neck, beard perimeter, and quick polish between full cuts." },
];

const barberTeam = [
  { name: "Marcus Vale", specialty: "Skin fades and tight tapers" },
  { name: "Eli Brooks", specialty: "Classic scissor cuts" },
  { name: "Jonah Reed", specialty: "Beards and hot towels" },
];

const tickerItems = services.map((service) => `${service.title} $${service.price}`);
const trustBadges = ["Master Barbers", "Walk-Ins Welcome", "Hot Towel Service", "Est. 2014"];

const demoMessages = [
  { speaker: "Guest", text: "I need a skin fade and beard trim after 5 today." },
  { speaker: "Bayside AI", text: "Marcus has 5:40 open. I can hold a fade, beard trim, and hot towel finish." },
  { speaker: "Guest", text: "Book it and send the address." },
  { speaker: "Bayside AI", text: "Done. You are set for 5:40, and the confirmation text is on the way." },
];

export default function BarbershopPage({
  prospect = DEFAULT_BARBERSHOP_PROSPECT,
}: {
  prospect?: BarbershopProspect;
}) {
  const shop = { ...DEFAULT_BARBERSHOP_PROSPECT, ...prospect };
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const servicePlateRefs = useRef<HTMLElement[]>([]);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    barber: barberTeam[0].name,
    service: services[0].title,
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("bayside-barber-theme");
    if (stored === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("bayside-barber-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const plates = servicePlateRefs.current.filter(Boolean);
    if (!plates.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window)) {
      plates.forEach((plate) => {
        plate.dataset.visible = "true";
      });
      return;
    }

    let visibleCount = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.target.getAttribute("data-visible") === "true") {
            return;
          }

          entry.target.setAttribute("data-visible", "true");
          visibleCount += 1;
          observer.unobserve(entry.target);
        });

        if (visibleCount >= plates.length) {
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    plates.forEach((plate) => observer.observe(plate));

    if (reduceMotion) {
      return () => observer.disconnect();
    }

    const emphasisObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.6) {
            entry.target.setAttribute("data-emphasis", "true");
          } else {
            entry.target.removeAttribute("data-emphasis");
          }
        });
      },
      { threshold: [0.1, 0.6], rootMargin: "-22% 0px -22% 0px" },
    );

    plates.forEach((plate) => emphasisObserver.observe(plate));

    return () => {
      observer.disconnect();
      emphasisObserver.disconnect();
    };
  }, []);

  const tickerLoop = useMemo(() => [...tickerItems, ...tickerItems, ...tickerItems], []);
  const trustLoop = useMemo(() => [...trustBadges, ...trustBadges, ...trustBadges, ...trustBadges], []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className={`${styles.page} ${darkMode ? styles.dark : ""} ${bodoni.variable} ${dmSerif.variable} ${plexMono.variable}`}
    >
      <div className={styles.persistentPole} aria-hidden="true" />
      <div className={styles.paperGrain} aria-hidden="true" />

      <nav className={styles.nav} aria-label="Bayside barbershop navigation">
        <a className={styles.wordmark} href="#top" aria-label="Bayside Barbershop home">
          Bayside
          <span>{shop.city}, {shop.state}</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#services">Services</a>
          <a href="#concierge">Concierge</a>
          <a href="#contact">Contact</a>
        </div>
        <div className={styles.navActions}>
          <button
            className={styles.iconButton}
            type="button"
            onClick={() => setDarkMode((current) => !current)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className={styles.shineButton} href="#contact">Book</a>
        </div>
      </nav>

      <main id="top">
        <section className={styles.hero}>
          <Image
            className={styles.heroImage}
            src="/barbershop/hero-vintage.jpg"
            alt="Warm vintage barbershop interior with barber chairs and mirrors"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Est. 2014 / neighborhood chair house</p>
              <h1>Sharp cuts.<br />Clean fades.<br />Real conversation.</h1>
              <p className={styles.heroText}>
                A modern neighborhood barbershop built for clean blends, steady hands, and booking that gets you in the chair without phone tag.
              </p>
              <div className={styles.ctaRow}>
                <a className={styles.shineButton} href="#contact">Book a chair</a>
                <a className={styles.ghostButton} href="#services">See prices</a>
              </div>
            </div>
            <div className={styles.heroPoster} aria-label="Bayside service highlights">
              <p>Today&apos;s board</p>
              <strong><AnimatedNumber value={18} format={(value) => `$${value}`} /> walk-in line-ups</strong>
              <span>Hot towels ready until 7 PM</span>
            </div>
          </div>
        </section>

        <section className={styles.priceTicker} aria-label="Scrolling service price ticker">
          <div className={styles.tickerTrack}>
            {tickerLoop.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className={styles.introBand} aria-label="Shop promise">
          <div>
            <p className={styles.eyebrow}>Walnut, chrome, steady hands</p>
            <h2>Old-shop ritual, modern booking.</h2>
          </div>
          <p>
            Bayside keeps the chair moving without making the room feel rushed: clean consultation, real barber timing, and an AI concierge that handles the back-and-forth before guests arrive.
          </p>
        </section>

        <section className={styles.services} id="services">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Menu board</p>
            <h2>The menu. Clean prices.</h2>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <article
                className={styles.servicePlate}
                ref={(element) => {
                  if (element) {
                    servicePlateRefs.current[index] = element;
                  }
                }}
                style={{ "--plate-delay": `${index * 120}ms` } as CSSProperties}
                key={service.title}
              >
                <div>
                  <span className={styles.priceTag}>${service.price}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <a href="#contact">Book</a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.posterCallout} aria-label="Walk-ins welcome">
          <div className={styles.posterRule} aria-hidden="true" />
          <p>Walk-ins welcome</p>
          <h2>Come in rough. Leave sharp.</h2>
          <div className={styles.posterMeta}>
            <span><Clock3 size={16} /> Mon-Sat / 9-7</span>
            <span><Phone size={16} /> {shop.phone}</span>
          </div>
        </section>

        <section className={styles.teamSection} aria-label="Meet the barbers">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Chair roster</p>
            <h2>Three barbers, no guesswork.</h2>
          </div>
          <div className={styles.teamGrid}>
            {barberTeam.map((barber) => (
              <article className={styles.teamCard} key={barber.name}>
                <Scissors size={28} />
                <h3>{barber.name}</h3>
                <p>{barber.specialty}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.concierge} id="concierge" aria-label="Bayside AI concierge">
          <div>
            <p className={styles.eyebrow}>Bayside AI</p>
            <h2>Booking that talks like the front desk.</h2>
            <p>
              The concierge qualifies the service, checks timing, suggests the right barber, and sends the confirmation before the phone interrupts a cut.
            </p>
          </div>
          <div className={`${styles.chatPanel} ${chatOpen ? styles.chatOpen : ""}`}>
            <button className={styles.chatToggle} type="button" onClick={() => setChatOpen((current) => !current)}>
              <Sparkles size={17} />
              Bayside AI
            </button>
            <div className={styles.chatBody}>
              <header>
                <Image src="/barbershop/scissors-icon.svg" alt="" width={32} height={32} />
                <div>
                  <strong>Bayside AI</strong>
                  <span>Chair finder / booking assistant</span>
                </div>
              </header>
              <div className={styles.messages}>
                {demoMessages.map((message) => (
                  <div
                    className={`${styles.message} ${message.speaker === "Guest" ? styles.guestMessage : ""}`}
                    key={message.text}
                  >
                    <span>{message.speaker}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <form className={styles.telegramForm}>
                <input aria-label="Ask Bayside AI" readOnly value="Need a fade this afternoon" />
                <button type="button" aria-label="Send demo message"><Send size={16} /></button>
              </form>
            </div>
          </div>
        </section>

        <section className={styles.trustMarquee} aria-label="Scrolling trust badges">
          <div className={styles.trustTrack}>
            {trustLoop.map((badge, index) => (
              <span key={`${badge}-${index}`}>{badge}</span>
            ))}
          </div>
        </section>

        <section className={styles.testimonials} aria-label="Customer notes">
          <blockquote>&ldquo;The fade was exact, the beard line was clean, and I booked the next one before I left the chair.&rdquo;</blockquote>
          <blockquote>&ldquo;Feels like a classic shop, runs like a modern one.&rdquo;</blockquote>
        </section>

        <section className={styles.contact} id="contact">
          <div className={styles.contactCopy}>
            <p className={styles.eyebrow}>Request a chair</p>
            <h2>Step into the chair.</h2>
            <p>{shop.address}</p>
            <a href={shop.phoneHref}>{shop.phone}</a>
            <a href={`mailto:${shop.email}`}>{shop.email}</a>
          </div>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={formState.name} onChange={handleChange} autoComplete="name" />
            </label>
            <label>
              Phone
              <input name="phone" value={formState.phone} onChange={handleChange} autoComplete="tel" />
            </label>
            <label>
              Preferred barber
              <select name="barber" value={formState.barber} onChange={handleChange}>
                {barberTeam.map((barber) => <option key={barber.name}>{barber.name}</option>)}
              </select>
            </label>
            <label>
              Preferred service
              <select name="service" value={formState.service} onChange={handleChange}>
                {services.map((service) => <option key={service.title}>{service.title}</option>)}
              </select>
            </label>
            <button className={styles.shineButton} type="submit">
              {submitted ? "Request received" : "Send request"}
            </button>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <h2>Bayside Barbershop</h2>
          <p>{shop.tagline}</p>
          <a href="https://aexonai.com">Talk to AEXON AI</a>
        </div>
        <div className={styles.hours}>
          <span><CalendarDays size={16} /> Mon-Fri / 9 AM-7 PM</span>
          <span>Sat / 9 AM-6 PM</span>
          <span>Sun / Closed</span>
        </div>
        <address>
          {shop.address}<br />
          <a href={shop.phoneHref}>{shop.phone}</a>
        </address>
      </footer>
    </div>
  );
}
