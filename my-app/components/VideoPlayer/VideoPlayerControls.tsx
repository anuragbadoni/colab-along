'use client';

import React from 'react';

import { VideoPlayerControlsProps } from '@/types';
import { Pause, Play } from 'lucide-react';

export default function VideoPlayerControls({
  progress,
  isPaused,
  onTogglePause,
  width,
  size,
}: VideoPlayerControlsProps) {
  const center = size / 2;
  const radius = center - width;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * (1 - progress);

  return (
    <div
      onClick={onTogglePause}
      className='group relative flex justify-center items-center cursor-pointer'
    >
      {isPaused ? (
        <Pause
          className='h-5 w-5 absolute group-hover:stroke-white'
          stroke='#aaaa'
        />
      ) : (
        <Play
          className='h-5 w-5 absolute group-hover:stroke-white'
          stroke='#aaaa'
        />
      )}
      <svg
        width={size}
        height={size}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          stroke='#aaaa'
          strokeWidth={width}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          stroke='#fff'
          strokeWidth={width}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
}
