import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+55 (00) 99999-9999",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contato@wbasscabinets.com.br",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "São Paulo, SP - Brasil",
  },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 lg:py-32 bg-charcoal relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-y-1/2" />

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
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 tracking-wide">
              SOLICITE SEU
              <span className="text-gradient-green block">ORÇAMENTO</span>
            </h2>
            <div className="divider-green mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Entre em contato conosco para tirar dúvidas, solicitar orçamento ou 
              conhecer mais sobre nossos produtos. Nossa equipe está pronta para 
              ajudar você a encontrar o cabinet perfeito para seu som.
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
                  <div className="w-12 h-12 border border-primary/30 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                      {item.label}
                    </span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-4">
                Siga-nos
              </span>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="w-12 h-12 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6 bg-secondary/30 p-8 rounded-lg border border-border">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                  Produto de Interesse
                </label>
                <select
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                >
                  <option value="">Selecione um produto</option>
                  <option value="wb112">WB 112 - Compacto</option>
                  <option value="wb210">WB 210 - Versátil</option>
                  <option value="wb410">WB 410 - Profissional</option>
                  <option value="wb115">WB 115 - Graves Profundos</option>
                  <option value="outro">Outro / Personalizado</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Conte-nos sobre sua necessidade..."
                />
              </div>
              <Button variant="wbassFilled" size="xl" className="w-full mt-4">
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}