import React from 'react';

import { ColorButtonProps, ColorPickerProps } from '@/types/canvas';

import { COLORS_FOR_COLOR_PICKER, colorToCss } from '@/lib/utils';

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className='w-8 h-8 flex items-center justify-center hover:opacity-75 transition'
      onClick={() => onClick(color)}
    >
      <div
        style={{ background: colorToCss(color) }}
        className='h-8 w-8 rounded-md border border-neutral-300'
      />
    </button>
  );
};

export default function ColorPicker({ onChange }: ColorPickerProps) {
  return (
    <div className='flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200'>
      {COLORS_FOR_COLOR_PICKER.map((color, i) => (
        <ColorButton
          key={i}
          onClick={onChange}
          color={color}
        />
      ))}
    </div>
  );
}
