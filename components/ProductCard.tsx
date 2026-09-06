"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number; name: string; category: string;
  price: string; stock?: string; image: string;
  badge?: "hot" | "new" | "sale" | null;
  originalPrice?: string;
};

export default function ProductCard({ id, name, category, price, stock, image, badge=null, originalPrice }: Props) {
  const { addToCart } = useCart();
  const [imgErr, setImgErr] = useState(false);
  const s     = (stock ?? "In Stock").toLowerCase();
  const isOut = s.includes("out");
  const isLtd = s.includes("limited");

  return (
    <div className="prod-card">
      {/* Image */}
      <Link href={`/shop/${id}`} className="prod-card-img">
        {!imgErr && image ? (
          /* Use regular img tag — works for ALL: base64, URL, any format, NO delay */
          <img
            src={image}
            alt={name}
            onError={() => setImgErr(true)}
            style={{ width:"100%", height:"100%", objectFit:"contain", padding:12, display:"block" }}
          />
        ) : (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, color:"#bbf7d0", width:"100%", height:"100%" }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="7" width="14" height="10" rx="2"/>
              <path d="M17 10h2.5a1.5 1.5 0 0 1 0 4H17"/>
              <line x1="7" y1="7" x2="7" y2="5"/>
              <line x1="13" y1="7" x2="13" y2="5"/>
            </svg>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase" }}>Battery Master</span>
          </div>
        )}
        {badge && <span className={`bdg bdg-${badge}`}>{badge.toUpperCase()}</span>}
      </Link>

      {/* Body */}
      <div className="prod-card-body">
        <div className="prod-card-cat">{category}</div>
        <Link href={`/shop/${id}`}>
          <div className="prod-card-name">{name}</div>
        </Link>
        <div className="prod-card-stock" style={{ color: isOut?"#dc2626":isLtd?"#d97706":"#16a34a" }}>
          {isOut ? "● Out of stock" : isLtd ? "● Limited stock" : "● In stock"}
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:6, flexWrap:"wrap" }}>
          <span className="prod-card-price">{price}</span>
          {originalPrice && <span style={{ fontSize:11, color:"#94a3b8", textDecoration:"line-through" }}>{originalPrice}</span>}
        </div>
        <div className="prod-card-btns">
          <button className="add-btn" disabled={isOut}
            onClick={() => !isOut && addToCart({ id, name, category, price, stock: stock ?? "In Stock" })}>
            {isOut ? "Out of Stock" : "Add to Cart"}
          </button>
          <Link href={`/shop/${id}`} className="view-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
