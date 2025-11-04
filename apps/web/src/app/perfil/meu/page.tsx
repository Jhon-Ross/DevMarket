import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MyProfileForm from './MyProfileForm';

export default async function MyProfilePage() {
  let session = null as Awaited<ReturnType<typeof getServerSession>> | null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    // Em casos de JWT_SESSION_ERROR (falha de decriptação), tratamos como não autenticado
    console.error('[auth] getServerSession error:', e);
    session = null;
  }
  if (!session) {
    redirect('/login?callbackUrl=%2Fperfil%2Fmeu');
  }

  return (
    <main style={{ padding: 'var(--space-8)', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Meu Perfil</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Edite seu perfil público. Publicações de projetos entram como "pendentes" para moderação.
        </p>
      </header>
      <MyProfileForm />
    </main>
  );
}

export const metadata = {
  title: 'Meu Perfil • DevMarket',
};