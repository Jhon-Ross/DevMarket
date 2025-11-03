export default function LoadingProfile() {
  return (
    <section aria-busy="true" aria-live="polite">
      <div
        style={{
          display: 'grid',
          gap: 'var(--space-4)',
        }}
      >
        <div
          style={{
            height: 28,
            width: '40%',
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-sm)',
          }}
        />
        <div
          style={{
            height: 16,
            width: '70%',
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-sm)',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-3)',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 90,
                background: 'var(--bg-muted)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
