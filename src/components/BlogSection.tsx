import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { BlogItem } from "../types";
import { Calendar, User, ArrowRight, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const BlogSection: React.FC = () => {
  const { data, lang } = useApp();
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  return (
    <section id="blog" className="py-20 bg-[#041a14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "আমাদের ব্লগ ও পরামর্শ" : "Engineering Insights"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "নিরাপদ ভবন নির্মাণের প্রয়োজনীয় টিপস" : "Smart Construction Guidelines"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Blogs grid list */}
        {data.blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {data.blogs.map((blog) => (
              <motion.article
                key={blog.id}
                whileHover={{ y: -5 }}
                className="bg-[#0b3c2e] border border-white/10 hover:border-[#E6B325]/30 rounded-2xl overflow-hidden shadow-lg flex flex-col h-full"
              >
                
                {/* Header Photo */}
                <div className="h-52 w-full overflow-hidden bg-emerald-950 relative">
                  <img
                    src={blog.image || "https://picsum.photos/seed/blog/500/300"}
                    alt={blog.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/80 text-[#E6B325] border border-[#E6B325]/30 text-[9px] font-bold py-0.5 px-2 rounded uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Meta dates */}
                    <div className="flex items-center space-x-3 text-[11px] text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-[#E6B325]" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-[#E6B325]" />
                        <span>{lang === "bn" ? blog.authorBn : blog.authorEn}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                      {lang === "bn" ? blog.titleBn : blog.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed font-sans">
                      {lang === "bn" ? blog.contentBn : blog.contentEn}
                    </p>

                  </div>

                  {/* Read button */}
                  <div className="pt-4 mt-4 border-t border-white/5">
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="flex items-center space-x-1 text-xs font-bold text-[#E6B325] hover:text-white transition duration-200 cursor-pointer"
                    >
                      <span>{lang === "bn" ? "সম্পূর্ণ আর্টিকেল পড়ুন" : "Read Full Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm">
            No blog insights posted yet. Create posts in the admin panel.
          </div>
        )}

        {/* Read Article Modal Lightbox */}
        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBlog(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#0b3c2e] border-2 border-[#E6B325]/40 rounded-2xl max-w-2xl w-full relative z-10 shadow-2xl overflow-hidden"
              >
                {/* Header Close bar */}
                <div className="sticky top-0 bg-[#0b3c2e] px-5 py-4 border-b border-white/10 flex justify-between items-center z-10">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4.5 h-4.5 text-[#E6B325]" />
                    <span className="text-xs font-bold text-[#E6B325] uppercase tracking-wider">
                      AMINUL ENGINEERING BLOG
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="p-1.5 hover:bg-white/10 rounded-full text-white cursor-pointer transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable body content */}
                <div className="max-h-[75vh] overflow-y-auto">
                  
                  {/* Big Banner */}
                  <div className="h-60 bg-emerald-950 relative w-full">
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Metas */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-3">
                      <div>🗓️ {selectedBlog.date}</div>
                      <div>✍️ {lang === "bn" ? selectedBlog.authorBn : selectedBlog.authorEn}</div>
                      <div className="bg-[#E6B325]/15 text-[#E6B325] text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        {selectedBlog.category}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                      {lang === "bn" ? selectedBlog.titleBn : selectedBlog.titleEn}
                    </h3>

                    <p className="text-sm text-gray-200 leading-relaxed font-sans whitespace-pre-wrap font-light">
                      {lang === "bn" ? selectedBlog.contentBn : selectedBlog.contentEn}
                    </p>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
