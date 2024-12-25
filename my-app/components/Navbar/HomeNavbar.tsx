'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

import Hint from '../Hint';
import { Button, buttonVariants } from '../ui/button';
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { Authenticated } from 'convex/react';
import { usePathname } from 'next/navigation';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Navbar() {
  const pathname = usePathname();

  return pathname === '/' ? (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <div className='mx-auto w-full max-w-screen-xl px-2.5 md:px-20'>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Hint
            label='Go to home page'
            side='bottom'
            sideOffset={10}
          >
            <Button
              variant='board'
              className='px-2'
              asChild
            >
              <Link href='/'>
                <Image
                  src='/logo.svg'
                  alt='logo'
                  width={40}
                  height={40}
                />
                <span
                  className={cn(
                    'font-semibold text-xl ml-2 text-black',
                    font.className
                  )}
                >
                  Board
                </span>
              </Link>
            </Button>
          </Hint>
          <div className='hidden items-center space-x-4 sm:flex'>
            <SignedOut>
              <div
                className={buttonVariants({ size: 'sm', variant: 'outline' })}
              >
                <SignInButton />
              </div>
              <div className={buttonVariants({ size: 'sm' })}>
                <SignUpButton />
              </div>
            </SignedOut>
            <UserButton />
            <Authenticated>
              <Link href='/dashboard'>
                <Button variant='board'>Dashboard</Button>
              </Link>
            </Authenticated>
          </div>
        </div>
      </div>
    </nav>
  ) : null;
}
