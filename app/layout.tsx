import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
export const metadata: Metadata = {
  metadataBase: new URL("https://zeko.pk"),
  title: { default:"zeko.pk - Electronics Components in Pakistan", template:"%s | zeko.pk" },
  description: "zeko.pk — Pakistan ka fast electronics store. Karachi delivery, Cash on Delivery.",
  icons: { icon:[{url:"/favicon.svg",type:"image/svg+xml"}] },
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <body>
        <CartProvider><OrderProvider>{children}</OrderProvider></CartProvider>
      </body>
    </html>
  );
}
