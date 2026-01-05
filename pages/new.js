import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Auth kontrolü
import Layout from '../components/layout/Layout';
import ImageUpload from '../components/ui/ImageUpload';
import { CATEGORIES } from '../lib/constants';
import { HiSave, HiArrowLeft } from 'react-icons/hi';

export default function NewPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '', summary: '', content: '', author: '', category: 'Genel',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // AUTH KONTROLÜ
  useEffect(() => {
    const session = Cookies.get('user_session');
    if (!session) {
      router.push('/login'); // Giriş yapmamışsa login'e at
    } else {
      setUser(JSON.parse(session));
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API'ye POST isteği atıyoruz
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        // Başarılı
        alert("Haber başarıyla gönderildi! Admin onayından sonra yayınlanacaktır.");
        router.push('/dashboard'); // Panele yönlendir
      } else {
        alert("Haber eklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucu hatası.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelected = (base64Data) => {
    setFormData({ ...formData, image: base64Data });
  };

  if (!user) return null; // Yönlendirme yapılana kadar boş ekran

  return (
    <Layout title="Yeni Haber Ekle">
      <div className="max-w-2xl mx-auto pb-20">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 mb-4 md:mb-6 transition-colors text-sm md:text-base">
          <HiArrowLeft /> İptal
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-6">Yeni Haber Oluştur</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Görsel Yükleme */}
            <ImageUpload onImageSelected={handleImageSelected} />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Başlık <span className="text-red-500">*</span></label>
              <input required name="title" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Haber başlığı" onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Kategori</label>
                <select name="category" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" onChange={handleChange}>
                  {Object.keys(CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Yazar <span className="text-red-500">*</span></label>
                <input required name="author" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Ad Soyad" onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Özet <span className="text-red-500">*</span></label>
              <textarea required name="summary" rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Kısa giriş metni" onChange={handleChange} />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">İçerik <span className="text-red-500">*</span></label>
              <textarea required name="content" rows="8" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Haberin detayları..." onChange={handleChange} />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-white
                ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none'}`}
            >
              {isSubmitting ? (
                <>Yayınlanıyor...</>
              ) : (
                <><HiSave className="text-xl" /> Yayınla</>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}