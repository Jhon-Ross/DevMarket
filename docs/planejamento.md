# DevMarket — Planejamento

## Objetivos

- Perfil público confiável, edição completa (avatar, capa, bio, skills, links).
- Publicação moderada via Studio com revalidação automática.
- Base para conteúdos (posts/cases) e monetização (pagamentos).

## Roadmap (Macro)

- Fase 1: Perfil público sólido e UX de edição (em andamento).
- Fase 2: Conteúdos (posts/cases) e grid de projetos (planejado).
- Fase 3: Pagamentos e planos (planejado).
- Fase 4: Hardening e QA; observabilidade e CI/CD (planejado).

## Entregas Próximas (2–4 semanas)

- UI de upload de capa no `Meu Perfil` com preview, erros e loading.
- Validações de Perfil e UX refinado (skills/links/bio).
- Setup inicial de CI/CD (lint, build, teste) e pipeline de preview.

## Critérios de Aceite

- Perfil público renderiza avatar e capa com revalidação funcionando.
- Uploads (avatar/capa) possuem preview, erros claros e logs no dev.
- Pipelines de CI/CD executam sem falhas e bloqueiam merges quebrados.

## Riscos e Mitigações

- Tokens/segredos: armazenar em `.env.local` e variáveis do provedor.
- Performance de imagens: usar CDN e políticas de cache/revalidação.
- Mudanças de schema: manter migrações e back-compat quando possível.

## Frentes de Trabalho

- Feed social
  - Modelar posts (projeto, vídeo, update, vaga/evento) e relações no Prisma.
  - Interações: likes, comentários, compartilhamentos; ranking por relevância/popularidade.
  - Endpoints: CRUD de posts e interações; filtros (área/tecnologia/relevância).
  - UI: página do feed com listagem, filtros e componentes de interação.
- Perfis modulares
  - Completar “Meu Perfil”: certificações, experiências, contribuições, tema visual e visibilidade por seção.
  - Persistência de preferências de tema/layout; refinar UX e validações.
- Tipos de perfil e RBAC
  - Autenticação (ex.: `next-auth`) e roles (usuário/empresa/admin).
  - Recursos para Empresa: publicação de vagas, eventos e anúncios.
  - Policies de acesso nas APIs e no Studio.
- Planos e pagamentos
  - Stripe (produtos, preços, faturas, webhooks) e gating por plano.
  - UI de planos e gestão de assinaturas; destaque no feed e métricas.
- Insights e métricas
  - Instrumentar page views, alcance, engajamento, cliques.
  - Modelos Prisma para métricas e agregações; painel de insights por perfil.
- Notificações e chat
  - Definir provider de tempo real (Socket.IO/Pusher/Supabase Realtime).
  - Modelos de mensagens/threads e notificações; UI de inbox/toasts.
- Arquitetura e dados
  - Fronteira Sanity (perfil/moderação) vs Prisma (feed/engajamento/métricas).
  - Webhooks para revalidação de perfis; jobs/fila para ranking e analytics.
  - Observabilidade (Sentry, logs estruturados) e CI/CD com testes.

## Ordem de Implementação

1. Autenticação + RBAC básico; finalizar “Meu Perfil” (capa/tema/visibilidade).
2. Modelar feed e interações no Prisma; endpoints e UI do feed com filtros.
3. Integrar Stripe e planos; gating de funcionalidades e webhooks.
4. Instrumentar insights/métricas; painel inicial de visualizações e engajamento.
5. Notificações e chat: protótipo com provider escolhido.
6. Paralelo contínuo: CI/CD, Sentry, padrões de PR e documentação de segredos.

## Backlog de APIs e Modelos (Prisma)

- Tabelas: `Post`, `PostType`, `PostMedia`, `Like`, `Comment`, `Share`, `Follow`.
- Métricas: `ProfileMetric` (views, reach, engagement), `PostMetric`.
- Endpoints: `/api/feed` (GET/POST), `/api/feed/[id]` (GET/PATCH/DELETE),
  `/api/feed/[id]/like`, `/api/feed/[id]/comment`, `/api/feed/[id]/share`.
- Pagamentos: `/api/billing/checkout`, `/api/billing/webhook`.

## Marcos e Entregas

- M1: Perfil funcional completo com avatar/capa e revalidação.
- M2: Feed básico com criação e listagem de posts.
- M3: Interações (likes/comentários/compartilhamentos) e ranking simples.
- M4: Planos e Stripe em produção com webhooks confiáveis.
- M5: Painel de insights e métricas básicas.
- M6: Notificações/chat prototipado; revisão de UX geral.
