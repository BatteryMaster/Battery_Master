import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Buy Electronics Components Online in Pakistan – Modules, ICs, Tools",
  description:
    "zeko.pk is Pakistan's trusted electronics store. Buy Arduino modules, ICs, transistors, resistors, sensors and tools online with WhatsApp ordering. Based in Saddar Karachi.",
  alternates: {
    canonical: "https://zeko.pk",
  },
  openGraph: {
    title: "Buy Electronics Components Online in Pakistan – zeko.pk",
    description:
      "Pakistan's trusted electronics store. Modules, ICs, transistors, resistors and tools with WhatsApp ordering.",
    url: "https://zeko.pk",
    type: "website",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "zeko.pk",
  url: "https://zeko.pk",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://zeko.pk/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ElectronicsStore",
  name: "zeko.pk",
  url: "https://zeko.pk",
  logo: "https://zeko.pk/logo.png",
  image: "https://zeko.pk/og-image.jpg",
  description:
    "zeko.pk is an electronics ecommerce store in Pakistan. We sell modules, ICs, transistors, resistors, sensors, and tools.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop no G 1 A National Radio TV Market, near Regal Chowk, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74400",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.8607,
    longitude: 67.0011,
  },
  telephone: "+923150220243",
  email: "hussamm621@gmail.com",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  priceRange: "Rs. 25 – Rs. 5000",
  paymentAccepted: "Cash, Bank Transfer",
  currenciesAccepted: "PKR",
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+923150220243",
    contactType: "customer service",
    areaServed: "PK",
    availableLanguage: ["en", "ur"],
    contactOption: "TollFree",
  },
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
        text: "Browse products, add to cart, fill in your details at checkout, and your order is sent directly via WhatsApp for fast confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "Does zeko.pk deliver across Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, zeko.pk delivers electronics components across Pakistan including Karachi, Lahore, Islamabad, and all major cities.",
      },
    },
    {
      "@type": "Question",
      name: "What electronics components does zeko.pk sell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "zeko.pk sells Arduino modules, relay modules, ICs (NE555, LM358), transistors (BC547), resistors, digital multimeters, soldering irons, and more electronics tools.",
      },
    },
    {
      "@type": "Question",
      name: "Where is zeko.pk located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "zeko.pk is located at Shop G1A, National Radio TV Market, near Regal Chowk, Saddar, Karachi, Pakistan.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://zeko.pk",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      {/* HERO */}
      <section
        aria-label="Hero – Electronics Store Pakistan"
        className="bg-linear-to-b from-blue-50 via-white to-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-bold uppercase tracking-widest text-blue-700">
              Pakistan&apos;s Electronics Store
            </p>

            {/* H1 – most important SEO tag */}
            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              Buy Electronics Components Online in
              <span className="block text-blue-600"> Pakistan</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Shop <strong>Arduino modules</strong>, <strong>ICs</strong>,{" "}
              <strong>transistors</strong>, <strong>resistors</strong>, sensors and tools
              with confidence. zeko.pk is built for students, engineers and hobbyists
              across Pakistan.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="rounded-2xl border border-gray-300 px-6 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                Browse Categories
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-gray-900">Fast</p>
                <p className="mt-1 text-sm text-gray-600">Optimized website experience</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-gray-900">Trusted</p>
                <p className="mt-1 text-sm text-gray-600">Reliable electronics shopping</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-gray-900">Easy</p>
                <p className="mt-1 text-sm text-gray-600">WhatsApp order flow</p>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-blue-100 bg-white p-8 shadow-xl">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-blue-600 p-5 text-white">
                <h2 className="text-2xl font-bold">Why choose zeko.pk?</h2>
                <p className="mt-2 text-blue-100">
                  Built specially for electronics buyers in Pakistan.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-bold text-gray-900">Electronics Focused</h3>
                <p className="mt-2 text-gray-600">
                  Modules, ICs, transistors, resistors and tools in one store.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-bold text-gray-900">Fast Experience</h3>
                <p className="mt-2 text-gray-600">
                  Clean structure and lightweight UI for better performance.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-bold text-gray-900">Easy Ordering</h3>
                <p className="mt-2 text-gray-600">
                  Cart, checkout and WhatsApp ordering for a smooth process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section aria-label="Electronics Product Categories" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Electronics Categories
            </h2>
            <p className="mt-2 text-gray-600">
              Browse modules, ICs, transistors, resistors and tools by category.
            </p>
          </div>
          <Link
            href="/categories"
            className="rounded-2xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { name: "Modules", desc: "Relay modules, Arduino modules, and useful boards.", href: "/categories/modules" },
            { name: "ICs", desc: "Common and important integrated circuits.", href: "/categories/ics" },
            { name: "Transistors", desc: "Essential switching and amplification parts.", href: "/categories/transistors" },
            { name: "Resistors", desc: "Different resistor values and useful packs.", href: "/categories/resistors" },
            { name: "Tools", desc: "Soldering, measuring, cutting and repair tools.", href: "/categories/tools" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold">{cat.name}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section aria-label="Featured Electronics Products" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-600">
              Popular electronics components available in Pakistan.
            </p>
          </div>
          <Link
            href="/shop"
            className="rounded-2xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            View All Products
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              stock={product.stock}
              image={product.image}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section aria-label="Why Choose zeko.pk" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900">
            Why Buy Electronics from zeko.pk?
          </h2>
          <p className="mt-2 text-gray-600">
            zeko.pk is built to make electronics shopping easier, faster and more reliable
            across Pakistan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              num: "1",
              title: "Focused Electronics Store",
              desc: "Specially designed for electronics components, modules, repair parts and tools. No clutter – just the parts you need.",
            },
            {
              num: "2",
              title: "Fast WhatsApp Ordering",
              desc: "Browse products, add to cart, review your order and send it directly on WhatsApp for fast confirmation and delivery.",
            },
            {
              num: "3",
              title: "Built for Pakistan",
              desc: "Based in Saddar Karachi. Designed for local customers with local support and a smooth electronics buying experience.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
                {item.num}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section aria-label="How to Order from zeko.pk" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900">How to Order Electronics Online</h2>
          <p className="mt-2 text-gray-600">Order in just 4 simple steps from anywhere in Pakistan.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "Step 1", title: "Browse Products", desc: "Explore categories, search products and open product details." },
            { step: "Step 2", title: "Add to Cart", desc: "Select the products you need and review them inside your cart." },
            { step: "Step 3", title: "Fill Checkout", desc: "Enter your name, phone, city, address and any order notes." },
            { step: "Step 4", title: "Send on WhatsApp", desc: "Your order details open directly in WhatsApp for fast confirmation." },
          ].map((item) => (
            <div key={item.step} className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">{item.step}</p>
              <h3 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently Asked Questions" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "How do I order from zeko.pk?",
              a: "Browse products, add to cart, fill in your details at checkout, and your order is sent directly via WhatsApp for fast confirmation.",
            },
            {
              q: "Does zeko.pk deliver across Pakistan?",
              a: "Yes, we deliver electronics components across Pakistan including Karachi, Lahore, Islamabad and all major cities.",
            },
            {
              q: "What electronics components does zeko.pk sell?",
              a: "We sell Arduino modules, relay modules, ICs (NE555, LM358), transistors (BC547), resistors, digital multimeters, soldering irons and more.",
            },
            {
              q: "Where is zeko.pk located?",
              a: "Shop G1A, National Radio TV Market, near Regal Chowk, Saddar, Karachi, Pakistan.",
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="font-bold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-4xl bg-blue-600 px-6 py-10 text-white shadow-xl sm:px-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
                Order Electronics Online – Pakistan
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Fast electronics delivery across Pakistan
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Browse components, tools and modules with confidence. Contact us or send
                your order directly through WhatsApp.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="rounded-2xl bg-white px-6 py-3.5 text-center font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Start Shopping
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-white/40 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
              >
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
