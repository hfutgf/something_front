import { ChannelType } from './channel.type';

export type ContentType = {
  id: string;
  title: string;
  description: string;
  cover: string;
  views: number;
  duration: number;
  videoUrl: string;
  createdAt: string;
  isStream?: boolean;
  channel: ChannelType;
};
