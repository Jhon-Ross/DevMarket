'use client';
import React, { useEffect, useRef, useState } from 'react';

type UploadAreaProps = {
  label?: string;
  endpoint: string;
  accept?: string;
  maxSizeMB?: number;
  currentUrl?: string | null;
  onSuccess?: (data: any) => void;
};

export default function UploadArea({
  label = 'Selecione ou arraste uma imagem',
  endpoint,
  accept = 'image/*',
  maxSizeMB = 5,
  currentUrl,
  onSuccess,
}: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreviewUrl(currentUrl || null);
  }, [currentUrl]);

  function onSelectFile(file: File) {
    setError(null);
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Arquivo maior que ${maxSizeMB}MB.`);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    upload(file).finally(() => URL.revokeObjectURL(url));
  }

  async function upload(file: File) {
    try {
      setStatus('uploading');
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(endpoint, { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setError(data?.error || 'Falha no upload');
        return;
      }
      setStatus('success');
      setError(null);
      if (onSuccess) onSuccess(data);
    } catch (e) {
      setStatus('error');
      setError('Erro interno no upload');
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: 8,
      }}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onSelectFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        aria-label={label}
        style={{
          border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border-default)'}`,
          borderRadius: 8,
          padding: 12,
          cursor: 'pointer',
          background: dragOver ? 'var(--bg-subtle)' : 'var(--bg-default)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--text-primary)' }}>{label}</span>
          <button
            type="button"
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: '1px solid var(--border-default)',
              borderRadius: 6,
              padding: '6px 10px',
              color: 'var(--text-primary)',
            }}
          >
            Selecionar arquivo
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (file) onSelectFile(file);
          }}
        />
      </div>

      {previewUrl ? (
        <div style={{ display: 'grid', gap: 8 }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }}
          />
          {status === 'uploading' ? (
            <div style={{ height: 6, background: 'var(--bg-subtle)', borderRadius: 999 }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--accent)',
                  borderRadius: 999,
                  animation: 'progressPulse 1s infinite',
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {status === 'success' ? (
        <div role="status" style={{ color: 'var(--success-600)' }}>
          Upload concluído.
        </div>
      ) : null}
      {status === 'error' && error ? (
        <div role="alert" style={{ color: 'var(--danger-600)' }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
