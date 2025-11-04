'use client';
import { useLocale } from './LocaleProvider';

export default function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    const next = locale === 'pt' ? 'en' : 'pt';
    setLocale(next);
  };

  return (
    <button
      aria-label={'Alternar idioma'}
      onClick={toggleLocale}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        background: 'var(--bg-default)',
        color: 'var(--text-primary)',
      }}
      title={'Alternar idioma'}
    >
      <span role="img" aria-label="globo">
        🌐
      </span>
      <span suppressHydrationWarning>{locale.toUpperCase()}</span>
    </button>
  );
}
