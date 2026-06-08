/**
 * PRD §1 — /api/tickets — GET (listele) & POST (oluştur)
 */
import { NextRequest, NextResponse } from "next/server";
import { tumTicketlariGetir, ticketOlustur } from "@/lib/data";
import type { TicketOlusturDTO } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const durum = searchParams.get("durum");
  const oncelik = searchParams.get("oncelik");
  const kategori = searchParams.get("kategori");
  const q = searchParams.get("q")?.toLowerCase();

  let tickets = tumTicketlariGetir();

  if (durum && durum !== "tumu") {
    tickets = tickets.filter((t) => t.durum === durum);
  }
  if (oncelik && oncelik !== "tumu") {
    tickets = tickets.filter((t) => t.oncelik === oncelik);
  }
  if (kategori && kategori !== "tumu") {
    tickets = tickets.filter((t) => t.kategori === kategori);
  }
  if (q) {
    tickets = tickets.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.baslik.toLowerCase().includes(q) ||
        t.musteri.ad.toLowerCase().includes(q) ||
        t.musteri.email.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ tickets, toplam: tickets.length });
}

export async function POST(req: NextRequest) {
  try {
    const body: TicketOlusturDTO = await req.json();

    if (!body.baslik?.trim()) {
      return NextResponse.json({ hata: "Başlık zorunludur" }, { status: 400 });
    }
    if (!body.icerik?.trim()) {
      return NextResponse.json({ hata: "İçerik zorunludur" }, { status: 400 });
    }
    if (!body.musteri?.ad?.trim() || !body.musteri?.email?.trim()) {
      return NextResponse.json(
        { hata: "Müşteri adı ve e-posta zorunludur" },
        { status: 400 }
      );
    }

    const ticket = ticketOlustur(body);
    return NextResponse.json({ ticket }, { status: 201 });
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek gövdesi" }, { status: 400 });
  }
}
