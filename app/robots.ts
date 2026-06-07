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
    sitemap: "https://batterymaster.pk/sitemap.xml",
    host: "https://batterymaster.pk",
  };
}
