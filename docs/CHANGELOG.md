# Changelog — DevMarket

Formato baseado em Keep a Changelog e organizado em camadas para inspeção precisa. Versões seguirão SemVer quando houver publicação.

## [Unreleased]
- Documentação de tokens individual
- Testes de componentes (`packages/ui`)
- Storybook opcional para o Design System

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