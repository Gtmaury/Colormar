/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Sparkles, X, ClipboardCheck } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Language, Product } from '../types';
import { TRANSLATIONS } from './translations';

const CAROUSEL_SLIDES = [
  {
    image: "/gallery/living.png",
    titleEs: "Gamas de Autor & Pinturas Exóticas",
    titleEn: "Bespoke Palettes & Exotic Finishes",
    descEs: "Látex super-acrílicos satinados, mate sedoso y aditivos poliméricos con resistencia superior de hasta 10 años.",
    descEn: "Super-acrylic satin latex, silky matte, and polymer additives designed with 10-year active climate guards."
  },
  {
    image: "/gallery/bedroom.png",
    titleEs: "Laboratorio Computarizado de Color",
    titleEn: "Analytical Computer Tinting Lab",
    descEs: "Garantizamos la réplica espectral exacta de tus muestras con escaneado molecular y tintometría de precisión.",
    descEn: "We secure an exact color replication of your physical swatch with spectrophotometric scaling."
  },
  {
    image: "/gallery/exterior.png",
    titleEs: "Protección Total para Exteriores",
    titleEn: "Total Exterior Protection",
    descEs: "Membranas impermeabilizantes elásticas hidrófugas de alta elongación contra filtraciones extremas.",
    descEn: "Elastomeric waterblock membranes with supreme elongation safeguards to seal masonry micro-cracks."
  }
];

interface ProductCatalogProps {
  language: Language;
  selectedColor: string;
  onScrollToSection: (id: string) => void;
}

