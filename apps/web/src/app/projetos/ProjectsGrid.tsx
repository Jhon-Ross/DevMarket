'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';
import { Card, CardHeader, CardBody, Tag, Grid, Avatar } from '@devmarket/ui';

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

export default function ProjectsGrid({ projects }: { projects: PublicProject[] }) {
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const { t } = useLocale();

  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techTags?.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = React.useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) => p.techTags?.includes(activeTag));
  }, [projects, activeTag]);

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h2 style={{ marginBottom: 'var(--space-2)' }}>{t('projects.filters')}</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag
            variant={activeTag === null ? 'primary' : undefined}
            onClick={() => setActiveTag(null)}
          >
            {t('projects.all')}
          </Tag>
          {allTags.map((t) => (
            <Tag
              key={t}
              variant={activeTag === t ? 'primary' : undefined}
              onClick={() => setActiveTag(t)}
            >
              {t}
            </Tag>
          ))}
        </div>
      </div>

      <Grid columns={3} gap="sm">
        {filtered.map((p) => (
          <Card key={p._id} elevated>
            <CardHeader>
              <strong>{p.title}</strong>
            </CardHeader>
            <CardBody>
              {p.coverUrl ? (
                <div
                  style={{ width: '100%', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}
                >
                  <CoverImage src={p.coverUrl} alt={p.title} />
                </div>
              ) : null}
              {p.owner?.slug ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Avatar name={p.owner.name} src={p.owner.avatarUrl ?? undefined} size="sm" />
                  <span>
                    {t('projects.by')}{' '}
                    <Link
                      href={`/perfil/${p.owner.slug}`}
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {p.owner.name}
                    </Link>
                  </span>
                </div>
              ) : null}
              {p.description ? (
                <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>{p.description}</p>
              ) : null}

              {Array.isArray(p.mediaImages) && p.mediaImages.length > 0 ? (
                <div style={{ marginTop: 8, marginBottom: 8 }}>
                  <h4 style={{ marginBottom: 8 }}>Galeria</h4>
                  <MediaGallery
                    items={p.mediaImages.map((src, i) => ({
                      src,
                      alt: p.title || `Imagem ${i + 1}`,
                    }))}
                  />
                </div>
              ) : null}

              {Array.isArray(p.mediaFiles) && p.mediaFiles.length > 0 ? (
                <div style={{ marginTop: 8 }}>
                  <h4 style={{ marginBottom: 8 }}>Arquivos</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                    {p.mediaFiles.map((f, i) => (
                      <li key={f.url ?? i}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {f.filename || `Arquivo ${i + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {p.techTags?.length ? (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.techTags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              ) : null}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

function CoverImage({ src, alt }: { src: string; alt?: string }) {
  const [broken, setBroken] = React.useState(false);
  // Evita tentar renderizar arquivos (Sanity usa '/files/' para arquivos e '/images/' para imagens)
  if (!src.includes('/images/')) return null;
  if (broken) {
    // Fallback simples para garantir exibição mesmo se next/image rejeitar
    return (
      <Image
        src={src}
        alt={alt || 'Project cover'}
        width={1200}
        height={675}
        style={{ width: '100%', height: 'auto' }}
        onError={(e) => {
          // Se também falhar, oculta para evitar ícone quebrado
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt || 'Project cover'}
      width={1200}
      height={675}
      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ width: '100%', height: 'auto' }}
      onError={() => setBroken(true)}
    />
  );
}

type GalleryItem = { src: string; alt?: string };

function MediaGallery({ items }: { items: GalleryItem[] }) {
  if (!items?.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {items.map((item, i) => (
        <div key={item.src ?? i} style={{ overflow: 'hidden', borderRadius: 6 }}>
          <GalleryImage src={item.src} alt={item.alt || `Imagem ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt?: string }) {
  const [broken, setBroken] = React.useState(false);
  if (!src.includes('/images/')) return null;
  if (broken) {
    return (
      <Image
        src={src}
        alt={alt || 'Imagem'}
        width={400}
        height={300}
        style={{ width: '100%', height: 'auto' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt || 'Imagem'}
      width={600}
      height={600}
      sizes="150px"
      style={{ width: '100%', height: 'auto' }}
      onError={() => setBroken(true)}
    />
  );
}
