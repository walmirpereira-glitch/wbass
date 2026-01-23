import { motion } from "framer-motion";
import { ChevronDown, Volume2, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/cabinet-4x10.jpg";

const features = [
  { icon: Volume2, label: "Ótimo Timbre" },
  { icon: Truck, label: "Portabilidade" },
  { icon: Shield, label: "Robustez" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Caixa de som para contrabaixo Wbass"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-6 font-semibold">
            Caixas de Som para Contrabaixo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight tracking-wider"
        >
          O SOM QUE
          <span className="block text-gradient-green">VOCÊ MERECE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Caixas acústicas desenvolvidas com tecnologia de ponta para entregar 
          o timbre perfeito que seu contrabaixo precisa. Qualidade profissional, 
          portabilidade e durabilidade incomparáveis.
        </motion.p>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full bg-background/50 backdrop-blur-sm"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="wbassFilled" size="xl">
            Ver Produtos
          </Button>
          <Button variant="wbass" size="xl">
            Saiba Mais
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}