"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
          {
            "bg-indigo-500 hover:bg-indigo-600 text-white": variant === "primary",
            "bg-[#2a2a4a] hover:bg-[#333360] text-slate-300 border border-[#2a2a4a]": variant === "secondary",
            "bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200": variant === "ghost",
            "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20": variant === "danger",
          },
          {
            "text-xs px-2.5 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-5 py-2.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
