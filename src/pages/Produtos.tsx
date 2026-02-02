import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Produtos = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ProductsSection />
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Produtos;
