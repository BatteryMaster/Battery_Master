"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

export default function ShopPageContent() {
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q") || "";

  const [cat, setCat]     = useState("All");
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
      {/* ── Search bar ── */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <svg
          style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#94a3b8", pointerEvents:"none" }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search products... e.g. Arduino, IC, Multimeter"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => { e.target.style.borderColor="#2563eb"; e.target.style.boxShadow="0 0 0 3px rgba(37,99,235,0.08)"; }}
          onBlur={e  => { e.target.style.borderColor="#e2e8f0"; e.target.style.boxShadow="none"; }}
          style={{
            width:"100%", background:"#fff", border:"1.5px solid #e2e8f0",
            borderRadius:10, padding:"13px 44px 13px 42px",
            fontSize:14, color:"#0f172a", outline:"none",
            fontFamily:"inherit", transition:"border-color .18s, box-shadow .18s",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              background:"#e2e8f0", border:"none", borderRadius:"50%",
              width:22, height:22, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#64748b", fontSize:11, fontWeight:700,
            }}
          >✕</button>
        )}
      </div>

      {/* ── Filter bar — horizontally scrollable on mobile ── */}
      <div style={{ marginBottom: 20 }}>
        {/* Count */}
        <div style={{ fontSize:13, color:"#64748b", fontWeight:500, marginBottom:10 }}>
          <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products found
          {search && <span style={{ color:"#2563eb", marginLeft:6 }}>for &quot;{search}&quot;</span>}
        </div>

        {/* Category buttons — scroll on mobile */}
        <div style={{
          display: "flex", gap: 6, flexWrap: "wrap",
          overflowX: "auto", paddingBottom: 4,
          // Hide scrollbar but keep scroll
          msOverflowStyle: "none", scrollbarWidth: "none",
        }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding:"7px 16px", fontSize:13, fontWeight:600,
                border: cat===c ? "none" : "1.5px solid #e2e8f0",
                borderRadius:8, flexShrink: 0,
                background: cat===c ? "#2563eb" : "#fff",
                color:       cat===c ? "#fff"    : "#374151",
                cursor:"pointer", transition:"all .15s",
                boxShadow: cat===c ? "0 2px 8px rgba(37,99,235,0.25)" : "none",
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* ── Product grid ── */}
      {filtered.length > 0 ? (
        <div
          className="prod-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(210px, 100%), 1fr))",
            gap: 16,
          }}
        >
          {filtered.map(p => (
            <ProductCard
              key={p.id} id={p.id} name={p.name} category={p.category}
              price={p.price} stock={p.stock} image={p.image}
              badge={p.badge} originalPrice={p.originalPrice}
            />
          ))}
        </div>
      ) : (
        <div style={{
          background:"#fff", border:"1.5px solid #e2e8f0",
          borderRadius:16, padding:"60px 24px", textAlign:"center",
        }}>
          <div style={{ fontSize:44, marginBottom:16 }}>🔍</div>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#0f172a", marginBottom:8 }}>No products found</h3>
          <p style={{ fontSize:14, color:"#64748b", marginBottom:20 }}>Try a different category or search keyword.</p>
          <button
            onClick={() => { setSearch(""); setCat("All"); }}
            style={{ background:"#2563eb", color:"#fff", border:"none", borderRadius:8, padding:"10px 24px", fontSize:14, fontWeight:700, cursor:"pointer" }}
          >Reset Search</button>
        </div>
      )}
    </>
  );
}
