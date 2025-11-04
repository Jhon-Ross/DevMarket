import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NewProjectForm from './NewProjectForm';

export default async function NewProjectPage() {
  let session = null as Awaited<ReturnType<typeof getServerSession>> | null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    // Em casos de JWT_SESSION_ERROR (falha de decriptação), tratamos como não autenticado
    console.error('[auth] getServerSession error:', e);
    session = null;
  }
  if (!session) {
    redirect('/login?callbackUrl=%2Fprojetos%2Fnovo');
  }

  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Novo Projeto</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Publique seu projeto. Ele começará com status pendente para moderação.</p>
      </header>
      <NewProjectForm />
    </main>
  );
}

export const metadata = {
  title: 'Novo Projeto • DevMarket',
};