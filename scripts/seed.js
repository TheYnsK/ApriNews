const mongoose = require('mongoose');

// --- AYARLAR ---
// Buraya kendi bağlantı adresini ve şifreni yapıştır:
const MONGODB_URI = "mongodb+srv://ApriCity_DB:EtmzWRNPlFVIU9LA@apricity.b60efnj.mongodb.net/ApriNews?appName=ApriCity";

const CATEGORIES = [
  "Gündem", "Spor", "Ekonomi", "Eğitim", "Kültür-Sanat", "Teknoloji", "Genel"
];

const POSTS_PER_CATEGORY = 20;

// --- MODEL TANIMI (Schema'nın aynısı olmalı) ---
const PostSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  author: String,
  category: String,
  image: String,
  date: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: true },
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema, 'news');

// --- İÇERİK HAVUZU (450+ Kelime Üretmek İçin Parçalar) ---
const TEXT_POOLS = {
  "Gündem": [
    "Şehrin en işlek caddelerinde başlatılan altyapı çalışmaları vatandaşların gündeminde. Yetkililer, çalışmaların kısa sürede tamamlanacağını belirtse de trafik yoğunluğu şimdiden artmış durumda. ",
    "Son günlerde yaşanan hava sıcaklıklarındaki ani değişimler uzmanları endişelendiriyor. Meteoroloji Genel Müdürlüğü'nden yapılan açıklamada, önümüzdeki hafta için fırtına uyarısı yapıldı. ",
    "Yerel seçim hazırlıkları tüm hızıyla devam ederken, adayların vaatleri de şekillenmeye başladı. Özellikle ulaşım ve yeşil alan projeleri öne çıkıyor. ",
    "Uluslararası ilişkilerde yaşanan son gelişmeler, dış politikada yeni bir dönemin kapısını aralıyor. Diplomatik kaynaklar, görüşmelerin olumlu geçtiğini ifade ediyor. ",
    "Sağlık Bakanlığı, mevsimsel grip vakalarındaki artışa dikkat çekerek vatandaşları aşı olmaya davet etti. Hastanelerin acil servislerinde yoğunluk yaşanıyor. ",
    "Toplu taşıma ücretlerine yapılması planlanan zam, belediye meclisinde tartışmalara neden oldu. Vatandaşlar ise alternatif ulaşım yöntemlerine yönelmeye başladı. ",
    "Şehir merkezinde düzenlenen festival, binlerce kişiyi bir araya getirdi. Renkli görüntülerin yaşandığı etkinlikte, yerel sanatçılar sahne aldı. ",
    "Emniyet güçlerinin düzenlediği geniş çaplı operasyonda, suç örgütüne büyük darbe vuruldu. Operasyonun detayları basınla paylaşıldı. ",
  ],
  "Spor": [
    "Ligin son haftalarına girilirken şampiyonluk yarışı kızışıyor. Liderin puan kaybetmesiyle takipçileri umutlandı. Teknik direktörler stratejilerini yeniden gözden geçiriyor. ",
    "Milli takımımızın genç yıldızı, Avrupa devlerinin radarına girdi. Transfer sezonunun açılmasıyla birlikte rekor bir bonservis bedeli konuşuluyor. ",
    "Derbi maçı öncesi iki takımın taraftarları arasında dostluk rüzgarları esiyor. Kulüp başkanları Fair-Play çağrısında bulundu. ",
    "Olimpiyatlara hazırlanan milli sporcularımız, kamp sürecini verimli geçiriyor. Hedef, ülkemize rekor sayıda madalya ile dönmek. ",
    "Basketbol liginde play-off heyecanı başlıyor. Eşleşmeler belli olurken, otoriteler sürpriz sonuçlar bekliyor. ",
    "Stat zeminindeki bozulmalar nedeniyle futbolcular zor anlar yaşadı. Federasyon, saha bakımları konusunda kulüplere uyarı gönderdi. ",
    "Voleybol takımımızın Avrupa'daki başarısı göğsümüzü kabarttı. Final maçında gösterdikleri performans, tüm dünyada takdir topladı. ",
    "Amatör spor kulüplerine yapılan desteklerin artırılması gündemde. Gençlerin spora teşvik edilmesi için yeni projeler hayata geçiriliyor. ",
  ],
  "Ekonomi": [
    "Döviz kurlarındaki dalgalanma yatırımcıları tedirgin etmeye devam ediyor. Merkez Bankası'nın faiz kararı piyasalar tarafından merakla bekleniyor. ",
    "Borsa İstanbul'da teknoloji hisseleri günü yükselişle kapattı. Uzmanlar, yenilenebilir enerji şirketlerinin gelecekte daha fazla değer kazanacağını öngörüyor. ",
    "Enflasyon rakamlarının açıklanmasıyla birlikte memur ve emekli maaşlarına yapılacak zam oranları netleşti. Alım gücündeki değişimler tartışılıyor. ",
    "Altın fiyatları, küresel piyasalardaki belirsizlikler nedeniyle rekor tazeledi. Güvenli liman arayışındaki yatırımcılar altına yöneliyor. ",
    "İhracat rakamlarında geçen yıla göre önemli bir artış kaydedildi. Özellikle otomotiv ve tekstil sektörleri ekonomiye can suyu oluyor. ",
    "Kripto para piyasalarında yaşanan sert düşüş, küçük yatırımcıyı zarara uğrattı. Analistler, regülasyonların önemine dikkat çekiyor. ",
    "Konut fiyatlarındaki fahiş artışa karşı hükümet yeni bir paket hazırlığında. İlk evini alacaklara düşük faizli kredi imkanı sunulacak. ",
    "Turizm sezonunun açılmasıyla birlikte döviz girdisinde artış bekleniyor. Otellerdeki doluluk oranları şimdiden yüzde seksenlere ulaştı. ",
  ],
  "Eğitim": [
    "Üniversite sınavı sonuçlarının açıklanmasının ardından tercih heyecanı başladı. Adaylar, geleceklerini şekillendirecek bölümleri seçmek için uzmanlardan destek alıyor. ",
    "Milli Eğitim Bakanlığı, müfredatta köklü değişikliklere gitmeye hazırlanıyor. Kodlama ve yapay zeka derslerinin ilkokul seviyesine indirilmesi planlanıyor. ",
    "Öğretmen atamalarıyla ilgili beklenen açıklama nihayet geldi. Binlerce öğretmen adayı, görev yerlerini öğrenmek için sisteme akın etti. ",
    "Okullardaki dijital dönüşüm projesi kapsamında tablet dağıtımları sürüyor. Ancak internet altyapısındaki eksiklikler, projenin verimini düşürüyor. ",
    "Yurt dışı eğitim burslarına olan ilgi her geçen gün artıyor. Gençler, akademik kariyerlerini uluslararası platformlarda sürdürmek istiyor. ",
    "Özel okulların zam oranları velilerin tepkisini çekti. Eğitimde fırsat eşitliği tartışmaları yeniden alevlendi. ",
    "Meslek liselerinin önemi sanayi işbirliği projeleriyle artıyor. Mezun olan öğrencilerin iş bulma oranı yüzde doksanlara ulaştı. ",
    "Okul öncesi eğitimin zorunlu hale getirilmesi için pilot uygulamalar başladı. Uzmanlar, erken çocukluk eğitiminin kritik olduğunu vurguluyor. ",
  ],
  "Kültür-Sanat": [
    "Şehrin tarihi tiyatro binası, uzun süren restorasyon çalışmalarının ardından kapılarını yeniden açtı. Açılış galasında ünlü isimler bir araya geldi. ",
    "Bu yıl düzenlenen film festivalinde bağımsız sinema örnekleri ön planda. Genç yönetmenlerin cesur anlatımları jüriden tam not aldı. ",
    "Dünyaca ünlü ressamın sergisi, sanatseverlerin yoğun ilgisiyle karşılaştı. Müze önünde uzun kuyruklar oluştu. ",
    "Edebiyat dünyasının çınarı, yeni kitabıyla okurlarına merhaba dedi. Yazar, imza gününde sevenleriyle buluştu. ",
    "Geleneksel el sanatlarımızın yaşatılması için açılan kurslara ilgi büyük. Unutulmaya yüz tutmuş meslekler yeniden hayat buluyor. ",
    "Operada sahnelenen yeni eser, modern ve klasik öğeleri harmanlayarak izleyiciye görsel bir şölen sundu. ",
    "Arkeolojik kazılarda bulunan antik kent kalıntıları, tarih kitaplarını değiştirecek nitelikte. Bölge, turist akınına uğruyor. ",
    "Dijital sanat platformları, NFT dünyasındaki gelişmelerle birlikte yeni bir pazar oluşturdu. Sanatın tanımı yeniden yapılıyor. ",
  ],
  "Teknoloji": [
    "Yapay zeka teknolojisindeki son gelişmeler, iş dünyasında devrim yaratıyor. Otomasyon sistemleri sayesinde verimlilik artarken, bazı mesleklerin geleceği tartışılıyor. ",
    "Akıllı telefon pazarında rekabet kızışıyor. Yeni çıkan model, katlanabilir ekranı ve üstün kamera özellikleriyle dikkat çekiyor. ",
    "Siber güvenlik uzmanları, artan oltalama saldırılarına karşı kullanıcıları uyardı. Şifre güvenliği ve iki faktörlü doğrulama hayati önem taşıyor. ",
    "Uzay turizmi artık bir hayal değil. Özel şirketler, yörünge altı uçuşlar için bilet satışlarına başladı bile. ",
    "Elektrikli otomobillerin menzil sorunu yeni batarya teknolojileriyle çözülüyor. Şarj istasyonlarının sayısı her geçen gün artıyor. ",
    "Metaverse evreninde arsa satışları rekor kırıyor. Sanal gerçeklik gözlükleri, günlük hayatın bir parçası olmaya aday. ",
    "Nesnelerin İnterneti (IoT) sayesinde evlerimiz daha akıllı hale geliyor. Buzdolabınızın süt siparişi verdiği bir gelecek çok yakın. ",
    "Yerli oyun sektörü, unicorn girişimler çıkararak dünya çapında ses getiriyor. Genç yazılımcılarımızın başarısı gurur veriyor. ",
  ],
  "Genel": [
    "Günlük hayatta karşılaştığımız stresle başa çıkmanın yolları üzerine yapılan araştırma, doğa yürüyüşlerinin önemini ortaya koydu. ",
    "Evcil hayvan sahiplenme oranlarında büyük bir artış var. Uzmanlar, hayvan sevgisinin çocuk gelişimine olumlu katkılarını anlatıyor. ",
    "Kahve kültürü, üçüncü dalga kahvecilerle birlikte evrim geçiriyor. Nitelikli çekirdekler ve farklı demleme yöntemleri ilgi görüyor. ",
    "Minimalist yaşam felsefesi, tüketim çılgınlığına bir tepki olarak yayılıyor. Az eşya ile çok huzur arayanların sayısı artıyor. ",
    "Kış aylarında bağışıklık sistemini güçlendirmek için beslenme önerileri. C vitamini deposu besinler sofraların vazgeçilmezi. ",
    "Geri dönüşüm bilinci, belediyelerin kampanyalarıyla artıyor. Sıfır atık hedefi için evlerde ayrıştırma yapmak şart. ",
    "Hafta sonu ne yapsak diye düşünenler için şehre yakın kaçış rotaları. Doğayla iç içe kamp alanları popülerleşiyor. ",
    "Sosyal medyanın insan psikolojisi üzerindeki etkileri tartışılıyor. Dijital detoks kampları yeni bir trend haline geldi. ",
  ]
};

