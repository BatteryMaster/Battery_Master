"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function getNumericPrice(price: string) {
  return Number(price.replace("Rs.", "").replace(",", "").trim());
}

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) =>
    total + getNumericPrice(item.price) * item.quantity, 0);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background: "#fff", borderBottom: "1.5px solid var(--border)", padding: "36px 0 32px" }}>
        <div className="wrap">
          <div className="sec-label">batterymaster.pk Cart</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: "-.02em", color: "var(--t1)", marginTop: 8 }}>
            Your Shopping Cart
          </h1>
          <p style={{ fontSize: 15, color: "var(--t2)", marginTop: 10 }}>
            Review your selected products before checkout.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:"36px", paddingBottom:"80px" }}>
        {cartItems.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }} className="checkout-grid">

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 5 }}>{item.category}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--t1)", marginBottom: 5 }}>{item.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)" }}>{item.price}</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", overflow: "hidden" }}>
                      <button onClick={() => decreaseQuantity(item.id)} style={{ width: 36, height: 36, border: "none", background: "var(--bg2)", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "var(--t2)", transition: "background var(--t)" }}>−</button>
                      <span style={{ width: 40, textAlign: "center", fontSize: 14, fontWeight: 700, color: "var(--t1)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} style={{ width: 36, height: 36, border: "none", background: "var(--bg2)", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "var(--t2)", transition: "background var(--t)" }}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} style={{ padding: "9px 16px", fontSize: 13, fontWeight: 700, border: "none", borderRadius: "var(--r-sm)", background: "var(--red-dim)", color: "var(--red)", cursor: "pointer", transition: "background var(--t)", whiteSpace: "nowrap" }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "24px", position: "sticky", top: 130 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--t1)", marginBottom: 20 }}>Order Summary</h3>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--t2)", marginBottom: 10 }}>
                <span>Items ({cartItems.length})</span>
                <span>{cartItems.reduce((s, i) => s + i.quantity, 0)} pcs</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--t2)", marginBottom: 10 }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: "var(--t1)" }}>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--green)", marginBottom: 20 }}>
                <span>Delivery</span>
                <span style={{ fontWeight: 700 }}>Cash on Delivery</span>
              </div>

              <div style={{ borderTop: "1.5px solid var(--border)", paddingTop: 16, marginBottom: 20, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "var(--t1)" }}>
                <span>Total</span>
                <span style={{ color: "var(--primary)" }}>Rs. {subtotal.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className="btn btn-primary btn-md btn-full" style={{ marginBottom: 10 }}>
                Proceed to Checkout →
              </Link>
              <Link href="/shop" className="btn btn-outline btn-md btn-full">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--r-lg)", padding: "64px 32px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--t1)", marginBottom: 10 }}>Your cart is empty</h2>
            <p style={{ fontSize: 14, color: "var(--t2)", marginBottom: 28 }}>Add some products to your cart to continue.</p>
            <Link href="/shop" className="btn btn-primary btn-md">Browse Products →</Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
