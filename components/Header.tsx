"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "Home",       href: "/" },
  { label: "Shop",       href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
];

const CATS = [
  { label: "All",         href: "/shop" },
  { label: "Modules",     href: "/categories/modules" },
  { label: "ICs",         href: "/categories/ics" },
  { label: "Transistors", href: "/categories/transistors" },
  { label: "Resistors",   href: "/categories/resistors" },
  { label: "Tools",       href: "/categories/tools" },
];

export default function Header() {
  const { cartCount } = useCart();
  const [open,    setOpen]    = useState(false);
  const [raised,  setRaised]  = useState(false);
  const [mounted, setMounted] = useState(false); // SSR hydration fix

  useEffect(() => {
    setMounted(true);
    const fn = () => setRaised(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Announcement bar ── */}
      <div style={{
        background: "var(--primary)", color: "#fff",
        fontSize: 12, fontWeight: 600, textAlign: "center",
        padding: "9px 16px", letterSpacing: ".01em",
        lineHeight: 1.5,
      }}>
        🚚 Karachi delivery <strong>1–2 din</strong>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        💳 Cash on Delivery
        &nbsp;&nbsp;·&nbsp;&nbsp;
        📞 <strong>03150220243</strong>
      </div>

      {/* ── Main header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "rgba(255,255,255,0.98)",
        borderBottom: "1.5px solid var(--border)",
        boxShadow: raised ? "0 4px 24px rgba(30,64,175,0.10)" : "none",
        backdropFilter: "blur(20px)",
        transition: "box-shadow .25s",
      }}>
        {/* Main row */}
        <div className="wrap" style={{
          height: 66,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>

          {/* Logo */}
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: 10,
            flexShrink: 0, marginRight: 28, textDecoration: "none",
          }}>
            <div style={{
              width: 38, height: 38,
              background: "linear-gradient(135deg, var(--primary) 0%, #3b5bdb 100%)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 19, color: "#fff",
              boxShadow: "0 2px 10px rgba(30,64,175,0.30)",
              flexShrink: 0, letterSpacing: "-.02em",
            }}>Z</div>
            <div>
              <div style={{
                fontSize: 19, fontWeight: 800, lineHeight: 1.1,
                letterSpacing: "-.025em", color: "var(--t1)",
              }}>
                zeko<span style={{ color: "var(--primary)" }}>.pk</span>
              </div>
              <div style={{
                fontSize: 9, color: "var(--t3)",
                letterSpacing: ".13em", textTransform: "uppercase", marginTop: 1,
              }}>Electronics Store</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hide-mob" style={{
            display: "flex", alignItems: "center", gap: 2, flexShrink: 0,
          }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="nav-a">{n.label}</Link>
            ))}
          </nav>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Cart */}
          <Link href="/cart" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--primary)",
            borderRadius: "var(--r-sm)",
            padding: "9px 20px",
            fontSize: 14, fontWeight: 700, color: "#fff",
            position: "relative", whiteSpace: "nowrap",
            flexShrink: 0,
            boxShadow: "0 2px 10px rgba(30,64,175,0.22)",
            transition: "background var(--t), box-shadow var(--t)",
            textDecoration: "none",
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="hide-mob">Cart</span>

            {/* HYDRATION FIX: render only after mount */}
            {mounted && cartCount > 0 && (
              <span style={{
                position: "absolute", top: -7, right: -7,
                background: "var(--accent)", color: "#fff",
                width: 20, height: 20, borderRadius: "50%",
                fontSize: 10, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid #fff",
                lineHeight: 1,
              }}>{cartCount}</span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className="show-mob"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{
              display: "none",
              background: "var(--primary-dim)",
              border: "1.5px solid var(--primary-bdr)",
              borderRadius: "var(--r-sm)",
              width: 40, height: 40,
              alignItems: "center", justifyContent: "center",
              color: "var(--primary)", marginLeft: 8, flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
              }
            </svg>
          </button>
        </div>

        {/* ── Category strip ── */}
        <div style={{
          borderTop: "1.5px solid var(--border)",
          background: "var(--bg)",
        }}>
          <div className="wrap" style={{
            height: 40,
            display: "flex", alignItems: "center",
            gap: 4, overflowX: "auto",
            scrollbarWidth: "none",
          }}>
            {CATS.map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="nav-a"
                style={{ fontSize: 12, padding: "4px 12px", whiteSpace: "nowrap" }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {open && (
          <div style={{
            background: "#fff",
            borderTop: "1.5px solid var(--border)",
            paddingBottom: 8,
          }}>
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "13px 24px",
                  fontSize: 15, fontWeight: 600,
                  color: "var(--t1)",
                  borderBottom: "1px solid var(--border)",
                  gap: 10,
                }}
              >
                {n.label}
              </Link>
            ))}
            <div style={{ padding: "10px 16px 4px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t3)", marginBottom: 8, paddingLeft: 8 }}>Categories</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CATS.map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    style={{ padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "var(--primary-dim)", color: "var(--primary)", borderRadius: "var(--r-sm)" }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
