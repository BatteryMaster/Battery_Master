import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e40af",
};

export const metadata: Metadata = {
  title: {
    default: "Battery Master — JK BMS, LiFePO4 Cells, E-Bike Kits | Karachi Pakistan",
    template: "%s | Battery Master",
  },
  description: "Battery Master — Karachi ka trusted battery store. JK BMS, LiFePO4 cells, lithium battery packs, e-bike kits, chargers, LCD displays & more. Shop No 78, Saddar Karachi.",
  keywords: [
    "JK BMS Pakistan", "LiFePO4 cell Karachi", "lithium battery pack Pakistan",
    "e-bike kit Karachi", "EVE LF280K Pakistan", "CATL cell Pakistan",
    "battery charger Karachi", "18650 cell Pakistan", "silicon wire Karachi",
    "Battery Master Karachi", "EV parts Pakistan", "electric bike battery",
    "BMS Pakistan", "solar battery Karachi", "lithium ion cell Pakistan",
  ],
  authors: [{ name: "Battery Master Karachi" }],
  creator: "Battery Master",
  publisher: "Battery Master",
  category: "Battery & EV Parts Store",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Battery Master",
    title: "Battery Master — JK BMS, LiFePO4 Cells & EV Parts Karachi",
    description: "Karachi ka trusted battery store. JK BMS, LiFePO4 cells, e-bike kits, chargers. Shop No 78, Saddar.",
    images: [{ url: "/logo-512.png", width: 512, height: 512, alt: "Battery Master logo" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body style={{ overflowX: "hidden", maxWidth: "100vw" }}>
        <CartProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
