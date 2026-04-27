"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Content() {
  const params  = useSearchParams();
  const orderId = params.get("id") ?? "—";
  return (
    <div className="wrap" style={{ padding:"60px 20px 80px" }}>
      <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:72, marginBottom:20 }}>🎉</div>
        <h1 style={{ fontSize:"clamp(22px,4vw,30px)", fontWeight:800, color:"var(--t1)", marginBottom:12 }}>Order Placed Successfully!</h1>
        <p style={{ color:"var(--t2)", fontSize:15, lineHeight:1.7, marginBottom:8 }}>Shukriya! Aapka order receive ho gaya hai.</p>
        <div style={{ background:"var(--primary-dim)", border:"1.5px solid var(--primary-bdr)", borderRadius:"var(--r-lg)", padding:"20px 24px", margin:"28px 0", textAlign:"left" }}>
          <div style={{ fontSize:12, color:"var(--t3)", marginBottom:4 }}>Order ID</div>
          <div style={{ fontSize:18, fontWeight:800, color:"var(--primary)", fontFamily:"monospace" }}>{orderId}</div>
          <div style={{ fontSize:13, color:"var(--t2)", marginTop:12, lineHeight:1.9 }}>
            ✅ Order receive ho gaya.<br/>
            📞 30 minutes mein confirm call/WhatsApp aayega.<br/>
            🚚 Same day dispatch, delivery 1–2 working days.
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" className="btn btn-primary btn-md">🏠 Back to Home</Link>
          <Link href="/shop" className="btn btn-outline btn-md">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Header />
      <Suspense fallback={<div style={{ padding:60, textAlign:"center" }}>Loading...</div>}>
        <Content />
      </Suspense>
      <Footer />
    </main>
  );
}
