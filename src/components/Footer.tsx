/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';
import ToucanLogo from './ToucanLogo';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-800 pb-10">
          
          {/* Column 1: Brand Wordmark with responsive logo */}
          <div className="md:col-span-4 space-y-4 text-left">
            <ToucanLogo showText={false} className="h-10 w-auto sm:hidden" />
            <ToucanLogo showText={true} className="h-10 w-auto hidden sm:flex" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans pt-2">
              {t.footDesc}
            </p>
            

          </div>

          {/* Column 2: Operation & Store Hours */}
          <div className="md:col-span-4 space-y-3.5 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F97316] dark:text-[#FACC15]">
              {t.footHours}
            </h4>
            <p className="text-sm text-slate-200">
              {t.footHoursValue}
            </p>
            <div className="flex items-start space-x-2 pt-2 border-t border-slate-800 max-w-sm">
              <MapPin className="h-4.5 w-4.5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-400">
                <span className="block font-bold text-slate-300 uppercase font-mono text-[9px] tracking-wider mb-0.5">{t.footAddress}</span>
                <span>{t.footAddressValue}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Customer Care */}
          <div className="md:col-span-4 space-y-3.5 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F97316] dark:text-[#FACC15]">
              {language === 'es' ? 'Canales Oficiales' : 'Official Channels'}
            </h4>
            
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2.5 text-xs">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="font-mono text-slate-300 font-bold">{t.footContactValue}</span>
              </div>
            </div>


          </div>

        </div>

        {/* Lower Row Copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-mono text-slate-600 uppercase text-center sm:text-left gap-4">
          <div>
            {t.footCopyright.replace('{year}', new Date().getFullYear().toString())}
          </div>
          <div>
            <a 
              href="https://www.facebook.com/profile.php?id=61579430716220" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#F97316] transition-colors font-bold normal-case text-slate-500"
            >
              {language === 'es' ? 'Creado por Mauricio González' : 'Created by Mauricio González'}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
