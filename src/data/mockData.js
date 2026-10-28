export const INITIAL_PROMPT =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting";

export const DEFAULT_GALLERY_IMAGES = [
  {
    id: 'p1',
    src: '/images/portrait_1.png',
    alt: 'Smiling redheaded woman with auburn hair in cream cashmere sweater, angle view',
    aspect: '3/4',
    seed: 4892011,
    variation: 'Angle 1 - Approachable tilt with vibrant smile'
  },
  {
    id: 'p2',
    src: '/images/portrait_2.png',
    alt: 'Smiling redheaded woman in cream sweater, facing camera',
    aspect: '3/4',
    seed: 4892012,
    variation: 'Angle 2 - Direct frontal portrait with gentle gaze'
  },
  {
    id: 'p3',
    src: '/images/portrait_3.png',
    alt: 'Auburn-haired woman turned three-quarters, soft studio lighting',
    aspect: '3/4',
    seed: 4892013,
    variation: 'Angle 3 - Over-the-shoulder glance with delicate gold earring'
  },
  {
    id: 'p4',
    src: '/images/portrait_4.png',
    alt: 'Warm portrait of redheaded woman with gold hoop earrings and wide smile',
    aspect: '3/4',
    seed: 4892014,
    variation: 'Angle 4 - Warm smile with subtle backlight accent'
  },
  {
    id: 'p5',
    src: '/images/portrait_5.png',
    alt: 'Radiant 31-year-old redheaded woman in cashmere knitwear, bright smile',
    aspect: '3/4',
    seed: 4892015,
    variation: 'Angle 5 - Candid laughing expression with soft rim lighting'
  },
  {
    id: 'p6',
    src: '/images/portrait_6.png',
    alt: 'Studio portrait of auburn-haired woman in neutral beige knitwear',
    aspect: '3/4',
    seed: 4892016,
    variation: 'Angle 6 - Professional headshot with natural texture'
  },
  {
    id: 'p7',
    src: '/images/portrait_7.png',
    alt: 'Gentle portrait of woman with auburn bob hairstyle in cream knit top',
    aspect: '3/4',
    seed: 4892017,
    variation: 'Angle 7 - Soft contemplative pose with shallow depth of field'
  },
  {
    id: 'p8',
    src: '/images/portrait_8.png',
    alt: 'Close-up studio portrait of smiling woman with brown eyes and auburn hair',
    aspect: '3/4',
    seed: 4892018,
    variation: 'Angle 8 - Radiant smile with delicate gold hoop'
  }
];

