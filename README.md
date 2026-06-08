# ⚡ AI Destek Paneli

Influencer ve içerik üreticileri için geliştirilmiş, yapay zeka destekli modern müşteri destek yönetim sistemi. **Claude AI** entegrasyonu ile otomatik duygu analizi, akıllı yanıt önerileri ve gerçek zamanlı ticket yönetimi sunar.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude_API-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

---

## 📸 Ekran Görüntüleri

<div align="center">
  <img src="assets/destek1.png" alt="Dashboard ve Genel Metrikler" width="1000" style="border-radius: 8px; margin-bottom: 15px; border: 1px solid #2d2d2d;"/>
  <br/>
  
  <img src="assets/destek5.png" alt="Ticket Detayı ve AI Duygu Analizi" width="490" style="border-radius: 8px; margin: 5px; border: 1px solid #2d2d2d;"/>
  <img src="assets/destek2.png" alt="Ticket Listesi ve Filtreleme" width="490" style="border-radius: 8px; margin: 5px; border: 1px solid #2d2d2d;"/>
  <br/>
  <img src="assets/destek4.png" alt="Performans Raporları ve Grafikler" width="490" style="border-radius: 8px; margin: 5px; border: 1px solid #2d2d2d;"/>
  <img src="assets/destek3.png" alt="Yeni Ticket Oluşturma Modeli" width="490" style="border-radius: 8px; margin: 5px; border: 1px solid #2d2d2d;"/>
</div>

---

## ✨ Özellikler

### 🎫 Ticket Yönetimi
- Ticket oluşturma, listeleme, detaylı arama ve filtreleme.
- **Durum Takibi:** Açık → Bekliyor → Çözüldü geçişleri.
- **Öncelik Seviyeleri:** Düşük, Normal, Yüksek ve Acil seviye atamaları.
- **Kategori Sınıflandırması:** Teknik, Fatura, Hesap, Hukuki, Genel.
- Müşteri profili entegrasyonu ile kesintisiz mesaj geçmişi.

### 🤖 Yapay Zeka (Claude API)
- **Duygu Analizi:** Gelen mesajların Olumlu / Nötr / Olumsuz / Kritik olarak anlık sınıflandırılması.
- **Aciliyet Skoru:** İçeriğe göre 0–100 arası otomatik öncelik puanlaması.
- **Otomatik Yanıt Önerisi:** Kategoriye ve geçmiş konuşma bağlamına özel profesyonel yanıt taslakları üretimi.
- *Fallback Modu:* API anahtarı yoksa sistemin kesintiye uğramadan şablon tabanlı simülasyon moduna geçebilmesi.

### 📊 Dashboard ve Raporlar
- Gerçek zamanlı KPI kartları (Açık ticket, çözüm oranı, ortalama yanıt süresi).
- Haftalık açılan/çözülen taleplerin trend analiz grafikleri.
- Ekip bazlı performans tabloları ve çözüm süreleri.
- AI tabanlı içgörüler ve sistem uyarıları paneli.

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI Kütüphanesi** | React 19, Tailwind CSS |
| **Veri Görselleştirme** | Recharts |
| **İkonlar** | Lucide React |
| **Tarih İşlemleri** | date-fns |
| **Yapay Zeka** | Anthropic Claude API (`@anthropic-ai/sdk`) |
| **Tip Güvenliği** | TypeScript (Strict Mode) |

---

## 🚀 Başlarken

### Gereksinimler

- Node.js 18+
- npm veya yarn
- *Opsiyonel:* Anthropic API Anahtarı

### Kurulum Adımları

```bash
# Repoyu klonla
git clone [https://github.com/KULLANICI_ADIN/ai-destek-paneli.git](https://github.com/KULLANICI_ADIN/ai-destek-paneli.git)
cd ai-destek-paneli

# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini oluştur
cp .env.example .env.local
