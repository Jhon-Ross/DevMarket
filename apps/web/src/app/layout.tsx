import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggle';
import LocaleProvider from '../components/LocaleProvider';
import AuthProvider from '../components/AuthProvider';
import NavLinks from '../components/NavLinks';
import UserMenu from '../components/UserMenu';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevMarket - Marketplace para Desenvolvedores',
  description:
    'Conecte-se com desenvolvedores talentosos e encontre projetos incríveis. Plataforma para freelancers e empresas.',
  keywords: ['desenvolvedores', 'freelancers', 'projetos', 'marketplace', 'tecnologia'],
  authors: [{ name: 'DevMarket Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          background: 'var(--bg-default)',
          color: 'var(--text-primary)',
          minHeight: '100vh',
        }}
      >
        <AuthProvider>
          <LocaleProvider>
          <header
            style={{
              borderBottom: '1px solid var(--border-default)',
              background: 'var(--bg-muted)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                padding: 'var(--space-4) var(--space-6)',
                maxWidth: 1200,
                margin: '0 auto',
              }}
            >
              <Link
                href="/"
                style={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                DevMarket
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <NavLinks />
                <LanguageSelector />
                <ThemeToggle />
                <UserMenu />
              </div>
            </nav>
          </header>
          <main style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--space-6)' }}>
            {children}
          </main>
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
