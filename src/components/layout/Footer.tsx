import { motion } from "framer-motion";
import { forwardRef } from "react";
import wbassLogo from "@/assets/wbass-logo-new.jpg";

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <img src={wbassLogo} alt="Wbass Cabinets" className="h-10 w-auto" />
          </motion.a>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {[
              { label: "Início", href: "#hero" },
              { label: "Sobre", href: "#about" },
              { label: "Produtos", href: "#products" },
              { label: "Garantia", href: "/garantia", isRoute: true },
              { label: "Contato", href: "#contact" },
            ].map((item) => (
              item.isRoute ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.15em] text-gray-400 hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.15em] text-gray-400 hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-500 tracking-wider">
            © {currentYear} Wbass Cabinets. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});
