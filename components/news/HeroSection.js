/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function HeroSection({ post }) {
  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[450px] rounded-3xl overflow-hidden mb-12 shadow-2xl group cursor-pointer"
    >
      <Link href={`/posts/${post.id}`}>
        <div className="absolute inset-0">
          <img 
            src={post.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Modern Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4 lg:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <Badge category={post.category} />
            <span className="text-slate-300 text-sm font-medium backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">
              {formatDate(post.date)}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {post.title}
          </h1>
          
          <p className="text-slate-200 text-lg line-clamp-2 mb-6 font-light">
            {post.summary}
          </p>

          <span className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full transition-all font-medium shadow-lg shadow-primary-900/20">
            Haberi Oku
          </span>
        </div>
      </Link>
    </motion.div>
  );
}