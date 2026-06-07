import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductDetailContent from "@/components/ProductDetailContent";
import ProductSchema from "@/components/ProductSchema";
import { allProducts } from "@/data/products";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find(p => p.id === Number(id));
  if (!product) return { title: "Product Not Found" };

  const priceNum = product.price.replace(/[^0-9]/g, "");
  const catSlug  = product.category.toLowerCase();

  return {
    title: `${product.name} Price in Pakistan — Buy Online Rs. ${priceNum} | batterymaster.pk`,
    description: `Buy ${product.name} in Pakistan at Rs. ${priceNum}. ${product.description} Fast delivery in Karachi, Cash on Delivery. Shop at batterymaster.pk.`,
    keywords: [
      `${product.name.toLowerCase()} pakistan`,
      `${product.name.toLowerCase()} price pakistan`,
      `buy ${product.name.toLowerCase()} online`,
      `${product.name.toLowerCase()} karachi`,
      `${product.category.toLowerCase()} pakistan`,
    ],
    alternates: { canonical: `https://batterymaster.pk/shop/${product.id}` },
    openGraph: {
      title: `${product.name} — Rs. ${priceNum} | batterymaster.pk`,
      description: `${product.description} Available in Pakistan. Fast Karachi delivery, COD.`,
      url: `https://batterymaster.pk/shop/${product.id}`,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <main style={{ minHeight:"100vh", background:"var(--bg)", overflowX:"hidden" }}>
        <Header />
        <div className="wrap" style={{ paddingTop:"80px", paddingBottom:"80px", textAlign:"center" }}>
          <div style={{ fontSize:56, marginBottom:20 }}>🔍</div>
          <h1 style={{ fontSize:28, fontWeight:800, color:"#0f172a", marginBottom:12 }}>Product Not Found</h1>
          <p style={{ fontSize:15, color:"#64748b", marginBottom:28 }}>This product does not exist.</p>
          <Link href="/shop" style={{ background:"#2563eb", color:"#fff", borderRadius:9, padding:"12px 28px", fontWeight:700, fontSize:14 }}>Back to Shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight:"100vh", background:"#f5f7ff", overflowX:"hidden" }}>
      <Header />
      <WhatsAppButton />
      <ProductSchema product={product} />
      <ProductDetailContent product={product} />
      <Footer />
    </main>
  );
}
