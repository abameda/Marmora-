import ICloudSharedAlbum from 'icloud-shared-album';

export async function getAlbumPhotos() {
  const token = process.env.ICLOUD_ALBUM_TOKEN;
  if (!token) {
    throw new Error('ICLOUD_ALBUM_TOKEN not configured');
  }
  
  // @ts-expect-error - icloud-shared-album lacks TypeScript types
  const album = new ICloudSharedAlbum(token);
  return album.getPhotos();
}
