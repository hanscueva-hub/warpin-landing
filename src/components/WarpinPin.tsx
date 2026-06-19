import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface WarpinPinProps {
  color: string;
  icon: LucideIcon;
  size?: number;
  onClick?: () => void;
  title?: string;
}

export function WarpinPin({
  color,
  icon: Icon,
  size = 28,
  onClick,
  title,
}: WarpinPinProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className="relative flex items-center justify-center cursor-pointer select-none"
      style={{ width: size * 2.5, height: size * 2.5 }}
      title={title}
    >
      {/* Contenedor físico estático */}
      <div 
        className="w-full h-full flex items-center justify-center relative"
      >
        {/* Halo Latiente: Corre 100% en la GPU del compositor de CSS (0% CPU) */}
        <div
          className="absolute rounded-full border pointer-events-none animate-pulse-ring"
          style={{
            width: size,
            height: size,
            borderColor: color,
            boxShadow: `0 0 16px ${color}`,
          }}
        />

        {/* Pin Central (Organic Shape) */}
        <div
          className="rounded-full bg-[#121212]/95 flex items-center justify-center border-2.5 transition-all duration-300 shadow-lg z-10 hover:scale-110 active:scale-95"
          style={{
            width: size,
            height: size,
            borderColor: color,
            boxShadow: `0 0 12px ${color}80`,
          }}
        >
          <Icon 
            className="stroke-[2.5]" 
            style={{ 
              color: color, 
              width: size * 0.48, 
              height: size * 0.48 
            }} 
          />
        </div>
      </div>
    </div>
  );
}
