import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Phone } from "lucide-react";

const Garantia = () => {
  return (
    <div className="min-h-screen bg-white">
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Garantia
              </h1>
              <p className="text-lg text-gray-600">
                Compromisso com a qualidade e satisfação do cliente
              </p>
            </div>

            {/* Main warranty text */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                A Wbass garante seus produtos contra defeitos de matéria-prima e fabricação por{" "}
                <span className="font-semibold text-primary">12 meses</span>, exceto conforme especificado abaixo.
              </p>
            </div>

            {/* Exclusions */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Condições que a garantia não é coberta
                </h2>
              </div>

              <p className="text-gray-700 mb-6">
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
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to get warranty service */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Como Obter Serviço de Garantia
                </h2>
              </div>
              <p className="text-gray-700">
                Se sua caixa necessita de reparos, não hesite contatar a Wbass Cabinets.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/#contact";
                }}
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
