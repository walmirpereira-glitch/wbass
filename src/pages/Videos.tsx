import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VideosSection } from "@/components/sections/VideosSection";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Videos = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <VideosSection />
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Videos;
