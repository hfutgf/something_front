'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, Suspense } from 'react';

import TopLoader from '@/components/shared/top-loader';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Suspense
        fallback={
          <div className="min-h-screen min-w-screen p-5">Loading...</div>
        }
      >
        <QueryClientProvider client={queryClient}>
          <TopLoader />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </SessionProvider>
  );
}
