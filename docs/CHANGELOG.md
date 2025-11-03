# Changelog — DevMarket

Formato baseado em Keep a Changelog e organizado em camadas para inspeção precisa. Versões seguirão SemVer quando houver publicação.

## [Unreleased]

- Documentação de tokens individual
- Testes de componentes (`packages/ui`)
- Storybook opcional para o Design System

## [0.2.0] — 2025-01-15

### Camada 1 — Resumo executivo

- **Renderização completa de mídia** implementada em projetos e perfis: capas, galerias de imagens e listas de arquivos para download.
- **Sprint 2 concluída** com soluções para cards vazios, erros de imagem inválida e inconsistências entre páginas.
- **Queries GROQ expandidas** para incluir `coverUrl`, `mediaImages` e `mediaFiles` com fallbacks robustos.

### Camada 2 — Áreas e tópicos

- Queries Sanity
  - `publicProjectsQuery` expandida com campos de mídia completos (`coverUrl`, `mediaImages`, `mediaFiles`)
  - `userProfileBySlugQuery` atualizada para incluir projetos com mídia completa
  - Lógica `coalesce()` para priorizar `coverImage` sobre primeiro item de `media`
- Componentes UI
  - `ProjectsGrid` com renderização de capa, galeria e arquivos
  - `CoverImage` e `MediaGallery` com fallback `<img>` para compatibilidade
  - Reutilização consistente entre páginas `/projetos` e `/perfil/[slug]`
- Perfil Público
  - Avatar, bio, skills (chips), links (lista clicável) renderizados
  - Projetos exibidos com `ProjectsGrid` completo (capa + mídia + arquivos)
- Configuração Next.js
  - `remotePatterns` para `cdn.sanity.io` habilitado
  - Transpile de `@devmarket/sanity` funcionando corretamente

### Camada 3 — Referências a arquivos

- `packages/sanity/src/queries.ts` — queries expandidas com campos de mídia
- `apps/web/src/app/projetos/ProjectsGrid.tsx` — componente com fallbacks de imagem
- `apps/web/src/app/perfil/[slug]/PerfilView.tsx` — renderização completa do perfil
- `apps/web/src/app/perfil/[slug]/page.tsx` — tipos atualizados para projetos completos
- `apps/web/next.config.ts` — `remotePatterns` para Sanity CDN
- `docs/sprints/sprint-02-projetos-midia.md` — documentação de desafios e soluções

### Camada 4 — Notas comportamentais e desafios resolvidos

- **Cards vazios**: Query não incluía campos de mídia → Expandida com `coverUrl`, `mediaImages`, `mediaFiles`
- **Erro "resource isn't a valid image"**: `next/image` tentava otimizar `.txt` → Fallback `<img>` implementado
- **Pacote desatualizado**: Mudanças em queries não refletiam → Rebuild `pnpm -C packages/sanity build`
- **Inconsistência páginas**: Perfil mostrava só títulos → Reutilização de `ProjectsGrid` com mídia completa
- **Debug em produção**: Bloco de debug removido após validação → UI limpa mantida

### Fixed

- Cards de projeto vazios apesar de conteúdo cadastrado no Sanity
- Erro `next/image` ao tentar otimizar arquivos não-imagem (`.txt`, `.pdf`)
- Inconsistência entre renderização de projetos na página `/projetos` vs `/perfil/[slug]`
- Queries desatualizadas não refletindo no app após mudanças no pacote `@devmarket/sanity`

### Added

- Renderização completa de mídia em cards de projeto (capa, galeria, arquivos)
- Fallbacks `<img>` para compatibilidade com assets não-imagem
- Perfil público com avatar, bio, skills, links e projetos completos
- Debug temporário para diagnóstico de queries (removido após validação)
- Documentação detalhada de desafios e soluções na Sprint 2

### Changed