// --- YARDIMCI FONKSİYONLAR ---

// Rastgele sayı üreteci
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Diziden rastgele eleman seç
const getRandomArrayElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Kategoriye uygun resim bul (LoremFlickr kullanarak)
const getCategoryImage = (category) => {
  const map = {
    "Gündem": "news,city",
    "Spor": "sports,stadium",
    "Ekonomi": "money,business",
    "Eğitim": "school,student",
    "Kültür-Sanat": "art,museum",
    "Teknoloji": "tech,computer",
    "Genel": "life,nature"
  };
  const keyword = map[category] || "abstract";
  // Rastgelelik eklemek için random parametresi
  return `https://loremflickr.com/800/400/${keyword}?random=${Math.random()}`;
};

// 450+ Kelimelik İçerik Oluşturucu
const generateLongContent = (category) => {
  const pool = TEXT_POOLS[category] || TEXT_POOLS["Genel"];
  let content = "";
  
  // Hedef kelime sayısına ulaşana kadar havuzdan rastgele paragraflar ekle
  // Aynı paragrafları tekrar etmemeye çalışarak mantıklı bir bütün oluşturuyoruz.
  
  const intro = `ApriNews Özel Haber - ${category} dünyasında bugün önemli gelişmeler yaşanıyor. Uzun süredir beklenen olaylar nihayet gün yüzüne çıkmaya başladı. `;
  
  content += intro + "\n\n";

  // Ortalama 450 kelime için yaklaşık 30-40 cümle/paragraf birleştirmemiz lazım.
  // Havuzdaki cümleleri karıştırıp, aralarına bağlaçlar atarak çoğaltacağız.
  
  for (let i = 0; i < 6; i++) { // 6 Paragraf
    let paragraph = "";
    for (let j = 0; j < 5; j++) { // Her paragrafta 5 uzun cümle
      paragraph += getRandomArrayElement(pool);
    }
    content += paragraph + "\n\n";
  }

  const conclusion = `Sonuç olarak, ${category} alanındaki bu gelişmelerin etkileri önümüzdeki günlerde daha net görülecek. Uzmanlar, sürecin yakından takip edilmesi gerektiğini vurguluyor. ApriNews olarak gelişmeleri aktarmaya devam edeceğiz.`;
  
  content += conclusion;
  
  return content;
};

