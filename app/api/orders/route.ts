import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Prefer": "return=representation",
};

// GET — sare orders fetch karo (admin ke liye)
export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`,
      { headers }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST — naya order save karo (checkout ke liye)
export async function POST(req: NextRequest) {
  try {
    const order = await req.json();
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      { method: "POST", headers, body: JSON.stringify(order) }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
