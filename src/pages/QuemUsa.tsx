import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { supabase } from "@/integrations/supabase/client";
import { getSignedFotoUrl } from "@/lib/quemUsaStorage";
import { Button } from "@/components/ui/button";

interface PartnerCard {
  id: string;
  nome: string;
  banda: string;
  estilo: string;
  modelo_caixa: string;
  depoimento: string;
  link_social: string;
  fotoUrl: string | null;
}

const QuemUsa = () => {
  const [cards, setCards] = useState<PartnerCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("quem_usa_submissoes")
        .select("id, nome, banda, estilo, modelo_caixa, depoimento, link_social, foto_url")
        .eq("status", "aprovado")
        .order("created_at", { ascending: false });
      const rows = data ?? [];
      const withSigned = await Promise.all(
        rows.map(async (r) => ({
          id: r.id,
          nome: r.nome,
          banda: r.banda,
          estilo: r.estilo,
          modelo_caixa: r.modelo_caixa,
          depoimento: r.depoimento,
          link_social: r.link_social,
          fotoUrl: await getSignedFotoUrl(r.foto_url),
        }))
      );
      setCards(withSigned);
      setLoading(false);
    })();
  }, []);

  return (
    <PageWrapper>
      <section className="py-16 px-6 lg:px-12 container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-foreground mb-4">
            Quem Usa Wbass
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Músicos, bandas e artistas que confiam no timbre Wbass Cabinets. Faça parte dessa história.
          </p>
          <Link to="/quem-usa/cadastro">
            <Button size="lg" className="btn-glow bg-primary text-white uppercase tracking-wider font-bold">
              Quero fazer parte
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Carregando...</p>
        ) : cards.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Seja o primeiro a compartilhar sua experiência com a Wbass.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-primary/20 transition-all"
              >
                {c.fotoUrl && (
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={c.fotoUrl}
                      alt={`${c.nome} - ${c.banda}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-heading text-xl font-black text-primary">{c.nome}</h3>
                    <p className="text-sm text-muted-foreground">{c.banda} · {c.estilo}</p>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-foreground/80">
                    Caixa Wbass: <span className="font-bold">{c.modelo_caixa}</span>
                  </p>
                  <blockquote className="text-sm text-foreground/90 italic border-l-2 border-primary pl-3">
                    "{c.depoimento}"
                  </blockquote>
                  <a
                    href={c.link_social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Rede social <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export default QuemUsa;
