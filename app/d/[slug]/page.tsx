import { notFound } from "next/navigation";
import SalonPage, {
  DEFAULT_SALON_PROSPECT,
  type ProspectData,
} from "../../salon/page";
import BarbershopPage from "../../barbershop/page";
import RecordingStudioPage, {
  type RecordingStudioProspect,
} from "../../recording-studio/page";

type ProspectEntry =
  | (ProspectData & { expires: string; vertical: "salon" | "barber" })
  | (RecordingStudioProspect & { expires: string; vertical: "studio" });

const PROSPECTS: Record<string, ProspectEntry> = {
  "ani-african-hair-braiding": {
    name: "Ani African Hair Braiding",
    phone: "(602) 555-0199",
    phoneHref: "tel:+160****0199",
    email: "aniafricanhairbraiding@gmail.com",
    city: "Phoenix",
    state: "AZ",
    address: "Phoenix, AZ",
    vertical: "salon",
    heroImage: "/prospects/ani-african-hair-braiding/hero-braids.png",
    services: [
      {
        eyebrow: "Protective styling",
        title: "Box Braids",
        copy: "Knotless or box, any length. Long-lasting, low-maintenance.",
        tag: "Any length",
        image: "/prospects/ani-african-hair-braiding/box-braids.png",
      },
      {
        eyebrow: "Gentle install",
        title: "Knotless Braids",
        copy: "Sleeker, gentler on your edges. The braid that started a movement.",
        tag: "Edge-friendly",
        image: "/prospects/ani-african-hair-braiding/knotless-braids.png",
      },
      {
        eyebrow: "Clean parts",
        title: "Cornrows & Twists",
        copy: "Straight-backs, designs, lemonade braids. Clean parts, no shortcuts.",
        tag: "Design-ready",
        image: "/prospects/ani-african-hair-braiding/cornrows-twists.png",
      },
    ],
    expires: "2026-06-20",
  },
  "bayside-barbershop": {
    name: "Bayside Barbershop",
    phone: "(718) 555-0100",
    phoneHref: "tel:+171****0100",
    email: "hello@baysidebarbers.com",
    city: "Brooklyn",
    state: "NY",
    address: "Brooklyn, NY",
    tagline: "Neighborhood cuts and clean fades",
    vertical: "barber",
    expires: "2026-06-20",
  },
  "glow-studio-salon": {
    ...DEFAULT_SALON_PROSPECT,
    name: "Glow Studio Salon",
    phone: "(212) 555-0123",
    phoneHref: "tel:+121****0123",
    email: "hello@glowstudiosalon.com",
    city: "New York",
    state: "NY",
    address: "18 Mercer Row, Studio 4, New York, NY",
    tagline: "Quiet luxury beauty studio",
    vertical: "salon",
    expires: "2026-06-20",
  },
  "we-made-it-recording-studio": {
    name: "We Made It Recording Studio",
    shortName: "We Made It",
    phone: "(817) 203-4697",
    phoneHref: "tel:+181****4697",
    email: "info@wemadeitstudio.com",
    city: "Arlington",
    state: "TX",
    tagline: "DFW's hottest rooms. Same-day roughs. Engineer included.",
    heroKicker: "DFW's hottest rooms. Same-day roughs. Engineer included.",
    heroHeadline: "Hear the take before you book the take.",
    heroLede:
      "We Made It Recording Studio gives DFW artists, podcasters, and managers a premium room to lock the vibe, check availability, and reserve a session — no DM thread required.",
    heroImage: "/prospects/we-made-it-recording-studio/hero-studio.jpg",
    heroImageAlt: "We Made It Recording Studio control room with a Black artist in the vocal booth and SSL mixing console in the foreground",
    liveRoomLabel: "WE MADE IT LIVE ROOM",
    aiLabel: "We Made It Concierge",
    footerLine: "We Made It Recording Studio is ready for the next take.",
    services: [
      {
        code: "CH 01",
        title: "Recording sessions",
        body: "Two-hour, half-day, and late-night vocal blocks with treated booth, engineer setup, and clean take organization — DFW-ready.",
        image: "/prospects/we-made-it-recording-studio/tile-vocal-session.jpg",
        imageAlt: "Vocalist at the studio microphone during a recording session",
      },
      {
        code: "CH 02",
        title: "Mixing / mastering",
        body: "Stem prep, vocal tuning, mix revisions, and release-ready masters delivered through a secure file room.",
        image: "/prospects/we-made-it-recording-studio/tile-mixing-console.jpg",
        imageAlt: "SSL mixing console with audio engineer at the faders",
      },
      {
        code: "CH 03",
        title: "Beat + artist packages",
        body: "Beat selection, hook sketching, session direction, cover-art handoff, and rollout assets for independent DFW artists.",
        image: "/prospects/we-made-it-recording-studio/tile-producer-lounge.jpg",
        imageAlt: "Producer in the studio lounge with gold records on the wall",
      },
    ],
    vertical: "studio",
    expires: "2026-06-27",
  },
};

export function generateStaticParams() {
  return Object.keys(PROSPECTS).map((slug) => ({ slug }));
}

function ExpiredPage({
  prospectName,
  expires,
}: {
  prospectName: string;
  expires: string;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#0D0611",
        color: "#FAF5FF",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: "1rem", maxWidth: "34rem" }}>
        <p
          style={{
            margin: 0,
            color: "#F9A8D4",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Demo expired
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 7vw, 4rem)", lineHeight: 1 }}>
          This demo expired on {expires}.
        </h1>
        <p style={{ margin: 0, color: "#E9D8F8", lineHeight: 1.7 }}>
          {prospectName} can request a fresh preview window anytime.
        </p>
        <a
          href="https://aexonai.com/#consultation"
          style={{
            justifySelf: "center",
            marginTop: "0.5rem",
            padding: "0.9rem 1.2rem",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #F472B6 0%, #C084FC 100%)",
            color: "#16091C",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Talk to AEXON AI
        </a>
      </div>
    </main>
  );
}

export default async function ProspectDemo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prospect = PROSPECTS[slug];

  if (!prospect) {
    notFound();
  }

  const today = new Date().toISOString().slice(0, 10);

  if (today > prospect.expires) {
    return <ExpiredPage prospectName={prospect.name} expires={prospect.expires} />;
  }

  if (prospect.vertical === "studio") {
    return <RecordingStudioPage prospect={prospect} />;
  }

  if (prospect.vertical === "barber") {
    return <BarbershopPage prospect={prospect} />;
  }

  return <SalonPage prospect={prospect} />;
}
