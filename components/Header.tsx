"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { l:"Home",       h:"/" },
  { l:"Shop",       h:"/shop" },
  { l:"Categories", h:"/categories" },
  { l:"About",      h:"/about" },
  { l:"Contact",    h:"/contact" },
];
const CATS = [
  { l:"All Products",     h:"/shop" },
  { l:"JK BMS",           h:"/categories/jk-bms" },
  { l:"Lithium Battery",  h:"/categories/lithium-battery-packed" },
  { l:"Battery Box",      h:"/categories/battery-box" },
  { l:"Lithium Ion Cell", h:"/categories/lithium-ion-cell" },
  { l:"LiFePO4 Cell",     h:"/categories/lifepo4-cell" },
  { l:"LCD Display",      h:"/categories/lcd-display" },
  { l:"EVE Bike Kits",    h:"/categories/eve-bike-kits" },
  { l:"Chargers",         h:"/categories/chargers" },
  { l:"EVE Bike Display", h:"/categories/eve-bike-display" },
  { l:"Meter Tools",      h:"/categories/meter-tools" },
];

export default function Header() {
  const { cartCount }  = useCart();
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
    <header style={{ position:"sticky", top:0, zIndex:200, background:"#fff", borderBottom:"1.5px solid #d1fae5", boxShadow: raised ? "0 4px 20px rgba(22,163,74,0.10)" : "none", transition:"box-shadow .25s", width:"100%", maxWidth:"100vw", overflow:"hidden" }}>

      {/* Main row */}
      <div className="wrap" style={{ height:64, display:"flex", alignItems:"center", gap:8 }}>

        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0, marginRight:12, textDecoration:"none" }}>
          <img src="/logo.png" alt="Battery Master" width={40} height={40} style={{ objectFit:"contain", flexShrink:0 }} />
          <div className="hide-mob">
            <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:"-.02em" }}>
              Battery<span style={{ color:"#16a34a" }}>Master</span>
            </div>
            <div style={{ fontSize:9, color:"#94a3b8", letterSpacing:".12em", textTransform:"uppercase" }}>Saddar · Karachi</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-mob" style={{ display:"flex", alignItems:"center", gap:2 }}>
          {NAV.map(n => <Link key={n.h} href={n.h} className="nav-link">{n.l}</Link>)}
        </nav>

        <div style={{ flex:1 }} />

        {/* WhatsApp */}
        <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer" className="hide-mob"
          style={{ display:"flex", alignItems:"center", gap:6, background:"#25D366", borderRadius:8, padding:"9px 16px", fontSize:13, fontWeight:700, color:"#fff", textDecoration:"none", flexShrink:0, boxShadow:"0 2px 10px rgba(37,211,102,0.28)" }}>
          📱 WhatsApp
        </a>

        {/* Cart */}
        <Link href="/cart" style={{ display:"flex", alignItems:"center", gap:7, background:"#16a34a", borderRadius:8, padding:"9px 18px", fontSize:14, fontWeight:700, color:"#fff", position:"relative", whiteSpace:"nowrap", flexShrink:0, boxShadow:"0 2px 12px rgba(22,163,74,0.30)", textDecoration:"none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="hide-mob">Cart</span>
          {mounted && cartCount > 0 && (
            <span style={{ position:"absolute", top:-7, right:-7, background:"#f97316", color:"#fff", width:20, height:20, borderRadius:"50%", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* Hamburger */}
        <button className="show-mob" onClick={() => setOpen(!open)}
          style={{ background:"rgba(22,163,74,0.08)", border:"1.5px solid rgba(22,163,74,0.22)", borderRadius:8, width:40, height:40, alignItems:"center", justifyContent:"center", color:"#16a34a", marginLeft:8, flexShrink:0, cursor:"pointer" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>}
          </svg>
        </button>
      </div>

      {/* Category strip */}
      <div style={{ borderTop:"1px solid #d1fae5", background:"#f0fdf4" }}>
        <div className="wrap" style={{ height:38, display:"flex", alignItems:"center", gap:3, overflowX:"auto", msOverflowStyle:"none", scrollbarWidth:"none" }}>
          {CATS.map(c => <Link key={c.h} href={c.h} className="cat-link">{c.l}</Link>)}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background:"#fff", borderTop:"1.5px solid #d1fae5" }}>
          {NAV.map(n => (
            <Link key={n.h} href={n.h} onClick={() => setOpen(false)}
              style={{ display:"flex", alignItems:"center", padding:"13px 20px", fontSize:15, fontWeight:600, color:"#0f172a", borderBottom:"1px solid #f0fdf4", textDecoration:"none" }}>
              {n.l}
            </Link>
          ))}
          <div style={{ padding:"12px 16px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#94a3b8", marginBottom:8, textTransform:"uppercase", letterSpacing:".08em" }}>Categories</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {CATS.map(c => (
                <Link key={c.h} href={c.h} onClick={() => setOpen(false)}
                  style={{ padding:"6px 12px", fontSize:12, fontWeight:600, background:"rgba(22,163,74,0.08)", color:"#16a34a", borderRadius:20, textDecoration:"none", border:"1px solid rgba(22,163,74,0.18)" }}>
                  {c.l}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ padding:"0 16px 14px" }}>
            <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", background:"#25D366", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              📱 WhatsApp: 03329891510
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
