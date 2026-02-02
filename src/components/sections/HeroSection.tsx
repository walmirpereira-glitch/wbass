import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import heroInicio1 from "@/assets/hero-inicio1.jpg";
import heroInicio2 from "@/assets/hero-inicio2.jpg";
import heroVideo from "@/assets/hero-video.mp4";

// Gallery images - Lab photos
import lab1 from "@/assets/gallery/lab-1.jpg";
import lab2 from "@/assets/gallery/lab-2.jpg";
import lab3 from "@/assets/gallery/lab-3.jpg";

const galleryImages = [lab1, lab2, lab3];

const slides = [
  { title: "MELHOR PERFORMANCE", subtitle: "PARA OS GRAVES..." },
  { title: "QUALIDADE", subtitle: "COMPROVADA!" },
  { title: "FEITO POR", subtitle: "BAIXISTAS!" },
];

const heroSlides = [
  { type: "image" as const, media: heroInicio1 },
  { type: "image" as const, media: heroInicio2 },
  { type: "video" as const, media: heroVideo },
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
  const slideText = slides[currentSlide];

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
                alt={`Wbass Cabinets - ${slideText.title}`}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
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

      {/* CTA Section below hero */}
      <div className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 tracking-tight font-bold"
          >
            CAIXAS DE SOM PARA <span className="text-primary">CONTRABAIXO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tecnologia de ponta para entregar o timbre perfeito que seu contrabaixo precisa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link to="/produtos">
              <Button 
                size="xl" 
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 rounded-xl"
              >
                Ver Produtos
              </Button>
            </Link>
            <Link to="/sobre">
              <Button 
                variant="outline" 
                size="xl"
                className="border-border text-foreground hover:bg-muted font-semibold px-10 rounded-xl hover:scale-[1.02] transition-all duration-300"
              >
                Saiba Mais
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* About Wbass Section with Gallery */}
      <div className="bg-muted py-20 md:py-28">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-7"
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
              <p className="text-primary text-xl font-bold">
                Temos a melhor relação custo benefício.
              </p>

              {/* Benefits */}
              <div className="pt-8">
                <h3 className="text-foreground font-bold text-lg mb-5">A WBASS proporciona:</h3>
                <div className="flex flex-wrap gap-4">
                  {["Alta performance", "Excelente timbre", "Ótima portabilidade"].map((benefit) => (
                    <span 
                      key={benefit}
                      className="bg-primary/10 text-primary px-5 py-2.5 rounded-xl font-semibold border border-primary/20"
                    >
                      {benefit}
                    </span>
                  ))}
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
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border border-muted-foreground/10">
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
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentGalleryIndex
                          ? "bg-primary scale-125 shadow-lg"
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
