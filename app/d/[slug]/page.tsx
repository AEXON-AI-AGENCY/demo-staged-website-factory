import { notFound } from "next/navigation";
import SalonPage, {
  DEFAULT_SALON_PROSPECT,
} from "../../salon/page";
import BarbershopPage from "../../barbershop/page";
import RecordingStudioPage from "../../recording-studio/page";
import type { ProspectData } from "@/lib/prospect-data";
import AutoRepairPage from "../../auto-repair/page";
import ClothingPage from "../../clothing/page";
import EcommercePage from "../../ecommerce/page";
import ElectricalPage from "../../electrical/page";
import HealthSupplementsPage from "../../health-supplements/page";
import HvacPage from "../../hvac/page";
import InsurancePage from "../../insurance/page";
import LawFirmPage from "../../law-firm/page";
import PlumbingPage from "../../plumbing/page";
import RealEstatePage from "../../real-estate/page";
import RestaurantPage from "../../restaurant/page";
import RoofingPage from "../../roofing/page";
import StreetwearPage from "../../streetwear/page";
import TechCompanyPage from "../../tech-company/page";

// Every prospect entry is a ProspectData (from the shared lib) plus
// an expires date and a vertical id. The WMI entry includes extra
// vertical-specific fields (heroKicker, liveRoomLabel, etc.) which
// flow through as untyped extras via `[key: string]: unknown` on
// the ProspectData type.
type ProspectEntry = ProspectData & {
  expires: string;
  vertical: string;
  [key: string]: unknown; // allow vertical-specific extras like heroKicker, liveRoomLabel
};

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
    address: "Arlington, TX",
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
  "mo-money-studios": {
    name: "Mo' Money Studios",
    shortName: "Mo' Money",
    phone: "(908) 259-4711",
    phoneHref: "tel:+190****4711",
    email: "ggnari8@gmail.com",
    address: "Brooklyn, NY",
    city: "Brooklyn",
    state: "NY",
    tagline: "Brooklyn rooms. Setmore booking. Engineer included.",
    heroKicker: "Brooklyn rooms. Setmore booking. Engineer included.",
    heroHeadline: "Lock the take without the DM thread.",
    heroLede:
      "Mo' Money Studios gives Brooklyn artists, podcasters, and managers a premium room with an engineer included — book a session online, no back-and-forth required.",
    heroImage: "/prospects/mo-money-studios/hero-studio.jpg",
    heroImageAlt:
      "Mo' Money Studios control room with a Black hip-hop artist in the vocal booth and SSL mixing console in the foreground",
    liveRoomLabel: "MO' MONEY LIVE ROOM",
    aiLabel: "Mo' Money Concierge",
    footerLine: "Mo' Money Studios is ready for the next take.",
    services: [
      {
        code: "CH 01",
        title: "Recording sessions",
        body: "Two-hour, half-day, and late-night vocal blocks with treated booth, engineer setup, and clean take organization — Brooklyn-ready.",
        image: "/prospects/mo-money-studios/tile-vocal-session.jpg",
        imageAlt: "Vocalist at the studio microphone during a recording session",
      },
      {
        code: "CH 02",
        title: "Mixing / mastering",
        body: "Stem prep, vocal tuning, mix revisions, and release-ready masters delivered through a secure file room.",
        image: "/prospects/mo-money-studios/tile-mixing-console.jpg",
        imageAlt: "SSL mixing console with audio engineer at the faders",
      },
      {
        code: "CH 03",
        title: "Beat + artist packages",
        body: "Beat selection, hook sketching, session direction, cover-art handoff, and rollout assets for independent Brooklyn artists.",
        image: "/prospects/mo-money-studios/tile-producer-lounge.jpg",
        imageAlt: "Two producers collaborating in the studio lounge with gold records on the wall",
      },
    ],
    vertical: "studio",
    expires: "2026-07-06",
  },
  "braid-haven-atl": {
    name: "Braid Haven ATL",
    shortName: "Braid Haven",
    phone: "(470) 890-7026",
    phoneHref: "tel:+147****7026",
    email: "fine.her.hair@gmail.com",
    address: "Peachtree Corners, GA",
    city: "Peachtree Corners",
    state: "GA",
    tagline: "ATL's braiding specialists. Book online, walk out flawless.",
    heroImage: "/prospects/braid-haven-atl/hero-braids.jpg",
    heroImageAlt:
      "Braid Haven ATL salon interior with a Black woman seated in a salon chair with intricate knotless braids, warm Atlanta-metro lighting",
    services: [
      {
        eyebrow: "Protective styling",
        title: "Box braids",
        copy: "Knotless or box, any length. Long-lasting, low-maintenance.",
        tag: "Any length",
        image: "/prospects/braid-haven-atl/tile-box-braids.jpg",
        imageAlt: "Black woman with long glossy box braids, neat parts at scalp",
      },
      {
        eyebrow: "Gentle install",
        title: "Knotless braids",
        copy: "Sleeker, gentler on your edges. The braid that started a movement.",
        tag: "Edge-friendly",
        image: "/prospects/braid-haven-atl/tile-knotless-braids.jpg",
        imageAlt: "Black woman with long knotless braids styled beautifully, side profile",
      },
      {
        eyebrow: "Atlanta craft",
        title: "Cornrows & feed-ins",
        copy: "Straight-backs, designs, lemonade braids. Clean parts, no shortcuts.",
        tag: "Design-ready",
        image: "/prospects/braid-haven-atl/tile-braiding-session.jpg",
        imageAlt: "Skilled braider working an intricate cornrow pattern on a client",
      },
    ],
    vertical: "salon",
    expires: "2026-07-12",
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
    // The WMI entry has vertical-specific fields (liveRoomLabel, heroKicker,
    // services with `code` field) that flow through ProspectData as untyped
    // extras. RecordingStudioPage expects RecordingStudioProspect which is
    // a stricter superset. The cast is safe because the WMI entry was
    // designed against RecordingStudioProspect originally.
    return <RecordingStudioPage prospect={prospect as unknown as Parameters<typeof RecordingStudioPage>[0]["prospect"]} />;
  }

  if (prospect.vertical === "barber") {
    return <BarbershopPage prospect={prospect as unknown as Parameters<typeof BarbershopPage>[0]["prospect"]} />;
  }

  if (prospect.vertical === "salon") {
    return <SalonPage prospect={prospect as unknown as Parameters<typeof SalonPage>[0]["prospect"]} />;
  }

  // All 14 other verticals (Bazzy 2026-06-22 refactor)
  if (prospect.vertical === "auto-repair") {
    return <AutoRepairPage prospect={prospect} />;
  }
  if (prospect.vertical === "clothing") {
    return <ClothingPage prospect={prospect} />;
  }
  if (prospect.vertical === "ecommerce") {
    return <EcommercePage prospect={prospect} />;
  }
  if (prospect.vertical === "electrical") {
    return <ElectricalPage prospect={prospect} />;
  }
  if (prospect.vertical === "health-supplements") {
    return <HealthSupplementsPage prospect={prospect} />;
  }
  if (prospect.vertical === "hvac") {
    return <HvacPage prospect={prospect} />;
  }
  if (prospect.vertical === "insurance") {
    return <InsurancePage prospect={prospect} />;
  }
  if (prospect.vertical === "law-firm") {
    return <LawFirmPage prospect={prospect} />;
  }
  if (prospect.vertical === "plumbing") {
    return <PlumbingPage prospect={prospect} />;
  }
  if (prospect.vertical === "real-estate") {
    return <RealEstatePage prospect={prospect} />;
  }
  if (prospect.vertical === "restaurant") {
    return <RestaurantPage prospect={prospect} />;
  }
  if (prospect.vertical === "roofing") {
    return <RoofingPage prospect={prospect} />;
  }
  if (prospect.vertical === "streetwear") {
    return <StreetwearPage prospect={prospect} />;
  }
  if (prospect.vertical === "tech-company") {
    return <TechCompanyPage prospect={prospect} />;
  }

  // Unknown vertical — fall back to salon as a safety net
  return <SalonPage prospect={prospect as never} />;
}
