"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { useProducts } from "@/hooks/useProducts";

const ICONS: Record<string,string> = {
  "All":"🔋","JK BMS":"🛡️","Lithium Battery Packed":"🔌","Battery Box":"📦",
  "Lithium Ion Cell":"⚡","LiFePO4 Cell":"🌱","LCD Display":"📺",
  "EVE Bike Kits":"🛵","Chargers":"🔌","EVE Bike Display":"🖥️","Meter Tools":"🔧",
};

/* Skeleton card — matches real card layout */
function Skel() {
  return (
    <div className="prod-card" style={{ pointerEvents:"none" }}>
      <div className="prod-card-img skeleton" />
      <div className="prod-card-body">
        <div className="skeleton" style={{ height:9, width:"40%", borderRadius:4 }}/>
        <div className="skeleton" style={{ height:12, borderRadius:4 }}/>
        <div className="skeleton" style={{ height:12, width:"70%", borderRadius:4 }}/>
        <div className="skeleton" style={{ height:14, width:"50%", borderRadius:4, marginTop:2 }}/>
        <div className="skeleton" style={{ height:34, borderRadius:8, marginTop:8 }}/>
      </div>
    </div>
  );
}

export default function Home() {
  const { products, categories, loading } = useProducts();
  const [cat, setCat] = useState("All");

  const filtered = cat==="All" ? products : products.filter(p=>p.category===cat);
  const hot      = products.filter(p=>p.badge==="hot").slice(0,6);

  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />

      {/* SLIDER */}
      <HeroSlider />

      {/* FEATURES */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #d1fae5" }}>
        <div className="wrap" style={{ padding:"13px 0" }}>
          <div style={{ display:"flex", gap:20, overflowX:"auto", msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {[
              {i:"📦",t:"Fast Delivery",s:"Karachi 1–2 days"},
              {i:"🔋",t:"Grade-A Cells",s:"EVE · CATL · Samsung"},
              {i:"🛡️",t:"JK BMS",s:"4S to 24S"},
              {i:"🔌",t:"Chargers",s:"12V to 72V"},
              {i:"💬",t:"WhatsApp",s:"Quick reply"},
            ].map(f=>(
              <div key={f.t} style={{ display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
                <span style={{ fontSize:18 }}>{f.i}</span>
                <div>
                  <div style={{ fontSize:11.5, fontWeight:700, color:"#0f172a", whiteSpace:"nowrap" }}>{f.t}</div>
                  <div style={{ fontSize:10.5, color:"#64748b", whiteSpace:"nowrap" }}>{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOT PRODUCTS */}
      {(loading || hot.length>0) && (
        <section style={{ padding:"48px 0 0" }}>
          <div className="wrap">
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>🔥 Bestsellers</div>
              <h2 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#0f172a", marginTop:3 }}>Hot Products</h2>
            </div>
            <div className="prod-grid">
              {loading ? Array(6).fill(0).map((_,i)=><Skel key={i}/>) : hot.map(p=>(
                <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
                  price={p.price} stock={p.stock} image={p.image}
                  badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice}/>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}
      <section id="products" style={{ padding:"48px 0 80px" }}>
        <div className="wrap">
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#16a34a" }}>🛒 Browse</div>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#0f172a", marginTop:3 }}>
              {cat==="All" ? "All Products" : cat}
            </h2>
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:11, marginBottom:16, msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {categories.map(c=>(
              <button key={c} onClick={()=>setCat(c)}
                style={{ flexShrink:0, padding:"7px 16px", borderRadius:50, border:cat===c?"2px solid #16a34a":"1.5px solid #d1fae5", background:cat===c?"#16a34a":"#fff", color:cat===c?"#fff":"#374151", fontSize:12.5, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5, boxShadow:cat===c?"0 2px 10px rgba(22,163,74,0.25)":"none", transition:"all .15s", whiteSpace:"nowrap" }}>
                <span>{ICONS[c]||"📦"}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>

          {/* Count */}
          {!loading && (
            <div style={{ fontSize:12.5, color:"#64748b", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontWeight:800, color:"#0f172a" }}>{filtered.length}</span> products
              {cat!=="All" && (
                <button onClick={()=>setCat("All")}
                  style={{ fontSize:11.5, color:"#16a34a", background:"rgba(22,163,74,0.08)", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700, padding:"3px 9px" }}>
                  ✕ Clear
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          <div className="prod-grid">
            {loading
              ? Array(8).fill(0).map((_,i)=><Skel key={i}/>)
              : filtered.map(p=>(
                  <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
                    price={p.price} stock={p.stock} image={p.image}
                    badge={p.badge as "hot"|"new"|"sale"|null} originalPrice={p.originalPrice}/>
                ))
            }
          </div>

          {!loading && filtered.length===0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:15, fontWeight:600 }}>No products found</div>
            </div>
          )}
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section style={{ padding:"56px 0", background:"#fff", borderTop:"1.5px solid #d1fae5" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316" }}>Simple Process</div>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#0f172a", marginTop:5 }}>How to Order</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,190px),1fr))", gap:12 }}>
            {[
              {n:"01",t:"Choose Product",d:"Select BMS, cells, charger or bike kit."},
              {n:"02",t:"WhatsApp Us",d:"Message at 03329891510 with product and quantity."},
              {n:"03",t:"Make Payment",d:"Bank transfer or Easypaisa/JazzCash."},
              {n:"04",t:"Receive Delivery",d:"Karachi: 1–2 days. Courier across Pakistan."},
            ].map(h=>(
              <div key={h.n} style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:14, padding:"22px 18px" }}>
                <div style={{ fontSize:28, fontWeight:900, color:"#bbf7d0", lineHeight:1, marginBottom:10 }}>{h.n}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:"#0f172a", marginBottom:5 }}>{h.t}</div>
                <div style={{ fontSize:12.5, color:"#64748b", lineHeight:1.65 }}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"56px 0", background:"#f0fdf4" }}>
        <div className="wrap">
          <div className="cta-grid" style={{ background:"linear-gradient(135deg,#052e16,#14532d)", borderRadius:16, padding:"clamp(22px,4vw,42px)", position:"relative", overflow:"hidden" }}>
            <div>
              <h2 style={{ fontSize:"clamp(17px,2.8vw,24px)", fontWeight:800, color:"#fff", marginBottom:7 }}>Order Now — Fast Delivery!</h2>
              <p style={{ color:"rgba(255,255,255,0.55)", fontSize:13.5 }}>Karachi: 1–2 days. WhatsApp or order from shop.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9, minWidth:160 }}>
              <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"11px 20px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:13.5, fontWeight:800, textDecoration:"none" }}>
                📱 WhatsApp
              </a>
              <Link href="/shop"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"11px 20px", background:"#16a34a", color:"#fff", borderRadius:10, fontSize:13.5, fontWeight:800, textDecoration:"none" }}>
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
