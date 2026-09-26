/**
 * Downscales an image so its longest side is at most `maxSize` px, re-encoding as JPEG.
 * GIFs are returned untouched so animation survives. Saves upload bandwidth and
 * keeps avatars a predictable size before they reach the server.
 */
export async function resizeImage(file: File, maxSize = 512, quality = 0.9): Promise<Blob> {
  if (file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ?? file), "image/jpeg", quality);
  });
}
