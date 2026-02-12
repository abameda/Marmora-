import { NextRequest, NextResponse } from 'next/server';
import { syncPhotos } from '@/lib/icloud';
import { cachePhotos } from '@/lib/redis';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  if (!authHeader || authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const photos = await syncPhotos();
    await cachePhotos(photos);

    return NextResponse.json({
      synced: photos.length,
      cached: true,
    });
  } catch (error) {
    console.error('Failed to sync photos:', error);

    return NextResponse.json(
      {
        error: 'Sync failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        cached: false,
      },
      { status: 500 },
    );
  }
}
