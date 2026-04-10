import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  let galleryImages: string[] = [];

  try {
    // Dynamically read images from the public/gallery folder
    const galleryDir = path.join(process.cwd(), 'public/gallery');
    if (fs.existsSync(galleryDir)) {
      galleryImages = fs.readdirSync(galleryDir)
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(file => `/gallery/${encodeURIComponent(file)}`);
    }
  } catch (e) {
      console.log("Error reading gallery directory:", e);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* Navbar */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-6 w-6 text-blue-900" />
            <span className="font-bold text-slate-600">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-xl font-black text-blue-900">
            <img src="/image_3.png" alt="Divine Nursing College Logo" className="h-8 w-auto" />
            <span>Divine Nursing</span>
          </div>
        </div>
      </nav>

      {/* Gallery Header */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Campus Gallery</h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium">Explore life, events, and facilities at Divine Nursing College.</p>
        </div>
      </section>

      {/* Masonry/Grid Image Display */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        {galleryImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition-shadow bg-white">
                <img 
                  src={img} 
                  alt={`Campus Gallery ${idx + 1}`} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-32 text-slate-400 bg-white rounded-3xl border border-slate-200 border-dashed">
              <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-xl font-bold text-slate-500">The Gallery is currently empty.</p>
              <p className="font-medium mt-2">Drop your image files into the <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">public/gallery</code> folder.</p>
           </div>
        )}
      </section>
      
    </div>
  );
}