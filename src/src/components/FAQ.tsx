import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { lang, faqs } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#041a14] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <HelpCircle className="w-10 h-10 text-[#e6b325] mx-auto opacity-80" />
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ' : 'Frequently Asked Questions'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'আপনার মনে থাকা কিছু প্রশ্ন' : 'Have Any Questions?'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
        </div>

        {/* FAQ Accordions list */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={faq.id} 
                className={`bg-[#05221b] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-[#e6b325] shadow-lg shadow-[#0d5c46]/10' : 'border-[#0d5c46]/30 hover:border-[#0d5c46]'
                }`}
              >
                {/* Accordion trigger line */}
                <button
                  onClick={() => toggleAccordion(i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition-colors hover:bg-[#062920]"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white pr-4 leading-snug">
                    {lang === 'bn' ? faq.question : faq.questionEn}
                  </span>
                  <div className={`p-1 rounded-full bg-[#041a14] text-[#e6b325] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion expand block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 border-t border-[#0d5c46]/20 bg-[#041a14]/40">
                        <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line text-left">
                          {lang === 'bn' ? faq.answer : faq.answerEn}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
