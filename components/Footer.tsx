import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a", marginTop: 0 }}>

      {/* Trust bar */}
      <div style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "24px 0" }}>
        <div className="wrap" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))", gap:20 }}>
          {[
            { icon:"📦", t:"Fast Delivery",    s:"Karachi: 1–2 days" },
            { icon:"✅", t:"Cash on Delivery",  s:"Pay when you receive" },
            { icon:"🔄", t:"7-Day Returns",     s:"Easy return & refund" },
            { icon:"🔒", t:"Secure Orders",     s:"Your data is safe" },
          ].map(x => (
            <div key={x.t} style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{x.icon}</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{x.t}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="wrap footer-grid" style={{
        paddingTop:52, paddingBottom:40,
        display:"grid",
        gridTemplateColumns:"2fr 1fr 1fr 1.3fr",
        gap:40,
      }}>

        {/* Brand */}
        <div>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, textDecoration:"none" }}>
            <div style={{ width:36, height:36, background:"linear-gradient(135deg,var(--primary),#3b5bdb)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:17, color:"#fff", flexShrink:0 }}>Z</div>
            <span style={{ fontSize:18, fontWeight:800, color:"#fff", letterSpacing:"-.02em" }}>
              zeko<span style={{ color:"#60a5fa" }}>.pk</span>
            </span>
          </Link>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.85, maxWidth:260 }}>
            Pakistan ka trusted electronics store. Modules, ICs, transistors, resistors aur tools — sab ek jagah.
          </p>
          <div style={{ marginTop:20, fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:2.2 }}>
            <div>📍 Shop G1A, National Radio &amp; TV Market</div>
            <div style={{ paddingLeft:22, fontSize:12, color:"rgba(255,255,255,0.30)" }}>Near Regal Chowk, Saddar, Karachi</div>
            <div>📞 <span style={{ color:"#60a5fa", fontWeight:700 }}>03150220243</span></div>
            <div>📧 hussamm621@gmail.com</div>
          </div>
          <a href="https://wa.me/923150220243" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:20, background:"#25D366", color:"#fff", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.103 1.513 5.824L0 24l6.341-1.487A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.015-1.379l-.36-.214-3.727.875.891-3.652-.234-.374A9.774 9.774 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
            </svg>
            WhatsApp Order
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:20 }}>Quick Links</div>
          {([["Home","/"],["Shop","/shop"],["Categories","/categories"],["About Us","/about"],["Contact","/contact"]] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:20 }}>Categories</div>
          {([["Modules","/categories/modules"],["ICs","/categories/ics"],["Transistors","/categories/transistors"],["Resistors","/categories/resistors"],["Tools","/categories/tools"]] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
        </div>

        {/* Policies + Hours */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:20 }}>Policies</div>
          {([["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms-conditions"],["Return / Refund","/return-refund-policy"]] as [string,string][]).map(([l,h]) => (
            <Link key={h} href={h} className="foot-a">{l}</Link>
          ))}
          <div style={{ marginTop:24, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"var(--r-md)", padding:"16px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#60a5fa", marginBottom:8, letterSpacing:".05em" }}>WORKING HOURS</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:2.1 }}>
              Mon – Sat: 10am – 8pm<br />Sunday: 12pm – 6pm
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", padding:"16px 0" }}>
        <div className="wrap" style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, alignItems:"center" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.28)" }}>
            © 2025 zeko.pk — All rights reserved. Built for Pakistan 🇵🇰
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.28)" }}>Karachi, Pakistan</div>
        </div>
      </div>
    </footer>
  );
}
