import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-display text-foreground tracking-[0.1em]"
          >
            LUXE
          </motion.a>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {["Início", "Sobre", "Coleção", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground tracking-wider">
            © {currentYear} LUXE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}