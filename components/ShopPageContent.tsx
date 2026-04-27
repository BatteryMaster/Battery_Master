"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

export default function ShopPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--t3)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search products... e.g. Arduino, IC, Multimeter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="inp"
            style={{ paddingLeft: 44 }}
          />
        </div>
      </div>

      {/* Stats + Filters row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "var(--t2)", fontWeight: 500 }}>
          <span style={{ fontWeight: 700, color: "var(--t1)" }}>{filtered.length}</span> products found
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "7px 18px",
                fontSize: 13,
                fontWeight: 600,
                border: selectedCategory === cat ? "none" : "1.5px solid var(--border2)",
                borderRadius: "var(--r-sm)",
                background: selectedCategory === cat ? "var(--primary)" : "#fff",
                color: selectedCategory === cat ? "#fff" : "var(--t2)",
                cursor: "pointer",
                transition: "all var(--t)",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              category={p.category}
              price={p.price}
              stock={p.stock}
              image={p.image}
              badge={p.badge}
            />
          ))}
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "52px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--t1)", marginBottom: 8 }}>No products found</h2>
          <p style={{ fontSize: 14, color: "var(--t2)" }}>Try changing the category or search keyword.</p>
        </div>
      )}
    </>
  );
}
