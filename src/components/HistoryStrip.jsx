import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HistoryStrip({
  historyItems,
  selectedHistoryId,
  onSelectHistory,
  onViewAll
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Generation history"
      className="w-full bg-white dark:bg-[#1C1918] rounded-[22px] border border-[#ECE4DE] dark:border-[#2E2926] p-2 shadow-2xs flex items-center relative group"
    >
      {/* Left History Tile */}
      <div className="flex items-center pl-2 pr-3 py-1 flex-shrink-0 select-none">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-neutral-800 dark:text-[#F3EFEA] tracking-tight leading-tight">
            History
          </span>
          <button
            type="button"
            onClick={onViewAll}
            className="text-[10px] text-neutral-400 hover:text-neutral-600 dark:hover:text-[#F3EFEA] font-medium text-left transition-colors cursor-pointer focus:outline-none focus-visible:underline"
          >
            View All
          </button>
        </div>

        {/* Small vertical divider */}
        <div className="h-7 w-[1.5px] bg-[#EDE5DF] dark:bg-[#2E2926] ml-3 rounded-full" />
      </div>

      {/* Scroll Left Button */}
      <button
        type="button"
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-20 z-10 w-6 h-6 items-center justify-center bg-white/90 dark:bg-[#282422]/90 rounded-full shadow-md text-neutral-600 dark:text-neutral-200 hover:bg-white dark:hover:bg-[#322D2A] border border-neutral-200/60 dark:border-[#38332F] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:opacity-100"
        aria-label="Scroll history left"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Thumbnails Row */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-1 flex-1"
        tabIndex={0}
        role="region"
        aria-label="Recent generations list"
      >
        {historyItems.map((item) => {
          const isSelected = selectedHistoryId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectHistory(item)}
              title={`${item.title} (${item.time})`}
              className={`flex-shrink-0 relative rounded-xl overflow-hidden focus:outline-none cursor-pointer ${
                isSelected
                  ? 'ring-2 ring-[#DF856F] ring-offset-2 ring-offset-white dark:ring-offset-[#1C1918] scale-[1.04] shadow-xs'
                  : 'hover:scale-[1.03] opacity-90 hover:opacity-100 ring-1 ring-black/5 dark:ring-white/10'
              }`}
            >
              <img
                src={item.thumb}
                alt={item.title}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-cover block bg-neutral-100 dark:bg-neutral-800"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80';
                }}
              />
              {isSelected && (
                <div className="absolute inset-0 bg-[#DF856F]/10 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 z-10 w-6 h-6 items-center justify-center bg-white/90 dark:bg-[#282422]/90 rounded-full shadow-md text-neutral-600 dark:text-neutral-200 hover:bg-white dark:hover:bg-[#322D2A] border border-neutral-200/60 dark:border-[#38332F] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:opacity-100"
        aria-label="Scroll history right"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </section>
  );
}
