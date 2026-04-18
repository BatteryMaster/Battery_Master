"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[rgba(201,168,76,0.2)]"
          : "bg-white border-b border-[rgba(201,168,76,0.15)]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="relative overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="zeko.pk Logo"
                width={44}
                height={44}
                className="rounded-xl"
              />
            </div>
            <div>
              <h1 className="font-display text-xl font-black tracking-tight text-[#1A1A1A] sm:text-2xl">
                Zeko
                <span
                  style={{
                    background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  .pk
                </span>
              </h1>
              <p className="hidden text-[10px] font-medium tracking-[0.15em] text-[#6B6560] sm:block">
                PREMIUM ELECTRONICS
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop" },
              { href: "/categories", label: "Categories" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-[#2D2D2D] transition-colors hover:text-[#C9A84C]"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{
                    background: "linear-gradient(90deg, #A07830, #C9A84C)",
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-all duration-300 hover:bg-[#F5F0E8]"
              style={{ border: "1px solid rgba(201,168,76,0.4)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart
              {cartCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-white"
                  style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/shop"
              className="btn-gold text-sm"
              style={{
                background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
                color: "white",
                fontWeight: 600,
                borderRadius: "50px",
                padding: "10px 24px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
                transition: "all 0.3s ease",
                display: "inline-block",
                fontSize: "14px",
              }}
            >
              Shop Now
            </Link>
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="relative rounded-full p-2.5 transition hover:bg-[#F5F0E8]"
              style={{ border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <svg className="h-5 w-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black text-white"
                  style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-2.5 transition hover:bg-[#F5F0E8]"
              style={{ border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <svg className="h-5 w-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="mt-3 overflow-hidden rounded-2xl bg-white p-4 shadow-xl md:hidden"
            style={{ border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <nav className="flex flex-col gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/categories", label: "Categories" },
                { href: "/contact", label: "Contact" },
                { href: "/about", label: "About Us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-[#2D2D2D] transition hover:bg-[#F5F0E8] hover:text-[#C9A84C]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
                <Link
                  href="/shop"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)" }}
                >
                  Shop Now ✦
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
