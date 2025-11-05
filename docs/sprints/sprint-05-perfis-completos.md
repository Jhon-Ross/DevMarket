# Sprint 5 — Perfis Completos (Indivíduo e Empresa)

## Objetivo

Evoluir o perfil público (`/perfil/[slug]`) para uma página de portfólio completa e moderna, com personalizações por tipo de perfil (indivíduo vs. empresa), e ampliar o formulário autenticado (`/perfil/meu`) em seções.

## Critérios de Aceitação

- Cabeçalho do perfil com avatar/logo, nome, tagline, localização, badges de tipo de perfil e CTAs de contato.
- Seções: Sobre, Portfólio/Projetos, Serviços/Ofertas, Skills & Domínios, Conteúdos (posts/cases), Clientes/Avaliações, Links; Vagas para perfis de empresa.
- Renderização condicional conforme `profileType`.
- Formulário `/perfil/meu` estruturado em seções (Básico, Skills & Domínios, Serviços, Portfólio, Links, Empresa/Equipe/Vagas quando aplicável).
- Strings de UI atualizadas no `LocaleProvider`.

## Escopo Técnico

### Sanity (schemas)

- `userProfile`: adicionar campos `profileType`, `domains[]`, `services[]`, `availability`, `rateCard`, `location`, `companySize`, `industries[]`, `teamMembers[]`, `clients[]`.
- Garantir compatibilidade com dados existentes (campos novos opcionais).

### Next.js (apps/web)

- `/perfil/[slug]`: componentes de seção e layout condicional.
- `/perfil/meu`: dividir formulário em seções com componentes reutilizáveis.
- `LocaleProvider`: incluir chaves para novas seções e CTAs.

### UI (`@devmarket/ui`)

- Reutilizar `Card`, `Grid`, `Tag`, `Button`, `Avatar`, `MediaGallery`.
- Adicionar `FormSection` e `Stepper` se necessário para UX em formulários longos.

## Entregáveis

- Página pública de perfil completa para indivíduo e empresa.
- Formulário autenticado com seções e validações básicas.
- Documentação atualizada em `docs/dev_market_readme.md` e `docs/planning/sprints-overview.md`.

## Riscos e Mitigações

- Complexidade visual e condicional: mitigar com componentes modulares de seção.
- Strings e i18n: mitigar com revisão de `LocaleProvider` e fallback em PT.

## Checklist de Release

- [ ] Testes manuais de responsividade e acessibilidade.
- [ ] Validação de SEO (títulos/descrições por seção).
- [ ] Revisão de performance (imagens, media).
