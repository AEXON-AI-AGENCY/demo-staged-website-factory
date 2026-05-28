import { notFound } from "next/navigation";
import { VERTICALS } from "../../../lib/verticals";
import type { VerticalId } from "../../../lib/verticals";

export async function generateStaticParams() {
  return Object.keys(VERTICALS).map((id) => ({ vertical: id }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const data = VERTICALS[vertical as VerticalId];

  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div
        className="text-white text-xs font-medium py-2 px-6 flex items-center justify-between"
        style={{ backgroundColor: data.accent }}
      >
        <span>{data.name}</span>
        <a href="/" className="underline hover:no-underline">← All Demos</a>
      </div>

      {/* Hero */}
      <section className="bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-3">
            {data.industry} — Demo Site
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold text-black mb-3 leading-tight"
          >
            {data.name}
          </h1>
          <p className="text-lg text-zinc-600 mb-8">{data.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#services"
              className="px-6 py-3 text-white text-sm font-medium rounded-full transition-opacity"
              style={{ backgroundColor: data.accent }}
            >
              {data.cta}
            </a>
            <a
              href={`tel:${data.phone.replace(/\D/g, "")}`}
              className="px-6 py-3 border border-zinc-300 text-black text-sm font-medium rounded-full hover:bg-zinc-50 transition-colors"
            >
              📞 {data.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <div className="border-b border-zinc-200 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-zinc-500 text-xs uppercase tracking-wide">Location</span>
            <p className="text-black font-medium">{data.location}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs uppercase tracking-wide">Hours</span>
            <p className="text-black font-medium">{data.hours}</p>
          </div>
          <div>
            <span className="text-zinc-500 text-xs uppercase tracking-wide">Contact</span>
            <p className="text-black font-medium">{data.phone}</p>
            <p className="text-zinc-600 text-xs">{data.email}</p>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-black mb-4">About Us</h2>
          <p className="text-zinc-600 leading-relaxed text-lg">{data.about}</p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-black mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.services.map((service) => (
              <div
                key={service}
                className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center gap-4"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: data.accent }}
                />
                <span className="text-black font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white"
        style={{ backgroundColor: data.accent }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-3">{data.cta}</h2>
          <p className="text-white/80 mb-8">{data.cta_sub}</p>
          <a
            href={`tel:${data.phone.replace(/\D/g, "")}`}
            className="inline-block px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-100 transition-colors"
          >
            📞 Call {data.phone}
          </a>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-black mb-6">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-zinc-600 text-sm mb-2">Address</p>
              <p className="text-black font-medium">{data.address}</p>
            </div>
            <div>
              <p className="text-zinc-600 text-sm mb-2">Phone</p>
              <p className="text-black font-medium">{data.phone}</p>
            </div>
            <div>
              <p className="text-zinc-600 text-sm mb-2">Email</p>
              <p className="text-black font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-zinc-600 text-sm mb-2">Hours</p>
              <p className="text-black font-medium">{data.hours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo badge */}
      <div className="bg-zinc-100 border-t border-zinc-200 py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            This is a demo site built by{" "}
            <a
              href="https://aexonai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Aexon AI
            </a>{" "}
            — not a real business.
          </p>
          <a
            href="/"
            className="text-xs text-zinc-500 hover:text-black transition-colors"
          >
            ← Back to demos
          </a>
        </div>
      </div>
    </div>
  );
}