import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, PenTool, Award, Globe } from "lucide-react";

const differentials = [
  {
    icon: Cpu,
    title: "Tecnologia de Ponta",
    description: "Falantes de Neodímio de alta performance: som encorpado e potente com peso drasticamente reduzido.",
  },
  {
    icon: PenTool,
    title: "Design Inteligente",
    description: "Eficiência acústica que permite caixas compactas entregarem volumes impressionantes.",
  },
  {
    icon: Award,
    title: "Acabamento Premium",
    description: "Cada detalhe é pensado para durar na estrada e manter o visual profissional.",
  },
  {
    icon: Globe,
    title: "Inovação Nacional",
    description: "Padrão internacional com componentes de alta qualidade e desenvolvimento nacional.",
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
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
              TECNOLOGIA DE BAIXISTA
              <span className="text-gradient-green block">PARA BAIXISTA</span>
            </h2>
            <div className="divider-green mb-8" />
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              No mercado musical, existem equipamentos feitos por indústrias e equipamentos feitos por quem vive o palco. 
              A Wbass nasceu desta segunda filosofia. Fundada por músicos apaixonados e especialistas em produtos, 
              nossa missão é simples: <strong className="text-foreground">entregar a máxima definição sonora com a portabilidade que o baixista moderno exige.</strong>
            </p>

            <h3 className="font-display text-2xl text-foreground mb-4 tracking-wide">
              O Som que o Seu Talento Merece
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Sabemos que o contrabaixo — seja ele elétrico ou acústico — exige uma resposta de frequência precisa. 
              Por isso, as caixas Wbass são projetadas para traduzir cada nuance da sua execução.
            </p>

            <h3 className="font-display text-2xl text-foreground mb-4 tracking-wide">
              Por que escolher Wbass?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Músicos que buscam praticidade sem abrir mão do timbre encontram na Wbass o parceiro ideal. 
              Chega de carregar equipamentos pesados e volumosos. Com a Wbass, você <em className="text-primary">"carrega menos e toca mais"</em>, 
              mantendo a clareza e o punch que só uma marca especializada pode oferecer.
            </p>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
              <p className="text-foreground text-xl font-display tracking-wide text-center">
                Wbass Cabinets: <span className="text-primary">Potência, Definição e Portabilidade.</span>
                <br />
                <span className="text-muted-foreground text-base font-body">O próximo nível do seu som começa aqui.</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10">
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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

            {/* Innovation Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="sm:col-span-2 p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/30"
            >
              <h3 className="font-display text-xl text-foreground mb-3 tracking-wide">
                Inovação Nacional com Padrão Internacional
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A Wbass se consolidou no mercado brasileiro como uma alternativa real às grandes marcas globais. 
                Ao unir componentes de alta qualidade (como nas linhas que utilizam falantes importados) com o 
                desenvolvimento nacional da linha Wbass Easy, democratizamos o acesso ao verdadeiro timbre para 
                baixistas de todos os níveis.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
