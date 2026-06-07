"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function toNum(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const subtotal = cartItems.reduce((t, i) => t + toNum(i.price) * i.quantity, 0);

  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", padding:"36px 0 32px" }}>
        <div className="wrap">
          <h1 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:"#fff" }}>🛒 Shopping Cart</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginTop:6 }}>
            Review your selected products
          </p>
        </div>
      </div>

      {/* ❌ NO COD Notice */}
      <div style={{ background:"#fef2f2", borderBottom:"2px solid #fecaca" }}>
        <div className="wrap" style={{ padding:"11px 0", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#dc2626" }}>❌ Cash on Delivery not available </span>
          <span style={{ fontSize:13, color:"#64748b" }}>—After the order, we will send the payment details on WhatsApp</span>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:28, paddingBottom:80 }}>
        {cartItems.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20, alignItems:"start" }} className="checkout-grid">

            {/* Items list */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
                  <div style={{ flex:1, minWidth:160 }}>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#2563eb", marginBottom:4 }}>{item.category}</div>
                    <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:4 }}>{item.name}</div>
                    <div style={{ fontSize:17, fontWeight:800, color:"#16a34a" }}>{item.price}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ display:"flex", alignItems:"center", border:"1.5px solid #e2e8f0", borderRadius:8, overflow:"hidden" }}>
                      <button onClick={() => decreaseQuantity(item.id)} style={{ width:34, height:34, border:"none", background:"#f8fafc", cursor:"pointer", fontSize:16, fontWeight:700, color:"#374151" }}>−</button>
                      <span style={{ width:36, textAlign:"center", fontSize:14, fontWeight:700, color:"#0f172a" }}>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} style={{ width:34, height:34, border:"none", background:"#f8fafc", cursor:"pointer", fontSize:16, fontWeight:700, color:"#374151" }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ padding:"8px 14px", fontSize:12, fontWeight:700, border:"none", borderRadius:8, background:"#fef2f2", color:"#dc2626", cursor:"pointer" }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:22, position:"sticky", top:130 }}>
              <h3 style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:18 }}>Order Summary</h3>

              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#64748b", marginBottom:8 }}>
                <span>Items ({cartItems.length})</span>
                <span>{cartItems.reduce((s,i)=>s+i.quantity,0)} pcs</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#64748b", marginBottom:8 }}>
                <span>Subtotal</span>
                <span style={{ fontWeight:700, color:"#0f172a" }}>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:16 }}>
                <span style={{ color:"#64748b" }}>Payment</span>
                <span style={{ fontWeight:700, color:"#16a34a" }}>Online / Bank Transfer</span>
              </div>

              <div style={{ borderTop:"1.5px solid #e2e8f0", paddingTop:14, marginBottom:18, display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:800 }}>
                <span>Total</span>
                <span style={{ color:"#2563eb" }}>Rs. {subtotal.toLocaleString()}</span>
              </div>

              {/* Payment info box */}
              <div style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#15803d", marginBottom:4 }}>💳 Payment Process</div>
                <div style={{ fontSize:11, color:"#374151", lineHeight:1.7 }}>
                  Place the order → We will send bank account details on WhatsApp → Make the payment → Delivery!
                </div>
              </div>

              <Link href="/checkout" style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"13px", background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:800, textDecoration:"none", marginBottom:10 }}>
                Checkout →
              </Link>
              <Link href="/shop" style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"11px", background:"#f1f5f9", color:"#374151", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none", border:"1.5px solid #e2e8f0" }}>
                Continue Shopping 
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:"64px 32px", textAlign:"center", maxWidth:440, margin:"0 auto" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🛒</div>
            <h2 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Cart Empty</h2>
            <p style={{ fontSize:13, color:"#64748b", marginBottom:24 }}>Add some products and then checkout.</p>
            <Link href="/shop" style={{ display:"inline-flex", padding:"11px 28px", background:"#16a34a", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              See Products  →
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
