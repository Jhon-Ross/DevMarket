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
      aria-label={locale === 'pt' ? 'Idioma: Português' : 'Language: English'}
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
      title={locale === 'pt' ? 'Trocar para English' : 'Switch to Português'}
    >
      <span role="img" aria-label="globo">
        🌐
      </span>
      {locale.toUpperCase()}
    </button>
  );
}
