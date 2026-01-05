const mongoose = require('mongoose');

// --- ŞİFRENİ BURAYA YAZ ---
const MONGODB_URI = "mongodb+srv://ApriCity_DB:EtmzWRNPlFVIU9LA@apricity.b60efnj.mongodb.net/ApriNews?appName=ApriCity";

// GERÇEKÇİ VERİ HAVUZU
const DATA_POOL = {
  "Gündem": [
    { t: "İstanbul'da Beklenen Kar Yağışı Başladı: Trafik Felç", s: "Meteorolojinin günlerdir uyardığı kar yağışı akşam saatlerinde etkisini artırdı." },
    { t: "Yerel Seçimler Öncesi Anket Sonuçları Şaşırttı", s: "Son yapılan kamuoyu araştırmasına göre kararsız seçmenlerin oranı belirleyici olacak." },
    { t: "Boğaz Köprüsünde Bakım Çalışması: 2 Şerit Kapatılıyor", s: "Karayolları Genel Müdürlüğü, köprü halatlarının bakımı için 15 günlük çalışma başlattı." },
    { t: "Zincir Marketlere Fahiş Fiyat Denetimi Sıkılaşıyor", s: "Ticaret Bakanlığı ekipleri, etiket ile kasa fiyatı uyuşmayan marketlere ceza yağdırdı." },
    { t: "Büyükşehir Belediyesi'nden Öğrencilere Ücretsiz Ulaşım Müjdesi", s: "Meclisten geçen karara göre sınav günleri toplu taşıma öğrencilere ücretsiz olacak." },
    { t: "Orman Yangınlarına Karşı Yeni Eylem Planı Devrede", s: "Yaz ayları gelmeden yangın söndürme filosu güçlendirildi, İHA sayısı artırıldı." },
    { t: "Kentsel Dönüşümde Kira Yardımları Arttırıldı", s: "Çevre ve Şehircilik Bakanlığı, hak sahiplerine ödenecek kira yardımında %50 artışa gitti." }
  ],
  "Spor": [
    { t: "Derbi Heyecanı: Ezeli Rakipler Pazar Günü Karşılaşacak", s: "Şampiyonluk düğümünün çözüleceği maç öncesi iki takımda da sakatlık şoku yaşanıyor." },
    { t: "Milli Voleybolcumuz Avrupa Devine Transfer Oldu", s: "İtalya Ligi'nin köklü ekiplerinden biri, yıldız oyuncumuzla 3 yıllık sözleşme imzaladı." },
    { t: "Formula 1 İstanbul Park Takvime Geri Dönüyor mu?", s: "FIA yetkilileri ile yapılan görüşmelerde sona gelindi, pist yönetimi umutlu." },
    { t: "Süper Lig'de Hakem Tartışmaları Bitmiyor", s: "Son hafta oynanan maçlardaki VAR kararları kulüpler birliğinin tepkisini çekti." },
    { t: "NBA'de Temsilcimizden Kariyer Rekoru: 45 Sayı", s: "Dün gece oynanan maçta harikalar yaratan milli basketbolcu, takımına galibiyeti getirdi." },
    { t: "Amatör Sporlara Dev Devlet Desteği Paketi Açıklandı", s: "Gençlik ve Spor Bakanlığı, 81 ilde yeni tesisleşme hamlesi başlatıyor." },
    { t: "Teniste Yeni Bir Yıldız Doğuyor: Genç Yetenek Finalde", s: "Wimbledon gençler kategorisinde mücadele eden sporcumuz tarih yazmaya devam ediyor." }
  ],
  "Ekonomi": [
    { t: "Merkez Bankası Faiz Kararını Açıkladı: Piyasalar Hareketli", s: "Para Politikası Kurulu, politika faizini sabit tutma kararı aldı, dolar kuru tepki verdi." },
    { t: "Altın Fiyatlarında Rekor Tazelendi: Gram Altın Uçuşta", s: "Küresel belirsizlikler ve Ons altındaki yükseliş iç piyasada rekorları beraberinde getirdi." },
    { t: "Konut Kredilerinde Yeni Kampanya Hazırlığı", s: "İlk evini alacaklar için düşük faizli ve uzun vadeli kredi paketi meclise geliyor." },
    { t: "Borsa İstanbul'da Teknoloji Hisseleri Rüzgarı", s: "Yapay zeka yatırımları artan şirketlerin hisseleri yatırımcısına kazandırmaya devam ediyor." },
    { t: "İhracatta Tüm Zamanların Rekoru Kırıldı", s: "Otomotiv ve tekstil sektörü öncülüğünde ihracat rakamları geçen yılı ikiye katladı." },
    { t: "Asgari Ücret Tespit Komisyonu Toplanıyor", s: "Milyonların gözü kulağı Ankara'da. İşçi ve işveren sendikaları taleplerini sundu." },
    { t: "Kripto Paralarda Sert Düşüş: Bitcoin Kritik Seviyede", s: "ABD'den gelen regülasyon haberleri kripto para piyasasında satış baskısı yarattı." }
  ],
  "Eğitim": [
    { t: "YKS Sonuçları Açıklandı: İşte Şampiyonların Sırrı", s: "Üniversite sınavında tam puan yapan öğrenciler, disiplinli çalışmanın önemine vurgu yaptı." },
    { t: "Müfredatta Köklü Değişiklik: Kodlama Dersi Zorunlu Oluyor", s: "Milli Eğitim Bakanlığı, ilkokuldan itibaren yazılım eğitimini zorunlu hale getiriyor." },
    { t: "Öğretmen Atamaları İçin Takvim Belli Oldu", s: "Bakanlık, bu yıl 45 bin sözleşmeli öğretmen ataması yapılacağını duyurdu." },
    { t: "Üniversitelerde Hibrit Eğitim Modeli Tartışılıyor", s: "YÖK, bazı bölümlerin uzaktan eğitime daha uygun olduğunu belirterek çalışma başlattı." },
    { t: "LGS Tercih Kılavuzu Yayımlandı: Dikkat Edilmesi Gerekenler", s: "Uzmanlar, yüzdelik dilimlerin puanlardan daha önemli olduğunu hatırlatıyor." },
    { t: "Yurt Dışı Eğitim Burslarına İlgi Rekor Seviyede", s: "Jean Monnet ve Fulbright gibi burs programlarına başvurular geçen yıla göre %40 arttı." },
    { t: "Okul Öncesi Eğitimde Okullaşma Oranı %90'a Ulaştı", s: "Yapılan yatırımlar meyvesini veriyor, 5 yaş grubunda okullaşma hedefi tutturuldu." }
  ],
  "Kültür-Sanat": [
    { t: "İstanbul Film Festivali Başlıyor: Biletler Tükendi", s: "Dünya sinemasının seçkin örneklerinin gösterileceği festivalde onur ödülü usta oyuncuya verilecek." },
    { t: "Antik Kentte Heyecanlandıran Keşif: 2000 Yıllık Heykel", s: "Kazı çalışmaları sırasında bulunan Roma dönemine ait heykel, arkeoloji dünyasını sarstı." },
    { t: "Ünlü Yazarın Kayıp Romanı Yıllar Sonra Ortaya Çıktı", s: "Edebiyat dünyasının efsane isminin tamamlanmamış taslağı, banka kasasında bulundu." },
    { t: "Modern Sanat Müzesi'nde Yeni Sergi: 'Dijital Yansımalar'", s: "Teknoloji ve sanatın iç içe geçtiği interaktif sergi ziyaretçilerini bekliyor." },
    { t: "Eurovision Şarkı Yarışması İçin Temsilcimiz Belli Oldu", s: "Genç ve yetenekli grup, bu yıl ülkemizi rock parça ile temsil edecek." },
    { t: "Devlet Tiyatroları Perdelerini Açıyor", s: "Yeni sezonda 30 farklı oyun sahnelenecek, biletler internetten satışa sunuldu." },
    { t: "Tarihi Yarımada'da Restorasyon Çalışmaları Tamamlandı", s: "Osmanlı döneminden kalma çeşme ve hamamlar aslına uygun olarak yenilendi." }
  ],
  "Teknoloji": [
    { t: "Yerli Otomobilin Yeni Modeli Görücüye Çıktı", s: "Sedan modelin tasarımı büyük beğeni toplarken, menzil özellikleri rakiplerini korkuttu." },
    { t: "Yapay Zeka İş Dünyasını Değiştiriyor: Hangi Meslekler Riskte?", s: "Raporlara göre rutin işler yapan meslek grupları önümüzdeki 10 yılda kaybolabilir." },
    { t: "Mars'a İnsanlı Yolculuk İçin Geri Sayım Başladı", s: "SpaceX, Starship roketinin son testlerini başarıyla tamamladığını duyurdu." },
    { t: "Yeni iPhone Modeli Sızdırıldı: İşte Özellikleri", s: "Titanyum kasa ve periskop kamera özellikleriyle gelmesi beklenen telefonun fiyatı dudak uçuklatıyor." },
    { t: "Türkiye'nin İlk Astronotu Uzay İstasyonuna Kenetlendi", s: "Bilimsel deneyler yapacak olan astronotumuz, canlı bağlantıyla soruları yanıtladı." },
    { t: "Siber Saldırılara Karşı Ulusal Kalkan Projesi", s: "Kamu kurumlarının veri güvenliğini sağlamak için yerli yazılımlar devreye alınıyor." },
    { t: "Giyilebilir Teknolojide Devrim: Akıllı Kontakt Lensler", s: "Artırılmış gerçeklik özellikli lensler, sağlık verilerini de anlık takip edebilecek." }
  ],
  "Genel": [
    { t: "Sokak Hayvanları İçin Örnek Proje: Mamamatikler Yaygınlaşıyor", s: "Geri dönüşüm kutusuna atılan her şişe karşılığında sokak hayvanlarına mama veriliyor." },
    { t: "Uzmanlar Uyarıyor: Ekran Bağımlılığı Çocukları Tehdit Ediyor", s: "Günde 2 saatten fazla tablet kullanımı çocuklarda dikkat eksikliğine yol açıyor." },
    { t: "Hafta Sonu İçin Şehre Yakın Kamp Rotaları", s: "Doğayla iç içe, sessiz ve huzurlu bir hafta sonu geçirmek isteyenler için 5 harika öneri." },
    { t: "Kahve Tüketimi Hakkında Doğru Bilinen Yanlışlar", s: "Sabah aç karnına içilen kahvenin metabolizma üzerindeki etkileri şaşırttı." },
    { t: "Minimalist Yaşam: Az Eşya ile Mutlu Olmanın Yolları", s: "Tüketim çılgınlığına karşı yükselen bir trend olan minimalizm, ruhsal dinginlik sağlıyor." },
    { t: "Mevsim Geçişlerinde Bağışıklığı Güçlendiren Besinler", s: "Zencefil, zerdeçal ve C vitamini deposu meyvelerle gripten korunun." },
    { t: "İstanbul'un En İyi 10 Kahvaltı Mekanı", s: "Boğaz manzaralı serpme kahvaltılardan, tarihi semtlerdeki gizli lezzet duraklarına kadar rehber." }
  ]
};

