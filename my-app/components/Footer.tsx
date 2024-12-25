import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Footer() {
  return (
    <footer className='max-w-screen-xl w-full mx-auto mb-32 mt-32 sm:mt-56'>
      <div className='rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
        <div className='flex flex-row items-center gap-x-2'>
          <Link
            href='/'
            className='flex'
          >
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
          <div>© 2024</div>
        </div>
      </div>
    </footer>
  );
}
