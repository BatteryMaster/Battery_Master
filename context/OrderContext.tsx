"use client";
import { createContext, useContext, useEffect, useState } from "react";
export type OrderItem={id:number;name:string;category:string;price:string;quantity:number;};
export type Order={id:string;createdAt:string;status:"pending"|"confirmed"|"dispatched"|"delivered"|"cancelled";customer:{name:string;phone:string;email:string;city:string;address:string;notes:string;};items:OrderItem[];subtotal:number;deliveryFee:number;total:number;};
type Ctx={orders:Order[];addOrder:(o:Omit<Order,"id"|"createdAt"|"status">)=>string;updateStatus:(id:string,s:Order["status"])=>void;deleteOrder:(id:string)=>void;};
const OC=createContext<Ctx|undefined>(undefined);
export function OrderProvider({children}:{children:React.ReactNode}){
  const [orders,setOrders]=useState<Order[]>([]);
  useEffect(()=>{try{const r=localStorage.getItem("zeko-orders");if(r)setOrders(JSON.parse(r));}catch{}},[]);
  useEffect(()=>{localStorage.setItem("zeko-orders",JSON.stringify(orders));},[orders]);
  const addOrder=(o:Omit<Order,"id"|"createdAt"|"status">)=>{const id="ORD-"+Date.now();setOrders(p=>[{...o,id,createdAt:new Date().toISOString(),status:"pending"},...p]);return id;};
  const updateStatus=(id:string,status:Order["status"])=>setOrders(p=>p.map(o=>o.id===id?{...o,status}:o));
  const deleteOrder=(id:string)=>setOrders(p=>p.filter(o=>o.id!==id));
  return <OC.Provider value={{orders,addOrder,updateStatus,deleteOrder}}>{children}</OC.Provider>;
}
export function useOrders(){const ctx=useContext(OC);if(!ctx)throw new Error("useOrders must be inside OrderProvider");return ctx;}
