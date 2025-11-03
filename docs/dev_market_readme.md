# DevMarket

**Descrição rápida**

DevMarket é uma plataforma onde desenvolvedores criam um perfil profissional (vitrine) para exibir projetos — imagens, vídeos, demos, links, descrições técnicas — e conectar-se com clientes ou recrutadores. O foco inicial é um MVP simples, visualmente atraente e fácil de expandir.

## 🚀 Status Atual do Projeto

### ✅ Implementado (Sprint 0 - Fundações)

- **Monorepo completo** com pnpm workspace
- **Next.js 16** com TypeScript e App Router
- **Design System** com tokens CSS e tema Light/Dark
- **Homepage funcional** demonstrando conceitos
- **Aliases TypeScript** configurados (`@/*`, `@ui/*`, `@lib/*`, etc.)
- **Servidor de desenvolvimento** rodando em http://localhost:3000
- **Pacote UI (`@devmarket/ui`)** criado e integrado ao app, com página de preview
- Componentes UI base (Button, Card, Avatar, Tag, Grid, MediaGallery)
- **Navegação e layout base** consolidados no App Router (release 0.1.1)

### 🔄 Em Progresso

- Configuração de qualidade de código (ESLint/Prettier)

### 📋 Próximos Passos

- Autenticação com NextAuth.js
- Configuração do banco de dados (Prisma + PostgreSQL)
- CRUD de perfis e projetos
- Upload de mídia e assets

---

## Tecnologias recomendadas (stack)

**Backend**

- Node.js (LTS)
- Prisma ORM + PostgreSQL (produção) — facilita modelagem, migrations e mantém compatibilidade com SQL.

**Frontend**

- React com **TypeScript** + Next.js (app routing)

**CMS de conteúdo**

- Sanity (Headless CMS) — schemas flexíveis, assets, versionamento e consultas via GROQ.

**Autenticação & Pagamentos**

- NextAuth.js (se usar Next.js) ou JWT + sessions no backend.
- Stripe (Subscriptions / Checkout) para cobranças recorrentes.

**Armazenamento de mídia**

- Imagens: Assets do Sanity (CDN embutida).
- Vídeos: Cloudflare Stream / Mux (recomendado) ou S3/R2 (metadados registrados no Sanity).
- Alternativa: S3/R2 com signed URLs para arquivos grandes.

### Estratégia de mídia: Sanity (pequenas) + Supabase (grandes)

- Objetivo: usar o melhor de cada serviço. Sanity para imagens leves e com transformações; Supabase Storage para arquivos grandes e anexos.
- Sanity — usar para `avatar`, `thumbnails`, `banners`, `logos` e imagens até ~5–10 MB.
  - Vantagens: CDN do Sanity, transforms (resize, crop), integração fácil com `next/image`.
- Supabase Storage — usar para imagens/arquivos maiores (>= 10 MB), PDFs/ZIPs, binários pesados.
  - Entrega: preferir `signed URLs` com TTL curto (ex.: 1h) gerados no servidor.
  - Organização sugerida: bucket `media` com pastas `images/large`, `files`, `raw`.
  - Segurança: nunca expor `SERVICE_ROLE_KEY`; geração de URLs sempre server-side.
- Metadados/fonte de verdade: manter referência no Sanity (ex.: `supabaseKey`/`bucket`/`mime/size`), permitindo GROQ para páginas públicas.
- Fluxo recomendado (upload grande):
  1. Usuário envia arquivo → server action chama Supabase com `SERVICE_ROLE_KEY` (apenas servidor).
  2. Após upload, gerar `signed URL` quando necessário exibir/baixar.
  3. Persistir ponte no Sanity (`_ref`/`supabaseKey`) para indexação/SEO e integração com páginas.
- Vídeo: continuar recomendando Cloudflare Stream/Mux para streaming sob demanda; Supabase pode armazenar arquivos grandes, mas não otimiza streaming e egress como providers dedicados.

