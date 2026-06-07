"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

const CAT_ICONS: Record<string, string> = {
  "All": "🔋",
  "JK BMS": "🛡️",
  "Lithium Battery Packed": "🔌",
  "Battery Box": "📦",
  "Lithium Ion Cell": "⚡",
  "LiFePO4 Cell": "🌱",
  "LCD Display": "📺",
  "EVE Bike Kits": "🛵",
  "Chargers": "🔌",
  "EVE Bike Display": "🖥️",
  "Meter Tools": "🔧",
};

export default function Home() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = selectedCat === "All"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCat);

  const hotProducts = allProducts.filter(p => p.badge === "hot");

  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <WhatsAppButton />

      {/* HERO */}
      <section style={{ background:"linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)", padding:"72px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.04) 1px,transparent 0)", backgroundSize:"32px 32px" }}/>
        <div style={{ position:"absolute", top:-120, right:-80, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,0.3) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-100, left:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(249,115,22,0.12) 0%,transparent 65%)", pointerEvents:"none" }}/>

        <div className="wrap" style={{ position:"relative", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:100, padding:"6px 20px", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.85)", marginBottom:24, letterSpacing:".02em" }}>
            🇵🇰 Karachi ka #1 Battery & EV Parts Store
          </div>

          <h1 style={{ fontSize:"clamp(28px,5vw,56px)", fontWeight:900, lineHeight:1.08, letterSpacing:"-.03em", color:"#fff", marginBottom:16 }}>
            Battery Master
            <br/>
            <span style={{ color:"#fbbf24" }}>Saddar, Karachi</span>
          </h1>

          <p style={{ fontSize:16, color:"rgba(255,255,255,0.62)", lineHeight:1.8, maxWidth:520, margin:"0 auto 36px" }}>
            JK BMS · LiFePO4 Cells · E-Bike Kits · Lithium Packs · Chargers · LCD Displays · Silicon Wires & Terminals — sab kuch ek jagah
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#products" style={{ background:"#f97316", color:"#fff", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(249,115,22,0.4)" }}>
              🛒 See All Products 
            </a>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(37,211,102,0.3)" }}>
              📱 WhatsApp Order
            </a>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:40, justifyContent:"center", marginTop:52, flexWrap:"wrap" }}>
            {[
              { v:"44+",    l:"Products" },
              { v:"10",     l:"Categories" },
              { v:"1–2",    l:"Day Delivery" },
              { v:"5★",     l:"Customer Rating" },
            ].map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:26, fontWeight:900, color:"#fbbf24", lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:5, letterSpacing:".04em", textTransform:"uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NO COD NOTICE */}
      <div style={{ background:"#fef2f2", borderBottom:"2px solid #fecaca" }}>
        <div className="wrap" style={{ padding:"12px 0", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#008000" }}> Online Payment Available </span>
          <span style={{ fontSize:13, color:"#64748b" }}>— Hum sirf Bank Transfer / Online Payment accept karte hain. Order ke liye WhatsApp karein.</span>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer" style={{ marginLeft:"auto", background:"#25D366", color:"#fff", padding:"6px 16px", borderRadius:6, fontSize:12, fontWeight:700, textDecoration:"none", flexShrink:0 }}>
            📱 WhatsApp Karein
          </a>
        </div>
      </div>

      {/* HOT PRODUCTS */}
      {hotProducts.length > 0 && (
        <section style={{ padding:"60px 0 0" }}>
          <div className="wrap">
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>🔥 Bestsellers</div>
              <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4, letterSpacing:"-.02em" }}>Hot Products</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16 }}>
              {hotProducts.map(p => <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} price={p.price} stock={p.stock} image={p.image} badge={p.badge} originalPrice={p.originalPrice} />)}
            </div>
          </div>
        </section>
      )}

      {/* ALL PRODUCTS with Category Filter — Daraz style */}
      <section id="products" style={{ padding:"60px 0 80px" }}>
        <div className="wrap">
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#2563eb" }}>🛒 Browse All</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4, letterSpacing:"-.02em" }}>
              {selectedCat === "All" ? "All Products" : selectedCat}
            </h2>
          </div>

          {/* Category filter pills — horizontal scroll like Daraz */}
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:12, marginBottom:24, msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  flexShrink:0,
                  padding:"9px 18px",
                  borderRadius:50,
                  border: selectedCat === cat ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                  background: selectedCat === cat ? "#2563eb" : "#fff",
                  color: selectedCat === cat ? "#fff" : "#374151",
                  fontSize:13, fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:6,
                  transition:"all .15s",
                  boxShadow: selectedCat === cat ? "0 2px 12px rgba(37,99,235,0.3)" : "none",
                }}
              >
                <span>{CAT_ICONS[cat] || "📦"}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Result count */}
          <div style={{ fontSize:13, color:"#64748b", marginBottom:20, fontWeight:500 }}>
            <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products {selectedCat !== "All" && <span>in <strong>{selectedCat}</strong></span>}
            {selectedCat !== "All" && (
              <button onClick={() => setSelectedCat("All")} style={{ marginLeft:12, fontSize:12, color:"#2563eb", background:"none", border:"none", cursor:"pointer", fontWeight:700, padding:0 }}>
                ✕ Clear filter
              </button>
            )}
          </div>

          {/* Products grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16 }}>
            {filtered.map(p => <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} price={p.price} stock={p.stock} image={p.image} badge={p.badge} originalPrice={p.originalPrice} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:16, fontWeight:600 }}>Is category mein koi product nahi</div>
            </div>
          )}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section style={{ padding:"64px 0", background:"#fff", borderTop:"1.5px solid #e2e8f0" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>Simple Process</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4 }}>Order Kaise Karein</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {[
              { n:"01", t:"Product Choose Karein", d:"Apni zaroorat ka product select karein — BMS, cells, charger ya bike kit." },
              { n:"02", t:"WhatsApp Karein",        d:"03329891510 par WhatsApp karein product name aur quantity ke saath." },
              { n:"03", t:"Payment Karein",          d:"Bank transfer ya Easypaisa/JazzCash se payment karein. COD available nahi." },
              { n:"04", t:"Delivery Receive Karein", d:"Karachi mein 1-2 din mein delivery. Pakistan bhar mein courier available." },
            ].map(h => (
              <div key={h.n} style={{ background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"28px 22px" }}>
                <div style={{ fontSize:36, fontWeight:900, color:"#dde3f0", lineHeight:1, marginBottom:14 }}>{h.n}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:8 }}>{h.t}</div>
                <div style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"64px 0" }}>
        <div className="wrap">
          <div style={{ background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)", borderRadius:16, padding:"48px 40px", display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-60, right:100, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%)", pointerEvents:"none" }}/>
            <div style={{ position:"relative" }}>
              <h2 style={{ fontSize:"clamp(18px,3vw,26px)", fontWeight:800, color:"#fff", marginBottom:10 }}>
                Abhi Order Karein — Fast Delivery!
              </h2>
              <p style={{ color:"rgba(255,255,255,0.55)", lineHeight:1.75, fontSize:14, maxWidth:480 }}>
                Karachi mein 1–2 din, Pakistan bhar mein courier. WhatsApp par message karein ya website se order dein.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, flexShrink:0, position:"relative" }}>
              <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px 28px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none", minWidth:200 }}>
                📱 WhatsApp Order
              </a>
              <Link href="/shop" style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"13px 28px", background:"#f97316", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none", minWidth:200 }}>
                🛒 Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
