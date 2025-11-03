import { sanityClient, publicProjectsQuery } from '@devmarket/sanity';
import ProjectsView from './ProjectsView';

type PublicProject = {
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

async function getProjects(): Promise<PublicProject[]> {
  const data = await sanityClient.fetch<PublicProject[]>(publicProjectsQuery);
  return Array.isArray(data) ? data : [];
}

export const revalidate = process.env.NODE_ENV === 'production' ? 300 : 0;

export const metadata = {
  title: 'Projetos • DevMarket',
  description: 'Lista de projetos públicos criados por desenvolvedores na plataforma.',
};

export default async function ProjetosPage() {
  const projects = await getProjects();
  return <ProjectsView projects={projects} />;
}
