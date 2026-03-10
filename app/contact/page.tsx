import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact zeko.pk for support, product inquiries, and order assistance in Pakistan.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Contact zeko.pk
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">Get in Touch</h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
          <p>
            If you have questions about products, orders, availability, or
            support, feel free to contact us.
          </p>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
            <div className="mt-4 space-y-3">
              <p>
                <span className="font-semibold text-gray-900">Website:</span>{" "}
                zeko.pk
              </p>
              <p>
                <span className="font-semibold text-gray-900">Email:</span>{" "}
                hussamm621@gmail.com
              </p>
              <p>
                <span className="font-semibold text-gray-900">WhatsApp:</span>{" "}
                03150220243
              </p>
              <p>
                <span className="font-semibold text-gray-900">Location:</span>{" "}
                Shop no G 1 A National Radio Tv Market near regal chowk Saddar Karachi, Pakistan
              </p>
            </div>
          </div>

          <p>
            We aim to respond to customer queries as quickly as possible during
            working hours.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}