"use client";

import Link from "next/link";

const categories = [
  { name: "Modules", icon: "🔌", desc: "Arduino, Relay, Sensor modules", href: "/categories/modules", count: "10+" },
  { name: "ICs", icon: "🔬", desc: "555, LM358, logic ICs", href: "/categories/ics", count: "10+" },
  { name: "Transistors", icon: "⚡", desc: "BC547, 2N2222, TIP120", href: "/categories/transistors", count: "5+" },
  { name: "Resistors", icon: "〰️", desc: "All values, bulk packs", href: "/categories/resistors", count: "4+" },
  { name: "Tools", icon: "🔧", desc: "Soldering, multimeters", href: "/categories/tools", count: "7+" },
];

export default function CategoryGrid() {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 20px 0" }}>
      <div style={{
        marginBottom: 32,
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Shop By Category</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>Browse Categories</h2>
        </div>
        <Link href="/categories" style={{
          fontSize: 13, color: "var(--text-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "8px 16px", whiteSpace: "nowrap",
        }}>
          All Categories →
        </Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: 12,
      }}>
        {categories.map((cat) => (
          <CategoryCard key={cat.name} cat={cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  return (
    <Link
      href={cat.href}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        display: "block",
        transition: "var(--transition)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.background = "var(--bg-elevated)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--bg-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{cat.icon}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{cat.name}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 12 }}>{cat.desc}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.04em" }}>{cat.count} products →</div>
    </Link>
  );
}
