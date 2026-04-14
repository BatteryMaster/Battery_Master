"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  stock,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const isOutOfStock = stock.toLowerCase() === "out of stock";

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/shop/${id}`} className="block">
        {/* Image container - fixed size, auto crop/fit */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={`${name} – Buy in Pakistan | ${category}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Agar image load na ho to placeholder dikhao
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {/* Fallback placeholder agar image nahi */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-300">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-1 text-xs">No Image</p>
            </div>
          </div>

          {/* Out of Stock badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                Out of Stock
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
              {category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 min-h-[48px] text-base font-bold text-gray-900">
            {name}
          </h3>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-black text-gray-900">{price}</p>
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${
              isOutOfStock
                ? "bg-red-100 text-red-700"
                : stock.toLowerCase() === "limited"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {stock}
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          <button
            onClick={() =>
              !isOutOfStock && addToCart({ id, name, category, price, stock })
            }
            disabled={isOutOfStock}
            className={`w-full rounded-2xl px-4 py-2.5 font-semibold transition ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <Link
            href={`/shop/${id}`}
            className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 text-center font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
