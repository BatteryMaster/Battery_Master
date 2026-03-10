"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

type ProductDetailContentProps = {
  product: Product;
};

export default function ProductDetailContent({
  product,
}: ProductDetailContentProps) {
  const { addToCart } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8">
        <Link href="/shop" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to Shop
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 sm:min-h-[420px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <p className="mt-5 text-3xl font-bold text-gray-900">{product.price}</p>

          <div className="mt-4">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {product.stock}
            </span>
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
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
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-100">
              WhatsApp Order
            </button>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="text-lg font-semibold">Product Highlights</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>• Quality checked product</li>
              <li>• Suitable for electronics projects and repair work</li>
              <li>• Fast and simple ordering experience</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}