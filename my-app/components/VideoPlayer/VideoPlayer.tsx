'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VideoPlayerProps } from '@/types';

import VideoPlayerControls from './VideoPlayerControls';

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const [isPaused, setIsPaused] = useState(false),
    [videoDuration, setVideoDuration] = useState<number>(),
    [videoProgress, setVideoProgress] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (video) {
      setVideoDuration(video.duration);
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const currentTime = videoRef.current?.currentTime;

    if (videoDuration != null && currentTime != null) {
      let loadTimeout = setTimeout(() => {
        videoProgress == currentTime / videoDuration
          ? setVideoProgress((prev) => prev + 0.000001)
          : setVideoProgress(currentTime / videoDuration);
      }, 10);

      return () => {
        clearTimeout(loadTimeout);
      };
    }
  }, [videoDuration, isPaused, videoProgress]);

  const handleTogglePause = () => {
    const video = videoRef.current;

    if (video) {
      setIsPaused(!isPaused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <div className='relative'>
      <div className='absolute top-4 right-4 z-10 text-white'>
        <VideoPlayerControls
          progress={videoProgress}
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          width={4}
          size={48}
        />
      </div>
      <video
        width='100%'
        height='100%'
        autoPlay
        loop
        muted
        playsInline
        className='rounded-md'
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source
          src={src}
          type='video/mp4'
        />
      </video>
    </div>
  );
}
