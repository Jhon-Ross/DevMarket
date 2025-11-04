import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed • DevMarket',
};

export default function ProjetosRedirectPage() {
  redirect('/feed');
}
