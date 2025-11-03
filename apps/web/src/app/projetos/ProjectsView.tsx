'use client';
import React from 'react';
import { useLocale } from '../../components/LocaleProvider';
import ProjectsGrid from './ProjectsGrid';

type PublicProject = {
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

export default function ProjectsView({ projects }: { projects: PublicProject[] }) {
  const { t } = useLocale();

  return (
    <section>
      <h1>{t('projects.title')}</h1>
      {projects.length > 0 ? <ProjectsGrid projects={projects} /> : <p>{t('projects.empty')}</p>}
    </section>
  );
}
