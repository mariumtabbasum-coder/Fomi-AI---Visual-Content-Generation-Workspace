import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader.jsx';
import HistoryStrip from './components/HistoryStrip.jsx';
import GenerationPanel from './components/GenerationPanel.jsx';
import PromptDescription from './components/PromptDescription.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import ImagePreviewModal from './components/ImagePreviewModal.jsx';
import SupportDialog from './components/SupportDialog.jsx';
import ModelDetailsModal from './components/ModelDetailsModal.jsx';
import EnhanceModal from './components/EnhanceModal.jsx';
import LibraryModal from './components/LibraryModal.jsx';
import { generateMockImages } from './services/mockGenerationService.js';
import {
  INITIAL_PROMPT,
  DEFAULT_GALLERY_IMAGES,
  HISTORY_ITEMS,
  AVAILABLE_MODELS
} from './data/mockData.js';

export default function App() {
  // Theme state with immediate localStorage hydration
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fomi_theme');
        if (saved === 'dark' || saved === 'light') return saved;
      } catch {
        // ignore localStorage access errors
      }
    }
    return 'light';
  });

  // Navigation tab
  const [activeNavTab, setActiveNavTab] = useState('home');

  // History state with localStorage persistence
  const [historyList, setHistoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('fomi_history_items');
      return saved ? JSON.parse(saved) : HISTORY_ITEMS;
    } catch {
      return HISTORY_ITEMS;
    }
  });
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  // Generation parameters
  const [prompt, setPrompt] = useState(INITIAL_PROMPT);
  const [activePromptDescription, setActivePromptDescription] = useState(INITIAL_PROMPT);
  const [contentType, setContentType] = useState('image');
  const [imageCount, setImageCount] = useState(8);
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
  const [selectedStyles, setSelectedStyles] = useState(['Photographic', 'Studio Portrait']);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState(DEFAULT_GALLERY_IMAGES);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Status & Modals
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isEnhanceOpen, setIsEnhanceOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fomi_history_items', JSON.stringify(historyList));
    } catch {
      // ignore storage quota errors
    }
  }, [historyList]);

  // Sync theme to root class & attribute with zero layout shift
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('fomi_theme', theme);
    } catch {
      // ignore storage quota errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(`Switched to ${next === 'dark' ? 'Dark Mode' : 'Light Mode'}`);
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Select History Item
  const handleSelectHistory = (item) => {
    setSelectedHistoryId(item.id);
    setPrompt(item.prompt);
    setActivePromptDescription(item.prompt);

    const matchedModel = AVAILABLE_MODELS.find((m) => m.name === item.model);
    if (matchedModel) {
      setSelectedModel(matchedModel);
    }

    showToast(`Loaded "${item.title}" into workspace`);
  };

  // Toggle Style tag
  const handleToggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  // Pure Local Mock Generation Workflow (Zero API Keys or Cloud Dependencies)
  const handleGenerate = async (params) => {
    const promptTextToUse = params?.prompt || prompt;
    const modelToUse = params?.model || selectedModel;
    const countToUse = params?.imageCount ?? imageCount;
    const ratioToUse = params?.aspectRatio || aspectRatio;
    const stylesToUse = params?.styles || selectedStyles;
    const seedToUse = params?.seed;
    const cfgToUse = params?.cfgScale;
    const negativePromptToUse = params?.negativePrompt;

    setIsGenerating(true);
    setActivePromptDescription(promptTextToUse);

    try {
      const response = await generateMockImages({
        prompt: promptTextToUse,
        imageCount: countToUse,
        aspectRatio: ratioToUse,
        model: modelToUse,
        styles: stylesToUse,
        seed: seedToUse,
        cfgScale: cfgToUse,
        negativePrompt: negativePromptToUse
      });

      setGalleryImages(response.images);
      setSelectedImage(response.images[0]);

      // Add new record to history
      const newHistoryItem = {
        id: `gen-${Date.now()}`,
        title: promptTextToUse.slice(0, 24) + '...',
        prompt: promptTextToUse,
        thumb: response.images[0].src,
        time: 'Just now',
        model: modelToUse.name
      };

      setHistoryList((prev) => [newHistoryItem, ...prev.slice(0, 15)]);
      setSelectedHistoryId(newHistoryItem.id);

      showToast(`Generated ${response.images.length} variation${response.images.length > 1 ? 's' : ''} successfully!`);
    } catch (err) {
      showToast(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Gallery Navigation for Preview Modal
  const handleNextPreview = () => {
    if (!previewImage) return;
    const idx = galleryImages.findIndex((img) => img.id === previewImage.id);
    const nextIdx = (idx + 1) % galleryImages.length;
    setPreviewImage(galleryImages[nextIdx]);
    setSelectedImage(galleryImages[nextIdx]);
  };

  const handlePrevPreview = () => {
    if (!previewImage) return;
    const idx = galleryImages.findIndex((img) => img.id === previewImage.id);
    const prevIdx = (idx - 1 + galleryImages.length) % galleryImages.length;
    setPreviewImage(galleryImages[prevIdx]);
    setSelectedImage(galleryImages[prevIdx]);
  };

  // 1. Home Navigation Action
  const handleNavHome = () => {
    setActiveNavTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to Studio Home');
  };

  // 2. Image Mode Navigation Action
  const handleSelectImageMode = () => {
    setContentType('image');
    setActiveNavTab('gallery');
    handleScrollToGallery();
    showToast('Switched to Image Generation Mode');
  };

  // 3. Video Mode Navigation Action
  const handleSelectVideoMode = () => {
    setContentType('video');
    setActiveNavTab('video');
    showToast('Video Mode: Keyframe synthesis preview demonstration');
  };

  // 4. Enhance Modal Action
  const handleApplyEnhancement = (enhancedPrompt) => {
    setPrompt(enhancedPrompt);
    setActivePromptDescription(enhancedPrompt);
    showToast('Applied prompt enhancement preset!');
  };

  // 5. Gallery Scroll & Focus Action
  const handleScrollToGallery = () => {
    setActiveNavTab('gallery');
    const el = document.getElementById('fomi-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      el.classList.add('ring-2', 'ring-[#DF856F]', 'ring-offset-4', 'rounded-[24px]');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#DF856F]', 'ring-offset-4', 'rounded-[24px]');
      }, 1600);
    }
  };

  // Profile Menu Option Handler
  const handleProfileOption = (type) => {
    if (type === 'profile') {
      showToast('Workspace: Studio Creative (Pro Creator Plan)');
    } else if (type === 'preferences') {
      setIsModelModalOpen(true);
    } else if (type === 'signout') {
      showToast('Signed out of demo session');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F7] dark:bg-[#0E0D0C] text-[#1E1E1E] dark:text-[#F3EFEA] p-1.5 xs:p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans antialiased w-full max-w-full overflow-x-hidden">
      {/* Outer Workspace Container matching reference composition */}
      <main className="w-full max-w-[1380px] bg-[#FAF7F5] dark:bg-[#181615] rounded-[20px] xs:rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-2 xs:p-3 sm:p-4 md:p-6 border border-[#EDE4DE] dark:border-[#2C2724] shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col gap-2.5 sm:gap-4 min-w-0">
        {/* Top Navigation */}
        <AppHeader
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSupport={() => setIsSupportOpen(true)}
          onScrollToGallery={handleScrollToGallery}
          activeNavTab={activeNavTab}
          onNavHome={handleNavHome}
          onSelectImageMode={handleSelectImageMode}
          onSelectVideoMode={handleSelectVideoMode}
          onOpenEnhance={() => setIsEnhanceOpen(true)}
          onOpenLibrary={() => setIsLibraryOpen(true)}
          onProfileOption={handleProfileOption}
        />

        {/* Horizontal History Strip */}
        <HistoryStrip
          historyItems={historyList}
          selectedHistoryId={selectedHistoryId}
          onSelectHistory={handleSelectHistory}
          onViewAll={() => setIsLibraryOpen(true)}
        />

        {/* Main Workspace: Left Control Panel + Description Area + Gallery Grid */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-3 sm:gap-3.5 pt-1 min-w-0">
          {/* Left Generation-Control Panel */}
          <GenerationPanel
            prompt={prompt}
            setPrompt={setPrompt}
            contentType={contentType}
            setContentType={setContentType}
            imageCount={imageCount}
            setImageCount={setImageCount}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            selectedStyles={selectedStyles}
            onToggleStyle={handleToggleStyle}
          />

          {/* Middle Prompt and Model Description Area */}
          <PromptDescription
            promptText={activePromptDescription}
            modelName={selectedModel.name}
            onOpenModelDetails={() => setIsModelModalOpen(true)}
          />

          {/* Main 4x2 Image Gallery (or count-based variations) */}
          <ImageGallery
            images={galleryImages}
            selectedImageId={selectedImage?.id}
            onSelectImage={setSelectedImage}
            onOpenPreview={setPreviewImage}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
        onNext={handleNextPreview}
        onPrev={handlePrevPreview}
        promptText={activePromptDescription}
        modelName={selectedModel.name}
      />

      {/* Support & Help Dialog */}
      <SupportDialog
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Model Specifications Modal */}
      <ModelDetailsModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        model={selectedModel}
      />

      {/* Enhance & Inpainting Modal */}
      <EnhanceModal
        isOpen={isEnhanceOpen}
        onClose={() => setIsEnhanceOpen(false)}
        currentPrompt={prompt}
        onApplyPromptEnhancement={handleApplyEnhancement}
      />

      {/* Library Archive Modal */}
      <LibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        historyList={historyList}
        selectedHistoryId={selectedHistoryId}
        onSelectHistory={handleSelectHistory}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2.5 rounded-2xl text-xs font-medium shadow-xl border border-neutral-700 dark:border-neutral-300 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
