import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Test: ek dummy order insert karo
  const testOrder = {
    id: "TEST-" + Date.now(),
    created_at: new Date().toISOString(),
    status: "pending",
    customer: { name: "Test User", phone: "03001234567", email: "", city: "Karachi", address: "Test Address", notes: "" },
    items: [{ id: 1, name: "Arduino Uno", category: "Modules", price: "Rs. 1,850", quantity: 1 }],
    subtotal: 1850,
    delivery_fee: 250,
    total: 2100,
  };

  try {
    const res = await fetch(`${url}/rest/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Prefer": "return=representation",
      },
      body: JSON.stringify(testOrder),
    });
    const data = await res.json();
    return NextResponse.json({
      status: res.ok ? "✅ Order saved!" : "❌ Failed",
      http_status: res.status,
      response: data,
    });
  } catch (e) {
    return NextResponse.json({ status: "❌ ERROR", error: String(e) });
  }
}
