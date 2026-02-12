'use client';

import { useState, useEffect } from 'react';
import PhotoGrid from '@/components/PhotoGrid';

interface Photo {
  guid: string;
  thumbnail: string;
  medium: string;
  large: string;
  dateCreated: string;
  caption?: string;
  width: number;
  height: number;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Our Gallery
        </h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse space-y-4 text-center">
              <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading photos...
              </p>
            </div>
          </div>
        ) : (
          <PhotoGrid photos={photos} />
        )}
      </div>
    </div>
  );
}
