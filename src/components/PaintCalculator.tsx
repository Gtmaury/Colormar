/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Sparkles } from 'lucide-react';
import { Language, CoverageInput, CoverageOutput } from '../types';
import { TRANSLATIONS } from './translations';

interface PaintCalculatorProps {
  language: Language;
}

export default function PaintCalculator({ language }: PaintCalculatorProps) {
  const t = TRANSLATIONS[language];

  // Initialize input parameters with standard defaults
  const [inputs, setInputs] = useState<CoverageInput>({
    width: 6.0,
    height: 2.8,
    doors: 1,
    windows: 1,
    coats: 2,
    paintType: 'satin'
  });

  const [outputs, setOutputs] = useState<CoverageOutput>({
    wallArea: 0,
    netArea: 0,
    litersNeeded: 0,
    gallonsNeeded: 0,
    cansRecommended: 0
  });

  // Re-run calculations whenever inputs are adjusted
  useEffect(() => {
    // 1. Gross wall area calculations (single coat)
    const grossArea = inputs.width * inputs.height;
    
    // 2. Clear out doors and windows surfaces
    const openingsDiscount = (inputs.doors * 2.0) + (inputs.windows * 1.5);
    
    // 3. Compute Net Painting surface area
    let netSurface = grossArea - openingsDiscount;
    if (netSurface < 1) netSurface = 1; // Safeguard

    // 4. Set target coverage coefficient (m² per Gallon)
    let coveragePerGallon = 38.0; // Silky satin default
    if (inputs.paintType === 'matte') {
      coveragePerGallon = 32.0;
    } else if (inputs.paintType === 'gloss') {
      coveragePerGallon = 40.0;
    }

    // 5. Total coverage surface factoring coats
    const totalPaintedSurfaceArea = netSurface * inputs.coats;

    // 6. Compute exact gallons throwing a 10% safety index
    const gallonsNeeded = (totalPaintedSurfaceArea / coveragePerGallon) * 1.1;
    const litersNeeded = gallonsNeeded * 3.78541; // 1 US Gallon = 3.78541 Liters
    const cansRecommended = Math.ceil(gallonsNeeded);

    setOutputs({
      wallArea: parseFloat(grossArea.toFixed(2)),
      netArea: parseFloat(netSurface.toFixed(2)),
      litersNeeded: parseFloat(litersNeeded.toFixed(2)),
      gallonsNeeded: parseFloat(gallonsNeeded.toFixed(2)),
      cansRecommended: cansRecommended < 1 ? 1 : cansRecommended
    });
  }, [inputs]);

  const handleInputChange = (field: keyof CoverageInput, val: any) => {
    setInputs((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <section id="calculator" className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-1 border border-orange-500/10 bg-orange-500/5 px-3 py-1 rounded-full text-xs text-[#EA580C] dark:text-orange-400 font-mono">
            <Calculator className="h-3.5 w-3.5" />
            <span className="uppercase font-bold tracking-widest">{language === 'es' ? 'Calculadora' : 'Calculator'}</span>
          </div>
          <h2 className="text-2xl font-black md:text-3xl lg:text-4xl tracking-tight leading-none text-slate-900 dark:text-white">
            {t.calcTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.calcSubtitle}
          </p>
        </div>

        {/* Form Calculator grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inputs Section (Left column 5 columns) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            
            {/* Input list sliders */}
            <div className="space-y-5">
              
              {/* Width Slider */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>{t.calcWidth}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm">{inputs.width} m</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="0.5"
                  value={inputs.width}
                  onChange={(e) => handleInputChange('width', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F97316]"
                />
              </div>

              {/* Height Slider */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>{t.calcHeight}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm">{inputs.height} m</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="10"
                  step="0.1"
                  value={inputs.height}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F97316]"
                />
              </div>

              {/* Number of Doors */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>{t.calcDoors}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm">{inputs.doors}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={inputs.doors}
                  onChange={(e) => handleInputChange('doors', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F97316]"
                />
              </div>

              {/* Number of Windows */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>{t.calcWindows}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm">{inputs.windows}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={inputs.windows}
                  onChange={(e) => handleInputChange('windows', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#F97316]"
                />
              </div>

              {/* Number of Coats */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  <span>{t.calcCoats}</span>
                  <span className="text-orange-600 dark:text-orange-400 text-sm">{inputs.coats}</span>
                </div>
                <div className="flex space-x-3.5">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleInputChange('coats', num)}
                      className={`flex-1 py-1 px-3 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                        inputs.coats === num
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-slate-900'
                          : 'bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {num} {num === 1 ? (language === 'es' ? 'capa' : 'coat') : (language === 'es' ? 'capas' : 'coats')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paint Finish Type with coverage coefficients */}
              <div className="space-y-1.5 text-left pt-2">
                <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  {t.calcPaintType}
                </label>
                <select
                  value={inputs.paintType}
                  onChange={(e) => handleInputChange('paintType', e.target.value)}
                  className="w-full text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-3.5 py-3 text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="matte">{t.paintTypeMatte}</option>
                  <option value="satin">{t.paintTypeSatin}</option>
                  <option value="gloss">{t.paintTypeGloss}</option>
                </select>
              </div>

            </div>

            {/* Scientific disclaimer tag */}
            <div className="text-[10px] text-slate-400 font-mono text-left leading-tight border-t border-slate-100 dark:border-slate-800 pt-4 flex items-start space-x-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                {language === 'es' 
                  ? 'El cálculo asume mampostería standard previamente sellada. El rinde puede variar hasta un 5% de acuerdo a la rugosidad y porosidad de la pared.'
                  : 'Calculation assumes standard dry, sealed masonry. Real consumption might vary within 5% due to wall porousness, texture and moisture.'}
              </span>
            </div>

          </div>

          {/* Outputs / Results displays (Right column 7 columns) */}
          <div className="lg:col-span-6 bg-slate-900 dark:bg-[#090f1a] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-slate-800">
            
            {/* Soft decorative background spotlight */}
            <div className="absolute [-z-1] top-1/4 right-0 h-40 w-40 bg-[#06B6D4]/10 rounded-full blur-[60px]" />
            
            <div className="space-y-6 text-left">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-base font-black uppercase tracking-widest text-[#F97316]">
                  {t.calcResultsTitle}
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Live Matrix
                </span>
              </div>

              {/* Data list rows */}
              <div className="space-y-4 font-mono text-xs text-slate-350">
                
                {/* Gross area row */}
                <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                  <span>{t.calcAreaWalls}</span>
                  <span className="text-white font-extrabold text-sm">{outputs.wallArea} m²</span>
                </div>

                {/* Subtractions openings row */}
                <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                  <span>{t.calcAreaOpenings}</span>
                  <span className="text-[#EF4444] font-extrabold text-sm">
                    -{((inputs.doors * 2.0) + (inputs.windows * 1.5)).toFixed(1)} m²
                  </span>
                </div>

                {/* Net Area row */}
                <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                  <span className="text-slate-150 font-bold">{t.calcAreaNet}</span>
                  <span className="text-[#06B6D4] font-black text-base">{outputs.netArea} m²</span>
                </div>

                {/* Volume of painting layout (Liters) */}
                <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                  <span>{t.calcLitersNeeded}</span>
                  <span className="text-white font-extrabold text-sm">{outputs.litersNeeded} L</span>
                </div>

                {/* Equivalent in Gallons */}
                <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                  <span>{t.calcGallonsNeeded}</span>
                  <span className="text-white font-extrabold text-sm">{outputs.gallonsNeeded} Gal</span>
                </div>

              </div>
              
              {/* Giant recommended order callout card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-left space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#FACC15] uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span>{t.calcCansRecommended}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {outputs.cansRecommended}{' '}
                  {outputs.cansRecommended === 1 ? t.gansSingle.toUpperCase() : t.gansPlural.toUpperCase()}
                </div>
                <p className="text-[11px] text-slate-400 leading-normal font-sans pt-1">
                  {t.calcCansRecommendationDetail
                    .replace('{cans}', outputs.cansRecommended.toString())
                    .replace('{cansLabel}', outputs.cansRecommended === 1 ? t.gansSingle : t.gansPlural)}
                </p>
              </div>

            </div>

            {/* Quote Action CTA */}
            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white hover:brightness-105 py-3.5 px-6 rounded-xl font-extrabold text-center uppercase tracking-widest text-xs cursor-pointer shadow-md transition-all duration-150 active:scale-98"
              >
                {language === 'es' ? 'Adquirir Envases en el Catálogo' : 'Acquire Packages in the Catalog'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
