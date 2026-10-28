import React from 'react';

export default function PromptDescription({
  promptText,
  modelName,
  onOpenModelDetails
}) {
  return (
    <div className="w-full lg:w-[215px] xl:w-[230px] flex-shrink-0 flex flex-col justify-between self-stretch min-w-0">
      {/* Top decorative curved transition below History strip matching the reference */}
      <div className="hidden lg:flex items-start justify-start pl-1">
        <div
          className="w-24 h-3 bg-[#F8EFEA] dark:bg-[#201D1B] rounded-b-xl border-b border-l border-r border-[#EFE2DB] dark:border-[#2E2926] -mt-2 shadow-2xs"
          aria-hidden="true"
        />
      </div>

      {/* Flexible open space between top and bottom card (no empty gray box) */}
      <div className="hidden lg:block flex-1 min-h-[20px] lg:min-h-[40px]" />

      {/* Bottom: Compact Prompt & Model description card, aligned with Row 2 of Gallery */}
      <div
        className="w-full bg-[#F8EFEA] dark:bg-[#201D1B] rounded-[22px] p-3 sm:p-3.5 border border-[#EFE2DB] dark:border-[#2E2926] shadow-2xs flex flex-col justify-between gap-3 relative min-w-0"
        aria-label="Active generation prompt and model info"
      >
        <p className="text-[10.5px] leading-[1.48] text-neutral-700 dark:text-[#E8E2DD] font-normal break-words">
          {promptText}
        </p>

        <div className="flex justify-end pt-0.5">
          <button
            type="button"
            onClick={onOpenModelDetails}
            className="bg-white dark:bg-[#2A2623] hover:bg-neutral-50 dark:hover:bg-[#332E2A] text-[10px] font-semibold text-neutral-700 dark:text-[#F3EFEA] px-3 py-1 rounded-full border border-[#E9DDD5] dark:border-[#3C3632] shadow-2xs flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#DF856F]"
            title="View model specifications"
          >
            <span>Model</span>
          </button>
        </div>
      </div>
    </div>
  );
}
