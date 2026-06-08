/**
 * PRD §4 — Dashboard: Özet istatistikler ve canlı talep listesi (Server Component)
 */
import { istatistikleriGetir, tumTicketlariGetir } from "@/lib/data";
import StatsCards from "@/components/dashboard/StatsCards";
import TicketChart from "@/components/dashboard/TicketChart";
import RecentTickets from "@/components/dashboard/RecentTickets";
import AIInsights from "@/components/dashboard/AIInsights";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const istatistik = istatistikleriGetir();
  const tickets = tumTicketlariGetir();
  const sonTicketlar = tickets.slice(0, 6);
  const kritikler = tickets.filter(
    (t) => t.oncelik === "yuksek" && t.durum !== "cozuldu"
  );

  return (
    <div className="p-7 space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Genel destek durumu ve yapay zeka analizleri
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI Aktif
        </div>
      </div>

      {/* PRD §4 — Özet istatistikler */}
      <StatsCards istatistik={istatistik} />

      {/* Grafik + AI Paneli */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <TicketChart tickets={tickets} />
        </div>
        <AIInsights istatistik={istatistik} kritikler={kritikler} />
      </div>

      {/* PRD §4 — Canlı talep listesi */}
      <RecentTickets tickets={sonTicketlar} />
    </div>
  );
}
