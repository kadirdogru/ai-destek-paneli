"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Plus, ChevronRight, User, Tag } from "lucide-react";
import Link from "next/link";
import type { Ticket, TicketDurum, TicketOncelik } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { durumRengi, durumEtiketi, oncelikRengi, oncelikEtiketi, zamanFarki } from "@/lib/utils";
import CreateTicketModal from "./CreateTicketModal";

interface Props { baslangicTicketlar: Ticket[] }

const KATEGORILER = ["Tümü", "Teknik", "Fatura", "Hesap", "Hukuki"];
const DURUMLAR: { value: string; label: string }[] = [
  { value: "tumu", label: "Tüm Durumlar" },
  { value: "acik", label: "Açık" },
  { value: "bekliyor", label: "Bekliyor" },
  { value: "cozuldu", label: "Çözüldü" },
];
const ONCELIKLER: { value: string; label: string }[] = [
  { value: "tumu", label: "Tüm Öncelikler" },
  { value: "yuksek", label: "Yüksek" },
  { value: "dusuk", label: "Düşük" },
];

export default function TicketListClient({ baslangicTicketlar }: Props) {
  const [tickets, setTickets] = useState<Ticket[]>(baslangicTicketlar);
  const [aramaMetni, setAramaMetni] = useState("");
  const [durumFiltre, setDurumFiltre] = useState("tumu");
  const [oncelikFiltre, setOncelikFiltre] = useState("tumu");
  const [kategoriFiltre, setKategoriFiltre] = useState("Tümü");
  const [modalAcik, setModalAcik] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);

  const fetchTickets = useCallback(async () => {
    setYukleniyor(true);
    const params = new URLSearchParams();
    if (durumFiltre !== "tumu") params.set("durum", durumFiltre);
    if (oncelikFiltre !== "tumu") params.set("oncelik", oncelikFiltre);
    if (kategoriFiltre !== "Tümü") params.set("kategori", kategoriFiltre);
    if (aramaMetni) params.set("q", aramaMetni);

    const res = await fetch(`/api/tickets?${params}`);
    const data = await res.json();
    setTickets(data.tickets);
    setYukleniyor(false);
  }, [durumFiltre, oncelikFiltre, kategoriFiltre, aramaMetni]);

  useEffect(() => {
    const timer = setTimeout(fetchTickets, 300);
    return () => clearTimeout(timer);
  }, [fetchTickets]);

  const durumSayaci = (durum: string) =>
    baslangicTicketlar.filter((t) => durum === "tumu" || t.durum === durum).length;

  return (
    <div className="p-7 space-y-5">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Ticketlar</h1>
          <p className="text-sm text-slate-500 mt-0.5">{tickets.length} talep listeleniyor</p>
        </div>
        <Button onClick={() => setModalAcik(true)}>
          <Plus size={15} />
          Yeni Ticket
        </Button>
      </div>

      {/* Filtreler */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            placeholder="Ticket ID, başlık veya müşteri ara..."
            className="w-full bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-500 flex-shrink-0" />
          <select
            value={durumFiltre}
            onChange={(e) => setDurumFiltre(e.target.value)}
            className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {DURUMLAR.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
          <select
            value={oncelikFiltre}
            onChange={(e) => setOncelikFiltre(e.target.value)}
            className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {ONCELIKLER.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Durum sekmeleri */}
      <div className="flex gap-1 border-b border-[#2a2a4a]">
        {[{ value: "tumu", label: "Tümü" }, { value: "acik", label: "Açık" }, { value: "bekliyor", label: "Bekliyor" }, { value: "cozuldu", label: "Çözüldü" }].map((d) => (
          <button
            key={d.value}
            onClick={() => setDurumFiltre(d.value)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all ${
              durumFiltre === d.value
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {d.label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
              durumFiltre === d.value ? "bg-indigo-500/20 text-indigo-400" : "bg-[#2a2a4a] text-slate-500"
            }`}>
              {durumSayaci(d.value)}
            </span>
          </button>
        ))}

        {/* Kategori filtreleri sağda */}
        <div className="ml-auto flex gap-1 pb-1">
          {KATEGORILER.map((k) => (
            <button
              key={k}
              onClick={() => setKategoriFiltre(k)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                kategoriFiltre === k
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Tag size={11} className="inline mr-1" />
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        {/* Tablo başlığı */}
        <div className="grid grid-cols-[85px_1fr_110px_90px_100px_90px_80px_28px] gap-3 px-5 py-3 bg-white/[0.02] border-b border-[#2a2a4a] text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          <span>ID</span>
          <span>Başlık & Müşteri</span>
          <span>Kategori</span>
          <span>Öncelik</span>
          <span>Durum</span>
          <span>Atanan</span>
          <span>Süre</span>
          <span />
        </div>

        {yukleniyor && (
          <div className="text-center py-10 text-sm text-slate-500">Yükleniyor...</div>
        )}

        {!yukleniyor && tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Search size={36} className="text-slate-700" />
            <p className="text-slate-500 text-sm">Ticket bulunamadı</p>
          </div>
        )}

        {!yukleniyor && tickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/tickets/${ticket.id}`}
            className="grid grid-cols-[85px_1fr_110px_90px_100px_90px_80px_28px] gap-3 px-5 py-4 border-b border-[#2a2a4a]/50 last:border-none items-center hover:bg-indigo-500/5 transition-colors group"
          >
            <span className="font-mono text-[11px] font-bold text-indigo-400">{ticket.id}</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white transition-colors">
                {ticket.baslik}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <User size={10} /> {ticket.musteri.ad}
              </p>
            </div>
            <span className="text-xs text-slate-400">{ticket.kategori}</span>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${oncelikRengi(ticket.oncelik as TicketOncelik)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${ticket.oncelik === "yuksek" ? "bg-red-400" : "bg-emerald-400"}`} />
              {oncelikEtiketi(ticket.oncelik as TicketOncelik)}
            </span>
            <Badge className={durumRengi(ticket.durum as TicketDurum)}>
              {durumEtiketi(ticket.durum as TicketDurum)}
            </Badge>
            <div>
              {ticket.atanan ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white">
                    {ticket.atanan.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs text-slate-400 truncate">{ticket.atanan.split(" ")[0]}</span>
                </div>
              ) : (
                <span className="text-xs text-slate-600 italic">Atanmadı</span>
              )}
            </div>
            <span className="text-xs text-slate-500">{zamanFarki(ticket.createdAt)}</span>
            <ChevronRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Yeni Ticket Modalı */}
      <CreateTicketModal
        acik={modalAcik}
        onKapat={() => setModalAcik(false)}
        onOlustur={(yeniTicket) => {
          setTickets((prev) => [yeniTicket, ...prev]);
          setModalAcik(false);
        }}
      />
    </div>
  );
}
