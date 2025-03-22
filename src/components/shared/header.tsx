'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { data: session, status } = useSession();

  const fallbackAvatarText = session?.user?.firstName
    ? session.user.firstName.charAt(0).toUpperCase()
    : 'U';

  return (
    <header className="p-4 bg-gray-800 flex justify-between items-center min-h-[75px]">
      <h1 className="text-2xl font-bold text-white">Twitch Clone</h1>

      {status === 'authenticated' ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={session.user?.avatar || undefined}
                  alt="User Avatar"
                />
                <AvatarFallback className="bg-twitch-purple text-white">
                  {fallbackAvatarText}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 bg-gray-900 border-twitch-border rounded-lg shadow-lg"
            align="end"
            forceMount
          >
            <div className="p-3 border-b border-twitch-border">
              <p className="text-sm font-medium text-white">
                beretax308@gmail.com
              </p>
              <p className="text-xs text-twitch-text-secondary">
                Jasunbek Mansuraliyev
              </p>
            </div>

            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: '/' })}
              className="cursor-pointer text-white hover:bg-twitch-purple focus:bg-twitch-purple focus:text-white p-3"
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/login">
          <Button
            variant="outline"
            className="bg-twitch-purple text-white hover:bg-twitch-purple-hover"
          >
            Log In
          </Button>
        </Link>
      )}
    </header>
  );
}
