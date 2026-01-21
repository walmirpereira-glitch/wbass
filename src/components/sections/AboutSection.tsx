import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 lg:py-32 bg-charcoal relative overflow-hidden"
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
              Nossa Essência
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Uma Tradição de
              <span className="text-gradient-gold block">Excelência</span>
            </h2>
            <div className="divider-gold mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Desde 1985, dedicamos nossa paixão à criação de peças que transcendem o tempo. 
              Cada detalhe é meticulosamente elaborado por artesãos que dominam técnicas 
              transmitidas através de gerações.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Nossa filosofia é simples: qualidade inigualável, design atemporal e um 
              compromisso inabalável com a satisfação de nossos clientes mais exigentes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "40+", label: "Anos de História" },
                { number: "5000+", label: "Peças Criadas" },
                { number: "98%", label: "Clientes Satisfeitos" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <span className="text-3xl md:text-4xl font-display text-gradient-gold block mb-1">
                    {stat.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-secondary rounded-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-display text-6xl text-gradient-gold block mb-4">L</span>
                  <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Desde 1985
                  </span>
                </div>
              </div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-primary/30 rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}