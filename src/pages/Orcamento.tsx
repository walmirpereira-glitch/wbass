import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Send, Plus, Minus, Crown, Zap, FileText, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  specs: string;
  line: "premium" | "easy";
}

const products: Product[] = [
  // Linha Premium
  {
    id: "210d",
    name: "Wbass 210D",
    description: "2 falantes Italianos em neodímio de 10\" + driver",
    price: 5602.08,
    specs: "400W RMS | 8 ohms",
    line: "premium",
  },
  {
    id: "210dp",
    name: "Wbass 210DP",
    description: "2 falantes Italianos em neodímio de 10\" + driver",
    price: 5781.60,
    specs: "500W RMS | 4 ohms",
    line: "premium",
  },
  {
    id: "212d",
    name: "Wbass 212D",
    description: "2 falantes Italianos em neodímio de 12\" + driver",
    price: 6429.72,
    specs: "700W RMS | 4 ohms",
    line: "premium",
  },
  {
    id: "410dp",
    name: "Wbass 410DP",
    description: "4 falantes Italianos em neodímio de 10\" + driver",
    price: 7102.22,
    specs: "800W RMS | 4 ohms",
    line: "premium",
  },
  {
    id: "112d",
    name: "Wbass 112D",
    description: "1 falante Italiano em neodímio de 12\" + driver",
    price: 5516.28,
    specs: "350W RMS | 4 ou 8 ohms",
    line: "premium",
  },
  {
    id: "112nd",
    name: "Wbass 112ND",
    description: "1 falante Italiano em neodímio de 12\", sem driver",
    price: 4329.60,
    specs: "350W RMS | 4 ou 8 ohms",
    line: "premium",
  },
  {
    id: "115d",
    name: "Wbass 115D",
    description: "1 falante Italiano em neodímio de 15\" + driver",
    price: 5760.48,
    specs: "400W RMS | 8 ohms",
    line: "premium",
  },
  {
    id: "115nd",
    name: "Wbass 115ND",
    description: "1 falante Italiano em neodímio de 15\", sem driver",
    price: 4590.96,
    specs: "400W RMS | 8 ohms",
    line: "premium",
  },
  // Linha Easy
  {
    id: "easy-1x10d",
    name: "Wbass Easy 1x10D",
    description: "1 falante 10\" em ferrite nacional + driver",
    price: 2599.00,
    specs: "300W RMS | 4 ou 8 ohms",
    line: "easy",
  },
  {
    id: "easy-2x10d",
    name: "Wbass Easy 2x10D",
    description: "2 falantes 10\" em ferrite nacional + driver",
    price: 3499.96,
    specs: "500W RMS | 4 ou 8 ohms",
    line: "easy",
  },
  {
    id: "easy-1x12d",
    name: "Wbass Easy 1x12D",
    description: "1 falante 12\" em ferrite nacional + driver",
    price: 2992.00,
    specs: "400W RMS | 4 ou 8 ohms",
    line: "easy",
  },
  {
    id: "easy-1x12nd",
    name: "Wbass Easy 1x12ND",
    description: "1 falante 12\" em ferrite nacional, sem driver",
    price: 2502.08,
    specs: "400W RMS | 4 ou 8 ohms",
    line: "easy",
  },
];

const premiumProducts = products.filter((p) => p.line === "premium");
const easyProducts = products.filter((p) => p.line === "easy");

interface CartItem {
  product: Product;
  quantity: number;
}

const Orcamento = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    rua: "",
    numero: "",
    cep: "",
    cidade: "",
    estado: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Atenção",
        description: "Por favor, selecione pelo menos um produto.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const produtosTextoSubmit = cart.map((item) => 
      `${item.product.name} (${item.product.line === 'premium' ? 'Premium' : 'Easy'}) - Qtd: ${item.quantity} - R$ ${(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    ).join(' | ');

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('cpf', formData.cpf);
    formDataToSend.append('rua', formData.rua);
    formDataToSend.append('numero', formData.numero);
    formDataToSend.append('cep', formData.cep);
    formDataToSend.append('cidade', formData.cidade);
    formDataToSend.append('estado', formData.estado);
    formDataToSend.append('produtos', produtosTextoSubmit);
    formDataToSend.append('total', `R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`);
    formDataToSend.append('_subject', 'Novo Orçamento Wbass');

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
          title: "Orçamento enviado com sucesso!",
          description: "Entraremos em contato em breve com sua proposta.",
        });
        // Limpar formulário e carrinho
        setFormData({
          nome: "",
          email: "",
          cpf: "",
          rua: "",
          numero: "",
          cep: "",
          cidade: "",
          estado: "",
        });
        setCart([]);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderProductCard = (product: Product) => {
    const isPremium = product.line === "premium";
    
    return (
      <div
        key={product.id}
        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
          isInCart(product.id)
            ? isPremium
              ? "border-primary bg-primary/10"
              : "border-primary/70 bg-primary/5"
            : isPremium
              ? "border-primary/30 bg-background/50 hover:border-primary/60"
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
        <div className="flex-1 min-w-0">
          <label
            htmlFor={product.id}
            className="font-semibold text-foreground cursor-pointer flex items-center gap-2 flex-wrap"
          >
            {product.name}
            {isPremium && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            )}
          </label>
          <p className="text-sm text-muted-foreground truncate">
            {product.description}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {product.specs}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-primary font-bold">
            R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        {isInCart(product.id) && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, -1)}
              className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">
              {getQuantity(product.id)}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, 1)}
              className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
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
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Caso opte por finalizar sua compra, preencha o formulário abaixo selecionando o produto desejado. 
                Em seguida, enviaremos a proposta oficial com as especificações da caixa escolhida, prazos de entrega e dados para pagamento.
              </p>
            </div>

            {/* Formulário com AJAX */}
            <form onSubmit={handleSubmit}>
              {/* Client Form */}
              <div className="bg-secondary/30 p-8 rounded-lg border border-border mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Seus Dados
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      CPF para Transportadora *
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      Rua *
                    </label>
                    <input
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={(e) => handleInputChange("rua", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="Nome da rua"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      Número *
                    </label>
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={(e) => handleInputChange("numero", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      CEP *
                    </label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={(e) => handleInputChange("cep", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="00000-000"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange("cidade", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="Sua cidade"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3 font-medium">
                      Estado *
                    </label>
                    <input
                      type="text"
                      name="estado"
                      value={formData.estado}
                      onChange={(e) => handleInputChange("estado", e.target.value)}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground"
                      placeholder="SP"
                    />
                  </div>
                </div>
              </div>


              {/* Products Selection - Premium */}
              <div className="bg-secondary/30 p-8 rounded-lg border border-primary/30 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Crown className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Linha Premium
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Falantes Italianos em neodímio • Ultra leve • Som moderno
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {premiumProducts.map(renderProductCard)}
                </div>
              </div>

              {/* Products Selection - Easy */}
              <div className="bg-secondary/30 p-8 rounded-lg border border-border mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Zap className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Linha Easy
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Falantes nacionais em ferrite • Custo-benefício • Som vintage
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {easyProducts.map(renderProductCard)}
                </div>
              </div>

              {/* Summary and Submit */}
              <div className="bg-charcoal p-8 rounded-lg border border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">
                      {cart.length} produto(s) selecionado(s)
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      Total:{" "}
                      <span className="text-primary">
                        R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </p>
                  </div>
                  <Button
                    type="submit"
                    variant="wbassFilled"
                    size="xl"
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Orçamento
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orcamento;
