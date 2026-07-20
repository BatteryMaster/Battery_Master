import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductDetailWrapper from "@/components/ProductDetailWrapper";

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <main style={{ minHeight:"100vh", background:"#f0fdf4" }}>
      <Header />
      <WhatsAppButton />
      <ProductDetailWrapper id={id} />
      <Footer />
    </main>
  );
}
