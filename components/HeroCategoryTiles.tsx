import Link from "next/link";

const TILES = [
  { name:"JK BMS",          slug:"jk-bms",                icon:"🛡️", bg:"rgba(255,255,255,0.12)" },
  { name:"LiFePO4 Cell",    slug:"lifepo4-cell",           icon:"🌱", bg:"rgba(255,255,255,0.10)" },
  { name:"E-Bike Kits",     slug:"eve-bike-kits",          icon:"🛵", bg:"rgba(255,255,255,0.10)" },
  { name:"Chargers",        slug:"chargers",               icon:"🔌", bg:"rgba(255,255,255,0.10)" },
  { name:"LCD Display",     slug:"lcd-display",            icon:"📺", bg:"rgba(255,255,255,0.10)" },
  { name:"Meter Tools",     slug:"meter-tools",            icon:"🔧", bg:"rgba(255,255,255,0.10)" },
];

export function HeroCategoryTiles() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
      {TILES.map(t => (
        <Link key={t.slug} href={`/categories/${t.slug}`}
          style={{ background:t.bg, border:"1px solid rgba(255,255,255,0.18)", borderRadius:12, padding:"16px 12px", textDecoration:"none", textAlign:"center", display:"block" }}>
          <div style={{ fontSize:24, marginBottom:6 }}>{t.icon}</div>
          <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.85)", lineHeight:1.3 }}>{t.name}</div>
        </Link>
      ))}
    </div>
  );
}

export function CategoryCards() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14 }}>
      {TILES.map(t => (
        <Link key={t.slug} href={`/categories/${t.slug}`}
          style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"22px 18px", textDecoration:"none", display:"block" }}>
          <div style={{ fontSize:30, marginBottom:10 }}>{t.icon}</div>
          <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:4 }}>{t.name}</div>
        </Link>
      ))}
    </div>
  );
}
