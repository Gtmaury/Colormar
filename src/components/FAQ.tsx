/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS_DICT } from '../data';
import { Language } from '../types';
import { TRANSLATIONS } from './translations';

interface FAQProps {
  language: Language;
}

export default function FAQ({ language }: FAQProps) {
  const t = TRANSLATIONS[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative lg:min-h-[calc(100vh-72px)] flex flex-col justify-center py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 scroll-mt-20 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8 space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#F97316] uppercase font-bold bg-orange-50 dark:bg-orange-950/20 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            {language === 'es' ? 'Centro de ayuda' : 'Help center'}
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl lg:text-4xl tracking-tight leading-none">
            {t.faqTitle}
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS_DICT.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionText = language === 'es' ? faq.questionEs : faq.questionEn;
            const answerText = language === 'es' ? faq.answerEs : faq.answerEn;
            
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-orange-500/20 dark:border-orange-500/10 bg-white dark:bg-slate-900 shadow-md'
                    : 'border-slate-200 bg-slate-100/50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/20 dark:hover:bg-slate-950/40'
                }`}
              >
                {/* Accordion Trigger Title Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left outline-none cursor-pointer group"
                  id={`faq-btn-${index}`}
                >
                  <div className="flex items-center space-x-3.5 flex-1 pr-4">
                    <HelpCircle className={`h-5 w-5 flex-shrink-0 transition-colors ${isOpen ? 'text-[#F97316]' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                    <span className={`text-sm sm:text-base font-extrabold transition-colors leading-snug ${isOpen ? 'text-slate-900 dark:text-white font-black' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                      {questionText}
                    </span>
                  </div>
                  
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#F97316] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 flex-shrink-0" />
                  )}
                </button>

                {/* Collapsible content wrapper */}
                <div
                  className={`overflow-hidden transition-all duration-300 leading-relaxed ${
                    isOpen ? 'max-h-72 border-t border-slate-100 dark:border-slate-800 p-4 sm:p-5 opacity-100' : 'max-h-0 p-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {answerText}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
