"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Users, Activity, FileText, Bell, MapPin, Mail, Phone, ArrowRight, ChevronRight, Award, Trophy, HeartPulse, ShieldPlus, Rocket, ChevronDown, Menu, X, MessageCircle, Image as ImageIcon, ArrowUpRight } from "lucide-react";

// --- Helper: Formats file names (e.g. "anatomy-lab-1.jpg" -> "Anatomy Lab 1") ---
function formatImageName(pathStr: string) {
  try {
    const filename = pathStr.split('/').pop() || "";
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    return nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  } catch {
    return "Advanced Equipment";
  }
}

// --- Animation Variants (Fixed with : any for Vercel Build) ---
const fadeInUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const mobileMenuVariants: any = {
  closed: { opacity: 0, y: "-100%", scale: 0.95 },
  open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } }
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
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={(e: any) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
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
          <div className="flex items-center gap-2 pl-1 md:gap-3 md:pl-2">
            <div className="bg-slate-50 rounded-full p-1 flex items-center justify-center border border-slate-100"><img src="/image_3.png" alt="Divine Nursing College Logo" className="h-7 md:h-8 w-auto drop-shadow-sm" /></div>
            <span className="text-[14px] sm:text-lg md:text-xl font-black text-blue-950 tracking-tight">Divine Nursing College</span>
          </div>
          <NavLinks className="hidden md:flex gap-1 font-bold text-slate-600 text-sm" linkClassName="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-blue-700 transition-all duration-300" onContactClick={() => setContactModalOpen(true)} />
          <div className="flex items-center gap-2">
            <motion.a href="#apply" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:inline-block bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-blue-700 transition-colors text-sm">Apply Now</motion.a>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"><Menu className="h-6 w-6" /></button>
          </div>
        </motion.nav>
      </div>

      {/* --- 1. HERO SECTION: BENTO BOX (DARK MODE - Full Width Uncropped Mobile) --- */}
      <section id="welcome" className="relative w-full pt-24 md:pt-28 pb-0 md:pb-12 bg-slate-950 z-0 flex flex-col items-center justify-center min-h-0 md:min-h-[90vh]">
        
        {/* We use px-0 on mobile so the image hits the absolute edges */}
        <div className="w-full max-w-[1600px] mx-auto px-0 md:px-8 flex flex-col lg:flex-row gap-0 md:gap-8 h-full items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-[75%] relative rounded-none md:rounded-[3rem] overflow-hidden md:shadow-2xl md:border md:border-slate-800 md:min-h-[500px] lg:min-h-[75vh] flex bg-black group"
          >
            {/* Changed mobile to w-full h-auto instead of object-cover to prevent cutting off the edges */}
            <img src="/image_4.png" alt="Divine Nursing College Campus" className="w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-5 left-5 right-5 lg:hidden flex flex-col items-start z-10 text-left">
              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full font-bold text-[10px] text-blue-400 mb-2 shadow-sm border border-slate-700">Ranchi, Jharkhand</div>
              <h2 className="text-2xl font-black text-white drop-shadow-md leading-tight">Legacy of Compassion.</h2>
            </div>
          </motion.div>

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
        
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="mt-4 md:mt-8 mb-4 md:mb-0 bg-slate-800 p-2.5 md:p-3 rounded-full shadow-sm border border-slate-700 text-blue-400 z-10 hidden md:block">
            <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
        </motion.div>
      </section>

      {/* --- MOBILE-ONLY TICKER (Sped Up) --- */}
      <div className="block md:hidden w-full relative z-20 bg-slate-950 border-b-4 border-slate-900">
        <a href="https://wa.me/917979826078?text=Hi" target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 transition-all py-2.5">
          <motion.div className="flex whitespace-nowrap text-white font-black text-[11px] tracking-widest uppercase items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 15, ease: "linear", repeat: Infinity }}>
            {[...Array(8)].map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="mx-3">Admission Open • Contact +91 7979826078</span>
                <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-[10px] shadow-md flex items-center gap-1.5">Click Now <ArrowRight className="h-3 w-3" /></span>
                <span className="mx-3">•</span>
              </span>
            ))}
          </motion.div>
        </a>
      </div>

      {/* --- 2. TOPPERS HERO SECTION (Light Mode Resumes Here) --- */}
      <section id="toppers" className="relative pt-12 pb-10 md:py-24 overflow-hidden bg-white flex flex-col justify-center min-h-fit md:min-h-[85vh] z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-100 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full mb-8 md:mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} variants={fadeInUp} className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 px-4 py-1.5 md:px-5 md:py-2 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6 shadow-sm"><Trophy className="h-3 w-3 md:h-5 md:w-5" /> State Toppers 2025</div>
            <h1 className="text-3xl md:text-7xl lg:text-8xl font-black text-slate-900 uppercase tracking-tight drop-shadow-sm mb-2 md:mb-4 leading-none">Producing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Champions</span></h1>
            <p className="text-sm md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed px-4">Divine Nursing College proudly celebrates our students securing <strong className="text-slate-900">Rank 1 & Rank 3</strong> across Jharkhand.</p>
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
                <p className="text-amber-600 text-xs md:text-lg font-bold uppercase tracking-wider mb-1 text-center">GNM Examination • Batch 2022-25</p>
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
                <p className="text-blue-600 text-xs md:text-lg font-bold uppercase tracking-wider mb-1 text-center">GNM Examination • Batch 2022-25</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FULL WIDTH HORIZONTAL TICKER (DESKTOP) */}
        <div className="hidden md:block w-full mt-4 md:mt-12 relative z-20 border-y border-blue-400/30">
          <a href="https://wa.me/917979826078?text=Hi" target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all py-3 md:py-4">
            <motion.div className="flex whitespace-nowrap text-white font-black text-sm md:text-lg tracking-widest uppercase items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, ease: "linear", repeat: Infinity }}>
              {[...Array(8)].map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="mx-4 md:mx-8">Admission Open • Contact +91 7979826078</span>
                  <span className="bg-white text-blue-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm shadow-md flex items-center gap-1.5 group-hover:bg-slate-100 transition-colors">Click Now <ArrowRight className="h-3 w-3 md:h-4 md:w-4" /></span>
                  <span className="mx-4 md:mx-8">•</span>
                </span>
              ))}
            </motion.div>
          </a>
        </div>
      </section>

      {/* --- 3. DYNAMIC LAB FACILITIES --- */}
      <section id="facilities" className="relative py-10 md:py-24 bg-slate-50 overflow-hidden border-t border-b border-slate-200 p-4">
        <div className="relative z-10 max-w-7xl mx-auto px-0 md:px-8">
          <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">Lab Facilities.</h2>
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

      {/* --- PREVIEW GALLERY SECTION --- */}
      <section className="relative py-10 md:py-24 bg-white overflow-hidden border-b border-slate-200 p-4 text-center flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1 }} className="mb-8 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-3 md:mb-6 leading-none">Campus Gallery</h2>
          <p className="text-sm md:text-xl text-slate-600 font-medium px-4 leading-relaxed">A glimpse into life at Divine Nursing College.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group mb-6 md:mb-8">
          {isMounted && galleryImages?.length > 0 ? (
            <>
              <AnimatePresence mode="wait"><motion.img key={galleryIndex} src={galleryImages[galleryIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full object-cover" /></AnimatePresence>
              <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-1.5 md:gap-2 z-10">
                 {galleryImages.map((_: any, i: number) => (<button key={i} onClick={() => setGalleryIndex(i)} className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-sm ${i === galleryIndex ? 'bg-blue-600 w-5 md:w-6' : 'bg-white/70 w-1.5 md:w-2'}`} />))}
              </div>
            </>
          ) : ( <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon className="h-10 w-10 md:h-12 md:w-12 opacity-50" /></div> )}
        </motion.div>
        <a href="/gallery" className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold shadow-sm transition-all text-sm md:text-base">View Full Gallery Directory <ArrowUpRight className="h-4 w-4" /></a>
      </section>

      {/* --- Course Tiles Section --- */}
      <section id="courses" className="py-10 md:py-20 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div className="text-center mb-8 md:mb-16" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4 leading-none">Our Academic Programs</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col">
              <div className="relative h-48 md:h-64 overflow-hidden"><img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800" alt="BSc" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5 md:p-6 flex flex-col justify-end"><h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">B.Sc. Nursing</h3></div></div>
              <div className="p-5 md:p-8 flex-grow flex flex-col justify-between"><p className="text-sm md:text-base text-slate-700 mb-6 font-semibold">A 4-year degree program focusing on rigorous foundations in nursing.</p><ul className="space-y-2 md:space-y-3 font-bold text-xs md:text-sm text-slate-800 border-t border-slate-100 pt-5 md:pt-6"><li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-blue-600"/> Duration: 4 Years</li><li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-blue-600"/> Eligibility: 10+2 Science (PCB)</li></ul></div>
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col">
              <div className="relative h-48 md:h-64 overflow-hidden"><img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800" alt="GNM" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5 md:p-6 flex flex-col justify-end"><h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">GNM Program</h3></div></div>
              <div className="p-5 md:p-8 flex-grow flex flex-col justify-between"><p className="text-sm md:text-base text-slate-700 mb-6 font-semibold">A 3-year diploma program preparing critical members of healthcare team.</p><ul className="space-y-2 md:space-y-3 font-bold text-xs md:text-sm text-slate-800 border-t border-slate-100 pt-5 md:pt-6"><li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-amber-500"/> Duration: 3 Years</li><li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-amber-500"/> Eligibility: 10+2 (Any)</li></ul></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DUAL-TRACK INTERACTIVE ROADMAP --- */}
      <section id="roadmap" className="py-10 md:py-24 bg-white relative overflow-hidden z-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-3 md:px-8 relative z-10 text-center">
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.8 }} className="mb-8 md:mb-16">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 inline-block border border-blue-200 bg-blue-50 px-3 md:px-4 py-1 rounded-full">Your Educational Journey</span>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-2 leading-tight">Choose Your Path</h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 md:gap-12 lg:gap-16 items-start text-left">
            {/* BSc Column */}
            <div className="relative bg-slate-50 border border-slate-200 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-lg">
              <h3 className="text-[13px] md:text-4xl font-black text-blue-700 mb-6 flex flex-col xl:flex-row items-start xl:items-center gap-0.5 md:gap-3">B.Sc. Nursing <span className="text-slate-500 text-[10px] md:text-xl font-bold">(4 Years)</span></h3>
              <div className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 h-[calc(100%-80px)] bg-slate-200 rounded-full z-0" />
              <motion.div initial={{ height: "0%" }} whileInView={{ height: "calc(100%-80px)" }} transition={{ duration: 3 }} className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 bg-blue-400 rounded-full z-0 origin-top" />
              <div className="space-y-6 md:space-y-10 relative z-10">
                {bscRoadmap.map((step, index) => (
                  <div key={index} className="relative flex items-center w-full pl-6 md:pl-12">
                    <div className="absolute left-[-6px] md:left-[5px] w-3.5 h-3.5 md:w-6 md:h-6 rounded-full border-4 border-blue-400 shadow-sm z-20 bg-white" />
                    <div className="bg-white p-3 md:p-6 rounded-xl border border-slate-200 w-full"><h4 className="text-xs md:text-xl font-bold text-slate-900 leading-snug">{step.title}</h4><p className="text-slate-600 text-[10px] md:text-sm leading-relaxed line-clamp-3">{step.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            {/* GNM Column */}
            <div className="relative bg-slate-50 border border-slate-200 p-3 md:p-8 rounded-2xl md:rounded-3xl shadow-lg">
              <h3 className="text-[13px] md:text-4xl font-black text-amber-600 mb-6 flex flex-col xl:flex-row items-start xl:items-center gap-0.5 md:gap-3">GNM Program <span className="text-slate-500 text-[10px] md:text-xl font-bold">(3 Years)</span></h3>
              <div className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 h-[calc(100%-80px)] bg-slate-200 rounded-full z-0" />
              <motion.div initial={{ height: "0%" }} whileInView={{ height: "calc(100%-80px)" }} transition={{ duration: 3 }} className="absolute left-[16px] md:left-[34px] top-[60px] md:top-[100px] w-0.5 md:w-1 bg-amber-400 rounded-full z-0 origin-top" />
              <div className="space-y-6 md:space-y-10 relative z-10">
                {gnmRoadmap.map((step, index) => (
                  <div key={index} className="relative flex items-center w-full pl-6 md:pl-12">
                    <div className="absolute left-[-6px] md:left-[5px] w-3.5 h-3.5 md:w-6 md:h-6 rounded-full border-4 border-amber-400 shadow-sm z-20 bg-white" />
                    <div className="bg-white p-3 md:p-6 rounded-xl border border-slate-200 w-full"><h4 className="text-xs md:text-xl font-bold text-slate-900 leading-snug">{step.title}</h4><p className="text-slate-600 text-[10px] md:text-sm leading-relaxed line-clamp-3">{step.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div className="space-y-3"><div className="flex items-center gap-2.5 text-xl font-black text-white leading-none"><img src="/image_3.png" alt="logo" className="h-6 w-auto" /> Divine Nursing</div><p className="text-sm">Dedicated to excellence in nursing education in Jharkhand.</p></div>
            <div><h4 className="text-white font-bold mb-4">Quick Links</h4><ul className="space-y-3 text-sm"><li><a href="#apply" className="hover:text-blue-400 transition-colors">Admissions Portal</a></li><li><a href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</a></li></ul></div>
            <div><h4 className="text-white font-bold mb-4">Contact</h4><p className="text-sm flex gap-3"><MapPin className="text-blue-500 shrink-0" /> Ranchi, Jharkhand 834006</p></div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-[10px] font-semibold"><p>&copy; {new Date().getFullYear()} Divine Nursing College Ranchi.</p></div>
        </div>
      </footer>
    </div>
  );
}