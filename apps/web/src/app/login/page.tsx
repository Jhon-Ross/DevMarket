'use client';
// Evita erro de prerender no build de produção quando usa APIs de auth client-side
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale } from '@/components/LocaleProvider';
import AppLink from '@/components/AppLink';
import { Button, Card, Grid, CardHeader, CardBody, CardFooter } from '@devmarket/ui';

export default function LoginPage() {
  const { t } = useLocale();
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const rawCb = search?.get('callbackUrl');
    const callbackUrl = rawCb ? decodeURIComponent(rawCb) : '/';
    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    // Preferimos o callbackUrl informado pela rota protegida
    const target = callbackUrl || (typeof res?.url === 'string' ? res.url : '/');
    router.replace(target);
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
              {/* Alert de erro de login */}
              {(() => {
                const errorCode = error || search?.get('error') || null;
                if (!errorCode) return null;
                const isCredentials = errorCode === 'CredentialsSignin';
                const title = isCredentials
                  ? t('auth.error.credentials.title')
                  : t('auth.error.generic.title');
                const desc = isCredentials
                  ? t('auth.error.credentials.desc')
                  : t('auth.error.generic.desc');
                return (
                  <div
                    role="alert"
                    aria-live="polite"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '24px 1fr',
                      gap: 10,
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--danger-300)',
                      background: 'var(--bg-default)',
                    }}
                  >
                    <span aria-hidden="true" style={{ fontSize: 18 }}>
                      ⚠️
                    </span>
                    <div>
                      <strong style={{ color: 'var(--danger-600)' }}>{title}</strong>
                      <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>{desc}</p>
                    </div>
                  </div>
                );
              })()}
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
            </Grid>
          </CardBody>
          <CardFooter
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
            }}
          >
            <AppLink
              href="/signup"
              style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
            >
              {t('auth.login.toSignup') || 'Não tem conta? Cadastre-se'}
            </AppLink>
            <Button type="submit" className="button-fluid-sm" loading={loading}>
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
