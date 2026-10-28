import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../src/assets/images/creator_avatar_1793109200253.jpg');
const outputPath = path.join(__dirname, '../public/images/avatar.png');

async function run() {
  await sharp(inputPath)
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log('Successfully written high-res 256x256 avatar to public/images/avatar.png');
}

run();
