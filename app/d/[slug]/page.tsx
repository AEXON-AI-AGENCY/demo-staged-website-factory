import { notFound } from "next/navigation";
import SalonPage, {
  DEFAULT_SALON_PROSPECT,
  type ProspectData,
} from "../../salon/page";
import BarbershopPage from "../../barbershop/page";

const PROSPECTS: Record<string, ProspectData & { expires: string }> = {
  "ani-african-hair-braiding": {
    name: "Ani African Hair Braiding",
    phone: "(602) 555-0199",
    phoneHref: "tel:+16025550199",
    email: "aniafricanhairbraiding@gmail.com",
    city: "Phoenix",
    state: "AZ",
    address: "Phoenix, AZ",
    vertical: "salon",
    heroImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
    services: [
      {
        eyebrow: "Protective styling",
        title: "Box Braids",
        copy: "Knotless or box, any length. Long-lasting, low-maintenance.",
        tag: "Any length",
        image:
          "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        eyebrow: "Gentle install",
        title: "Knotless Braids",
        copy: "Sleeker, gentler on your edges. The braid that started a movement.",
        tag: "Edge-friendly",
        image:
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
      },
      {
        eyebrow: "Clean parts",
        title: "Cornrows & Twists",
        copy: "Straight-backs, designs, lemonade braids. Clean parts, no shortcuts.",
        tag: "Design-ready",
        image:
          "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    expires: "2026-06-20",
  },
  "bayside-barbershop": {
    name: "Bayside Barbershop",
    phone: "(718) 555-0100",
    phoneHref: "tel:+17185550100",
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
    phoneHref: "tel:+12125550123",
    email: "hello@glowstudiosalon.com",
    city: "New York",
    state: "NY",
    address: "18 Mercer Row, Studio 4, New York, NY",
    tagline: "Quiet luxury beauty studio",
    expires: "2026-06-20",
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

  if (prospect.vertical === "barber") {
    return <BarbershopPage prospect={prospect} />;
  }

  return <SalonPage prospect={prospect} />;
}
