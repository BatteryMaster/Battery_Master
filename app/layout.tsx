import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a56e8",
};

export const metadata: Metadata = {
  title: {
    default: "zeko.pk — Arduino, Electronics Components & Modules in Pakistan",
    template: "%s | zeko.pk",
  },
  description: "Buy Arduino Uno, Arduino Nano, NodeMCU, sensors, ICs, transistors, resistors & tools in Pakistan. Best prices, fast delivery in Karachi. Cash on Delivery available.",
  keywords: [
    "arduino pakistan", "buy arduino online pakistan", "electronics components karachi",
    "NodeMCU ESP8266 pakistan", "NE555 IC pakistan", "BC547 transistor pakistan",
    "breadboard karachi", "soldering iron pakistan", "electronics shop karachi",
    "zeko.pk", "digital multimeter pakistan", "jumper wires pakistan",
  ],
  authors: [{ name: "zeko.pk", url: "https://zeko.pk" }],
  creator: "zeko.pk",
  publisher: "zeko.pk",
  metadataBase: new URL("https://zeko.pk"),
  alternates: { canonical: "https://zeko.pk" },
  category: "Electronics Store",
  icons: {
    icon: [
      { url: "/favicon.ico",    sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://zeko.pk",
    siteName: "zeko.pk",
    title: "zeko.pk — Arduino & Electronics in Pakistan",
    description: "Pakistan ka best electronics store. Arduino, sensors, ICs, tools. Fast Karachi delivery, Cash on Delivery.",
    images: [{ url: "https://zeko.pk/logo-512.png", width: 512, height: 512, alt: "zeko.pk logo" }],
  },
  twitter: {
    card: "summary",
    title: "zeko.pk — Arduino & Electronics in Pakistan",
    description: "Buy Arduino, sensors, ICs, transistors, tools. Fast Karachi delivery, COD.",
    images: ["https://zeko.pk/logo-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
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
