import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Zap, AlertTriangle, Gauge, Volume2 } from "lucide-react";
import dicasUso1 from "@/assets/dicas/dicas-uso-1.jpg";
import dicasUso2 from "@/assets/dicas/dicas-uso-2.jpg";

const DicasDeUso = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 tracking-wide">
              DICAS DE <span className="text-primary">USO</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Aprenda a extrair o máximo do seu equipamento com segurança e qualidade sonora.
            </p>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={dicasUso1} 
                alt="Baixista usando equipamento Wbass em apresentação ao vivo" 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={dicasUso2} 
                alt="Portabilidade do equipamento Wbass" 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Section 1: O Equilíbrio Perfeito */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-gray-900 tracking-wide">
                  O Equilíbrio Perfeito: Potência do Amplificador vs. Capacidade da Caixa
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-600">
                <div className="bg-white p-6 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">O Mito da Potência Igual</h3>
                  <p className="leading-relaxed">
                    Muitos acreditam que um amplificador de 500W deve ser usado com uma caixa de exatos 500W. 
                    Na verdade, a relação ideal é um pouco diferente. Para garantir que seu timbre tenha "headroom" 
                    (folga) e que seus alto-falantes trabalhem com segurança, siga estas diretrizes:
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 2: A Regra da Folga */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Gauge className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-gray-900 tracking-wide">
                  1. A Regra da Folga (Segurança e Timbre)
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed font-medium text-gray-900">
                  O ideal é que o seu amplificador tenha entre 20% a 50% a mais de potência (Watts RMS) 
                  do que a caixa suporta.
                </p>
                <p className="leading-relaxed">
                  O amplificador com 50% da potência da caixa vai funcionar, porém se a banda tocar muito 
                  alto pode faltar punch em alguns momentos.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">
                    <strong>Por quê?</strong> Um amplificador mais potente trabalhando "folgado" entrega um sinal limpo. 
                    Um amplificador fraco sendo forçado ao máximo gera distorção harmônica (clipping), que é a 
                    principal causa de queima de falantes, muito mais do que o excesso de potência real.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Impedância */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-gray-900 tracking-wide">
                  2. Atenção à Impedância (Ohms)
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  A potência do seu amplificador muda conforme a carga da caixa:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Se o seu cabeçote entrega 500W em 4 Ohms, ele entregará aproximadamente 250W-300W em 8 Ohms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Sempre verifique:</strong> Antes de ligar, garanta que a impedância da caixa (ou do conjunto de caixas) não seja menor do que o mínimo suportado pelo seu amplificador.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Se você ligar seu amplificador em duas caixas de 4 ohms, a impedância geral cairá para 2 ohms e provavelmente terá problemas.</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 4: O Ouvido é o Melhor Guia */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-gray-900 tracking-wide">
                  3. O Ouvido é o seu Melhor Guia
                </h2>
              </div>
              
              <div className="text-gray-600">
                <p className="leading-relaxed">
                  Independente dos números, o alto-falante dá sinais físicos. Se você ouvir estalos, um som "quadrado" 
                  ou perceber que o cone está excursionando (pulando) excessivamente sem ganho de volume, diminua o 
                  ganho imediatamente. <strong>Potência RMS é calor; excesso de calor derrete a bobina.</strong>
                </p>
              </div>
            </motion.section>

            {/* Tabela de Recomendações */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary/5 rounded-xl p-8 border border-primary/20"
            >
              <h2 className="font-display text-xl md:text-2xl text-gray-900 tracking-wide mb-6 text-center">
                Tabela de Recomendações
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary/30">
                      <th className="py-3 px-4 text-left font-semibold text-gray-900">Se sua caixa Wbass é</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-900">Recomendamos Amplificadores de:</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="py-4 px-4 font-medium text-gray-900">350W RMS</td>
                      <td className="py-4 px-4 text-gray-600">350W a 500W RMS</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-4 font-medium text-gray-900">400W RMS</td>
                      <td className="py-4 px-4 text-gray-600">500W a 600W RMS</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-4 font-medium text-gray-900">800W RMS</td>
                      <td className="py-4 px-4 text-gray-600">800W a 1000W RMS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Section: Entenda o Limite */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-red-50 rounded-xl p-8 border border-red-200"
            >
              <h2 className="font-display text-xl md:text-2xl text-gray-900 tracking-wide mb-6">
                Entenda o Limite do Seu Equipamento
              </h2>
              
              <div className="space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  A potência RMS de uma caixa Wbass indica quanto calor a bobina suporta. No entanto, o movimento 
                  do cone (excursão) tem um limite físico. Quando você leva o amplificador ao volume máximo e 
                  adiciona um "boost" excessivo de graves (frequências baixas), você está exigindo duas coisas perigosas:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-5 border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-2">Excursão Mecânica Excessiva</h3>
                    <p className="text-sm">
                      As frequências graves movem muito ar. Ao colocar o grave no máximo, o cone pode atingir 
                      o limite físico do chassi (bater no fundo), causando danos permanentes à suspensão e 
                      à centragem do alto-falante.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-2">Saturação do Sinal (Onda Quadrada)</h3>
                    <p className="text-sm">
                      Ao forçar o volume e o grave no máximo, o amplificador para de enviar uma onda senoidal 
                      limpa e passa a enviar uma "onda quadrada". Isso não é mais música; é corrente contínua 
                      disfarçada de som, que frita a bobina em poucos minutos.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DicasDeUso;
