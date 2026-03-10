import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: "Browse Electronics Categories",
  description:
    "Explore electronics categories at zeko.pk including modules, ICs, transistors, resistors, and tools.",
};

const categoryList = [
  {
    name: "Modules",
    description: "Arduino modules, relay modules, sensor modules, and more.",
  },
  {
    name: "ICs",
    description: "Integrated circuits for electronics repair and new projects.",
  },
  {
    name: "Transistors",
    description: "Common transistor options for switching and amplification.",
  },
  {
    name: "Resistors",
    description: "Useful resistor packs and values for electronics work.",
  },
  {
    name: "Tools",
    description: "Soldering tools, multimeters, cutters, and accessories.",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            zeko.pk Categories
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Browse Product Categories
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Explore product groups and quickly find the electronics parts and tools you need.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              description={category.description}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}