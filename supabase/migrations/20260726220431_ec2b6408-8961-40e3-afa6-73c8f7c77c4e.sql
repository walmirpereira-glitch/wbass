
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Status enum for submissions
CREATE TYPE public.submissao_status AS ENUM ('pendente', 'aprovado', 'correcao');

-- Submissions table
CREATE TABLE public.quem_usa_submissoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  banda TEXT NOT NULL,
  estilo TEXT NOT NULL,
  modelo_caixa TEXT NOT NULL,
  depoimento TEXT NOT NULL,
  foto_url TEXT NOT NULL,
  link_social TEXT NOT NULL,
  termo_aceito BOOLEAN NOT NULL DEFAULT false,
  status public.submissao_status NOT NULL DEFAULT 'pendente',
  motivo_recusa TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.quem_usa_submissoes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quem_usa_submissoes TO authenticated;
GRANT ALL ON public.quem_usa_submissoes TO service_role;

ALTER TABLE public.quem_usa_submissoes ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved
CREATE POLICY "Public can view approved submissions"
  ON public.quem_usa_submissoes FOR SELECT TO anon, authenticated
  USING (status = 'aprovado');

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit"
  ON public.quem_usa_submissoes FOR INSERT TO anon, authenticated
  WITH CHECK (
    termo_aceito = true
    AND status = 'pendente'
    AND motivo_recusa IS NULL
    AND length(nome) BETWEEN 2 AND 120
    AND length(banda) BETWEEN 1 AND 120
    AND length(estilo) BETWEEN 1 AND 80
    AND length(modelo_caixa) BETWEEN 1 AND 80
    AND length(depoimento) BETWEEN 10 AND 1500
    AND length(email) BETWEEN 5 AND 200
    AND length(link_social) BETWEEN 5 AND 300
    AND length(foto_url) BETWEEN 5 AND 500
  );

-- Admins can see all
CREATE POLICY "Admins can view all submissions"
  ON public.quem_usa_submissoes FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
  ON public.quem_usa_submissoes FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
  ON public.quem_usa_submissoes FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_quem_usa_updated_at
  BEFORE UPDATE ON public.quem_usa_submissoes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for the quem-usa-fotos bucket (bucket created via tool)
CREATE POLICY "Public read quem-usa-fotos"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'quem-usa-fotos');

CREATE POLICY "Anyone can upload quem-usa-fotos"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'quem-usa-fotos');

CREATE POLICY "Admins can delete quem-usa-fotos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'quem-usa-fotos' AND public.has_role(auth.uid(), 'admin'));
