"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Ticket } from "@/types";

const HAFTALIK = [
  { gun: "Pzt", acilan: 12, cozulen: 8 },
  { gun: "Sal", acilan: 19, cozulen: 15 },
  { gun: "Çar", acilan: 8, cozulen: 12 },
  { gun: "Per", acilan: 25, cozulen: 18 },
  { gun: "Cum", acilan: 17, cozulen: 22 },
  { gun: "Cmt", acilan: 5, cozulen: 9 },
  { gun: "Paz", acilan: 3, cozulen: 5 },
];

interface Props { tickets: Ticket[] }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-slate-300 mb-1">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function TicketChart({ tickets }: Props) {
  // Kategori dağılımı
  const kategoriler: Record<string, number> = {};
  tickets.forEach((t) => {
    kategoriler[t.kategori] = (kategoriler[t.kategori] || 0) + 1;
  });

  return (
    <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Haftalık Ticket Trafiği</h3>
          <p className="text-xs text-slate-500 mt-0.5">Açılan ve çözülen talepler</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />Açılan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />Çözülen
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={HAFTALIK}>
          <defs>
            <linearGradient id="gradAcilan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradCozulen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
          <XAxis dataKey="gun" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="acilan" name="Açılan" stroke="#6366f1" strokeWidth={2} fill="url(#gradAcilan)" />
          <Area type="monotone" dataKey="cozulen" name="Çözülen" stroke="#10b981" strokeWidth={2} fill="url(#gradCozulen)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
