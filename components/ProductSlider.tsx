"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Slider mein jo products dikhane hain woh yahan add/edit karo
export const sliderProducts = [
  {
    id: 1,
    badge: "Best Seller",
    badgeColor: "bg-yellow-400 text-yellow-900",
  },
  {
    id: 2,
    badge: "Popular",
    badgeColor: "bg-blue-500 text-white",
  },
  {
    id: 4,
    badge: "Limited Stock",
    badgeColor: "bg-red-500 text-white",
  },
  {
    id: 7,
    badge: "New Arrival",
    badgeColor: "bg-green-500 text-white",
  },
  {
    id: 8,
    badge: "Hot Deal",
    badgeColor: "bg-orange-500 text-white",
  },
];

import type { Product } from "@/data/products";

type Props = {
  products: Product[];
};

export default function ProductSlider({ products }: Props) {
  const { addToCart } = useCart();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sliderData = sliderProducts
    .map((s) => {
      const product = products.find((p) => p.id === s.id);
      if (!product) return null;
      return { ...product, badge: s.badge, badgeColor: s.badgeColor };
    })
    .filter(Boolean) as (Product & { badge: string; badgeColor: string })[];

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % sliderData.length);
  }, [current, sliderData.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + sliderData.length) % sliderData.length);
  }, [current, sliderData.length, goTo]);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  if (sliderData.length === 0) return null;

  const product = sliderData[current];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Featured Products</h2>
          <p className="mt-1 text-gray-500">Hand-picked electronics for you</p>
        </div>
        <Link
          href="/shop"
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
        >
          View All →
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white shadow-lg">
        {/* Main slide */}
        <div
          className={`grid transition-opacity duration-300 md:grid-cols-2 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Left – Image */}
          <div className="relative flex items-center justify-center bg-white p-10">
            <div className="relative h-64 w-64">
              <Image
                src={product.image}
                alt={`${product.name} – Buy in Pakistan`}
                fill
                sizes="256px"
                className="object-contain drop-shadow-xl"
              />
            </div>
            {/* Badge */}
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${product.badgeColor}`}
            >
              {product.badge}
            </span>
          </div>

          {/* Right – Info */}
          <div className="flex flex-col justify-center p-8">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              {product.category}
            </span>
            <h3 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl">
              {product.name}
            </h3>
            <p className="mt-3 leading-7 text-gray-600 line-clamp-3">
              {product.description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-black text-gray-900">
                {product.price}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  product.stock.toLowerCase() === "in stock"
                    ? "bg-green-100 text-green-700"
                    : product.stock.toLowerCase() === "limited"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                  })
                }
                disabled={product.stock.toLowerCase() === "out of stock"}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
              >
                Add to Cart
              </button>
              <Link
                href={`/shop/${product.id}`}
                className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
          aria-label="Previous product"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
          aria-label="Next product"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {sliderData.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
