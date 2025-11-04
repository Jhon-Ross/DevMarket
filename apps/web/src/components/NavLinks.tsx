'use client';
import AppLink from './AppLink';
import { useLocale } from './LocaleProvider';
import { useSession } from 'next-auth/react';

export default function NavLinks() {
  const { t } = useLocale();
  const { data: session } = useSession();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <AppLink
        href="/feed"
        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
      >
        <span suppressHydrationWarning>{t('nav.projects')}</span>
      </AppLink>
      {!session?.user ? (
        <>
          <AppLink href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <span suppressHydrationWarning>{t('nav.login')}</span>
          </AppLink>
        </>
      ) : null}
    </div>
  );
}
