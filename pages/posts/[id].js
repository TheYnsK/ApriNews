/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Badge from '../../components/ui/Badge';
import CommentSection from '../../components/news/CommentSection';
import { formatDate } from '../../lib/utils';
import { HiCalendar, HiUser, HiArrowLeft, HiTrash, HiClock, HiShare, HiPencil } from 'react-icons/hi';
import { FaWhatsapp, FaTwitter } from 'react-icons/fa';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query; // URL'den ID'yi al (MongoDB ID'si string gelir)
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        // 1. Haberi API'den çek
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();

        if (data.success) {
          setPost(data.data);
          
          // 2. Haber geldiyse Benzer Haberleri çek (Aynı kategorideki diğerleri)
          // Not: İdealde bunun için ayrı API yazılır ama şimdilik ana listeden filtreleyelim
          const allRes = await fetch('/api/posts?limit=100'); // Son 100 haberi çekip filtrele
          const allData = await allRes.json();
          
          if (allData.posts) {
            const related = allData.posts
              .filter(p => p.category === data.data.category && p._id !== data.data._id)
              .slice(0, 3);
            // İlişkili haberlerin ID formatını düzelt
            setRelatedPosts(related.map(p => ({...p, id: p._id})));
          }
        }
      } catch (error) {
        console.error("Haber detayı çekilemedi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      router.push("/");
    }
  };

  const calculateReadTime = (text) => {
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} dk okuma`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post ? encodeURIComponent(post.title) : '';

  if (loading) return <Layout><div className="text-center py-20 dark:text-white">Yükleniyor...</div></Layout>;
  if (!post) return <Layout><div className="text-center py-20 dark:text-white">Haber bulunamadı veya silinmiş.</div></Layout>;

  return (
    <Layout title={post.title}>
      <article className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        
        <div className="relative h-[250px] md:h-[400px]">
          <img 
            src={post.image || "https://via.placeholder.com/1200x600"} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <Link href="/" className="bg-white/20 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-2 hover:bg-white/30 text-sm md:text-base transition-all">
              <HiArrowLeft /> Geri
            </Link>
          </div>
        </div>

        <div className="p-5 md:p-12">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <Badge category={post.category} />
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              <HiCalendar /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              <HiClock /> {calculateReadTime(post.content)}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs md:text-sm">
              <HiUser /> {post.author}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight">
            {post.title}
          </h1>

          {/* HTML İçeriğini Güvenli Şekilde Basma (dangerouslySetInnerHTML) */}
          {/* Seed scripti HTML etiketleri ürettiği için bu gereklidir */}
          <div className="prose prose-base md:prose-lg prose-indigo dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <hr className="my-8 md:my-10 border-slate-100 dark:border-slate-800" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <HiShare /> Paylaş:
              </span>
              <a href={`https://wa.me/?text=${shareText} ${shareUrl}`} target="_blank" rel="noreferrer" className="text-green-500 hover:text-green-600 text-2xl transition-transform hover:scale-110">
                <FaWhatsapp />
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noreferrer" className="text-sky-500 hover:text-sky-600 text-2xl transition-transform hover:scale-110">
                <FaTwitter />
              </a>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={handleDelete}
                className="flex-1 md:flex-none flex justify-center items-center gap-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <HiTrash /> Sil (Admin)
              </button>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Bunları da Beğenebilirsiniz</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map(rp => (
                  <Link key={rp.id} href={`/posts/${rp.id}`} className="group">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 h-full hover:shadow-md transition-all">
                       <div className="h-32 overflow-hidden">
                          <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                       </div>
                       <div className="p-4">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2 group-hover:text-indigo-500 transition-colors">{rp.title}</h4>
                          <span className="text-xs text-slate-400 mt-2 block">{formatDate(rp.date)}</span>
                       </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <CommentSection postId={post._id} />
          
        </div>
      </article>
    </Layout>
  );
}