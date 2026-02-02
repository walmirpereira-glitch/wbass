import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Contato = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Contato;
