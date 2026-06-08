"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Send, CheckCircle, Clock, User,
  Tag, Bot, Loader2, Edit2
} from "lucide-react";
import type { Ticket, AIYanitDTO, TicketDurum, TicketOncelik } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import AIReplyPanel from "./AIReplyPanel";
import {
  durumRengi, durumEtiketi, oncelikEtiketi, oncelikRengi,
  tarihFormatla, zamanFarki
} from "@/lib/utils";

interface Props { baslangicTicket: Ticket }

const DURUMLAR: { value: TicketDurum; label: string }[] = [
  { value: "acik", label: "Açık" },
  { value: "bekliyor", label: "Bekliyor" },
  { value: "cozuldu", label: "Çözüldü" },
];
const TEMSILCILER = ["Ahmet Yılmaz", "Fatma Çelik", "Mehmet Arslan", "Selin Kaya"];

export default function TicketDetailClient({ baslangicTicket }: Props) {
  const [ticket, setTicket] = useState<Ticket>(baslangicTicket);
  const [mesaj, setMesaj] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);

  // Alan güncellemesi — API'ye PUT
  const alanGuncelle = async (veri: Partial<Pick<Ticket, "durum" | "oncelik" | "atanan">>) => {
    setKaydediliyor(true);
    const res = await fetch(`/api/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veri),
    });
    if (res.ok) {
      const data = await res.json();
      setTicket(data.ticket);
    }
    setKaydediliyor(false);
  };

  // Temsilci mesajı gönder
  const mesajGonder = async () => {
    if (!mesaj.trim()) return;
    setGonderiliyor(true);
    const res = await fetch(`/api/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj, gonderen: "temsilci" }),
    });
    if (res.ok) {
      // Ticket'ı yeniden çek
      const ticketRes = await fetch(`/api/tickets/${ticket.id}`);
      const data = await ticketRes.json();
      setTicket(data.ticket);
      setMesaj("");
    }
    setGonderiliyor(false);
  };

  // AI yanıt üretildi — textarea'ya doldur
  const aiYanitUretildi = (_yanit: AIYanitDTO, taslak: string) => {
    setMesaj(taslak);
    // Ticket'ı da güncelle (duygu analizi için)
    fetch(`/api/tickets/${ticket.id}`)
      .then((r) => r.json())
      .then((d) => setTicket(d.ticket));
  };

  const mesajRengi = (g: string) => {
    if (g === "kullanici") return "bg-[#16213e] border-[#2a2a4a]";
    if (g === "ai") return "bg-indigo-500/8 border-indigo-500/20";
    if (g === "sistem") return "bg-slate-500/5 border-slate-500/15";
    return "bg-emerald-500/5 border-emerald-500/15";
  };

  const mesajRenkText = (g: string) => {
    if (g === "ai") return "text-indigo-400";
    if (g === "sistem") return "text-slate-500";
    if (g === "temsilci") return "text-emerald-400";
    return "text-blue-400";
  };

  const gonderen = (g: string) => {
    const m: Record<string, string> = { kullanici: "Müşteri", temsilci: "Temsilci", ai: "AI Asistan", sistem: "Sistem" };
    return m[g] || g;
  };

  return (
    <div className="p-7 space-y-5">
      {/* Başlık & Aksiyonlar */}
      <div className="flex items-center gap-3">
        <Link href="/tickets">
          <Button variant="secondary" size="sm">
            <ArrowLeft size={14} /> Geri
          </Button>
        </Link>
        <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg">
          {ticket.id}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {kaydediliyor && <Loader2 size={14} className="animate-spin text-slate-500" />}
          <Button
            size="sm"
            variant={ticket.durum === "cozuldu" ? "secondary" : "primary"}
            onClick={() => alanGuncelle({ durum: "cozuldu" })}
            disabled={ticket.durum === "cozuldu" || kaydediliyor}
          >
            <CheckCircle size={14} />
            {ticket.durum === "cozuldu" ? "Çözüldü ✓" : "Çöz"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-5">
        {/* Sol — Ana panel */}
        <div className="space-y-4">
          {/* Ticket başlığı & açıklaması */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
            <h2 className="text-lg font-bold text-slate-100 mb-2">{ticket.baslik}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{ticket.icerik}</p>
          </div>

          {/* Konuşma geçmişi — PRD §2 Mesaj geçmişi */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Konuşma Geçmişi ({ticket.mesajlar.length})
            </h4>

            {ticket.mesajlar.map((msg) => (
              <div key={msg.id} className={`flex gap-3 items-start ${msg.gonderen === "temsilci" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                  msg.gonderen === "kullanici" ? "bg-blue-500/20 text-blue-400" :
                  msg.gonderen === "ai" ? "bg-indigo-500/20 text-indigo-400" :
                  msg.gonderen === "sistem" ? "bg-slate-500/10 text-slate-500" :
                  "bg-emerald-500/10 text-emerald-400"
                }`}>
                  {msg.gonderen === "ai" ? <Bot size={13} /> :
                   msg.gonderen === "kullanici" ? <User size={13} /> : "AY"}
                </div>
                <div className={`max-w-[80%] ${msg.gonderen === "temsilci" ? "items-end flex flex-col" : ""}`}>
                  <div className={`flex items-center gap-2 text-[10px] mb-1 ${msg.gonderen === "temsilci" ? "flex-row-reverse" : ""}`}>
                    <span className={`font-semibold ${mesajRenkText(msg.gonderen)}`}>{gonderen(msg.gonderen)}</span>
                    <span className="text-slate-600">{tarihFormatla(msg.createdAt)}</span>
                  </div>
                  <div className={`text-sm leading-relaxed px-3 py-2 rounded-xl border ${mesajRengi(msg.gonderen)} text-slate-300`}>
                    {msg.gonderen === "ai" && msg.icerik.startsWith("[AI Taslak]")
                      ? msg.icerik.replace("[AI Taslak] ", "")
                      : msg.icerik}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Yanıt Kutusu */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a4a] bg-white/[0.02] flex items-center gap-2">
              <Edit2 size={13} className="text-slate-500" />
              <span className="text-xs font-semibold text-slate-400">Yanıt Yaz</span>
              <span className="ml-auto text-[10px] text-slate-600">Ctrl+Enter ile gönder</span>
            </div>
            <textarea
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) mesajGonder(); }}
              placeholder="Müşteriye yanıt yazın..."
              rows={4}
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none"
            />
            <div className="px-4 py-3 border-t border-[#2a2a4a] flex items-center justify-between">
              <Clock size={13} className="text-slate-600" />
              <Button onClick={mesajGonder} disabled={!mesaj.trim() || gonderiliyor} size="sm">
                {gonderiliyor ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                Gönder
              </Button>
            </div>
          </div>
        </div>

        {/* Sağ — Yan panel */}
        <div className="space-y-4">
          {/* Detaylar */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Detaylar</h4>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-1.5"><User size={12} />Müşteri</span>
              <span className="text-slate-300 font-medium">{ticket.musteri.ad}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">E-posta</span>
              <span className="text-slate-400 text-xs">{ticket.musteri.email}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-1.5"><Tag size={12} />Kategori</span>
              <span className="text-slate-300">{ticket.kategori}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-1.5"><Clock size={12} />Oluşturulma</span>
              <span className="text-slate-400 text-xs">{zamanFarki(ticket.createdAt)}</span>
            </div>
          </div>

          {/* Durum & Öncelik — PRD §2 */}
          <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Durum & Öncelik</h4>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Durum</span>
              <select
                value={ticket.durum}
                onChange={(e) => alanGuncelle({ durum: e.target.value as TicketDurum })}
                className={`text-xs font-semibold rounded-md px-2 py-1 border focus:outline-none ${durumRengi(ticket.durum)} bg-transparent cursor-pointer`}
              >
                {DURUMLAR.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Öncelik</span>
              <select
                value={ticket.oncelik}
                onChange={(e) => alanGuncelle({ oncelik: e.target.value as TicketOncelik })}
                className={`text-xs font-semibold rounded-md px-2 py-1 bg-transparent border border-[#2a2a4a] focus:outline-none cursor-pointer ${oncelikRengi(ticket.oncelik)}`}
              >
                <option value="yuksek">Yüksek</option>
                <option value="dusuk">Düşük</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Atanan</span>
              <select
                value={ticket.atanan || ""}
                onChange={(e) => alanGuncelle({ atanan: e.target.value || undefined })}
                className="text-xs text-slate-300 rounded-md px-2 py-1 bg-[#16213e] border border-[#2a2a4a] focus:outline-none cursor-pointer"
              >
                <option value="">Atanmadı</option>
                {TEMSILCILER.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* PRD §3 — AI Analizi Paneli */}
          <AIReplyPanel ticket={ticket} onYanitUretildi={aiYanitUretildi} />
        </div>
      </div>
    </div>
  );
}
