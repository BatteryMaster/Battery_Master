"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/data/products";

const CAT_ICONS: Record<string,string> = {
  "All":"🔋","JK BMS":"🛡️","Lithium Battery Packed":"🔌",
  "Battery Box":"📦","Lithium Ion Cell":"⚡","LiFePO4 Cell":"🌱",
  "LCD Display":"📺","EVE Bike Kits":"🛵","Chargers":"🔌",
  "EVE Bike Display":"🖥️","Meter Tools":"🔧",
};

export default function Home() {
  const [selectedCat, setSelectedCat] = useState("All");
  const filtered   = selectedCat === "All" ? allProducts : allProducts.filter(p => p.category === selectedCat);
  const hotProducts = allProducts.filter(p => p.badge === "hot").slice(0,6);

  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />

      {/* ── HERO ── */}
      <section style={{ background:"linear-gradient(135deg,#052e16 0%,#14532d 55%,#166534 100%)", padding:"72px 0 80px", position:"relative", overflow:"hidden" }}>
        {/* Grid pattern */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.04) 1px,transparent 0)", backgroundSize:"32px 32px" }}/>
        {/* Glow blobs */}
        <div style={{ position:"absolute", top:-100, right:-60, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(74,222,128,0.18) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-40, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(249,115,22,0.10) 0%,transparent 65%)", pointerEvents:"none" }}/>

        <div className="wrap" style={{ position:"relative", textAlign:"center" }}>
          <div className="anim-fadeup" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:100, padding:"6px 20px", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.90)", marginBottom:24 }}>
            🇵🇰 Karachi ka #1 Battery & EV Parts Store
          </div>

          <h1 className="anim-fadeup anim-delay-1" style={{ fontSize:"clamp(28px,5vw,58px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-.03em", color:"#fff", marginBottom:16 }}>
            Battery Master
            <br/>
            <span style={{ color:"#4ade80" }}>Saddar, Karachi</span>
          </h1>

          <p className="anim-fadeup anim-delay-2" style={{ fontSize:16, color:"rgba(255,255,255,0.65)", lineHeight:1.8, maxWidth:520, margin:"0 auto 36px" }}>
            JK BMS · LiFePO4 Cells · E-Bike Kits · Lithium Packs · Chargers · LCD Displays · Silicon Wires
          </p>

          <div className="anim-fadeup anim-delay-3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#products" style={{ background:"#16a34a", color:"#fff", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(22,163,74,0.45)", display:"inline-flex", alignItems:"center", gap:8 }}>
              🛒 Browse Products
            </a>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
              style={{ background:"#25D366", color:"#fff", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(37,211,102,0.35)", display:"inline-flex", alignItems:"center", gap:8 }}>
              📱 WhatsApp Order
            </a>
          </div>

          {/* Stats */}
          <div className="anim-fadeup anim-delay-4" style={{ display:"flex", gap:40, justifyContent:"center", marginTop:52, flexWrap:"wrap" }}>
            {[{v:"44+",l:"Products"},{v:"10",l:"Categories"},{v:"1–2",l:"Day Delivery"},{v:"5★",l:"Customer Rating"}].map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:26, fontWeight:900, color:"#4ade80", lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:5, letterSpacing:".04em", textTransform:"uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NO COD NOTICE ── */}
      <div style={{ background:"#fff7ed", borderBottom:"2px solid #fed7aa" }}>
        <div className="wrap" style={{ padding:"11px 0", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#ea580c" }}>❌ Cash on Delivery not available</span>
          <span style={{ fontSize:13, color:"#64748b" }}>— Bank Transfer / Easypaisa / JazzCash only</span>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ marginLeft:"auto", background:"#25D366", color:"#fff", padding:"6px 16px", borderRadius:6, fontSize:12, fontWeight:700, textDecoration:"none", flexShrink:0 }}>
            📱 WhatsApp
          </a>
        </div>
      </div>

      {/* ── FEATURES STRIP ── */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #d1fae5" }}>
        <div className="wrap" style={{ padding:"16px 0" }}>
          <div style={{ display:"flex", gap:24, overflowX:"auto", msOverflowStyle:"none", scrollbarWidth:"none", flexWrap:"nowrap" }}>
            {[
              {icon:"📦",t:"Fast Delivery",s:"Karachi 1–2 din"},
              {icon:"🔋",t:"Grade-A Cells",s:"EVE · CATL · Samsung"},
              {icon:"🛡️",t:"JK BMS Specialist",s:"4S to 24S"},
              {icon:"🔌",t:"Smart Chargers",s:"12V to 72V"},
              {icon:"💬",t:"WhatsApp Support",s:"Quick reply"},
            ].map(f => (
              <div key={f.t} style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                <span style={{ fontSize:22 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#0f172a", whiteSpace:"nowrap" }}>{f.t}</div>
                  <div style={{ fontSize:11, color:"#64748b", whiteSpace:"nowrap" }}>{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOT PRODUCTS ── */}
      {hotProducts.length > 0 && (
        <section style={{ padding:"60px 0 0" }}>
          <div className="wrap">
            <div style={{ marginBottom:24 }} className="anim-fadeup">
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>🔥 Bestsellers</div>
              <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4 }}>Hot Products</h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,210px),1fr))", gap:16 }}>
              {hotProducts.map((p,i) => (
                <div key={p.id} className={`anim-fadeup anim-delay-${Math.min(i+1,5)}`}>
                  <ProductCard id={p.id} name={p.name} category={p.category} price={p.price} stock={p.stock} image={p.image} badge={p.badge} originalPrice={p.originalPrice} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ALL PRODUCTS — Daraz-style filter ── */}
      <section id="products" style={{ padding:"60px 0 80px" }}>
        <div className="wrap">
          <div style={{ marginBottom:20 }} className="anim-fadeup">
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#16a34a" }}>🛒 Browse</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4 }}>
              {selectedCat === "All" ? "All Products" : selectedCat}
            </h2>
          </div>

          {/* Category pills — horizontal scroll */}
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:12, marginBottom:20, msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCat(cat)}
                style={{
                  flexShrink:0, padding:"9px 18px", borderRadius:50,
                  border: selectedCat===cat ? "2px solid #16a34a" : "1.5px solid #d1fae5",
                  background: selectedCat===cat ? "#16a34a" : "#fff",
                  color: selectedCat===cat ? "#fff" : "#374151",
                  fontSize:13, fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:6,
                  boxShadow: selectedCat===cat ? "0 2px 12px rgba(22,163,74,0.30)" : "none",
                  transition:"all .15s",
                }}>
                <span>{CAT_ICONS[cat]||"📦"}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Count + clear */}
          <div style={{ fontSize:13, color:"#64748b", marginBottom:18, fontWeight:500, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products
            {selectedCat!=="All" && (
              <>
                <span>in <strong>{selectedCat}</strong></span>
                <button onClick={() => setSelectedCat("All")}
                  style={{ fontSize:12, color:"#16a34a", background:"rgba(22,163,74,0.08)", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700, padding:"3px 10px" }}>
                  ✕ Clear
                </button>
              </>
            )}
          </div>

          {/* Products grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,210px),1fr))", gap:16 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} price={p.price} stock={p.stock} image={p.image} badge={p.badge} originalPrice={p.originalPrice} />
            ))}
          </div>

          {filtered.length===0 && (
            <div style={{ textAlign:"center", padding:"64px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:16, fontWeight:600 }}>No products found</div>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section style={{ padding:"64px 0", background:"#fff", borderTop:"1.5px solid #d1fae5" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>Simple Process</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:6 }}>How to Order</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,200px),1fr))", gap:16 }}>
            {[
              {n:"01",t:"Choose Your Product",d:"Select the product you need — BMS, cells, charger or bike kit."},
              {n:"02",t:"WhatsApp Us",d:"Send a WhatsApp message with product name and quantity."},
              {n:"03",t:"Make Payment",d:"Bank transfer ya Easypaisa/JazzCash. COD not available hai."},
              {n:"04",t:"Receive Delivery",d:"Karachi: 1-2 days. All Pakistan via courier."},
            ].map((h,i) => (
              <div key={h.n} className={`anim-fadeup anim-delay-${i+1}`}
                style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:14, padding:"28px 22px" }}>
                <div style={{ fontSize:36, fontWeight:900, color:"#bbf7d0", lineHeight:1, marginBottom:14 }}>{h.n}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:8 }}>{h.t}</div>
                <div style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:"64px 0", background:"#f0fdf4" }}>
        <div className="wrap">
          <div className="cta-inner" style={{ background:"linear-gradient(135deg,#052e16 0%,#14532d 100%)", borderRadius:16, padding:"clamp(28px,4vw,48px)", display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-60, right:80, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(74,222,128,0.08) 0%,transparent 70%)", pointerEvents:"none" }}/>
            <div style={{ position:"relative" }}>
              <h2 style={{ fontSize:"clamp(18px,3vw,26px)", fontWeight:800, color:"#fff", marginBottom:10 }}>
                Order Now — Fast Delivery!
              </h2>
              <p style={{ color:"rgba(255,255,255,0.55)", lineHeight:1.75, fontSize:14, maxWidth:480 }}>
                Karachi: 1–2 days. WhatsApp us or order from the shop.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0, position:"relative", minWidth:180 }}>
              <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px 24px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none" }}>
                📱 WhatsApp Order
              </a>
              <Link href="/shop"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"13px 24px", background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none" }}>
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
