import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useOrganization } from '@clerk/nextjs';

export default function InviteButton() {
  const { organization } = useOrganization();

  return (
    <Button
      variant='outline'
      asChild
    >
      {organization && (
        <Link href='/organization-profile'>
          <Plus className='h-4 w-4 mr-2' />
          Invite members
        </Link>
      )}
    </Button>
  );
}
