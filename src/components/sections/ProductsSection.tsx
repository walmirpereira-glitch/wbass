import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Speaker, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductGalleryModal } from "./ProductGalleryModal";

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
import img210dFrente2 from "@/assets/products/210d-frente2.jpg";
import img210dLateral1 from "@/assets/products/210d-lateral1.jpg";
import img210dLateral2 from "@/assets/products/210d-lateral2.jpg";
import img210dLateral3 from "@/assets/products/210d-lateral3.jpg";
import img210dTraseira from "@/assets/products/210d-traseira.jpg";

// Product images - Easy 2x10D
import imgEasy2x10dFrente from "@/assets/products/easy-2x10d-frente.jpg";
import imgEasy2x10dLateral1 from "@/assets/products/easy-2x10d-lateral1.jpg";
import imgEasy2x10dLateral2 from "@/assets/products/easy-2x10d-lateral2.jpg";
import imgEasy2x10dCima from "@/assets/products/easy-2x10d-cima.jpg";
import imgEasy2x10dTraseira from "@/assets/products/easy-2x10d-traseira.jpg";

// Product images - Easy 1x10D
import imgEasy1x10dFrente from "@/assets/products/easy-1x10d-frente.jpg";
import imgEasy1x10dLateral1 from "@/assets/products/easy-1x10d-lateral1.jpg";
import imgEasy1x10dLateral2 from "@/assets/products/easy-1x10d-lateral2.jpg";
import imgEasy1x10dCima from "@/assets/products/easy-1x10d-cima.jpg";
import imgEasy1x10dTraseira from "@/assets/products/easy-1x10d-traseira.jpg";

// Product images - Easy 1x12D
import imgEasy1x12dFrente from "@/assets/products/easy-1x12d-frente.jpg";
import imgEasy1x12dLateral1 from "@/assets/products/easy-1x12d-lateral1.jpg";
import imgEasy1x12dLateral2 from "@/assets/products/easy-1x12d-lateral2.jpg";
import imgEasy1x12dCima from "@/assets/products/easy-1x12d-cima.jpg";
import imgEasy1x12dTraseira from "@/assets/products/easy-1x12d-traseira.jpg";

// Product images - 410DP
import img410dpFrente from "@/assets/products/410dp-frente2.jpg";
import img410dpLateral from "@/assets/products/410dp-lateral.jpg";

// Product images - 112D
import img112dFrente from "@/assets/products/112d-frente2.jpg";
import img112dLateral1 from "@/assets/products/112d-lateral1.jpg";
import img112dLateral2 from "@/assets/products/112d-lateral2.jpg";
import img112dCima from "@/assets/products/112d-cima.jpg";
import img112dTraseira from "@/assets/products/112d-traseira.jpg";

// Product images - 112ND
import img112ndFrente from "@/assets/products/112nd-frente.png";
import img112ndTraseira from "@/assets/products/112nd-traseira.png";
import img112ndLateral from "@/assets/products/112nd-lateral.png";
const product212dGallery = [img212dFrente, img212dLateral1, img212dLateral2, img212dTraseira];
const product210dGallery = [img210dFrente2, img210dLateral1, img210dLateral2, img210dLateral3, img210dTraseira];
const productEasy2x10dGallery = [imgEasy2x10dFrente, imgEasy2x10dLateral1, imgEasy2x10dLateral2, imgEasy2x10dCima, imgEasy2x10dTraseira];
const productEasy1x10dGallery = [imgEasy1x10dFrente, imgEasy1x10dLateral1, imgEasy1x10dLateral2, imgEasy1x10dCima, imgEasy1x10dTraseira];
const productEasy1x12dGallery = [imgEasy1x12dFrente, imgEasy1x12dLateral1, imgEasy1x12dLateral2, imgEasy1x12dCima, imgEasy1x12dTraseira];
const product410dpGallery = [img410dpFrente, img410dpLateral];
const product112dGallery = [img112dFrente, img112dLateral1, img112dLateral2, img112dCima, img112dTraseira];
const product112ndGallery = [img112ndFrente, img112ndLateral, img112ndTraseira];

