import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import PostCard from '../components/news/PostCard';
import HeroCarousel from '../components/news/HeroCarousel';
import { CATEGORIES } from '../lib/constants';
import { HiSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [headlines, setHeadlines] = useState([]); // Manşetler
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  
  // State'ler
  const [filter, setFilter] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. MANŞETLERİ ÇEK (Sadece sayfa ilk açıldığında çalışır - Sabit)
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await fetch('/api/posts?page=1&limit=5&category=Tümü');
        const data = await res.json();
        const formatted = data.posts.map(p => ({ ...p, id: p._id }));
        setHeadlines(formatted);
      } catch (err) {
        console.error("Manşet hatası", err);
      }
    };
    fetchHeadlines();
  }, []);

  // 2. LİSTEYİ ÇEK (Sayfa veya Kategori değişince çalışır)
  const fetchPosts = async (page, categoryParam) => {
    setLoading(true);
    try {
      // API'ye kategori bilgisini de gönderiyoruz
      const url = `/api/posts?page=${page}&limit=12&category=${categoryParam}`;
      const res = await fetch(url);
      const data = await res.json();
      
      const formattedData = data.posts.map(post => ({ ...post, id: post._id }));
      setPosts(formattedData);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setLoading(false);
    }
  };

  // Kategori değişince Sayfayı 1'e al ve veriyi çek
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchPosts(1, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Sayfa numarası değişince veriyi çek
  const changePage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchPosts(page, filter);
    }
  };

  // Arama Filtresi (Client-side kalabilir çünkü arama karmaşıktır, şimdilik sayfadaki veride arar)
  const displayedPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* 1. MANŞET (HER ZAMAN GÖRÜNÜR) */}
      {headlines.length > 0 && (
        <HeroCarousel posts={headlines} />
      )}

      {/* 2. KATEGORİ VE ARAMA */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        
        {/* Kategoriler */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button 
            onClick={() => setFilter("Tümü")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === "Tümü" ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
          >
            Tümü
          </button>
          {Object.keys(CATEGORIES).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Arama */}
        <div className="relative w-full lg:w-80 group">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Sayfada ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>
      </div>

      {/* 3. LİSTELEME */}
      {loading ? (
        <div className="flex justify-center py-20 dark:text-white">Yükleniyor...</div>
      ) : displayedPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* 4. SAYFALAMA */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => changePage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-white"
            >
              <HiChevronLeft />
            </button>

            {/* Sayfa Numaraları */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`w-10 h-10 rounded-lg font-bold transition-all
                  ${pagination.currentPage === page 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => changePage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-white"
            >
              <HiChevronRight />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-24 dark:text-white">
          <div className="text-4xl mb-2">📂</div>
          <h3 className="text-xl font-bold">Bu kategoride haber bulunamadı.</h3>
        </div>
      )}
    </Layout>
  );
}