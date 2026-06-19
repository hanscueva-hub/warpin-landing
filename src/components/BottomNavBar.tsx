import React from "react";
import { motion } from "framer-motion";
import { Map, List, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";

interface BottomNavBarProps {
  activeIndex: number;
  onChange: (index: number) => void;
  onFabClick?: () => void;
}

export function BottomNavBar({
  activeIndex,
  onChange,
  onFabClick,
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
    { id: 1, label: "Explorar", icon: List },
    { id: 2, label: "Crear", icon: null }, // FAB placeholder
    { id: 3, label: "Chats", icon: MessageSquare },
    { id: 4, label: "Perfil", icon: null }, // Profile placeholder
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-2 z-50 pointer-events-none">
      <div className="glass-panel mx-auto max-w-md h-16 rounded-2xl flex items-center justify-around px-2 relative pointer-events-auto shadow-2xl shadow-black/40">
        
        {/* Active background pill tracker */}
        <div className="absolute inset-0 flex justify-around px-2 items-center pointer-events-none">
          {navItems.map((item, idx) => {
            if (item.id === 2) return <div key="fab-space" className="w-12" />; // FAB gap
            const isSelected = activeIndex === item.id;
            return (
              <div key={item.id} className="w-12 h-12 relative flex items-center justify-center">
                {isSelected && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

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

          // 2. Profile Avatar Tab
          if (item.id === 4) {
            const isSelected = activeIndex === 4;
            return (
              <button
                key={item.id}
                onClick={() => onChange(4)}
                className="w-12 h-12 flex flex-col items-center justify-center relative select-none group"
              >
                {/* Empty circular avatar with outline */}
                <div
                  className={cn(
                    "w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center overflow-hidden",
                    isSelected
                      ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                      : "border-white/40 group-hover:border-white/80 bg-white/5"
                  )}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
                </div>
                
                {/* Active indicator dot */}
                {isSelected && (
                  <motion.span
                    layoutId="activeDot"
                    className="w-1 h-1 rounded-full bg-cyan-400 mt-1 absolute bottom-1.5"
                  />
                )}
              </button>
            );
          }

          // 3. Standard Tabs (Map, Explore, Chats)
          const Icon = item.icon!;
          const isSelected = activeIndex === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="w-12 h-12 flex flex-col items-center justify-center relative select-none group"
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isSelected
                    ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                    : "text-white/60 group-hover:text-white group-hover:scale-105"
                )}
              />
              
              {/* Active indicator dot */}
              {isSelected && (
                <motion.span
                  layoutId="activeDot"
                  className="w-1 h-1 rounded-full bg-cyan-400 mt-1 absolute bottom-1.5"
                />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
}
