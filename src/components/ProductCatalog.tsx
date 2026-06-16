/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, X } from 'lucide-react';
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
  
  // Quick shop quantity state
  const [formQty, setFormQty] = useState(1);

  // Filter items matching selected tab category
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleOpenQuoteModal = (product: Product) => {
    setSelectedProduct(product);
    setFormQty(1); // Reset quantity
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const formatWhatsAppMessage = () => {
    if (!selectedProduct) return '';
    const phone = '584124381348';
    const productName = language === 'es' ? selectedProduct.nameEs : selectedProduct.nameEn;
    const itemUnit = language === 'es' ? selectedProduct.unitEs : selectedProduct.unitEn;
    
    let text = '';
    if (language === 'es') {
      text = `Hola Colormar, estoy interesado en adquirir ${formQty} ${formQty > 1 ? 'unidades' : 'unidad'} de "${productName}" (${itemUnit}).`;
      if (selectedProduct.category === 'paints') {
        text += ` Específicamente con el color seleccionado: ${selectedColor}.`;
      }
      text += ` ¿Me podrían indicar la disponibilidad y precio actual? ¡Gracias!`;
    } else {
      text = `Hello Colormar, I am interested in purchasing ${formQty} ${formQty > 1 ? 'units' : 'unit'} of "${productName}" (${itemUnit}).`;
      if (selectedProduct.category === 'paints') {
        text += ` Specifically in the selected color: ${selectedColor}.`;
      }
      text += ` Could you please let me know the availability and current price? Thank you!`;
    }
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
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
                className="group flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg dark:hover:bg-slate-900/60 hover:border-[#F97316] dark:hover:border-[#FACC15] transition-all duration-300 cursor-pointer text-left"
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
                </div>

                {/* Product textual details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#F97316] dark:group-hover:text-[#FACC15] transition-colors">
                      {productName}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-455 leading-normal font-sans line-clamp-2">
                      {pDescription}
                    </p>
                  </div>

                  {/* Action trigger quote modal */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuoteModal(p);
                    }}
                    className="w-full py-2.5 px-3.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-[#F97316] dark:hover:bg-[#FACC15] cursor-pointer transition-colors text-center active:scale-95"
                  >
                    {t.catBtnDetails}
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Modal E-commerce Product Details Box popup overlay */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
              
              {/* Corner Close trigger */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer text-slate-500 dark:text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left Side - Image */}
                <div className="md:col-span-6 bg-slate-50 dark:bg-slate-950 p-6 flex flex-col justify-center border-r border-slate-200/50 dark:border-slate-800/50 relative min-h-[350px] md:min-h-[450px]">
                  <div className="relative w-full h-full aspect-[4/5] md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 p-4 flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={language === 'es' ? selectedProduct.nameEs : selectedProduct.nameEn}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Side - E-commerce Details & Action */}
                <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    {/* Category Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-150 dark:border-slate-800 pb-3">
                      <span className="text-xs text-orange-500 font-mono font-bold uppercase tracking-widest">
                        {selectedProduct.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {language === 'es' ? selectedProduct.nameEs : selectedProduct.nameEn}
                    </h3>

                    {/* Product Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium">
                      {language === 'es' ? selectedProduct.descriptionEs : selectedProduct.descriptionEn}
                    </p>
                  </div>

                  {/* Quantity & WhatsApp link */}
                  <div className="space-y-4 pt-4 border-t border-slate-150 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Quantity Selector */}
                      <div className="space-y-1.5 flex-1 max-w-[180px]">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {language === 'es' ? 'Cantidad:' : 'Quantity:'}
                        </label>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setFormQty(q => q > 1 ? q - 1 : 1)}
                            className="h-10 w-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-black text-sm rounded-xl cursor-pointer select-none text-slate-600 dark:text-slate-350 transition-colors"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={selectedProduct.stock}
                            value={formQty}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              setFormQty(Math.min(Math.max(val, 1), selectedProduct.stock));
                            }}
                            className="w-16 text-center font-mono py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-extrabold text-sm focus:outline-none focus:border-orange-500 text-slate-800 dark:text-slate-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            type="button"
                            onClick={() => setFormQty(q => Math.min(q + 1, selectedProduct.stock))}
                            className="h-10 w-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center font-black text-sm rounded-xl cursor-pointer select-none text-slate-600 dark:text-slate-350 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* WhatsApp Button */}
                      <a
                        href={formatWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-center"
                      >
                        <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.877-6.974S14.28 1.082 11.639 1.08c-5.441 0-9.866 4.42-9.871 9.866-.001 1.767.465 3.493 1.348 5.022l-.99 3.615 3.712-.973zm11.536-6.62c-.328-.164-1.94-.957-2.24-1.066-.298-.11-.517-.164-.734.164-.218.328-.844 1.066-1.034 1.284-.19.218-.38.245-.708.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.19-.328-.02-.505.143-.668.147-.146.328-.382.492-.573.164-.19.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.734-1.77-.993-2.399-.253-.614-.516-.532-.708-.541-.184-.009-.395-.01-.606-.01-.211 0-.555.08-.846.395-.29.314-1.11 1.083-1.11 2.64 0 1.558 1.133 3.064 1.29 3.282.16.218 2.228 3.399 5.397 4.764.754.325 1.343.518 1.802.663.757.24 1.448.207 1.993.125.607-.09 1.94-.794 2.213-1.558.272-.764.272-1.42.19-1.558-.08-.137-.298-.218-.626-.382z" />
                        </svg>
                        {language === 'es' ? 'Preguntar por WhatsApp' : 'Inquire via WhatsApp'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

