# Backlog Pré–Sprint 0 — Visual & Estrutura

Objetivo
- Preparar decisões visuais (tokens/tema) e a arquitetura de pastas/rotas para iniciar o MVP com base sólida.

Tarefas (checklist)
- [ ] Definir paleta de marca e neutros (5–7 tons por escala)
- [ ] Tipografia: família, escala de tamanhos, pesos
- [ ] Espaçamento: escala (múltiplos de 4), radius e sombras
- [ ] Mapear tokens semânticos (bg, text, border, accent, states)
- [ ] Criar CSS variables do tema (Light/Dark) em `apps/web/src/styles/theme.css`
- [ ] Configurar `globals.css` (reset + tipografia) em `apps/web/src/styles`
- [ ] Estruturar App Router (rotas públicas e API) conforme `tree.txt`
- [ ] Layout global (`layout.tsx`) com ThemeProvider e metadados base
- [ ] Convenções de nomenclatura e alias de imports (`@ui/*`, `@sanity/*`, `@lib/*`, `@types/*`)
- [ ] Acessibilidade: foco visível, contraste, navegação por teclado
- [ ] Documentar decisões (por que e como) em `docs/design/tokens-and-theme.md`

Critérios de aceitação
- Tema Light/Dark funcionando sem alterar componentes.
- Páginas públicas têm layout responsivo, SEO básico e tokens aplicados.
- Estrutura de pastas validada e acordada (apps/packages/prisma).