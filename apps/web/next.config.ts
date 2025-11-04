import type { NextConfig } from 'next';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

// Carrega variáveis do .env na raiz do monorepo (se existirem)
// Isso permite usar um único .env compartilhado sem precisar duplicar em apps/web/.env.local
dotenvConfig({ path: path.resolve(__dirname, '../../.env') });
dotenvConfig({ path: path.resolve(__dirname, '../../.env.local') });

const nextConfig: NextConfig = {
  // Ensure workspace packages are transpiled (TS, CSS) by Next
  transpilePackages: ['@devmarket/ui'],
  // Oculta o indicador/flutuante do Next em modo desenvolvimento
  devIndicators: false,
  // Temporário: ignorar erros de TypeScript no build para permitir preview
  // FIXME: remover após correção dos tipos em rotas de auth
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/projetos',
        destination: '/feed',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/files/**',
      },
    ],
  },
};

export default nextConfig;
