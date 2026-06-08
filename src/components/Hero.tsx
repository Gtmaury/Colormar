/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Palette, Sparkles, ChevronRight } from 'lucide-react';
import { COLOR_PALETTE, PRODUCTS } from '../data';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';

interface HeroProps {
  language: Language;
  onScrollToSection: (id: string) => void;
  onSelectColor: (hex: string) => void;
}

export default function Hero({ language, onScrollToSection, onSelectColor }: HeroProps) {
  const t = TRANSLATIONS[language];

  // Pick first 4 exotic toucan/tropical colors to display in the live hero picker
  const featuredColors = COLOR_PALETTE.slice(0, 4);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Duplicate the products array to ensure a long continuous flow
  const carouselProducts = React.useMemo(() => {
    return [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS];
  }, []);

  // Continuous smooth auto-scrolling logic (user cannot scroll it manually as overflow-x-hidden is set)
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    const scrollSpeed = 0.25; // Pixels per frame (slower, extremely smooth scroll)
    let scrollPos = 0;

    const scroll = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (maxScrollLeft > 0) {
        scrollPos += scrollSpeed;
        if (scrollPos >= maxScrollLeft - 1) {
          scrollPos = 0;
        }
        container.scrollLeft = Math.floor(scrollPos);
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-4 pb-6 md:pt-6 md:pb-8 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      
      {/* Dynamic colorful decorative mesh shadows inspired by toucan colors */}
      <div className="absolute top-1/6 left-[-10%] -z-10 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px] dark:bg-orange-500/5" />
      <div className="absolute top-1/4 right-[-10%] -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] dark:bg-cyan-500/5" />
      <div className="absolute top-1/2 left-1/3 -z-10 h-[354px] w-[354px] rounded-full bg-yellow-500/10 blur-[130px] dark:bg-yellow-500/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Two-column responsive layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Column 1: Copy Block (occupying 5 columns, tighter spacing for viewport fit) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-5">
            
            {/* Promo banner badge */}
            <div className="inline-flex self-start items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-50 dark:bg-orange-950/20 px-3.5 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
              <Sparkles className="h-4 w-4" />
              <span className="tracking-widest uppercase font-mono">{t.heroBadgeText}</span>
            </div>

            {/* Core catchy headline */}
            <h1 className="font-sans text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
              {language === 'es' ? 'La sofisticación del ' : 'The sophistication of '}
              <span className="bg-gradient-to-r from-[#F97316] via-[#FACC15] to-[#06B6D4] bg-clip-text text-transparent">
                {language === 'es' ? 'color arquitectónico' : 'architectural color'}
              </span>{' '}
              {language === 'es' ? 'con la fuerza de la naturaleza.' : 'with the strength of nature.'}
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-350 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={() => onScrollToSection('visualizer')}
                className="inline-flex items-center justify-center space-x-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EF4444] px-6 py-3 text-sm sm:text-base font-extrabold text-white hover:brightness-105 shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-98 cursor-pointer transition-all uppercase tracking-wider"
                id="hero-primary-cta"
              >
                <Palette className="h-5 w-5 fill-current" />
                <span>{t.heroCtaVisualizer}</span>
              </button>

              <button
                onClick={() => onScrollToSection('catalog')}
                className="inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#F97316] dark:hover:border-[#FACC15] bg-white dark:bg-slate-900 px-6 py-3 text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-200 cursor-pointer transition-colors hover:text-[#F97316] dark:hover:text-[#FACC15] uppercase tracking-wider"
                id="hero-secondary-cta"
              >
                <span>{t.heroCtaCatalog}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Column 2: Auto-scrolling Showcase Product Carousel (borderless, 3 rows, very compact for viewport fit) */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div 
              className="relative w-full max-w-2xl lg:max-w-none rounded-3xl bg-white/40 dark:bg-slate-900/30 p-4 shadow-xl backdrop-blur-md overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)'
              }}
            >
              
              {/* Fade overlays to blur left/right edges elegantly towards the title */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent dark:from-slate-950 dark:via-slate-950/50 pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-slate-50/20 to-transparent dark:from-slate-950/20 pointer-events-none z-10" />



              {/* Marquee area - overflow-x-hidden ensures the user cannot scroll/swipe it */}
              <div 
                ref={scrollContainerRef}
                className="w-full overflow-x-hidden no-scrollbar pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="grid grid-rows-3 grid-flow-col gap-3 w-max">
                  {carouselProducts.map((p, index) => {
                    const productName = language === 'es' ? p.nameEs : p.nameEn;

                    return (
                      <div
                        key={`${p.id}-${index}`}
                        className="w-32 sm:w-44 h-28 sm:h-36 overflow-hidden rounded-2xl bg-transparent flex items-center justify-center relative"
                        title={productName}
                      >
                        <img
                          src={p.image}
                          alt={productName}
                          loading="lazy"
                          className="h-full w-full object-cover rounded-2xl shadow-md border border-slate-200/60 dark:border-slate-800"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
