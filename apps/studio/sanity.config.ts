import { defineConfig } from 'sanity';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
// Carrega variáveis do .env na raiz do monorepo (se existirem)
dotenvConfig({ path: path.resolve(__dirname, '../../.env') });
dotenvConfig({ path: path.resolve(__dirname, '../../.env.local') });
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'devmarket-studio',
  title: 'DevMarket Studio',
  // Prefer variables with SANITY_STUDIO_ prefix; fallback to plain SANITY_* for local dev
  projectId: (process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID)!,
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
