"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { allProducts } from "@/data/products";

const SK = "bm_admin_products_v2";

type P = {
  id: number; name: string; category: string; price: string;
  stock: string; description: string; image: string;
  badge?: string | null; originalPrice?: string;
};

export default function ProductDetailWrapper({ id }: { id: string }) {
  const [product, setProduct] = useState<P | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Try localStorage first (admin products), then fallback to data/products.ts
    let found: P | null = null;
    try {
      const raw = localStorage.getItem(SK);
      if (raw) {
        const parsed: P[] = JSON.parse(raw);
        found = parsed.find(p => String(p.id) === String(id)) ?? null;
      }
    } catch {}
    // Fallback to static products
    if (!found) {
      found = (allProducts as P[]).find(p => String(p.id) === String(id)) ?? null;
    }
    setProduct(found);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding:"80px 20px", textAlign:"center" }}>
        <div style={{ fontSize:32, marginBottom:12 }}>⏳</div>
        <div style={{ fontSize:15, color:"#64748b" }}>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="wrap" style={{ paddingTop:80, paddingBottom:80, textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🔍</div>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#0f172a", marginBottom:10 }}>Product Not Found</h1>
        <p style={{ fontSize:14, color:"#64748b", marginBottom:24 }}>This product does not exist or may have been removed.</p>
        <Link href="/shop" style={{ background:"#16a34a", color:"#fff", borderRadius:9, padding:"12px 28px", fontWeight:700, fontSize:14, textDecoration:"none" }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const isOut     = (product.stock ?? "").toLowerCase().includes("out");
  const isLimited = (product.stock ?? "").toLowerCase().includes("limited");
  const priceNum  = product.price.replace(/[^0-9]/g, "");
  const catSlug   = product.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="wrap" style={{ paddingTop:24, paddingBottom:80 }}>

      {/* Breadcrumb */}
      <nav style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#64748b", marginBottom:24, flexWrap:"wrap" }}>
        <Link href="/" style={{ color:"#64748b", textDecoration:"none" }}>Home</Link>
        <span>›</span>
        <Link href="/shop" style={{ color:"#64748b", textDecoration:"none" }}>Shop</Link>
        <span>›</span>
        <Link href={`/categories/${catSlug}`} style={{ color:"#64748b", textDecoration:"none" }}>{product.category}</Link>
        <span>›</span>
        <span style={{ color:"#0f172a", fontWeight:600 }}>{product.name}</span>
      </nav>

      {/* Main grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"start" }} className="checkout-grid">

        {/* Image */}
        <div style={{ position:"relative", background:"#f0fdf4", borderRadius:18, border:"1.5px solid #d1fae5", overflow:"hidden", aspectRatio:"1/1", minHeight:280 }}>
          {product.image ? (
            <Image
              src={product.image} alt={product.name}
              fill priority
              style={{ objectFit:"contain", padding:28 }}
              sizes="(max-width:768px) 100vw, 50vw"
              onError={() => {}}
            />
          ) : (
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, color:"#bbf7d0" }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="7" width="14" height="10" rx="2"/><path d="M17 10h2.5a1.5 1.5 0 0 1 0 4H17"/><line x1="7" y1="7" x2="7" y2="5"/><line x1="13" y1="7" x2="13" y2="5"/>
              </svg>
              <span style={{ fontSize:12, fontWeight:700 }}>Battery Master</span>
            </div>
          )}
          {product.badge && product.badge !== "none" && (
            <span style={{
              position:"absolute", top:12, left:12,
              fontSize:10, fontWeight:800, padding:"3px 9px", borderRadius:5,
              background: product.badge==="hot"?"#f97316":product.badge==="new"?"#16a34a":"#dc2626",
              color:"#fff", textTransform:"uppercase", letterSpacing:".06em"
            }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize:11, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:"#16a34a", marginBottom:8 }}>
            {product.category}
          </div>
          <h1 style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:900, color:"#0f172a", marginBottom:6, lineHeight:1.2, letterSpacing:"-.02em" }}>
            {product.name}
          </h1>
          <p style={{ fontSize:12, color:"#94a3b8", marginBottom:18 }}>
            {product.name} — available at Battery Master, Saddar Karachi
          </p>

          {/* Price */}
          <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:14 }}>
            <span style={{ fontSize:32, fontWeight:900, color:"#16a34a", letterSpacing:"-.02em" }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize:15, color:"#94a3b8", textDecoration:"line-through" }}>{product.originalPrice}</span>
            )}
          </div>

          {/* Stock badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700,
            color: isOut?"#dc2626":isLimited?"#d97706":"#16a34a",
            background: isOut?"#fef2f2":isLimited?"#fffbeb":"#f0fdf4",
            border: `1.5px solid ${isOut?"#fecaca":isLimited?"#fde68a":"#bbf7d0"}`,
            padding:"6px 14px", borderRadius:100, marginBottom:20,
          }}>
            ● {isOut?"Out of Stock":isLimited?"Limited Stock":"In Stock"}
          </div>

          {/* Description */}
          {product.description && (
            <p style={{ fontSize:14, color:"#334155", lineHeight:1.85, marginBottom:24 }}>
              {product.description}
            </p>
          )}

          {/* Buttons */}
          <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
            <button
              onClick={() => !isOut && addToCart({ id:product.id, name:product.name, category:product.category, price:product.price, stock:product.stock })}
              disabled={isOut}
              style={{ flex:1, minWidth:140, background:isOut?"#f1f5f9":"#16a34a", color:isOut?"#94a3b8":"#fff", border:"none", borderRadius:10, padding:"13px 20px", fontSize:14, fontWeight:800, cursor:isOut?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              🛒 {isOut?"Out of Stock":"Add to Cart"}
            </button>
            <a href={`https://wa.me/923329891510?text=Salam%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${product.price})%20from%20Battery%20Master`}
              target="_blank" rel="noopener noreferrer"
              style={{ background:"#25D366", color:"#fff", border:"none", borderRadius:10, padding:"13px 20px", fontSize:14, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:8, textDecoration:"none", flexShrink:0 }}>
              📱 WhatsApp Order
            </a>
          </div>

          {/* Trust chips */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 }}>
            {["🚚 Karachi 1–2 days","💳 Online Payment","🔄 7-day returns","✅ Quality checked"].map(t => (
              <span key={t} style={{ fontSize:11, fontWeight:600, color:"#374151", background:"#f0fdf4", border:"1px solid #d1fae5", borderRadius:100, padding:"5px 12px" }}>{t}</span>
            ))}
          </div>

          {/* Highlights box */}
          <div style={{ background:"#f0fdf4", border:"1.5px solid #d1fae5", borderRadius:12, padding:"16px 18px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:10 }}>✦ Why Buy From Us</div>
            {["Quality tested before dispatch","Fast ordering via website or WhatsApp","Delivery across Pakistan","Expert advice available"].map((h,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
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
