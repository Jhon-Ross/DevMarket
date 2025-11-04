'use client';
import Link from 'next/link';
import { useLocale } from './LocaleProvider';

export default function NavLinks() {
  const { t } = useLocale();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Link href="/projetos" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
        <span suppressHydrationWarning>{t('nav.projects')}</span>
      </Link>
      <Link href="/perfil/mock" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
        <span suppressHydrationWarning>{t('nav.profile')}</span>
      </Link>
      <Link href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
        <span suppressHydrationWarning>{t('nav.login')}</span>
      </Link>
    </div>
  );
}
