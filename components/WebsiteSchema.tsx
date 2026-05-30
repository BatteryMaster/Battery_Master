export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zeko.pk/#organization",
        name: "zeko.pk",
        url: "https://zeko.pk",
        logo: "https://zeko.pk/favicon.svg",
        description: "Pakistan's Trusted Electronics Store. Arduino, Modules, ICs, Transistors, Resistors, Tools. Fast Delivery In Karachi, Cash on Delivery.",
        telephone: "+923150220243",
        email: "hussamm621@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop G1A, National Radio & TV Market, Regal Chowk, Saddar",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          addressCountry: "PK",
        },
        areaServed: { "@type": "Country", name: "Pakistan" },
        sameAs: ["https://wa.me/923150220243"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+923150220243",
          contactType: "customer service",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "20:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "18:00" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://zeko.pk/#website",
        url: "https://zeko.pk",
        name: "zeko.pk — Electronics Components in Pakistan",
        description: "Buy Arduino, modules, ICs, transistors, resistors and tools in Pakistan. Fast delivery in Karachi.",
        publisher: { "@id": "https://zeko.pk/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: "https://zeko.pk/shop?q={search_term_string}" },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
