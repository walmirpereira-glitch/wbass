import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Speaker, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  specs: string;
  price: string;
}

const premiumProducts: Product[] = [
  {
    id: 1,
    name: "WB 112 Premium",
    category: "Compacto",
    description: "1x12\" - Ideal para ensaios e pequenos palcos",
    specs: "300W RMS | 8 ohms | 12kg",
    price: "Consulte",
  },
  {
    id: 2,
    name: "WB 210 Premium",
    category: "Versátil",
    description: "2x10\" - Equilíbrio perfeito entre potência e portabilidade",
    specs: "500W RMS | 4 ohms | 18kg",
    price: "Consulte",
  },
  {
    id: 3,
    name: "WB 410 Premium",
    category: "Profissional",
    description: "4x10\" - Para quem precisa de potência máxima",
    specs: "800W RMS | 4 ohms | 28kg",
    price: "Consulte",
  },
  {
    id: 4,
    name: "WB 115 Premium",
    category: "Graves Profundos",
    description: "1x15\" - Graves que você sente no peito",
    specs: "400W RMS | 8 ohms | 20kg",
    price: "Consulte",
  },
];

const easyProducts: Product[] = [
  {
    id: 5,
    name: "WB 112 Easy",
    category: "Compacto",
    description: "1x12\" - Ideal para ensaios e pequenos palcos",
    specs: "300W RMS | 8 ohms | 18kg",
    price: "Consulte",
  },
  {
    id: 6,
    name: "WB 210 Easy",
    category: "Versátil",
    description: "2x10\" - Equilíbrio perfeito entre potência e portabilidade",
    specs: "500W RMS | 4 ohms | 26kg",
    price: "Consulte",
  },
  {
    id: 7,
    name: "WB 410 Easy",
    category: "Profissional",
    description: "4x10\" - Para quem precisa de potência máxima",
    specs: "800W RMS | 4 ohms | 38kg",
    price: "Consulte",
  },
  {
    id: 8,
    name: "WB 115 Easy",
    category: "Graves Profundos",
    description: "1x15\" - Graves que você sente no peito",
    specs: "400W RMS | 8 ohms | 28kg",
    price: "Consulte",
  },
];

interface ProductCardProps {
  product: Product;
  index: number;
  isInView: boolean;
  delay: number;
  variant: "premium" | "easy";
}

function ProductCard({ product, index, isInView, delay, variant }: ProductCardProps) {
  const isPremium = variant === "premium";
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: delay + index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group"
    >
      {/* Image Container */}
      <div className={`aspect-square bg-secondary rounded-lg overflow-hidden relative mb-5 border transition-colors ${
        isPremium 
          ? "border-primary/30 group-hover:border-primary" 
          : "border-border group-hover:border-primary/50"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Speaker className={`w-16 h-16 transition-colors duration-300 mx-auto mb-2 ${
              isPremium 
                ? "text-primary/40 group-hover:text-primary" 
                : "text-muted-foreground/30 group-hover:text-primary/60"
            }`} />
            <span className={`font-display text-2xl transition-colors duration-300 ${
              isPremium 
                ? "text-primary/60 group-hover:text-primary" 
                : "text-muted-foreground/50 group-hover:text-primary"
            }`}>
              {product.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        </div>
        {/* Badge */}
        {isPremium && (
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <Button variant="wbass" size="sm" className="w-full">
            Ver Detalhes
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <span className={`text-xs uppercase tracking-[0.15em] block mb-1 font-semibold ${
          isPremium ? "text-primary" : "text-muted-foreground"
        }`}>
          {product.category}
        </span>
        <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-2 tracking-wide">
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
  );
}

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

        {/* Linha Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide">
                LINHA <span className="text-primary">PREMIUM</span>
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Usamos falantes europeus com imã em neodímio que propiciam maior leveza. 
            Som mais moderno, ideal para quem busca o melhor em tecnologia e portabilidade.
          </p>
          
          {/* Premium Features */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <span className="text-primary font-semibold text-sm">✦ Falantes Europeus</span>
              <p className="text-muted-foreground text-xs mt-1">Imã em neodímio de alta performance</p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <span className="text-primary font-semibold text-sm">✦ Ultra Leve</span>
              <p className="text-muted-foreground text-xs mt-1">Campo magnético forte, imã compacto</p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <span className="text-primary font-semibold text-sm">✦ Som Moderno</span>
              <p className="text-muted-foreground text-xs mt-1">Timbre contemporâneo e definido</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
                delay={0.2}
                variant="premium"
              />
            ))}
          </div>
        </motion.div>

        {/* Linha Easy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-secondary rounded-lg border border-border">
              <Zap className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide">
                LINHA <span className="text-muted-foreground">EASY</span>
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            São falantes nacionais com imãs em ferrite, um pouco mais pesados mas com excelente rendimento. 
            Som vintage, ideal para quem busca o melhor custo-benefício fabricado no Brasil.
          </p>

          {/* Easy Features */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <span className="text-foreground font-semibold text-sm">● Falantes Nacionais</span>
              <p className="text-muted-foreground text-xs mt-1">Imã em ferrite de alta qualidade</p>
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <span className="text-foreground font-semibold text-sm">● Custo-Benefício</span>
              <p className="text-muted-foreground text-xs mt-1">Fabricado no Brasil, preço acessível</p>
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <span className="text-foreground font-semibold text-sm">● Som Vintage</span>
              <p className="text-muted-foreground text-xs mt-1">Timbre clássico e encorpado</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {easyProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
                delay={0.5}
                variant="easy"
              />
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/orcamento">
            <Button variant="wbass" size="xl" className="group">
              Solicitar Orçamento
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
