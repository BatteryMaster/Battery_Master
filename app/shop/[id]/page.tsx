import ProductDetailWrapper from "@/components/ProductDetailWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return (
    <main style={{ minHeight: "100vh", background: "#f0fdf4" }}>
      <Header />
      <WhatsAppButton />
      <ProductDetailWrapper id={id} />
      <Footer />
    </main>
  );
}
