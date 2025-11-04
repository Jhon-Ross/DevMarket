'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale } from '@/components/LocaleProvider';
import Link from 'next/link';
import { Button, Card, Grid, CardHeader, CardBody, CardFooter } from '@devmarket/ui';

export default function LoginPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    router.push('/');
  };

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--space-8)',
      }}
    >
      <Card elevated style={{ width: '100%', maxWidth: 560 }}>
        <CardHeader>
          <h1 style={{ fontWeight: 700, fontSize: '1.25rem', margin: 0 }}>
            {t('auth.login.title') || 'Entrar'}
          </h1>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardBody>
            <Grid columns={1} gap="md">
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('auth.email') || 'Email'}</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email.placeholder') || 'seu@email.com'}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-default)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.outline = '2px solid var(--color-accent)')}
                  onBlur={(e) => (e.currentTarget.style.outline = '')}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>{t('auth.password') || 'Senha'}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password.placeholder') || '••••••••'}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    background: 'var(--bg-default)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.outline = '2px solid var(--color-accent)')}
                  onBlur={(e) => (e.currentTarget.style.outline = '')}
                />
              </label>
              {error ? (
                <p role="alert" style={{ color: 'var(--danger-600)' }}>
                  {error}
                </p>
              ) : null}
            </Grid>
          </CardBody>
          <CardFooter
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Link
              href="/signup"
              style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
            >
              {t('auth.login.toSignup') || 'Não tem conta? Cadastre-se'}
            </Link>
            <Button type="submit" loading={loading}>
              {loading
                ? t('common.loading') || 'Carregando...'
                : t('auth.login.submit') || 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
