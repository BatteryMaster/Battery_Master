import { use } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug === "ics" ? "ICs" : slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${name} — Electronics Category`,
    description: `Browse all ${name} products at zeko.pk`,
  };
}

const CAT_INFO: Record<string, { icon: string; desc: string }> = {
  modules:     { icon: "🔌", desc: "Arduino boards, relay modules, sensor modules aur zyada" },
  ics:         { icon: "🔬", desc: "555 timer, op-amps, logic ICs aur other integrated circuits" },
  transistors: { icon: "⚡", desc: "BC547, 2N2222, IRF540N, TIP120 aur other transistors" },
  resistors:   { icon: "〰️", desc: "Resistor packs, all values, bulk kits aur more" },
  tools:       { icon: "🔧", desc: "Soldering irons, multimeters, jumper wires aur accessories" },
};

export default function CategoryDetailPage({ params }: Props) {
  const { slug } = use(params);
  const name = slug === "ics" ? "ICs" : slug.charAt(0).toUpperCase() + slug.slice(1);
  const info = CAT_INFO[slug] ?? { icon: "📦", desc: `Browse all ${name} products` };

  const products = allProducts.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <main style={{ minHeight: "100vh", background: "#eef2ff" }}>
      <Header />
      <WhatsAppButton />

      {/* Page Header */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #dde3f0", padding: "40px 0 36px" }}>
        <div className="wrap">
          <Link href="/categories" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#2563eb", marginBottom: 20 }}>
            ← Back to Categories
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, background: "#eef2ff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
              {info.icon}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#f97316", marginBottom: 6 }}>
                Category
              </div>
              <h1 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, letterSpacing: "-.02em", color: "#0f172a", marginBottom: 6 }}>
                {name}
              </h1>
              <p style={{ fontSize: 14, color: "#64748b", maxWidth: 480 }}>{info.desc}</p>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 8, background: "#eef2ff", border: "1.5px solid #dde3f0", borderRadius: 8, padding: "8px 16px" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{products.length}</span>
            <span style={{ fontSize: 13, color: "#64748b" }}>products in this category</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="wrap" style={{ padding: "36px 0 80px" }}>
        {products.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}>
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                category={p.category}
                price={p.price}
                stock={p.stock}
                image={p.image}
                badge={p.badge}
              />
            ))}
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1.5px solid #dde3f0", borderRadius: 16, padding: "60px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>📦</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>No products yet</h2>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>This category has no products available right now.</p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", borderRadius: 8, padding: "11px 24px", fontSize: 14, fontWeight: 700 }}>
              Browse All Products →
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
