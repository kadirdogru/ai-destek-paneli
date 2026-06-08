/**
 * In-memory veri deposu — PRD §2 Veri Modeli
 * Üretimde Prisma + PostgreSQL / Supabase ile değiştirilir.
 */
import type { Ticket, Mesaj, DashboardIstatistik } from "@/types";

const simdi = () => new Date().toISOString();
const tarih = (gunFarki: number) => {
  const d = new Date();
  d.setDate(d.getDate() - gunFarki);
  return d.toISOString();
};

let TICKETS: Ticket[] = [
  {
    id: "TKT-0001",
    baslik: "Giriş yapamıyorum, şifre sıfırlama çalışmıyor",
    icerik:
      "Şifremi sıfırlamaya çalıştığımda e-posta gelmiyor. Spam klasörünü de kontrol ettim, hiçbir şey yok.",
    durum: "acik",
    oncelik: "yuksek",
    kategori: "Hesap",
    musteri: { id: "USR-001", ad: "Mehmet Kaya", email: "mehmet@example.com" },
    atanan: "Ahmet Yılmaz",
    duyguAnalizi: {
      duygu: "olumsuz",
      aciliyet: 72,
      ozet: "Müşteri erişim kaybı yaşıyor, hayal kırıklığı belirgin.",
    },
    aiTaslak:
      "Merhaba Mehmet Bey, sorununuzu aldık. SMTP log kayıtlarını inceliyoruz. Geçici çözüm olarak hesabınızı manuel sıfırlayacağız ve size 15 dakika içinde yeni şifrenizi ileteceğiz.",
    mesajlar: [
      {
        id: "MSG-001",
        gonderen: "kullanici",
        icerik: "Şifremi sıfırlayamıyorum, e-posta gelmiyor.",
        createdAt: tarih(1),
      },
      {
        id: "MSG-002",
        gonderen: "temsilci",
        icerik: "Merhaba, e-posta adresinizi teyit eder misiniz?",
        createdAt: tarih(1),
      },
      {
        id: "MSG-003",
        gonderen: "kullanici",
        icerik: "mehmet@example.com",
        createdAt: tarih(1),
      },
    ],
    createdAt: tarih(1),
    updatedAt: tarih(0),
  },
  {
    id: "TKT-0002",
    baslik: "API yanıt süreleri kritik derecede yavaş",
    icerik:
      "Canlı ortamda API çağrıları 10+ saniye sürüyor. Üretim sistemimiz etkileniyor, müşterilerimiz şikayet ediyor.",
    durum: "bekliyor",
    oncelik: "yuksek",
    kategori: "Teknik",
    musteri: {
      id: "USR-002",
      ad: "TechCorp A.Ş.",
      email: "support@techcorp.com",
    },
    atanan: "Fatma Çelik",
    duyguAnalizi: {
      duygu: "kritik",
      aciliyet: 95,
      ozet: "Kritik iş kesintisi. Acil müdahale gerekiyor.",
    },
    aiTaslak:
      "Sayın TechCorp ekibi, API yavaşlık sorununu yüksek öncelikle aldık. Veritabanı sorgu planlarını analiz ediyoruz. N+1 sorgu problemi ve Redis cache eksikliği ilk bulgularımız. Tahmini çözüm süresi: 2 saat.",
    mesajlar: [
      {
        id: "MSG-004",
        gonderen: "kullanici",
        icerik: "API yavaşlığı nedeniyle müşterilerimiz etkileniyor!",
        createdAt: tarih(0),
      },
      {
        id: "MSG-005",
        gonderen: "ai",
        icerik:
          "Otomatik analiz: Veritabanı yük metrikleri yüksek. Geliştirici ekibine eskalasyon önerilir.",
        createdAt: tarih(0),
      },
      {
        id: "MSG-006",
        gonderen: "temsilci",
        icerik: "Konuyu en yüksek öncelikle aldık. Sunucu metriklerini inceliyoruz.",
        createdAt: tarih(0),
      },
    ],
    createdAt: tarih(0),
    updatedAt: tarih(0),
  },
  {
    id: "TKT-0003",
    baslik: "KVKK kapsamında veri silme talebi",
    icerik:
      "6698 sayılı KVKK ve GDPR kapsamında sistemdeki tüm kişisel verilerimin silinmesini resmi olarak talep ediyorum.",
    durum: "bekliyor",
    oncelik: "yuksek",
    kategori: "Hukuki",
    musteri: { id: "USR-003", ad: "Zeynep Kılıç", email: "zeynep@example.com" },
    atanan: "Mehmet Arslan",
    duyguAnalizi: {
      duygu: "notr",
      aciliyet: 88,
      ozet: "Yasal zorunluluk. 30 gün içinde yanıt verilmeli.",
    },
    aiTaslak:
      "Sayın Zeynep Hanım, KVKK md. 11/e kapsamındaki talebiniz sistemimize kaydedilmiştir. Hukuk departmanımız 30 iş günü içinde size yazılı yanıt verecektir. Referans numaranız: KVKK-2025-0003.",
    mesajlar: [
      {
        id: "MSG-007",
        gonderen: "kullanici",
        icerik: "KVKK kapsamında veri silme hakkımı kullanmak istiyorum.",
        createdAt: tarih(2),
      },
      {
        id: "MSG-008",
        gonderen: "sistem",
        icerik: "Talep alındı. Yasal süreç başlatıldı. Ref: KVKK-2025-0003",
        createdAt: tarih(2),
      },
    ],
    createdAt: tarih(2),
    updatedAt: tarih(1),
  },
  {
    id: "TKT-0004",
    baslik: "Faturamda hatalı ücretlendirme — 2x fazla ödeme",
    icerik:
      "Bu ay gönderilen faturada geçen ayın 2 katı ücret görüyorum. Herhangi bir plan değişikliği yapmadım.",
    durum: "acik",
    oncelik: "yuksek",
    kategori: "Fatura",
    musteri: { id: "USR-004", ad: "Ayşe Demir", email: "ayse@example.com" },
    duyguAnalizi: {
      duygu: "olumsuz",
      aciliyet: 68,
      ozet: "Finansal hata, müşteri güven kaybı riski mevcut.",
    },
    aiTaslak:
      "Merhaba Ayşe Hanım, faturanızdaki tutarsızlık için özür dileriz. Ödeme geçmişinizi inceledik — otomatik yenileme sırasında bir çift işlem oluşmuş. Fazla ödenen tutar 3 iş günü içinde iadesini başlatacağız.",
    mesajlar: [
      {
        id: "MSG-009",
        gonderen: "kullanici",
        icerik: "Faturamda ciddi bir hata var, acil yardım istiyorum.",
        createdAt: tarih(0),
      },
    ],
    createdAt: tarih(0),
    updatedAt: tarih(0),
  },
  {
    id: "TKT-0005",
    baslik: "Mobil uygulamada iOS 17 çökme sorunu",
    icerik:
      "iOS 17.4 güncellemesinden sonra uygulama açılmıyor, direkt kapanıyor. Birçok müşterimiz de aynı sorunu yaşıyor.",
    durum: "bekliyor",
    oncelik: "yuksek",
    kategori: "Teknik",
    musteri: { id: "USR-005", ad: "Elif Şahin", email: "elif@example.com" },
    atanan: "Ahmet Yılmaz",
    duyguAnalizi: {
      duygu: "olumsuz",
      aciliyet: 80,
      ozet: "Yaygın platform sorunu. Çok sayıda kullanıcı etkileniyor.",
    },
    aiTaslak:
      "Merhaba Elif Hanım, iOS 17.4 uyumluluk sorununu tespit ettik. Geliştirici ekibimiz yama üzerinde çalışıyor. App Store güncellemesi 48 saat içinde yayınlanacak. Geçici çözüm: Uygulamayı kaldırıp tekrar yükleyebilirsiniz.",
    mesajlar: [
      {
        id: "MSG-010",
        gonderen: "kullanici",
        icerik: "iOS güncellemesinden sonra uygulama açılmıyor.",
        createdAt: tarih(3),
      },
      {
        id: "MSG-011",
        gonderen: "temsilci",
        icerik: "Geliştirici ekibine ilettik. Yama için bildirimde bulunacağız.",
        createdAt: tarih(3),
      },
    ],
    createdAt: tarih(3),
    updatedAt: tarih(1),
  },
  {
    id: "TKT-0006",
    baslik: "CSV dışa aktarımında Türkçe karakter bozulması",
    icerik:
      "Veri export özelliğinde CSV dosyasındaki Türkçe karakterler (ğ, ş, ı, ç, ö, ü) bozuk görünüyor. Excel'de açınca anlamsız semboller çıkıyor.",
    durum: "acik",
    oncelik: "dusuk",
    kategori: "Teknik",
    musteri: {
      id: "USR-006",
      ad: "Raporlama A.Ş.",
      email: "data@raporlama.com",
    },
    duyguAnalizi: {
      duygu: "notr",
      aciliyet: 35,
      ozet: "Teknik sorun, iş kritik değil ancak verimliliği etkiliyor.",
    },
    aiTaslak:
      "Merhaba, CSV encoding sorununu tespit ettik. Excel Türkçe karakter desteği için dosyaya UTF-8 BOM (Byte Order Mark) eklenmesi gerekiyor. Geçici çözüm: Dosyayı Excel'de açarken 'Veri > Metinden/CSV'den' seçeneğini kullanın ve UTF-8 encoding belirtin.",
    mesajlar: [
      {
        id: "MSG-012",
        gonderen: "kullanici",
        icerik: "CSV dosyasında Türkçe karakterler bozuk çıkıyor.",
        createdAt: tarih(4),
      },
    ],
    createdAt: tarih(4),
    updatedAt: tarih(4),
  },
  {
    id: "TKT-0007",
    baslik: "SSL sertifikası süresi dolmuş — site erişilemiyor",
    icerik: "Web sitemizde 'Bağlantınız güvenli değil' uyarısı veriyor, müşterilerimiz erişemiyor.",
    durum: "cozuldu",
    oncelik: "yuksek",
    kategori: "Teknik",
    musteri: {
      id: "USR-007",
      ad: "E-Ticaret Ltd.",
      email: "it@eticaret.com",
    },
    atanan: "Fatma Çelik",
    duyguAnalizi: {
      duygu: "kritik",
      aciliyet: 98,
      ozet: "Acil — site tamamen erişilemez durumda.",
    },
    aiTaslak: "SSL sertifikası yenilendi. Otomatik yenileme için cron job kuruldu.",
    mesajlar: [
      {
        id: "MSG-013",
        gonderen: "kullanici",
        icerik: "Sitemiz SSL hatası veriyor, müşterilerimiz erişemiyor!",
        createdAt: tarih(5),
      },
      {
        id: "MSG-014",
        gonderen: "temsilci",
        icerik: "SSL sertifikası yenilendi. Siteniz artık güvenli. Otomatik yenileme de aktive edildi.",
        createdAt: tarih(5),
      },
    ],
    createdAt: tarih(5),
    updatedAt: tarih(5),
  },
  {
    id: "TKT-0008",
    baslik: "İki faktörlü doğrulama kodu geç geliyor",
    icerik:
      "SMS ile gelen 2FA kodu defalarca geç geliyor (5+ dakika) veya hiç gelmiyor. Giriş yapamıyorum.",
    durum: "acik",
    oncelik: "yuksek",
    kategori: "Hesap",
    musteri: { id: "USR-008", ad: "Burak Yıldız", email: "burak@example.com" },
    duyguAnalizi: {
      duygu: "olumsuz",
      aciliyet: 65,
      ozet: "Erişim engeli. SMS gateway sağlayıcısı araştırılmalı.",
    },
    aiTaslak:
      "Merhaba Burak Bey, SMS gecikmelerini fark ettik. SMS gateway sağlayıcımızda geçici bir sorun mevcut. Alternatif olarak Google Authenticator uygulamasını kullanmanızı öneririz — Ayarlar > Güvenlik > Authenticator Uygulaması adımlarını takip edebilirsiniz.",
    mesajlar: [
      {
        id: "MSG-015",
        gonderen: "kullanici",
        icerik: "2FA SMS kodu gelmediği için giriş yapamıyorum.",
        createdAt: tarih(0),
      },
    ],
    createdAt: tarih(0),
    updatedAt: tarih(0),
  },
];

