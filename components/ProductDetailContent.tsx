"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const isOut = product.stock.toLowerCase().includes("out");
  const isLimited = product.stock.toLowerCase().includes("limited");

  return (
    <div className="wrap" style={{ padding: "36px 0 80px" }}>
      <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--primary)", marginBottom: 28 }}>
        ← Back to Shop
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="hero-grid">

        {/* Image */}
        <div style={{ position: "relative", minHeight: 380, background: "var(--bg2)", borderRadius: "var(--r-xl)", border: "1.5px solid var(--border)", overflow: "hidden" }}>
          <Image
            src={product.image}
            alt={`${product.name} — ${product.category} | zeko.pk`}
            fill
            style={{ objectFit: "contain", padding: 32 }}
            sizes="(max-width:768px) 100vw, 50vw"
          />
          {product.badge === "hot"  && <span className="bdg bdg-hot"  style={{ position: "absolute", top: 16, left: 16 }}>HOT</span>}
          {product.badge === "new"  && <span className="bdg bdg-new"  style={{ position: "absolute", top: 16, left: 16 }}>NEW</span>}
          {product.badge === "sale" && <span className="bdg bdg-sale" style={{ position: "absolute", top: 16, left: 16 }}>SALE</span>}
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 8 }}>
            {product.category}
          </div>
          <h1 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginBottom: 14 }}>
            {product.name}
          </h1>

          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginBottom: 12 }}>{product.price}</div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600,
            color: isOut ? "var(--red)" : isLimited ? "var(--yellow)" : "var(--green)",
            background: isOut ? "var(--red-dim)" : isLimited ? "rgba(217,119,6,0.1)" : "rgba(22,163,74,0.1)",
            padding: "6px 14px", borderRadius: 100, marginBottom: 22 }}>
            ● {isOut ? "Out of Stock" : isLimited ? "Limited Stock" : "In Stock"}
          </div>

          {product.description && (
            <p style={{ fontSize: 15, color: "var(--t2)", lineHeight: 1.8, marginBottom: 26 }}>
              {product.description}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <button
              onClick={() => !isOut && addToCart({ id: product.id, name: product.name, category: product.category, price: product.price, stock: product.stock })}
              disabled={isOut}
              className={`btn btn-md ${isOut ? "" : "btn-primary"}`}
              style={isOut ? { background: "var(--bg2)", color: "var(--t3)", cursor: "not-allowed", border: "none", padding: "11px 26px", fontSize: 14, fontWeight: 700, borderRadius: "var(--r-sm)" } : {}}
            >
              {isOut ? "Out of Stock" : "Add to Cart"}
            </button>
            <a
              href={`https://wa.me/923150220243?text=Assalam%20alaikum%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(Rs.${product.price})`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-green btn-md"
            >
              📱 WhatsApp Order
            </a>
          </div>

          {/* Highlights */}
          <div style={{ background: "var(--bg)", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "20px 22px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--t1)", marginBottom: 14 }}>Product Highlights</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Quality checked product", "Suitable for electronics projects and repair work", "Fast and simple ordering experience", "Cash on delivery — Karachi 1–2 days"].map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--green)", fontWeight: 700, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: "var(--t2)" }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
