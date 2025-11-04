import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NewProjectForm from './NewProjectForm';
import NewProjectHeader from './NewProjectHeader';

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
      <NewProjectHeader />
      <NewProjectForm />
    </main>
  );
}

export const metadata = {
  title: 'Novo Projeto • DevMarket',
};
