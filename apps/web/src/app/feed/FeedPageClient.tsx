'use client';
import React from 'react';
import { useLocale } from '@/components/LocaleProvider';
import { Grid, Tag } from '@devmarket/ui';
import '@devmarket/ui';
import FeedItemCard, { FeedItem, FeedItemType } from './FeedItemCard';

const demoFeed: FeedItem[] = [
  {
    id: 'p1',
    type: 'project',
    title: 'Grimório de UI',
    description: 'Biblioteca de componentes com tokens semânticos e acessibilidade.',
    imageUrl: 'https://picsum.photos/id/1025/860/480',
    techTags: ['Next.js', 'TypeScript', 'Design System'],
    likes: 128,
    createdAt: '2025-11-03T14:12:00Z',
    author: {
      name: 'Luan Dev',
      slug: 'luan-dev',
      avatarUrl: 'https://i.pravatar.cc/80?img=12',
      role: 'dev',
    },
    cta: [{ label: 'Ver detalhes', href: '/projetos/luan-dev/grimorio-de-ui' }],
    comments: [
      {
        id: 'p1-c1',
        author: 'Ana Code',
        avatarUrl: 'https://i.pravatar.cc/60?img=32',
        content: 'Incrível, adorei os tokens!',
        createdAt: '2025-11-03T14:20:00Z',
      },
      {
        id: 'p1-c2',
        author: 'Bruno Code',
        avatarUrl: 'https://i.pravatar.cc/60?img=15',
        content: 'Curti a abordagem de acessibilidade. 👏',
        createdAt: '2025-11-03T14:22:00Z',
      },
      {
        id: 'p1-c3',
        author: 'DevMarket',
        avatarUrl: 'https://i.pravatar.cc/60?img=60',
        content: 'Vamos destacar no próximo newsletter.',
        createdAt: '2025-11-03T14:25:00Z',
      },
    ],
  },
  {
    id: 'e1',
    type: 'event',
    title: 'Hiring Day — Vagas para Frontend',
    description: 'Encontro online para apresentar vagas, tirar dúvidas e coletar portfólios.',
    imageUrl: 'https://picsum.photos/id/1011/860/480',
    createdAt: '2025-11-03T15:00:00Z',
    author: {
      name: 'TechCorp',
      slug: 'techcorp',
      avatarUrl: 'https://i.pravatar.cc/80?img=47',
      role: 'company',
    },
    cta: [
      { label: 'Inscrever-se', href: '/eventos/hiring-day' },
      { label: 'Ver requisitos', href: '/vagas/frontend' },
    ],
    comments: [
      {
        id: 'e1-c1',
        author: 'Luan Dev',
        avatarUrl: 'https://i.pravatar.cc/60?img=12',
        content: 'Tem vaga remota?',
        createdAt: '2025-11-03T15:05:00Z',
      },
      {
        id: 'e1-c2',
        author: 'Marina UX',
        avatarUrl: 'https://i.pravatar.cc/60?img=65',
        content: 'Qual stack do front?',
        createdAt: '2025-11-03T15:07:00Z',
      },
      {
        id: 'e1-c3',
        author: 'TechCorp',
        avatarUrl: 'https://i.pravatar.cc/60?img=47',
        content: 'Sim, temos vagas remotas e híbridas.',
        createdAt: '2025-11-03T15:10:00Z',
      },
    ],
  },
  {
    id: 'n1',
    type: 'news',
    title: 'DevMarket News — Suporte a Portfólios com Mídia Rica',
    description: 'Agora você pode anexar vídeos, imagens e arquivos aos projetos públicos.',
    imageUrl: 'https://picsum.photos/id/1005/860/480',
    createdAt: '2025-11-02T11:20:00Z',
    author: {
      name: 'DevMarket',
      slug: 'devmarket',
      avatarUrl: 'https://i.pravatar.cc/80?img=60',
      role: 'company',
    },
    cta: [{ label: 'Saber mais', href: '/sobre' }],
    comments: [
      {
        id: 'n1-c1',
        author: 'Ana Code',
        avatarUrl: 'https://i.pravatar.cc/60?img=32',
        content: 'Ótima notícia!',
        createdAt: '2025-11-02T11:25:00Z',
      },
      {
        id: 'n1-c2',
        author: 'Carla JS',
        avatarUrl: 'https://i.pravatar.cc/60?img=27',
        content: 'Vai ajudar muito na apresentação dos projetos.',
        createdAt: '2025-11-02T11:30:00Z',
      },
    ],
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
      avatarUrl: 'https://i.pravatar.cc/80?img=32',
      role: 'dev',
    },
    techTags: ['React', 'Charts', 'UX'],
    likes: 76,
    cta: [{ label: 'Entrar em contato', href: '/perfil/ana-code' }],
    comments: [
      {
        id: 'i1-c1',
        author: 'TechCorp',
        avatarUrl: 'https://i.pravatar.cc/60?img=47',
        content: 'Curti! Vamos conversar.',
        createdAt: '2025-11-02T10:00:00Z',
      },
      {
        id: 'i1-c2',
        author: 'Pedro Data',
        avatarUrl: 'https://i.pravatar.cc/60?img=19',
        content: 'Tenho experiência com charts (D3, Recharts).',
        createdAt: '2025-11-02T10:08:00Z',
      },
    ],
  },
];

export default function FeedPageClient({ items }: { items?: FeedItem[] }) {
  const { t } = useLocale();
  const source = items && items.length ? items : demoFeed;
  const [activeType, setActiveType] = React.useState<FeedItemType | 'all'>('all');
  const filtered = React.useMemo(
    () => (activeType === 'all' ? source : source.filter((i) => i.type === activeType)),
    [activeType, source]
  );

  return (
    <section style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>{t('feed.title')}</h1>
      <p style={{ color: 'var(--color-muted)' }}>{t('feed.subtitle')}</p>

      {/* Filtros por tipo */}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag
            variant={activeType === 'all' ? 'primary' : undefined}
            onClick={() => setActiveType('all')}
          >
            {t('feed.filter.all')}
          </Tag>
          <Tag
            variant={activeType === 'project' ? 'primary' : undefined}
            onClick={() => setActiveType('project')}
          >
            {t('feed.filter.project')}
          </Tag>
          <Tag
            variant={activeType === 'event' ? 'primary' : undefined}
            onClick={() => setActiveType('event')}
          >
            {t('feed.filter.event')}
          </Tag>
          <Tag
            variant={activeType === 'news' ? 'primary' : undefined}
            onClick={() => setActiveType('news')}
          >
            {t('feed.filter.news')}
          </Tag>
          <Tag
            variant={activeType === 'interest' ? 'primary' : undefined}
            onClick={() => setActiveType('interest')}
          >
            {t('feed.filter.interest')}
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
