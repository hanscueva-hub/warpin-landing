import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, Battery, Signal, Search, 
  User, Plus, X, Heart, Share2, Award, Zap, BookOpen, HelpCircle, 
  GraduationCap, Send, Sparkles,
  Beer, Car, PartyPopper, Siren, KeyRound, Sun, Moon, ChevronDown,
  Shapes, ListFilter, LayoutGrid
} from "lucide-react";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MapScreen } from "@/screens/MapScreen";
import { cn } from "@/utils/cn";

function getCategoryIcon(category: string) {
  switch (category) {
    case "social": return Beer;
    case "ayuda": return Siren;
    case "transporte": return Car;
    case "random": return Sparkles;
    default: return HelpCircle;
  }
}

interface Pin {
  id: string;
  category: "social" | "ayuda" | "transporte" | "random";
  title: string;
  description: string;
  time: string;
  distance: string;
  author: string;
  color: string;
  x: number; // percentage
  y: number; // percentage
  vibes: number;
  x2: number;
  isLocationProtected?: boolean;
  imageUrl?: string;
}

export function MockupScreen() {
  const [activeTab, setActiveTab] = useState(0);
  
  // Floating reactions state
  const [particles, setParticles] = useState<Array<{ id: string; emoji: string; x: number; y: number }>>([]);

  const triggerReaction = (e: React.MouseEvent, emoji: string) => {
    const canvas = e.currentTarget.closest(".flex-col"); // Find the simulator canvas wrapper
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticle = {
      id: `p-${Date.now()}-${Math.random()}`,
      emoji,
      x: x - 10,
      y: y - 20,
    };
    
    setParticles((prev) => [...prev, newParticle]);
    
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("todos");
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Theme switcher state
  const [isSimulatorDark, setIsSimulatorDark] = useState(true);
  
  // Search & Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recientes" | "distancia" | "relevancia">("recientes");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  
  // Menu toggle states
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  // Custom mock time
  const [timeStr, setTimeStr] = useState("22:38");

  // Pins Data representing campus / local area
  const [pins, setPins] = useState<Pin[]>([
    {
      id: "pin1",
      category: "ayuda",
      title: "¿Alguien tiene cargador tipo C?",
      description: "Estoy en la biblioteca central, lo devuelvo en 1 hora porfa.",
      time: "45m restantes",
      distance: "A menos de 100m",
      author: "Valeria M.",
      color: "#EF4444", // Rojo
      x: 51,
      y: 33,
      vibes: 4,
      x2: 0,
      isLocationProtected: true,
    },
    {
      id: "pin2",
      category: "social",
      title: "¿Alguien para almorzar por la U?",
      description: "Estoy libre hasta las 2, avisen si bajan a la cafetería.",
      time: "58m restantes",
      distance: "A 879m",
      author: "Diego R.",
      color: "#FF5722", // Naranja
      x: 42,
      y: 45,
      vibes: 2,
      x2: 0,
      isLocationProtected: true,
      imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=150&auto=format&fit=crop&q=60",
    },
    {
      id: "pin3",
      category: "transporte",
      title: "Taxi a Cayma, comparto gastos",
      description: "Salgo en 10 minutos, somos 2 personas por ahora.",
      time: "25m restantes",
      distance: "A 860m",
      author: "Camila P.",
      color: "#00E5FF", // Celeste
      x: 40,
      y: 52,
      vibes: 0,
      x2: 0,
      isLocationProtected: false,
    },
    {
      id: "pin4",
      category: "random",
      title: "Recomendaciones de música indie",
      description: "Dejen canciones random para aguantar la amanecida de estudio.",
      time: "56m restantes",
      distance: "A 860m",
      author: "Sebastián T.",
      color: "#A855F7", // Púrpura
      x: 44,
      y: 56,
      vibes: 12,
      x2: 0,
      isLocationProtected: true,
    }
  ]);

  const categories = [
    { id: "todos", label: "Todos", color: "#FFFFFF" },
    { id: "social", label: "Social", color: "#FF5722" },
    { id: "ayuda", label: "Ayuda", color: "#EF4444" },
    { id: "transporte", label: "Transporte", color: "#00E5FF" },
    { id: "random", label: "Random", color: "#A855F7" },
  ];

  // Calcular pines cercanos/solapados (dentro del 5% de distancia en el mapa)
  const selectedPinsList = useMemo(() => {
    if (!selectedPin) return [];
    return pins.filter(p => 
      // Filtrar por la categoría activa si el filtro de arriba está activo
      (filterCategory === "todos" || p.category === filterCategory) &&
      Math.sqrt(Math.pow(p.x - selectedPin.x, 2) + Math.pow(p.y - selectedPin.y, 2)) < 5
    );
  }, [selectedPin, pins, filterCategory]);

  // Sincronizar el índice del carrusel cuando cambie el pin seleccionado
  useEffect(() => {
    if (selectedPin) {
      const idx = selectedPinsList.findIndex(p => p.id === selectedPin.id);
      setCarouselIndex(idx !== -1 ? idx : 0);
    } else {
      setCarouselIndex(0);
    }
  }, [selectedPin, selectedPinsList]);

  const activePin = selectedPinsList[carouselIndex] || selectedPin;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Prevent browser window from scrolling on mobile when inputs are focused in the simulator
  useEffect(() => {
    // Only lock scroll on mobile viewports
    const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    if (!isMobile) return;

    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyWidth = document.body.style.width;
    const originalBodyHeight = document.body.style.height;

    // Lock page scroll for the simulator view
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
      document.body.style.height = originalBodyHeight;
    };
  }, []);

  // Handle new PIN submission
  const handleCreatePin = (data: { title: string; description: string; category: Pin["category"]; isLocationProtected: boolean }) => {
    let baseX = 45 + Math.random() * 10;
    let baseY = 40 + Math.random() * 10;
    
    if (data.isLocationProtected) {
      // Apply location protection displacement (offset of 3-7%)
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 3.5;
      baseX += Math.cos(angle) * radius;
      baseY += Math.sin(angle) * radius;
    }

    const newPin: Pin = {
      id: `pin-${Date.now()}`,
      category: data.category,
      title: data.title,
      description: data.description,
      time: "Ahora",
      distance: data.isLocationProtected ? "~0.1 km" : "0.0 km",
      author: "Tú · Fundador Élite",
      color: categories.find(c => c.id === data.category)?.color || "#FFFFFF",
      x: Math.max(10, Math.min(90, baseX)),
      y: Math.max(10, Math.min(90, baseY)),
      vibes: 0,
      x2: 0,
      isLocationProtected: data.isLocationProtected,
    };
    setPins([newPin, ...pins]);
    setSelectedPin(newPin);
    setIsCreateOpen(false);
  };

  // Category-only filtered pins for the map (no search/sort needed)
  const mapPins = useMemo(() => {
    return filterCategory === "todos" ? pins : pins.filter(p => p.category === filterCategory);
  }, [pins, filterCategory]);

  const processedPins = useMemo(() => {
    let result = [...pins];

    // 1. Category Filter
    if (filterCategory !== "todos") {
      result = result.filter(p => p.category === filterCategory);
    }

    // 2. Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortBy === "recientes") {
        const getMinutes = (timeStr: string) => {
          if (timeStr === "Ahora") return 0;
          const match = timeStr.match(/Hace (\d+) min/);
          if (match) return parseInt(match[1]);
          return 999;
        };
        valA = getMinutes(a.time);
        valB = getMinutes(b.time);
        return sortDir === "desc" ? valA - valB : valB - valA;
      } else if (sortBy === "distancia") {
        const getDistance = (distStr: string) => {
          const match = distStr.match(/([\d.]+)/);
          if (match) return parseFloat(match[1]);
          return 999;
        };
        valA = getDistance(a.distance);
        valB = getDistance(b.distance);
        return sortDir === "desc" ? valB - valA : valA - valB;
      } else if (sortBy === "relevancia") {
        valA = a.vibes;
        valB = b.vibes;
        return sortDir === "desc" ? valB - valA : valA - valB;
      }

      return 0;
    });

    return result;
  }, [pins, filterCategory, searchQuery, sortBy, sortDir]);

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex flex-col items-center justify-center p-0 md:p-4 relative overflow-hidden font-sans">
      {/* Animations moved to styles.css */}
      
      {/* Decorative neon ambient blobs in workspace background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Screen Wrapper */}
      <div className="w-full h-full md:h-auto max-w-4xl grid md:grid-cols-12 gap-0 md:gap-8 items-center relative z-10">
        
        {/* Left Side: Product Context / Description (Gen Z Style) */}
        <div className="hidden md:flex md:col-span-6 text-left flex-col justify-center space-y-5 px-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-400 backdrop-blur-md w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            MVP Cimientos Activos · React + Tailwind v4
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            Descubre tu campus en <span className="bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-400 bg-clip-text text-transparent">tiempo real</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Interactúa con el simulador móvil de la derecha. Hemos cargado el sistema de diseño premium, la paleta de categorías neón y la barra interactiva esmerilada para jóvenes de la Generación Z.
          </p>

          {/* Color Guide / Legend */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Paleta de Categorías Neón</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.slice(1).map(c => (
                <div key={c.id} className="flex items-center gap-2 text-white/80">
                  <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: c.color, color: c.color }} />
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Phone Mockup Frame */}
        <div className="w-full h-full md:col-span-6 flex justify-center">
          <div className={cn(
            "relative w-full h-[100dvh] md:w-[345px] md:h-[720px] md:rounded-[48px] md:border-[6px] md:border-neutral-800 transition-colors duration-300 overflow-hidden md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col select-none md:ring-1",
            isSimulatorDark ? "bg-[#0C0C0E] md:border-neutral-900 md:ring-white/10" : "bg-[#F8FAFC] md:border-slate-300 md:ring-black/5"
          )}>
            
            {/* Phone Notch/Island */}
            <div className="absolute top-0 inset-x-0 h-6 bg-black z-40 hidden md:flex items-center justify-between px-6 text-[10px] text-white/80 font-medium">
              <span>{timeStr}</span>
              {/* Camera Island */}
              <div className="w-20 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1" />
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3 text-white/80" />
                <Wifi className="w-3 h-3 text-white/80" />
                <Battery className="w-3.5 h-3.5 text-white/80" />
              </div>
            </div>

            {/* Mobile App Canvas Background */}
            <div className={cn(
              "flex-1 relative mt-0 md:mt-6 flex flex-col overflow-hidden transition-all duration-500",
              !isCreateOpen ? "pb-16" : "pb-0",
              isSimulatorDark 
                ? "bg-[#0C0C0E]" 
                : "bg-gradient-to-tr from-[#FFDEE9]/40 via-[#F3F4F6] to-[#B5FFFC]/40"
            )}>
              {/* Particle Reactions Layer */}
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute pointer-events-none text-xl z-50 animate-float-particle select-none"
                  style={{ left: p.x, top: p.y }}
                >
                  {p.emoji}
                </span>
              ))}
              
              {/* Dynamic App Background Mesh Shapes */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Mesh Gradient Blobs */}
                <div className={cn(
                  "absolute top-10 -left-12 w-48 h-48 rounded-full blur-[64px] transition-all duration-500 animate-aurora-drift",
                  isSimulatorDark ? "bg-purple-600/15" : "bg-pink-300/35"
                )} />
                <div className={cn(
                  "absolute bottom-24 -right-12 w-48 h-48 rounded-full blur-[64px] transition-all duration-500 animate-aurora-drift-reverse",
                  isSimulatorDark ? "bg-cyan-500/15" : "bg-cyan-300/40"
                )} />
                {/* Subtle Grid Overlay */}
                <div className={cn(
                  "absolute inset-0 opacity-[0.4] transition-all duration-500",
                  isSimulatorDark 
                    ? "bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" 
                    : "bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)]"
                )} style={{ backgroundSize: "24px 24px" }} />
              </div>

              {/* Tab Views */}
              <div className="flex-1 relative overflow-hidden z-10">
                {activeTab === 0 && (
                  /* TAB 0: INTERACTIVE MAP */
                  <div className="absolute inset-0 bg-transparent overflow-hidden">
                    <MapScreen
                      pins={mapPins.map((p) => ({
                        ...p,
                        icon: getCategoryIcon(p.category),
                      }))}
                      onPinSelect={(pin) => setSelectedPin(pin)}
                      selectedPinId={isCreateOpen ? null : (activePin?.id || null)}
                      isDarkMode={isSimulatorDark}
                    />

                    {!isCreateOpen && (
                      <>
                        {/* Top Bar Overlay: WARPIN Radar */}
                        <div className="absolute top-4 left-4 right-4 h-14 bg-black/85 border border-white/10 backdrop-blur-md rounded-2xl flex items-center px-4 gap-3 z-30 shadow-lg pointer-events-auto">
                          {/* Gradient W Icon */}
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-600 to-rose-500 flex items-center justify-center font-bold text-white text-base shadow-md select-none shrink-0">
                            W
                          </div>
                          {/* Text Info */}
                          <div className="flex flex-col text-left">
                            <span className="text-white font-extrabold text-[13px] tracking-wide leading-none">WARPIN</span>
                            <span className="text-white/50 text-[10px] font-medium mt-1.5 leading-none">Radar: UCSM Arequipa</span>
                          </div>
                        </div>

                        {/* Right-floating vertical capsule controls */}
                        <div className="absolute top-20 right-4 bg-black/85 border border-white/10 backdrop-blur-md rounded-2xl p-1.5 flex flex-col gap-1.5 z-30 shadow-lg pointer-events-auto">
                          {/* Grid button with cyan glow border */}
                          <button className="w-9 h-9 rounded-xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.3)] hover:bg-cyan-400/30 transition-all cursor-pointer">
                            <LayoutGrid className="w-4.5 h-4.5 stroke-[2.2]" />
                          </button>
                          {/* Down chevron button */}
                          <button className="w-9 h-9 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer">
                            <ChevronDown className="w-4.5 h-4.5 stroke-[2.2]" />
                          </button>
                        </div>

                        {/* Bottom-right controls: Theme toggle & Scale */}
                        <div className="absolute bottom-20 right-4 flex flex-col gap-2.5 z-30 pointer-events-auto">
                          {/* Theme toggle */}
                          <button 
                            onClick={() => setIsSimulatorDark(!isSimulatorDark)}
                            className="w-12 h-9 rounded-full bg-black/85 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/95 transition-all cursor-pointer shadow-md self-end"
                          >
                            {isSimulatorDark ? (
                              <Moon className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <Sun className="w-4 h-4 text-yellow-400" />
                            )}
                          </button>
                          
                          {/* Scale selector */}
                          <button className="h-9 px-3 rounded-full bg-black/85 border border-white/10 backdrop-blur-md flex items-center justify-center gap-1.5 text-white hover:bg-black/95 transition-all cursor-pointer shadow-md">
                            <span className="text-[11px] font-semibold">1km</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 stroke-[2.2]" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 1 && (() => {
                  const currentCategory = categories.find(c => c.id === filterCategory);
                  const currentSortLabel = 
                    sortBy === "recientes" ? "Recientes" : 
                    sortBy === "distancia" ? "Distancia" : "Relevancia";

                  return (
                    <div className="absolute inset-0 flex flex-col h-full z-10 select-none">
                      {/* Sticky Header Section */}
                      <div className={cn(
                        "px-4 pt-4 pb-3 border-b transition-all duration-500 z-30 backdrop-blur-md bg-opacity-85",
                        isSimulatorDark 
                          ? "bg-[#0C0C0E]/80 border-white/5" 
                          : "bg-white/30 border-slate-200/40"
                      )}>
                        
                        {/* Search Input */}
                        <div className="relative mb-3">
                          <Search className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                            isSimulatorDark ? "text-white/35" : "text-slate-400"
                          )} />
                          <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar planes, dudas o ayuda..." 
                            className={cn(
                              "w-full pl-11 pr-8 py-2.5 rounded-full text-[12px] outline-none transition-all border font-medium",
                              isSimulatorDark 
                                ? "bg-white/[0.04] border-white/5 text-white placeholder-white/30 focus:bg-white/[0.08] focus:border-white/10" 
                                : "bg-white/80 border-slate-200/50 text-slate-900 placeholder-slate-500 shadow-sm focus:bg-white focus:border-slate-350"
                            )}
                          />
                          {searchQuery && (
                            <button 
                              onClick={() => setSearchQuery("")}
                              className={cn(
                                "absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full",
                                isSimulatorDark ? "text-white/40 hover:text-white" : "text-slate-450 hover:text-slate-655"
                              )}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Floating Filters Pills Row */}
                        <div className="flex gap-3 relative">
                          {/* Button 1: Category Filter Selector */}
                          <button
                            onClick={() => {
                              setIsCategoryMenuOpen(!isCategoryMenuOpen);
                              setIsSortMenuOpen(false);
                            }}
                            className={cn(
                              "flex-1 px-4 py-2.5 rounded-2xl text-[11px] font-semibold transition-all border flex items-center justify-between cursor-pointer",
                              isSimulatorDark
                                ? "bg-white/[0.03] text-white/90 border-white/5 hover:bg-white/[0.06]"
                                : "bg-white/85 backdrop-blur-sm text-slate-800 border-slate-200/50 hover:bg-white/95"
                            )}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <Shapes className="w-4 h-4 opacity-70" />
                              <span>{currentCategory?.label || "Todos"}</span>
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0 ml-1" />
                          </button>

                          {/* Button 2: Sort Order Selector */}
                          <button
                            onClick={() => {
                              setIsSortMenuOpen(!isSortMenuOpen);
                              setIsCategoryMenuOpen(false);
                            }}
                            className={cn(
                              "flex-1 px-4 py-2.5 rounded-2xl text-[11px] font-semibold transition-all border flex items-center justify-between cursor-pointer",
                              isSimulatorDark
                                ? "bg-white/[0.03] text-white/90 border-white/5 hover:bg-white/[0.06]"
                                : "bg-white/85 backdrop-blur-sm text-slate-800 border-slate-200/50 hover:bg-white/95"
                            )}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <ListFilter className="w-4 h-4 opacity-70" />
                              <span>{currentSortLabel} {sortDir === "desc" ? "↑" : "↓"}</span>
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0 ml-1" />
                          </button>

                          {/* Dropdowns absolute positioning */}
                          <AnimatePresence>
                            {isCategoryMenuOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.15 }}
                                className={cn(
                                  "absolute top-full left-0 w-44 mt-1.5 rounded-2xl border shadow-xl p-1.5 z-40 space-y-0.5 pointer-events-auto",
                                  isSimulatorDark
                                    ? "bg-[#141416]/95 border-white/10 text-white backdrop-blur-md"
                                    : "bg-white/95 border-slate-200 text-slate-800 backdrop-blur-md shadow-slate-300/40"
                                )}
                              >
                                {categories.map((c) => (
                                  <button
                                    key={c.id}
                                    onClick={() => {
                                      setFilterCategory(c.id);
                                      setIsCategoryMenuOpen(false);
                                    }}
                                    className={cn(
                                      "w-full text-left px-2.5 py-1.5 rounded-xl text-[10px] font-semibold flex items-center justify-between transition-colors cursor-pointer",
                                      filterCategory === c.id
                                        ? (isSimulatorDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900")
                                        : (isSimulatorDark ? "hover:bg-white/5 text-white/70" : "hover:bg-slate-50 text-slate-655")
                                    )}
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <span 
                                        className="w-1.5 h-1.5 rounded-full shrink-0" 
                                        style={{ backgroundColor: c.id === "todos" ? (isSimulatorDark ? "#ffffff" : "#334155") : c.color }}
                                      />
                                      {c.label}
                                    </span>
                                    {filterCategory === c.id && <span className="text-[9px] text-cyan-400 font-bold">✓</span>}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <AnimatePresence>
                            {isSortMenuOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.15 }}
                                className={cn(
                                  "absolute top-full right-0 w-44 mt-1.5 rounded-2xl border shadow-xl p-1.5 z-40 space-y-0.5 pointer-events-auto",
                                  isSimulatorDark
                                    ? "bg-[#141416]/95 border-white/10 text-white backdrop-blur-md"
                                    : "bg-white/95 border-slate-200 text-slate-800 backdrop-blur-md shadow-slate-300/40"
                                )}
                              >
                                {([
                                  { id: "recientes", label: "Recientes" },
                                  { id: "distancia", label: "Distancia" },
                                  { id: "relevancia", label: "Relevancia (Vibras)" }
                                ] as const).map((opt) => (
                                  <button
                                    key={opt.id}
                                    onClick={() => {
                                      setSortBy(opt.id);
                                    }}
                                    className={cn(
                                      "w-full text-left px-2.5 py-1.5 rounded-xl text-[10px] font-semibold flex items-center justify-between transition-colors cursor-pointer",
                                      sortBy === opt.id
                                        ? (isSimulatorDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900")
                                        : (isSimulatorDark ? "hover:bg-white/5 text-white/70" : "hover:bg-slate-50 text-slate-655")
                                    )}
                                  >
                                    <span>{opt.label}</span>
                                    {sortBy === opt.id && <span className="text-[9px] text-cyan-400 font-bold">✓</span>}
                                  </button>
                                ))}
                                
                                <div className={cn("h-px my-1", isSimulatorDark ? "bg-white/5" : "bg-slate-200")} />
                                
                                <button
                                  onClick={() => setSortDir("asc")}
                                  className={cn(
                                    "w-full text-left px-2.5 py-1.5 rounded-xl text-[10px] font-semibold flex items-center justify-between transition-colors cursor-pointer",
                                    sortDir === "asc"
                                      ? (isSimulatorDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900")
                                      : (isSimulatorDark ? "hover:bg-white/5 text-white/70" : "hover:bg-slate-50 text-slate-655")
                                  )}
                                >
                                  <span>Ascendente</span>
                                  {sortDir === "asc" && <span className="text-[9px] text-cyan-400 font-bold">✓</span>}
                                </button>
                                
                                <button
                                  onClick={() => setSortDir("desc")}
                                  className={cn(
                                    "w-full text-left px-2.5 py-1.5 rounded-xl text-[10px] font-semibold flex items-center justify-between transition-colors cursor-pointer",
                                    sortDir === "desc"
                                      ? (isSimulatorDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900")
                                      : (isSimulatorDark ? "hover:bg-white/5 text-white/70" : "hover:bg-slate-50 text-slate-655")
                                  )}
                                >
                                  <span>Descendente</span>
                                  {sortDir === "desc" && <span className="text-[9px] text-cyan-400 font-bold">✓</span>}
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Feed List (Scrollable) */}
                      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-3.5 z-10 no-scrollbar pointer-events-auto">
                        {processedPins.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center relative",
                              isSimulatorDark ? "bg-white/[0.02] text-white/30" : "bg-slate-200/50 text-slate-400"
                            )}>
                              <Search className="w-6 h-6 stroke-[1.8]" />
                              <div className={cn(
                                "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-bold",
                                isSimulatorDark ? "bg-[#0C0C0E] border-white/5 text-white/40" : "bg-[#F8FAFC] border-slate-200 text-slate-500"
                              )}>
                                ✕
                              </div>
                            </div>
                            <div className="space-y-1 max-w-[200px]">
                              <p className={cn("text-xs font-semibold font-display", isSimulatorDark ? "text-white/80" : "text-slate-800")}>
                                No hay publicaciones activas
                              </p>
                              <p className={cn("text-[9px] leading-relaxed", isSimulatorDark ? "text-white/35" : "text-slate-500")}>
                                Intenta buscar otra palabra o cambia la categoría seleccionada.
                              </p>
                            </div>
                          </div>
                        ) : (
                          processedPins.map((pin) => {
                            const isAyuda = pin.category === "ayuda";
                            const avatarColorClass = isAyuda ? "bg-emerald-500" : "bg-orange-500 font-bold";
                            const tagLabel = isAyuda ? "AYUDA" : "SOCIAL";
                            const tagBgColor = isAyuda ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20";
                            const tagEmoji = isAyuda ? "🙋" : "💥";
                            return (
                              <div 
                                key={pin.id}
                                onClick={() => setSelectedPin(pin)}
                                className={cn(
                                  "p-4 rounded-[28px] border transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col gap-3",
                                  isSimulatorDark 
                                    ? "bg-white/5 hover:bg-white/10 text-white" 
                                    : "bg-white/50 hover:bg-white/85 text-slate-900"
                                )}
                                style={{ 
                                  backdropFilter: "blur(20px)",
                                  WebkitBackdropFilter: "blur(20px)",
                                  borderColor: isSimulatorDark ? `${pin.color}25` : `${pin.color}45`,
                                  boxShadow: isSimulatorDark 
                                    ? `0 8px 32px -4px rgba(0, 0, 0, 0.3), 0 0 1px 1px ${pin.color}15, 0 12px 24px -10px ${pin.color}10` 
                                    : `0 8px 32px -4px rgba(0, 0, 0, 0.04), 0 0 1px 1px ${pin.color}25, 0 12px 24px -10px ${pin.color}15`,
                                }}
                              >
                                {/* Shine highlight line at the top of the glass card */}
                                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                                {/* Left vertical glowing accent indicator */}
                                <div 
                                  className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full shadow-[0_0_8px_currentColor] transition-all duration-300 pointer-events-none"
                                  style={{ 
                                    backgroundColor: pin.color,
                                    color: pin.color
                                  }}
                                />

                                {/* Blurred backdrop image if imageUrl exists (covers the card) */}
                                {pin.imageUrl && (
                                  <div 
                                    className="absolute inset-0 z-0 bg-cover bg-center filter blur-md opacity-[0.22] pointer-events-none"
                                    style={{ backgroundImage: `url(${pin.imageUrl})` }}
                                  />
                                )}

                                {/* Card Header */}
                                <div className="flex items-center justify-between z-10 relative">
                                  <div className="flex items-center gap-3">
                                    {/* Avatar circle with custom gradient */}
                                    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-[13px] shrink-0 shadow-sm bg-gradient-to-br", 
                                      isAyuda ? "from-emerald-400 to-green-600" : "from-orange-400 to-red-650"
                                    )}>
                                      H
                                    </div>
                                    <div className="flex flex-col text-left">
                                      <div className="flex items-center gap-1">
                                        <span className={cn("text-xs font-bold tracking-tight", isSimulatorDark ? "text-white" : "text-slate-800")}>
                                          {pin.author}
                                        </span>
                                        {/* Verified Badge */}
                                        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#00D8FF] text-white text-[8px] font-bold select-none shrink-0 shadow-[0_1px_3px_rgba(0,216,255,0.3)]">
                                          ✓
                                        </span>
                                      </div>
                                      <span className={cn("text-[9px] font-medium leading-none mt-0.5", isSimulatorDark ? "text-white/40" : "text-slate-450")}>
                                        🔒 Protegida
                                      </span>
                                    </div>
                                  </div>

                                  {/* Right side category pill with glow shadow */}
                                  <span 
                                    className={cn("px-2.5 py-0.5 rounded-full text-[8.5px] font-extrabold border tracking-wider flex items-center gap-1 uppercase select-none shrink-0 shadow-sm", tagBgColor)}
                                    style={{ boxShadow: `0 0 10px -2px ${pin.color}30` }}
                                  >
                                    <span>{tagEmoji}</span> {tagLabel}
                                  </span>
                                </div>

                                {/* Card Body */}
                                <div className="space-y-1 text-left z-10 relative">
                                  <h3 className={cn("text-[13.5px] font-bold leading-snug tracking-tight", isSimulatorDark ? "text-white" : "text-slate-900")}>
                                    {pin.title}
                                  </h3>
                                  {pin.description && (
                                    <p className={cn("text-[11px] leading-relaxed", isSimulatorDark ? "text-white/60" : "text-slate-555")}>
                                      {pin.description}
                                    </p>
                                  )}
                                </div>
                                
                                {/* Card Footer: Pills Row & Reactions */}
                                <div className="flex items-center justify-between z-10 relative pt-2 border-t border-white/5 mt-0.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {/* Location pill */}
                                    <span 
                                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold border" 
                                      style={{ 
                                        backgroundColor: `${pin.color}15`, 
                                        borderColor: `${pin.color}25`, 
                                        color: pin.color 
                                      }}
                                    >
                                      <span>📍</span> {pin.distance}
                                    </span>
                                    {/* Time pill */}
                                    <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 text-[9px] font-bold text-pink-500">
                                      <span>⏱</span> {pin.time}
                                    </span>
                                  </div>

                                  {/* Reactions Section */}
                                  <div className="flex items-center gap-1.5 pointer-events-auto">
                                    {/* Vibe Button (Inline) */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerReaction(e, "❤️");
                                        const updated = pins.map((p) => 
                                          p.id === pin.id ? { ...p, vibes: p.vibes + 1 } : p
                                        );
                                        setPins(updated);
                                      }}
                                      className={cn(
                                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border transition-all active:scale-90 hover:scale-105 cursor-pointer",
                                        isSimulatorDark
                                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                                          : "bg-rose-500/5 border-rose-500/20 text-rose-500 hover:bg-rose-500/15"
                                      )}
                                    >
                                      <span>❤️</span>
                                      <span>{pin.vibes}</span>
                                    </button>

                                    {/* Boost Button (Inline) */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerReaction(e, "⚡");
                                        const updated = pins.map((p) => 
                                          p.id === pin.id ? { ...p, x2: p.x2 + 1 } : p
                                        );
                                        setPins(updated);
                                      }}
                                      className={cn(
                                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border transition-all active:scale-90 hover:scale-105 cursor-pointer",
                                        isSimulatorDark
                                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20"
                                          : "bg-cyan-500/5 border-cyan-500/20 text-cyan-500 hover:bg-cyan-500/15"
                                      )}
                                    >
                                      <span>⚡</span>
                                      <span>x2 ({pin.x2})</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })()}

                {activeTab === 3 && (
                  /* TAB 3: CHATS LIST */
                  <div className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-6 space-y-4 bg-transparent">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className={cn("text-lg font-bold font-display", isSimulatorDark ? "text-white" : "text-slate-900")}>Conversaciones</h2>
                      <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold">
                        2
                      </div>
                    </div>

                    {/* Chat items */}
                    <div className="space-y-2">
                      {[
                        { name: "Lucía M.", msg: "¡Hola! Estoy afuera de la biblioteca, ¿puedes bajar?", online: true, time: "22:34", unread: true, dept: "Ing. Sistemas" },
                        { name: "Mateo S.", msg: "Dale, a ver si compartimos taxi mañana también.", online: false, time: "Ayer", unread: false, dept: "Ing. Civil" },
                        { name: "Camila R.", msg: "Estuvo genial la previa, a ver si repetimos el viernes.", online: true, time: "Ayer", unread: false, dept: "Administración" },
                      ].map((chat, idx) => (
                        <div 
                          key={idx} 
                          className={cn(
                            "p-3 rounded-2xl flex items-center justify-between border transition-all cursor-pointer",
                            isSimulatorDark 
                              ? "bg-[#141416] border-white/5 hover:border-white/10 text-white" 
                              : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-900 shadow-sm"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {/* Avatar placeholder */}
                            <div className={cn(
                              "w-10 h-10 rounded-full border flex items-center justify-center relative",
                              isSimulatorDark ? "bg-neutral-800 border-white/10" : "bg-slate-100 border-slate-200"
                            )}>
                              <User className={cn("w-5 h-5", isSimulatorDark ? "text-white/40" : "text-slate-400")} />
                              {chat.online && (
                                <span className={cn(
                                  "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2",
                                  isSimulatorDark ? "border-[#0C0C0E]" : "border-[#F8FAFC]"
                                )} />
                              )}
                            </div>
                            <div className="text-left">
                              <h4 className={cn("text-xs font-semibold flex items-center gap-1.5", isSimulatorDark ? "text-white" : "text-slate-900")}>
                                {chat.name}
                                <span className={cn(
                                  "text-[8px] px-1 py-0.2 rounded font-normal",
                                  isSimulatorDark ? "bg-white/5 text-white/40" : "bg-slate-100 text-slate-500"
                                )}>{chat.dept}</span>
                              </h4>
                              <p className={cn(
                                "text-[10px] truncate max-w-[150px] mt-0.5", 
                                chat.unread 
                                  ? (isSimulatorDark ? "text-white font-semibold" : "text-slate-950 font-bold") 
                                  : (isSimulatorDark ? "text-white/50" : "text-slate-500")
                              )}>
                                {chat.msg}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={cn("text-[8px]", isSimulatorDark ? "text-white/30" : "text-slate-450")}>{chat.time}</span>
                            {chat.unread && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 4 && (
                  /* TAB 4: PROFILE SCREEN */
                  <div className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-6 space-y-4 bg-transparent">
                    {/* Header profile cards */}
                    <div className={cn(
                      "p-4 rounded-3xl border flex flex-col items-center text-center space-y-3 relative overflow-hidden transition-all",
                      isSimulatorDark 
                        ? "bg-[#141416] border-white/10 text-white" 
                        : "bg-white border-slate-200 text-slate-900 shadow-sm"
                    )}>
                      
                      {/* Badge elite */}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-[8px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-2.5 h-2.5" />
                        Fundador
                      </span>

                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-900/30">
                        <div className={cn("w-full h-full rounded-full flex items-center justify-center", isSimulatorDark ? "bg-[#0C0C0E]" : "bg-[#F8FAFC]")}>
                          <User className={cn("w-8 h-8", isSimulatorDark ? "text-white/70" : "text-slate-650")} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className={cn("text-sm font-bold flex items-center justify-center gap-1.5", isSimulatorDark ? "text-white" : "text-slate-900")}>
                          Hans Cueva
                        </h3>
                        <p className={cn("text-[10px]", isSimulatorDark ? "text-white/50" : "text-slate-500")}>UCSM · Ing. de Sistemas · Arequipa</p>
                      </div>

                      {/* Bio */}
                      <p className={cn("text-[10px] italic max-w-xs leading-relaxed", isSimulatorDark ? "text-white/70" : "text-slate-600")}>
                        "Fronteras locales, conexiones infinitas. Construyendo el futuro de WARPIN 🚀"
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "47", label: "Vibras" },
                        { value: "18", label: "Pines Creados" },
                        { value: "127", label: "Reputación" },
                      ].map((stat, idx) => (
                        <div 
                          key={idx} 
                          className={cn(
                            "py-2.5 px-1 rounded-2xl text-center border transition-all",
                            isSimulatorDark 
                              ? "bg-[#141416] border-white/5 text-white" 
                              : "bg-white border-slate-200 text-slate-900 shadow-sm"
                          )}
                        >
                          <span className={cn("block text-sm font-bold", isSimulatorDark ? "text-white" : "text-slate-900")}>{stat.value}</span>
                          <span className={cn("block text-[8px] uppercase tracking-wider mt-0.5", isSimulatorDark ? "text-white/40" : "text-slate-500")}>{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* User Achievements */}
                    <div className={cn(
                      "p-3 rounded-2xl border space-y-2 transition-all",
                      isSimulatorDark 
                        ? "bg-[#141416] border-white/5 text-white" 
                        : "bg-white border-slate-200 text-slate-900 shadow-sm"
                    )}>
                      <h4 className={cn("text-[10px] font-bold uppercase tracking-wider text-left", isSimulatorDark ? "text-white/40" : "text-slate-400")}>Logros Desbloqueados</h4>
                      <div className="space-y-2">
                        {[
                          { title: "Primer Drop Reclamado", desc: "Aseguraste tu código en el drop fundadores.", icon: Zap, color: "text-amber-400" },
                          { title: "Beta Élite UCSM", desc: "Usuario pionero en el campus central.", icon: GraduationCap, color: "text-cyan-400" },
                        ].map((ach, idx) => {
                          const Icon = ach.icon;
                          return (
                            <div 
                              key={idx} 
                              className={cn(
                                "flex items-center gap-2.5 text-left p-2 rounded-xl border transition-colors",
                                isSimulatorDark 
                                  ? "bg-white/5 border-white/5" 
                                  : "bg-slate-50 border-slate-100"
                              )}
                            >
                              <div className={cn("p-1.5 rounded-lg", isSimulatorDark ? "bg-black/40" : "bg-slate-200/50", ach.color)}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className={cn("text-[10px] font-semibold", isSimulatorDark ? "text-white" : "text-slate-900")}>{ach.title}</h5>
                                <p className={cn("text-[8px] mt-0.5", isSimulatorDark ? "text-white/40" : "text-slate-550")}>{ach.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Bottom Interactive Navigation Component */}
              {!isCreateOpen && (
                <BottomNavBar 
                  activeIndex={activeTab} 
                  onChange={(idx) => {
                    setActiveTab(idx);
                    setSelectedPin(null);
                    setIsCategoryMenuOpen(false);
                    setIsSortMenuOpen(false);
                  }} 
                  onFabClick={() => {
                    setActiveTab(0);
                    setIsCreateOpen(true);
                  }}
                  isDarkMode={isSimulatorDark}
                />
              )}

              {/* Mobile Home indicator */}
              <div className="absolute bottom-1.5 inset-x-0 h-1 flex justify-center pointer-events-none z-30">
                <div className={cn("w-24 h-1 rounded-full", isSimulatorDark ? "bg-white/20" : "bg-black/15")} />
              </div>

            </div>

            {/* INTERACTIVE BOTTOM SHEET (PIN DETAIL) */}
            <AnimatePresence>
              {selectedPin && !isCreateOpen && (() => {
                const triggerHaptic = () => {
                  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(10);
                  }
                };

                return (
                  <motion.div
                    initial={{ y: "150%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "150%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    className={cn(
                      "absolute inset-x-3 bottom-[82px] max-h-[300px] rounded-3xl border backdrop-blur-xl z-40 p-5 space-y-3.5 shadow-2xl flex flex-col text-left pointer-events-auto transition-colors duration-300",
                      isSimulatorDark 
                        ? "border-white/15 bg-black/70 text-white shadow-black/60" 
                        : "border-slate-200/80 bg-white/85 text-slate-900 shadow-slate-350/40"
                    )}
                  >
                    {/* Top Drag Handle Bar */}
                    <div className={cn("w-12 h-1 rounded-full mx-auto", isSimulatorDark ? "bg-white/25" : "bg-slate-300")} />

                    {/* Selector de Pines Solapados (Carrusel) */}
                    {selectedPinsList.length > 1 && (
                      <div className={cn(
                        "flex items-center justify-between pb-1.5 border-b text-[10px]",
                        isSimulatorDark ? "border-white/5" : "border-slate-200"
                      )}>
                        <span className={cn("font-semibold font-display", isSimulatorDark ? "text-white/45" : "text-slate-400")}>Publicaciones aquí</span>
                        <div className={cn(
                          "flex items-center gap-1 border rounded-full px-2.5 py-0.5",
                          isSimulatorDark ? "bg-white/10 border-white/10 text-white" : "bg-slate-100 border-slate-200 text-slate-800"
                        )}>
                          <button
                            onClick={() => {
                              triggerHaptic();
                              setCarouselIndex(prev => (prev > 0 ? prev - 1 : selectedPinsList.length - 1));
                            }}
                            className={cn("px-1 active:scale-95 transition-transform cursor-pointer", isSimulatorDark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-800")}
                          >
                            ◀
                          </button>
                          <span className="font-bold px-1.5 font-display text-[9px]">{carouselIndex + 1} de {selectedPinsList.length}</span>
                          <button
                            onClick={() => {
                              triggerHaptic();
                              setCarouselIndex(prev => (prev < selectedPinsList.length - 1 ? prev + 1 : 0));
                            }}
                            className={cn("px-1 active:scale-95 transition-transform cursor-pointer", isSimulatorDark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-800")}
                          >
                            ▶
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Header Row */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-[8px] font-bold text-black uppercase tracking-wider"
                            style={{ backgroundColor: activePin.color }}
                          >
                            {activePin.category}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 border",
                            activePin.isLocationProtected
                              ? (isSimulatorDark ? "bg-white/5 text-white/40 border-white/10" : "bg-slate-100 text-slate-500 border-slate-200")
                              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          )}>
                            {activePin.isLocationProtected ? "🛡️ PROTEGIDA" : "📍 EXACTA"}
                          </span>
                        </div>
                        <h3 className={cn("text-sm font-bold mt-1.5 leading-tight", isSimulatorDark ? "text-white" : "text-slate-900")}>{activePin.title}</h3>
                        <p className={cn("text-[9px]", isSimulatorDark ? "text-white/40" : "text-slate-400")}>{activePin.author}</p>
                      </div>

                      {/* Close button */}
                      <button 
                        onClick={() => setSelectedPin(null)}
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                          isSimulatorDark ? "bg-white/10 hover:bg-white/20 text-white/70" : "bg-slate-100 hover:bg-slate-200 text-slate-650"
                        )}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Body Text */}
                    <p className={cn("text-xs leading-relaxed overflow-y-auto max-h-[70px]", isSimulatorDark ? "text-white/70" : "text-slate-650")}>
                      {activePin.description}
                    </p>

                    {/* Footer interaction bar (Brand Book) */}
                    <div className={cn(
                      "flex items-center justify-between pt-3 border-t text-[10px]",
                      isSimulatorDark ? "border-white/10 text-white/40" : "border-slate-200 text-slate-400"
                    )}>
                      <span>📍 {activePin.distance} · {activePin.time}</span>
                      
                      <div className="flex items-center gap-2">
                        {/* Vibe Button */}
                        <button 
                          onClick={() => {
                            const updated = pins.map(p => 
                              p.id === activePin.id ? { ...p, vibes: p.vibes + 1 } : p
                            );
                            setPins(updated);
                            setSelectedPin(updated.find(p => p.id === activePin.id) || null);
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 active:scale-95 transition-transform cursor-pointer"
                        >
                          <Heart className="w-3 h-3 fill-rose-400/25" />
                          <span>{activePin.vibes}</span>
                        </button>

                        {/* X2 Button */}
                        <button 
                          onClick={() => {
                            const updated = pins.map(p => 
                              p.id === activePin.id ? { ...p, x2: p.x2 + 1 } : p
                            );
                            setPins(updated);
                            setSelectedPin(updated.find(p => p.id === activePin.id) || null);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 active:scale-95 transition-transform cursor-pointer"
                        >
                          <Zap className="w-3 h-3 fill-cyan-400/20" />
                          <span>x2 ({activePin.x2})</span>
                        </button>

                        {/* Share Button */}
                        <button 
                          onClick={() => {
                            alert("¡PIN compartido! Enlace copiado al portapapeles.");
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer border",
                            isSimulatorDark 
                              ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-white/5" 
                              : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-750 border-slate-200"
                          )}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* CREATE PIN DIALOG MODAL */}
            <AnimatePresence>
              {isCreateOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "absolute inset-0 bg-black/15 dark:bg-black/45 backdrop-blur-[1.5px] z-50 flex justify-center p-4 pointer-events-auto transition-all duration-300",
                    isInputFocused ? "items-start pt-2 overflow-y-auto" : "items-center"
                  )}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={cn(
                      "w-full max-w-sm rounded-[32px] border text-left shadow-2xl relative transition-all duration-300",
                      isInputFocused ? "p-3.5 space-y-3" : "p-5 space-y-4",
                      isSimulatorDark 
                        ? "bg-white/[0.05] border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" 
                        : "bg-white/[0.12] border-white/30 text-slate-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)]"
                    )}
                    style={{
                      backdropFilter: "blur(25px)",
                      WebkitBackdropFilter: "blur(25px)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-cyan-400" />
                        Crear Nuevo PIN
                      </h3>
                      <button 
                        onClick={() => setIsCreateOpen(false)}
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                          isSimulatorDark ? "bg-white/5 hover:bg-white/10 text-white/50" : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                        )}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const title = formData.get("title") as string;
                      const description = formData.get("description") as string;
                      const category = formData.get("category") as Pin["category"];
                      const isLocationProtected = formData.get("isLocationProtected") === "true";
                      if (!title || !description || !category) return;
                      handleCreatePin({ title, description, category, isLocationProtected });
                    }} className={cn("text-xs transition-all duration-300", isInputFocused ? "space-y-2" : "space-y-3")}>
                      
                      <div className="space-y-1">
                        <label className={cn("text-[10px] font-semibold uppercase", isSimulatorDark ? "text-white/50" : "text-slate-500")}>Título</label>
                        <input 
                          type="text" 
                          name="title" 
                          placeholder="¿Qué está pasando?" 
                          required
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className={cn(
                            "w-full border rounded-xl px-3 py-2 outline-none focus:border-cyan-400 transition-colors",
                            isSimulatorDark 
                              ? "bg-black/40 border-white/10 text-white focus:bg-black/60" 
                              : "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white"
                          )}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className={cn("text-[10px] font-semibold uppercase", isSimulatorDark ? "text-white/50" : "text-slate-500")}>Categoría</label>
                        <select 
                          name="category"
                          required
                          className={cn(
                            "w-full border rounded-xl px-3 py-2 outline-none focus:border-cyan-400 appearance-none transition-colors",
                            isSimulatorDark 
                              ? "bg-[#1E1E22] border-white/10 text-white" 
                              : "bg-slate-50 border-slate-200 text-slate-900"
                          )}
                        >
                          <option value="social">Social (Naranja)</option>
                          <option value="ayuda">Ayuda (Rojo)</option>
                          <option value="transporte">Transporte (Celeste)</option>
                          <option value="random">Random (Púrpura)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className={cn("text-[10px] font-semibold uppercase", isSimulatorDark ? "text-white/50" : "text-slate-500")}>Descripción</label>
                        <textarea 
                          name="description" 
                          rows={isInputFocused ? 2 : 3}
                          placeholder="Añade detalles, ubicación específica, horarios..." 
                          required
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className={cn(
                            "w-full border rounded-xl px-3 py-2 outline-none focus:border-cyan-400 resize-none transition-colors",
                            isSimulatorDark 
                              ? "bg-black/40 border-white/10 text-white focus:bg-black/60" 
                              : "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white"
                          )}
                        />
                      </div>

                      {/* Location Protection Toggle Switch */}
                      {isInputFocused ? (
                        <div className="flex items-center gap-2 justify-end my-1 px-1">
                          <input
                            type="checkbox"
                            name="isLocationProtected"
                            value="true"
                            defaultChecked
                            className="w-3.5 h-3.5 rounded border-white/15 bg-black/40 text-cyan-400 focus:ring-cyan-500 cursor-pointer"
                          />
                          <span className={cn("text-[10px] font-semibold", isSimulatorDark ? "text-white/60" : "text-slate-600")}>
                            Ubicación Protegida 🛡️
                          </span>
                        </div>
                      ) : (
                        <div className={cn(
                          "flex items-center justify-between border rounded-xl p-3 my-2",
                          isSimulatorDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                        )}>
                          <div className="space-y-0.5 text-left pr-4">
                            <label className={cn("text-[10px] font-bold flex items-center gap-1", isSimulatorDark ? "text-white" : "text-slate-900")}>
                              Ubicación Protegida 🛡️
                            </label>
                            <span className={cn("text-[9px] leading-tight block", isSimulatorDark ? "text-white/45" : "text-slate-500")}>
                              Tu PIN se colocará aleatoriamente a 40 metros a la redonda de tu posición exacta.
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            name="isLocationProtected"
                            value="true"
                            defaultChecked
                            className="w-4 h-4 rounded border-white/10 bg-black/40 text-cyan-400 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                          />
                        </div>
                      )}

                      <button 
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-90 font-bold text-white shadow-lg shadow-purple-900/30 transition-all text-xs flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Publicar PIN
                      </button>

                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}