- `publicProjectsQuery` e `userProfileBySlugQuery` expandidas com campos de mídia
- `ProjectsGrid` reutilizado consistentemente entre páginas de projetos e perfil
- Tipos TypeScript atualizados para incluir `coverUrl`, `mediaImages`, `mediaFiles`

### TypeScript / Sanity Studio

- Resolvidos erros de TypeScript no Sanity Studio:
  - Instalados `@types/react` e `@types/react-dom` como devDependencies
  - Corrigidos schemas `project.ts` e `userProfile.ts` removendo `defineType()` aninhado
  - Otimizado `apps/studio/tsconfig.json` com configurações modernas (ES2020, DOM.Iterable, allowJs, noEmit, isolatedModules, jsx: react-jsx)
  - Compilação TypeScript sem erros: `tsc --noEmit` ✅
  - Build do Sanity funcionando: `sanity build` ✅

### Docs

- Ajustado `docs/sprints/sprint-01-perfil-publico.md` para rota `/perfil/[slug]` e revalidação correspondente.
- Atualizado `docs/dev_market_readme.md` com status da navegação/layout e exemplo do Card usando `CardHeader/CardBody/CardFooter`.
- Publicado `README.md` na raiz com apresentação comercial e seção de Parcerias.
- Atualizado `docs/kanban/devmarket-kanban.md`: coluna "Em Revisão" esvaziada e itens consolidados em "Concluído".
- Adicionada seção "Estratégia de mídia: Sanity (pequenas) + Supabase (grandes)" em `docs/dev_market_readme.md`, formalizando o uso de Sanity para imagens leves e Supabase Storage para arquivos maiores com signed URLs.
- Atualizado `docs/setup/environment-setup.md` com variáveis de ambiente do Supabase e nota de segurança (service role apenas no servidor).
- Expandido `.env.example` em `docs/dev_market_readme.md` com `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_MEDIA_BUCKET`.
- Removidas recomendações de Cloudflare Stream/Mux; adotado vídeo via Supabase Storage com `signed URLs` e player HTML5, metadados no Sanity.
- Documentada política de desenvolvimento local-first com deploy na Vercel, e validação de webhook em dev via `curl/Postman`.
- Adicionados controles de interface na Home: seletor de idioma (PT/EN) e alternância de tema (Light/Dark) no cabeçalho.
- Removida mensagem de instrução sobre adicionar classe `dark` no `html`; agora o tema é alternado via botão dedicado.
- Atualizado `docs/sprints/sprint-03-pagamentos.md` com planos Dev/Empresa, provedores em avaliação (Mercado Pago/PayPal/Stripe), webhook/IPN e gating por plano.
- Atualizado `docs/planning/sprints-overview.md` para incluir resumo dos planos e provedor de pagamento em avaliação.
- Ajustado `docs/kanban/devmarket-kanban.md` com tarefas de definição de planos e integração do provedor.

- Atualizado `apps/web/README.md` com UI Preview apenas em desenvolvimento, acesso direto à rota e i18n via `LocaleProvider`.
- Atualizado `docs/dev_market_readme.md` com gating do UI Preview (404 em produção), remoção do link da navegação e detalhes da i18n conectada (`useLocale()`/`t(key)`).

### Web (Next.js)

- Internacionalização conectada: `LocaleProvider` expandido com chaves para navegação, Home, Projetos e UI Preview.
- `apps/web/src/app/projetos/ProjectsGrid.tsx` agora traduz "Filtros", "Todos" e o rótulo "por" via `t()`.
- UI Preview restrita a desenvolvimento: `apps/web/src/app/ui-preview/page.tsx` retorna `notFound()` em produção e renderiza `UiPreviewClient` em dev.
- Novo componente `apps/web/src/app/ui-preview/UiPreviewClient.tsx` aplicando `useLocale()` e `t()` em todos os textos visíveis.
- Link "UI Preview" removido do cabeçalho em `apps/web/src/components/NavLinks.tsx`.
- Confirmado `devIndicators: false` em `apps/web/next.config.ts` para esconder o overlay de desenvolvimento.