// --- ANA FONKSİYON ---
async function seedDB() {
  try {
    console.log("🌱 Veritabanına bağlanılıyor...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Bağlantı başarılı.");

    console.log("🧹 Eski 'news' koleksiyonu temizleniyor...");
    await Post.deleteMany({}); // Önce temizlik yapalım
    console.log("✅ Temizlik tamam.");

    const posts = [];

    console.log("🏭 Haberler üretiliyor...");

    for (const category of CATEGORIES) {
      console.log(`   > ${category} kategorisi için ${POSTS_PER_CATEGORY} haber hazırlanıyor...`);
      
      for (let i = 1; i <= POSTS_PER_CATEGORY; i++) {
        const titlePool = TEXT_POOLS[category];
        // Başlığı havuzdaki cümlenin ilk 5-6 kelimesinden uyduralım
        const randomSentence = getRandomArrayElement(titlePool);
        const title = randomSentence.split(' ').slice(0, 6).join(' ') + "...";
        
        const content = generateLongContent(category);
        
        // Özet: İçeriğin ilk 150 karakteri
        const summary = content.substring(0, 140) + "...";

        posts.push({
          title: `${category}: ${title}`, // Başlıkların karışmaması için kategori öneki
          summary: summary,
          content: content,
          author: ["Ahmet Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Zeynep Çelik", "Caner Erkin"][getRandomInt(0, 4)],
          category: category,
          image: getCategoryImage(category),
          date: new Date(Date.now() - getRandomInt(0, 1000000000)), // Geçmişe dönük rastgele tarih
          isApproved: true
        });
      }
    }

    console.log(`💾 ${posts.length} adet haber veritabanına yazılıyor...`);
    await Post.insertMany(posts);
    
    console.log("🎉 İŞLEM TAMAMLANDI! Veritabanı başarıyla tohumlandı.");
    process.exit(0);

  } catch (err) {
    console.error("❌ BİR HATA OLUŞTU:", err);
    process.exit(1);
  }
}

seedDB();