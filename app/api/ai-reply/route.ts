/**
 * PRD §3 — /api/ai-reply
 * Otomatik yanıt taslağı + duygu analizi üretir.
 * ANTHROPIC_API_KEY varsa gerçek Claude API kullanır, yoksa simülasyon yapar.
 */
import { NextRequest, NextResponse } from "next/server";
import { ticketGuncelle, mesajEkle } from "@/lib/data";
import type { AIYanitIstekDTO, AIYanitDTO, DuyguAnalizi, TicketOncelik } from "@/types";

// PRD §3 — Duygu analizi: metin içeriğini analiz edip aciliyet atar
function duyguAnaliziYap(baslik: string, icerik: string): DuyguAnalizi {
  const metin = (baslik + " " + icerik).toLowerCase();

  const kritikKelimeler = ["kritik", "acil", "kapat", "hukuk", "kvkk", "gdpr", "dava", "ssl", "çalışmıyor", "erişilemiyor", "kesinti"];
  const olumsuzKelimeler = ["hata", "sorun", "problem", "yavaş", "bozuk", "gelmiy", "yapamıyorum", "memnun değil", "şikayet"];
  const olumluKelimeler = ["teşekkür", "mükemmel", "harika", "çözüldü", "tamam"];

  const kritikSkor = kritikKelimeler.filter((k) => metin.includes(k)).length;
  const olumsuzSkor = olumsuzKelimeler.filter((k) => metin.includes(k)).length;
  const olumluSkor = olumluKelimeler.filter((k) => metin.includes(k)).length;

  if (kritikSkor >= 2) {
    return { duygu: "kritik", aciliyet: 90 + kritikSkor * 2, ozet: "Kritik iş etkisi tespit edildi. Acil eskalasyon gerekiyor." };
  }
  if (kritikSkor === 1 || olumsuzSkor >= 2) {
    return { duygu: "olumsuz", aciliyet: 60 + olumsuzSkor * 5, ozet: "Müşteri hayal kırıklığı belirgin. Öncelikli yanıt önerilir." };
  }
  if (olumluSkor > 0) {
    return { duygu: "olumlu", aciliyet: 15, ozet: "Müşteri memnun görünüyor. Standart süreç yeterli." };
  }
  return { duygu: "notr", aciliyet: 35, ozet: "Durum nötr. Normal öncelikle işlenebilir." };
}

function oncelikBelirle(duygu: DuyguAnalizi): TicketOncelik {
  return duygu.aciliyet >= 60 ? "yuksek" : "dusuk";
}

// Gerçek Claude API ile yanıt üret — PRD §3
async function claudeIleYanitUret(dto: AIYanitIstekDTO): Promise<string> {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const mesajGecmisiMetin = dto.mesajGecmisi
    .map((m) => `${m.gonderen === "kullanici" ? "Müşteri" : "Temsilci"}: ${m.icerik}`)
    .join("\n");

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: `Sen bir müşteri destek temsilcisisin. Türkçe, profesyonel ve empatik bir şekilde yanıt ver.
Yanıtın:
- Kısa ve net olsun (3-5 cümle)
- Müşteriyi rahatlatıcı ve çözüm odaklı olsun
- Kategori: ${dto.kategori}
- Gerçekçi ve uygulanabilir bir çözüm öner`,
    messages: [
      {
        role: "user",
        content: `Talep: ${dto.ticketBaslik}\n\nİçerik: ${dto.ticketIcerik}\n\nKonuşma geçmişi:\n${mesajGecmisiMetin}\n\nBu talep için profesyonel bir yanıt taslağı yaz.`,
      },
    ],
  });

  const blok = message.content[0];
  return blok.type === "text" ? blok.text : "";
}

// API anahtarı yoksa simülasyon yanıtı — PRD §3 fallback
function simulasyonYaniti(dto: AIYanitIstekDTO, duygu: DuyguAnalizi): string {
  const sablonlar: Record<string, string> = {
    Teknik: `Merhaba ${dto.mesajGecmisi[0]?.icerik ? "müşterimiz" : "değerli müşterimiz"}, teknik sorununuzu aldık. Sistem loglarımızı inceliyoruz ve size en kısa sürede çözüm sunacağız. Tahmini yanıt süremiz 2 saattir.`,
    Fatura: `Merhaba, fatura sorununuzu inceliyoruz. Ödeme geçmişinizi kontrol ettik ve tutarsızlığı tespit ettik. Düzeltme işlemi 3 iş günü içinde tamamlanacak ve size e-posta ile bilgi verilecektir.`,
    Hesap: `Merhaba, hesap sorununuzu aldık. Güvenliğiniz için kimlik doğrulama sürecini başlatıyoruz. E-posta adresinize doğrulama bağlantısı gönderdik, lütfen kontrol edin.`,
    Hukuki: `Sayın müşterimiz, hukuki talebiniz sistemimize kaydedilmiştir. Konuyu hukuk departmanımıza ilettik. Yasal süreler dahilinde (30 iş günü) yazılı yanıt verilecektir.`,
    default: `Merhaba, talebinizi aldık ve incelemeye başladık. ${duygu.aciliyet > 70 ? "Aciliyetini fark ettik ve öncelikli olarak ele alıyoruz." : "En kısa sürede size geri dönüş yapacağız."} Sorunuz için teşekkür ederiz.`,
  };

  return sablonlar[dto.kategori] ?? sablonlar.default;
}

export async function POST(req: NextRequest) {
  try {
    const dto: AIYanitIstekDTO = await req.json();

    // PRD §3 — Duygu analizi her zaman çalışır
    const duygu = duyguAnaliziYap(dto.ticketBaslik, dto.ticketIcerik);
    const oncelik = oncelikBelirle(duygu);

    // PRD §3 — Otomatik yanıt: Claude varsa gerçek, yoksa simülasyon
    let yanitMetni: string;
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        yanitMetni = await claudeIleYanitUret(dto);
      } catch {
        yanitMetni = simulasyonYaniti(dto, duygu);
      }
    } else {
      yanitMetni = simulasyonYaniti(dto, duygu);
    }

    // Ticket güncelle: duygu analizi + AI taslağını kaydet
    ticketGuncelle(dto.ticketId, { duyguAnalizi: duygu, aiTaslak: yanitMetni, oncelik });

    // AI mesajını konuşma geçmişine ekle
    mesajEkle(dto.ticketId, "ai", `[AI Taslak] ${yanitMetni}`);

    const yanit: AIYanitDTO = {
      yanitMetni,
      duyguAnalizi: duygu,
      onerilen_oncelik: oncelik,
    };

    return NextResponse.json(yanit);
  } catch (err) {
    console.error("[/api/ai-reply]", err);
    return NextResponse.json({ hata: "AI yanıt üretilemedi" }, { status: 500 });
  }
}
