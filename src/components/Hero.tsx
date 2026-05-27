/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Palette, Shield, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { COLOR_PALETTE } from '../data';
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

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      
      {/* Dynamic colorful decorative mesh shadows inspired by toucan colors */}
      <div className="absolute top-1/6 left-[-10%] -z-10 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px] dark:bg-orange-500/5" />
      <div className="absolute top-1/4 right-[-10%] -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] dark:bg-cyan-500/5" />
      <div className="absolute top-1/2 left-1/3 -z-10 h-[354px] w-[354px] rounded-full bg-yellow-500/10 blur-[130px] dark:bg-yellow-500/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Two-column responsive layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Column 1: Copy Block */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-7">
            
            {/* Promo banner badge */}
            <div className="inline-flex self-start items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-50 dark:bg-orange-950/20 px-4 py-2 text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400">
              <Sparkles className="h-4 w-4" />
              <span className="tracking-widest uppercase font-mono">{t.heroBadgeText}</span>
            </div>

            {/* Core catchy headline */}
            <h1 className="font-sans text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl xl:text-6xl md:text-7xl leading-tight">
              {language === 'es' ? 'La sofisticación del ' : 'The sophistication of '}
              <span className="bg-gradient-to-r from-[#F97316] via-[#FACC15] to-[#06B6D4] bg-clip-text text-transparent">
                {language === 'es' ? 'color arquitectónico' : 'architectural color'}
              </span>{' '}
              {language === 'es' ? 'con la fuerza de la naturaleza.' : 'with the strength of nature.'}
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-slate-655 dark:text-slate-350 leading-relaxed max-w-3xl">
              {t.heroSubtitle}
            </p>

            {/* Quick-select color splash launcher */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-sm max-w-2xl">
              <span className="text-xs md:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-4">
                {language === 'es' ? '• PINCHA UN TONO TUCÁN PARA PROBARLO EN VIVO:' : '• PICK A TOUCAN TONE TO TEST LIVE:'}
              </span>
              <div className="flex flex-wrap gap-4">
                {featuredColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      onSelectColor(color.hex);
                      onScrollToSection('visualizer');
                    }}
                    className="flex items-center space-x-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-orange-500 dark:hover:border-orange-400 p-2.5 transition-all duration-150 cursor-pointer text-left active:scale-95 shadow-sm"
                    title={language === 'es' ? `Cargar ${color.nameEs}` : `Load ${color.nameEn}`}
                  >
                    <span 
                      className="h-8 w-8 rounded-lg block shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="pr-2">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-none">
                        {language === 'es' ? color.nameEs : color.nameEn}
                      </p>
                      <p className="text-[10px] sm:text-xs font-mono text-slate-400 font-semibold mt-1">{color.hex}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4.5 pt-3">
              <button
                onClick={() => onScrollToSection('visualizer')}
                className="inline-flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EF4444] px-8 py-4 text-base sm:text-lg font-black text-white hover:brightness-105 shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-98 cursor-pointer transition-all uppercase tracking-widest"
                id="hero-primary-cta"
              >
                <Palette className="h-6 w-6 fill-current" />
                <span>{t.heroCtaVisualizer}</span>
              </button>

              <button
                onClick={() => onScrollToSection('catalog')}
                className="inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#F97316] dark:hover:border-[#FACC15] bg-white dark:bg-slate-900 px-8 py-4 text-base sm:text-lg font-black text-slate-700 dark:text-slate-200 cursor-pointer transition-colors hover:text-[#F97316] dark:hover:text-[#FACC15] uppercase tracking-widest"
                id="hero-secondary-cta"
              >
                <span>{t.heroCtaCatalog}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>

          {/* Column 2: Interactive Paint Can mock / Colorful Visualizer Splash */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl transition-all duration-300 hover:shadow-2xl">
              
              {/* Main design mockup rendering the classic "Colormar Paint Bucket" */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex flex-col justify-between p-6 text-white border border-slate-800 shadow-inner">
                
                {/* Paint Bucket handle style lines */}
                <div className="absolute top-0 inset-x-0 h-4 bg-slate-800/80 border-b border-black/40 flex items-center justify-center">
                  <span className="w-16 h-1 bg-slate-600 rounded-full" />
                </div>
                
                {/* Decorative colored fluid paint overflow splash */}
                <div className="absolute top-4 left-10 w-24 h-28 bg-[#F97316] rounded-b-3xl opacity-90 filter blur-[1px] animate-pulse" />
                <div className="absolute top-4 left-24 w-12 h-16 bg-[#FACC15] rounded-b-2xl opacity-90 filter blur-[1px]" />
                <div className="absolute top-4 left-32 w-16 h-36 bg-[#06B6D4] rounded-b-3xl opacity-80 filter blur-[1px]" />

                {/* Brand label & toucan on bucket */}
                <div className="z-10 mt-12 flex items-center space-x-2 bg-slate-900/80 border border-slate-800 backdrop-blur-sm self-start rounded-lg px-3 py-1.5 shadow-md">
                  <span className="h-4.5 w-4.5 rounded-full bg-gradient-to-r from-[#FACC15] via-[#F97316] to-[#EF4444] inline-block" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#FACC15]">COLORMAR® PREMIUM 10A</span>
                </div>

                {/* Giant elegant text label on bucket */}
                <div className="z-10 text-left space-y-1">
                  <div className="text-3xl font-black tracking-tighter text-slate-100 uppercase">
                    {language === 'es' ? 'MÁXIMA' : 'MAXIMUM'}
                  </div>
                  <div className="text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text uppercase">
                    {language === 'es' ? 'PROTECCIÓN' : 'PROTECTION'}
                  </div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    {language === 'es' ? 'Látex Acrílico Hidrófugo' : 'Hydrophobic Acrylic Latex'}
                  </div>
                </div>

                {/* Mini bar on footer bucket */}
                <div className="z-10 flex justify-between items-center bg-slate-950/60 border border-slate-800 px-3.5 py-2 rounded-lg backdrop-blur-xs">
                  <div className="flex space-x-1">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 font-bold">1 U.S. GALLON (3.785 L)</span>
                </div>
              </div>

              {/* Technical badges under the mockup bucket */}
              <div className="grid grid-cols-2 gap-3.5 mt-5">
                <div className="flex items-center space-x-2 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-2.5 rounded-xl text-left">
                  <Shield className="h-5 w-5 text-[#F97316] flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-none">10 Años de Garantía</h4>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">10-Year Active Guard</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-2.5 rounded-xl text-left">
                  <CheckCircle2 className="h-5 w-5 text-[#06B6D4] flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-none">Cero VOC Holístico</h4>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Zero-VOC Breath-Safe</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
