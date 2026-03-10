"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function getNumericPrice(price: string) {
  return Number(price.replace("Rs.", "").replace(",", "").trim());
}

export default function CheckoutPage() {
  const { cartItems, cartCount } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + getNumericPrice(item.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  const deliveryFee = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  const WHATSAPP_NUMBER = "923150220243";

  function handleWhatsAppOrder(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName || !phone || !address || !city) {
      alert("Please fill all required fields.");
      return;
    }

    const itemsText = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} - ${item.price} x ${item.quantity}`
      )
      .join("\n");

    const message = `Assalam o Alaikum, new order for zeko.pk

Customer Details:
Name: ${fullName}
Phone: ${phone}
Email: ${email || "Not provided"}
City: ${city}
Address: ${address}
Notes: ${notes || "No notes"}

Order Items:
${itemsText}

Order Summary:
Total Items: ${cartCount}
Subtotal: Rs. ${subtotal}
Delivery Fee: Rs. ${deliveryFee}
Total: Rs. ${total}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            zeko.pk Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Complete Your Order
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Enter your delivery details and send your order directly on WhatsApp.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <form
              onSubmit={handleWhatsAppOrder}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="text-2xl font-bold">Customer Details</h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    placeholder="03XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                    placeholder="Enter your city"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="House number, street, area, city"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Order Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px] w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Any special instructions for your order"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"
              >
                Send Order on WhatsApp
              </button>
            </form>

            <div className="h-fit rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4"
                  >
                    <p className="text-sm font-medium text-blue-600">
                      {item.category}
                    </p>
                    <h3 className="mt-1 font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-3 text-sm text-gray-600">
                      <span>Qty: {item.quantity}</span>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Total Items</span>
                  <span>{cartCount}</span>
                </div>

                <div className="flex items-center justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee}</span>
                </div>

                <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>
              </div>

              <Link
                href="/cart"
                className="mt-6 block w-full rounded-2xl border border-gray-300 px-5 py-3 text-center font-semibold text-gray-800 hover:bg-gray-100"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-3 text-gray-600">
              Add products to your cart before going to checkout.
            </p>
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