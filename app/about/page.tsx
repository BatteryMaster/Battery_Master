import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Battery Master Karachi",
  description: "Battery Master — Karachi ka trusted battery aur electric vehicle parts store. Shop No 78, Cooperative Electronics Market, Saddar.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", padding:"48px 0 44px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:8 }}>Hamara Ta'aruf</div>
          <h1 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:900, letterSpacing:"-.02em", color:"#fff", marginTop:0, marginBottom:10 }}>
            Battery Master ke Bare Mein
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)" }}>
            Karachi ka trusted battery & EV parts store
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"36px", paddingBottom:"80px", maxWidth:820 }}>

        {/* Main about card */}
        <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, padding:"40px 36px", marginBottom:20 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:16, letterSpacing:"-.01em" }}>
            🔋 Hum Kaun Hain?
          </h2>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.9, marginBottom:16 }}>
            <strong>Battery Master</strong> Karachi ki ek trusted online aur physical store hai jo lithium batteries, JK BMS, LiFePO4 cells, e-bike kits, chargers aur tamam EV accessories provide karta hai. Hamara shop <strong>Shop No 78, Cooperative Electronics Market, Saddar Karachi</strong> mein hai.
          </p>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.9, marginBottom:16 }}>
            Hum un logon ke liye kaam karte hain jo apni gadiyan, solar systems, ya electronics ke liye best quality batteries aur EV parts chahte hain — aur woh bhi sahi daam par. Hamare paas Grade-A LiFePO4 cells (EVE, CATL), JK BMS, Samsung/LG 18650 cells, aur e-bike conversion kits hamesha available hote hain.
          </p>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.9 }}>
            Hum apne customers ko fast service, honest advice, aur quality products dene ka wada karte hain. Chahe aap solar battery build kar rahe hon, e-bike convert kar rahe hon, ya sirf ek reliable charger chahiye — Battery Master aapka pehla stop hai.
          </p>
        </div>

        {/* Features */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:20 }}>
          {[
            { icon:"🛡️", title:"JK BMS Specialist",   desc:"4S se 24S tak, active balancing ke saath." },
            { icon:"⚡", title:"Grade-A Cells",         desc:"EVE, CATL, Samsung, LG — original cells." },
            { icon:"🛵", title:"E-Bike Kits",           desc:"48V se 72V tak complete conversion kits." },
            { icon:"🔌", title:"Smart Chargers",         desc:"12V se 72V tak CC/CV auto-cutoff chargers." },
            { icon:"🔧", title:"Silicon Wires & Tools", desc:"High-quality wiring, terminals, testers." },
            { icon:"💬", title:"WhatsApp Support",       desc:"Order aur advice ke liye seedha contact." },
          ].map(f => (
            <div key={f.title} style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:14, padding:"22px 18px" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, padding:"32px 28px", marginBottom:20 }}>
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

        {/* COD notice */}
        <div style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#dc2626", marginBottom:4 }}>❌ Online Payment Available Nahi</div>
          <div style={{ fontSize:13, color:"#64748b" }}>Hum sirf <strong>bank transfer, Easypaisa, ya JazzCash</strong> accept karte hain. Order ke liye pehle WhatsApp karein.</div>
        </div>

        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <Link href="/shop" style={{ display:"inline-flex", alignItems:"center", padding:"12px 24px", background:"#2563eb", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
            🛒 Products Dekhein →
          </Link>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"12px 24px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
            📱 WhatsApp Karein
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
