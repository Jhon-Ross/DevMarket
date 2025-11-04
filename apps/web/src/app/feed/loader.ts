import 'server-only';
import type { FeedItem } from './FeedItemCard';
import { sanityClient } from '@devmarket/sanity';
import { publicProjectsQuery } from '@devmarket/sanity';

type SanityProjectOwner = {
  _id: string;
  name: string;
  slug: string;
  avatarUrl?: string | null;
};

type SanityProject = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  techTags?: string[];
  owner?: SanityProjectOwner | null;
  coverUrl?: string | null;
  mediaImages?: string[];
  mediaFiles?: { url: string; filename?: string }[];
};

export async function loadFeedFromSanity(): Promise<FeedItem[]> {
  try {
    const projects = await sanityClient.fetch<SanityProject[]>(publicProjectsQuery);
    return projects.map((p) => ({
      id: p._id,
      type: 'project',
      title: p.title,
      description: p.description,
      imageUrl: p.coverUrl ?? undefined,
      techTags: p.techTags,
      likes: undefined,
      createdAt: undefined,
      author: p.owner
        ? {
            name: p.owner.name,
            slug: p.owner.slug,
            avatarUrl: p.owner.avatarUrl ?? undefined,
            role: 'dev',
          }
        : undefined,
      cta: [{ label: 'Ver detalhes', href: `/projetos/${p.owner?.slug}/${p.slug}` }],
    }));
  } catch (e) {
    console.error('[feed] loadFeedFromSanity error:', e);
    return [];
  }
}
