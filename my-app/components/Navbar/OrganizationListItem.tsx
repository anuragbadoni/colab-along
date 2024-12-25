import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Hint from '../Hint';

import { OrginazationListItemProps } from '@/types';

export default function OrganizationListItem({
  id,
  name,
  imageUrl,
}: OrginazationListItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const handleSetActiveOrganization = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div
      key={id}
      className='aspect-square relative'
    >
      <Hint
        label={name}
        side='right'
        align='start'
        sideOffset={18}
      >
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={handleSetActiveOrganization}
          className={cn(
            'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </Hint>
    </div>
  );
}
