import type { MetadataRoute } from "next";
import { allProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://batterymaster.pk";
  const now  = new Date();

  const products = allProducts.map(p => ({
    url: `${base}/shop/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.badge === "hot" ? 0.90 : p.badge === "new" ? 0.85 : 0.80,
  }));

  const categories = ["modules","ics","transistors","resistors","tools"].map(slug => ({
    url: `${base}/categories/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    { url: base,                         lastModified: now, changeFrequency: "daily",   priority: 1.00 },
    { url: `${base}/shop`,               lastModified: now, changeFrequency: "daily",   priority: 0.95 },
    { url: `${base}/categories`,         lastModified: now, changeFrequency: "weekly",  priority: 0.88 },
    { url: `${base}/about`,              lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: `${base}/contact`,            lastModified: now, changeFrequency: "monthly", priority: 0.60 },
    { url: `${base}/privacy-policy`,     lastModified: now, changeFrequency: "yearly",  priority: 0.20 },
    { url: `${base}/terms-conditions`,   lastModified: now, changeFrequency: "yearly",  priority: 0.20 },
    { url: `${base}/return-refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.20 },
    ...categories,
    ...products,
  ];
}
