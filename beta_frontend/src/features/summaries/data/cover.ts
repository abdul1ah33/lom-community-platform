/**
 * Turns an uploaded picture into a cover the 3D book can wear: cropped from the centre
 * to the book's 2:3 shape, scaled down to at most 800 × 1200 and re-encoded, plus a
 * dark board colour sampled from the art for the spine and edges.
 */
const WIDTH = 800;
const MAX_BYTES = 25 * 1024 * 1024;

export interface PreparedCover {
  dataUrl: string;
  color: string;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That picture couldn't be opened. Try a JPG, PNG or WebP."));
    };
    image.src = url;
  });
}

export async function prepareCover(file: File): Promise<PreparedCover> {
  if (!file.type.startsWith("image/")) throw new Error("Choose a picture file (JPG, PNG or WebP).");
  if (file.size > MAX_BYTES) throw new Error("That picture is over 25 MB. Choose a smaller one.");

  const image = await loadImage(file);
  let sw = image.naturalWidth;
  let sh = image.naturalHeight;
  if (sw / sh > 2 / 3) sw = (sh * 2) / 3;
  else sh = (sw * 3) / 2;

  const width = Math.min(WIDTH, Math.round(sw));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.round(width * 1.5);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser can't process pictures.");
  context.drawImage(image, (image.naturalWidth - sw) / 2, (image.naturalHeight - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);

  let dataUrl = canvas.toDataURL("image/webp", 0.86);
  // Browsers without a WebP encoder hand back PNG, which is far larger; JPEG is the better fallback.
  if (!dataUrl.startsWith("data:image/webp")) dataUrl = canvas.toDataURL("image/jpeg", 0.88);

  return { dataUrl, color: boardColor(canvas) };
}

/** The art's average hue, deepened to a board-dark shade (Volume 2's is #14231f). */
function boardColor(source: HTMLCanvasElement) {
  const sample = document.createElement("canvas");
  sample.width = 20;
  sample.height = 30;
  const context = sample.getContext("2d")!;
  context.drawImage(source, 0, 0, sample.width, sample.height);
  const { data } = context.getImageData(0, 0, sample.width, sample.height);

  let r = 0;
  let g = 0;
  let b = 0;
  let weight = 0;
  for (let i = 0; i < data.length; i += 4) {
    // Colourful pixels count more than greys, so the board picks up the art's tint.
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const w = 1 + ((max - min) / 255) * 4;
    r += data[i] * w;
    g += data[i + 1] * w;
    b += data[i + 2] * w;
    weight += w;
  }
  const [h, s] = toHsl(r / weight, g / weight, b / weight);
  return fromHsl(h, Math.min(s, 0.45), 0.11);
}

function toHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}

function fromHsl(h: number, s: number, l: number) {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return `#${[0, 8, 4].map((n) => Math.round(channel(n) * 255).toString(16).padStart(2, "0")).join("")}`;
}