Boas práticas:

- Defina limites de tamanho por tipo (ex.: imagens > 10 MB vão para Supabase).
- Cache no frontend com `Cache-Control` adequado e validar egress mensal.
- Para conteúdo privado, use regras de acesso em buckets e apenas `signed URLs`.

---

## Design System e UI (`packages/ui`)

### Visão Geral

- Tokens semânticos em `packages/ui/src/styles/tokens.css` (cores, spacing, radii, tipografia, sombras).
- Utilitário `cn` em `packages/ui/src/utils/cn.ts` para composição de classes.
- Componentes presentational implementados usando CSS variables:
  - `Button` (variantes: primary, secondary, ghost, destructive, outline; tamanhos: sm, md, lg; estado `loading` com spinner redondo)
  - `Card` (variantes: `bordered`, `elevated`; seções `Header`, `Body`, `Footer`)
  - `Avatar` (image + fallback com iniciais; tamanhos sm, md, lg)
  - `Tag` (default, primary, success, warning, danger)
  - `Grid` (colunas 1–12; gaps configuráveis)
  - `MediaGallery` (grid responsivo para imagens/vídeos com thumbnail + caption)

### Integração com Next.js (apps/web)

- `apps/web/next.config.ts` inclui `transpilePackages: ['@devmarket/ui']` para transpilar o pacote da workspace.
- `packages/ui/package.json` marca CSS como `sideEffects` e declara `react`/`react-dom` como `peerDependencies`.
- `packages/ui/src/index.ts` importa `tokens.css` globalmente para disponibilizar variáveis no app consumidor.

### Como usar

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Tag,
  Grid,
  MediaGallery,
} from '@devmarket/ui';

export default function Example() {
  return (
    <Card elevated>
      <CardHeader>Exemplo</CardHeader>
      <CardBody>
        <Button variant="primary" size="md">
          Clique
        </Button>
      </CardBody>
      <CardFooter>
        <Tag variant="primary">Rodapé</Tag>
      </CardFooter>
    </Card>
  );
}
```

### Preview de UI

- Página de preview: `http://localhost:3000/ui-preview` (rodar com `pnpm --filter web dev`).
- Exibe exemplos de todos os componentes com variações e props.
- Layout e navegação base disponíveis em todas as páginas (App Router).

### Correções recentes

- Botão em `loading`: spinner passou a ser renderizado inline (em vez de overlay absoluto) para evitar sobreposição de texto.
- Spinner ajustado para forma perfeitamente circular (`border-radius: 50%`) e animação mais suave.

---

## Qualidade de código

- Formatação: `Prettier` com regras em `.prettierrc.json` e ignore em `.prettierignore`.
- Lint: `ESLint` (Next.js Core Web Vitals + TypeScript) configurado em `apps/web`.
- Pre-commit: `Husky` executa `lint-staged` para aplicar `eslint --fix` e `prettier --write` em arquivos alterados.
- lint-staged:
  - `apps/web/**/*.{ts,tsx,js,jsx}` → `pnpm -C apps/web eslint --fix`
  - `**/*.{ts,tsx,js,jsx,css,scss,json,md}` → `prettier --write`

### Comandos úteis

- `pnpm -w format` — formata o workspace com Prettier.
- `pnpm -w lint` — executa o ESLint do app web.
- `pnpm -w run prepare` — inicializa hooks do Husky.

---

## Por que essa escolha? (resumo curto com referências)

- **Prisma + Postgres**: produtividade com migrations e tipos, boa prática para aplicações escaláveis. citeturn0search10turn0search14
- **React + TypeScript + Next.js**: entrega produtividade, segurança de tipos, e melhor manutenção em projetos que crescem (TypeScript recomendado para times e código que será mantido longamente). citeturn0search7turn0search15
- **Stripe**: solução madura para assinaturas, com suporte a modelos fixos, por assento e consumo (usage-based). Fácil integração com Checkout e Payment Elements. citeturn0search0turn0search12
- **Modelos de monetização**: assinaturas mensais, freemium + upsell, cobrança por destaque/anúncio, comissão sobre contratações — escolha depende do público e do valor entregue. Estudos recentes apontam crescimento de pricing por uso e modelos alinhados ao valor. citeturn0search1turn0search5

