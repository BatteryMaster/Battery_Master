"use client";
import Link from "next/link";

const categories = [
  { name:"Modules",     icon:"🔌", desc:"Arduino, Relay, Sensor modules", href:"/categories/modules",     count:"10+" },
  { name:"ICs",         icon:"🔬", desc:"555, LM358, logic ICs",          href:"/categories/ics",         count:"10+" },
  { name:"Transistors", icon:"⚡", desc:"BC547, 2N2222, TIP120",           href:"/categories/transistors", count:"5+"  },
  { name:"Resistors",   icon:"〰️", desc:"All values, bulk packs",          href:"/categories/resistors",   count:"4+"  },
  { name:"Tools",       icon:"🔧", desc:"Soldering, multimeters",           href:"/categories/tools",       count:"7+"  },
];

export default function CategoryGrid() {
  return (
    <section style={{ maxWidth:1280, margin:"0 auto", padding:"64px 20px 0" }}>
      <div style={{ marginBottom:32, display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:16 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#f97316", marginBottom:8 }}>Shop By Category</div>
          <h2 style={{ fontSize:26, fontWeight:700, letterSpacing:"-0.02em", color:"#0f172a" }}>Browse Categories</h2>
        </div>
        <Link href="/categories" style={{ fontSize:13, color:"#64748b", border:"1px solid #dde3f0", borderRadius:8, padding:"8px 16px", whiteSpace:"nowrap" }}>
          All Categories →
        </Link>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:12 }}>
        {categories.map(cat => (
          <Link key={cat.name} href={cat.href} className="cat-card">
            <div style={{ fontSize:28, marginBottom:12 }}>{cat.icon}</div>
            <div style={{ fontSize:15, fontWeight:600, color:"#0f172a", marginBottom:4 }}>{cat.name}</div>
            <div style={{ fontSize:12, color:"#64748b", lineHeight:1.5, marginBottom:12 }}>{cat.desc}</div>
            <div style={{ fontSize:11, fontWeight:700, color:"#f97316", letterSpacing:"0.04em" }}>{cat.count} products →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
