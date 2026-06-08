import type {
  TicketDurum,
  TicketOncelik,
  DuyguTipi,
} from "@/types";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function durumRengi(durum: TicketDurum): string {
  return {
    acik: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    bekliyor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    cozuldu: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  }[durum];
}

export function durumEtiketi(durum: TicketDurum): string {
  return { acik: "Açık", bekliyor: "Bekliyor", cozuldu: "Çözüldü" }[durum];
}

export function oncelikRengi(oncelik: TicketOncelik): string {
  return {
    dusuk: "text-emerald-400",
    yuksek: "text-red-400",
  }[oncelik];
}

export function oncelikEtiketi(oncelik: TicketOncelik): string {
  return { dusuk: "Düşük", yuksek: "Yüksek" }[oncelik];
}

export function duyguRengi(duygu: DuyguTipi): string {
  return {
    olumlu: "text-emerald-400",
    notr: "text-slate-400",
    olumsuz: "text-amber-400",
    kritik: "text-red-400",
  }[duygu];
}

export function duyguEtiketi(duygu: DuyguTipi): string {
  return {
    olumlu: "Olumlu",
    notr: "Nötr",
    olumsuz: "Olumsuz",
    kritik: "Kritik",
  }[duygu];
}

export function zamanFarki(tarih: string): string {
  const fark = Date.now() - new Date(tarih).getTime();
  const dk = Math.floor(fark / 60_000);
  if (dk < 1) return "az önce";
  if (dk < 60) return `${dk}dk önce`;
  const sa = Math.floor(dk / 60);
  if (sa < 24) return `${sa}s önce`;
  const gun = Math.floor(sa / 24);
  return `${gun}g önce`;
}

export function tarihFormatla(tarih: string): string {
  return new Date(tarih).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
