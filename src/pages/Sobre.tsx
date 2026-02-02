import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Sobre = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <AboutSection />
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Sobre;
