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
      <div style={{ maxWidth:580, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:72, marginBottom:16 }}>🎉</div>
        <h1 style={{ fontSize:"clamp(22px,4vw,32px)", fontWeight:900, color:"#0f172a", marginBottom:10, letterSpacing:"-.02em" }}>
          The Order Has Been Placed!
        </h1>
        <p style={{ color:"#64748b", fontSize:15, lineHeight:1.7, marginBottom:4 }}>
          Shukriya! Aapka order receive ho gaya.
        </p>
        <p style={{ color:"#64748b", fontSize:14, lineHeight:1.7, marginBottom:24 }}>
          WhatsApp window khul gayi hogi — wahan message bhejein order confirm karne ke liye.
        </p>

        {/* Order ID box */}
        <div style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:14, padding:"20px 24px", marginBottom:24, textAlign:"left" }}>
          <div style={{ fontSize:11, color:"#64748b", marginBottom:4, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Order ID</div>
          <div style={{ fontSize:20, fontWeight:800, color:"#16a34a", fontFamily:"monospace" }}>{orderId}</div>
          <div style={{ fontSize:13, color:"#374151", marginTop:14, lineHeight:2 }}>
            ✅ Your order has been received <br/>
            📱 Send a WhatsApp message for payment details<br/>
            📞 We will confirm within 30 minutes<br/>
            🚚 Karachi: 1–2 days for delivery
          </div>
        </div>

        {/* NO COD reminder */}
        <div style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:10, padding:"12px 16px", marginBottom:28, fontSize:13, color:"#dc2626", fontWeight:600 }}>
          ❌ Cash on Delivery not available — Online / Bank Transfer required
        </div>

        {/* WhatsApp CTA */}
        <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:15, fontWeight:800, textDecoration:"none", marginBottom:12, width:"100%", justifyContent:"center", boxShadow:"0 4px 16px rgba(37,211,102,0.3)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.103 1.513 5.824L0 24l6.341-1.487A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.015-1.379l-.36-.214-3.727.875.891-3.652-.234-.374A9.774 9.774 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
          </svg>
          WhatsApp Par Message Karein: 03329891510
        </a>

        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" style={{ padding:"11px 24px", background:"#2563eb", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
            🏠 Home
          </Link>
          <Link href="/shop" style={{ padding:"11px 24px", background:"#fff", color:"#0f172a", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <Suspense fallback={<div style={{ padding:60, textAlign:"center" }}>Loading...</div>}>
        <Content />
      </Suspense>
      <Footer />
    </main>
  );
}
