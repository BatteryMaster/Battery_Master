import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopPageContent from "@/components/ShopPageContent";

export const metadata: Metadata = {
  title: "Shop Electronics Products",
  description:
    "Browse all electronics products at Electrofy.pk including modules, ICs, transistors, resistors, and tools in Pakistan.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Electrofy.pk Shop
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Explore All Products
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Browse electronics modules, ICs, transistors, resistors, and tools in one place.
          </p>
        </div>

        <ShopPageContent />
      </section>

      <Footer />
    </main>
  );
}