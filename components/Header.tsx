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
  { label: "All Products",        href: "/shop" },
  { label: "JK BMS",              href: "/categories/jk-bms" },
  { label: "Lithium Battery",     href: "/categories/lithium-battery-packed" },
  { label: "Battery Box",         href: "/categories/battery-box" },
  { label: "Lithium Ion Cell",    href: "/categories/lithium-ion-cell" },
  { label: "LiFePO4 Cell",        href: "/categories/lifepo4-cell" },
  { label: "LCD Display",         href: "/categories/lcd-display" },
  { label: "EVE Bike Kits",       href: "/categories/eve-bike-kits" },
  { label: "Chargers",            href: "/categories/chargers" },
  { label: "EVE Bike Display",    href: "/categories/eve-bike-display" },
  { label: "Meter Tools",         href: "/categories/meter-tools" },
];

export default function Header() {
  const { cartCount } = useCart();
  const [open, setOpen]       = useState(false);
  const [raised, setRaised]   = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setRaised(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div style={{ background:"#1e40af", color:"#fff", fontSize:12, fontWeight:600, textAlign:"center", padding:"8px 12px", letterSpacing:".01em", width:"100%" }}>
        <span style={{ display:"inline-flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center", gap:"4px 10px" }}>
          <span>🚚 Karachi Delivery <strong>1–2 Days</strong></span>
          <span style={{ opacity:0.4 }}>·</span>
          <span>🔋 Grade-A Batteries & EV Parts</span>
          <span style={{ opacity:0.4 }}>·</span>
          <span>📞 <strong>03329891510</strong></span>
          <span style={{ opacity:0.4 }}>·</span>
          <span>✅  Online Services Available</span>
        </span>
      </div>

      <header style={{ position:"sticky", top:0, zIndex:200, background:"#fff", borderBottom:"1.5px solid #dde3f0", boxShadow: raised ? "0 4px 20px rgba(0,0,0,0.08)" : "none", transition:"box-shadow .25s", width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        {/* Main row */}
        <div className="wrap" style={{ height:66, display:"flex", alignItems:"center", gap:8, overflow:"hidden" }}>

          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0, marginRight:16, textDecoration:"none" }}>
            <img src="/logo.png" alt="Battery Master" width={42} height={42} style={{ borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid #e2e8f0" }} />
            <div>
              <div style={{ fontSize:18, fontWeight:800, lineHeight:1.1, letterSpacing:"-.025em", color:"#0f172a" }}>
                Battery<span style={{ color:"#2563eb" }}>Master</span>
              </div>
              <div style={{ fontSize:9, color:"#94a3b8", letterSpacing:".12em", textTransform:"uppercase", marginTop:1 }}>
                Saddar · Karachi
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hide-mob" style={{ display:"flex", alignItems:"center", gap:2, flexShrink:0 }}>
            {NAV.map(n => <Link key={n.href} href={n.href} className="nav-link">{n.label}</Link>)}
          </nav>

          <div style={{ flex:1 }} />

          {/* WhatsApp button */}
          <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
            className="hide-mob"
            style={{ display:"flex", alignItems:"center", gap:6, background:"#25D366", borderRadius:8, padding:"9px 16px", fontSize:13, fontWeight:700, color:"#fff", textDecoration:"none", flexShrink:0, marginRight:8 }}>
            📱 WhatsApp
          </a>

          {/* Cart */}
          <Link href="/cart" style={{ display:"flex", alignItems:"center", gap:8, background:"#2563eb", borderRadius:8, padding:"9px 20px", fontSize:14, fontWeight:700, color:"#fff", position:"relative", whiteSpace:"nowrap", flexShrink:0, boxShadow:"0 2px 10px rgba(37,99,235,0.22)", textDecoration:"none" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="hide-mob">Cart</span>
            {mounted && cartCount > 0 && (
              <span style={{ position:"absolute", top:-7, right:-7, background:"#f97316", color:"#fff", width:20, height:20, borderRadius:"50%", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>{cartCount}</span>
            )}
          </Link>

          {/* Hamburger */}
          <button className="show-mob" onClick={() => setOpen(!open)}
            style={{ display:"none", background:"rgba(37,99,235,0.07)", border:"1.5px solid rgba(37,99,235,0.18)", borderRadius:8, width:40, height:40, alignItems:"center", justifyContent:"center", color:"#2563eb", marginLeft:8, flexShrink:0, cursor:"pointer" }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>}
            </svg>
          </button>
        </div>

        {/* Category strip */}
        <div style={{ borderTop:"1.5px solid #dde3f0", background:"#f5f7ff" }}>
          <div className="wrap" style={{ height:40, display:"flex", alignItems:"center", gap:4, overflowX:"auto" }}>
            {CATS.map(c => <Link key={c.href} href={c.href} className="cat-link">{c.label}</Link>)}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background:"#fff", borderTop:"1.5px solid #dde3f0" }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ display:"flex", alignItems:"center", padding:"14px 24px", fontSize:15, fontWeight:600, color:"#0f172a", borderBottom:"1px solid #f1f5f9", textDecoration:"none" }}>
                {n.label}
              </Link>
            ))}
            <div style={{ padding:"12px 16px 16px" }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#94a3b8", marginBottom:10, paddingLeft:8 }}>Categories</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {CATS.map(c => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)} style={{ padding:"7px 14px", fontSize:13, fontWeight:600, background:"rgba(37,99,235,0.07)", color:"#2563eb", borderRadius:8, textDecoration:"none" }}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ padding:"0 16px 16px" }}>
              <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
                📱 WhatsApp: 03329891510
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
