import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { getSignedFotoUrl } from "@/lib/quemUsaStorage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ExternalLink, LogOut } from "lucide-react";

type Status = "pendente" | "aprovado" | "correcao";

interface Row {
  id: string;
  nome: string;
  email: string;
  banda: string;
  estilo: string;
  modelo_caixa: string;
  depoimento: string;
  link_social: string;
  foto_url: string;
  status: Status;
  motivo_recusa: string | null;
  created_at: string;
  fotoSigned?: string | null;
}

const STATUS_LABEL: Record<Status, string> = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  correcao: "Necessita correção",
};

const AdminQuemUsa = () => {
  const navigate = useNavigate();
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<Status | "todos">("pendente");
  const [loading, setLoading] = useState(true);
  const [correcaoTarget, setCorrecaoTarget] = useState<Row | null>(null);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    if (!authLoading && (!session || !isAdmin)) navigate("/admin/login");
  }, [authLoading, session, isAdmin, navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quem_usa_submissoes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Erro ao carregar cadastros.");
      setLoading(false);
      return;
    }
    const withSigned = await Promise.all(
      (data ?? []).map(async (r) => ({ ...r, fotoSigned: await getSignedFotoUrl(r.foto_url) }))
    );
    setRows(withSigned as Row[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const filtered = filter === "todos" ? rows : rows.filter((r) => r.status === filter);

  const aprovar = async (r: Row) => {
    const { error } = await supabase
      .from("quem_usa_submissoes")
      .update({ status: "aprovado", motivo_recusa: null })
      .eq("id", r.id);
    if (error) return toast.error("Erro ao aprovar.");
    toast.success(`${r.nome} aprovado.`);
    load();
  };

  const solicitarCorrecao = async () => {
    if (!correcaoTarget) return;
    if (motivo.trim().length < 5) {
      toast.error("Descreva o motivo (mín. 5 caracteres).");
      return;
    }
    const { error } = await supabase
      .from("quem_usa_submissoes")
      .update({ status: "correcao", motivo_recusa: motivo.trim() })
      .eq("id", correcaoTarget.id);
    if (error) return toast.error("Erro ao salvar.");
    toast.success("Correção solicitada.");
    setCorrecaoTarget(null);
    setMotivo("");
    load();
  };

  const excluir = async (r: Row) => {
    if (!confirm(`Excluir cadastro de ${r.nome}?`)) return;
    const { error } = await supabase.from("quem_usa_submissoes").delete().eq("id", r.id);
    if (error) return toast.error("Erro ao excluir.");
    toast.success("Cadastro excluído.");
    load();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Carregando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl font-black text-foreground">Admin · Quem Usa</h1>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {(["pendente", "aprovado", "correcao", "todos"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                filter === s
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-foreground border-border hover:border-primary"
              }`}
            >
              {s === "todos" ? "Todos" : STATUS_LABEL[s]} · {s === "todos" ? rows.length : rows.filter((r) => r.status === s).length}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">Nenhum cadastro nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl overflow-hidden">
                {r.fotoSigned && (
                  <img src={r.fotoSigned} alt={r.nome} className="w-full h-56 object-cover" />
                )}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading font-black text-lg text-foreground">{r.nome}</h3>
                      <p className="text-sm text-muted-foreground">{r.banda} · {r.estilo}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      r.status === "aprovado" ? "bg-primary/20 text-primary" :
                      r.status === "correcao" ? "bg-destructive/20 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>{STATUS_LABEL[r.status]}</span>
                  </div>
                  <div className="text-sm space-y-1 text-foreground/90">
                    <p><strong>E-mail:</strong> {r.email}</p>
                    <p><strong>Caixa:</strong> {r.modelo_caixa}</p>
                    <p><strong>Depoimento:</strong> <em>"{r.depoimento}"</em></p>
                    <a href={r.link_social} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                      Rede social <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {r.motivo_recusa && (
                    <div className="text-xs p-2 rounded bg-destructive/10 text-destructive">
                      <strong>Motivo enviado:</strong> {r.motivo_recusa}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button size="sm" onClick={() => aprovar(r)} className="bg-primary text-white">Aprovar</Button>
                    <Button size="sm" variant="outline" onClick={() => { setCorrecaoTarget(r); setMotivo(r.motivo_recusa ?? ""); }}>
                      Solicitar correção
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => excluir(r)}>Excluir</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!correcaoTarget} onOpenChange={(o) => { if (!o) { setCorrecaoTarget(null); setMotivo(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar correção</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Descreva o motivo ou o ajuste necessário para {correcaoTarget?.nome}.
          </p>
          <Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={5} className="text-gray-900" />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCorrecaoTarget(null); setMotivo(""); }}>Cancelar</Button>
            <Button onClick={solicitarCorrecao} className="bg-primary text-white">Salvar motivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminQuemUsa;
