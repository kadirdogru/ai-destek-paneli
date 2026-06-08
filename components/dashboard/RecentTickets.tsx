import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Ticket } from "@/types";
import { Badge } from "@/components/ui/Badge";
import {
  durumRengi,
  durumEtiketi,
  oncelikRengi,
  oncelikEtiketi,
  zamanFarki,
} from "@/lib/utils";

interface Props { tickets: Ticket[] }

export default function RecentTickets({ tickets }: Props) {
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl">
      {/* Başlık */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a4a]">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Son Talepler</h3>
          <p className="text-xs text-slate-500 mt-0.5">Canlı talep listesi</p>
        </div>
        <Link
          href="/tickets"
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Tümünü gör →
        </Link>
      </div>

      {/* Tablo başlığı */}
      <div className="grid grid-cols-[80px_1fr_100px_90px_100px_80px_32px] gap-3 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        <span>ID</span>
        <span>Başlık & Müşteri</span>
        <span>Kategori</span>
        <span>Öncelik</span>
        <span>Durum</span>
        <span>Süre</span>
        <span />
      </div>

      {/* Satırlar */}
      <div className="divide-y divide-[#2a2a4a]/50">
        {tickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/tickets/${ticket.id}`}
            className="grid grid-cols-[80px_1fr_100px_90px_100px_80px_32px] gap-3 px-5 py-3.5 items-center hover:bg-indigo-500/5 transition-colors group"
          >
            <span className="font-mono text-[11px] font-bold text-indigo-400">
              {ticket.id}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white transition-colors">
                {ticket.baslik}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{ticket.musteri.ad}</p>
            </div>
            <span className="text-xs text-slate-400">{ticket.kategori}</span>
            <span className={`text-xs font-semibold ${oncelikRengi(ticket.oncelik)}`}>
              {oncelikEtiketi(ticket.oncelik)}
            </span>
            <Badge className={durumRengi(ticket.durum)}>{durumEtiketi(ticket.durum)}</Badge>
            <span className="text-xs text-slate-500">{zamanFarki(ticket.createdAt)}</span>
            <ChevronRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
