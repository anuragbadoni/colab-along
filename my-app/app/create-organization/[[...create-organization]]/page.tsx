import { CreateOrganization, UserButton } from '@clerk/nextjs';

import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Hint from '@/components/Hint';
import TabSeparator from '@/components/TabSeparator';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function CreateOrganizationPage() {
  return (
    <>
      <title>Create Organization</title>
      <main className='h-full w-full relative bg-neutral-100 touch-none'>
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
          <div className='text-base font-normal px-2'>Create organization</div>
        </div>
        <div className='absolute top-2 right-2 bg-white rounded-md px-3 h-12 flex items-center shadow-md'>
          <UserButton />
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <CreateOrganization
            path='/create-organization'
            afterCreateOrganizationUrl='/dashboard'
          />
        </div>
      </main>
    </>
  );
}
