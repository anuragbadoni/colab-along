import React, { useState } from 'react';

import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils';
import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { useMutation } from '@liveblocks/react/suspense';
import { NoteProps } from '@/types/canvas';

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 600,
    scaleFactor = 0.2;

  const fontSizeBasedOnHeight = height * scaleFactor,
    fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

export default function Note({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) {
  const { x, y, width, height, fill, value } = layer;
  const [text, setText] = useState('Text');

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers');

    liveLayers.get(id)?.set('value', newValue);
  }, []);

  const handleTextChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : '#000',
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable
        html={value?.length ? value : text}
        onChange={handleTextChange}
        onFocus={() => setText('')}
        onBlur={() => setText('Text')}
        className={cn(
          'h-full w-full flex items-center justify-center text-center outline-none',
          font.className
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
}
