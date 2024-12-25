'use client';

import React from 'react';

import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from 'lucide-react';
import Hint from '../Hint';
import { Button } from '../ui/button';

import { ToolbarButtonProps, ToolbarProps } from '@/types';
import { CanvasMode, LayerType } from '@/types/canvas';

const ToolbarButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolbarButtonProps) => {
  return (
    <Hint
      label={label}
      side='right'
      sideOffset={14}
    >
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size='icon'
        variant={isActive ? 'boardActive' : 'board'}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default function Toolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) {
  const handleSetCanvasMode = (newCanvasMode: any, newLayerType?: any) => {
    setCanvasState({ mode: newCanvasMode, layerType: newLayerType });
  };

  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <ToolbarButton
          label='Select'
          icon={MousePointer2}
          onClick={() => {
            handleSetCanvasMode(CanvasMode.None);
          }}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolbarButton
          label='Text'
          icon={Type}
          onClick={() => {
            handleSetCanvasMode(CanvasMode.Inserting, LayerType.Text);
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolbarButton
          label='Sticky note'
          icon={StickyNote}
          onClick={() => {
            handleSetCanvasMode(CanvasMode.Inserting, LayerType.Note);
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolbarButton
          label='Rectangle'
          icon={Square}
          onClick={() => {
            handleSetCanvasMode(CanvasMode.Inserting, LayerType.Rectangle);
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
        />
        <ToolbarButton
          label='Ellipse'
          icon={Circle}
          onClick={() => {
            handleSetCanvasMode(CanvasMode.Inserting, LayerType.Ellipse);
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
        />
        <ToolbarButton
          label='Pen'
          icon={Pencil}
          onClick={() => {
            handleSetCanvasMode(CanvasMode.Pencil);
          }}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <ToolbarButton
          label='Undo (Ctrl + z)'
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolbarButton
          label='Redo (Ctrl + x)'
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md' />
  );
}
