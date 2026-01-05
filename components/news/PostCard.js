/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiCalendar, HiUser } from 'react-icons/hi';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/utils';

export default function PostCard({ post }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col h-full group transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <Link href={`/posts/${post.id}`}>
          <img 
            src={post.image || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80"} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 left-3">
          <Badge category={post.category} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <HiCalendar /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <HiUser /> {post.author}
          </span>
        </div>

        <Link href={`/posts/${post.id}`}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>

        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow font-light">
          {post.summary}
        </p>

        <Link 
          href={`/posts/${post.id}`}
          className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:text-indigo-700 flex items-center gap-1 mt-auto group/btn"
        >
          Devamını Oku 
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </motion.div>
  );
}