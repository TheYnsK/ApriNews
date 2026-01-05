import { useState, useEffect } from 'react';
import { HiUserCircle, HiPaperAirplane } from 'react-icons/hi';
import { formatDate } from '../../lib/utils';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) {
      // eslint-disable-next-line react/no-did-mount-set-state
      setComments(JSON.parse(savedComments));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) return;

    const commentObj = {
      id: Date.now(),
      name: newComment.name,
      text: newComment.text,
      date: new Date().toISOString()
    };

    const updatedComments = [commentObj, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    setNewComment({ name: '', text: '' });
  };

  return (
    <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Yorumlar ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl mb-8 border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Adınız"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Yorumunuzu buraya yazın..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            />
          </div>
        </div>
        <button 
          type="submit"
          disabled={!newComment.text || !newComment.name}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ml-auto"
        >
          <HiPaperAirplane className="rotate-90" /> Gönder
        </button>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0">
                <HiUserCircle className="w-10 h-10 text-slate-300 dark:text-slate-600" />
              </div>
              <div className="flex-grow">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 dark:text-white">{comment.name}</span>
                    <span className="text-xs text-slate-400">{formatDate(comment.date)}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400 dark:text-slate-600 py-4">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
        )}
      </div>
    </div>
  );
}