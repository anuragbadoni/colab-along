import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';

import { BoardCardFooterProps, BoardCardProps } from '@/types';

import { Button } from './ui/button';
import { MoreHorizontal, Star } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import BoardDropdownMenu from './BoardDropdownMenu';
import { toast } from 'sonner';
import { useStorage } from '@liveblocks/react/suspense';
import { LayerPreview } from './Canvas/LayerPreview';

const BoardCardFooter = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: BoardCardFooterProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <div className='relative bg-white p-3'>
      <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>
      <p className='opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'>
        {authorLabel}, {createdAtLabel}
      </p>
      <Button
        disabled={disabled}
        onClick={handleClick}
        variant='ghost'
        className={cn(
          'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-yellow-600',
          disabled && 'cursor-not-allowed opcity-75'
        )}
      >
        <Star
          className={cn(
            'h-4 w-4',
            isFavorite && 'fill-yellow-600 text-yellow-600'
          )}
        />
      </Button>
    </div>
  );
};

export default function BoardCard({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) {
  const userId = useAuth();
  const { mutate: setFavorite, pending: pendingFavorite } = useApiMutation(
      api.board.favorite
    ),
    { mutate: setUnfavorite, pending: pendingUnfavorite } = useApiMutation(
      api.board.unfavorite
    );
  const layerIds = useStorage((root) => root.layerIds);

  const authorLabel = userId.userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const handleToggleFavorite = () => {
    if (isFavorite) {
      setUnfavorite({ id })
        .then(() => toast.success('Removed board from favorites'))
        .catch(() => toast.error('Failed to remove board from favorites'));
    } else {
      setFavorite({ id, orgId })
        .then(() => toast.success('Added board to favorites'))
        .catch(() => toast.error('Failed to add board to favorites'));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          {layerIds?.length ? (
            <svg className='absolute w-full h-full object-cover transition-opacity group-hover:opacity-50 group-hover:bg-black'>
              <g
                style={{
                  scale: 0.5,
                  transform: 'translate(0px, 0px)',
                }}
              >
                {layerIds.map((layerId) => (
                  <LayerPreview
                    key={layerId}
                    id={layerId}
                    onLayerPointerDown={() => {}}
                  />
                ))}
              </g>
            </svg>
          ) : (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className='object-fit'
            />
          )}
          <div className='opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black' />
          <BoardDropdownMenu
            id={id}
            side='right'
            title={title}
          >
            <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </BoardDropdownMenu>
        </div>
        <BoardCardFooter
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={handleToggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full animate-pulse duration-700' />
    </div>
  );
};
