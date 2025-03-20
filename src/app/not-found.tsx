import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button variant="outline" className="text-black">
          Go back home
        </Button>
      </Link>
    </div>
  );
}
