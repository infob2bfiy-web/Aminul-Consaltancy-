import React from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { Facebook, Linkedin, Mail, ShieldAlert } from 'lucide-react';

export const Team: React.FC = () => {
  const { lang, team } = useApp();

  return (
    <section id="team" className="py-24 bg-[#05221b] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'আমাদের বিশেষজ্ঞ টিম' : 'Our Professional Team'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'দক্ষ প্রকৌশলী ও ডিজাইনার প্যানেল' : 'The Engineering Panel'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            {lang === 'bn' ? (
              "আমাদের টিমে রয়েছেন বুয়েট ও ডুয়েট গ্র্যাজুয়েট অভিজ্ঞ স্ট্রাকচারাল ডিজাইনার, আর্কিটেক্ট ও অভিজ্ঞ সাইট সুপারভাইজারগণ।"
            ) : (
              "Our structural designers, seismic analysts, and spatial architects hold accredited degrees from premier universities."
            )}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#041812] border border-[#0d5c46]/40 rounded-2xl overflow-hidden hover:border-[#e6b325]/50 hover:shadow-2xl transition-all duration-300 group flex flex-col items-center p-6 text-center"
            >
              {/* Photo */}
              <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-[#0d5c46]/60 group-hover:border-[#e6b325] transition-colors">
                <img 
                  src={member.photoUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5 flex-grow">
                <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#e6b325] transition-colors leading-tight">
                  {lang === 'bn' ? member.name : member.nameEn}
                </h4>
                <p className="text-[#e6b325] font-sans text-xs font-semibold uppercase tracking-wider">
                  {lang === 'bn' ? member.designation : member.designationEn}
                </p>
              </div>

              {/* Social Channels */}
              <div className="flex items-center justify-center space-x-3 mt-6 pt-4 border-t border-[#0d5c46]/20 w-full">
                {member.socialFacebook && member.socialFacebook !== '#' && (
                  <a 
                    href={member.socialFacebook} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-full bg-[#041410] border border-[#0d5c46]/40 text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {member.socialLinkedin && member.socialLinkedin !== '#' && (
                  <a 
                    href={member.socialLinkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-full bg-[#041410] border border-[#0d5c46]/40 text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                <a 
                  href="mailto:aminulengineers@gmail.com" 
                  className="p-1.5 rounded-full bg-[#041410] border border-[#0d5c46]/40 text-gray-400 hover:text-red-400 hover:border-red-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
