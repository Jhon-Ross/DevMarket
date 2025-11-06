'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Grid, Button } from '@devmarket/ui';
import { useLocale } from '@/components/LocaleProvider';
import { validateProfile } from './schema';
import HorizontalDragBar from '@/components/HorizontalDragBar';
import UploadArea from '@/components/UploadArea';

type ProfilePayload = {
  name?: string;
  bio?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
  tagline?: string;
  customization?: {
    theme?: {
      primaryColor?: string;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
    };
    layout?: 'classic' | 'modern' | 'grid';
    sections?: {
      showAbout?: boolean;
      showSkills?: boolean;
      showProjects?: boolean;
      showExperience?: boolean;
      showTestimonials?: boolean;
      showContact?: boolean;
    };
  };
};

export default function MyProfileForm() {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');
  const [heroPreviewUrl, setHeroPreviewUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [links, setLinks] = useState('');
  const [tagline, setTagline] = useState('');
  const [customization, setCustomization] = useState<ProfilePayload['customization']>({
    theme: {
      primaryColor: '',
      backgroundColor: '',
      textColor: '',
      accentColor: '',
    },
    layout: 'classic',
    sections: {
      showAbout: true,
      showSkills: true,
      showProjects: true,
      showExperience: true,
      showTestimonials: true,
      showContact: true,
    },
  });
  const [slug, setSlug] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const heroFileInputRef = useRef<HTMLInputElement | null>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroUploadError, setHeroUploadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError(null);
        const res = await fetch('/api/profile');
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          const p = data?.profile as any;
          if (p) {
            setName(p.name || '');
            setBio(p.bio || '');
            setAvatarPreviewUrl(p.avatarUrl || '');
            setHeroPreviewUrl(p.heroUrl || '');
            setSkills((p.skills || []).join(', '));
            setLinks(
              (p.links || [])
                .map(
                  (l: { title: string; url: string; type?: string }) =>
                    `${l.title}|${l.url}|${l.type || ''}`
                )
                .join('\n')
            );
            setTagline(p.tagline || '');
            setCustomization({
              theme: {
                primaryColor: p?.customization?.theme?.primaryColor || '',
                backgroundColor: p?.customization?.theme?.backgroundColor || '',
                textColor: p?.customization?.theme?.textColor || '',
                accentColor: p?.customization?.theme?.accentColor || '',
              },
              layout: p?.customization?.layout || 'classic',
              sections: {
                showAbout: Boolean(p?.customization?.sections?.showAbout ?? true),
                showSkills: Boolean(p?.customization?.sections?.showSkills ?? true),
                showProjects: Boolean(p?.customization?.sections?.showProjects ?? true),
                showExperience: Boolean(p?.customization?.sections?.showExperience ?? true),
                showTestimonials: Boolean(p?.customization?.sections?.showTestimonials ?? true),
                showContact: Boolean(p?.customization?.sections?.showContact ?? true),
              },
            });
            setSlug((p as any).slug || '');
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
    setFieldErrors({});
    setSuccess(null);
    setLoading(true);
    try {
      const validation = validateProfile({ name, bio, skills, links, tagline, customization });
      if (validation.errors) {
        setFieldErrors(validation.errors);
        setLoading(false);
        return;
      }
      const { value } = validation;
      const payload: ProfilePayload = {
        name: value?.name || undefined,
        bio: value?.bio || undefined,
        skills: value?.skills || [],
        links: value?.links || [],
        tagline: value?.tagline || undefined,
        customization: value?.customization || undefined,
      };

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        const code = data?.error as string | undefined;
        const key =
          code === 'sanity_env_missing'
            ? 'myProfile.form.error.sanityEnvMissing'
            : code === 'sanity_write_token_missing'
              ? 'myProfile.form.error.sanityWriteTokenMissing'
              : code === 'sanity_unauthorized'
                ? 'myProfile.form.error.sanityUnauthorized'
                : code === 'invalid_body'
                  ? 'myProfile.form.error.save'
                  : 'myProfile.form.error.internalSave';
        setError(t(key as any));
        return;
      }
      setSuccess(t('myProfile.form.success'));
      if (data?.slug) setSlug(data.slug);
    } catch (e) {
      setError(t('myProfile.form.error.internalSave'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevated style={{ minWidth: 760 }}>
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
                {fieldErrors.name && (
                  <span role="alert" style={{ color: 'var(--danger-600)' }}>
                    {t(fieldErrors.name as any) || 'Campo inválido.'}
                  </span>
                )}
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
                {fieldErrors.bio && (
                  <span role="alert" style={{ color: 'var(--danger-600)' }}>
                    {t(fieldErrors.bio as any) || 'Campo inválido.'}
                  </span>
                )}
              </label>
            </Grid>
          </section>

          {/* Seção: Tagline/Destaque */}
          <section aria-labelledby="tagline" style={{ marginBottom: 'var(--space-6)' }}>
            <h3
              id="tagline"
              style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}
            >
              {t('myProfile.section.tagline')}
            </h3>
            <Grid columns={1} gap="md" className="grid-sm-1">
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('myProfile.form.tagline')}</span>
                <input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder={t('myProfile.form.taglinePlaceholder')}
                  maxLength={140}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: fieldErrors.tagline
                      ? '1px solid var(--danger-500)'
                      : '1px solid var(--border-default)',
                    background: 'var(--bg-default)',
                    color: 'var(--text-primary)',
                  }}
                />
                {fieldErrors.tagline && (
                  <span role="alert" style={{ color: 'var(--danger-600)' }}>
                    {t(fieldErrors.tagline as any) || 'Campo inválido.'}
                  </span>
                )}
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
              <div style={{ display: 'grid', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Envie uma imagem para atualizar seu avatar
                </span>
                <UploadArea
                  label={t('myProfile.form.avatarUploadLabel') || 'Selecione/arraste seu avatar'}
                  endpoint="/api/profile/avatar"
                  accept="image/*"
                  maxSizeMB={5}
                  currentUrl={avatarPreviewUrl || null}
                  onSuccess={(data) => {
                    const url = (data?.avatarUrl as string) || (data?.url as string) || '';
                    if (url) setAvatarPreviewUrl(url);
                  }}
                />
              </div>
              <div style={{ display: 'grid', alignContent: 'start', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Preview</span>
                {avatarPreviewUrl ? (
                  // preview simples via tag img
                  <img
                    src={avatarPreviewUrl}
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

          {/* Seção: Capa do perfil */}
          <section aria-labelledby="hero" style={{ marginBottom: 'var(--space-6)' }}>
            <h3 id="hero" style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
              Capa do perfil
            </h3>
            <Grid columns={2} gap="md" className="grid-sm-1 grid-md-2">
              <div style={{ display: 'grid', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Envie uma imagem larga para a capa do perfil
                </span>
                <UploadArea
                  label={t('myProfile.form.heroUploadLabel') || 'Selecione/arraste sua capa'}
                  endpoint="/api/profile/hero"
                  accept="image/*"
                  maxSizeMB={8}
                  currentUrl={heroPreviewUrl || null}
                  onSuccess={(data) => {
                    const url = (data?.heroUrl as string) || (data?.url as string) || '';
                    if (url) setHeroPreviewUrl(url);
                  }}
                />
              </div>
              <div style={{ display: 'grid', alignContent: 'start', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Preview</span>
                {heroPreviewUrl ? (
                  <img
                    src={heroPreviewUrl}
                    alt="hero preview"
                    style={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-default)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: 120,
                      borderRadius: 'var(--radius-md)',
                      border: '1px dashed var(--border-default)',
                      background: 'var(--bg-subtle)',
                    }}
                  />
                )}
              </div>
            </Grid>
          </section>

          {/* Seção: Customização */}
          <section aria-labelledby="customization" style={{ marginBottom: 'var(--space-6)' }}>
            <h3
              id="customization"
              style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}
            >
              {t('myProfile.section.customization')}
            </h3>
            <Grid columns={2} gap="md" className="grid-sm-1 grid-md-2">
              <div style={{ display: 'grid', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('myProfile.form.theme')}</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <label style={{ display: 'grid', gap: 4 }}>
                    <span>{t('myProfile.form.theme.primaryColor')}</span>
                    <input
                      type="color"
                      value={customization?.theme?.primaryColor || '#3b82f6'}
                      onChange={(e) =>
                        setCustomization((prev) => ({
                          ...(prev || {}),
                          theme: { ...(prev?.theme || {}), primaryColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 4 }}>
                    <span>{t('myProfile.form.theme.backgroundColor')}</span>
                    <input
                      type="color"
                      value={customization?.theme?.backgroundColor || '#0b0f14'}
                      onChange={(e) =>
                        setCustomization((prev) => ({
                          ...(prev || {}),
                          theme: { ...(prev?.theme || {}), backgroundColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 4 }}>
                    <span>{t('myProfile.form.theme.textColor')}</span>
                    <input
                      type="color"
                      value={customization?.theme?.textColor || '#e5e7eb'}
                      onChange={(e) =>
                        setCustomization((prev) => ({
                          ...(prev || {}),
                          theme: { ...(prev?.theme || {}), textColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 4 }}>
                    <span>{t('myProfile.form.theme.accentColor')}</span>
                    <input
                      type="color"
                      value={customization?.theme?.accentColor || '#f59e0b'}
                      onChange={(e) =>
                        setCustomization((prev) => ({
                          ...(prev || {}),
                          theme: { ...(prev?.theme || {}), accentColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t('myProfile.form.layout')}</span>
                <select
                  value={customization?.layout || 'classic'}
                  onChange={(e) =>
                    setCustomization((prev) => ({ ...(prev || {}), layout: e.target.value as any }))
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-default)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="grid">Grid</option>
                </select>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {(
                    [
                      ['showAbout', 'myProfile.form.sections.showAbout'],
                      ['showSkills', 'myProfile.form.sections.showSkills'],
                      ['showProjects', 'myProfile.form.sections.showProjects'],
                      ['showExperience', 'myProfile.form.sections.showExperience'],
                      ['showTestimonials', 'myProfile.form.sections.showTestimonials'],
                      ['showContact', 'myProfile.form.sections.showContact'],
                    ] as const
                  ).map(([key, labelKey]) => (
                    <label
                      key={key}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(
                          customization?.sections?.[
                            key as keyof NonNullable<ProfilePayload['customization']>['sections']
                          ]
                        )}
                        onChange={(e) =>
                          setCustomization((prev) => ({
                            ...(prev || {}),
                            sections: { ...(prev?.sections || {}), [key]: e.target.checked },
                          }))
                        }
                      />
                      <span>{t(labelKey as any)}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.customization && (
                  <span role="alert" style={{ color: 'var(--danger-600)' }}>
                    {t(fieldErrors.customization as any) || 'Configuração inválida.'}
                  </span>
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
                    border: fieldErrors.skills
                      ? '1px solid var(--danger-500)'
                      : '1px solid var(--border-default)',
                    background: 'var(--bg-default)',
                    color: 'var(--text-primary)',
                  }}
                />
                {fieldErrors.skills && (
                  <span role="alert" style={{ color: 'var(--danger-600)' }}>
                    {t(fieldErrors.skills as any) || 'Campo inválido.'}
                  </span>
                )}
                {/* Chips editáveis */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {skills
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((chip, idx) => (
                      <span
                        key={`${chip}-${idx}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          background: 'var(--bg-subtle)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '4px 8px',
                        }}
                      >
                        {chip}
                        <button
                          type="button"
                          onClick={() => {
                            const arr = skills
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .filter((x) => x !== chip);
                            setSkills(arr.join(', '));
                          }}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--danger-600)',
                            cursor: 'pointer',
                          }}
                          aria-label={`Remover ${chip}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
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
                    border: fieldErrors.links
                      ? '1px solid var(--danger-500)'
                      : '1px solid var(--border-default)',
                    background: 'var(--bg-default)',
                    color: 'var(--text-primary)',
                  }}
                />
                {fieldErrors.links && (
                  <span role="alert" style={{ color: 'var(--danger-600)' }}>
                    {t(fieldErrors.links as any) || 'Campo inválido.'}
                  </span>
                )}
                {/* Builder visual de links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8 }}>
                  <input placeholder="Título" id="link-title" style={{ padding: '8px 10px' }} />
                  <input placeholder="URL" id="link-url" style={{ padding: '8px 10px' }} />
                  <input
                    placeholder="Tipo (opcional)"
                    id="link-type"
                    style={{ padding: '8px 10px' }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const titleEl = document.getElementById('link-title') as HTMLInputElement;
                      const urlEl = document.getElementById('link-url') as HTMLInputElement;
                      const typeEl = document.getElementById('link-type') as HTMLInputElement;
                      const title = (titleEl?.value || '').trim();
                      const url = (urlEl?.value || '').trim();
                      const type = (typeEl?.value || '').trim();
                      if (!title || !url) return;
                      const line = `${title}|${url}|${type}`;
                      const next = links ? `${links}\n${line}` : line;
                      setLinks(next);
                      if (titleEl) titleEl.value = '';
                      if (urlEl) urlEl.value = '';
                      if (typeEl) typeEl.value = '';
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
                {/* Preview das entradas */}
                <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 8 }}>
                  {links
                    .split('\n')
                    .map((l) => l.trim())
                    .filter(Boolean)
                    .map((line, i) => {
                      const [title, url, type] = line.split('|').map((p) => (p || '').trim());
                      return (
                        <li key={`${url}-${i}`} style={{ color: 'var(--text-secondary)' }}>
                          {title} — {url} {type ? `(${type})` : ''}
                        </li>
                      );
                    })}
                </ul>
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
          {/* Barra de arrasto horizontal adicional, acima do botão de salvar */}
          <div style={{ marginTop: 12 }}>
            <HorizontalDragBar />
          </div>
        </CardBody>
        <CardFooter
          style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}
        >
          <Button className="button-fluid-sm" type="submit" loading={loading}>
            {t('myProfile.form.submit')}
          </Button>
          {/* Botão de "Ver perfil público" removido: a visualização pública é acessível diretamente sem precisar navegar */}
        </CardFooter>
      </form>
    </Card>
  );
}
