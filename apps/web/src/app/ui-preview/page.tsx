import { notFound } from 'next/navigation';
import UiPreviewClient from './UiPreviewClient';

export default function PreviewPage() {
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) return notFound();
  return <UiPreviewClient />;
}
