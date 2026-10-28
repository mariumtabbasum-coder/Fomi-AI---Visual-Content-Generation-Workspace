import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, '../public/assets/aistudio/image_bf801dd5.png');

async function detectBoxes() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function isBackground(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    // Main background is around [251, 250, 246] or white
    return (r > 245 && g > 240 && b > 235);
  }

  // Scan Row 1 along y=150 from x=300 to 760
  const row1Segments = [];
  let inCard = false;
  let startX = 0;
  for (let x = 320; x < 760; x++) {
    const bg = isBackground(x, 150);
    if (!bg && !inCard) {
      inCard = true;
      startX = x;
    } else if (bg && inCard) {
      inCard = false;
      row1Segments.push({ startX, endX: x - 1, width: x - startX });
    }
  }
  if (inCard) row1Segments.push({ startX, endX: 759, width: 760 - startX });

  console.log('Row 1 X segments at y=150:', row1Segments);

  // Scan Row 2 along y=280 from x=320 to 760
  const row2Segments = [];
  inCard = false;
  for (let x = 320; x < 760; x++) {
    const bg = isBackground(x, 280);
    if (!bg && !inCard) {
      inCard = true;
      startX = x;
    } else if (bg && inCard) {
      inCard = false;
      row2Segments.push({ startX, endX: x - 1, width: x - startX });
    }
  }
  if (inCard) row2Segments.push({ startX, endX: 759, width: 760 - startX });
  console.log('Row 2 X segments at y=280:', row2Segments);

  // Scan History bar thumbnails along y=80 from x=90 to 750
  const histSegments = [];
  inCard = false;
  for (let x = 90; x < 750; x++) {
    const bg = isBackground(x, 80);
    if (!bg && !inCard) {
      inCard = true;
      startX = x;
    } else if (bg && inCard) {
      inCard = false;
      histSegments.push({ startX, endX: x - 1, width: x - startX });
    }
  }
  if (inCard) histSegments.push({ startX, endX: 749, width: 750 - startX });
  console.log('History thumbnail segments count:', histSegments.length, histSegments);
}

detectBoxes();
