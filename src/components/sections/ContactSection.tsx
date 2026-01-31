import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('_subject', 'Nova mensagem de contato Wbass');

    try {
      const response = await fetch('https://formspree.io/f/xaqjpzaa', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Entraremos em contato em breve.",
        });
        // Limpar formulário
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error('Erro ao enviar');
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-28 lg:py-36 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-5 block font-semibold">
              Fale Conosco
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-10 font-bold">
              ENTRE EM
              <span className="text-primary block">CONTATO</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-10 rounded-full" />
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Não encontrou o modelo ideal ou ficou com alguma dúvida técnica? Nossa equipe está à disposição para ajudar você a escolher o cabinet perfeito para o seu som. Entre em contato agora para tirar dúvidas ou solicitar uma proposta personalizada.
            </p>

            {/* Contact Details */}
            <div className="space-y-7 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50 shadow-sm">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-1.5">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-gray-900 font-semibold hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-gray-900 font-semibold">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-5">
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
                    className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Showcase Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-xl"
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
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-50 p-10 rounded-2xl border border-gray-200 shadow-lg"
            >
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-semibold block mb-3">
                  Nome Completo
                </label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo" 
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-semibold block mb-3">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com" 
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-semibold block mb-3">
                  Telefone
                </label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(00) 00000-0000" 
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-gray-900 placeholder:text-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-600 font-semibold block mb-3">
                  Mensagem
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  placeholder="Conte-nos sobre sua necessidade..."
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary focus:outline-none resize-none text-gray-900 placeholder:text-gray-400 transition-colors"
                />
              </div>

              <Button 
                type="submit"
                variant="wbassFilled"
                size="lg"
                className="w-full rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
