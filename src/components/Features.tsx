/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Home,
  Car,
  Paintbrush
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';

interface FeaturesProps {
  language: Language;
}

export default function Features({ language }: FeaturesProps) {
  const t = TRANSLATIONS[language];

  // List of high quality features mapping to beautiful icons matching distributor model
  const featuresList = [
    {
      icon: Home,
      colorClass: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      title: t.feat1Title,
      desc: t.feat1Desc,
    },
    {
      icon: Car,
      colorClass: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      title: t.feat2Title,
      desc: t.feat2Desc,
    },
    {
      icon: Paintbrush,
      colorClass: 'text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20',
      title: t.feat3Title,
      desc: t.feat3Desc,
    },
  ];

  return (
    <section id="features" className="relative lg:min-h-[calc(100vh-72px)] flex flex-col justify-center py-14 md:py-16 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60 relative scroll-mt-20">
      
      {/* Soft decorative background spotlight matching the logo */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-80 w-85 rounded-full bg-orange-500/5 blur-[120px] pointer-events-none dark:bg-orange-500/3" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none dark:bg-cyan-500/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 lg:mb-8 space-y-4">
          <span className="text-xs md:text-sm font-mono tracking-widest text-[#F97316] uppercase font-bold bg-orange-50 dark:bg-orange-950/20 px-3 py-1.5 rounded-full border border-orange-500/20">
            {language === 'es' ? 'Marcas y Servicios Especializados' : 'Specialized Brands & Services'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.featTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.featSubtitle}
          </p>
        </div>

        {/* Responsive Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, index) => {
            const IconComponent = feat.icon;
            
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/60 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316] dark:hover:border-[#FACC15] hover:bg-white hover:shadow-xl dark:hover:bg-slate-900"
                id={`feature-card-${index}`}
              >
                
                {/* Icon Container with active colors */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${feat.colorClass} transition-colors mb-5`}>
                  <IconComponent className="h-5 w-5" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#F97316] dark:group-hover:text-[#FACC15] transition-colors leading-snug">
                  {feat.title}
                </h3>
                
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                  {feat.desc}
                </p>

                {/* Decorative painted line accent */}
                <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-[#F97316] to-[#EF4444] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
