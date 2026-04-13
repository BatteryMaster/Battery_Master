import type { Product } from "@/data/products";

type ProductSchemaProps = {
  product: Product;
};

function getNumericPrice(price: string) {
  return price.replace("Rs.", "").replace(/,/g, "").trim();
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const numericPrice = getNumericPrice(product.price);
  const isInStock = product.stock.toLowerCase().includes("in stock");
  const isLimited = product.stock.toLowerCase().includes("limited");

  let availability = "https://schema.org/OutOfStock";
  if (isInStock) availability = "https://schema.org/InStock";
  else if (isLimited) availability = "https://schema.org/LimitedAvailability";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`https://zeko.pk${product.image}`],
    sku: `ZEKO-${product.id}`,
    mpn: `ZEKO-${product.id}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "zeko.pk",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: numericPrice,
      availability,
      url: `https://zeko.pk/shop/${product.id}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "zeko.pk",
        url: "https://zeko.pk",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "250",
          currency: "PKR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PK",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "PK",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "12",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
