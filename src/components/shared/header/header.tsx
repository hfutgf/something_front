'use client';

import { AlignJustify, LogOut, Plus, SquarePlay } from 'lucide-react';
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

import HeaderSearch from './components/header-search';

export default function Header() {
  const { data: session, status } = useSession();

  const fallbackAvatarText = session?.user?.firstName
    ? session.user.firstName.charAt(0).toUpperCase()
    : 'U';

  return (
    <header className="p-4 bg-gray-900 flex justify-between items-center gap-4 min-h-[75px] max-h-[75px] w-full">
      <div className="flex items-center gap-4">
        <button className="cursor-pointer p-2 rounded-full hover:bg-gray-800 duration-100">
          <AlignJustify />
        </button>
        <h1 className="text-2xl font-bold text-white">LOGO</h1>
      </div>

      <HeaderSearch />

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="focus:bg-gray-800  hover:bg-gray-800 hover:text-white focus:text-white rounded-full"
            >
              <Link
                href={'/create-video'}
                className="flex items-center gap-1.5"
              >
                <Plus size={16} />
                <span className="text-base">Create</span>
              </Link>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 bg-gray-800 border-gray-800 rounded-lg shadow-lg"
            align="end"
            forceMount
          >
            <DropdownMenuItem className="cursor-pointer flex items-center gap-1.5 text-white focus:bg-gray-900 focus:text-white duration-100">
              <SquarePlay size={14} className="text-white text-sm" /> Add video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {status === 'authenticated' ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={session?.user?.avatar || undefined}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="bg-gray-800 text-white">
                    {fallbackAvatarText}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-56 bg-gray-800 border-gray-800 rounded-lg shadow-lg"
              align="end"
              forceMount
            >
              <div className="p-3 border-b border-gray-800">
                <p className="text-sm font-medium text-white">
                  beretax308@gmail.com
                </p>
                <p className="text-xs text-twitch-text-secondary">
                  Jasunbek Mansuraliyev
                </p>
              </div>

              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: '/' })}
                className="cursor-pointer flex items-center gap-1.5 text-white focus:bg-gray-900 focus:text-white duration-100"
              >
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/login">
            <Button variant="link" className="text-white">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
