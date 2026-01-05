import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  
  // Eğer hiç kullanıcı yoksa Admin oluştur
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create({
      username: 'admin',
      password: '123', // Şifreyi sonra değiştirebilirsin
      role: 'admin'
    });
    return res.json({ msg: 'Admin kullanıcısı oluşturuldu: admin / 123' });
  }
  
  return res.json({ msg: 'Zaten kullanıcı var.' });
}