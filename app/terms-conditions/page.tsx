import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Terms and Conditions for using Zeko.pk and placing orders.",
};

const PARAS = [
  "By using Zeko.pk, you agree to comply with our website terms, policies, and applicable laws.",
  "All orders placed on zeko.pk are subject to availability and confirmation. We reserve the right to cancel orders in exceptional circumstances.",
  "Prices listed on the website are in Pakistani Rupees and are subject to change without prior notice.",
  "Customers are responsible for providing accurate delivery information. zeko.pk is not liable for delivery failures due to incorrect address details.",
  "Any disputes arising from transactions on zeko.pk will be handled in accordance with Pakistani law.",
];

export default function TermsConditionsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">Terms & Conditions</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginTop: 8 }}>Terms of Use</h1>
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
