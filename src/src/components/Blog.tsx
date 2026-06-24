import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, Calendar, Tag, ArrowRight, X } from 'lucide-react';
import { Blog } from '../types';

export const BlogComponent: React.FC = () => {
  const { lang, blogs, searchQuery } = useApp();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const filteredBlogs = blogs.filter(blog => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = blog.title.toLowerCase().includes(query) || blog.titleEn.toLowerCase().includes(query);
    const contentMatch = blog.content.toLowerCase().includes(query) || blog.contentEn.toLowerCase().includes(query);
    return titleMatch || contentMatch;
  });

  return (
    <section id="blog" className="py-24 bg-[#05221b] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'জ্ঞানের আঙিনা ও টিপস' : 'Our Professional Blog'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'বাড়ি নির্মাণ বিষয়ক গুরুত্বপূর্ণ টিপস' : 'Engineering Insights & Tips'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            {lang === 'bn' ? (
              "বাড়ি বা ভবন নির্মাণের পূর্বে, নির্মাণ চলাকালীন এবং পরবর্তী রক্ষণাবেক্ষণ বিষয়ে আমাদের অভিজ্ঞ ইঞ্জিনিয়ারদের পরামর্শমূলক ব্লগসমূহ।"
            ) : (
              "Explore professional guides, BNBC codes explanation, and material calculation parameters written directly by our engineers."
            )}
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#041812] border border-[#0d5c46]/40 rounded-2xl overflow-hidden hover:border-[#e6b325]/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Cover Photo */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                />
                
                {/* Floating Tag */}
                <span className="absolute top-4 left-4 bg-[#e6b325] text-black font-display font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  {lang === 'bn' ? blog.category : blog.categoryEn}
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-6 text-left flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-sans">
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-[#e6b325]" />
                      <span>{lang === 'bn' ? blog.author : blog.authorEn}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span>{blog.date}</span>
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#e6b325] transition-colors leading-snug line-clamp-2">
                    {lang === 'bn' ? blog.title : blog.titleEn}
                  </h4>

                  <p className="text-gray-400 font-sans text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {lang === 'bn' ? blog.content : blog.contentEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0d5c46]/20 mt-5 flex justify-between items-center">
                  {/* Tags list */}
                  <div className="flex space-x-1.5 overflow-hidden">
                    {blog.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-sans text-gray-400 bg-[#0d5c46]/10 px-2 py-0.5 rounded-full border border-[#0d5c46]/20">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-xs font-sans font-bold text-[#e6b325] hover:text-white flex items-center space-x-1 group/btn cursor-pointer"
                  >
                    <span>{lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Full'}</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="py-12 text-center text-gray-400 font-sans text-sm">
            {lang === 'bn' ? 'কোনো ব্লগ পাওয়া যায়নি।' : 'No articles found matching search query.'}
          </div>
        )}

      </div>

      {/* Blog Full Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div 
            className="absolute inset-0 bg-[#041410]/95 backdrop-blur-sm cursor-pointer" 
            onClick={() => setSelectedBlog(null)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#05221b] border-2 border-[#e6b325]/40 rounded-2xl shadow-2xl relative w-full max-w-3xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
          >
            {/* Image Banner */}
            <div className="relative h-56 sm:h-64">
              <img 
                src={selectedBlog.imageUrl} 
                alt={selectedBlog.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05221b] via-transparent to-transparent opacity-80" />
              
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#041410]/80 text-white hover:text-[#e6b325] transition-colors cursor-pointer border border-[#0d5c46]/40"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] bg-[#e6b325] text-black font-display font-extrabold px-2.5 py-1 rounded-full uppercase">
                  {lang === 'bn' ? selectedBlog.category : selectedBlog.categoryEn}
                </span>
                <h3 className="font-display font-extrabold text-lg sm:text-2xl text-white mt-2 leading-tight">
                  {lang === 'bn' ? selectedBlog.title : selectedBlog.titleEn}
                </h3>
              </div>
            </div>

            {/* Modal Body Scroll */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
              
              {/* Meta information */}
              <div className="flex items-center space-x-4 text-xs text-gray-400 font-sans border-b border-[#0d5c46]/20 pb-4">
                <span className="flex items-center space-x-1.5">
                  <User className="w-4 h-4 text-[#e6b325]" />
                  <span className="font-semibold text-white">{lang === 'bn' ? selectedBlog.author : selectedBlog.authorEn}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{selectedBlog.date}</span>
                </span>
              </div>

              {/* Readable text content */}
              <p className="text-gray-200 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line text-left">
                {lang === 'bn' ? selectedBlog.content : selectedBlog.contentEn}
              </p>

              {/* Tags checklist */}
              <div className="flex flex-wrap gap-2 pt-4">
                {selectedBlog.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-sans text-[#e6b325] bg-[#e6b325]/10 px-3 py-1 rounded-full border border-[#e6b325]/20 flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#0d5c46]/30 bg-[#041a14] flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                Aminul Consultancy - {lang === 'bn' ? 'জ্ঞানের আঙিনা' : 'Engineering Blogs'}
              </p>
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] px-5 py-2 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg text-center"
              >
                {lang === 'bn' ? 'ফ্রি প্রজেক্ট কনসাল্টেশন বুক করুন' : 'Book Free Consultancy Session'}
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </section>
  );
};
export default BlogComponent;
