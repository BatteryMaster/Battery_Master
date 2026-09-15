"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Slide = {
  id: number; image: string; title: string;
  subtitle: string; link: string; sort_order: number; active: boolean;
};

const PLACEHOLDERS = [
  { bg:"linear-gradient(135deg,#052e16,#14532d)", icon:"🔋", h:"JK BMS — Active Balancing", s:"4S to 24S · Bluetooth · Best price in Karachi", l:"/categories/jk-bms" },
  { bg:"linear-gradient(135deg,#0c4a6e,#0369a1)", icon:"🌱", h:"Grade-A LiFePO4 Cells",     s:"EVE LF280K · CATL 304Ah · 6000+ cycle life",     l:"/categories/lifepo4-cell" },
  { bg:"linear-gradient(135deg,#3b0764,#7e22ce)", icon:"🛵", h:"E-Bike Conversion Kits",    s:"48V to 72V · Complete kit · Motor + Controller", l:"/categories/eve-bike-kits" },
];

export default function HeroSlider() {
  const [slides, setSlides]   = useState<Slide[]>([]);
  const [cur, setCur]         = useState(0);
  const [paused, setPaused]   = useState(false);
  const touchX                = useRef<number|null>(null);

  useEffect(() => {
    supabase.from("sliders").select("*").eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => { if (data && data.length > 0) setSlides(data as Slide[]); });
  }, []);

  const total = slides.length > 0 ? slides.length : PLACEHOLDERS.length;
  const next  = useCallback(() => setCur(c => (c+1)%total), [total]);
  const prev  = useCallback(() => setCur(c => (c-1+total)%total), [total]);
  const go    = (i:number) => { setCur(i); setPaused(true); setTimeout(()=>setPaused(false),5000); };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  const onTS = (e:React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTE = (e:React.TouchEvent) => {
    if (touchX.current===null) return;
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d)>40) d>0 ? next() : prev();
    touchX.current = null;
  };

  const hasReal = slides.length > 0;

  return (
    <div style={{ position:"relative", width:"100%", overflow:"hidden", background:"#052e16", lineHeight:0 }}
      onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
      onTouchStart={onTS} onTouchEnd={onTE}>

      {/* Slides */}
      <div style={{ position:"relative", width:"100%", paddingBottom:"31.25%" /* 16:5 ratio */ }}>
        {(hasReal ? slides : PLACEHOLDERS.map((p,i)=>({id:i, image:"", title:p.h, subtitle:p.s, link:p.l, sort_order:i, active:true, _ph:p}))).map((slide,i) => {
          const ph = !hasReal ? PLACEHOLDERS[i] : null;
          return (
            <div key={slide.id}
              style={{ position:"absolute", inset:0, opacity:i===cur?1:0, transition:"opacity .6s ease", pointerEvents:i===cur?"auto":"none" }}>
              {hasReal && slide.image ? (
                /* Real image — full width, NO dark overlay unless text exists */
                <>
                  <img src={slide.image} alt={slide.title||`Slide ${i+1}`}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", position:"absolute", inset:0 }} />
                  {(slide.title||slide.subtitle) && (
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(0,0,0,0.52) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)", display:"flex", alignItems:"center" }}>
                      <div style={{ padding:"0 clamp(16px,5vw,56px)", maxWidth:"55%" }}>
                        {slide.title && <h2 style={{ fontSize:"clamp(13px,2.4vw,32px)", fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:"clamp(4px,.6vw,10px)", textShadow:"0 2px 8px rgba(0,0,0,0.4)" }}>{slide.title}</h2>}
                        {slide.subtitle && <p style={{ fontSize:"clamp(9px,1.1vw,15px)", color:"rgba(255,255,255,0.85)", lineHeight:1.55, marginBottom:"clamp(8px,1.4vw,18px)", textShadow:"0 1px 4px rgba(0,0,0,0.4)" }}>{slide.subtitle}</p>}
                        {slide.link && (
                          <Link href={slide.link} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#16a34a", color:"#fff", padding:"clamp(6px,1vw,11px) clamp(12px,2vw,22px)", borderRadius:7, fontSize:"clamp(9px,1.1vw,13px)", fontWeight:800, textDecoration:"none", boxShadow:"0 3px 14px rgba(22,163,74,0.45)" }}>
                            Shop Now →
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : ph ? (
                /* Placeholder gradient slide */
                <div style={{ position:"absolute", inset:0, background:ph.bg, display:"flex", alignItems:"center" }}>
                  <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,0.05) 1px,transparent 0)", backgroundSize:"26px 26px" }}/>
                  <div style={{ position:"absolute", top:"-20%", right:"-5%", width:"45%", aspectRatio:"1", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 65%)" }}/>
                  <div style={{ position:"relative", padding:"0 clamp(18px,6vw,70px)", maxWidth:"65%" }}>
                    <div style={{ fontSize:"clamp(24px,5vw,72px)", marginBottom:"clamp(6px,1.2vw,16px)", lineHeight:1 }}>{ph.icon}</div>
                    <h2 style={{ fontSize:"clamp(13px,2.5vw,36px)", fontWeight:900, color:"#fff", lineHeight:1.15, marginBottom:"clamp(5px,.9vw,12px)", letterSpacing:"-.02em" }}>{ph.h}</h2>
                    <p style={{ fontSize:"clamp(9px,1.2vw,15px)", color:"rgba(255,255,255,0.75)", lineHeight:1.6, marginBottom:"clamp(9px,1.8vw,22px)" }}>{ph.s}</p>
                    <Link href={ph.l} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.95)", color:"#14532d", padding:"clamp(6px,1.1vw,11px) clamp(13px,2.2vw,24px)", borderRadius:8, fontSize:"clamp(9px,1.1vw,13px)", fontWeight:800, textDecoration:"none", boxShadow:"0 4px 18px rgba(0,0,0,0.18)" }}>
                      Shop Now →
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {[{d:"prev",left:true},{d:"next",left:false}].map(b=>(
        <button key={b.d} onClick={()=>{b.d==="prev"?prev():next();setPaused(true);setTimeout(()=>setPaused(false),5000);}}
          style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", [b.left?"left":"right"]:"clamp(6px,1.5vw,14px)", background:"rgba(0,0,0,0.35)", backdropFilter:"blur(4px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"50%", width:"clamp(28px,3.5vw,40px)", height:"clamp(28px,3.5vw,40px)", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10, transition:"background .2s" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {b.left ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
          </svg>
        </button>
      ))}

      {/* Dots + progress */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:10, lineHeight:0 }}>
        <div style={{ height:"3px", background:"rgba(255,255,255,0.15)" }}>
          {!paused && <div key={`${cur}-p`} style={{ height:"100%", background:"#4ade80", animation:"slp 5s linear forwards" }}/>}
        </div>
        <style>{`@keyframes slp{from{width:0}to{width:100%}}`}</style>
        <div style={{ display:"flex", justifyContent:"center", gap:5, padding:"7px 0 9px", background:"linear-gradient(to top,rgba(0,0,0,0.25),transparent)" }}>
          {Array.from({length:total}).map((_,i)=>(
            <button key={i} onClick={()=>go(i)}
              style={{ width:i===cur?20:6, height:6, borderRadius:3, border:"none", cursor:"pointer", background:i===cur?"#4ade80":"rgba(255,255,255,0.4)", padding:0, transition:"all .3s" }}/>
          ))}
        </div>
      </div>
    </div>
  );
}
