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

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/shop/${id}`} className="block">
        <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 sm:h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-5">
          <p className="text-sm font-semibold text-blue-600">{category}</p>
          <h3 className="mt-2 line-clamp-2 min-h-[56px] text-lg font-bold text-gray-900">
            {name}
          </h3>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-black text-gray-900 sm:text-2xl">{price}</p>
          <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {stock}
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            onClick={() => addToCart({ id, name, category, price, stock })}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Add to Cart
          </button>

          <Link
            href={`/shop/${id}`}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}