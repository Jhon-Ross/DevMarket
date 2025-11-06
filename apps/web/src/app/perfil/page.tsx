import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Perfil • DevMarket',
  description: 'Redireciona para a edição do perfil autenticado.',
};

export default function PerfilPage() {
  redirect('/perfil/meu');
}
