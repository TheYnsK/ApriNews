import { SITE_NAME } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-2 text-lg font-semibold text-slate-200">{SITE_NAME}</p>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tüm hakları saklıdır. Staj Projesi kapsamında geliştirilmiştir.
        </p>
      </div>
    </footer>
  );
}