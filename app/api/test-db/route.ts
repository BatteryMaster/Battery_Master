import { NextResponse } from "next/server";

export async function GET() {
  const url    = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  const key    = serviceKey || anonKey;

  if (!url || !key) {
    return NextResponse.json({
      status: "❌ ERROR",
      message: "Environment variables missing!",
      url_set: !!url,
      anon_key_set: !!anonKey,
      service_key_set: !!serviceKey,
    });
  }

  try {
    const res  = await fetch(`${url}/rest/v1/orders?select=id&limit=1`, {
      headers: { "apikey": key, "Authorization": `Bearer ${key}` },
      cache: "no-store",
    });
    const text = await res.text();
    return NextResponse.json({
      status: res.ok ? "✅ SUCCESS" : "❌ ERROR",
      using_key: serviceKey ? "service_role ✅" : "anon_key ⚠️",
      http_status: res.status,
      response: text,
    });
  } catch (e: unknown) {
    return NextResponse.json({ status: "❌ ERROR", error: String(e) });
  }
}
