import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Speaker, Crown, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { premiumProducts, easyProducts, Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  isInView: boolean;
  delay: number;
  variant: "premium" | "easy";
  onOpenGallery?: (product: Product) => void;
}

function ProductCard({ product, index, isInView, delay, variant, onOpenGallery }: ProductCardProps) {
  const isPremium = variant === "premium";
  
  const handleImageClick = () => {
    if (product.gallery && product.gallery.length > 0 && onOpenGallery) {
      onOpenGallery(product);
    }
  };
  
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
      {/* Image Container - Premium card style */}
      <div 
        className={`aspect-square bg-white rounded-xl overflow-hidden relative mb-6 border shadow-sm transition-all duration-300 ${
          isPremium 
            ? "border-gray-200 group-hover:border-primary/50 group-hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15),0_0_20px_-5px_hsl(var(--primary)/0.15)]" 
            : "border-gray-200 group-hover:border-gray-300 group-hover:shadow-lg"
        } ${product.gallery && product.gallery.length > 0 ? 'cursor-pointer' : ''}`}
        onClick={product.gallery && product.gallery.length > 0 ? handleImageClick : undefined}
      >
        {product.image ? (
          <div className="w-full h-full p-3 flex items-center justify-center bg-white">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-[85%] h-[85%] object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
              <Speaker className={`w-12 h-12 transition-colors duration-300 mx-auto mb-2 ${
                isPremium 
                  ? "text-gray-400 group-hover:text-primary" 
                  : "text-gray-300 group-hover:text-gray-500"
              }`} />
              <span className={`font-display text-lg font-bold transition-colors duration-300 ${
                isPremium 
                  ? "text-gray-500 group-hover:text-primary" 
                  : "text-gray-400 group-hover:text-gray-600"
              }`}>
                {product.name}
              </span>
            </div>
          </div>
        )}
        {/* Badge */}
        {isPremium && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button 
            onClick={product.gallery && product.gallery.length > 0 ? handleImageClick : undefined}
            className="btn-glow w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-3 rounded-xl transition-all duration-300"
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h3 className="font-display text-lg font-bold transition-colors duration-300 mb-2 text-primary">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <p className="text-xs text-muted-foreground/70">
          {product.specs}
        </p>
      </div>
    </motion.article>
  );
}

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const handleOpenGallery = (product: Product) => {
    if (product.gallery && product.gallery.length > 0) {
      navigate(`/produtos/${product.id}`);
    }
  };

  return (
    <section id="products" ref={ref} className="py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
            Nossa Linha
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 font-bold">
            CABINETS <span className="text-primary">WBASS</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Linha Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3.5 bg-primary/10 rounded-xl border border-primary/30">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-gray-900 font-bold">
                LINHA <span className="text-primary">PREMIUM</span>
              </h3>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed text-lg">
            Usamos falantes europeus com imã em neodímio que propiciam maior leveza. 
            Som mais moderno, ideal para quem busca o melhor em tecnologia e portabilidade.
          </p>
          
          {/* Premium Features */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-primary font-bold text-sm">✦ Falantes Italianos</span>
              <p className="text-gray-500 text-sm mt-1.5">Imã em neodímio de alta performance</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-primary font-bold text-sm">✦ Ultra Leve</span>
              <p className="text-gray-500 text-sm mt-1.5">Campo magnético forte, imã compacto</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-primary font-bold text-sm">✦ Som Moderno</span>
              <p className="text-gray-500 text-sm mt-1.5">Timbre contemporâneo e definido</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
                delay={0.2}
                variant="premium"
                onOpenGallery={handleOpenGallery}
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
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3.5 bg-gray-100 rounded-xl border border-gray-200">
              <Zap className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-gray-900 font-bold">
                LINHA <span className="text-gray-500">EASY</span>
              </h3>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mb-10 leading-relaxed text-lg">
            São falantes nacionais com imãs em ferrite, um pouco mais pesados mas com excelente rendimento. 
            Som vintage, ideal para quem busca o melhor custo-benefício fabricado no Brasil.
          </p>

          {/* Easy Features */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-gray-800 font-bold text-sm">● Falantes Nacionais</span>
              <p className="text-gray-500 text-sm mt-1.5">Imã em ferrite de alta qualidade</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-gray-800 font-bold text-sm">● Custo-Benefício</span>
              <p className="text-gray-500 text-sm mt-1.5">Fabricado no Brasil, preço acessível</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span className="text-gray-800 font-bold text-sm">● Som Vintage</span>
              <p className="text-gray-500 text-sm mt-1.5">Timbre clássico e encorpado</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {easyProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
                delay={0.5}
                variant="easy"
                onOpenGallery={handleOpenGallery}
              />
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <Link to="/orcamento">
            <button className="btn-glow bg-primary hover:bg-primary/90 text-white font-semibold text-sm uppercase tracking-wider px-10 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 group">
              Solicitar Proposta
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
