import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie'; 
import { SITE_NAME } from '../../lib/constants';
import { HiPencilAlt, HiHome, HiMenu, HiX, HiMoon, HiSun, HiLogin, HiLogout } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Dark Mode Kontrolü
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      // eslint-disable-next-line react/no-did-mount-set-state
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // 2. Oturum Kontrolü
    const userCookie = Cookies.get('user_session');
    if (userCookie) {
      // eslint-disable-next-line react/no-did-mount-set-state
      setUser(JSON.parse(userCookie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    Cookies.remove('user_session');
    setUser(null);
    window.location.href = '/';
  };

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
              A
            </div>
            <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight transition-colors">
              {SITE_NAME}
            </span>
          </Link>

          {/* DESKTOP MENÜ */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <HiSun className="text-xl text-yellow-500" /> : <HiMoon className="text-xl" />}
            </button>

            <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 font-medium">
              <HiHome className="text-lg" />
              <span>Ana Sayfa</span>
            </Link>

            {/* Giriş Durumuna Göre Butonlar */}
            {user ? (
              <div className="flex items-center gap-3 border-l pl-4 border-slate-300 dark:border-slate-700">
                <Link href="/dashboard" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  {user.username} <span className="text-xs uppercase bg-indigo-100 dark:bg-indigo-900 px-1 rounded">{user.role}</span>
                </Link>
                <button onClick={handleLogout} title="Çıkış Yap" className="text-slate-500 hover:text-red-500 transition-colors">
                  <HiLogout className="text-xl" />
                </button>
                <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium">
                  Panel
                </Link>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium">
                <HiLogin className="text-lg" /> Giriş Yap
              </Link>
            )}
          </div>

          {/* MOBİL MENÜ BUTONLARI */}
          <div className="md:hidden flex items-center gap-2 z-50">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <HiSun className="text-xl text-yellow-500" /> : <HiMoon className="text-xl" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-white focus:outline-none p-2"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBİL AÇILIR MENÜ */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4 animate-fade-in">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600"
          >
            <HiHome size={20} /> Ana Sayfa
          </Link>
          
          {user ? (
            <>
              <Link 
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium"
              >
                <HiPencilAlt size={20} /> Yönetim Paneli
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium w-full text-left"
              >
                <HiLogout size={20} /> Çıkış Yap ({user.username})
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              <HiLogin size={20} /> Giriş Yap
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}