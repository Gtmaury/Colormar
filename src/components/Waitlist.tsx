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
    <section id="consultation" className="py-24 md:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200/60 dark:border-slate-800/60 overflow-hidden relative scroll-mt-6">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none dark:bg-orange-500/3" />
      <div className="absolute top-10 left-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none dark:bg-cyan-500/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-50 dark:bg-orange-950/20 px-4 py-2 text-xs md:text-sm text-[#EA580C] dark:text-orange-400 font-bold">
            <Sparkles className="h-4 w-4" />
            <span className="uppercase font-mono tracking-widest">
              {language === 'es' ? 'El Buen Servicio Colormar' : 'The Colormar Good Service'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.consultTitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {t.consultSubtitle}
          </p>
        </div>

        {/* Advisory and Painting Guide Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Color Combinations (Interactive using selectedColor state!) */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-850 bg-slate-50/70 dark:bg-slate-900/40 p-8 sm:p-10 shadow-lg backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 border border-orange-500/20 mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {language === 'es' ? '1. ¿Cómo Combinar Colores?' : '1. How to Combine Colors?'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' 
                  ? 'Te enseñamos a crear armonías perfectas en tus espacios usando tu tono preferido:'
                  : 'We teach you to create perfect harmonies in your spaces using your preferred shade:'}
              </p>

              {/* Dynamic Harmony Card Visualizer */}
              <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-4">
                <div className="flex items-center space-x-3.5 pb-3 border-b border-slate-100 dark:border-slate-850">
                  <span className="h-8 w-8 rounded-xl block shadow-inner border border-white/20" style={{ backgroundColor: selectedColor }} />
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider">
                      {language === 'es' ? 'Color Activo Seleccionado' : 'Active Color Selected'}
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#EA580C] dark:text-orange-400">
                      {selectedColor}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-450 text-left">
                  <div className="flex items-start space-x-2">
                    <span className="h-4 w-4 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-950/40 text-orange-600 text-[9px] font-mono font-bold mt-0.5">M</span>
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-slate-200">
                        {language === 'es' ? 'Monocromático (Elegante y Sutil):' : 'Monochromatic (Elegant & Subtle):'}
                      </p>
                      <p className="mt-1">
                        {language === 'es' 
                          ? `Combina ${selectedColor} con variaciones del mismo tono (más claros o suaves) para un ambiente fluido y sofisticado.`
                          : `Combine ${selectedColor} with softer tints of the same tone for a fluid and sophisticated environment.`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <span className="h-4 w-4 rounded-full flex items-center justify-center bg-sky-100 dark:bg-sky-950/40 text-sky-600 text-[9px] font-mono font-bold mt-0.5">C</span>
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-slate-200">
                        {language === 'es' ? 'Complementario (Contraste Moderno):' : 'Complementary (Modern Contrast):'}
                      </p>
                      <p className="mt-1">
                        {language === 'es' 
                          ? 'Añade un toque dinámico combinándolo con un tono opuesto. Ej:'
                          : 'Add a dynamic touch by combining it with a contrasting opposite shade. E.g:'}
                        <span className="inline-flex items-center space-x-1.5 ml-1 font-bold font-mono text-[#EA580C] dark:text-orange-400 bg-orange-500/5 px-1.5 py-0.5 rounded">
                          <span className="h-2.5 w-2.5 rounded-full block shadow-sm" style={{ backgroundColor: complementary }} />
                          <span>{complementary}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 mt-6 text-left">
              <p className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                <span>{language === 'es' ? 'Consúltanos en tienda por combinaciones análogas.' : 'Ask us in store for analogous combinations.'}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Step-by-Step Guide on How to Paint */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-855 bg-slate-50/70 dark:bg-slate-900/40 p-8 sm:p-10 shadow-lg backdrop-blur-md flex flex-col justify-between lg:scale-105 border-t-4 border-t-orange-500">
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {language === 'es' ? '2. ¿Cómo Pintar Paso a Paso?' : '2. How to Paint Step-by-Step?'}
              </h3>
              <p className="text-sm sm:text-base text-slate-605 dark:text-slate-400 leading-relaxed">
                {language === 'es' 
                  ? 'El éxito de una remodelación radica en seguir una buena técnica de preparación y aplicación:'
                  : 'The success of a remodel lies in following a good preparation and application technique:'}
              </p>

              {/* Steps List */}
              <div className="space-y-4 text-left">
                
                {/* Step 1 */}
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-orange-500 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/10">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-slate-200">
                      {language === 'es' ? 'Preparación de Superficies' : 'Surface Preparation'}
                    </h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                      {language === 'es' 
                        ? 'Limpia la superficie de polvo y humedad. Utiliza nuestras lijas de agua premium (granos finos a gruesos) para eliminar imperfecciones o pintura vieja.'
                        : 'Clean the surface of dust and moisture. Use our premium wet sandpapers (fine to coarse grit) to remove imperfections or old paint.'}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-orange-500 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/10">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-slate-200">
                      {language === 'es' ? 'Protección y Bordes' : 'Protection & Edges'}
                    </h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                      {language === 'es' 
                        ? 'Delimita esquinas y marcos con tirros de enmascarar profesionales que no dejan residuos. Cubre pisos y muebles con paños de limpieza.'
                        : 'Outline corners and frames using professional masking tapes that leave zero residue. Cover floors and furniture with cleaning cloths.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-orange-500 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-orange-500/10">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-850 dark:text-slate-200">
                      {language === 'es' ? 'Aplicación Correcta' : 'Correct Application'}
                    </h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">
                      {language === 'es' 
                        ? 'Usa brochas premium para las esquinas y rodillos antigoteo para áreas amplias. Aplica 2 capas finas, respetando de 2 a 4 horas de secado entre ellas.'
                        : 'Use premium brushes for corners and anti-drip rollers for wide areas. Apply 2 thin coats, waiting 2 to 4 hours of dry time between them.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 mt-6 text-left">
              <p className="text-[11px] text-slate-450 font-mono flex items-center space-x-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{language === 'es' ? '¡Un buen acabado depende del orden y el detalle!' : 'A good finish depends on order and detail!'}</span>
              </p>
            </div>
          </div>

          {/* Column 3: Our Premium In-Store Service */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-850 bg-slate-50/70 dark:bg-slate-900/40 p-8 sm:p-10 shadow-lg backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-6">
                <Paintbrush className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {language === 'es' ? '3. El Buen Servicio de Tienda' : '3. Our In-Store Service'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es' 
                  ? 'En Colormar, no nos limitamos a entregarte una lata de pintura. Te garantizamos asesoría integral:'
                  : 'At Colormar, we don\'t just hand you a can of paint. We guarantee comprehensive advisory support:'}
              </p>

              {/* Service Pillars List */}
              <div className="space-y-4 text-left">
                
                <div className="flex items-start space-x-2.5">
                  <ShieldCheck className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {language === 'es' ? 'Tintometría al Instante: ' : 'Instant Tinting: '}
                    </span>
                    {language === 'es'
                      ? 'Preparamos exactamente el matiz que traigas en mente o el código de color que desees con mezcladores computarizados de precisión.'
                      : 'We prepare exactly the shade you have in mind or the color code you wish using precision computerized mixers.'}
                  </p>
                </div>

                <div className="flex items-start space-x-2.5">
                  <ShieldCheck className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {language === 'es' ? 'Asesores Técnicos: ' : 'Technical Advisors: '}
                    </span>
                    {language === 'es'
                      ? 'Nuestros especialistas te guiarán para elegir el tipo de acabado ideal (mate, satín, brillante) para el hogar, industria o pinturas automotrices.'
                      : 'Our specialists will guide you to choose the ideal finish type (matte, satin, gloss) for home, industrial, or automotive paints.'}
                  </p>
                </div>

                <div className="flex items-start space-x-2.5">
                  <ShieldCheck className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {language === 'es' ? 'Todo en un Solo Lugar: ' : 'All in One Place: '}
                    </span>
                    {language === 'es'
                      ? 'Encuentra las mejores marcas de pintura para el hogar, automotriz, además de rodillos, brochas, lijas, tirros y paños de limpieza.'
                      : 'Find the best paint brands for home, automotive, plus rollers, brushes, sandpaper, masking tape, and cleaning cloths.'}
                  </p>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 mt-6 text-left">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-extrabold text-[#EA580C] dark:text-orange-400 flex items-center space-x-1">
                  <Heart className="h-4.5 w-4.5 fill-current text-orange-500 animate-pulse" />
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
