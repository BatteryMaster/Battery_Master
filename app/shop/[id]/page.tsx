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

function getNumericPrice(price: string) {
  return price.replace("Rs.", "").replace(/,/g, "").trim();
}

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === Number(id));

  if (!product) {
    return {
      title: "Product Not Found – zeko.pk",
      description: "The requested product could not be found on zeko.pk.",
    };
  }

  const numericPrice = getNumericPrice(product.price);

  return {
    title: `Buy ${product.name} in Pakistan – ${product.category} | zeko.pk`,
    description: `${product.description} Available in Pakistan. Price: ${product.price}. Order online via WhatsApp from zeko.pk Karachi.`,
    alternates: {
      canonical: `https://zeko.pk/shop/${product.id}`,
    },
    openGraph: {
      title: `${product.name} – ${product.price} | zeko.pk Pakistan`,
      description: `${product.description} Order online from zeko.pk with WhatsApp delivery across Pakistan.`,
      url: `https://zeko.pk/shop/${product.id}`,
      type: "website",
      images: [
        {
          url: `https://zeko.pk${product.image}`,
          width: 800,
          height: 600,
          alt: `${product.name} – Buy in Pakistan`,
        },
      ],
    },
    other: {
      "product:price:amount": numericPrice,
      "product:price:currency": "PKR",
      "product:availability": product.stock.toLowerCase().includes("in stock")
        ? "in stock"
        : "limited availability",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === Number(id));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zeko.pk" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://zeko.pk/shop" },
      ...(product
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product.category,
              item: `https://zeko.pk/categories/${product.category.toLowerCase()}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: product.name,
              item: `https://zeko.pk/shop/${product.id}`,
            },
          ]
        : []),
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductSchema product={product} />
      <ProductDetailContent product={product} />
      <Footer />
    </main>
  );
}
