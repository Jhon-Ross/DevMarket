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

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
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

      {/* Social Proof */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          style={{
            marginBottom: 'var(--space-4)',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          {t('home.social.title')}
        </h2>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.social.quotes.1')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.social.quotes.2')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.social.quotes.3')}
            </CardBody>
          </Card>
        </Grid>
      </section>

      {/* Showcase */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          style={{
            marginBottom: 'var(--space-2)',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          {t('home.showcase.title')}
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
          }}
        >
          {t('home.showcase.examples.title')}
        </p>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.showcase.examples.1')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.showcase.examples.2')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.showcase.examples.3')}
            </CardBody>
          </Card>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
          <Button variant="outline" onClick={() => router.push('/sobre')}>
            {t('home.showcase.cta')}
          </Button>
        </div>
      </section>

      {/* Como funciona */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          style={{
            marginBottom: 'var(--space-4)',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          {t('home.how.title')}
        </h2>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.how.step1.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.how.step1.desc')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.how.step2.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.how.step2.desc')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.how.step3.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.how.step3.desc')}
            </CardBody>
          </Card>
        </Grid>
      </section>

      {/* Planos */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          style={{
            marginBottom: 'var(--space-4)',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          {t('home.plans.title')}
        </h2>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.plans.devFree.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>{t('home.plans.devFree.benefit1')}</li>
                <li>{t('home.plans.devFree.benefit2')}</li>
                <li>{t('home.plans.devFree.benefit3')}</li>
              </ul>
            </CardBody>
            <CardFooter
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ color: 'var(--success-600)' }}>{t('home.plans.devFree.price')}</span>
              <Button onClick={() => router.push('/signup')}>{t('home.ctaStart')}</Button>
            </CardFooter>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.plans.devPro.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>{t('home.plans.devPro.benefit1')}</li>
                <li>{t('home.plans.devPro.benefit2')}</li>
                <li>{t('home.plans.devPro.benefit3')}</li>
              </ul>
            </CardBody>
            <CardFooter
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>{t('home.plans.devPro.price')}</span>
              <Button onClick={() => router.push('/signup')}>{t('home.ctaStart')}</Button>
            </CardFooter>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.plans.devPremium.title')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)' }}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>{t('home.plans.devPremium.benefit1')}</li>
                <li>{t('home.plans.devPremium.benefit2')}</li>
                <li>{t('home.plans.devPremium.benefit3')}</li>
              </ul>
            </CardBody>
            <CardFooter
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ color: 'var(--text-primary)' }}>
                {t('home.plans.devPremium.price')}
              </span>
              <Button onClick={() => router.push('/signup')}>{t('home.ctaStart')}</Button>
            </CardFooter>
          </Card>
        </Grid>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          style={{
            marginBottom: 'var(--space-4)',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          {t('home.faq.title')}
        </h2>
        <Grid columns={3} gap="md">
          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.faq.q1')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.faq.a1')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.faq.q2')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.faq.a2')}
            </CardBody>
          </Card>

          <Card elevated>
            <CardHeader style={{ fontWeight: 600 }}>{t('home.faq.q3')}</CardHeader>
            <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t('home.faq.a3')}
            </CardBody>
          </Card>
        </Grid>
      </section>
    </main>
  );
}
