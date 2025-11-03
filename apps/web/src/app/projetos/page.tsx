import { sanityClient, publicProjectsQuery } from "@devmarket/sanity";
import ProjectsGrid from "./ProjectsGrid";

type PublicProject = {
  _id: string;
  title: string;
  slug: string;
  techTags?: string[];
  owner?: { _id: string; name: string; slug: string } | null;
  coverUrl?: string | null;
};

async function getProjects(): Promise<PublicProject[]> {
  const data = await sanityClient.fetch<PublicProject[]>(publicProjectsQuery);
  return Array.isArray(data) ? data : [];
}

export const revalidate = 300;

export const metadata = {
  title: "Projetos • DevMarket",
  description: "Lista de projetos públicos criados por desenvolvedores na plataforma.",
};

export default async function ProjetosPage() {
  const projects = await getProjects();

  return (
    <section>
      <h1>Projetos</h1>
      {projects.length > 0 ? <ProjectsGrid projects={projects} /> : <p>Nenhum projeto público encontrado.</p>}
    </section>
  );
}