import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { Trophy, Smile, Users, Shield } from 'lucide-react';

export const Statistics: React.FC = () => {
  const { lang } = useApp();

  const stats = [
    {
      value: 50,
      suffix: "+",
      icon: <Trophy className="w-8 h-8 text-[#e6b325]" />,
      label: lang === 'bn' ? "সম্পন্ন প্রজেক্ট" : "Completed Projects",
      desc: lang === 'bn' ? "ডুপ্লেক্স, বহুতল ভবন ও বাণিজ্যিক শপিং প্লাজা" : "Premium villas, duplex homes & high-rises"
    },
    {
      value: 100,
      suffix: "+",
      icon: <Smile className="w-8 h-8 text-[#e6b325]" />,
      label: lang === 'bn' ? "সন্তুষ্ট ক্লায়েন্ট" : "Happy Clients",
      desc: lang === 'bn' ? "সারাদেশে ছড়িয়ে থাকা আমাদের সম্মানিত গ্রাহক" : "Landowners & corporate organizations nationwide"
    },
    {
      value: 15,
      suffix: "+",
      icon: <Users className="w-8 h-8 text-[#e6b325]" />,
      label: lang === 'bn' ? "বিশেষজ্ঞ সদস্য" : "Expert Engineers",
      desc: lang === 'bn' ? "অভিজ্ঞ বুয়েট ও ডুয়েট সিভিল ইঞ্জিনিয়ার এবং স্থপতি" : "Lead spatial planners and seismic design experts"
    },
    {
      value: 8,
      suffix: "+",
      icon: <Shield className="w-8 h-8 text-[#e6b325]" />,
      label: lang === 'bn' ? "বছরের অভিজ্ঞতা" : "Years of Experience",
      desc: lang === 'bn' ? "নিরাপদ ও নির্ভরযোগ্য ইঞ্জিনিয়ারিং সেবা প্রদান" : "Trusted architectural & geotechnical consultancies"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#05221b] to-[#041a14] relative overflow-hidden">
      
      {/* Decorative line divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#041812] border border-[#0d5c46]/40 p-6 sm:p-8 rounded-2xl text-center hover:border-[#e6b325]/30 hover:bg-[#052019] transition-all relative group shadow-xl"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#e6b325]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-lg pointer-events-none" />

              <div className="mx-auto w-14 h-14 bg-[#e6b325]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>

              <div className="space-y-1">
                <div className="flex justify-center items-baseline">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-[#e6b325]">
                    {stat.suffix}
                  </span>
                </div>
                
                <h4 className="text-base font-display font-bold text-white tracking-tight">
                  {stat.label}
                </h4>
                
                <p className="text-gray-400 font-sans text-xs sm:text-xs">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
