# Sprint 2 — Projetos & Mídia (2 semanas)

Objetivo
- CRUD de projetos, upload de imagens, integração de vídeo (Stream/Mux) e vitrine de projetos públicos.

Critérios de aceitação
- Criar/editar projeto autenticado; imagens via Sanity Assets.
- Vídeos exibidos com player e metadados no Sanity.
- Página `/project/:slug` pública com SSG/ISR.

Plano passo a passo
1) Schema `project`
   - Validar campos, `owner -> userProfile`, `isPublic`.
2) CRUD projeto
   - Server actions/handlers; validação com NextAuth/Prisma.
3) Uploads
   - Imagens no Sanity Assets; vídeo via Stream/Mux (guardar metadados no Sanity).
4) UI
   - `MediaGallery`, `Grid`, cards de projeto e navegação.
5) Página pública de projeto
   - GROQ + SSG/ISR; SEO.

Entregáveis
- CRUD projeto, upload mídia, páginas públicas de projeto.

Riscos
- Egress de vídeo alto: mitigar com CDN e limites de tamanho.