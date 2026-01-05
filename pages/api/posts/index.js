import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // 1. Parametreleri Al
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12; // Sayfa başına 12 haber
    const category = req.query.category || "Tümü"; // Kategori filtresi

    const skip = (page - 1) * limit;

    // 2. Sorguyu Oluştur
    let query = { isApproved: true };
    
    // Eğer kategori "Tümü" değilse, sorguya kategori şartını ekle
    if (category !== "Tümü") {
      query.category = category;
    }

    try {
      // 3. Bu sorguya uyan TOPLAM kaç haber var? (Sayfa sayısını hesaplamak için)
      const totalPosts = await Post.countDocuments(query);
      const totalPages = Math.ceil(totalPosts / limit);

      // 4. Verileri Çek
      const posts = await Post.find(query)
        .sort({ date: -1 }) // En yeni en üstte
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        posts,
        pagination: {
          currentPage: page,
          totalPages: totalPages || 1, // Hiç haber yoksa 1. sayfa göster
          totalPosts
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Veriler çekilemedi" });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const newPost = await Post.create(req.body);
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}