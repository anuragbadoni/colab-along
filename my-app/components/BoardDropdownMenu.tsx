'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CopyLinkButtonProps } from '@/types';

import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import ConfirmModal from './modals/ConfirmModal';
import { Button } from './ui/button';
import { useBoardStore } from '@/zustand/boardStore';

export default function BoardDropdownMenu({
  children,
  side,
  sideOffset,
  id,
  title,
}: CopyLinkButtonProps) {
  const { setModalOpen } = useBoardStore();
  const { mutate, pending } = useApiMutation(api.board.remove);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.success('Failed to copy link'));
  };

  const handleDeleteBoard = () => {
    mutate({ id })
      .then(() => toast.success('Board deleted'))
      .catch(() => toast.error('Failed to delete board'));
  };

  const handleOpenRenameModal = () => {
    setModalOpen(id, title);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60'
        side={side}
        sideOffset={sideOffset}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem
          onClick={handleCopyLink}
          className='p-3 cursor-pointer'
        >
          <Link2 className='h-4 w-4 mr-2' />
          Copry board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleOpenRenameModal}
          className='p-3 cursor-pointer'
        >
          <Pencil className='h-4 w-4 mr-2' />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header='Delete board?'
          description='This will delete the board and all of its contents.'
          disabled={pending}
          onConfirm={handleDeleteBoard}
        >
          <Button
            variant='ghost'
            className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
