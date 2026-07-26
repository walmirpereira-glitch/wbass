import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { allProducts } from "@/data/products";
import { QUEM_USA_BUCKET } from "@/lib/quemUsaStorage";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(200),
  banda: z.string().trim().min(1, "Informe a banda/projeto").max(120),
  estilo: z.string().trim().min(1, "Informe o estilo").max(80),
  modelo_caixa: z.string().trim().min(1, "Escolha o modelo").max(80),
  depoimento: z.string().trim().min(10, "Depoimento muito curto").max(1500),
  link_social: z.string().trim().url("Link inválido").max(300),
});

const TERMO =
  "Autorizo o uso da minha imagem, nome, banda e das fotos enviadas para fins de divulgação comercial e institucional pela Wbass Cabinets em seu site oficial e redes sociais.";

const QuemUsaCadastro = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [termo, setTermo] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    banda: "",
    estilo: "",
    modelo_caixa: "",
    depoimento: "",
    link_social: "",
  });

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!termo) {
      toast.error("Você precisa aceitar o termo de uso de imagem.");
      return;
    }
    if (!foto) {
      toast.error("Envie uma foto sua com o equipamento.");
      return;
    }
    if (!foto.type.startsWith("image/")) {
      toast.error("O arquivo enviado precisa ser uma imagem.");
      return;
    }
    if (foto.size > 5 * 1024 * 1024) {
      toast.error("A imagem precisa ter no máximo 5 MB.");
      return;
    }

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos.");
      return;
    }

    setSubmitting(true);
    try {
      const ext = foto.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(QUEM_USA_BUCKET)
        .upload(path, foto, { contentType: foto.type, upsert: false });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("quem_usa_submissoes").insert({
        nome: parsed.data.nome,
        email: parsed.data.email,
        banda: parsed.data.banda,
        estilo: parsed.data.estilo,
        modelo_caixa: parsed.data.modelo_caixa,
        depoimento: parsed.data.depoimento,
        link_social: parsed.data.link_social,
        foto_url: path,
        termo_aceito: true,
      });
      if (insErr) throw insErr;

      toast.success("Cadastro enviado! Aguarde a aprovação da equipe Wbass.");
      navigate("/quem-usa");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar cadastro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-2">
            Quero fazer parte
          </h1>
          <p className="text-muted-foreground mb-8">
            Preencha o formulário abaixo. Após aprovação, seu perfil aparecerá na página "Quem Usa".
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 bg-card p-6 rounded-2xl border border-border">
            <div>
              <Label className="text-foreground">Nome completo / artístico *</Label>
              <Input value={form.nome} onChange={handleChange("nome")} className="text-gray-900 placeholder:text-gray-400" required />
            </div>
            <div>
              <Label className="text-foreground">E-mail de contato *</Label>
              <Input type="email" value={form.email} onChange={handleChange("email")} className="text-gray-900 placeholder:text-gray-400" required />
            </div>
            <div>
              <Label className="text-foreground">Banda / Projeto *</Label>
              <Input value={form.banda} onChange={handleChange("banda")} className="text-gray-900 placeholder:text-gray-400" required />
            </div>
            <div>
              <Label className="text-foreground">Estilo musical *</Label>
              <Input value={form.estilo} onChange={handleChange("estilo")} placeholder="Ex: Rock, Gospel, Jazz..." className="text-gray-900 placeholder:text-gray-400" required />
            </div>
            <div>
              <Label className="text-foreground">Modelo da caixa Wbass *</Label>
              <select
                value={form.modelo_caixa}
                onChange={handleChange("modelo_caixa")}
                className="w-full h-10 px-3 rounded-md border border-input bg-white text-gray-900"
                required
              >
                <option value="">Selecione um modelo</option>
                {allProducts.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-foreground">Depoimento sobre o timbre *</Label>
              <Textarea value={form.depoimento} onChange={handleChange("depoimento")} rows={5} className="text-gray-900 placeholder:text-gray-400" required />
            </div>
            <div>
              <Label className="text-foreground">Foto sua com o equipamento *</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
                className="text-gray-900"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Máx. 5 MB.</p>
            </div>
            <div>
              <Label className="text-foreground">Link de rede social *</Label>
              <Input type="url" value={form.link_social} onChange={handleChange("link_social")} placeholder="https://instagram.com/seuperfil" className="text-gray-900 placeholder:text-gray-400" required />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border">
              <Checkbox id="termo" checked={termo} onCheckedChange={(v) => setTermo(v === true)} className="mt-1" />
              <label htmlFor="termo" className="text-sm text-foreground leading-relaxed cursor-pointer">
                {TERMO}
              </label>
            </div>

            <Button type="submit" disabled={submitting} className="w-full btn-glow bg-primary text-white font-bold uppercase tracking-wider">
              {submitting ? "Enviando..." : "Enviar cadastro"}
            </Button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
};

export default QuemUsaCadastro;
