export type AnalyticsEvent =
  | 'home_cta_start_click'
  | 'home_cta_learn_click'
  | 'home_showcase_view'
  | 'home_scroll_depth_50'
  | 'home_scroll_depth_90';

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  try {
    // Console para debug local
    // eslint-disable-next-line no-console
    console.log('[analytics]', event, payload || {});
    // dataLayer (se disponível)
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...(payload || {}) });
    }
  } catch {}
}