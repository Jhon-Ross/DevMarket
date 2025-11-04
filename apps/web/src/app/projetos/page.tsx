import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Projetos • DevMarket (Mock)',
  description: 'Redireciona para feed mockado sem backend.',
};

export default function ProjetosPage() {
  redirect('/projetos/mock');
}
