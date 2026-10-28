import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, '../public/assets/aistudio/image_bf801dd5.png');
const outDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function extract() {
  const img = sharp(inputPath);

  // Logo: top-left around x: 42, y: 26, width: 22, height: 26
  await sharp(inputPath)
    .extract({ left: 42, top: 26, width: 20, height: 26 })
    .png()
    .toFile(path.join(outDir, 'logo.png'));

  // Avatar: top-right around x: 733, y: 30, width: 18, height: 18
  await sharp(inputPath)
    .extract({ left: 732, top: 29, width: 20, height: 20 })
    .png()
    .toFile(path.join(outDir, 'avatar.png'));

  // History thumbnails (14 of them)
  const historyBoxes = [
    { left: 104, top: 63, width: 38, height: 38 },
    { left: 150, top: 63, width: 38, height: 38 },
    { left: 196, top: 63, width: 38, height: 38 },
    { left: 242, top: 63, width: 38, height: 38 },
    { left: 288, top: 63, width: 38, height: 38 },
    { left: 334, top: 63, width: 38, height: 38 },
    { left: 380, top: 63, width: 38, height: 38 },
    { left: 426, top: 63, width: 38, height: 38 },
    { left: 472, top: 63, width: 38, height: 38 },
    { left: 518, top: 63, width: 38, height: 38 },
    { left: 564, top: 63, width: 38, height: 38 },
    { left: 610, top: 63, width: 38, height: 38 },
    { left: 656, top: 63, width: 38, height: 38 },
    { left: 702, top: 63, width: 38, height: 38 }
  ];

  for (let i = 0; i < historyBoxes.length; i++) {
    const box = historyBoxes[i];
    await sharp(inputPath)
      .extract(box)
      .resize(160, 160, { kernel: 'lanczos3' })
      .png()
      .toFile(path.join(outDir, `thumb_${i + 1}.png`));
  }

  // Row 1 portraits (4 cards)
  const cols = [
    { left: 331, width: 100 },
    { left: 437, width: 100 },
    { left: 545, width: 99 },
    { left: 651, width: 100 }
  ];

  // Row 1: top: 107, height: 93
  for (let c = 0; c < 4; c++) {
    await sharp(inputPath)
      .extract({ left: cols[c].left, top: 106, width: cols[c].width, height: 94 })
      .resize(400, 376, { kernel: 'lanczos3' })
      .png()
      .toFile(path.join(outDir, `portrait_${c + 1}.png`));
  }

  // Row 2: top: 212, height: 142
  for (let c = 0; c < 4; c++) {
    await sharp(inputPath)
      .extract({ left: cols[c].left, top: 213, width: cols[c].width, height: 142 })
      .resize(400, 568, { kernel: 'lanczos3' })
      .png()
      .toFile(path.join(outDir, `portrait_${c + 5}.png`));
  }

  console.log('All assets extracted successfully!');
}

extract();
