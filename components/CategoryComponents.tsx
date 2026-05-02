"use client";
import Link from "next/link";

const CATS = [
  { name:"Modules",     icon:"🔌", desc:"Arduino, Relay, Sensor boards", href:"/categories/modules" },
  { name:"ICs",         icon:"🧮", desc:"555, Op-Amp, Logic ICs",        href:"/categories/ics" },
  { name:"Transistors", icon:"⚡", desc:"BC547, MOSFET, Darlington",      href:"/categories/transistors" },
  { name:"Resistors",   icon:"〰️", desc:"All values, bulk packs",         href:"/categories/resistors" },
  { name:"Tools",       icon:"🔧", desc:"Soldering, Multimeters",          href:"/categories/tools" },
];

export function HeroCategoryTiles() {
  return (
    <div className="hide-mob" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
      {CATS.map((c, i) => (
        <Link key={c.name} href={c.href} style={{
          background:"rgba(255,255,255,0.10)", border:"1.5px solid rgba(255,255,255,0.16)",
          borderRadius:14, padding:"20px 18px", transition:"all .18s", display:"block",
          gridColumn: i===4 ? "span 2" : "span 1",
        }}
        className="hero-tile">
          <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
          <div style={{ fontWeight:700, fontSize:14, color:"#fff", marginBottom:4 }}>{c.name}</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}>{c.desc}</div>
        </Link>
      ))}
      <style>{`.hero-tile:hover { background:rgba(255,255,255,0.18) !important; border-color:rgba(255,200,80,0.55) !important; transform:translateY(-2px); }`}</style>
    </div>
  );
}

export function CategoryCards() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:16 }}>
      {CATS.map(c => (
        <Link key={c.name} href={c.href} className="cat-card">
          <div style={{ fontSize:32, marginBottom:14 }}>{c.icon}</div>
          <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:6 }}>{c.name}</div>
          <div style={{ fontSize:12, color:"#64748b", marginBottom:14, lineHeight:1.55 }}>{c.desc}</div>
          <div style={{ fontSize:12, color:"#2563eb", fontWeight:700 }}>Browse →</div>
        </Link>
      ))}
    </div>
  );
}
