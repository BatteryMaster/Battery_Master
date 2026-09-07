"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import HeroSlider from "@/components/HeroSlider";

const CAT_ICONS: Record<string,string> = {
  "All":"🔋","JK BMS":"🛡️","Lithium Battery Packed":"🔌",
  "Battery Box":"📦","Lithium Ion Cell":"⚡","LiFePO4 Cell":"🌱",
  "LCD Display":"📺","EVE Bike Kits":"🛵","Chargers":"🔌",
  "EVE Bike Display":"🖥️","Meter Tools":"🔧",
};

export default function Home() {
  const { products, categories } = useProducts();
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered    = selectedCat === "All" ? products : products.filter(p => p.category === selectedCat);
  const hotProducts = products.filter(p => p.badge === "hot").slice(0, 6);

  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />

      {/* SLIDER */}
      <HeroSlider />

      {/* HERO */}
      <section style={{ background:"linear-gradient(135deg,#052e16 0%,#14532d 55%,#166534 100%)", padding:"72px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.04) 1px,transparent 0)", backgroundSize:"32px 32px" }}/>
        <div style={{ position:"absolute", top:-100, right:-60, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(74,222,128,0.18) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-40, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(249,115,22,0.10) 0%,transparent 65%)", pointerEvents:"none" }}/>

        <div className="wrap" style={{ position:"relative", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:100, padding:"6px 20px", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.90)", marginBottom:24 }}>
            🇵🇰 Karachi's #1 Battery & EV Parts Store
          </div>
          <h1 style={{ fontSize:"clamp(28px,5vw,58px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-.03em", color:"#fff", marginBottom:16 }}>
            Battery Master<br/><span style={{ color:"#4ade80" }}>Saddar, Karachi</span>
          </h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.65)", lineHeight:1.8, maxWidth:520, margin:"0 auto 36px" }}>
            JK BMS · LiFePO4 Cells · E-Bike Kits · Lithium Packs · Chargers · LCD Displays · Silicon Wires — all in one place
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#products" style={{ background:"#16a34a", color:"#fff", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(22,163,74,0.45)" }}>
              🛒 Browse Products
            </a>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
              style={{ background:"#25D366", color:"#fff", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(37,211,102,0.35)" }}>
              📱 WhatsApp Order
            </a>
          </div>
          <div style={{ display:"flex", gap:40, justifyContent:"center", marginTop:52, flexWrap:"wrap" }}>
            {[{v:String(products.length)+"+",l:"Products"},{v:"10",l:"Categories"},{v:"1–2",l:"Day Delivery"},{v:"5★",l:"Rating"}].map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:26, fontWeight:900, color:"#4ade80", lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:5, letterSpacing:".04em", textTransform:"uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #d1fae5" }}>
        <div className="wrap" style={{ padding:"14px 0" }}>
          <div style={{ display:"flex", gap:24, overflowX:"auto", msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {[
              {icon:"📦",t:"Fast Delivery",s:"Karachi 1–2 days"},
              {icon:"🔋",t:"Grade-A Cells",s:"EVE · CATL · Samsung"},
              {icon:"🛡️",t:"JK BMS Specialist",s:"4S to 24S"},
              {icon:"🔌",t:"Smart Chargers",s:"12V to 72V"},
              {icon:"💬",t:"WhatsApp Support",s:"Quick reply"},
            ].map(f => (
              <div key={f.t} style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                <span style={{ fontSize:20 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#0f172a", whiteSpace:"nowrap" }}>{f.t}</div>
                  <div style={{ fontSize:11, color:"#64748b", whiteSpace:"nowrap" }}>{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOT PRODUCTS */}
      {hotProducts.length > 0 && (
        <section style={{ padding:"56px 0 0" }}>
          <div className="wrap">
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>🔥 Bestsellers</div>
              <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4 }}>Hot Products</h2>
            </div>
            <div className="prod-grid">
              {hotProducts.map(p => (
                <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
                  price={p.price} stock={p.stock} image={p.image}
                  badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}
      <section id="products" style={{ padding:"56px 0 80px" }}>
        <div className="wrap">
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#16a34a" }}>🛒 Browse</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4 }}>
              {selectedCat === "All" ? "All Products" : selectedCat}
            </h2>
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:12, marginBottom:18, msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCat(cat)}
                style={{
                  flexShrink:0, padding:"8px 18px", borderRadius:50,
                  border: selectedCat===cat ? "2px solid #16a34a" : "1.5px solid #d1fae5",
                  background: selectedCat===cat ? "#16a34a" : "#fff",
                  color: selectedCat===cat ? "#fff" : "#374151",
                  fontSize:13, fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:6,
                  boxShadow: selectedCat===cat ? "0 2px 12px rgba(22,163,74,0.28)" : "none",
                  transition:"all .15s",
                }}>
                <span>{CAT_ICONS[cat] || "📦"}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Count */}
          <div style={{ fontSize:13, color:"#64748b", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products
            {selectedCat !== "All" && (
              <button onClick={() => setSelectedCat("All")}
                style={{ fontSize:12, color:"#16a34a", background:"rgba(22,163,74,0.08)", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700, padding:"3px 10px" }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="prod-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
                price={p.price} stock={p.stock} image={p.image}
                badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:16, fontWeight:600 }}>No products found</div>
            </div>
          )}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section style={{ padding:"60px 0", background:"#fff", borderTop:"1.5px solid #d1fae5" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>Simple Process</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:6 }}>How to Order</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,200px),1fr))", gap:14 }}>
            {[
              {n:"01",t:"Choose Product",d:"Select the product you need — BMS, cells, charger or bike kit."},
              {n:"02",t:"WhatsApp Us",d:"Send a message at 03329891510 with product name and quantity."},
              {n:"03",t:"Make Payment",d:"Bank transfer or Easypaisa/JazzCash."},
              {n:"04",t:"Receive Delivery",d:"Karachi: 1–2 days. Courier available across Pakistan."},
            ].map(h => (
              <div key={h.n} style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:14, padding:"24px 20px" }}>
                <div style={{ fontSize:32, fontWeight:900, color:"#bbf7d0", lineHeight:1, marginBottom:12 }}>{h.n}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:6 }}>{h.t}</div>
                <div style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"60px 0", background:"#f0fdf4" }}>
        <div className="wrap">
          <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", borderRadius:16, padding:"clamp(24px,4vw,44px)", display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"center" }} className="cta-grid">
            <div>
              <h2 style={{ fontSize:"clamp(18px,3vw,24px)", fontWeight:800, color:"#fff", marginBottom:8 }}>Order Now — Fast Delivery!</h2>
              <p style={{ color:"rgba(255,255,255,0.55)", fontSize:14 }}>Karachi: 1–2 days. WhatsApp us or order from the shop.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, minWidth:170 }}>
              <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px 22px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none" }}>
                📱 WhatsApp
              </a>
              <Link href="/shop"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"12px 22px", background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none" }}>
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
