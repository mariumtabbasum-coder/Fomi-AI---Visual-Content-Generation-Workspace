import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Fomi AI - Visual Content Generation Workspace',
  description:
    'Fomi AI creative workspace for high-fidelity portrait and visual content generation, featuring history strip, generation controls, and prompt-based image gallery.',
  openGraph: {
    title: 'Fomi AI - Visual Content Generation Workspace',
    description:
      'Fomi AI creative workspace for high-fidelity portrait and visual content generation, featuring history strip, generation controls, and prompt-based image gallery.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('fomi_theme');if(s==='dark'){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-[#FAF7F4] dark:bg-[#0E0D0C] text-[#1E1E1E] dark:text-[#F3EFEA] antialiased selection:bg-[#F3C4B8] selection:text-[#52251D]">
        {children}
      </body>
    </html>
  );
}
