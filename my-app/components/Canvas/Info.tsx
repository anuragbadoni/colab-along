'use client';

import React from 'react';

import { InfoProps } from '@/types';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import Hint from '../Hint';
import BoardDropdownMenu from '../BoardDropdownMenu';

import { useBoardStore } from '@/zustand/boardStore';
import { Menu } from 'lucide-react';
import TabSeparator from '../TabSeparator';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Info({ boardId }: InfoProps) {
  const { setModalOpen } = useBoardStore();

  const data = useQuery(api.board.get, {
    id: boardId as Id<'boards'>,
  });

  if (!data) {
    return <InfoSkeleton />;
  }

  const handleOpenRenameModal = () => {
    setModalOpen(data._id, data.title);
  };

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint
        label='Go to boards'
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
      <TabSeparator />
      <Hint
        label='Go to dashboard'
        side='bottom'
        sideOffset={10}
      >
        <Button
          asChild
          variant='board'
          className='text-base font-normal px-2'
        >
          <Link href='/dashboard'>Dashboard</Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint
        label='Edit title'
        side='bottom'
        sideOffset={10}
      >
        <Button
          onClick={handleOpenRenameModal}
          variant='board'
          className='text-base font-normal px-2'
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <BoardDropdownMenu
        id={data._id}
        title={data.title}
        side='bottom'
        sideOffset={10}
      >
        <div>
          <Hint
            label='Main menu'
            side='bottom'
            sideOffset={10}
          >
            <Button
              size='icon'
              variant='board'
            >
              <Menu />
            </Button>
          </Hint>
        </div>
      </BoardDropdownMenu>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]' />
  );
}
