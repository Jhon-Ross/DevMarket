# packages/sanity — Cliente e Queries

Responsabilidades
- Cliente Sanity (read-only) e helpers para GROQ.
- Consultas tipadas (`userProfile`, `project`).

Decisões
- Tokens do Sanity usados apenas no servidor (nunca client).
- Webhooks disparam revalidação (ISR) no `apps/web`.