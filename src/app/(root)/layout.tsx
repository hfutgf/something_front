import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import Sidebar from '@/components/shared/sidebar/sidebar';

const Header = dynamic(() => import('@/components/shared/header/header'), {});

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full max-w-3xl mx-auto">
      <Header />
      <div className="min-h-[calc(100vh-75px)] flex">
        <Sidebar />
        <main className="p-6 w-full">{children}</main>
      </div>
    </div>
  );
}
