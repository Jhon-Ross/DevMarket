'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '../components/LocaleProvider';
import { Button, Card, CardHeader, CardBody, CardFooter, Grid } from '@devmarket/ui';
import { track } from '@/lib/analytics';

export default function Home() {
  const { t } = useLocale();
  const router = useRouter();
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  const handleStart = () => {
    track('home_cta_start_click', { href: '/signup' });
    router.push('/signup');
  };

  const handleLearn = () => {
    track('home_cta_learn_click', { href: '/sobre' });
    router.push('/sobre');
  };

  useEffect(() => {
    let hit50 = false;
    let hit90 = false;
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = scrolled / total;
      if (!hit50 && pct >= 0.5) {
        track('home_scroll_depth_50');
        hit50 = true;
      }
      if (!hit90 && pct >= 0.9) {
        track('home_scroll_depth_90');
        hit90 = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track('home_showcase_view');
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 700,
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
            maxWidth: 600,
            lineHeight: 1.6,
            marginInline: 'auto',
          }}
        >
          {t('home.subtitle')}
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button onClick={handleStart}>{t('home.ctaStart')}</Button>
          <Button variant="outline" onClick={handleLearn}>
            {t('home.ctaLearn')}
          </Button>
        </div>
      </header>

      <section ref={showcaseRef} style={{ marginBottom: 'var(--space-8)' }}>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.dev.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.dev.desc')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.comp.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.comp.desc')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.real.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.real.desc')}
            </CardBody>
          </Card>
        </Grid>
      </section>

      {/* Planos */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)', textAlign: 'center' }}>
          Planos
        </h2>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>Dev Free</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>Perfil básico</li>
                <li>Até 3 projetos</li>
                <li>1 vídeo</li>
              </ul>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--success-600)' }}>Grátis</span>
              <Button onClick={() => router.push('/signup')}>Começar</Button>
            </CardFooter>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>Dev Pro</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>Perfil completo</li>
                <li>Vídeos ilimitados</li>
                <li>Destaque no ranking</li>
              </ul>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>R$ 19,90/mês</span>
              <Button onClick={() => router.push('/signup')}>Assinar</Button>
            </CardFooter>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>Dev Premium</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>Tudo do Pro</li>
                <li>Insights de visitas</li>
                <li>Suporte prioritário</li>
              </ul>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>R$ 39,90/mês</span>
              <Button onClick={() => router.push('/signup')}>Assinar</Button>
            </CardFooter>
          </Card>
        </Grid>
      </section>
    </main>
  );
}
