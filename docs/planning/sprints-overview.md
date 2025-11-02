# DevMarket — Visão Geral de Sprints

Objetivo: entregar um MVP com Sanity (conteúdo) + Next.js + Prisma/Stripe (transacional), evoluindo em sprints curtas e focadas.

Linha do tempo sugerida
- Sprint 0 (1 semana): Fundação do projeto, ambientes, schemas básicos do Sanity.
- Sprint 1 (2 semanas): Perfil público (CRUD Sanity) + página SSR/SSG/ISR.
- Sprint 2 (2 semanas): CRUD de projetos + mídia (imagens/vídeo).
- Sprint 3 (1–2 semanas): Pagamentos e assinaturas (Stripe), gating de features Pro.
- Sprint 4 (2 semanas): Hardening, QA, testes, segurança, CI/CD.

Entregáveis por sprint
- Incremento funcional com critérios de aceitação claros.
- Documentos atualizados (sprint plan + kanban).
- Checklist de release atendido e custos atualizados.

Critérios de sucesso gerais
- Sanity como fonte de conteúdo público.
- Usuários/assinaturas no Postgres/Prisma.
- Páginas públicas com SEO (SSG/ISR) e webhooks do Sanity para revalidação.
- Stripe para monetização, com reconcílio por webhook.