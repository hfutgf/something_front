'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { VerifiedIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { ContentType } from '../types/content.type';
import MediaCardSkeleton from './media-card-skeleton';

const MediaCard = ({
  content,
  isLoading,
}: {
  content: ContentType;
  isLoading: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [duration, setDuration] = useState(content.duration || 0);
  const [remainingTime, setRemainingTime] = useState(content.duration || 0);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkAutoplay = async () => {
      try {
        await video.play();
        setCanAutoplay(true);
      } catch {
        setCanAutoplay(false);
      } finally {
        video.pause();
        video.currentTime = 0;
      }
    };

    checkAutoplay();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (!content.duration && video.duration) {
        const fallback = Math.floor(video.duration);
        setDuration(fallback);
        setRemainingTime(fallback);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () =>
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [content.duration]);

  useEffect(() => {
    if (!isHovered) return;

    const updateRemainingTime = () => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        setRemainingTime(Math.max(0, duration - current));
      }
    };

    const interval = setInterval(updateRemainingTime, 200);
    return () => clearInterval(interval);
  }, [isHovered, duration]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setRemainingTime(duration);
      video.play().catch(console.error);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatViews = (views: number): string => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views.toString();
  };

  const formatVideoDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: enUS,
    }).replace(/^about /, '');
  };

  if (isLoading || !content) {
    return <MediaCardSkeleton />;
  }

  return (
    <div
      className="w-full max-w-[360px] cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl bg-gray-800">
        {!isHovered && (
          <img
            src={content.cover}
            alt={content.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered && canAutoplay ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="metadata"
          poster={content.cover}
        >
          <source src={content.videoUrl} type="video/mp4" />
        </video>

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {isHovered ? formatTime(remainingTime) : formatTime(duration)}
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <Avatar className="flex-shrink-0 w-9 h-9 bg-center rounded-full relative">
          <AvatarImage
            className="rounded-full w-9 h-9"
            src={content.channel.avatar}
            alt={content.channel.name}
          />
          <AvatarFallback className="bg-gray-700">
            {content.channel.name.charAt(0)}
          </AvatarFallback>
          {content.channel.verified && (
            <span className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 z-40">
              <VerifiedIcon className="w-3 h-3 text-white" />
            </span>
          )}
        </Avatar>
        <div>
          <h3 className="font-medium text-white line-clamp-2 group-hover:text-blue-400">
            {content.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{content.description}</p>
          <p className="text-gray-400 text-sm">
            {formatViews(content.views)} views •{' '}
            {formatVideoDate(content.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
