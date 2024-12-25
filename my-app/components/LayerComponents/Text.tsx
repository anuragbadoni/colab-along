import React, { useState } from 'react';

import { cn, colorToCss } from '@/lib/utils';
import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { useMutation } from '@liveblocks/react/suspense';
import { TextProps } from '@/types/canvas';

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 600,
    scaleFactor = 0.5;

  const fontSizeBasedOnHeight = height * scaleFactor,
    fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

export default function Text({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) {
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
      }}
    >
      <ContentEditable
        html={value?.length ? value : text}
        onChange={handleTextChange}
        onFocus={() => setText('')}
        onBlur={() => setText('Text')}
        className={cn(
          'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
}
