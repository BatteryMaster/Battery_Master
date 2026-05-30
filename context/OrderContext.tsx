"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type OrderItem = {
  id: number; name: string; category: string;
  price: string; quantity: number;
};

export type Order = {
  id: string; created_at: string;
  status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";
  customer: { name: string; phone: string; email: string; city: string; address: string; notes: string; };
  items: OrderItem[];
  subtotal: number; delivery_fee: number; total: number;
  createdAt?: string; deliveryFee?: number;
};

type Ctx = {
  orders: Order[];
  loading: boolean;
  addOrder: (o: Omit<Order, "id" | "created_at" | "status">) => Promise<string>;
  updateStatus: (id: string, s: Order["status"]) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
};

const OC = createContext<Ctx | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshOrders = async () => {
    try {
      setLoading(true);
      const res  = await fetch("/api/orders", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshOrders(); }, []);

  const addOrder = async (o: Omit<Order, "id" | "created_at" | "status">): Promise<string> => {
    const id  = "ORD-" + Date.now();
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...o,
      id,
      created_at: now,
      createdAt: now,
      delivery_fee: o.delivery_fee ?? 0,
      status: "pending",
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("❌ Order save failed:", err);
      } else {
        console.log("✅ Order saved:", id);
        setOrders(prev => [newOrder, ...prev]);
      }
    } catch (e) {
      console.error("❌ Network error saving order:", e);
    }

    return id;
  };

  const updateStatus = async (id: string, status: Order["status"]) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (e) {
      console.error("Failed to delete order:", e);
    }
  };

  return (
    <OC.Provider value={{ orders, loading, addOrder, updateStatus, deleteOrder, refreshOrders }}>
      {children}
    </OC.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OC);
  if (!ctx) throw new Error("useOrders must be inside OrderProvider");
  return ctx;
}
