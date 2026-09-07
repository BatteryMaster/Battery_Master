"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { allProducts as SEED } from "@/data/products";

const PASS   = "usman123";
const CATS   = ["JK BMS","Lithium Battery Packed","Battery Box","Lithium Ion Cell","LiFePO4 Cell","LCD Display","EVE Bike Kits","Chargers","EVE Bike Display","Meter Tools"];
const BADGES = ["none","hot","new","sale"];
const STOCKS = ["In Stock","Limited","Out of Stock"];

type P = { id:number; name:string; category:string; price:string; stock:string; description:string; image:string; badge:string; originalPrice:string; };

function rowToP(r: Record<string,unknown>): P {
  return {
    id: Number(r.id), name: String(r.name??""), category: String(r.category??""),
    price: String(r.price??""), stock: String(r.stock??"In Stock"),
    description: String(r.description??""), image: String(r.image??""),
    badge: String(r.badge??"none"), originalPrice: String(r.original_price??""),
  };
}
function pToRow(p: P) {
  return {
    name: p.name, category: p.category, price: p.price, stock: p.stock,
    description: p.description, image: p.image,
    badge: p.badge==="none" ? null : p.badge,
    original_price: p.originalPrice || null,
  };
}
const blank = (): P => ({ id:0, name:"", category:"JK BMS", price:"", stock:"In Stock", description:"", image:"", badge:"none", originalPrice:"" });

function fmtPrice(raw: string) {
  const n = raw.replace(/[^0-9]/g, "");
  return n ? "Rs. " + Number(n).toLocaleString("en-PK") : "";
}

// Convert ANY image file to base64 string
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

type SliderItem = { id:number; image:string; title:string; subtitle:string; link:string; sort_order:number; active:boolean; };
const blankSlide = (): Omit<SliderItem,"id"> => ({ image:"", title:"", subtitle:"", link:"", sort_order:0, active:true });

