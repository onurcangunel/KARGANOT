'use client';

/**
 * PROVIDERS COMPONENT
 * Tüm global provider'ları buradan yönetiyoruz
 * SessionProvider: NextAuth session yönetimi
 * QueryClientProvider: TanStack Query (React Query) için
 */

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

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
            gcTime: 1000 * 60 * 60 * 24, // 24 saat (eski cacheTime)
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
