import React from 'react';

import Hint from './Hint';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { UserAvatarProps } from '@/types';

export default function UserAvatar({
  src,
  name,
  fallback,
  borderColor,
}: UserAvatarProps) {
  return (
    <Hint
      label={name || 'Teammate'}
      side='bottom'
      sideOffset={18}
    >
      <Avatar
        className='h-8 w-8 border-2'
        style={{ borderColor }}
      >
        <AvatarImage
          src={src}
          alt='avatar image'
        />
        <AvatarFallback className='text-xs font-semibold'>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}
