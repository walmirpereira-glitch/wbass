import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wbassLogo from "@/assets/wbass-logo-new.jpg";

const navLinks = [
  { label: "Início", anchor: "#hero" },
  { label: "Sobre", anchor: "#about" },
  { label: "Produtos", anchor: "#products" },
  { label: "Garantia", anchor: "/garantia", isRoute: true },
  { label: "Contato", anchor: "#contact" },
];

export const Header = forwardRef<HTMLElement>(function Header(_, ref) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isRoute) {
      navigate(link.anchor);
      // Ensure route changes always start at the top
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      setIsMobileMenuOpen(false);
      return;
    }
    
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(link.anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(link.anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick(navLinks[0])} 
            className="flex items-center"
          >
            <img src={wbassLogo} alt="Wbass Cabinets" className="h-12 md:h-14 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.anchor}
                onClick={() => handleNavClick(link)}
                className="text-gray-700 hover:text-primary font-medium text-sm uppercase tracking-wider transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/orcamento"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm uppercase tracking-wider px-6 py-2.5 rounded transition-colors"
            >
              Orçamento
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <button
                  key={link.anchor}
                  onClick={() => handleNavClick(link)}
                  className="px-6 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 font-medium text-sm uppercase tracking-wider transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/orcamento"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-6 mt-3 bg-primary hover:bg-primary/90 text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded text-center transition-colors"
              >
                Orçamento
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
