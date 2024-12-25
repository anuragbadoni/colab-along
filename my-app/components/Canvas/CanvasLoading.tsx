import React from 'react';

import { Loader } from 'lucide-react';
import { InfoSkeleton } from '@/components/Canvas/Info';
import { ParticipantsSkeleton } from '@/components/Canvas/Participants';
import { ToolbarSkeleton } from './Toolbar';

export default function CanvasLoading() {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
}
