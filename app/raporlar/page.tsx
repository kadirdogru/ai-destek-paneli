"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from "recharts";
import { TrendingUp, Clock, CheckCircle, Star, Users, Zap } from "lucide-react";

const AYLIK = [
  { ay: "Eyl", acilan: 45, cozulen: 40, sure: 5.2 },
  { ay: "Eki", acilan: 62, cozulen: 58, sure: 4.8 },
  { ay: "Kas", acilan: 51, cozulen: 55, sure: 4.5 },
  { ay: "Ara", acilan: 38, cozulen: 42, sure: 3.9 },
  { ay: "Oca", acilan: 70, cozulen: 63, sure: 4.3 },
  { ay: "Şub", acilan: 55, cozulen: 59, sure: 4.1 },
  { ay: "Mar", acilan: 48, cozulen: 44, sure: 3.8 },
];

const EKIP = [
  { ad: "Fatma Ç.", cozulen: 35, puan: 4.9, sure: 3.2 },
  { ad: "Ahmet Y.", cozulen: 28, puan: 4.7, sure: 3.8 },
  { ad: "Selin K.", cozulen: 22, puan: 4.6, sure: 4.1 },
  { ad: "Mehmet A.", cozulen: 19, puan: 4.5, sure: 4.5 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TP = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-slate-300 mb-1">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

export default function RaporlarPage() {
  const kpis = [
    { label: "Ort. Çözüm Süresi", value: "3.8s", icon: Clock, renk: "#6366f1", alt: "Hedef: <4s ✓" },
    { label: "Çözüm Oranı", value: "%87", icon: CheckCircle, renk: "#10b981", alt: "Hedef: %90" },
    { label: "Müşteri Puanı", value: "4.7/5", icon: Star, renk: "#f59e0b", alt: "248 değerlendirme" },
    { label: "Haftalık Büyüme", value: "+12%", icon: TrendingUp, renk: "#3b82f6", alt: "Ticket hacminde" },
    { label: "Aktif Temsilci", value: "4", icon: Users, renk: "#8b5cf6", alt: "Şu an çalışıyor" },
    { label: "AI Çözüm Katkısı", value: "%64", icon: Zap, renk: "#ec4899", alt: "AI destekli yanıt" },
  ];

  return (
    <div className="p-7 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Raporlar</h1>
        <p className="text-sm text-slate-500 mt-0.5">Son 6 aylık performans metrikleri ve ekip analizi</p>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-6 gap-4">
        {kpis.map(({ label, value, icon: Icon, renk, alt }) => (
          <div key={label} className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${renk}20` }}>
              <Icon size={16} style={{ color: renk }} />
            </div>
            <div className="text-2xl font-bold text-slate-100">{value}</div>
            <div className="text-xs font-semibold text-slate-400 mt-0.5">{label}</div>
            <div className="text-[10px] text-slate-600 mt-1">{alt}</div>
          </div>
        ))}
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-200 mb-1">Aylık Ticket Trendi</h3>
          <p className="text-xs text-slate-500 mb-4">Açılan ve çözülen talepler</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={AYLIK}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="ay" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TP />} />
              <Bar dataKey="acilan" name="Açılan" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cozulen" name="Çözülen" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-200 mb-1">Ortalama Çözüm Süresi</h3>
          <p className="text-xs text-slate-500 mb-4">Saat cinsinden aylık ortalama</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={AYLIK}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="ay" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[3, 6]} />
              <Tooltip content={<TP />} />
              <Line type="monotone" dataKey="sure" name="Süre (s)" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ekip Performansı */}
      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Ekip Performansı</h3>
        <div className="space-y-1">
          <div className="grid grid-cols-[1.5fr_80px_110px_80px_1fr] gap-4 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            <span>Temsilci</span><span>Çözülen</span><span>Müşteri Puanı</span><span>Ort. Süre</span><span>Performans</span>
          </div>
          {EKIP.map((a) => (
            <div key={a.ad} className="grid grid-cols-[1.5fr_80px_110px_80px_1fr] gap-4 px-3 py-3 rounded-lg hover:bg-indigo-500/5 transition-colors items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                  {a.ad.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-sm font-medium text-slate-300">{a.ad}</span>
              </div>
              <span className="text-sm text-slate-400 font-medium">{a.cozulen}</span>
              <span className="text-sm text-slate-400"><span className="text-amber-400">★</span> {a.puan}</span>
              <span className="text-sm text-slate-400">{a.sure}s</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#2a2a4a] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${(a.puan / 5) * 100}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 w-6">{Math.round((a.puan / 5) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
