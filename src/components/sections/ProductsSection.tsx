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
      <div 
        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-5 border transition-colors ${
          isPremium 
            ? "border-gray-200 group-hover:border-primary" 
            : "border-gray-200 group-hover:border-gray-400"
        } ${product.gallery && product.gallery.length > 0 ? 'cursor-pointer' : ''}`}
        onClick={product.gallery && product.gallery.length > 0 ? handleImageClick : undefined}
      >
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
              <Speaker className={`w-12 h-12 transition-colors duration-300 mx-auto mb-2 ${
                isPremium 
                  ? "text-gray-400 group-hover:text-primary" 
                  : "text-gray-300 group-hover:text-gray-500"
              }`} />
              <span className={`font-display text-lg transition-colors duration-300 ${
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
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <Link to="/orcamento">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-2.5 rounded transition-colors">
              Solicitar Orçamento
            </button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <span className={`text-xs uppercase tracking-[0.15em] block mb-1 font-semibold ${
          isPremium ? "text-primary" : "text-gray-500"
        }`}>
          {product.category}
        </span>
        <h3 className="font-display text-lg text-gray-900 group-hover:text-primary transition-colors duration-300 mb-2 tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xs text-gray-400 mb-3">
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
    <section id="products" ref={ref} className="py-24 lg:py-32 bg-white">
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
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 tracking-wide">
            CABINETS <span className="text-primary">WBASS</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
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
              <h3 className="font-display text-2xl md:text-3xl text-gray-900 tracking-wide">
                LINHA <span className="text-primary">PREMIUM</span>
              </h3>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mb-8 leading-relaxed">
            Usamos falantes europeus com imã em neodímio que propiciam maior leveza. 
            Som mais moderno, ideal para quem busca o melhor em tecnologia e portabilidade.
          </p>
          
          {/* Premium Features */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-primary font-semibold text-sm">✦ Falantes Italianos</span>
              <p className="text-gray-500 text-xs mt-1">Imã em neodímio de alta performance</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-primary font-semibold text-sm">✦ Ultra Leve</span>
              <p className="text-gray-500 text-xs mt-1">Campo magnético forte, imã compacto</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-primary font-semibold text-sm">✦ Som Moderno</span>
              <p className="text-gray-500 text-xs mt-1">Timbre contemporâneo e definido</p>
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
            <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
              <Zap className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-gray-900 tracking-wide">
                LINHA <span className="text-gray-500">EASY</span>
              </h3>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mb-8 leading-relaxed">
            São falantes nacionais com imãs em ferrite, um pouco mais pesados mas com excelente rendimento. 
            Som vintage, ideal para quem busca o melhor custo-benefício fabricado no Brasil.
          </p>

          {/* Easy Features */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-gray-800 font-semibold text-sm">● Falantes Nacionais</span>
              <p className="text-gray-500 text-xs mt-1">Imã em ferrite de alta qualidade</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-gray-800 font-semibold text-sm">● Custo-Benefício</span>
              <p className="text-gray-500 text-xs mt-1">Fabricado no Brasil, preço acessível</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <span className="text-gray-800 font-semibold text-sm">● Som Vintage</span>
              <p className="text-gray-500 text-xs mt-1">Timbre clássico e encorpado</p>
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
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded transition-colors inline-flex items-center gap-2 group">
              Solicitar Orçamento
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </Link>
        </motion.div>

        {/* Image Gallery Modal - Quilter Labs Style */}
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-5xl bg-white border-0 p-0 [&>button]:hidden rounded-lg overflow-hidden">
            <div className="relative bg-white">
              {/* Close button */}
              <button
                onClick={() => setGalleryOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors shadow-md"
                type="button"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Gallery Layout: Thumbnails left, Main image right */}
              <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[550px]">
                {/* Thumbnails - Left side on desktop, bottom on mobile */}
                {galleryImages.length > 1 && (
                  <div className="order-2 md:order-1 flex md:flex-col gap-3 p-4 bg-gray-50 md:w-28 overflow-x-auto md:overflow-y-auto border-t md:border-t-0 md:border-r border-gray-200">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 md:w-full md:h-auto md:aspect-square rounded-md overflow-hidden border-2 transition-all bg-white ${
                          idx === currentImageIndex 
                            ? 'border-primary shadow-md' 
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        type="button"
                      >
                        <img 
                          src={img} 
                          alt={`${galleryProductName} - Miniatura ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image - Right side */}
                <div className="order-1 md:order-2 flex-1 relative bg-white">
                  {/* Product name header */}
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-display text-xl text-gray-900">
                      {galleryProductName}
                    </h3>
                  </div>
                  
                  <div className="aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center p-6 bg-white">
                    {galleryImages.length > 0 && (
                      <img
                        src={galleryImages[currentImageIndex]}
                        alt={`${galleryProductName} - Imagem ${currentImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Navigation arrows over main image */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-primary hover:text-white transition-colors z-10 shadow-md"
                        type="button"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-primary hover:text-white transition-colors z-10 shadow-md"
                        type="button"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm text-gray-600 shadow-sm">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
