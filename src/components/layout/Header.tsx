import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wbassLogo from "@/assets/wbass-logo-new.png";

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialLinks = [
  { Icon: WhatsAppIcon, href: "https://wa.me/5512974081582", label: "WhatsApp" },
  { Icon: Facebook, href: "https://www.facebook.com/wbass.cabinets.2025", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/wbass_cabinets/", label: "Instagram" },
];

const navLinks = [
  { label: "Início", anchor: "#hero" },
  { label: "Sobre", anchor: "#about" },
  { label: "Produtos", anchor: "#products" },
  { label: "Vídeos", anchor: "#videos" },
  { label: "Garantia", anchor: "/garantia", isRoute: true },
  { label: "Dicas de Uso", anchor: "/dicas-de-uso", isRoute: true },
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
          {/* Logo + Social Icons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick(navLinks[0])} 
              className="flex items-center"
            >
              <img src={wbassLogo} alt="Wbass Cabinets" className="h-12 md:h-14 w-auto" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                >
                  <link.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

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
