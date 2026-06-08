"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  acik: boolean;
  onKapat: () => void;
  baslik: string;
  children: React.ReactNode;
  genislik?: "sm" | "md" | "lg";
}

export function Modal({ acik, onKapat, baslik, children, genislik = "md" }: ModalProps) {
  useEffect(() => {
    if (acik) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [acik]);

  if (!acik) return null;

  const genislikSinifi = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
  }[genislik];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onKapat()}
    >
      <div
        className={`w-full ${genislikSinifi} bg-[#1a1a2e] border border-[#2a2a4a] rounded-2xl shadow-2xl max-h-[90vh] flex flex-col`}
      >
        {/* Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-slate-100">{baslik}</h2>
          <button
            onClick={onKapat}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* İçerik */}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
