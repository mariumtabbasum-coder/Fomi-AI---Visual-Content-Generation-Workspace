import React, { useEffect } from 'react';
import { X, Folder, Clock, ArrowRight } from 'lucide-react';

export default function LibraryModal({
  isOpen,
  onClose,
  historyList,
  selectedHistoryId,
  onSelectHistory
}) {
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
      aria-labelledby="library-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 xs:p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white dark:bg-[#1C1918] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-2xl border border-neutral-200 dark:border-[#332E2A] flex flex-col gap-3.5 sm:gap-4 animate-in zoom-in-95 duration-150 max-h-[88vh] min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#2E2926] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#DF856F]/15 flex items-center justify-center text-[#C46750]">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="library-modal-title"
                className="text-sm font-bold text-neutral-900 dark:text-[#F3EFEA]"
              >
                Generation Library & Archive
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {historyList.length} total creative generations saved
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-[#25211F] transition-colors cursor-pointer"
            aria-label="Close library modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 min-w-0">
          {historyList.map((item) => {
            const isSelected = selectedHistoryId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistory(item);
                  onClose();
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-start gap-2.5 sm:gap-3 cursor-pointer min-w-0 ${
                  isSelected
                    ? 'border-[#DF856F] bg-[#FAF5F2] dark:bg-[#25211F] ring-1 ring-[#DF856F]'
                    : 'border-neutral-200 dark:border-[#332E2A] hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-[#25211F]/50'
                }`}
              >
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 bg-neutral-100 dark:bg-neutral-800"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80';
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold text-neutral-900 dark:text-[#F3EFEA] truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0 text-[10px] text-neutral-400">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-600 dark:text-[#EDE6E1] line-clamp-2 mt-0.5 leading-snug">
                    {item.prompt}
                  </p>

                  <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-black/5 dark:border-white/5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-[#1E1B19] text-neutral-600 dark:text-neutral-300 font-medium">
                      {item.model}
                    </span>
                    <span className="text-[11px] font-semibold text-[#DF856F] flex items-center gap-1">
                      <span>Load into Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-neutral-100 dark:border-[#2E2926] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-100 dark:bg-[#25211F] hover:bg-neutral-200 dark:hover:bg-[#2C2825] text-neutral-700 dark:text-[#EDE6E1] text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
