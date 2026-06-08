"use client";
import { useState } from "react";
import { Bot, Zap, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Ticket, TicketOncelik } from "@/types";

interface Props {
  acik: boolean;
  onKapat: () => void;
  onOlustur: (ticket: Ticket) => void;
}

const KATEGORILER = ["Teknik", "Fatura", "Hesap", "Hukuki", "Genel"];

export default function CreateTicketModal({ acik, onKapat, onOlustur }: Props) {
  const [form, setForm] = useState({
    baslik: "",
    icerik: "",
    kategori: "Teknik",
    oncelik: "yuksek" as TicketOncelik,
    musteriAd: "",
    musteriEmail: "",
  });
  const [aiAnalizEdiliyor, setAiAnalizEdiliyor] = useState(false);
  const [aiSonuc, setAiSonuc] = useState<{ kategori: string; oncelik: TicketOncelik } | null>(null);
  const [gonderiyor, setGonderiyor] = useState(false);

  const set = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  // PRD §3 — Duygu analizi ile otomatik kategori/öncelik
  const aiIleKategorile = async () => {
    if (!form.baslik && !form.icerik) return;
    setAiAnalizEdiliyor(true);

    // API'ye sorgu at (henüz ticket yok, geçici ID ile)
    const res = await fetch("/api/ai-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: "temp",
        ticketBaslik: form.baslik,
        ticketIcerik: form.icerik,
        kategori: form.kategori,
        mesajGecmisi: [],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const onerilen = data.onerilen_oncelik as TicketOncelik;
      // Aciliyete göre kategori tahmini (istemci tarafı)
      const metin = (form.baslik + " " + form.icerik).toLowerCase();
      let kat = form.kategori;
      if (metin.includes("ssl") || metin.includes("api") || metin.includes("hata") || metin.includes("çalışmıyor")) kat = "Teknik";
      else if (metin.includes("fatura") || metin.includes("ödeme")) kat = "Fatura";
      else if (metin.includes("hesap") || metin.includes("şifre") || metin.includes("giriş")) kat = "Hesap";
      else if (metin.includes("kvkk") || metin.includes("gdpr") || metin.includes("hukuk")) kat = "Hukuki";

      setAiSonuc({ kategori: kat, oncelik: onerilen });
      setForm((p) => ({ ...p, kategori: kat, oncelik: onerilen }));
    }
    setAiAnalizEdiliyor(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGonderiyor(true);

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baslik: form.baslik,
        icerik: form.icerik,
        oncelik: form.oncelik,
        kategori: form.kategori,
        musteri: { ad: form.musteriAd, email: form.musteriEmail },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      onOlustur(data.ticket);
      // Formu sıfırla
      setForm({ baslik: "", icerik: "", kategori: "Teknik", oncelik: "yuksek", musteriAd: "", musteriEmail: "" });
      setAiSonuc(null);
    }
    setGonderiyor(false);
  };

  const inputCls = "w-full bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors";

  return (
    <Modal acik={acik} onKapat={onKapat} baslik="Yeni Ticket Oluştur" genislik="md">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Müşteri */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Müşteri Adı *</label>
            <input
              required
              value={form.musteriAd}
              onChange={(e) => set("musteriAd", e.target.value)}
              placeholder="Ad Soyad / Şirket"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">E-posta *</label>
            <input
              required
              type="email"
              value={form.musteriEmail}
              onChange={(e) => set("musteriEmail", e.target.value)}
              placeholder="ornek@email.com"
              className={inputCls}
            />
          </div>
        </div>

        {/* Başlık */}
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Başlık *</label>
          <input
            required
            value={form.baslik}
            onChange={(e) => set("baslik", e.target.value)}
            placeholder="Sorunun kısa açıklaması"
            className={inputCls}
          />
        </div>

        {/* İçerik */}
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1.5 block">İçerik</label>
          <textarea
            value={form.icerik}
            onChange={(e) => set("icerik", e.target.value)}
            placeholder="Detaylı açıklama..."
            rows={4}
            className={inputCls + " resize-none"}
          />
        </div>

        {/* PRD §3 — AI ile otomatik kategorileme */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={aiIleKategorile}
            disabled={aiAnalizEdiliyor || (!form.baslik && !form.icerik)}
            className="text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20"
          >
            {aiAnalizEdiliyor ? (
              <><Loader2 size={13} className="animate-spin" />Analiz ediliyor...</>
            ) : (
              <><Bot size={13} />AI ile Kategorile</>
            )}
          </Button>
          {aiSonuc && (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Zap size={12} />
              AI önerisi: <strong>{aiSonuc.kategori}</strong> /{" "}
              <strong>{aiSonuc.oncelik === "yuksek" ? "Yüksek" : "Düşük"}</strong>
            </div>
          )}
        </div>

        {/* Kategori & Öncelik */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Kategori</label>
            <select
              value={form.kategori}
              onChange={(e) => set("kategori", e.target.value)}
              className={inputCls}
            >
              {KATEGORILER.map((k) => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Öncelik</label>
            <select
              value={form.oncelik}
              onChange={(e) => set("oncelik", e.target.value as TicketOncelik)}
              className={inputCls}
            >
              <option value="yuksek">Yüksek</option>
              <option value="dusuk">Düşük</option>
            </select>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onKapat}>
            İptal
          </Button>
          <Button type="submit" disabled={gonderiyor}>
            {gonderiyor ? <><Loader2 size={14} className="animate-spin" />Oluşturuluyor...</> : "Ticket Oluştur"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
