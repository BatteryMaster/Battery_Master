"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const CAT_ICONS: Record<string,string> = {
  "All":"🔋","JK BMS":"🛡️","Lithium Battery Packed":"🔌",
  "Battery Box":"📦","Lithium Ion Cell":"⚡","LiFePO4 Cell":"🌱",
  "LCD Display":"📺","EVE Bike Kits":"🛵","Chargers":"🔌",
  "EVE Bike Display":"🖥️","Meter Tools":"🔧",
};

export default function ShopPageContent() {
  const { products, categories } = useProducts();
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q") || "";
  const [cat, setCat]       = useState("All");
  const [search, setSearch] = useState(urlQ);

  useEffect(() => { setSearch(urlQ); }, [urlQ]);

  const filtered = products.filter(p => {
    const matchCat    = cat === "All" || p.category === cat;
    const matchSearch = search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Search */}
      <div style={{ position:"relative", marginBottom:12 }}>
        <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#94a3b8", pointerEvents:"none" }}
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ width:"100%", padding:"11px 40px 11px 42px", border:"1.5px solid #d1fae5", borderRadius:10, fontSize:14, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box", transition:"border-color .2s" }}
          onFocus={e => e.target.style.borderColor="#16a34a"}
          onBlur={e => e.target.style.borderColor="#d1fae5"}
        />
        {search && (
          <button onClick={() => setSearch("")}
            style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"#e2e8f0", border:"none", borderRadius:"50%", width:20, height:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b", fontSize:10, fontWeight:700 }}>
            ✕
          </button>
        )}
      </div>

      {/* Category pills */}
      <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:10, marginBottom:14, msOverflowStyle:"none", scrollbarWidth:"none" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{
              flexShrink:0, padding:"7px 15px", borderRadius:50,
              border: cat===c ? "2px solid #16a34a" : "1.5px solid #d1fae5",
              background: cat===c ? "#16a34a" : "#fff",
              color: cat===c ? "#fff" : "#374151",
              fontSize:12, fontWeight:700, cursor:"pointer",
              display:"flex", alignItems:"center", gap:5,
              boxShadow: cat===c ? "0 2px 10px rgba(22,163,74,0.25)" : "none",
              transition:"all .15s",
            }}>
            <span>{CAT_ICONS[c] || "📦"}</span>
            <span>{c}</span>
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize:13, color:"#64748b", marginBottom:16, fontWeight:500, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products
        {search && <span style={{ color:"#16a34a" }}>for &quot;{search}&quot;</span>}
        {(search || cat !== "All") && (
          <button onClick={() => { setSearch(""); setCat("All"); }}
            style={{ fontSize:11, color:"#16a34a", background:"rgba(22,163,74,0.08)", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700, padding:"3px 9px" }}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="prod-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
              price={p.price} stock={p.stock} image={p.image}
              badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
          <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
          <div style={{ fontSize:16, fontWeight:600, color:"#374151" }}>No products found</div>
          <div style={{ fontSize:13, marginTop:6, marginBottom:16 }}>Try a different search or category</div>
          <button onClick={() => { setSearch(""); setCat("All"); }}
            style={{ padding:"10px 20px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
            View All
          </button>
        </div>
      )}
    </>
  );
}
