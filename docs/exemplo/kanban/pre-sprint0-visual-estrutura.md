---
kanban-plugin: basic
---

# Kanban — Pré–Sprint 0 (Visual & Estrutura)

## Backlog
- [ ] Paleta e neutros definidos
  - Neutros: seguir escala inspirada no Primer (0–13, Light/Dark invertidos)
  - Backgrounds: usar steps 0–5 (bg-default ≈ step 2, bg-muted ≈ step 1)
  - Bordas: usar steps 7–8 (border-default ≈ 7, hover/active ≈ 8)
  - Texto: usar steps 9–10 (text-secondary ≈ 9, text-primary ≈ 10)
  - Acento: Stripe “blurple” primário `#5167FC` e secundário roxo `#5E46BF`
- [ ] Tipografia (escala, pesos) documentada
  - UI: `Geist Sans` (fallback: `Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, sans-serif`)
  - Mono: `Geist Mono` (fallback: `SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`)
  - Tamanhos: 12, 14, 16, 20, 24, 32, 48 (base 16), line-height 1.4–1.6
  - Pesos: 400 (regular), 500 (medium), 600 (semibold)
- [ ] Espaçamento/radius/shadow (escala) definidos
  - Espaço (base 4px): 0, 4, 8, 12, 16, 24, 32, 48
  - Radius: 4 (sm), 6 (md default), 8 (lg), 12 (pill)
  - Sombra: `--shadow-sm: 0 1px 0 rgba(31,35,40,0.06)`; `--focus-ring: 0 0 0 3px rgba(81,103,252,0.40)`
- [ ] Tokens semânticos mapeados (bg/text/border/accent/states)
  - `bg-default`, `bg-muted`, `text-primary`, `text-secondary`, `border-default`, `border-hover`
  - `accent`, `accent-foreground`, `success`, `danger`, `overlay`, `focus-ring`, `shadow-sm`
- [ ] CSS variables (Light/Dark) criadas
  - Light: mapear tokens aos steps neutros (bg/text/border) e acento `#5167FC`
  - Dark: inverter a escala neutra e ajustar `text` e `border` para contraste (WCAG ≥ 4.5)
- [ ] `globals.css` com reset e tipografia
  - Incluir reset (`box-sizing: border-box`, `font-smoothing`, `:focus-visible`), fontes e tokens
  - Aplicar `color-scheme: light dark` e variáveis globais
- [ ] App Router esboçado (páginas e APIs)
- [ ] `layout.tsx` com ThemeProvider e metadados
  - Injetar CSS vars via `:root` e `.dark` e alternância de tema
- [ ] Alias de imports e convenções de nomenclatura
- [ ] Acessibilidade base (foco/contraste/teclado)
  - Contraste mínimo: texto pequeno ≥ 4.5, texto grande ≥ 3.0; estados hover/active consistentes
- [ ] Documentação consolidada (`tokens-and-theme.md`)
  - Registrar decisões de escala, semânticos e exemplos de uso em componentes

## Em Progresso
- [ ] 

## Em Revisão
- [ ] 

## Concluído
- [ ]