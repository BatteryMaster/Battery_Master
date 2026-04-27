"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number; name: string; category: string;
  price: string; stock: string; image: string;
  badge?: "hot" | "new" | "sale" | null;
  originalPrice?: string;
};

export default function ProductCard({ id, name, category, price, stock, image, badge = null, originalPrice }: Props) {
  const { addToCart } = useCart();
  const [hov, setHov] = useState(false);
  const isLimited = stock.toLowerCase().includes("limited");
  const isOut     = stock.toLowerCase().includes("out");

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? "var(--primary-bdr)" : "var(--border)"}`,
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        transition: "all var(--t)",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "var(--shadow2)" : "var(--shadow)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image */}
      <Link href={`/shop/${id}`} style={{ position:"relative", display:"block", height:190, background:"var(--bg2)", flexShrink:0, overflow:"hidden" }}>
        <Image
          src={image}
          alt={`${name} — ${category} | zeko.pk`}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          style={{ objectFit:"contain", padding:14 }}
        />
        {badge === "hot"  && <span className="bdg bdg-hot"  style={{ position:"absolute", top:10, left:10 }}>HOT</span>}
        {badge === "new"  && <span className="bdg bdg-new"  style={{ position:"absolute", top:10, left:10 }}>NEW</span>}
        {badge === "sale" && <span className="bdg bdg-sale" style={{ position:"absolute", top:10, left:10 }}>SALE</span>}
        {isLimited && (
          <span style={{ position:"absolute", top:10, right:10, background:"var(--accent-dim)", border:"1.5px solid var(--accent-bdr)", color:"var(--accent)", fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:"var(--r-xs)" }}>
            Limited
          </span>
        )}
      </Link>

      {/* Body */}
      <div style={{ padding:"16px", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--primary)" }}>
          {category}
        </div>

        <Link href={`/shop/${id}`}>
          <h3 style={{
            fontSize:14, fontWeight:600, color:"var(--t1)", lineHeight:1.45,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical",
            overflow:"hidden", minHeight:40,
          }}>{name}</h3>
        </Link>

        <div style={{ fontSize:11, fontWeight:600, color:isOut?"var(--red)":isLimited?"var(--yellow)":"var(--green)" }}>
          {isOut ? "● Out of stock" : isLimited ? "● Limited stock" : "● In stock"}
        </div>

        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:2 }}>
          <span style={{ fontSize:19, fontWeight:800, color:"var(--primary)" }}>{price}</span>
          {originalPrice && (
            <span style={{ fontSize:12, color:"var(--t3)", textDecoration:"line-through" }}>{originalPrice}</span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:8, marginTop:"auto", paddingTop:8 }}>
          <button
            onClick={() => !isOut && addToCart({ id, name, category, price, stock })}
            disabled={isOut}
            style={{
              flex:1, padding:"10px 12px", fontSize:13, fontWeight:700,
              border:"none", borderRadius:"var(--r-sm)",
              cursor:isOut?"not-allowed":"pointer",
              background:isOut?"var(--bg2)":"var(--primary)",
              color:isOut?"var(--t3)":"#fff",
              transition:"background var(--t)",
              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
            }}
          >
            {isOut ? "Out of Stock" : "Add to Cart"}
          </button>

          <Link
            href={`/shop/${id}`}
            style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              width:40, height:40,
              background:"var(--bg2)",
              border:"1.5px solid var(--border)",
              borderRadius:"var(--r-sm)",
              color:"var(--t2)",
              flexShrink:0,
              transition:"all var(--t)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
