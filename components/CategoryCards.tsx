import Link from "next/link";

const CATS = [
  { name:"JK BMS",               slug:"jk-bms",                icon:"🛡️", desc:"4S–24S Active BMS",       color:"#eff6ff", border:"#bfdbfe" },
  { name:"Lithium Battery Packed",slug:"lithium-battery-packed", icon:"🔋", desc:"12V–72V Ready Packs",     color:"#f0fdf4", border:"#bbf7d0" },
  { name:"Battery Box",           slug:"battery-box",            icon:"📦", desc:"12V–72V Enclosures",       color:"#fff7ed", border:"#fed7aa" },
  { name:"Lithium Ion Cell",      slug:"lithium-ion-cell",       icon:"⚡", desc:"Samsung · LG · Panasonic", color:"#fefce8", border:"#fde68a" },
  { name:"LiFePO4 Cell",          slug:"lifepo4-cell",           icon:"🌱", desc:"EVE · CATL Grade-A",       color:"#f0fdf4", border:"#86efac" },
  { name:"LCD Display",           slug:"lcd-display",            icon:"📺", desc:"Battery & Bike Displays",  color:"#f5f3ff", border:"#ddd6fe" },
  { name:"EVE Bike Kits",         slug:"eve-bike-kits",          icon:"🛵", desc:"48V–72V Complete Kits",    color:"#fff1f2", border:"#fecdd3" },
  { name:"Chargers",              slug:"chargers",               icon:"🔌", desc:"12V–72V Smart Chargers",   color:"#eff6ff", border:"#bfdbfe" },
  { name:"EVE Bike Display",      slug:"eve-bike-display",       icon:"🖥️", desc:"Color & LCD Displays",     color:"#fdf4ff", border:"#e9d5ff" },
  { name:"Meter Tools",           slug:"meter-tools",            icon:"🔧", desc:"Wires · Terminals · Tools", color:"#f8fafc", border:"#e2e8f0" },
];

export default function CategoryCards() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14 }}>
      {CATS.map(c => (
        <Link key={c.slug} href={`/categories/${c.slug}`}
          style={{ background:c.color, border:`1.5px solid ${c.border}`, borderRadius:14, padding:"22px 18px", textDecoration:"none", display:"block", transition:"transform .15s, box-shadow .15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(0,0,0,0.09)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}>
          <div style={{ fontSize:30, marginBottom:10 }}>{c.icon}</div>
          <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:4 }}>{c.name}</div>
          <div style={{ fontSize:11, color:"#64748b" }}>{c.desc}</div>
        </Link>
      ))}
    </div>
  );
}
