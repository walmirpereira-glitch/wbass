
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;

-- Rewrite policies to use private.has_role
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can view all submissions" ON public.quem_usa_submissoes;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.quem_usa_submissoes;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.quem_usa_submissoes;
CREATE POLICY "Admins can view all submissions" ON public.quem_usa_submissoes
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update submissions" ON public.quem_usa_submissoes
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete submissions" ON public.quem_usa_submissoes
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can delete quem-usa-fotos" ON storage.objects;
CREATE POLICY "Admins can delete quem-usa-fotos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'quem-usa-fotos' AND private.has_role(auth.uid(), 'admin'::public.app_role));

-- Drop the public-facing function
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
