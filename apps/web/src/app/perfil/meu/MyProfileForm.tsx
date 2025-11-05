'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Grid, Button } from '@devmarket/ui';
import { useLocale } from '@/components/LocaleProvider';

type ProfilePayload = {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
};

export default function MyProfileForm() {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [links, setLinks] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError(null);
        const res = await fetch('/api/profile');
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          const p = data?.profile as ProfilePayload | null;
          if (p) {
            setName(p.name || '');
            setBio(p.bio || '');
            setAvatarUrl(p.avatarUrl || '');
            setSkills((p.skills || []).join(', '));
            setLinks((p.links || []).map((l) => `${l.title}|${l.url}|${l.type || ''}`).join('\n'));
          }
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const payload: ProfilePayload = {
        name: name.trim() || undefined,
        bio: bio.trim() || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
        skills: skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        links: links
          .split('\n')
          .map((line) => {
            const [title, url, type] = line.split('|').map((p) => (p || '').trim());
            if (!title || !url) return null;
            return { title, url, type: type || undefined };
          })
          .filter(Boolean) as { title: string; url: string; type?: string }[],
      };

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || t('myProfile.form.error.save'));
        return;
      }
      setSuccess(t('myProfile.form.success'));
    } catch (e) {
      setError(t('myProfile.form.error.internalSave'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevated>
      <CardHeader>
        <strong>{t('myProfile.title')}</strong>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardBody>
          {/* Seção: Informações básicas */}
          <section aria-labelledby="basic-info" style={{ marginBottom: 'var(--space-6)' }}>
            <h3
              id="basic-info"
              style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}
            >
              {t('myProfile.section.basic')}
            </h3>
            <Grid columns={2} gap="md" className="grid-sm-1 grid-md-2">
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('myProfile.form.name')}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('myProfile.form.namePlaceholder')}
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
                <span>{t('myProfile.form.bio')}</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t('myProfile.form.bioPlaceholder')}
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
            </Grid>
          </section>

          {/* Seção: Avatar */}
          <section aria-labelledby="avatar" style={{ marginBottom: 'var(--space-6)' }}>
            <h3
              id="avatar"
              style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}
            >
              {t('myProfile.section.avatar')}
            </h3>
            <Grid columns={2} gap="md" className="grid-sm-1 grid-md-2">
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('myProfile.form.avatarUrl')}</span>
                <input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder={t('myProfile.form.avatarUrlPlaceholder')}
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
              <div style={{ display: 'grid', alignContent: 'start', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Preview</span>
                {avatarUrl ? (
                  // preview simples via tag img
                  <img
                    src={avatarUrl}
                    alt="avatar preview"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--border-default)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
                  />
                ) : (
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: '50%',
                      border: '1px dashed var(--border-default)',
                      background: 'var(--bg-subtle)',
                    }}
                  />
                )}
              </div>
            </Grid>
          </section>

          {/* Seção: Skills */}
          <section aria-labelledby="skills" style={{ marginBottom: 'var(--space-6)' }}>
            <h3
              id="skills"
              style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}
            >
              {t('myProfile.section.skills')}
            </h3>
            <Grid columns={1} gap="md" className="grid-sm-1">
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('myProfile.form.skills')}</span>
                <input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder={t('myProfile.form.skillsPlaceholder')}
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
          </section>

          {/* Seção: Links */}
          <section aria-labelledby="links" style={{ marginBottom: 'var(--space-2)' }}>
            <h3 id="links" style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
              {t('myProfile.section.links')}
            </h3>
            <Grid columns={1} gap="md" className="grid-sm-1">
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('myProfile.form.links')}</span>
                <textarea
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder={t('myProfile.form.linksPlaceholder')}
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
            </Grid>
          </section>

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
        <CardFooter
          style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}
        >
          <Button className="button-fluid-sm" type="submit" loading={loading}>
            {t('myProfile.form.submit')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
