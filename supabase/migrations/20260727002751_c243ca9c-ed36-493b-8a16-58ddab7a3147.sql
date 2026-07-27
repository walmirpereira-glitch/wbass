
-- 1) Hide email from public reads by creating a safe view and removing public row policy
DROP POLICY IF EXISTS "Public can view approved submissions" ON public.quem_usa_submissoes;

CREATE OR REPLACE VIEW public.quem_usa_aprovados
WITH (security_invoker = false) AS
SELECT id, nome, banda, estilo, modelo_caixa, depoimento, link_social, foto_url, created_at
FROM public.quem_usa_submissoes
WHERE status = 'aprovado';

GRANT SELECT ON public.quem_usa_aprovados TO anon, authenticated;

-- 2) Tighten storage bucket policies for quem-usa-fotos
DROP POLICY IF EXISTS "Public read quem-usa-fotos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload quem-usa-fotos" ON storage.objects;

CREATE POLICY "Restricted upload quem-usa-fotos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'quem-usa-fotos'
  AND position('/' in name) = 0
  AND lower(regexp_replace(name, '^.*\.', '')) IN ('jpg','jpeg','png','webp')
);

-- 3) Restrict has_role execution to authenticated only (needed by RLS); revoke from anon/public
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
