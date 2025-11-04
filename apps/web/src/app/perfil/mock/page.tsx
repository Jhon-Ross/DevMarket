import React from 'react';

type FeedPost = {
  id: string;
  authorName: string;
  authorSlug: string;
  authorAvatar?: string | null;
  imageUrl: string;
  caption?: string;
  tags?: string[];
  likes?: number;
  createdAt?: string;
};

const feedPosts: FeedPost[] = [
  {
    id: 'p1',
    authorName: 'Luan Dev',
    authorSlug: 'luan-dev',
    authorAvatar: 'https://cdn.sanity.io/images/demo/production/luan-avatar.png',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-1.jpg',
    caption: 'Landing page com animações e layout responsivo.',
    tags: ['Next.js', 'TypeScript', 'CSS'],
    likes: 128,
    createdAt: '2025-11-03T14:12:00Z',
  },
  {
    id: 'p2',
    authorName: 'Ana Code',
    authorSlug: 'ana-code',
    authorAvatar: 'https://cdn.sanity.io/images/demo/production/ana-avatar.png',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-2.jpg',
    caption: 'Dashboard com gráficos e filtros avançados.',
    tags: ['React', 'UX', 'Charts'],
    likes: 204,
    createdAt: '2025-11-03T13:00:00Z',
  },
  {
    id: 'p3',
    authorName: 'DevMarket',
    authorSlug: 'devmarket',
    authorAvatar: 'https://cdn.sanity.io/images/demo/production/devmarket.png',
    imageUrl: 'https://cdn.sanity.io/images/demo/production/project-3.jpg',
    caption: 'Protótipo de player de vídeo com comentários.',
    tags: ['Video', 'UI', 'Accessibility'],
    likes: 76,
    createdAt: '2025-11-02T09:45:00Z',
  },
];

export const metadata = {
  title: 'Perfil (Mock) • DevMarket',
  description: 'Feed de projetos simulado no perfil.',
};

export default function PerfilMockPage() {
  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: 800, margin: '0 auto' }}>
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Perfil • Mock</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Exemplo de feed tipo Instagram com estilos globais.
        </p>
      </header>

      <section className="feed">
        {feedPosts.map((post) => (
          <article className="post" key={post.id} aria-label={`Post de ${post.authorName}`}>
            <div className="post-header">
              <a href={`/perfil/${post.authorSlug}`} className="post-author">
                {post.authorAvatar ? (
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    width={32}
                    height={32}
                    style={{ borderRadius: 999, objectFit: 'cover' }}
                    onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
                  />
                ) : null}
                <span>{post.authorName}</span>
              </a>
              {post.createdAt ? (
                <time className="post-meta" dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleString('pt-BR')}
                </time>
              ) : null}
            </div>

            <div className="post-image">
              <img
                src={post.imageUrl}
                alt={post.caption || 'Projeto'}
                width={800}
                height={800}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                onError={(e) => ((e.currentTarget.style.display = 'none'), void 0)}
              />
            </div>

            <div className="post-actions">
              <button type="button" aria-label="Curtir" className="action-like">
                ❤️ {post.likes ?? 0}
              </button>
              <button type="button" aria-label="Comentar" className="action-comment">
                💬
              </button>
              <button type="button" aria-label="Salvar" className="action-save">
                📌
              </button>
            </div>

            {post.caption ? <p className="post-caption">{post.caption}</p> : null}
            {post.tags?.length ? (
              <div className="post-tags">
                {post.tags.map((t, i) => (
                  <span key={`${t}-${i}`} className="tag">
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </main>
  );
}
