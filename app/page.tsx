import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSlider from "@/components/ProductSlider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { featuredProducts, allProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Buy Electronics Components Online in Pakistan – Modules, ICs, Tools",
  description:
    "zeko.pk is Pakistan's trusted electronics store. Buy Arduino modules, ICs, transistors, resistors, sensors and tools online. Based in Saddar Karachi.",
  alternates: { canonical: "https://zeko.pk" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: "zeko.pk",
  url: "https://zeko.pk",
  logo: "https://zeko.pk/logo.png",
  description: "Electronics ecommerce store in Pakistan – modules, ICs, transistors, resistors, sensors, tools.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop no G 1 A National Radio TV Market, near Regal Chowk, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  telephone: "+923150220243",
  email: "hussamm621@gmail.com",
  priceRange: "Rs. 25 – Rs. 5000",
  areaServed: { "@type": "Country", name: "Pakistan" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I order from zeko.pk?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Browse products, add to cart, fill in your details at checkout. Order is confirmed and our team contacts you on WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Does zeko.pk deliver across Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, zeko.pk delivers electronics across Pakistan including Karachi, Lahore, Islamabad and all major cities.",
      },
    },
    {
      "@type": "Question",
      name: "What electronics does zeko.pk sell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arduino modules, relay modules, ICs (NE555, LM358), transistors (BC547), resistors, digital multimeters, soldering irons and more.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />
      <WhatsAppButton />

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-bold uppercase tracking-widest text-blue-700">
              Pakistan&apos;s Electronics Store
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Buy Electronics Components Online in
              <span className="block text-blue-600">Pakistan</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Shop <strong>Arduino modules</strong>, <strong>ICs</strong>,{" "}
              <strong>transistors</strong>, <strong>resistors</strong>, sensors and tools.
              Fast delivery across Pakistan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop" className="rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Shop Now
              </Link>
              <Link href="/categories" className="rounded-2xl border border-gray-300 px-6 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-100">
                Browse Categories
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Fast", desc: "Optimized experience" },
                { title: "Trusted", desc: "Reliable store" },
                { title: "Easy", desc: "Simple ordering" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="text-xl font-black text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-blue-600 p-5 text-white">
                <h2 className="text-2xl font-bold">Why choose zeko.pk?</h2>
                <p className="mt-2 text-blue-100">Built for electronics buyers in Pakistan.</p>
              </div>
              {[
                { title: "Electronics Focused", desc: "Modules, ICs, transistors, resistors and tools in one store." },
                { title: "Fast Experience", desc: "Clean structure and lightweight UI for better performance." },
                { title: "Easy Ordering", desc: "Add to cart, checkout on website – no app needed." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SLIDER */}
      <ProductSlider products={allProducts} />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Browse Categories</h2>
            <p className="mt-1 text-gray-500">Find what you need quickly</p>
          </div>
          <Link href="/categories" className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            View All
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { name: "Modules", desc: "Arduino, relay modules", href: "/categories/modules" },
            { name: "ICs", desc: "Integrated circuits", href: "/categories/ics" },
            { name: "Transistors", desc: "NPN, PNP transistors", href: "/categories/transistors" },
            { name: "Resistors", desc: "Resistor packs & values", href: "/categories/resistors" },
            { name: "Tools", desc: "Soldering, measuring", href: "/categories/tools" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.href} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="font-bold text-gray-900">{cat.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{cat.desc}</p>
              <p className="mt-3 text-sm font-semibold text-blue-600">Browse →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Popular Products</h2>
            <p className="mt-1 text-gray-500">Top selling electronics in Pakistan</p>
          </div>
          <Link href="/shop" className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            View All
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-3xl font-black text-gray-900">How to Order</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { step: "1", title: "Browse", desc: "Find your electronics components" },
            { step: "2", title: "Add to Cart", desc: "Select products and quantities" },
            { step: "3", title: "Checkout", desc: "Fill name, address, payment" },
            { step: "4", title: "Confirm", desc: "We call you to confirm order" },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                {item.step}
              </div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-3xl font-black text-gray-900">FAQs</h2>
        <div className="space-y-3">
          {[
            { q: "How do I order from zeko.pk?", a: "Add products to cart, go to checkout, fill your details. We confirm via WhatsApp." },
            { q: "Do you deliver across Pakistan?", a: "Yes! We deliver to Karachi, Lahore, Islamabad and all major cities." },
            { q: "What is the delivery fee?", a: "Flat Rs. 250 delivery fee for all orders across Pakistan." },
            { q: "Where are you located?", a: "Shop G1A, National Radio TV Market, Saddar Karachi." },
          ].map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-blue-600 px-8 py-10 text-white shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-3xl font-black">Ready to order electronics?</h2>
              <p className="mt-3 text-lg text-blue-100">Fast delivery across Pakistan. Cash on delivery available.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="rounded-2xl bg-white px-6 py-3.5 text-center font-semibold text-blue-700 hover:bg-blue-50">
                Start Shopping
              </Link>
              <Link href="/contact" className="rounded-2xl border border-white/40 px-6 py-3.5 text-center font-semibold text-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