export default function AdminPage() {
  const [auth, setAuth]         = useState(false);
  const [pw, setPw]             = useState("");
  const [pwErr, setPwErr]       = useState(false);
  const [products, setProducts] = useState<P[]>([]);
  const [loading, setLoading]   = useState(false);
  const [tab, setTab]           = useState<"list"|"edit"|"add"|"sliders">("list");
  const [editing, setEditing]   = useState<P|null>(null);
  const [search, setSearch]     = useState("");
  const [catFilter, setCat]     = useState("All");
  const [toast, setToast]       = useState("");
  const [toastType, setToastType] = useState<"ok"|"err">("ok");
  const [delConfirm, setDel]    = useState<number|null>(null);
  const [sliders, setSliders]   = useState<SliderItem[]>([]);
  const [sliderLoading, setSL]  = useState(false);

  const showToast = (msg: string, type: "ok"|"err" = "ok") => {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(""), 3000);
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
    if (!error && data) setProducts(data.map(rowToP));
    else if (error) showToast("❌ " + error.message, "err");
    setLoading(false);
  }, []);

  const seedIfEmpty = useCallback(async () => {
    const { count } = await supabase.from("products").select("*", { count:"exact", head:true });
    if ((count ?? 0) === 0) {
      const rows = SEED.map(p => ({
        name: p.name, category: p.category, price: p.price,
        stock: p.stock, description: p.description, image: p.image,
        badge: p.badge || null, original_price: p.originalPrice || null,
      }));
      await supabase.from("products").insert(rows);
      showToast("✅ Default products loaded!");
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("bm_admin") === "1") {
      setAuth(true);
      seedIfEmpty().then(loadProducts);
    }
  }, [seedIfEmpty, loadProducts]);

  const login = () => {
    if (pw === PASS) {
      setAuth(true);
      sessionStorage.setItem("bm_admin","1");
      seedIfEmpty().then(loadProducts);
    } else {
      setPwErr(true);
      setTimeout(() => setPwErr(false), 2000);
    }
  };

  const saveProduct = async (p: P) => {
    if (!p.name.trim()) { showToast("❌ Product name required", "err"); return; }
    if (!p.price.trim()) { showToast("❌ Price required", "err"); return; }
    setLoading(true);
    if (tab === "add") {
      const { error } = await supabase.from("products").insert([pToRow(p)]);
      if (error) { showToast("❌ " + error.message, "err"); setLoading(false); return; }
      showToast("✅ Product added!");
    } else {
      const { error } = await supabase.from("products").update(pToRow(p)).eq("id", p.id);
      if (error) { showToast("❌ " + error.message, "err"); setLoading(false); return; }
      showToast("✅ Saved!");
    }
    await loadProducts();
    setTab("list"); setEditing(null);
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { showToast("❌ " + error.message, "err"); return; }
    showToast("🗑️ Deleted");
    setDel(null);
    setProducts(prev => prev.filter(x => x.id !== id));
  };

  const loadSliders = useCallback(async () => {
    setSL(true);
    const { data } = await supabase.from("sliders").select("*").order("sort_order", { ascending:true });
    if (data) setSliders(data as SliderItem[]);
    setSL(false);
  }, []);

  const filtered = products.filter(p =>
    (catFilter==="All" || p.category===catFilter) &&
    (search==="" || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  /* ─── LOGIN ─── */
  if (!auth) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#052e16,#14532d)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"40px 32px", width:"100%", maxWidth:380, boxShadow:"0 24px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:48, marginBottom:10 }}>🔒</div>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#0f172a" }}>Admin Panel</h1>
          <p style={{ fontSize:13, color:"#64748b", marginTop:4 }}>Battery Master</p>
        </div>
        <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:6 }}>Password</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key==="Enter" && login()} placeholder="Enter password"
          style={{ width:"100%", padding:"12px 14px", border:`2px solid ${pwErr?"#dc2626":"#e2e8f0"}`, borderRadius:10, fontSize:15, outline:"none", fontFamily:"inherit", boxSizing:"border-box", marginBottom:8 }} />
        {pwErr && <div style={{ fontSize:12, color:"#dc2626", marginBottom:8, fontWeight:600 }}>❌ Incorrect password</div>}
        <button onClick={login} style={{ width:"100%", padding:"13px", background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:800, cursor:"pointer" }}>
          Login →
        </button>
      </div>
    </div>
  );

  /* ─── EDIT FORM ─── */
  const EditForm = ({ initial }: { initial: P }) => {
    const [p, setP]           = useState<P>(initial);
    const [imgLoading, setImgLoading] = useState(false);
    const fRef = useRef<HTMLInputElement>(null);

    // Handle image upload — supports ALL file types: JPG, PNG, WebP, AVIF, GIF, SVG, HEIC etc.
    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast("❌ Image too large. Max 5MB allowed.", "err");
        return;
      }

      setImgLoading(true);
      try {
        const base64 = await fileToBase64(file);
        setP(prev => ({ ...prev, image: base64 }));
        showToast("✅ Image loaded!");
      } catch {
        showToast("❌ Could not load image", "err");
      } finally {
        setImgLoading(false);
      }
    };

    return (
      <div style={{ background:"#fff", borderRadius:16, border:"1.5px solid #d1fae5", overflow:"hidden" }}>
        {/* Form header */}
        <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"16px 20px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => { setTab("list"); setEditing(null); }}
            style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8, width:34, height:34, color:"#fff", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>
            ←
          </button>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{tab==="add" ? "Add New Product" : "Edit Product"}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{tab==="edit" ? p.name : "Fill in details"}</div>
          </div>
        </div>

        <div style={{ padding:20, display:"flex", flexDirection:"column", gap:14 }}>

          {/* ─ IMAGE UPLOAD ─ */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:8 }}>
              Product Image
              <span style={{ fontSize:10, color:"#94a3b8", fontWeight:500, marginLeft:8 }}>JPG, PNG, WebP, AVIF, GIF, HEIC — any format</span>
            </label>

            {/* Preview / Upload area */}
            <div
              onClick={() => !imgLoading && fRef.current?.click()}
              style={{ border:`2px dashed ${imgLoading?"#16a34a":"#d1fae5"}`, borderRadius:12, minHeight:130, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, cursor:imgLoading?"wait":"pointer", background:"#f0fdf4", padding:14, transition:"border-color .2s", position:"relative", overflow:"hidden" }}>
              {imgLoading ? (
                <>
                  <div style={{ width:32, height:32, border:"3px solid #d1fae5", borderTop:"3px solid #16a34a", borderRadius:"50%", animation:"spin .8s linear infinite" }} />
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  <div style={{ fontSize:12, color:"#16a34a", fontWeight:600 }}>Uploading...</div>
                </>
              ) : p.image ? (
                <>
                  <img src={p.image} alt="preview"
                    style={{ maxHeight:150, maxWidth:"100%", objectFit:"contain", borderRadius:8 }} />
                  <div style={{ fontSize:11, color:"#16a34a", fontWeight:600 }}>✅ Image loaded — tap to change</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize:36 }}>📷</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#374151" }}>Tap to upload image</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>Any format — JPG, PNG, WebP, AVIF, GIF, HEIC</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>Max size: 5MB</div>
                </>
              )}
            </div>

            {/* Hidden file input — accept ALL image types */}
            <input
              ref={fRef}
              type="file"
              accept="image/*,.heic,.heif,.avif"
              style={{ display:"none" }}
              onChange={handleImg}
            />

            {/* URL input */}
            <input
              value={p.image.startsWith("data:") ? "" : p.image}
              onChange={e => setP(prev => ({ ...prev, image: e.target.value }))}
              placeholder="Or paste image URL: https://... or /products/item.jpg"
              style={{ width:"100%", marginTop:8, padding:"9px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:12, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
            />
            {p.image && (
              <button onClick={() => setP(prev => ({ ...prev, image:"" }))}
                style={{ marginTop:6, padding:"5px 12px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:6, color:"#dc2626", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                🗑 Remove Image
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Product Name *</label>
            <input value={p.name} onChange={e => setP(prev => ({ ...prev, name:e.target.value }))}
              placeholder="e.g. JK BMS 4S 100A"
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
          </div>

          {/* Category + Badge */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Category</label>
              <select value={p.category} onChange={e => setP(prev => ({ ...prev, category:e.target.value }))}
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Badge</label>
              <select value={p.badge} onChange={e => setP(prev => ({ ...prev, badge:e.target.value }))}
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}>
                {BADGES.map(b => <option key={b} value={b}>{b==="none"?"No Badge":b.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Original Price */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Price *</label>
              <input
                value={p.price.replace(/^Rs\.\s*/,"")}
                onChange={e => setP(prev => ({ ...prev, price:fmtPrice(e.target.value) }))}
                inputMode="numeric" placeholder="e.g. 4500"
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
              {p.price && <div style={{ fontSize:11, color:"#16a34a", marginTop:3, fontWeight:700 }}>{p.price}</div>}
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Original Price (optional)</label>
              <input
                value={p.originalPrice.replace(/^Rs\.\s*/,"")}
                onChange={e => setP(prev => ({ ...prev, originalPrice:fmtPrice(e.target.value) }))}
                inputMode="numeric" placeholder="e.g. 5000"
                style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
              {p.originalPrice && <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>{p.originalPrice}</div>}
            </div>
          </div>

          {/* Stock */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Stock Status</label>
            <select value={p.stock} onChange={e => setP(prev => ({ ...prev, stock:e.target.value }))}
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }}>
              {STOCKS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Description</label>
            <textarea value={p.description} onChange={e => setP(prev => ({ ...prev, description:e.target.value }))}
              rows={4} placeholder="Product specs, features, use-case..."
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }} />
          </div>

          {/* Save */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => saveProduct(p)} disabled={loading||imgLoading}
              style={{ flex:1, padding:"13px", background:(loading||imgLoading)?"#d1fae5":"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:800, cursor:(loading||imgLoading)?"not-allowed":"pointer" }}>
              {loading ? "⏳ Saving..." : tab==="add" ? "✅ Add Product" : "💾 Save Changes"}
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

  /* ─── MAIN UI ─── */
  return (
    <div style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:toastType==="err"?"#dc2626":"#0f172a", color:"#fff", padding:"10px 24px", borderRadius:100, fontSize:13, fontWeight:700, zIndex:9999, boxShadow:"0 4px 20px rgba(0,0,0,0.25)", whiteSpace:"nowrap" }}>
          {toast}
        </div>
      )}

      {/* Header */}
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
            <button onClick={loadProducts} disabled={loading}
              style={{ padding:"6px 12px", background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:7, fontSize:11, fontWeight:700, color:"#fff", cursor:"pointer" }}>
              {loading ? "⏳" : "🔄 Refresh"}
            </button>
            <a href="/" style={{ padding:"6px 12px", background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:7, fontSize:11, fontWeight:700, color:"#fff", textDecoration:"none" }}>← Site</a>
            <button onClick={() => { sessionStorage.removeItem("bm_admin"); setAuth(false); setPw(""); }}
              style={{ padding:"6px 12px", background:"rgba(239,68,68,0.18)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:7, fontSize:11, fontWeight:700, color:"#fca5a5", cursor:"pointer" }}>
              Logout
            </button>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display:"flex", borderTop:"1px solid rgba(255,255,255,0.07)", maxWidth:860, margin:"0 auto" }}>
          {[
            { n:products.length, l:"Total" },
            { n:products.filter(x=>x.stock==="In Stock").length, l:"In Stock" },
            { n:products.filter(x=>x.stock==="Limited").length, l:"Limited" },
            { n:products.filter(x=>x.badge&&x.badge!=="none").length, l:"Badged" },
          ].map(s => (
            <div key={s.l} style={{ flex:1, textAlign:"center", padding:"9px 4px" }}>
              <div style={{ fontSize:17, fontWeight:900, color:"#4ade80" }}>{s.n}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:".06em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"16px 14px 80px" }}>

        {/* Edit / Add form */}
        {(tab==="edit"||tab==="add") && editing && <EditForm initial={editing} />}

        {/* Product list */}
        {tab==="list" && (
          <>
            {/* Tab switcher */}
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <button onClick={() => setTab("list")}
                style={{ padding:"8px 16px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:800, cursor:"pointer" }}>
                📦 Products
              </button>
              <button onClick={() => { setTab("sliders"); loadSliders(); }}
                style={{ padding:"8px 16px", background:"rgba(255,255,255,0.8)", color:"#374151", border:"1.5px solid #d1fae5", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                🖼️ Sliders
              </button>
            </div>

            <div style={{ display:"flex", gap:10, marginBottom:12, flexWrap:"wrap" }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search products..."
                style={{ flex:1, minWidth:140, padding:"10px 14px", border:"1.5px solid #d1fae5", borderRadius:10, fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff", boxSizing:"border-box" }} />
              <button onClick={() => { setEditing(blank()); setTab("add"); }}
                style={{ padding:"10px 16px", background:"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" }}>
                + Add Product
              </button>
            </div>

            <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:10, marginBottom:12, msOverflowStyle:"none", scrollbarWidth:"none" }}>
              {["All",...CATS].map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{ flexShrink:0, padding:"6px 14px", borderRadius:20, border:catFilter===c?"2px solid #16a34a":"1.5px solid #d1fae5", background:catFilter===c?"#16a34a":"#fff", color:catFilter===c?"#fff":"#374151", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{ fontSize:12, color:"#64748b", marginBottom:10 }}>
              <strong style={{ color:"#0f172a" }}>{filtered.length}</strong> products{catFilter!=="All"&&` in ${catFilter}`}
            </div>

            {loading && products.length===0 ? (
              <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid #d1fae5", padding:"48px 20px", textAlign:"center" }}>
                <div style={{ width:36, height:36, border:"3px solid #d1fae5", borderTop:"3px solid #16a34a", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto 12px" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <div style={{ fontSize:14, color:"#64748b", fontWeight:600 }}>Loading from Supabase...</div>
              </div>
            ) : filtered.length===0 ? (
              <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid #d1fae5", padding:"40px 20px", textAlign:"center", color:"#94a3b8" }}>
                <div style={{ fontSize:36, marginBottom:10 }}>📦</div>
                <div style={{ fontSize:14, fontWeight:600, color:"#374151" }}>No products found</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {filtered.map(p => (
                  <div key={p.id} style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:14, padding:"13px 14px", display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:54, height:54, flexShrink:0, borderRadius:10, background:"#f0fdf4", border:"1px solid #d1fae5", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {p.image
                        ? <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"contain", padding:4 }} />
                        : <span style={{ fontSize:20 }}>🔋</span>}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:2 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"calc(100% - 60px)" }}>{p.name}</span>
                        {p.badge&&p.badge!=="none"&&<span style={{ fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:4, background:p.badge==="hot"?"#f97316":p.badge==="new"?"#16a34a":"#dc2626", color:"#fff", textTransform:"uppercase" }}>{p.badge}</span>}
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", marginBottom:2 }}>{p.category}</div>
                      <div style={{ display:"flex", gap:8 }}>
                        <span style={{ fontSize:13, fontWeight:800, color:"#16a34a" }}>{p.price}</span>
                        <span style={{ fontSize:10, fontWeight:600, color:p.stock==="Out of Stock"?"#dc2626":p.stock==="Limited"?"#d97706":"#16a34a" }}>● {p.stock}</span>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                      <button onClick={() => { setEditing({...p}); setTab("edit"); }}
                        style={{ padding:"7px 12px", background:"#eff6ff", border:"1.5px solid #bfdbfe", borderRadius:8, fontSize:12, fontWeight:700, color:"#2563eb", cursor:"pointer" }}>
                        ✏️ Edit
                      </button>
                      {delConfirm===p.id ? (
                        <div style={{ display:"flex", gap:4 }}>
                          <button onClick={() => deleteProduct(p.id)} style={{ padding:"7px 10px", background:"#dc2626", border:"none", borderRadius:8, fontSize:11, fontWeight:700, color:"#fff", cursor:"pointer" }}>Delete</button>
                          <button onClick={() => setDel(null)} style={{ padding:"7px 10px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:11, fontWeight:700, color:"#374151", cursor:"pointer" }}>No</button>
                        </div>
                      ) : (
                        <button onClick={() => setDel(p.id)} style={{ padding:"7px 10px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:8, fontSize:12, fontWeight:700, color:"#dc2626", cursor:"pointer" }}>🗑️</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ─── SLIDERS TAB ─── */}
        {tab==="sliders" && (
          <SliderManager
            sliders={sliders}
            loading={sliderLoading}
            onReload={loadSliders}
            showToast={showToast}
          />
        )}
      </div>
    </div>
  );
}


// ─── SLIDER MANAGER ───
type SliderManagerProps = {
  sliders: SliderItem[];
  loading: boolean;
  onReload: () => void;
  showToast: (msg: string, type?: "ok"|"err") => void;
};

function SliderManager({ sliders, loading, onReload, showToast }: SliderManagerProps) {
  const [editingSlide, setEditingSlide] = useState<(Omit<SliderItem,"id"> & { id?:number })|null>(null);
  const [saving, setSaving]             = useState(false);
  const [delSlide, setDelSlide]         = useState<number|null>(null);
  const imgRef                          = useRef<HTMLInputElement>(null);

  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingSlide) return;
    if (file.size > 5 * 1024 * 1024) { showToast("❌ Max 5MB", "err"); return; }
    const reader = new FileReader();
    reader.onload = ev => setEditingSlide(prev => prev ? { ...prev, image: ev.target?.result as string } : null);
    reader.readAsDataURL(file);
  };

  const saveSlide = async () => {
    if (!editingSlide) return;
    if (!editingSlide.image) { showToast("❌ Please add an image", "err"); return; }
    setSaving(true);
    const row = {
      image: editingSlide.image, title: editingSlide.title,
      subtitle: editingSlide.subtitle, link: editingSlide.link,
      sort_order: editingSlide.sort_order, active: editingSlide.active,
    };
    let error;
    if (editingSlide.id) {
      ({ error } = await supabase.from("sliders").update(row).eq("id", editingSlide.id));
    } else {
      ({ error } = await supabase.from("sliders").insert([row]));
    }
    if (error) { showToast("❌ " + error.message, "err"); }
    else { showToast("✅ Slider saved!"); onReload(); setEditingSlide(null); }
    setSaving(false);
  };

  const deleteSlide = async (id: number) => {
    const { error } = await supabase.from("sliders").delete().eq("id", id);
    if (error) showToast("❌ " + error.message, "err");
    else { showToast("🗑️ Deleted"); onReload(); setDelSlide(null); }
  };

  const toggleActive = async (s: SliderItem) => {
    await supabase.from("sliders").update({ active: !s.active }).eq("id", s.id);
    onReload();
  };

  if (editingSlide !== null) return (
    <div style={{ background:"#fff", borderRadius:16, border:"1.5px solid #d1fae5", overflow:"hidden" }}>
      <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", padding:"16px 20px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={() => setEditingSlide(null)}
          style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8, width:34, height:34, color:"#fff", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>
          ←
        </button>
        <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{editingSlide.id ? "Edit Slide" : "Add New Slide"}</div>
      </div>

      <div style={{ padding:20, display:"flex", flexDirection:"column", gap:14 }}>
        {/* Image */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:8 }}>
            Slide Image * <span style={{ fontSize:10, color:"#94a3b8", fontWeight:500 }}>Recommended: 1200×500px, any format</span>
          </label>
          <div onClick={() => imgRef.current?.click()}
            style={{ border:"2px dashed #d1fae5", borderRadius:12, minHeight:140, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer", background:"#f0fdf4", padding:14, overflow:"hidden" }}>
            {editingSlide.image ? (
              <img src={editingSlide.image} alt="slide preview"
                style={{ maxHeight:160, maxWidth:"100%", objectFit:"contain", borderRadius:8 }} />
            ) : (
              <>
                <div style={{ fontSize:36 }}>🖼️</div>
                <div style={{ fontSize:13, fontWeight:700, color:"#374151" }}>Tap to upload slide image</div>
                <div style={{ fontSize:11, color:"#94a3b8" }}>JPG, PNG, WebP, AVIF — any format • Max 5MB</div>
              </>
            )}
          </div>
          <input ref={imgRef} type="file" accept="image/*,.heic,.heif,.avif" style={{ display:"none" }} onChange={handleImg} />
          <input value={editingSlide.image.startsWith("data:") ? "" : editingSlide.image}
            onChange={e => setEditingSlide(prev => prev ? { ...prev, image: e.target.value } : null)}
            placeholder="Or paste image URL"
            style={{ width:"100%", marginTop:8, padding:"9px 12px", border:"1.5px solid #e2e8f0", borderRadius:8, fontSize:12, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
        </div>

        {/* Title */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Title (optional)</label>
          <input value={editingSlide.title}
            onChange={e => setEditingSlide(prev => prev ? { ...prev, title: e.target.value } : null)}
            placeholder="e.g. JK BMS — Active Balancing"
            style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
        </div>

        {/* Subtitle */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Subtitle (optional)</label>
          <input value={editingSlide.subtitle}
            onChange={e => setEditingSlide(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
            placeholder="e.g. 4S to 24S • Bluetooth • Best price in Karachi"
            style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
        </div>

        {/* Link + Order */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Button Link (optional)</label>
            <input value={editingSlide.link}
              onChange={e => setEditingSlide(prev => prev ? { ...prev, link: e.target.value } : null)}
              placeholder="/categories/jk-bms"
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:"#374151", display:"block", marginBottom:5 }}>Order (1 = first)</label>
            <input type="number" value={editingSlide.sort_order}
              onChange={e => setEditingSlide(prev => prev ? { ...prev, sort_order: Number(e.target.value) } : null)}
              style={{ width:"100%", padding:"11px 13px", border:"1.5px solid #e2e8f0", borderRadius:9, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
          </div>
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={saveSlide} disabled={saving||!editingSlide.image}
            style={{ flex:1, padding:"13px", background:(saving||!editingSlide.image)?"#d1fae5":"#16a34a", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:800, cursor:(saving||!editingSlide.image)?"not-allowed":"pointer" }}>
            {saving ? "⏳ Saving..." : editingSlide.id ? "💾 Save Slide" : "✅ Add Slide"}
          </button>
          <button onClick={() => setEditingSlide(null)}
            style={{ padding:"13px 18px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", color:"#374151" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:800, color:"#0f172a" }}>🖼️ Hero Slider</div>
          <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>3 to 7 slides • 4 second auto-play</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onReload} disabled={loading}
            style={{ padding:"8px 14px", background:"#fff", color:"#374151", border:"1.5px solid #d1fae5", borderRadius:8, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            {loading ? "⏳" : "🔄 Refresh"}
          </button>
          {sliders.length < 7 && (
            <button onClick={() => setEditingSlide(blankSlide())}
              style={{ padding:"8px 16px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:800, cursor:"pointer" }}>
              + Add Slide
            </button>
          )}
        </div>
      </div>

      {sliders.length >= 7 && (
        <div style={{ background:"#fffbeb", border:"1.5px solid #fde68a", borderRadius:8, padding:"10px 14px", marginBottom:12, fontSize:12, color:"#92400e", fontWeight:600 }}>
          ⚠️ Maximum 7 slides reached. Delete one to add more.
        </div>
      )}

      {loading ? (
        <div style={{ background:"#fff", borderRadius:14, border:"1.5px solid #d1fae5", padding:"40px 20px", textAlign:"center", color:"#64748b" }}>
          <div style={{ width:32, height:32, border:"3px solid #d1fae5", borderTop:"3px solid #16a34a", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto 10px" }} />
          Loading sliders...
        </div>
      ) : sliders.length === 0 ? (
        <div style={{ background:"#fff", borderRadius:14, border:"2px dashed #d1fae5", padding:"48px 20px", textAlign:"center" }}>
          <div style={{ fontSize:44, marginBottom:12 }}>🖼️</div>
          <div style={{ fontSize:15, fontWeight:700, color:"#0f172a", marginBottom:6 }}>No slides yet</div>
          <div style={{ fontSize:13, color:"#64748b", marginBottom:18 }}>Add 3–7 slides to show on your homepage</div>
          <button onClick={() => setEditingSlide(blankSlide())}
            style={{ padding:"10px 24px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>
            + Add First Slide
          </button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {sliders.map((s, idx) => (
            <div key={s.id} style={{ background:"#fff", border:"1.5px solid #d1fae5", borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
              {/* Thumb */}
              <div style={{ width:80, height:50, flexShrink:0, borderRadius:8, overflow:"hidden", background:"#f0fdf4", border:"1px solid #d1fae5" }}>
                {s.image
                  ? <img src={s.image} alt={`Slide ${idx+1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🖼️</div>}
              </div>
              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  Slide {idx+1}{s.title ? `: ${s.title}` : " (No title)"}
                </div>
                {s.subtitle && <div style={{ fontSize:11, color:"#64748b", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.subtitle}</div>}
                <div style={{ display:"flex", gap:6, marginTop:4, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:10, fontWeight:700, color: s.active?"#16a34a":"#94a3b8", background: s.active?"#f0fdf4":"#f8fafc", border:`1px solid ${s.active?"#bbf7d0":"#e2e8f0"}`, borderRadius:20, padding:"2px 8px" }}>
                    {s.active ? "● Active" : "○ Hidden"}
                  </span>
                  {s.link && <span style={{ fontSize:10, color:"#64748b" }}>→ {s.link}</span>}
                </div>
              </div>
              {/* Actions */}
              <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                <button onClick={() => toggleActive(s)}
                  style={{ padding:"6px 10px", background:s.active?"#fef3c7":"#f0fdf4", border:`1.5px solid ${s.active?"#fde68a":"#bbf7d0"}`, borderRadius:7, fontSize:11, fontWeight:700, color:s.active?"#92400e":"#16a34a", cursor:"pointer" }}>
                  {s.active ? "Hide" : "Show"}
                </button>
                <button onClick={() => setEditingSlide({ ...s })}
                  style={{ padding:"6px 10px", background:"#eff6ff", border:"1.5px solid #bfdbfe", borderRadius:7, fontSize:11, fontWeight:700, color:"#2563eb", cursor:"pointer" }}>
                  ✏️
                </button>
                {delSlide===s.id ? (
                  <div style={{ display:"flex", gap:4 }}>
                    <button onClick={() => deleteSlide(s.id)} style={{ padding:"6px 9px", background:"#dc2626", border:"none", borderRadius:7, fontSize:11, fontWeight:700, color:"#fff", cursor:"pointer" }}>Yes</button>
                    <button onClick={() => setDelSlide(null)} style={{ padding:"6px 9px", background:"#f1f5f9", border:"1.5px solid #e2e8f0", borderRadius:7, fontSize:11, fontWeight:700, color:"#374151", cursor:"pointer" }}>No</button>
                  </div>
                ) : (
                  <button onClick={() => setDelSlide(s.id)} style={{ padding:"6px 9px", background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:7, fontSize:11, fontWeight:700, color:"#dc2626", cursor:"pointer" }}>🗑️</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
