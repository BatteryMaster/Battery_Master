"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

export default function ShopPageContent() {
  const [cat, setCat]    = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allProducts.filter(p => {
    const matchCat    = cat === "All" || p.category === cat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Search */}
      <div style={{ position:"relative", marginBottom:16 }}>
        <svg style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"#94a3b8", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search products... e.g. Arduino, IC, Multimeter"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width:"100%", background:"#fff", border:"1.5px solid #e2e8f0",
            borderRadius:10, padding:"13px 16px 13px 44px",
            fontSize:14, color:"#0f172a", outline:"none",
            fontFamily:"inherit", transition:"border-color .18s, box-shadow .18s",
          }}
          onFocus={e => { e.target.style.borderColor="#2563eb"; e.target.style.boxShadow="0 0 0 3px rgba(37,99,235,0.08)"; }}
          onBlur={e =>  { e.target.style.borderColor="#e2e8f0"; e.target.style.boxShadow="none"; }}
        />
      </div>

      {/* Filter bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:28 }}>
        <div style={{ fontSize:13, color:"#64748b", fontWeight:500 }}>
          <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products found
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding:"7px 18px", fontSize:13, fontWeight:600,
                border: cat===c ? "none" : "1.5px solid #e2e8f0",
                borderRadius:8,
                background: cat===c ? "#2563eb" : "#fff",
                color:       cat===c ? "#fff"     : "#374151",
                cursor:"pointer", transition:"all .15s", whiteSpace:"nowrap",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:20 }}>
          {filtered.map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
              price={p.price} stock={p.stock} image={p.image} badge={p.badge} />
          ))}
        </div>
      ) : (
        <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:16, padding:"60px 32px", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:16 }}>🔍</div>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#0f172a", marginBottom:8 }}>No products found</h3>
          <p style={{ fontSize:14, color:"#64748b" }}>Try a different category or search keyword.</p>
        </div>
      )}
    </>
  );
}
