import React from 'react';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { sanityClient } from '@devmarket/sanity';
import AppLink from '@/components/AppLink';
import { Card, CardHeader, CardBody, CardFooter, Grid, Tag, Button, Avatar } from '@devmarket/ui';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';

type ProjectDoc = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  techTags?: string[];
  coverUrl?: string | null;
  owner?: {
    _id: string;
    name: string;
    slug: string;
    avatarUrl?: string | null;
  } | null;
  mediaImages?: string[];
  mediaFiles?: { url: string; filename?: string }[];
};

async function fetchProject(owner: string, slug: string): Promise<ProjectDoc | null> {
  const query = `
    *[_type == "project" && isPublic == true && slug.current == $slug && owner->slug.current == $owner][0]{
      _id,
      title,
      description,
      "slug": slug.current,
      techTags,
      "owner": owner->{ _id, name, "slug": slug.current, "avatarUrl": avatar.asset->url },
      "coverUrl": coalesce(coverImage.asset->url, media[_type == "image"][0].asset->url),
      "mediaImages": media[_type == "image"].asset->url,
      "mediaFiles": media[_type == "file"]{ "url": asset->url, "filename": asset->originalFilename }
    }
  `;
  try {
    const doc = await sanityClient.fetch<ProjectDoc | null>(query, { owner, slug });
    return doc || null;
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: { owner: string; slug: string } }) {
  const { owner, slug } = params;
  let session = null as Awaited<ReturnType<typeof getServerSession>> | null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    // Em casos de JWT_SESSION_ERROR (falha de decriptação), tratamos como não autenticado
    console.error('[auth] getServerSession error:', e);
    // Limpa cookies potencialmente corrompidos/antigos do NextAuth para evitar loops de erro
    const store = cookies();
    const possibleCookies = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      'next-auth.csrf-token',
      '__Host-next-auth.csrf-token',
      '__Secure-next-auth.pkce.code_verifier',
    ];
    for (const name of possibleCookies) {
      try {
        if ((await store).get(name)) (await store).delete(name);
      } catch {}
    }
    session = null;
  }
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/projetos/${owner}/${slug}`)}`);
  }
  const project = await fetchProject(owner, slug);
  if (!project) {
    // Fallback amigável: projeto não encontrado ou ainda pendente
    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6)' }}>
        <Card elevated>
          <CardHeader>
            <strong>Projeto não encontrado</strong>
          </CardHeader>
          <CardBody>
            <p>
              O projeto "{slug}" do perfil "{owner}" pode estar pendente de moderação ou ainda não foi
              publicado como público.
            </p>
            <p style={{ color: 'var(--color-muted)' }}>
              Quando o projeto estiver público, esta página exibirá os detalhes completos.
            </p>
          </CardBody>
          <CardFooter style={{ display: 'flex', gap: 12 }}>
            <AppLink href={`/perfil/${owner}`}>
              <Button variant="ghost">↩️ Voltar ao perfil</Button>
            </AppLink>
            <AppLink href="/projetos">
              <Button variant="ghost">Todos os projetos</Button>
            </AppLink>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--space-6)' }}>
      <Card elevated>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {project.owner?.avatarUrl ? (
              <Avatar src={project.owner.avatarUrl} alt={project.owner.name} size="sm" />
            ) : (
              <Avatar name={project.owner?.name} size="sm" />
            )}
            <div style={{ display: 'grid' }}>
              {project.owner?.slug ? (
                <AppLink href={`/perfil/${project.owner.slug}`} style={{ fontWeight: 700 }}>
                  {project.owner.name}
                </AppLink>
              ) : (
                <strong>{project.owner?.name}</strong>
              )}
              <span style={{ color: 'var(--color-muted)', fontSize: 12 }}>Projeto público</span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Tag variant="primary">Projeto</Tag>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{project.title}</h1>
          {project.coverUrl ? (
            <Image
              src={project.coverUrl}
              alt={project.title}
              width={860}
              height={480}
              unoptimized
              style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 10 }}
            />
          ) : null}
          {project.description ? <p style={{ marginTop: 12 }}>{project.description}</p> : null}
          {project.techTags?.length ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {project.techTags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          ) : null}

          {/* Mídias anexas (imagens) */}
          {project.mediaImages?.length ? (
            <Grid columns={2} gap="md" style={{ marginTop: 'var(--space-6)' }}>
              {project.mediaImages.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt={project.title}
                  width={420}
                  height={240}
                  unoptimized
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
                />
              ))}
            </Grid>
          ) : null}

          {/* Arquivos anexos */}
          {project.mediaFiles?.length ? (
            <div style={{ marginTop: 'var(--space-6)' }}>
              <strong>Arquivos</strong>
              <ul>
                {project.mediaFiles.map((f) => (
                  <li key={f.url}>
                    <AppLink href={f.url} prefetch={false}>
                      {f.filename || f.url}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardBody>

        <CardFooter style={{ display: 'flex', gap: 12 }}>
          <AppLink href={`/perfil/${project.owner?.slug ?? owner}`}>
            <Button variant="ghost">↩️ Voltar ao perfil</Button>
          </AppLink>
          <AppLink href="/projetos">
            <Button variant="ghost">Todos os projetos</Button>
          </AppLink>
        </CardFooter>
      </Card>
    </main>
  );
}

export const metadata = {
  title: 'Projeto • DevMarket',
};