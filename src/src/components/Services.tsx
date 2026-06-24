import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

export const Services: React.FC = () => {
  const { lang, services, searchQuery } = useApp();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'testing' | 'construction'>('all');

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string, className = "w-6 h-6 text-[#e6b325]") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <LucideIcons.HardHat className={className} />;
  };

  // Map service ID to category
  const getServiceCategory = (id: string): 'design' | 'testing' | 'construction' => {
    if (["architectural-design", "structural-design", "three-d-view-animation", "electrical-design", "plumbing-sanitation-design", "as-build-drawing"].includes(id)) {
      return 'design';
    }
    if (["digital-survey", "soil-test"].includes(id)) {
      return 'testing';
    }
    if (["building-construction"].includes(id)) {
      return 'construction';
    }
    return 'design';
  };

  // Map service ID to custom visual badge/indicator
  const getServiceBadge = (id: string, currentLang: 'bn' | 'en') => {
    const badges: Record<string, { bn: string; en: string }> = {
      "architectural-design": { bn: "রাজউক ও স্থানীয় বিধিমালা", en: "RAJUK Standard" },
      "structural-design": { bn: "ভূমিকম্প ও ঝড় সহনশীল", en: "Earthquake Resistant" },
      "three-d-view-animation": { bn: "রিয়েলিস্টিক থ্রিডি ওয়াকথ্রু", en: "Cinematic 3D" },
      "electrical-design": { bn: "১০০% অগ্নি ও শর্ট সার্কিট সেফ", en: "Fire Safe Wiring" },
      "plumbing-sanitation-design": { bn: "শতভাগ লিকেজ-মুক্ত", en: "100% Leak Proof" },
      "digital-survey": { bn: "আরটিকে ও টোটাল স্টেশন জিপিএস", en: "RTK GPS Precision" },
      "soil-test": { bn: "বুয়েট ও অনুমোদিত ল্যাব টেস্ট", en: "BUET Lab Approved" },
      "building-construction": { bn: "সরাসরি প্রকৌশলী সুপারভিশন", en: "Expert Supervision" },
      "as-build-drawing": { bn: "ভবিষ্যৎ সংস্কার রেকর্ড", en: "Lifetime Blueprint" }
    };
    return badges[id] ? (currentLang === 'bn' ? badges[id].bn : badges[id].en) : "";
  };

  // Categories list
  const categories = [
    { id: 'all', labelBn: 'সকল সেবাসমূহ', labelEn: 'All Services', count: 9 },
    { id: 'design', labelBn: 'প্ল্যানিং ও ডিজাইন', labelEn: 'Design & Planning', count: 6 },
    { id: 'testing', labelBn: 'মাঠ ও ল্যাব টেস্ট', labelEn: 'Field & Lab Tests', count: 2 },
    { id: 'construction', labelBn: 'বিল্ডিং কন্সট্রাকশন', labelEn: 'Construction', count: 1 },
  ];

  // Filter services based on search AND category
  const filteredServices = services.filter(service => {
    // Category filter
    if (activeCategory !== 'all' && getServiceCategory(service.id) !== activeCategory) {
      return false;
    }
    
    // Live search filter
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = service.title.toLowerCase().includes(query) || service.titleEn.toLowerCase().includes(query);
    const descMatch = service.description.toLowerCase().includes(query) || service.descriptionEn.toLowerCase().includes(query);
    return titleMatch || descMatch;
  });

  const handleWhatsAppConsultation = (service: Service) => {
    const serviceName = lang === 'bn' ? service.title : service.titleEn;
    const text = encodeURIComponent(
      lang === 'bn' 
        ? `আসসালামু আলাইকুম। আমি আপনার ওয়েবসাইটে "${serviceName}" সার্ভিসটি দেখেছি এবং এ বিষয়ে কন্সাল্টেশন নিতে চাই।` 
        : `Hello, I visited your website and I am interested in your "${serviceName}" service.`
    );
    window.open(`https://wa.me/8801712345678?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#041a14] to-[#05221b] relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08382b_1px,transparent_1px),linear-gradient(to_bottom,#08382b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b325]/10 border border-[#e6b325]/30 text-xs text-[#e6b325] font-semibold tracking-wider uppercase">
            <LucideIcons.Sparkles className="w-3.5 h-3.5" />
            {lang === 'bn' ? 'আমাদের দক্ষ সেবাসমূহ' : 'Our Professional Services'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
            {lang === 'bn' ? 'আমরা যেসকল সেবা প্রদান করি' : 'Engineering & Design Services'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#e6b325] to-transparent mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
            {lang === 'bn' ? (
              "আমরা দেশের অন্যতম দক্ষ স্ট্রাকচারাল ও আর্কিটেকচারাল কনসালটেন্সি টিম। সঠিক কোড, আধুনিক এলিভেশন ও বাস্তবসম্মত বাজেট পরিকল্পনায় শতভাগ আস্থার সমাধান।"
            ) : (
              "From initial geotechnical soil analysis and land surveys to final modern architectural styling and structural blueprint approvals."
            )}
          </p>
        </div>

        {/* Category Tabs / Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 max-w-4xl mx-auto p-1.5 rounded-2xl bg-[#041611]/80 backdrop-blur-md border border-[#0d5c46]/30">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#e6b325] to-[#f3c647] text-[#041a14] shadow-lg shadow-[#e6b325]/20 scale-[1.02]' 
                    : 'text-gray-400 hover:text-white hover:bg-[#06261e]'
                }`}
              >
                <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? 'bg-[#041a14]/25 text-[#041a14]' : 'bg-[#0d5c46]/20 text-gray-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Filter Info */}
        {searchQuery && (
          <div className="text-center text-sm text-gray-400 mb-6 font-sans">
            {lang === 'bn' ? `"${searchQuery}" এর জন্য অনুসন্ধানকৃত ফলাফল:` : `Search results for "${searchQuery}":`}
          </div>
        )}

        {/* Services Grid (3x3 Perfect Layout for 9 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-gradient-to-b from-[#041c15] to-[#041610] border border-[#0d5c46]/30 rounded-2xl overflow-hidden hover:border-[#e6b325]/60 hover:shadow-2xl hover:shadow-[#0d5c46]/30 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Visual Header / Image Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041c15] via-transparent to-transparent opacity-80" />

                  {/* Floating Left Top Icon */}
                  <div className="absolute top-4 left-4 p-3 bg-[#041a14]/90 backdrop-blur-md border border-[#e6b325]/40 rounded-2xl shadow-lg shadow-black/20 group-hover:border-[#e6b325] transition-colors">
                    {renderIcon(service.iconName, "w-6 h-6 text-[#e6b325] drop-shadow-md")}
                  </div>

                  {/* Floating Right Top Badge (Instant Visual Context) */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#e6b325] text-[#041a14] text-[10px] font-sans font-extrabold tracking-wide uppercase rounded-full shadow-md">
                    {getServiceBadge(service.id, lang)}
                  </div>
                </div>

                {/* Service Text Contents */}
                <div className="p-6 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    {/* Category Label */}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#e6b325]/80 bg-[#e6b325]/5 border border-[#e6b325]/10 px-2.5 py-1 rounded-md">
                      {lang === 'bn' 
                        ? (getServiceCategory(service.id) === 'design' ? 'প্ল্যানিং ও ডিজাইন' : getServiceCategory(service.id) === 'testing' ? 'মাঠ ও ল্যাব টেস্ট' : 'বিল্ডিং কন্সট্রাকশন')
                        : (getServiceCategory(service.id) === 'design' ? 'Planning & Design' : getServiceCategory(service.id) === 'testing' ? 'Field & Lab Testing' : 'Construction')}
                    </span>

                    <h4 className="text-lg sm:text-xl font-display font-extrabold text-white group-hover:text-[#e6b325] transition-colors leading-tight">
                      {lang === 'bn' ? service.title : service.titleEn}
                    </h4>

                    <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {lang === 'bn' ? service.description : service.descriptionEn}
                    </p>

                    {/* Mini visual highlights (First 2 benefits shown directly) */}
                    <div className="pt-3 space-y-2 border-t border-[#0d5c46]/20">
                      {(lang === 'bn' ? service.benefits : service.benefitsEn).slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-[#e6b325] shrink-0 mt-0.5" />
                          <span className="text-gray-400 font-sans text-xs line-clamp-1">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-5 border-t border-[#0d5c46]/20 mt-6 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-sans font-extrabold text-[#e6b325] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer group/btn"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Details'}</span>
                      <LucideIcons.ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#e6b325]" />
                    </button>

                    <button
                      onClick={() => handleWhatsAppConsultation(service)}
                      className="p-2 rounded-xl bg-[#0d5c46]/20 hover:bg-[#0d5c46]/60 border border-[#0d5c46]/40 text-[#e6b325] hover:text-white transition-all cursor-pointer"
                      title={lang === 'bn' ? 'কনসাল্ট করুন' : 'Get Consultation'}
                    >
                      <LucideIcons.PhoneCall className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center max-w-md mx-auto space-y-4"
          >
            <LucideIcons.SearchX className="w-12 h-12 text-gray-500 mx-auto" />
            <div className="text-gray-400 font-sans text-sm sm:text-base">
              {lang === 'bn' ? 'কোনো সার্ভিস খুঁজে পাওয়া যায়নি।' : 'No services found matching search filters.'}
            </div>
            <button 
              onClick={() => { setActiveCategory('all'); }}
              className="text-xs font-bold text-[#e6b325] underline cursor-pointer"
            >
              {lang === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset Category Filters'}
            </button>
          </motion.div>
        )}

      </div>

      {/* Learn More Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer" 
              onClick={() => setSelectedService(null)}
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#05221b] border-2 border-[#e6b325]/50 rounded-2xl shadow-2xl relative w-full max-w-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
            >
              {/* Header image banner */}
              <div className="relative h-48 sm:h-64 shrink-0">
                <img 
                  src={selectedService.imageUrl} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05221b] via-transparent to-[#041a14]/65" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#041410]/85 text-white hover:text-[#e6b325] transition-all cursor-pointer border border-[#0d5c46]/50 shadow-lg"
                >
                  <LucideIcons.X className="w-5 h-5" />
                </button>

                {/* Top left floating badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#e6b325] text-[#041a14] text-[10px] font-sans font-extrabold uppercase rounded-lg shadow-md">
                  {getServiceBadge(selectedService.id, lang)}
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3.5">
                  <div className="p-3 bg-[#e6b325]/15 backdrop-blur-md border border-[#e6b325]/40 rounded-xl">
                    {renderIcon(selectedService.iconName, "w-6 h-6 text-[#e6b325]")}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#e6b325]/90">
                      {lang === 'bn' ? 'কনসাল্টেন্সি ও ডিজাইন সার্ভিস' : 'Engineering Service Wing'}
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">
                      {lang === 'bn' ? selectedService.title : selectedService.titleEn}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-[#0d5c46] scrollbar-track-transparent">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-black flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e6b325]" />
                    {lang === 'bn' ? 'সার্ভিস পরিচিতি' : 'Service Overview'}
                  </h4>
                  <p className="text-gray-200 font-sans text-sm sm:text-base leading-relaxed">
                    {lang === 'bn' ? selectedService.description : selectedService.descriptionEn}
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-4 pt-4 border-t border-[#0d5c46]/20">
                  <h4 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-black flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e6b325]" />
                    {lang === 'bn' ? 'আমাদের এই সেবার সুবিধাসমূহ' : 'Technical Standards & Benefits'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(lang === 'bn' ? selectedService.benefits : selectedService.benefitsEn)?.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 bg-[#041a14]/60 p-3 rounded-xl border border-[#0d5c46]/20 hover:border-[#e6b325]/30 transition-all">
                        <LucideIcons.CheckCircle2 className="w-5 h-5 text-[#e6b325] shrink-0 mt-0.5" />
                        <span className="text-gray-200 font-sans text-xs sm:text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer (Action tools) */}
              <div className="p-5 border-t border-[#0d5c46]/30 bg-[#041a14] flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0">
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                    Aminul Consultancy & Engineers
                  </p>
                  <p className="text-[9px] text-gray-500 font-sans">
                    {lang === 'bn' ? 'নিরাপত্তা ও শতভাগ আস্থার বিশ্বস্ত প্রকৌশল সমাধান' : 'BNBC Safety & Code Compliance Certified'}
                  </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleWhatsAppConsultation(selectedService)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#0d5c46] hover:bg-[#0c523e] text-white border border-[#e6b325]/60 px-5 py-2.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg shadow-[#0d5c46]/10 transition-all hover:scale-[1.03]"
                  >
                    <LucideIcons.PhoneCall className="w-3.5 h-3.5 text-[#e6b325]" />
                    <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে আলোচনা করুন' : 'WhatsApp Chat'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 sm:flex-initial bg-transparent hover:bg-white/5 text-[#e6b325] border border-[#0d5c46] hover:border-[#e6b325] px-5 py-2.5 rounded-full font-sans font-bold text-xs cursor-pointer transition-all"
                  >
                    <span>{lang === 'bn' ? 'বুকিং দিন' : 'Book Consultancy'}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
