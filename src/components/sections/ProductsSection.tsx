import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Speaker, Crown, Zap, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string;
  price: number;
  image?: string;
  gallery?: string[];
}

// Product images - 212D
import img212dFrente from "@/assets/products/212d-frente.jpg";
import img212dLateral1 from "@/assets/products/212d-lateral1.jpg";
import img212dLateral2 from "@/assets/products/212d-lateral2.jpg";
import img212dTraseira from "@/assets/products/212d-traseira.jpg";

// Product images - 210D
import img210dFrente from "@/assets/products/210d-frente.jpg";
import img210dLateral1 from "@/assets/products/210d-lateral1.jpg";
import img210dLateral2 from "@/assets/products/210d-lateral2.jpg";
import img210dTraseira from "@/assets/products/210d-traseira.jpg";

const product212dGallery = [img212dFrente, img212dLateral1, img212dLateral2, img212dTraseira];
const product210dGallery = [img210dFrente, img210dLateral1, img210dLateral2, img210dTraseira];

const premiumProducts: Product[] = [
  {
    id: "210d",
    name: "Wbass 210D",
    category: "Versátil",
    description: "2 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 8 ohms",
    price: 5602.08,
    image: img210dFrente,
    gallery: product210dGallery,
  },
  {
    id: "210dp",
    name: "Wbass 210DP",
    category: "Versátil Pro",
    description: "2 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "500W RMS | 4 ohms",
    price: 5781.60,
  },
  {
    id: "212d",
    name: "Wbass 212D",
    category: "Versátil Potente",
    description: "2 falantes Italianos em neodímio de 12\" + driver com ajuste de volume 3 posições",
    specs: "700W RMS | 4 ohms",
    price: 6429.72,
    image: img212dFrente,
    gallery: product212dGallery,
  },
  {
    id: "410dp",
    name: "Wbass 410DP",
    category: "Profissional",
    description: "4 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "800W RMS | 4 ohms",
    price: 7102.22,
  },
  {
    id: "112d",
    name: "Wbass 112D",
    category: "Compacto",
    description: "1 falante Italiano em neodímio de 12\" + driver com ajuste de volume 3 posições",
    specs: "350W RMS | 4 ou 8 ohms",
    price: 5516.28,
  },
  {
    id: "112nd",
    name: "Wbass 112ND",
    category: "Compacto",
    description: "1 falante Italiano em neodímio de 12\", não possui driver",
    specs: "350W RMS | 4 ou 8 ohms",
    price: 4329.60,
  },
  {
    id: "115d",
    name: "Wbass 115D",
    category: "Graves Profundos",
    description: "1 falante Italiano em neodímio de 15\" + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 8 ohms",
    price: 5760.48,
  },
  {
    id: "115nd",
    name: "Wbass 115ND",
    category: "Graves Profundos",
    description: "1 falante Italiano em neodímio de 15\", não possui driver",
    specs: "400W RMS | 8 ohms",
    price: 4590.96,
  },
];

const easyProducts: Product[] = [
  {
    id: "easy-1x10d",
    name: "Wbass Easy 1x10D",
    category: "Compacto",
    description: "1 falante 10\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "300W RMS | 4 ou 8 ohms",
    price: 2599.00,
  },
  {
    id: "easy-2x10d",
    name: "Wbass Easy 2x10D",
    category: "Versátil",
    description: "2 falantes 10\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "500W RMS | 4 ou 8 ohms",
    price: 3499.96,
  },
  {
    id: "easy-1x12d",
    name: "Wbass Easy 1x12D",
    category: "Compacto",
    description: "1 falante 12\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 4 ou 8 ohms",
    price: 2992.00,
  },
  {
    id: "easy-1x12nd",
    name: "Wbass Easy 1x12ND",
    category: "Compacto",
    description: "1 falante 12\" em ferrite nacional, não possui driver",
    specs: "400W RMS | 4 ou 8 ohms",
    price: 2502.08,
  },
];

interface ProductCardProps {
  product: Product;
  index: number;
  isInView: boolean;
  delay: number;
  variant: "premium" | "easy";
  onOpenGallery?: (images: string[], productName: string) => void;
}

function ProductCard({ product, index, isInView, delay, variant, onOpenGallery }: ProductCardProps) {
  const isPremium = variant === "premium";
  
  const handleImageClick = () => {
    if (product.gallery && product.gallery.length > 0 && onOpenGallery) {
      onOpenGallery(product.gallery, product.name);
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
      {/* Image Container */}
      <div className={`aspect-square bg-secondary rounded-lg overflow-hidden relative mb-5 border transition-colors ${
        isPremium 
          ? "border-primary/30 group-hover:border-primary" 
          : "border-border group-hover:border-primary/50"
      }`}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${product.gallery ? 'cursor-pointer' : ''}`}
            onClick={handleImageClick}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <Speaker className={`w-12 h-12 transition-colors duration-300 mx-auto mb-2 ${
                isPremium 
                  ? "text-primary/40 group-hover:text-primary" 
                  : "text-muted-foreground/30 group-hover:text-primary/60"
              }`} />
              <span className={`font-display text-lg transition-colors duration-300 ${
                isPremium 
                  ? "text-primary/60 group-hover:text-primary" 
                  : "text-muted-foreground/50 group-hover:text-primary"
              }`}>
                {product.name}
              </span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Badge */}
        {isPremium && (
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <Link to="/orcamento">
            <Button variant="wbass" size="sm" className="w-full">
              Solicitar Orçamento
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <span className={`text-xs uppercase tracking-[0.15em] block mb-1 font-semibold ${
          isPremium ? "text-primary" : "text-muted-foreground"
        }`}>
          {product.category}
        </span>
        <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2 tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xs text-muted-foreground/70 mb-3">
          {product.specs}
        </p>
        <span className="text-primary font-bold text-lg">
          R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </motion.article>
  );
}

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryProductName, setGalleryProductName] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpenGallery = (images: string[], productName: string) => {
    setGalleryImages(images);
    setGalleryProductName(productName);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

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
              <span className="text-primary font-semibold text-sm">✦ Falantes Italianos</span>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Image Gallery Modal */}
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-md border-primary/30 p-0">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setGalleryOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              
              {/* Product name */}
              <div className="absolute top-4 left-4 z-10">
                <h3 className="font-display text-xl text-foreground bg-background/80 px-3 py-1 rounded">
                  {galleryProductName}
                </h3>
              </div>

              {/* Main image */}
              <div className="aspect-square md:aspect-video">
                {galleryImages.length > 0 && (
                  <img
                    src={galleryImages[currentImageIndex]}
                    alt={`${galleryProductName} - Imagem ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-secondary"
                  />
                )}
              </div>

              {/* Navigation arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex justify-center gap-2 p-4 bg-secondary/50">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
