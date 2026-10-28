const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const inputPath = path.join(__dirname, '../public/assets/aistudio/image_bf801dd5.png');

async function processImage() {
  const meta = await sharp(inputPath).metadata();
  console.log('Image dimensions:', meta.width, meta.height);

  // In 792 x 396:
  // Let's examine coordinates of the 8 portraits:
  // Top row portraits:
  // Row 1: y around 107 to 201 (height ~94)
  // Row 2: y around 212 to 354 (height ~142? wait let's check heights)
  // Let's sample pixel rows and columns or dump slices to find exact coordinates
}

processImage();
