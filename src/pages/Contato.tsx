import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

const Contato = () => {
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
        <main className="pt-20">
          <ContactSection />
        </main>
        <Footer ref={footerRef} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Contato;
