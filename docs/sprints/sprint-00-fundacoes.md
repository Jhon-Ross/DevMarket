# Sprint 0 — Fundações (1 semana)

Objetivo
- Preparar o monorepo, ambientes, schemas essenciais do Sanity e base de autenticação.

Critérios de aceitação
- Monorepo com apps/pacotes estruturados e scripts funcionando.
- Sanity Studio operacional com `userProfile` e `project`.
- Prisma conectado ao Postgres, migrations aplicadas.
- NextAuth ativo com fluxo básico de login.
- Lint, type-check e hooks de commit funcionando.

Plano passo a passo
1) Criar monorepo
   - `apps/web`, `apps/studio`, `packages/ui`, `packages/sanity`, `packages/lib`, `packages/types`, `packages/config`.
2) Configurar TypeScript estrito e aliases
   - `tsconfig` base em `packages/config`; incluir `paths` para `@ui/*`, `@sanity/*`, `@lib/*`, `@types/*`.
3) ESLint/Prettier/Husky
   - Adicionar regras Next/TS, formatar repo e hooks de pre-commit.
4) `.env` e validação
   - Implementar verificação com `zod` em `packages/lib/env.ts`.
5) Sanity Studio
   - Inicializar projeto Sanity com dataset `production`.
   - Criar schemas: `userProfile` e `project`.
6) Prisma/DB
   - Modelos `User` e `Subscription`; aplicar migrations.
7) NextAuth
   - Configurar providers (email/credentials), rota de login/logout, proteção básica.
8) Documentação
   - Atualizar Kanban e checklist de release.

Entregáveis
- Monorepo funcional, Sanity Studio com schemas, DB migrado, Auth básico.

Riscos
- Integração inicial quebrar builds: mitigar com Turborepo e caches.

Continua em:
[[sprint-01-perfil-publico]]