# Setup de Ambiente (Windows)

Pré-requisitos
- Node.js LTS instalado
- Gerenciador de pacotes (`pnpm` recomendado)
- Git configurado
- Conta no Sanity e Stripe
- Banco Postgres gerenciado (Neon/Supabase/Railway)

Passo a passo inicial
1) Criar monorepo com `apps` e `packages` conforme planejamento.
2) Adicionar TypeScript estrito e `tsconfig` base em `packages/config`.
3) Instalar e configurar ESLint/Prettier/Husky/lint-staged.
4) Inicializar Sanity Studio (`apps/studio`) e criar schemas `userProfile` e `project`.
5) Configurar `packages/sanity` com cliente de leitura e helpers GROQ.
6) Criar Prisma schema (`prisma/schema.prisma`) com `User`/`Subscription`; aplicar migrations.
7) Configurar NextAuth e páginas de login em `apps/web`.
8) Validar `.env` com util em `packages/lib/env.ts`.

Variáveis de ambiente (exemplo)
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`

Observações
- Tokens do Sanity usados apenas no servidor (nunca no cliente).
- Use ISR com webhooks para reduzir custos e manter conteúdo fresco.