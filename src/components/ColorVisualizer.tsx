/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sliders, Check, Eye, HelpCircle, Palette } from 'lucide-react';
import { COLOR_PALETTE } from '../data';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';

interface ColorVisualizerProps {
  language: Language;
  selectedColor: string;
  onSelectColor: (hex: string) => void;
  onScrollToSection: (id: string) => void;
  onTriggerQuote: (productName: string, colorHex: string, colorName: string) => void;
}

export default function ColorVisualizer({
  language,
  selectedColor,
  onSelectColor,
  onScrollToSection,
  onTriggerQuote
}: ColorVisualizerProps) {
  const t = TRANSLATIONS[language];

  const [activeRoom, setActiveRoom] = useState<'living' | 'kitchen' | 'bedroom'>('living');
  const [rgb, setRgb] = useState({ r: 249, g: 115, b: 22 }); // Start with Toucan Orange RGB

  // Keep RGB sliders synchronized if user selects preset colors
  useEffect(() => {
    const hex = selectedColor.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        setRgb({ r, g, b });
      }
    }
  }, [selectedColor]);

  // Handle slider edits and update hex color
  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const updated = { ...rgb, [channel]: val };
    setRgb(updated);
    
    // Hex conversion holding exact matching padding strings
    const rHex = updated.r.toString(16).padStart(2, '0');
    const gHex = updated.g.toString(16).padStart(2, '0');
    const bHex = updated.b.toString(16).padStart(2, '0');
    const computedHex = `#${rHex}${gHex}${bHex}`.toUpperCase();
    onSelectColor(computedHex);
  };

  // Find active color title or construct "Bespoke formula"
  const activeColorObject = COLOR_PALETTE.find(c => c.hex.toLowerCase() === selectedColor.toLowerCase());
  const activeColorName = activeColorObject
    ? (language === 'es' ? activeColorObject.nameEs : activeColorObject.nameEn)
    : (language === 'es' ? 'Fórmula de Autor Personalizada' : 'Bespoke Custom Blend');

  return (
    <section id="visualizer" className="relative lg:min-h-[calc(100vh-72px)] flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 border-b border-slate-200/60 dark:border-slate-800/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title details */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-6 lg:mb-8">
          <div className="inline-flex items-center space-x-2 border border-orange-500/10 bg-orange-500/5 px-3 py-1.5 rounded-full text-xs text-[#EA580C] dark:text-orange-400 font-mono mb-2">
            <Eye className="h-4 w-4" />
            <span className="uppercase font-bold tracking-widest">{t.navColors}</span>
          </div>
          <h2 className="text-2xl font-black md:text-3xl lg:text-4xl tracking-tight leading-tight text-slate-900 dark:text-white">
            {t.visTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.visSubtitle}
          </p>
        </div>

        {/* Workspace board: 2-column visualizer panel */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Interactive Room rendering (SVG illustration) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Room Selector Tab pills */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                {t.visChooseRoom}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveRoom('living')}
                  className={`py-2 px-3.5 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                    activeRoom === 'living'
                      ? 'bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {t.roomLiving}
                </button>
                <button
                  onClick={() => setActiveRoom('kitchen')}
                  className={`py-2 px-3.5 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                    activeRoom === 'kitchen'
                      ? 'bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {t.roomKitchen}
                </button>
                <button
                  onClick={() => setActiveRoom('bedroom')}
                  className={`py-2 px-3.5 rounded-lg text-xs font-extrabold tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                    activeRoom === 'bedroom'
                      ? 'bg-gradient-to-r from-[#F97316] to-[#EF4444] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {t.roomBedroom}
                </button>
              </div>
            </div>

            {/* Room SVG Stage (Coloring the background wall dynamically) */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 aspect-[4/3] shadow-md group max-w-sm md:max-w-md lg:max-w-[420px] mx-auto w-full">
              
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 500 375" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1. LAYER - CENTRAL BACK WALL (Colored dynamically by State) */}
                <rect 
                  x="80" 
                  y="40" 
                  width="340" 
                  height="220" 
                  fill={selectedColor} 
                  className="transition-colors duration-500 ease-out"
                />
                
                {/* Visual shadow projections on central wall to make it deeply realistic */}
                <path d="M80,40 L160,40 L80,120 Z" fill="black" opacity="0.08" />
                <path d="M420,40 L420,120 L340,40 Z" fill="black" opacity="0.08" />
                <rect x="80" y="250" width="340" height="10" fill="black" opacity="0.12" />

                {/* 2. LAYER - STRUCTURAL LEFT SIDE WALL (Lighter tint) */}
                <polygon points="0,0 80,40 80,300 0,375" fill="#E2E8F0" className="dark:fill-slate-800" />
                <polygon points="0,0 80,40 80,300 0,375" fill="black" opacity="0.04" />
                
                {/* 3. LAYER - STRUCTURAL RIGHT SIDE WALL (Darker shade) */}
                <polygon points="500,0 420,40 420,300 500,375" fill="#CBD5E1" className="dark:fill-slate-900" />
                <polygon points="500,0 420,40 420,300 500,375" fill="black" opacity="0.1" />

                {/* Left Side Window with soft atmospheric light beams */}
                {activeRoom === 'kitchen' && (
                  <g id="window-bay">
                    <polygon points="20,100 65,115 65,240 20,220" fill="#93C5FD" opacity="0.5" />
                    <line x1="42.5" y1="107.5" x2="42.5" y2="230" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="20" y1="160" x2="65" y2="177.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                )}

                {/* 4. LAYER - ROOF CEILING (Neutral grey with overhead shadow) */}
                <polygon points="0,0 500,0 420,40 80,40" fill="#F1F5F9" className="dark:fill-slate-700" />
                <polygon points="0,0 500,0 420,40 80,40" fill="black" opacity="0.1" />

                {/* 5. LAYER - SOLID WOOD FLOOR (Warm maple/timber tones) */}
                <polygon points="0,375 80,300 420,300 500,375" fill="#78350F" />
                <polygon points="0,375 80,300 420,300 500,375" fill="black" opacity="0.15" />
                {/* Board lines */}
                <line x1="80" y1="300" x2="0" y2="375" stroke="#451a03" strokeWidth="1" opacity="0.3" />
                <line x1="165" y1="300" x2="110" y2="375" stroke="#451a03" strokeWidth="1" opacity="0.3" />
                <line x1="250" y1="300" x2="250" y2="375" stroke="#451a03" strokeWidth="1" opacity="0.3" />
                <line x1="335" y1="300" x2="390" y2="375" stroke="#451a03" strokeWidth="1" opacity="0.3" />
                <line x1="420" y1="300" x2="500" y2="375" stroke="#451a03" strokeWidth="1" opacity="0.3" />

                {/* 6. LAYER - BASEBOARD TRIM BOARD (Pure white) */}
                <polygon points="80,292 420,292 420,300 80,300" fill="#F8FAFC" />

                {/* 7. LAYER - INTERIOR ROOM ACCENTS BASED ON ROOM SELECTION */}
                {activeRoom === 'living' && (
                  <g id="living-room-furniture" className="transition-opacity duration-300">
                    {/* Cozy Sofa base */}
                    <rect x="130" y="220" width="240" height="70" rx="10" fill="#334155" />
                    {/* Sofa cushions */}
                    <rect x="145" y="235" width="100" height="40" rx="8" fill="#475569" />
                    <rect x="255" y="235" width="100" height="40" rx="8" fill="#475569" />
                    {/* Cushions seam lines */}
                    <rect x="135" y="210" width="230" height="20" rx="6" fill="#1E293B" opacity="0.8" />
                    
                    {/* Yellow/Cyan Accent Throw Pillows */}
                    <polygon points="152,240 182,240 167,215" fill="#FACC15" />
                    <polygon points="320,240 350,240 335,215" fill="#06B6D4" />

                    {/* Designer coffee table */}
                    <rect x="180" y="285" width="140" height="10" rx="2" fill="#E2E8F0" />
                    <line x1="195" y1="295" x2="195" y2="315" stroke="#1E293B" strokeWidth="3" />
                    <line x1="305" y1="295" x2="305" y2="315" stroke="#1E293B" strokeWidth="3" />
                    <ellipse cx="250" cy="285" rx="70" ry="2" fill="black" opacity="0.2" />

                    {/* Small plant pot */}
                    <rect x="382" y="250" width="22" height="50" fill="#94A3B8" />
                    {/* Plant leaves */}
                    <path d="M393,250 C380,230 370,220 380,210 C390,210 392,235 393,250 Z" fill="#10B981" />
                    <path d="M393,250 C405,230 415,220 405,210 C395,210 394,235 393,250 Z" fill="#047857" />
                    <path d="M393,250 C393,222 393,210 390,202 C395,202 393,222 393,250 Z" fill="#059669" />
                  </g>
                )}

                {activeRoom === 'bedroom' && (
                  <g id="bedroom-furniture" className="transition-opacity duration-300">
                    {/* Majestic Bedsheet headboard */}
                    <rect x="120" y="170" width="260" height="122" rx="4" fill="#334155" />
                    <rect x="130" y="190" width="240" height="110" fill="#F1F5F9" />
                    {/* Comfort pillows */}
                    <rect x="150" y="195" width="85" height="40" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                    <rect x="265" y="195" width="85" height="40" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                    {/* Color throw blanket overlay */}
                    <rect x="130" y="255" width="240" height="45" fill="#0284C7" />

                    {/* Dual nightstands */}
                    <rect x="84" y="235" width="30" height="65" fill="#475569" />
                    <circle cx="99" cy="250" r="2" fill="#F8FAFC" />
                    <rect x="386" y="235" width="30" height="65" fill="#475569" />
                    <circle cx="401" cy="250" r="2" fill="#F8FAFC" />

                    {/* Warm glowing table lamps */}
                    <ellipse cx="99" cy="223" rx="10" ry="12" fill="#FACC15" opacity="0.9" />
                    <polygon points="94,235 104,235 99,223" fill="#1E293B" />
                    <ellipse cx="401" cy="223" rx="10" ry="12" fill="#FACC15" opacity="0.9" />
                    <polygon points="396,235 406,235 401,223" fill="#1E293B" />
                  </g>
                )}

                {activeRoom === 'kitchen' && (
                  <g id="kitchen-furniture" className="transition-opacity duration-300">
                    {/* High-end marble kitchen island counter */}
                    <rect x="150" y="220" width="270" height="80" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                    {/* Marble grey texture veins lines */}
                    <path d="M152,225 L180,240 M240,230 L210,260 M310,240 L380,285" stroke="#E2E8F0" strokeWidth="1.5" />
                    {/* Basin tap hook */}
                    <path d="M220,220 L220,205 C220,200 228,200 228,204" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
                    
                    {/* Fruit bowl with tropical colors */}
                    <ellipse cx="330" cy="216" rx="20" ry="6" fill="#F8FAFC" />
                    <circle cx="325" cy="212" r="5" fill="#EF4444" />
                    <circle cx="335" cy="212" r="5" fill="#FACC15" />
                    <circle cx="330" cy="210" r="4.5" fill="#F97316" />

                    {/* Stools beside counter */}
                    <rect x="180" y="260" width="25" height="5" fill="#1E293B" />
                    <line x1="192.5" y1="265" x2="192.5" y2="340" stroke="#1E293B" strokeWidth="3" />
                    <rect x="260" y="260" width="25" height="5" fill="#1E293B" />
                    <line x1="272.5" y1="265" x2="272.5" y2="340" stroke="#1E293B" strokeWidth="3" />
                  </g>
                )}

                {/* Overhanging modern cone dome light fixture */}
                <g id="light-fixture">
                  <line x1="250" y1="0" x2="250" y2="70" stroke="#334155" strokeWidth="2" />
                  <polygon points="230,95 270,95 250,70" fill="#0F172A" />
                  {/* Glowing bulb */}
                  <circle cx="250" cy="94" r="7" fill="#FEF08A" />
                  {/* Subtle cone light casting effect on central wall */}
                  <polygon points="250,94 150,300 350,300" fill="#FEF08A" opacity="0.08" />
                </g>
              </svg>

              {/* Status bar overlays */}
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center space-x-2 shadow-md">
                <span className="h-2 w-2 rounded-full transform scale-110" style={{ backgroundColor: selectedColor }} />
                <span className="uppercase text-slate-400">{t.visWallColored}</span>
                <span className="text-white font-extrabold">{selectedColor}</span>
              </div>
            </div>

            {/* Quick Action Button for quotation on the customized shade */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
              <div className="text-left">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide leading-none mb-1">
                  {language === 'es' ? 'MATIZ SELECCIONADO:' : 'SELECTED SHADE:'}
                </h4>
                <p className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                  {selectedColor}
                </p>
              </div>
              <button
                onClick={() => onTriggerQuote('Pintura Látex Super-Acrílica Premium', selectedColor, selectedColor)}
                className="py-2.5 px-4 rounded-lg bg-slate-900 text-white hover:bg-[#F97316] dark:bg-white dark:text-slate-900 dark:hover:bg-[#FACC15] dark:hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95"
              >
                {t.visApplyToOrder}
              </button>
            </div>

          </div>

          {/* Column 2: Swatch Selection Panel + Sliders Mixing Board */}
          <div className="lg:col-span-6 space-y-6 max-w-sm md:max-w-md lg:max-w-none mx-auto w-full">
            
            {/* 1. Official Preset Swatches */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider flex items-center space-x-1.5 uppercase">
                <Palette className="h-4 w-4 text-[#F97316]" />
                <span>{t.visChooseColor}</span>
              </label>

              <div className="grid grid-cols-4 gap-3">
                {COLOR_PALETTE.map((color) => {
                  const isActive = selectedColor.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.id}
                      onClick={() => onSelectColor(color.hex)}
                      className={`relative aspect-square rounded-xl cursor-pointer transition-all duration-150 border-2 overflow-hidden shadow-inner group flex flex-col justify-end p-1.5 text-left ${
                        isActive
                          ? 'border-[#F97316] scale-102 ring-2 ring-orange-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={`${color.hex}: ${language === 'es' ? color.descriptionEs : color.descriptionEn}`}
                    >
                      {/* Active Checkmark overlay */}
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5 bg-slate-950/80 rounded-full h-4 w-4 flex items-center justify-center border border-white/30">
                          <Check className="h-2.5 w-2.5 text-[#FACC15] stroke-[4]" />
                        </div>
                      )}

                      {/* Toucan tag strip */}
                      {color.isToucanColor && (
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-[8px] px-1 py-0.5 rounded-br font-mono text-white leading-none font-bold scale-90 origin-top-left uppercase">
                          Tucán
                        </div>
                      )}

                      {/* HEX code read-out inside swatch */}
                      <span className="text-[10px] font-mono font-bold text-white bg-slate-950/80 px-1 py-0.5 rounded border border-white/5 line-clamp-1 break-all leading-none">
                        {color.hex}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Custom Analog RGB Mixing Board (Spectrophotometer) */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider flex items-center space-x-1.5 uppercase">
                <Sliders className="h-4 w-4 text-[#06B6D4]" />
                <span>{t.visMixingPanel}</span>
              </label>

              <div className="space-y-4">
                
                {/* Red Channel (R) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-red-500">{t.visCustomRed}</span>
                    <span className="text-slate-500 dark:text-slate-400">{rgb.r}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                {/* Green Channel (G) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-green-500">{t.visCustomGreen}</span>
                    <span className="text-slate-500 dark:text-slate-400">{rgb.g}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Blue Channel (B) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-[#06B6D4]">{t.visCustomBlue}</span>
                    <span className="text-slate-500 dark:text-slate-400">{rgb.b}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

              </div>

              {/* Mixing status indicator block */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between items-center">
                <span>{t.visMixingGlow}</span>
                <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
