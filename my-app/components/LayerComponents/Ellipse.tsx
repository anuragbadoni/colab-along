import React from 'react';

import { colorToCss } from '@/lib/utils';
import { EllipseProps } from '@/types/canvas';

export default function Ellipse({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className='drop-shadow-md'
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? colorToCss(fill) : '#000'}
      stroke={selectionColor || 'transparent'}
      strokeWidth='1'
    />
  );
}
