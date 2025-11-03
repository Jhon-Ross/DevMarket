'use client';
import React from 'react';
import { useLocale } from '../../../components/LocaleProvider';
import ProjectsGrid from '../../projetos/ProjectsGrid';
import Image from 'next/image';

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
    <section>
      <header>
        <h1>
          {t('profile.title')} {profile.name}
        </h1>
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={96}
            height={96}
            style={{ borderRadius: 8, objectFit: 'cover' }}
            onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
          />
        ) : null}
      </header>

      {profile.bio && <p>{profile.bio}</p>}

      {profile.skills?.length ? (
        <div style={{ margin: '12px 0' }}>
          {profile.skills.map((s, i) => (
            <span
              key={`${s}-${i}`}
              style={{
                display: 'inline-block',
                padding: '4px 8px',
                marginRight: 8,
                marginBottom: 8,
                background: '#f3f4f6',
                borderRadius: 6,
                fontSize: 12,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}

      {profile.links?.length ? (
        <div style={{ margin: '12px 0' }}>
          <h2>{t('profile.links')}</h2>
          <ul>
            {profile.links.map((l, i) => (
              <li key={`${l.url}-${i}`}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.title || l.url}
                </a>
                {l.type ? ` — ${l.type}` : ''}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <h2>{t('profile.projects')}</h2>
      {profile.projects && profile.projects.length > 0 ? (
        <ProjectsGrid projects={profile.projects} />
      ) : (
        <p>{t('profile.empty')}</p>
      )}
    </section>
  );
}
