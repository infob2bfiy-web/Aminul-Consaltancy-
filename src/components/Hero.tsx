import React from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Users, Award, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, settings } = useApp();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-[#041d16] via-[#05261d] to-[#041a14]">
      
      {/* Background Subtle Engineering Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#e6b325 1px, transparent 1px), linear-gradient(to right, rgba(230,179,37,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,179,37,0.1) 1px, transparent 1px)`,
        backgroundSize: '24px 24px, 48px 48px, 48px 48px'
      }} />

      {/* Abstract Glowing Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#0d5c46]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-[#e6b325]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Dynamic Text & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-[#0d5c46]/30 border border-[#e6b325]/30 rounded-full px-4 py-1.5 text-xs text-[#e6b325] font-sans font-semibold tracking-wider"
            >
              <ShieldCheck className="w-4 h-4 text-[#e6b325]" />
              <span>{lang === 'bn' ? 'শতভাগ বিশ্বস্ত ও অনুমোদিত ইঞ্জিনিয়ারিং ফার্ম' : '100% Trusted & Certified Engineering Firm'}</span>
            </motion.div>

            {/* Big Main Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                {lang === 'bn' ? (
                  <>
                    আপনার স্বপ্নের প্রজেক্ট,<br />
                    আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6b325] to-[#fce49c]">দক্ষ হাতে</span>
                  </>
                ) : (
                  <>
                    Your Dream Project,<br />
                    In Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6b325] to-[#fce49c]">Expert Hands</span>
                  </>
                )}
              </h2>
              <p className="font-sans font-medium text-lg sm:text-xl text-[#e6b325] tracking-wide">
                {lang === 'bn' ? settings.tagline : settings.taglineEn}
              </p>
            </motion.div>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 font-sans text-sm sm:text-base max-w-xl leading-relaxed"
            >
              {lang === 'bn' ? (
                "আমরা দিচ্ছি আধুনিক আর্কিটেকচারাল প্ল্যানিং, রাজউক বা করপোরেট বডি প্ল্যান অনুমোদন, ভূমিকম্প সহনশীল স্ট্রাকচারাল ডিজাইন, সয়েল টেস্ট, ডিজিটাল সার্ভে এবং ১০০% বিশ্বস্ততার সাথে নির্মাণ তদারকি ও কনসালটেন্সি সেবা।"
              ) : (
                "We deliver high-end architectural drawings, RAJUK approvals, seismic-resistant structural design, soil testing, digital GPS surveys, and premium building supervision across Bangladesh."
              )}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button
                onClick={() => handleScrollTo('contact')}
                className="group relative flex items-center justify-center space-x-2 bg-[#0d5c46] hover:bg-[#094131] text-white border border-[#e6b325] hover:border-[#e6b325]/80 px-7 py-3.5 rounded-full font-sans font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>{lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <button
                onClick={() => handleScrollTo('projects')}
                className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 text-gray-200 hover:text-white border border-gray-500 hover:border-[#e6b325] px-7 py-3.5 rounded-full font-sans font-semibold text-sm transition-all cursor-pointer"
              >
                <span>{lang === 'bn' ? 'আমাদের কাজ দেখুন' : 'Our Portfolio'}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Side: Building Render with Floating Cards */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center items-center">
            
            {/* Hexagonal glowing container frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#0d5c46] shadow-2xl shadow-[#0d5c46]/40 group"
            >
              <img 
                src="/src/assets/images/modern_luxury_duplex_1782324187306.jpg" 
                alt="Luxury Modern Villa Render" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] hover:brightness-100"
              />
              {/* Dark overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041a14] via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* Floating Card 1: 50+ Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -top-6 -left-6 bg-[#041a14]/90 backdrop-blur-md border border-[#e6b325]/50 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3"
            >
              <div className="p-2 bg-[#e6b325]/10 text-[#e6b325] rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-white tracking-tight">50+</p>
                <p className="text-[10px] text-gray-300 font-sans">{lang === 'bn' ? 'সম্পন্ন প্রজেক্ট' : 'Completed Projects'}</p>
              </div>
            </motion.div>

            {/* Floating Card 2: 10+ Engineers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-10 -right-6 bg-[#041a14]/90 backdrop-blur-md border border-[#0d5c46] px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3"
            >
              <div className="p-2 bg-[#0d5c46]/20 text-[#0d5c46] rounded-lg">
                <Users className="w-5 h-5 text-[#40c0a0]" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-white tracking-tight">15+</p>
                <p className="text-[10px] text-gray-300 font-sans">{lang === 'bn' ? 'দক্ষ ইঞ্জিনিয়ার' : 'Expert Members'}</p>
              </div>
            </motion.div>

            {/* Floating Card 3: 98% Satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-2 bg-[#041a14]/90 backdrop-blur-md border border-[#e6b325]/50 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3"
            >
              <div className="p-2 bg-[#e6b325]/10 text-[#e6b325] rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-white tracking-tight">98%</p>
                <p className="text-[10px] text-gray-300 font-sans">{lang === 'bn' ? 'গ্রাহক সন্তুষ্টি' : 'Satisfaction Rate'}</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
