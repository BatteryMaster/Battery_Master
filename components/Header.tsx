"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const NAV  = [
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
  const { cartCount }  = useCart();
  const [open,    setOpen]    = useState(false);
  const [raised,  setRaised]  = useState(false);
  const [mounted, setMounted] = useState(false);

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
        background: "#1e40af", color: "#fff",
        fontSize: 12, fontWeight: 600, textAlign: "center",
        padding: "9px 16px", letterSpacing: ".01em",
      }}>
        🚚 Karachi delivery <strong>1–2 din</strong>
        &nbsp;·&nbsp; 💳 Cash on Delivery
        &nbsp;·&nbsp; 📞 <strong>03150220243</strong>
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "#ffffff",
        borderBottom: "1.5px solid #dde3f0",
        boxShadow: raised ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow .25s",
      }}>
        {/* Main row */}
        <div className="wrap" style={{ height: 66, display: "flex", alignItems: "center", gap: 8 }}>

          {/* Logo */}
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: 10,
            flexShrink: 0, marginRight: 24,
          }}>
            <div style={{
              width: 38, height: 38,
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 900, fontSize: 19,
              color: "#fff", boxShadow: "0 2px 10px rgba(37,99,235,0.30)", flexShrink: 0,
            }}>Z</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-.025em", color: "#0f172a" }}>
                zeko<span style={{ color: "#2563eb" }}>.pk</span>
              </div>
              <div style={{ fontSize: 9, color: "#94a3b8", letterSpacing: ".13em", textTransform: "uppercase", marginTop: 1 }}>
                Electronics Store
              </div>
            </div>
          </Link>

          {/* Desktop nav — CSS class hover, no JS events */}
          <nav className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="nav-link">{n.label}</Link>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* Cart button */}
          <Link href="/cart" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#2563eb", borderRadius: 8,
            padding: "9px 20px", fontSize: 14, fontWeight: 700, color: "#fff",
            position: "relative", whiteSpace: "nowrap", flexShrink: 0,
            boxShadow: "0 2px 10px rgba(37,99,235,0.22)",
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="hide-mob">Cart</span>
            {mounted && cartCount > 0 && (
              <span style={{
                position: "absolute", top: -7, right: -7,
                background: "#f97316", color: "#fff",
                width: 20, height: 20, borderRadius: "50%",
                fontSize: 10, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid #fff",
              }}>{cartCount}</span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className="show-mob"
            onClick={() => setOpen(!open)}
            style={{
              display: "none", background: "rgba(37,99,235,0.07)",
              border: "1.5px solid rgba(37,99,235,0.18)", borderRadius: 8,
              width: 40, height: 40, alignItems: "center", justifyContent: "center",
              color: "#2563eb", marginLeft: 8, flexShrink: 0, cursor: "pointer",
            }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
              }
            </svg>
          </button>
        </div>

        {/* Category strip — CSS class hover */}
        <div style={{ borderTop: "1.5px solid #dde3f0", background: "#f5f7ff" }}>
          <div className="wrap" style={{ height: 40, display: "flex", alignItems: "center", gap: 4, overflowX: "auto" }}>
            {CATS.map(c => (
              <Link key={c.href} href={c.href} className="cat-link">{c.label}</Link>
            ))}
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div style={{ background: "#fff", borderTop: "1.5px solid #dde3f0" }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center",
                padding: "14px 24px", fontSize: 15, fontWeight: 600,
                color: "#0f172a", borderBottom: "1px solid #f1f5f9",
              }}>
                {n.label}
              </Link>
            ))}
            <div style={{ padding: "12px 16px 16px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10, paddingLeft: 8 }}>
                Categories
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CATS.map(c => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)} style={{
                    padding: "7px 14px", fontSize: 13, fontWeight: 600,
                    background: "rgba(37,99,235,0.07)", color: "#2563eb", borderRadius: 8,
                  }}>
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
