import { Ticket, Clock, CheckCircle, AlertTriangle, TrendingUp, Zap } from "lucide-react";
import type { DashboardIstatistik } from "@/types";

interface StatsCardsProps {
  istatistik: DashboardIstatistik;
}

export default function StatsCards({ istatistik }: StatsCardsProps) {
  const kartlar = [
    {
      label: "Açık Ticketlar",
      value: istatistik.toplamAcik,
      icon: Ticket,
      renk: "#3b82f6",
      alt: `${istatistik.toplamBekliyor} bekliyor`,
    },
    {
      label: "Bu Hafta Çözülen",
      value: istatistik.buHaftaCozulen,
      icon: CheckCircle,
      renk: "#10b981",
      alt: `%${istatistik.cozumOrani} çözüm oranı`,
    },
    {
      label: "Kritik Bekleyen",
      value: istatistik.kritikSayisi,
      icon: AlertTriangle,
      renk: "#ef4444",
      alt: "Acil müdahale gerekli",
    },
    {
      label: "Ort. Yanıt Süresi",
      value: istatistik.ortalamaYanitSuresi,
      icon: Clock,
      renk: "#f59e0b",
      alt: "Son 7 gün ortalaması",
    },
    {
      label: "Çözüm Oranı",
      value: `%${istatistik.cozumOrani}`,
      icon: TrendingUp,
      renk: "#8b5cf6",
      alt: "Tüm zamanlar",
    },
    {
      label: "AI Analizli",
      value: istatistik.toplamAcik + istatistik.toplamBekliyor + istatistik.toplamCozuldu,
      icon: Zap,
      renk: "#6366f1",
      alt: "Duygu analizi yapılan",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-4">
      {kartlar.map(({ label, value, icon: Icon, renk, alt }) => (
        <div
          key={label}
          className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4 hover:-translate-y-0.5 transition-transform duration-200"
          style={{ "--accent": renk } as React.CSSProperties}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${renk}20` }}
            >
              <Icon size={17} style={{ color: renk }} />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 leading-none mb-1">
            {value}
          </div>
          <div className="text-xs font-semibold text-slate-400">{label}</div>
          <div className="text-[10px] text-slate-600 mt-1">{alt}</div>
        </div>
      ))}
    </div>
  );
}
