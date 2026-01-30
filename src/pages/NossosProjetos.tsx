import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NossosProjetos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-wide">
                Nossos <span className="text-primary">Projetos</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Conheça alguns dos projetos e histórias de músicos que confiam na Wbass Cabinets para entregar o melhor som.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder cards */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                    Em breve
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Projeto {i}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Descrição do projeto em breve.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NossosProjetos;
