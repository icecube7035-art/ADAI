
export enum AdType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export enum Platform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  X = 'X (Twitter)',
  LINKEDIN = 'LinkedIn'
}

export interface AdRequest {
  productName: string;
  description: string;
  audience: string;
  tone: string;
  cta: string;
  budget: string;
  platforms: Platform[];
  variations: number;
}

export interface GeneratedAd {
  id: string;
  type: AdType;
  platform: Platform;
  content: string; // Text content or Image/Video URL
  metadata?: {
    imageSize?: string;
    aspectRatio?: string;
    groundingUrls?: { title: string; uri: string }[];
  };
  createdAt: number;
}

export type ImageSize = '1K' | '2K' | '4K';
export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9' | '2:3' | '3:2' | '21:9';
