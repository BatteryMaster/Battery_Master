"use client";
import Link from "next/link";
import { useState } from "react";

const CATS = [
  { name: "Modules",     icon: "🔌", desc: "Arduino, Relay, Sensor boards", href: "/categories/modules" },
  { name: "ICs",         icon: "🔬", desc: "555, Op-Amp, Logic ICs",        href: "/categories/ics" },
  { name: "Transistors", icon: "⚡", desc: "BC547, MOSFET, Darlington",      href: "/categories/transistors" },
  { name: "Resistors",   icon: "〰️", desc: "All values, bulk packs",         href: "/categories/resistors" },
  { name: "Tools",       icon: "🔧", desc: "Soldering, Multimeters",          href: "/categories/tools" },
];

function Tile({ cat, wide }: { cat: typeof CATS[0]; wide?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={cat.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)",
        border: `1.5px solid ${hov ? "rgba(255,179,71,0.55)" : "rgba(255,255,255,0.14)"}`,
        borderRadius: "var(--r-lg)", padding: "20px 18px",
        transition: "all var(--t)", display: "block",
        gridColumn: wide ? "span 2" : "span 1",
      }}>
      <div style={{ fontSize: 26, marginBottom: 10 }}>{cat.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4 }}>{cat.name}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{cat.desc}</div>
    </Link>
  );
}

export default function HeroCategoryTiles() {
  return (
    <div className="hide-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {CATS.map((c, i) => <Tile key={c.name} cat={c} wide={i === 4} />)}
    </div>
  );
}
