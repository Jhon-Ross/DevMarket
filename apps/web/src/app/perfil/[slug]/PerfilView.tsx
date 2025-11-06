'use client';
import React, { useEffect, useState } from 'react';
import { useLocale } from '../../../components/LocaleProvider';
import ProjectsGrid from '../../projetos/ProjectsGrid';
import Image from 'next/image';
import '@ui/styles/profile-utilities.css';
import '@devmarket/ui';
import SidePanel from '@/components/SidePanel';
import MyProfileForm from '@/app/perfil/meu/MyProfileForm';

type ProfileProject = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  techTags?: string[];
  owner?: { _id: string; name: string; slug: string; avatarUrl?: string | null } | null;
  coverUrl?: string | null;
  mediaImages?: string[];
  mediaFiles?: { url: string; filename?: string }[];
};

type UserProfile = {
  _id: string;
  name: string;
  bio?: string;
  tagline?: string;
  avatarUrl?: string;
  heroUrl?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
  customization?: { theme?: { primaryColor?: string; backgroundColor?: string; textColor?: string; accentColor?: string }; layout?: string; sections?: { [k: string]: boolean } };
  experience?: { role?: string; company?: string; startDate?: string; endDate?: string; description?: string }[];
  testimonials?: { author?: string; quote?: string; avatarUrl?: string }[];
  slug: string;
  projects?: ProfileProject[];
};

export default function PerfilView({ profile }: { profile: UserProfile }) {
  const { t } = useLocale();
  const theme = profile.customization?.theme || {};
  const sections = profile.customization?.sections || {};
  const [isOwner, setIsOwner] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/profile');
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          const slug = data?.profile?.slug || data?.slug;
          if (slug && slug === profile.slug) setIsOwner(true);
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [profile.slug]);

  return (
    <main
      className="profile-wrap"
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        ['--bg-default' as any]: theme.backgroundColor || 'var(--bg-default)',
        ['--text-primary' as any]: theme.textColor || 'var(--text-primary)',
        ['--accent' as any]: theme.accentColor || 'var(--accent)',
        ['--brand-primary' as any]: theme.primaryColor || 'var(--brand-primary)',
      }}
    >
      {/* Hero */}
      <section
        className="profile-hero"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: 'var(--space-4)',
          // Mantém um fallback de cor; a imagem será renderizada via <img> absoluto abaixo
          background: 'var(--bg-subtle)',
          minHeight: 220,
        }}
      >
        {profile.heroUrl ? (
          <img
            src={profile.heroUrl}
            alt={profile.name}
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
          />
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
          }}
        />
        <div style={{ position: 'relative', padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={100}
              height={100}
              style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }}
              onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
            />
          ) : null}
          <div style={{ color: 'white' }}>
            <h1 className="profile-name" style={{ margin: 0 }}>{profile.name}</h1>
            {profile.tagline ? (
              <p style={{ margin: '6px 0 0', opacity: 0.9 }}>{profile.tagline}</p>
            ) : null}
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              {Array.isArray(profile.links) && profile.links.length > 0 ? (
                <a href={profile.links[0].url} target="_blank" rel="noopener noreferrer" style={{
                  background: 'transparent', color: 'white', padding: '6px 10px', borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.6)'
                }}>Contato</a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section className="profile-header">
        <div>
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={100}
              height={100}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
            />
          ) : null}
        </div>
        <div>
          <h1 className="profile-name">
            {t('profile.title')} {profile.name}
          </h1>
          <div className="profile-meta">
            {profile.bio ? (
              <span style={{ color: 'var(--text-secondary)' }}>{profile.bio}</span>
            ) : null}
          </div>
        </div>
      </section>

      {sections.showSkills !== false && profile.skills?.length ? (
        <section>
          <div className="section-title">{t('profile.skills')}</div>
          <div className="badges">
            {profile.skills.map((s, i) => (
              <span
                key={`${s}-${i}`}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 8px',
                  boxShadow: 'var(--shadow-sm)',
                  color: 'var(--text-primary)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {profile.links?.length ? (
        <section>
          <div className="section-title">{t('profile.links')}</div>
          <ul
            style={{
              display: 'grid',
              gap: 'var(--space-2)',
              paddingLeft: 0,
              listStyle: 'none',
            }}
          >
            {profile.links.map((l, i) => (
              <li
                key={`${l.url}-${i}`}
                style={{
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3)',
                  background: 'var(--bg-default)',
                }}
              >
                <a href={l.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                  {l.title || l.url}
                </a>
                {l.type ? <span style={{ color: 'var(--text-muted)' }}>{` — ${l.type}`}</span> : ''}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {sections.showProjects !== false ? (
        <section id="projects">
          <div className="section-title">{t('profile.projects')}</div>
          {profile.projects && profile.projects.length > 0 ? (
            <ProjectsGrid projects={profile.projects} />
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>{t('profile.empty')}</p>
          )}
        </section>
      ) : null}

      {/* Experiência */}
      {sections.showExperience !== false && profile.experience?.length ? (
        <section>
          <div className="section-title">Experiência</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {profile.experience.map((exp, i) => (
              <div key={`exp-${i}`} style={{
                border: '1px solid var(--border-default)', borderRadius: 8, padding: 12,
                background: 'var(--bg-subtle)'
              }}>
                <div style={{ fontWeight: 600 }}>{exp.role} • {exp.company}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                  {exp.startDate} — {exp.endDate || 'Atual'}
                </div>
                {exp.description ? <p style={{ marginTop: 6 }}>{exp.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Depoimentos */}
      {sections.showTestimonials !== false && profile.testimonials?.length ? (
        <section>
          <div className="section-title">Depoimentos</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {profile.testimonials.map((tst, i) => (
              <div key={`tst-${i}`} style={{ border: '1px solid var(--border-default)', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {tst.avatarUrl ? (
                    <Image src={tst.avatarUrl} alt={tst.author || 'Autor'} width={32} height={32} style={{ borderRadius: '50%' }} />
                  ) : null}
                  <div style={{ fontWeight: 600 }}>{tst.author}</div>
                </div>
                <p style={{ marginTop: 8, color: 'var(--text-secondary)' }}>{tst.quote}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {isOwner ? (
        <SidePanel open={openEdit} onClose={() => setOpenEdit(false)} title="Editar Perfil" width={640}>
          <MyProfileForm />
        </SidePanel>
      ) : null}
    </main>
  );
}
