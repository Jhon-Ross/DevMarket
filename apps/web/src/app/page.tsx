'use client';
import { useLocale } from '../components/LocaleProvider';

export default function Home() {
  const { t } = useLocale();
  return (
    <main
      style={{
        padding: 'var(--space-8)',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: 'var(--space-4)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('home.title')}
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-6)',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}
        >
          {t('home.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-foreground)',
              border: 'none',
              padding: 'var(--space-3) var(--space-5)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {t('home.ctaStart')}
          </button>

          <button
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              padding: 'var(--space-3) var(--space-5)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {t('home.ctaLearn')}
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
          width: '100%',
          marginBottom: 'var(--space-8)',
        }}
      >
        <div
          style={{
            padding: 'var(--space-6)',
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-default)',
          }}
        >
          <h3
            style={{
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-3)',
              fontSize: '1.25rem',
              fontWeight: '600',
            }}
          >
            {t('home.dev.title')}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {t('home.dev.desc')}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-default)',
          }}
        >
          <h3
            style={{
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-3)',
              fontSize: '1.25rem',
              fontWeight: '600',
            }}
          >
            {t('home.comp.title')}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {t('home.comp.desc')}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-default)',
          }}
        >
          <h3
            style={{
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-3)',
              fontSize: '1.25rem',
              fontWeight: '600',
            }}
          >
            {t('home.real.title')}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {t('home.real.desc')}
          </p>
        </div>
      </section>
    </main>
  );
}
