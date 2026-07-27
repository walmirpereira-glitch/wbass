
-- Drop the view (linter flagged security definer view)
DROP VIEW IF EXISTS public.quem_usa_aprovados;

-- Restore public row policy for approved submissions
CREATE POLICY "Public can view approved submissions"
ON public.quem_usa_submissoes
FOR SELECT
TO anon, authenticated
USING (status = 'aprovado');

-- Use column-level grants to hide email from anon (only admins/authenticated app queries see it)
REVOKE SELECT ON public.quem_usa_submissoes FROM anon;
GRANT SELECT (id, nome, banda, estilo, modelo_caixa, depoimento, link_social, foto_url, status, created_at, updated_at, termo_aceito)
  ON public.quem_usa_submissoes TO anon;
