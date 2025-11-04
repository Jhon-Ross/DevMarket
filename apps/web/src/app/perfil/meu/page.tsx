import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MyProfileForm from './MyProfileForm';
import MyProfileHeader from './MyProfileHeader';

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
      <MyProfileHeader />
      <MyProfileForm />
    </main>
  );
}

export const metadata = {
  title: 'Meu Perfil • DevMarket',
};
