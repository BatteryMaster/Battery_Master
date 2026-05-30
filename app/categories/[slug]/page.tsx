import { use } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

const CAT_SEO: Record<string, {
  name: string; icon: string; desc: string;
  title: string; metaDesc: string; keywords: string[];
}> = {
  modules: {
    name: "Modules", icon: "🔌",
    desc: "Arduino boards, relay modules, sensor modules, WiFi modules aur zyada",
    title: "Arduino & Electronic Modules Price in Pakistan — Buy Online | zeko.pk",
    metaDesc: "Buy Arduino Uno, Arduino Nano, NodeMCU ESP8266, relay modules, HC-SR04, DHT11, L298N motor driver in Pakistan. Best prices, Karachi delivery, Cash on Delivery.",
    keywords: ["arduino modules pakistan", "buy arduino online pakistan", "NodeMCU price pakistan", "relay module karachi", "HC-SR04 sensor pakistan", "electronics modules karachi"],
  },
  ics: {
    name: "ICs", icon: "🔬",
    desc: "NE555 timer, LM358, LM741 op-amps, voltage regulators, logic ICs aur more",
    title: "ICs & Integrated Circuits Price in Pakistan — Buy Online | zeko.pk",
    metaDesc: "Buy NE555 timer, LM358, LM741, LM7805, LM7812, CD4017, 74HC595, ATmega328P, L293D, ULN2003 ICs in Pakistan. Best prices in Karachi. Cash on Delivery.",
    keywords: ["ICs pakistan", "NE555 IC price pakistan", "LM7805 voltage regulator pakistan", "buy ICs online karachi", "ATmega328P pakistan", "integrated circuits karachi"],
  },
  transistors: {
    name: "Transistors", icon: "⚡",
    desc: "BC547, BC557, 2N2222, TIP120, IRF540N MOSFET aur other transistors",
    title: "Transistors & MOSFETs Price in Pakistan — Buy Online | zeko.pk",
    metaDesc: "Buy BC547, BC557, 2N2222, TIP120 Darlington, IRF540N MOSFET transistors in Pakistan. Wholesale and retail. Best prices in Karachi, Cash on Delivery.",
    keywords: ["transistors pakistan", "BC547 transistor price pakistan", "buy transistors karachi", "IRF540N MOSFET pakistan", "2N2222 transistor pakistan", "TIP120 darlington pakistan"],
  },
  resistors: {
    name: "Resistors", icon: "〰️",
    desc: "Resistor kits, bulk packs — 10K, 1K, potentiometers aur all values",
    title: "Resistors & Resistor Kits Price in Pakistan — Buy Online | zeko.pk",
    metaDesc: "Buy resistor kits, 10K resistors, 1K resistors, potentiometers in Pakistan. 500pc assortment kits, bulk packs. Best prices in Karachi. Cash on Delivery.",
    keywords: ["resistors pakistan", "buy resistors karachi", "10K resistor pack pakistan", "resistor kit pakistan", "potentiometer price pakistan", "electronics resistors karachi"],
  },
  tools: {
    name: "Tools", icon: "🔧",
    desc: "Soldering irons, digital multimeters, breadboards, jumper wires aur accessories",
    title: "Electronics Tools Price in Pakistan — Soldering Iron, Multimeter | zeko.pk",
    metaDesc: "Buy soldering iron, digital multimeter, breadboard, jumper wires, wire stripper, heat shrink in Pakistan. Best prices in Karachi. Cash on Delivery.",
    keywords: ["soldering iron price pakistan", "digital multimeter karachi", "breadboard price pakistan", "jumper wires pakistan", "electronics tools karachi", "buy soldering iron online pakistan"],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CAT_SEO[slug];
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.title,
    description: cat.metaDesc,
    keywords: cat.keywords,
    alternates: { canonical: `https://zeko.pk/categories/${slug}` },
    openGraph: {
      title: cat.title,
      description: cat.metaDesc,
      url: `https://zeko.pk/categories/${slug}`,
      type: "website",
    },
  };
}

export default function CategoryDetailPage({ params }: Props) {
  const { slug } = use(params);
  const cat  = CAT_SEO[slug] ?? { name: slug.charAt(0).toUpperCase() + slug.slice(1), icon: "📦", desc: `Browse all ${slug} products`, title: "", metaDesc: "", keywords: [] };
  const name = cat.name;

  // Category schema for Google
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.title,
    description: cat.metaDesc,
    url: `https://zeko.pk/categories/${slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",       item: "https://zeko.pk" },
        { "@type": "ListItem", position: 2, name: "Categories", item: "https://zeko.pk/categories" },
        { "@type": "ListItem", position: 3, name: name,         item: `https://zeko.pk/categories/${slug}` },
      ],
    },
  };

  const products = allProducts.filter(p => p.category.toLowerCase() === name.toLowerCase());

  return (
    <main style={{ minHeight:"100vh", background:"#eef2ff", overflowX:"hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <WhatsAppButton />

      {/* Page Header */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #dde3f0", padding:"36px 0 32px" }}>
        <div className="wrap">
          {/* Breadcrumb */}
          <nav style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#64748b", marginBottom:16, flexWrap:"wrap" }}>
            <Link href="/" style={{ color:"#64748b" }}>Home</Link>
            <span>›</span>
            <Link href="/categories" style={{ color:"#64748b" }}>Categories</Link>
            <span>›</span>
            <span style={{ color:"#0f172a", fontWeight:600 }}>{name}</span>
          </nav>

          <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <div style={{ width:52, height:52, background:"#eef2ff", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
              {cat.icon}
            </div>
            <div>
              <h1 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, letterSpacing:"-.02em", color:"#0f172a", marginBottom:6 }}>
                {name} in Pakistan
              </h1>
              <p style={{ fontSize:14, color:"#475569" }}>{cat.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"32px", paddingBottom:"80px" }}>
        <div style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>
          <span style={{ fontWeight:800, color:"#0f172a" }}>{products.length}</span> products in {name}
        </div>
        <div className="prod-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(210px,100%),1fr))", gap:16 }}>
          {products.map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} category={p.category}
              price={p.price} stock={p.stock} image={p.image}
              badge={p.badge} originalPrice={p.originalPrice} />
          ))}
        </div>

        {/* SEO text block at bottom */}
        <div style={{ marginTop:56, background:"#fff", border:"1.5px solid #dde3f0", borderRadius:18, padding:"32px 28px" }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:12 }}>
            Buy {name} Online in Pakistan — zeko.pk
          </h2>
          <p style={{ fontSize:14, color:"#475569", lineHeight:1.9 }}>
            zeko.pk is Pakistan trusted electronics store from where you can {name.toLowerCase()} Can be purchased at Best Buy.
            Hum Karachi mein 1–2 days mein deliver karte hain, Cash on Delivery available hai.
            Quality for students, hobbyists, and professionals a like {name.toLowerCase()} available here.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
