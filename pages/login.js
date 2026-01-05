import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/layout/Layout';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // Başarılı ise çerezlere kaydet ve panele git
      Cookies.set('user_session', JSON.stringify(data), { expires: 1 });
      router.push('/dashboard');
    } else {
      setError(data.error);
    }
  };

  return (
    <Layout title="Giriş Yap">
      <div className="max-w-md mx-auto mt-20 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">Editör / Admin Girişi</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Kullanıcı Adı</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg border dark:bg-slate-800 dark:text-white"
              onChange={e => setForm({...form, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Şifre</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 rounded-lg border dark:bg-slate-800 dark:text-white"
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-bold">
            Giriş Yap
          </button>
        </form>
      </div>
    </Layout>
  );
}