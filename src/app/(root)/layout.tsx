import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import Sidebar from '@/components/shared/sidebar';

const Header = dynamic(() => import('@/components/shared/header'), {});

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white w-full max-w-3xl mx-auto">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
