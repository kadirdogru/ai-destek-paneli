"use client";
import { useState } from "react";
import { Bot, Zap, Loader2, AlertTriangle, ThumbsUp, Activity } from "lucide-react";
import type { AIYanitDTO, Ticket } from "@/types";
import { duyguEtiketi, duyguRengi } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface Props {
  ticket: Ticket;
  onYanitUretildi: (yanit: AIYanitDTO, taslak: string) => void;
}

export default function AIReplyPanel({ ticket, onYanitUretildi }: Props) {
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sonuc, setSonuc] = useState<AIYanitDTO | null>(null);

  // PRD §3 — Otomatik yanıt + duygu analizi
  const aiYanitUret = async () => {
    setYukleniyor(true);
    const res = await fetch("/api/ai-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: ticket.id,
        ticketBaslik: ticket.baslik,
        ticketIcerik: ticket.icerik,
        kategori: ticket.kategori,
        mesajGecmisi: ticket.mesajlar.map((m) => ({
          gonderen: m.gonderen,
          icerik: m.icerik,
        })),
      }),
    });

    if (res.ok) {
      const data: AIYanitDTO = await res.json();
      setSonuc(data);
      onYanitUretildi(data, data.yanitMetni);
    }
    setYukleniyor(false);
  };

  return (
    <div className="rounded-xl border border-indigo-500/20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, rgba(99,102,241,0.07) 100%)" }}>
      {/* Başlık */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a4a]">
        <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center">
          <Bot size={13} className="text-indigo-400" />
        </div>
        <span className="text-sm font-semibold text-slate-200">AI Analizi</span>
        <span className="ml-auto text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
          PRD §3
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Mevcut duygu analizi */}
        {ticket.duyguAnalizi && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Duygu Analizi</span>
              <span className={`text-xs font-bold ${duyguRengi(ticket.duyguAnalizi.duygu)}`}>
                {duyguEtiketi(ticket.duyguAnalizi.duygu)}
              </span>
            </div>
            {/* Aciliyet çubuğu */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Aciliyet</span>
                <span>{ticket.duyguAnalizi.aciliyet}%</span>
              </div>
              <div className="h-1.5 bg-[#2a2a4a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${ticket.duyguAnalizi.aciliyet}%`,
                    background: ticket.duyguAnalizi.aciliyet > 70
                      ? "#ef4444"
                      : ticket.duyguAnalizi.aciliyet > 40
                      ? "#f59e0b"
                      : "#10b981",
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{ticket.duyguAnalizi.ozet}</p>
          </div>
        )}

        {/* AI taslak */}
        {ticket.aiTaslak && (
          <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/15">
            <p className="text-[10px] font-semibold text-indigo-400 mb-1.5 flex items-center gap-1">
              <Zap size={10} /> Önerilen Yanıt Taslağı
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">{ticket.aiTaslak}</p>
          </div>
        )}

        {/* Yeni analiz sonucu */}
        {sonuc && !ticket.aiTaslak && (
          <div className="space-y-2">
            <div className={`flex items-center gap-2 text-xs font-semibold ${duyguRengi(sonuc.duyguAnalizi.duygu)}`}>
              {sonuc.duyguAnalizi.duygu === "kritik" ? <AlertTriangle size={13} /> :
               sonuc.duyguAnalizi.duygu === "olumlu" ? <ThumbsUp size={13} /> : <Activity size={13} />}
              {duyguEtiketi(sonuc.duyguAnalizi.duygu)} — %{sonuc.duyguAnalizi.aciliyet} aciliyet
            </div>
            <p className="text-xs text-slate-400">{sonuc.duyguAnalizi.ozet}</p>
            <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/15">
              <p className="text-xs text-slate-400 leading-relaxed">{sonuc.yanitMetni}</p>
            </div>
          </div>
        )}

        {/* Analiz butonu */}
        <Button
          variant="ghost"
          size="sm"
          onClick={aiYanitUret}
          disabled={yukleniyor}
          className="w-full border border-indigo-500/25 text-indigo-400 hover:bg-indigo-500/10 justify-center"
        >
          {yukleniyor ? (
            <><Loader2 size={13} className="animate-spin" />AI Analiz Ediyor...</>
          ) : (
            <><Bot size={13} />Yeniden Analiz Et</>
          )}
        </Button>
      </div>
    </div>
  );
}
