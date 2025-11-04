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
- Textos traduzidos na Home, navegação, página de Projetos, UI Preview, **Sobre** e **Signup**.
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

## Autenticação e Cadastro

- Fluxo: `next-auth` com provedor `Credentials` (email/senha) e `PrismaAdapter`.
- Página de Login: `/login` — usa `CardHeader`, `CardBody` e `CardFooter` do `@devmarket/ui`.
  - Inputs estilizados com HTML padrão (o pacote UI não fornece `Input`/`Text`/`Spacer`).
  - Botão "Entrar" no `CardFooter` com estado `loading` usando `Button` do UI.
  - Link para cadastro: `{t('auth.login.toSignup')}` → navega para `/signup`.
- Página de Cadastro: `/signup` — validação simples (campos obrigatórios e confirmação de senha).
- Internacionalização:
  - Chaves adicionadas em `LocaleProvider`: `auth.login.*`, `auth.email`, `auth.password`, `common.loading`, `common.redirecting`.
  - Evita erros de chave ausente e mantém PT/EN.
- Navegação:
  - Link "Entrar" adicionado ao cabeçalho em `apps/web/src/components/NavLinks.tsx` via `t('nav.login')`.
- Integração com NextAuth:
  - `apps/web/src/app/api/auth/[...nextauth]/route.ts` define `pages.signIn = '/login'`.
  - Login programático: `await signIn('credentials', { email, password, redirect: false })`.

### Dicas de Desenvolvimento

- Se aparecer `Runtime Error: invalid element type`, confira se o componente existe em `@devmarket/ui`.
  - Substituímos `Text`, `Input`, `Spacer` por elementos HTML para compatibilidade.
- Ao adicionar novos textos às páginas de auth, sempre inclua as chaves no `LocaleProvider`.