export const HISTORY_ITEMS = [
  {
    id: 'hist-1',
    title: 'Vintage Library Portrait',
    prompt:
      'Cinematic 35mm photograph of a woman reading beside an antique brass lamp in an oak library, warm amber glow, film grain, dust motes',
    thumb: '/images/thumb_1.png',
    time: '2m ago',
    model: 'Fomi-Portrait-v2.1'
  },
  {
    id: 'hist-2',
    title: 'Alpine Peak Sunrise',
    prompt:
      'Ultra high-resolution landscape of jagged alpine mountain peaks at dawn with morning mist, dramatic pink and orange sky reflections',
    thumb: '/images/thumb_2.png',
    time: '14m ago',
    model: 'Fomi-Landscape-XL'
  },
  {
    id: 'hist-3',
    title: 'Enchanted Lantern Forest',
    prompt:
      'Moody atmospheric dark fantasy forest with mossy roots, bioluminescent mushrooms, and floating golden lanterns in fog',
    thumb: '/images/thumb_3.png',
    time: '1h ago',
    model: 'Fomi-Fantasy-v1'
  },
  {
    id: 'hist-4',
    title: 'Editorial Mirror Portrait',
    prompt:
      'High-fashion editorial photography of model with sleek platinum blonde bob looking into an ornate antique hand mirror in mint velvet coat',
    thumb: '/images/thumb_4.png',
    time: '3h ago',
    model: 'Fomi-Portrait-v2.1'
  },
  {
    id: 'hist-5',
    title: 'Bioluminescent Crystal Figure',
    prompt:
      'Surreal digital art of a glowing crystalline anatomical figure adorned with prismatic cosmic dust and neon floral blossoms',
    thumb: '/images/thumb_5.png',
    time: '5h ago',
    model: 'Fomi-Vision-Pro'
  },
  {
    id: 'hist-6',
    title: 'Prismatic Rain Beauty',
    prompt:
      'Close-up high-key beauty portrait behind wet rain-streaked glass, iridescent reflections, pastel holographic sheen, natural skin texture',
    thumb: '/images/thumb_6.png',
    time: '6h ago',
    model: 'Fomi-Portrait-v2.1'
  },
  {
    id: 'hist-7',
    title: 'Organic Spa Ritual',
    prompt:
      'Minimalist beauty still life and model in serene Japanese bathhouse with botanical skincare lotion, purple orchid, and bamboo shadows',
    thumb: '/images/thumb_7.png',
    time: '8h ago',
    model: 'Fomi-Studio-v3'
  },
  {
    id: 'hist-8',
    title: 'Floral Couture Sculpture',
    prompt:
      'Avant-garde sculpture of a porcelain woman adorned in cascading white cherry blossom petals and delicate ceramic branches',
    thumb: '/images/thumb_8.png',
    time: '12h ago',
    model: 'Fomi-Vision-Pro'
  },
  {
    id: 'hist-9',
    title: 'Cotton Candy Paris Dawn',
    prompt:
      'Dreamy whimsical photo of the Eiffel Tower framed by puffy pink heart clouds, pastel sunrise gradient, Parisian romance',
    thumb: '/images/thumb_9.png',
    time: '1d ago',
    model: 'Fomi-Landscape-XL'
  },
  {
    id: 'hist-10',
    title: 'Architectural Window Light',
    prompt:
      'Moody dramatic silhouette of a contemplative thinker seated in an abandoned loft with geometric sunlight beam casting long shadows',
    thumb: '/images/thumb_10.png',
    time: '1d ago',
    model: 'Fomi-Studio-v3'
  },
  {
    id: 'hist-11',
    title: 'Golden Hour Roadtrip',
    prompt:
      'Nostalgic 1970s roadtrip moment with woman leaning on vintage convertible during desert golden hour sunset, warm flare',
    thumb: '/images/thumb_11.png',
    time: '2d ago',
    model: 'Fomi-Portrait-v2.1'
  },
  {
    id: 'hist-12',
    title: 'Hello World Cat',
    prompt:
      'Humorous fluffy orange tabby cat holding a handwritten cardboard sign reading "Hello World" with wide curious eyes',
    thumb: '/images/thumb_12.png',
    time: '2d ago',
    model: 'Fomi-Creative-v1'
  },
  {
    id: 'hist-13',
    title: 'Tokyo Neon Convenience Store',
    prompt:
      'Cinematic Wong Kar-wai aesthetic shot of a young woman standing outside a glowing green neon convenience store on a rainy night',
    thumb: '/images/thumb_13.png',
    time: '3d ago',
    model: 'Fomi-Cinema-XL'
  },
  {
    id: 'hist-14',
    title: 'Ethereal Lake Mist',
    prompt:
      'Fine-art long exposure of a solitary figure wading in mirror-still lake water shrouded in morning fog, minimalist monochrome serenity',
    thumb: '/images/thumb_14.png',
    time: '4d ago',
    model: 'Fomi-FineArt-v2'
  }
];

export const AVAILABLE_MODELS = [
  { id: 'fomi-portrait-v2', name: 'Fomi Portrait v2.1', description: 'Optimized for photorealistic human portraits, skin textures & lighting' },
  { id: 'fomi-flux-ultra', name: 'Flux 1.1 Pro Ultra', description: 'Highest fidelity general-purpose image synthesis' },
  { id: 'fomi-studio-v3', name: 'Fomi Studio Pro', description: 'Commercial fashion, product & studio lighting generation' },
  { id: 'fomi-cinema-xl', name: 'Fomi Cinema XL', description: 'Cinematic widescreen stills with 35mm anamorphic qualities' }
];

export const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1', desc: 'Square (1024×1024)' },
  { id: '3:4', label: '3:4', desc: 'Portrait (896×1152)' },
  { id: '4:3', label: '4:3', desc: 'Landscape (1152×896)' },
  { id: '9:16', label: '9:16', desc: 'Story / Reel (720×1280)' },
  { id: '16:9', label: '16:9', desc: 'Widescreen (1280×720)' }
];

export const IMAGE_COUNT_OPTIONS = [1, 2, 4, 8];

export const STYLES_LIST = [
  'Photographic',
  'Cinematic',
  'Analog 35mm',
  'Studio Portrait',
  'Editorial',
  'Natural Light',
  'Oil Painting',
  'Cyberpunk'
];
