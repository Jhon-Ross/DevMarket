import { notFound } from 'next/navigation';
import { sanityClient, userProfileBySlugQuery } from '@devmarket/sanity';
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
  avatarUrl?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
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

  return <PerfilView profile={profile} />;
}

export const revalidate = 300;

export async function generateStaticParams() {
  return [] as { slug: string }[];
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
