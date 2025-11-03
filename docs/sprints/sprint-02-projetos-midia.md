# Sprint 2 — Projetos & Mídia (2 semanas) ✅ CONCLUÍDA

## Status: CONCLUÍDA

**Data de conclusão:** Janeiro 2025  
**Principais entregas:** GROQ queries expandidas, renderização completa de mídia, ProjectsGrid com fallbacks

Objetivo

- CRUD de projetos, upload de imagens, vídeo via Supabase Storage (player HTML5) e vitrine de projetos públicos.

Critérios de aceitação

- [x] Criar/editar projeto autenticado; imagens via Sanity Assets.
- [x] Vídeos armazenados no Supabase e exibidos com player HTML5 usando `signed URLs` (expiração curta) e metadados registrados no Sanity.
- [x] Página `/project/:slug` pública com SSG/ISR.
- [x] **EXTRA:** Renderização completa de mídia em cards de projeto (capa, galeria, arquivos)
- [x] **EXTRA:** Aplicação da mesma lógica na página de perfil

Plano passo a passo

1. [x] Schema `project`
   - Validar campos, `owner -> userProfile`, `isPublic`.
2. [x] CRUD projeto
   - Server actions/handlers; validação com NextAuth/Prisma.
3. [x] Uploads
   - Imagens no Sanity Assets; vídeo via Supabase Storage com `signed URLs` (metadados no Sanity).
4. [x] UI
   - `MediaGallery`, `Grid`, cards de projeto e navegação.
5. [x] Página pública de projeto
   - GROQ + SSG/ISR; SEO.
6. [x] **IMPLEMENTADO:** Queries expandidas para mídia completa
   - `publicProjectsQuery` e `userProfileBySlugQuery` incluem `coverUrl`, `mediaImages`, `mediaFiles`
7. [x] **IMPLEMENTADO:** ProjectsGrid com fallbacks
   - `next/image` com fallback `<img>` para compatibilidade
   - Renderização de galeria de imagens e lista de arquivos para download

Entregáveis

- [x] CRUD projeto, upload mídia, páginas públicas de projeto.
- [x] **EXTRA:** Renderização completa de conteúdo do usuário em cards
- [x] **EXTRA:** Aplicação consistente entre páginas de projetos e perfil

## Desafios Enfrentados e Soluções

### 1. Cards de Projeto Vazios

**Problema:** Projetos não exibiam capa, galeria ou arquivos apesar de estarem cadastrados no Sanity.
**Causa:** Query GROQ não incluía campos de mídia (`coverUrl`, `mediaImages`, `mediaFiles`).
**Solução:** Expandiu `publicProjectsQuery` para incluir:

```groq
"coverUrl": coalesce(
  coverImage.asset->url,
  media[_type == "sanity.imageAsset"][0].asset->url
),
"mediaImages": media[_type == "sanity.imageAsset"].asset->url,
"mediaFiles": media[_type == "sanity.fileAsset"]{
  "url": asset->url,
  "filename": asset->originalFilename
}
```

### 2. Erro de Imagem Inválida

**Problema:** `next/image` rejeitava arquivos `.txt` tentando otimizá-los como imagem.
**Erro:** `The resource isn't a valid image for https://cdn.sanity.io/.../file.txt`
**Solução:** Implementou fallback `<img>` nos componentes `CoverImage` e `MediaGallery`:

```tsx
<Image
  onError={() => setImageError(true)}
  // ... props
/>;
{
  imageError && (
    <img src={src} alt={alt} style={{ display: 'none' }} onError={() => setImageError(true)} />
  );
}
```

### 3. Pacote Sanity Desatualizado

**Problema:** Mudanças em `packages/sanity/src/queries.ts` não refletiam no app web.
**Causa:** App usava versão cached/buildada do pacote `@devmarket/sanity`.
**Solução:** Rebuild do pacote + restart do dev server:

```bash
pnpm -C packages/sanity build
pnpm -C apps/web dev
```

### 4. Inconsistência entre Páginas

**Problema:** Página de projetos mostrava conteúdo completo, mas perfil mostrava apenas título dos projetos.
**Solução:** Expandiu `userProfileBySlugQuery` e reutilizou `ProjectsGrid` na página de perfil.

Riscos

- [x] Egress de vídeo alto: mitigado com `signed URLs` com TTL curto, limites de tamanho e cache.
- [x] Performance de imagens: resolvido com `next/image` + fallbacks + `cdn.sanity.io` em `remotePatterns`.
