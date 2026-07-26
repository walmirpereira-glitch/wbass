## Visão Geral

Nova seção "Quem Usa" com página pública, formulário de cadastro e painel administrativo protegido por login para aprovar/reprovar envios.

## 1. Backend (Lovable Cloud)

**Storage:** bucket público `quem-usa-fotos` para armazenar as fotos enviadas.

**Tabela `quem_usa_submissoes`:**
- nome, banda, estilo, modelo_caixa, depoimento
- foto_url, link_social
- termo_aceito (bool)
- status: `pendente` | `aprovado` | `correcao`
- motivo_recusa (texto, preenchido pelo admin)
- email de contato (para o parceiro receber o motivo caso precise ajustar)

**RLS:**
- Qualquer visitante (anon) pode INSERIR (formulário público).
- Qualquer visitante pode LER apenas linhas com `status = 'aprovado'` (página pública).
- Apenas usuários com role `admin` podem ler tudo, atualizar status e apagar.

**Tabela `user_roles` + enum `app_role`** e função `has_role()` (padrão seguro, sem recursão).

## 2. Autenticação Admin

- Ativar auth email/senha na Lovable Cloud (sem confirmação por email para agilizar o acesso do admin).
- Rota `/admin/login` com formulário simples.
- Rota `/admin/quem-usa` protegida — só acessível a quem tem role `admin`.
- Após você criar sua conta na primeira vez, eu te oriento a rodar um comando rápido para promover seu usuário a `admin` (feito uma única vez).

## 3. Página Pública `/quem-usa`

- Lista em cards responsivos (foto, nome, banda, estilo, modelo Wbass, depoimento, link social).
- Só mostra aprovados, ordenados do mais recente pro mais antigo.
- Link no menu principal do Header (entre "Vídeos" e "Garantia").

## 4. Formulário Público `/quem-usa/cadastro`

Campos:
- Nome completo/artístico *
- Email de contato * (para receber o motivo se precisar corrigir)
- Banda/Projeto *
- Estilo musical *
- Modelo da caixa Wbass * (select com os modelos do catálogo)
- Depoimento sobre o timbre * (textarea)
- Upload de foto com o equipamento * (imagem, até ~5MB)
- Link de rede social *
- Checkbox obrigatório com o texto exato do termo de uso de imagem

Validação com Zod, sanitização, mensagem de sucesso ("Cadastro enviado, aguarde aprovação").

## 5. Painel Admin `/admin/quem-usa`

- Lista todos os envios com filtro por status (Pendente / Aprovado / Necessita correção).
- Cada card mostra todos os dados enviados + foto.
- Botões: **Aprovar**, **Solicitar correção** (abre modal com campo de motivo obrigatório), **Excluir**.
- Ao aprovar → aparece imediatamente na página pública.
- Ao solicitar correção → salva o motivo no registro (fica visível pro admin; envio ao parceiro por email fica como próxima etapa opcional, já que hoje o site usa Formspree).

## Detalhes técnicos

- Stack existente: React + Vite + Tailwind + shadcn + react-router-dom.
- Backend via Lovable Cloud (Supabase) com RLS + roles.
- Upload direto do cliente pro Storage (bucket público, path randomizado).
- Rota admin protegida via componente wrapper que checa sessão + role.
- Sem alterar o restante do site (Header ganha apenas o link "Quem Usa").

## Ordem de execução

1. Migração: enum, `user_roles`, `has_role`, `quem_usa_submissoes`, políticas, grants.
2. Bucket de storage.
3. Página pública + card component.
4. Formulário público com upload.
5. Login admin + guard de rota.
6. Painel admin com ações aprovar/corrigir/excluir.
7. Link no Header + rotas no App.tsx.
8. Instruções pra você criar a conta admin e eu promover a role.
