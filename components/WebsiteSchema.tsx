export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Electrofy.pk",
    url: "https://electrofy.pk",
    logo: "https://electrofy.pk/logo.png",
    description:
      "Electrofy.pk is an electronics ecommerce store in Pakistan for modules, ICs, transistors, resistors, sensors, and tools.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}