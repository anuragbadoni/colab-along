import React from 'react';
import Link from 'next/link';
import Hint from './Hint';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export default function EmptyOrg() {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-semibold mt-6'>Welcome to Board</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Create an organization to get started
      </p>

      <Button
        size='lg'
        className='mt-6'
        asChild
      >
        <Link href='/create-organization'>Create organization</Link>
      </Button>
    </div>
  );
}
