"use client";
import { useState, useEffect, useRef } from "react";
import { allProducts as SEED } from "@/data/products";

const PASS   = "usman123";
const CATS   = ["JK BMS","Lithium Battery Packed","Battery Box","Lithium Ion Cell","LiFePO4 Cell","LCD Display","EVE Bike Kits","Chargers","EVE Bike Display","Meter Tools"];
const BADGES = ["none","hot","new","sale"];
const STOCKS = ["In Stock","Limited","Out of Stock"];
const SK     = "bm_admin_products_v2";

type P = {
  id: number; name: string; category: string; price: string;
  stock: string; description: string; image: string;
  badge: string; originalPrice: string;
};

function toAdminP(p: { id:number; name:string; category:string; price:string; stock:string; description:string; image:string; badge?:string|null; originalPrice?:string }): P {
  return { ...p, badge: p.badge ?? "none", originalPrice: p.originalPrice ?? "", stock: p.stock ?? "In Stock" };
}

function loadProducts(): P[] {
  try {
    const raw = localStorage.getItem(SK);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  // First time: seed from products.ts
  const seeded = SEED.map(toAdminP);
  try { localStorage.setItem(SK, JSON.stringify(seeded)); } catch {}
  return seeded;
}

function saveProducts(p: P[]) {
  try { localStorage.setItem(SK, JSON.stringify(p)); } catch {}
}

const blank = (): P => ({
  id: Date.now(), name: "", category: "JK BMS", price: "",
  stock: "In Stock", description: "", image: "", badge: "none", originalPrice: ""
});

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
    if (pw === PASS) {
      setAuth(true);
      sessionStorage.setItem("bm_admin", "1");
      setProducts(loadProducts());
    } else {
      setPwErr(true);
      setTimeout(() => setPwErr(false), 2000);
    }
  };

  const save = (p: P) => {
    const updated = tab === "add"
      ? [...products, { ...p, id: Date.now() }]
      : products.map(x => x.id === p.id ? p : x);
    setProducts(updated);
    saveProducts(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setTab("list");
    setEditing(null);
  };

  const del = (id: number) => {
    const updated = products.filter(x => x.id !== id);
    setProducts(updated);
    saveProducts(updated);
    setDel(null);
  };

  const resetToDefault = () => {
    if (!confirm("Reset all products to default? All your changes will be lost.")) return;
    const seeded = SEED.map(toAdminP);
    setProducts(seeded);
    saveProducts(seeded);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>, p: P, setP: (v: P) => void) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setP({ ...p, image: ev.target?.result as string });
    r.readAsDataURL(f);
  };

  const filtered = products.filter(p =>
    (catFilter === "All" || p.category === catFilter) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.category.toLowerCase().includes(search.toLowerCase()))
  );

  /* ── LOGIN ── */
  if (!auth) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#052e16,#14532d)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"40px 32px", width:"100%", maxWidth:380, boxShadow:"0 24px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:48, marginBottom:10 }}>🔒</div>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a" }}>Admin Panel</h1>
          <p style={{ fontSize:13, color:"#64748b", marginTop:4 }}>Battery Master</p>
        </div>
        <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:6 }}>Password</label>
        <input
          type="password" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Enter password"
          style={{ width:"100%", padding:"12px 14px", border:`2px solid ${pwErr ? "#dc2626" : "#e2e8f0"}`, borderRadius:10, fontSize:15, outline:"none", fontFamily:"inherit", boxSizing:"border-box", marginBottom:6, transition:"border-color .2s" }}
        />
        {pwErr && <div style={{ fontSize:12, color:"#dc2626", marginBottom:10, fontWeight:600 }}>❌ Incorrect password</div>}
        <button onClick={login} style={{ width:"100%", padding:"13px", background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:800, cursor:"pointer", marginTop:8 }}>
          Login →
        </button>
      </div>
    </div>
  );

  /* ── EDIT FORM COMPONENT ── */
  const EditForm = ({ initial }: { initial: P }) => {
    const [p, setP] = useState<P>(initial);
    const fRef = useRef<HTMLInputElement>(null);
    return (
      <div style={{ background:"#fff", borderRadius:16, border:"1.5px solid #d1fae5", overflow:"hidden" }}>
        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"16px 20px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => { setTab("list"); setEditing(null); }}
            style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8, width:34, height:34, color:"#fff", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>
            ←
          </button>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{tab === "add" ? "Add New Product" : "Edit Product"}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{tab === "edit" ? p.name : "Fill in product details"}</div>
          </div>
        </div>

        <div style={{ padding:20, display:"flex", flexDirection:"column", gap:14 }}>

          {/* Image */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:8 }}>Product Image</label>
            <div onClick={() => fRef.current?.click()}
              style={{ border:"2px dashed #d1fae5", borderRadius:12, minHeight:120, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer", background:"#f0fdf4", padding:16, transition:"border-color .2s" }}>
              {p.image ? (
                <img src={p.image} alt="preview" style={{ maxHeight:130, maxWidth:"100%", objectFit:"contain", borderRadius:8 }} />
              ) : (
                <>
                  <div style={{ fontSize:32 }}>📷</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#64748b" }}>Tap to upload image</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>JPG, PNG, WebP</div>
                </>
              )}
            </div>
            <input ref={fRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e => handleImg(e, p, setP)} />
            <input
              value={p.image.startsWith("data:") ? "" : p.image}
              onChange={e => setP({ ...p, image: e.target.value })}
              placeholder="Or paste image URL: /products/jk-bms.jpg"
              style={{ width:"100%", marginTop:8, padding:"9px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:12, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
            />
            {p.image && (
              <button onClick={() => setP({ ...p, image:"" })}
                style={{ marginTop:6, padding:"6px 12px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:6, color:"#dc2626", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                🗑 Remove Image
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>
              Product Name <span style={{ color:"#dc2626" }}>*</span>
            </label>
            <input value={p.name} onChange={e => setP({ ...p, name:e.target.value })}
              placeholder="e.g. JK BMS 4S 100A"
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
          </div>

          {/* Category + Badge */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Category</label>
              <select value={p.category} onChange={e => setP({ ...p, category:e.target.value })}
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Badge</label>
              <select value={p.badge} onChange={e => setP({ ...p, badge:e.target.value })}
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}>
                {BADGES.map(b => <option key={b} value={b}>{b === "none" ? "No Badge" : b.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Original Price */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>
                Price <span style={{ color:"#dc2626" }}>*</span>
              </label>
              <input value={p.price} onChange={e => setP({ ...p, price:e.target.value })}
                placeholder="Rs. 4,500"
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Original Price</label>
              <input value={p.originalPrice} onChange={e => setP({ ...p, originalPrice:e.target.value })}
                placeholder="Rs. 5,000 (optional)"
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Stock Status</label>
            <select value={p.stock} onChange={e => setP({ ...p, stock:e.target.value })}
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}>
              {STOCKS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Description</label>
            <textarea value={p.description} onChange={e => setP({ ...p, description:e.target.value })}
              rows={4} placeholder="Product specs, features, use-case..."
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }} />
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => save(p)} disabled={!p.name || !p.price}
              style={{ flex:1, padding:"13px", background: (!p.name||!p.price) ? "#d1fae5" : "#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:800, cursor: (!p.name||!p.price) ? "not-allowed":"pointer" }}>
              {tab === "add" ? "✅ Add Product" : "💾 Save Changes"}
            </button>
            <button onClick={() => { setTab("list"); setEditing(null); }}
              style={{ padding:"13px 18px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", color:"#374151" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ── MAIN UI ── */
  return (
    <div style={{ minHeight:"100vh", background:"#f0fdf4" }}>

      {/* Top bar */}
      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", maxWidth:860, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src="/logo.png" alt="BM" width={34} height={34} style={{ objectFit:"contain" }} />
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>Admin Panel</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)" }}>Battery Master</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {saved && <div style={{ background:"#4ade80", color:"#052e16", padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:800, flexShrink:0 }}>✅ Saved!</div>}
            <a href="/" style={{ padding:"6px 12px", background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:7, fontSize:11, fontWeight:700, color:"#fff", textDecoration:"none", flexShrink:0 }}>
              ← Site
            </a>
            <button onClick={() => { sessionStorage.removeItem("bm_admin"); setAuth(false); setPw(""); }}
              style={{ padding:"6px 12px", background:"rgba(239,68,68,0.18)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:7, fontSize:11, fontWeight:700, color:"#fca5a5", cursor:"pointer", flexShrink:0 }}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", borderTop:"1px solid rgba(255,255,255,0.07)", maxWidth:860, margin:"0 auto" }}>
          {[
            { n: products.length,                                    l:"Total" },
            { n: products.filter(x => x.stock === "In Stock").length, l:"In Stock" },
            { n: products.filter(x => x.stock === "Limited").length,  l:"Limited" },
            { n: products.filter(x => x.badge && x.badge !== "none").length, l:"Badged" },
          ].map(s => (
            <div key={s.l} style={{ flex:1, textAlign:"center", padding:"9px 4px" }}>
              <div style={{ fontSize:17, fontWeight:900, color:"#4ade80" }}>{s.n}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:".06em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"16px 14px 80px" }}>

        {/* EDIT / ADD */}
        {(tab === "edit" || tab === "add") && editing && <EditForm initial={editing} />}

        {/* LIST */}
        {tab === "list" && (
          <>
            {/* Search + Add */}
            <div style={{ display:"flex", gap:10, marginBottom:12, flexWrap:"wrap" }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search products..."
                style={{ flex:1, minWidth:140, padding:"10px 14px", border:"1.5px solid #d1fae5", borderRadius:10, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }} />
              <button onClick={() => { setEditing(blank()); setTab("add"); }}
                style={{ padding:"10px 16px", background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                + Add Product
              </button>
              <button onClick={resetToDefault}
                style={{ padding:"10px 12px", background:"#fff", color:"#64748b", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:12, fontWeight:600, cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" }}>
                🔄 Reset
              </button>
            </div>

            {/* Category filter */}
            <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:10, marginBottom:12, msOverflowStyle:"none", scrollbarWidth:"none" }}>
              {["All", ...CATS].map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{ flexShrink:0, padding:"6px 14px", borderRadius:20, border: catFilter===c ? "2px solid #16a34a" : "1.5px solid #d1fae5", background: catFilter===c ? "#16a34a" : "#fff", color: catFilter===c ? "#fff" : "#374151", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{ fontSize:12, color:"#64748b", marginBottom:10, fontWeight:600 }}>
              <strong style={{ color:"#0f172a" }}>{filtered.length}</strong> products
              {catFilter !== "All" && ` in ${catFilter}`}
              {search && ` matching "${search}"`}
            </div>

            {/* Product List */}
            {filtered.length === 0 ? (
              <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid #d1fae5", padding:"40px 20px", textAlign:"center", color:"#94a3b8" }}>
                <div style={{ fontSize:36, marginBottom:10 }}>📦</div>
                <div style={{ fontSize:14, fontWeight:600, color:"#374151" }}>No products found</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {filtered.map(p => (
                  <div key={p.id} style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:14, padding:"13px 14px", display:"flex", alignItems:"center", gap:12 }}>

                    {/* Thumb */}
                    <div style={{ width:56, height:56, flexShrink:0, borderRadius:10, background:"#f0fdf4", border:"1px solid #d1fae5", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {p.image ? (
                        <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"contain", padding:4 }} />
                      ) : (
                        <span style={{ fontSize:20 }}>🔋</span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:2 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"calc(100% - 60px)" }}>
                          {p.name}
                        </span>
                        {p.badge && p.badge !== "none" && (
                          <span style={{ fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:4, background: p.badge==="hot"?"#f97316":p.badge==="new"?"#16a34a":"#dc2626", color:"#fff", textTransform:"uppercase", flexShrink:0 }}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", marginBottom:2 }}>{p.category}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontSize:13, fontWeight:800, color:"#16a34a" }}>{p.price}</span>
                        <span style={{ fontSize:10, fontWeight:600, color: p.stock==="Out of Stock"?"#dc2626":p.stock==="Limited"?"#d97706":"#16a34a" }}>
                          ● {p.stock}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                      <button onClick={() => { setEditing({ ...p }); setTab("edit"); }}
                        style={{ padding:"7px 12px", background:"#eff6ff", border:"1.5px solid #bfdbfe", borderRadius:8, fontSize:12, fontWeight:700, color:"#2563eb", cursor:"pointer" }}>
                        ✏️ Edit
                      </button>
                      {delConfirm === p.id ? (
                        <div style={{ display:"flex", gap:5 }}>
                          <button onClick={() => del(p.id)}
                            style={{ padding:"7px 10px", background:"#dc2626", border:"none", borderRadius:8, fontSize:11, fontWeight:700, color:"#fff", cursor:"pointer" }}>
                            Delete
                          </button>
                          <button onClick={() => setDel(null)}
                            style={{ padding:"7px 10px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:11, fontWeight:700, color:"#374151", cursor:"pointer" }}>
                            No
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDel(p.id)}
                          style={{ padding:"7px 10px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:8, fontSize:12, fontWeight:700, color:"#dc2626", cursor:"pointer" }}>
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
