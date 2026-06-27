import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Phone, MessageSquare, ArrowUp, Send } from "lucide-react";
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3.5">
      
      <AnimatePresence>
        {/* WhatsApp Direct */}
        <motion.a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition transform cursor-pointer border border-white/20"
          title="Chat on WhatsApp"
        >
          {/* Custom WhatsApp Icon using SVG inside a 6x6 viewport */}
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
          className="w-12 h-12 rounded-full bg-[#E6B325] text-black flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition transform cursor-pointer border border-white/20"
          title="Call Directly"
        >
          <Phone className="w-5 h-5 fill-current" />
        </motion.a>

        {/* Scroll To Top */}
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
  );
};
