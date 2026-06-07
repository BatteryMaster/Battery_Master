"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
type CartItem = { id:number; name:string; category:string; price:string; stock:string; quantity:number; };
type Ctx = { cartItems:CartItem[]; addToCart:(i:Omit<CartItem,"quantity">)=>void; removeFromCart:(id:number)=>void; increaseQuantity:(id:number)=>void; decreaseQuantity:(id:number)=>void; clearCart:()=>void; cartCount:number; };
const CC = createContext<Ctx|undefined>(undefined);
function load():CartItem[]{if(typeof window==="undefined")return[];try{const s=localStorage.getItem("batterymaster-cart");return s?JSON.parse(s):[]}catch{return[];}}
export function CartProvider({children}:{children:React.ReactNode}){
  const [cartItems,setCartItems]=useState<CartItem[]>(load);
  useEffect(()=>{localStorage.setItem("batterymaster-cart",JSON.stringify(cartItems));},[cartItems]);
  const addToCart=(item:Omit<CartItem,"quantity">)=>setCartItems(p=>{const ex=p.find(c=>c.id===item.id);return ex?p.map(c=>c.id===item.id?{...c,quantity:c.quantity+1}:c):[...p,{...item,quantity:1}];});
  const removeFromCart=(id:number)=>setCartItems(p=>p.filter(i=>i.id!==id));
  const increaseQuantity=(id:number)=>setCartItems(p=>p.map(i=>i.id===id?{...i,quantity:i.quantity+1}:i));
  const decreaseQuantity=(id:number)=>setCartItems(p=>p.map(i=>i.id===id?{...i,quantity:Math.max(1,i.quantity-1)}:i));
  const clearCart=()=>setCartItems([]);
  const cartCount=useMemo(()=>cartItems.reduce((t,i)=>t+i.quantity,0),[cartItems]);
  return <CC.Provider value={{cartItems,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart,cartCount}}>{children}</CC.Provider>;
}
export function useCart(){const ctx=useContext(CC);if(!ctx)throw new Error("useCart must be inside CartProvider");return ctx;}
