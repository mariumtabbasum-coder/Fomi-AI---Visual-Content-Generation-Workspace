import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Image as ImageIcon,
  Video,
  Wand2,
  Folder,
  Headphones,
  Moon,
  Sun,
  Layers,
  User,
  Settings,
  LogOut
} from 'lucide-react';

export default function AppHeader({
  theme,
  onToggleTheme,
  onOpenSupport,
  onScrollToGallery,
  activeNavTab,
  onNavHome,
  onSelectImageMode,
  onSelectVideoMode,
  onOpenEnhance,
  onOpenLibrary,
  onProfileOption
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showProfileMenu) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showProfileMenu]);

  return (
    <header className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2.5 px-1 sm:px-3 md:px-4 py-1.5 sm:py-2 relative min-w-0">
      {/* Brand Logo - stylized F */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={onNavHome}
          className="group flex items-center gap-1.5 sm:gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] rounded-lg p-0.5 sm:p-1"
          title="Fomi AI Studio Home"
          aria-label="Fomi AI Studio Home"
        >
          {/* Custom vector F matching the exact stylized lettermark */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 32 36"
              className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-950 dark:text-[#F3EFEA] fill-current transition-transform duration-200 group-hover:scale-105"
            >
              <path d="M6 4h18c1.1 0 2 .9 2 2v3.5c0 1.1-.9 2-2 2H14.5v5.5H22c1.1 0 2 .9 2 2V22c0 1.1-.9 2-2 2h-7.5v8H6V4z" />
            </svg>
          </div>
        </button>
      </div>

      {/* Center Navigation Bar with Top Progress Indicator */}
      <div className="order-3 md:order-2 w-full md:w-auto flex flex-col items-center justify-center gap-1.5 min-w-0">
        {/* Slender capsule bar matching screenshot */}
        <div
          className="w-32 xs:w-44 sm:w-64 h-1.5 rounded-full overflow-hidden flex bg-[#F6ECE6] dark:bg-[#2A2522]"
          role="progressbar"
          aria-valuenow={40}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="w-1/3 sm:w-2/5 h-full bg-[#DF856F] rounded-full" />
        </div>

        {/* 5 Navigation Icons */}
        <nav className="flex items-center justify-center gap-2.5 xs:gap-4 sm:gap-6 px-1 sm:px-3 py-0.5" aria-label="Main navigation">
          {/* 1. Home */}
          <button
            type="button"
            onClick={onNavHome}
            className={`p-1.5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] transition-colors ${
              activeNavTab === 'home'
                ? 'text-neutral-900 dark:text-[#F3EFEA]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            title="Home - Reset View to Studio"
            aria-label="Home - Reset View to Studio"
          >
            <Home className="w-4 h-4 fill-current" />
          </button>

          {/* 2. Image Generation Mode */}
          <button
            type="button"
            onClick={onSelectImageMode}
            className={`p-1.5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] transition-colors ${
              activeNavTab === 'gallery'
                ? 'text-[#DF856F]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            title="Image Generation Mode"
            aria-label="Image Generation Mode"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* 3. Video Mode */}
          <button
            type="button"
            onClick={onSelectVideoMode}
            className={`p-1.5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] transition-colors ${
              activeNavTab === 'video'
                ? 'text-[#DF856F]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            title="Video Generation Mode"
            aria-label="Video Generation Mode"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* 4. Enhance & Inpaint */}
          <button
            type="button"
            onClick={onOpenEnhance}
            className={`p-1.5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] transition-colors ${
              activeNavTab === 'enhance'
                ? 'text-[#DF856F]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            title="Enhance & Inpainting Tools"
            aria-label="Enhance & Inpainting Tools"
          >
            <Wand2 className="w-4 h-4" />
          </button>

          {/* 5. Library / Collections */}
          <button
            type="button"
            onClick={onOpenLibrary}
            className={`p-1.5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] transition-colors ${
              activeNavTab === 'library'
                ? 'text-[#DF856F]'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            title="Saved Collections & Archive"
            aria-label="Saved Collections & Archive"
          >
            <Folder className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* Right Controls: Gallery, Support, Theme Toggle, Profile Avatar */}
      <div className="order-2 md:order-3 flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 flex-shrink-0">
        {/* Gallery button with BOTH icon and text label visible across all viewports */}
        <button
          type="button"
          onClick={onScrollToGallery}
          className="flex items-center gap-1 sm:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] xs:text-[10.5px] sm:text-[11px] font-medium text-neutral-600 dark:text-[#EDE6E1] bg-white/80 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] rounded-full border border-neutral-200/80 dark:border-[#38332F] shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] flex-shrink-0"
          title="Jump to & Focus Gallery"
          aria-label="Jump to Gallery"
        >
          <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
          <span className="whitespace-nowrap font-medium">Gallery</span>
        </button>

        {/* Support button with BOTH icon and text label visible across all viewports */}
        <button
          type="button"
          onClick={onOpenSupport}
          className="flex items-center gap-1 sm:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] xs:text-[10.5px] sm:text-[11px] font-medium text-neutral-600 dark:text-[#EDE6E1] bg-white/80 dark:bg-[#25211F] hover:bg-white dark:hover:bg-[#2C2825] rounded-full border border-neutral-200/80 dark:border-[#38332F] shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] flex-shrink-0"
          title="Open Help & Support Guide"
          aria-label="Open Support"
        >
          <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
          <span className="whitespace-nowrap font-medium">Support</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-1 xs:p-1.5 sm:p-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] flex-shrink-0"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          )}
        </button>

        {/* Improved Profile Avatar with proper alignment */}
        <div className="relative flex items-center flex-shrink-0" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white dark:border-[#2D2825] shadow-xs ring-1 ring-neutral-200/90 dark:ring-neutral-700/80 hover:ring-2 hover:ring-[#DF856F] dark:hover:ring-[#DF856F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DF856F] cursor-pointer flex items-center justify-center bg-[#FAF5F2] dark:bg-[#25211F] flex-shrink-0 transition-transform active:scale-95"
            aria-expanded={showProfileMenu}
            aria-haspopup="true"
            aria-label="User Account Menu"
          >
            {!avatarError ? (
              <img
                src="/images/avatar.png"
                alt="Creative Studio profile avatar"
                className="w-full h-full object-cover object-center block"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5DFD6] to-[#E8C2B6] dark:from-[#3D2C27] dark:to-[#2B1F1C] text-[#A64A35] dark:text-[#E89380] font-bold text-[10px] xs:text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                CS
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-52 xs:w-56 sm:w-60 bg-white dark:bg-[#1C1918] rounded-2xl shadow-xl border border-neutral-200/80 dark:border-[#332E2A] p-2 sm:p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="px-3 py-2 border-b border-neutral-100 dark:border-[#2E2926] flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#EFE2DA] dark:border-[#3C3632] flex-shrink-0 bg-[#FAF5F2] dark:bg-[#25211F]">
                  {!avatarError ? (
                    <img
                      src="/images/avatar.png"
                      alt="Avatar thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#F5DFD6] text-[#A64A35] font-bold text-xs">
                      CS
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-[#F3EFEA] truncate">
                    Creative Studio
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                    studio@fomi.ai
                  </p>
                  <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#DF856F]/15 text-[#C46750] dark:text-[#E89380] text-[10px] font-semibold rounded-full">
                    Pro Creator Plan
                  </span>
                </div>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onProfileOption('profile');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-[#EDE6E1] hover:bg-neutral-50 dark:hover:bg-[#25211F] rounded-lg text-left cursor-pointer"
                  role="menuitem"
                >
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Workspace Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onProfileOption('preferences');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-700 dark:text-[#EDE6E1] hover:bg-neutral-50 dark:hover:bg-[#25211F] rounded-lg text-left cursor-pointer"
                  role="menuitem"
                >
                  <Settings className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Generation Preferences</span>
                </button>
              </div>

              <div className="pt-1 border-t border-neutral-100 dark:border-[#2E2926]">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onProfileOption('signout');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-[#25211F] rounded-lg text-left cursor-pointer"
                  role="menuitem"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
