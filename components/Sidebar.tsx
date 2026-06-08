"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  BarChart2,
  Settings,
  Zap,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/tickets", icon: Ticket, label: "Ticketlar" },
  { href: "/raporlar", icon: BarChart2, label: "Raporlar" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col h-screen bg-[#1a1a2e] border-r border-[#2a2a4a]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#2a2a4a]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Zap size={18} fill="currentColor" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-100 leading-none">DesPanel</div>
          <div className="text-[10px] text-indigo-400 font-medium mt-0.5">AI Powered</div>
        </div>
      </div>

      {/* Navigasyon */}
      <nav className="flex-1 p-2 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label }) => {
          const aktif = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                aktif
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* AI Durum */}
      <div className="p-3 mx-2 mb-2 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
        <div className="flex items-center gap-2 text-xs text-indigo-300 font-medium mb-1">
          <Bot size={13} />
          AI Asistan
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Claude API ile duygu analizi ve otomatik yanıt aktif.
        </p>
      </div>

      {/* Alt kısım — Profil */}
      <div className="p-2 border-t border-[#2a2a4a]">
        <Link
          href="/ayarlar"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
        >
          <Settings size={16} />
          Ayarlar
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg bg-white/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            AY
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-200 truncate">Ahmet Yılmaz</div>
            <div className="text-[10px] text-slate-500">Destek Uzmanı</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
