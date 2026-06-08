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
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim())   e.phone   = "Phone number is required";
    else if (!/^03\d{9}$/.test(form.phone.replace(/\s/g,""))) e.phone = "Enter valid number e.g. 03XXXXXXXXX";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const orderId = "ORD-" + Date.now();
    const itemsList = cartItems.map(i => `• ${i.name} x${i.quantity} = Rs. ${(toNum(i.price)*i.quantity).toLocaleString()}`).join("\n");
    const waMsg = encodeURIComponent(
      `🔋 *Battery Master — New Order*\nOrder ID: ${orderId}\n\n*Customer:*\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email||"N/A"}\nCity: ${form.city}\nAddress: ${form.address}\n${form.notes?`Notes: ${form.notes}\n`:""}\n*Products:*\n${itemsList}\n\n*Total: Rs. ${subtotal.toLocaleString()}*\nPayment: Online/Bank Transfer`
    );
    clearCart();
    const waUrl = `https://wa.me/923329891510?text=${waMsg}`;
    const newTab = window.open(waUrl, "_blank");
    // Fallback if popup blocked (e.g. localhost)
    if (!newTab) window.location.href = waUrl;
    setTimeout(() => { router.push(`/order-success?id=${orderId}`); }, 300);
  };

  const inp = (label: string, key: keyof typeof form, ph: string, req=false) => (
    <div key={key}>
      <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>
        {label} {req && <span style={{ color:"#dc2626" }}>*</span>}
      </label>
      <input
        value={form[key]}
        onChange={e => setForm(p => ({...p,[key]:e.target.value}))}
        placeholder={ph}
        style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${errors[key]?"#dc2626":"#e2e8f0"}`, borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
      />
      {errors[key] && <div style={{ fontSize:11, color:"#dc2626", marginTop:3 }}>⚠ {errors[key]}</div>}
    </div>
  );

  const emptyCart = (
    <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:48, textAlign:"center", maxWidth:440, margin:"0 auto" }}>
      <div style={{ fontSize:52, marginBottom:16 }}>🛒</div>
      <h2 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Cart is empty</h2>
      <p style={{ color:"#64748b", marginBottom:24, fontSize:13 }}>Please add products to cart first.</p>
      <Link href="/shop" style={{ display:"inline-flex", padding:"11px 24px", background:"#16a34a", color:"#fff", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
        View Products →
      </Link>
    </div>
  );

  const checkoutForm = (
    <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:20, alignItems:"start" }} className="checkout-grid">
      {/* LEFT */}
      <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:26 }}>
        <h2 style={{ fontSize:16, fontWeight:800, color:"#0f172a", marginBottom:20 }}>📋 Delivery Details</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }} className="form-row">
            {inp("Your Name","name","Muhammad Ahmed",true)}
            {inp("Phone Number","phone","03XXXXXXXXX",true)}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }} className="form-row">
            {inp("Email (optional)","email","you@example.com")}
            {inp("City","city","Karachi",true)}
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>
              Full Address <span style={{ color:"#dc2626" }}>*</span>
            </label>
            <textarea
              value={form.address}
              onChange={e => setForm(p => ({...p,address:e.target.value}))}
              placeholder="House/shop address, street, area, city"
              rows={3}
              style={{ width:"100%", padding:"10px 12px", border:`1.5px solid ${errors.address?"#dc2626":"#e2e8f0"}`, borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}
            />
            {errors.address && <div style={{ fontSize:11, color:"#dc2626", marginTop:3 }}>⚠ {errors.address}</div>}
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, fontWeight:700, color:"#374151", marginBottom:5 }}>Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(p => ({...p,notes:e.target.value}))}
              placeholder="Any special instruction..."
              rows={2}
              style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:13, outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }}
            />
          </div>
          <div style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#15803d", marginBottom:6 }}>💳 Payment Method</div>
            <div style={{ fontSize:12, color:"#374151", lineHeight:1.8 }}>
              <div>✅ Bank Transfer (Meezan, HBL, UBL)</div>
              <div>✅ Easypaisa / JazzCash</div>
              <div style={{ color:"#dc2626", fontWeight:600 }}>❌ Cash on Delivery not available</div>
            </div>
            <div style={{ fontSize:11, color:"#64748b", marginTop:8 }}>
              After order, we will send payment details via <strong>WhatsApp</strong>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width:"100%", padding:"14px", background:loading?"#94a3b8":"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
          >
            {loading ? "⏳ Placing order..." : "✅ Place Order"}
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14, padding:20 }}>
          <h3 style={{ fontSize:15, fontWeight:800, marginBottom:14, color:"#0f172a" }}>Order Summary</h3>
          <div>
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
              <span>Delivery</span><span style={{ color:"#16a34a", fontWeight:600 }}>Confirm via WhatsApp</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:17, fontWeight:800, paddingTop:10, borderTop:"1.5px solid #e2e8f0" }}>
              <span>Total</span><span style={{ color:"#16a34a" }}>Rs. {subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <Link href="/cart" style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"11px", background:"#fff", color:"#0f172a", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none", border:"1.5px solid #e2e8f0" }}>
          ← Edit Cart
        </Link>
        <a href="https://wa.me/923329891510" target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px", background:"#25D366", color:"#fff", borderRadius:10, fontSize:13, fontWeight:700, textDecoration:"none" }}>
          📱 Direct WhatsApp Order
        </a>
      </div>
    </div>
  );

  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />
      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"36px 0 32px" }}>
        <div className="wrap">
          <h1 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:"#fff" }}>✅ Checkout</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginTop:6 }}>Fill in details — order will be confirmed via WhatsApp</p>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop:28, paddingBottom:80 }}>
        {cartItems.length === 0 ? emptyCart : checkoutForm}
      </div>
      <Footer />
    </main>
  );
}
