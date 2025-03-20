'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-400 mb-8">{error.message}</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline" className="text-black">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
