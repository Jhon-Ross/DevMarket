---
kanban-plugin: board
---

## Sprints

- [ ] ✅ Sprint 0 — Fundações
  - Monorepo, Next.js 16 + TS, tokens de design, tema Light/Dark, homepage, aliases, servidor dev.
- [ ] ✅ Sprint 1 — Perfil Público
  - GROQ `userProfile`, página pública com ISR + webhook, UI base (Avatar/Tag/Card), otimização de imagens.
- [ ] ✅ Sprint 2 — Projetos & Mídia
  - CRUD `project`, imagens (Sanity) + vídeo (Supabase), páginas públicas e grid/cards, renderização completa de mídia.
- [ ] 🔄 Sprint 3 — Pagamentos
  - Planos Dev/Empresa, escolha do provedor (Mercado Pago/PayPal/Stripe), checkout e webhook/IPN.
- [ ] ⏳ Sprint 4 — Hardening & QA
  - Testes unit/e2e, segurança, logs/métricas, CI/CD e performance.

## Em Progresso

- [ ] Configurar webhook de revalidação (Sanity → Next.js) para `/perfil/[slug]`.
- [ ] Homepage UX — definir estrutura e chaves i18n (`docs/planning/homepage-ux.md`).
- [ ] Criar Prisma schema (`User`, `Subscription`) e migrations.
- [ ] Melhorias de UX no Login: toggle de visibilidade da senha, mensagens de erro consistentes.

## Em Revisão

## Concluído

- [x] [Sprint 2] Expansão de queries GROQ: `description`, `coverUrl`, `mediaImages`, `mediaFiles`, `owner` completo.
- [x] [Sprint 2] Renderização completa de mídia: capa, galeria e arquivos em projetos.
- [x] [Sprint 2] Perfil público expandido: avatar, bio, skills, links e grid de projetos.
- [x] [Sprint 2] Consistência UI: `ProjectsGrid` em `/projetos` e `/perfil/[slug]`.
- [x] [Sprint 2] Fallbacks robustos: casos sem mídia e dados incompletos.
- [x] [Sprint 2] Otimização de tipos: alinhamento `PublicProject` ↔ `ProfileProject`.
- [x] [Histórico] Validação via GROQ no CDN: perfis e projetos públicos.
- [x] [Histórico] `@devmarket/sanity` integrado; build do `apps/web` ajustado.
- [x] [Histórico] Link do owner para `/perfil/[slug]`.
- [x] [Histórico] Leitura GROQ `userProfile` e listagem de `projects` em `/perfil/[slug]`.
- [x] [Histórico] `loading.tsx` e `not-found.tsx` em `/perfil/[slug]`.
- [x] [Histórico] Webhook `/api/webhooks/sanity` revalida `/perfil/[slug]`.
- [x] [Histórico] Query `publicProjectsQuery` em `@devmarket/sanity`.
- [x] [Histórico] Grid e filtros por `techTags` em `/projetos`.
- [x] [Histórico] Página "Projetos" SSR/ISR.
- [x] [Histórico] Documentos de teste (`userProfile`, `project`) com vínculo `owner`.
- [x] [Histórico] Sanity Studio ok em `http://localhost:3333/`.
- [x] [Histórico] `.env` e `sanity.config.ts` ajustados (`SANITY_STUDIO_*`).
- [x] [Histórico] Estrutura do monorepo e aliases.
- [x] [Histórico] Design system e tokens CSS (acessibilidade).
- [x] [Histórico] Next.js 16 + TS + App Router.
- [x] [Histórico] Homepage DevMarket funcional.
- [x] [Histórico] Servidor de desenvolvimento rodando.
- [x] [Histórico] Aliases TS configurados (@/_, @ui/_, @lib/\*, etc.).
- [x] [Histórico] pnpm workspace configurado.
- [x] [Histórico] UI base em `packages/ui` (Button, Card, Avatar, Tag, Grid, MediaGallery).
- [x] [Histórico] `@devmarket/ui` integrado; preview `/ui-preview`.
- [x] [Histórico] Ajuste do botão `loading` (spinner circular).
- [x] [Sprint 0] i18n em “Sobre” e “Signup” (`LocaleProvider` + chaves `about.*` e `signup.*`).
- [x] [Sprint 0] Correção da CTA em “Sobre”: navegação via `router.push('/signup')`.
- [x] [Sprint 0] Tema escuro: contraste reforçado para `Button` `outline`.
- [x] [Sprint 0] Mapeamento de tokens do design system em `globals.css` (light/dark).
- [x] [Sprint 0] Dicionário expandido com chaves de planos (`home.plans.*`).
- [x] [Auth] Login funcional com `Credentials`: rota `/login` e `pages.signIn` configurada.
- [x] [Auth] Dicionário i18n expandido com `auth.*` e `common.*` para evitar erros de runtime.
- [x] [UI] Refatoração do layout do Login com `CardHeader`, `CardBody`, `CardFooter` e inputs alinhados.
- [x] [UI] Remoção de imports inexistentes (`Text`, `Input`, `Spacer`) do `@devmarket/ui` e uso de HTML.
- [x] [Nav] Link “Entrar” adicionado ao cabeçalho (`NavLinks.tsx`) usando `t('nav.login')`.

%% kanban:settings

```
{"kanban-plugin":"board","list-collapse":[false,false,false]}
```

%%
