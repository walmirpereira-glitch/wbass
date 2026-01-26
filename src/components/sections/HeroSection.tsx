import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroInicio1 from "@/assets/hero-inicio1.jpg";
import heroInicio2 from "@/assets/hero-inicio2.jpg";

const heroSlides = [
  {
    image: heroInicio1,
    title: "MELHOR PERFORMANCE",
    subtitle: "PARA OS GRAVES...",
  },
  {
    image: heroInicio2,
    title: "QUALIDADE",
    subtitle: "COMPROVADA!",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
            <img
              src={slide.image}
              alt={`Wbass Cabinets - ${slide.title}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Quilter Labs style */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CTA Section below hero - Quilter Labs style */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 tracking-wide"
          >
            CAIXAS DE SOM PARA <span className="text-primary">CONTRABAIXO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8"
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
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
              >
                Ver Produtos
              </Button>
            </a>
            <a href="#about">
              <Button 
                variant="outline" 
                size="xl"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-8"
              >
                Saiba Mais
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
