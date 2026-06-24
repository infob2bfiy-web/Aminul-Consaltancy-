import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Search, Globe, ShieldAlert, LogOut, Menu, X, Settings } from 'lucide-react';
import { loginWithGoogle, logoutUser } from '../firebase';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { lang, setLang, settings, searchQuery, setSearchQuery, user, isAdmin, adminLogout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsultationClick = () => {
    const text = encodeURIComponent(
      lang === 'bn' 
        ? "আসসালামু আলাইকুম। আমি আপনার ওয়েবসাইট থেকে ফ্রিতে কন্সাল্টেশন নিতে আগ্রহী।" 
        : "Hello, I visited your website and would like to get a free consultation."
    );
    const waNumber = settings.whatsappNumber.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: lang === 'bn' ? 'হোম' : 'Home', id: 'hero' },
    { label: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About', id: 'about' },
    { label: lang === 'bn' ? 'সার্ভিসসমূহ' : 'Services', id: 'services' },
    { label: lang === 'bn' ? 'প্রজেক্ট' : 'Projects', id: 'projects' },
    { label: lang === 'bn' ? 'গ্যালারি' : 'Gallery', id: 'gallery' },
    { label: lang === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ', id: 'faq' },
    { label: lang === 'bn' ? 'ব্লগ' : 'Blog', id: 'blog' },
    { label: lang === 'bn' ? 'যোগাযোগ' : 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#051e17]/95 backdrop-blur-md shadow-lg border-b border-[#0d5c46]/30 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Company Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('hero')}>
            {settings.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="w-10 h-10 rounded-lg object-contain bg-white/10 p-0.5 border border-[#e6b325]/30 shadow-lg"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e6b325] to-[#0d5c46] flex items-center justify-center shadow-lg font-display font-bold text-white text-lg">
                ACE
              </div>
            )}
            <div>
              <h1 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                {lang === 'bn' ? settings.companyName : settings.companyNameEn}
              </h1>
              <p className="text-[10px] text-[#e6b325] font-sans font-medium tracking-wide">
                {lang === 'bn' ? settings.tagline : settings.taglineEn}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-300 hover:text-[#e6b325] transition-colors font-sans font-medium text-sm py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Utilities & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Live Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'bn' ? 'সার্ভিস, প্রজেক্ট খুঁজুন...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#041410] text-white border border-[#0d5c46]/50 rounded-full px-4 py-1.5 pl-9 text-xs focus:outline-none focus:border-[#e6b325] transition-colors w-44 focus:w-56"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#0d5c46] text-xs text-[#e6b325] hover:bg-[#0d5c46]/20 transition-all font-sans cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Admin Dashboard trigger */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full border border-[#0d5c46] text-[#e6b325] hover:bg-[#0d5c46]/20 hover:border-[#e6b325]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title={lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}
            >
              <Settings className="w-4 h-4 hover:rotate-45 transition-transform duration-300" />
            </button>

            {/* Consultation CTA */}
            <button
              onClick={handleConsultationClick}
              className="bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] hover:border-[#e6b325]/80 px-4 py-2 rounded-full font-sans font-semibold text-xs transition-all shadow-md cursor-pointer uppercase tracking-wider"
            >
              {lang === 'bn' ? 'ফ্রি কন্সাল্টেশন' : 'Free Consultation'}
            </button>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="flex items-center space-x-2 xl:hidden">
            {/* Language Toggle on Mobile too */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="p-1.5 rounded-full border border-[#0d5c46] text-xs text-[#e6b325] font-sans"
            >
              <Globe className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#0d5c46]/20 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#051e17]/98 border-t border-[#0d5c46]/50 shadow-2xl absolute left-0 right-0 py-4 px-6 space-y-4 animate-in fade-in slide-in-from-top-5 duration-300">
          
          {/* Live Search Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder={lang === 'bn' ? 'সার্ভিস বা প্রজেক্ট খুঁজুন...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#041410] text-white border border-[#0d5c46]/50 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-[#e6b325] w-full"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-gray-300 hover:text-[#e6b325] transition-colors font-sans font-medium py-2 border-b border-[#0d5c46]/20"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full border border-[#0d5c46] text-xs text-[#e6b325] hover:bg-[#0d5c46]/20 transition-all font-sans cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
            </button>
            <button
              onClick={handleConsultationClick}
              className="bg-[#0d5c46] text-white border border-[#e6b325] px-4 py-2 rounded-full font-sans font-semibold text-xs"
            >
              {lang === 'bn' ? 'ফ্রি কন্সাল্টেশন' : 'Free Consultation'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
