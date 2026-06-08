/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ColorVisualizer from './components/ColorVisualizer';
import Features from './components/Features';
import PaintCalculator from './components/PaintCalculator';
import ProductCatalog from './components/ProductCatalog';
import Waitlist from './components/Waitlist';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

import { Language } from './types';

export default function App() {
  // Bilingual support state. Spanish by default as requested.
  const [language, setLanguage] = useState<Language>('es');

  // Master color selection state. Starts with Naranja Tucán (#F97316).
  const [selectedColor, setSelectedColor] = useState<string>('#F97316');

  // Page view routing state to keep catalog as a separate page view
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');

  // Smooth sliding anchors and routing handler
  const handleScrollToSection = (id: string) => {
    if (id === 'catalog') {
      setCurrentView('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If we are in the catalog page but clicked a section on home page
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for rendering to complete before locating anchor
      setTimeout(() => {
        const targetId = id === 'colors' ? 'visualizer' : id;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      const targetId = id === 'colors' ? 'visualizer' : id;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Quoting callback of selected color formulation code
  const handleTriggerQuote = (pName: string, colorHex: string, colorName: string) => {
    // Scroll directly to catalog so they can request high fidelity can sizes
    handleScrollToSection('catalog');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-orange-500/20 selection:text-orange-600 transition-colors duration-300">
      
      {/* 1. Header with brand and language picker */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onScrollToSection={handleScrollToSection}
        currentView={currentView}
      />

      {/* 2. Main SPA Layout */}
      <main className="flex-grow">
        
        {currentView === 'home' ? (
          <>
            {/* Hero Section with interactive preset triggers */}
            <Hero
              language={language}
              onScrollToSection={handleScrollToSection}
              onSelectColor={setSelectedColor}
            />

            {/* Virtial Room Paint Visualizer (SVG) */}
            <ColorVisualizer
              language={language}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onScrollToSection={handleScrollToSection}
              onTriggerQuote={handleTriggerQuote}
            />

            {/* Feature technical grids */}
            <Features language={language} />

            {/* Coverage Materials Calculator */}
            <PaintCalculator language={language} />

            {/* Custom lab color consultation trial */}
            <Waitlist
              language={language}
              selectedColor={selectedColor}
            />

            {/* Bilingual Accordion FAQs */}
            <FAQ language={language} />
          </>
        ) : (
          /* Product Catalog Grid with filter tabs & quotation tickets as a separate page */
          <div className="py-8 animate-fade-in">
            <ProductCatalog
              language={language}
              selectedColor={selectedColor}
              onScrollToSection={handleScrollToSection}
            />
          </div>
        )}

      </main>

      {/* 3. Company Contacts Address and digital UTC clock */}
      <Footer language={language} />

    </div>
  );
}
