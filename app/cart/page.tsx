"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function getNumericPrice(price: string) {
  return Number(price.replace("Rs.", "").replace(",", "").trim());
}

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const subtotal = cartItems.reduce((total, item) => {
    return total + getNumericPrice(item.price) * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            zeko.pk Cart
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Your Shopping Cart
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Review your selected products before checkout.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">
                        {item.category}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold">{item.name}</h2>
                      <p className="mt-2 text-gray-600">{item.price}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.stock}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-lg border border-gray-300 px-3 py-2 font-semibold"
                      >
                        -
                      </button>

                      <span className="min-w-10 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-lg border border-gray-300 px-3 py-2 font-semibold"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-2xl font-bold">Order Summary</h3>

              <div className="mt-6 flex items-center justify-between text-gray-700">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">Rs. {subtotal}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-3 block w-full rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold text-gray-800 hover:bg-gray-100"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="mt-3 text-gray-600">
              Add some products to your cart to continue.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
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