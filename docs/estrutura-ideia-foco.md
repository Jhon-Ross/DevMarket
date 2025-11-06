# DevMarket — Estrutura, Ideia e Foco Final

## Visão Geral
- Plataforma para que desenvolvedores apresentem portfólio, perfil e projetos, com validação e publicação moderada.
- A experiência começa com perfis públicos de alta qualidade e evolui para conteúdos (posts/cases) e monetização.

## Propósito
- Ser o ponto de encontro central da comunidade tech, conectando perfis (profissionais/empresas), projetos, vagas, eventos e conteúdo técnico.

## Público-Alvo
- Desenvolvedores, designers, analistas, QAs, devops, estudantes e freelancers.
- Startups, empresas e recrutadores do setor de tecnologia.
- Escolas, universidades e instituições promotoras de eventos/formações.

## Problema e Solução
- Problema: dificilmente perfis técnicos têm uma vitrine consistente e verificável, consolidando habilidades e trabalhos.
- Solução: um perfil público unificado (páginas e APIs) + CMS (Sanity) com moderação e revalidação automática.

## Público-Alvo
- Desenvolvedores, freelancers e pequenas equipes técnicas buscando visibilidade e validação.

## Diferenciais
- Publicação moderada e revalidada em tempo real via webhooks.
- Base tecnológica moderna (Next 16 + Sanity) e monorepo com compartilhamento de UI/Tipos.
- Roadmap claro para monetização, reputação e criação de conteúdo.

## Principais Funcionalidades
- Feed social interativo (projetos, vídeos, atualizações, anúncios), com curtidas/comentários/compartilhamentos e filtros.
- Perfis ricos e customizáveis (bio, tecnologias, projetos com mídia, certificações/experiências, temas visuais, controle de visibilidade).
- Tipos de perfis: Profissional (exibir e crescer) e Empresa (vagas/eventos/parcerias/anúncios).
- Planos e benefícios: Free, Pro e Topzera com recursos progressivos (destaque, métricas, suporte, ranking).

## Escopo Atual
- Perfil público com avatar, capa, bio, links e skills.
- CMS no Studio para criação/edição e moderação do `userProfile`.
- Endpoints para avatar e capa, com revalidação do perfil por `slug`.

## Escopo Final (Objetivo)
- Perfis completos com projetos e conteúdos (posts/cases), SEO e compartilhamento.
- Monetização via pagamentos, reputação e métricas.
- Observabilidade, CI/CD robusto e experiência de edição refinada.

## Planos e Benefícios
- Free: perfil básico (até 3 projetos, 1 vídeo).
- Pro: perfil completo, vídeos ilimitados, destaque no feed e ranking.
- Topzera: inclui insights de visitas, suporte prioritário e métricas avançadas.
- Em estudo: verificação de perfil, estatísticas de engajamento e impulsionamento de publicações.

## Arquitetura (Monorepo pnpm)
- `apps/web`: Next.js 16 (app router), páginas `perfil/[slug]` e `perfil/meu`, rotas API.
- `apps/studio`: Sanity Studio, schemas de `userProfile` e ações de moderação.
- `packages/ui`: componentes compartilhados (design system base).
- `packages/types`: tipos compartilhados (ex.: `UserProfile`, `Link`, `Project`).
- `packages/sanity`: cliente Sanity e utilitários de build/query.
- `packages/lib`: funções utilitárias e helpers de integração.
- `prisma/`: migrações e schema (planejado para futuras features).
- `scripts/`: automações (ex.: atualização de changelog).

### Evolução de Dados e Integração
- Sanity (CMS) segue como fonte para `userProfile` e metadados moderados.
- Prisma evolui para posts e interações sociais (likes, comentários, compartilhamentos) e métricas.
- Webhooks Sanity → Next revalidam perfis; futuramente, filas/cron para ranking e insights.

## Perfil (Modelo Sanity)
- Documento `userProfile` com campos: `name`, `slug`, `avatarImage`, `heroImage`, `bio`, `skills`, `links`, `projects`.
- Fluxo: editar no Studio/Meu Perfil → publicar/moderar → webhook revalida página pública.

### Tipos de Perfil
- Profissional: foco em projetos, exibição e oportunidades.
- Empresa: vagas, eventos, editais, parcerias e anúncios.

## Páginas
- `perfil/[slug]`: Perfil público, consome `userProfileBySlug`.
- `perfil/meu`: Edição do perfil autenticado (avatar/capa/bio/skills/links).

## Feed Social
- Página/rota dedicada ao feed agregando posts (projetos, vídeos, anúncios).
- Algoritmo de destaque baseado em relevância, área e popularidade.

## APIs
- `GET /api/profile`: Perfil autenticado.
- `POST /api/profile/avatar`: Upload de avatar + preview na UI.
- `POST /api/profile/hero`: Upload de capa com sincronização por `slug` e revalidação.
- `GET /api/debug/profile/[slug]`: Inspeção do payload por `slug` (debug).

### Em Planejamento
- Endpoints para posts do feed (CRUD), interações (likes/comentários/compartilhamentos) e ranking.
- Integração de pagamentos (Stripe) e gestão de planos/benefícios.
- Autenticação consolidada e RBAC (usuário/empresa/admin) com policies nas APIs.

## Políticas e Convenções
- i18n pensado desde o início; acessibilidade e SEO como metas de qualidade.
- Commits semânticos, lint/format com Husky, monorepo organizado por apps/packages.

## Roadmap (Próximos Passos)
1. Feed social com interações (comentários e ranking de destaque).
2. Planos de assinatura e gateway de pagamento.
3. Painel de insights (visitas e alcance) e métricas.
4. Notificações e chat interno entre perfis.
5. Lançamento beta público para testes.

## Missão
- Dar visibilidade real a quem cria e compartilha tecnologia, conectando pessoas e empresas de forma transparente e moderna.

## Visão de Futuro
- Ser a principal rede profissional e criativa da comunidade tech na América Latina.