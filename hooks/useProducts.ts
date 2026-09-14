"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { allProducts as FALLBACK } from "@/data/products";

export type AdminProduct = {
  id: number; name: string; category: string;
  price: string; stock: string; description: string;
  image: string; badge?: string | null; originalPrice?: string;
};

function rowToProduct(r: Record<string, unknown>): AdminProduct {
  return {
    id:            Number(r.id),
    name:          String(r.name ?? ""),
    category:      String(r.category ?? ""),
    price:         String(r.price ?? ""),
    stock:         String(r.stock ?? "In Stock"),
    description:   String(r.description ?? ""),
    image:         String(r.image ?? ""),
    badge:         (r.badge as string) || null,
    originalPrice: String(r.original_price ?? ""),
  };
}

export function useProducts() {
  // Start with null = loading (not the fallback)
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [ready, setReady]       = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      // newest first so new products show at top
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(data.map(rowToProduct));
        } else {
          // fallback to static — reversed so newest (higher id) first
          setProducts([...(FALLBACK as AdminProduct[])].reverse());
        }
        setReady(true);
      });
  }, []);

  const list       = products ?? [];
  const categories = ["All", ...Array.from(new Set(list.map(p => p.category)))];

  return { products: list, categories, ready, loading: products === null };
}
