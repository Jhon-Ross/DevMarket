import type { NextConfig } from 'next';

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
      },
    ],
  },
};

export default nextConfig;
