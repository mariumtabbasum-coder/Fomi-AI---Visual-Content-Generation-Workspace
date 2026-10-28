import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader.jsx';
import HistoryStrip from './components/HistoryStrip.jsx';
import GenerationPanel from './components/GenerationPanel.jsx';
import PromptDescription from './components/PromptDescription.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import ImagePreviewModal from './components/ImagePreviewModal.jsx';
import SupportDialog from './components/SupportDialog.jsx';
import ModelDetailsModal from './components/ModelDetailsModal.jsx';
import {
  INITIAL_PROMPT,
  DEFAULT_GALLERY_IMAGES,
  HISTORY_ITEMS,
  AVAILABLE_MODELS
} from './data/mockData.js';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState('light');

  // Navigation tab
  const [activeNavTab, setActiveNavTab] = useState('home');

  // History state
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
  const [aspectRatio, setAspectRatio] = useState('1:1');
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
  const [toastMessage, setToastMessage] = useState('');

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fomi_history_items', JSON.stringify(historyList));
    } catch {
      // ignore storage quota errors
    }
  }, [historyList]);

  // Sync theme to root class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
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

    // If item matches a model
    const matchedModel = AVAILABLE_MODELS.find((m) => m.name === item.model);
    if (matchedModel) {
      setSelectedModel(matchedModel);
    }

    showToast(`Loaded "${item.title}"`);
  };

  // Toggle Style tag
  const handleToggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  // Mock Generation Action
  const handleGenerate = ({ prompt: newPrompt, model }) => {
    setIsGenerating(true);
    setActivePromptDescription(newPrompt);

    // Simulate asynchronous generation process
    setTimeout(() => {
      setIsGenerating(false);

      // Create variation updates: shuffle / modify seeds and metadata
      const newSeedBase = Math.floor(1000000 + Math.random() * 9000000);
      const updatedGallery = DEFAULT_GALLERY_IMAGES.map((img, i) => ({
        ...img,
        seed: newSeedBase + i,
        variation: `Variation #${i + 1} (${newPrompt.slice(0, 32)}...)`
      }));

      setGalleryImages(updatedGallery);
      setSelectedImage(updatedGallery[0]);

      // Add to history strip
      const newHistoryItem = {
        id: `gen-${Date.now()}`,
        title: newPrompt.slice(0, 24) + '...',
        prompt: newPrompt,
        thumb: updatedGallery[0].src,
        time: 'Just now',
        model: model.name
      };

      setHistoryList((prev) => [newHistoryItem, ...prev.slice(0, 15)]);
      setSelectedHistoryId(newHistoryItem.id);

      showToast('8 variations generated successfully!');
    }, 1400);
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

  const handleScrollToGallery = () => {
    const el = document.getElementById('fomi-gallery');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F7] dark:bg-[#121110] text-[#1E1E1E] dark:text-[#EAE6E2] p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans antialiased">
      {/* Outer Workspace Container matching the reference composition */}
      <main className="w-full max-w-[1380px] bg-[#FAF7F5] dark:bg-[#181716] rounded-[28px] sm:rounded-[32px] p-3 sm:p-5 md:p-6 border border-[#EDE4DE] dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col gap-3 sm:gap-4">
        {/* Top Navigation */}
        <AppHeader
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSupport={() => setIsSupportOpen(true)}
          onScrollToGallery={handleScrollToGallery}
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
        />

        {/* Horizontal History Strip */}
        <HistoryStrip
          historyItems={historyList}
          selectedHistoryId={selectedHistoryId}
          onSelectHistory={handleSelectHistory}
          onViewAll={() => showToast('Displaying full archive in history strip.')}
        />

        {/* Main Workspace: Left Control Panel + Description Area + Gallery Grid */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-3 sm:gap-3.5 pt-1">
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

          {/* Main 4x2 Image Gallery (8 Portrait Variations) */}
          <ImageGallery
            images={galleryImages}
            selectedImageId={selectedImage?.id}
            onSelectImage={setSelectedImage}
            onOpenPreview={setPreviewImage}
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

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2.5 rounded-2xl text-xs font-medium shadow-xl border border-neutral-700 dark:border-neutral-300 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
