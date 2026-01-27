import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Phone } from "lucide-react";
import { useEffect } from "react";

const Garantia = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
                Wbass Cabinets
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight tracking-wide">
                GARANTIA
              </h1>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-gray-600">
                Compromisso com a qualidade e satisfação do cliente
              </p>
            </div>

            {/* Main warranty text */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl text-gray-900 tracking-wide">Cobertura</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                A Wbass garante seus produtos contra defeitos de matéria-prima e fabricação por{" "}
                <span className="font-semibold text-primary">12 meses</span>, exceto conforme especificado abaixo.
              </p>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="font-display text-xl text-gray-900 tracking-wide">
                  Condições não cobertas
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Defeitos em qualquer produto da Wbass Cabinets em que a identificação do número de série tenha sido apagada, modificado ou removido.
              </p>

              <h3 className="font-semibold text-gray-900 mb-4">Os itens abaixo não são cobertos:</h3>
              
              <ul className="space-y-3">
                {[
                  "Defeitos causados ​​por uso indevido, acidente ou abuso",
                  "Defeitos causados ​​pela modificação do produto ou negligência",
                  "Defeitos causados ​​por transporte",
                  "Defeitos decorrentes de reparos por pessoa não autorizada pela Wbass Cabinets"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to get warranty service */}
            <div className="bg-primary/10 rounded-lg border border-primary/30 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl text-gray-900 tracking-wide">
                  Como Obter Serviço de Garantia
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Se sua caixa necessita de reparos, não hesite contatar a Wbass Cabinets.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:underline"
              >
                Entre em contato conosco
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Garantia;
