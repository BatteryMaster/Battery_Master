"use client";
import Link from "next/link";

const CATS = [
  { name: "Modules",     icon: "🔌", desc: "Arduino, Relay, Sensor boards", href: "/categories/modules" },
  { name: "ICs",         icon: "🔬", desc: "555, Op-Amp, Logic ICs",        href: "/categories/ics" },
  { name: "Transistors", icon: "⚡", desc: "BC547, MOSFET, Darlington",      href: "/categories/transistors" },
  { name: "Resistors",   icon: "〰️", desc: "All values, bulk packs",         href: "/categories/resistors" },
  { name: "Tools",       icon: "🔧", desc: "Soldering, Multimeters",          href: "/categories/tools" },
];

export default function CategoryCards() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 14,
    }}>
      {CATS.map(c => (
        <Link key={c.name} href={c.href} className="cat-card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{c.name}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12, lineHeight: 1.5 }}>{c.desc}</div>
          <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 700 }}>Browse →</div>
        </Link>
      ))}
    </div>
  );
}
