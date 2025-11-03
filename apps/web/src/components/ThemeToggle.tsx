'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch {}
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  return (
    <button
      aria-label={theme === 'dark' ? 'Tema escuro ativo' : 'Tema claro ativo'}
      onClick={toggle}
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
      title={theme === 'dark' ? 'Trocar para tema claro' : 'Trocar para tema escuro'}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
