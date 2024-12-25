'use client';
import React, { useEffect } from 'react';

import { BoardPageProps } from '@/types';

import Canvas from '@/components/Canvas/Canvas';
import Room from '@/components/Room';
import CanvasLoading from '@/components/Canvas/CanvasLoading';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export default function Board({ params }: BoardPageProps) {
  const data = useQuery(api.board.get, {
    id: params.boardId as Id<'boards'>,
  });

  useEffect(() => {
    if (data) {
      document.title = data.title;
    }
  }, [data]);

  return (
    <Room
      roomId={params.boardId}
      fallback={<CanvasLoading />}
    >
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
