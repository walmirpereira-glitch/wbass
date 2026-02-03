import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ProductGalleryModal } from "@/components/sections/ProductGalleryModal";
import { useAutoNavigate } from "@/hooks/useAutoNavigate";
import { getProductById, Product } from "@/data/products";

const Produto = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAutoNavigate(footerRef);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImageIndex(0);
      } else {
        // Product not found, redirect to products page
        navigate("/produtos", { replace: true });
      }
    }
  }, [id, navigate]);

  const handleCloseGallery = () => {
    navigate("/produtos");
  };

  const handleIndexChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ProductsSection />
      </main>
      <Footer ref={footerRef} />

      {/* Product Gallery Modal - shows when product is found */}
      {product && (
        <ProductGalleryModal
          isOpen={true}
          onClose={handleCloseGallery}
          product={product}
          images={product.gallery || []}
          currentIndex={currentImageIndex}
          onIndexChange={handleIndexChange}
        />
      )}
    </div>
  );
};

export default Produto;
