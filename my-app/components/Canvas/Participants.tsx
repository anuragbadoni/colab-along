'use client';
import React from 'react';

import { useOthers, useSelf } from '@liveblocks/react/suspense';

import UserAvatar from '../UserAvatar';

import { connectionIdToColor } from '@/lib/utils';

const MAX_SHOWN_OTHER_USERS = 2;

export default function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className='absolute h-12 top-2 right-2 rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {users
          .slice(0, MAX_SHOWN_OTHER_USERS)
          .map(({ connectionId, info }, i) => (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || 'T'}
            />
          ))}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_OTHER_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_OTHER_USERS}`}
          />
        )}
      </div>
    </div>
  );
}

export function ParticipantsSkeleton() {
  return (
    <div className='bg-white absolute h-12 top-2 right-2 rounded-md p-3 flex items-center shadow-md w-[100px]' />
  );
}
