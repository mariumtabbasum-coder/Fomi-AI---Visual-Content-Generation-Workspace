import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/assets/aistudio/image_bf801dd5.png');

async function findCards() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function getPixel(x, y) {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  console.log('Image size:', width, height);

  // History strip Y bounds
  // Let's sample x=155 (around the first thumbnail)
  console.log('--- History sample at x=155 ---');
  for (let y = 55; y <= 110; y += 5) {
    const p = getPixel(155, y);
    console.log(`y=${y}: [${p.join(',')}]`);
  }

  // Row 1 Portrait 1 bounds
  // Around x=360
  console.log('--- Row 1 sample at x=360 ---');
  for (let y = 100; y <= 215; y += 5) {
    const p = getPixel(360, y);
    console.log(`y=${y}: [${p.join(',')}]`);
  }

  // Row 2 Portrait 5 bounds
  console.log('--- Row 2 sample at x=360 ---');
  for (let y = 210; y <= 365; y += 5) {
    const p = getPixel(360, y);
    console.log(`y=${y}: [${p.join(',')}]`);
  }
}

findCards();
