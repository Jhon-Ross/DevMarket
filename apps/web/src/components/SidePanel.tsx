'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function SidePanel({
  open,
  title,
  onClose,
  children,
  width = 440,
}: {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [panelWidth, setPanelWidth] = useState(width);
  const [resizeDragging, setResizeDragging] = useState(false);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(0);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging || !contentRef.current) return;
      const delta = e.clientX - startXRef.current;
      contentRef.current.scrollLeft = startScrollLeftRef.current - delta;
    }
    function onUp() {
      setDragging(false);
    }
    if (dragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  useEffect(() => {
    function onResizeMove(e: MouseEvent) {
      if (!resizeDragging) return;
      const delta = resizeStartXRef.current - e.clientX;
      let next = resizeStartWidthRef.current + delta;
      const min = 360;
      const max = Math.min(window.innerWidth - 80, 960);
      if (!Number.isFinite(next)) return;
      next = Math.max(min, Math.min(max, next));
      setPanelWidth(next);
    }
    function onResizeUp() {
      setResizeDragging(false);
    }
    if (resizeDragging) {
      window.addEventListener('mousemove', onResizeMove);
      window.addEventListener('mouseup', onResizeUp);
    }
    return () => {
      window.removeEventListener('mousemove', onResizeMove);
      window.removeEventListener('mouseup', onResizeUp);
    };
  }, [resizeDragging]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
        }}
      />
      {/* Panel */}
      <aside
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: panelWidth,
          maxWidth: '100%',
          background: 'var(--bg-default)',
          borderLeft: '1px solid var(--border-default)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr',
        }}
      >
        {/* Alça de redimensionamento com setinha na borda esquerda */}
        <div
          role="separator"
          aria-label="Arraste para ajustar a largura do painel"
          onMouseDown={(e) => {
            setResizeDragging(true);
            resizeStartXRef.current = e.clientX;
            resizeStartWidthRef.current = panelWidth;
          }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: 14,
            cursor: 'ew-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            zIndex: 2,
            userSelect: 'none',
          }}
          title="Arraste para ajustar a largura do painel"
        >
          <div
            style={{
              width: 10,
              height: 48,
              borderRadius: 6,
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-default)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          />
        </div>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: '12px 16px',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-muted)',
          }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>{title}</strong>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: 6,
              borderRadius: 6,
            }}
          >
            ✕
          </button>
        </header>
        {/* Barra clicável para arrastar horizontalmente */}
        <div
          aria-label="Arraste para rolar horizontalmente"
          onMouseDown={(e) => {
            if (!contentRef.current) return;
            setDragging(true);
            startXRef.current = e.clientX;
            startScrollLeftRef.current = contentRef.current.scrollLeft;
          }}
          style={{
            height: 24,
            cursor: 'grab',
            background: 'linear-gradient(90deg, var(--bg-muted), var(--bg-default))',
            borderBottom: '1px solid var(--border-default)',
          }}
          title="Clique e arraste para mover o conteúdo para os lados"
        />
        <div
          ref={contentRef}
          data-sidepanel-content="true"
          style={{
            overflowX: 'auto',
            overflowY: 'auto',
            padding: 16,
            contain: 'content',
          }}
        >
          {children}
        </div>
      </aside>
    </div>
  );
}
