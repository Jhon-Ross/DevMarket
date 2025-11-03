# DevMarket — Visão Geral de Sprints

Objetivo: entregar um MVP com Sanity (conteúdo) + Next.js + Prisma/Stripe (transacional), evoluindo em sprints curtas e focadas.

Linha do tempo e status

- ✅ Sprint 0 (1 semana): Fundação do projeto, ambientes, schemas básicos do Sanity.
- ✅ Sprint 1 (2 semanas): Perfil público (CRUD Sanity) + página SSR/SSG/ISR.
- ✅ Sprint 2 (2 semanas): Cadastro de usuários e projetos; mídia com imagens (Sanity) e vídeo via Supabase Storage (player HTML5); listagens em cards.
- 🔄 Sprint 3 (1–2 semanas): Pagamentos e assinaturas (provedor em avaliação: Mercado Pago, PayPal ou Stripe), visibilidade Pública/Privada com gating pago e planos Dev/Empresa.
- ⏳ Sprint 4 (2 semanas): Hardening, QA, testes, segurança, CI/CD.

## Status Atual (Janeiro 2025)

**Sprints concluídas:** 0, 1, 2  
**Próxima sprint:** 3 (Pagamentos)  
**Principais entregas recentes:**

- Renderização completa de mídia em projetos e perfis
- Queries GROQ expandidas com fallbacks robustos
- UI consistente entre páginas `/projetos` e `/perfil/[slug]`

Planos (em avaliação)

- Dev: Free (perfil básico, 3 projetos, 1 vídeo), Pro (perfil completo, vídeos ilimitados, destaque; R$19,90/mês), Premium (tudo do Pro + insights; R$39,90/mês).
- Empresa: Basic (buscar/visualizar perfis; grátis), Business (contatos diretos + filtros avançados; R$49,90/mês), Enterprise (API + destaque da marca + vagas ilimitadas; negociável).

Entregáveis por sprint

- Incremento funcional com critérios de aceitação claros.
- Documentos atualizados (sprint plan + kanban).
- Checklist de release atendido e custos atualizados.

Critérios de sucesso gerais

- Sanity como fonte de conteúdo público e metadados de mídia.
- Usuários/assinaturas no Postgres/Prisma.
- Páginas públicas com SEO (SSG/ISR) e webhooks do Sanity para revalidação (configurados apenas após deploy).
- Listagens de perfis/projetos em cards (nome, avatar, bio; título, descrição, links e mídia).
- Visibilidade Pública/Privada funcional, com gating pago.
- Stripe para monetização, com reconcílio por webhook.
