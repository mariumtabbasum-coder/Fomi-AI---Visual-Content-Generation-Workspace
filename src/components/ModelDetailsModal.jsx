import React, { useEffect } from 'react';
import { X, Cpu } from 'lucide-react';

export default function ModelDetailsModal({ isOpen, onClose, model }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="model-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white dark:bg-[#1C1918] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 shadow-2xl border border-neutral-200 dark:border-[#332E2A] flex flex-col gap-3.5 sm:gap-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#2E2926] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DF856F]/15 flex items-center justify-center text-[#C46750]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="model-modal-title"
                className="text-sm font-bold text-neutral-900 dark:text-[#F3EFEA]"
              >
                {model?.name || 'Fomi Portrait v2.1'}
              </h2>
              <span className="text-[10px] text-neutral-400">
                Primary Synthesis Checkpoint
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-[#25211F] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 dark:text-[#EDE6E1] leading-relaxed">
          {model?.description ||
            'Specialized photorealistic portrait synthesis checkpoint tuned with studio key lighting, natural dermal textures, and authentic facial expressions.'}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#FAF7F4] dark:bg-[#25211F] p-2.5 rounded-xl border border-[#EDE4DE] dark:border-[#38332F]">
            <span className="text-[10px] text-neutral-400 block mb-0.5">Parameters</span>
            <span className="font-semibold text-neutral-800 dark:text-[#F3EFEA]">
              12 Billion (DiT)
            </span>
          </div>

          <div className="bg-[#FAF7F4] dark:bg-[#25211F] p-2.5 rounded-xl border border-[#EDE4DE] dark:border-[#38332F]">
            <span className="text-[10px] text-neutral-400 block mb-0.5">Native Res</span>
            <span className="font-semibold text-neutral-800 dark:text-[#F3EFEA]">
              1024 × 1344 px
            </span>
          </div>

          <div className="bg-[#FAF7F4] dark:bg-[#25211F] p-2.5 rounded-xl border border-[#EDE4DE] dark:border-[#38332F]">
            <span className="text-[10px] text-neutral-400 block mb-0.5">Inference Steps</span>
            <span className="font-semibold text-neutral-800 dark:text-[#F3EFEA]">
              50 Steps (DPM++ 2M)
            </span>
          </div>

          <div className="bg-[#FAF7F4] dark:bg-[#25211F] p-2.5 rounded-xl border border-[#EDE4DE] dark:border-[#38332F]">
            <span className="text-[10px] text-neutral-400 block mb-0.5">Precision</span>
            <span className="font-semibold text-neutral-800 dark:text-[#F3EFEA]">
              FP16 / TensorRT
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-[#2E2926] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#DF856F] hover:bg-[#D77861] text-white text-xs font-semibold rounded-full shadow-2xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