export default function ProductCatalog({ language, selectedColor, onScrollToSection }: ProductCatalogProps) {
  const t = TRANSLATIONS[language];

  const [activeCategory, setActiveCategory] = useState<'all' | 'paints' | 'tools' | 'sealants' | 'accessories'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Custom autoplay slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Auto scroll effect for Inspiration Showcase
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);
  
  // Quick shop form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formQty, setFormQty] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<{
    productName: string;
    qty: number;
    color: string;
  } | null>(null);

  // Filter items matching selected tab category
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleOpenQuoteModal = (product: Product) => {
    setSelectedProduct(product);
    setSuccessReceipt(null);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSuccessReceipt(null);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessReceipt({
        productName: selectedProduct ? (language === 'es' ? selectedProduct.nameEs : selectedProduct.nameEn) : '',
        qty: formQty,
        color: selectedColor
      });
      // Clear form inputs
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormQty(2);
    }, 1200);
  };

  return (
    <section id="catalog" className="py-14 md:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative scroll-mt-6 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header content section - Font size scaled up */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 border border-orange-500/10 bg-orange-500/5 px-3 py-1.5 rounded-full text-xs text-[#EA580C] dark:text-orange-400 font-mono">
            <ShoppingBag className="h-4 w-4" />
            <span className="uppercase font-bold tracking-widest">{language === 'es' ? 'Catálogo de Insumos y Pinturas' : 'Product & Materials Catalog'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight text-slate-900 dark:text-white">
            {t.catTitle}
          </h2>
          <h3 className="text-base sm:text-lg font-bold text-[#F97316] dark:text-orange-400 uppercase tracking-wider font-mono">
            {language === 'es' ? 'Nuestros productos' : 'Our Products'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.catSubtitle}
          </p>
        </div>

        {/* Dynamic Showcase rotating slider carousel - Font size scaled up */}
        <div 
          className="relative w-full h-64 sm:h-80 md:h-[350px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-lg group/carousel mb-12"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          {CAROUSEL_SLIDES.map((slide, index) => {
            const isSelected = index === currentSlide;
            const title = language === 'es' ? slide.titleEs : slide.titleEn;
            const desc = language === 'es' ? slide.descEs : slide.descEn;

            return (
              <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isSelected ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Showcase image */}
                <img
                  src={slide.image}
                  alt={title}
                  className="w-full h-full object-cover select-none scale-[1.01] hover:scale-[1.04] transition-transform duration-[8s] ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Custom vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                
                {/* Floating caption content details - Font size scaled up */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-left z-20 flex flex-col justify-end">
                  <span className="inline-flex self-start items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-500/15 px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-[#EA580C] dark:text-orange-400 font-extrabold mb-3 shadow-md">
                    <Sparkles className="h-3 w-3 animate-pulse text-orange-500" />
                    <span>{language === 'es' ? 'GALERÍA DE INSPIRACIÓN' : 'INSPIRATION SHOWCASE'}</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md mb-2 max-w-2xl leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-200 drop-shadow-sm max-w-xl font-sans font-medium line-clamp-2">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Left Arrow Trigger */}
          <button 
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full border border-white/10 bg-slate-950/40 hover:bg-slate-950/85 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 duration-200 transition-all cursor-pointer backdrop-blur-md font-mono text-sm font-black"
            aria-label="Previous Slide"
          >
            ←
          </button>

          {/* Right Arrow Trigger */}
          <button 
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full border border-white/10 bg-slate-950/40 hover:bg-slate-950/85 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 duration-200 transition-all cursor-pointer backdrop-blur-md font-mono text-sm font-black"
            aria-label="Next Slide"
          >
            →
          </button>

          {/* Slider pagination dots indicator */}
          <div className="absolute bottom-6 right-8 sm:right-12 z-20 flex space-x-2 bg-slate-950/50 backdrop-blur-md p-2 rounded-full border border-white/5">
            {CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide ? 'w-6 bg-orange-500' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Categories Tab Selector buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: t.catCategoryAll },
            { id: 'paints', label: t.catCategoryPaints },
            { id: 'sealants', label: t.catCategorySealants },
            { id: 'tools', label: t.catCategoryTools },
            { id: 'accessories', label: t.catCategoryAccessories }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-md border border-slate-900 dark:border-slate-100'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Static Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const productName = language === 'es' ? p.nameEs : p.nameEn;
            const pDescription = language === 'es' ? p.descriptionEs : p.descriptionEn;
            const pUnit = language === 'es' ? p.unitEs : p.unitEn;

            return (
              <div
                key={p.id}
                onClick={() => handleOpenQuoteModal(p)}
                className="group flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/30 border border-slate-250 dark:border-slate-850 rounded-2xl overflow-hidden hover:shadow-lg dark:hover:bg-slate-900/60 hover:border-[#F97316] dark:hover:border-[#FACC15] transition-all duration-300 cursor-pointer text-left"
                id={`cat-card-${p.id}`}
              >
                {/* Product illustration image with modern zoom hover effect */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={p.image}
                    alt={productName}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {p.featured && (
                    <span className="absolute top-3.5 left-3.5 bg-gradient-to-r from-red-500 to-orange-500 text-[9px] font-mono font-bold tracking-widest text-white py-1 px-3.5 rounded-full shadow-md uppercase">
                      {t.catFeatured}
                    </span>
                  )}
                  {/* Selected Color indicator circle for paints */}
                  {p.category === 'paints' && (
                    <div className="absolute top-3.5 right-3.5 bg-slate-950/85 border border-white/20 hover:scale-105 duration-100 text-white p-1.5 rounded-xl flex items-center space-x-1.5 shadow-md">
                      <span className="h-3.5 w-3.5 block rounded-md shadow-inner" style={{ backgroundColor: selectedColor }} />
                      <span className="text-[9px] font-mono font-bold pr-1.5 uppercase">{selectedColor}</span>
                    </div>
                  )}
                </div>

                {/* Product textual details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2.5">
                    {/* Star Rating Row */}
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="font-extrabold ml-1 font-mono text-slate-800 dark:text-slate-200">{p.rating}</span>
                      </div>
                      <span className="text-slate-400 font-semibold">•</span>
                      <span className="text-slate-400 font-bold">{p.reviewsCount} {t.catReviews}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#F97316] dark:group-hover:text-[#FACC15] transition-colors">
                      {productName}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-sans line-clamp-2">
                      {pDescription}
                    </p>
                  </div>

                  {/* Stock availability layout (no prices as requested) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex justify-between items-end">
                    <div className="text-left leading-none">
                      <p className="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                        {t.catStock}
                      </p>
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-350">
                        {p.stock} {t.catStockUnits}
                      </span>
                    </div>
                  </div>

                  {/* Action trigger quote modal */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuoteModal(p);
                    }}
                    className="w-full py-2 px-3.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#F97316] dark:hover:bg-[#FACC15] cursor-pointer transition-colors text-center active:scale-95"
                  >
                    {t.catBtnDetails}
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Quotation Box popup overlay inside view frame - Font size scaled up */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 text-left shadow-2xl space-y-5">
              
              {/* Corner Close trigger */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title modal header */}
              <div className="flex items-center space-x-3.5 border-b border-slate-150 dark:border-slate-800 pb-4">
                <ClipboardCheck className="h-7 w-7 text-orange-500 animate-bounce" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-none">
                    {t.catQuickShopTitle}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-2 font-bold uppercase tracking-wider">
                    {selectedProduct.category.toUpperCase()}
                  </p>
                </div>
              </div>

              {successReceipt ? (
                /* Ticket sequence confirmation step success */
                <div className="space-y-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-5 text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold shadow-md shadow-emerald-500/10">
                    ✓
                  </div>
                  <h4 className="text-lg font-black text-emerald-800 dark:text-emerald-400">
                    {t.formSuccessTitle}
                  </h4>
                  <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed">
                    {selectedProduct.category === 'paints' 
                      ? t.formSuccessDescWithCode
                        .replace('{qty}', successReceipt.qty.toString())
                        .replace('{product}', successReceipt.productName)
                        .replace('{color}', successReceipt.color)
                        .replace('{hex}', successReceipt.color)
                      : t.formSuccessDescStandard
                        .replace('{qty}', successReceipt.qty.toString())
                        .replace('{product}', successReceipt.productName)
                    }
                  </p>
                  <p className="text-xs font-mono text-slate-455 font-semibold uppercase tracking-wider border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
                    Solicitud ID: COL-{Math.floor(1000 + Math.random() * 9000)}-{new Date().getFullYear()}
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors hover:bg-orange-500"
                  >
                    {t.formSuccessBtnReset}
                  </button>
                </div>
              ) : (
                /* Interactive Request Form inputs formatting standard requirements */
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.catQuickShopDesc}
                  </p>

                  {/* Selected product reference card (static) */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase font-black leading-none mb-1">
                        {t.formSelectedProduct}
                      </p>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                        {language === 'es' ? selectedProduct.nameEs : selectedProduct.nameEn}
                      </h4>
                    </div>
                    {/* Selected Paint formula chip on request */}
                    {selectedProduct.category === 'paints' && (
                      <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="h-4 w-4 block rounded shadow-inner" style={{ backgroundColor: selectedColor }} />
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-350">{selectedColor}</span>
                      </div>
                    )}
                  </div>

                  {/* Customer Full Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
                      {t.formName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Sebastián Colormar"
                      className="w-full py-3 px-4 text-xs sm:text-sm text-slate-800 dark:text-slate-150 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Customer Email & Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
                        {t.formEmail}
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full py-3 px-4 text-xs sm:text-sm text-slate-800 dark:text-slate-150 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
                        {t.formPhone}
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+506 8888-8888"
                        className="w-full py-3 px-4 text-xs sm:text-sm text-slate-800 dark:text-slate-150 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Quantity selector input field (no price calculation) */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
                      {t.formUnitCount}
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setFormQty(q => q > 1 ? q - 1 : 1)}
                        className="h-10 w-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-sm rounded-xl cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={formQty}
                        onChange={(e) => setFormQty(parseInt(e.target.value) || 1)}
                        className="flex-1 text-center font-mono py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-extrabold focus:outline-none focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={() => setFormQty(q => q + 1)}
                        className="h-10 w-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-sm rounded-xl cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Quoting Submit validation Trigger button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-slate-900 border border-transparent hover:bg-[#F97316] dark:hover:bg-[#FACC15] text-white dark:bg-white dark:text-slate-900 dark:hover:text-slate-950 font-black text-xs sm:text-sm uppercase cursor-pointer tracking-widest text-center active:scale-95 transition-all"
                  >
                    {isSubmitting ? t.formSubmitting : t.formBtnSubmit}
                  </button>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

