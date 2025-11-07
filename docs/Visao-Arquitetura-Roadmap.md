# DevMarket — Visão, Arquitetura e Roadmap

Este README consolida a visão, estado atual, tecnologias, planejamento e extras do projeto DevMarket em um único documento.

## Visão Geral

- Plataforma para que desenvolvedores apresentem portfólio, perfil e projetos, com validação e publicação moderada.
- A experiência começa com perfis públicos de alta qualidade e evolui para conteúdos (posts/cases) e monetização.

### Propósito

- Ser o ponto de encontro central da comunidade tech, conectando perfis (profissionais/empresas), projetos, vagas, eventos e conteúdo técnico.

### Público-Alvo

- Desenvolvedores, designers, analistas, QAs, devops, estudantes e freelancers.
- Startups, empresas e recrutadores do setor de tecnologia.
- Escolas, universidades e instituições promotoras de eventos/formações.

### Problema e Solução

- Problema: perfis técnicos raramente têm vitrine consistente e verificável, consolidando habilidades e trabalhos.
- Solução: perfil público unificado + CMS (Sanity) com moderação e revalidação automática.

### Diferenciais

- Publicação moderada e revalidada em tempo real via webhooks.
- Base tecnológica moderna (Next 16 + Sanity) e monorepo com compartilhamento de UI/Tipos.
- Roadmap claro para monetização, reputação e criação de conteúdo.

### Principais Funcionalidades (visão)

- Feed social interativo com posts de projetos, vídeos, atualizações e anúncios.
- Perfis ricos e customizáveis: bio, tecnologias, projetos com mídia, certificações/experiências, temas visuais.
- Tipos de perfil: Profissional (exibir e crescer) e Empresa (vagas/eventos/anúncios).
- Planos e benefícios: Free, Pro e Topzera.

### Escopo Atual

- Perfil público com avatar, capa, bio, links e skills.
- CMS no Studio para criar/editar e moderar `userProfile`.
- Endpoints de avatar e capa, com revalidação do perfil por `slug`.

### Escopo Final (Objetivo)

- Perfis completos com projetos e conteúdos (posts/cases), SEO e compartilhamento.
- Monetização via pagamentos, reputação e métricas.
- Observabilidade, CI/CD robusto e experiência de edição refinada.

## Arquitetura (Monorepo pnpm)

- `apps/web`: Next.js 16 (app router), páginas `perfil/[slug]` e `perfil/meu`, rotas API.
- `apps/studio`: Sanity Studio, schemas de `userProfile` e ações de moderação.
- `packages/ui`: componentes compartilhados (design system base).
- `packages/types`: tipos compartilhados (ex.: `UserProfile`, `Link`, `Project`).
- `packages/sanity`: cliente Sanity e utilitários de build/query.
- `packages/lib`: funções utilitárias e helpers de integração.
- `prisma/`: migrações e schema (planejado para futuras features).
- `scripts/`: automações (ex.: atualização de changelog).

### Evolução de Dados e Integração

- Sanity (CMS) segue como fonte para `userProfile` e metadados moderados.
- Prisma evolui para posts e interações sociais (likes, comentários, compartilhamentos) e métricas.
- Webhooks Sanity → Next revalidam perfis; futuramente, filas/cron para ranking e insights.

## Estado Atual

### Visão de Funcionalidades

- Perfil público (`/perfil/[slug]`) carregando `userProfile` por `slug` via query.
- Upload de avatar (`/api/profile/avatar`), com preview na UI de `Meu Perfil`.
- Upload de capa (`/api/profile/hero`) implementado na API, sincroniza por `slug` e revalida a página.
- Endpoint de debug (`/api/debug/profile/[slug]`) para inspeção de `heroUrl`, `avatarUrl` e metadados.

### Linha do Tempo (resumo)

- Sprint 00 — Fundação do monorepo (pnpm), ESLint/Prettier, Husky e estrutura de apps/packages.
- Sprint 01 — Página de perfil público e query por `slug`; início da UI do `Meu Perfil`.
- Nov 2025 — Migração Prisma `20251104004453_init` adicionada (base para evolução).
- Nov 2025 — APIs de upload (avatar/capa) e webhook de revalidação Sanity → Next.
- Nov 2025 — Rota de debug criada e bug resolvido (Next 16: `params` Promise `await`).

### Em Andamento

- UI de upload da capa no `Meu Perfil` (preview, estados de erro/carregamento).
- Ajustes de UX no Perfil e validações.

### Infra e Qualidade

- Monorepo pnpm estável; Husky com hooks de lint/format e pre-push.
- Studio/Sanity com schemas e ações de moderação; webhooks de revalidação.

### Pendências Prioritárias

- Integração de pagamentos (planejamento, protótipos e segurança).
- Pipelines de CI/CD (lint, build, test, preview e deploy) para produção.

## Tecnologias

### Em Uso (atual)

