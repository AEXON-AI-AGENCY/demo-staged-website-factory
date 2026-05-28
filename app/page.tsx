import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aexon AI — Demo Sites",
  description: "AI-built websites for local businesses. See what's possible.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-black">Aexon AI</h1>
            <p className="text-sm text-zinc-500">Website demos by vertical</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-400">Built with AI in hours</p>
            <p className="text-xs text-zinc-400">Not weeks</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-4">Built by Aexon AI</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-4 leading-tight">
            Websites That Actually<br />Convert Visitors to Clients
          </h2>
          <p className="text-lg text-zinc-600 max-w-xl mx-auto mb-10">
            See what an AI-built online presence looks like for local service businesses. Each demo is customized for its industry — not a generic template.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#demos"
              className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors"
            >
              Browse Demos
            </a>
            <a
              href="https://aexonai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-zinc-300 text-black text-sm font-medium rounded-full hover:bg-zinc-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <section id="demos" className="bg-zinc-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Plumbing */}
            <a href="/demo/plumbing" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold text-black mb-1">Plumbing Services</h3>
              <p className="text-sm text-zinc-500 mb-4">Bay Area Plumbing Co. — service page demo</p>
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: VERTICALS.plumbing.accent }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: VERTICALS.plumbing.accent }}></span>
                Featured Demo
              </div>
            </a>

            {/* HVAC */}
            <a href="/demo/hvac" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-teal-500 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">❄️</div>
              <h3 className="text-lg font-semibold text-black mb-1">HVAC Services</h3>
              <p className="text-sm text-zinc-500 mb-4">CoolPro HVAC — AC/heating service demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Electrician */}
            <a href="/demo/electrician" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-yellow-600 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-black mb-1">Electrical Services</h3>
              <p className="text-sm text-zinc-500 mb-4">Current Electric LLC — electrician demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Roofing */}
            <a href="/demo/roofer" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold text-black mb-1">Roofing Services</h3>
              <p className="text-sm text-zinc-500 mb-4">TopTier Roofing — roofing contractor demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Auto Repair */}
            <a href="/demo/auto-repair" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-red-600 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold text-black mb-1">Auto Repair</h3>
              <p className="text-sm text-zinc-500 mb-4">Westside Auto Care — mechanic shop demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Salon */}
            <a href="/demo/salon" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-pink-600 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">💇</div>
              <h3 className="text-lg font-semibold text-black mb-1">Salon & Spa</h3>
              <p className="text-sm text-zinc-500 mb-4">Glow Studio Salon — beauty salon demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Restaurant */}
            <a href="/demo/restaurant" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🍽️</div>
              <h3 className="text-lg font-semibold text-black mb-1">Restaurant & Dining</h3>
              <p className="text-sm text-zinc-500 mb-4">Mama Rosa&apos;s Italian Kitchen — restaurant demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Real Estate */}
            <a href="/demo/real-estate" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🏡</div>
              <h3 className="text-lg font-semibold text-black mb-1">Real Estate</h3>
              <p className="text-sm text-zinc-500 mb-4">Horizon Realty Group — real estate demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Law Firm */}
            <a href="/demo/law-firm" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-blue-900 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-lg font-semibold text-black mb-1">Law Firm</h3>
              <p className="text-sm text-zinc-500 mb-4">Morrison & Associates Law — legal services demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Insurance */}
            <a href="/demo/insurance" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-emerald-800 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold text-black mb-1">Insurance Agency</h3>
              <p className="text-sm text-zinc-500 mb-4">Shield Insurance Partners — insurance demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Clothing */}
            <a href="/demo/clothing" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-violet-600 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">👕</div>
              <h3 className="text-lg font-semibold text-black mb-1">Clothing Brand</h3>
              <p className="text-sm text-zinc-500 mb-4">NOIR Apparel — streetwear brand demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* Music Brand */}
            <a href="/demo/music-brand" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-red-700 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🎵</div>
              <h3 className="text-lg font-semibold text-black mb-1">Music Brand</h3>
              <p className="text-sm text-zinc-500 mb-4">Pulse Records — record label demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

            {/* E-Commerce */}
            <a href="/demo/ecommerce" className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-emerald-600 hover:shadow-lg transition-all">
              <div className="text-3xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-black mb-1">E-Commerce Store</h3>
              <p className="text-sm text-zinc-500 mb-4">Vitality Nutrition — supplement shop demo</p>
              <span className="inline-block text-xs text-zinc-400 font-medium">View Demo →</span>
            </a>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Want a website like this for your business?</h2>
          <p className="text-zinc-400 mb-8">Aexon AI builds professional websites for local businesses — fast, affordable, and optimized for lead capture.</p>
          <a
            href="https://aexonai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors"
          >
            Get Started →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 border-t border-zinc-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-zinc-400">© 2025 Aexon AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Import verticals inline since we can't import from lib in a server component easily here
const VERTICALS = {
  plumbing: { accent: "#0891B2" },
  hvac: { accent: "#0D9488" },
  electrician: { accent: "#CA8A04" },
  roofer: { accent: "#EA580C" },
  "auto-repair": { accent: "#DC2626" },
  salon: { accent: "#DB2777" },
  restaurant: { accent: "#EA580C" },
  "real-estate": { accent: "#2563EB" },
  "law-firm": { accent: "#1E3A5F" },
  insurance: { accent: "#065F46" },
  clothing: { accent: "#7C3AED" },
  "music-brand": { accent: "#B91C1C" },
  ecommerce: { accent: "#059669" },
} as const;