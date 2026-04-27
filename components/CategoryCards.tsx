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

function Card({ cat }: { cat: typeof CATS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={cat.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? "var(--primary-bdr)" : "var(--border)"}`,
        borderRadius: "var(--r-lg)", padding: "28px 24px",
        transition: "all var(--t)", display: "block",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "var(--shadow2)" : "none",
      }}>
      <div style={{ fontSize: 32, marginBottom: 14 }}>{cat.icon}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--t1)", marginBottom: 6 }}>{cat.name}</div>
      <div style={{ fontSize: 12, color: "var(--t3)", marginBottom: 14 }}>{cat.desc}</div>
      <div style={{ fontSize: 12, color: "var(--primary)", fontWeight: 700 }}>Browse →</div>
    </Link>
  );
}

export default function CategoryCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14 }}>
      {CATS.map(c => <Card key={c.name} cat={c} />)}
    </div>
  );
}
