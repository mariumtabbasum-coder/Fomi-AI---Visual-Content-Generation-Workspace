import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, '../public/assets/aistudio/image_bf801dd5.png');

async function testRow1Columns() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;
  function getPixel(x, y) {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  [380, 480, 590, 700].forEach(x => {
    let top = 0, bot = 0;
    for (let y = 100; y < 210; y++) {
      const p = getPixel(x, y);
      const isBg = p[0] > 248 && p[1] > 240 && p[2] > 235;
      if (!isBg) {
        if (!top) top = y;
        bot = y;
      }
    }
    console.log(`Col at x=${x}: top=${top}, bot=${bot}, height=${bot - top}`);
  });
}
testRow1Columns();
