import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { FileText, Download, Plus, Minus } from "lucide-react";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  specs: string;
}

const products: Product[] = [
  {
    id: "wb112",
    name: "WB 112",
    description: "Cabinet Compacto",
    price: 1890,
    specs: "200W RMS | 1x12\" | 12kg",
  },
  {
    id: "wb210",
    name: "WB 210",
    description: "Cabinet Versátil",
    price: 2490,
    specs: "400W RMS | 2x10\" | 18kg",
  },
  {
    id: "wb410",
    name: "WB 410",
    description: "Cabinet Profissional",
    price: 3290,
    specs: "800W RMS | 4x10\" | 32kg",
  },
  {
    id: "wb115",
    name: "WB 115",
    description: "Graves Profundos",
    price: 2890,
    specs: "500W RMS | 1x15\" | 25kg",
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

const Orcamento = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleProduct = (product: Product, checked: boolean) => {
    if (checked) {
      setCart([...cart, { product, quantity: 1 }]);
    } else {
      setCart(cart.filter((item) => item.product.id !== product.id));
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const isInCart = (productId: string) =>
    cart.some((item) => item.product.id === productId);

  const getQuantity = (productId: string) =>
    cart.find((item) => item.product.id === productId)?.quantity || 0;

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const generatePDF = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os dados de contato.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Nenhum produto selecionado",
        description: "Selecione pelo menos um produto para o orçamento.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let y = 20;

      // Header
      doc.setFillColor(26, 26, 26);
      doc.rect(0, 0, pageWidth, 50, "F");

      doc.setTextColor(80, 200, 120);
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text("WBASS CABINETS", margin, 30);

      doc.setTextColor(150, 150, 150);
      doc.setFontSize(10);
      doc.text("Caixas de Som para Contrabaixo", margin, 40);

      y = 70;

      // Title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("ORÇAMENTO", margin, y);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const date = new Date().toLocaleDateString("pt-BR");
      doc.text(`Data: ${date}`, pageWidth - margin - 40, y);

      y += 20;

      // Client info
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, y - 5, pageWidth - margin * 2, 40, "F");

      doc.setTextColor(80, 200, 120);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("DADOS DO CLIENTE", margin + 5, y + 5);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      y += 15;
      doc.text(`Nome: ${formData.name}`, margin + 5, y);
      y += 7;
      doc.text(`Email: ${formData.email}`, margin + 5, y);
      y += 7;
      doc.text(
        `Telefone: ${formData.phone}${formData.city ? ` | Cidade: ${formData.city}` : ""}`,
        margin + 5,
        y
      );

      y += 25;

      // Products header
      doc.setFillColor(80, 200, 120);
      doc.rect(margin, y - 5, pageWidth - margin * 2, 12, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("PRODUTO", margin + 5, y + 3);
      doc.text("ESPECIFICAÇÕES", margin + 60, y + 3);
      doc.text("QTD", pageWidth - margin - 55, y + 3);
      doc.text("VALOR", pageWidth - margin - 25, y + 3);

      y += 15;

      // Products list
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "normal");

      cart.forEach((item, index) => {
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(margin, y - 5, pageWidth - margin * 2, 12, "F");
        }

        doc.setFont("helvetica", "bold");
        doc.text(item.product.name, margin + 5, y + 2);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(item.product.description, margin + 5, y + 7);
        doc.setFontSize(10);
        doc.text(item.product.specs, margin + 60, y + 2);
        doc.text(item.quantity.toString(), pageWidth - margin - 50, y + 2);
        doc.text(
          `R$ ${(item.product.price * item.quantity).toLocaleString("pt-BR")}`,
          pageWidth - margin - 25,
          y + 2
        );

        y += 15;
      });

      y += 10;

      // Total
      doc.setFillColor(26, 26, 26);
      doc.rect(pageWidth - margin - 80, y - 5, 80, 15, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("TOTAL:", pageWidth - margin - 75, y + 5);
      doc.setTextColor(80, 200, 120);
      doc.text(
        `R$ ${total.toLocaleString("pt-BR")}`,
        pageWidth - margin - 35,
        y + 5
      );

      y += 30;

      // Footer note
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text("Orçamento válido por 15 dias.", margin, y);
      doc.text("Valores sujeitos a alteração sem aviso prévio.", margin, y + 5);
      doc.text("Frete não incluso.", margin, y + 10);

      y += 25;

      // Contact
      doc.setTextColor(80, 200, 120);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Entre em contato:", margin, y);
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "normal");
      doc.text("contato@wbasscabinets.com | WhatsApp: +55 (00) 99999-9999", margin, y + 7);

      // Save
      doc.save(`orcamento-wbass-${Date.now()}.pdf`);

      toast({
        title: "PDF gerado com sucesso!",
        description: "O orçamento foi baixado para seu dispositivo.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-semibold">
                Solicite seu orçamento
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wide">
                MONTE SEU
                <span className="text-gradient-green block">ORÇAMENTO</span>
              </h1>
              <div className="divider-green mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Selecione os produtos desejados, preencha seus dados e gere um
                PDF com seu orçamento personalizado.
              </p>
            </div>

            {/* Client Form */}
            <div className="bg-secondary/30 p-8 rounded-lg border border-border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Seus Dados
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                    Cidade / Estado
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground/50"
                    placeholder="São Paulo, SP"
                  />
                </div>
              </div>
            </div>

            {/* Products Selection */}
            <div className="bg-secondary/30 p-8 rounded-lg border border-border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Selecione os Produtos
              </h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                      isInCart(product.id)
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background/50 hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      id={product.id}
                      checked={isInCart(product.id)}
                      onCheckedChange={(checked) =>
                        toggleProduct(product, checked as boolean)
                      }
                      className="border-primary data-[state=checked]:bg-primary"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={product.id}
                        className="font-semibold text-foreground cursor-pointer"
                      >
                        {product.name}
                        <span className="text-muted-foreground font-normal ml-2">
                          - {product.description}
                        </span>
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {product.specs}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold">
                        R$ {product.price.toLocaleString("pt-BR")}
                      </p>
                    </div>
                    {isInCart(product.id) && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {getQuantity(product.id)}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary and Generate */}
            <div className="bg-charcoal p-8 rounded-lg border border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    {cart.length} produto(s) selecionado(s)
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    Total:{" "}
                    <span className="text-primary">
                      R$ {total.toLocaleString("pt-BR")}
                    </span>
                  </p>
                </div>
                <Button
                  variant="wbassFilled"
                  size="xl"
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {isGenerating ? "Gerando..." : "Gerar PDF do Orçamento"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orcamento;
