import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Phone, MessageSquare, ArrowUp, Send, Smartphone } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { lang, settings } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      lang === 'bn' 
        ? "আসসালামু আলাইকুম। আমিনুল কনসালটেন্সি অ্যান্ড ইঞ্জিনিয়ার্স-এ যোগাযোগ করার জন্য ধন্যবাদ। আমি বাড়ি তৈরির নকশা ও ইঞ্জিনিয়ারিং প্ল্যানিং সম্পর্কে জানতে চাই।" 
        : "Hello, I am interested in building a duplex/residential home. I would like to consult your structural engineering team."
    );
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3.5">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="p-3 bg-[#0d5c46]/95 hover:bg-[#e6b325] hover:text-black text-[#e6b325] border border-[#e6b325]/30 rounded-full shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95"
          title="Scroll To Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Direct phone Call */}
      <a
        href={`tel:${settings.contactPhone}`}
        className="p-3 bg-[#0d5c46]/95 hover:bg-[#0d5c46] border-2 border-white text-white rounded-full shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center animate-bounce"
        title="Call Now"
      >
        <Phone className="w-5 h-5 text-[#e6b325]" />
      </a>

      {/* WhatsApp Chat widget */}
      <button
        onClick={handleWhatsAppClick}
        className="p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
        title="WhatsApp Consultation"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
      </button>

      {/* Facebook Messenger */}
      {settings.messengerLink && settings.messengerLink !== '#' && (
        <a
          href={settings.messengerLink}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-[#0084FF] hover:bg-[#0074E0] text-white rounded-full shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
          title="Messenger Chat"
        >
          <Send className="w-5 h-5 fill-white" />
        </a>
      )}

    </div>
  );
};
export default FloatingActions;
