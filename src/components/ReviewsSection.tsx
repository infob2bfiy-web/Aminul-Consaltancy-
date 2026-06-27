import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Star, MessageSquare, ChevronLeft, ChevronRight, HardHat, Users, PiggyBank, Clock, Award, Building2, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ReviewsSection: React.FC = () => {
  const { data, lang } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % data.testimonials.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
  };

  const current = data.testimonials[currentIndex] || data.testimonials[0];

  return (
    <section id="reviews" className="py-20 bg-[#06241D] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(230,179,37,0.05),transparent)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "গ্রাহক সন্তুষ্টি" : "Client Testimonials"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "আমাদের সম্মানিত ক্লায়েন্টদের মতামত" : "What Our Landowners Say"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Testimonials Slider */}
        {data.testimonials.length > 0 ? (
          <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
            
            {/* Review Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.id || currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0b3c2e] border-2 border-[#E6B325]/20 rounded-2xl p-6 sm:p-10 relative shadow-2xl flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Visual quote indicator */}
                <div className="absolute top-6 right-8 text-7xl text-[#E6B325]/10 font-serif font-black select-none pointer-events-none">
                  “
                </div>

                {/* Photo & Badge */}
                <div className="shrink-0 text-center space-y-3 relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E6B325] mx-auto shadow-lg bg-emerald-950">
                    <img
                      src={current.image || "https://picsum.photos/seed/reviewer/150/150"}
                      alt={current.nameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="inline-flex items-center space-x-1 bg-black/40 border border-[#E6B325]/30 rounded-full px-2.5 py-0.5 text-[9px] text-[#E6B325] font-bold uppercase">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-4 flex-grow text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-1 text-[#E6B325]">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                    ))}
                  </div>

                  <p className="text-gray-200 text-sm sm:text-base italic leading-relaxed font-sans">
                    {lang === "bn" ? current.reviewBn : current.reviewEn}
                  </p>

                  <div>
                    <h4 className="text-base font-extrabold text-white">
                      {lang === "bn" ? current.nameBn : current.nameEn}
                    </h4>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">
                      {lang === "bn" ? current.designationBn : current.designationEn}
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Carousel navigation buttons */}
            <div className="flex justify-center md:justify-end space-x-3 mt-6">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-lg bg-[#0b3c2e] hover:bg-[#E6B325] text-white hover:text-black transition border border-[#E6B325]/20 flex items-center justify-center cursor-pointer shadow"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-lg bg-[#0b3c2e] hover:bg-[#E6B325] text-white hover:text-black transition border border-[#E6B325]/20 flex items-center justify-center cursor-pointer shadow"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm">
            No testimonials pre-loaded yet. Feel free to add some via the admin dashboard!
          </div>
        )}

        {/* Why Choose Us 6 Column Cards (Experienced Team, Cost-efficient budgeting, Timely delivery, Quality Assurance, Government compliance, Modern tech) */}
        <div className="mt-28">
          
          {/* Header Block exactly matching user reference */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
              {lang === "bn" ? "আমাদের অনন্য বৈশিষ্ট্য" : "OUR UNIQUE TRAITS"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {lang === "bn" ? "কেন আমরাই সেরা ও বিশ্বস্ত?" : "Why Landowners Partner With Us?"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E6B325] to-transparent mx-auto mt-4 rounded-full"></div>
            <p className="mt-5 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-light max-w-2xl mx-auto">
              {lang === "bn" ? (
                "নিরাপদ কাঠামো গঠন ও প্রফেশনাল আর্কিটেকচারাল সেবায় আমরা এক চুলও ছাড় দিই না। আপনার বিনিয়োগের শতভাগ সুরক্ষা আমাদের অঙ্গীকার।"
              ) : (
                "We never compromise on safety, offering top-tier structural stability, budget optimization, and elite designs to guarantee 100% protection for your investment."
              )}
            </p>
          </div>

          {/* 3-Column Grid matching reference image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Experienced Team */}
            <div className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-[#E6B325]/10 border border-[#E6B325]/20 text-[#E6B325] rounded-xl flex items-center justify-center mb-5 shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#E6B325] transition-colors duration-200">
                {lang === "bn" ? "অভিজ্ঞ টিম" : "Experienced Team"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {lang === "bn" 
                  ? "আমাদের রয়েছে বুয়েট এবং ডুয়েট গ্রাজুয়েট অভিজ্ঞ স্ট্রাকচারাল ইঞ্জিনিয়ার ও স্থপতিদের নিয়ে গঠিত প্রফেশনাল টিম।" 
                  : "Our professional team consists of highly experienced structural engineers and architects graduated from BUET and DUET."}
              </p>
            </div>

            {/* 2. Affordable Pricing & Planning */}
            <div className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-[#E6B325]/10 border border-[#E6B325]/20 text-[#E6B325] rounded-xl flex items-center justify-center mb-5 shadow-inner">
                <PiggyBank className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#E6B325] transition-colors duration-200">
                {lang === "bn" ? "সাশ্রয়ী বাজেট ও প্ল্যানিং" : "Affordable Budget & Planning"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {lang === "bn" 
                  ? "আমরা নিখুঁত মেটেরিয়াল এস্টিমেশন করি, যা মালামালের অপচয় রোধ করে প্রজেক্টের খরচ ১৫% থেকে ২০% পর্যন্ত বাঁচায়।" 
                  : "We deliver precise material estimations that prevent waste, saving 15% to 20% on overall construction costs."}
              </p>
            </div>

            {/* 3. Timely Delivery */}
            <div className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-[#E6B325]/10 border border-[#E6B325]/20 text-[#E6B325] rounded-xl flex items-center justify-center mb-5 shadow-inner">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#E6B325] transition-colors duration-200">
                {lang === "bn" ? "সময়মতো ডেলিভারি" : "On-Time Delivery"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {lang === "bn" 
                  ? "আধুনিক কনস্ট্রাকশন ম্যানেজমেন্ট পদ্ধতি ব্যবহার করে প্রতিটি ড্রইং ও নির্মাণ কাজ নির্ধারিত সময়ে সম্পন্ন করা হয়।" 
                  : "By utilizing modern construction management methodologies, every drawing and construction milestone is delivered on time."}
              </p>
            </div>

            {/* 4. Quality Assurance */}
            <div className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-[#E6B325]/10 border border-[#E6B325]/20 text-[#E6B325] rounded-xl flex items-center justify-center mb-5 shadow-inner">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#E6B325] transition-colors duration-200">
                {lang === "bn" ? "কোয়ালিটি অ্যাসিউরেন্স" : "Quality Assurance"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {lang === "bn" 
                  ? "ঢালাই, রড বাইন্ডিং এবং সয়েল টেস্টের সময় অভিজ্ঞ সাইট ইঞ্জিনিয়ারদের কঠোর সুপারভিশনের মাধ্যমে মান নিশ্চিত করা।" 
                  : "Quality is guaranteed through strict on-site supervision by expert engineers during critical stages like casting, reinforcement binding, and soil testing."}
              </p>
            </div>

            {/* 5. Government Regulatory Compliance */}
            <div className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-[#E6B325]/10 border border-[#E6B325]/20 text-[#E6B325] rounded-xl flex items-center justify-center mb-5 shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#E6B325] transition-colors duration-200">
                {lang === "bn" ? "সরকারি বিধিমালা পালন" : "Regulatory Compliance"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {lang === "bn" 
                  ? "আমাদের তৈরি সকল ফ্লোর প্ল্যান ও নকশা BNBC কোড, রাজউক (RAJUK) এবং স্থানীয় কর্পোরেট আইন ও বিধি মেনে করা হয়।" 
                  : "All our floor plans and structural layouts strictly adhere to BNBC, RAJUK, and municipal corporation bylaws."}
              </p>
            </div>

            {/* 6. Modern Tech */}
            <div className="bg-[#031c15] border border-emerald-950/80 hover:border-[#E6B325]/40 rounded-2xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E6B325]/0 via-transparent to-[#E6B325]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-12 h-12 bg-[#E6B325]/10 border border-[#E6B325]/20 text-[#E6B325] rounded-xl flex items-center justify-center mb-5 shadow-inner">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#E6B325] transition-colors duration-200">
                {lang === "bn" ? "আধুনিক প্রযুক্তি" : "Modern Technology"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                {lang === "bn" 
                  ? "ডিজিটাল সার্ভে RTK GPS, সয়েল টেস্ট স্প্রেডশিট এবং রেভিট-অটোক্যাড-ইটাবস সফটওয়্যারের আধুনিক প্রয়োগ।" 
                  : "State-of-the-art implementation of RTK GPS Digital Surveying, soil-test spreadsheets, Revit, AutoCAD, and ETABS software."}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
