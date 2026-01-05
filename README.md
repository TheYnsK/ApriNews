# 📰 ApriNews - Modern Haber Otomasyonu

ApriNews, modern web teknolojileri kullanılarak geliştirilmiş, dinamik içerik yönetimine sahip, mobil uyumlu bir haber platformudur.

## 🚀 Özellikler

- **Full Stack Mimari:** Next.js ve MongoDB ile güçlü altyapı.
- **Modern Arayüz:** Tailwind CSS ile tasarlanmış, Responsive ve Karanlık Mod (Dark Mode) destekli tasarım.
- **Yönetim Paneli:** Admin ve Editör rolleri ile içerik yönetimi.
- **Dinamik Slider:** Ana sayfada otomatik güncellenen manşet alanı.
- **İçerik Araçları:** Sürükle-bırak resim yükleme ve otomatik okuma süresi hesaplama.
- **Etkileşim:** Kullanıcı yorumları ve sosyal medya paylaşım özellikleri.

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** Next.js (React), Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **Veritabanı:** MongoDB (Mongoose)
- **Auth:** JS-Cookie (Oturum Yönetimi)

1. **Repoyu klonlayın:**
   ```bash
   git clone [https://github.com/KULLANICI_ADINIZ/aprinews.git](https://github.com/KULLANICI_ADINIZ/aprinews.git)
   cd aprinews
Bağımlılıkları yükleyin:

npm install

Çevre Değişkenlerini Ayarlayın: Ana dizinde .env.local dosyası oluşturun ve MongoDB bağlantı adresinizi ekleyin:

Plaintext

MONGODB_URI=mongodb+srv://kullanici:sifre@cluster.mongodb.net/ApriNews

Projeyi Başlatın:


npm run dev
Tarayıcıda http://localhost:3000 adresine gidin.

👤 Varsayılan Giriş (Admin)
Kurulum sonrası /api/setup rotasını bir kez çalıştırarak admin kullanıcısı oluşturabilirsiniz.

Kullanıcı Adı: admin

Şifre: 123 