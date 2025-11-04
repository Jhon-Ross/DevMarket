'use client';
import AppLink from '../../../components/AppLink';
import { useLocale } from '../../../components/LocaleProvider';

export default function NotFound() {
  const { t } = useLocale();
  const title = t('profile.notFound.title');
  const desc = t('profile.notFound.desc');
  const back = t('profile.notFound.back');

  return (
    <section>
      <h1 style={{ color: 'var(--text-primary)' }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <AppLink
          href="/"
          style={{
            display: 'inline-block',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          {back}
        </AppLink>
      </div>
    </section>
  );
}
