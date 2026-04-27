import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about zeko.pk, a fast electronics ecommerce website in Pakistan.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">About zeko.pk</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginTop: 8 }}>
            Who We Are
          </h1>
        </div>
      </div>

      <div className="wrap" style={{ padding: "48px 0 80px", maxWidth: 760 }}>
        <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "40px 36px" }}>
          <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.85, marginBottom: 20 }}>
            zeko.pk is a modern electronics ecommerce store built for customers in Pakistan who need modules, ICs, transistors, resistors, sensors, and electronics tools — all in one reliable place.
          </p>
          <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.85, marginBottom: 20 }}>
            Our goal is to provide a fast, simple, and trustworthy online shopping experience for students, hobbyists, technicians, and electronics professionals.
          </p>
          <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.85, marginBottom: 20 }}>
            We are building zeko.pk with a focus on clear product organization, fast website performance, easy ordering, and helpful customer support.
          </p>
          <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.85 }}>
            Whether you are working on DIY projects, learning electronics, or sourcing repair components — zeko.pk is your trusted electronics partner in Pakistan.
          </p>

          <div style={{ marginTop: 36, paddingTop: 32, borderTop: "1.5px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 20 }}>
            {[
              { icon: "📍", label: "Location", val: "Saddar, Karachi" },
              { icon: "📞", label: "Phone",    val: "03150220243" },
              { icon: "📧", label: "Email",    val: "hussamm621@gmail.com" },
              { icon: "🕐", label: "Hours",    val: "Mon–Sat 10am–8pm" },
            ].map(x => (
              <div key={x.label}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{x.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 4 }}>{x.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>{x.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <Link href="/shop" className="btn btn-primary btn-md">Browse Shop →</Link>
          <a href="https://wa.me/923150220243" target="_blank" rel="noopener noreferrer" className="btn btn-green btn-md">📱 WhatsApp</a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
