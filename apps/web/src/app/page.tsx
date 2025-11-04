'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '../components/LocaleProvider';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Avatar,
  MediaGallery,
  Tag,
} from '@devmarket/ui';
import AppLink from '@/components/AppLink';
import { track } from '@/lib/analytics';

export default function Home() {
  const { t } = useLocale();
  const router = useRouter();
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const testimonials = [
    {
      quote: () => t('home.social.quotes.1'),
      profile: { name: 'Ana Dev', slug: 'ana-dev', avatarUrl: 'https://i.pravatar.cc/80?img=32' },
    },
    {
      quote: () => t('home.social.quotes.2'),
      profile: {
        name: 'Bruno Code',
        slug: 'bruno-code',
        avatarUrl: 'https://i.pravatar.cc/80?img=15',
      },
    },
    {
      quote: () => t('home.social.quotes.3'),
      profile: { name: 'Carla JS', slug: 'carla-js', avatarUrl: 'https://i.pravatar.cc/80?img=27' },
    },
  ];

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
          <Button className="button-fluid-sm" onClick={handleStart}>
            {t('home.ctaStart')}
          </Button>
          <Button className="button-fluid-sm" variant="outline" onClick={handleLearn}>
            {t('home.ctaLearn')}
          </Button>
        </div>
      </header>

      <section ref={showcaseRef} style={{ marginBottom: 'var(--space-8)' }}>
        <Grid columns={1} gap="md" className="grid-sm-cols-2 grid-lg-cols-3">
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
        <Grid columns={1} gap="md" className="grid-sm-cols-2 grid-lg-cols-3">
          {testimonials.map((item) => (
            <Card key={item.profile.slug} elevated>
              <CardBody style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.quote()}
              </CardBody>
              <CardFooter style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={item.profile.name} src={item.profile.avatarUrl} size="sm" />
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  {item.profile.name}
                </span>
              </CardFooter>
            </Card>
          ))}
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

        {/* Render cards with image + caption to keep everything aligned */}
        {(() => {
          const showcaseItems = [
            {
              src: 'https://picsum.photos/id/1015/800/600',
              alt: t('home.showcase.examples.1'),
              caption: t('home.showcase.examples.1'),
            },
            {
              src: 'https://picsum.photos/id/1039/800/600',
              alt: t('home.showcase.examples.2'),
              caption: t('home.showcase.examples.2'),
            },
            {
              src: 'https://picsum.photos/id/1042/800/600',
              alt: t('home.showcase.examples.3'),
              caption: t('home.showcase.examples.3'),
            },
          ];

          return (
            <Grid columns={1} gap="md" className="grid-sm-cols-2 grid-lg-cols-3">
              {showcaseItems.map((item) => (
                <AppLink href="/projetos" key={item.src} style={{ textDecoration: 'none' }}>
                  <Card
                    elevated
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease',
                      willChange: 'transform',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                  >
                    <div
                      style={{
                        overflow: 'hidden',
                        borderRadius: 8,
                        aspectRatio: '16 / 9',
                        width: '100%',
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                    <CardBody
                      style={{
                        color: 'var(--text-secondary)',
                        textAlign: 'center',
                        paddingTop: 'var(--space-3)',
                        paddingBottom: 'var(--space-3)',
                      }}
                    >
                      {item.caption}
                    </CardBody>
                  </Card>
                </AppLink>
              ))}
            </Grid>
          );
        })()}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
          <Button
            className="button-fluid-sm"
            variant="outline"
            onClick={() => router.push('/sobre')}
          >
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
        <Grid columns={1} gap="md" className="grid-sm-cols-2 grid-lg-cols-3">
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
        <Grid columns={1} gap="md" className="grid-sm-cols-2 grid-lg-cols-3">
          {/* Dev Free */}
          <Card
            bordered
            style={{
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              border: '1px solid rgba(17,24,39,0.08)',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(17,24,39,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(17,24,39,0.08)';
              e.currentTarget.style.borderColor = 'rgba(17,24,39,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(17,24,39,0.06)';
              e.currentTarget.style.borderColor = 'rgba(17,24,39,0.08)';
            }}
          >
            <CardHeader
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <strong style={{ fontWeight: 700 }}>{t('home.plans.devFree.title')}</strong>
              <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>Ideal para começar</span>
            </CardHeader>
            <CardBody style={{ display: 'grid', gap: 12, minHeight: 220 }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: '0',
                  color: 'var(--text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"tnum" on, "lnum" on',
                }}
              >
                {t('home.plans.devFree.price')}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 8,
                  color: 'var(--text-secondary)',
                }}
              >
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devFree.benefit1')}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devFree.benefit2')}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devFree.benefit3')}
                </li>
              </ul>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                size="lg"
                variant="outline"
                className="button-fluid-sm"
                style={{ minWidth: 220 }}
                onClick={() => router.push('/signup')}
              >
                {t('home.ctaStart')}
              </Button>
            </CardFooter>
          </Card>

          {/* Dev Pro (Mais popular) */}
          <Card
            elevated
            style={{
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              border: '1px solid rgba(79,70,229,0.35)',
              borderRadius: 12,
              boxShadow: '0 6px 24px rgba(79,70,229,0.15)',
              background: 'linear-gradient(180deg, rgba(79,70,229,0.06), transparent 60%)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(79,70,229,0.22)';
              e.currentTarget.style.borderColor = 'rgba(79,70,229,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(79,70,229,0.15)';
              e.currentTarget.style.borderColor = 'rgba(79,70,229,0.35)';
            }}
          >
            <CardHeader
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <strong style={{ fontWeight: 700 }}>{t('home.plans.devPro.title')}</strong>
              <Tag variant="primary">Mais popular</Tag>
            </CardHeader>
            <CardBody style={{ display: 'grid', gap: 12, minHeight: 220 }}>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: '0',
                  color: 'var(--text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"tnum" on, "lnum" on',
                }}
              >
                {t('home.plans.devPro.price')}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 8,
                  color: 'var(--text-secondary)',
                }}
              >
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devPro.benefit1')}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devPro.benefit2')}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devPro.benefit3')}
                </li>
              </ul>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Tag variant="success">Suporte</Tag>
                <Tag>Destaque</Tag>
              </div>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                size="lg"
                className="button-fluid-sm"
                style={{ minWidth: 220 }}
                onClick={() => router.push('/signup')}
              >
                {t('home.ctaStart')}
              </Button>
            </CardFooter>
          </Card>

          {/* Dev Premium */}
          <Card
            elevated
            style={{
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
              border: '1px solid rgba(17,24,39,0.10)',
              borderRadius: 12,
              boxShadow: '0 4px 14px rgba(17,24,39,0.08)',
              background: 'linear-gradient(180deg, rgba(245,158,11,0.05), transparent 60%)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(17,24,39,0.12)';
              e.currentTarget.style.borderColor = 'rgba(17,24,39,0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(17,24,39,0.08)';
              e.currentTarget.style.borderColor = 'rgba(17,24,39,0.10)';
            }}
          >
            <CardHeader style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ fontWeight: 700 }}>{t('home.plans.devPremium.title')}</strong>
              <Tag variant="warning">Empresas</Tag>
            </CardHeader>
            <CardBody style={{ display: 'grid', gap: 12, minHeight: 220 }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '0',
                  color: 'var(--text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"tnum" on, "lnum" on',
                }}
              >
                {t('home.plans.devPremium.price')}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 8,
                  color: 'var(--text-secondary)',
                }}
              >
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devPremium.benefit1')}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devPremium.benefit2')}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span aria-hidden style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓
                  </span>
                  {t('home.plans.devPremium.benefit3')}
                </li>
              </ul>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                size="lg"
                className="button-fluid-sm"
                style={{ minWidth: 220 }}
                onClick={() => router.push('/signup')}
              >
                {t('home.ctaStart')}
              </Button>
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
        <Grid columns={1} gap="md" className="grid-sm-cols-2 grid-lg-cols-3">
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
