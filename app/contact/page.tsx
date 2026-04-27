import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact zeko.pk for support, product inquiries, and order assistance in Pakistan.",
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">Contact zeko.pk</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginTop: 8 }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: 15, color: "var(--t2)", marginTop: 10 }}>
            Questions, orders, or support — we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ padding: "40px 0 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900 }}>

          {/* Contact cards */}
          {[
            { icon: "📞", title: "Phone / WhatsApp", info: "03150220243", sub: "Call or WhatsApp anytime", href: "https://wa.me/923150220243", cta: "Chat on WhatsApp", ctaClass: "btn-green" },
            { icon: "📧", title: "Email", info: "hussamm621@gmail.com", sub: "We reply within 24 hours", href: "mailto:hussamm621@gmail.com", cta: "Send Email", ctaClass: "btn-outline" },
            { icon: "📍", title: "Our Location", info: "Shop G1A, National Radio & TV Market", sub: "Near Regal Chowk, Saddar, Karachi", href: null, cta: null, ctaClass: "" },
            { icon: "🕐", title: "Working Hours", info: "Mon – Sat: 10am – 8pm", sub: "Sunday: 12pm – 6pm", href: null, cta: null, ctaClass: "" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "28px 24px" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--t1)", marginBottom: 4 }}>{c.info}</div>
              <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: c.cta ? 18 : 0 }}>{c.sub}</div>
              {c.cta && c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className={`btn ${c.ctaClass} btn-sm`}>{c.cta}</a>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, background: "linear-gradient(135deg,#1a3fc4,#0f2885)", borderRadius: "var(--r-lg)", padding: "32px 28px", maxWidth: 900, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Ready to order?</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Browse products and place your order directly.</div>
          </div>
          <Link href="/shop" className="btn btn-accent btn-md">Shop Now →</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
