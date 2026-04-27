import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse Electronics Categories",
  description: "Explore electronics categories at zeko.pk including modules, ICs, transistors, resistors, and tools.",
};

const CATS = [
  { name: "Modules",     slug: "modules",     icon: "🔌", desc: "Arduino modules, relay modules, sensor modules aur zyada.", count: "12+" },
  { name: "ICs",         slug: "ics",         icon: "🧮", desc: "Integrated circuits for electronics repair and new projects.", count: "8+" },
  { name: "Transistors", slug: "transistors", icon: "⚡", desc: "Common transistors for switching and amplification.", count: "6+" },
  { name: "Resistors",   slug: "resistors",   icon: "🔧", desc: "Resistor packs and values for electronics work.", count: "4+" },
  { name: "Tools",       slug: "tools",       icon: "🛠️", desc: "Soldering tools, multimeters, cutters, and accessories.", count: "6+" },
];

export default function CategoriesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">zeko.pk Categories</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginBottom: 10, marginTop: 8 }}>
            Browse Product Categories
          </h1>
          <p style={{ fontSize: 15, color: "var(--t2)", maxWidth: 520 }}>
            Explore product groups and quickly find the electronics parts and tools you need.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ padding: "40px 0 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {CATS.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} style={{
              background: "#fff",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "28px 24px",
              transition: "all var(--t)",
              display: "block",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--primary-bdr)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow2)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{cat.icon}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--t1)" }}>{cat.name}</h2>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", background: "var(--primary-dim)", padding: "3px 10px", borderRadius: "var(--r-xs)" }}>{cat.count} items</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.65 }}>{cat.desc}</p>
              <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "var(--primary)", display: "flex", alignItems: "center", gap: 4 }}>
                Browse {cat.name} <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
