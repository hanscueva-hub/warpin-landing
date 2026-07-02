import React from "react";
import { motion } from "framer-motion";
import { Map, LayoutGrid, Plus, MessageSquare, User } from "lucide-react";
import { cn } from "@/utils/cn";

interface BottomNavBarProps {
  activeIndex: number;
  onChange: (index: number) => void;
  onFabClick?: () => void;
  isDarkMode?: boolean;
}

export function BottomNavBar({
  activeIndex,
  onChange,
  onFabClick,
  isDarkMode = true,
}: BottomNavBarProps) {
  // Navigation tabs config (excluding FAB which is handled separately)
  // Index mapping:
  // 0: Map
  // 1: Explore (List)
  // 2: FAB (+)
  // 3: Chats
  // 4: Profile
  
  const navItems = [
    { id: 0, label: "Mapa", icon: Map },
    { id: 1, label: "Explorar", icon: LayoutGrid },
    { id: 2, label: "Crear", icon: null }, // FAB placeholder
    { id: 3, label: "Chats", icon: MessageSquare },
    { id: 4, label: "Perfil", icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-2 z-50 pointer-events-none">
      <div className={cn(
        "mx-auto max-w-md h-16 rounded-2xl flex items-center justify-around px-2 relative pointer-events-auto shadow-2xl transition-all duration-300 border",
        isDarkMode 
          ? "bg-[#141416]/90 border-white/10 shadow-black/60 backdrop-blur-md" 
          : "bg-white/95 border-slate-200/80 shadow-slate-350/40 backdrop-blur-md"
      )}>
        
        {/* Tab Buttons */}
        {navItems.map((item) => {
          // 1. Central FAB (+)
          if (item.id === 2) {
            return (
              <div key="fab" className="relative w-14 h-14 -mt-7 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onFabClick}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-white/20 relative group overflow-hidden"
                  aria-label="Publicar nuevo PIN"
                >
                  {/* Subtle inner rotating border border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <Plus className="w-8 h-8 text-white stroke-[2.5]" />
                  
                  {/* Glow pulse animation */}
                  <span className="absolute inset-0 rounded-full bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.button>
              </div>
            );
          }

          const Icon = item.icon!;
          const isSelected = activeIndex === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex-1 flex flex-col items-center justify-center select-none group cursor-pointer relative"
            >
              {/* Icon Container with Circle Indicator */}
              <div className="w-10 h-10 relative flex items-center justify-center">
                {isSelected && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className={cn(
                      "absolute inset-0 rounded-full border transition-colors duration-300",
                      isDarkMode 
                        ? "bg-cyan-500/10 border-cyan-400/20 shadow-[0_0_8px_rgba(34,211,238,0.15)]" 
                        : "bg-cyan-500/10 border-cyan-400/35 shadow-[0_0_6px_rgba(34,211,238,0.1)]"
                    )}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center justify-center">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isSelected
                        ? "text-cyan-500 scale-105"
                        : (isDarkMode ? "text-white/60 group-hover:text-white" : "text-slate-400 group-hover:text-slate-700")
                    )}
                  />
                  {item.id === 3 && (
                    <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      {isDarkMode ? 4 : 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Label */}
              <span className={cn(
                "text-[9px] font-bold tracking-wide mt-0.5 transition-colors duration-300",
                isSelected
                  ? "text-cyan-500 font-extrabold"
                  : (isDarkMode ? "text-white/40 group-hover:text-white/70" : "text-slate-400 group-hover:text-slate-650")
              )}>
                {item.label}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}
