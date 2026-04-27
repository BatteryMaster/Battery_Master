"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductSlider({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const { addToCart } = useCart();
  const max = Math.max(0, products.length - 4);

  const go = (dir: number) => {
    const next = Math.max(0, Math.min(idx + dir, max));
    setIdx(next);
    if (ref.current) {
      const w = ref.current.clientWidth / Math.min(4, products.length);
      ref.current.scrollTo({ left: w * next, behavior: "smooth" });
    }
  };

  if (!products.length) return null;

  return (
    <div style={{ position: "relative" }}>
      {idx > 0 && (
        <button onClick={() => go(-1)} style={{ position:"absolute", left:-16, top:"45%", transform:"translateY(-50%)", zIndex:10, width:38, height:38, borderRadius:"50%", background:"#fff", border:"1.5px solid var(--border2)", color:"var(--primary)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"var(--shadow2)", cursor:"pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {idx < max && (
        <button onClick={() => go(1)} style={{ position:"absolute", right:-16, top:"45%", transform:"translateY(-50%)", zIndex:10, width:38, height:38, borderRadius:"50%", background:"#fff", border:"1.5px solid var(--border2)", color:"var(--primary)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"var(--shadow2)", cursor:"pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}

      <div ref={ref} style={{ display:"flex", gap:16, overflowX:"hidden", padding:"4px 2px 12px" }}>
        {products.map(p => (
          <Card
            key={p.id}
            p={p}
            onAdd={() => addToCart({ id:p.id, name:p.name, category:p.category, price:p.price, stock:p.stock })}
          />
        ))}
      </div>

      {max > 0 && (
        <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:12 }}>
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => go(i - idx)} style={{ width:i===idx?24:8, height:8, borderRadius:4, border:"none", padding:0, background:i===idx?"var(--primary)":"var(--border2)", cursor:"pointer", transition:"all .2s" }} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ p, onAdd }: { p: Product; onAdd: () => void }) {
  const [hov, setHov] = useState(false);
  const isOut = p.stock.toLowerCase().includes("out");
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ minWidth:"calc(25% - 12px)", flexShrink:0, background:"#fff", border:`1.5px solid ${hov?"var(--primary-bdr)":"var(--border)"}`, borderRadius:"var(--r-lg)", overflow:"hidden", transition:"all var(--t)", transform:hov?"translateY(-4px)":"none", boxShadow:hov?"var(--shadow2)":"var(--shadow)", display:"flex", flexDirection:"column" }}
    >
      {/* suppressHydrationWarning on the image wrapper fixes srcSet SSR mismatch */}
      <Link href={`/shop/${p.id}`} style={{ position:"relative", display:"block", height:175, background:"var(--bg2)", flexShrink:0 }}>
        <Image
          src={p.image}
          alt={`${p.name} | zeko.pk`}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          style={{ objectFit:"contain", padding:12 }}
          suppressHydrationWarning
        />
        {p.badge==="hot"  && <span className="bdg bdg-hot"  style={{ position:"absolute", top:8, left:8 }}>HOT</span>}
        {p.badge==="new"  && <span className="bdg bdg-new"  style={{ position:"absolute", top:8, left:8 }}>NEW</span>}
        {p.badge==="sale" && <span className="bdg bdg-sale" style={{ position:"absolute", top:8, left:8 }}>SALE</span>}
      </Link>
      <div style={{ padding:"12px 14px 14px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--primary)" }}>{p.category}</div>
        <Link href={`/shop/${p.id}`}>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--t1)", lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:36 }}>{p.name}</div>
        </Link>
        <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
          <span style={{ fontSize:16, fontWeight:800, color:"var(--primary)" }}>{p.price}</span>
          {p.originalPrice && <span style={{ fontSize:11, color:"var(--t3)", textDecoration:"line-through" }}>{p.originalPrice}</span>}
        </div>
        <button onClick={onAdd} disabled={isOut} style={{ padding:"9px 0", fontSize:12, fontWeight:700, width:"100%", border:"none", borderRadius:"var(--r-sm)", cursor:isOut?"not-allowed":"pointer", background:isOut?"var(--bg2)":"var(--primary)", color:isOut?"var(--t3)":"#fff", marginTop:2, transition:"background var(--t)" }}>
          {isOut ? "Out of Stock" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
