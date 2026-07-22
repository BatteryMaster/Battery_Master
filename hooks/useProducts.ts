"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { allProducts as FALLBACK } from "@/data/products";

export type AdminProduct = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
  badge?: string | null;
  originalPrice?: string;
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
  const [products, setProducts] = useState<AdminProduct[]>(FALLBACK as AdminProduct[]);
  const [ready, setReady]       = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(data.map(rowToProduct));
        }
        setReady(true);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  return { products, categories, ready };
}
