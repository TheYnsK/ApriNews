import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const session = Cookies.get('user_session');
    if (!session) {
      router.push('/login');
      return;
    }
    const userData = JSON.parse(session);
    
    // ESLint'i bu satır için susturuyoruz
    // eslint-disable-next-line react/no-did-mount-set-state
    setUser(userData);

    // Verileri Çek
    if (userData.role === 'admin') {
      fetch('/api/admin/posts')
        .then(res => res.json())
        .then(data => setPosts(data));
    }
  }, [router]);

  const toggleApproval = async (id, currentStatus) => {
    await fetch('/api/admin/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isApproved: !currentStatus })
    });
    setPosts(posts.map(p => p._id === id ? { ...p, isApproved: !currentStatus } : p));
  };

  const deletePost = async (id) => {
    if(!confirm("Haber tamamen silinecek?")) return;
    await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p._id !== id));
  };

  if (!user) return null;

  return (
    <Layout title="Yönetim Paneli">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Hoşgeldin, {user.username} <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded uppercase">{user.role}</span>
          </h1>
          <Link href="/new" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            + Yeni Haber Ekle
          </Link>
        </div>

        {user.role === 'editor' && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-blue-800 mb-6">
            {/* Tırnak işaretleri düzeltildi (&quot;) */}
            <p>👋 Merhaba Editör! &quot;Yeni Haber Ekle&quot; butonunu kullanarak haber oluşturabilirsin. Eklediğin haberler Admin onayına düşecektir.</p>
          </div>
        )}

        {user.role === 'admin' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
            <h2 className="p-6 text-xl font-bold border-b border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white">Haber Yönetimi</h2>
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="p-4">Başlık</th>
                  <th className="p-4">Yazar</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {posts.map(post => (
                  <tr key={post._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-medium">{post.title}</td>
                    <td className="p-4">{post.author}</td>
                    <td className="p-4">
                      {post.isApproved ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Yayında</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Onay Bekliyor</span>
                      )}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button 
                        onClick={() => toggleApproval(post._id, post.isApproved)}
                        className={`text-xs px-3 py-1 rounded border ${post.isApproved ? 'border-yellow-500 text-yellow-600' : 'border-green-500 text-green-600'}`}
                      >
                        {post.isApproved ? 'Yayından Kaldır' : 'Onayla'}
                      </button>
                      <button 
                        onClick={() => deletePost(post._id)}
                        className="text-xs px-3 py-1 rounded border border-red-500 text-red-600 hover:bg-red-50"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}