// PRD §2 — Veri Modeli

export type TicketDurum = "acik" | "bekliyor" | "cozuldu";
export type TicketOncelik = "dusuk" | "yuksek";
export type MesajGonderen = "kullanici" | "temsilci" | "ai" | "sistem";
export type DuyguTipi = "olumlu" | "notr" | "olumsuz" | "kritik";

export interface Musteri {
  id: string;
  ad: string;
  email: string;
  /** Clerk user ID — PRD §2 Clerk entegrasyonu hazırlığı */
  clerkId?: string;
}

export interface DuyguAnalizi {
  /** PRD §3 — Talebin aciliyeti ve müşteri ruh hali */
  duygu: DuyguTipi;
  /** 0-100 arası aciliyet skoru */
  aciliyet: number;
  ozet: string;
}

export interface Mesaj {
  id: string;
  gonderen: MesajGonderen;
  icerik: string;
  createdAt: string; // ISO string — JSON serileştirme için
}

export interface Ticket {
  id: string;
  /** PRD §2 — Talep alanları */
  baslik: string;
  icerik: string;
  durum: TicketDurum;
  oncelik: TicketOncelik;
  kategori: string;
  musteri: Musteri;
  mesajlar: Mesaj[];
  /** PRD §3 — Duygu & aciliyet analizi */
  duyguAnalizi?: DuyguAnalizi;
  /** PRD §3 — AI tarafından üretilen çözüm taslağı */
  aiTaslak?: string;
  atanan?: string;
  createdAt: string;
  updatedAt: string;
}

// API istek/yanıt tipleri
export interface TicketOlusturDTO {
  baslik: string;
  icerik: string;
  oncelik: TicketOncelik;
  kategori: string;
  musteri: Omit<Musteri, "id">;
}

export interface TicketGuncelleDTO {
  durum?: TicketDurum;
  oncelik?: TicketOncelik;
  atanan?: string;
}

export interface AIYanitIstekDTO {
  ticketId: string;
  ticketBaslik: string;
  ticketIcerik: string;
  kategori: string;
  mesajGecmisi: { gonderen: MesajGonderen; icerik: string }[];
}

export interface AIYanitDTO {
  yanitMetni: string;
  duyguAnalizi: DuyguAnalizi;
  onerilen_oncelik: TicketOncelik;
}

export interface DashboardIstatistik {
  toplamAcik: number;
  toplamBekliyor: number;
  toplamCozuldu: number;
  kritikSayisi: number;
  buHaftaCozulen: number;
  ortalamaYanitSuresi: string;
  cozumOrani: number;
}
