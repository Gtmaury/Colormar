/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, BookOpen, Paintbrush, ShieldCheck, Check, Heart, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';

interface WaitlistProps {
  language: Language;
  selectedColor: string;
}

export default function Waitlist({ language, selectedColor }: WaitlistProps) {
  const t = TRANSLATIONS[language];

  // Helper to calculate analogous or complementary colors for aesthetic UI preview
  const getComplementaryColor = (hex: string) => {
    // Basic fallback colors for nice contrast
    if (hex === '#F97316' || hex.toLowerCase() === '#ea580c') return '#0284C7'; // Blue Sky
    if (hex === '#EAB308') return '#6366F1'; // Violet
    if (hex === '#22C55E') return '#EC4899'; // Pink
    if (hex === '#3B82F6') return '#F97316'; // Orange
    if (hex === '#EC4899') return '#22C55E'; // Green
    
    // Default complement simple invert
    try {
      const cleanHex = hex.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    } catch {
      return '#0284C7';
    }
  };

  const complementary = getComplementaryColor(selectedColor);

  return (
    <section id="consultation" className="relative lg:min-h-[calc(100vh-72px)] flex flex-col justify-center py-14 md:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200/60 dark:border-slate-800/60 relative scroll-mt-20">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none dark:bg-orange-500/3" />
      <div className="absolute top-10 left-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none dark:bg-cyan-500/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 lg:mb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 border border-orange-500/10 bg-orange-500/5 px-3 py-1.5 rounded-full text-xs text-[#EA580C] dark:text-orange-400 font-mono mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="uppercase font-bold tracking-widest">
              {language === 'es' ? 'El Buen Servicio Colormar' : 'The Colormar Good Service'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.consultTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {t.consultSubtitle}
          </p>
        </div>

        {/* Advisory and Painting Guide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Color Combinations */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-7 shadow-md backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {language === 'es' ? '1. ¿Cómo Combinar Colores?' : '1. How to Combine Colors?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' 
                  ? 'Te enseñamos a crear la combinación perfecta para tus espacios. Aprende a utilizar tonos monocromáticos para lograr elegancia y tranquilidad, o contrastes complementarios para dar dinamismo y estilo moderno a tus ambientes con tu color preferido.'
                  : 'We teach you how to create the perfect combination for your spaces. Learn to use monochromatic tones for elegance and tranquility, or complementary contrasts to add dynamism and modern style to your environments using your preferred color.'}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 mt-4 text-left">
              <p className="text-[11px] text-slate-400 font-mono flex items-center space-x-1">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                <span>{language === 'es' ? 'Consúltanos en tienda por combinaciones análogas.' : 'Ask us in store for analogous combinations.'}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Step-by-Step Guide on How to Paint */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-7 shadow-md backdrop-blur-md flex flex-col justify-between border-t-4 border-t-orange-500">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {language === 'es' ? '2. ¿Cómo Pintar Paso a Paso?' : '2. How to Paint Step-by-Step?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' 
                  ? 'Para un acabado profesional, sigue una técnica impecable: prepara la pared limpiándola de polvo y humedad, delimita los bordes con cinta de enmascarar de alta calidad, y aplica dos capas delgadas de pintura respetando el tiempo de secado recomendado.'
                  : 'For a professional finish, follow an impeccable technique: prepare the wall by cleaning it of dust and moisture, outline the edges with high-quality masking tape, and apply two thin coats of paint, respecting the recommended drying times.'}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 mt-4 text-left">
              <p className="text-[11px] text-slate-400 font-mono flex items-center space-x-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>{language === 'es' ? '¡Un buen acabado depende del orden y el detalle!' : 'A good finish depends on order and detail!'}</span>
              </p>
            </div>
          </div>

          {/* Column 3: Our Premium In-Store Service */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-7 shadow-md backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-4">
                <Paintbrush className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {language === 'es' ? '3. El Buen Servicio de Tienda' : '3. Our In-Store Service'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' 
                  ? 'En nuestras tiendas Colormar te ofrecemos asesoría integral: preparamos el tono exacto que buscas en minutos mediante tintometría computarizada y te equipamos con todos los insumos necesarios como rodillos, brochas, lijas y paños en un solo lugar.'
                  : 'At our Colormar stores we offer comprehensive advisory support: we prepare the exact shade you seek in minutes using computerized tinting and equip you with all necessary supplies like rollers, brushes, sandpapers, and cloths in one place.'}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 mt-4 text-left">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-mono font-extrabold text-[#EA580C] dark:text-orange-400 flex items-center space-x-1">
                  <Heart className="h-4 w-4 fill-current text-orange-500 animate-pulse" />
                  <span>{language === 'es' ? '¡Visítanos hoy mismo!' : 'Visit us today!'}</span>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
