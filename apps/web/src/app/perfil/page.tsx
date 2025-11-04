import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Perfil • DevMarket (Mock)',
  description: 'Redireciona para perfil mockado sem backend.',
};

export default function PerfilPage() {
  redirect('/perfil/mock');
}
