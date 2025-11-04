import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_READ_TOKEN;

// Evita crash em tempo de execução quando variáveis de ambiente não estão configuradas.
// Fornece um cliente mínimo com fetch no-op, permitindo que páginas façam fallback gracioso.
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2023-10-01',
      useCdn: process.env.NODE_ENV === 'production',
      token,
    })
  : ({
      fetch: async (_query: string, _params?: Record<string, unknown>) => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[sanity] Variáveis ausentes: defina SANITY_PROJECT_ID (e SANITY_DATASET) para habilitar buscas.'
          );
        }
        return null;
      },
    } as unknown as ReturnType<typeof createClient>);
