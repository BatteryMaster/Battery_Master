"use client";
import { useState, useEffect } from "react";
import { allProducts as DEFAULT_PRODUCTS } from "@/data/products";

const SK = "bm_admin_products_v2";

export type AdminProduct = {
  id: number; name: string; category: string;
  price: string; stock: string; description: string;
  image: string; badge?: string | null; originalPrice?: string;
};

export function useProducts() {
  const [products, setProducts] = useState<AdminProduct[]>(DEFAULT_PRODUCTS as AdminProduct[]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SK);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {}
    setReady(true);
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  return { products, categories, ready };
}
