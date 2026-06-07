"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductSlider({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const { addToCart } = useCart();

  // Responsive: 1 on mobile, 2 on tablet, 4 on desktop
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerPage(w < 540 ? 1 : w < 900 ? 2 : 4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const max = Math.max(0, products.length - perPage);

  const go = (dir: number) => {
    const next = Math.max(0, Math.min(idx + dir, max));
    setIdx(next);
    if (ref.current) {
      const cardW = ref.current.scrollWidth / products.length;
      ref.current.scrollTo({ left: cardW * next, behavior: "smooth" });
    }
  };

  if (!products.length) return null;

  const cardWidth = perPage === 1
    ? "calc(100%)"
    : perPage === 2
    ? "calc(50% - 8px)"
    : "calc(25% - 12px)";

  return (
    <div style={{ position: "relative" }}>
      {/* Prev button */}
      {idx > 0 && (
        <button onClick={() => go(-1)} style={{
          position: "absolute", left: -18, top: "42%", transform: "translateY(-50%)",
          zIndex: 10, width: 38, height: 38, borderRadius: "50%",
          background: "#fff", border: "1.5px solid #dde3f0", color: "#2563eb",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)", cursor: "pointer",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      )}
      {/* Next button */}
      {idx < max && (
        <button onClick={() => go(1)} style={{
          position: "absolute", right: -18, top: "42%", transform: "translateY(-50%)",
          zIndex: 10, width: 38, height: 38, borderRadius: "50%",
          background: "#fff", border: "1.5px solid #dde3f0", color: "#2563eb",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)", cursor: "pointer",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* Slider track */}
      <div ref={ref} style={{
        display: "flex", gap: 16,
        overflowX: "hidden", padding: "4px 2px 12px",
      }}>
        {products.map(p => (
          <SliderCard
            key={p.id} p={p} cardWidth={cardWidth}
            onAdd={() => addToCart({ id: p.id, name: p.name, category: p.category, price: p.price, stock: p.stock })}
          />
        ))}
      </div>

      {/* Dots */}
      {max > 0 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => go(i - idx)} style={{
              width: i === idx ? 24 : 8, height: 8, borderRadius: 4,
              border: "none", padding: 0,
              background: i === idx ? "#2563eb" : "#c5cfe8",
              cursor: "pointer", transition: "all .2s",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function SliderCard({ p, onAdd, cardWidth }: { p: Product; onAdd: () => void; cardWidth: string }) {
  const isOut = p.stock.toLowerCase().includes("out");
  return (
    <div style={{
      minWidth: cardWidth, flexShrink: 0,
      background: "#fff", border: "1.5px solid #dde3f0",
      borderRadius: 16, overflow: "hidden",
      display: "flex", flexDirection: "column",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      transition: "all .18s",
    }}>
      <Link href={`/shop/${p.id}`} style={{
        position: "relative", display: "block", height: 175,
        background: "#eef2ff", flexShrink: 0,
      }}>
        <Image
          src={p.image}
          alt={`${p.name} | batterymaster.pk`}
          fill
          sizes="(max-width:540px) 100vw, (max-width:900px) 50vw, 25vw"
          style={{ objectFit: "contain", padding: 12 }}
          suppressHydrationWarning
        />
        {p.badge === "hot"  && <span className="bdg bdg-hot"  style={{ position: "absolute", top: 8, left: 8 }}>HOT</span>}
        {p.badge === "new"  && <span className="bdg bdg-new"  style={{ position: "absolute", top: 8, left: 8 }}>NEW</span>}
        {p.badge === "sale" && <span className="bdg bdg-sale" style={{ position: "absolute", top: 8, left: 8 }}>SALE</span>}
      </Link>
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#2563eb" }}>
          {p.category}
        </div>
        <Link href={`/shop/${p.id}`}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 36 }}>
            {p.name}
          </div>
        </Link>
        <span style={{ fontSize: 17, fontWeight: 800, color: "#2563eb" }}>{p.price}</span>
        <button
          disabled={isOut}
          onClick={onAdd}
          style={{
            padding: "10px 0", fontSize: 12, fontWeight: 700,
            width: "100%", border: "none", borderRadius: 8,
            cursor: isOut ? "not-allowed" : "pointer",
            background: isOut ? "#f1f5f9" : "#2563eb",
            color: isOut ? "#94a3b8" : "#fff",
            marginTop: 2, transition: "background .15s",
          }}
        >
          {isOut ? "Out of Stock" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
