import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy of zeko.pk to understand how customer information is handled.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Privacy Policy
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Your Privacy Matters
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
          <p>
            zeko.pk respects your privacy and is committed to protecting
            your personal information.
          </p>

          <p>
            We may collect customer information such as name, phone number,
            email address, delivery address, and order details to process and
            fulfill orders.
          </p>

          <p>
            Your information is used only for order processing, customer
            communication, service improvement, and related business purposes.
          </p>

          <p>
            We do not sell customer personal information to third parties.
          </p>

          <p>
            By using zeko.pk, you agree to the collection and use of
            information as described in this policy.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}