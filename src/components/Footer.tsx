import React from 'react';
import { useApp } from '../AppContext';
import { MapPin, Phone, Mail, Clock, HardHat, Facebook, Youtube, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, settings } = useApp();

  return (
    <footer className="bg-[#031510] text-gray-300 relative border-t border-[#0d5c46]/40">
      
      {/* Upper footer widget section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <div className="flex items-center space-x-2">
              {settings.logoUrl ? (
                <img 
                  src={settings.logoUrl} 
                  alt="Logo" 
                  className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5 border border-[#e6b325]/30 shadow-md animate-pulse"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-1.5 bg-[#e6b325] rounded-lg">
                  <HardHat className="w-5 h-5 text-black" />
                </div>
              )}
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
                {lang === 'bn' ? settings.companyName : settings.companyNameEn}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              {lang === 'bn' ? settings.tagline : settings.taglineEn}
            </p>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              {lang === 'bn' ? (
                "আমরা সম্পূর্ণ পেশাদারিত্ব এবং সরকারি সিভিল ইঞ্জিনিয়ারিং নিয়মের অধীনে দেশের স্বনামধন্য আবাসন ও অবকাঠামো ড্রয়িং ডিজাইন সেবা দিচ্ছি।"
              ) : (
                "Delivering approved structural and architectural drawings based strictly on BNBC design guidelines."
              )}
            </p>
            {/* Social channels */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-[#041a14] border border-[#0d5c46]/40 hover:text-[#e6b325] hover:border-[#e6b325] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#041a14] border border-[#0d5c46]/40 hover:text-[#e6b325] hover:border-[#e6b325] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick navigation links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {lang === 'bn' ? 'নেভিগেশন লিংক' : 'Quick Navigation'}
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              <li>
                <a href="#about" className="hover:text-[#e6b325] transition-colors">{lang === 'bn' ? 'আমাদের পরিচিতি' : 'About Us'}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#e6b325] transition-colors">{lang === 'bn' ? 'সেবাসমূহ' : 'Our Services'}</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#e6b325] transition-colors">{lang === 'bn' ? 'বাস্তবায়িত প্রজেক্ট' : 'Portfolio'}</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#e6b325] transition-colors">{lang === 'bn' ? 'জ্ঞানের আঙিনা' : 'Engineering Blog'}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#e6b325] transition-colors">{lang === 'bn' ? 'জিজ্ঞাসাসমূহ' : 'FAQs'}</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct contact details */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {lang === 'bn' ? 'জরুরী যোগাযোগ' : 'Get In Touch'}
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#e6b325] shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-relaxed">
                  {lang === 'bn' ? settings.officeAddress : settings.officeAddressEn}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#e6b325] shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="text-white hover:underline">{settings.contactPhone}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#e6b325] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-white hover:underline">{settings.contactEmail}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-gray-400">{lang === 'bn' ? settings.workingHours : settings.workingHoursEn}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Google Maps location integration */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {lang === 'bn' ? 'গুগল ম্যাপে আমাদের অবস্থান' : 'Our Map Location'}
            </h5>
            <div className="rounded-xl overflow-hidden border border-[#0d5c46]/60 h-36 relative">
              <iframe 
                src={settings.googleMapsEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="brightness-90 contrast-100"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer copyright base */}
      <div className="bg-[#020e0b] py-6 border-t border-[#0d5c46]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-gray-500 font-sans">
            &copy; {new Date().getFullYear()} {lang === 'bn' ? settings.companyName : settings.companyNameEn}. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 font-mono">
            {lang === 'bn' ? 'ওয়েবসাইট ডিজাইন ও কন্সট্রাকশন: আমিনুল ইঞ্জিনিয়ার্স টিম' : 'Built & Developed under certified BNBC architectural standard.'}
          </p>
        </div>
      </div>

    </footer>
  );
};
export default Footer;
