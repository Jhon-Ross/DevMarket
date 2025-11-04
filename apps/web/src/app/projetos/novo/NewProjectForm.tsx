'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Grid, Button } from '@devmarket/ui';
import { useLocale } from '@/components/LocaleProvider';

export default function NewProjectForm() {
  const router = useRouter();
  const { t } = useLocale();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techTags, setTechTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!title.trim()) {
      setError(t('newProject.form.error.missingTitle'));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          techTags: techTags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          coverUrl: coverUrl.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || t('newProject.form.error.create'));
        return;
      }
      setSuccess(t('newProject.form.success'));
      setTimeout(() => {
        router.push(`/perfil/${data.ownerSlug || 'meu'}`);
      }, 1200);
    } catch (e) {
      setError(t('newProject.form.error.internal'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevated>
      <CardHeader>
        <strong>{t('newProject.title')}</strong>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardBody>
          <Grid columns={2} gap="md">
            <label style={{ display: 'grid', gap: 6 }}>
              <span>{t('newProject.form.title')}</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('newProject.form.titlePlaceholder')}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>{t('newProject.form.techTags')}</span>
              <input
                value={techTags}
                onChange={(e) => setTechTags(e.target.value)}
                placeholder={t('newProject.form.techTagsPlaceholder')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>{t('newProject.form.description')}</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('newProject.form.descriptionPlaceholder')}
                rows={5}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>{t('newProject.form.coverUrl')}</span>
              <input
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder={t('newProject.form.coverUrlPlaceholder')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </label>
          </Grid>
          {error ? (
            <p role="alert" style={{ color: 'var(--danger-600)' }}>
              {error}
            </p>
          ) : null}
          {success ? (
            <p role="status" style={{ color: 'var(--success-600)' }}>
              {success}
            </p>
          ) : null}
        </CardBody>
        <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" loading={loading}>
            {t('newProject.form.submit')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
