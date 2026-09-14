"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { useProducts } from "@/hooks/useProducts";

const CAT_ICONS: Record<string,string> = {
  "All":"🔋","JK BMS":"🛡️","Lithium Battery Packed":"🔌","Battery Box":"📦",
  "Lithium Ion Cell":"⚡","LiFePO4 Cell":"🌱","LCD Display":"📺",
  "EVE Bike Kits":"🛵","Chargers":"🔌","EVE Bike Display":"🖥️","Meter Tools":"🔧",
};

function SkeletonCard() {
  return (
    <div style={{ background:"#fff", borderRadius:16, border:"1.5px solid #e8f5ec", overflow:"hidden" }}>
      <div style={{ height:160, background:"linear-gradient(90deg,#f0fdf4 25%,#dcfce7 50%,#f0fdf4 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
      <div style={{ padding:14 }}>
        <div style={{ height:10, background:"#dcfce7", borderRadius:4, marginBottom:8, width:"40%", animation:"shimmer 1.5s infinite" }} />
        <div style={{ height:13, background:"#e8f5ec", borderRadius:4, marginBottom:6, animation:"shimmer 1.5s infinite" }} />
        <div style={{ height:13, background:"#e8f5ec", borderRadius:4, width:"70%", marginBottom:10, animation:"shimmer 1.5s infinite" }} />
        <div style={{ height:16, background:"#dcfce7", borderRadius:4, width:"50%", marginBottom:12, animation:"shimmer 1.5s infinite" }} />
        <div style={{ height:36, background:"#bbf7d0", borderRadius:8, animation:"shimmer 1.5s infinite" }} />
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}

export default function Home() {
  const { products, categories, loading } = useProducts();
  const [selectedCat, setSelectedCat]     = useState("All");

  const filtered    = selectedCat==="All" ? products : products.filter(p => p.category===selectedCat);
  const hotProducts = products.filter(p => p.badge==="hot").slice(0,6);

  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />

      {/* SLIDER */}
      <HeroSlider />

      {/* FEATURES STRIP */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #d1fae5" }}>
        <div className="wrap" style={{ padding:"14px 0" }}>
          <div style={{ display:"flex", gap:24, overflowX:"auto", msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {[
              {i:"📦",t:"Fast Delivery",s:"Karachi 1–2 days"},
              {i:"🔋",t:"Grade-A Cells",s:"EVE · CATL · Samsung"},
              {i:"🛡️",t:"JK BMS Specialist",s:"4S to 24S"},
              {i:"🔌",t:"Smart Chargers",s:"12V to 72V"},
              {i:"💬",t:"WhatsApp Support",s:"Quick reply"},
            ].map(f => (
              <div key={f.t} style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                <span style={{ fontSize:20 }}>{f.i}</span>
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
      {(loading || hotProducts.length > 0) && (
        <section style={{ padding:"56px 0 0" }}>
          <div className="wrap">
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>🔥 Bestsellers</div>
              <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#0f172a", marginTop:4 }}>Hot Products</h2>
            </div>
            <div className="prod-grid">
              {loading
                ? Array(6).fill(0).map((_,i) => <SkeletonCard key={i} />)
                : hotProducts.map(p => (
                    <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
                      price={p.price} stock={p.stock} image={p.image}
                      badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice} />
                  ))
              }
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
              {selectedCat==="All" ? "All Products" : selectedCat}
            </h2>
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:12, marginBottom:18, msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCat(cat)}
                style={{ flexShrink:0, padding:"8px 18px", borderRadius:50, border:selectedCat===cat?"2px solid #16a34a":"1.5px solid #d1fae5", background:selectedCat===cat?"#16a34a":"#fff", color:selectedCat===cat?"#fff":"#374151", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, boxShadow:selectedCat===cat?"0 2px 12px rgba(22,163,74,0.28)":"none", transition:"all .15s" }}>
                <span>{CAT_ICONS[cat]||"📦"}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Count */}
          {!loading && (
            <div style={{ fontSize:13, color:"#64748b", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products
              {selectedCat!=="All" && (
                <button onClick={() => setSelectedCat("All")}
                  style={{ fontSize:12, color:"#16a34a", background:"rgba(22,163,74,0.08)", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700, padding:"3px 10px" }}>
                  ✕ Clear
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          <div className="prod-grid">
            {loading
              ? Array(8).fill(0).map((_,i) => <SkeletonCard key={i} />)
              : filtered.map(p => (
                  <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
                    price={p.price} stock={p.stock} image={p.image}
                    badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice} />
                ))
            }
          </div>

          {!loading && filtered.length===0 && (
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
          <div className="cta-grid" style={{ background:"linear-gradient(135deg,#052e16,#14532d)", borderRadius:16, padding:"clamp(24px,4vw,44px)", display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"center" }}>
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
