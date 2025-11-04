import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Grid, Avatar, Tag, Button } from '@devmarket/ui';
import '@devmarket/ui';

type FeedPost = {
  id: string;
  authorName: string;
  authorSlug: string;
  authorAvatar?: string | null;
  imageUrl: string;
  title: string;
  caption?: string;
  techTags?: string[];
  likes?: number;
  createdAt?: string;
};

const feed: FeedPost[] = [
  {
    id: 'p1',
    authorName: 'Luan Dev',
    authorSlug: 'luan-dev',
    authorAvatar: 'https://cdn.sanity.io/images/demo/production/luan-avatar.png',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-1.jpg',
    title: 'Grimório de UI',
    caption: 'Biblioteca de componentes com tokens semânticos e acessibilidade.',
    techTags: ['Next.js', 'TypeScript', 'Design System'],
    likes: 128,
    createdAt: '2025-11-03T14:12:00Z',
  },
  {
    id: 'p2',
    authorName: 'Ana Code',
    authorSlug: 'ana-code',
    authorAvatar: 'https://cdn.sanity.io/images/demo/production/ana-avatar.png',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-2.jpg',
    title: 'Mapa de Quests',
    caption: 'Dashboard com filtros, ranking e gráficos interativos.',
    techTags: ['React', 'Charts', 'UX'],
    likes: 204,
    createdAt: '2025-11-03T13:00:00Z',
  },
  {
    id: 'p3',
    authorName: 'DevMarket',
    authorSlug: 'devmarket',
    authorAvatar: 'https://cdn.sanity.io/images/demo/production/devmarket.png',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-3.jpg',
    title: 'Taverna de Vídeo',
    caption: 'Player com comentários e atalhos místicos.',
    techTags: ['Video', 'UI', 'Accessibility'],
    likes: 76,
    createdAt: '2025-11-02T09:45:00Z',
  },
];

export const metadata = {
  title: 'Projetos (Mock • Feed Profissional) • DevMarket',
  description: 'Feed de projetos mockado, inspirado em rede social, foco profissional.',
};

export default function ProjetosMockPage() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>Projetos • Mock</h1>
      <p style={{ color: 'var(--color-muted)' }}>
        Exploração de projetos em formato de feed profissional.
      </p>

      <Grid columns={1} gap={24} style={{ marginTop: 'var(--space-6)' }}>
        {feed.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {post.authorAvatar ? (
                  <Avatar src={post.authorAvatar} alt={post.authorName} size={32} />
                ) : null}
                <div style={{ display: 'grid' }}>
                  <a href={`/perfil/${post.authorSlug}`} style={{ fontWeight: 700 }}>
                    {post.authorName}
                  </a>
                  {post.createdAt ? (
                    <time
                      dateTime={post.createdAt}
                      style={{ color: 'var(--color-muted)', fontSize: 12 }}
                    >
                      {new Date(post.createdAt).toLocaleString('pt-BR')}
                    </time>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{post.title}</h2>
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={860}
                height={480}
                unoptimized
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 10 }}
              />
              {post.caption ? <p style={{ marginTop: 12 }}>{post.caption}</p> : null}
              {post.techTags?.length ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {post.techTags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              ) : null}
            </CardBody>
            <CardFooter>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Button variant="ghost">❤️ {post.likes ?? 0}</Button>
                <Button variant="ghost">💬 Feedback</Button>
                <Button variant="ghost">↗️ Ver detalhes</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </section>
  );
}
