import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { LayoutGrid, Ruler, Landmark, Calendar, User, MapPin, Eye, X, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const { lang, projects, searchQuery } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Lightbox & slider states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Get unique categories for filters
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.categoryEn)))];

  const filteredProjects = projects.filter(project => {
    // Search query match
    let searchMatch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      searchMatch = project.title.toLowerCase().includes(query) || 
                    project.titleEn.toLowerCase().includes(query) || 
                    project.description.toLowerCase().includes(query) ||
                    project.descriptionEn.toLowerCase().includes(query);
    }

    // Category filter match
    const categoryMatch = activeCategory === 'All' || project.categoryEn === activeCategory;

    return searchMatch && categoryMatch;
  });

  // Handle Before/After slider movement
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="projects" className="py-24 bg-[#05221b] relative">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0d5c46] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[#e6b325] font-display font-bold">
            {lang === 'bn' ? 'আমাদের সফল নির্মাণসমূহ' : 'Our Featured Projects'}
          </h3>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'বাস্তবায়িত প্রজেক্ট গ্যালারি' : 'Architectural Portfolio'}
          </h2>
          <div className="w-16 h-1 bg-[#e6b325] mx-auto rounded-full" />
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            {lang === 'bn' ? (
              "আমাদের আধুনিক ড্রয়িং, রাজউক অনুমোদন এবং নিখুঁত সিভিল ইঞ্জিনিয়ারিংয়ে সম্পন্ন করা চমৎকার কিছু প্রজেক্ট নিচে তুলে ধরা হলো।"
            ) : (
              "Review our structural masterpieces, luxurious duplexes, and commercial towers built under direct engineering control."
            )}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            let label = cat;
            if (lang === 'bn') {
              if (cat === 'All') label = 'সবগুলো';
              else if (cat === 'Duplex') label = 'ডুপ্লেক্স';
              else if (cat === 'Residential') label = 'আবাসিক';
              else if (cat === 'Commercial') label = 'কমার্শিয়াল';
              else if (cat === 'Interior') label = 'ইন্টেরিয়র';
              else if (cat === 'Apartment') label = 'অ্যাপার্টমেন্ট';
            }
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-sans font-medium text-xs sm:text-sm cursor-pointer transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-[#e6b325] text-black shadow-lg font-bold shadow-[#e6b325]/30' 
                    : 'bg-[#041a14] text-gray-300 hover:text-white border border-[#0d5c46]/50 hover:border-[#e6b325]/50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#041812] border border-[#0d5c46]/40 rounded-2xl overflow-hidden hover:border-[#e6b325]/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Cover Photo */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.images[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041812] via-transparent to-transparent opacity-60" />
                
                {/* Floating Tag */}
                <span className="absolute top-4 left-4 bg-[#e6b325] text-black font-display font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  {lang === 'bn' ? project.category : project.categoryEn}
                </span>

                {/* Quick view button overlay */}
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveImageIndex(0);
                    setSliderPosition(50);
                  }}
                  className="absolute bottom-4 right-4 bg-[#0d5c46]/95 backdrop-blur-sm border border-[#e6b325]/30 text-white hover:text-[#e6b325] p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 text-left flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#e6b325]" />
                    <span>{lang === 'bn' ? project.location : project.locationEn}</span>
                  </div>
                  
                  <h4 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#e6b325] transition-colors leading-snug">
                    {lang === 'bn' ? project.title : project.titleEn}
                  </h4>

                  <p className="text-gray-400 font-sans text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {lang === 'bn' ? project.description : project.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0d5c46]/30 mt-5 flex justify-between items-center">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-[#e6b325]">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{project.area}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveImageIndex(0);
                      setSliderPosition(50);
                    }}
                    className="text-xs font-sans font-bold text-white hover:text-[#e6b325] transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'বিস্তারিত গ্যালারি' : 'View Gallery & Compare'} &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-gray-400 font-sans text-sm">
            {lang === 'bn' ? 'কোনো প্রজেক্ট পাওয়া যায়নি।' : 'No projects found matching selection.'}
          </div>
        )}

      </div>

      {/* Lightbox Gallery & Before/After Comparison Slider Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div 
            className="absolute inset-0 bg-[#041410]/95 backdrop-blur-sm cursor-pointer" 
            onClick={() => setSelectedProject(null)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#05221b] border-2 border-[#e6b325]/50 rounded-2xl shadow-2xl relative w-full max-w-4xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-left"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#0d5c46]/30 bg-[#041a14] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-display font-extrabold text-[#e6b325] uppercase tracking-widest bg-[#e6b325]/10 px-2.5 py-1 rounded-full">
                  {lang === 'bn' ? selectedProject.category : selectedProject.categoryEn}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-2 leading-tight">
                  {lang === 'bn' ? selectedProject.title : selectedProject.titleEn}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-full bg-[#05221b] text-gray-400 hover:text-[#e6b325] transition-colors cursor-pointer border border-[#0d5c46]/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Contents */}
            <div className="overflow-y-auto flex-grow p-4 sm:p-8 space-y-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Large interactive gallery with thumbnails OR Before-After slider */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Option switch to choose between gallery or before/after slider */}
                  <div className="flex bg-[#041410] p-1 rounded-lg border border-[#0d5c46]/30">
                    <button
                      onClick={() => setActiveImageIndex(0)}
                      className={`flex-1 text-center py-1.5 rounded-md font-sans text-xs font-semibold cursor-pointer transition-colors ${
                        activeImageIndex !== -1 ? 'bg-[#0d5c46] text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang === 'bn' ? 'এইচডি ফটো গ্যালারি' : 'HD Photos'}
                    </button>
                    {(selectedProject.beforeImageUrl || selectedProject.afterImageUrl) && (
                      <button
                        onClick={() => setActiveImageIndex(-1)}
                        className={`flex-1 text-center py-1.5 rounded-md font-sans text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center space-x-1 ${
                          activeImageIndex === -1 ? 'bg-[#e6b325] text-black font-bold' : 'text-[#e6b325] hover:bg-[#e6b325]/5'
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'পূর্বে বনাম পরে (Before vs After)' : 'Before vs After'}</span>
                      </button>
                    )}
                  </div>

                  {/* Main display panel */}
                  {activeImageIndex !== -1 ? (
                    // Regular gallery view
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#0d5c46]/40 bg-[#041410]">
                      <img 
                        src={selectedProject.images[activeImageIndex] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"} 
                        alt="Project Photo" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Left/Right navigation inside main photo */}
                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#041410]/80 text-white hover:text-[#e6b325] transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setActiveImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#041410]/80 text-white hover:text-[#e6b325] transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    // Before/After comparison slider view
                    <div 
                      ref={sliderRef}
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                      onMouseDown={() => { isDragging.current = true; }}
                      onTouchStart={() => { isDragging.current = true; }}
                      onClick={(e) => handleSliderMove(e.clientX)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#e6b325] bg-[#041410] comparison-slider-container cursor-ew-resize"
                    >
                      {/* Before (Background) image */}
                      <img 
                        src={selectedProject.beforeImageUrl || "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80"} 
                        alt="Before Construction" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                      <span className="absolute bottom-3 left-3 z-20 bg-black/75 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                        {lang === 'bn' ? 'পূর্বে (Before)' : 'Before'}
                      </span>

                      {/* After (Foreground) image */}
                      <div 
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                      >
                        <img 
                          src={selectedProject.afterImageUrl || selectedProject.images[0]} 
                          alt="After Construction" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-3 right-3 z-20 bg-[#0d5c46]/90 px-2 py-1 rounded text-[10px] font-bold text-[#e6b325] uppercase tracking-wider">
                        {lang === 'bn' ? 'পরে (After)' : 'After'}
                      </span>

                      {/* Slider Divider Bar */}
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-[#e6b325] z-30 pointer-events-none"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-[#e6b325] text-[#e6b325] flex items-center justify-center shadow-lg">
                          <Sliders className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thumbnails below if viewing regular gallery */}
                  {activeImageIndex !== -1 && selectedProject.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto py-1">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            activeImageIndex === idx ? 'border-[#e6b325] scale-95' : 'border-[#0d5c46]/40 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                {/* Right Side: Key Metadata Card */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* Bento Spec list */}
                  <div className="bg-[#041a14] border border-[#0d5c46]/50 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs uppercase tracking-wider text-[#e6b325] font-display font-bold">
                      {lang === 'bn' ? 'প্রজেক্ট স্পেসিফিকেশন' : 'Project Specifications'}
                    </h4>

                    <div className="space-y-3">
                      {/* Client */}
                      <div className="flex items-center space-x-3 text-sm border-b border-[#0d5c46]/20 pb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div className="text-left">
                          <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'গ্রাহক' : 'Client Name'}</p>
                          <p className="font-sans font-medium text-white">{selectedProject.clientName || 'N/A'}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-3 text-sm border-b border-[#0d5c46]/20 pb-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div className="text-left">
                          <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'অবস্থান' : 'Location'}</p>
                          <p className="font-sans font-medium text-white">{lang === 'bn' ? selectedProject.location : selectedProject.locationEn}</p>
                        </div>
                      </div>

                      {/* Area */}
                      <div className="flex items-center space-x-3 text-sm border-b border-[#0d5c46]/20 pb-2">
                        <Ruler className="w-4 h-4 text-[#e6b325]" />
                        <div className="text-left">
                          <p className="text-[10px] text-[#e6b325] uppercase font-sans">{lang === 'bn' ? 'মোট আয়তন' : 'Total Area'}</p>
                          <p className="font-mono font-semibold text-white">{selectedProject.area}</p>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="flex items-center space-x-3 text-sm border-b border-[#0d5c46]/20 pb-2">
                        <Landmark className="w-4 h-4 text-[#e6b325]" />
                        <div className="text-left">
                          <p className="text-[10px] text-[#e6b325] uppercase font-sans">{lang === 'bn' ? 'নির্মাণ বাজেট' : 'Project Budget'}</p>
                          <p className="font-sans font-semibold text-white">{selectedProject.budget}</p>
                        </div>
                      </div>

                      {/* Completion Date */}
                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div className="text-left">
                          <p className="text-[10px] text-gray-400 uppercase font-sans">{lang === 'bn' ? 'সমাপ্তির তারিখ' : 'Completion'}</p>
                          <p className="font-sans font-medium text-white">{selectedProject.completionDate}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Summary/Description paragraph */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider text-[#e6b325] font-display font-bold">
                      {lang === 'bn' ? 'প্রজেক্ট ডেসক্রিপশন' : 'Engineering Challenges & Solution'}
                    </h4>
                    <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed text-left">
                      {lang === 'bn' ? selectedProject.description : selectedProject.descriptionEn}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#0d5c46]/30 bg-[#041a14] flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                Aminul Consultancy - {lang === 'bn' ? 'শতভাগ গুণগত মানের নিশ্চয়তা' : '100% Quality & Standard Assured'}
              </p>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#0d5c46] hover:bg-[#0d5c46]/80 text-white border border-[#e6b325] px-5 py-2.5 rounded-full font-sans font-bold text-xs cursor-pointer shadow-lg text-center"
              >
                {lang === 'bn' ? 'অনুরূপ প্রজেক্ট কন্সাল্টেশন বুক করুন' : 'Book Consultancy on Similar Project'}
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </section>
  );
};
