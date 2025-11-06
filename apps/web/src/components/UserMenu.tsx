'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppLink from './AppLink';
import { useSession, signOut } from 'next-auth/react';
import { Avatar } from '@devmarket/ui';
import SidePanel from './SidePanel';
import MyProfileForm from '@/app/perfil/meu/MyProfileForm';
import NewProjectForm from '@/app/projetos/novo/NewProjectForm';

function getInitials(name?: string | null, email?: string | null) {
  const src = (name || email || '').trim();
  if (!src) return '?';
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return src[0]?.toUpperCase() || '?';
  const first = parts[0][0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] || '' : '';
  return (first + last).toUpperCase();
}

export default function UserMenu() {
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileSlug, setProfileSlug] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<null | 'editProfile' | 'newProject'>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    let active = true;
    async function loadProfileBasics() {
      try {
        if (!user) {
          setAvatarUrl(null);
          setProfileSlug(null);
          return;
        }
        const res = await fetch('/api/profile', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const url = data?.profile?.avatarUrl || null;
        const slug = data?.profile?.slug || null;
        if (active) {
          setAvatarUrl(url);
          setProfileSlug(slug);
        }
      } catch {}
    }
    loadProfileBasics();
    return () => {
      active = false;
    };
  }, [user?.id]);

  if (!user) return null;

  const initials = getInitials(user.name as string | null, user.email as string | null);

  return (
    <>
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: '1px solid var(--border-default)',
          borderRadius: '999px',
          padding: '4px 8px 4px 4px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        }}
      >
        <Avatar
          src={avatarUrl || undefined}
          name={(user.name as string) || (user.email as string) || 'Usuário'}
          size="sm"
          aria-hidden
        />
        <span style={{ fontSize: 13 }}>{user.name || user.email}</span>
      </button>

      {open ? (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 200,
            background: 'var(--bg-default)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
            padding: 8,
            zIndex: 20,
          }}
        >
          <AppLink
            href={
              profileSlug
                ? `/perfil/${profileSlug}`
                : (() => {
                    // Fallback: derive slug from email
                    const src = (user?.email || 'user').toLowerCase();
                    const derived = src.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return `/perfil/${derived || 'meu'}`;
                  })()
            }
            style={{
              display: 'block',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
            onClick={() => setOpen(false)}
          >
            Meu Perfil
          </AppLink>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setDrawer('editProfile');
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Editar Perfil
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setDrawer('newProject');
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            Novo Projeto
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: '/' });
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Sair
          </button>
        </div>
      ) : null}
    </div>
      {/* Side drawers */}
      <SidePanel
        open={drawer === 'editProfile'}
        title="Editar Perfil"
        onClose={() => setDrawer(null)}
        width={540}
      >
        <MyProfileForm />
      </SidePanel>
      <SidePanel
        open={drawer === 'newProject'}
        title="Novo Projeto"
        onClose={() => setDrawer(null)}
        width={540}
      >
        <NewProjectForm />
      </SidePanel>
    </>
  );
}