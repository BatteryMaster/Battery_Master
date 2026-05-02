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
      const w = ref.current.scrollWidth / products.length;
      ref.current.scrollTo({ left: w * next, behavior: "smooth" });
    }
  };

  if (!products.length) return null;

  return (
    <div style={{ position:"relative" }}>
      {idx > 0 && (
        <button onClick={() => go(-1)} style={{ position:"absolute", left:-18, top:"42%", transform:"translateY(-50%)", zIndex:10, width:38, height:38, borderRadius:"50%", background:"#fff", border:"1.5px solid #e2e8f0", color:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.10)", cursor:"pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {idx < max && (
        <button onClick={() => go(1)} style={{ position:"absolute", right:-18, top:"42%", transform:"translateY(-50%)", zIndex:10, width:38, height:38, borderRadius:"50%", background:"#fff", border:"1.5px solid #e2e8f0", color:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.10)", cursor:"pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}

      <div ref={ref} style={{ display:"flex", gap:16, overflowX:"hidden", padding:"4px 2px 12px" }}>
        {products.map(p => (
          <SliderCard key={p.id} p={p}
            onAdd={() => addToCart({ id:p.id, name:p.name, category:p.category, price:p.price, stock:p.stock })} />
        ))}
      </div>

      {max > 0 && (
        <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:12 }}>
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => go(i - idx)}
              style={{ width:i===idx?24:8, height:8, borderRadius:4, border:"none", padding:0, background:i===idx?"#2563eb":"#c8d6e8", cursor:"pointer", transition:"all .2s" }} />
          ))}
        </div>
      )}
    </div>
  );
}

function SliderCard({ p, onAdd }: { p: Product; onAdd: () => void }) {
  const isOut = p.stock.toLowerCase().includes("out");
  return (
    <div className="prod-card" style={{ minWidth:"calc(25% - 12px)", flexShrink:0 }}>
      <Link href={`/shop/${p.id}`} style={{ position:"relative", display:"block", height:175, background:"#eef2ff", flexShrink:0 }}>
        <Image src={p.image} alt={`${p.name} | zeko.pk`} fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          style={{ objectFit:"contain", padding:12 }} suppressHydrationWarning />
        {p.badge==="hot"  && <span className="bdg bdg-hot"  style={{ position:"absolute", top:8, left:8 }}>HOT</span>}
        {p.badge==="new"  && <span className="bdg bdg-new"  style={{ position:"absolute", top:8, left:8 }}>NEW</span>}
        {p.badge==="sale" && <span className="bdg bdg-sale" style={{ position:"absolute", top:8, left:8 }}>SALE</span>}
      </Link>
      <div style={{ padding:"12px 14px 14px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#2563eb" }}>{p.category}</div>
        <Link href={`/shop/${p.id}`}>
          <div style={{ fontSize:13, fontWeight:600, color:"#0f172a", lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:36 }}>{p.name}</div>
        </Link>
        <span style={{ fontSize:16, fontWeight:800, color:"#2563eb" }}>{p.price}</span>
        <button className="add-btn" style={{ padding:"9px 0", fontSize:12, marginTop:2 }}
          disabled={isOut} onClick={onAdd}>
          {isOut ? "Out of Stock" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
