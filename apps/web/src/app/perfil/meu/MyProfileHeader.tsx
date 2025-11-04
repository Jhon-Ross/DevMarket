'use client';
import React from 'react';
import { useLocale } from '@/components/LocaleProvider';

export default function MyProfileHeader() {
  const { t } = useLocale();
  return (
    <header style={{ marginBottom: 'var(--space-6)' }}>
      <h1 style={{ color: 'var(--text-primary)' }}>{t('myProfile.title')}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>{t('myProfile.desc')}</p>
    </header>
  );
}
