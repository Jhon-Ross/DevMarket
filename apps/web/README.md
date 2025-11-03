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
- Textos traduzidos na Home, navegação, página de Projetos e UI Preview.
- Dicionário em `apps/web/src/components/LocaleProvider.tsx` com chaves como `home.*`, `nav.*`, `projects.*`, `uiPreview.*`.

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
