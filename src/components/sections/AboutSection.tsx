import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Volume2, Shield, Truck, Zap } from "lucide-react";

const differentials = [
  {
    icon: Volume2,
    title: "Ótimo Timbre",
    description: "Resposta de frequência otimizada para contrabaixo, graves profundos e médios definidos.",
  },
  {
    icon: Truck,
    title: "Portabilidade",
    description: "Design compacto e leve, fácil de transportar para gigs e ensaios.",
  },
  {
    icon: Shield,
    title: "Robustez",
    description: "Construção resistente com materiais de alta qualidade para suportar a vida na estrada.",
  },
  {
    icon: Zap,
    title: "Potência",
    description: "Alta eficiência sonora com capacidade de potência para qualquer palco.",
  },
];

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
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
              Sobre a Wbass
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight tracking-wide">
              FEITO POR BAIXISTAS
              <span className="text-gradient-green block">PARA BAIXISTAS</span>
            </h2>
            <div className="divider-green mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              A Wbass Cabinets nasceu da paixão pelo contrabaixo e da busca pelo som perfeito. 
              Desenvolvemos caixas acústicas que entendem as necessidades reais do baixista brasileiro, 
              combinando tecnologia de ponta com acabamento artesanal.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Cada cabinet é projetado para entregar graves potentes e definidos, médios presentes 
              e uma clareza que corta qualquer mix. Tudo isso em um pacote compacto e resistente.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "10+", label: "Anos de Experiência" },
                { number: "500+", label: "Cabinets Produzidos" },
                { number: "100%", label: "Satisfação" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <span className="text-3xl md:text-4xl font-display text-gradient-green block mb-1 tracking-wide">
                    {stat.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Differentials Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-2 gap-6"
          >
            {differentials.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="p-6 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2 tracking-wide">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}