- `Next.js 16` (app router). APIs em `route.ts` (Node runtime), com revalidação.
- `React` + `TypeScript` em todo o monorepo.
- `Sanity` (CMS) — schemas `userProfile`, ações de moderação e webhooks.
- `pnpm` workspaces; qualidade com `eslint`, `prettier` e `husky` (pre-commit/push).
- Deploy target: `Vercel`/Node (planejado). Dev local com `npm run dev` em `apps/web`.
- `Prisma` — migração `20251104004453_init` criada (evolução futura de dados relacionais).

### Integrações já implementadas

- Upload de `avatar` e `capa` via APIs (`/api/profile/avatar`, `/api/profile/hero`).
- Webhook de revalidação (Sanity → Next) para `perfil/[slug]`.
- Endpoint debug (`/api/debug/profile/[slug]`) para inspeção de payloads.

### Planejadas (produção)

- Autenticação consolidada (ex.: `next-auth`) com RBAC básico.
- `Stripe` (pagamentos, planos e monetização de features).
- `CI/CD` com GitHub Actions: lint, build, testes, preview e deploy.
- Observabilidade: logs estruturados, tracing, métricas e alertas.
- Monitoramento de erros: Sentry.
- CDN/Images tuning e cache-control com revalidação automática.

### Convenções e Padrões

- Commits semânticos, PRs pequenos e objetivos.
- Hooks `husky` exigem lint/format; proibido quebrar build.
- Pastas estáveis: `apps/*` e `packages/*` isolam responsabilidades e reutilização.

## Planejamento

### Objetivos

- Perfil público confiável, edição completa (avatar, capa, bio, skills, links).
- Publicação moderada via Studio com revalidação automática.
- Base para conteúdos (posts/cases) e monetização (pagamentos).

### Roadmap (Macro)

- Fase 1: Perfil público sólido e UX de edição (em andamento).
- Fase 2: Conteúdos (posts/cases) e grid de projetos (planejado).
- Fase 3: Pagamentos e planos (planejado).
- Fase 4: Hardening e QA; observabilidade e CI/CD (planejado).

### Entregas Próximas (2–4 semanas)

- UI de upload de capa no `Meu Perfil` com preview, erros e loading.
- Validações de Perfil e UX refinado (skills/links/bio).
- Setup inicial de CI/CD (lint, build, teste) e pipeline de preview.

### Critérios de Aceite

- Perfil público renderiza avatar e capa com revalidação funcionando.
- Uploads (avatar/capa) possuem preview, erros claros e logs no dev.
- Pipelines de CI/CD executam sem falhas e bloqueiam merges quebrados.

### Riscos e Mitigações

- Tokens/segredos: armazenar em `.env.local` e variáveis do provedor.
- Performance de imagens: usar CDN e políticas de cache/revalidação.
- Mudanças de schema: manter migrações e back-compat quando possível.

### Frentes de Trabalho

- Feed social: modelagem de posts, interações, endpoints e UI com filtros.
- Perfis modulares: concluir “Meu Perfil” com certificações/experiências/tema/visibilidade.
- Tipos e RBAC: autenticação (`next-auth`) e roles; recursos de Empresa.
- Planos e pagamentos: Stripe, webhooks e gating de features.
- Insights e métricas: instrumentação de cliques, views e engajamento.
- Notificações e chat: provider em tempo real, modelos e UI.
- Arquitetura e dados: fronteira Sanity vs Prisma, webhooks e jobs.

### Ordem de Implementação

1. Autenticação + RBAC básico; finalizar “Meu Perfil” (capa/tema/visibilidade).
2. Modelar feed e interações no Prisma; endpoints e UI do feed com filtros.
3. Integrar Stripe e planos; gating de funcionalidades e webhooks.
4. Instrumentar insights/métricas; painel inicial de visualizações e engajamento.
5. Notificações e chat: protótipo com provider escolhido.
6. Paralelo contínuo: CI/CD, Sentry, padrões de PR e documentação de segredos.

## Extras

### Como Rodar

- Web: `cd apps/web && npm run dev` (Next 16, porta padrão 3000).
- Studio: `cd apps/studio && npm run dev` (Sanity Studio).

### Segredos e Variáveis

- Token de escrita do Sanity para uploads (avatar/capa).
- Variáveis para webhooks de revalidação e autenticação.
- Armazenar em `.env.local` e provedor de deploy (ex.: Vercel) com acesso mínimo.

### Troubleshooting

- Capa não aparece: checar `GET /api/debug/profile/[slug]` → `heroUrl`.
- Se `heroUrl` for `null`, refazer upload em `/perfil/meu` e recarregar.
- Ver logs do dev ao abrir `/perfil/[slug]` (status 200 indica render OK).
- Next 16: atenção ao `params` em rotas (pode ser Promise, usar `await`).

### Convenções de Contribuição

- PRs curtos, foco em uma feature/bug; descrição objetiva.
- Commits semânticos; lint/format obrigatório (Husky bloqueia se falhar).
- Respeitar padrões de estrutura e evitar side-effects entre packages.

### Obsidian Kanban

- Arquivo: `docs/kanban/devmarket-kanban.md` com `kanban-plugin: true`.
- Colunas: A Fazer, Em Progresso, Em Revisão, Concluídas.
- Arraste e solte os cards; sem checkboxes para manter visual limpo.
