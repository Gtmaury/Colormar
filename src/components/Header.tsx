/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Palette, Globe, Layers, PhoneCall } from 'lucide-react';
import ToucanLogo from './ToucanLogo';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onScrollToSection: (id: string) => void;
  currentView?: 'home' | 'catalog';
}

export default function Header({ language, onLanguageChange, onScrollToSection, currentView }: HeaderProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0f172a]/90 shadow-sm transition-colors duration-300">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand with responsive custom SVG logo */}
        <div 
          onClick={() => onScrollToSection('home')} 
          className="flex cursor-pointer items-center transition-transform hover:scale-[1.02]"
          id="header-logo"
        >
          <ToucanLogo showText={false} className="h-9 w-auto sm:hidden" />
          <ToucanLogo showText={true} className="h-9 sm:h-11 w-auto hidden sm:flex" />
        </div>

        {/* Desktop Bilingual Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <button 
            onClick={() => onScrollToSection('visualizer')} 
            className="text-sm font-semibold tracking-wide text-slate-600 hover:text-[#F97316] dark:text-slate-300 dark:hover:text-[#FACC15] transition-colors cursor-pointer"
            id="nav-visualizer"
          >
            {t.navColors}
          </button>
          <button 
            onClick={() => onScrollToSection('features')} 
            className="text-sm font-semibold tracking-wide text-slate-600 hover:text-[#F97316] dark:text-slate-300 dark:hover:text-[#FACC15] transition-colors cursor-pointer"
            id="nav-features"
          >
            {t.navFeatures}
          </button>
          <button 
            onClick={() => onScrollToSection('catalog')} 
            className={`text-sm font-bold tracking-wide transition-colors cursor-pointer ${
              currentView === 'catalog'
                ? 'text-[#F97316] dark:text-[#FACC15]'
                : 'text-slate-600 hover:text-[#F97316] dark:text-slate-300 dark:hover:text-[#FACC15]'
            }`}
            id="nav-catalog"
          >
            {t.navCatalog}
          </button>

          <button 
            onClick={() => onScrollToSection('faq')} 
            className="text-sm font-semibold tracking-wide text-slate-600 hover:text-[#F97316] dark:text-slate-300 dark:hover:text-[#FACC15] transition-colors cursor-pointer"
            id="nav-faq"
          >
            {t.navFaq}
          </button>
        </nav>

        {/* Global Controls & Translation Button */}
        <div className="flex items-center space-x-2 xl:space-x-3">
          


          {/* Core Language Switcher with active animation */}
          <button
            onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
            className="relative inline-flex items-center space-x-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-200 cursor-pointer active:scale-95 group"
            id="lang-toggle-btn"
            title={t.langSub}
          >
            <Globe className="h-3.5 w-3.5 text-slate-500 group-hover:text-orange-500 transition-colors animate-[spin_10s_linear_infinite]" />
            <span className="uppercase tracking-wider">{language === 'es' ? 'EN' : 'ES'}</span>
            <span className="text-slate-400">|</span>
            <span className="text-[10px] font-semibold text-orange-600 dark:text-orange-400">
              {language === 'es' ? 'English' : 'Español'}
            </span>
          </button>

          {/* Quick Quote Scroll-Button to Catalog */}
          <button
            onClick={() => onScrollToSection('catalog')}
            className="inline-flex items-center justify-center space-x-1.5 rounded-full bg-gradient-to-r from-[#F97316] to-[#EF4444] px-4 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-105 active:scale-95 transition-all duration-150 cursor-pointer"
            id="header-cta"
          >
            <Palette className="h-3.5 w-3.5" />
            <span className="hidden xs:inline uppercase tracking-wider">{language === 'es' ? 'Pintar' : 'Paint'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
