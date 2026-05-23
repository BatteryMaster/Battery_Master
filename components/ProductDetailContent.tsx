"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const isOut     = product.stock.toLowerCase().includes("out");
  const isLimited = product.stock.toLowerCase().includes("limited");
  const priceNum  = product.price.replace(/[^0-9]/g, "");
  const catSlug   = product.category.toLowerCase();

  return (
    <div className="wrap" style={{ paddingTop:"28px", paddingBottom:"80px" }}>

      {/* Breadcrumb */}
      <nav style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#64748b", marginBottom:28, flexWrap:"wrap" }}>
        <Link href="/" style={{ color:"#64748b" }}>Home</Link>
        <span>›</span>
        <Link href="/shop" style={{ color:"#64748b" }}>Shop</Link>
        <span>›</span>
        <Link href={`/categories/${catSlug}`} style={{ color:"#64748b" }}>{product.category}</Link>
        <span>›</span>
        <span style={{ color:"#0f172a", fontWeight:600 }}>{product.name}</span>
      </nav>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44, alignItems:"start" }} className="hero-grid">

        {/* Image */}
        <div style={{
          position:"relative", minHeight:380,
          background:"linear-gradient(135deg,#f0f4ff,#e4eaff)",
          borderRadius:20, border:"1.5px solid #dde3f0", overflow:"hidden",
        }}>
          <Image
            src={product.image}
            alt={`${product.name} price in Pakistan — buy at zeko.pk`}
            fill priority
            style={{ objectFit:"contain", padding:36 }}
            sizes="(max-width:768px) 100vw, 50vw"
          />
          {product.badge === "hot"  && <span className="bdg bdg-hot"  style={{ position:"absolute", top:14, left:14 }}>🔥 HOT</span>}
          {product.badge === "new"  && <span className="bdg bdg-new"  style={{ position:"absolute", top:14, left:14 }}>NEW</span>}
          {product.badge === "sale" && <span className="bdg bdg-sale" style={{ position:"absolute", top:14, left:14 }}>SALE</span>}
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize:11, fontWeight:800, letterSpacing:".10em", textTransform:"uppercase", color:"#2563eb", marginBottom:8 }}>
            {product.category}
          </div>

          {/* H1 */}
          <h1 style={{ fontSize:"clamp(20px,3vw,32px)", fontWeight:900, letterSpacing:"-.025em", color:"#0f172a", marginBottom:6, lineHeight:1.2 }}>
            {product.name}
          </h1>

          {/* SEO subtitle */}
          <p style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>
            {product.name} price in Pakistan — buy online at zeko.pk, Karachi
          </p>

          {/* Price */}
          <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:14 }}>
            <span style={{ fontSize:34, fontWeight:900, color:"#2563eb", fontFamily:"monospace", letterSpacing:"-.02em" }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize:16, color:"#94a3b8", textDecoration:"line-through" }}>{product.originalPrice}</span>
            )}
          </div>

          {/* Stock */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700,
            color: isOut ? "#dc2626" : isLimited ? "#d97706" : "#16a34a",
            background: isOut ? "#fef2f2" : isLimited ? "#fffbeb" : "#f0fdf4",
            padding:"6px 14px", borderRadius:100, marginBottom:22,
          }}>
            ● {isOut ? "Out of Stock" : isLimited ? "Limited Stock" : "In Stock"}
          </div>

          <p style={{ fontSize:14, color:"#334155", lineHeight:1.85, marginBottom:24 }}>
            {product.description}
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", gap:10, marginBottom:22, flexWrap:"wrap" }}>
            <button
              onClick={() => !isOut && addToCart({ id:product.id, name:product.name, category:product.category, price:product.price, stock:product.stock })}
              disabled={isOut}
              style={{
                background: isOut ? "#f1f5f9" : "#2563eb",
                color: isOut ? "#94a3b8" : "#fff",
                border:"none", borderRadius:9, padding:"12px 26px",
                fontSize:14, fontWeight:700, cursor: isOut ? "not-allowed" : "pointer",
                display:"flex", alignItems:"center", gap:8,
              }}
            >
              🛒 {isOut ? "Out of Stock" : "Add to Cart"}
            </button>
            <a
              href={`https://wa.me/923150220243?text=Assalam%20alaikum%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(Rs.%20${priceNum})%20from%20zeko.pk`}
              target="_blank" rel="noopener noreferrer"
              style={{ background:"#25D366", color:"#fff", border:"none", borderRadius:9, padding:"12px 22px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}
            >
              📱 WhatsApp Order
            </a>
          </div>

          {/* Trust chips */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 }}>
            {["🚚 Karachi 1–2 days","💳 Cash on Delivery","🔄 7-day returns","✅ Quality checked"].map(t => (
              <span key={t} style={{ fontSize:11.5, fontWeight:600, color:"#374151", background:"#f1f5f9", border:"1px solid #e2e8f0", borderRadius:100, padding:"5px 12px" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <div style={{ background:"#f8faff", border:"1.5px solid #dde3f0", borderRadius:14, padding:"18px 20px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:12 }}>✦ Product Highlights</div>
            {[
              "Quality tested before dispatch",
              "Compatible with Arduino & most microcontrollers",
              "Fast ordering via website or WhatsApp",
              "Cash on Delivery — Karachi 1–2 days",
            ].map((h, i) => (
              <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", marginBottom:8 }}>
                <span style={{ color:"#16a34a", fontWeight:700, flexShrink:0 }}>✓</span>
                <span style={{ fontSize:13, color:"#334155" }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
