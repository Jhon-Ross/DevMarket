# apps/web — DevMarket (Next.js)

## Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
pnpm --filter web dev
```

Abra `http://localhost:3000` no navegador.

## Preview de UI

- Disponível apenas em ambiente de desenvolvimento.
- Acesse diretamente: `http://localhost:3000/ui-preview` (a rota retorna 404 em produção).
- Mostra componentes do pacote `@devmarket/ui` com variações e textos traduzidos via `LocaleProvider`.

## Controles de Interface

- Cabeçalho inclui seletor de idioma (PT/EN) e alternância de tema (Light/Dark).
- Preferências persistidas em `localStorage` e aplicadas ao `html` (`lang`/`data-locale` e classe `dark`).
- Mensagem antiga sobre tema escuro foi removida da Home.
- Overlay do Next (indicador flutuante) está desativado em dev (`devIndicators: false`).

### Internacionalização (i18n)

- `LocaleProvider` expõe `useLocale()` e `t(key)` para traduções.
- Textos traduzidos na Home, navegação, página de Feed, UI Preview, **Sobre** e **Signup**.
- Dicionário em `apps/web/src/components/LocaleProvider.tsx` com chaves como `home.*`, `nav.*`, `projects.*`, `uiPreview.*`, `about.*`, `signup.*`, e básicas para planos (`home.plans.*`).

## Integração com `@devmarket/ui`

- Este app transpila o pacote UI via `next.config.ts`:

```ts
// apps/web/next.config.ts
const nextConfig = {
  transpilePackages: ['@devmarket/ui'],
};
export default nextConfig;
```

- Importes típicos:
 
## Feed

- Rota: `/projetos` (feed unificado de atividades).
- Tipos de conteúdo: projetos, eventos, notícias e interesses.
- Componentes: `FeedItemCard` e `FeedPageClient` (separação Server/Client).
- Filtros: seleção por tipo usando `Tag` e layout em coluna com `Grid` (`gap="lg"`).
- Navegação: o menu mostra “Feed” e aponta para `/projetos`.

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Tag,
  Grid,
  MediaGallery,
} from '@devmarket/ui';

export default function Page() {
  return (
    <main>
      <Button variant="primary" size="md">
        Ação
      </Button>
      <Card elevated>
        <CardHeader>Título</CardHeader>
        <CardBody>Conteúdo</CardBody>
        <CardFooter>Ações</CardFooter>
      </Card>
    </main>
  );
}
```

## Observações

- O pacote `@devmarket/ui` importa `tokens.css` globalmente para expor as CSS variables.
- `react` e `react-dom` são `peerDependencies` do pacote UI; mantenha versões compatíveis no workspace.
- `Button` é um `<button>` e não suporta `href`. Para navegação, use `router.push('/rota')` (via `useRouter`) ou `<Link href="/rota">`.
- Em tema escuro, a variante `outline` tem contraste reforçado via `apps/web/src/app/globals.css` (bordas e texto ajustados).

### Theming (Dark Mode)

- O app aplica a classe `dark` ao `html` e expõe tokens semânticos (`--bg-*`, `--text-*`, `--border-*`, `--accent`, etc.).
- O pacote `@devmarket/ui` referencia esses tokens via bridging em `packages/ui/src/styles/tokens.css`:
  - Ex.: `--color-bg: var(--bg-default, #ffffff)`, `--color-text: var(--text-primary, #0f172a)`, `--color-border: var(--border-default, #e2e8f0)`.
- Isso evita que o UI sobrescreva `:root` e mantém a herança do tema entre páginas.
- Páginas validadas com dark mode consistente: `/signup`, `/projetos`, `/perfil/[slug]`, e Home.
- Observação: erros `net::ERR_BLOCKED_BY_ORB` do Sanity CDN em dev não afetam UI/tema; são bloqueios do ambiente.

## Autenticação, Navegação e Sessão

- NextAuth: provedor `Credentials` com `PrismaAdapter`.
- Páginas protegidas:
  - `/perfil/meu` e `/projetos/novo` usam `getServerSession(authOptions)`.
  - Em erro `JWT_SESSION_ERROR` (falha de decriptação), tratam como não autenticado e redirecionam para `/login` com `callbackUrl` apropriado.
- Login com `callbackUrl`:
  - `apps/web/src/app/login/page.tsx` decodifica e prioriza `callbackUrl` ao navegar após `signIn`.
  - Ex.: acessar `/perfil/meu` sem sessão redireciona para `/login?callbackUrl=%2Fperfil%2Fmeu`; após login, retorna para `/perfil/meu`.
- Sessão no cliente:
  - `apps/web/src/components/AuthProvider.tsx` encapsula `SessionProvider`.
  - `apps/web/src/app/layout.tsx` envolve a árvore com `AuthProvider` para habilitar `useSession()` em componentes client.
- Cabeçalho e navegação:
  - `NavLinks` mostra "Projetos" sempre e "Entrar" apenas quando não autenticado.
  - `UserMenu` exibe avatar (iniciais), nome/email e dropdown com "Meu Perfil", "Novo Projeto" e "Sair" quando autenticado.
  - Arquivos: `apps/web/src/components/NavLinks.tsx` e `apps/web/src/components/UserMenu.tsx`.
 
### Ambiente e troubleshooting

- Garanta `NEXTAUTH_URL=http://localhost:3000` e um `NEXTAUTH_SECRET` estável em `apps/web/.env.local`.
- Evite múltiplos processos de `next dev`; se trocar o `NEXTAUTH_SECRET`, pare o servidor, limpe cookies de sessão e reinicie.
- Valide a sessão em `http://localhost:3000/api/auth/session` após login.

### Dicas de Desenvolvimento

- Se aparecer `Runtime Error: invalid element type`, confira se o componente existe em `@devmarket/ui`.
  - Substituímos `Text`, `Input`, `Spacer` por elementos HTML para compatibilidade.
- Ao adicionar novos textos às páginas de auth, sempre inclua as chaves no `LocaleProvider`.
 
### Fluxos rápidos de validação

- Sem sessão: acessar `/perfil/meu` deve redirecionar para `/login` e, após login, voltar para o perfil.
- Logado: o menu de usuário no header aparece; "Sair" derruba sessão e volta à Home; o header volta a mostrar "Entrar".
