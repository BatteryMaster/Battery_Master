import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Read the Return and Refund Policy of zeko.pk for order returns and refunds.",
};

const PARAS = [
  "zeko.pk aims to provide quality products and a reliable shopping experience.",
  "If you receive a damaged, incorrect, or defective product, you may contact us within 7 days of delivery for assistance.",
  "Returned products should be unused where applicable and in original condition with packaging, unless the issue is related to defect or shipping damage.",
  "Refunds or replacements may be processed after review and approval according to the product issue and company policy.",
  "Shipping charges may be non-refundable unless the return is due to our mistake.",
];

export default function ReturnRefundPolicyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">Return & Refund Policy</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginTop: 8 }}>Returns and Refunds</h1>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop:"40px", paddingBottom:"80px", maxWidth: 760 }}>
        <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "36px" }}>
          {PARAS.map((p, i) => <p key={i} style={{ fontSize: 15, color: "var(--t2)", lineHeight: 1.85, marginBottom: i < PARAS.length - 1 ? 18 : 0 }}>{p}</p>)}
        </div>
      </div>
      <Footer />
    </main>
  );
}
