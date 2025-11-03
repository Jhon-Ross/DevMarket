import { notFound } from "next/navigation";
import { sanityClient, userProfileBySlugQuery } from "@devmarket/sanity";

type ProfileProject = {
  _id: string;
  title: string;
  slug: string;
  techTags?: string[];
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

  return (
    <section>
      <h1>Perfil: {profile.name}</h1>
      {profile.bio && <p>{profile.bio}</p>}

      <h2>Projetos públicos</h2>
      {profile.projects && profile.projects.length > 0 ? (
        <ul>
          {profile.projects.map((p) => (
            <li key={p._id}>
              <strong>{p.title}</strong>
              {p.techTags?.length ? <span> — {p.techTags.join(", ")}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum projeto público encontrado.</p>
      )}
    </section>
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  return [] as { slug: string }[];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getData(slug);
  if (!profile) return { title: "Perfil não encontrado" };
  return {
    title: `Perfil • ${profile.name}`,
    description: profile.bio ?? `Perfil público de ${profile.name}`,
  };
}