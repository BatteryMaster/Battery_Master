"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";

/* Fix: strip "Rs. " and commas then parse — e.g. "Rs. 1,850" → 1850 */
function toNum(price: string): number {
  return Number(price.replace(/[^0-9]/g, ""));
}

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();
  const { addOrder } = useOrders();
  const router = useRouter();
  const [form, setForm] = useState({ name:"", phone:"", email:"", city:"", address:"", notes:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => cartItems.reduce((s, i) => s + toNum(i.price) * i.quantity, 0), [cartItems]);
  const delivery = cartItems.length > 0 ? 250 : 0;
  const total    = subtotal + delivery;

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())    e.name    = "Name required";
    if (!form.phone.trim())   e.phone   = "Phone required";
    else if (!/^03\d{9}$/.test(form.phone.replace(/\s/g,""))) e.phone = "Valid number chahiye e.g. 03XXXXXXXXX";
    if (!form.city.trim())    e.city    = "City required";
    if (!form.address.trim()) e.address = "Address required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const id = addOrder({
      customer: form,
      items: cartItems.map(i => ({ id:i.id, name:i.name, category:i.category, price:i.price, quantity:i.quantity })),
      subtotal, deliveryFee: delivery, total,
    });
    clearCart();
    router.push(`/order-success?id=${id}`);
  };

  return (
    <main style={{ minHeight:"100vh", background:"var(--bg)" }}>
      <Header />
      <WhatsAppButton />

      <div className="wrap" style={{ padding:"40px 20px 80px" }}>
        <div style={{ marginBottom:28 }}>
          <div className="sec-label">Complete Your Order</div>
          <h1 className="sec-title">Checkout</h1>
          <Link href="/shop" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, color:"var(--primary)", fontWeight:600, marginTop:8 }}>
            ← Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--r-lg)", padding:48, textAlign:"center" }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🛒</div>
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Cart empty hai</h2>
            <p style={{ color:"var(--t2)", marginBottom:24 }}>Pehle kuch products add karein.</p>
            <Link href="/shop" className="btn btn-primary btn-md">Browse Products</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="checkout-grid" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:24, alignItems:"start" }}>

            {/* LEFT — form */}
            <div style={{ background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--r-lg)", padding:28, display:"flex", flexDirection:"column", gap:18 }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:"var(--t1)" }}>Delivery Details</h2>

              <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {([["Full Name","name","Muhammad Ahmed"],["Phone Number","phone","03XXXXXXXXX"]] as [string,string,string][]).map(([l,n,ph])=>(
                  <div key={n}>
                    <label style={{ display:"block", fontSize:13, fontWeight:600, color:"var(--t1)", marginBottom:5 }}>{l} <span style={{ color:"var(--red)" }}>*</span></label>
                    <input value={form[n as keyof typeof form]} onChange={e=>setForm(p=>({...p,[n]:e.target.value}))} placeholder={ph} className="inp" />
                    {errors[n] && <div style={{ fontSize:12, color:"var(--red)", marginTop:3 }}>⚠ {errors[n]}</div>}
                  </div>
                ))}
              </div>

              <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {([["Email","email","you@example.com"],["City","city","Karachi"]] as [string,string,string][]).map(([l,n,ph])=>(
                  <div key={n}>
                    <label style={{ display:"block", fontSize:13, fontWeight:600, color:"var(--t1)", marginBottom:5 }}>{l}{n==="city" && <span style={{ color:"var(--red)" }}> *</span>}</label>
                    <input value={form[n as keyof typeof form]} onChange={e=>setForm(p=>({...p,[n]:e.target.value}))} placeholder={ph} className="inp" />
                    {errors[n] && <div style={{ fontSize:12, color:"var(--red)", marginTop:3 }}>⚠ {errors[n]}</div>}
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"var(--t1)", marginBottom:5 }}>Full Address <span style={{ color:"var(--red)" }}>*</span></label>
                <textarea value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} placeholder="House no, street, area, city" rows={3} className="inp" style={{ resize:"vertical" }} />
                {errors.address && <div style={{ fontSize:12, color:"var(--red)", marginTop:3 }}>⚠ {errors.address}</div>}
              </div>

              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"var(--t1)", marginBottom:5 }}>Notes (optional)</label>
                <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Koi special instruction..." rows={2} className="inp" style={{ resize:"vertical" }} />
              </div>

              <div style={{ background:"var(--primary-dim)", border:"1.5px solid var(--primary-bdr)", borderRadius:"var(--r-md)", padding:"14px 16px" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--primary)", marginBottom:6 }}>📋 Order Process</div>
                <div style={{ fontSize:12, color:"var(--t2)", lineHeight:1.8 }}>
                  1. Order place karein → 2. Call/WhatsApp se confirm → 3. Same day dispatch → 4. 1–2 din delivery
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-full" style={{ padding:"14px", fontSize:15 }}>
                {loading ? "Placing Order..." : "✅ Place Order Now"}
              </button>
            </div>

            {/* RIGHT — summary */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--r-lg)", padding:22 }}>
                <h3 style={{ fontSize:16, fontWeight:700, marginBottom:16 }}>Order Summary</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                  {cartItems.map(item=>(
                    <div key={item.id} style={{ display:"flex", justifyContent:"space-between", gap:10, padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"var(--t1)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div>
                        <div style={{ fontSize:11, color:"var(--t3)", marginTop:2 }}>{item.category} × {item.quantity}</div>
                      </div>
                      <div style={{ fontSize:13, fontWeight:700, color:"var(--primary)", whiteSpace:"nowrap" }}>
                        Rs. {(toNum(item.price) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--t2)" }}>
                    <span>Items ({cartCount})</span><span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--t2)" }}>
                    <span>Delivery Fee</span><span>Rs. {delivery.toLocaleString()}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:17, fontWeight:800, paddingTop:10, borderTop:"1.5px solid var(--border)" }}>
                    <span>Total</span><span style={{ color:"var(--primary)" }}>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Link href="/cart" className="btn btn-outline btn-full" style={{ padding:"11px", justifyContent:"center" }}>← Edit Cart</Link>
              <Link href="/" className="btn btn-outline btn-full" style={{ padding:"11px", justifyContent:"center" }}>🏠 Back to Home</Link>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
