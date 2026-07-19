import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background:"#0f172a" }}>
      {/* Trust bar */}
      <div style={{ background:"rgba(74,222,128,0.04)", borderBottom:"1px solid rgba(74,222,128,0.08)", padding:"18px 0" }}>
        <div className="wrap" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14 }}>
          {[
            {i:"📦",t:"Fast Delivery",s:"Karachi 1–2 days"},
            {i:"🔋",t:"Grade-A Cells",s:"EVE · CATL · Samsung"},
            {i:"🛡️",t:"JK BMS Expert",s:"4S to 24S"},
            {i:"💬",t:"WhatsApp Support",s:"03329891510"},
          ].map(x => (
            <div key={x.t} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{x.i}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{x.t}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginTop:1 }}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="wrap footer-grid" style={{ paddingTop:40, paddingBottom:32, display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.3fr", gap:32 }}>
        {/* Brand */}
        <div>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, textDecoration:"none" }}>
            <img src="/logo.png" alt="Battery Master" width={36} height={36} style={{ objectFit:"contain", flexShrink:0 }} />
            <span style={{ fontSize:16, fontWeight:800, color:"#fff" }}>Battery<span style={{ color:"#4ade80" }}>Master</span></span>
          </Link>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", lineHeight:1.85, maxWidth:240 }}>
            Karachi's trusted battery and EV parts store. JK BMS, LiFePO4 cells, e-bike kits — all in one place.
          </p>
          <div style={{ marginTop:14, fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:2.2 }}>
            <div>📍 Shop No 78, Cooperative Electronics Market</div>
            <div style={{ paddingLeft:20, fontSize:11, color:"rgba(255,255,255,0.28)" }}>Saddar, Karachi, Pakistan</div>
            <div>📞 <span style={{ color:"#4ade80", fontWeight:700 }}>03329891510</span></div>
            <div style={{ fontSize:12, wordBreak:"break-all" }}>📧 batterymasterofficial78@outlook.com</div>
          </div>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:14, background:"#25D366", color:"#fff", borderRadius:8, padding:"9px 16px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
            📱 WhatsApp Order
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:16 }}>Quick Links</div>
          {(["Home /","Shop /shop","Categories /categories","About /about","Contact /contact"] as string[]).map(s => {
            const [l,h] = s.split(" ");
            return <Link key={h} href={h} className="foot-a">{l}</Link>;
          })}
        </div>

        {/* Categories */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:16 }}>Categories</div>
          {(["JK BMS /categories/jk-bms","Lithium Battery /categories/lithium-battery-packed","Battery Box /categories/battery-box","LiFePO4 Cell /categories/lifepo4-cell","EVE Bike Kits /categories/eve-bike-kits","Chargers /categories/chargers","Meter Tools /categories/meter-tools"] as string[]).map(s => {
            const parts = s.split(" ");
            const h = parts.pop()!;
            const l = parts.join(" ");
            return <Link key={h} href={h} className="foot-a">{l}</Link>;
          })}
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:16 }}>Policies</div>
          {(["Privacy Policy /privacy-policy","Terms & Conditions /terms-conditions","Return & Refund /return-refund-policy"] as string[]).map(s => {
            const parts = s.split(" ");
            const h = parts.pop()!;
            const l = parts.join(" ");
            return <Link key={h} href={h} className="foot-a">{l}</Link>;
          })}
          <div style={{ marginTop:18, background:"rgba(74,222,128,0.05)", border:"1px solid rgba(74,222,128,0.12)", borderRadius:10, padding:14 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#4ade80", marginBottom:8, textTransform:"uppercase", letterSpacing:".05em" }}>Working Hours</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.40)", lineHeight:2.1 }}>
              Mon – Sat: 10am – 8pm<br/>Sunday: Closed
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"14px 0" }}>
        <div className="wrap footer-bottom" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"center" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.22)" }}>© {new Date().getFullYear()} Battery Master — Karachi, Pakistan 🇵🇰</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.22)" }}>Shop No 78, Saddar · 03329891510</div>
        </div>
      </div>
    </footer>
  );
}
