import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Loader2, Info } from 'lucide-react';
import {
  AVAILABLE_MODELS,
  ASPECT_RATIOS,
  IMAGE_COUNT_OPTIONS,
  STYLES_LIST
} from '../data/mockData.js';

export default function GenerationPanel({
  prompt,
  setPrompt,
  contentType,
  setContentType,
  imageCount,
  setImageCount,
  aspectRatio,
  setAspectRatio,
  selectedModel,
  setSelectedModel,
  isGenerating,
  onGenerate,
  selectedStyles,
  onToggleStyle
}) {
  const [showAdvance, setShowAdvance] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [cfgScale, setCfgScale] = useState(7.5);
  const [seed, setSeed] = useState('4892011');
  const [negativePrompt, setNegativePrompt] = useState('blurry, deformed, cartoon, oversaturated, watermark');

  const handleGenerateClick = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setValidationError('Please enter a prompt before generating.');
      return;
    }
    setValidationError('');
    onGenerate({
      prompt: prompt.trim(),
      contentType,
      imageCount,
      aspectRatio,
      model: selectedModel,
      cfgScale,
      seed,
      negativePrompt,
      styles: selectedStyles
    });
  };

  return (
    <aside
      aria-label="Generation controls"
      className="w-full lg:w-[250px] xl:w-[260px] flex-shrink-0 bg-[#F8EFEA] dark:bg-[#201D1B] rounded-[26px] p-3 border border-[#EFE2DB] dark:border-[#2E2926] flex flex-col gap-2.5 shadow-2xs self-stretch min-w-0"
    >
      {/* 1. Image / Video Segmented Tab Switcher */}
      <div className="w-full bg-[#EFE2DA]/80 dark:bg-[#151312] p-0.5 rounded-full flex gap-1 text-xs font-medium min-w-0">
        <button
          type="button"
          onClick={() => setContentType('image')}
          className={`flex-1 py-1 rounded-full text-center transition-all cursor-pointer ${
            contentType === 'image'
              ? 'bg-white dark:bg-[#2B2724] text-neutral-800 dark:text-[#F3EFEA] font-semibold shadow-2xs'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => setContentType('video')}
          className={`flex-1 py-1 rounded-full text-center transition-all cursor-pointer ${
            contentType === 'video'
              ? 'bg-white dark:bg-[#2B2724] text-neutral-800 dark:text-[#F3EFEA] font-semibold shadow-2xs'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          Video
        </button>
      </div>

      {/* Video Mode Notice if active */}
      {contentType === 'video' && (
        <div className="bg-white/90 dark:bg-[#25211F] p-2.5 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5 animate-in fade-in">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Video generation mode: Generating motion keyframes.
          </span>
        </div>
      )}

      {/* 2. Prompt Textarea Container with Generate Button inside (Fixed clipping & padded top) */}
      <div className="bg-white dark:bg-[#141211] rounded-[20px] p-3 sm:p-3.5 border border-[#EFE5DF] dark:border-[#2E2926] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between relative transition-all focus-within:ring-1.5 focus-within:ring-[#DF856F]/50 min-w-0">
        <label htmlFor="prompt-input" className="sr-only">
          Image generation prompt
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (validationError && e.target.value.trim()) {
              setValidationError('');
            }
          }}
          placeholder="Describe you imaginations to be converted to piece of art ..."
          rows={4}
          disabled={isGenerating}
          className="w-full text-xs leading-relaxed text-neutral-800 dark:text-[#F3EFEA] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 bg-transparent resize-none border-none focus:outline-none focus:ring-0 pt-1.5 pb-2 px-0.5 min-h-[90px] sm:min-h-[105px] max-h-[180px] overflow-y-auto block"
        />

        {/* Validation error message */}
        {validationError && (
          <p className="text-[11px] text-rose-600 font-medium pb-1 animate-in fade-in">
            {validationError}
          </p>
        )}

        {/* Generate Button in lower-right of prompt box */}
        <div className="flex justify-end pt-2 border-t border-black/[0.03] dark:border-white/[0.04]">
          <button
            type="button"
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DF856F] to-[#D77861] hover:from-[#D77861] hover:to-[#CF6C54] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(215,120,97,0.35)] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Row of 3 Compact Controls: # Images, Aspect Ratio, Model Selector */}
      <div className="grid grid-cols-3 gap-1 xs:gap-1.5 min-w-0">
        {/* # Images Dropdown */}
        <div className="relative min-w-0">
          <select
            value={imageCount}
            onChange={(e) => setImageCount(Number(e.target.value))}
            aria-label="Number of images"
            className="w-full appearance-none bg-white/90 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] text-[10px] xs:text-[10.5px] font-medium text-neutral-700 dark:text-[#EDE6E1] py-1.5 pl-1.5 xs:pl-2 pr-3.5 xs:pr-4 rounded-full border border-[#EBE0D8] dark:border-[#38332F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#DF856F] truncate cursor-pointer"
          >
            {IMAGE_COUNT_OPTIONS.map((count) => (
              <option key={count} value={count}>
                #{count} Images
              </option>
            ))}
          </select>
          <ChevronDown className="w-2.5 h-2.5 text-neutral-400 absolute right-1.5 top-2.5 pointer-events-none" />
        </div>

        {/* Aspect Ratio Dropdown */}
        <div className="relative min-w-0">
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            aria-label="Aspect Ratio"
            className="w-full appearance-none bg-white/90 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] text-[10px] xs:text-[10.5px] font-medium text-neutral-700 dark:text-[#EDE6E1] py-1.5 pl-1.5 xs:pl-2 pr-3.5 xs:pr-4 rounded-full border border-[#EBE0D8] dark:border-[#38332F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#DF856F] cursor-pointer text-center truncate"
          >
            {ASPECT_RATIOS.map((ar) => (
              <option key={ar.id} value={ar.id}>
                {ar.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-2.5 h-2.5 text-neutral-400 absolute right-1.5 top-2.5 pointer-events-none" />
        </div>

        {/* Model Selector Dropdown - displays Model: Name matching reference screenshot */}
        <div className="relative min-w-0">
          <select
            value={selectedModel.id}
            onChange={(e) => {
              const found = AVAILABLE_MODELS.find((m) => m.id === e.target.value);
              if (found) setSelectedModel(found);
            }}
            aria-label="Model Selection"
            className="w-full appearance-none bg-white/90 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] text-[10px] xs:text-[10.5px] font-medium text-neutral-700 dark:text-[#EDE6E1] py-1.5 pl-1.5 xs:pl-2 pr-3.5 xs:pr-4 rounded-full border border-[#EBE0D8] dark:border-[#38332F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#DF856F] truncate cursor-pointer"
          >
            {AVAILABLE_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                Model: Name
              </option>
            ))}
          </select>
          <ChevronDown className="w-2.5 h-2.5 text-neutral-400 absolute right-1 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* 4. Advance Accordion Pill */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <button
          type="button"
          onClick={() => setShowAdvance(!showAdvance)}
          aria-expanded={showAdvance}
          className="w-full bg-white/90 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] text-xs font-medium text-neutral-700 dark:text-[#EDE6E1] py-2 px-4 rounded-full border border-[#EBE0D8] dark:border-[#38332F] flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
        >
          <span>Advance</span>
          {showAdvance ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          )}
        </button>

        {showAdvance && (
          <div className="bg-white/90 dark:bg-[#141211] rounded-2xl p-3 border border-[#EBE0D8] dark:border-[#2E2926] flex flex-col gap-2.5 text-[11px] animate-in fade-in slide-in-from-top-1 duration-150 min-w-0">
            <div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                <span>Guidance Scale (CFG)</span>
                <span className="text-[#C46750] font-semibold">{cfgScale}</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={cfgScale}
                onChange={(e) => setCfgScale(parseFloat(e.target.value))}
                className="w-full accent-[#DF856F] h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                <span>Seed</span>
                <button
                  type="button"
                  onClick={() => setSeed(Math.floor(Math.random() * 9999999).toString())}
                  className="text-[10px] text-[#C46750] hover:underline cursor-pointer"
                >
                  Randomize
                </button>
              </div>
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="w-full px-2 py-1 text-[11px] rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1E1B19] text-neutral-800 dark:text-[#EDE6E1] focus:outline-none focus:ring-1 focus:ring-[#DF856F]"
              />
            </div>

            <div>
              <label className="text-neutral-600 dark:text-neutral-400 font-medium block mb-1">
                Negative Prompt
              </label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Elements to avoid..."
                className="w-full px-2 py-1 text-[11px] rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1E1B19] text-neutral-800 dark:text-[#EDE6E1] focus:outline-none focus:ring-1 focus:ring-[#DF856F]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Styles Accordion Pill */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <button
          type="button"
          onClick={() => setShowStyles(!showStyles)}
          aria-expanded={showStyles}
          className="w-full bg-white/90 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] text-xs font-medium text-neutral-700 dark:text-[#EDE6E1] py-2 px-4 rounded-full border border-[#EBE0D8] dark:border-[#38332F] flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
        >
          <span>Styles</span>
          {showStyles ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          )}
        </button>

        {showStyles && (
          <div className="bg-white/90 dark:bg-[#141211] rounded-2xl p-2.5 border border-[#EBE0D8] dark:border-[#2E2926] flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150 min-w-0">
            {STYLES_LIST.map((style) => {
              const active = selectedStyles.includes(style);
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => onToggleStyle(style)}
                  className={`text-[10px] font-medium px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#DF856F] text-white shadow-2xs'
                      : 'bg-neutral-100 dark:bg-[#25211F] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#2E2926]'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
