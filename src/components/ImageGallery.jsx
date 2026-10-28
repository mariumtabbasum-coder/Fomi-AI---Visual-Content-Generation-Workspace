import React from 'react';
import { ZoomIn, Download, Copy, Check, Sparkles, Loader2 } from 'lucide-react';

export default function ImageGallery({
  images,
  selectedImageId,
  onSelectImage,
  onOpenPreview,
  isGenerating
}) {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopyPrompt = (e, img) => {
    e.stopPropagation();
    navigator.clipboard?.writeText?.(img.variation || 'Fomi AI Portrait generation');
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDownload = (e, img) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = img.src;
    link.download = `fomi-portrait-${img.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Determine grid columns dynamically based on imageCount while preserving desktop 4-column standard
  const getGridClasses = () => {
    if (images.length === 1) return 'grid-cols-1 max-w-sm mx-auto';
    if (images.length === 2) return 'grid-cols-2 max-w-xl mx-auto';
    return 'grid-cols-2 sm:grid-cols-4';
  };

  return (
    <div
      id="fomi-gallery"
      className="flex-1 min-w-0 w-full relative"
      role="region"
      aria-label="Generated portrait variations gallery"
    >
      {/* Loading Overlay feedback during mock generation */}
      {isGenerating && (
        <div className="absolute inset-0 z-20 bg-white/60 dark:bg-black/60 backdrop-blur-2xs rounded-[24px] flex flex-col items-center justify-center gap-2.5 animate-in fade-in duration-200">
          <div className="w-10 h-10 rounded-full bg-[#DF856F]/15 dark:bg-[#DF856F]/25 flex items-center justify-center text-[#C46750] shadow-sm animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <span className="text-xs font-semibold text-neutral-800 dark:text-[#F3EFEA] tracking-wide">
            Synthesizing Portrait Variations...
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            Applying camera angles & lighting
          </span>
        </div>
      )}

      {/* Portrait Grid: 4 columns on row 1, 4 columns on row 2 (total 8 portrait images) on desktop */}
      <div className={`grid ${getGridClasses()} gap-2 xs:gap-2.5 sm:gap-3 min-w-0 transition-opacity duration-300 ${isGenerating ? 'opacity-40' : 'opacity-100'}`}>
        {images.map((img, index) => {
          const isSelected = selectedImageId === img.id;

          return (
            <div
              key={img.id}
              onClick={() => {
                onSelectImage(img);
                onOpenPreview(img);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectImage(img);
                  onOpenPreview(img);
                }
              }}
              aria-label={`Portrait variation ${index + 1}: ${img.alt || img.variation}. Click to enlarge.`}
              className={`group relative rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100 dark:bg-[#1E1B19] cursor-pointer min-w-0 ${
                isSelected
                  ? 'ring-2 ring-[#DF856F] ring-offset-2 ring-offset-white dark:ring-offset-[#181615] shadow-md'
                  : 'hover:shadow-md hover:ring-1 hover:ring-[#DF856F]/40'
              }`}
            >
              {/* Aspect ratio portrait: matches reference tall portrait headshots */}
              <div className="w-full aspect-[3/3.8] relative overflow-hidden bg-neutral-200 dark:bg-[#1E1B19]">
                <img
                  src={img.src}
                  alt={img.alt || `Portrait variation ${index + 1}`}
                  className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
                  }}
                />

                {/* Subtle Hover Action Bar */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 sm:p-2.5">
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleCopyPrompt(e, img)}
                      title="Copy image seed / info"
                      className="p-1.5 bg-white/90 hover:bg-white text-neutral-800 dark:bg-[#25211F]/90 dark:hover:bg-[#2F2A27] dark:text-[#F3EFEA] rounded-full shadow-xs cursor-pointer"
                    >
                      {copiedId === img.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDownload(e, img)}
                      title="Download image"
                      className="p-1.5 bg-white/90 hover:bg-white text-neutral-800 dark:bg-[#25211F]/90 dark:hover:bg-[#2F2A27] dark:text-[#F3EFEA] rounded-full shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/95 font-medium px-2 py-0.5 bg-black/40 backdrop-blur-xs rounded-full truncate max-w-[110px]">
                      Var #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectImage(img);
                        onOpenPreview(img);
                      }}
                      className="p-1.5 bg-white/95 hover:bg-white text-neutral-800 dark:bg-[#25211F]/95 dark:hover:bg-[#2F2A27] dark:text-[#F3EFEA] rounded-full shadow-xs cursor-pointer"
                      title="Full Preview"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
