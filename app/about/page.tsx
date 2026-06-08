import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Battery Master Karachi",
  description: "Battery Master — Karachi's trusted battery and electric vehicle parts store. Shop No 78, Cooperative Electronics Market, Saddar.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"48px 0 44px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:8 }}>About Us</div>
          <h1 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:900, letterSpacing:"-.02em", color:"#fff", marginBottom:10 }}>
            About Battery Master
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)" }}>
            Karachi's trusted battery & EV parts store
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"36px", paddingBottom:"80px", maxWidth:820 }}>

        <div style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:16, padding:"40px 36px", marginBottom:20 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:16 }}>🔋 Who We Are</h2>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.9, marginBottom:16 }}>
            <strong>Battery Master</strong> is a trusted online and physical store based in Karachi, providing lithium batteries, JK BMS, LiFePO4 cells, e-bike kits, chargers, and all EV accessories. Our shop is located at <strong>Shop No 78, Cooperative Electronics Market, Saddar Karachi</strong>.
          </p>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.9, marginBottom:16 }}>
            We serve customers who need the best quality batteries and EV parts for their vehicles, solar systems, or electronics — at the right price. We always have Grade-A LiFePO4 cells (EVE, CATL), JK BMS, Samsung/LG 18650 cells, and e-bike conversion kits in stock.
          </p>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.9 }}>
            We are committed to providing fast service, honest advice, and quality products. Whether you are building a solar battery, converting an e-bike, or just need a reliable charger — Battery Master is your first stop.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:20 }}>
          {[
            { icon:"🛡️", title:"JK BMS Specialist",    desc:"4S to 24S, active balancing." },
            { icon:"⚡", title:"Grade-A Cells",          desc:"EVE, CATL, Samsung, LG — original." },
            { icon:"🛵", title:"E-Bike Kits",            desc:"48V to 72V complete conversion kits." },
            { icon:"🔌", title:"Smart Chargers",          desc:"12V to 72V CC/CV auto-cutoff." },
            { icon:"🔧", title:"Silicon Wires & Tools",  desc:"High-quality wiring & terminals." },
            { icon:"💬", title:"WhatsApp Support",        desc:"Direct contact for orders & advice." },
          ].map(f => (
            <div key={f.title} style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:14, padding:"22px 18px" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:16, padding:"32px 28px", marginBottom:20 }}>
          <h2 style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:20 }}>📋 Contact Details</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 }}>
            {[
              { icon:"📍", label:"Address",  val:"Shop No 78, Cooperative Electronics Market, Saddar, Karachi" },
              { icon:"📞", label:"WhatsApp", val:"03329891510" },
              { icon:"📧", label:"Email",    val:"batterymasterofficial78@outlook.com" },
              { icon:"🕐", label:"Hours",    val:"Mon–Sat 10am–8pm | Sun 12pm–6pm" },
            ].map(x => (
              <div key={x.label}>
                <div style={{ fontSize:22, marginBottom:6 }}>{x.icon}</div>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94a3b8", marginBottom:4 }}>{x.label}</div>
                <div style={{ fontSize:13, fontWeight:600, color:"#0f172a", lineHeight:1.5 }}>{x.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#dc2626", marginBottom:4 }}>❌ Cash on Delivery Not Available</div>
          <div style={{ fontSize:13, color:"#64748b" }}>We only accept <strong>bank transfer, Easypaisa, or JazzCash</strong>. Please WhatsApp us before placing an order.</div>
        </div>

        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <Link href="/shop" style={{ display:"inline-flex", alignItems:"center", padding:"12px 24px", background:"#16a34a", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
            🛒 View Products →
          </Link>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"12px 24px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
            📱 WhatsApp Us
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
