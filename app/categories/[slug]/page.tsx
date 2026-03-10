import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = use(params);

  const categoryName =
    slug === "ics"
      ? "ICs"
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <Link href="/categories" className="text-sm font-medium text-blue-600 hover:underline">
            ← Back to Categories
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Category Page
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{categoryName}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Browse all products available in the {categoryName} category.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-600">
            Products Found:{" "}
            <span className="font-semibold text-gray-900">
              {filteredProducts.length}
            </span>
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {filteredProducts.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      category={product.category}
      price={product.price}
      stock={product.stock}
      image={product.image}
    />
  ))}
</div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-2xl font-bold">No products found</h2>
            <p className="mt-3 text-gray-600">
              No products are available in this category yet.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}