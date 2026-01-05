import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  await dbConnect();

  // Kullanıcıyı bul
  const user = await User.findOne({ username });

  // Basit şifre kontrolü (Gerçek projede bcrypt kullanılır, staj için bu yeterli)
  if (user && user.password === password) {
    // Şifre hariç kullanıcı bilgilerini dön
    const { password, ...userData } = user._doc;
    return res.status(200).json(userData);
  } else {
    return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
  }
}