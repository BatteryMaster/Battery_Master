"use client";
import Link from "next/link";

const CATS = [
  { name:"Modules",     icon:"🔌", desc:"Arduino, Relay, Sensor boards", href:"/categories/modules" },
  { name:"ICs",         icon:"🔬", desc:"555, Op-Amp, Logic ICs",        href:"/categories/ics" },
  { name:"Transistors", icon:"⚡", desc:"BC547, MOSFET, Darlington",      href:"/categories/transistors" },
  { name:"Resistors",   icon:"〰️", desc:"All values, bulk packs",         href:"/categories/resistors" },
  { name:"Tools",       icon:"🔧", desc:"Soldering, Multimeters",          href:"/categories/tools" },
];

export default function HeroCategoryTiles() {
  return (
    <div className="hide-mob" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      {CATS.map((c, i) => (
        <Link key={c.name} href={c.href} className="hero-tile"
          style={{ gridColumn: i === 4 ? "span 2" : "span 1" }}>
          <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
          <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:4 }}>{c.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{c.desc}</div>
        </Link>
      ))}
    </div>
  );
}
