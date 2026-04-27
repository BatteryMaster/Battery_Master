"use client";
import { useState } from "react";
import Link from "next/link";
import { useOrders, type Order } from "@/context/OrderContext";

const SC: Record<Order["status"],{bg:string;color:string;label:string}> = {
  pending:    {bg:"#fff7ed",color:"#c2410c",label:"Pending"},
  confirmed:  {bg:"#eff6ff",color:"#1d4ed8",label:"Confirmed"},
  dispatched: {bg:"#f0fdf4",color:"#15803d",label:"Dispatched"},
  delivered:  {bg:"#f0fdf4",color:"#166534",label:"Delivered"},
  cancelled:  {bg:"#fef2f2",color:"#b91c1c",label:"Cancelled"},
};
const PASS = "zeko2025";

export default function AdminPage() {
  const { orders, updateStatus, deleteOrder } = useOrders();
  const [auth, setAuth]     = useState(false);
  const [pass, setPass]     = useState("");
  const [err, setErr]       = useState(false);
  const [sel, setSel]       = useState<Order|null>(null);
  const [filter, setFilter] = useState<Order["status"]|"all">("all");

  /* Login screen */
  if (!auth) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--r-xl)", padding:"44px 36px", width:"100%", maxWidth:360, textAlign:"center" }}>
        <div style={{ width:50, height:50, background:"var(--primary)", borderRadius:10, margin:"0 auto 18px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:22, color:"#fff" }}>Z</div>
        <h1 style={{ fontSize:20, fontWeight:800, marginBottom:5 }}>Admin Panel</h1>
        <p style={{ color:"var(--t2)", fontSize:13, marginBottom:22 }}>zeko.pk order management</p>
        <input type="password" placeholder="Enter password" value={pass}
          onChange={e=>{setPass(e.target.value);setErr(false);}}
          onKeyDown={e=>{if(e.key==="Enter"){if(pass===PASS)setAuth(true);else setErr(true);}}}
          className="inp" style={{ marginBottom:8, textAlign:"center" }} />
        {err && <div style={{ fontSize:12, color:"var(--red)", marginBottom:8 }}>❌ Wrong password</div>}
        <button className="btn btn-primary btn-full" style={{ padding:"12px" }}
          onClick={()=>{if(pass===PASS)setAuth(true);else setErr(true);}}>
          Login →
        </button>
        <Link href="/" style={{ display:"block", marginTop:14, fontSize:12, color:"var(--t3)" }}>← Back to Home</Link>
      </div>
    </div>
  );

  const filtered = filter==="all" ? orders : orders.filter(o=>o.status===filter);
  const counts = { all:orders.length, pending:orders.filter(o=>o.status==="pending").length, confirmed:orders.filter(o=>o.status==="confirmed").length, dispatched:orders.filter(o=>o.status==="dispatched").length, delivered:orders.filter(o=>o.status==="delivered").length, cancelled:orders.filter(o=>o.status==="cancelled").length };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"var(--font)" }}>
      {/* Top bar */}
      <div style={{ background:"var(--primary)", padding:"0 20px", height:54, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontWeight:900, fontSize:17, color:"#fff" }}>zeko<span style={{ opacity:.55 }}>.pk</span></span>
          <span style={{ fontSize:11, background:"rgba(255,255,255,0.15)", color:"#fff", padding:"3px 10px", borderRadius:100 }}>Admin Panel</span>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <Link href="/" style={{ fontSize:12, color:"rgba(255,255,255,0.7)", fontWeight:600 }}>🏠 Home</Link>
          <button onClick={()=>setAuth(false)} style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"var(--r-sm)", color:"#fff", fontSize:12, fontWeight:600, padding:"5px 12px", cursor:"pointer" }}>Logout</button>
        </div>
      </div>

      <div className="wrap" style={{ padding:"24px 20px" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:22 }}>
          {([{k:"all",l:"Total",e:"📦"},{k:"pending",l:"Pending",e:"⏳"},{k:"confirmed",l:"Confirmed",e:"✅"},{k:"dispatched",l:"Dispatched",e:"🚚"},{k:"delivered",l:"Delivered",e:"🎉"},{k:"cancelled",l:"Cancelled",e:"❌"}] as {k:keyof typeof counts;l:string;e:string}[]).map(s=>(
            <button key={s.k} onClick={()=>setFilter(s.k as typeof filter)} style={{ background:filter===s.k?"var(--primary)":"#fff", border:`1.5px solid ${filter===s.k?"var(--primary)":"var(--border)"}`, borderRadius:"var(--r-md)", padding:"12px 8px", textAlign:"center", cursor:"pointer", transition:"all var(--t)" }}>
              <div style={{ fontSize:18 }}>{s.e}</div>
              <div style={{ fontSize:20, fontWeight:800, color:filter===s.k?"#fff":"var(--primary)", marginTop:3 }}>{counts[s.k]}</div>
              <div style={{ fontSize:10, color:filter===s.k?"rgba(255,255,255,0.7)":"var(--t3)", marginTop:2 }}>{s.l}</div>
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:sel?"1fr 1fr":"1fr", gap:16 }}>
          {/* Orders list */}
          <div>
            <h2 style={{ fontSize:14, fontWeight:700, marginBottom:10, color:"var(--t1)" }}>
              {filter==="all"?"All Orders":SC[filter as Order["status"]]?.label+" Orders"} ({filtered.length})
            </h2>
            {filtered.length===0 ? (
              <div style={{ background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--r-lg)", padding:36, textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
                <div style={{ color:"var(--t2)" }}>No orders found</div>
              </div>
            ) : filtered.map(o=>{
              const sc=SC[o.status]; const active=sel?.id===o.id;
              return (
                <div key={o.id} onClick={()=>setSel(active?null:o)} style={{ background:"#fff", border:`1.5px solid ${active?"var(--primary)":"var(--border)"}`, borderRadius:"var(--r-md)", padding:"14px 16px", cursor:"pointer", marginBottom:8, transition:"all var(--t)", boxShadow:active?"var(--shadow2)":"none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, color:"var(--primary)" }}>{o.id}</div>
                      <div style={{ fontSize:14, fontWeight:700, color:"var(--t1)", marginTop:2 }}>{o.customer.name}</div>
                      <div style={{ fontSize:12, color:"var(--t3)", marginTop:2 }}>📞 {o.customer.phone} · 📍 {o.customer.city}</div>
                      <div style={{ fontSize:11, color:"var(--t3)", marginTop:3 }}>{new Date(o.createdAt).toLocaleString("en-PK")}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <span style={{ background:sc.bg, color:sc.color, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:100 }}>{sc.label}</span>
                      <div style={{ fontSize:15, fontWeight:800, color:"var(--primary)", marginTop:6 }}>Rs. {o.total.toLocaleString()}</div>
                      <div style={{ fontSize:11, color:"var(--t3)" }}>{o.items.length} item(s)</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          {sel && (
            <div style={{ background:"#fff", border:"1.5px solid var(--primary-bdr)", borderRadius:"var(--r-lg)", padding:20, height:"fit-content", position:"sticky", top:80 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <h3 style={{ fontSize:14, fontWeight:700 }}>Order Details</h3>
                <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", fontSize:18, color:"var(--t3)", cursor:"pointer" }}>✕</button>
              </div>
              <div style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, color:"var(--primary)", background:"var(--bg2)", borderRadius:"var(--r-sm)", padding:"7px 10px", marginBottom:12 }}>{sel.id}</div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--t3)", marginBottom:6 }}>Customer</div>
              <div style={{ fontSize:13, fontWeight:700 }}>{sel.customer.name}</div>
              <div style={{ fontSize:12, color:"var(--t2)", lineHeight:1.9, marginTop:3, marginBottom:12 }}>
                📞 {sel.customer.phone}{sel.customer.email&&<><br/>📧 {sel.customer.email}</>}<br/>
                📍 {sel.customer.address}, {sel.customer.city}
                {sel.customer.notes&&<><br/>📝 {sel.customer.notes}</>}
              </div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--t3)", marginBottom:6 }}>Items</div>
              {sel.items.map(i=>(
                <div key={i.id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid var(--border)", fontSize:12 }}>
                  <span style={{ color:"var(--t1)" }}>{i.name} <span style={{ color:"var(--t3)" }}>×{i.quantity}</span></span>
                  <span style={{ fontWeight:700, color:"var(--primary)" }}>Rs. {(toNum(i.price)*i.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0 3px", fontSize:12, color:"var(--t2)" }}><span>Subtotal</span><span>Rs. {sel.subtotal.toLocaleString()}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--t2)" }}><span>Delivery</span><span>Rs. {sel.deliveryFee}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:15, fontWeight:800, paddingTop:8, borderTop:"1.5px solid var(--border)", marginBottom:14 }}><span>Total</span><span style={{ color:"var(--primary)" }}>Rs. {sel.total.toLocaleString()}</span></div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"var(--t3)", marginBottom:8 }}>Update Status</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                {(["pending","confirmed","dispatched","delivered","cancelled"] as Order["status"][]).map(s=>{
                  const sc=SC[s]; const active=sel.status===s;
                  return <button key={s} onClick={()=>{updateStatus(sel.id,s);setSel({...sel,status:s});}} style={{ background:active?sc.color:sc.bg, color:active?"#fff":sc.color, border:`1.5px solid ${sc.color}`, borderRadius:"var(--r-sm)", padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>{sc.label}</button>;
                })}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <a href={`https://wa.me/${sel.customer.phone.replace(/^0/,"92")}?text=${encodeURIComponent(`Assalam o Alaikum ${sel.customer.name}! Aapka zeko.pk order ${sel.id} confirm ho gaya. Total: Rs. ${sel.total}. Delivery 1-2 days mein hogi. Shukriya!`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:"#25D366", color:"#fff", borderRadius:"var(--r-sm)", padding:"9px", fontSize:12, fontWeight:700 }}>
                  WhatsApp Customer
                </a>
                <button onClick={()=>{if(confirm("Delete this order??")){deleteOrder(sel.id);setSel(null);}}}
                  style={{ background:"var(--red-dim)", color:"var(--red)", border:"1.5px solid var(--red)", borderRadius:"var(--r-sm)", padding:"9px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function toNum(price: string): number { return Number(price.replace(/[^0-9]/g,"")); }
