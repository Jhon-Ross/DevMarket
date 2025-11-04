'use client';
import React from 'react';
import { useLocale } from '@/components/LocaleProvider';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Tag,
  Grid,
  MediaGallery,
} from '@devmarket/ui';

export default function UiPreviewClient() {
  const { t } = useLocale();

  return (
    <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1 style={{ marginBottom: 16 }}>{t('uiPreview.title')}</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>{t('uiPreview.section.button')}</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button>{t('uiPreview.button.primary')}</Button>
          <Button variant="secondary">{t('uiPreview.button.secondary')}</Button>
          <Button variant="outline">{t('uiPreview.button.outline')}</Button>
          <Button variant="ghost">{t('uiPreview.button.ghost')}</Button>
          <Button variant="destructive">{t('uiPreview.button.destructive')}</Button>
          <Button loading>{t('uiPreview.button.loading')}</Button>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>{t('uiPreview.section.card')}</h2>
        <Card elevated>
          <CardHeader>
            <strong>{t('uiPreview.card.title')}</strong>
          </CardHeader>
          <CardBody>{t('uiPreview.card.body')}</CardBody>
          <CardFooter>
            <Button size="sm">{t('uiPreview.card.action')}</Button>
          </CardFooter>
        </Card>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>{t('uiPreview.section.avatar')}</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar name="Dev Market" size="sm" />
          <Avatar name="Dev Market" size="md" />
          <Avatar name="Dev Market" size="lg" />
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>{t('uiPreview.section.tag')}</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag>{t('uiPreview.tag.default')}</Tag>
          <Tag variant="primary">{t('uiPreview.tag.primary')}</Tag>
          <Tag variant="success">{t('uiPreview.tag.success')}</Tag>
          <Tag variant="warning">{t('uiPreview.tag.warning')}</Tag>
          <Tag variant="danger">{t('uiPreview.tag.danger')}</Tag>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>{t('uiPreview.section.grid')}</h2>
        <Grid columns={4} gap="sm">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {t('uiPreview.grid.item')} {i + 1}
            </div>
          ))}
        </Grid>
      </section>

      <section>
        <h2>{t('uiPreview.section.media')}</h2>
        <MediaGallery
          items={[
            {
              src: 'https://picsum.photos/id/1015/400/300',
              alt: t('uiPreview.media.alt.mountain'),
            },
            { src: 'https://picsum.photos/id/1025/400/300', alt: t('uiPreview.media.alt.dog') },
            { src: 'https://picsum.photos/id/1042/400/300', alt: t('uiPreview.media.alt.bridge') },
          ]}
        />
      </section>
    </div>
  );
}