### Tooling / Qualidade

- Adicionado `Prettier` com `.prettierrc.json` e `.prettierignore` na raiz.
- Configurado `Husky` com hook `pre-commit` para executar `lint-staged`.
- Adicionado `lint-staged` ao `package.json` da raiz:
  - `apps/web/**/*.{ts,tsx,js,jsx}` → `pnpm -C apps/web eslint --fix`
  - `**/*.{ts,tsx,js,jsx,css,scss,json,md}` → `prettier --write`
- Novos scripts no `package.json`:
  - `format` → `prettier --write .`
  - `prepare` → `husky install`

## [0.1.3] — 2025-11-03

### Camada 1 — Resumo executivo

- Corrigidos avisos de Next.js sobre `Unsupported metadata viewport` movendo `viewport` para `export const viewport` no `layout`.
- Ajustado pre-commit para Windows com comandos `lint-staged` usando `pnpm --dir` e `pnpm -w exec`.

### Camada 2 — Áreas e tópicos

- Metadados e SEO
  - `apps/web/src/app/layout.tsx`: `export const viewport` aplicado (largura e escala inicial).
- Tooling
  - `package.json` (raiz): `lint-staged` atualizado para execução compatível com Windows (pnpm workspace).
  - `.husky/pre-commit`: permanece chamando `pnpm -w exec lint-staged`.

### Camada 3 — Referências a arquivos

- `apps/web/src/app/layout.tsx` — remoção de `viewport` de `metadata` e criação de `export const viewport`.
- `package.json` (raiz) — ajustes em `lint-staged` para `pnpm --dir apps/web exec eslint --fix` e `pnpm -w exec prettier --write`.

### Camada 4 — Notas comportamentais

- Avisos de viewport deixam de aparecer nas rotas (`/`, `/projetos`, `/ui-preview`, dinâmicas).
- Pre-commit executa sem falhas em ambientes Windows.

### Fixed

- Next.js: `Unsupported metadata viewport`.

### Changed

- `lint-staged` usa `pnpm --dir`/`pnpm -w exec` para compatibilidade em Windows.

## [0.1.2] — 2025-11-02

### Camada 1 — Resumo executivo

- Preparado terreno para a Sprint 1 com esqueleto de pacotes `@devmarket/sanity` e `@devmarket/types`, e **ISR básico** na rota `perfil/[slug]`.
- Resolvidos erros de TypeScript de resolução de módulos e tipos no monorepo.

### Camada 2 — Áreas e tópicos

- Rota Perfil
  - `apps/web/src/app/perfil/[slug]/page.tsx` com tipagem estrita de "async props" (`params: Promise<{ slug: string }>`), `revalidate = 60` e `generateStaticParams` vazio.
- Pacotes
  - `@devmarket/sanity`: `src/client.ts` e `src/queries.ts`, `tsconfig.json`, build para `dist` (JS + d.ts).
  - `@devmarket/types`: `src/index.ts` com interface `Perfil`, `tsconfig.json`, build para `dist`.
- TypeScript & Resolução
  - Ajuste ESM nos specifiers: `packages/sanity/src/index.ts` usando `./client.js` e `./queries.js`.
  - Remoção do alias `@sanity/*` em `tsconfig.base.json` para evitar conflito com `@sanity/client`.
  - `types: ["node"]` em `tsconfig.json` dos pacotes para impedir carga implícita de `react`/`react-dom`.
  - `typescript` adicionado ao workspace e scripts de build nos pacotes.

### Camada 3 — Referências a arquivos

- `apps/web/src/app/perfil/[slug]/page.tsx` — `async props`, `revalidate`, `generateStaticParams`.
- `packages/sanity/src/index.ts` — exports com extensão `.js`.
- `packages/sanity/src/client.ts` — client do Sanity com envs.
- `packages/sanity/src/queries.ts` — query básica `perfilBySlugQuery`.
- `packages/sanity/tsconfig.json` e `packages/types/tsconfig.json` — configuração de build.
- `packages/sanity/package.json` e `packages/types/package.json` — `main/types` apontando para `dist`, scripts `build`.
- `tsconfig.base.json` — remoção do alias `@sanity/*`.

