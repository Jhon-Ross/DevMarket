'use client';
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@devmarket/ui';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/LocaleProvider';

export default function SignupPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password || !confirm) {
      setError(t('signup.error.required'));
      return;
    }
    if (password !== confirm) {
      setError(t('signup.error.mismatch'));
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        const code = data?.error || 'unknown_error';
        if (code === 'email_taken') {
          setError(t('signup.error.emailTaken') || 'Email já cadastrado');
        } else {
          setError(t('signup.error.generic') || 'Erro ao cadastrar');
        }
        return;
      }
      const login = await signIn('credentials', { email, password, redirect: false });
      if (login?.error) {
        setError(login.error);
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push('/'), 1500);
    } catch (e) {
      setError(t('signup.error.generic') || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: 640, margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>{t('signup.title')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('signup.subtitle')}</p>
      </header>

      <Card elevated>
        <CardHeader>
          <strong>{t('signup.form.title')}</strong>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit}>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: 6 }}>
                  {t('signup.field.name')}
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('signup.field.name')}
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
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>
                  {t('signup.field.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
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
              </div>

              <div>
                <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>
                  {t('signup.field.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
              </div>

              <div>
                <label htmlFor="confirm" style={{ display: 'block', marginBottom: 6 }}>
                  {t('signup.field.confirm')}
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
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
              </div>

              {error ? (
                <p role="alert" style={{ color: 'var(--danger-600)' }}>
                  {error}
                </p>
              ) : null}
            </div>
            <CardFooter
              style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}
            >
              <Button type="submit" className="button-fluid-sm" loading={loading}>
                {t('signup.submit')}
              </Button>
            </CardFooter>
          </form>
        </CardBody>
        {success && (
          <div style={{ padding: 'var(--space-4)' }}>
            <p role="status" style={{ color: 'var(--success-600)' }}>
              {t('signup.success')} — {t('common.redirecting') || 'Redirecionando...'}
            </p>
          </div>
        )}
      </Card>
    </main>
  );
}
