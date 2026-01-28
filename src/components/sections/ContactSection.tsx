import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    value: "São Paulo, SP - Brasil",
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/wbass_cabinets/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/wbass.cabinets.2025", label: "Facebook" },
];

const formSchema = z.object({
  nomeCompleto: z.string().trim().min(1, "Nome completo é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "Email deve ter no máximo 255 caracteres"),
  telefone: z.string().trim().min(1, "Telefone é obrigatório").max(20, "Telefone inválido"),
  enderecoCompleto: z.string().trim().min(1, "Endereço completo é obrigatório").max(300, "Endereço deve ter no máximo 300 caracteres"),
  cpf: z.string().trim().min(11, "CPF inválido").max(14, "CPF inválido"),
  pagamentoAVista: z.boolean().default(false),
  pagamentoParcelado: z.boolean().default(false),
  numeroParcelas: z.string().optional(),
  mensagem: z.string().trim().max(1000, "Mensagem deve ter no máximo 1000 caracteres").optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      telefone: "",
      enderecoCompleto: "",
      cpf: "",
      pagamentoAVista: false,
      pagamentoParcelado: false,
      numeroParcelas: "",
      mensagem: "",
    },
  });

  const pagamentoParcelado = form.watch("pagamentoParcelado");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formaPagamento = data.pagamentoAVista 
        ? "À Vista" 
        : data.pagamentoParcelado 
          ? `Parcelado em ${data.numeroParcelas}x` 
          : "Não especificado";

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nomeCompleto: data.nomeCompleto,
          email: data.email,
          telefone: data.telefone,
          enderecoCompleto: data.enderecoCompleto,
          cpf: data.cpf,
          formaPagamento,
          mensagem: data.mensagem || "",
        },
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
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
              SOLICITE SEU
              <span className="text-primary block">ORÇAMENTO</span>
            </h2>
            <div className="w-16 h-1 bg-primary mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
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
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-1">
                      {item.label}
                    </span>
                    <span className="text-gray-900 font-medium">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-gray-500 block mb-4">
                Siga-nos
              </span>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-gray-50 p-8 rounded-lg border border-gray-200">
                <FormField
                  control={form.control}
                  name="nomeCompleto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium">
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          className="bg-white border-gray-200 focus:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="seu@email.com" 
                            className="bg-white border-gray-200 focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium">
                          Telefone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="(00) 00000-0000" 
                            className="bg-white border-gray-200 focus:border-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="enderecoCompleto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium">
                        Endereço Completo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Rua, número, bairro, cidade, estado" 
                          className="bg-white border-gray-200 focus:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium">
                        CPF para Transportadora
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="000.000.000-00" 
                          className="bg-white border-gray-200 focus:border-primary"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Options */}
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium block mb-3">
                    Forma de Pagamento
                  </span>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="pagamentoAVista"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (checked) {
                                  form.setValue("pagamentoParcelado", false);
                                  form.setValue("numeroParcelas", "");
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm text-gray-700 font-normal cursor-pointer !mt-0">
                            À Vista
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center gap-3 flex-wrap">
                      <FormField
                        control={form.control}
                        name="pagamentoParcelado"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  if (checked) {
                                    form.setValue("pagamentoAVista", false);
                                  } else {
                                    form.setValue("numeroParcelas", "");
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm text-gray-700 font-normal cursor-pointer !mt-0">
                              Parcelado
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      {pagamentoParcelado && (
                        <FormField
                          control={form.control}
                          name="numeroParcelas"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">em até</span>
                              <FormControl>
                                <select
                                  className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                                  {...field}
                                >
                                  <option value="">Selecione</option>
                                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                      {num}x
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <span className="text-sm text-gray-600">vezes</span>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.15em] text-gray-600 font-medium">
                        Mensagem
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4}
                          placeholder="Conte-nos sobre sua necessidade..."
                          className="bg-white border-gray-200 focus:border-primary resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  variant="wbassFilled"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
