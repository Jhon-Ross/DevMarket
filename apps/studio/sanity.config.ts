import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { approvePublicationPlugin } from './plugins/approve-publication';
import { rejectPublicationPlugin } from './plugins/reject-publication';

export default defineConfig({
  name: 'devmarket-studio',
  title: 'DevMarket Studio',
  // Prefer variables with SANITY_STUDIO_ prefix; fallback to plain SANITY_* for local dev
  projectId: (process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID)!,
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool(), approvePublicationPlugin(), rejectPublicationPlugin()],
  schema: {
    types: schemaTypes,
  },
});
