import type { Metadata } from 'next';
import FeedPageClient from './FeedPageClient';
import { loadFeedFromSanity } from './loader';

export const metadata: Metadata = {
  title: 'Feed • DevMarket',
};

// Preparação para ISR: revalida a cada 5 minutos
export const revalidate = 300;

export default async function FeedPage() {
  const items = await loadFeedFromSanity();
  return <FeedPageClient items={items} />;
}
