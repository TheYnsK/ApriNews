// components/layout/Layout.js
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title }) {
  const pageTitle = title ? `${title} | ApriNews` : "ApriNews - Güncel Haberler";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Head>
        <title>{pageTitle}</title> {/* SEO Burada Yapılıyor */}
        <meta name="description" content="Next.js ile geliştirilmiş modern haber uygulaması" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}