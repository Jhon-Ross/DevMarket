# Sprint 1 — Perfil Público (2 semanas)

## Objetivo
Entregar página pública de perfil com conteúdo do Sanity, CRUD de perfil autenticado, ISR e revalidação por webhook.

## Pré-requisitos ✅
- [x] Monorepo configurado com aliases TypeScript
- [x] Design system implementado com tokens CSS
- [x] Next.js 16 + App Router funcionando
- [x] Homepage base criada

## Critérios de Aceitação
- [ ] Página `/perfil/:slug` renderiza dados do `userProfile` via GROQ
- [ ] ISR com webhook do Sanity revalida no publish/update
- [ ] Edição de perfil (bio, skills, links, avatar) apenas autenticada (server-side)
- [ ] Componentes UI base funcionais (`Avatar`, `Tag`, `Card`, `Section`)
- [ ] Layout responsivo e acessível
- [ ] Performance score > 90 no Lighthouse

## Plano Técnico Detalhado

### 1. Componentes UI Base (`packages/ui`) - 3 dias
**Arquivos:**
```
packages/ui/src/
├── components/
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── Avatar.module.css
│   │   └── index.ts
│   ├── Button/
│   ├── Card/
│   ├── Tag/
│   └── Section/
└── index.ts
```

**Implementação:**
- Usar design tokens CSS (`var(--space-*)`, `var(--radius-*)`)
- TypeScript interfaces para props
- Variantes e tamanhos configuráveis
- Testes unitários com Vitest

### 2. Client Sanity (`packages/sanity`) - 2 dias
**Configuração:**
```typescript
// packages/sanity/src/client.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Server-side apenas
  token: process.env.SANITY_TOKEN // Apenas server-side
})

// packages/sanity/src/queries.ts
export const USER_PROFILE_QUERY = `
  *[_type == "userProfile" && slug.current == $slug][0] {
    _id,
    name,
    bio,
    avatar,
    skills,
    links,
    slug
  }
`
```

### 3. Perfil Público (`apps/web`) - 3 dias
**Estrutura:**
```
apps/web/src/app/
├── perfil/
│   └── [slug]/
│       ├── page.tsx      # ISR + SEO
│       ├── loading.tsx   # Skeleton
│       └── not-found.tsx # 404 customizado
```

**Implementação ISR:**
```typescript
// apps/web/src/app/perfil/[slug]/page.tsx
export const revalidate = 3600 // 1 hora

export async function generateStaticParams() {
  // Gerar paths para perfis populares
}

export async function generateMetadata({ params }) {
  // SEO dinâmico baseado no perfil
}
```

### 4. Webhook Revalidação - 1 dia
```typescript
// apps/web/src/app/api/webhooks/sanity/route.ts
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { _type, slug } = await request.json()
  
  if (_type === 'userProfile') {
    revalidatePath(`/perfil/${slug}`)
  }
  
  return Response.json({ revalidated: true })
}
```

### 5. CRUD de Perfil - 3 dias
**Server Actions:**
```typescript
// apps/web/src/lib/actions/profile.ts
'use server'

export async function updateProfile(formData: FormData) {
  const session = await getServerSession()
  if (!session) throw new Error('Unauthorized')
  
  // Validação com Zod
  // Mutation no Sanity
  // Revalidação
}
```

**Páginas:**
```
apps/web/src/app/
├── dashboard/
│   └── profile/
│       ├── page.tsx      # Formulário de edição
│       └── edit/
│           └── page.tsx  # Edição avançada
```

## Entregáveis
- [x] Componentes UI base testados
- [ ] Cliente Sanity configurado
- [ ] Página pública de perfil com ISR
- [ ] CRUD de perfil autenticado
- [ ] Webhook de revalidação
- [ ] Testes unitários > 80%
- [ ] Documentação de componentes

## Riscos e Mitigações
- **Vazamento de token Sanity**: Uso apenas server-side, variáveis de ambiente
- **Performance de imagens**: `next/image` + transformações Sanity
- **SEO**: Metadata dinâmica + structured data
- **Acessibilidade**: Testes automatizados + revisão manual

## Métricas de Sucesso
- Performance Lighthouse > 90
- Acessibilidade score > 95
- Tempo de carregamento < 2s
- Core Web Vitals aprovados