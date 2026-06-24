import React from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { ShieldAlert, Users, PiggyBank, Clock, Award, Landmark, Cpu } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { lang } = useApp();

  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "অভিজ্ঞ টিম" : "Experienced Team",
      desc: lang === 'bn' ? "আমাদের রয়েছে বুয়েট এবং ডুয়েট গ্র্যাজুয়েট অভিজ্ঞ স্ট্রাকচারাল ইঞ্জিনিয়ার ও স্থপতিদের নিয়ে গঠিত প্রফেশনাল টিম।" : "Our core team consists of certified BUET & DUET structural specialists and senior spatial architects."
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "সাশ্রয়ী বাজেট ও প্ল্যানিং" : "Affordable Sourcing",
      desc: lang === 'bn' ? "আমরা নিখুঁত মেটেরিয়াল এস্টিমেশন করি, যা মালামালের অপচয় রোধ করে প্রজেক্টের খরচ ১৫% থেকে ২০% পর্যন্ত বাঁচায়।" : "Our precision material billing reduces raw material waste, saving 15-20% on overall construction budgets."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "সময়মতো ডেলিভারি" : "On-Time Delivery",
      desc: lang === 'bn' ? "আধুনিক কন্সট্রাকশন ম্যানেজমেন্ট পদ্ধতি ব্যবহার করে প্রতিটি ড্রয়িং ও নির্মাণ কাজ নির্ধারিত সময়ে সম্পন্ন করা হয়।" : "Utilizing professional project management timelines, we deliver all engineering designs within schedule."
    },
    {
      icon: <Award className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "কোয়ালিটি অ্যাসুরেন্স" : "Quality Assurance",
      desc: lang === 'bn' ? "ঢালাই, রড বাইন্ডিং এবং সয়েল টেস্টের সময় অভিজ্ঞ সাইট ইঞ্জিনিয়ারদের কঠোর সুপারভিশনের মাধ্যমে মান নিশ্চিত করা।" : "Maintaining strict site compliance, casting checks, and reinforcement logs under structural oversight."
    },
    {
      icon: <Landmark className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "সরকারি বিধিমালা পালন" : "Government Code Compliant",
      desc: lang === 'bn' ? "আমাদের তৈরি সকল ফ্লোর প্ল্যান ও নকশা BNBC কোড, রাজউক (RAJUK) এবং স্থানীয় করপোরেট আইন ও বিধি মেনে করা হয়।" : "Every blueprint strictly follows BNBC codes, RAJUK bylaws, and local municipal zoning guidelines."
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#e6b325]" />,
      title: lang === 'bn' ? "আধুনিক প্রযুক্তি" : "Modern Technology",
      desc: lang === 'bn' ? "ডিজিটাল সার্ভে RTK GPS, সয়েল টেস্ট স্প্রেডশিট এবং রিভিট-অটোক্যাড-ইট্যাবস সফটওয়্যারের আধুনিক প্রয়োগ।" : "Leveraging RTK GPS land mapping, ETABS structural simulation, and photorealistic 3D Revit models."
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-[#041a14] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0d5c46]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'আমাদের অনন্য বৈশিষ্ট্য' : 'Why Choose Us'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'কেন আমরাই সেরা ও বিশ্বস্ত?' : 'What Makes Us The Right Choice'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            {lang === 'bn' ? (
              "নিরাপদ কাঠামো গঠন ও প্রফেশনাল আর্কিটেকচারাল সেবায় আমরা এক চুলও ছাড় দিই না। আপনার বিনিয়োগের শতভাগ সুরক্ষা আমাদের অঙ্গীকার।"
            ) : (
              "We provide certified safety and elite customer service with zero shortcuts. Rest assured your lifelong investment is safe."
            )}
          </p>
        </div>

        {/* Benefits Bento Grid layout (3 col desktop, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#05221b]/80 border border-[#0d5c46]/40 rounded-2xl p-6 sm:p-8 hover:border-[#e6b325]/50 hover:bg-[#05221b] transition-all group text-left"
            >
              <div className="p-3 bg-[#e6b325]/10 rounded-xl mb-6 inline-block group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-display font-bold text-white mb-3 group-hover:text-[#e6b325] transition-colors tracking-tight">
                {benefit.title}
              </h4>
              <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
