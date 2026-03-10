import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeko.pk"),
  title: {
    default: "zeko.pk - Electronics Components, Modules, ICs & Tools in Pakistan",
    template: "zeko.pk - %s",
  },
  description:
    "zeko.pk is a fast electronics ecommerce website in Pakistan for modules, ICs, transistors, resistors, sensors, and tools.",
  keywords: [
    "electronics store Pakistan",
    "buy ICs in Pakistan",
    "electronics modules Pakistan",
    "transistors Pakistan",
    "resistors Pakistan",
    "electronics tools Pakistan",
    "zeko.pk",
  ],
  openGraph: {
    title: "zeko.pk - Electronics Components, Modules, ICs & Tools in Pakistan",
    description:
      "Shop modules, ICs, transistors, resistors, sensors, and tools with a fast and professional electronics store in Pakistan.",
    url: "https://zeko.pk",
    siteName: "zeko.pk",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}