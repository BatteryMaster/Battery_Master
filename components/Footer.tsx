import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background:"#0f172a" }}>

      {/* Trust bar */}
      <div style={{ background:"rgba(74,222,128,0.05)", borderBottom:"1px solid rgba(74,222,128,0.10)", padding:"20px 0" }}>
        <div className="wrap" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:16 }}>
          {[
            {icon:"📦",t:"Fast Delivery",   s:"Karachi: 1–2 days"},
            {icon:"🔋",t:"Grade-A Cells",   s:"EVE · CATL · Samsung"},
            {icon:"🔄",t:"Easy Returns",     s:"7-day policy"},
            {icon:"💬",t:"WhatsApp Support", s:"03329891510"},
          ].map(x => (
            <div key={x.t} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{x.icon}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{x.t}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginTop:1 }}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="wrap footer-grid" style={{ paddingTop:44, paddingBottom:32, display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.3fr", gap:36 }}>

        {/* Brand */}
        <div>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, textDecoration:"none" }}>
            <img src="/logo.png" alt="Battery Master" width={38} height={38} style={{ borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid rgba(74,222,128,0.25)" }} />
            <span style={{ fontSize:17, fontWeight:800, color:"#fff" }}>
              Battery<span style={{ color:"#4ade80" }}>Master</span>
            </span>
          </Link>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.85, maxWidth:240 }}>
            Karachi's trusted battery and EV parts store. JK BMS, LiFePO4 cells, e-bike kits — all in one place.
          </p>
          <div style={{ marginTop:16, fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:2.2 }}>
            <div>📍 Shop No 78, Cooperative Electronics Market</div>
            <div style={{ paddingLeft:22, fontSize:11, color:"rgba(255,255,255,0.28)" }}>Saddar, Karachi, Pakistan</div>
            <div>📞 <span style={{ color:"#4ade80", fontWeight:700 }}>03329891510</span></div>
            <div style={{ fontSize:12, wordBreak:"break-all" }}>📧 batterymasterofficial78@outlook.com</div>
          </div>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:16, background:"#25D366", color:"#fff", borderRadius:8, padding:"10px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
            📱 WhatsApp Order
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:18 }}>Quick Links</div>
          {([["Home","/"],["Shop","/shop"],["Categories","/categories"],["About","/about"],["Contact","/contact"]] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:18 }}>Categories</div>
          {([
            ["JK BMS","/categories/jk-bms"],
            ["Lithium Battery","/categories/lithium-battery-packed"],
            ["Battery Box","/categories/battery-box"],
            ["LiFePO4 Cell","/categories/lifepo4-cell"],
            ["LCD Display","/categories/lcd-display"],
            ["EVE Bike Kits","/categories/eve-bike-kits"],
            ["Chargers","/categories/chargers"],
            ["Meter Tools","/categories/meter-tools"],
          ] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
        </div>

        {/* Hours + Policies */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:18 }}>Info</div>
          {([["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms-conditions"],["Return / Refund","/return-refund-policy"]] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
          <div style={{ marginTop:20, background:"rgba(74,222,128,0.06)", border:"1px solid rgba(74,222,128,0.14)", borderRadius:10, padding:14 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#4ade80", marginBottom:8, letterSpacing:".05em", textTransform:"uppercase" }}>Working Hours</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.40)", lineHeight:2.1 }}>
              Mon – Sat: 10am – 8pm<br/>Sunday: 12pm – 6pm
            </div>
          </div>
          <div style={{ marginTop:10, background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.20)", borderRadius:8, padding:"10px 12px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#fca5a5" }}>❌ Cash on Delivery Not Available</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.30)", marginTop:2 }}>Online payment only</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"16px 0" }}>
        <div className="wrap footer-bottom" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"center" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.22)" }}>© {new Date().getFullYear()} Battery Master — Karachi, Pakistan 🇵🇰</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.22)" }}>Shop No 78, Saddar · 03329891510</div>
        </div>
      </div>
    </footer>
  );
}
