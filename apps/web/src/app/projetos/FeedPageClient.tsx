"use client";
import React from 'react';
import { Grid, Tag } from '@devmarket/ui';
import '@devmarket/ui';
import FeedItemCard, { FeedItem, FeedItemType } from './FeedItemCard';

const demoFeed: FeedItem[] = [
  {
    id: 'p1',
    type: 'project',
    title: 'Grimório de UI',
    description: 'Biblioteca de componentes com tokens semânticos e acessibilidade.',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-1.jpg',
    techTags: ['Next.js', 'TypeScript', 'Design System'],
    likes: 128,
    createdAt: '2025-11-03T14:12:00Z',
    author: {
      name: 'Luan Dev',
      slug: 'luan-dev',
      avatarUrl: 'https://cdn.sanity.io/images/demo/production/luan-avatar.png',
      role: 'dev',
    },
    cta: [{ label: 'Ver detalhes', href: '/projetos/luan-dev/grimorio-de-ui' }],
  },
  {
    id: 'e1',
    type: 'event',
    title: 'Hiring Day — Vagas para Frontend',
    description: 'Encontro online para apresentar vagas, tirar dúvidas e coletar portfólios.',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/event-1.jpg',
    createdAt: '2025-11-03T15:00:00Z',
    author: {
      name: 'TechCorp',
      slug: 'techcorp',
      avatarUrl: 'https://cdn.sanity.io/images/demo/production/company-techcorp.png',
      role: 'company',
    },
    cta: [
      { label: 'Inscrever-se', href: '/eventos/hiring-day' },
      { label: 'Ver requisitos', href: '/vagas/frontend' },
    ],
  },
  {
    id: 'n1',
    type: 'news',
    title: 'DevMarket News — Suporte a Portfólios com Mídia Rica',
    description: 'Agora você pode anexar vídeos, imagens e arquivos aos projetos públicos.',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/news-1.jpg',
    createdAt: '2025-11-02T11:20:00Z',
    author: {
      name: 'DevMarket',
      slug: 'devmarket',
      avatarUrl: 'https://cdn.sanity.io/images/demo/production/devmarket.png',
      role: 'company',
    },
    cta: [{ label: 'Saber mais', href: '/sobre' }],
  },
  {
    id: 'i1',
    type: 'interest',
    title: 'Buscamos Devs com experiência em Charts e UX',
    description: 'Projetos com dashboards, gráficos interativos e boas práticas de acessibilidade.',
    createdAt: '2025-11-02T09:45:00Z',
    author: {
      name: 'Ana Code',
      slug: 'ana-code',
      avatarUrl: 'https://cdn.sanity.io/images/demo/production/ana-avatar.png',
      role: 'dev',
    },
    techTags: ['React', 'Charts', 'UX'],
    likes: 76,
    cta: [{ label: 'Entrar em contato', href: '/perfil/ana-code' }],
  },
];

export default function FeedPageClient() {
  const [activeType, setActiveType] = React.useState<FeedItemType | 'all'>('all');
  const filtered = React.useMemo(
    () => (activeType === 'all' ? demoFeed : demoFeed.filter((i) => i.type === activeType)),
    [activeType]
  );

  return (
    <section style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>Feed</h1>
      <p style={{ color: 'var(--color-muted)' }}>
        Projetos, eventos, notícias e interesses publicados por devs e empresas.
      </p>

      {/* Filtros por tipo */}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant={activeType === 'all' ? 'primary' : undefined} onClick={() => setActiveType('all')}>
            Todos
          </Tag>
          <Tag variant={activeType === 'project' ? 'primary' : undefined} onClick={() => setActiveType('project')}>
            Projetos
          </Tag>
          <Tag variant={activeType === 'event' ? 'primary' : undefined} onClick={() => setActiveType('event')}>
            Eventos
          </Tag>
          <Tag variant={activeType === 'news' ? 'primary' : undefined} onClick={() => setActiveType('news')}>
            Notícias
          </Tag>
          <Tag variant={activeType === 'interest' ? 'primary' : undefined} onClick={() => setActiveType('interest')}>
            Interesses
          </Tag>
        </div>
      </div>

      <Grid columns={1} gap="lg" style={{ marginTop: 'var(--space-6)' }}>
        {filtered.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </Grid>
    </section>
  );
}