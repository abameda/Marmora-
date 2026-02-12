import ICloudSharedAlbum from 'icloud-shared-album';

export async function getAlbumPhotos() {
  const token = process.env.ICLOUD_ALBUM_TOKEN;
  if (!token) {
    throw new Error('ICLOUD_ALBUM_TOKEN not configured');
  }
  
  const album = new ICloudSharedAlbum(token);
  return album.getPhotos();
}
