import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ChevronLeft, ChevronRight, HardHat } from 'lucide-react';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const { lang, gallery } = useApp();
  const [activeTab, setActiveTab] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map(item => item.category)))];

  const filteredGallery = gallery.filter(item => {
    return activeTab === 'All' || item.category === activeTab;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-[#05221b] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'কাজের দৃশ্যপট' : 'Construction Progress'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'বাস্তব সাইট ও কাজের গ্যালারি' : 'On-Site Gallery'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            {lang === 'bn' ? (
              "আমাদের সরাসরি সাইটে চলমান ডিজিটাল ল্যান্ড সার্ভে, সয়েল টেস্ট বোরিং এবং স্ট্রাকচারাল ঢালাই তদারকির কিছু বাস্তব চিত্র।"
            ) : (
              "Real photographs captured directly on-site, demonstrating soil testing, pile casing, structural reinforcing checks, and interior handovers."
            )}
          </p>
        </div>

        {/* Categories Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            let label = cat;
            if (lang === 'bn') {
              if (cat === 'All') label = 'সব ছবি';
              else if (cat === 'সার্ভে') label = 'ডিজিটাল সার্ভে';
              else if (cat === 'নির্মাণাধীন') label = 'সাইট নির্মাণ';
              else if (cat === 'ডিজাইন') label = 'অফিস প্ল্যানিং';
              else if (cat === 'ইন্টেরিয়র') label = 'ইন্টেরিয়র কাজ';
            }
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4.5 py-1.5 rounded-full font-sans text-xs sm:text-sm cursor-pointer transition-all ${
                  activeTab === cat 
                    ? 'bg-[#0d5c46] text-white border border-[#e6b325]/50 font-semibold' 
                    : 'bg-[#041a14] text-gray-400 hover:text-white border border-[#0d5c46]/40'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative h-64 rounded-xl overflow-hidden border border-[#0d5c46]/30 bg-[#041410] shadow-lg hover:shadow-xl hover:border-[#e6b325]/40 transition-all cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
              />
              {/* Blur-overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041a14] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-left space-y-1 z-10">
                <span className="inline-block text-[9px] bg-[#e6b325] text-black font-display font-extrabold px-2 py-0.5 rounded-full uppercase">
                  {lang === 'bn' ? item.category : item.category}
                </span>
                <h4 className="text-white font-display font-semibold text-xs sm:text-sm tracking-tight line-clamp-1 group-hover:text-[#e6b325] transition-colors">
                  {lang === 'bn' ? item.title : item.titleEn}
                </h4>
              </div>

              {/* Eye zoom icon centered */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-3 rounded-full bg-[#0d5c46]/90 border border-[#e6b325]/50 text-[#e6b325] shadow-lg">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:text-[#e6b325] transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slider Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:text-[#e6b325] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:text-[#e6b325] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[80vh] flex flex-col space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredGallery[lightboxIndex].imageUrl} 
                alt="Enlarged Progress Photo" 
                className="rounded-xl max-h-[70vh] object-contain border border-[#e6b325]/30 shadow-2xl"
              />
              <div className="text-center space-y-1">
                <span className="text-xs text-[#e6b325] font-display font-semibold">
                  {filteredGallery[lightboxIndex].category}
                </span>
                <p className="text-sm text-white font-sans font-medium">
                  {lang === 'bn' ? filteredGallery[lightboxIndex].title : filteredGallery[lightboxIndex].titleEn}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
