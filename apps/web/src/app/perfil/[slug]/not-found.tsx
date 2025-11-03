import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h1 style={{ color: 'var(--text-primary)' }}>Perfil não encontrado</h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        O perfil solicitado não existe ou foi removido.
      </p>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          Voltar para a Home
        </Link>
      </div>
    </section>
  );
}
