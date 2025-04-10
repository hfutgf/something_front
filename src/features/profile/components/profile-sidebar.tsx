'use client';

import { Play } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const paths = (chanelId: string) => [
  {
    path: `/channel/${chanelId}/upload`,
    title: 'Media',
    icon: <Play size={16} />,
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const channelId = '1';
  return (
    <aside className="w-68 bg-gray-900 p-4">
      <nav>
        <ul>
          {paths(channelId).map((path) => (
            <li key={path.path} className="mb-2">
              <Link
                href={path.path}
                className={cn(
                  'hover:bg-gray-800 flex items-center p-2 rounded-xl gap-1.5',
                  { 'bg-gray-900 ': pathname === path.path },
                )}
              >
                {path.icon} {path.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
