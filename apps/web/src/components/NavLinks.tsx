'use client';
import Link from 'next/link';
import { useLocale } from './LocaleProvider';
import { useSession } from 'next-auth/react';

export default function NavLinks() {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Link href="/projetos" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
        <span suppressHydrationWarning>{t('nav.projects')}</span>
      </Link>
      {!session?.user ? (
        <>
          <Link href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <span suppressHydrationWarning>{t('nav.login')}</span>
          </Link>
        </>
      ) : null}
    </div>
  );
}
