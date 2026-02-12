import { getImages } from 'icloud-shared-album';

export interface Photo {
  guid: string;
  thumbnail: string;
  medium: string;
  large: string;
  dateCreated: string;
  caption?: string;
  width: number;
  height: number;
}

interface ICloudDerivative {
  url?: string;
  width: number;
  height: number;
  fileSize: number;
  checksum: string;
}

interface ICloudImage {
  photoGuid: string;
  derivatives: Record<string, ICloudDerivative>;
  dateCreated: Date;
  caption?: string;
  width: number;
  height: number;
  mediaAssetType?: 'video';
}

interface ICloudResponse {
  metadata: {
    streamCtag: string;
  };
  photos: ICloudImage[];
}

export async function syncPhotos(): Promise<Photo[]> {
  const token = process.env.ICLOUD_ALBUM_TOKEN;
  if (!token) {
    throw new Error('ICLOUD_ALBUM_TOKEN not configured');
  }

  const response = (await getImages(token)) as ICloudResponse;

  // Filter out videos and map to Photo type
  const photos = response.photos
    .filter((photo) => photo.mediaAssetType !== 'video')
    .map((photo): Photo | null => {
      const derivatives = Object.values(photo.derivatives);

      if (derivatives.length === 0) return null;

      // Sort derivatives by width to find smallest, medium, and largest
      const sortedDerivatives = [...derivatives].sort(
        (a, b) => a.width - b.width,
      );

      // Find thumbnail (smallest), medium (~720px), and large (largest)
      const thumbnail = sortedDerivatives[0];
      const large = sortedDerivatives[sortedDerivatives.length - 1];

      // Find medium: closest to 720px width
      const medium =
        sortedDerivatives.find((d) => d.width >= 720) ||
        sortedDerivatives[Math.floor(sortedDerivatives.length / 2)];

      // Ensure all derivatives have URLs
      if (!thumbnail.url || !medium.url || !large.url) return null;

      return {
        guid: photo.photoGuid,
        thumbnail: thumbnail.url,
        medium: medium.url,
        large: large.url,
        dateCreated: photo.dateCreated.toISOString(),
        caption: photo.caption || undefined,
        width: photo.width,
        height: photo.height,
      };
    })
    .filter((photo): photo is Photo => photo !== null);

  return photos;
}
