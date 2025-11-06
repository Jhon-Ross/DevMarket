import { notFound } from 'next/navigation';
import { sanityClient, userProfileBySlugQuery, popularUserSlugsQuery } from '@devmarket/sanity';
import PerfilView from './PerfilView';

type ProfileProject = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  techTags?: string[];
  owner?: { _id: string; name: string; slug: string; avatarUrl?: string | null } | null;
  coverUrl?: string | null;
  mediaImages?: string[];
  mediaFiles?: { url: string; filename?: string }[];
};

type UserProfile = {
  _id: string;
  name: string;
  bio?: string;
  tagline?: string;
  heroUrl?: string;
  avatarUrl?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
  customization?: { theme?: any; layout?: string; sections?: any };
  experience?: { role?: string; company?: string; startDate?: string; endDate?: string; description?: string }[];
  testimonials?: { author?: string; quote?: string; avatarUrl?: string }[];
  slug: string;
  projects?: ProfileProject[];
};

async function getData(slug: string): Promise<UserProfile | null> {
  const data = await sanityClient.fetch<UserProfile | null>(userProfileBySlugQuery, { slug });
  return data ?? null;
}

export default async function PerfilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getData(slug);

  if (!profile) return notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${siteUrl}/perfil/${profile.slug}`,
    image: profile.avatarUrl || undefined,
    description: profile.bio || undefined,
    sameAs: Array.isArray(profile.links) ? profile.links.map((l) => l.url).filter(Boolean) : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PerfilView profile={profile} />
    </>
  );
}

export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[] | null>(popularUserSlugsQuery);
    const list = Array.isArray(slugs) ? slugs : [];
    return list.map((s) => ({ slug: s.slug })).filter((p) => !!p.slug);
  } catch {
    return [] as { slug: string }[];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getData(slug);
  if (!profile) return { title: 'Perfil não encontrado' };
  return {
    title: `Perfil • ${profile.name}`,
    description: profile.bio ?? `Perfil público de ${profile.name}`,
  };
}
