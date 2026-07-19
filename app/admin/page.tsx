"use client";
import { useState, useEffect, useRef } from "react";

const PASS = "usman123";
const CATS = ["JK BMS","Lithium Battery Packed","Battery Box","Lithium Ion Cell","LiFePO4 Cell","LCD Display","EVE Bike Kits","Chargers","EVE Bike Display","Meter Tools"];
const BADGES = ["none","hot","new","sale"];
const STOCKS = ["In Stock","Limited","Out of Stock"];
const SK = "bm_products_v1";

type P = { id:number; name:string; category:string; price:string; stock:string; description:string; image:string; badge:string; originalPrice:string; };

const blank = (): P => ({ id: Date.now(), name:"", category:"JK BMS", price:"", stock:"In Stock", description:"", image:"", badge:"none", originalPrice:"" });

function loadProducts(): P[] {
  try {
    const raw = localStorage.getItem(SK);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}
function saveProducts(p: P[]) {
  try { localStorage.setItem(SK, JSON.stringify(p)); } catch {}
}

export default function AdminPage() {
  const [auth, setAuth]         = useState(false);
  const [pw, setPw]             = useState("");
  const [pwErr, setPwErr]       = useState(false);
  const [products, setProducts] = useState<P[]>([]);
  const [tab, setTab]           = useState<"list"|"edit"|"add">("list");
  const [editing, setEditing]   = useState<P|null>(null);
  const [search, setSearch]     = useState("");
  const [catFilter, setCat]     = useState("All");
  const [saved, setSaved]       = useState(false);
  const [delConfirm, setDel]    = useState<number|null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const a = sessionStorage.getItem("bm_admin");
    if (a === "1") { setAuth(true); setProducts(loadProducts()); }
  }, []);

  const login = () => {
    if (pw === PASS) { setAuth(true); sessionStorage.setItem("bm_admin","1"); setProducts(loadProducts()); }
    else { setPwErr(true); setTimeout(() => setPwErr(false), 2000); }
  };

  const save = (p: P) => {
    const updated = tab === "add"
      ? [...products, { ...p, id: Date.now() }]
      : products.map(x => x.id === p.id ? p : x);
    setProducts(updated);
    saveProducts(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setTab("list");
    setEditing(null);
  };

  const del = (id: number) => {
    const updated = products.filter(x => x.id !== id);
    setProducts(updated);
    saveProducts(updated);
    setDel(null);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>, p: P, setP: (v:P)=>void) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setP({ ...p, image: ev.target?.result as string });
    r.readAsDataURL(f);
  };

  const filtered = products.filter(p =>
    (catFilter === "All" || p.category === catFilter) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  // ── LOGIN SCREEN ──
  if (!auth) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#052e16,#14532d)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"40px 32px", width:"100%", maxWidth:380, boxShadow:"0 24px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:44, marginBottom:10 }}>🔒</div>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a" }}>Admin Panel</h1>
          <p style={{ fontSize:13, color:"#64748b", marginTop:4 }}>Battery Master</p>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:6 }}>Password</label>
          <input
            type="password" value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Enter password"
            style={{ width:"100%", padding:"12px 14px", border:`2px solid ${pwErr?"#dc2626":"#e2e8f0"}`, borderRadius:10, fontSize:15, outline:"none", fontFamily:"inherit", boxSizing:"border-box", transition:"border-color .2s" }}
          />
          {pwErr && <div style={{ fontSize:12, color:"#dc2626", marginTop:5, fontWeight:600 }}>❌ Incorrect password</div>}
        </div>
        <button onClick={login}
          style={{ width:"100%", padding:"13px", background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:800, cursor:"pointer" }}>
          Login →
        </button>
      </div>
    </div>
  );

  // ── EDIT / ADD FORM ──
  const EditForm = ({ initial }: { initial: P }) => {
    const [p, setP] = useState<P>(initial);
    return (
      <div style={{ background:"#fff", borderRadius:16, border:"1.5px solid #d1fae5", overflow:"hidden" }}>
        {/* Form header */}
        <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"18px 20px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => { setTab("list"); setEditing(null); }}
            style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8, width:34, height:34, color:"#fff", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
            ←
          </button>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{tab === "add" ? "Add New Product" : "Edit Product"}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{tab === "edit" ? p.name : "Fill in product details"}</div>
          </div>
        </div>

        <div style={{ padding:20 }}>
          {/* Image upload */}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:8 }}>Product Image</label>
            <div
              onClick={() => imgRef.current?.click()}
              style={{ border:"2px dashed #d1fae5", borderRadius:12, padding:20, textAlign:"center", cursor:"pointer", background:"#f0fdf4", transition:"border-color .2s", minHeight:120, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
              {p.image ? (
                <img src={p.image} alt="preview" style={{ maxHeight:120, maxWidth:"100%", objectFit:"contain", borderRadius:8 }} />
              ) : (
                <>
                  <div style={{ fontSize:32 }}>📷</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#64748b" }}>Tap to upload image</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>JPG, PNG, WebP</div>
                </>
              )}
            </div>
            <input ref={imgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e => handleImg(e, p, setP)} />
            {p.image && (
              <div style={{ display:"flex", gap:8, marginTop:8 }}>
                <input value={p.image.startsWith("data:") ? "(uploaded image)" : p.image}
                  onChange={e => setP({ ...p, image: e.target.value })}
                  placeholder="Or paste image URL e.g. /products/jk-bms.jpg"
                  style={{ flex:1, padding:"8px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:12, outline:"none", fontFamily:"inherit" }}
                />
                <button onClick={() => setP({ ...p, image:"" })}
                  style={{ padding:"8px 12px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:8, color:"#dc2626", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                  Remove
                </button>
              </div>
            )}
            {!p.image && (
              <input value={p.image}
                onChange={e => setP({ ...p, image: e.target.value })}
                placeholder="Or paste image URL e.g. /products/jk-bms.jpg"
                style={{ width:"100%", marginTop:8, padding:"8px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:12, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
              />
            )}
          </div>

          {/* Name */}
          <Field label="Product Name *" error={!p.name && "Required"}>
            <input className="inp" value={p.name} onChange={e => setP({ ...p, name:e.target.value })} placeholder="e.g. JK BMS 4S 100A" />
          </Field>

          {/* Category + Badge row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            <Field label="Category *">
              <select className="inp" value={p.category} onChange={e => setP({ ...p, category:e.target.value })}
                style={{ cursor:"pointer" }}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Badge">
              <select className="inp" value={p.badge} onChange={e => setP({ ...p, badge:e.target.value })}
                style={{ cursor:"pointer" }}>
                {BADGES.map(b => <option key={b} value={b}>{b === "none" ? "No Badge" : b.toUpperCase()}</option>)}
              </select>
            </Field>
          </div>

          {/* Price + Original Price */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            <Field label="Price *">
              <input className="inp" value={p.price} onChange={e => setP({ ...p, price:e.target.value })} placeholder="e.g. Rs. 4,500" />
            </Field>
            <Field label="Original Price (optional)">
              <input className="inp" value={p.originalPrice} onChange={e => setP({ ...p, originalPrice:e.target.value })} placeholder="e.g. Rs. 5,000" />
            </Field>
          </div>

          {/* Stock */}
          <Field label="Stock Status" style={{ marginBottom:14 }}>
            <select className="inp" value={p.stock} onChange={e => setP({ ...p, stock:e.target.value })} style={{ cursor:"pointer" }}>
              {STOCKS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>

          {/* Description */}
          <Field label="Description">
            <textarea className="inp" value={p.description} onChange={e => setP({ ...p, description:e.target.value })}
              rows={4} placeholder="Product details, specs, features..." style={{ resize:"vertical" }} />
          </Field>

          {/* Save */}
          <div style={{ display:"flex", gap:10, marginTop:20 }}>
            <button onClick={() => save(p)}
              disabled={!p.name || !p.price}
              style={{ flex:1, padding:"13px", background: (!p.name||!p.price) ? "#d1fae5" : "#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:800, cursor: (!p.name||!p.price) ? "not-allowed" : "pointer" }}>
              {tab === "add" ? "✅ Add Product" : "💾 Save Changes"}
            </button>
            <button onClick={() => { setTab("list"); setEditing(null); }}
              style={{ padding:"13px 20px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", color:"#374151" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── MAIN ADMIN UI ──
  return (
    <div style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"0", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", maxWidth:800, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src="/logo.png" alt="BM" width={36} height={36} style={{ objectFit:"contain", flexShrink:0 }} />
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>Admin Panel</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)" }}>Battery Master</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {saved && <div style={{ background:"#4ade80", color:"#052e16", padding:"5px 12px", borderRadius:20, fontSize:11, fontWeight:800 }}>✅ Saved!</div>}
            <a href="/" style={{ padding:"7px 14px", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:8, fontSize:12, fontWeight:700, color:"#fff", textDecoration:"none" }}>
              ← Website
            </a>
            <button onClick={() => { sessionStorage.removeItem("bm_admin"); setAuth(false); }}
              style={{ padding:"7px 14px", background:"rgba(239,68,68,0.2)", border:"1px solid rgba(239,68,68,0.35)", borderRadius:8, fontSize:12, fontWeight:700, color:"#fca5a5", cursor:"pointer" }}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display:"flex", gap:0, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          {[
            { n: products.length, l:"Total Products" },
            { n: products.filter(p=>p.stock==="In Stock").length, l:"In Stock" },
            { n: products.filter(p=>p.stock==="Limited").length, l:"Limited" },
            { n: products.filter(p=>p.badge && p.badge!=="none").length, l:"Badged" },
          ].map(s => (
            <div key={s.l} style={{ flex:1, textAlign:"center", padding:"10px 4px", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize:18, fontWeight:900, color:"#4ade80" }}>{s.n}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:".06em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"16px 16px 60px" }}>

        {/* EDIT / ADD TAB */}
        {(tab === "edit" || tab === "add") && editing && (
          <EditForm initial={editing} />
        )}

        {/* LIST TAB */}
        {tab === "list" && (
          <>
            {/* Search + Add */}
            <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap" }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search products..."
                style={{ flex:1, minWidth:160, padding:"10px 14px", border:"1.5px solid #d1fae5", borderRadius:10, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}
              />
              <button onClick={() => { setEditing(blank()); setTab("add"); }}
                style={{ padding:"10px 18px", background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                + Add Product
              </button>
            </div>

            {/* Category filter */}
            <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:10, marginBottom:14, msOverflowStyle:"none", scrollbarWidth:"none" }}>
              {["All", ...CATS].map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{ flexShrink:0, padding:"6px 14px", borderRadius:20, border: catFilter===c ? "2px solid #16a34a" : "1.5px solid #d1fae5", background: catFilter===c ? "#16a34a" : "#fff", color: catFilter===c ? "#fff" : "#374151", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Count */}
            <div style={{ fontSize:12, color:"#64748b", marginBottom:10, fontWeight:600 }}>
              Showing <strong style={{ color:"#0f172a" }}>{filtered.length}</strong> products
              {catFilter !== "All" && ` in ${catFilter}`}
            </div>

            {/* Product list */}
            {filtered.length === 0 ? (
              <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid #d1fae5", padding:"48px 20px", textAlign:"center", color:"#94a3b8" }}>
                <div style={{ fontSize:40, marginBottom:10 }}>📦</div>
                <div style={{ fontSize:14, fontWeight:600 }}>
                  {products.length === 0 ? "No products yet — add your first product!" : "No products match your filter"}
                </div>
                {products.length === 0 && (
                  <button onClick={() => { setEditing(blank()); setTab("add"); }}
                    style={{ marginTop:14, padding:"10px 20px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                    + Add First Product
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {filtered.map(p => (
                  <div key={p.id} style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
                    {/* Thumb */}
                    <div style={{ width:60, height:60, flexShrink:0, borderRadius:10, background:"#f0fdf4", border:"1px solid #d1fae5", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {p.image ? (
                        <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"contain", padding:4 }} />
                      ) : (
                        <span style={{ fontSize:22 }}>🔋</span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:3 }}>
                        <span style={{ fontSize:14, fontWeight:700, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:200 }}>{p.name}</span>
                        {p.badge && p.badge !== "none" && (
                          <span style={{ fontSize:9, fontWeight:800, padding:"2px 7px", borderRadius:4, background: p.badge==="hot"?"#f97316":p.badge==="new"?"#16a34a":"#dc2626", color:"#fff", textTransform:"uppercase" }}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", marginBottom:3 }}>{p.category}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontSize:13, fontWeight:800, color:"#16a34a" }}>{p.price}</span>
                        <span style={{ fontSize:11, fontWeight:600, color: p.stock==="Out of Stock"?"#dc2626":p.stock==="Limited"?"#d97706":"#16a34a" }}>● {p.stock}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display:"flex", gap:7, flexShrink:0 }}>
                      <button onClick={() => { setEditing({ ...p }); setTab("edit"); }}
                        style={{ padding:"8px 14px", background:"#eff6ff", border:"1.5px solid #bfdbfe", borderRadius:8, fontSize:12, fontWeight:700, color:"#2563eb", cursor:"pointer" }}>
                        ✏️ Edit
                      </button>
                      {delConfirm === p.id ? (
                        <div style={{ display:"flex", gap:5 }}>
                          <button onClick={() => del(p.id)}
                            style={{ padding:"8px 10px", background:"#dc2626", border:"none", borderRadius:8, fontSize:11, fontWeight:700, color:"#fff", cursor:"pointer" }}>
                            Yes, Delete
                          </button>
                          <button onClick={() => setDel(null)}
                            style={{ padding:"8px 10px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:11, fontWeight:700, color:"#374151", cursor:"pointer" }}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDel(p.id)}
                          style={{ padding:"8px 10px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:8, fontSize:12, fontWeight:700, color:"#dc2626", cursor:"pointer" }}>
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children, style }: { label:string; error?: string|false; children:React.ReactNode; style?:React.CSSProperties }) {
  return (
    <div style={{ marginBottom:14, ...style }}>
      <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>{label}</label>
      {children}
      {error && <div style={{ fontSize:11, color:"#dc2626", marginTop:3 }}>⚠ {error}</div>}
    </div>
  );
}
