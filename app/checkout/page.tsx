"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function getNumericPrice(price: string) {
  return Number(price.replace("Rs.", "").replace(/,/g, "").trim());
}

type OrderStatus = "form" | "submitting" | "success" | "error";

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("form");
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + getNumericPrice(item.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  const deliveryFee = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name required";
    if (!phone.trim() || phone.length < 10) newErrors.phone = "Valid phone number required";
    if (!address.trim()) newErrors.address = "Address required";
    if (!city.trim()) newErrors.city = "City required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setOrderStatus("submitting");

    // Generate order ID
    const newOrderId = `ZEKO-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);

    // Save order to localStorage (simple database)
    const order = {
      orderId: newOrderId,
      customer: { fullName, phone, email, address, city, notes },
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // Save in localStorage
      const existingOrders = JSON.parse(
        localStorage.getItem("zeko-orders") || "[]"
      );
      existingOrders.push(order);
      localStorage.setItem("zeko-orders", JSON.stringify(existingOrders));

      // Also send WhatsApp notification to owner (background)
      const WHATSAPP_NUMBER = "923150220243";
      const itemsText = cartItems
        .map((item, i) => `${i + 1}. ${item.name} x${item.quantity} = Rs. ${getNumericPrice(item.price) * item.quantity}`)
        .join("\n");

      const message = `🛒 *NEW ORDER – ${newOrderId}*

*Customer:*
Name: ${fullName}
Phone: ${phone}
Email: ${email || "Not provided"}
City: ${city}
Address: ${address}

*Order Items:*
${itemsText}

*Payment:* ${paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}
*Subtotal:* Rs. ${subtotal}
*Delivery:* Rs. ${deliveryFee}
*Total: Rs. ${total}*

${notes ? `Notes: ${notes}` : ""}`;

      // Open WhatsApp silently for owner notification
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");

      // Clear cart
      clearCart();
      setOrderStatus("success");
    } catch {
      setOrderStatus("error");
    }
  }

  // Success screen
  if (orderStatus === "success") {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <Header />
        <WhatsAppButton />
        <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Order Placed!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for your order from zeko.pk
            </p>
            <div className="mt-4 rounded-2xl bg-white p-4">
              <p className="text-sm text-gray-500">Your Order ID</p>
              <p className="mt-1 text-2xl font-black text-blue-600">{orderId}</p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              We will contact you on <strong>{phone}</strong> to confirm your order.
              WhatsApp notification has been sent to our team.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/shop"
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-100"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <WhatsAppButton />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            zeko.pk Checkout
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Complete Your Order</h1>
          <p className="mt-2 text-gray-600">
            Fill in your details below. We will confirm via WhatsApp.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <form onSubmit={handleOrder} className="space-y-6">
              {/* Personal Info */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Customer Details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-blue-600 ${
                        errors.fullName ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Muhammad Ali"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-blue-600 ${
                        errors.phone ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="03XXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-blue-600 ${
                        errors.city ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Karachi"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Full Address *
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`min-h-[100px] w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-blue-600 ${
                      errors.address ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="House no, street, area, city"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px] w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Payment Method</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-blue-600"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive</p>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${
                      paymentMethod === "bank"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="accent-blue-600"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Bank Transfer</p>
                      <p className="text-sm text-gray-500">EasyPaisa / JazzCash</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={orderStatus === "submitting"}
                className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
              >
                {orderStatus === "submitting" ? "Placing Order..." : `Place Order – Rs. ${total}`}
              </button>
            </form>

            {/* Order Summary */}
            <div className="h-fit rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-blue-600">{item.category}</p>
                    <p className="mt-1 font-semibold">{item.name}</p>
                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                      <span>Qty: {item.quantity}</span>
                      <span>Rs. {getNumericPrice(item.price) * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartCount})</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-900">
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>
              </div>
              <Link
                href="/cart"
                className="mt-4 block w-full rounded-2xl border border-gray-300 py-3 text-center font-semibold text-gray-800 hover:bg-gray-100"
              >
                ← Edit Cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-10 text-center">
            <h2 className="text-2xl font-bold">Cart is empty</h2>
            <p className="mt-2 text-gray-600">Add products before checkout.</p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Go to Shop
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
