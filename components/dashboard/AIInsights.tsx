import { Bot, AlertTriangle, TrendingUp, Users, Zap } from "lucide-react";
import type { DashboardIstatistik, Ticket } from "@/types";

interface Props {
  istatistik: DashboardIstatistik;
  kritikler: Ticket[];
}

export default function AIInsights({ istatistik, kritikler }: Props) {
  return (
    <div className="bg-[#1a1a2e] border border-indigo-500/20 rounded-xl p-5"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, rgba(99,102,241,0.06) 100%)" }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <Bot size={14} className="text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-200">AI Özet</h3>
          <p className="text-[10px] text-slate-500">Claude analizi</p>
        </div>
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="space-y-2">
        {kritikler.length > 0 && (
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-500/8 border border-red-500/15">
            <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-300 leading-relaxed">
              <strong>{kritikler.length} kritik ticket</strong> acil müdahale bekliyor.
            </p>
          </div>
        )}
        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-blue-500/8 border border-blue-500/15">
          <TrendingUp size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300 leading-relaxed">
            Çözüm oranı <strong>%{istatistik.cozumOrani}</strong> — bu hafta{" "}
            <strong>{istatistik.buHaftaCozulen}</strong> ticket kapatıldı.
          </p>
        </div>
        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-500/8 border border-amber-500/15">
          <Users size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 leading-relaxed">
            <strong>{istatistik.toplamAcik}</strong> açık ticket atanmayı bekliyor.
          </p>
        </div>
        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
          <Zap size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-300 leading-relaxed">
            Ort. yanıt süresi: <strong>{istatistik.ortalamaYanitSuresi}</strong>
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#2a2a4a]">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <Bot size={10} className="inline mr-1 text-indigo-400" />
          Teknik kategoride bu hafta <strong className="text-indigo-400">%40 artış</strong>{" "}
          var. Ekip kapasitesini gözden geçirin.
        </p>
      </div>
    </div>
  );
}
