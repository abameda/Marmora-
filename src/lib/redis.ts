import { Redis } from '@upstash/redis';
import { Photo } from './icloud';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const PHOTOS_KEY = 'photos:data';
const CTAG_KEY = 'photos:ctag';

export async function cachePhotos(photos: Photo[]): Promise<void> {
  await redis.set(PHOTOS_KEY, JSON.stringify(photos));
}

export async function getCachedPhotos(): Promise<Photo[] | null> {
  const data = await redis.get<string>(PHOTOS_KEY);
  if (!data) return null;
  return JSON.parse(data);
}

export async function setPhotosCacheTag(ctag: string): Promise<void> {
  await redis.set(CTAG_KEY, ctag);
}

export async function getPhotosCacheTag(): Promise<string | null> {
  return redis.get<string>(CTAG_KEY);
}
