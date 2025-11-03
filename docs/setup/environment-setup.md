# Setup de Ambiente (Windows)

Pré-requisitos

- Node.js LTS instalado
- Gerenciador de pacotes (`pnpm` recomendado)
- Git configurado
- Conta no Sanity e Stripe
- Banco Postgres gerenciado (Neon/Supabase/Railway)

Passo a passo inicial

1. Criar monorepo com `apps` e `packages` conforme planejamento.
2. Adicionar TypeScript estrito e `tsconfig` base em `packages/config`.
3. Instalar e configurar ESLint/Prettier/Husky/lint-staged.
4. Inicializar Sanity Studio (`apps/studio`) e criar schemas `userProfile` e `project`.
5. Configurar `packages/sanity` com cliente de leitura e helpers GROQ.
6. Criar Prisma schema (`prisma/schema.prisma`) com `User`/`Subscription`; aplicar migrations.
7. Configurar NextAuth e páginas de login em `apps/web`.
8. Validar `.env` com util em `packages/lib/env.ts`.

## Sanity Studio — Setup e Estado Atual

Variáveis de ambiente (Studio)

- `SANITY_STUDIO_PROJECT_ID` e `SANITY_STUDIO_DATASET` — usadas pelo bundler do Studio.
- Opcional fallback: `SANITY_PROJECT_ID` e `SANITY_DATASET` (o `sanity.config.ts` prioriza as chaves com prefixo `SANITY_STUDIO_`).

Como rodar o Studio

- `pnpm --filter studio dev`
- Abrir `http://localhost:3333/`
- Requisito: Node.js 18+ (Sanity v4 exigirá 20+ — manter LTS atualizado).

Verificação via GROQ (pública)

- `userProfile` publicado:
  - Query: `*[_type == "userProfile" && defined(slug.current)]{ _id, name, "slug": slug.current }`
- `project` publicado com vínculo de `owner`:
  - Query: `*[_type == "project" && isPublic == true]{ _id, title, "slug": slug.current, "owner": owner->name, techTags }`
- Dica: usar Sanity Vision no Studio para validar as consultas.

Estado atual confirmado

- Dataset ativo: `production`.
- Studio iniciou sem erros de `projectId` (ambiente `.env` ok).
- Documentos publicados:
  - `userProfile`: `name = teste`, `slug = teste`.
  - `project`: `title = teste`, `slug = teste`, `isPublic = true`, `techTags = ["teste" ]`.
- Vínculo de `owner` confirmado: `project.owner -> userProfile (teste)`.

Revisão concluída — 2025-11-03

- Testes realizados: preview do Studio, consultas GROQ públicas e verificação do vínculo `owner`.
- Validações adicionais:
  - Página `/projetos` exibe projetos públicos com SSR + ISR.
  - Grid de cards e filtros por `techTags` funcionando, com link para `/perfil/{slug}` do owner.
- Próximos passos: configurar webhook de revalidação (Sanity → Next.js).

## Webhook Sanity → Next.js (revalidação ISR)

Endpoint (local/produção)

- Rota: `apps/web/src/app/api/webhooks/sanity/route.ts`
- Método: `POST`
- URL (produção): `https://SEU_DOMINIO/api/webhooks/sanity?secret=SEU_SECRET`
- URL (dev): validar localmente o handler com `curl`/Postman (ex.: `curl -X POST "http://localhost:3000/api/webhooks/sanity" -H "Content-Type: application/json" -d "{\"slug\":\"maria\",\"secret\":\"$SANITY_WEBHOOK_SECRET\"}"`). O webhook no Sanity será configurado apenas após deploy/preview (Vercel).

Env (opcional)

- `SANITY_WEBHOOK_SECRET` — se definido, a rota exige o `secret` via query string.

Configuração no Sanity (Project → Settings → API → Webhooks)

- Trigger: Publish / Unpublish / Update
- Dataset: `production`
- Filter: `[_type == "userProfile" || _type == "project"]`
- Projection (Body):
  - Para `userProfile`: `{ "slug": slug.current, _type }`
  - Para `project`: `{ "slug": owner->slug.current, _type }`

Comportamento

- A rota espera `slug` no corpo e revalida `/perfil/{slug}`.
- Erros comuns: `missing slug` (projeção faltando) ou `invalid secret` (secret incorreto).

Variáveis de ambiente (exemplo)

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_MEDIA_BUCKET`

Observações

- Tokens do Sanity usados apenas no servidor (nunca no cliente).
- `SUPABASE_SERVICE_ROLE_KEY` é estritamente server-side; para leitura pública, use `signed URLs` gerados no servidor.
- Use ISR com webhooks para reduzir custos e manter conteúdo fresco.
- Aviso Next.js: `Unsupported metadata viewport` — corrigido movendo `viewport` para `export const viewport` em `apps/web/src/app/layout.tsx`.

### Política de Desenvolvimento

- Local-first: desenvolvimento e validação acontecem 100% em ambiente local.
- Webhook: em dev, simular com `curl`/Postman; configurar no Sanity somente após deploy/preview.
- Deploy: Vercel será usada para hospedagem (Production/Preview) e gestão de variáveis de ambiente.

### Política de Push (Kanban)

- Foi adicionado um hook Husky `pre-push` que **bloqueia o push** se houver tarefas não concluídas em `Em Revisão` no Kanban (`docs/kanban/devmarket-kanban.md`).
- O hook procura por itens com o padrão `- [ ]` dentro da seção `## Em Revisão`.
- Para liberar o push:
  - Concluir a revisão e mover os itens para `## Concluído`.
  - Ou esvaziar a seção `## Em Revisão` temporariamente (recomendado apenas após validação).

## Build e Linking (apps/web)

- Certifique-se de que o app web referencia o pacote Sanity do workspace:
  - `apps/web/package.json` → `"@devmarket/sanity": "workspace:*"`.
- Após alterações no pacote Sanity, rode:
  - `pnpm --filter @devmarket/sanity build`
  - `pnpm install`
  - `pnpm -C apps/web build && pnpm -C apps/web start`
