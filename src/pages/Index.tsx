import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Index = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { isFadingOut } = useAutoNavigate(footerRef);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isFadingOut ? "fading" : "visible"}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen bg-background"
      >
        <Header />
        <main>
          <HeroSection />
        </main>
        <Footer ref={footerRef} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;