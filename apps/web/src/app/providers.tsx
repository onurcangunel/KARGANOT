'use client';

/**
 * PROVIDERS COMPONENT
 * Tüm global provider'ları buradan yönetiyoruz
 * SessionProvider: NextAuth session yönetimi
 * QueryClientProvider: TanStack Query (React Query) için
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Her render'da yeni QueryClient oluşturma, state'de tut
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 dakika
            gcTime: 1000 * 60 * 10, // 10 dakika cacheTime
            retry: 1,
            refetchOnWindowFocus: false,
          },
  },
      })
  );

  // Dev: forward Query/Mutation cache events to server terminal
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const qc = queryClient.getQueryCache();
    const mc = queryClient.getMutationCache();
    const send = (type: string, payload: unknown) => {
      // eslint-disable-next-line no-console
      console.log('[RQ]', type, payload);
      try {
        fetch('/api/_rq-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'log', args: [type, payload] }),
          keepalive: true,
        }).catch(() => {});
      } catch {}
    };
    const unsubQ = qc.subscribe((event: any) => {
      const info = {
        type: event?.type,
        queryHash: event?.query?.queryHash,
        status: event?.query?.state?.status,
      };
      send('query', info);
    });
    const unsubM = mc.subscribe((event: any) => {
      const info = {
        type: event?.type,
        options: event?.mutation?.options?.mutationKey,
        status: event?.mutation?.state?.status,
      };
      send('mutation', info);
    });
    return () => {
      unsubQ?.();
      unsubM?.();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
