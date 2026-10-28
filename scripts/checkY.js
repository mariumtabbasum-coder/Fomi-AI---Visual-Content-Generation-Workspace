import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, '../public/assets/aistudio/image_bf801dd5.png');

async function checkY() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function isBackground(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    return (r > 245 && g > 240 && b > 235);
  }

  // Find Y range for Row 1 Col 1 (x=380)
  let r1_top = 0, r1_bottom = 0;
  for (let y = 80; y < 210; y++) {
    if (!isBackground(380, y)) {
      if (!r1_top) r1_top = y;
      r1_bottom = y;
    }
  }

  // Find Y range for Row 2 Col 1 (x=380)
  let r2_top = 0, r2_bottom = 0;
  for (let y = 205; y < 380; y++) {
    if (!isBackground(380, y)) {
      if (!r2_top) r2_top = y;
      r2_bottom = y;
    }
  }

  // Check prompt card box: to the left of Col 1, x between 190 and 326
  console.log('Row 1 y:', r1_top, 'to', r1_bottom, 'height =', r1_bottom - r1_top);
  console.log('Row 2 y:', r2_top, 'to', r2_bottom, 'height =', r2_bottom - r2_top);

  // History strip Y at x=120
  let h_top = 0, h_bottom = 0;
  for (let y = 40; y < 120; y++) {
    if (!isBackground(120, y)) {
      if (!h_top) h_top = y;
      h_bottom = y;
    }
  }
  console.log('History y:', h_top, 'to', h_bottom, 'height =', h_bottom - h_top);

  // Left panel bounds
  let lp_left = 0, lp_right = 0, lp_top = 0, lp_bottom = 0;
  for (let x = 30; x < 200; x++) {
    for (let y = 100; y < 380; y++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // Left panel has peach background around [250, 237, 230] or similar
      if (r > 240 && g < 242 && b < 235) {
        if (!lp_left || x < lp_left) lp_left = x;
        if (x > lp_right) lp_right = x;
        if (!lp_top || y < lp_top) lp_top = y;
        if (y > lp_bottom) lp_bottom = y;
      }
    }
  }
  console.log('Left panel approx:', { lp_left, lp_right, lp_top, lp_bottom });
}

checkY();
