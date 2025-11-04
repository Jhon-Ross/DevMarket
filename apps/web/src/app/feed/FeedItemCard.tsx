'use client';
import React from 'react';
import Image from 'next/image';
import AppLink from '@/components/AppLink';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Tag, Button } from '@devmarket/ui';
import { useLocale } from '@/components/LocaleProvider';

export type FeedItemType = 'project' | 'event' | 'news' | 'interest';

export type FeedItem = {
  id: string;
  type: FeedItemType;
  title: string;
  description?: string;
  imageUrl?: string | null;
  techTags?: string[];
  likes?: number;
  createdAt?: string;
  author?: {
    name: string;
    slug: string;
    avatarUrl?: string | null;
    role?: 'dev' | 'company';
  };
  cta?: { label: string; href: string }[];
  comments?: {
    id: string;
    author: string;
    content: string;
    createdAt?: string;
    avatarUrl?: string | null;
  }[];
};

function TypeBadge({ type }: { type: FeedItemType }) {
  const { t } = useLocale();
  const map: Record<
    FeedItemType,
    { label: string; variant?: 'primary' | 'success' | 'warning' | 'danger' }
  > = {
    project: { label: t('feed.type.project'), variant: 'primary' },
    event: { label: t('feed.type.event'), variant: 'success' },
    news: { label: t('feed.type.news'), variant: 'warning' },
    interest: { label: t('feed.type.interest'), variant: 'danger' },
  };
  const conf = map[type];
  return <Tag variant={conf.variant}>{conf.label}</Tag>;
}

export default function FeedItemCard({ item }: { item: FeedItem }) {
  const { locale, t } = useLocale();
  const [likes, setLikes] = React.useState(item.likes ?? 0);
  const [fire, setFire] = React.useState(0);
  const [rocket, setRocket] = React.useState(0);
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState(item.comments ?? []);
  const [draft, setDraft] = React.useState('');

  const onReact = (type: 'like' | 'fire' | 'rocket') => {
    if (type === 'like') setLikes((v) => v + 1);
    if (type === 'fire') setFire((v) => v + 1);
    if (type === 'rocket') setRocket((v) => v + 1);
  };

  const onSubmitComment = () => {
    const content = draft.trim();
    if (!content) return;
    const now = new Date().toISOString();
    setComments((arr) => [
      ...arr,
      { id: `${item.id}-c${arr.length + 1}`, author: 'Você', content, createdAt: now },
    ]);
    setDraft('');
    setShowComments(true);
  };
  return (
    <Card elevated>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {item.author?.avatarUrl ? (
            <Avatar src={item.author.avatarUrl} alt={item.author.name} size="sm" />
          ) : (
            <Avatar name={item.author?.name} size="sm" />
          )}
          <div style={{ display: 'grid' }}>
            {item.author?.slug ? (
              <AppLink href={`/perfil/${item.author.slug}`} style={{ fontWeight: 700 }}>
                {item.author.name}
              </AppLink>
            ) : (
              <strong>{item.author?.name}</strong>
            )}
            {item.createdAt ? (
              <time dateTime={item.createdAt} style={{ color: 'var(--color-muted)', fontSize: 12 }}>
                {new Date(item.createdAt).toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
              </time>
            ) : null}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <TypeBadge type={item.type} />
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{item.title}</h2>
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={860}
            height={480}
            unoptimized
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 10 }}
          />
        ) : null}
        {item.description ? <p style={{ marginTop: 12 }}>{item.description}</p> : null}
        {item.techTags?.length ? (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {item.techTags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
        {/* Comentários (preview) */}
        {showComments ? (
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {comments.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: 8 }}>
                {c.avatarUrl ? (
                  <Avatar src={c.avatarUrl} alt={c.author} size="sm" />
                ) : (
                  <Avatar name={c.author} size="sm" />
                )}
                <div style={{ display: 'grid' }}>
                  <strong style={{ fontSize: 12 }}>{c.author}</strong>
                  <p style={{ margin: 0 }}>{c.content}</p>
                  {c.createdAt ? (
                    <time
                      dateTime={c.createdAt}
                      style={{ color: 'var(--color-muted)', fontSize: 10 }}
                    >
                      {new Date(c.createdAt).toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
                    </time>
                  ) : null}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t('feed.comments.placeholder')}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid var(--border-default)',
                }}
              />
              <Button onClick={onSubmitComment}>{t('feed.comments.submit')}</Button>
            </div>
          </div>
        ) : null}
      </CardBody>

      <CardFooter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="ghost" onClick={() => onReact('like')}>
            ❤️ {likes}
          </Button>
          <Button variant="ghost" onClick={() => onReact('fire')}>
            🔥 {fire}
          </Button>
          <Button variant="ghost" onClick={() => onReact('rocket')}>
            🚀 {rocket}
          </Button>
          {/* CTAs contextuais */}
          {item.cta?.map((c) => (
            <AppLink key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
              <Button variant="ghost">↗️ {c.label || t('feed.cta.viewDetails')}</Button>
            </AppLink>
          ))}
          <Button variant="ghost" onClick={() => setShowComments((v) => !v)}>
            💬 {t('feed.comments.toggle')} ({comments.length})
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
