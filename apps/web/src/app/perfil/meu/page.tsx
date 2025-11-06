import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import RedirectToPublicProfile from './RedirectToPublicProfile';

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

  return <RedirectToPublicProfile />;
}

export const metadata = {
  title: 'Meu Perfil • DevMarket',
};
