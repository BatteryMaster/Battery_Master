"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";

function toNum(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""));
}

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name:"", phone:"", email:"", city:"", address:"", notes:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => cartItems.reduce((s,i) => s + toNum(i.price) * i.quantity, 0), [cartItems]);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())    e.name    = "Naam zaroor likhein";
    if (!form.phone.trim())   e.phone   = "Phone number zaroor likhein";
    else if (!/^03\d{9}$/.test(form.phone.replace(/\s/g,""))) e.phone = "Valid number likhein e.g. 03XXXXXXXXX";
    if (!form.city.trim())    e.city    = "City zaroor likhein";
    if (!form.address.trim()) e.address = "Address zaroor likhein";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    // Generate order ID locally — no API call needed (avoids Supabase error crash)
    const orderId = "ORD-" + Date.now();

    // Build WhatsApp message with full order details
    const itemsList = cartItems.map(i => `• ${i.name} x${i.quantity} = Rs. ${(toNum(i.price)*i.quantity).toLocaleString()}`).join("\n");
    const waMsg = encodeURIComponent(
      `🔋 *Battery Master — New Order*\n` +
      `Order ID: ${orderId}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n` +
      `City: ${form.city}\n` +
      `Address: ${form.address}\n` +
      (form.notes ? `Notes: ${form.notes}\n` : "") +
      `\n*Products:*\n${itemsList}\n\n` +
      `*Total: Rs. ${subtotal.toLocaleString()}*\n` +
      `Payment: Online/Bank Transfer`
    );

    clearCart();

    // Redirect to order success page
    router.push(`/order-success?id=${orderId}`);

    // Open WhatsApp with full order details (slight delay so page loads first)
    setTimeout(() => {
      window.open(`https://wa.me/923329891510?text=${waMsg}`, "_blank");
    }, 800);
  };

  return (
    <main style={{ minHeight:"100vh", background:"#f1f5f9" }}>
      <Header />
      <WhatsAppButton />

      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e3a8a)", padding:"36px 0 32px" }}>
        <div className="wrap">
          <h1 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:"#fff" }}>✅ Checkout</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginTop:6 }}>Fill in the details — the order will be confirmed on WhatsApp</p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop:28, paddingBottom:80 }}>
        {cartItems.length === 0 ? (
          <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:48, textAlign:"center", maxWidth:440, margin:"0 auto" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🛒</div>
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Cart Empty</h2>
            <p style={{ color:"#64748b", marginBottom:24, fontSize:13 }}>Pehle kuch products cart mein add karein.</p>
            <Link href="/shop" style={{ display:"inline-flex", padding:"11px 24px", background:"#16a34a", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              See Products  →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:20, alignItems:"start" }} className="checkout-grid">

            {/* LEFT — Customer form */}
            <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:26 }}>
              <h2 style={{ fontSize:16, fontWeight:800, color:"#0f172a", marginBottom:20 }}>📋 Delivery Details</h2>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }} className="form-row">
                {([["Aapka Naam","name","Muhammad Ahmed"],["Phone Number","phone","03XXXXXXXXX"]] as [string,string,string][]).map(([l,n,ph]) => (
                  <div key={n}>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>{l} <span style={{ color:"#dc2626" }}>*</span></label>
                    <input
                      value={form[n as keyof typeof form]}
                      onChange={e => setForm(p => ({...p,[n]:e.target.value}))}
                      placeholder={ph}
                      style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${errors[n] ? "#dc2626" : "#e2e8f0"}`, borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                    />
                    {errors[n] && <div style={{ fontSize:11, color:"#dc2626", marginTop:3 }}>⚠ {errors[n]}</div>}
                  </div>
                ))}
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }} className="form-row">
                {([["Email (optional)","email","you@example.com"],["City","city","Karachi"]] as [string,string,string][]).map(([l,n,ph]) => (
                  <div key={n}>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>
                      {l}{n==="city" && <span style={{ color:"#dc2626" }}> *</span>}
                    </label>
                    <input
                      value={form[n as keyof typeof form]}
                      onChange={e => setForm(p => ({...p,[n]:e.target.value}))}
                      placeholder={ph}
                      style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${errors[n] ? "#dc2626" : "#e2e8f0"}`, borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                    />
                    {errors[n] && <div style={{ fontSize:11, color:"#dc2626", marginTop:3 }}>⚠ {errors[n]}</div>}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>Poora Address <span style={{ color:"#dc2626" }}>*</span></label>
                <textarea
                  value={form.address}
                  onChange={e => setForm(p => ({...p,address:e.target.value}))}
                  placeholder="Home/Office address, Street, area, city"
                  rows={3}
                  style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${errors.address ? "#dc2626" : "#e2e8f0"}`, borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}
                />
                {errors.address && <div style={{ fontSize:11, color:"#dc2626", marginTop:3 }}>⚠ {errors.address}</div>}
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(p => ({...p,notes:e.target.value}))}
                  placeholder="Any instruction..."
                  rows={2}
                  style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}
                />
              </div>

              {/* Payment info */}
              <div style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:10, padding:"14px 16px", marginBottom:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#15803d", marginBottom:6 }}>💳 Payment Method</div>
                <div style={{ fontSize:12, color:"#374151", lineHeight:1.8 }}>
                  <div>✅ Bank Transfer (Meezan, HBL, UBL)</div>
                  <div>✅ Easypaisa / JazzCash</div>
                  <div style={{ color:"#dc2626", fontWeight:600 }}>❌ Cash on Delivery available nahi</div>
                </div>
                <div style={{ fontSize:11, color:"#64748b", marginTop:8 }}>
                  After the order, we will send the account details on <strong>WhatsApp</strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ width:"100%", padding:"14px", background: loading ? "#94a3b8" : "#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:800, cursor: loading ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
              >
                {loading ? "⏳ Theorder is going ..." : "✅ Order Place Here"}
              </button>
            </div>

            {/* RIGHT — Order summary */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:20 }}>
                <h3 style={{ fontSize:15, fontWeight:800, marginBottom:14, color:"#0f172a" }}>Order Summary</h3>
                <div style={{ display:"flex", flexDirection:"column" }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display:"flex", justifyContent:"space-between", gap:10, padding:"10px 0", borderBottom:"1px solid #f1f5f9" }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div>
                        <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{item.category} × {item.quantity}</div>
                      </div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#16a34a", whiteSpace:"nowrap" }}>
                        Rs. {(toNum(item.price)*item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#64748b" }}>
                    <span>Items ({cartCount})</span><span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#64748b" }}>
                    <span>Delivery</span><span style={{ color:"#16a34a", fontWeight:600 }}>TBD — WhatsApp confirm</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:17, fontWeight:800, paddingTop:10, borderTop:"1.5px solid #e2e8f0" }}>
                    <span>Total</span><span style={{ color:"#16a34a" }}>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link href="/cart" style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"11px", background:"#fff", color:"#0f172a", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none", border:"1.5px solid #e2e8f0" }}>
                ← Edit Cart
              </Link>

              {/* Direct WhatsApp option */}
              <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none" }}>
                📱 Direct WhatsApp Order
              </a>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </main>
  );
}
