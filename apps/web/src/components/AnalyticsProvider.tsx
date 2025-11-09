"use client";
import { ReactNode, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, event as gtagEvent } from '@/lib/analytics/gtag';
import { EVENTS } from '@/lib/analytics/events';

interface Props { children: ReactNode }

export default function AnalyticsProvider({ children }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    const title = document?.title || 'KARGANOT';
    pageview(title, url);
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[analytics] page_view', { title, url });
    }
  }, [pathname, searchParams]);

  // Example: global listeners (download links)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a');
      if (!el) return;
      const href = el.getAttribute('href') || '';
      const download = el.getAttribute('download');
      if (download || href.endsWith('.pdf') || href.includes('/download')) {
        // Fire GA and GTM directly to avoid hook-in-callback rule
        try { gtagEvent(EVENTS.note_download, { href }); } catch {}
        try {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({ event: EVENTS.note_download, href });
        } catch {}
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return <>{children}</>;
}
