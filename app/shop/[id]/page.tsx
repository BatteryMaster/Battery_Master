import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailContent from "@/components/ProductDetailContent";
import ProductSchema from "@/components/ProductSchema";
import { allProducts } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === Number(id));

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found on Electrofy.pk.",
    };
  }

  return {
    title: `${product.name} - ${product.category}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <Header />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <p className="mt-4 text-gray-600">
            The product you are looking for does not exist.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Shop
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <ProductSchema product={product} />
      <ProductDetailContent product={product} />
      <Footer />
    </main>
  );
}