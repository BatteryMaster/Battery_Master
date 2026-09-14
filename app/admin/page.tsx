"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { allProducts as SEED } from "@/data/products";

// ─── Types ───────────────────────────────────────
type P = { id:number; name:string; category:string; price:string; stock:string; description:string; image:string; badge:string; originalPrice:string; };
type Slide = { id:number; image:string; title:string; subtitle:string; link:string; sort_order:number; active:boolean; };
type Settings = Record<string,string>;
type Tab = "products"|"sliders"|"categories"|"settings";

// ─── Helpers ─────────────────────────────────────
const rowToP = (r: Record<string,unknown>): P => ({
  id:Number(r.id), name:String(r.name??""), category:String(r.category??""),
  price:String(r.price??""), stock:String(r.stock??"In Stock"),
  description:String(r.description??""), image:String(r.image??""),
  badge:String(r.badge??"none"), originalPrice:String(r.original_price??""),
});
const pToRow = (p:P) => ({
  name:p.name, category:p.category, price:p.price, stock:p.stock,
  description:p.description, image:p.image,
  badge:p.badge==="none"?null:p.badge, original_price:p.originalPrice||null,
});
const blankP = ():P => ({id:0,name:"",category:"JK BMS",price:"",stock:"In Stock",description:"",image:"",badge:"none",originalPrice:""});
const blankSlide = () => ({image:"",title:"",subtitle:"",link:"",sort_order:0,active:true});
const fmtPrice = (raw:string) => { const n=raw.replace(/[^0-9]/g,""); return n?"Rs. "+Number(n).toLocaleString("en-PK"):""; };
const toB64 = (file:File):Promise<string> => new Promise((res,rej) => {
  if(file.size>5*1024*1024){rej(new Error("Max 5MB"));return;}
  const r=new FileReader(); r.onload=()=>res(r.result as string); r.onerror=()=>rej(r.error); r.readAsDataURL(file);
});

const DEFAULT_CATS = ["JK BMS","Lithium Battery Packed","Battery Box","Lithium Ion Cell","LiFePO4 Cell","LCD Display","EVE Bike Kits","Chargers","EVE Bike Display","Meter Tools"];
const BADGES = ["none","hot","new","sale"];
const STOCKS = ["In Stock","Limited","Out of Stock"];
const DEFAULT_PASS = "usman123";

