import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductDetailContent from "@/components/ProductDetailContent";
import ProductSchema from "@/components/ProductSchema";
import { allProducts } from "@/data/products";

type ProductPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === Number(id));
  if (!product) return { title: "Product not found", description: "The requested product could not be found on Zeko.pk." };
  return { title: `${product.name} — ${product.category} | zeko.pk`, description: product.description };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Header />
        <div className="wrap" style={{ padding: "80px 0", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🔍</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--t1)", marginBottom: 12 }}>Product not found</h1>
          <p style={{ fontSize: 15, color: "var(--t2)", marginBottom: 28 }}>The product you are looking for does not exist.</p>
          <Link href="/shop" className="btn btn-primary btn-md">Back to Shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <WhatsAppButton />
      <ProductSchema product={product} />
      <ProductDetailContent product={product} />
      <Footer />
    </main>
  );
}
