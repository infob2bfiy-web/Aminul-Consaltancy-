import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Grid, Eye, X, Camera, Hammer, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  id: string;
  url: string;
  category: "progress" | "render" | "survey" | "steel";
  titleBn: string;
  titleEn: string;
}

export const GallerySection: React.FC = () => {
  const { lang } = useApp();
  const [filter, setFilter] = useState<string>("all");
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "gal_1",
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      category: "progress",
      titleBn: "ঢালাই পূর্ববর্তী ছাদ পরিদর্শন",
      titleEn: "Rebar inspection before concrete pouring"
    },
    {
      id: "gal_2",
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      category: "survey",
      titleBn: "টোটাল স্টেশনের সাহায্যে ডিজিটাল সীমানা মেজারমেন্ট",
      titleEn: "Digital land boundary survey via total station"
    },
    {
      id: "gal_3",
      url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
      category: "steel",
      titleBn: "কলামের নিখুঁত রড বাইন্ডিং চেক",
      titleEn: "RCC Column reinforcement check by site engineer"
    },
    {
      id: "gal_4",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      category: "render",
      titleBn: "৩ তলা ডুপ্লেক্স লাক্সারি আর্কিটেকচার থ্রি-ডি রেন্ডার",
      titleEn: "3D exterior architectural rendering of duplex model"
    },
    {
      id: "gal_5",
      url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      category: "render",
      titleBn: "ফ্লোর প্ল্যান ও ইন্টেরিয়র স্ট্রাকচারাল লেআউট",
      titleEn: "Structural workspace layout drafting and alignment"
    },
    {
      id: "gal_6",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      category: "progress",
      titleBn: "বহুতল কমার্শিয়াল প্রজেক্ট ফিনিশিং ফেইজ",
      titleEn: "Commercial tower exterior glazing work progress"
    }
  ];

  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-[#041a14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "প্রজেক্ট গ্যালারি" : "Work Progress Media"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "বাস্তব কাজের সাইট ও থ্রি-ডি মেডেল গ্যালারি" : "On-Site Physical Construction Progress"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "all", labelBn: "সব ফটো", labelEn: "All Media" },
            { id: "progress", labelBn: "চলমান কাজ", labelEn: "On-site Progress" },
            { id: "render", labelBn: "৩ডি আর্ট", labelEn: "3D Renders" },
            { id: "survey", labelBn: "ডিজিটাল সার্ভে", labelEn: "Land Surveying" },
            { id: "steel", labelBn: "রড ও পাইল", labelEn: "Steel & Geo" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                filter === cat.id
                  ? "bg-[#E6B325] text-black border-[#E6B325]"
                  : "bg-[#0b3c2e]/40 border-white/10 text-gray-300 hover:border-[#E6B325]/30"
              }`}
            >
              {lang === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxImg(item)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#E6B325]/40 shadow-md bg-[#0b3c2e]"
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Overlay Text info */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[9px] text-[#E6B325] font-black uppercase tracking-wider block mb-1">
                    {item.category.toUpperCase()} PROGRESS
                  </span>
                  <h4 className="text-white text-xs sm:text-sm font-bold line-clamp-1">
                    {lang === "bn" ? item.titleBn : item.titleEn}
                  </h4>
                </div>

                {/* Zoom indicator */}
                <div className="absolute top-3 right-3 bg-black/60 border border-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-[#E6B325]" />
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox pop-up */}
        <AnimatePresence>
          {lightboxImg && (
            <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImg(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-zoom-out"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-3xl w-full bg-[#0b3c2e] border border-[#E6B325]/40 rounded-2xl overflow-hidden z-10 shadow-2xl"
              >
                {/* Photo frame */}
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={lightboxImg.url}
                    alt={lightboxImg.titleEn}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Close btn */}
                  <button
                    onClick={() => setLightboxImg(null)}
                    className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-[#E6B325] hover:text-black transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image details */}
                <div className="p-4 sm:p-5 text-left border-t border-white/10">
                  <span className="text-[10px] text-[#E6B325] font-black uppercase tracking-widest block mb-1">
                    {lightboxImg.category.toUpperCase()} MEDIA SPECIFICATION
                  </span>
                  <h3 className="text-white text-base font-bold">
                    {lang === "bn" ? lightboxImg.titleBn : lightboxImg.titleEn}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans mt-1">
                    {lang === "bn"
                      ? "পদ্ধতিগত প্রকৌশল এবং সর্বোচ্চ বিএনবিসি মান বজায় রেখে আমাদের সাইট ইঞ্জিনিয়ারদের তত্ত্বাবধানে ধারণকৃত।"
                      : "Captured live by our civil supervising inspectors enforcing robust structural code execution on site."}
                  </p>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
