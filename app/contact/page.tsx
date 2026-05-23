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
    <main style={{ minHeight:"100vh", background:"#eef2ff" }}>
      <Header />
      <WhatsAppButton />

      {/* Page header */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #dde3f0", padding:"36px 0 32px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:8 }}>
            Contact zeko.pk
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-.02em", color:"#0f172a", marginBottom:8 }}>
            Get in Touch
          </h1>
          <p style={{ fontSize:15, color:"#475569" }}>
            Questions, orders, or support — we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"36px", paddingBottom:"80px" }}>

        {/* Contact cards — responsive grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap:16,
          marginBottom:20,
        }}>
          {[
            {
              icon:"📞", title:"Phone / WhatsApp",
              info:"03150220243", sub:"Call or WhatsApp anytime",
              href:"https://wa.me/923150220243", cta:"Chat on WhatsApp",
              bg:"#f0fdf4", ctaBg:"#25D366", ctaColor:"#fff",
            },
            {
              icon:"📧", title:"Email",
              info:"hussamm621@gmail.com", sub:"We reply within 24 hours",
              href:"mailto:hussamm621@gmail.com", cta:"Send Email",
              bg:"#eff6ff", ctaBg:"transparent", ctaColor:"#2563eb",
            },
            {
              icon:"📍", title:"Our Location",
              info:"Shop G1A, National Radio & TV Market",
              sub:"Near Regal Chowk, Saddar, Karachi",
              href:null, cta:null, bg:"#fefce8", ctaBg:"", ctaColor:"",
            },
            {
              icon:"🕐", title:"Working Hours",
              info:"Mon – Sat: 10am – 8pm",
              sub:"Sunday: 12pm – 6pm",
              href:null, cta:null, bg:"#f5f3ff", ctaBg:"", ctaColor:"",
            },
          ].map((c, i) => (
            <div key={i} style={{
              background:"#fff", border:"1.5px solid #dde3f0",
              borderRadius:16, padding:"24px 20px",
            }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{c.icon}</div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>
                {c.title}
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:4, wordBreak:"break-word" }}>
                {c.info}
              </div>
              <div style={{ fontSize:13, color:"#64748b", marginBottom:c.cta ? 16 : 0, lineHeight:1.5 }}>
                {c.sub}
              </div>
              {c.cta && c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer" style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  padding:"9px 18px", fontSize:13, fontWeight:700, borderRadius:8,
                  background: c.ctaBg, color: c.ctaColor,
                  border: c.ctaBg === "transparent" ? "1.5px solid #dde3f0" : "none",
                  textDecoration:"none", whiteSpace:"nowrap",
                }}>
                  {c.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div style={{
          background:"linear-gradient(135deg,#1e40af,#1e3a8a)",
          borderRadius:16, padding:"28px 24px",
          display:"flex", alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap", gap:16,
        }}>
          <div>
            <div style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:6 }}>
              Ready to order?
            </div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)" }}>
              Browse products and place your order directly.
            </div>
          </div>
          <Link href="/shop" style={{
            display:"inline-flex", alignItems:"center",
            padding:"11px 24px", fontSize:14, fontWeight:700,
            background:"#f97316", color:"#fff",
            borderRadius:8, textDecoration:"none", whiteSpace:"nowrap",
            flexShrink:0,
          }}>
            Shop Now →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
