'use client';

import React from 'react';
import Link from 'next/link';

import { Plus } from 'lucide-react';
import { useOrganizationList } from '@clerk/nextjs';
import OrganizationListItem from './OrganizationListItem';
import Hint from '../Hint';

export default function Sidebar() {
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <aside className='fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white'>
      <ul className='space-y-4'>
        {userMemberships?.data.map((membership) => (
          <React.Fragment key={membership.organization.id}>
            <OrganizationListItem
              id={membership.organization.id}
              name={membership.organization.name}
              imageUrl={membership.organization.imageUrl}
            />
          </React.Fragment>
        ))}
      </ul>

      <Link
        href='/create-organization'
        className='aspect-square'
      >
        <Hint
          label='Create organization'
          side='right'
          align='start'
          sideOffset={18}
        >
          <div className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
            <Plus className='text-white' />
          </div>
        </Hint>
      </Link>
    </aside>
  );
}
