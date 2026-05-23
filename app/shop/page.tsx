import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopPageContent from "@/components/ShopPageContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Shop — Buy Arduino, Electronics Components & Modules in Pakistan",
  description: "Buy Arduino Uno, Arduino Nano, NodeMCU, sensors, ICs, transistors, resistors & tools in Pakistan. Best prices, Karachi delivery, Cash on Delivery.",
  alternates: { canonical: "https://zeko.pk/shop" },
};

export default function ShopPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f5f7ff", overflowX:"hidden" }}>
      <Header />
      <WhatsAppButton />

      {/* Page header — SAME as original */}
      <div style={{ background:"#fff", borderBottom:"1.5px solid #e2e8f0", padding:"40px 0 36px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:10 }}>
            zeko.pk Shop
          </div>
          <h1 style={{ fontSize:"clamp(26px,4vw,40px)", fontWeight:800, letterSpacing:"-.02em", color:"#0f172a", marginBottom:12 }}>
            Explore All Products
          </h1>
          <p style={{ fontSize:15, color:"#475569", maxWidth:520, lineHeight:1.7 }}>
            Browse electronics modules, ICs, transistors, resistors, and tools in one place.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"36px", paddingBottom:"80px" }}>
        <Suspense fallback={
          <div style={{ padding:"40px 0", textAlign:"center", color:"#94a3b8", fontSize:14 }}>
            Loading products...
          </div>
        }>
          <ShopPageContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
