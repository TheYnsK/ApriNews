# 📰 ApriNews - Modern Haber Otomasyonu

ApriNews, modern web teknolojileri kullanılarak geliştirilmiş, dinamik içerik yönetimine sahip, mobil uyumlu ve SEO dostu bir haber platformudur. 

Staj projesi olarak geliştirilen bu uygulama; Admin/Editör paneli, sürükle-bırak resim yükleme ve gerçek zamanlı içerik yönetimi özelliklerine sahiptir.

## 🚀 Özellikler

- **Full Stack Mimari:** Next.js ve MongoDB ile güçlü altyapı.
- **Modern Arayüz:** Tailwind CSS ile tasarlanmış, Responsive ve Karanlık Mod (Dark Mode) destekli tasarım.
- **Yönetim Paneli:** Admin ve Editör rolleri ile içerik yönetimi.
- **Dinamik Slider:** Ana sayfada otomatik güncellenen manşet alanı.
- **İçerik Araçları:** Sürükle-bırak resim yükleme ve otomatik okuma süresi hesaplama.
- **Etkileşim:** Kullanıcı yorumları ve sosyal medya paylaşım özellikleri.

## 🛠️ Kullanılan Teknolojiler

| Alan | Teknoloji |
|---|---|
| **Frontend** | Next.js (React), Tailwind CSS, Framer Motion |
| **Backend** | Next.js API Routes |
| **Veritabanı** | MongoDB (Mongoose) |
| **Auth** | JS-Cookie (Oturum Yönetimi) |

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Repoyu Klonlayın

git clone [https://github.com/TheYnsK/ApriNews.git](https://github.com/TheYnsK/ApriNews.git)
cd aprinews


### 2. Bağımlılıkları yükleyin:

npm install


### 3. Çevre Değişkenlerini Ayarlayın: Ana dizinde .env.local dosyası oluşturun ve MongoDB bağlantı adresinizi ekleyin:

MONGODB_URI=mongodb+srv://kullanici:sifre@cluster.mongodb.net/ApriNews

(Not: kullanici ve sifre alanlarını kendi bilgilerinizle doldurmayı unutmayın.)


### 4. Projeyi Başlatın:

npm run dev
Tarayıcıda http://localhost:3000 adresine gidin.


👤 Varsayılan Giriş (Admin)
Kurulum sonrası /api/setup rotasını bir kez çalıştırarak admin kullanıcısı oluşturabilirsiniz.

Kullanıcı Adı: admin

Şifre: 123 


Proje Vercel üzerinde yayındadır ve aktif olarak kullanılabilir:
👉 **[http://aprinews.vercel.app](http://aprinews.vercel.app)**
