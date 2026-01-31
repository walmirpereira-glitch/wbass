import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  const footerRef = useRef<HTMLElement>(null);
  const { isFadingOut } = useAutoNavigate(footerRef);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isFadingOut ? "fading" : "visible"}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`min-h-screen bg-background ${className}`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer ref={footerRef} />
      </motion.div>
    </AnimatePresence>
  );
};
