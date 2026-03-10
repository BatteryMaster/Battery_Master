import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description:
    "Read the Return and Refund Policy of zeko.pk for order returns and refunds.",
};

export default function ReturnRefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Return & Refund Policy
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Returns and Refunds
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
          <p>
            zeko.pk aims to provide quality products and a reliable shopping
            experience.
          </p>

          <p>
            If you receive a damaged, incorrect, or defective product, you may
            contact us within the allowed return period for assistance.
          </p>

          <p>
            Returned products should be unused where applicable and in original
            condition with packaging, unless the issue is related to defect or
            shipping damage.
          </p>

          <p>
            Refunds or replacements may be processed after review and approval
            according to the product issue and company policy.
          </p>

          <p>
            Shipping charges may be non-refundable unless the return is due to
            our mistake.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}