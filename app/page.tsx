import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSlider from "@/components/ProductSlider";
import WhatsAppButton from "@/components/WhatsAppButton";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import { featuredProducts, allProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Buy Electronics Components Online in Pakistan – Modules, ICs, Tools",
  description:
    "zeko.pk – Pakistan's premium electronics store. Buy Arduino modules, ICs, transistors, resistors, sensors and tools online. Fast delivery. Based in Saddar Karachi.",
  alternates: { canonical: "https://zeko.pk" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: "zeko.pk",
  url: "https://zeko.pk",
  logo: "https://zeko.pk/logo.png",
  description: "Pakistan's premium electronics store – modules, ICs, transistors, resistors, sensors, tools.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop no G 1 A National Radio TV Market, near Regal Chowk, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  telephone: "+923150220243",
  priceRange: "Rs. 25 – Rs. 5000",
  areaServed: { "@type": "Country", name: "Pakistan" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "72",
    bestRating: "5",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden" style={{ background: "white" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <Header />
      <WhatsAppButton />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FDFAF4 0%, #FFF8EE 50%, #FDFAF4 100%)",
          minHeight: "90vh",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }}
        />

        {/* Floating dots pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                background: "#C9A84C",
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 23 + 10) % 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          {/* LEFT */}
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#A07830",
              }}
            >
              <span className="animate-pulse-gold h-1.5 w-1.5 rounded-full" style={{ background: "#C9A84C" }} />
              Pakistan&apos;s Premium Electronics Store
            </div>

            <h1 className="font-display text-4xl font-black leading-tight text-[#1A1A1A] sm:text-5xl md:text-6xl">
              Buy Electronics
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Components
              </span>
              Online in Pakistan
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#6B6560]">
              Shop <strong className="text-[#1A1A1A]">Arduino modules</strong>,{" "}
              <strong className="text-[#1A1A1A]">ICs</strong>,{" "}
              <strong className="text-[#1A1A1A]">transistors</strong>,{" "}
              <strong className="text-[#1A1A1A]">resistors</strong> and tools.
              Fast delivery across Pakistan.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
                  boxShadow: "0 6px 30px rgba(201,168,76,0.4)",
                }}
              >
                Shop Now
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold transition-all hover:bg-[#F5F0E8]"
                style={{
                  border: "2px solid rgba(201,168,76,0.4)",
                  color: "#A07830",
                }}
              >
                Browse Categories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { icon: "🚀", label: "Fast Delivery" },
                { icon: "✅", label: "Genuine Parts" },
                { icon: "💬", label: "WhatsApp Support" },
                { icon: "🏆", label: "5 Star Rated" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    background: "white",
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "#4A4540",
                    boxShadow: "0 2px 10px rgba(201,168,76,0.1)",
                  }}
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – Floating card */}
          <div className="relative">
            <div
              className="relative rounded-3xl p-8"
              style={{
                background: "white",
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow: "0 30px 80px rgba(201,168,76,0.15)",
              }}
            >
              {/* Spinning gold ring */}
              <div
                className="animate-spin-slow absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-20"
                style={{ border: "3px dashed #C9A84C" }}
              />

              <div
                className="mb-6 rounded-2xl p-5"
                style={{ background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)" }}
              >
                <h2 className="font-display text-xl font-black text-white">Why Choose zeko.pk?</h2>
                <p className="mt-1 text-sm text-white/80">Built for electronics buyers in Pakistan</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: "⚡", title: "Premium Quality", desc: "Genuine components, tested and verified" },
                  { icon: "📦", title: "Fast Nationwide Delivery", desc: "Karachi, Lahore, Islamabad + all cities" },
                  { icon: "💎", title: "Best Prices", desc: "Competitive pricing, no compromise on quality" },
                  { icon: "🛡️", title: "Easy Returns", desc: "Hassle-free return & refund policy" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{item.title}</p>
                      <p className="text-sm text-[#6B6560]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 30C480 60 240 0 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── PRODUCT SLIDER ── */}
      <ProductSlider products={allProducts} />

      {/* ── CATEGORIES ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
            ✦ Browse By Category ✦
          </p>
          <h2 className="font-display text-4xl font-black text-[#1A1A1A]">Shop Our Categories</h2>
          <div className="mx-auto mt-4 h-0.5 w-24" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { name: "Modules", desc: "Arduino, relay boards", href: "/categories/modules", icon: "🔌" },
            { name: "ICs", desc: "Integrated circuits", href: "/categories/ics", icon: "🔬" },
            { name: "Transistors", desc: "NPN & PNP types", href: "/categories/transistors", icon: "⚡" },
            { name: "Resistors", desc: "All values & packs", href: "/categories/resistors", icon: "🔩" },
            { name: "Tools", desc: "Soldering & more", href: "/categories/tools", icon: "🔧" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "white",
                border: "1px solid rgba(201,168,76,0.2)",
                boxShadow: "0 2px 20px rgba(201,168,76,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(201,168,76,0.2)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 20px rgba(201,168,76,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
              }}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: "#FDFAF4" }}>
                {cat.icon}
              </div>
              <h3 className="font-display font-bold text-[#1A1A1A]">{cat.name}</h3>
              <p className="mt-1 text-xs text-[#6B6560]">{cat.desc}</p>
              <p className="mt-3 text-xs font-semibold" style={{ color: "#C9A84C" }}>Browse →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-16" style={{ background: "#FDFAF4" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
                ✦ Top Picks ✦
              </p>
              <h2 className="font-display text-4xl font-black text-[#1A1A1A]">Popular Products</h2>
            </div>
            <Link
              href="/shop"
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:shadow-md"
              style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#A07830" }}
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── HOW TO ORDER ── */}
      <section className="py-16" style={{ background: "white" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
              ✦ Simple Process ✦
            </p>
            <h2 className="font-display text-4xl font-black text-[#1A1A1A]">How to Order</h2>
            <div className="mx-auto mt-4 h-0.5 w-24" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Browse", desc: "Find electronics components from our curated collection" },
              { step: "02", title: "Add to Cart", desc: "Select products and quantities you need" },
              { step: "03", title: "Checkout", desc: "Fill your details – name, address, payment method" },
              { step: "04", title: "Confirmed!", desc: "Order saved, we contact you to confirm delivery" },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative rounded-3xl p-6"
                style={{
                  background: "#FDFAF4",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                {i < 3 && (
                  <div
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl md:block"
                    style={{ color: "#C9A84C" }}
                  >
                    →
                  </div>
                )}
                <p
                  className="font-display mb-3 text-4xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.step}
                </p>
                <h3 className="font-display text-lg font-black text-[#1A1A1A]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6B6560]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <LocationSection />

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: "#FDFAF4" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {/* Gold glow */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: "radial-gradient(circle at 50% 50%, #C9A84C, transparent 70%)" }}
            />

            <p className="relative mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
              ✦ Ready to Order? ✦
            </p>
            <h2 className="relative font-display text-4xl font-black text-white sm:text-5xl">
              Start Shopping Today
            </h2>
            <p className="relative mt-4 text-lg text-[#9B9490]">
              Fast delivery · Genuine parts · Cash on delivery · WhatsApp support
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-[#1A1A1A] transition-all hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
                  boxShadow: "0 6px 30px rgba(201,168,76,0.5)",
                }}
              >
                Browse All Products ✦
              </Link>
              <a
                href="https://wa.me/923150220243"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
