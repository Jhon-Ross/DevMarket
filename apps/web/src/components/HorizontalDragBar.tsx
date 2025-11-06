'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function HorizontalDragBar({
  title = 'Clique e arraste para mover o conteúdo para os lados',
}: {
  title?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current = document.querySelector(
      '[data-sidepanel-content="true"]'
    ) as HTMLDivElement | null;
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging || !containerRef.current) return;
      const delta = e.clientX - startXRef.current;
      containerRef.current.scrollLeft = startScrollLeftRef.current - delta;
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

  return (
    <div
      aria-label="Arraste para rolar horizontalmente"
      onMouseDown={(e) => {
        if (!containerRef.current) return;
        setDragging(true);
        startXRef.current = e.clientX;
        startScrollLeftRef.current = containerRef.current.scrollLeft;
      }}
      style={{
        height: 24,
        cursor: dragging ? 'grabbing' : 'grab',
        background: 'linear-gradient(90deg, var(--bg-muted), var(--bg-default))',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
        borderRadius: 4,
        userSelect: 'none',
      }}
      title={title}
    />
  );
}
