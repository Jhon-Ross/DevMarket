import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevMarket - Marketplace para Desenvolvedores",
  description: "Conecte-se com desenvolvedores talentosos e encontre projetos incríveis. Plataforma para freelancers e empresas.",
  keywords: ["desenvolvedores", "freelancers", "projetos", "marketplace", "tecnologia"],
  authors: [{ name: "DevMarket Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{
        background: "var(--bg-default)",
        color: "var(--text-primary)",
        minHeight: "100vh"
      }}>
        <header style={{
          borderBottom: "1px solid var(--border-default)",
          background: "var(--bg-muted)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-4)",
            padding: "var(--space-4) var(--space-6)",
            maxWidth: 1200,
            margin: "0 auto"
          }}>
            <Link href="/" style={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              textDecoration: "none"
            }}>
              DevMarket
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Link href="/ui-preview" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>UI Preview</Link>
              <Link href="/projetos" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Projetos</Link>
              <Link href="/perfil/teste" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Perfil</Link>
            </div>
          </nav>
        </header>
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "var(--space-6)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
