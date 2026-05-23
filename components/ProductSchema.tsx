import type { Product } from "@/data/products";

export default function ProductSchema({ product }: { product: Product }) {
  // Parse price string e.g. "Rs. 1,850" → "1850"
  const priceNum = product.price.replace(/[^0-9]/g, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://zeko.pk${product.image}`,
    sku: `ZEKO-${product.id}`,
    brand: { "@type": "Brand", name: "zeko.pk" },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: priceNum,
      availability: product.stock.toLowerCase().includes("out")
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "zeko.pk",
        url: "https://zeko.pk",
      },
      url: `https://zeko.pk/shop/${product.id}`,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "PKR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PK",
          addressRegion: "Sindh",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] },
          cutoffTime: "17:00:00+05:00",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime:  { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
