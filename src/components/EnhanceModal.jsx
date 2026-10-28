import React, { useEffect, useState } from 'react';
import { X, Wand2, Check } from 'lucide-react';

export default function EnhanceModal({
  isOpen,
  onClose,
  currentPrompt,
  onApplyPromptEnhancement
}) {
  const [selectedPreset, setSelectedPreset] = useState('clarity');
  const [inpaintMaskEnabled, setInpaintMaskEnabled] = useState(false);
  const [faceCorrection, setFaceCorrection] = useState(true);

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

  const presets = [
    {
      id: 'clarity',
      title: 'Prompt Clarity & Micro-details',
      desc: 'Injects studio photography terminology, 8k dermal texture, and camera lens specifics.',
      tokens: ', 85mm f/1.4 lens, razor-sharp focus on eyes, ultra-fine skin pores, studio strobe rim lighting'
    },
    {
      id: 'lighting',
      title: 'Cinematic Gallery Lighting',
      desc: 'Emphasizes directional softbox illumination and gallery ambient reflection.',
      tokens: ', warm cinematic volumetric illumination, diffuse key light, natural shadows, soft rim highlight'
    },
    {
      id: 'natural',
      title: 'Natural & Candid Realism',
      desc: 'Removes artificial gloss for authentic editorial magazine photography.',
      tokens: ', authentic candid editorial capture, natural daylight, uncompressed RAW photograph, Kodak Portra 400 color science'
    }
  ];

  const handleApply = () => {
    const chosen = presets.find((p) => p.id === selectedPreset);
    if (chosen && currentPrompt) {
      const cleanPrompt = currentPrompt.trim().replace(/\s*,\s*$/, '');
      const enhanced = `${cleanPrompt}${chosen.tokens}`;
      onApplyPromptEnhancement(enhanced);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enhance-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white dark:bg-[#1C1918] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 shadow-2xl border border-neutral-200 dark:border-[#332E2A] flex flex-col gap-3.5 sm:gap-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#2E2926] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#DF856F]/15 flex items-center justify-center text-[#C46750]">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="enhance-modal-title"
                className="text-sm font-bold text-neutral-900 dark:text-[#F3EFEA]"
              >
                Enhance & Inpainting Tools
              </h2>
              <span className="text-[10px] text-neutral-400">
                Visual refinement & prompt optimization
              </span>
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

        {/* Preset list */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-neutral-700 dark:text-[#EDE6E1]">
            Select Prompt Enhancement Preset:
          </span>
          <div className="flex flex-col gap-1.5">
            {presets.map((preset) => {
              const active = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'border-[#DF856F] bg-[#FAF5F2] dark:bg-[#25211F] ring-1 ring-[#DF856F]'
                      : 'border-neutral-200 dark:border-[#332E2A] hover:bg-neutral-50 dark:hover:bg-[#25211F]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-800 dark:text-[#F3EFEA]">
                      {preset.title}
                    </span>
                    {active && <Check className="w-3.5 h-3.5 text-[#DF856F]" />}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                    {preset.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="pt-2 border-t border-neutral-100 dark:border-[#2E2926] flex flex-col gap-2">
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-xs text-neutral-700 dark:text-[#EDE6E1] font-medium">
              Neural Face Restoration (GFPGAN)
            </span>
            <input
              type="checkbox"
              checked={faceCorrection}
              onChange={(e) => setFaceCorrection(e.target.checked)}
              className="accent-[#DF856F] w-4 h-4 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-xs text-neutral-700 dark:text-[#EDE6E1] font-medium">
              Inpainting Canvas Overlay
            </span>
            <input
              type="checkbox"
              checked={inpaintMaskEnabled}
              onChange={(e) => setInpaintMaskEnabled(e.target.checked)}
              className="accent-[#DF856F] w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-neutral-100 dark:border-[#2E2926] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-[#EDE6E1] hover:bg-neutral-100 dark:hover:bg-[#25211F] rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-1.5 bg-[#DF856F] hover:bg-[#D77861] text-white text-xs font-semibold rounded-full shadow-2xs transition-colors cursor-pointer"
          >
            Apply Enhancement
          </button>
        </div>
      </div>
    </div>
  );
}
