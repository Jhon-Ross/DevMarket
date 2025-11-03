'use client';
import Link from 'next/link';
import { useLocale } from '../../../components/LocaleProvider';

export default function NotFound() {
  const { locale } = useLocale();
  const title = locale === 'pt' ? 'Perfil não encontrado' : 'Profile not found';
  const desc =
    locale === 'pt'
      ? 'O perfil solicitado não existe ou foi removido.'
      : 'The requested profile does not exist or was removed.';
  const back = locale === 'pt' ? 'Voltar para a Home' : 'Back to Home';

  return (
    <section>
      <h1 style={{ color: 'var(--text-primary)' }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link
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
        </Link>
      </div>
    </section>
  );
}