### Camada 4 — Notas comportamentais

- ISR básico: páginas de perfil renderizadas sob demanda e revalidadas a cada 60 segundos.
- Tipagem estrita com Next 16: App Router aceita `params` como `Promise`, garantindo compatibilidade com pipelines de props.

### Fixed

- TS2307: `Cannot find module './client'` e `./queries` — ajustados specifiers para `.js`.
- TS2307: `Cannot find module '@sanity/client'` — removido alias conflitante e garantida instalação da lib.
- TS2688: `Cannot find type definition file for 'react'/'react-dom'` — fixado `types: ["node"]` nos pacotes.
- TS2303/TS2459: conflito por alias `@sanity/*` com `@sanity/client` — resolvido removendo alias e recompilando.

### Added

- Pacote `@devmarket/sanity` (client + queries) com build para `dist`.
- Pacote `@devmarket/types` com interface `Perfil` e build para `dist`.
- ISR básico em `perfil/[slug]` com `revalidate` e `generateStaticParams` vazio.

### Changed

- Tipagem da rota `perfil/[slug]` alinhada ao Next.js 16 com "async props".

## [0.1.1] — 2025-11-02

### Camada 1 — Resumo executivo

- Consolidado roteamento no **App Router** e criado **layout base** com cabeçalho e navegação.
- Migrada a página **UI Preview** para `src/app/ui-preview` e removido `src/pages/`.

### Camada 2 — Áreas e tópicos

- Navegação
  - Cabeçalho com links: Home `/`, UI Preview `/ui-preview`, Projetos `/projetos`, Perfil `/perfil/[slug]`.
- Layout
  - Wrapper `<main>` com largura máxima e padding usando tokens CSS.
  - Estilos alinhados às variáveis do design system (`--bg-*`, `--text-*`, `--space-*`).
- Rotas
  - `apps/web/src/app/projetos/page.tsx` (placeholder)
  - `apps/web/src/app/perfil/[slug]/page.tsx` (placeholder)

### Camada 3 — Referências a arquivos

- `apps/web/src/app/layout.tsx` — cabeçalho e navegação base adicionados.
- `apps/web/src/app/ui-preview/page.tsx` — migrado do Pages Router.
- `apps/web/src/app/projetos/page.tsx` — nova rota placeholder.
- `apps/web/src/app/perfil/[slug]/page.tsx` — nova rota dinâmica placeholder.
- `apps/web/src/pages/ui-preview.tsx` — arquivo removido.

### Camada 4 — Notas comportamentais

- Navegação usa `next/link` com estilos baseados em tokens.
- Layout fixo no topo com `position: sticky` e barra inferior.
- App agora usa apenas App Router; evita conflitos de roteamento.

### Added

- Layout base com navegação no App Router.
- Páginas placeholder de Projetos e Perfil dinâmico.

### Changed

- UI Preview migrada para `src/app/ui-preview`.

### Removed

- `src/pages/ui-preview.tsx` (Pages Router).

## [0.1.0] — 2025-11-01

### Camada 1 — Resumo executivo

- Adicionado pacote `@devmarket/ui` com componentes base (Button, Card, Avatar, Tag, Grid, MediaGallery), tokens CSS e utilitário `cn`.
- Integrado o pacote UI ao `apps/web` com transpile de workspace e página de preview (`/ui-preview`).
- Corrigido bug de sobreposição do texto no botão em estado `loading`; spinner agora é inline e perfeitamente circular.

### Camada 2 — Áreas e tópicos

