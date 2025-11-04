'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Grid, Button } from '@devmarket/ui';

type ProfilePayload = {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
};

export default function MyProfileForm() {
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
        setError(data?.error || 'Erro ao salvar perfil');
        return;
      }
      setSuccess('Perfil atualizado.');
    } catch (e) {
      setError('Erro interno ao salvar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevated>
      <CardHeader>
        <strong>Meu Perfil</strong>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardBody>
          <Grid columns={2} gap="md">
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome público"
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
              <span>Avatar (URL da imagem)</span>
              <input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
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
              <span>Bio</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Resumo sobre você, foco, interesses."
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
              <span>Skills (separadas por vírgula)</span>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Next.js, TypeScript"
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
              <span>Links (um por linha, formato: Título|URL|Tipo)</span>
              <textarea
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder={"GitHub|https://github.com/seuuser|github\nSite|https://seusite.com|website"}
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
          {error ? (
            <p role="alert" style={{ color: 'var(--danger-600)' }}>{error}</p>
          ) : null}
          {success ? (
            <p role="status" style={{ color: 'var(--success-600)' }}>{success}</p>
          ) : null}
        </CardBody>
        <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" loading={loading}>
            Salvar Perfil
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}