const AUTHORS = [
  "Selin Yılmaz", "Murat Demir", "Berkant Öztürk", "Zeynep Kaya", "Ahmet Çelik", 
  "Elif Şahin", "Caner Erkin", "Melis Kara", "Burak Yıldız", "Ece Güneş",
  "Hakan Aslan", "Derya Bulut", "Okan Kurt", "Seda Polat", "Cem Yılmazer"
];

// 450 kelimeyi tamamlamak için kullanılacak dolgu paragrafları (Kategoriye özel olmayan, genel gazetecilik dili)
const FILLER_TEXTS = [
  "Konuyla ilgili açıklamalarda bulunan uzmanlar, sürecin titizlikle takip edilmesi gerektiğini vurguluyor. Özellikle son dönemde yaşanan gelişmeler, kamuoyunda geniş yankı uyandırmış durumda. Vatandaşların bu konuda daha duyarlı olması gerektiğini belirten yetkililer, gerekli önlemlerin alındığını ifade ediyor.",
  "Olayın perde arkasına bakıldığında ise farklı detaylar göze çarpıyor. Geçmişte benzer durumların yaşanmış olması, alınacak tedbirlerin önemini bir kez daha ortaya koyuyor. İstatistiklere bakıldığında, bu tür vakaların belirli dönemlerde artış gösterdiği net bir şekilde görülmektedir.",
  "Sektör temsilcileri ise durumdan umutlu. Yapılan yatırımların ve alınan kararların uzun vadede olumlu sonuçlar doğuracağı düşünülüyor. Ekonomik göstergeler ve sosyal etkiler analiz edildiğinde, projenin sürdürülebilirliği konusunda olumlu sinyaller alınıyor.",
  "Öte yandan, sosyal medyada konuyla ilgili binlerce paylaşım yapıldı. Kimi kullanıcılar kararı desteklerken, kimileri ise eleştirilerini dile getirdi. Toplumun farklı kesimlerinden gelen tepkiler, konunun ne kadar hassas olduğunu gözler önüne seriyor.",
  "Gelecek vizyonu açısından değerlendirildiğinde, bu adımın bir dönüm noktası olabileceği konuşuluyor. Teknoloji ve inovasyonun entegre edildiği süreçlerde, hata payının minimize edilmesi hedefleniyor. Uzman ekipler, sahadaki çalışmalarını aralıksız sürdürüyor.",
  "Yetkililer, vatandaşları resmi kaynaklardan yapılmayan açıklamalara itibar etmemeleri konusunda uyardı. Bilgi kirliliğinin önüne geçmek amacıyla şeffaf bir iletişim stratejisi izleneceği belirtildi. Süreç boyunca düzenli bilgilendirme toplantıları yapılacak.",
  "Tarihsel sürece baktığımızda, bu tür değişimlerin zaman zaman sancılı olabildiği ancak sonuçlarının toplumsal refaha katkı sağladığı görülmektedir. Değişime ayak uydurmak ve yenilikleri kucaklamak, gelişimin en temel şartlarından biridir."
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Kategoriye özel resim
const getCategoryImage = (category) => {
  const map = {
    "Gündem": "city,news", "Spor": "sports,stadium", "Ekonomi": "money,finance",
    "Eğitim": "school,university", "Kültür-Sanat": "art,concert", "Teknoloji": "technology,computer", "Genel": "nature,lifestyle"
  };
  return `https://loremflickr.com/800/400/${map[category]}?random=${Math.random()}`;
};

async function seedDB() {
  try {
    console.log("🔥 Bağlantı kuruluyor...");
    await mongoose.connect(MONGODB_URI);
    
    // MODEL TANIMI (Schema ile eşleşmeli)
    const PostSchema = new mongoose.Schema({
      title: String, summary: String, content: String, author: String,
      category: String, image: String, date: { type: Date, default: Date.now },
      isApproved: { type: Boolean, default: true }
    });
    const Post = mongoose.models.Post || mongoose.model('Post', PostSchema, 'news');

    console.log("🧹 Veritabanı temizleniyor (Her şey silinecek)...");
    await Post.deleteMany({});
    
    const posts = [];
    let totalCount = 0;

    console.log("📝 Gerçekçi haberler yazılıyor...");

    for (const [category, articles] of Object.entries(DATA_POOL)) {
      for (const article of articles) {
        // İÇERİK OLUŞTURMA: Özel özet + Dolgu metinleri karıştırılarak 450+ kelime yapılıyor
        let fullContent = `<p class="lead font-bold">${article.s}</p><br/>`;
        
        // 5-6 paragraf dolgu ekle ama sırasını karıştır ki hepsi aynı durmasın
        const shuffledFillers = [...FILLER_TEXTS].sort(() => 0.5 - Math.random());
        
        shuffledFillers.forEach(filler => {
            fullContent += `<p>${filler}</p><br/>`;
        });
        
        // Bir tane daha özel cümle ekle ki sonu aynı bitmesin
        fullContent += `<p>ApriNews ${category} servisi olarak gelişmeleri anbean aktarmaya devam edeceğiz.</p>`;

        posts.push({
          title: article.t,
          summary: article.s,
          content: fullContent,
          author: getRandomArrayElement(AUTHORS),
          category: category,
          image: getCategoryImage(category),
          date: new Date(Date.now() - getRandomInt(0, 5000000000)), // Rastgele geçmiş tarih
          isApproved: true
        });
        totalCount++;
      }
    }

    // Haberleri karıştır ki kategoriler alt alta gelmesin
    const shuffledPosts = posts.sort(() => 0.5 - Math.random());

    // 50 tanesini al (Zaten 49-50 tane var ama garanti olsun)
    const finalPosts = shuffledPosts.slice(0, 50);

    await Post.insertMany(finalPosts);
    console.log(`✅ Toplam ${finalPosts.length} adet birbirinden farklı haber başarıyla yüklendi.`);
    process.exit(0);

  } catch (err) {
    console.error("HATA:", err);
    process.exit(1);
  }
}

seedDB();