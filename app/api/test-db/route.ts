import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({
      status: "❌ ERROR",
      message: "Environment variables missing!",
      url_set: !!url,
      key_set: !!key,
    });
  }

  try {
    const res = await fetch(`${url}/rest/v1/orders?select=id&limit=1`, {
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
      },
    });

    const text = await res.text();

    if (res.ok) {
      return NextResponse.json({
        status: "✅ SUCCESS",
        message: "Supabase connected! Orders table working.",
        http_status: res.status,
        response: text,
      });
    } else {
      return NextResponse.json({
        status: "❌ ERROR",
        message: "Supabase connected but table error",
        http_status: res.status,
        response: text,
      });
    }
  } catch (e: unknown) {
    return NextResponse.json({
      status: "❌ ERROR",
      message: "Connection failed",
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
