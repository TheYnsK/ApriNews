/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Badge from '../ui/Badge';

export default function HeroCarousel({ posts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  }, [posts.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!posts || posts.length === 0) return null;
  const post = posts[currentIndex];

  return (
    // Responsive Yükseklik: h-[300px] (mobil) -> md:h-[500px] (tablet/pc)
    <div className="relative w-full h-[300px] md:h-[500px] mb-8 md:mb-12 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group touch-pan-y">
      <AnimatePresence mode='wait'>
        <motion.div
          key={post.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={post.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />
        </motion.div>
      </AnimatePresence>

      {/* İçerik */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
        <div className="max-w-4xl">
          <Badge category={post.category} className="mb-2 md:mb-3 text-xs md:text-sm" />
          <Link href={`/posts/${post.id}`}>
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight hover:text-indigo-300 transition-colors drop-shadow-lg line-clamp-2">
              {post.title}
            </h1>
          </Link>
          <p className="hidden md:block text-slate-200 text-lg line-clamp-2 mb-6 md:w-2/3">
            {post.summary}
          </p>
        </div>
      </div>

      {/* Kontroller (Mobilde küçük, PC'de büyük) */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all z-30"
      >
        <HiChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-md transition-all z-30"
      >
        <HiChevronRight size={20} className="md:w-6 md:h-6" />
      </button>
      
      {/* Mobilde Numaraları Gizle */}
      <div className="hidden md:flex absolute bottom-8 right-8 gap-2 z-30">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border border-white/30 
              ${idx === currentIndex ? 'bg-indigo-600 text-white scale-110' : 'bg-black/30 text-white'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}