- Componentes UI
  - `Button`: variantes `primary`, `secondary`, `ghost`, `destructive`, `outline`; tamanhos `sm`, `md`, `lg`; estado `loading` com spinner inline.
  - `Card`: variantes `bordered` e `elevated`; sub-componentes `Header`, `Body`, `Footer`.
  - `Avatar`: imagem com fallback de iniciais; tamanhos `sm`, `md`, `lg`.
  - `Tag`: variantes `default`, `primary`, `success`, `warning`, `danger`.
  - `Grid`: helper de layout com colunas `1–12` e gaps configuráveis.
  - `MediaGallery`: grid responsivo com thumbs e captions.
- Estilos & Tokens
  - `tokens.css` com cores, spacing, radii, tipografia, sombras — disponíveis via CSS custom properties.
- Utilitários
  - `cn.ts` baseado em `clsx` para composição segura de classes.
- Integração Next.js
  - `apps/web/next.config.ts` atualizado com `transpilePackages: ['@devmarket/ui']`.
  - `packages/ui/package.json` com `sideEffects` para CSS e `peerDependencies` (`react`, `react-dom`).
  - `packages/ui/src/index.ts` importa `tokens.css` globalmente.
- Documentação & Kanban
  - `apps/web/README.md` atualizado com preview e integração.
  - `docs/dev_market_readme.md` ganhou seção “Design System e UI”.
  - `docs/kanban/devmarket-kanban.md` marcou tarefas de UI como concluídas.

### Camada 3 — Referências a arquivos (diff-friendly)

- Pacote UI
  - `packages/ui/src/styles/tokens.css` — tokens semânticos do design system.
  - `packages/ui/src/utils/cn.ts` — utilitário de classes.
  - `packages/ui/src/components/Button/Button.css|tsx` — spinner inline, circular, variantes e tamanhos.
  - `packages/ui/src/components/Card/Card.css|tsx` — variantes e sub-componentes.
  - `packages/ui/src/components/Avatar/Avatar.css|tsx` — imagem + fallback.
  - `packages/ui/src/components/Tag/Tag.css|tsx` — variantes de tag.
  - `packages/ui/src/components/Grid/Grid.css|tsx` — grid e gaps.
  - `packages/ui/src/components/MediaGallery/MediaGallery.css|tsx` — galeria responsiva.
  - `packages/ui/src/components/index.ts` — export central de componentes.
  - `packages/ui/src/index.ts` — re-export e import global de `tokens.css`.
- Web app
  - `apps/web/next.config.ts` — `transpilePackages` configurado.
  - `apps/web/src/pages/ui-preview.tsx` — página de preview dos componentes.
  - `apps/web/README.md` — instruções de uso do UI.
- Workspace & Docs
  - `packages/ui/package.json` — `sideEffects` e `peerDependencies`.
  - `docs/dev_market_readme.md` — seção de Design System e UI.
  - `docs/kanban/devmarket-kanban.md` — tarefas concluídas.

### Camada 4 — Notas comportamentais e compatibilidade

- Acessibilidade
  - `Button`: mantém label visível em `loading`; spinner marcado como `aria-hidden` e estado do botão pode usar `aria-busy`.
- Theming
  - Tokens são CSS custom properties; apps podem sobrepor valores via tema.
- Compatibilidade
  - `react` e `react-dom` são `peerDependencies` do UI; manter versões compatíveis no workspace.
  - `sideEffects` garante que CSS seja incluído corretamente em bundlers.

### Added

- Pacote `@devmarket/ui` com componentes base e tokens.
- Página de preview `apps/web/src/pages/ui-preview.tsx`.
- Import global de `tokens.css` no entry do UI.

### Changed

- `apps/web/next.config.ts` adiciona `transpilePackages` para `@devmarket/ui`.
- `apps/web/README.md` substituído por instruções do projeto e integração do UI.
- `docs/dev_market_readme.md` expandido com seção do Design System e UI.

### Fixed

- `Button` em `loading`: removido overlay absoluto, spinner inline e circular.

---

Mantemos este arquivo como registro de mudanças. Para detalhes e exemplos, consulte `docs/dev_market_readme.md` e o preview em `http://localhost:3000/ui-preview`.
