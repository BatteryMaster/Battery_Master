import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about zeko.pk, a fast electronics ecommerce website in Pakistan for modules, ICs, transistors, resistors, and tools.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          About zeko.pk
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">Who We Are</h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
          <p>
            zeko.pk is a modern electronics ecommerce store built for
            customers in Pakistan who need modules, ICs, transistors,
            resistors, sensors, and electronics tools in one reliable place.
          </p>

          <p>
            Our goal is to provide a fast, simple, and trustworthy online
            shopping experience for students, hobbyists, technicians, and
            electronics professionals.
          </p>

          <p>
            We are building zeko.pk with a focus on clear product
            organization, fast website performance, easy ordering, and helpful
            customer support.
          </p>

          <p>
            Whether you are working on DIY projects, learning electronics, or
            sourcing repair components, zeko.pk aims to become your trusted
            electronics partner.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}