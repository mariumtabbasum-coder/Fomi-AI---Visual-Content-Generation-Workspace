/**
 * Mock Generation Service for FOMI Visual Content Generation Workspace
 * Pure frontend mock implementation - zero external AI API keys or network dependencies required.
 */
import { DEFAULT_GALLERY_IMAGES } from '../data/mockData.js';

/**
 * Simulates AI image generation with realistic latency, parameter variation, and metadata.
 * 
 * @param {Object} params
 * @param {string} params.prompt - Text description prompt
 * @param {number} params.imageCount - Number of variations to synthesize (1, 2, 4, 8)
 * @param {string} params.aspectRatio - Target ratio (e.g., '1:1', '3:4', '4:3', '9:16', '16:9')
 * @param {Object} params.model - Selected model object with id and name
 * @param {string[]} params.styles - Array of chosen visual styles
 * @param {string} [params.seed] - Optional seed value
 * @param {number} [params.cfgScale] - Guidance scale
 * @param {string} [params.negativePrompt] - Unwanted elements
 * @returns {Promise<{ success: boolean, images: Array, metadata: Object }>}
 */
export async function generateMockImages({
  prompt,
  imageCount = 8,
  aspectRatio = '3:4',
  model,
  styles = [],
  seed,
  cfgScale = 7.5,
  negativePrompt = ''
}) {
  // Validate prompt
  if (!prompt || !prompt.trim()) {
    throw new Error('A generation prompt is required before starting synthesis.');
  }

  // Simulate network & GPU inference delay (1100ms - 1500ms)
  const delay = Math.floor(1000 + Math.random() * 400);
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Determine base seed
  const parsedSeed = parseInt(seed, 10);
  const baseSeed = !isNaN(parsedSeed) && parsedSeed > 0
    ? parsedSeed
    : Math.floor(1000000 + Math.random() * 9000000);

  // Style label to weave into variations
  const styleTag = styles && styles.length > 0 ? styles.join(', ') : 'Studio Portrait';

  // Slice or wrap the pool of high-quality local portrait assets to match exact imageCount
  const count = Math.max(1, Math.min(8, imageCount));
  const generatedImages = [];

  for (let i = 0; i < count; i++) {
    const sourceImage = DEFAULT_GALLERY_IMAGES[i % DEFAULT_GALLERY_IMAGES.length];
    const imageSeed = baseSeed + i * 37;

    generatedImages.push({
      ...sourceImage,
      id: `gen-${Date.now()}-${i}`,
      seed: imageSeed,
      aspect: aspectRatio,
      styles: styles,
      modelName: model?.name || 'Fomi Portrait v2.1',
      cfgScale: cfgScale,
      variation: `Variation #${i + 1} (${styleTag})`,
      prompt: prompt.trim()
    });
  }

  return {
    success: true,
    images: generatedImages,
    metadata: {
      generatedAt: new Date().toISOString(),
      prompt: prompt.trim(),
      model: model?.name || 'Fomi Portrait v2.1',
      count: count,
      aspectRatio,
      styles,
      seed: baseSeed,
      cfgScale,
      negativePrompt
    }
  };
}
