"use client";
import Link from "next/link";
import { useState } from "react";

const CATS = [
  { name:"Modules",     icon:"🔌", desc:"Arduino, Relay, Sensor boards", href:"/categories/modules" },
  { name:"ICs",         icon:"🔬", desc:"555, Op-Amp, Logic ICs",        href:"/categories/ics" },
  { name:"Transistors", icon:"⚡", desc:"BC547, MOSFET, Darlington",      href:"/categories/transistors" },
  { name:"Resistors",   icon:"〰️", desc:"All values, bulk packs",         href:"/categories/resistors" },
  { name:"Tools",       icon:"🔧", desc:"Soldering, Multimeters",          href:"/categories/tools" },
];

function HeroTile({ cat, wide }: { cat: typeof CATS[0]; wide?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={cat.href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.09)", border:`1.5px solid ${hov?"rgba(255,179,71,0.55)":"rgba(255,255,255,0.14)"}`, borderRadius:"var(--r-lg)", padding:"18px 16px", transition:"all var(--t)", display:"block", gridColumn:wide?"span 2":"span 1" }}>
      <div style={{ fontSize:24, marginBottom:8 }}>{cat.icon}</div>
      <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:3 }}>{cat.name}</div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{cat.desc}</div>
    </Link>
  );
}

export function HeroCategoryTiles() {
  return (
    <div className="hide-mob" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
      {CATS.map((c, i) => <HeroTile key={c.name} cat={c} wide={i === 4} />)}
    </div>
  );
}

function SectionCard({ cat }: { cat: typeof CATS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={cat.href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:"#fff", border:`1.5px solid ${hov?"var(--primary-bdr)":"var(--border)"}`, borderRadius:"var(--r-lg)", padding:"26px 22px", transition:"all var(--t)", display:"block", transform:hov?"translateY(-3px)":"none", boxShadow:hov?"var(--shadow2)":"var(--shadow)" }}>
      <div style={{ fontSize:30, marginBottom:12 }}>{cat.icon}</div>
      <div style={{ fontSize:15, fontWeight:700, color:"var(--t1)", marginBottom:5 }}>{cat.name}</div>
      <div style={{ fontSize:12, color:"var(--t3)", marginBottom:12, lineHeight:1.5 }}>{cat.desc}</div>
      <div style={{ fontSize:12, color:"var(--primary)", fontWeight:700 }}>Browse →</div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))", gap:14 }}>
      {CATS.map(c => <SectionCard key={c.name} cat={c} />)}
    </div>
  );
}
