'use client';

import { useState, useEffect } from 'react';

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

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      switch (e.key) {
        case 'Escape':
          setLightboxIndex(null);
          break;
        case 'ArrowLeft':
          setLightboxIndex((prev) =>
            prev === null || prev === 0 ? prev : prev - 1,
          );
          break;
        case 'ArrowRight':
          setLightboxIndex((prev) =>
            prev === null || prev === photos.length - 1 ? prev : prev + 1,
          );
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-center">
        <div className="space-y-4">
          <p className="text-2xl">📸</p>
          <p className="text-gray-600 dark:text-gray-400">
            No photos yet — add some to your shared album!
          </p>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setLightboxIndex((prev) => (prev === null || prev === 0 ? prev : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === null || prev === photos.length - 1 ? prev : prev + 1,
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <button
            key={photo.guid}
            onClick={() => setLightboxIndex(index)}
            className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <img
              src={photo.thumbnail}
              alt={photo.caption || `Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600"
            aria-label="Close lightbox"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600"
              aria-label="Previous photo"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {lightboxIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600"
              aria-label="Next photo"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <div
            className="max-w-7xl max-h-[90vh] transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].large}
              alt={photos[lightboxIndex].caption || `Photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            {photos[lightboxIndex].caption && (
              <p className="text-center text-white mt-4 px-4">
                {photos[lightboxIndex].caption}
              </p>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
