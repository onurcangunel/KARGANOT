// GA4 gtag helpers
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTAG_ID || '';

type GtagCommand = 'config' | 'event' | 'js';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function ensureGtag() {
  if (typeof window === 'undefined') return;
  if (!window.dataLayer) window.dataLayer = [] as any[];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // Push to dataLayer so GTM da okuyabilsin
      window.dataLayer.push(arguments as unknown as any);
      if (process.env.NODE_ENV !== 'production') {
        // Dev log
        // eslint-disable-next-line no-console
        console.log('[gtag]', ...Array.from(arguments as unknown as any[]));
      }
    } as any;
  }
}

export function pageview(title: string, url: string) {
  if (typeof window === 'undefined') return;
  ensureGtag();
  const payload = { page_title: title, page_path: url } as const;
  // Direct GA4 via gtag.js (if loaded)
  if (GA_ID) {
    window.gtag('config' as GtagCommand, GA_ID, payload);
  }
  // Also push to GTM dataLayer for containers that handle GA4
  try {
    window.dataLayer.push({ event: 'page_view', ...payload });
  } catch {}
}

export function event(action: string, params: Record<string, any> = {}) {
  if (!GA_ID) return;
  if (typeof window === 'undefined') return;
  ensureGtag();
  window.gtag('event' as GtagCommand, action, params);
  try {
    // debug store
    const key = 'karganot_ga_events';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push({ action, params, ts: Date.now() });
    localStorage.setItem(key, JSON.stringify(arr).slice(-5000));
  } catch {}
}
