import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import WebsiteSchema from "@/components/WebsiteSchema";
import { featuredProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Electrofy.pk - Electronics Components, Modules, ICs & Tools in Pakistan",
  description:
    "Buy electronics modules, ICs, transistors, resistors, and tools from Electrofy.pk with a fast and professional shopping experience in Pakistan.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <WebsiteSchema />
      <Header />

      <section className="bg-linear-to-b from-blue-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-bold uppercase tracking-widest text-blue-700">
              Welcome to Electrofy.pk
            </p>

            <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              Fast, Reliable
              <span className="block text-blue-600">
                Electronics Components
              </span>
              for Pakistan
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Shop modules, ICs, transistors, resistors, sensors, and tools with
              confidence. Electrofy.pk is built for speed, trust, and smooth
              shopping experience.
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
                <p className="mt-1 text-sm text-gray-600">
                  Optimized website experience
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-gray-900">Trusted</p>
                <p className="mt-1 text-sm text-gray-600">
                  Reliable electronics shopping
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-gray-900">Easy</p>
                <p className="mt-1 text-sm text-gray-600">
                  WhatsApp order flow
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-blue-100 bg-white p-8 shadow-xl">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-blue-600 p-5 text-white">
                <h3 className="text-2xl font-bold">Why choose Electrofy.pk?</h3>
                <p className="mt-2 text-blue-100">
                  Built specially for electronics buyers in Pakistan.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-bold text-gray-900">Electronics Focused</h4>
                <p className="mt-2 text-gray-600">
                  Modules, ICs, transistors, resistors, and tools in one store.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-bold text-gray-900">Fast Experience</h4>
                <p className="mt-2 text-gray-600">
                  Clean structure and lightweight UI for better performance.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-bold text-gray-900">Easy Ordering</h4>
                <p className="mt-2 text-gray-600">
                  Cart, checkout, and WhatsApp ordering for a smooth process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black text-gray-900">
              Popular Categories
            </h3>
            <p className="mt-2 text-gray-600">
              Explore the most important electronics product groups.
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
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-lg font-bold">Modules</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Relay modules, Arduino modules, and useful boards.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-lg font-bold">ICs</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Common and important integrated circuits.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-lg font-bold">Transistors</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Essential switching and amplification parts.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-lg font-bold">Resistors</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Different resistor values and useful packs.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-lg font-bold">Tools</h4>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Soldering, measuring, cutting, and repair tools.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black text-gray-900">
              Featured Products
            </h3>
            <p className="mt-2 text-gray-600">
              Highlighted products for your homepage display.
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h3 className="text-3xl font-black text-gray-900">Why Choose Us</h3>
          <p className="mt-2 text-gray-600">
            Electrofy.pk is built to make electronics shopping easier, faster,
            and more reliable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
              1
            </div>
            <h4 className="text-xl font-bold text-gray-900">Focused Store</h4>
            <p className="mt-3 leading-7 text-gray-600">
              A store specially designed for electronics components, modules,
              repair parts, and tools.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
              2
            </div>
            <h4 className="text-xl font-bold text-gray-900">Fast Ordering</h4>
            <p className="mt-3 leading-7 text-gray-600">
              Browse products, add to cart, review your order, and send it
              directly on WhatsApp.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
              3
            </div>
            <h4 className="text-xl font-bold text-gray-900">
              Built for Pakistan
            </h4>
            <p className="mt-3 leading-7 text-gray-600">
              Designed for local customers, local support, and a smooth
              electronics buying experience.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h3 className="text-3xl font-black text-gray-900">How to Order</h3>
          <p className="mt-2 text-gray-600">
            Start your order in just a few simple steps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Step 1
            </p>
            <h4 className="mt-3 text-xl font-bold text-gray-900">
              Browse Products
            </h4>
            <p className="mt-3 leading-7 text-gray-600">
              Explore categories, search products, and open product details.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Step 2
            </p>
            <h4 className="mt-3 text-xl font-bold text-gray-900">
              Add to Cart
            </h4>
            <p className="mt-3 leading-7 text-gray-600">
              Select the products you need and review them inside your cart.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Step 3
            </p>
            <h4 className="mt-3 text-xl font-bold text-gray-900">
              Fill Checkout
            </h4>
            <p className="mt-3 leading-7 text-gray-600">
              Enter your name, phone, city, address, and any order notes.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Step 4
            </p>
            <h4 className="mt-3 text-xl font-bold text-gray-900">
              Send on WhatsApp
            </h4>
            <p className="mt-3 leading-7 text-gray-600">
              Your order details open directly in WhatsApp for fast
              confirmation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-4xl bg-blue-600 px-6 py-10 text-white shadow-xl sm:px-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
                Need help with your order?
              </p>
              <h3 className="mt-3 text-3xl font-black md:text-4xl">
                Fast support for electronics buyers across Pakistan
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Browse components, tools, and modules with confidence. If you
                need help, contact us or send your order directly through
                WhatsApp.
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