import React, { useEffect } from 'react';
import { X, Sparkles, HelpCircle, Keyboard } from 'lucide-react';

export default function SupportDialog({ isOpen, onClose }) {
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
      aria-labelledby="support-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white dark:bg-[#1C1918] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-2xl border border-neutral-200 dark:border-[#332E2A] flex flex-col gap-4 sm:gap-5 animate-in zoom-in-95 duration-150 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#2E2926] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#DF856F]/15 flex items-center justify-center text-[#C46750]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="support-dialog-title"
                className="text-sm font-bold text-neutral-900 dark:text-[#F3EFEA]"
              >
                Fomi AI Studio Guide & Support
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Part A Assessment Reference Implementation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-[#25211F] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 text-xs text-neutral-600 dark:text-[#EDE6E1] max-h-[60vh] overflow-y-auto pr-1">
          {/* Quick Guide */}
          <div className="bg-[#FAF7F4] dark:bg-[#25211F] p-3.5 rounded-2xl border border-[#ECE4DE] dark:border-[#38332F] flex flex-col gap-2">
            <h3 className="font-semibold text-neutral-800 dark:text-[#F3EFEA] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#DF856F]" />
              How It Works
            </h3>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-neutral-600 dark:text-[#A89F97]">
              <li>
                <strong>Prompt & Generate:</strong> Customize prompt text or keep the portrait defaults, then hit "Generate".
              </li>
              <li>
                <strong>History Strip:</strong> Click any horizontal thumbnail to load its creative concept.
              </li>
              <li>
                <strong>Gallery Interaction:</strong> Click any card in the portrait grid to view high-resolution details, seed data, and copy/download shortcuts.
              </li>
              <li>
                <strong>Controls:</strong> Adjust model, aspect ratio, styles, and expandable advanced parameters.
              </li>
            </ul>
          </div>

          {/* Keyboard Shortcuts */}
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-[#F3EFEA] flex items-center gap-1.5 mb-2">
              <Keyboard className="w-3.5 h-3.5 text-neutral-500" />
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-[#25211F] p-2 rounded-xl">
                <span>Close preview / modal</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#1E1B19] border border-neutral-200 dark:border-[#38332F] rounded text-[10px] font-mono">
                  Esc
                </kbd>
              </div>
              <div className="flex items-center justify-between bg-neutral-50 dark:bg-[#25211F] p-2 rounded-xl">
                <span>Cycle portrait variations</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#1E1B19] border border-neutral-200 dark:border-[#38332F] rounded text-[10px] font-mono">
                  ← / →
                </kbd>
              </div>
            </div>
          </div>

          {/* Support Contact */}
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            For technical inquiries or assessment submission feedback, contact:
            <span className="font-medium text-neutral-700 dark:text-[#F3EFEA] block mt-0.5">
              engineering@fomi.ai
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-neutral-100 dark:border-[#2E2926] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#DF856F] hover:bg-[#D77861] text-white text-xs font-semibold rounded-full shadow-2xs transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
