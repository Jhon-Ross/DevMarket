# prisma — Domínio Transacional

Responsabilidades
- `User`, `Subscription` (Stripe) e vínculo `sanityProfileId`.
- Migrations e evolução do schema.

Decisões
- Conteúdo público fica no Sanity; Prisma guarda autenticação e assinaturas.