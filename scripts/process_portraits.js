import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genDir = path.join(__dirname, '../src/assets/images');
const outDir = path.join(__dirname, '../public/images');

const files = fs.readdirSync(genDir);
console.log('Generated files:', files);

// Map portrait_var_1 to 8 in sorted order
const varFiles = [];
for (let i = 1; i <= 8; i++) {
  const match = files.find(f => f.startsWith(`portrait_var_${i}_`));
  if (match) {
    varFiles.push({ index: i, file: path.join(genDir, match) });
  }
}

async function processAll() {
  for (const item of varFiles) {
    const targetPng = path.join(outDir, `portrait_${item.index}.png`);
    const targetJpg = path.join(outDir, `portrait_${item.index}.jpg`);
    console.log(`Processing portrait ${item.index}: ${item.file} -> ${targetPng}`);

    // Crop or resize to 3:4 portrait ratio (800 x 1067)
    await sharp(item.file)
      .resize(800, 1067, { fit: 'cover', position: 'top' })
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(targetPng);

    await sharp(item.file)
      .resize(800, 1067, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 92 })
      .toFile(targetJpg);
  }
  console.log('All 8 high-res portraits processed successfully!');
}

processAll();
