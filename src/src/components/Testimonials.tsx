import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { lang, testimonials } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section id="reviews" className="py-24 bg-[#041a14] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />
      <div className="absolute -left-20 bottom-10 w-[400px] h-[400px] bg-[#0d5c46]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'গ্রাহকদের সন্তুষ্টি' : 'Client Testimonials'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'আমাদের সম্পর্কে ক্লায়েন্টদের মতামত' : 'What Our Clients Say'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
        </div>

        {/* Testimonials Slider Board */}
        <div className="relative bg-[#05221b]/80 border-2 border-[#0d5c46]/40 rounded-3xl p-6 sm:p-12 shadow-2xl relative text-left">
          
          {/* Double Quote decorative vector */}
          <div className="absolute top-6 right-8 text-7xl text-[#e6b325]/10 font-serif font-bold pointer-events-none">
            <Quote className="w-12 h-12 rotate-180" />
          </div>

          <div className="min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stars ratings */}
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < current.rating ? 'fill-[#e6b325] text-[#e6b325]' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-200 font-sans text-sm sm:text-base leading-relaxed italic">
                  "{lang === 'bn' ? current.review : current.reviewEn}"
                </p>

                {/* Author profile */}
                <div className="flex items-center space-x-4 pt-4 border-t border-[#0d5c46]/20">
                  <img 
                    src={current.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"} 
                    alt={current.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#e6b325]"
                  />
                  <div>
                    <h5 className="font-display font-bold text-sm sm:text-base text-white">
                      {lang === 'bn' ? current.name : current.nameEn}
                    </h5>
                    <p className="text-xs text-[#e6b325] font-sans">
                      {lang === 'bn' ? current.designation : current.designationEn}
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex justify-end space-x-3 mt-8 border-t border-[#0d5c46]/10 pt-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-[#041a14] border border-[#0d5c46]/50 text-gray-300 hover:text-[#e6b325] hover:border-[#e6b325] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-[#041a14] border border-[#0d5c46]/50 text-gray-300 hover:text-[#e6b325] hover:border-[#e6b325] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
