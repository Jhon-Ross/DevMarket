# DevMarket — Estado Atual

## Visão de Funcionalidades
- Perfil público (`/perfil/[slug]`) carregando `userProfile` por `slug` via query.
- Upload de avatar (`/api/profile/avatar`), com preview na UI de `Meu Perfil`.
- Upload de capa (`/api/profile/hero`) implementado na API, sincroniza por `slug` e revalida a página.
- Endpoint de debug (`/api/debug/profile/[slug]`) para inspecionar `heroUrl`, `avatarUrl` e metadados.

## Linha do Tempo (resumo)
- Sprint 00 — Fundação do monorepo (pnpm), ESLint/Prettier, Husky e estrutura de apps/packages.
- Sprint 01 — Página de perfil público e query por `slug`; início da UI do `Meu Perfil`.
- Nov 2025 — Migração Prisma `20251104004453_init` adicionada (base para evolução).
- Nov 2025 — APIs de upload (avatar/capa) e webhook de revalidação Sanity → Next.
- Nov 2025 — Rota de debug criada e bug resolvido (Next 16: `params` Promise `await`).

## Em Andamento
- UI de upload da capa no `Meu Perfil` (preview, estados de erro/carregamento).
- Ajustes de UX no Perfil e validações.

## Infra e Qualidade
- Monorepo pnpm estável; Husky com hooks de lint/format e pre-push.
- Studio/Sanity com schemas e ações de moderação; webhooks de revalidação.

## Pendências Prioritárias
- Integração de pagamentos (planejamento, protótipos e segurança).
- Pipelines de CI/CD (lint, build, test, preview e deploy) para produção.