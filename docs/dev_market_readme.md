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
- Configuração do webhook no painel do Sanity (URL, filtro e projeções)

### 📋 Próximos Passos

- Autenticação com NextAuth.js
- Configuração do banco de dados (Prisma + PostgreSQL)
- CRUD de perfis e projetos
- Upload de mídia e assets

### Sanity — Estado

- Studio rodando em `http://localhost:3333/` com `.env` ajustado (`SANITY_STUDIO_PROJECT_ID`/`DATASET`).
- Dataset ativo: `production`.
- Documentos publicados e validados via GROQ:
  - `userProfile`: `name = teste`, `slug = teste`.
  - `project`: `title = teste`, `slug = teste`, `isPublic = true`, `techTags = ["teste"]`, `owner = teste`.
- Implementado:
  - Leitura GROQ em `/perfil/[slug]` com SSR/ISR e fallbacks (`loading`, `not-found`).
  - Rota de webhook (`/api/webhooks/sanity`) para revalidar `/perfil/{slug}`.
  - Página “Projetos” com listagem pública (SSR + ISR), grid de cards e filtros por `techTags`.
    - Query GROQ `publicProjectsQuery` com `owner` resolvido e `coverUrl` a partir de `media[0]`.

Referência: Kanban atualizado em `docs/kanban/devmarket-kanban.md`.

Revisão concluída — 2025-11-03

- Itens validados: inicialização do Studio, ambiente `.env`/`sanity.config.ts`, publicação de documentos e vínculo de `owner`, consultas GROQ no CDN.
- Validação local:
  - Página `/perfil/[slug]` renderiza dados públicos do Sanity para `slug = teste`.
  - Página `/projetos` exibe o projeto público “teste”, com filtros por `techTags` e link para o perfil do owner.

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
- Vídeos e arquivos grandes: Supabase Storage com `signed URLs` e player HTML5; metadados registrados no Sanity. Sem ABR inicialmente.

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
- Vídeo com Sanity + Supabase:
  - Upload: realizado server-side para Supabase Storage (chave `SERVICE_ROLE_KEY` apenas no servidor).
  - Metadados: registrados no Sanity (fonte de verdade para páginas públicas e SEO).
  - Exibição: player HTML5 usando `signed URLs` com expiração curta; sem ABR inicialmente.
  - Evolução futura (sem provedores externos): pipeline de transcodificação com FFmpeg e múltiplas resoluções armazenadas no Supabase; seleção de fonte conforme rede.

Boas práticas:

- Defina limites de tamanho por tipo (ex.: imagens > 10 MB vão para Supabase).
- Cache no frontend com `Cache-Control` adequado e validar egress mensal.
- Para conteúdo privado, use regras de acesso em buckets e apenas `signed URLs`.

---

## Política de Desenvolvimento (Local-first + Deploy na Vercel)

- Desenvolvimento: trabalhamos 100% local até validar funcionalmente; comportamento “realista” apenas após deploy.
- Webhook em desenvolvimento: validar o handler localmente com `curl`/Postman (ex.: `curl -X POST "http://localhost:3000/api/webhooks/sanity" -H "Content-Type: application/json" -d "{\"slug\":\"maria\",\"secret\":\"$SANITY_WEBHOOK_SECRET\"}"`).
- Configuração de webhook: somente em ambiente de preview/deploy (Vercel). Em `localhost`, o Sanity não consegue chamar seu host.
- Segredos: configurar variáveis na Vercel (Production/Preview); nunca versionar tokens sensíveis.

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
- `apps/web/src/app/globals.css` mapeia tokens do design system para variáveis globais do app (light/dark), melhorando contraste em variantes como `button-outline`.

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

- Disponível apenas em desenvolvimento.
- Acesse diretamente: `http://localhost:3000/ui-preview` (retorna 404 em produção).
- Exibe exemplos de componentes com variações e props; textos traduzidos via `LocaleProvider`.

### Controles de Interface (Idioma/Tema)

- Localização: cabeçalho do site (lado direito), disponível em todas as páginas.
- Idioma: alterna entre `PT` e `EN`; preferência persistida em `localStorage` e aplicada em `html` (`lang`/`data-locale`).
- Tema: alterna entre `Light` e `Dark`; preferência persistida em `localStorage` e aplicada via classe `dark` no `html`.
- Mensagens antigas de instrução removidas da Home.
- Internacionalização conectada: `LocaleProvider` com `useLocale()`/`t(key)` e dicionários locais (`home.*`, `nav.*`, `projects.*`, `uiPreview.*`).
- Páginas “Sobre” e “Signup” também usam `t(key)`; textos alternam corretamente com o seletor de idioma.

### Indicadores de desenvolvimento do Next

- Overlay desativado em desenvolvimento: `apps/web/next.config.ts` usa `devIndicators: false`.
- Em produção (`next build && next start`), erros são exibidos via logs/console e status HTTP.

### Internacionalização conectada (expansões)

