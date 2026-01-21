import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Av. Paulista, 1000 - São Paulo, SP",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 (11) 99999-9999",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contato@luxe.com.br",
  },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
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
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
              Entre em Contato
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
              Estamos à Sua
              <span className="text-gradient-gold block">Disposição</span>
            </h2>
            <div className="divider-gold mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Nossa equipe de especialistas está pronta para ajudá-lo a encontrar 
              a peça perfeita. Agende uma visita em nossa boutique para uma 
              experiência personalizada.
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
                  <div className="w-12 h-12 border border-primary/30 rounded-sm flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                      {item.label}
                    </span>
                    <span className="text-foreground">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="w-12 h-12 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Como podemos ajudá-lo?"
                />
              </div>
              <Button variant="luxuryFilled" size="xl" className="w-full mt-8">
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}