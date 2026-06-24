import React from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Milestone } from 'lucide-react';

export const About: React.FC = () => {
  const { lang } = useApp();

  const timelineEvents = [
    {
      year: "২০১৮ (2018)",
      title: lang === 'bn' ? "যাত্রা শুরু ও প্রথম প্রজেক্ট" : "Founding & Initial Projects",
      desc: lang === 'bn' ? "উত্তরাতে ছোট একটি পরিসরে সিভিল ও আর্কিটেকচারাল ডিজাইন নিয়ে পথচলা শুরু।" : "Started engineering layouts in Uttara focusing on civil and architectural drawings."
    },
    {
      year: "২০২০ (2020)",
      title: lang === 'bn' ? "ডিজিটাল সার্ভে ও সয়েল টেস্ট উইং" : "Survey & Soil Testing Launch",
      desc: lang === 'bn' ? "আধুনিক আরটিকে জিপিএস এবং সয়েল বোরিং টেস্টিং সরঞ্জাম নিয়ে নতুন উইং সংযোজন।" : "Equipped the team with high-end RTK GPS survey equipment and full soil investigation labs."
    },
    {
      year: "২০২২ (2022)",
      title: lang === 'bn' ? "১০০+ প্রজেক্ট ল্যান্ডমার্ক" : "100+ Projects Landmark",
      desc: lang === 'bn' ? "সারাদেশে আবাসিক, বাণিজ্যিক ও ডুপ্লেক্স মিলিয়ে ১০০টির বেশি ডিজাইন সম্পন্ন।" : "Completed more than 100 designs including duplex villas, retail outlets, and multi-story apartments."
    },
    {
      year: "২০২৫ (2025)",
      title: lang === 'bn' ? "পূর্ণাঙ্গ ডিজাইন ও সুপারভিশন ফার্ম" : "Turnkey Architectural Leader",
      desc: lang === 'bn' ? "ঢাকাসহ দেশের প্রধান বিভাগীয় শহরগুলোতে পূর্ণ তদারকিসহ নির্মাণ কাজ সম্প্রসারণ।" : "Providing high-fidelity architectural supervision and turnkey building contracts throughout Bangladesh."
    }
  ];

  const pillars = [
    {
      icon: <Target className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "আমাদের লক্ষ্য (Mission)" : "Our Mission",
      desc: lang === 'bn' ? "নিরাপদ, আধুনিক এবং ভূমিকম্প সহনশীল কাঠামো পরিকল্পনা ও নির্মাণ সেবার মাধ্যমে গ্রাহকদের স্বপ্নকে বাস্তবে রূপদান করা।" : "To deliver seismically-safe, highly aesthetic and budget-optimized civil layouts empowering our clients' vision."
    },
    {
      icon: <Eye className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "আমাদের স্বপ্ন (Vision)" : "Our Vision",
      desc: lang === 'bn' ? "নিখুঁত প্রযুক্তি এবং সর্বোচ্চ গুণগত মানসম্পন্ন ইঞ্জিনিয়ারিং কন্সাল্টেন্সি সেবার মাধ্যমে বাংলাদেশের শীর্ষস্থানীয় ইঞ্জিনিয়ারিং ফার্ম হিসেবে প্রতিষ্ঠিত হওয়া।" : "To become the absolute standard for engineering and architectural excellence in Bangladesh, renowned for trust and execution."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "মূল্যবোধ (Values)" : "Our Core Values",
      desc: lang === 'bn' ? "শতভাগ সততা, বিএলবিসি নিয়মানুযায়ী কাঠামোগত নিরাপত্তা, সময়মতো প্রজেক্ট ডেলিভারি এবং প্রফেশনাল আর্কিটেকচারাল গুণমান বজায় রাখা।" : "Upholding absolute professional integrity, BNBC safety codes, punctual design deliverables, and elite visual details."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#041a14] relative overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />
      <div className="absolute -right-24 bottom-10 w-96 h-96 rounded-full bg-[#e6b325]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold"
          >
            {lang === 'bn' ? 'আমাদের পরিচিতি' : 'Who We Are'}
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight"
          >
            {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Our Firm'}
          </motion.h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed"
          >
            {lang === 'bn' ? (
              "আমিনুল কনসালটেন্সি অ্যান্ড ইঞ্জিনিয়ার্স বাংলাদেশ সরকারের নিয়মাবলি ও স্ট্রাকচারাল স্ট্যান্ডার্ড মেনে মানসম্পন্ন ও বিশ্বস্ত আর্কিটেকচারাল ও ইঞ্জিনিয়ারিং কনসালটেন্সি প্রদানকারী একটি নির্ভরযোগ্য প্রতিষ্ঠান।"
            ) : (
              "Aminul Consultancy & Engineers is a premier multidisciplinary engineering, design, and land investigation agency delivering compliant, resilient, and beautiful architectural outcomes."
            )}
          </motion.p>
        </div>

        {/* Bento Grid layout for Pillars (Mission, Vision, Values) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#05221b]/80 border border-[#0d5c46]/50 rounded-xl p-6 sm:p-8 hover:border-[#e6b325]/50 hover:bg-[#05221b] transition-all group flex flex-col items-start text-left shadow-lg"
            >
              <div className="p-3.5 bg-[#e6b325]/10 rounded-xl mb-5 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-display font-bold text-white mb-3 tracking-tight">
                {pillar.title}
              </h4>
              <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CEO Message & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-[#0d5c46]/20">
          
          {/* Left: CEO Message */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#05221b] to-[#041a14] border border-[#0d5c46]/40 rounded-2xl p-6 sm:p-8 text-left shadow-xl relative">
            <div className="absolute top-4 right-6 text-6xl text-[#e6b325]/10 font-serif font-bold pointer-events-none">“</div>
            <h4 className="text-xs uppercase tracking-wider text-[#e6b325] font-display font-bold mb-4">
              {lang === 'bn' ? 'প্রধান নির্বাহীর বার্তা' : 'CEO Message'}
            </h4>
            
            <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed mb-6 italic relative z-10">
              {lang === 'bn' ? (
                "\"একটি ঘর কেবল ইট-পাথরের দেয়াল নয়, এটি একটি পরিবারের আজীবনের সঞ্চয় ও স্বপ্নের আশ্রয়স্থল। আমরা প্রতিটি বাড়ি বা প্রজেক্টকে আমাদের নিজেদের মনে করে অত্যন্ত নিখুঁত ও যত্নসহকারে ডিজাইন করি, যাতে এটি ঝড়-ভূমিকম্প সহনশীল এবং শতভাগ সুরক্ষিত থাকে। আপনার সন্তুষ্টিই আমাদের প্রধান সফলতা।\""
              ) : (
                "\"A home is not just steel and concrete; it is the physical shelter of a family's lifelong hard work and dreams. We look after every column, beam, and pile layout as if it were our own property. Keeping designs secure, cost-optimized, and compliant is our pledge.\""
              )}
            </p>

            <div className="flex items-center space-x-4 border-t border-[#0d5c46]/30 pt-4">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="CEO Engr. Aminul Islam" 
                className="w-14 h-14 rounded-full object-cover border-2 border-[#e6b325]"
              />
              <div>
                <h5 className="font-display font-bold text-sm text-white">
                  {lang === 'bn' ? 'ইঞ্জি: আমিনুল ইসলাম' : 'Engr. Aminul Islam'}
                </h5>
                <p className="text-[11px] text-[#e6b325] font-sans">
                  {lang === 'bn' ? 'প্রতিষ্ঠাতা ও প্রধান স্ট্রাকচারাল প্রকৌশলী' : 'Founder & Lead Structural Engineer'}
                </p>
                <p className="text-[10px] text-gray-400 font-sans font-medium">
                  {lang === 'bn' ? 'বিএসসি ইন সিভিল ইঞ্জিনিয়ারিং (DUET), এমআইইবি' : 'B.Sc. in Civil Engineering (DUET), MIEB'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Experience Timeline */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <Milestone className="w-5 h-5 text-[#e6b325]" />
              <h4 className="text-xl font-display font-bold text-white tracking-tight">
                {lang === 'bn' ? 'আমাদের অভিজ্ঞতার মাইলফলক' : 'Our Professional Journey'}
              </h4>
            </div>

            <div className="relative border-l-2 border-[#0d5c46] ml-4 pl-6 sm:pl-8 space-y-8">
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-10 sm:-left-12 top-1.5 w-4 h-4 rounded-full bg-[#e6b325] border-4 border-[#041a14] shadow-md shadow-[#e6b325]/30" />
                  
                  <div className="space-y-1">
                    <span className="inline-block text-xs font-display font-bold text-[#e6b325] tracking-wide">
                      {event.year}
                    </span>
                    <h5 className="text-base font-display font-bold text-white tracking-tight">
                      {event.title}
                    </h5>
                    <p className="text-gray-300 font-sans text-xs sm:text-sm max-w-xl leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