---

## MVP (escopo mínimo para lançar rápido)

1. Autenticação (cadastro/login) com perfil básico.
2. CRUD de perfis (bio, skills, links, tags).
3. CRUD de projetos (título, descrição, imagens, vídeo, links, tecnologia usada).
4. Página pública de perfil (vitrine) com SEO básico.
5. Upload básico de mídia (imagens + vídeos otimizados) — usar S3 com signed URLs.
6. Plano de monetização mínimo: assinatura mensal (Stripe Checkout) para recursos premium (ex.: destacar perfil, analytics, portfólio ilimitado).

---

## Estrutura da aplicação (sugestão)

```
/devmarket
  /apps
    /web (Next.js + TS)
    /api (Node.js + Express or NestJS)  // ou usar Next.js API routes
  /packages
    /ui (componentes compartilhados)
    /lib (helpers compartilhados)
  prisma/
  .env
  package.json
```

---

## Banco de dados (modelo inicial - Prisma schema)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  username      String   @unique
  passwordHash  String?
  bio           String?
  avatarUrl     String?
  role          Role     @default(USER)
  projects      Project[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

model Project {
  id          String   @id @default(cuid())
  owner       User     @relation(fields: [ownerId], references: [id])
  ownerId     String
  title       String
  description String
  media       Json?    // lista de objetos {type, url, poster}
  techTags    String[]
  isPublic    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Subscription {
  id            String   @id @default(cuid())
  user          User     @relation(fields: [userId], references: [id])
  userId        String
  stripeId      String   @unique
  status        String
  priceId       String
  currentPeriodEnd DateTime?
  createdAt     DateTime @default(now())
}
```

---

## Endpoints (API - exemplos)

- `POST /auth/signup` — criar conta (retorna token)
- `POST /auth/login` — login (JWT)
- `GET /users/:username` — pegar perfil público
- `PUT /users/me` — atualizar perfil (autenticado)
- `POST /projects` — criar projeto (autenticado)
- `GET /projects/:id` — pegar projeto
- `POST /upload/sign` — gerar signed URL para upload direto no S3
- `POST /payments/create-checkout-session` — iniciar checkout Stripe
- Webhooks: `POST /webhooks/stripe` — atualizar `Subscription` no DB

---

## Pagamentos e monetização (detalhado)

Sugestões de planos:

- **Grátis** — perfil básico, até 3 projetos, sem destaque.
- **Pro (R$ X / mês)** — projetos ilimitados, destacar 1 slot por mês, analytics básico.
- **Agency / Team (R$ Y / mês)** — múltiplos membros, perfil por equipe, por-seat billing.

Modelos adicionais:

- Comissionar contratações (ex.: 5% sobre contratos fechados via plataforma).
- Venda de anúncios/destaques (pagamento pontual para aparecer no topo).
- Marketplace de gigs (taxa por transação).

**Implementação técnica (Stripe)**

- Usar Stripe Checkout para agilizar lançamento (subscriptions). citeturn0search0turn0search2
- Criar produtos e preços no dashboard Stripe.
- Usar webhooks para reconciliar status das assinaturas e conceder/remover benefícios.

---

## Uploads de mídia (boas práticas)

- Não envie arquivos grandes através do servidor (gargalo). Use **signed URLs** do S3 para upload direto do cliente.
- Armazene metadados (tipo, duração, poster image, transcode status) no banco.
- Faça transcodificação (para vídeos) — usar serviços gerenciados (Mux, Cloudflare Stream) ou pipelines serverless para gerar thumbs e versões otimizadas.

---

## Segurança

- Hashear senhas com bcrypt/argon2 (se armazenar localmente).
- Validar e sanitizar todos os inputs (prevenir XSS / SQLi — Prisma ajuda com queries parametrizadas).
- Rate limiting em endpoints críticos (auth, upload, payments).
- Segredos em env vars; não comitar `.env`.
- HSTS, CSP e outras headers de segurança no frontend/backend.

---

## Qualidade de código e workflow

- Use **TypeScript** para segurança de tipos no frontend e backend (recomendado). citeturn0search15
- Configure ESLint + Prettier + Husky (pre-commit hooks).
- CI: GitHub Actions para testes e deploy.
- Escreva testes unitários (Vitest/Jest) e e2e (Playwright).

---

## Deploy (exemplo rápido)

- Frontend: Deploy na Vercel (conectar repo, variáveis de ambiente). Use Image Optimization do Next.js ligado ao provider/CDN.
- Banco: Neon, Supabase ou Railway Postgres.
- Backend: Deploy em Railway/Render com variáveis de ambiente (DATABASE_URL, STRIPE_SECRET, JWT_SECRET).

---

## Roadmap sugerido (fases)

**Fase 0 — Planejamento & prototipação** (1 semana)

- Wireframes, mapa de rotas, entidades do DB.

**Fase 1 — MVP (2–4 semanas)**

- Auth, perfil, CRUD de projetos, uploads básicos, página pública.
- Integração com Stripe para assinaturas (plano Pro).

**Fase 2 — Hardening (2–4 semanas)**

- Tests, logging, monitoramento, CI/CD, otimizações de mídia.

**Fase 3 — Escala e features**

- Search/filters, tags, recomendações, ranking, analytics para devs, marketplace.

---

## Boas práticas de desenvolvimento

- Pequenos PRs frequentes e revisados.
- Feature flags para recursos experimentais.
- Migrations controladas e backups automáticos do DB.
- Documentar contratos da API (OpenAPI / Swagger).

---

## Contribuindo

1. Fork -> branch `feature/xxxx` -> PR com descrições e screenshots.
2. Rodar testes antes de abrir PR.
3. Mantainers farão code review e aprovarão.

---

## Licença

Escolha uma licença permissiva (MIT) se quiser permitir uso amplo.

---

## Arquivos e variáveis de ambiente (exemplo)

`.env.example`

```
DATABASE_URL=postgresql://user:pass@host:5432/devmarket
NEXTAUTH_SECRET=supersecret
JWT_SECRET=anothersecret
STRIPE_SECRET_KEY=sk_live_...
S3_BUCKET=devmarket-media
S3_REGION=sa-east-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=server-only-secret
SUPABASE_MEDIA_BUCKET=media
```

---

## Recursos & leituras (rápido)

- Prisma + Postgres (docs e guias). citeturn0search10turn0search14
- Stripe subscriptions guide (Checkout/Elements). citeturn0search0turn0search12
- Artigos sobre escolha TypeScript vs JS. citeturn0search7turn0search15
- Modelos de monetização SaaS (guias). citeturn0search1turn0search5

---

## Próximo passo para você agora

1. Decida se prefere usar **TypeScript** (recomendado) ou **JavaScript** (lançamento mais rápido).
2. Crie um repositório e inicialize o monorepo/estrutura acima.
3. Posso gerar agora o boilerplate (scripts `npm`/`pnpm`), `prisma/schema.prisma`, e exemplos de endpoints + componentes React.

---

_README gerado automaticamente por assistente — peça para gerar o boilerplate se quiser que eu crie arquivos iniciais._

---

## Changelog

- As mudanças do projeto são registradas em `docs/CHANGELOG.md` com organização em camadas (Resumo, Áreas, Arquivos, Notas, Added/Changed/Fixed).
- Para atualizar automaticamente a seção `[Unreleased]` com base nos commits:

```bash
pnpm changelog
```

- Requisitos: repositório Git inicializado e mensagens de commit preferencialmente no padrão Conventional Commits.
