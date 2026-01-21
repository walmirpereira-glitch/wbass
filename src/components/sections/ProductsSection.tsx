import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Chronograph Elite",
    category: "Relógios",
    price: "R$ 12.500",
    image: null,
  },
  {
    id: 2,
    name: "Anel Diamante Noir",
    category: "Joias",
    price: "R$ 8.900",
    image: null,
  },
  {
    id: 3,
    name: "Pulseira Heritage",
    category: "Acessórios",
    price: "R$ 4.200",
    image: null,
  },
  {
    id: 4,
    name: "Colar Infinite",
    category: "Joias",
    price: "R$ 15.800",
    image: null,
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
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
            Coleção Exclusiva
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Peças em <span className="text-gradient-gold">Destaque</span>
          </h2>
          <div className="divider-gold mx-auto" />
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
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden relative mb-5">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-primary/30 group-hover:text-primary/50 transition-colors duration-300">
                    {product.name.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <Button variant="luxury" size="sm" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                  {product.category}
                </span>
                <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {product.name}
                </h3>
                <span className="text-primary font-medium">{product.price}</span>
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
          <Button variant="luxury" size="xl" className="group">
            Ver Toda Coleção
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