// ─── MAIN ────────────────────────────────────────
export default function AdminPage() {
  const [auth, setAuth]     = useState(false);
  const [pw, setPw]         = useState("");
  const [pwErr, setPwErr]   = useState(false);
  const [tab, setTab]       = useState<Tab>("products");
  const [toast, setToast]   = useState("");
  const [toastErr, setTE]   = useState(false);

  // Products
  const [products, setProducts] = useState<P[]>([]);
  const [pLoading, setPL]       = useState(false);
  const [pTab, setPTab]         = useState<"list"|"edit"|"add">("list");
  const [editing, setEditing]   = useState<P|null>(null);
  const [pSearch, setPSearch]   = useState("");
  const [pCat, setPCat]         = useState("All");
  const [delP, setDelP]         = useState<number|null>(null);

  // Sliders
  const [sliders, setSliders] = useState<Slide[]>([]);
  const [sLoading, setSL]     = useState(false);
  const [sEditing, setSE]     = useState<Partial<Slide>|null>(null);
  const [delS, setDelS]       = useState<number|null>(null);

  // Categories
  const [cats, setCats]       = useState<string[]>(DEFAULT_CATS);
  const [newCat, setNewCat]   = useState("");
  const [editCat, setEditCat] = useState<{i:number;v:string}|null>(null);

  // Settings
  const [settings, setSettings] = useState<Settings>({
    site_name:"Battery Master", site_tagline:"Saddar · Karachi",
    phone:"03329891510", whatsapp:"923329891510",
    email:"batterymasterofficial78@outlook.com",
    address:"Shop No 78, Cooperative Electronics Market, Saddar, Karachi",
    about:"Battery Master is Karachi's trusted battery and EV parts store.",
    logo:"", admin_password:DEFAULT_PASS,
  });
  const [sSaving, setSSaving] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setCP]  = useState("");
  const logoRef               = useRef<HTMLInputElement>(null);

  const showToast = (msg:string, err=false) => { setToast(msg); setTE(err); setTimeout(()=>setToast(""),3000); };

  // ─── Load products ───
  const loadProducts = useCallback(async () => {
    setPL(true);
    const { data } = await supabase.from("products").select("*").order("id",{ascending:false});
    if (data) setProducts(data.map(rowToP));
    setPL(false);
  }, []);

  // ─── Load sliders ───
  const loadSliders = useCallback(async () => {
    setSL(true);
    const { data } = await supabase.from("sliders").select("*").order("sort_order",{ascending:true});
    if (data) setSliders(data as Slide[]);
    setSL(false);
  }, []);

  // ─── Load settings ───
  const loadSettings = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("key,value");
    if (data && data.length > 0) {
      const obj: Settings = { ...settings };
      data.forEach(r => { obj[r.key] = r.value; });
      setSettings(obj);
      // Load categories from settings if saved
      const { data: catData } = await supabase.from("site_settings").select("value").eq("key","categories").single();
      if (catData) { try { setCats(JSON.parse(catData.value)); } catch {} }
    }
  }, []);

  // ─── Seed + init ───
  useEffect(() => {
    if (sessionStorage.getItem("bm_admin") !== "1") return;
    setAuth(true);
    (async () => {
      // Seed products if empty
      const { count } = await supabase.from("products").select("*",{count:"exact",head:true});
      if ((count??0) === 0) {
        await supabase.from("products").insert(SEED.map(p => ({
          name:p.name, category:p.category, price:p.price, stock:p.stock,
          description:p.description, image:p.image, badge:p.badge||null, original_price:p.originalPrice||null,
        })));
      }
      await Promise.all([loadProducts(), loadSliders(), loadSettings()]);
    })();
  }, [loadProducts, loadSliders, loadSettings]);

  // ─── Login ───
  const login = async () => {
    // Check password from Supabase settings first, fallback to DEFAULT_PASS
    const { data } = await supabase.from("site_settings").select("value").eq("key","admin_password").single();
    const correctPw = data?.value ?? DEFAULT_PASS;
    if (pw === correctPw) {
      setAuth(true);
      sessionStorage.setItem("bm_admin","1");
      const { count } = await supabase.from("products").select("*",{count:"exact",head:true});
      if ((count??0) === 0) {
        await supabase.from("products").insert(SEED.map(p => ({
          name:p.name, category:p.category, price:p.price, stock:p.stock,
          description:p.description, image:p.image, badge:p.badge||null, original_price:p.originalPrice||null,
        })));
      }
      await Promise.all([loadProducts(), loadSliders(), loadSettings()]);
    } else { setPwErr(true); setTimeout(()=>setPwErr(false),2000); }
  };

  // ─── Product CRUD ───
  const saveProduct = async (p:P) => {
    if (!p.name.trim()||!p.price.trim()) { showToast("❌ Name and price required",true); return; }
    setPL(true);
    if (pTab==="add") {
      const { error } = await supabase.from("products").insert([pToRow(p)]);
      if (error) { showToast("❌ "+error.message,true); setPL(false); return; }
      showToast("✅ Product added!");
    } else {
      const { error } = await supabase.from("products").update(pToRow(p)).eq("id",p.id);
      if (error) { showToast("❌ "+error.message,true); setPL(false); return; }
      showToast("✅ Saved!");
    }
    await loadProducts();
    setPTab("list"); setEditing(null);
  };
  const deleteProduct = async (id:number) => {
    await supabase.from("products").delete().eq("id",id);
    setProducts(prev=>prev.filter(x=>x.id!==id));
    showToast("🗑️ Deleted"); setDelP(null);
  };

  // ─── Slider CRUD ───
  const saveSlide = async () => {
    if (!sEditing?.image) { showToast("❌ Image required",true); return; }
    setSL(true);
    const row = { image:sEditing.image, title:sEditing.title??"", subtitle:sEditing.subtitle??"", link:sEditing.link??"", sort_order:sEditing.sort_order??0, active:sEditing.active??true };
    if (sEditing.id) await supabase.from("sliders").update(row).eq("id",sEditing.id);
    else             await supabase.from("sliders").insert([row]);
    showToast("✅ Slide saved!"); await loadSliders(); setSE(null);
  };
  const deleteSlide = async (id:number) => {
    await supabase.from("sliders").delete().eq("id",id);
    setSliders(prev=>prev.filter(s=>s.id!==id));
    showToast("🗑️ Slide deleted"); setDelS(null);
  };
  const toggleSlide = async (s:Slide) => {
    await supabase.from("sliders").update({active:!s.active}).eq("id",s.id);
    await loadSliders();
  };

  // ─── Categories CRUD ───
  const saveCats = async (newList:string[]) => {
    setCats(newList);
    await supabase.from("site_settings").upsert({key:"categories",value:JSON.stringify(newList),updated_at:new Date().toISOString()},{onConflict:"key"});
    showToast("✅ Categories saved!");
  };

  // ─── Settings save ───
  const saveSettings = async () => {
    setSSaving(true);
    const rows = Object.entries(settings).map(([key,value]) => ({key,value,updated_at:new Date().toISOString()}));
    const { error } = await supabase.from("site_settings").upsert(rows,{onConflict:"key"});
    if (error) showToast("❌ "+error.message,true);
    else showToast("✅ Settings saved! Reload website to see changes.");
    setSSaving(false);
  };

  const changePassword = async () => {
    if (!newPass.trim()) { showToast("❌ Enter new password",true); return; }
    if (newPass !== confirmPass) { showToast("❌ Passwords don't match",true); return; }
    if (newPass.length < 6) { showToast("❌ Min 6 characters",true); return; }
    await supabase.from("site_settings").upsert({key:"admin_password",value:newPass,updated_at:new Date().toISOString()},{onConflict:"key"});
    setSettings(prev=>({...prev,admin_password:newPass}));
    setNewPass(""); setCP("");
    showToast("✅ Password changed!");
  };

  // ─── Image upload helper ───
  const handleImgUpload = async (e:React.ChangeEvent<HTMLInputElement>, onDone:(b64:string)=>void) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const b64 = await toB64(file); onDone(b64); showToast("✅ Image loaded!"); }
    catch { showToast("❌ Max 5MB allowed",true); }
    e.target.value = "";
  };

  // ─── LOGIN SCREEN ───
  if (!auth) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#052e16,#14532d)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#fff",borderRadius:20,padding:"40px 32px",width:"100%",maxWidth:380,boxShadow:"0 24px 60px rgba(0,0,0,0.3)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:48,marginBottom:10}}>🔒</div>
          <h1 style={{fontSize:22,fontWeight:800,color:"#0f172a"}}>Admin Panel</h1>
          <p style={{fontSize:13,color:"#64748b",marginTop:4}}>Battery Master</p>
        </div>
        <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:6}}>Password</label>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Enter password"
          style={{width:"100%",padding:"12px 14px",border:`2px solid ${pwErr?"#dc2626":"#e2e8f0"}`,borderRadius:10,fontSize:15,outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:8}}/>
        {pwErr&&<div style={{fontSize:12,color:"#dc2626",marginBottom:8,fontWeight:600}}>❌ Incorrect password</div>}
        <button onClick={login} style={{width:"100%",padding:"13px",background:"#16a34a",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:800,cursor:"pointer"}}>
          Login →
        </button>
      </div>
    </div>
  );

  const filteredP = products.filter(p=>
    (pCat==="All"||p.category===pCat) &&
    (pSearch===""||p.name.toLowerCase().includes(pSearch.toLowerCase()))
  );

  // ─── MAIN UI ───
  return (
    <div style={{minHeight:"100vh",background:"#f0fdf4"}}>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toastErr?"#dc2626":"#0f172a",color:"#fff",padding:"10px 24px",borderRadius:100,fontSize:13,fontWeight:700,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,0.25)",whiteSpace:"nowrap"}}>{toast}</div>}

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#052e16,#14532d)",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.15)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {settings.logo
              ? <img src={settings.logo} alt="logo" width={34} height={34} style={{objectFit:"contain",borderRadius:6}} />
              : <img src="/logo.png" alt="logo" width={34} height={34} style={{objectFit:"contain"}} />
            }
            <div>
              <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{settings.site_name} — Admin</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.45)"}}>{settings.site_tagline}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <a href="/" style={{padding:"6px 12px",background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:7,fontSize:11,fontWeight:700,color:"#fff",textDecoration:"none"}}>← Site</a>
            <button onClick={()=>{sessionStorage.removeItem("bm_admin");setAuth(false);setPw("");}}
              style={{padding:"6px 12px",background:"rgba(239,68,68,0.18)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:7,fontSize:11,fontWeight:700,color:"#fca5a5",cursor:"pointer"}}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,0.07)",maxWidth:900,margin:"0 auto"}}>
          {[{n:products.length,l:"Products"},{n:sliders.length,l:"Slides"},{n:cats.length,l:"Categories"},{n:products.filter(x=>x.stock==="In Stock").length,l:"In Stock"}].map(s=>(
            <div key={s.l} style={{flex:1,textAlign:"center",padding:"8px 4px"}}>
              <div style={{fontSize:16,fontWeight:900,color:"#4ade80"}}>{s.n}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:".06em"}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tab nav */}
        <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,0.07)",maxWidth:900,margin:"0 auto"}}>
          {([["products","📦 Products"],["sliders","🖼️ Sliders"],["categories","🏷️ Categories"],["settings","⚙️ Settings"]] as [Tab,string][]).map(([t,l])=>(
            <button key={t} onClick={()=>{setTab(t);if(t==="sliders")loadSliders();if(t==="settings")loadSettings();}}
              style={{flex:1,padding:"10px 6px",background:tab===t?"rgba(255,255,255,0.12)":"transparent",border:"none",borderBottom:tab===t?"2px solid #4ade80":"2px solid transparent",color:tab===t?"#fff":"rgba(255,255,255,0.5)",fontSize:"clamp(10px,1.5vw,12px)",fontWeight:700,cursor:"pointer",transition:"all .2s"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"16px 14px 80px"}}>

        {/* ═══ PRODUCTS TAB ═══ */}
        {tab==="products" && (
          <>
            {(pTab==="edit"||pTab==="add") && editing ? (
              <ProductForm
                initial={editing} isAdd={pTab==="add"}
                cats={cats} loading={pLoading}
                onSave={saveProduct}
                onCancel={()=>{setPTab("list");setEditing(null);}}
                onImgUpload={handleImgUpload}
              />
            ) : (
              <>
                <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
                  <input value={pSearch} onChange={e=>setPSearch(e.target.value)} placeholder="🔍 Search..."
                    style={{flex:1,minWidth:120,padding:"10px 14px",border:"1.5px solid #d1fae5",borderRadius:10,fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",boxSizing:"border-box"}}/>
                  <button onClick={()=>{setEditing(blankP());setPTab("add");}}
                    style={{padding:"10px 16px",background:"#16a34a",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap"}}>
                    + Add Product
                  </button>
                  <button onClick={loadProducts} disabled={pLoading}
                    style={{padding:"10px 12px",background:"#fff",color:"#64748b",border:"1.5px solid #d1fae5",borderRadius:10,fontSize:12,cursor:"pointer"}}>
                    {pLoading?"⏳":"🔄"}
                  </button>
                </div>
                <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:10,marginBottom:10,msOverflowStyle:"none",scrollbarWidth:"none"}}>
                  {["All",...cats].map(c=>(
                    <button key={c} onClick={()=>setPCat(c)}
                      style={{flexShrink:0,padding:"6px 14px",borderRadius:20,border:pCat===c?"2px solid #16a34a":"1.5px solid #d1fae5",background:pCat===c?"#16a34a":"#fff",color:pCat===c?"#fff":"#374151",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                      {c}
                    </button>
                  ))}
                </div>
                <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>
                  <strong style={{color:"#0f172a"}}>{filteredP.length}</strong> products
                </div>
                {pLoading&&products.length===0 ? (
                  <Loading />
                ) : filteredP.length===0 ? (
                  <Empty text="No products found" />
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {filteredP.map(p=>(
                      <div key={p.id} style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:52,height:52,flexShrink:0,borderRadius:10,background:"#f0fdf4",border:"1px solid #d1fae5",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {p.image?<img src={p.image} alt={p.name} style={{width:"100%",height:"100%",objectFit:"contain",padding:3}}/>:<span style={{fontSize:18}}>🔋</span>}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2,flexWrap:"wrap"}}>
                            <span style={{fontSize:13,fontWeight:700,color:"#0f172a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"calc(100% - 50px)"}}>{p.name}</span>
                            {p.badge&&p.badge!=="none"&&<span style={{fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:4,background:p.badge==="hot"?"#f97316":p.badge==="new"?"#16a34a":"#dc2626",color:"#fff",textTransform:"uppercase"}}>{p.badge}</span>}
                          </div>
                          <div style={{fontSize:11,color:"#64748b",marginBottom:2}}>{p.category}</div>
                          <div style={{display:"flex",gap:8}}>
                            <span style={{fontSize:13,fontWeight:800,color:"#16a34a"}}>{p.price}</span>
                            <span style={{fontSize:10,fontWeight:600,color:p.stock==="Out of Stock"?"#dc2626":p.stock==="Limited"?"#d97706":"#16a34a"}}>● {p.stock}</span>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:6,flexShrink:0}}>
                          <button onClick={()=>{setEditing({...p});setPTab("edit");}}
                            style={{padding:"7px 10px",background:"#eff6ff",border:"1.5px solid #bfdbfe",borderRadius:8,fontSize:12,fontWeight:700,color:"#2563eb",cursor:"pointer"}}>✏️</button>
                          {delP===p.id?(
                            <div style={{display:"flex",gap:4}}>
                              <button onClick={()=>deleteProduct(p.id)} style={{padding:"7px 9px",background:"#dc2626",border:"none",borderRadius:8,fontSize:11,fontWeight:700,color:"#fff",cursor:"pointer"}}>Yes</button>
                              <button onClick={()=>setDelP(null)} style={{padding:"7px 9px",background:"#f1f5f9",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:11,fontWeight:700,color:"#374151",cursor:"pointer"}}>No</button>
                            </div>
                          ):(
                            <button onClick={()=>setDelP(p.id)} style={{padding:"7px 9px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:8,fontSize:12,fontWeight:700,color:"#dc2626",cursor:"pointer"}}>🗑️</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ═══ SLIDERS TAB ═══ */}
        {tab==="sliders" && (
          <>
            {sEditing ? (
              <SlideForm
                initial={sEditing} loading={sLoading}
                onSave={saveSlide}
                onCancel={()=>setSE(null)}
                onChange={setSE}
                onImgUpload={handleImgUpload}
              />
            ) : (
              <>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
                  <div>
                    <div style={{fontSize:15,fontWeight:800,color:"#0f172a"}}>🖼️ Hero Slider</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>3 to 7 slides • 5 second auto-play</div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={loadSliders} style={{padding:"8px 12px",background:"#fff",border:"1.5px solid #d1fae5",borderRadius:8,fontSize:12,cursor:"pointer"}}>{sLoading?"⏳":"🔄"}</button>
                    {sliders.length<7&&<button onClick={()=>setSE(blankSlide())} style={{padding:"8px 16px",background:"#16a34a",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:800,cursor:"pointer"}}>+ Add Slide</button>}
                  </div>
                </div>
                {sliders.length>=7&&<div style={{background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#92400e",fontWeight:600}}>⚠️ Max 7 slides. Delete one to add more.</div>}
                {sLoading&&sliders.length===0?<Loading/>:sliders.length===0?(
                  <div style={{background:"#fff",borderRadius:14,border:"2px dashed #d1fae5",padding:"48px 20px",textAlign:"center"}}>
                    <div style={{fontSize:44,marginBottom:12}}>🖼️</div>
                    <div style={{fontSize:14,fontWeight:700,color:"#0f172a",marginBottom:6}}>No slides yet</div>
                    <div style={{fontSize:13,color:"#64748b",marginBottom:18}}>Add 3–7 slides for your homepage</div>
                    <button onClick={()=>setSE(blankSlide())} style={{padding:"10px 24px",background:"#16a34a",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Add First Slide</button>
                  </div>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {sliders.map((s,i)=>(
                      <div key={s.id} style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:80,height:50,flexShrink:0,borderRadius:8,overflow:"hidden",background:"#f0fdf4"}}>
                          {s.image?<img src={s.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🖼️</div>}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#0f172a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Slide {i+1}{s.title?`: ${s.title}`:""}</div>
                          <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}>
                            <span style={{fontSize:10,fontWeight:700,color:s.active?"#16a34a":"#94a3b8",background:s.active?"#f0fdf4":"#f8fafc",border:`1px solid ${s.active?"#bbf7d0":"#e2e8f0"}`,borderRadius:20,padding:"2px 8px"}}>{s.active?"● Active":"○ Hidden"}</span>
                            {s.link&&<span style={{fontSize:10,color:"#64748b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:120}}>→ {s.link}</span>}
                          </div>
                        </div>
                        <div style={{display:"flex",gap:6,flexShrink:0}}>
                          <button onClick={()=>toggleSlide(s)} style={{padding:"6px 10px",background:s.active?"#fef3c7":"#f0fdf4",border:`1.5px solid ${s.active?"#fde68a":"#bbf7d0"}`,borderRadius:7,fontSize:11,fontWeight:700,color:s.active?"#92400e":"#16a34a",cursor:"pointer"}}>{s.active?"Hide":"Show"}</button>
                          <button onClick={()=>setSE({...s})} style={{padding:"6px 9px",background:"#eff6ff",border:"1.5px solid #bfdbfe",borderRadius:7,fontSize:11,fontWeight:700,color:"#2563eb",cursor:"pointer"}}>✏️</button>
                          {delS===s.id?(
                            <div style={{display:"flex",gap:4}}>
                              <button onClick={()=>deleteSlide(s.id)} style={{padding:"6px 8px",background:"#dc2626",border:"none",borderRadius:7,fontSize:11,fontWeight:700,color:"#fff",cursor:"pointer"}}>Yes</button>
                              <button onClick={()=>setDelS(null)} style={{padding:"6px 8px",background:"#f1f5f9",border:"1.5px solid #e2e8f0",borderRadius:7,fontSize:11,fontWeight:700,color:"#374151",cursor:"pointer"}}>No</button>
                            </div>
                          ):(
                            <button onClick={()=>setDelS(s.id)} style={{padding:"6px 8px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:7,fontSize:11,fontWeight:700,color:"#dc2626",cursor:"pointer"}}>🗑️</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ═══ CATEGORIES TAB ═══ */}
        {tab==="categories" && (
          <div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:15,fontWeight:800,color:"#0f172a",marginBottom:4}}>🏷️ Manage Categories</div>
              <div style={{fontSize:12,color:"#64748b"}}>Add, edit or delete product categories. Changes apply to product forms and filters.</div>
            </div>

            {/* Add new category */}
            <div style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:14,padding:16,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:10}}>Add New Category</div>
              <div style={{display:"flex",gap:10}}>
                <input value={newCat} onChange={e=>setNewCat(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&newCat.trim()&&!cats.includes(newCat.trim())){saveCats([...cats,newCat.trim()]);setNewCat("");}}}
                  placeholder="Category name e.g. Solar Panels"
                  style={{flex:1,padding:"10px 13px",border:"1.5px solid #d1fae5",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                <button
                  onClick={()=>{if(newCat.trim()&&!cats.includes(newCat.trim())){saveCats([...cats,newCat.trim()]);setNewCat("");}}}
                  disabled={!newCat.trim()||cats.includes(newCat.trim())}
                  style={{padding:"10px 18px",background:(!newCat.trim()||cats.includes(newCat.trim()))?"#d1fae5":"#16a34a",color:"#fff",border:"none",borderRadius:9,fontSize:13,fontWeight:800,cursor:(!newCat.trim()||cats.includes(newCat.trim()))?"not-allowed":"pointer",whiteSpace:"nowrap"}}>
                  + Add
                </button>
              </div>
            </div>

            {/* Category list */}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {cats.map((cat,i)=>(
                <div key={i} style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"#f0fdf4",border:"1px solid #bbf7d0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#16a34a",flexShrink:0}}>{i+1}</div>
                  {editCat?.i===i ? (
                    <>
                      <input value={editCat.v} onChange={e=>setEditCat({i,v:e.target.value})}
                        style={{flex:1,padding:"7px 11px",border:"1.5px solid #16a34a",borderRadius:8,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
                      <button onClick={()=>{if(editCat.v.trim()){const nl=[...cats];nl[i]=editCat.v.trim();saveCats(nl);}setEditCat(null);}}
                        style={{padding:"6px 12px",background:"#16a34a",color:"#fff",border:"none",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer"}}>Save</button>
                      <button onClick={()=>setEditCat(null)}
                        style={{padding:"6px 10px",background:"#f1f5f9",border:"1.5px solid #e2e8f0",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer",color:"#374151"}}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span style={{flex:1,fontSize:14,fontWeight:600,color:"#0f172a"}}>{cat}</span>
                      <button onClick={()=>setEditCat({i,v:cat})}
                        style={{padding:"6px 10px",background:"#eff6ff",border:"1.5px solid #bfdbfe",borderRadius:7,fontSize:11,fontWeight:700,color:"#2563eb",cursor:"pointer"}}>✏️ Edit</button>
                      <button onClick={()=>{if(confirm(`Delete "${cat}"?`)){saveCats(cats.filter((_,j)=>j!==i));}}}
                        style={{padding:"6px 9px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:7,fontSize:11,fontWeight:700,color:"#dc2626",cursor:"pointer"}}>🗑️</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ SETTINGS TAB ═══ */}
        {tab==="settings" && (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{fontSize:15,fontWeight:800,color:"#0f172a"}}>⚙️ Site Settings</div>
            <div style={{fontSize:12,color:"#64748b",marginTop:-10}}>Changes will reflect across the entire website after saving and reloading.</div>

            {/* Logo */}
            <div style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:14,padding:18}}>
              <div style={{fontSize:13,fontWeight:800,color:"#0f172a",marginBottom:12}}>🖼️ Logo</div>
              <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                <div style={{width:80,height:80,borderRadius:12,background:"#f0fdf4",border:"1.5px solid #d1fae5",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <img src={settings.logo||"/logo.png"} alt="logo" style={{width:"100%",height:"100%",objectFit:"contain",padding:8}}/>
                </div>
                <div style={{flex:1}}>
                  <button onClick={()=>logoRef.current?.click()}
                    style={{padding:"9px 18px",background:"#16a34a",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:8,display:"block"}}>
                    📷 Upload New Logo
                  </button>
                  <div style={{fontSize:11,color:"#64748b"}}>Recommended: square image, any format. This logo will show in header, footer, tab icon area and admin panel.</div>
                  <input ref={logoRef} type="file" accept="image/*" style={{display:"none"}}
                    onChange={e=>handleImgUpload(e,b64=>setSettings(prev=>({...prev,logo:b64})))}/>
                </div>
              </div>
            </div>

            {/* Store info */}
            <div style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:14,padding:18}}>
              <div style={{fontSize:13,fontWeight:800,color:"#0f172a",marginBottom:14}}>🏪 Store Information</div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[
                  {k:"site_name",   l:"Store Name",   ph:"Battery Master"},
                  {k:"site_tagline",l:"Tagline",       ph:"Saddar · Karachi"},
                  {k:"phone",       l:"Phone Number",  ph:"03329891510"},
                  {k:"whatsapp",    l:"WhatsApp (with country code)",ph:"923329891510"},
                  {k:"email",       l:"Email Address", ph:"your@email.com"},
                  {k:"address",     l:"Address",       ph:"Shop No, Market, City"},
                ].map(f=>(
                  <div key={f.k}>
                    <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>{f.l}</label>
                    <input value={settings[f.k]??""} onChange={e=>setSettings(prev=>({...prev,[f.k]:e.target.value}))}
                      placeholder={f.ph}
                      style={{width:"100%",padding:"10px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                  </div>
                ))}
                <div>
                  <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>About Us</label>
                  <textarea value={settings.about??""} onChange={e=>setSettings(prev=>({...prev,about:e.target.value}))}
                    rows={4} placeholder="About your store..."
                    style={{width:"100%",padding:"10px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
                </div>
              </div>
            </div>

            {/* Save button */}
            <button onClick={saveSettings} disabled={sSaving}
              style={{padding:"14px",background:sSaving?"#d1fae5":"#16a34a",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:800,cursor:sSaving?"not-allowed":"pointer"}}>
              {sSaving?"⏳ Saving...":"💾 Save All Settings"}
            </button>

            {/* Password change */}
            <div style={{background:"#fff",border:"1.5px solid #d1fae5",borderRadius:14,padding:18}}>
              <div style={{fontSize:13,fontWeight:800,color:"#0f172a",marginBottom:14}}>🔒 Change Admin Password</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div>
                  <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>New Password</label>
                  <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="Min 6 characters"
                    style={{width:"100%",padding:"10px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Confirm Password</label>
                  <input type="password" value={confirmPass} onChange={e=>setCP(e.target.value)} placeholder="Same as above"
                    style={{width:"100%",padding:"10px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                </div>
                <button onClick={changePassword} disabled={!newPass||!confirmPass}
                  style={{padding:"11px",background:(!newPass||!confirmPass)?"#d1fae5":"#f97316",color:"#fff",border:"none",borderRadius:9,fontSize:14,fontWeight:800,cursor:(!newPass||!confirmPass)?"not-allowed":"pointer"}}>
                  🔒 Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────

function Loading() {
  return (
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #d1fae5",padding:"40px 20px",textAlign:"center"}}>
      <div style={{width:32,height:32,border:"3px solid #d1fae5",borderTop:"3px solid #16a34a",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 10px"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{fontSize:13,color:"#64748b"}}>Loading...</div>
    </div>
  );
}

function Empty({text}:{text:string}) {
  return (
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #d1fae5",padding:"40px 20px",textAlign:"center",color:"#94a3b8"}}>
      <div style={{fontSize:32,marginBottom:10}}>📦</div>
      <div style={{fontSize:14,fontWeight:600,color:"#374151"}}>{text}</div>
    </div>
  );
}

type PFormProps = { initial:P; isAdd:boolean; cats:string[]; loading:boolean; onSave:(p:P)=>void; onCancel:()=>void; onImgUpload:(e:React.ChangeEvent<HTMLInputElement>,cb:(b64:string)=>void)=>void; };

function ProductForm({initial,isAdd,cats,loading,onSave,onCancel,onImgUpload}:PFormProps) {
  const [p,setP] = useState<P>(initial);
  const fRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{background:"#fff",borderRadius:16,border:"1.5px solid #d1fae5",overflow:"hidden"}}>
      <div style={{background:"linear-gradient(135deg,#052e16,#14532d)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onCancel} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,width:34,height:34,color:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>{isAdd?"Add New Product":"Edit Product"}</div>
      </div>
      <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
        {/* Image */}
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:8}}>Product Image <span style={{fontSize:10,color:"#94a3b8",fontWeight:500}}>Any format — JPG, PNG, WebP, AVIF, HEIC</span></label>
          <div onClick={()=>fRef.current?.click()} style={{border:"2px dashed #d1fae5",borderRadius:12,minHeight:110,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer",background:"#f0fdf4",padding:14,overflow:"hidden"}}>
            {p.image?<img src={p.image} alt="preview" style={{maxHeight:130,maxWidth:"100%",objectFit:"contain",borderRadius:8}}/>:<><div style={{fontSize:32}}>📷</div><div style={{fontSize:13,fontWeight:600,color:"#374151"}}>Tap to upload</div></>}
          </div>
          <input ref={fRef} type="file" accept="image/*,.heic,.heif,.avif" style={{display:"none"}} onChange={e=>onImgUpload(e,b64=>setP(prev=>({...prev,image:b64})))}/>
          <input value={p.image.startsWith("data:")?"":p.image} onChange={e=>setP(prev=>({...prev,image:e.target.value}))} placeholder="Or paste URL"
            style={{width:"100%",marginTop:8,padding:"9px 12px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:12,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          {p.image&&<button onClick={()=>setP(prev=>({...prev,image:""}))} style={{marginTop:6,padding:"5px 12px",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:6,color:"#dc2626",fontSize:11,fontWeight:700,cursor:"pointer"}}>Remove</button>}
        </div>
        {/* Name */}
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Product Name *</label>
          <input value={p.name} onChange={e=>setP(prev=>({...prev,name:e.target.value}))} placeholder="e.g. JK BMS 4S 100A"
            style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        {/* Cat + Badge */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Category</label>
            <select value={p.category} onChange={e=>setP(prev=>({...prev,category:e.target.value}))}
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",boxSizing:"border-box"}}>
              {cats.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Badge</label>
            <select value={p.badge} onChange={e=>setP(prev=>({...prev,badge:e.target.value}))}
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",boxSizing:"border-box"}}>
              {["none","hot","new","sale"].map(b=><option key={b} value={b}>{b==="none"?"No Badge":b.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
        {/* Price */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Price *</label>
            <input value={p.price.replace(/^Rs\.\s*/,"")} inputMode="numeric" placeholder="4500"
              onChange={e=>setP(prev=>({...prev,price:fmtPrice(e.target.value)}))}
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            {p.price&&<div style={{fontSize:11,color:"#16a34a",marginTop:3,fontWeight:700}}>{p.price}</div>}
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Original Price</label>
            <input value={p.originalPrice.replace(/^Rs\.\s*/,"")} inputMode="numeric" placeholder="optional"
              onChange={e=>setP(prev=>({...prev,originalPrice:fmtPrice(e.target.value)}))}
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            {p.originalPrice&&<div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>{p.originalPrice}</div>}
          </div>
        </div>
        {/* Stock */}
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Stock Status</label>
          <select value={p.stock} onChange={e=>setP(prev=>({...prev,stock:e.target.value}))}
            style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",boxSizing:"border-box"}}>
            {["In Stock","Limited","Out of Stock"].map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {/* Description */}
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Description</label>
          <textarea value={p.description} onChange={e=>setP(prev=>({...prev,description:e.target.value}))}
            rows={4} placeholder="Product specs, features..."
            style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>onSave(p)} disabled={!p.name||!p.price||loading}
            style={{flex:1,padding:"13px",background:(!p.name||!p.price||loading)?"#d1fae5":"#16a34a",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:(!p.name||!p.price||loading)?"not-allowed":"pointer"}}>
            {loading?"⏳ Saving...":isAdd?"✅ Add Product":"💾 Save Changes"}
          </button>
          <button onClick={onCancel} style={{padding:"13px 18px",background:"#f1f5f9",border:"1.5px solid #e2e8f0",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",color:"#374151"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

type SFormProps = { initial:Partial<Slide>; loading:boolean; onSave:()=>void; onCancel:()=>void; onChange:(s:Partial<Slide>)=>void; onImgUpload:(e:React.ChangeEvent<HTMLInputElement>,cb:(b64:string)=>void)=>void; };

function SlideForm({initial,loading,onSave,onCancel,onChange,onImgUpload}:SFormProps) {
  const [s,setS] = useState<Partial<Slide>>(initial);
  const fRef = useRef<HTMLInputElement>(null);
  const update = (patch:Partial<Slide>) => { const ns={...s,...patch}; setS(ns); onChange(ns); };
  return (
    <div style={{background:"#fff",borderRadius:16,border:"1.5px solid #d1fae5",overflow:"hidden"}}>
      <div style={{background:"linear-gradient(135deg,#052e16,#14532d)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onCancel} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,width:34,height:34,color:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>{s.id?"Edit Slide":"Add New Slide"}</div>
      </div>
      <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:8}}>Slide Image * <span style={{fontSize:10,color:"#94a3b8",fontWeight:500}}>Recommended 1200×500px</span></label>
          <div onClick={()=>fRef.current?.click()} style={{border:"2px dashed #d1fae5",borderRadius:12,minHeight:130,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer",background:"#f0fdf4",padding:14,overflow:"hidden"}}>
            {s.image?<img src={s.image} alt="" style={{maxHeight:150,maxWidth:"100%",objectFit:"contain",borderRadius:8}}/>:<><div style={{fontSize:36}}>🖼️</div><div style={{fontSize:13,fontWeight:600,color:"#374151"}}>Tap to upload slide image</div><div style={{fontSize:11,color:"#94a3b8"}}>Any format • Max 5MB</div></>}
          </div>
          <input ref={fRef} type="file" accept="image/*,.heic,.heif,.avif" style={{display:"none"}} onChange={e=>onImgUpload(e,b64=>update({image:b64}))}/>
          <input value={(s.image||"").startsWith("data:")?"":s.image||""} onChange={e=>update({image:e.target.value})} placeholder="Or paste image URL"
            style={{width:"100%",marginTop:8,padding:"9px 12px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:12,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Title (optional)</label>
          <input value={s.title||""} onChange={e=>update({title:e.target.value})} placeholder="e.g. JK BMS Sale"
            style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        <div>
          <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Subtitle (optional)</label>
          <input value={s.subtitle||""} onChange={e=>update({subtitle:e.target.value})} placeholder="e.g. 4S to 24S • Best price"
            style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Button Link</label>
            <input value={s.link||""} onChange={e=>update({link:e.target.value})} placeholder="/categories/jk-bms"
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#374151",display:"block",marginBottom:5}}>Order</label>
            <input type="number" value={s.sort_order??0} onChange={e=>update({sort_order:Number(e.target.value)})}
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:9,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onSave} disabled={loading||!s.image}
            style={{flex:1,padding:"13px",background:(loading||!s.image)?"#d1fae5":"#16a34a",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:(loading||!s.image)?"not-allowed":"pointer"}}>
            {loading?"⏳ Saving...":s.id?"💾 Save Slide":"✅ Add Slide"}
          </button>
          <button onClick={onCancel} style={{padding:"13px 18px",background:"#f1f5f9",border:"1.5px solid #e2e8f0",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",color:"#374151"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
