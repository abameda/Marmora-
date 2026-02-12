import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

interface BucketListItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const itemStr = await redis.hget<string>('bucket-list:items', id);
    
    if (!itemStr) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    const item = JSON.parse(itemStr) as BucketListItem;
    const updated: BucketListItem = {
      ...item,
      completed: !item.completed,
    };
    
    await redis.hset('bucket-list:items', { [id]: JSON.stringify(updated) });
    
    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error('Failed to update bucket list item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await redis.pipeline()
      .hdel('bucket-list:items', id)
      .zrem('bucket-list:order', id)
      .exec();
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete bucket list item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
}
