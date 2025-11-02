# apps/web — Next.js (App Router)

Responsabilidades
- Páginas públicas (`/dev/:slug`, `/project/:slug`) com SSG/ISR.
- Rotas de API (webhooks Sanity/Stripe, server actions).
- Layout global e ThemeProvider (aplica tokens semânticos).
- Integração NextAuth para autenticação.

Decisões
- Containers com lógica de dados ficam em `apps/web`.
- Componentes puramente visuais ficam em `packages/ui`.
- SEO configurado em Server Components (metadados por página).