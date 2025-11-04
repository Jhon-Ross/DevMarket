'use client';
import React from 'react';
import { useLocale } from '../../../components/LocaleProvider';
import ProjectsGrid from '../../projetos/ProjectsGrid';
import Image from 'next/image';
import '@ui/styles/profile-utilities.css';
import '@devmarket/ui';

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
  avatarUrl?: string;
  skills?: string[];
  links?: { title: string; url: string; type?: string }[];
  slug: string;
  projects?: ProfileProject[];
};

export default function PerfilView({ profile }: { profile: UserProfile }) {
  const { t } = useLocale();

  return (
    <main className="profile-wrap" style={{ maxWidth: 1000, margin: '0 auto' }}>
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

      {profile.skills?.length ? (
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

      <section>
        <div className="section-title">{t('profile.projects')}</div>
        {profile.projects && profile.projects.length > 0 ? (
          <ProjectsGrid projects={profile.projects} />
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>{t('profile.empty')}</p>
        )}
      </section>
    </main>
  );
}