const premiumProducts: Product[] = [
  {
    id: "210d",
    name: "Wbass 210D",
    category: "Versátil",
    description: "2 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 8 ohms",
    price: 5602.08,
    image: img210dFrente2,
    gallery: product210dGallery,
  },
  {
    id: "210dp",
    name: "Wbass 210DP",
    category: "Versátil Pro",
    description: "2 falantes Italianos em neodímio de 10\" + driver com ajuste de volume 3 posições",
    specs: "500W RMS | 4 ohms",
    price: 5781.60,
    image: img210dFrente,
    gallery: product210dGallery,
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
    image: img410dpFrente,
    gallery: product410dpGallery,
  },
  {
    id: "112d",
    name: "Wbass 112D",
    category: "Compacto",
    description: "1 falante Italiano em neodímio de 12\" + driver com ajuste de volume 3 posições",
    specs: "350W RMS | 4 ou 8 ohms",
    price: 5516.28,
    image: img112dFrente,
    gallery: product112dGallery,
  },
  {
    id: "112nd",
    name: "Wbass 112ND",
    category: "Compacto",
    description: "1 falante Italiano em neodímio de 12\", não possui driver",
    specs: "350W RMS | 4 ou 8 ohms",
    price: 4329.60,
    image: img112ndFrente,
    gallery: product112ndGallery,
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
    image: imgEasy1x10dFrente,
    gallery: productEasy1x10dGallery,
  },
  {
    id: "easy-2x10d",
    name: "Wbass Easy 2x10D",
    category: "Versátil",
    description: "2 falantes 10\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "500W RMS | 4 ou 8 ohms",
    price: 3499.96,
    image: imgEasy2x10dFrente,
    gallery: productEasy2x10dGallery,
  },
  {
    id: "easy-1x12d",
    name: "Wbass Easy 1x12D",
    category: "Compacto",
    description: "1 falante 12\" em ferrite nacional + driver com ajuste de volume 3 posições",
    specs: "400W RMS | 4 ou 8 ohms",
    price: 2992.00,
    image: imgEasy1x12dFrente,
    gallery: productEasy1x12dGallery,
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
      {/* Image Container */}
      <div 
        className={`aspect-square bg-white rounded-lg overflow-hidden relative mb-5 border transition-colors ${
          isPremium 
            ? "border-gray-200 group-hover:border-primary" 
            : "border-gray-200 group-hover:border-gray-400"
        } ${product.gallery && product.gallery.length > 0 ? 'cursor-pointer' : ''}`}
        onClick={product.gallery && product.gallery.length > 0 ? handleImageClick : undefined}
      >
        {product.image ? (
          <div className="w-full h-full p-2 flex items-center justify-center bg-white">
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
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button 
            onClick={product.gallery && product.gallery.length > 0 ? handleImageClick : undefined}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm py-2.5 rounded transition-colors"
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h3 className="font-display text-lg transition-colors duration-300 mb-2 tracking-wide text-primary">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryProduct, setGalleryProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOpenGallery = (product: Product) => {
    if (product.gallery && product.gallery.length > 0) {
      setGalleryImages(product.gallery);
      setGalleryProduct(product);
      setCurrentImageIndex(0);
      setGalleryOpen(true);
    }
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };

  const handleIndexChange = (index: number) => {
    setCurrentImageIndex(index);
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
              Solicitar Proposta
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </Link>
        </motion.div>

        {/* Product Gallery Modal */}
        <ProductGalleryModal
          isOpen={galleryOpen}
          onClose={handleCloseGallery}
          product={galleryProduct}
          images={galleryImages}
          currentIndex={currentImageIndex}
          onIndexChange={handleIndexChange}
        />
      </div>
    </section>
  );
}
