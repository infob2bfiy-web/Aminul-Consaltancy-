import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FAQSection: React.FC = () => {
  const { data, lang } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq_1"); // Default open first

  return (
    <section id="faq" className="py-20 bg-[#06241D] text-white overflow-hidden relative">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E6B325]/20 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "জিজ্ঞাসা ও উত্তর" : "Frequently Asked Questions"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "বাড়ি তৈরি সংক্রান্ত সাধারণ কিছু প্রশ্নাবলি" : "Clear Answers For Smart Landowners"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* FAQ Accordions list */}
        <div className="space-y-4">
          {data.faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#0b3c2e] border-2 rounded-xl transition-all overflow-hidden ${
                  isOpen ? "border-[#E6B325]" : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Question Row Toggle */}
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 sm:py-5 text-left flex justify-between items-center space-x-3 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded bg-emerald-950 text-[#E6B325] shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm sm:text-base text-white tracking-tight hover:text-[#E6B325] transition-colors">
                      {lang === "bn" ? faq.questionBn : faq.questionEn}
                    </span>
                  </div>

                  <span className="shrink-0 text-[#E6B325]">
                    {isOpen ? <ChevronUp className="w-5 h-5 animate-bounce-slow" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {/* Animated Disclosure Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-[#07241c]/50 border-t border-white/5"
                    >
                      <p className="px-5 py-4 text-xs sm:text-sm text-gray-200 leading-relaxed font-sans font-light">
                        {lang === "bn" ? faq.answerBn : faq.answerEn}
                      </p>
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
