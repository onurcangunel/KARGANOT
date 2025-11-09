"use client";
import { useCallback } from 'react';
import { event as gtagEvent } from '@/lib/analytics/gtag';

// GTM dataLayer push helper
function pushToDataLayer(payload: Record<string, any>) {
  if (typeof window === 'undefined') return;
  /* eslint-disable-next-line */
  (window as any).dataLayer = (window as any).dataLayer || [];
  /* eslint-disable-next-line */
  (window as any).dataLayer.push(payload);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[gtm]', payload);
  }
}

export function useTrackEvent(defaultParams?: Record<string, any>) {
  return useCallback(
    (action: string, params?: Record<string, any>) => {
      const merged = { ...defaultParams, ...params };
      gtagEvent(action, merged);
      pushToDataLayer({ event: action, ...merged });
    },
    [defaultParams]
  );
}