let mesajSayac = 20;
let ticketSayac = 9;

// ---- CRUD Operasyonları ----

export function tumTicketlariGetir(): Ticket[] {
  return [...TICKETS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function ticketGetir(id: string): Ticket | undefined {
  return TICKETS.find((t) => t.id === id);
}

export function ticketOlustur(data: {
  baslik: string;
  icerik: string;
  oncelik: Ticket["oncelik"];
  kategori: string;
  musteri: Omit<Musteri, "id">;
}): Ticket {
  const yeni: Ticket = {
    id: `TKT-${String(ticketSayac++).padStart(4, "0")}`,
    baslik: data.baslik,
    icerik: data.icerik,
    durum: "acik",
    oncelik: data.oncelik,
    kategori: data.kategori,
    musteri: { id: `USR-${Date.now()}`, ...data.musteri },
    mesajlar: [
      {
        id: `MSG-${mesajSayac++}`,
        gonderen: "sistem",
        icerik: "Talep sisteme kaydedildi. Ekibimiz en kısa sürede dönüş yapacaktır.",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  TICKETS.unshift(yeni);
  return yeni;
}

export function ticketGuncelle(
  id: string,
  data: Partial<Pick<Ticket, "durum" | "oncelik" | "atanan" | "duyguAnalizi" | "aiTaslak">>
): Ticket | null {
  const idx = TICKETS.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  TICKETS[idx] = { ...TICKETS[idx], ...data, updatedAt: new Date().toISOString() };
  return TICKETS[idx];
}

export function mesajEkle(ticketId: string, gonderen: MesajGonderen, icerik: string): Mesaj | null {
  const ticket = TICKETS.find((t) => t.id === ticketId);
  if (!ticket) return null;
  const mesaj: Mesaj = {
    id: `MSG-${mesajSayac++}`,
    gonderen,
    icerik,
    createdAt: new Date().toISOString(),
  };
  ticket.mesajlar.push(mesaj);
  ticket.updatedAt = new Date().toISOString();
  return mesaj;
}

// ---- Dashboard İstatistikleri ----

export function istatistikleriGetir(): DashboardIstatistik {
  const acik = TICKETS.filter((t) => t.durum === "acik").length;
  const bekliyor = TICKETS.filter((t) => t.durum === "bekliyor").length;
  const cozuldu = TICKETS.filter((t) => t.durum === "cozuldu").length;
  const kritik = TICKETS.filter((t) => t.oncelik === "yuksek" && t.durum !== "cozuldu").length;

  const birHaftaOnce = new Date();
  birHaftaOnce.setDate(birHaftaOnce.getDate() - 7);
  const buHaftaCozulen = TICKETS.filter(
    (t) => t.durum === "cozuldu" && new Date(t.updatedAt) >= birHaftaOnce
  ).length;

  const toplam = acik + bekliyor + cozuldu;
  const cozumOrani = toplam > 0 ? Math.round((cozuldu / toplam) * 100) : 0;

  return {
    toplamAcik: acik,
    toplamBekliyor: bekliyor,
    toplamCozuldu: cozuldu,
    kritikSayisi: kritik,
    buHaftaCozulen,
    ortalamaYanitSuresi: "3.8s",
    cozumOrani,
  };
}

// Type import için
import type { Musteri, MesajGonderen } from "@/types";
