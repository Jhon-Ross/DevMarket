'use client';
import React, { useState } from 'react';

export default function ExpandableArea({
  children,
  maxHeight = 180,
  expandLabel = 'Mostrar tudo',
  collapseLabel = 'Recolher',
}: {
  children: React.ReactNode;
  maxHeight?: number;
  expandLabel?: string;
  collapseLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          maxHeight: expanded ? 'none' : maxHeight,
          overflow: expanded ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
      {!expanded ? (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 36,
            height: 48,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--bg-default) 80%)',
          }}
        />
      ) : null}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          padding: '8px 10px',
          marginTop: 8,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-default)',
          background: 'var(--bg-default)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        }}
        aria-expanded={expanded}
      >
        {expanded ? collapseLabel : expandLabel}
      </button>
    </div>
  );
}