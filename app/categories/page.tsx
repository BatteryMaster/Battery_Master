import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories — Battery Master Karachi",
  description: "Browse all Battery Master categories: JK BMS, LiFePO4 Cells, Lithium Battery Packs, E-Bike Kits, Chargers, LCD Displays and more.",
};

const CATS = [
  { name:"JK BMS",               slug:"jk-bms",                icon:"🛡️", desc:"4S to 24S active balancing BMS. Bluetooth, RS485, Karachi mein available.",        count:5,  color:"#eff6ff", border:"#bfdbfe", accent:"#2563eb" },
  { name:"Lithium Battery Packed",slug:"lithium-battery-packed", icon:"🔋", desc:"12V to 72V ready-made lithium packs with BMS. E-bike, solar, UPS ke liye.",        count:4,  color:"#f0fdf4", border:"#bbf7d0", accent:"#16a34a" },
  { name:"Battery Box",           slug:"battery-box",            icon:"📦", desc:"Plastic & aluminum enclosures. 12V to 72V, waterproof & lockable options.",         count:4,  color:"#fff7ed", border:"#fed7aa", accent:"#f97316" },
  { name:"Lithium Ion Cell",      slug:"lithium-ion-cell",       icon:"⚡", desc:"Samsung, LG, Panasonic 18650 Grade-A cells. DIY battery pack ke liye.",              count:4,  color:"#fefce8", border:"#fde68a", accent:"#ca8a04" },
  { name:"LiFePO4 Cell",          slug:"lifepo4-cell",           icon:"🌱", desc:"EVE LF105, LF280K, CATL 200Ah & 304Ah. Solar & EV ke liye best cells.",             count:4,  color:"#f0fdf4", border:"#86efac", accent:"#15803d" },
  { name:"LCD Display",           slug:"lcd-display",            icon:"📺", desc:"Battery level indicators, coulometers, e-bike S866 & 72V dashboards.",              count:4,  color:"#f5f3ff", border:"#ddd6fe", accent:"#7c3aed" },
  { name:"EVE Bike Kits",         slug:"eve-bike-kits",          icon:"🛵", desc:"48V 1000W to 72V 3000W complete e-bike conversion kits. Motor, controller & LCD.",   count:3,  color:"#fff1f2", border:"#fecdd3", accent:"#dc2626" },
  { name:"Chargers",              slug:"chargers",               icon:"🔌", desc:"12V to 72V smart CC/CV chargers. Auto cutoff, LED indicator, metal housing.",        count:4,  color:"#eff6ff", border:"#bfdbfe", accent:"#0284c7" },
  { name:"EVE Bike Display",      slug:"eve-bike-display",       icon:"🖥️", desc:"S900 color TFT, KT LCD3, SW102 wireless. Speed, battery & PAS monitoring.",         count:3,  color:"#fdf4ff", border:"#e9d5ff", accent:"#9333ea" },
  { name:"Meter Tools",           slug:"meter-tools",            icon:"🔧", desc:"Silicon wires, XT60, Anderson connectors, nickel strip, spot welder & testers.",      count:9,  color:"#f8fafc", border:"#e2e8f0", accent:"#475569" },
];

export default function CategoriesPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", padding:"48px 0 44px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:8 }}>Browse</div>
          <h1 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:900, color:"#fff", marginBottom:10 }}>All Categories</h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)" }}>10 categories · 44+ products · Saddar Karachi</p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:36, paddingBottom:80 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px),1fr))", gap:16 }}>
          {CATS.map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}`}
              style={{ background:"#fff", border:`1.5px solid ${c.border}`, borderRadius:16, padding:"26px 22px", textDecoration:"none", display:"block", borderLeft:`4px solid ${c.accent}` }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ fontSize:36, flexShrink:0 }}>{c.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:"#0f172a", marginBottom:6 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6, marginBottom:12 }}>{c.desc}</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:c.accent, background:`${c.color}`, border:`1px solid ${c.border}`, padding:"3px 10px", borderRadius:20 }}>
                      {c.count} products
                    </span>
                    <span style={{ fontSize:12, color:c.accent, fontWeight:700 }}>View →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
