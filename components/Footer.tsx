import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background:"#0f172a" }}>

      {/* Trust bar */}
      <div style={{ background:"rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"20px 0" }}>
        <div className="wrap" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:16 }}>
          {[
            { icon:"📦", t:"Fast Delivery",      s:"Karachi: 1–2 days" },
            { icon:"🔋", t:"Grade-A Batteries",  s:"Top quality cells" },
            { icon:"🔄", t:"Easy Returns",        s:"7-day return policy" },
            { icon:"💬", t:"WhatsApp Support",    s:"03329891510" },
          ].map(x => (
            <div key={x.t} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{x.icon}</span>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{x.t}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.40)", marginTop:1 }}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="wrap footer-grid" style={{ paddingTop:48, paddingBottom:36, display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.3fr", gap:36 }}>

        {/* Brand */}
        <div>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, textDecoration:"none" }}>
            <img src="/logo.png" alt="Battery Master" width={38} height={38} style={{ borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize:17, fontWeight:800, color:"#fff", letterSpacing:"-.02em" }}>
              Battery<span style={{ color:"#60a5fa" }}>Master</span>
            </span>
          </Link>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.40)", lineHeight:1.85, maxWidth:240 }}>
            Karachi ka trusted battery aur EV parts store. JK BMS, LiFePO4 cells, e-bike kits aur bohat kuch ek jagah.
          </p>
          <div style={{ marginTop:16, fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:2.2 }}>
            <div>📍 Shop No 78, Cooperative Electronics Market</div>
            <div style={{ paddingLeft:22, fontSize:11, color:"rgba(255,255,255,0.28)" }}>Saddar, Karachi, Pakistan</div>
            <div>📞 <span style={{ color:"#60a5fa", fontWeight:700 }}>03329891510</span></div>
            <div>📧 batterymasterofficial78@outlook.com</div>
          </div>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:16, background:"#25D366", color:"#fff", borderRadius:8, padding:"10px 18px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.103 1.513 5.824L0 24l6.341-1.487A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.015-1.379l-.36-.214-3.727.875.891-3.652-.234-.374A9.774 9.774 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
            </svg>
            WhatsApp Order
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

        {/* Policies + Hours */}
        <div>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:18 }}>Policies</div>
          {([["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms-conditions"],["Return / Refund","/return-refund-policy"]] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
          <div style={{ marginTop:20, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:14 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#60a5fa", marginBottom:8, letterSpacing:".05em", textTransform:"uppercase" }}>Working Hours</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.40)", lineHeight:2.1 }}>
              Mon – Sat: 10am – 8pm<br/>Sunday: 12pm – 6pm
            </div>
          </div>
          <div style={{ marginTop:12, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:8, padding:"10px 12px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#fca5a5" }}>❌ Online Payment Nahi</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:3 }}>Bank transfer ya online payment</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", padding:"16px 0" }}>
        <div className="wrap footer-bottom" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"center" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Battery Master — All rights reserved. Karachi, Pakistan 🇵🇰
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.25)" }}>Shop No 78, Saddar · 03329891510</div>
        </div>
      </div>
    </footer>
  );
}
