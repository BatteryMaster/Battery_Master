import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact Us — Battery Master Karachi",
  description: "Contact Battery Master. WhatsApp: 03329891510 | Shop No 78, Cooperative Electronics Market, Saddar Karachi.",
};

export default function ContactPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <WhatsAppButton />

      {/* Page header */}
      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", borderBottom:"1.5px solid #dde3f0", padding:"48px 0 44px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:8 }}>
            Get In Touch
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:900, letterSpacing:"-.02em", color:"#fff", marginBottom:10 }}>
            Contact Battery Master
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)" }}>
            Order, inquiry or any question — we are here to help
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"36px", paddingBottom:"80px" }}>

        {/* Contact cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),1fr))", gap:16, marginBottom:20 }}>
          
          {/* WhatsApp */}
          <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, padding:"28px 22px", borderTop:"4px solid #25D366" }}>
            <div style={{ fontSize:32, marginBottom:14 }}>📱</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>WhatsApp / Phone</div>
            <div style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:4 }}>03329891510</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:18, lineHeight:1.5 }}>Send us a WhatsApp message for orders. We reply quickly.</div>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.103 1.513 5.824L0 24l6.341-1.487A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.015-1.379l-.36-.214-3.727.875.891-3.652-.234-.374A9.774 9.774 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
              </svg>
              WhatsApp Chat
            </a>
          </div>

          {/* Email */}
          <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, padding:"28px 22px", borderTop:"4px solid #2563eb" }}>
            <div style={{ fontSize:32, marginBottom:14 }}>📧</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Email</div>
            <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:4, wordBreak:"break-all" }}>batterymasterofficial78@outlook.com</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:18, lineHeight:1.5 }}>Email us — we reply within 24 hours.</div>
            <a href="mailto:batterymasterofficial78@outlook.com"
              style={{ display:"inline-flex", alignItems:"center", padding:"10px 20px", background:"rgba(37,99,235,0.08)", color:"#16a34a", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none", border:"1.5px solid rgba(37,99,235,0.2)" }}>
              Send Email
            </a>
          </div>

          {/* Location */}
          <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, padding:"28px 22px", borderTop:"4px solid #f97316" }}>
            <div style={{ fontSize:32, marginBottom:14 }}>📍</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Hamara Pata</div>
            <div style={{ fontSize:15, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Shop No 78</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#374151", marginBottom:4 }}>Cooperative Electronics Market</div>
            <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6 }}>Saddar, Karachi, Pakistan</div>
          </div>

          {/* Hours */}
          <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, padding:"28px 22px", borderTop:"4px solid #8b5cf6" }}>
            <div style={{ fontSize:32, marginBottom:14 }}>🕐</div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>Kaam ke Auqaat</div>
            <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:8 }}>Monday – Saturday: 10am – 10pm</div>
            {/* <div style={{ fontSize:13, color:"#64748b" }}>Itwar: 12pm – 6pm</div> */}
            <div style={{ marginTop:14, padding:"10px 12px", background:"#fef2f2", borderRadius:8, border:"1px solid #fecaca" }}>
              {/* <div style={{ fontSize:12, fontWeight:700, color:"#dc2626" }}>❌ COD Not Available</div> */}
              <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>Online payment ya bank transfer</div>
            </div>
          </div>
        </div>

        {/* Map embed placeholder */}
        <div style={{ background:"#fff", border:"1.5px solid #dde3f0", borderRadius:16, overflow:"hidden", marginBottom:20 }}>
          <div style={{ padding:"20px 22px", borderBottom:"1px solid #f1f5f9" }}>
            <div style={{ fontWeight:700, color:"#0f172a", fontSize:15 }}>📍 Hamari Location — Saddar, Karachi</div>
          </div>
          <div style={{ padding:"24px 22px", background:"#f8fafc", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🗺️</div>
            <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:4 }}>Shop No 78, Cooperative Electronics Market</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:16 }}>Saddar, Karachi — Electronics Market ke andar</div>
            <a href="https://maps.google.com/?q=Cooperative+Electronics+Market+Saddar+Karachi" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 20px", background:"#2563eb", color:"#fff", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none" }}>
              🗺️ View on Google Maps
            </a>
          </div>
        </div>

        {/* CTA banner */}
        <div style={{ background:"linear-gradient(135deg,#1e40af,#0f172a)", borderRadius:16, padding:"28px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:6 }}>Ready to place an order?</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>WhatsApp us or browse products.</div>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", padding:"11px 24px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
              📱 WhatsApp
            </a>
            <a href="/shop"
              style={{ display:"inline-flex", alignItems:"center", padding:"11px 24px", background:"#f97316", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
              🛒 Shop Now →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
