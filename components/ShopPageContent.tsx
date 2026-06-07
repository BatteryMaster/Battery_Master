"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

const CAT_ICONS: Record<string, string> = {
  "All": "🔋", "JK BMS": "🛡️", "Lithium Battery Packed": "🔌",
  "Battery Box": "📦", "Lithium Ion Cell": "⚡", "LiFePO4 Cell": "🌱",
  "LCD Display": "📺", "EVE Bike Kits": "🛵", "Chargers": "🔌",
  "EVE Bike Display": "🖥️", "Meter Tools": "🔧",
};

export default function ShopPageContent() {
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q") || "";
  const [cat, setCat]       = useState("All");
  const [search, setSearch] = useState(urlQ);

  useEffect(() => { setSearch(urlQ); }, [urlQ]);

  const filtered = allProducts.filter(p => {
    const matchCat    = cat === "All" || p.category === cat;
    const matchSearch = search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Search bar */}
      <div style={{ position:"relative", marginBottom:14 }}>
        <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#94a3b8", pointerEvents:"none" }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search... e.g. JK BMS, LiFePO4, Charger, XT60"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => { e.target.style.borderColor="#2563eb"; e.target.style.boxShadow="0 0 0 3px rgba(37,99,235,0.08)"; }}
          onBlur={e  => { e.target.style.borderColor="#e2e8f0"; e.target.style.boxShadow="none"; }}
          style={{ width:"100%", background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:10, padding:"13px 44px 13px 42px", fontSize:14, color:"#0f172a", outline:"none", fontFamily:"inherit", transition:"border-color .18s, box-shadow .18s" }}
        />
        {search && (
          <button onClick={() => setSearch("")}
            style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"#e2e8f0", border:"none", borderRadius:"50%", width:22, height:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b", fontSize:11, fontWeight:700 }}>
            ✕
          </button>
        )}
      </div>

      {/* Filter bar */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:13, color:"#64748b", fontWeight:500, marginBottom:10 }}>
          <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products
          {search && <span style={{ color:"#2563eb", marginLeft:6 }}>for &quot;{search}&quot;</span>}
        </div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, msOverflowStyle:"none", scrollbarWidth:"none" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                flexShrink:0, padding:"8px 16px", borderRadius:50,
                border: cat === c ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                background: cat === c ? "#2563eb" : "#fff",
                color: cat === c ? "#fff" : "#374151",
                fontSize:12, fontWeight:700, cursor:"pointer",
                display:"flex", alignItems:"center", gap:5,
                boxShadow: cat === c ? "0 2px 10px rgba(37,99,235,0.3)" : "none",
                transition:"all .15s",
              }}>
              <span>{CAT_ICONS[c] || "📦"}</span>
              <span>{c}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:16 }}>
          {filtered.map(p => <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} price={p.price} stock={p.stock} image={p.image} badge={p.badge} originalPrice={p.originalPrice} />)}
        </div>
      ) : (
        <div style={{ textAlign:"center", padding:"64px 20px", color:"#94a3b8" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
          <div style={{ fontSize:16, fontWeight:600, color:"#374151" }}>Koi product nahi mila</div>
          <div style={{ fontSize:13, marginTop:6 }}>Alag search ya category try karein</div>
          <button onClick={() => { setSearch(""); setCat("All"); }}
            style={{ marginTop:16, padding:"10px 20px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
            Sab Dekhein
          </button>
        </div>
      )}
    </>
  );
}
