import type { Product } from "@/data/products";

type ProductSchemaProps = {
  product: Product;
};

function getNumericPrice(price: string) {
  return price.replace("Rs.", "").replace(",", "").trim();
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`https://zeko.pk${product.image}`],
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "zeko.pk",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: getNumericPrice(product.price),
      availability:
        product.stock.toLowerCase() === "in stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
      url: `https://zeko.pk/shop/${product.id}`,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}