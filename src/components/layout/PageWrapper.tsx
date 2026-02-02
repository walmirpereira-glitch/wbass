import { useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};
