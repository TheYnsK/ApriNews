import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  // Bu rotayı korumak lazım ama şimdilik basit tutuyoruz.
  // Frontend'den gelen role bilgisini kontrol etmiyoruz, panelden yöneteceğiz.

  if (req.method === 'GET') {
    // Admin her şeyi görür
    const posts = await Post.find({}).sort({ date: -1 });
    res.status(200).json(posts);
  }
  
  if (req.method === 'PUT') {
    // Onaylama İşlemi (Body: { id: "...", isApproved: true })
    const { id, isApproved } = req.body;
    await Post.findByIdAndUpdate(id, { isApproved });
    res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    // Silme İşlemi (Query: ?id=...)
    const { id } = req.query;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  }
}