"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section style={{
      background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 60%)",
      borderBottom: "1px solid var(--border)",
      padding: "64px 20px 72px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            borderRadius: 100,
            padding: "5px 14px",
            fontSize: 12, fontWeight: 600, color: "var(--accent)",
            marginBottom: 28, letterSpacing: "0.06em",
          }}>
            🇵🇰 Pakistan&apos;s Electronics Store
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: 20,
          }}>
            Electronics Parts
            <br />
            <span style={{ color: "var(--accent)" }}>Delivered Fast</span>
            <br />
            Across Pakistan
          </h1>

          <p style={{
            fontSize: 17, color: "var(--text-secondary)",
            lineHeight: 1.7, maxWidth: 520, marginBottom: 36,
          }}>
            Modules, ICs, transistors, resistors, sensors aur tools — sab ek jagah. Students, hobbyists, aur professionals ke liye.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/shop" style={{
              background: "var(--accent)", color: "#000",
              borderRadius: "var(--radius-sm)",
              padding: "13px 28px", fontSize: 15, fontWeight: 700,
              display: "inline-block",
            }}>
              Browse Products →
            </Link>
            <a href="https://wa.me/923150220243" target="_blank" rel="noopener noreferrer" style={{
              background: "var(--bg-card)", color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "13px 28px", fontSize: 15, fontWeight: 600,
              display: "inline-block",
            }}>
              WhatsApp Order
            </a>
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
            {[
              { value: "36+", label: "Products" },
              { value: "1-2 din", label: "Karachi Delivery" },
              { value: "COD", label: "Cash on Delivery" },
              { value: "7 din", label: "Return Policy" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: 22, fontWeight: 700,
                  color: "var(--accent)", fontFamily: "var(--font-mono)",
                }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
