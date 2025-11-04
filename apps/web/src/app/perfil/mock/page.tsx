import React from 'react';
import Image from 'next/image';
import '@ui/styles/profile-utilities.css';
import '@devmarket/ui';

type Skill = { name: string; level: number; subskills?: string[] };
type SkillCategory = { title: string; skills: Skill[] };

const profile = {
  name: 'Luan Souza',
  role: 'Desenvolvedor Frontend',
  seniority: 'Pleno',
  experienceProgress: 72, // progresso para próxima meta de carreira
  availability: 80, // disponibilidade semanal (%
  focusTime: 65, // tempo dedicado a foco/profundidade (%)
  avatarUrl: 'https://cdn.sanity.io/images/demo/production/luan-avatar.png',
  highlights: [
    'Performance e Acessibilidade',
    'Design System',
    'UX Colaborativo',
    'Cultura de Código',
  ],
};

const skillMatrix: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 85, subskills: ['Hooks', 'Context', 'SSR'] },
      { name: 'Next.js', level: 78, subskills: ['App Router', 'ISR', 'Images'] },
      { name: 'TypeScript', level: 82, subskills: ['Generics', 'Utility Types'] },
    ],
  },
  {
    title: 'Estilos & UI',
    skills: [
      { name: 'CSS', level: 88, subskills: ['Grid', 'Flexbox', 'Animations'] },
      { name: 'Design System', level: 74, subskills: ['Tokens', 'A11y', 'Componentização'] },
      { name: 'Tailwind', level: 70, subskills: ['Plugins', 'Theming'] },
    ],
  },
  {
    title: 'Ferramentas & Qualidade',
    skills: [
      { name: 'Build (Webpack/Vite)', level: 66, subskills: ['Code Split', 'HMR'] },
      { name: 'Testing', level: 60, subskills: ['Jest', 'RTL'] },
    ],
  },
];

const projects = [
  {
    title: 'Design System Interno',
    desc: 'Biblioteca de componentes com tokens semânticos.',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-1.jpg',
  },
  {
    title: 'Dashboard de Métricas',
    desc: 'Painel com filtros e gráficos para produto.',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-2.jpg',
  },
  {
    title: 'Player de Vídeo Acessível',
    desc: 'Controles, atalhos e comentários moderados.',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-3.jpg',
  },
];

export const metadata = {
  title: 'Perfil (Mock • Profissional) • DevMarket',
  description: 'Página mock com estética de ficha, organizada para perfil profissional.',
};

export default function PerfilMockPage() {
  return (
    <main className="profile-wrap" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <section className="profile-header">
        <div>
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={100}
            height={100}
            unoptimized
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h1 className="profile-name">{profile.name}</h1>
          <div className="profile-meta">
            <span className="profile-role">{profile.role}</span>
            <span>{profile.seniority}</span>
          </div>
          <div style={{ display: 'grid', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            <div>
              <div className="section-title">Experiência</div>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${profile.experienceProgress}%` }}
                />
              </div>
            </div>
            <div>
              <div className="section-title">Disponibilidade</div>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${profile.availability}%`, background: 'var(--color-success)' }}
                />
              </div>
            </div>
            <div>
              <div className="section-title">Tempo de Foco</div>
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${profile.focusTime}%`, background: 'var(--color-warning)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">Destaques</div>
        <div className="badges">
          {profile.highlights.map((b, i) => (
            <span
              key={`${b}-${i}`}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      <section className="skills-section">
        {skillMatrix.map((cat) => (
          <details className="category" key={cat.title} open>
            <summary className="category-header">
              <span className="category-title">{cat.title}</span>
              <span className="chevron" aria-hidden />
            </summary>
            <div className="category-body">
              {cat.skills.map((s) => (
                <div className="skill-row" key={s.name}>
                  <div className="skill-head">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-level-badge">{s.level}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: `${s.level}%` }} />
                  </div>
                  {s.subskills?.length ? (
                    <div className="subskills">
                      {s.subskills.map((sub) => (
                        <div className="subskill-row" key={sub}>
                          <span className="subskill-name">{sub}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </details>
        ))}
      </section>

      <section>
        <div className="section-title">Projetos</div>
        <div className="carousel">
          {projects.map((p) => (
            <div className="carousel-item" key={p.title}>
              <Image
                src={p.imageUrl}
                alt={p.title}
                width={320}
                height={200}
                unoptimized
                className="project-thumb"
              />
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
