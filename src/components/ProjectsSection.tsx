import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { ProjectItem } from "../types";
import { Filter, Eye, DollarSign, MapPin, Calendar, User, ArrowRight, X, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ProjectsSection: React.FC = () => {
  const { data, lang } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  // Before/After comparison slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", labelBn: "সব প্রজেক্ট", labelEn: "All Projects" },
    { id: "duplex", labelBn: "ডুপ্লেক্স ভিলা", labelEn: "Duplex" },
    { id: "apartment", labelBn: "অ্যাপার্টমেন্ট", labelEn: "Apartments" },
    { id: "commercial", labelBn: "বাণিজ্যিক ভবন", labelEn: "Commercial" },
    { id: "interior", labelBn: "ইন্টেরিয়র", labelEn: "Interiors" }
  ];

  // Filter project items
  const filteredProjects = activeFilter === "all"
    ? data.projects
    : data.projects.filter((p) => p.category === activeFilter);

  // Before/After slider dragging calculations
  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button held
      handleSliderMove(e.clientX);
    }
  };

  const handleOpenProject = (p: ProjectItem) => {
    setSelectedProject(p);
    setActiveImageIndex(0);
    setSliderPos(50); // Reset comparison slider
  };

  return (
    <section id="projects" className="py-20 bg-[#041a14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#E6B325] text-xs font-bold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "প্রজেক্ট পোর্টফোলিও" : "Featured Engineering Portfolio"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === "bn" ? "আমাদের সাম্প্রতিক তৈরি করা স্থাপনা সমূহ" : "Masterpieces of Structural Craft"}
          </h2>
          <div className="w-20 h-1 bg-[#E6B325] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-[#E6B325] text-black border-[#E6B325] font-bold shadow-md"
                  : "bg-[#0b3c2e]/60 border-white/10 text-gray-300 hover:border-[#E6B325]/40"
              }`}
            >
              {lang === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleOpenProject(proj)}
                className="bg-[#0b3c2e] border border-white/15 hover:border-[#E6B325]/40 rounded-xl overflow-hidden cursor-pointer group shadow-lg flex flex-col h-full relative"
              >
                {/* Image Wrap */}
                <div className="h-56 relative overflow-hidden bg-emerald-950 shrink-0">
                  <img
                    src={proj.image}
                    alt={proj.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 bg-black/85 text-[#E6B325] border border-[#E6B325]/30 text-[10px] font-bold py-1 px-2.5 rounded uppercase">
                    {proj.category}
                  </span>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#E6B325] text-black rounded-full p-3 font-bold flex items-center space-x-1 shadow">
                      <Eye className="w-5 h-5" />
                      <span className="text-xs">{lang === "bn" ? "বিস্তারিত দেখুন" : "View Details"}</span>
                    </div>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#E6B325] transition-colors leading-tight">
                      {lang === "bn" ? proj.titleBn : proj.titleEn}
                    </h3>
                    
                    <div className="flex items-center space-x-1 text-gray-300 text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#E6B325]" />
                      <span>{lang === "bn" ? proj.locationBn : proj.locationEn}</span>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {lang === "bn" ? proj.descBn : proj.descEn}
                    </p>
                  </div>

                  {/* Meta Specs footer */}
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-300 font-mono">
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-sans">SFT Area</span>
                      <strong className="text-white font-bold">{proj.areaSft.toLocaleString()} Sft</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 block uppercase font-sans">Budget Est.</span>
                      <strong className="text-[#E6B325] font-bold">
                        {lang === "bn" ? `${proj.budgetLakh} লাখ` : `${proj.budgetLakh} Lakh BDT`}
                      </strong>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Portfolio Detail & Before/After Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              {/* Backing tint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              ></motion.div>

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#0b3c2e] border-2 border-[#E6B325]/40 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
              >
                {/* Header controls */}
                <div className="sticky top-0 bg-[#0b3c2e] px-6 py-4 border-b border-white/10 flex justify-between items-center z-20">
                  <div>
                    <span className="text-xs font-bold text-[#E6B325] uppercase tracking-wider">
                      PROJECT PORTFOLIO SPECIFICATIONS
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mt-1">
                      {lang === "bn" ? selectedProject.titleBn : selectedProject.titleEn}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-8">
                  
                  {/* Slider & Images Selector Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Media Display Block (L: 7 Columns) */}
                    <div className="col-span-1 lg:col-span-7 space-y-4">
                      
                      {/* BEFORE/AFTER DRAGGABLE COMPARISON (if available) */}
                      {selectedProject.beforeImage && selectedProject.afterImage ? (
                        <div>
                          <p className="text-[10px] text-[#E6B325] font-extrabold uppercase tracking-widest mb-2 flex items-center space-x-1">
                            <span>Interactive slider: drag across the image to see our magic transformation!</span>
                          </p>
                          <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onTouchMove={handleTouchMove}
                            className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden cursor-ew-resize select-none border border-[#E6B325]/20 bg-emerald-950"
                          >
                            {/* Before Image (underneath) */}
                            <img
                              src={selectedProject.beforeImage}
                              alt="Before site state"
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 bg-black/70 text-red-400 border border-red-400/20 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                              {lang === "bn" ? "পূর্বে (খালি জমি/খসড়া)" : "BEFORE (RAW SITE)"}
                            </div>

                            {/* After Image (clipped on top) */}
                            <div
                              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                              style={{ width: `${sliderPos}%` }}
                            >
                              <img
                                src={selectedProject.afterImage}
                                alt="After building completed state"
                                className="absolute inset-y-0 left-0 w-full h-full object-cover pointer-events-none max-w-none"
                                style={{ width: containerRef.current?.getBoundingClientRect().width }}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div
                              className="absolute top-3 bg-black/75 text-emerald-400 border border-emerald-400/20 text-[10px] font-bold px-2 py-0.5 rounded shadow"
                              style={{ left: `calc(${sliderPos}% - 120px)` }}
                            >
                              {lang === "bn" ? "পরে (আমিনুল ইন্জিনিয়ারিং)" : "AFTER (FINISHED BY AMINUL)"}
                            </div>

                            {/* Split divider indicator */}
                            <div
                              className="absolute inset-y-0 w-1 bg-[#E6B325] pointer-events-none"
                              style={{ left: `${sliderPos}%` }}
                            >
                              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#E6B325] to-[#B38600] text-black shadow-lg flex items-center justify-center font-bold text-sm">
                                ↔
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Standard gallery carousel */
                        <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-emerald-950 border border-white/10">
                          <img
                            src={
                              activeImageIndex === 0
                                ? selectedProject.image
                                : (selectedProject.additionalImages && selectedProject.additionalImages[activeImageIndex - 1]) || selectedProject.image
                            }
                            alt="Project snapshot"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Photo Gallery Thumbnails Selector */}
                      {selectedProject.additionalImages && selectedProject.additionalImages.length > 0 && (
                        <div className="flex space-x-2">
                          <button
                            key="main"
                            onClick={() => setActiveImageIndex(0)}
                            className={`w-16 h-12 rounded border-2 overflow-hidden transition ${
                              activeImageIndex === 0 ? "border-[#E6B325]" : "border-transparent opacity-60"
                            }`}
                          >
                            <img src={selectedProject.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                          {selectedProject.additionalImages.map((imgUrl, i) => (
                            <button
                              key={`additional-${i}`}
                              onClick={() => setActiveImageIndex(i + 1)}
                              className={`w-16 h-12 rounded border-2 overflow-hidden transition ${
                                activeImageIndex === i + 1 ? "border-[#E6B325]" : "border-transparent opacity-60"
                              }`}
                            >
                              <img src={imgUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      )}

                    </div>

                    {/* Metadata specs side block (R: 5 Columns) */}
                    <div className="col-span-1 lg:col-span-5 space-y-5">
                      
                      {/* Stats Table */}
                      <div className="bg-[#042018] rounded-xl p-5 border border-white/5 space-y-3.5">
                        <h4 className="text-xs font-extrabold text-[#E6B325] tracking-wider uppercase border-b border-white/10 pb-2">
                          {lang === "bn" ? "প্রজেক্ট স্পেসিফিকেশন" : "CORE TECHNICAL ATTRIBUTES"}
                        </h4>

                        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                          
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase font-sans">CLIENT NAME</span>
                            <div className="text-white font-bold font-sans">
                              {lang === "bn" ? selectedProject.clientNameBn : selectedProject.clientNameEn}
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase font-sans">BUILDING STYLE</span>
                            <div className="text-[#E6B325] font-bold uppercase font-sans">
                              {selectedProject.category}
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase font-sans">TOTAL AREA</span>
                            <div className="text-white font-bold">
                              {selectedProject.areaSft.toLocaleString()} Sft
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase font-sans">BUDGET SCALE</span>
                            <div className="text-[#E6B325] font-bold">
                              {lang === "bn" ? `${selectedProject.budgetLakh} লক্ষ টাকা` : `${selectedProject.budgetLakh} Lakh BDT`}
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase font-sans">LOCATION</span>
                            <div className="text-white font-bold font-sans">
                              {lang === "bn" ? selectedProject.locationBn : selectedProject.locationEn}
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase font-sans">HANDOVER DATE</span>
                            <div className="text-white font-bold">
                              {selectedProject.completionDate}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Brief description */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-extrabold text-[#E6B325] tracking-wider uppercase">
                          {lang === "bn" ? "প্রজেক্ট ওভারভিউ" : "PROJECT OVERVIEW"}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed font-sans">
                          {lang === "bn" ? selectedProject.descBn : selectedProject.descEn}
                        </p>
                      </div>

                    </div>

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
