---

kanban-plugin: board

---

## DevMarket — Kanban



## Backlog

- [ ] Implementar Storybook em `packages/ui` (opcional)
- [ ] Analytics básico de perfil (pageviews)
- [ ] Busca por tags/skills
- [ ] Página de listagem de devs com filtros
- [ ] Landing page marketing (copy + CTA)
- [ ] Configurar ESLint/Prettier/Husky/lint-staged
- [ ] Validar `.env` com `zod` em `packages/lib`
- [ ] Inicializar Sanity Studio e definir `userProfile`/`project`
- [ ] Criar Prisma schema (`User`, `Subscription`) e migrations
- [ ] Integrar NextAuth (providers email/credentials) e páginas de login


## Sprint 0 — Fundações ✅

- [x] Criar monorepo com `apps/web`, `packages/ui`, `packages/sanity`, `packages/lib`, `packages/types`, `packages/config`
- [x] Configurar TypeScript estrito e aliases (`@/*`, `@ui/*`, `@sanity/*`, `@lib/*`, `@types/*`)
- [x] Definir tokens de design e tema Light/Dark base
- [x] Implementar Next.js 16 com App Router e TypeScript
- [x] Configurar pnpm workspace e estrutura de monorepo
- [x] Criar homepage DevMarket com design system aplicado
- [x] Implementar CSS custom properties para design tokens


## Sprint 1 — Perfil Público

- [ ] Implementar leitura GROQ do `userProfile`
- [ ] Página pública de perfil com ISR + revalidação por webhook Sanity
- [ ] CRUD de perfil (server actions) com token do Sanity (somente servidor)
- [ ] Componentes UI: `Avatar`, `Tag`, `Card`, `Section`
- [ ] Otimização de imagens (`next/image` + transforms do Sanity)


## Sprint 2 — Projetos & Mídia

- [ ] CRUD de `project` (título, descrição, media, techTags, isPublic)
- [ ] Upload de imagens para Sanity Assets
- [ ] Integração de vídeo (Cloudflare Stream/Mux) e metadados no Sanity
- [ ] Página de projeto público (SSG/ISR)
- [ ] `MediaGallery` e `Grid` no design system


## Sprint 3 — Pagamentos

- [ ] Stripe Checkout (assinatura Pro)
- [ ] Webhook Stripe para reconciliar `Subscription` no Postgres
- [ ] Gating de features Pro (limites e destaques)
- [ ] Páginas de conta/assinatura (status e gerenciamento)


## Sprint 4 — Hardening & QA

- [ ] Testes unitários (Vitest/Jest) e e2e (Playwright)
- [ ] Rate limit, CORS e cabeçalhos de segurança
- [ ] Logs, métricas e monitoramento de custos
- [ ] CI/CD (GitHub Actions) e revisão de performance


## Em Progresso

- [ ] Configurar ESLint/Prettier/Husky para qualidade de código

## Em Revisão

- [x] Implementar sistema de navegação e layout base
  - Consolidado App Router (remoção de `src/pages/`)
  - Cabeçalho com links: `/`, `/ui-preview`, `/projetos`, `/perfil/[slug]`
  - Migrada UI Preview para `src/app/ui-preview/page.tsx`
  - Placeholders criados: `projetos` e `perfil/[slug]`

## Concluído

- [x] Navegação e layout base implementados (release 0.1.1 — 2025-11-02)

### Concluído — 2025-11-02

- [x] Atualizado `.gitignore` e validado build do `apps/web` (Next.js 16)
- [x] Tipagem estrita "async props" aplicada em `apps/web/src/app/perfil/[slug]/page.tsx`
- [x] ISR básico configurado em `perfil/[slug]` (`revalidate = 60` e `generateStaticParams` vazio)
- [x] Criado pacote `@devmarket/sanity` (client + queries) com `tsconfig` e build para `dist`
- [x] Criado pacote `@devmarket/types` com tipo `Perfil` e build para `dist`
- [x] Corrigidos erros TypeScript no monorepo:
  - TS2307: imports relativos `./client`/`./queries` — ajustado para ESM com extensão `.js`
  - TS2688: tipos `react`/`react-dom` ausentes — fixado `types: ["node"]` nos `tsconfig` dos pacotes
  - TS2303/TS2459: conflito por alias `@sanity/*` — removido alias do `tsconfig.base.json` e instalada `typescript` no workspace


## Concluído

- [x] Estrutura do monorepo (revisão de aliases e configurações)
- [x] Design system e tokens CSS (validação de acessibilidade)
- [x] Estrutura completa do monorepo criada
- [x] Next.js 16 configurado com TypeScript e App Router
- [x] Design tokens e tema Light/Dark implementados
- [x] Homepage DevMarket funcional
- [x] Servidor de desenvolvimento rodando
- [x] Aliases TypeScript configurados (@/*, @ui/*, @lib/*, etc.)
- [x] pnpm workspace configurado
- [x] Criar componentes UI base em `packages/ui` (Button, Card, Avatar, Tag, Grid, MediaGallery)
- [x] Integrar `@devmarket/ui` ao `apps/web` com `transpilePackages` e página de preview `/ui-preview`
- [x] Ajuste do botão em estado `loading` (spinner inline e formato circular)




%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[true,null,null,true,true,true,true]}
```
%%