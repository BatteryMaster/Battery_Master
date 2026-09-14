"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Slide = {
  id: number; image: string; title: string;
  subtitle: string; link: string; sort_order: number; active: boolean;
};

const PLACEHOLDERS = [
  { bg:"linear-gradient(135deg,#052e16 0%,#14532d 100%)", emoji:"🔋", title:"JK BMS — Active Balancing", subtitle:"4S to 24S • Bluetooth • Best price in Karachi", link:"/categories/jk-bms" },
  { bg:"linear-gradient(135deg,#0c4a6e 0%,#0369a1 100%)", emoji:"⚡", title:"Grade-A LiFePO4 Cells",     subtitle:"EVE LF280K • CATL 304Ah • 6000+ cycle life",       link:"/categories/lifepo4-cell" },
  { bg:"linear-gradient(135deg,#3b0764 0%,#7e22ce 100%)", emoji:"🛵", title:"E-Bike Conversion Kits",    subtitle:"48V to 72V • Motor + Controller + LCD",            link:"/categories/eve-bike-kits" },
];

export default function HeroSlider() {
  const [slides, setSlides]   = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const touchX                = useRef<number | null>(null);
  const timer                 = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    supabase.from("sliders").select("*").eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data && data.length > 0) setSlides(data as Slide[]); });
  }, []);

  const total  = slides.length > 0 ? slides.length : PLACEHOLDERS.length;
  const next   = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev   = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  const go = (i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 5000);
  };

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, 5000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [next, paused]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    touchX.current = null;
  };

  return (
    <div
      style={{ position:"relative", width:"100%", overflow:"hidden", lineHeight:0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides container */}
      <div style={{ position:"relative", width:"100%", aspectRatio:"16/5", minHeight:200, maxHeight:520 }}>

        {slides.length > 0 ? (
          // Real slides from Supabase
          slides.map((slide, i) => (
            <div key={slide.id}
              style={{ position:"absolute", inset:0, opacity:i===current?1:0, transition:"opacity .7s ease", pointerEvents:i===current?"auto":"none" }}>
              {/* Full image - NO overlay, clear and sharp */}
              <img src={slide.image} alt={slide.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />

              {/* Only show text overlay if title/subtitle exists */}
              {(slide.title || slide.subtitle) && (
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.15) 50%,transparent 100%)", display:"flex", alignItems:"center" }}>
                  <div style={{ padding:"0 clamp(16px,5vw,60px)", maxWidth:"55%" }}>
                    {slide.title && (
                      <h2 style={{ fontSize:"clamp(13px,2.5vw,34px)", fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:"clamp(4px,.8vw,12px)", textShadow:"0 2px 12px rgba(0,0,0,0.5)", letterSpacing:"-.02em" }}>
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p style={{ fontSize:"clamp(9px,1.2vw,15px)", color:"rgba(255,255,255,0.9)", lineHeight:1.6, marginBottom:"clamp(8px,1.5vw,20px)", textShadow:"0 1px 6px rgba(0,0,0,0.5)" }}>
                        {slide.subtitle}
                      </p>
                    )}
                    {slide.link && (
                      <Link href={slide.link}
                        style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#16a34a", color:"#fff", padding:"clamp(6px,1vw,11px) clamp(12px,2vw,22px)", borderRadius:7, fontSize:"clamp(9px,1.1vw,13px)", fontWeight:800, textDecoration:"none", boxShadow:"0 4px 16px rgba(22,163,74,0.45)", letterSpacing:"-.01em" }}>
                        Shop Now →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          // Placeholder slides (gradient + text) when no Supabase slides yet
          PLACEHOLDERS.map((ph, i) => (
            <div key={i}
              style={{ position:"absolute", inset:0, opacity:i===current?1:0, transition:"opacity .7s ease", pointerEvents:i===current?"auto":"none", background:ph.bg }}>
              {/* Dot pattern */}
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.06) 1px,transparent 0)", backgroundSize:"28px 28px" }} />
              <div style={{ position:"absolute", top:-80, right:-40, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 65%)" }} />

              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 clamp(20px,6vw,80px)" }}>
                <div style={{ maxWidth:"65%" }}>
                  <div style={{ fontSize:"clamp(28px,6vw,80px)", marginBottom:"clamp(8px,1.5vw,18px)", lineHeight:1 }}>{ph.emoji}</div>
                  <h2 style={{ fontSize:"clamp(14px,2.8vw,38px)", fontWeight:900, color:"#fff", lineHeight:1.15, marginBottom:"clamp(6px,1vw,14px)", letterSpacing:"-.025em" }}>
                    {ph.title}
                  </h2>
                  <p style={{ fontSize:"clamp(10px,1.3vw,16px)", color:"rgba(255,255,255,0.75)", lineHeight:1.65, marginBottom:"clamp(10px,2vw,26px)" }}>
                    {ph.subtitle}
                  </p>
                  <Link href={ph.link}
                    style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff", color:"#14532d", padding:"clamp(7px,1.2vw,12px) clamp(14px,2.5vw,26px)", borderRadius:8, fontSize:"clamp(10px,1.2vw,14px)", fontWeight:800, textDecoration:"none", boxShadow:"0 4px 20px rgba(0,0,0,0.2)" }}>
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prev / Next arrows */}
      {[
        { dir:"prev", icon:<path d="M15 18l-6-6 6-6"/>, style:{ left:10 } },
        { dir:"next", icon:<path d="M9 18l6-6-6-6"/>,  style:{ right:10 } },
      ].map(btn => (
        <button key={btn.dir}
          onClick={() => { btn.dir==="prev" ? prev() : next(); setPaused(true); setTimeout(()=>setPaused(false),5000); }}
          style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", ...btn.style, background:"rgba(0,0,0,0.38)", backdropFilter:"blur(6px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"50%", width:"clamp(30px,4vw,42px)", height:"clamp(30px,4vw,42px)", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10, transition:"background .2s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">{btn.icon}</svg>
        </button>
      ))}

      {/* Bottom dots + progress */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:10 }}>
        {/* Progress bar */}
        <div style={{ height:3, background:"rgba(255,255,255,0.15)" }}>
          {!paused && (
            <div key={`${current}-${paused}`}
              style={{ height:"100%", background:"#4ade80", animation:"sp 5s linear forwards", width:0 }} />
          )}
        </div>
        <style>{`@keyframes sp{to{width:100%}}`}</style>

        {/* Dots */}
        <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"8px 0 10px" }}>
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => go(i)}
              style={{ width:i===current?22:7, height:7, borderRadius:4, border:"none", cursor:"pointer", background:i===current?"#4ade80":"rgba(255,255,255,0.45)", padding:0, transition:"all .3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
