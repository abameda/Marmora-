import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

interface BucketListItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export async function GET() {
  try {
    const itemsHash = await redis.hgetall<Record<string, string>>('bucket-list:items');
    const orderedIds = await redis.zrange<string[]>('bucket-list:order', 0, -1);
    
    if (!itemsHash || !orderedIds || orderedIds.length === 0) {
      return NextResponse.json({ items: [] });
    }
    
    const items: BucketListItem[] = orderedIds
      .map(id => {
        const itemStr = itemsHash[id];
        if (!itemStr) return null;
        try {
          return JSON.parse(itemStr) as BucketListItem;
        } catch {
          return null;
        }
      })
      .filter((item): item is BucketListItem => item !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Failed to fetch bucket list items:', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be non-empty' },
        { status: 400 }
      );
    }
    
    const id = crypto.randomUUID();
    
    const item: BucketListItem = {
      id,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    await redis.pipeline()
      .hset('bucket-list:items', { [id]: JSON.stringify(item) })
      .zadd('bucket-list:order', { score: Date.now(), member: id })
      .exec();
    
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Failed to create bucket list item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
