import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy of batterymaster.pk to understand how customer information is handled.",
};

const PARAS = [
  "batterymaster.pk respects your privacy and is committed to protecting your personal information.",
  "We may collect customer information such as name, phone number, email address, delivery address, and order details to process and fulfill orders.",
  "Your information is used only for order processing, customer communication, service improvement, and related business purposes.",
  "We do not sell customer personal information to third parties.",
  "By using batterymaster.pk, you agree to the collection and use of information as described in this policy.",
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">Privacy Policy</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginTop: 8 }}>Your Privacy Matters</h1>
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
