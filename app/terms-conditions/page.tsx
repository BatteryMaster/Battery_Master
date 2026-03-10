import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms and Conditions for using Electrofy.pk and placing orders.",
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Terms & Conditions
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Terms of Use
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
          <p>
            By using Electrofy.pk, you agree to comply with our website terms,
            policies, and applicable laws.
          </p>

          <p>
            Product information, pricing, availability, and specifications may
            change without prior notice.
          </p>

          <p>
            Orders may be accepted, delayed, or cancelled depending on stock
            availability, verification, or operational circumstances.
          </p>

          <p>
            Customers are responsible for providing accurate information for
            delivery and order processing.
          </p>

          <p>
            Electrofy.pk reserves the right to update these terms at any time.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}