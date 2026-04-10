"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Users, Activity, FileText, Bell, MapPin, Mail, Phone, ArrowRight, ChevronRight, Award, Trophy, HeartPulse, ShieldPlus, Rocket, ChevronDown, Menu, X, MessageCircle, Image as ImageIcon, ArrowUpRight } from "lucide-react";

// --- Helper: Formats file names (e.g. "anatomy-lab-1.jpg" -> "Anatomy Lab 1") ---
function formatImageName(pathStr: string) {
  try {
    const filename = pathStr.split('/').pop() || "";
    // Remove extension
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    // Replace hyphens/underscores with spaces and capitalize each word
    return nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  } catch {
    return "Advanced Equipment";
  }
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const mobileMenuVariants = {
  closed: { opacity: 0, y: "-100%", scale: 0.95 },
  open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

// GNM Roadmap Data
const gnmRoadmap = [
  { year: "1st Year", title: "Basics & Foundation", desc: "Master the human body with Anatomy, learn Nursing Fundamentals, and practice basic patient care.", icon: BookOpen },
  { year: "2nd Year", title: "Hospital Training", desc: "Move to the clinical floor. Learn to administer injections, manage ward duties, and provide direct patient care.", icon: Activity },
  { year: "3rd Year", title: "Advanced Specialization", desc: "Midwifery (delivery), child care, community health management.", icon: Users },
  { year: "Final Phase", title: "6-Month Internship", desc: "Transition fully from a student into a skilled healthcare professional.", icon: Rocket }
];

// BSc Nursing Roadmap Data
const bscRoadmap = [
  { year: "1st Year", title: "Core Sciences", desc: "Deep dive into Anatomy, Physiology, Nursing Fundamentals, and rigorous basic patient care training.", icon: BookOpen },
  { year: "2nd Year", title: "Clinical Start", desc: "Enter Medical-Surgical units. Study Pharmacology and take on active ward duty.", icon: ShieldPlus },
  { year: "3rd Year", title: "Advanced Care", desc: "Master Child Care, Mental Health (Psychiatry), and Community Health.", icon: HeartPulse },
  { year: "4th Year", title: "Specialization & Internship", desc: "High-intensity training in ICU, OT, nursing research, and full hospital internship.", icon: Award }
];

// Latest Notices Data
const collegeNotices = [
  { title: "B.Sc Nursing 1st Year Exam Schedule Released", date: "Oct 15, 2026", tag: "Exams" },
  { title: "Semester Fee Submission Deadline Extended", date: "Oct 12, 2026", tag: "Finance" },
  { title: "Annual Sports Meet Registration Open", date: "Oct 10, 2026", tag: "Events" },
  { title: "Clinical Posting Roster Updated for 2nd Year", date: "Oct 08, 2026", tag: "Academic" },
];

export default function ClientHome({ labImages = [], galleryImages = [] }: any) {
  const [rollNumber, setRollNumber] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [labIndex, setLabIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    if (galleryImages.length > 1) {
      const galleryInterval = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
      }, 3500);
      return () => clearInterval(galleryInterval);
    }
  }, [galleryImages.length]);

  useEffect(() => {
    if (labImages.length > 1) {
      const labInterval = setInterval(() => {
        setLabIndex((prev) => (prev + 1) % labImages.length);
      }, 3000);
      return () => clearInterval(labInterval);
    }
  }, [labImages.length]);

  const closeMenu = () => setMobileMenuOpen(false);

  const NavLinks = ({ className, linkClassName, onClick = () => {}, onContactClick = () => {} }: any) => (
    <div className={className}>
      <a href="/#welcome" className={linkClassName} onClick={onClick}>Home</a>
      <a href="/#toppers" className={linkClassName} onClick={onClick}>Toppers</a>
      <a href="/#courses" className={linkClassName} onClick={onClick}>Programs</a>
      <a href="/#roadmap" className={linkClassName} onClick={onClick}>Career Paths</a>
      <a href="/gallery" className={linkClassName} onClick={onClick}>Gallery</a>
      <button className={linkClassName} onClick={() => { onClick(); onContactClick(); }}>Contact Us</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden relative">
      
      {/* --- Contact Info Modal Popup --- */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setContactModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
              <button onClick={() => setContactModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"><X className="h-5 w-5" /></button>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Get in Touch</h3>
              <div className="space-y-6">
                 <div className="flex items-start gap-4 group">
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors"><MapPin className="text-blue-600 h-6 w-6" /></div>
                   <div>
                     <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">Address</p>
                     <p className="text-slate-700 font-semibold leading-relaxed">Veterinary road, near Kanke Block Chowk Road, Patratoli, Ranchi, Arsande, Jharkhand 834006</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 group">
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors"><Phone className="text-blue-600 h-6 w-6" /></div>
                   <div>
                     <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">Mobile No.</p>
                     <a href="tel:+917979826078" className="text-slate-700 font-bold hover:text-blue-600 block transition-colors">+91-7979826078</a>
                     <a href="tel:+919304504465" className="text-slate-700 font-bold hover:text-blue-600 block transition-colors">+91-9304504465</a>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 group">
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl group-hover:bg-green-50 transition-colors"><MessageCircle className="text-green-600 h-6 w-6" /></div>
                   <div>
                     <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">WhatsApp</p>
                     <a href="https://wa.me/917979826078?text=Hi" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:text-green-600 block transition-colors">+91-7979826078 <span className="text-green-600/70 text-xs ml-1 font-medium">(Click to chat)</span></a>
                     <a href="https://wa.me/919304504465?text=Hi" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:text-green-600 block transition-colors">+91-9304504465 <span className="text-green-600/70 text-xs ml-1 font-medium">(Click to chat)</span></a>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 group">
                   <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors"><Mail className="text-blue-600 h-6 w-6" /></div>
                   <div>
                     <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">Email</p>
                     <a href="mailto:info@divinenursing.com" className="text-slate-700 font-bold hover:text-blue-600 transition-colors">info@divinenursing.com</a>
                   </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Mobile Navigation Menu Drawer --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial="closed" animate="open" exit="closed" variants={mobileMenuVariants} className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-[70] pt-28 px-6 md:hidden flex flex-col gap-6 font-bold text-2xl text-slate-900 shadow-2xl">
            <button onClick={closeMenu} className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-900"><X className="h-7 w-7" /></button>
            <NavLinks className="flex flex-col gap-6" linkClassName="text-left hover:text-blue-600 transition-colors py-3 border-b border-slate-100" onClick={closeMenu} onContactClick={() => setContactModalOpen(true)} />
            <motion.a href="#apply" onClick={closeMenu} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all text-center mt-6">Apply Now</motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- APPLE LIQUID DISPLAY NAVIGATION --- */}
      <div className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="pointer-events-auto w-full max-w-6xl bg-white/80 backdrop-blur-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-4 py-3 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3 pl-2">
            <div className="bg-slate-50 rounded-full p-1 flex items-center justify-center border border-slate-100"><img src="/image_3.png" alt="Divine Nursing College Logo" className="h-7 md:h-8 w-auto drop-shadow-sm" /></div>
            <span className="text-lg md:text-xl font-black text-blue-950 tracking-tight hidden sm:block">Divine Nursing</span>
          </div>
          <NavLinks className="hidden md:flex gap-1 font-bold text-slate-600 text-sm" linkClassName="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-blue-700 transition-all duration-300" onContactClick={() => setContactModalOpen(true)} />
          <div className="flex items-center gap-2">
            <motion.a href="#apply" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:inline-block bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-blue-700 transition-colors text-sm">Apply Now</motion.a>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"><Menu className="h-6 w-6" /></button>
          </div>
        </motion.nav>
      </div>

      {/* --- 1. HERO SECTION: BENTO BOX (DARK MODE) --- */}
      <section id="welcome" className="relative w-full pt-24 md:pt-28 pb-6 md:pb-12 bg-slate-950 z-0 flex flex-col items-center justify-center min-h-0 md:min-h-[90vh]">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-4 md:gap-8 h-full items-stretch">
          
          {/* Left Block: College Image (Dark Theme) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-[75%] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800 h-[60vh] md:h-auto md:min-h-[500px] lg:min-h-[75vh] flex bg-black group"
          >
            <img src="/image_4.png" alt="Divine Nursing College Campus" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-5 left-5 right-5 lg:hidden flex flex-col items-start z-10 text-left">
              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full font-bold text-[10px] text-blue-400 mb-2 shadow-sm border border-slate-700">Ranchi, Jharkhand</div>
              <h2 className="text-2xl font-black text-white drop-shadow-md leading-tight">Legacy of Compassion.</h2>
            </div>
          </motion.div>

          {/* Right Block: Notices (Dark Theme, Hidden on Mobile) */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.98, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
             className="hidden lg:flex w-full lg:w-[25%] bg-slate-900 border border-slate-800 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-xl flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-3 tracking-tight shrink-0">
                <Bell className="text-blue-500" /> Latest Notices
              </h2>
              
              <div className="relative flex-grow overflow-hidden h-full my-2" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                <motion.div className="flex flex-col gap-4 absolute w-full" animate={{ y: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }}>
                    {[...collegeNotices, ...collegeNotices].map((notice, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-800 hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer flex justify-between items-center bg-slate-950 shadow-sm w-full group">
                        <div>
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-900/30 px-2 py-1 rounded-md mb-2 inline-block border border-blue-800/50">{notice.tag}</span>
                        <h4 className="font-bold text-slate-200 text-sm leading-snug group-hover:text-white transition-colors">{notice.title}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 font-medium">{notice.date}</p>
                        </div>
                    </div>
                    ))}
                </motion.div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 shrink-0">
                <a href="#apply" className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-colors text-center flex items-center justify-center gap-2">
                  Apply for Admission <ArrowRight className="h-5 w-5"/>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="mt-4 md:mt-8 mb-4 md:mb-0 bg-slate-800 p-2.5 md:p-3 rounded-full shadow-sm border border-slate-700 text-blue-400 z-10">
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
        </motion.div>
      </section>

      {/* --- NEW: MOBILE-ONLY TICKER BELOW HOME PAGE --- */}
      <div className="block md:hidden w-full relative z-20 border-b border-slate-200">
        <a href="https://wa.me/917979826078?text=Hi,%20I'm%20interested%20in%20taking%20admission%20in%20Divine%20Nursing%20College." target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all">
          <div className="flex items-center py-2.5">
            <motion.div className="flex whitespace-nowrap text-white font-black text-xs tracking-widest uppercase items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity }}>
              {[...Array(8)].map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="mx-3">Admission Open • Contact +91 7979826078</span>
                  <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-[10px] shadow-md flex items-center gap-1.5">Click Now <ArrowRight className="h-3 w-3" /></span>
                  <span className="mx-3">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </a>
      </div>

      {/* --- 2. TOPPERS HERO SECTION (Light Mode Resumes Here) --- */}
      <section id="toppers" className="relative pt-8 pb-10 md:py-24 overflow-hidden bg-white flex flex-col justify-center min-h-fit md:min-h-[85vh] z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-100 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full mb-8 md:mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} variants={fadeInUp} className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 px-4 py-1.5 md:px-5 md:py-2 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 shadow-sm"><Trophy className="h-3 w-3 md:h-5 md:w-5" /> State Toppers 2025</div>
            <h1 className="text-3xl md:text-7xl lg:text-8xl font-black text-slate-900 uppercase tracking-tight drop-shadow-sm mb-2 md:mb-4 leading-none">Producing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Champions</span></h1>
            <p className="text-sm md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed px-4">Divine Nursing College proudly celebrates our students securing <strong className="text-slate-900">Rank 1 & Rank 3</strong> across Jharkhand in GNM Examinations.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
            {/* Rank 1 Card */}
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="relative bg-white rounded-3xl p-1.5 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-amber-300 transition-all duration-500 group overflow-hidden">
              <div className="bg-slate-50 rounded-[1.3rem] h-full flex flex-col items-center p-6 md:p-8 relative z-10">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 md:-top-5 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-black px-4 py-1.5 md:px-6 md:py-2 rounded-full text-sm md:text-lg shadow-md uppercase tracking-widest z-20">State Rank 1</motion.div>
                <div className="relative mt-6 md:mt-8 mb-4 md:mb-6">
                  {isMounted && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div key={`b1-${i}`} className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]"
                            animate={{ x: [0, Math.cos((i*30)*(Math.PI/180)) * 160], y: [0, Math.sin((i*30)*(Math.PI/180)) * 160], scale: [0, 1.5, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }} />
                      ))}
                    </div>
                  )}
                  <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-slate-200 ring-4 ring-amber-400"><img src="/image_0.png" alt="Sheetal Tara Guria" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                </div>
                <h2 className="text-lg md:text-4xl font-black text-slate-900 text-center mb-1">Sheetal Tara Guria</h2>
                <p className="text-amber-600 text-xs md:text-lg font-bold uppercase tracking-wider mb-1">GNM Examination</p>
                <p className="text-slate-500 font-semibold text-[10px] md:text-base">Batch 2022 - 2025</p>
              </div>
            </motion.div>

            {/* Rank 3 Card */}
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="relative bg-white rounded-3xl p-1.5 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-500 group overflow-hidden">
              <div className="bg-slate-50 rounded-[1.3rem] h-full flex flex-col items-center p-6 md:p-8 relative z-10">
                <div className="absolute -top-4 md:-top-5 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-black px-4 py-1.5 md:px-6 md:py-2 rounded-full text-sm md:text-lg shadow-md uppercase tracking-widest z-20">State Rank 3</div>
                <div className="relative mt-6 md:mt-8 mb-4 md:mb-6">
                  {isMounted && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div key={`c1-${i}`} className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_6px_rgba(96,165,250,0.8)]"
                            animate={{ x: [0, Math.cos((i*30)*(Math.PI/180)) * 160], y: [0, Math.sin((i*30)*(Math.PI/180)) * 160], scale: [0, 1.5, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }} />
                      ))}
                    </div>
                  )}
                  <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-slate-200 ring-4 ring-blue-400 group-hover:ring-blue-500 transition-colors duration-500"><img src="/image_1.png" alt="Atiya Anjum" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                </div>
                <h2 className="text-lg md:text-4xl font-black text-slate-900 text-center mb-1">Atiya Anjum</h2>
                <p className="text-blue-600 text-xs md:text-lg font-bold uppercase tracking-wider mb-1">GNM Examination</p>
                <p className="text-slate-500 font-semibold text-[10px] md:text-base">Batch 2022 - 2025</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FULL WIDTH HORIZONTAL TICKER (DESKTOP + MOBILE) */}
        <div className="w-full mt-4 md:mt-12 relative z-20 border-y border-blue-400/30">
          <a href="https://wa.me/917979826078?text=Hi,%20I'm%20interested%20in%20taking%20admission%20in%20Divine%20Nursing%20College." target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all">
            <div className="flex items-center py-2.5 md:py-4">
              <motion.div className="flex whitespace-nowrap text-white font-black text-xs md:text-lg tracking-widest uppercase items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity }}>
                {[...Array(8)].map((_, i) => (
                  <span key={i} className="flex items-center">
                    <span className="mx-3 md:mx-8">Admission Open • Contact +91 7979826078</span>
                    <span className="bg-white text-blue-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-sm shadow-md flex items-center gap-1.5 group-hover:bg-slate-100 transition-colors">Click Now <ArrowRight className="h-3 w-3 md:h-4 md:w-4" /></span>
                    <span className="mx-3 md:mx-8">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </a>
        </div>
      </section>

      {/* --- 3. DYNAMIC LAB FACILITIES --- */}
      <section id="facilities" className="relative py-10 md:py-24 bg-slate-50 overflow-hidden border-t border-b border-slate-200 p-4">
        <div className="relative z-10 max-w-7xl mx-auto px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-7xl font-black text-slate-900 mb-3 md:mb-6 tracking-tight leading-none">Lab Facilities.</h2>
            <p className="text-sm md:text-2xl text-slate-600 font-medium leading-relaxed px-4">Experience high-tech simulation labs designed to bridge the gap between theory and practice.</p>
          </motion.div>

          {/* Desktop Grid Layout with Dynamic Names */}
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2 }} className="hidden md:grid w-full mx-auto max-w-6xl grid-cols-2 lg:grid-cols-3 gap-6">
            {labImages.map((img: string, idx: number) => {
              const formattedName = formatImageName(img);
              return (
                <div key={idx} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 group bg-white">
                  <img src={img} alt={`Lab Facility ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <h4 className="text-white text-xl font-bold leading-tight drop-shadow-md">{formattedName}</h4>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Mobile Slider Layout with Dynamic Names */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="md:hidden relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
            {isMounted && labImages?.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img key={labIndex} src={labImages[labIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-5 flex flex-col justify-end z-10 pointer-events-none">
                    <h4 className="text-white text-lg font-bold leading-tight drop-shadow-md pb-4">{formatImageName(labImages[labIndex])}</h4>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                   {labImages.map((_: any, i: number) => (<button key={i} onClick={() => setLabIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === labIndex ? 'bg-blue-600 w-5' : 'bg-white/70 w-1.5 hover:bg-white'}`} />))}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 flex-col gap-3"><ImageIcon className="h-10 w-10 opacity-50" /><p className="font-semibold text-sm">No images found</p></div>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- PREVIEW GALLERY SECTION (Links to Full Page) --- */}
      <section className="relative py-10 md:py-24 bg-white overflow-hidden border-b border-slate-200 p-4">
        <div className="relative z-10 max-w-5xl mx-auto px-0 md:px-8 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1, ease: "easeOut" }} className="mb-8 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-3 md:mb-6 tracking-tight leading-none">Campus Gallery</h2>
            <p className="text-sm md:text-xl text-slate-600 font-medium leading-relaxed px-4">A glimpse into life at Divine Nursing College.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group mb-6 md:mb-8">
            {isMounted && galleryImages?.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img key={galleryIndex} src={galleryImages[galleryIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-1.5 md:gap-2 z-10">
                   {galleryImages.map((_: any, i: number) => (<button key={i} onClick={() => setGalleryIndex(i)} className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-sm ${i === galleryIndex ? 'bg-blue-600 w-5 md:w-6' : 'bg-white/70 w-1.5 md:w-2 hover:bg-white'}`} />))}
                </div>
              </>
            ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-400 flex-col gap-3"><ImageIcon className="h-10 w-10 md:h-12 md:w-12 opacity-50" /><p className="font-semibold text-xs md:text-base">Upload images to /public/gallery</p></div>
            )}
          </motion.div>
          
          <a href="/gallery" className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold transition-all shadow-sm text-sm md:text-base">
             View Full Gallery Directory <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        </div>
      </section>

      {/* --- Course Tiles Section --- */}
      <section id="courses" className="py-10 md:py-20 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div className="text-center mb-8 md:mb-16" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4 leading-none">Our Academic Programs</h2>
            <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">Comprehensive nursing programs designed to fulfill your career aspirations.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            {/* BSc Nursing */}
            <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 group flex flex-col">
              <div className="relative h-48 md:h-64 overflow-hidden bg-slate-200">
                <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800" alt="BSc Nursing Lab" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5 md:p-6 flex flex-col justify-end">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">B.Sc. Nursing</h3>
                </div>
              </div>
              <div className="p-5 md:p-8 flex-grow flex flex-col justify-between">
                <p className="text-sm md:text-base text-slate-700 mb-6 leading-relaxed font-semibold">A 4-year degree program focusing on building rigorous theoretical and practical foundations in nursing.</p>
                <ul className="space-y-2 md:space-y-3 font-bold text-xs md:text-sm text-slate-800 border-t border-slate-100 pt-5 md:pt-6">
                  <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600"/> Duration: 4 Years</li>
                  <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600"/> Eligibility: 10+2 Science (PCB)</li>
                </ul>
              </div>
            </motion.div>

            {/* GNM */}
            <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 group flex flex-col">
              <div className="relative h-48 md:h-64 overflow-hidden bg-slate-200">
                <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800" alt="GNM Practical" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5 md:p-6 flex flex-col justify-end">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">GNM Program</h3>
                </div>
              </div>
              <div className="p-5 md:p-8 flex-grow flex flex-col justify-between">
                <p className="text-sm md:text-base text-slate-700 mb-6 leading-relaxed font-semibold">A 3-year diploma program preparing critical members of the healthcare team.</p>
                <ul className="space-y-2 md:space-y-3 font-bold text-xs md:text-sm text-slate-800 border-t border-slate-100 pt-5 md:pt-6">
                  <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-amber-500"/> Duration: 3 Years</li>
                  <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-amber-500"/> Eligibility: 10+2 (Any Stream)</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DUAL-TRACK INTERACTIVE ROADMAP --- */}
      <section id="roadmap" className="py-10 md:py-24 bg-white relative overflow-hidden z-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-3 md:px-8 relative z-10">
          <motion.div className="text-center mb-8 md:mb-16" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.7 }}>
            <span className="text-blue-700 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-3 inline-block border border-blue-200 bg-blue-50 px-3 md:px-4 py-1 rounded-full">Your Educational Journey</span>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-2 md:mb-4 leading-tight">Choose Your Path</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-xs md:text-lg leading-relaxed font-medium px-4">Compare the academic milestones and fulfill your clinical aspirations.</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:gap-12 lg:gap-16 items-start">
            {/* BSc Column */}
            <div className="relative bg-slate-50 border border-slate-200 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-lg">
              <h3 className="text-[13px] md:text-4xl font-black text-blue-700 mb-6 md:mb-10 flex flex-col xl:flex-row items-start xl:items-center gap-0.5 md:gap-3">
                 B.Sc. Nursing <span className="text-slate-500 text-[10px] md:text-xl font-bold">(4 Years)</span>
              </h3>
              <div className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 h-[calc(100%-80px)] md:h-[calc(100%-140px)] bg-slate-200 rounded-full z-0" />
              <motion.div initial={{ height: "0%" }} whileInView={{ height: "calc(100%-80px)" }} transition={{ duration: 3, ease: "easeInOut" }} className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)] rounded-full z-0 origin-top" />
              <div className="space-y-6 md:space-y-10 relative z-10">
                {bscRoadmap.map((step, index) => (
                  <div key={index} className="relative flex items-center w-full pl-6 md:pl-12">
                    <div className="absolute left-[-6px] md:left-[5px] w-3.5 h-3.5 md:w-6 md:h-6 rounded-full border-[2px] md:border-4 border-blue-400 shadow-sm z-20 flex items-center justify-center bg-white">
                        <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-blue-600"/>
                    </div>
                    <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl w-full hover:border-blue-400 border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex flex-col xl:flex-row xl:items-center gap-1.5 md:gap-3 mb-1 md:mb-2.5">
                          <div className="bg-blue-50 p-1.5 md:p-2.5 rounded-md md:rounded-xl text-blue-700 w-fit"> <step.icon className="h-3 w-3 md:h-5 md:w-5" /> </div>
                          <span className="text-[10px] md:text-lg font-black text-blue-700 uppercase tracking-wider">{step.year}</span>
                        </div>
                        <h4 className="text-xs md:text-xl font-bold text-slate-900 mb-1 md:mb-2 leading-snug">{step.title}</h4>
                        <p className="text-slate-600 text-[10px] md:text-sm leading-relaxed font-medium line-clamp-3 md:line-clamp-none">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GNM Column */}
            <div className="relative bg-slate-50 border border-slate-200 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-lg h-fit">
              <h3 className="text-[13px] md:text-4xl font-black text-amber-600 mb-6 md:mb-10 flex flex-col xl:flex-row items-start xl:items-center gap-0.5 md:gap-3">
                GNM Program <span className="text-slate-500 text-[10px] md:text-xl font-bold">(3 Years)</span>
              </h3>
              <div className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 h-[calc(100%-80px)] md:h-[calc(100%-140px)] bg-slate-200 rounded-full z-0" />
              <motion.div initial={{ height: "0%" }} whileInView={{ height: "calc(100%-80px)" }} transition={{ duration: 3, ease: "easeInOut" }} className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] rounded-full z-0 origin-top" />
              <div className="space-y-6 md:space-y-10 relative z-10">
                {gnmRoadmap.map((step, index) => (
                  <div key={index} className="relative flex items-center w-full pl-6 md:pl-12">
                    <div className="absolute left-[-6px] md:left-[5px] w-3.5 h-3.5 md:w-6 md:h-6 rounded-full border-[2px] md:border-4 border-amber-400 shadow-sm z-20 flex items-center justify-center bg-white">
                       <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-amber-500"/>
                    </div>
                    <div className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl w-full hover:border-amber-400 border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex flex-col xl:flex-row xl:items-center gap-1.5 md:gap-3 mb-1 md:mb-2.5">
                          <div className="bg-amber-50 p-1.5 md:p-2.5 rounded-md md:rounded-xl text-amber-600 w-fit"> <step.icon className="h-3 w-3 md:h-5 md:w-5" /> </div>
                          <span className="text-[10px] md:text-lg font-black text-amber-600 uppercase tracking-wider">{step.year}</span>
                        </div>
                        <h4 className="text-xs md:text-xl font-bold text-slate-900 mb-1 md:mb-2 leading-snug">{step.title}</h4>
                        <p className="text-slate-600 text-[10px] md:text-sm leading-relaxed font-medium line-clamp-3 md:line-clamp-none">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Affiliations Tiles Section --- */}
      <section id="affiliations" className="py-10 md:py-24 bg-slate-50 relative z-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div className="text-center mb-8 md:mb-16" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight leading-none">National & State Recognitions</h2>
            <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">Validated and approved by leading regulatory bodies, ensuring global standards.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} whileHover={{ y: -6 }} className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-50 p-3 rounded-full mb-4 border border-slate-100 shadow-sm flex items-center justify-center">
                <BookOpen className="h-7 w-7 md:h-9 md:w-9 text-blue-700" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">INC Approved</h4>
              <p className="text-xs md:text-sm text-slate-600 font-semibold">Indian Nursing Council Registered</p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -6 }} className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-50 p-3 rounded-full mb-4 border border-slate-100 shadow-sm flex items-center justify-center">
                <Activity className="h-7 w-7 md:h-9 md:w-9 text-blue-700" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">JNRC Affiliated</h4>
              <p className="text-xs md:text-sm text-slate-600 font-semibold">Jharkhand Nursing Council Approved</p>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -6 }} className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-50 p-3 rounded-full mb-4 border border-slate-100 shadow-sm flex items-center justify-center">
                <GraduationCap className="h-7 w-7 md:h-9 md:w-9 text-blue-700" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Ranchi University</h4>
              <p className="text-xs md:text-sm text-slate-600 font-semibold">State-Recognized Degree Certification</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- APPLY NOW FORM SECTION --- */}
      <section id="apply" className="py-10 md:py-24 bg-white relative z-20 p-4 md:p-0 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-0 md:px-8">
          <motion.div className="text-center mb-8 md:mb-16" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight leading-none">Apply for Admission</h2>
            <p className="text-sm md:text-xl text-slate-600 font-medium leading-relaxed">Fill out the form below and our admissions team will contact you.</p>
          </motion.div>

          <motion.div initial={{opacity:0,scale:0.98}} whileInView={{opacity:1,scale:1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-12 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <form className="space-y-4 md:space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 <div>
                   <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Full Name</label>
                   <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 md:py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold placeholder-slate-400" placeholder="Your full name" />
                 </div>
                 <div>
                   <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                   <input type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 md:py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold placeholder-slate-400" placeholder="+91 98765 43210" />
                 </div>
               </div>
               <div>
                 <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Email Address</label>
                 <input type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 md:py-4 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold placeholder-slate-400" placeholder="your.email@example.com" />
               </div>
               <div>
                 <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Select Program</label>
                 <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 md:py-4 text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold">
                   <option value="">Choose a course...</option>
                   <option value="bsc">B.Sc. Nursing (4 Years)</option>
                   <option value="gnm">GNM Program (3 Years)</option>
                 </select>
               </div>
               <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all text-base md:text-lg flex items-center justify-center gap-2 mt-6 md:mt-8">
                 Submit Application <ArrowRight className="h-4 w-4 md:h-5 md:w-5"/>
               </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* --- Student Zone (Centered Results Portal) --- */}
      <section id="student-zone" className="py-10 md:py-24 bg-slate-50 relative overflow-hidden z-20 border-t border-slate-200">
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
            <motion.div initial={{opacity:0,scale:0.98}} whileInView={{opacity:1,scale:1}} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="bg-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden border border-slate-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

              <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-3 leading-tight">
                    <FileText className="text-blue-600 h-6 w-6 md:h-8 md:w-8" /> Results Portal
                    </h3>
                    <p className="text-xs md:text-base text-slate-600 mb-6 md:mb-8 font-medium leading-relaxed">Enter your enrollment or roll number to fetch your latest results directly from JNRC and Ranchi University portals.</p>
                </div>

                <div className="w-full md:w-1/2">
                    {!showResult ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-left">
                        <div>
                        <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Roll Number</label>
                        <input type="text" placeholder="e.g. DNC2026001" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 md:py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-mono font-bold text-sm md:text-base"/>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowResult(true)} className="w-full bg-blue-600 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors text-sm md:text-lg mt-2">
                        Check Results
                        </motion.button>
                    </motion.div>
                    ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-white rounded-2xl p-5 md:p-6 shadow-lg relative z-10 border border-slate-200 text-left">
                        <div className="text-center mb-5 md:mb-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm mb-2 md:mb-3 border border-green-200">Passed Successfully</motion.div>
                        <h4 className="text-slate-900 font-extrabold text-lg md:text-xl tracking-tight leading-tight">{rollNumber || "DNC2026001"}</h4>
                        <p className="text-xs md:text-sm text-slate-500 font-semibold">B.Sc Nursing - Semester 2</p>
                        </div>
                        <div className="space-y-3 mb-6 md:mb-8 text-xs md:text-base">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2 md:pb-3"><span className="text-slate-600 font-semibold">Anatomy</span><span className="font-bold text-slate-900">85<span className="text-slate-400 font-normal text-[10px] md:text-xs">/100</span></span></div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2 md:pb-3"><span className="text-slate-600 font-semibold">Physiology</span><span className="font-bold text-slate-900">78<span className="text-slate-400 font-normal text-[10px] md:text-xs">/100</span></span></div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2 md:pb-3"><span className="text-slate-600 font-semibold">Nutrition</span><span className="font-bold text-slate-900">92<span className="text-slate-400 font-normal text-[10px] md:text-xs">/100</span></span></div>
                        </div>
                        <button onClick={() => setShowResult(false)} className="w-full bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 md:py-3.5 rounded-xl hover:bg-slate-200 transition-colors text-sm md:text-base">
                        Check Another
                        </button>
                    </motion.div>
                    )}
                </div>
              </div>
            </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 md:pt-20 pb-8 md:pb-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2.5 text-xl md:text-2xl font-black text-white leading-none">
                <div className="bg-white rounded-full p-1"><img src="/image_3.png" alt="Divine Nursing College Logo" className="h-6 md:h-8 w-auto" /></div> Divine Nursing
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium text-sm md:text-base">Dedicated to excellence in nursing education, practice, and research to improve health outcomes in Jharkhand.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 leading-tight">Quick Links</h4>
              <ul className="space-y-3 font-semibold text-sm md:text-base">
                <li><a href="#apply" className="hover:text-blue-400 transition-colors py-1 inline-block">Admissions Portal</a></li>
                <li><a href="#courses" className="hover:text-blue-400 transition-colors py-1 inline-block">Program Details</a></li>
                <li><a href="#roadmap" className="hover:text-blue-400 transition-colors py-1 inline-block">Career Pathways</a></li>
                <li><a href="/gallery" className="hover:text-blue-400 transition-colors py-1 inline-block">Gallery</a></li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 leading-tight">Contact Us</h4>
                <ul className="space-y-4 font-semibold text-sm md:text-base">
                  <li className="flex items-start gap-3"><MapPin className="text-blue-500 h-4 w-4 md:h-5 md:w-5 shrink-0 mt-0.5" /><span>Veterinary road, near Kanke Block Chowk Road, <br/>Patratoli, Ranchi, Arsande, Jharkhand 834006</span></li>
                  <li className="flex items-center gap-3"><Phone className="text-blue-500 h-4 w-4 md:h-5 md:w-5 shrink-0" /><span>+91-7979826078, +91-9304504465</span></li>
                  <li className="flex items-center gap-3"><Mail className="text-blue-500 h-4 w-4 md:h-5 md:w-5 shrink-0" /><span className="lowercase hover:text-blue-400"><a href="mailto:info@divinenursing.com">info@divinenursing.com</a></span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 md:pt-8 text-center text-[10px] md:text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 font-semibold">
            <p>&copy; {new Date().getFullYear()} Divine Nursing College Ranchi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}