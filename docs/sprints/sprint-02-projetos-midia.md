# Sprint 2 — Projetos & Mídia (2 semanas)

Objetivo

- CRUD de projetos, upload de imagens, vídeo via Supabase Storage (player HTML5) e vitrine de projetos públicos.

Critérios de aceitação

- Criar/editar projeto autenticado; imagens via Sanity Assets.
- Vídeos armazenados no Supabase e exibidos com player HTML5 usando `signed URLs` (expiração curta) e metadados registrados no Sanity.
- Página `/project/:slug` pública com SSG/ISR.

Plano passo a passo

1. Schema `project`
   - Validar campos, `owner -> userProfile`, `isPublic`.
2. CRUD projeto
   - Server actions/handlers; validação com NextAuth/Prisma.
3. Uploads
   - Imagens no Sanity Assets; vídeo via Supabase Storage com `signed URLs` (metadados no Sanity).
4. UI
   - `MediaGallery`, `Grid`, cards de projeto e navegação.
5. Página pública de projeto
   - GROQ + SSG/ISR; SEO.

Entregáveis

- CRUD projeto, upload mídia, páginas públicas de projeto.

Riscos

- Egress de vídeo alto: mitigar com `signed URLs` com TTL curto, limites de tamanho e cache.
