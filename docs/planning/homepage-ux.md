# Homepage — UX e Conteúdo

Objetivo
- Definir a estrutura, conteúdo e métricas da homepage para comunicar claramente a proposta de valor do DevMarket e direcionar o usuário à ação (descoberta de projetos, cadastro e aprendizado).

Público-alvo
- Desenvolvedores independentes e equipes técnicas que querem divulgar projetos e portfólios.
- Empresas que procuram talentos e projetos para contratação ou parceria.

Proposta de valor (Value Proposition)
- "Mostre seus projetos com mídia rica, encontre oportunidades e destaque-se em um marketplace técnico." (PT)
- "Showcase your projects with rich media, find opportunities, and stand out in a technical marketplace." (EN)

Arquitetura de Seções
1) Hero
   - Headline + subheadline curtos e claros
   - Dois CTAs principais (Começar / Aprender)
   - Possível ilustração/cover hero
2) Highlights (Benefícios)
   - 3–5 cartões com benefícios para Devs e Empresas
3) Social Proof (Provas sociais)
   - Depoimentos curtos ou logos de parceiros (quando disponíveis)
4) Showcase (Demonstração)
   - Screenshots ou cards exemplificando projetos e perfis
5) Como funciona (3 passos)
   - Passo 1: Crie seu perfil
   - Passo 2: Publique projetos com mídia
   - Passo 3: Ganhe visibilidade e conexões
6) Planos (opcional/preview)
   - Links para página de pricing quando disponível
7) FAQ (opcional)
   - 3–5 perguntas comuns
8) Footer
   - Navegação secundária, links de contato e políticas

Mapeamento de CTAs
- CTA primário (Começar): `href: /projetos` ou `href: /signup` (decisão de produto)
- CTA secundário (Aprender): `href: /sobre` ou `href: /docs`
- Eventos de analytics:
  - `home_cta_start_click`
  - `home_cta_learn_click`
  - `home_showcase_view`
  - `home_scroll_depth_50` / `home_scroll_depth_90`

Componentização (Design System `@devmarket/ui`)
- Usar `Section`, `Card`, `Grid`, `Button`, `Tag`, `Avatar`, `MediaGallery`.
- Remover estilos inline e aplicar tokens de design (spacing, radius, shadow).

SEO/OG
- Title: "DevMarket — Mostre seus projetos, encontre oportunidades"
- Description: 160–180 caracteres com proposta de valor.
- Open Graph: imagem 1200×630, `og:title`, `og:description`, `og:url`.
- Twitter Card: `summary_large_image`.
- Canonical: URL principal da homepage.

Acessibilidade
- Foco visível em todos os elementos interativos.
- Navegação por teclado (tab order lógico) e `aria-label` nos botões.
- Contrast ratio conforme WCAG AA.

Conteúdo i18n (chaves sugeridas)
- `home.title`
- `home.subtitle`
- `home.ctaStart` / `home.ctaLearn`
- `home.dev.title` / `home.dev.desc`
- `home.comp.title` / `home.comp.desc`
- `home.real.title` / `home.real.desc`
- Novas chaves:
  - `home.social.title`
  - `home.social.quotes.1` … `home.social.quotes.N`
  - `home.showcase.title`
  - `home.showcase.items.1.title` / `.desc`
  - `home.how.title`
  - `home.how.step1.title` / `.desc`
  - `home.how.step2.title` / `.desc`
  - `home.how.step3.title` / `.desc`
  - `home.plans.title` / `home.faq.title`

Métricas e Sucesso
- CTR dos CTAs primário/segundário.
- Scroll-depth (50%/90%).
- Tempo na página e engajamento com showcase.
- Conversões para cadastro ou criação de perfil.

Aceitação (para marcar "Homepage UX" concluída)
- Documento publicado e versionado.
- Kanban atualizado com tarefas detalhadas.
- Chaves i18n criadas e revisadas (PT/EN).
- Rotas dos CTAs definidas e instrumentadas.
- Checklist SEO/OG aplicado.