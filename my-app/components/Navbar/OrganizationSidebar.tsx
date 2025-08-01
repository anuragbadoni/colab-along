'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { LayoutDashboard, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function OrganizationSidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');

  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
      <Link href='/dashboard'>
        <div className='flex items-center gap-x-2'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={60}
            height={60}
          />
          <span className={cn('font-semibold text-2xl', font.className)}>
            Board
          </span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />
      <div className='space-y-1 w-full'>
        <Button
          variant={favorites ? 'taskbarOffset' : 'taskbar'}
          asChild
          size='lg'
          className='font-normal justify-start px-2 w-full '
        >
          <Link href='/dashboard'>
            <LayoutDashboard className='h-4 w-4 mr-2 ' />
            Team boards
          </Link>
        </Button>
        <Button
          variant={favorites ? 'taskbar' : 'taskbarOffset'}
          asChild
          size='lg'
          className='font-normal justify-start px-2 w-full'
        >
          <Link
            href={{
              pathname: '/dashboard',
              query: { favorites: true },
            }}
          >
            <Star className='h-4 w-4 mr-2' />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
}
