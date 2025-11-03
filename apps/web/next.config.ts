import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure workspace packages are transpiled (TS, CSS) by Next
  transpilePackages: ['@devmarket/ui'],
  // Oculta o indicador/flutuante do Next em modo desenvolvimento
  devIndicators: false,
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
