"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number; name: string; category: string;
  price: string; stock: string; image: string;
  badge?: "hot" | "new" | "sale" | null;
  originalPrice?: string;
};

export default function ProductCard({ id, name, category, price, stock, image, badge = null, originalPrice }: Props) {
  const { addToCart } = useCart();
  const isLimited = stock.toLowerCase().includes("limited");
  const isOut     = stock.toLowerCase().includes("out");

  return (
    <div className="prod-card">
      <Link href={`/shop/${id}`} style={{ position:"relative", display:"block", height:190, background:"#eef2ff", flexShrink:0, overflow:"hidden" }}>
        <Image src={image} alt={`${name} — ${category} | zeko.pk`} fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          style={{ objectFit:"contain", padding:14 }} suppressHydrationWarning />
        {badge==="hot"  && <span className="bdg bdg-hot"  style={{ position:"absolute", top:10, left:10 }}>HOT</span>}
        {badge==="new"  && <span className="bdg bdg-new"  style={{ position:"absolute", top:10, left:10 }}>NEW</span>}
        {badge==="sale" && <span className="bdg bdg-sale" style={{ position:"absolute", top:10, left:10 }}>SALE</span>}
      </Link>

      <div style={{ padding:"16px", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#2563eb" }}>{category}</div>
        <Link href={`/shop/${id}`}>
          <h3 style={{ fontSize:14, fontWeight:600, color:"#0f172a", lineHeight:1.45, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:40 }}>{name}</h3>
        </Link>
        <div style={{ fontSize:11, fontWeight:600, color:isOut?"#dc2626":isLimited?"#d97706":"#16a34a" }}>
          {isOut?"● Out of stock":isLimited?"● Limited stock":"● In stock"}
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
          <span style={{ fontSize:18, fontWeight:800, color:"#2563eb" }}>{price}</span>
          {originalPrice && <span style={{ fontSize:12, color:"#94a3b8", textDecoration:"line-through" }}>{originalPrice}</span>}
        </div>
        <div style={{ display:"flex", gap:8, marginTop:"auto", paddingTop:8 }}>
          <button className="add-btn" disabled={isOut}
            onClick={() => !isOut && addToCart({ id, name, category, price, stock })}>
            {isOut ? "Out of Stock" : "Add to Cart"}
          </button>
          <Link href={`/shop/${id}`} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:40, height:40, background:"#eef2ff", border:"1.5px solid #e2e8f0", borderRadius:8, color:"#475569", flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
