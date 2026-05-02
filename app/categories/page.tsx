import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse Electronics Categories",
  description: "Explore electronics categories at zeko.pk — modules, ICs, transistors, resistors, and tools.",
};

const CATS = [
  { name:"Modules",     slug:"modules",     icon:"🔌", desc:"Arduino modules, relay boards, sensor modules aur zyada.", count:"12+" },
  { name:"ICs",         slug:"ics",         icon:"🧮", desc:"Integrated circuits for electronics repair and new projects.", count:"8+"  },
  { name:"Transistors", slug:"transistors", icon:"⚡", desc:"Common transistors for switching and amplification.", count:"6+"  },
  { name:"Resistors",   slug:"resistors",   icon:"〰️", desc:"Resistor packs and values for electronics work.", count:"4+"  },
  { name:"Tools",       slug:"tools",       icon:"🛠️", desc:"Soldering tools, multimeters, cutters, and accessories.", count:"6+"  },
];

export default function CategoriesPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#eef2ff" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background:"#fff", borderBottom:"1.5px solid #dde3f0", padding:"40px 0 36px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:10 }}>Browse</div>
          <h1 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, letterSpacing:"-.02em", color:"#0f172a", marginBottom:10 }}>
            Product Categories
          </h1>
          <p style={{ fontSize:15, color:"#475569", lineHeight:1.7 }}>
            Quickly find the electronics parts and tools you need.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ padding:"36px 0 80px" }}>
        {/* Mobile: 1 column, Tablet: 2 cols, Desktop: auto */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 16,
        }}>
          {CATS.map(cat => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="cat-card">
              <div style={{ fontSize:36, marginBottom:14 }}>{cat.icon}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8, gap:8 }}>
                <h2 style={{ fontSize:17, fontWeight:700, color:"#0f172a" }}>{cat.name}</h2>
                <span style={{ fontSize:11, fontWeight:700, color:"#2563eb", background:"rgba(37,99,235,0.08)", padding:"3px 10px", borderRadius:4, flexShrink:0 }}>
                  {cat.count}
                </span>
              </div>
              <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65, marginBottom:14 }}>{cat.desc}</p>
              <div style={{ fontSize:13, fontWeight:600, color:"#2563eb" }}>Browse {cat.name} →</div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
