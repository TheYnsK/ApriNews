import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      // MongoDB ID'sine göre haberi bul
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ success: false, error: 'Haber bulunamadı' });
      }

      res.status(200).json({ success: true, data: post });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Geçersiz ID formatı' });
    }
  } else if (req.method === 'DELETE') {
    // Hazır elin değmişken silme işlemini de buraya alalım (Admin için)
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}