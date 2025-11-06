# DevMarket — Extras

## Como Rodar
- Web: `cd apps/web && npm run dev` (Next 16, porta padrão 3000).
- Studio: `cd apps/studio && npm run dev` (Sanity Studio).

## Segredos e Variáveis
- Token de escrita do Sanity para uploads (avatar/capa).
- Variáveis para webhooks de revalidação e autenticação.
- Armazenar em `.env.local` e provedor de deploy (ex.: Vercel) com acesso mínimo.

## Troubleshooting
- Capa não aparece: checar `GET /api/debug/profile/[slug]` → `heroUrl`.
- Se `heroUrl` for `null`, refazer upload em `/perfil/meu` e recarregar.
- Ver logs do dev ao abrir `/perfil/[slug]` (status 200 indica render OK).
- Next 16: atenção ao `params` em rotas (pode ser Promise, usar `await`).

## Convenções de Contribuição
- PRs curtos, foco em uma feature/bug; descrição objetiva.
- Commits semânticos; lint/format obrigatório (Husky bloqueia se falhar).
- Respeitar padrões de estrutura e evitar side-effects entre packages.

## Obsidian Kanban
- Arquivo: `docs/kanban/devmarket-kanban.md` com `kanban-plugin: true`.
- Colunas: A Fazer, Em Progresso, Em Revisão, Concluídas.
- Arraste e solte os cards; sem checkboxes para manter visual limpo.