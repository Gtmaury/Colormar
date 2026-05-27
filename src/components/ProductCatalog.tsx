/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Info, Check, Sparkles, X, ListFilter, ClipboardCheck, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Ref for product carousel scrolling
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isProductCarouselHovered, setIsProductCarouselHovered] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Autoplay for product carousel (pauses on hover)
  useEffect(() => {
    if (isProductCarouselHovered) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 5) {
        // Wrap around to start smoothly
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 320px
        container.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 4000); // Every 4 seconds

    return () => clearInterval(interval);
  }, [isProductCarouselHovered]);
  
  // Custom autoplay slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Auto scroll effect
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

  // Show all products in the carousel
  const filteredProducts = PRODUCTS;

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
    <section id="catalog" className="py-24 md:py-28 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative scroll-mt-6 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header content section - Font size scaled up */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 border border-orange-500/10 bg-orange-500/5 px-4 py-2 rounded-full text-xs md:text-sm text-[#EA580C] dark:text-orange-400 font-mono">
            <ShoppingBag className="h-4 w-4" />
            <span className="uppercase font-bold tracking-widest">{language === 'es' ? 'Catálogo de Insumos y Pinturas' : 'Product & Materials Catalog'}</span>
          </div>
          <h2 className="text-4xl font-black md:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-900 dark:text-white">
            {t.catTitle}
          </h2>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#F97316] dark:text-orange-400 uppercase tracking-widest font-mono">
            {language === 'es' ? 'Nuestros productos' : 'Our Products'}
          </h3>
          <p className="text-slate-655 dark:text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed">
            {t.catSubtitle}
          </p>
        </div>

        {/* Dynamic Showcase rotating slider carousel - Font size scaled up */}
        <div 
          className="relative w-full h-80 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-xl group/carousel mb-20"
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
                <div className="absolute bottom-0 inset-x-0 p-8 sm:p-12 text-left z-20 flex flex-col justify-end">
                  <span className="inline-flex self-start items-center space-x-2 rounded-full border border-orange-550/20 bg-orange-500/15 px-4 py-1.5 text-xs font-mono tracking-widest uppercase text-[#EA580C] dark:text-orange-400 font-extrabold mb-4 shadow-md">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-orange-500" />
                    <span>{language === 'es' ? 'GALERÍA DE INSPIRACIÓN' : 'INSPIRATION SHOWCASE'}</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md mb-3 max-w-3xl leading-tight">
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 drop-shadow-sm max-w-2xl font-sans font-medium line-clamp-2">
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
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/10 bg-slate-950/40 hover:bg-slate-950/85 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 duration-200 transition-all cursor-pointer backdrop-blur-md font-mono text-[18px] font-black"
            aria-label="Previous Slide"
          >
            ←
          </button>

          {/* Right Arrow Trigger */}
          <button 
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/10 bg-slate-950/40 hover:bg-slate-950/85 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 duration-200 transition-all cursor-pointer backdrop-blur-md font-mono text-[18px] font-black"
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

        {/* Responsive Grid Cards and layouts wrapped with side fade effects */}
        <div 
          className="relative w-full overflow-hidden group/product-carousel mb-10"
          onMouseEnter={() => setIsProductCarouselHovered(true)}
          onMouseLeave={() => setIsProductCarouselHovered(false)}
        >
          {/* Left Fade Overlay */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 pointer-events-none z-10" />
          
          {/* Right Fade Overlay */}
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 pointer-events-none z-10" />

          {/* Left Scroll Button */}
          <button 
            type="button"
            onClick={scrollLeft}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 hover:bg-white dark:bg-slate-950/80 dark:hover:bg-slate-950 text-slate-800 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover/product-carousel:opacity-100 duration-200 transition-all cursor-pointer backdrop-blur-md shadow-lg"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Scroll Button */}
          <button 
            type="button"
            onClick={scrollRight}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 hover:bg-white dark:bg-slate-950/80 dark:hover:bg-slate-950 text-slate-800 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover/product-carousel:opacity-100 duration-200 transition-all cursor-pointer backdrop-blur-md shadow-lg"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Scrolling area */}
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar scroll-smooth" 
            style={{ scrollbarWidth: 'none' }}
          >
            {/* PRODUCT CAROUSEL CARDS - Styled as rounded white cards to blend image backgrounds perfectly */}
            <div className="grid grid-rows-2 grid-flow-col gap-6 md:gap-7 w-max px-12 sm:px-28">
              {filteredProducts.map((p) => {
                const productName = language === 'es' ? p.nameEs : p.nameEn;

                return (
                  <div
                    key={p.id}
                    onClick={() => handleOpenQuoteModal(p)}
                    title={productName}
                    className="group w-64 sm:w-72 h-56 sm:h-64 overflow-hidden rounded-3xl bg-transparent hover:scale-[1.03] transition-all duration-300 snap-start cursor-pointer flex items-center justify-center relative"
                    id={`cat-card-${p.id}`}
                  >
                    <img
                      src={p.image}
                      alt={productName}
                      loading="lazy"
                      className="h-full w-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Quotation Box popup overlay inside view frame - Font size scaled up */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-left shadow-2xl space-y-6">
              
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
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
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
                  <p className="text-xs font-mono text-slate-450 font-semibold uppercase tracking-wider border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
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

                  {/* Quantity selector input field */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 flex justify-between">
                      <span>{t.formUnitCount}</span>
                      <span className="font-mono text-orange-600 dark:text-orange-400 font-extrabold">
                        {(formQty * selectedProduct.price).toFixed(2)} USD (Est.)
                      </span>
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
