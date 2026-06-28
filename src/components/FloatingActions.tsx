import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Phone, MessageSquare, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FloatingActions: React.FC = () => {
  const { data } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Process WhatsApp format
  const getWhatsappUrl = () => {
    const rawNum = data.settings.whatsapp.replace(/[^0-9+]/g, "");
    return `https://wa.me/${rawNum.startsWith("+") ? rawNum.slice(1) : rawNum}`;
  };

  return (
    <>
      {/* 1. DESKTOP FLOATING ACTIONS (Always visible on md and up) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-center space-y-3.5">
        <AnimatePresence>
          {/* WhatsApp Direct */}
          <motion.a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition transform cursor-pointer border border-white/20"
            title="Chat on WhatsApp"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.011 14.075.993 11.45.993c-5.441 0-9.864 4.369-9.868 9.8c-.001 1.77.469 3.498 1.36 5.03L1.9 21.5l5.811-1.516s.013.007.016.01c.01-.007.019-.01.03-.016z" />
            </svg>
          </motion.a>

          {/* Call Directly */}
          <motion.a
            href={`tel:${data.settings.phone}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-12 h-12 rounded-full bg-[#E6B325] text-black flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition transform cursor-pointer border border-white/20"
            title="Call Directly"
          >
            <Phone className="w-5 h-5 fill-current" />
          </motion.a>

          {/* Scroll To Top (Desktop) */}
          {isVisible && (
            <motion.button
              onClick={handleScrollTop}
              initial={{ scale: 0, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 10, opacity: 0 }}
              className="w-10 h-10 rounded-lg bg-[#0b3c2e] hover:bg-[#E6B325] text-white hover:text-black flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer border border-white/10"
              title="Scroll To Top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 2. MOBILE BOTTOM STICKY CONTACT BAR (Always visible on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#020e0b]/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-3 md:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
        <a
          href={`tel:${data.settings.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#E6B325] text-black font-extrabold py-3 rounded-xl text-sm transition active:scale-95 shadow-md border border-[#E6B325]/20 font-sans"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          সরাসরি কল
        </a>
        <a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-extrabold py-3 rounded-xl text-sm transition active:scale-95 shadow-md border border-[#25D366]/20 font-sans"
        >
          <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.011 14.075.993 11.45.993c-5.441 0-9.864 4.369-9.868 9.8c-.001 1.77.469 3.498 1.36 5.03L1.9 21.5l5.811-1.516s.013.007.016.01c.01-.007.019-.01.03-.016z" />
          </svg>
          হোয়াটসঅ্যাপ
        </a>
      </div>

      {/* 3. MOBILE SCROLL TO TOP (Positioned above bottom bar so it never overlaps) */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              onClick={handleScrollTop}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-9 h-9 rounded-lg bg-[#0b3c2e] hover:bg-[#E6B325] text-white hover:text-black flex items-center justify-center shadow-md transition cursor-pointer border border-white/10"
              title="Scroll To Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
