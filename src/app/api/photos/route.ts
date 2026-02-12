import { NextRequest, NextResponse } from 'next/server';
import { getCachedPhotos } from '@/lib/redis';
import { syncPhotos } from '@/lib/icloud';
import { cachePhotos } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    let photos = await getCachedPhotos();

    if (!photos || photos.length === 0) {
      try {
        photos = await syncPhotos();
        await cachePhotos(photos);
      } catch (syncError) {
        console.error('Inline sync failed:', syncError);
        return NextResponse.json({
          photos: [],
          empty: true,
        });
      }
    }

    return NextResponse.json({
      photos: photos || [],
      empty: !photos || photos.length === 0,
    });
  } catch (error) {
    console.error('Failed to fetch photos:', error);
    return NextResponse.json({
      photos: [],
      empty: true,
    });
  }
}
