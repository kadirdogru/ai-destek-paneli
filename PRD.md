# PROJE: AI Destekli Müşteri İlişkileri Paneli (SaaS)
## Teknoloji: Next.js 15 (App Router), Tailwind CSS, TypeScript

### 1. PROJE MİMARİSİ
- **Klasör Yapısı:** Next.js App Router standartlarına uygun `/app` yapısı.
- **Modülerlik:** UI bileşenleri `/components`, iş mantığı `/lib`, veri tipleri `/types` altında.
- **API Katmanı:** `/api/tickets` üzerinden bilet yönetimi ve `/api/ai-reply` üzerinden yapay zeka yanıtları.

### 2. VERİ MODELİ VE ŞEMA
- **Talepler (Tickets):** id, baslik, icerik, durum (acik, bekliyor, cozuldu), oncelik (dusuk, yuksek).
- **Mesajlar:** Mesaj geçmişi ve gönderen bilgisi (Sistem/AI/Kullanıcı).
- **Müşteri:** Kullanıcı bilgileri ve Clerk entegrasyonu hazırlığı.

### 3. YAPAY ZEKA ÖZELLİKLERİ
- **Otomatik Yanıt:** Gelen talebin içeriğine göre AI otomatik bir çözüm taslağı hazırlayacak.
- **Duygu Analizi:** Talebin aciliyetini ve müşterinin ruh halini analiz edip öncelik atayacak.

### 4. UI/UX KRİTERLERİ
- **Tema:** Modern Dark Mode tasarımı.
- **Dashboard:** Özet istatistikler ve canlı talep listesi.