import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import contactShowcase from "@/assets/contact-showcase.jpg";

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "(12) 97408-1582",
    href: "https://wa.me/5512974081582",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contato@wbasscabinets.com",
    href: "mailto:contato@wbasscabinets.com",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "São José dos Campos, SP - Brasil",
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/wbass_cabinets/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/wbass.cabinets.2025", label: "Facebook" },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
              Fale Conosco
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-8 tracking-wide">
              ENTRE EM
              <span className="text-primary block">CONTATO</span>
            </h2>
            <div className="w-16 h-1 bg-primary mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Não encontrou o modelo ideal ou ficou com alguma dúvida técnica? Nossa equipe está à disposição para ajudar você a escolher o cabinet perfeito para o seu som. Entre em contato agora para tirar dúvidas ou solicitar um orçamento personalizado.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-gray-900 font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-gray-900 font-medium">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-4">
                Siga-nos
              </span>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Showcase Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                src={contactShowcase} 
                alt="Wbass Cabinet com baixo" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form 
              action="https://formspree.io/f/xaqjpzaa" 
              method="POST"
              target="_self"
              className="space-y-5 bg-gray-50 p-8 rounded-lg border border-gray-200"
            >
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium block mb-2">
                  Nome Completo
                </label>
                <input 
                  type="text"
                  name="name"
                  placeholder="Seu nome completo" 
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:border-primary focus:outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium block mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  placeholder="seu@email.com" 
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:border-primary focus:outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium block mb-2">
                  Telefone
                </label>
                <input 
                  type="tel"
                  name="phone"
                  placeholder="(00) 00000-0000" 
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:border-primary focus:outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium block mb-2">
                  Mensagem
                </label>
                <textarea 
                  name="message"
                  rows={5}
                  placeholder="Conte-nos sobre sua necessidade..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:border-primary focus:outline-none resize-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <Button 
                type="submit"
                variant="wbassFilled"
                size="lg"
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
