import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FloatingReel } from "@/components/FloatingReel";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Index = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer ref={footerRef} />
      <FloatingReel />
    </div>
  );
};


export default Index;
