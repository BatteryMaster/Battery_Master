import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopPageContent from "@/components/ShopPageContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Shop — JK BMS, LiFePO4 Cells, E-Bike Kits | Battery Master Karachi",
  description: "Battery Master ki puri shop. JK BMS, LiFePO4 cells, lithium battery packs, e-bike kits, chargers, LCD displays, silicon wires & more. Saddar Karachi.",
};

export default function ShopPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9", overflowX:"hidden" }}>
      <Header />
      <WhatsAppButton />

      {/* Page header */}
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", padding:"40px 0 36px" }}>
        <div className="wrap">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#f97316", marginBottom:10 }}>
            Battery Master
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:900, color:"#fff", marginBottom:10 }}>
            All Products
          </h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", maxWidth:480, lineHeight:1.7 }}>
            JK BMS · LiFePO4 Cells · Lithium Packs · E-Bike Kits · Chargers · LCD Displays · Silicon Wires — sab kuch yahan
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:32, paddingBottom:80 }}>
        <Suspense fallback={<div style={{ padding:40, textAlign:"center", color:"#64748b" }}>Loading products...</div>}>
          <ShopPageContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
