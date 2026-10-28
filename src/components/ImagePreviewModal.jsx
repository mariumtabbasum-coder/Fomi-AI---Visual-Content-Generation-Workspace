import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Check, Copy } from 'lucide-react';

export default function ImagePreviewModal({
  image,
  onClose,
  onNext,
  onPrev,
  promptText,
  modelName
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard?.writeText?.(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `fomi-full-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white dark:bg-[#1C1918] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-neutral-200 dark:border-[#332E2A] flex flex-col md:flex-row max-h-[92vh] min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Previous Image Button */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 dark:bg-[#25211F]/80 hover:bg-white dark:hover:bg-[#2F2A27] text-neutral-800 dark:text-[#F3EFEA] rounded-full shadow-md transition-colors cursor-pointer"
          aria-label="Previous variation"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Next Image Button */}
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2.5 md:right-[330px] top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 dark:bg-[#25211F]/80 hover:bg-white dark:hover:bg-[#2F2A27] text-neutral-800 dark:text-[#F3EFEA] rounded-full shadow-md transition-colors cursor-pointer"
          aria-label="Next variation"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Image Preview Area */}
        <div className="flex-1 bg-neutral-950 flex items-center justify-center relative min-h-[240px] xs:min-h-[280px] md:min-h-[480px]">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[50vh] md:max-h-[85vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Sidebar with Prompt & Metadata */}
        <div className="w-full md:w-[320px] p-3.5 sm:p-5 flex flex-col justify-between bg-white dark:bg-[#1C1918] border-t md:border-t-0 md:border-l border-neutral-200 dark:border-[#332E2A] overflow-y-auto min-w-0">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#DF856F]/15 text-[#C46750] dark:text-[#E89380] text-[11px] font-semibold">
                  {modelName}
                </span>
                <span className="text-[11px] text-neutral-400">
                  Seed: {image.seed}
                </span>
              </div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-[#F3EFEA]">
                {image.variation}
              </h2>
            </div>

            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                Generation Prompt
              </span>
              <p className="text-xs text-neutral-600 dark:text-[#EDE6E1] leading-relaxed bg-[#FAF6F3] dark:bg-[#25211F] p-2.5 sm:p-3 rounded-xl border border-[#EDE4DE] dark:border-[#38332F] break-words">
                {promptText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-neutral-50 dark:bg-[#25211F] p-2 rounded-lg">
                <span className="text-neutral-400 text-[10px] block">Aspect</span>
                <span className="font-medium text-neutral-800 dark:text-[#F3EFEA]">
                  3:4 Portrait
                </span>
              </div>
              <div className="bg-neutral-50 dark:bg-[#25211F] p-2 rounded-lg">
                <span className="text-neutral-400 text-[10px] block">Sampler</span>
                <span className="font-medium text-neutral-800 dark:text-[#F3EFEA]">
                  Euler-A (50 Steps)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-neutral-100 dark:border-[#2E2926] mt-3">
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-neutral-700 dark:text-[#EDE6E1] bg-neutral-100 dark:bg-[#25211F] hover:bg-neutral-200 dark:hover:bg-[#2F2A27] rounded-xl transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-[#DF856F] hover:bg-[#D77861] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
