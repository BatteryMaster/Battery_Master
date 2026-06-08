import { use } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

// Map URL slug → category name in products.ts
const SLUG_TO_CAT: Record<string, { name: string; icon: string; desc: string }> = {
  "jk-bms":                { name:"JK BMS",                icon:"🛡️", desc:"4S to 24S JK Active Balancing BMS — Bluetooth, RS485, solar & EV ke liye" },
  "lithium-battery-packed": { name:"Lithium Battery Packed", icon:"🔋", desc:"12V to 72V ready-made lithium packs with BMS — solar, e-bike, UPS ke liye" },
  "battery-box":            { name:"Battery Box",            icon:"📦", desc:"12V to 72V plastic & aluminum battery enclosures — waterproof & lockable" },
  "lithium-ion-cell":       { name:"Lithium Ion Cell",       icon:"⚡", desc:"Samsung, LG, Panasonic Grade-A 18650 cells — DIY battery packs ke liye" },
  "lifepo4-cell":           { name:"LiFePO4 Cell",           icon:"🌱", desc:"EVE LF105, LF280K, CATL 200Ah, 304Ah Grade-A — solar & EV ke liye best" },
  "lcd-display":            { name:"LCD Display",            icon:"📺", desc:"Battery level indicators, coulometers, e-bike S866 & 72V dashboards" },
  "eve-bike-kits":          { name:"EVE Bike Kits",          icon:"🛵", desc:"48V 1000W to 72V 3000W complete e-bike conversion kits with motor & controller" },
  "chargers":               { name:"Chargers",               icon:"🔌", desc:"12V to 72V smart CC/CV lithium chargers — auto cutoff, LED indicator" },
  "eve-bike-display":       { name:"EVE Bike Display",       icon:"🖥️", desc:"S900 TFT, KT LCD3, SW102 wireless e-bike displays" },
  "meter-tools":            { name:"Meter Tools",            icon:"🔧", desc:"Silicon wires, XT60, Anderson connectors, nickel strip, spot welder & more" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = SLUG_TO_CAT[slug];
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} — Battery Master Karachi`,
    description: `Buy ${cat.name} in Karachi, Pakistan. ${cat.desc}. Battery Master, Shop No 78, Saddar Karachi.`,
  };
}

export default function CategoryDetailPage({ params }: Props) {
  const { slug } = use(params);
  const cat = SLUG_TO_CAT[slug] ?? { name: slug, icon: "📦", desc: `Browse all ${slug} products` };
  const products = allProducts.filter(p => p.category === cat.name);

  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9", overflowX:"hidden" }}>
      <Header />
      <WhatsAppButton />

      {/* Page Header */}
      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"36px 0 32px" }}>
        <div className="wrap">
          <nav style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:16, flexWrap:"wrap" }}>
            <Link href="/" style={{ color:"rgba(255,255,255,0.5)", textDecoration:"none" }}>Home</Link>
            <span>›</span>
            <Link href="/categories" style={{ color:"rgba(255,255,255,0.5)", textDecoration:"none" }}>Categories</Link>
            <span>›</span>
            <span style={{ color:"#fff", fontWeight:600 }}>{cat.name}</span>
          </nav>
          <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <div style={{ width:54, height:54, background:"rgba(255,255,255,0.12)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>
              {cat.icon}
            </div>
            <div>
              <h1 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:"#fff", marginBottom:6 }}>{cat.name}</h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)" }}>{cat.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"32px", paddingBottom:"80px" }}>
        <div style={{ fontSize:13, color:"#64748b", marginBottom:20, fontWeight:500 }}>
          <span style={{ fontWeight:800, color:"#0f172a" }}>{products.length}</span> products in {cat.name}
        </div>

        {products.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(210px,100%),1fr))", gap:16 }}>
            {products.map(p => <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} price={p.price} stock={p.stock} image={p.image} badge={p.badge} originalPrice={p.originalPrice} />)}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"80px 20px", color:"#94a3b8" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📦</div>
            <div style={{ fontSize:16, fontWeight:600, color:"#374151" }}>Is category mein abhi products nahi hain</div>
            <div style={{ fontSize:13, marginTop:6, marginBottom:20 }}>WhatsApp par inquiry karein</div>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"12px 24px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              📱 WhatsApp Inquiry
            </a>
          </div>
        )}

        <div style={{ marginTop:32, display:"flex", gap:10, flexWrap:"wrap" }}>
          <Link href="/categories" style={{ display:"inline-flex", alignItems:"center", padding:"10px 20px", background:"#fff", color:"#0f172a", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none" }}>
            ← Saari Categories
          </Link>
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 20px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none" }}>
            📱 WhatsApp Order
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
