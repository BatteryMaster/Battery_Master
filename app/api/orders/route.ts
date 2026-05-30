import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// Service role key use karo — full access
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Prefer": "return=representation",
});

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`,
      { headers: getHeaders(), cache: "no-store" }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("Supabase GET error:", data);
      return NextResponse.json({ error: data }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET failed:", e);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();
    console.log("Saving order:", order.id);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(order),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("Supabase POST error:", data);
      return NextResponse.json({ error: data }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (e) {
    console.error("POST failed:", e);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
