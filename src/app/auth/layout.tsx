import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-xs p-6 bg-gray-800 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}
