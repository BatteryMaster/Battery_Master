"use client";

export default function LocationSection() {
  return (
    <section className="relative py-20" style={{ background: "white" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: "#C9A84C" }}
          >
            ✦ Find Us ✦
          </p>
          <h2 className="font-display text-4xl font-black text-[#1A1A1A] sm:text-5xl">
            Visit Our Store
          </h2>
          <div
            className="mx-auto mt-4 h-0.5 w-24"
            style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          />
          <p className="mt-4 text-[#6B6560]">
            Located in the heart of Karachi&apos;s electronics market
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Left – Info */}
          <div className="flex flex-col gap-5">
            {/* Address Card */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "#FDFAF4",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                >
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-[#1A1A1A]">Address</h3>
              </div>
              <p className="text-[#4A4540] leading-7">
                Shop no G 1 A, National Radio TV Market<br />
                Near Regal Chowk, Saddar<br />
                <strong>Karachi, Pakistan</strong>
              </p>
            </div>

            {/* Contact */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "#FDFAF4",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                  >
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6560]">Phone / WhatsApp</p>
                    <a href="tel:+923150220243" className="font-semibold text-[#1A1A1A] hover:text-[#C9A84C]">
                      0315-0220243
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                  >
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6560]">Email</p>
                    <a href="mailto:hussamm621@gmail.com" className="font-semibold text-[#1A1A1A] hover:text-[#C9A84C]">
                      hussamm621@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "#FDFAF4",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <h3 className="mb-3 font-display text-base font-bold text-[#1A1A1A]">Store Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between">
                    <span className="text-[#6B6560]">{item.day}</span>
                    <span className={`font-semibold ${item.time === "Closed" ? "text-red-500" : "text-[#1A1A1A]"}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directions Button */}
            <a
              href="https://maps.google.com/?q=National+Radio+TV+Market+Saddar+Karachi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl py-4 text-center font-bold text-white transition-all hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
                boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
              }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions on Google Maps
            </a>
          </div>

          {/* Right – Embedded Map */}
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              border: "2px solid rgba(201,168,76,0.3)",
              boxShadow: "0 8px 40px rgba(201,168,76,0.15)",
              minHeight: "450px",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0!2d67.0083!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDAnMjkuOSJF!5e0!3m2!1sen!2spk!4v1620000000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="zeko.pk Store Location – Saddar Karachi"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
