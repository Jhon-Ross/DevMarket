# DevMarket — Tecnologias

## Em Uso (atual)
- `Next.js 16` (app router). APIs em `route.ts` (Node runtime), com revalidação.
- `React` + `TypeScript` em todo o monorepo.
- `Sanity` (CMS) — schemas `userProfile`, ações de moderação e webhooks.
- `pnpm` workspaces; qualidade com `eslint`, `prettier` e `husky` (pre-commit/push).
- Deploy target: `Vercel`/Node (planejado). Dev local com `npm run dev` em `apps/web`.
- `Prisma` — migração `20251104004453_init` criada (evolução futura de dados relacionais).

## Integrações já implementadas
- Upload de `avatar` e `capa` via APIs (`/api/profile/avatar`, `/api/profile/hero`).
- Webhook de revalidação (Sanity → Next) para `perfil/[slug]`.
- Endpoint debug (`/api/debug/profile/[slug]`) para inspeção de payloads.

## Planejadas (produção)
- Autenticação consolidada (ex.: `next-auth`) com RBAC básico.
- `Stripe` (pagamentos, planos e monetização de features).
- `CI/CD` com GitHub Actions: lint, build, testes, preview e deploy.
- Observabilidade: logs estruturados, tracing, métricas e alertas.
- Monitoramento de erros: Sentry.
- CDN/Images tuning e cache-control com revalidação automática.

## Convenções e Padrões
- Commits semânticos, PRs pequenos e objetivos.
- Hooks `husky` exigem lint/format; proibido quebrar build.
- Pastas estáveis: `apps/*` e `packages/*` isolam responsabilidades e reutilização.