"use client";

import { useState, useEffect, useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Ahmed Hassan",
    city: "Karachi",
    rating: 5,
    date: "2 days ago",
    text: "Excellent quality products! Arduino Uno worked perfectly for my project. Fast delivery and great packaging. Highly recommend zeko.pk!",
    product: "Arduino Uno R3",
    verified: true,
  },
  {
    id: 2,
    name: "Muhammad Usman",
    city: "Lahore",
    rating: 5,
    date: "1 week ago",
    text: "Best electronics store in Pakistan. Got my components same day from Saddar. Will definitely order again!",
    product: "NE555 Timer IC",
    verified: true,
  },
  {
    id: 3,
    name: "Bilal Raza",
    city: "Islamabad",
    rating: 5,
    date: "2 weeks ago",
    text: "Very professional service. Product quality is top notch. The relay module works flawlessly. Highly satisfied!",
    product: "Relay Module 5V",
    verified: true,
  },
  {
    id: 4,
    name: "Farhan Khan",
    city: "Rawalpindi",
    rating: 5,
    date: "3 weeks ago",
    text: "Amazing store! Fast shipping, genuine parts, and great customer support on WhatsApp. 10/10 experience.",
    product: "Digital Multimeter",
    verified: true,
  },
  {
    id: 5,
    name: "Zain ul Abideen",
    city: "Karachi",
    rating: 5,
    date: "1 month ago",
    text: "Been ordering from zeko.pk for all my electronics projects. Never disappointed. Quality is always consistent.",
    product: "BC547 Transistor",
    verified: true,
  },
  {
    id: 6,
    name: "Hamza Malik",
    city: "Faisalabad",
    rating: 5,
    date: "1 month ago",
    text: "Received exactly what I ordered. Packaging was excellent, products arrived in perfect condition. Great store!",
    product: "Soldering Iron 60W",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="star h-4 w-4"
          style={{ color: star <= rating ? "#C9A84C" : "#E5E7EB" }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CounterStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p
        className="font-display text-4xl font-black sm:text-5xl"
        style={{
          background: "linear-gradient(135deg, #A07830, #C9A84C, #E8C97A)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}{suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-[#6B6560]">{label}</p>
    </div>
  );
}

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-20" style={{ background: "#FDFAF4" }}>
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: "#C9A84C" }}
          >
            ✦ Customer Reviews ✦
          </p>
          <h2 className="font-display text-4xl font-black text-[#1A1A1A] sm:text-5xl">
            What Our Customers Say
          </h2>
          <div
            className="mx-auto mt-4 h-0.5 w-24"
            style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          />

          {/* Overall rating */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="star h-6 w-6" style={{ color: "#C9A84C" }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-display text-2xl font-black text-[#1A1A1A]">5.0</span>
            <span className="text-sm text-[#6B6560]">({reviews.length * 12}+ reviews)</span>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mb-14 grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4"
          style={{
            background: "white",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow: "0 4px 24px rgba(201,168,76,0.1)",
          }}
        >
          <CounterStat value={500} label="Happy Customers" suffix="+" />
          <CounterStat value={100} label="Products Available" suffix="+" />
          <CounterStat value={5} label="Star Rating" suffix="★" />
          <CounterStat value={3} label="Years in Business" suffix="+" />
        </div>

        {/* Reviews Grid – Desktop */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="luxury-card p-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Top */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-black text-white"
                    style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{review.name}</p>
                    <p className="text-xs text-[#6B6560]">{review.city} · {review.date}</p>
                  </div>
                </div>
                {review.verified && (
                  <span
                    className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#A07830" }}
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <StarRating rating={review.rating} />

              <p className="mt-3 text-sm leading-6 text-[#4A4540]">&ldquo;{review.text}&rdquo;</p>

              <div
                className="mt-4 rounded-xl px-3 py-2 text-xs font-medium"
                style={{ background: "#F5F0E8", color: "#A07830" }}
              >
                Purchased: {review.product}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Slider – Mobile */}
        <div className="md:hidden">
          <div className="luxury-card p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-black text-white"
                  style={{ background: "linear-gradient(135deg, #A07830, #C9A84C)" }}
                >
                  {reviews[activeIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">{reviews[activeIndex].name}</p>
                  <p className="text-xs text-[#6B6560]">{reviews[activeIndex].city} · {reviews[activeIndex].date}</p>
                </div>
              </div>
              <span
                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
                style={{ background: "rgba(201,168,76,0.1)", color: "#A07830" }}
              >
                ✓ Verified
              </span>
            </div>
            <StarRating rating={reviews[activeIndex].rating} />
            <p className="mt-3 text-sm leading-6 text-[#4A4540]">&ldquo;{reviews[activeIndex].text}&rdquo;</p>
            <div className="mt-4 flex justify-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "6px",
                    background: i === activeIndex ? "#C9A84C" : "#E5DDD0",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:shadow-lg"
            style={{
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#A07830",
              background: "white",
            }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            See All Google Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
