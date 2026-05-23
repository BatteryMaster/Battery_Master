import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/order-success"],
      },
    ],
    sitemap: "https://zeko.pk/sitemap.xml",
    host: "https://zeko.pk",
  };
}
