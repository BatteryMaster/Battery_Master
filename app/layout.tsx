import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeko.pk"),
  title: {
    default: "zeko.pk – Electronics Components, Modules, ICs & Tools in Pakistan",
    template: "%s | zeko.pk",
  },
  description:
    "Buy electronics modules, ICs, transistors, resistors, sensors and tools online in Pakistan. Fast delivery, trusted store – zeko.pk Karachi.",
  keywords: [
    "electronics store Pakistan",
    "buy ICs Pakistan",
    "Arduino modules Pakistan",
    "transistors Pakistan",
    "resistors Pakistan",
    "electronics tools Pakistan",
    "electronics components Karachi",
    "buy electronics online Pakistan",
    "NE555 Pakistan",
    "BC547 Pakistan",
    "relay module Pakistan",
    "soldering iron Pakistan",
    "digital multimeter Pakistan",
    "zeko.pk",
  ],
  authors: [{ name: "zeko.pk", url: "https://zeko.pk" }],
  creator: "zeko.pk",
  publisher: "zeko.pk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://zeko.pk",
  },
  openGraph: {
    title: "zeko.pk – Electronics Components, Modules, ICs & Tools in Pakistan",
    description:
      "Shop modules, ICs, transistors, resistors, sensors and tools with a fast and professional electronics store in Pakistan.",
    url: "https://zeko.pk",
    siteName: "zeko.pk",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "https://zeko.pk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "zeko.pk – Electronics Store Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "zeko.pk – Electronics Components in Pakistan",
    description:
      "Buy modules, ICs, transistors, resistors and tools online in Pakistan.",
    images: ["https://zeko.pk/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    // bing: "YOUR_BING_WEBMASTER_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
