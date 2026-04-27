import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSlider from "@/components/ProductSlider";
import WebsiteSchema from "@/components/WebsiteSchema";
import WhatsAppButton from "@/components/WhatsAppButton";
import { HeroCategoryTiles, CategoryCards } from "@/components/CategoryComponents";
import { allProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "zeko.pk — Electronics Components, Modules, ICs & Tools in Pakistan",
  description: "Buy electronics modules, ICs, transistors, resistors, and tools. Fast delivery in Karachi. Cash on Delivery.",
};

export default function Home() {
  const hot   = allProducts.filter(p => p.badge === "hot");
  const fresh = allProducts.filter(p => p.badge === "new");
  const sale  = allProducts.filter(p => p.badge === "sale");

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <WebsiteSchema />
      <Header />
      <WhatsAppButton />

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 45%, #1d4ed8 100%)",
        padding: "80px 0 88px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* dot grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.05) 1px,transparent 0)", backgroundSize:"36px 36px" }}/>
        {/* glow blob */}
        <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(249,115,22,0.14) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 65%)", pointerEvents:"none" }}/>

        <div className="wrap hero-grid" style={{ position:"relative", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:100, padding:"6px 18px", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.90)", marginBottom:28, letterSpacing:".01em" }}>
              🇵🇰 Pakistan&apos;s Trusted Electronics Store
            </div>

            <h1 style={{ fontSize:"clamp(30px,5vw,52px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-.03em", color:"#fff", marginBottom:20 }}>
              Electronics Parts,<br/>
              <span style={{ color:"#fbbf24" }}>Delivered Fast</span>
            </h1>

            <p style={{ fontSize:15, color:"rgba(255,255,255,0.68)", lineHeight:1.85, maxWidth:420, marginBottom:36 }}>
              Modules, ICs, transistors, resistors, sensors aur tools — sab ek jagah. Karachi mein fast delivery aur Cash on Delivery.
            </p>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <Link href="/shop" className="btn btn-accent btn-lg">Shop Now →</Link>
              <Link href="/categories" className="btn btn-ghost btn-lg">Browse Categories</Link>
            </div>

            <div style={{ display:"flex", gap:36, marginTop:48, flexWrap:"wrap" }}>
              {[
                { v:"36+",  l:"Products" },
                { v:"1–2",  l:"Day Delivery" },
                { v:"COD",  l:"Cash on Delivery" },
                { v:"5★",   l:"Customer Rating" },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize:22, fontWeight:800, color:"#fbbf24", lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.48)", marginTop:5, letterSpacing:".01em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <HeroCategoryTiles />
        </div>
      </section>

      {/* ── HOT PRODUCTS ── */}
      <section style={{ padding:"72px 0 0" }}>
        <div className="wrap">
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <div>
              <span className="sec-label">🔥 Bestsellers</span>
              <h2 className="sec-title">Hot Products</h2>
            </div>
            <Link href="/shop" style={{ fontSize:13, color:"var(--primary)", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
              View all <span>→</span>
            </Link>
          </div>
          <ProductSlider products={hot.length >= 3 ? hot : allProducts.slice(0, 8)} />
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section style={{ padding:"64px 0 0" }}>
        <div className="wrap">
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <div>
              <span className="sec-label">✨ Just Added</span>
              <h2 className="sec-title">New Arrivals</h2>
            </div>
            <Link href="/shop" style={{ fontSize:13, color:"var(--primary)", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
              View all <span>→</span>
            </Link>
          </div>
          <ProductSlider products={fresh.length >= 3 ? fresh : allProducts.slice(4, 12)} />
        </div>
      </section>

      {/* ── SALE ── */}
      {sale.length > 0 && (
        <section style={{ padding:"64px 0 0" }}>
          <div className="wrap">
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
              <div>
                <span className="sec-label">🏷️ Special Deals</span>
                <h2 className="sec-title">On Sale</h2>
              </div>
              <Link href="/shop" style={{ fontSize:13, color:"var(--primary)", fontWeight:600 }}>View all →</Link>
            </div>
            <ProductSlider products={sale} />
          </div>
        </section>
      )}

      {/* ── CATEGORIES ── */}
      <section style={{ padding:"80px 0", background:"#fff", borderTop:"1.5px solid var(--border)", borderBottom:"1.5px solid var(--border)", marginTop:72 }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <span className="sec-label">Shop By Type</span>
            <h2 className="sec-title" style={{ marginTop:4 }}>Browse Categories</h2>
          </div>
          <CategoryCards />
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section style={{ padding:"80px 0" }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="sec-label">Simple Process</span>
            <h2 className="sec-title" style={{ marginTop:4 }}>How to Order</h2>
          </div>
          <div className="how-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {[
              { n:"01", t:"Browse & Search",  d:"36+ products across 5 categories." },
              { n:"02", t:"Add to Cart",       d:"Select quantity and add to cart." },
              { n:"03", t:"Place Your Order",  d:"Fill in name, phone and address." },
              { n:"04", t:"We Confirm",        d:"Call/WhatsApp confirm, same day dispatch." },
            ].map(h => (
              <div key={h.n} style={{ background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--r-lg)", padding:"28px 24px" }}>
                <div style={{ fontSize:38, fontWeight:800, color:"var(--bg2)", lineHeight:1, marginBottom:16, fontVariantNumeric:"tabular-nums" }}>{h.n}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"var(--t1)", marginBottom:8 }}>{h.t}</div>
                <div style={{ fontSize:13, color:"var(--t2)", lineHeight:1.7 }}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ paddingBottom:80 }}>
        <div className="wrap">
          <div className="cta-grid" style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
            borderRadius: "var(--r-xl)",
            padding: "52px 48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position:"absolute", top:-60, right:80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
            <div style={{ position:"relative" }}>
              <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:"#fff", letterSpacing:"-.02em", marginBottom:10 }}>
                Apna order abhi place karein
              </h2>
              <p style={{ color:"rgba(255,255,255,0.62)", maxWidth:480, lineHeight:1.75, fontSize:14 }}>
                Website se direct order karein ya WhatsApp par message karein. Cash on Delivery, 1–2 din mein Karachi delivery.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, flexShrink:0, position:"relative" }}>
              <Link href="/shop" className="btn btn-accent btn-md" style={{ justifyContent:"center", minWidth:188 }}>
                Shop Now →
              </Link>
              <a href="https://wa.me/923150220243" target="_blank" rel="noopener noreferrer" className="btn btn-green btn-md" style={{ justifyContent:"center", minWidth:188 }}>
                📱 WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