- Dicionário expandido com chaves `about.*` e `signup.*` para páginas “Sobre” e “Signup”.
- Chaves básicas reservadas para planos na Home: `home.plans.*` (título/subtítulo/CTA), para futura ativação.

### Correções recentes

- Botão em `loading`: spinner passou a ser renderizado inline (em vez de overlay absoluto) para evitar sobreposição de texto.
- Spinner ajustado para forma perfeitamente circular (`border-radius: 50%`) e animação mais suave.
- Página “Feed” unificada: cards com badges de tipo (Projeto/Evento/Notícia/Interesse), filtros por tipo, owner com link.
- Separação Server/Client em `/projetos`: `page.tsx` (Server, metadata) renderiza `FeedPageClient` (Client com estado/filtros).
- Novo componente reutilizável `FeedItemCard` para renderizar conteúdo com capa, autor, tags e CTAs.
- Navegação atualizada: rótulo “Projetos” → “Feed” (PT/EN) via `LocaleProvider`.
- Ajustes de tipos na UI: `Grid.gap="lg"`, `Avatar.size="sm"`, `Tag` recebe texto via `children`.
- Páginas “Sobre” e “Signup” traduzidas com `LocaleProvider` (`about.*` e `signup.*`).
- CTA da página “Sobre” corrigida: `Button` usa `onClick` com `router.push('/signup')` (sem `href`).
- Tema escuro: variante `button-outline` com contraste reforçado via `apps/web/src/app/globals.css` (bordas e texto ajustados).

### Avisos corrigidos

- Next.js 16: aviso `Unsupported metadata viewport` removido.
  - Correção: `export const viewport` no `apps/web/src/app/layout.tsx` (2025-11-03).
  - Impacto: metadados válidos em todas as rotas (`/`, `/projetos`, `/ui-preview`, dinâmicas).

---

## Qualidade de código

- Formatação: `Prettier` com regras em `.prettierrc.json` e ignore em `.prettierignore`.
- Lint: `ESLint` (Next.js Core Web Vitals + TypeScript) configurado em `apps/web`.
- Pre-commit: `Husky` executa `lint-staged` para aplicar `eslint --fix` e `prettier --write` em arquivos alterados.
- lint-staged:
  - `apps/web/**/*.{ts,tsx,js,jsx}` → `pnpm --dir apps/web exec eslint --fix`
  - `**/*.{ts,tsx,js,jsx,css,scss,json,md}` → `pnpm -w exec prettier --write`

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

---

## Moderação e Publicação (Sanity)

Fluxo proposto para conteúdo criado pelo site (projetos, posts, cases, etc.):

- Criação via API (autenticado): o backend grava no Sanity com `status: "pending"` e `isPublic: false`.
- Aprovação no Studio: moderadores alteram `status: "approved"` e marcam `isPublic: true`.
- Reprovação: `status: "rejected"` (mantém `isPublic: false`).
- Webhook: ao publicar/alterar, o Studio aciona `POST /api/webhooks/sanity` com `{ slug, _type }` e revalida rotas públicas (perfil e listagens).

Implementação sugerida no schema `project` (e demais documentos públicos):

- Campo `status` (`string`): `pending | approved | rejected`.
- Campo `isPublic` (`boolean`): controla exibição em páginas públicas e feed.
- Campo `owner` (`reference` → `userProfile`): vincula o conteúdo ao perfil.

UI no Studio:

- Views/filters por status: “Pendentes”, “Aprovados”, “Rejeitados”.
- Ação rápida de aprovação: marcar `approved` + `isPublic: true`.

Critérios de aceite:

- Conteúdo só aparece no feed público quando `isPublic: true`.
- Revalidação de páginas ocorre via webhook após mudanças.

---

## Perfis Completos (Indivíduo e Empresa)

Objetivo: transformar `/perfil/[slug]` em uma página de portfólio moderna, altamente personalizável.

Diretrizes:

- Cabeçalho: avatar/logo, nome, tagline, localização, badges de tipo de perfil (`individual`, `company`, `agency`, `team`, `creator`), CTAs de contato.
- Seções: Sobre, Portfólio/Projetos, Serviços/Ofertas, Skills & Domínios, Conteúdos (posts/cases), Avaliações/Clientes, Vagas (empresas), Links.
- Taxonomias: `domains[]` (development, design, marketing, product, data, ops, security, growth) e `roleTags[]` para filtros globais.
- Personalização: temas e variantes visuais diferentes para perfis de empresa (mais corporativo) e indivíduo (mais autoral).

Backlog técnico (alto nível):

- Expandir `userProfile` com `profileType`, `domains[]`, `services[]`, `availability`, `rateCard`, `location`, `companySize`, `industries[]`, `teamMembers[]`, `clients[]`.
- Evoluir `/perfil/meu` em seções, com componentes de formulário reutilizáveis.
- Ajustar `/perfil/[slug]` para renderizar seções condicionais conforme `profileType`.
- Atualizar `LocaleProvider` com strings novas para navegação e seções.

Referência de sprints: ver `docs/planning/sprints-overview.md` e `docs/sprints/sprint-05-perfis-completos.md`.

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
