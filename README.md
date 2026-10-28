# Fomi AI Content Generation — Part A Assessment (Next.js & JavaScript)

A pixel-faithful recreation and interactive frontend implementation of the Fomi AI creative content generation workspace, fully migrated to **Next.js App Router** with pure **JavaScript**.

---

## 🎨 Design Reproduction & Quality Improvements

### 1. High-Resolution Portrait Imagery
- All 8 gallery portraits are **sharp, high-resolution portrait photography assets** matching the prompt description:
  - 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair.
  - Cream-colored cashmere knit sweater and delicate gold hoop earrings.
  - Natural smiling and candid expressions across all 8 variations.
  - Soft, neutral art gallery studio background with directional lighting.
  - Portrait aspect ratio (`3:4`) with `object-fit: cover` and zero pixelation or stretching.

### 2. Layout Proportions & Spacing Refined
- **Header**: Responsive layout with Fomi logo, navigation icons, visible Gallery and Support labels across all viewports, bidirectional smooth 300ms theme toggle, and a sharp 40px/36px circular avatar.
- **History Strip**: 14 square thumbnails with rounded corners, left History header with "View All" label, vertical divider, and smooth horizontal scrolling.
- **Generation Control Panel**:
  - Image/Video segmented switcher.
  - Multiline prompt textarea without top clipping or awkward scrollbars.
  - Terracotta `✦ Generate` button neatly positioned in the lower-right of the prompt box.
  - `# Images ⌄`, `1:1 ⌄`, and `Model: Name ⌄` compact controls with clear unclipped text.
  - Expandable `Advance ⌄` (CFG scale slider, seed randomizer, negative prompt).
  - Expandable `Styles ⌄` (interactive style tag pills).
- **Gallery**: 4 columns on row 1, 4 columns on row 2 (total 8 portrait images) with active selection ring, hover quick actions (copy seed/prompt, download image, zoom), and accessible keyboard preview modal.

---

## 🛠️ Framework, Architecture & Language

- **Framework**: **Next.js 15 (App Router)**
- **Language**: **JavaScript (`.js` / `.jsx`)**
- **Routing**: `app/layout.js`, `app/page.js`, `app/not-found.js`
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss` and smooth 300ms cubic-bezier theme transitions
- **Font**: `Plus_Jakarta_Sans` imported via `next/font/google`
- **State Management**: Shared React client state with `localStorage` persistence for theme and history

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css              # Global styles, Tailwind v4, & smooth theme transitions
│   ├── layout.js                # Root layout with SEO metadata, fonts & zero-flash script
│   ├── not-found.js             # Standard Next.js 404 page
│   └── page.js                  # App Router page route ('use client')
├── src/
│   ├── App.js                   # Main workspace state coordinator
│   ├── components/
│   │   ├── AppHeader.jsx        # Top navigation with logo, indicator & controls
│   │   ├── HistoryStrip.jsx     # Horizontal history row with 14 thumbnails
│   │   ├── GenerationPanel.jsx  # Left generation controls & prompt input
│   │   ├── PromptDescription.jsx# Middle prompt display & Model button
│   │   ├── ImageGallery.jsx     # 4x2 grid of 8 portrait variations
│   │   ├── ImagePreviewModal.jsx# Accessible high-res image modal with arrow keys
│   │   ├── SupportDialog.jsx    # Help dialog & keyboard shortcut guide
│   │   ├── ModelDetailsModal.jsx# Model architecture & parameter specifications
│   │   ├── EnhanceModal.jsx     # Prompt enhancement presets dialog
│   │   └── LibraryModal.jsx     # Full saved generation archive modal
│   └── data/
│       └── mockData.js          # Prompts, history items, models, and image data
├── public/
│   ├── images/                  # High-resolution portrait cards, avatar & thumbnails
│   └── assets/                  # Assessment reference assets
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration for Tailwind CSS v4
├── jsconfig.json                # JavaScript module alias configuration (@/*)
├── package.json                 # Next.js scripts and dependencies
└── README.md
```

---

## 🚀 Running Locally & Verification

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
The production build compiles optimized static pages for `/` and `/_not-found`.

---

## 🚢 Deploying to Vercel

1. Push your code to GitHub.
2. Import repository in [vercel.com/new](https://vercel.com/new).
3. Vercel automatically detects Next.js App Router and executes `next build`.
4. Click **Deploy**.
