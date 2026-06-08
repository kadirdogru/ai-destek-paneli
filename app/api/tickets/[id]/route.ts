/**
 * PRD §1 — /api/tickets/[id] — GET, PUT, POST (mesaj ekle)
 */
import { NextRequest, NextResponse } from "next/server";
import { ticketGetir, ticketGuncelle, mesajEkle } from "@/lib/data";
import type { TicketGuncelleDTO } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ticket = ticketGetir(id);
  if (!ticket) {
    return NextResponse.json({ hata: "Ticket bulunamadı" }, { status: 404 });
  }
  return NextResponse.json({ ticket });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body: TicketGuncelleDTO & { mesaj?: string; gonderen?: string } =
      await req.json();

    // Mesaj ekleme isteği
    if (body.mesaj) {
      const gonderen = (body.gonderen as "temsilci" | "ai" | "kullanici" | "sistem") ?? "temsilci";
      const mesaj = mesajEkle(id, gonderen, body.mesaj);
      if (!mesaj) {
        return NextResponse.json({ hata: "Ticket bulunamadı" }, { status: 404 });
      }
      return NextResponse.json({ mesaj });
    }

    // Alan güncelleme
    const ticket = ticketGuncelle(id, {
      durum: body.durum,
      oncelik: body.oncelik,
      atanan: body.atanan,
    });

    if (!ticket) {
      return NextResponse.json({ hata: "Ticket bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ ticket });
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek" }, { status: 400 });
  }
}
