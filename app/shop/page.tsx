import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopPageContent from "@/components/ShopPageContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Shop Electronics Products",
  description: "Browse all electronics products at zeko.pk including modules, ICs, transistors, resistors, and tools in Pakistan.",
};

export default function ShopPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <WhatsAppButton />

      {/* Page header */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
            zeko.pk Shop
          </div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginBottom: 10 }}>
            Explore All Products
          </h1>
          <p style={{ fontSize: 15, color: "var(--t2)", maxWidth: 560 }}>
            Browse electronics modules, ICs, transistors, resistors, and tools in one place.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ padding: "36px 0 80px" }}>
        <ShopPageContent />
      </div>

      <Footer />
    </main>
  );
}
