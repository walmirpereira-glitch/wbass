import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Speaker } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "WB 112",
    category: "Compacto",
    description: "1x12\" - Ideal para ensaios e pequenos palcos",
    specs: "300W RMS | 8 ohms | 15kg",
    price: "Consulte",
  },
  {
    id: 2,
    name: "WB 210",
    category: "Versátil",
    description: "2x10\" - Equilíbrio perfeito entre potência e portabilidade",
    specs: "500W RMS | 4 ohms | 22kg",
    price: "Consulte",
  },
  {
    id: 3,
    name: "WB 410",
    category: "Profissional",
    description: "4x10\" - Para quem precisa de potência máxima",
    specs: "800W RMS | 4 ohms | 35kg",
    price: "Consulte",
  },
  {
    id: 4,
    name: "WB 115",
    category: "Graves Profundos",
    description: "1x15\" - Graves que você sente no peito",
    specs: "400W RMS | 8 ohms | 25kg",
    price: "Consulte",
  },
];

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
            Nossa Linha
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-wide">
            CABINETS <span className="text-gradient-green">WBASS</span>
          </h2>
          <div className="divider-green mx-auto" />
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group"
            >
              {/* Image Container */}
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden relative mb-5 border border-border group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Speaker className="w-16 h-16 text-primary/30 group-hover:text-primary/60 transition-colors duration-300 mx-auto mb-2" />
                    <span className="font-display text-3xl text-primary/50 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </span>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <Button variant="wbass" size="sm" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-primary block mb-1 font-semibold">
                  {product.category}
                </span>
                <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors duration-300 mb-2 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.description}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-3">
                  {product.specs}
                </p>
                <span className="text-primary font-semibold">{product.price}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button variant="wbass" size="xl" className="group">
            Solicitar Orçamento
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}