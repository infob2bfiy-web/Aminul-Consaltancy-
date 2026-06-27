import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Compass, Menu, X, Globe, User, PhoneCall, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Header: React.FC<{ onNavigate: (sectionId: string) => void; currentActiveSection: string }> = ({ onNavigate, currentActiveSection }) => {
  const { data, lang, setLang, isAdmin, logoutAdmin, setShowConsultationModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", labelBn: "হোম", labelEn: "Home" },
    { id: "about", labelBn: "আমাদের সম্পর্কে", labelEn: "About" },
    { id: "services", labelBn: "সার্ভিস সমূহ", labelEn: "Services" },
    { id: "projects", labelBn: "প্রজেক্ট সমূহ", labelEn: "Projects" },
    { id: "reviews", labelBn: "রিভিউ", labelEn: "Reviews" },
    { id: "gallery", labelBn: "গ্যালারি", labelEn: "Gallery" },
    { id: "faq", labelBn: "জিজ্ঞাসা", labelEn: "FAQ" },
    { id: "blog", labelBn: "ব্লগ", labelEn: "Blog" },
    { id: "contact", labelBn: "যোগাযোগ", labelEn: "Contact" },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isSticky
          ? "bg-[#0A4736]/95 backdrop-blur-md shadow-lg border-b border-[#E6B325]/20 py-3"
          : "bg-gradient-to-b from-black/60 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <div
            id="header-brand"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleItemClick("home")}
          >
            {data.settings.logoUrl ? (
              <img
                src={data.settings.logoUrl}
                alt="Logo"
                className="w-10 h-10 object-contain rounded-lg bg-white/10 p-0.5 shadow-md"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#E6B325] to-[#B38600] text-[#0D5C46] font-bold shadow-md">
                <Compass className="w-6 h-6 animate-spin-slow" />
                <div className="absolute inset-0 rounded-lg border border-white/20 animate-pulse"></div>
              </div>
            )}
            <div>
              <h1 className="text-white text-base md:text-lg font-bold tracking-tight">
                {data.settings.name.split(" ")[0]} <span className="text-[#E6B325]">{data.settings.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="text-[10px] text-gray-300 font-medium hidden sm:block">
                {data.settings.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer ${
                  currentActiveSection === item.id
                    ? "text-[#E6B325] font-semibold"
                    : "text-gray-200 hover:text-[#E6B325]"
                }`}
              >
                {lang === "bn" ? item.labelBn : item.labelEn}
                {currentActiveSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E6B325]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Lang Switcher, Admin Dashboard trigger, CTA button */}
          <div id="header-actions" className="flex items-center space-x-3">
            
            {/* Language Switcher */}
            <button
              id="lang-switcher"
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition cursor-pointer"
              title={lang === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
            >
              <Globe className="w-3.5 h-3.5 text-[#E6B325]" />
              <span className="font-semibold">{lang === "bn" ? "EN" : "বাংলা"}</span>
            </button>

            {/* Admin Panel Direct Jump */}
            <button
              id="admin-nav-button"
              onClick={() => handleItemClick("admin")}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isAdmin
                  ? "bg-[#E6B325] border-[#E6B325] text-[#0D5C46]"
                  : "border-white/15 text-white hover:bg-white/5"
              }`}
              title={isAdmin ? "Go to Admin Dashboard" : "Admin Login"}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Free Consultation CTA */}
            <button
              id="header-cta"
              onClick={() => {
                const rawNum = data.settings.whatsapp.replace(/[^0-9+]/g, "");
                const waUrl = `https://wa.me/${rawNum.startsWith("+") ? rawNum.slice(1) : rawNum}`;
                window.open(waUrl, "_blank", "noopener,noreferrer");
              }}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-[#E6B325] to-[#CD9B13] hover:from-[#CD9B13] hover:to-[#B38600] text-black font-semibold text-xs py-2 px-4 rounded-md transition shadow-md hover:shadow-lg transform active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "ফ্রি পরামর্শ" : "Free Consultation"}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6 text-[#E6B325]" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#073629] border-b border-[#E6B325]/30 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition cursor-pointer ${
                    currentActiveSection === item.id
                      ? "bg-[#E6B325]/10 text-[#E6B325] font-bold border-l-4 border-[#E6B325]"
                      : "text-gray-100 hover:bg-white/5"
                  }`}
                >
                  {lang === "bn" ? item.labelBn : item.labelEn}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    const rawNum = data.settings.whatsapp.replace(/[^0-9+]/g, "");
                    const waUrl = `https://wa.me/${rawNum.startsWith("+") ? rawNum.slice(1) : rawNum}`;
                    window.open(waUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#E6B325] to-[#CD9B13] text-black font-semibold py-2.5 rounded-md text-sm transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{lang === "bn" ? "ফ্রি কনসালটেশন নিন" : "Request Free Consultation"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
