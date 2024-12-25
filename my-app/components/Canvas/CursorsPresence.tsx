'use client';

import React, { memo } from 'react';

import {
  shallow,
  useOther,
  useOthersConnectionIds,
  useOthersMapped,
} from '@liveblocks/react/suspense';
import { CursorProps } from '@/types';
import { MousePointer2 } from 'lucide-react';

import { colorToCss, connectionIdToColor } from '@/lib/utils';

import Path from '../LayerComponents/Path';

const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info),
    cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || 'Teammate';

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
      className='relative drop-shadow-md'
    >
      <MousePointer2
        className='h-5 w-5'
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className='absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold'
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = 'Cursor';

// Broadcasts other users cursors when they are in the same board
const OtherPeopleCursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  );
};

// Broadcasts other users drawing when they are in the same board
const OtherPeopleDrafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) =>
        other.pencilDraft ? (
          <Path
            key={key}
            x={0}
            y={0}
            points={other.pencilDraft}
            fill={other.penColor ? colorToCss(other.penColor) : '#000'}
          />
        ) : null
      )}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <OtherPeopleCursors />
      <OtherPeopleDrafts />
    </>
  );
});

CursorsPresence.displayName = 'CursorsPresence';
