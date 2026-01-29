import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import heroInicio1 from "@/assets/hero-inicio1.jpg";
import heroInicio2 from "@/assets/hero-inicio2.jpg";
import heroVideo from "@/assets/hero-video.mp4";

// Gallery images
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";
import gallery5 from "@/assets/gallery/gallery-5.jpg";
import gallery6 from "@/assets/gallery/gallery-6.jpg";
import gallery7 from "@/assets/gallery/gallery-7.jpg";
import gallery8 from "@/assets/gallery/gallery-8.jpg";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];

const heroSlides = [
  {
    type: "image" as const,
    media: heroInicio1,
    title: "MELHOR PERFORMANCE",
    subtitle: "PARA OS GRAVES...",
  },
  {
    type: "image" as const,
    media: heroInicio2,
    title: "QUALIDADE",
    subtitle: "COMPROVADA!",
  },
  {
    type: "video" as const,
    media: heroVideo,
    title: "DESENVOLVIMENTO",
    subtitle: "COM TECNOLOGIA!",
  },
];

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  
  // Shuffle gallery images on mount
  const shuffledGallery = useMemo(() => shuffleArray(galleryImages), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % shuffledGallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [shuffledGallery.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section id="hero" className="relative w-full">
      {/* Hero Carousel - Full width image */}
      <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {slide.type === "video" ? (
              <video
                src={slide.media}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={slide.media}
                alt={`Wbass Cabinets - ${slide.title}`}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Quilter Labs style */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/90 hover:bg-background rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/90 hover:bg-background rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide
                  ? "bg-background scale-125"
                  : "bg-background/50 hover:bg-background/80"
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CTA Section below hero - Quilter Labs style */}
      <div className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 tracking-wide"
          >
            CAIXAS DE SOM PARA <span className="text-primary">CONTRABAIXO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Tecnologia de ponta para entregar o timbre perfeito que seu contrabaixo precisa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#products">
              <Button 
                size="xl" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                Ver Produtos
              </Button>
            </a>
            <a href="#about">
              <Button 
                variant="outline" 
                size="xl"
                className="border-border text-foreground hover:bg-muted font-semibold px-8"
              >
                Saiba Mais
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* About Wbass Section with Gallery */}
      <div className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-foreground text-lg leading-relaxed">
                O projeto Wbass cabinets foi concebido para uma excelente performance em apresentações ao vivo, seja o setup de baixa ou alta potência somado a uma ótima portabilidade e opções de vários modelos que irão de encontro com sua necessidade.
              </p>
              <p className="text-foreground text-lg leading-relaxed">
                Ser ouvido é um dilema para muitos baixistas, a portabilidade e bons timbres não combinavam. Após alguns anos de pesquisa chegamos aos nossos modelos atuais e para quem usa um set padrão mais pesado 4×10 e 1×15 vai se surpreender com nossos modelos compactos e potentes.
              </p>
              <p className="text-foreground text-lg leading-relaxed">
                Todas as caixas são montadas manualmente com rigoroso processo de qualidade.
              </p>
              <p className="text-foreground text-lg leading-relaxed font-medium">
                A Wbass Cabinets não monta apenas alto-falantes em caixas acústicas, somos baixistas que projetamos caixas para baixistas.
              </p>
              <p className="text-primary text-xl font-semibold">
                Temos a melhor relação custo benefício.
              </p>

              {/* Benefits */}
              <div className="pt-6">
                <h3 className="text-foreground font-semibold text-lg mb-4">A WBASS proporciona:</h3>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                    Alta performance
                  </span>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                    Excelente timbre
                  </span>
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                    Ótima portabilidade
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentGalleryIndex}
                    src={shuffledGallery[currentGalleryIndex]}
                    alt="Wbass Cabinet em uso"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Gallery indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {shuffledGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentGalleryIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentGalleryIndex
                          ? "bg-primary scale-125"
                          : "bg-background/70 hover:bg-background"
                      }`}
                      aria-label={`Ver foto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
