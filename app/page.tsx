import fs from 'fs';
import path from 'path';
import ClientHome from './ClientHome';

export default function Page() {
  let labImages: string[] = [];
  let galleryImages: string[] = [];

  try {
    // Read the modern-facilities folder
    const labDir = path.join(process.cwd(), 'public/modern-facilities');
    if (fs.existsSync(labDir)) {
      labImages = fs.readdirSync(labDir)
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(file => `/modern-facilities/${encodeURIComponent(file)}`);
    }
  } catch (e) {
      console.log("Error reading modern-facilities:", e);
  }

  try {
    // Read the gallery folder
    const galleryDir = path.join(process.cwd(), 'public/gallery');
    if (fs.existsSync(galleryDir)) {
      galleryImages = fs.readdirSync(galleryDir)
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(file => `/gallery/${encodeURIComponent(file)}`);
    }
  } catch (e) {
      console.log("Error reading gallery:", e);
  }

  // Fallback default images if folders are empty or missing
  if (labImages.length === 0) {
      labImages = ["https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000"];
  }
  
  // If gallery is empty, the ClientHome will show a "Upload images" placeholder box automatically!

  return <ClientHome labImages={labImages} galleryImages={galleryImages} />;
}