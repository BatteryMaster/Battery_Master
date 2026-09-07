"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  sort_order: number;
  active: boolean;
};

// Default slides shown if no Supabase data yet
const DEFAULT_SLIDES: Omit<Slide,"id"|"sort_order"|"active">[] = [
  {
    image: "",
    title: "JK BMS — Active Balancing",
    subtitle: "4S to 24S • Bluetooth • RS485 • Best price in Karachi",
    link: "/categories/jk-bms",
  },
  {
    image: "",
    title: "Grade-A LiFePO4 Cells",
    subtitle: "EVE LF280K • CATL 304Ah • 6000+ cycle life",
    link: "/categories/lifepo4-cell",
  },
  {
    image: "",
    title: "E-Bike Conversion Kits",
    subtitle: "48V to 72V • Complete kit • Motor + Controller + LCD",
    link: "/categories/eve-bike-kits",
  },
];

export default function HeroSlider() {
  const [slides, setSlides]     = useState<Slide[]>([]);
  const [current, setCurrent]   = useState(0);
  const [loaded, setLoaded]     = useState(false);
  const [paused, setPaused]     = useState(false);
  const intervalRef             = useRef<ReturnType<typeof setInterval>|null>(null);

  // Load slides from Supabase
  useEffect(() => {
    supabase
      .from("sliders")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setSlides(data as Slide[]);
        setLoaded(true);
      });
  }, []);

  const total = slides.length || DEFAULT_SLIDES.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const goTo = (i: number) => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 4000); };

  // Auto-play
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, paused]);

  const activeSlides = slides.length > 0 ? slides : DEFAULT_SLIDES.map((s, i) => ({ ...s, id: i, sort_order: i, active: true }));

  return (
    <div
      style={{ position:"relative", width:"100%", overflow:"hidden", background:"#052e16", userSelect:"none" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
    >
      {/* Slides */}
      <div style={{ position:"relative", width:"100%", height:"clamp(200px,45vw,520px)" }}>
        {activeSlides.map((slide, i) => (
          <div
            key={slide.id}
            style={{
              position: "absolute", inset: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.6s ease",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {/* Background image */}
            {slide.image ? (
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
              />
            ) : (
              /* Placeholder gradient when no image */
              <div style={{
                width:"100%", height:"100%",
                background: i===0
                  ? "linear-gradient(135deg,#052e16,#14532d)"
                  : i===1
                  ? "linear-gradient(135deg,#0c4a6e,#0369a1)"
                  : "linear-gradient(135deg,#3b0764,#6b21a8)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <div style={{ fontSize:"clamp(48px,10vw,120px)", opacity:.15 }}>🔋</div>
              </div>
            )}

            {/* Overlay */}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

            {/* Text */}
            {(slide.title || slide.subtitle) && (
              <div style={{
                position:"absolute", left:0, top:0, bottom:0,
                display:"flex", flexDirection:"column", justifyContent:"center",
                padding:"0 clamp(16px,5vw,64px)", maxWidth:"60%",
              }}>
                {slide.title && (
                  <h2 style={{
                    fontSize:"clamp(14px,2.8vw,36px)", fontWeight:900, color:"#fff",
                    lineHeight:1.2, letterSpacing:"-.02em", marginBottom:"clamp(6px,1vw,14px)",
                    textShadow:"0 2px 8px rgba(0,0,0,0.4)",
                  }}>
                    {slide.title}
                  </h2>
                )}
                {slide.subtitle && (
                  <p style={{
                    fontSize:"clamp(10px,1.4vw,16px)", color:"rgba(255,255,255,0.80)",
                    lineHeight:1.5, marginBottom:"clamp(10px,2vw,24px)",
                    textShadow:"0 1px 4px rgba(0,0,0,0.4)",
                  }}>
                    {slide.subtitle}
                  </p>
                )}
                {slide.link && (
                  <div>
                    <Link href={slide.link}
                      style={{
                        display:"inline-flex", alignItems:"center", gap:6,
                        background:"#16a34a", color:"#fff",
                        padding:"clamp(7px,1.2vw,12px) clamp(14px,2vw,24px)",
                        borderRadius:8, fontSize:"clamp(10px,1.2vw,14px)", fontWeight:800,
                        textDecoration:"none", boxShadow:"0 4px 16px rgba(22,163,74,0.4)",
                        transition:"background .2s",
                      }}>
                      Shop Now →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
        style={{
          position:"absolute", left:12, top:"50%", transform:"translateY(-50%)",
          background:"rgba(0,0,0,0.45)", border:"none", borderRadius:"50%",
          width:"clamp(32px,4vw,44px)", height:"clamp(32px,4vw,44px)",
          color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          backdropFilter:"blur(4px)", transition:"background .2s", zIndex:10,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 4000); }}
        style={{
          position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
          background:"rgba(0,0,0,0.45)", border:"none", borderRadius:"50%",
          width:"clamp(32px,4vw,44px)", height:"clamp(32px,4vw,44px)",
          color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          backdropFilter:"blur(4px)", transition:"background .2s", zIndex:10,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Dots */}
      <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", display:"flex", gap:7, zIndex:10 }}>
        {activeSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{
              width: i===current ? 24 : 8, height:8,
              borderRadius:4, border:"none", cursor:"pointer",
              background: i===current ? "#16a34a" : "rgba(255,255,255,0.5)",
              transition:"all .3s", padding:0,
            }} />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.15)" }}>
        {!paused && (
          <div
            key={current}
            style={{
              height:"100%", background:"#16a34a",
              animation:"slider-progress 4s linear forwards",
            }}
          />
        )}
        <style>{`
          @keyframes slider-progress {
            from { width: 0% }
            to   { width: 100% }
          }
        `}</style>
      </div>
    </div>
  );
}
