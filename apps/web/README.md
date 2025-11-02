# apps/web — DevMarket (Next.js)

## Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
pnpm --filter web dev
```

Abra `http://localhost:3000` no navegador.

## Preview de UI

- Página: `http://localhost:3000/ui-preview`
- Mostra todos os componentes do pacote `@devmarket/ui` com variações.

## Integração com `@devmarket/ui`

- Este app transpila o pacote UI via `next.config.ts`:

```ts
// apps/web/next.config.ts
const nextConfig = {
  transpilePackages: ["@devmarket/ui"],
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
  MediaGallery 
} from "@devmarket/ui";

export default function Page() {
  return (
    <main>
      <Button variant="primary" size="md">Ação</Button>
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
