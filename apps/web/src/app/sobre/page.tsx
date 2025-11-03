'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, CardBody, CardFooter, Grid, Avatar, Tag, MediaGallery } from '@devmarket/ui';
import { useLocale } from '@/components/LocaleProvider';

export default function SobrePage() {
  const { t } = useLocale();
  const router = useRouter();
  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>{t('about.title')}</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 720, margin: '0 auto' }}>{t('about.subtitle')}</p>
      </header>

      {/* Destaques */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardHeader>
              <strong>{t('about.highlights.portfolios.title')}</strong>
            </CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>{t('about.highlights.portfolios.desc')}</CardBody>
          </Card>
          <Card elevated>
            <CardHeader>
              <strong>{t('about.highlights.audience.title')}</strong>
            </CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>{t('about.highlights.audience.desc')}</CardBody>
          </Card>
          <Card elevated>
            <CardHeader>
              <strong>{t('about.highlights.design.title')}</strong>
            </CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>{t('about.highlights.design.desc')}</CardBody>
          </Card>
        </Grid>
      </section>

      {/* Showcase de projetos (exemplos) */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('about.showcase.title')}</h2>
        <MediaGallery
          items={[
            { src: 'https://picsum.photos/id/1015/500/350', alt: 'Projeto 1' },
            { src: 'https://picsum.photos/id/1039/500/350', alt: 'Projeto 2' },
            { src: 'https://picsum.photos/id/1042/500/350', alt: 'Projeto 3' },
          ]}
        />
      </section>

      {/* Exemplos de portfólio */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>{t('about.portfolios.title')}</h2>
        <Grid columns={3} gap="md">
          {[
            { name: 'Ana Dev', skills: ['React', 'TypeScript', 'Node.js'] },
            { name: 'Bruno Code', skills: ['Python', 'Django', 'PostgreSQL'] },
            { name: 'Carla JS', skills: ['Next.js', 'Tailwind', 'Vercel'] },
          ].map((p) => (
            <Card key={p.name} elevated>
              <CardHeader style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={p.name} size="sm" />
                <strong>{p.name}</strong>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.skills.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </CardBody>
              <CardFooter>
                <Button variant="outline">{t('about.portfolios.view')}</Button>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </section>

      {/* Call-to-action final */}
      <section style={{ textAlign: 'center' }}>
        <Button onClick={() => router.push('/signup')}>{t('about.cta')}</Button>
      </section>
    </main>
  );
}