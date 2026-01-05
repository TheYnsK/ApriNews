import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }, 
  date: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
});

// 3. parametre koleksiyon adıdır: 'news'
export default mongoose.models.Post || mongoose.model('Post', PostSchema, 'news');