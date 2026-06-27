import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Compass, Activity, Map, Building2, Calculator, ArrowRight, ShieldCheck, HelpCircle, HardHat, Info, Eye, Zap, Droplet, Beaker, PenTool, MessageCircle, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ServicesSection: React.FC = () => {
  const { data, lang } = useApp();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Calculator State
  const [areaSft, setAreaSft] = useState<number>(1200);
  const [floors, setFloors] = useState<number>(3);
  const [quality, setQuality] = useState<"standard" | "duplex" | "premium">("standard");
  const [soil, setSoil] = useState<"good" | "medium" | "poor">("good");
  const [calcResult, setCalcResult] = useState<any | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "Compass":
        return <Compass className="w-5 h-5 text-[#E6B325]" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-[#E6B325]" />;
      case "Eye":
        return <Eye className="w-5 h-5 text-[#E6B325]" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-[#E6B325]" />;
      case "Droplet":
        return <Droplet className="w-5 h-5 text-[#E6B325]" />;
      case "Map":
        return <Map className="w-5 h-5 text-[#E6B325]" />;
      case "Beaker":
        return <Beaker className="w-5 h-5 text-[#E6B325]" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-[#E6B325]" />;
      case "PenTool":
        return <PenTool className="w-5 h-5 text-[#E6B325]" />;
      default:
        return <HardHat className="w-5 h-5 text-[#E6B325]" />;
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaSft <= 0 || floors <= 0) return;

    // Standard structural values inside Bangladesh per SFT (approximate in BDT)
    let ratePerSft = 1800; // standard residential concrete shell + basic finishes
    if (quality === "duplex") ratePerSft = 2400; // duplex premium elements
    if (quality === "premium") ratePerSft = 2900; // G+10 luxury apartments with expensive sanitaries, lifts, glass facade

    // Soil correction factor
    let soilFactor = 0; // Good clay (shallow foundation)
    if (soil === "medium") soilFactor = 150000; // standard medium footing
    if (soil === "poor") soilFactor = 450000; // Requires piling/deep excavation

    const totalBuildArea = areaSft * floors;
    const foundationCost = (areaSft * 450) + soilFactor; // basic foundation + soil piling overhead
    const structuralCost = totalBuildArea * ratePerSft;
    const finishingCost = totalBuildArea * (ratePerSft * 0.45); // 45% of build rate goes to finishes
    const totalCost = foundationCost + structuralCost + finishingCost;

    // Materials breakdown estimate
    const cementBags = Math.round(totalBuildArea * 0.42); // 0.42 bags per sft
    const steelTons = parseFloat((totalBuildArea * 0.0022).toFixed(2)); // 0.0022 tons per sft
    const sandCft = Math.round(totalBuildArea * 1.5); // 1.5 cft per sft
    const brickQty = Math.round(totalBuildArea * 9.5); // 9.5 bricks per sft

    setCalcResult({
      totalArea: totalBuildArea,
      foundation: Math.round(foundationCost),
      structural: Math.round(structuralCost),
      finishing: Math.round(finishingCost),
      total: Math.round(totalCost),
      cement: cementBags,
      steel: steelTons,
      sand: sandCft,
      bricks: brickQty,
      avgPerFloor: Math.round(totalCost / floors)
    });
  };

  const formatBdt = (num: number) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + " কোটি টাকা" + ` (${(num / 10000000).toFixed(2)} Crore BDT)`;
    }
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + " লাখ টাকা" + ` (${(num / 100000).toFixed(1)} Lakh BDT)`;
    }
    return num.toLocaleString() + " BDT";
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-[#02100c] via-[#041d16] to-[#010b09] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block matching reference design */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Gold Pill Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#E6B325]/10 border border-[#E6B325]/30 text-[#E6B325] text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6B325] animate-pulse"></span>
            <span>{lang === "bn" ? "আমাদের সেবাসমূহ" : "Our Engineering Services"}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {lang === "bn" ? "আমরা যেসকল সেবা প্রদান করি" : "Professional Engineering Solutions"}
          </h2>
          
          <p className="mt-4 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
            {lang === "bn" ? (
              "কাঠামো নকশার নিশ্চয়তার সাথে স্ট্রাকচারাল ও আর্কিটেকচারাল কনসালটেন্সি সেবা। সঠিক যোগসূত্র, আধুনিক পরিকল্পনা ও গুণগতমান অনুযায়ী পরিকল্পনা ও তদারকি।"
            ) : (
              "Combining design safety with state-of-the-art structural & architectural engineering. We ensure perfect coordination, budget optimization and structural integrity."
            )}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-12 flex justify-center">
          <div className="bg-[#03140f]/70 border border-white/5 rounded-2xl sm:rounded-full p-2 flex flex-wrap justify-center gap-1 sm:gap-2 max-w-4xl shadow-2xl backdrop-blur-md">
            {[
              { id: "all", labelBn: "সকল সেবাসমূহ", labelEn: "All Services" },
              { id: "drawing_design", labelBn: "ড্রয়িং ও ডিজাইন", labelEn: "Drawing & Design" },
              { id: "survey_soil", labelBn: "সার্ভে ও সয়েল টেস্ট", labelEn: "Survey & Soil Test" },
              { id: "construction", labelBn: "বিল্ডিং কনস্ট্রাকশন", labelEn: "Building Construction" }
            ].map((cat) => {
              const count = cat.id === "all" 
                ? data.services.length 
                : data.services.filter(s => s.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-2 text-xs font-bold py-2.5 px-4 rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-[#E6B325] text-black shadow-lg shadow-[#E6B325]/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{lang === "bn" ? cat.labelBn : cat.labelEn}</span>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-black/10 text-black" : "bg-white/5 text-gray-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid (3-columns format matching reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {data.services
            .filter(srv => selectedCategory === "all" || srv.category === selectedCategory)
            .map((srv) => {
              const waNum = data.settings.whatsapp.replace(/[^0-9+]/g, "");
              const waUrl = `https://wa.me/${waNum.startsWith("+") ? waNum.slice(1) : waNum}?text=${encodeURIComponent(
                `আসসালামু আলাইকুম, আমি "${lang === "bn" ? srv.titleBn : srv.titleEn}" সেবাটি সম্পর্কে বিস্তারিত তথ্য জানতে আগ্রহী।`
              )}`;

              return (
                <motion.div
                  key={srv.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-5 flex flex-col h-full shadow-lg relative overflow-hidden group transition duration-300"
                >
                  {/* Hover background highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Image section with icons & badges */}
                  <div className="relative h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-white/5">
                    <img
                      src={srv.image || "https://picsum.photos/seed/engineering/600/300"}
                      alt={lang === "bn" ? srv.titleBn : srv.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031c15]/90 via-[#031c15]/20 to-black/30"></div>

                    {/* Icon housing */}
                    <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-md text-[#E6B325]">
                      {getIcon(srv.iconName)}
                    </div>

                    {/* Floating badge */}
                    {(srv.badgeBn || srv.badgeEn) && (
                      <div className="absolute top-3.5 right-3.5 bg-[#E6B325] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {lang === "bn" ? srv.badgeBn : srv.badgeEn}
                      </div>
                    )}
                  </div>

                  {/* Category breadcrumb */}
                  <div className="flex items-center space-x-1 mb-2 text-[#E6B325] font-sans text-[10px] uppercase font-bold tracking-wider">
                    <span>{lang === "bn" ? "ড্রয়িং ও ডিজাইন" : "Engineering"}</span>
                    <span>•</span>
                    <span className="text-gray-400">
                      {srv.category === "drawing_design" 
                        ? (lang === "bn" ? "প্ল্যানিং ও ডিজাইন" : "Design")
                        : srv.category === "survey_soil"
                        ? (lang === "bn" ? "সার্ভে ও সয়েল টেস্ট" : "Survey")
                        : (lang === "bn" ? "ভবন নির্মাণ" : "Construction")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#E6B325] transition-colors duration-200">
                    {lang === "bn" ? srv.titleBn : srv.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 flex-grow line-clamp-3">
                    {lang === "bn" ? srv.descBn : srv.descEn}
                  </p>

                  {/* Benefits checklist (short summary matching reference image) */}
                  <div className="space-y-2 mb-5">
                    {(lang === "bn" ? srv.benefitsBn : srv.benefitsEn).slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#E6B325] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between">
                    {/* Learn More / View Details */}
                    <button
                      onClick={() => setSelectedService(srv.id)}
                      className="flex items-center space-x-1.5 text-xs font-bold text-[#E6B325] hover:text-white transition duration-200 cursor-pointer"
                    >
                      <span>{lang === "bn" ? "বিস্তারিত দেখুন" : "Learn More"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp prefilled link shortcut */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-emerald-950/80 hover:bg-[#E6B325]/10 border border-[#E6B325]/30 flex items-center justify-center text-[#E6B325] hover:text-white transition-all duration-300 shadow-md transform active:scale-90"
                      title={lang === "bn" ? "হোয়াটসঅ্যাপে পরামর্শ নিন" : "Get WhatsApp Consultation"}
                    >
                      <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Beautiful Service Details Modal popup */}
        <AnimatePresence>
          {selectedService && (() => {
            const currentSrv = data.services.find(s => s.id === selectedService);
            if (!currentSrv) return null;

            const waNum = data.settings.whatsapp.replace(/[^0-9+]/g, "");
            const waUrl = `https://wa.me/${waNum.startsWith("+") ? waNum.slice(1) : waNum}?text=${encodeURIComponent(
              `আসসালামু আলাইকুম, আমি "${lang === "bn" ? currentSrv.titleBn : currentSrv.titleEn}" সেবাটি সম্পর্কে বিস্তারিত তথ্য জানতে আগ্রহী।`
            )}`;
            const bookingText = encodeURIComponent(`আসসালামু আলাইকুম, আমি "${lang === "bn" ? currentSrv.titleBn : currentSrv.titleEn}" সেবার বুকিং এর জন্য যোগাযোগ করছি। অনুগ্রহ করে বুকিং প্রক্রিয়াটি শুরু করুন।`);
            const bookingUrl = `https://wa.me/${waNum.startsWith("+") ? waNum.slice(1) : waNum}?text=${bookingText}`;

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#02100c] border-2 border-[#E6B325]/60 rounded-3xl max-w-2xl w-full relative shadow-2xl shadow-black/95 overflow-hidden max-h-[92vh] flex flex-col text-white"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/60 hover:bg-black/90 text-white/95 hover:text-[#E6B325] rounded-full flex items-center justify-center border border-white/10 hover:border-[#E6B325]/40 transition duration-200 cursor-pointer shadow-md"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header Image with overlays */}
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden shrink-0">
                    <img
                      src={currentSrv.image || "https://picsum.photos/seed/engineering/600/300"}
                      alt={lang === "bn" ? currentSrv.titleBn : currentSrv.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shadow overlay matching reference */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02100c] via-[#02100c]/40 to-black/30"></div>
                    
                    {/* Top Left Badge - Gold with black text */}
                    {currentSrv.badgeBn && (
                      <div className="absolute top-4 left-4 bg-[#E6B325] text-black text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                        {lang === "bn" ? currentSrv.badgeBn : currentSrv.badgeEn}
                      </div>
                    )}

                    {/* Floating service identity block over image bottom-left */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-center space-x-3 sm:space-x-4">
                      {/* Gold outline icon housing */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#02100c] border-2 border-[#E6B325] rounded-xl flex items-center justify-center text-[#E6B325] shadow-lg shrink-0">
                        {getIcon(currentSrv.iconName)}
                      </div>
                      <div className="flex-grow drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        <span className="text-[#E6B325] text-[10px] sm:text-xs font-bold uppercase tracking-wider block">
                          {lang === "bn" ? "কনসালটেন্সি ও ডিজাইন সার্ভিস" : "Consultancy & Design Services"}
                        </span>
                        <h2 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight mt-0.5">
                          {lang === "bn" ? currentSrv.titleBn : currentSrv.titleEn}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Body Content - Scrollable if small screen */}
                  <div className="p-5 sm:p-6 md:p-8 space-y-6 overflow-y-auto flex-grow custom-scrollbar">
                    
                    {/* Service Overview Section */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[#E6B325] font-black text-xs sm:text-sm uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#E6B325]"></span>
                        <span>{lang === "bn" ? "সার্ভিস পরিচিতি" : "Service Overview"}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans pl-4 font-light">
                        {lang === "bn" ? currentSrv.descBn : currentSrv.descEn}
                      </p>
                    </div>

                    {/* Horizontal Divider */}
                    <div className="border-t border-white/5 my-2"></div>

                    {/* Key Benefits Grid Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-[#E6B325] font-black text-xs sm:text-sm uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#E6B325]"></span>
                        <span>{lang === "bn" ? "আমাদের এই সেবার সুবিধাসমূহ" : "Key Benefits Included"}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
                        {(lang === "bn" ? currentSrv.benefitsBn : currentSrv.benefitsEn).map((benefit, i) => (
                          <div
                            key={i}
                            className="bg-[#021510] border border-emerald-950/60 rounded-xl p-3 sm:p-4 flex items-center space-x-3 hover:border-[#E6B325]/30 transition duration-300"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#E6B325]/10 flex items-center justify-center text-[#E6B325] shrink-0 border border-[#E6B325]/30">
                              <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-200 font-sans font-medium leading-tight">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Bar with Brand Name and Call to Actions */}
                  <div className="bg-[#010907] border-t border-white/5 px-5 sm:px-6 md:px-8 py-4 sm:py-5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Brand details */}
                    <div className="text-center sm:text-left">
                      <h4 className="text-xs sm:text-sm font-black text-white tracking-wide font-mono">
                        {data.settings.name}
                      </h4>
                      <p className="text-[9px] sm:text-[11px] text-gray-400 mt-0.5 font-sans">
                        {lang === "bn" ? "নিরাপত্তা ও শতভাগ আস্থার বিশ্বস্ত প্রকৌশলী সমাধান" : "Vetted engineering solutions with ultimate safety"}
                      </p>
                    </div>

                    {/* Action buttons matching design */}
                    <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-end">
                      {/* WhatsApp Call / Discussion */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-[#095d46] hover:bg-[#0c7055] border border-[#E6B325] text-white font-black text-xs sm:text-sm py-2 px-4 sm:py-2.5 sm:px-5 rounded-full shadow-lg transition-all duration-200 transform active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                        <span>{lang === "bn" ? "হোয়াটসঅ্যাপে আলোচনা করুন" : "Consult on WhatsApp"}</span>
                      </a>
                      
                      {/* Direct Booking Link */}
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent hover:bg-white/5 border border-[#E6B325] text-[#E6B325] hover:text-white font-black text-xs sm:text-sm py-2 px-4 sm:py-2.5 sm:px-5 rounded-full transition-all duration-200 transform active:scale-95 cursor-pointer flex items-center justify-center"
                      >
                        <span>{lang === "bn" ? "বুকিং দিন" : "Request Booking"}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* DYNAMIC VALUE ADD: INTERACTIVE BDT CONSTRUCTION ESTIMATOR */}
        <div className="bg-[#07241c] border-2 border-[#E6B325]/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#E6B325]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            
            {/* Form Side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#E6B325]/10 text-[#E6B325]">
                  <Calculator className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "bn" ? "বাড়ি তৈরি নির্মাণ ব্যয় ক্যালকুলেটর" : "Instant Building Construction Estimator"}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {lang === "bn" ? "আপনার জমির সাইজ দিয়ে একটি খসড়া বাজেট তৈরি করুন" : "Get a structural cost & material estimate based on current BDT rates"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* SFT Area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#E6B325] uppercase">
                    {lang === "bn" ? "প্রতি তলার আয়তন (স্কয়ার ফিট)" : "Area Per Floor (SFT)"}
                  </label>
                  <input
                    type="number"
                    value={areaSft}
                    onChange={(e) => setAreaSft(Math.max(100, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#E6B325] transition text-sm"
                  />
                  <p className="text-[10px] text-gray-400">
                    {lang === "bn" ? "যেমন- ১২০০ স্কয়ার ফিট" : "e.g., 1200 Sq. Ft."}
                  </p>
                </div>

                {/* Number of Floors */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#E6B325] uppercase">
                    {lang === "bn" ? "মোট তলার সংখ্যা (তলা)" : "Total Floors (Story)"}
                  </label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(parseInt(e.target.value))}
                    className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#E6B325] transition text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((f) => (
                      <option key={f} value={f}>
                        {f} {lang === "bn" ? "তলা" : "Storey"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Building Quality style */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#E6B325] uppercase">
                    {lang === "bn" ? "ফিনিশিং ক্যাটাগরি" : "Finishing & Material Grade"}
                  </label>
                  <select
                    value={quality}
                    onChange={(e: any) => setQuality(e.target.value)}
                    className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#E6B325] transition text-sm"
                  >
                    <option value="standard">{lang === "bn" ? "স্ট্যান্ডার্ড আবাসিক ভবন" : "Standard Residential Shell"}</option>
                    <option value="duplex">{lang === "bn" ? "লাক্সারি ডুপ্লেক্স ফিটিংস" : "Luxury Duplex Fittings"}</option>
                    <option value="premium">{lang === "bn" ? "হাই-এন্ড প্রিমিয়াম অ্যাপার্টমেন্ট" : "High-End Premium Multi-Storey"}</option>
                  </select>
                </div>

                {/* Soil Testing foundation overhead */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#E6B325] uppercase">
                    {lang === "bn" ? "জমির মাটির অবস্থা (সয়েল টাইপ)" : "Soil / Piling Requirements"}
                  </label>
                  <select
                    value={soil}
                    onChange={(e: any) => setSoil(e.target.value)}
                    className="w-full bg-[#03140f] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#E6B325] transition text-sm"
                  >
                    <option value="good">{lang === "bn" ? "ভালো শক্ত লাল মাটি (নো পাইল)" : "Excellent Clay Soil (No Piling Needed)"}</option>
                    <option value="medium">{lang === "bn" ? "মাঝারি নরম মাটি (বেসিক পাইল)" : "Medium Soft Clay (Short Wood/Concrete Piles)"}</option>
                    <option value="poor">{lang === "bn" ? "নিচু ভরাট জলাশয় (ভারী আরসিসি পাইলিং)" : "Deep Filled Marshy Plot (Heavy RCC Piles Needed)"}</option>
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#E6B325] hover:bg-[#CD9B13] text-black font-bold py-2.5 rounded-lg shadow transition cursor-pointer text-sm"
                  >
                    {lang === "bn" ? "নির্মাণ হিসাব করুন" : "Generate Cost Estimation"}
                  </button>
                </div>

              </form>
            </div>

            {/* Results Side */}
            <div className="w-full lg:w-1/2 bg-[#041612] rounded-xl p-5 border border-white/10 min-h-[320px] flex flex-col justify-center relative">
              {calcResult ? (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-[#E6B325] uppercase tracking-wider">
                      {lang === "bn" ? "আনুমানিক মোট বাজেট:" : "TOTAL ESTIMATED BUDGET RANGE:"}
                    </span>
                    <span className="bg-[#E6B325]/15 text-[#E6B325] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      BNBC Standard
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {formatBdt(calcResult.total)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    
                    <div className="bg-[#07241c] p-2.5 rounded-lg border border-white/5">
                      <span className="text-gray-300 block mb-1">
                        {lang === "bn" ? "১. ফাউন্ডেশন ও পাইলিং:" : "1. Foundation & Sub-structure:"}
                      </span>
                      <strong className="text-white font-mono">{calcResult.foundation.toLocaleString()} BDT</strong>
                    </div>

                    <div className="bg-[#07241c] p-2.5 rounded-lg border border-white/5">
                      <span className="text-gray-300 block mb-1">
                        {lang === "bn" ? "২. রড/কংক্রিট ফ্রেম:" : "2. Structural Framework:"}
                      </span>
                      <strong className="text-white font-mono">{calcResult.structural.toLocaleString()} BDT</strong>
                    </div>

                    <div className="bg-[#07241c] p-2.5 rounded-lg border border-white/5">
                      <span className="text-gray-300 block mb-1">
                        {lang === "bn" ? "৩. ফিনিশিং ও প্লাস্টার:" : "3. Finishes & Sanitary work:"}
                      </span>
                      <strong className="text-white font-mono">{calcResult.finishing.toLocaleString()} BDT</strong>
                    </div>

                    <div className="bg-[#07241c] p-2.5 rounded-lg border border-white/5">
                      <span className="text-gray-300 block mb-1">
                        {lang === "bn" ? "৪. তলা প্রতি গড় ব্যয়:" : "4. Avg. Cost Per Floor:"}
                      </span>
                      <strong className="text-[#E6B325] font-mono">{calcResult.avgPerFloor.toLocaleString()} BDT</strong>
                    </div>

                  </div>

                  {/* Materials breakdown */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-[#E6B325]">
                      {lang === "bn" ? "আনুমানিক নির্মাণ সামগ্রী (মেটিরিয়ালস):" : "Estimated Core Building Materials Needed:"}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-gray-300">
                      <div>🧱 {lang === "bn" ? "ইট:" : "Bricks:"} <strong className="text-white">{calcResult.bricks.toLocaleString()} Pcs</strong></div>
                      <div>⛓️ {lang === "bn" ? "রড (স্টিল):" : "Steel:"} <strong className="text-white">{calcResult.steel} Tons</strong></div>
                      <div>🧪 {lang === "bn" ? "সিমেন্ট:" : "Cement:"} <strong className="text-white">{calcResult.cement.toLocaleString()} Bags</strong></div>
                      <div>🏖️ {lang === "bn" ? "বালু (CFT):" : "Sand:"} <strong className="text-white">{calcResult.sand.toLocaleString()} Cft</strong></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 italic">
                    <Info className="w-3.5 h-3.5 text-[#E6B325] shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "দ্রষ্টব্য: এটি বাজারদরের ওপর ভিত্তি করে তৈরি একটি খসড়া হিসেব। নিখুঁত সয়েল টেস্ট এবং প্রজেক্ট ড্রয়িং রিপোর্টের ওপর ভিত্তি করে মূল বাজেট পরিবর্তিত হতে পারে।"
                        : "Note: This is an approximate estimation. Final billing shifts based on local market supply, soil tests and dynamic building elevations."}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <Calculator className="w-10 h-10 text-gray-500 mx-auto" />
                  <p className="text-sm text-gray-300">
                    {lang === "bn" ? "বাম পাশে জমির পরিমাপ এবং তলার সংখ্যা দিয়ে 'হিসাব করুন' বাটনে ক্লিক করুন।" : "Provide your building specs on the left and click 'Generate' to fetch structural materials and costs."}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
