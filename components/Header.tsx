"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCartCount = mounted ? cartCount : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              E
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
                Electrofy<span className="text-blue-600">.pk</span>
              </h1>
              <p className="hidden text-xs font-medium tracking-wide text-gray-500 sm:block">
                Fast Electronics Store for Pakistan
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex gap-6">
              <Link href="/" className="font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/shop" className="font-medium text-gray-700 hover:text-blue-600">
                Shop
              </Link>
              <Link
                href="/categories"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Categories
              </Link>
              <Link
                href="/contact"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Contact
              </Link>
            </nav>

            <Link
              href="/cart"
              className="rounded-2xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Cart ({displayCartCount})
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="rounded-2xl bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              Cart ({displayCartCount})
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-2xl border border-gray-300 px-4 py-2 font-semibold text-gray-800"
            >
              Menu
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:hidden">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                Categories
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                Contact
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              >
                About Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}