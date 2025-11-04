"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Tag, Button } from '@devmarket/ui';

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
};

function TypeBadge({ type }: { type: FeedItemType }) {
  const map: Record<FeedItemType, { label: string; variant?: 'primary' | 'success' | 'warning' | 'danger' }> = {
    project: { label: 'Projeto', variant: 'primary' },
    event: { label: 'Evento', variant: 'success' },
    news: { label: 'Notícia', variant: 'warning' },
    interest: { label: 'Interesse', variant: 'danger' },
  };
  const conf = map[type];
  return <Tag variant={conf.variant}>{conf.label}</Tag>;
}

export default function FeedItemCard({ item }: { item: FeedItem }) {
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
              <Link href={`/perfil/${item.author.slug}`} style={{ fontWeight: 700 }}>
                {item.author.name}
              </Link>
            ) : (
              <strong>{item.author?.name}</strong>
            )}
            {item.createdAt ? (
              <time dateTime={item.createdAt} style={{ color: 'var(--color-muted)', fontSize: 12 }}>
                {new Date(item.createdAt).toLocaleString('pt-BR')}
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
      </CardBody>

      <CardFooter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {typeof item.likes === 'number' ? <Button variant="ghost">❤️ {item.likes}</Button> : null}
          {/* CTAs contextuais */}
          {item.cta?.map((c) => (
            <Link key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
              <Button variant="ghost">↗️ {c.label}</Button>
            </Link>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}