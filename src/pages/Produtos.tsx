import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductsSection } from "@/components/sections/ProductsSection";

const Produtos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Produtos;
