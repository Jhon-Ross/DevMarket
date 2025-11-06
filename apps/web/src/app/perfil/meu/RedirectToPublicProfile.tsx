'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToPublicProfile() {
  const router = useRouter();
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/profile');
        if (!mounted) return;
        const data = await res.json();
        const slug = data?.profile?.slug || data?.slug;
        if (slug) {
          router.replace(`/perfil/${slug}`);
        } else {
          router.replace('/');
        }
      } catch {
        router.replace('/');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);
  return <p style={{ padding: 'var(--space-8)' }}>Redirecionando para seu perfil público…</p>;
}