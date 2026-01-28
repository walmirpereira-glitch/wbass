import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";

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

interface ProductGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function ProductGalleryModal({
  isOpen,
  onClose,
  product,
  images,
  currentIndex,
  onIndexChange,
}: ProductGalleryModalProps) {
  const nextImage = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const prevImage = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, nextImage, prevImage]);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 bg-white rounded-lg overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-md"
          type="button"
          aria-label="Fechar galeria"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        {/* Gallery Layout */}
        <div className="flex flex-col lg:flex-row min-h-[400px] lg:min-h-[550px]">
          {/* Thumbnails - Left side on desktop */}
          {images.length > 1 && (
            <div className="order-3 lg:order-1 flex lg:flex-col gap-3 p-4 bg-gray-100 lg:w-24 overflow-x-auto lg:overflow-y-auto border-t lg:border-t-0 lg:border-r border-gray-200">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => onIndexChange(idx)}
                  className={`flex-shrink-0 w-16 h-16 lg:w-full lg:h-auto lg:aspect-square rounded-md overflow-hidden border-2 transition-all bg-white ${
                    idx === currentIndex
                      ? "border-green-600 shadow-md"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                  type="button"
                >
                  <img
                    src={img}
                    alt={`${product.name} - Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main image - Center */}
          <div className="order-1 lg:order-2 flex-1 relative bg-white">
            <div className="aspect-square lg:aspect-auto lg:h-full flex items-center justify-center p-6 bg-white">
              {images.length > 0 && (
                <img
                  src={images[currentIndex]}
                  alt={`${product.name} - Imagem ${currentIndex + 1}`}
                  className="max-w-full max-h-[400px] lg:max-h-[500px] object-contain"
                />
              )}
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-green-600 hover:text-white transition-colors z-10 shadow-md text-gray-700"
                  type="button"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full hover:bg-green-600 hover:text-white transition-colors z-10 shadow-md text-gray-700"
                  type="button"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm text-gray-600 shadow-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Product Info Panel - Right side */}
          <div className="order-2 lg:order-3 lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50">
            <div className="space-y-4">
              {/* Category Badge */}
              <span className="inline-block text-xs uppercase tracking-[0.15em] text-green-700 font-semibold bg-green-100 px-2 py-1 rounded">
                {product.category}
              </span>

              {/* Product Name */}
              <h3 id="gallery-title" className="font-display text-2xl text-gray-900 tracking-wide">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                  Especificações
                </span>
                <p className="text-gray-800 font-medium">{product.specs}</p>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                  Preço
                </span>
                <span className="text-green-700 font-bold text-2xl">
                  R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* CTA Button */}
              <Link to="/orcamento" className="block" onClick={onClose}>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2">
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
