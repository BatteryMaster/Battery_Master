import type { Product } from "@/data/products";

export default function ProductSchema({ product }: { product: Product }) {
  const priceNum = product.price.replace(/[^0-9]/g, "");
  const isOut    = product.stock.toLowerCase().includes("out");

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
      availability: isOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: `https://zeko.pk/shop/${product.id}`,
      seller: {
        "@type": "Organization",
        name: "zeko.pk",
        url: "https://zeko.pk",
      },
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString().split("T")[0],
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "PK",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
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
        },
        // ← This is the missing field Google flagged
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "https://schema.org/Monday",
              "https://schema.org/Tuesday",
              "https://schema.org/Wednesday",
              "https://schema.org/Thursday",
              "https://schema.org/Friday",
              "https://schema.org/Saturday",
            ],
          },
          cutoffTime: "17:00:00+05:00",
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

