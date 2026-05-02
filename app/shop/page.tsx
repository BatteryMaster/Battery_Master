import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopPageContent from "@/components/ShopPageContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Shop Electronics Products",
  description: "Browse all electronics products at zeko.pk — modules, ICs, transistors, resistors, and tools in Pakistan.",
};

export default function ShopPage() {
  return (
    <main style={{ minHeight:"100vh", background:"#f5f7ff" }}>
      <Header />
      <WhatsAppButton />

      {/* Page header */}
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

      <div className="wrap" style={{ padding:"36px 0 80px" }}>
        <ShopPageContent />
      </div>

      <Footer />
    </main>
  );
}
