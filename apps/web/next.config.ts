import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure workspace packages are transpiled (TS, CSS) by Next
  transpilePackages: ['@devmarket/ui'],
  // Oculta o indicador/flutuante do Next em modo desenvolvimento
  devIndicators: false,
};

export default nextConfig;
