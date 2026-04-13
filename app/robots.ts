import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://zeko.pk";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout"],
      },
      {
        // Allow Googlebot full access except private pages
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/cart", "/checkout"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
