import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#1A1A1A", color: "white" }}
    >
      {/* Gold top border */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)" }}
      />

      {/* Marquee strip */}
      <div
        className="overflow-hidden py-3"
        style={{ background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="mx-8 text-xs font-medium tracking-[0.2em] text-[#C9A84C]">
              ✦ QUALITY ELECTRONICS &nbsp;&nbsp; ✦ FAST DELIVERY &nbsp;&nbsp; ✦ TRUSTED STORE &nbsp;&nbsp; ✦ KARACHI PAKISTAN &nbsp;&nbsp; ✦ CASH ON DELIVERY &nbsp;&nbsp; ✦ WHATSAPP SUPPORT
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}>
                <span className="font-display text-lg font-black text-white">Z</span>
              </div>
              <div>
                <h4 className="font-display text-2xl font-black text-white">
                  Zeko
                  <span style={{
                    background: "linear-gradient(135deg, #C9A84C, #E8C97A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>.pk</span>
                </h4>
                <p className="text-[10px] font-medium tracking-[0.15em] text-[#8B7355]">PREMIUM ELECTRONICS</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-7 text-[#9B9490]">
              Pakistan&apos;s trusted electronics store. Quality modules, ICs, transistors,
              resistors, sensors and tools. Based in Saddar, Karachi.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://wa.me/923150220243"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{ background: "#25D366" }}
              >
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Quick Links</h5>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/categories", label: "Categories" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#9B9490] transition hover:text-[#C9A84C]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Categories</h5>
            <ul className="space-y-3">
              {["Modules", "ICs", "Transistors", "Resistors", "Tools"].map((cat) => (
                <li key={cat}>
                  <Link href={`/categories/${cat.toLowerCase()}`} className="text-sm text-[#9B9490] transition hover:text-[#C9A84C]">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h5 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Policies</h5>
            <ul className="space-y-3">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-conditions", label: "Terms & Conditions" },
                { href: "/return-refund-policy", label: "Return Policy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#9B9490] transition hover:text-[#C9A84C]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h5 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Contact</h5>
              <p className="text-sm text-[#9B9490]">0315-0220243</p>
              <p className="mt-1 text-sm text-[#9B9490]">hussamm621@gmail.com</p>
              <p className="mt-1 text-sm text-[#9B9490]">Saddar, Karachi</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row"
          style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
        >
          <p className="text-sm text-[#6B6560]">
            © 2025 zeko.pk — All rights reserved.
          </p>
          <p className="text-xs text-[#6B6560]">
            Made with ✦ in Karachi, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
