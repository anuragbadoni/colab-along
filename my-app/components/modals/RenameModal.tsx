'use client';

import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEventHandler,
} from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useBoardStore } from '@/zustand/boardStore';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';

export default function RenameModal() {
  const { mutate, pending } = useApiMutation(api.board.update);

  const { modalOpen, setModalClose, initialValues } = useBoardStore();
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed');
        setModalClose();
      })
      .catch(() => {
        toast.error('Failed to rename board');
        setModalClose();
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={() => setModalClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form
          onSubmit={onSubmit}
          className='space-y-4'
        >
          <Input
            onChange={handleInputChange}
            disabled={pending}
            required
            maxLength={60}
            value={title}
            placeholder='Board title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              disabled={pending}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
