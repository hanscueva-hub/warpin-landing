import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, Battery, Signal, MapPin, Search, Compass, MessageCircle, 
  User, Plus, X, Heart, Share2, Award, Zap, BookOpen, HelpCircle, 
  MessageSquare, GraduationCap, Map as MapIcon, Send, Sparkles,
  Beer, Car, PartyPopper, Siren, KeyRound
} from "lucide-react";
import { BottomNavBar } from "@/components/BottomNavBar";
import { MapScreen } from "@/screens/MapScreen";
import { cn } from "@/utils/cn";

function getCategoryIcon(category: string) {
  switch (category) {
    case "socializar": return Beer;
    case "transporte": return Car;
    case "eventos": return PartyPopper;
    case "ayuda": return Siren;
    case "academico": return BookOpen;
    case "perdidos": return KeyRound;
    default: return HelpCircle;
  }
}

interface Pin {
  id: string;
  category: "socializar" | "transporte" | "eventos" | "ayuda" | "academico" | "perdidos";
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
}

export function MockupScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("todos");
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // Custom mock time
  const [timeStr, setTimeStr] = useState("22:38");

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

  // Pins Data representing campus / local area
  const [pins, setPins] = useState<Pin[]>([
    {
      id: "pin1",
      category: "socializar",
      title: "Previa en Yanahuara 🍻",
      description: "Saliendo de clases, caigan al parque de Yanahuara. Traigan lo que vayan a tomar. ¡Buen ambiente!",
      time: "Hace 5 min",
      distance: "0.4 km",
      author: "Camila R. · Administración",
      color: "#FF5722",
      x: 35,
      y: 30,
      vibes: 12,
      x2: 3,
      isLocationProtected: false,
    },
    {
      id: "pin2",
      category: "transporte",
      title: "Taxi compartido a Cayma 🚕",
      description: "Saliendo de la UCSM hacia Cayma alta, busco 2 personas para dividir taxi. Sale 4 soles c/u.",
      time: "Hace 12 min",
      distance: "1.2 km",
      author: "Diego H. · Medicina",
      color: "#00E5FF",
      x: 65,
      y: 55,
      vibes: 4,
      x2: 1,
      isLocationProtected: false,
    },
    {
      id: "pin3",
      category: "eventos",
      title: "Concierto acústico en el Patio 🎸",
      description: "Banda de la facultad tocando acústicos de rock en el patio de ingeniería. ¡Vengan a escuchar!",
      time: "Hace 20 min",
      distance: "0.1 km",
      author: "Mateo S. · Ing. Civil",
      color: "#C084FC",
      x: 20,
      y: 70,
      vibes: 24,
      x2: 9,
      isLocationProtected: false,
    },
    {
      id: "pin4",
      category: "ayuda",
      title: "Busco cargador Tipo C 🔌",
      description: "Estoy en la biblioteca del 4to piso de sistemas, me queda 2% de batería. Alguien me presta porfa?",
      time: "Hace 2 min",
      distance: "0.2 km",
      author: "Lucía M. · Ing. Sistemas",
      color: "#EF4444",
      x: 50,
      y: 45,
      vibes: 8,
      x2: 2,
      isLocationProtected: false,
    },
    {
      id: "pin5",
      category: "academico",
      title: "Estudio para examen Cálculo II 📚",
      description: "Resolviendo la práctica dirigida en las mesas de atrás del pabellón B. Si alguien domina integrales triples caiga.",
      time: "Hace 30 min",
      distance: "0.3 km",
      author: "Andrés T. · Derecho",
      color: "#4ADE80",
      x: 80,
      y: 25,
      vibes: 15,
      x2: 5,
      isLocationProtected: false,
    },
    {
      id: "pin6",
      category: "perdidos",
      title: "Carnet de Biblioteca Encontrado 🔍",
      description: "Encontré un carnet a nombre de Sebastian Gonzales tirado cerca de la cafetería central. Se lo dejé a la señora del counter.",
      time: "Hace 15 min",
      distance: "0.6 km",
      author: "Valeria P. · Psicología",
      color: "#FFEB3B",
      x: 42,
      y: 80,
      vibes: 6,
      x2: 0,
      isLocationProtected: false,
    },
  ]);

  const categories = [
    { id: "todos", label: "Todos", color: "#FFFFFF" },
    { id: "socializar", label: "Socializar", color: "#FF5722" },
    { id: "transporte", label: "Transporte", color: "#00E5FF" },
    { id: "eventos", label: "Eventos", color: "#C084FC" },
    { id: "ayuda", label: "Ayuda", color: "#EF4444" },
    { id: "academico", label: "Académico", color: "#4ADE80" },
    { id: "perdidos", label: "Perdidos", color: "#FFEB3B" },
  ];

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

  const filteredPins = filterCategory === "todos" 
    ? pins 
    : pins.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative neon ambient blobs in workspace background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Screen Wrapper */}
      <div className="w-full max-w-4xl grid md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Product Context / Description (Gen Z Style) */}
        <div className="md:col-span-6 text-left flex flex-col justify-center space-y-5 px-4">
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
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-[345px] h-[720px] rounded-[48px] border-[6px] border-neutral-800 bg-[#121212] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col select-none ring-1 ring-white/10">
            
            {/* Phone Notch/Island */}
            <div className="absolute top-0 inset-x-0 h-6 bg-black z-40 flex items-center justify-between px-6 text-[10px] text-white/80 font-medium">
              <span>{timeStr}</span>
              {/* Camera Island */}
              <div className="w-20 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1" />
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3 text-white/80" />
                <Wifi className="w-3 h-3 text-white/80" />
                <Battery className="w-3.5 h-3.5 text-white/80" />
              </div>
            </div>

            {/* Mobile App Canvas Background (#121212) */}
            <div className="flex-1 relative mt-6 pb-16 flex flex-col overflow-hidden bg-[#121212]">
              
              {/* Tab Views */}
              <div className="flex-1 relative overflow-hidden">
                {activeTab === 0 && (
                  /* TAB 0: INTERACTIVE MAP */
                  <div className="absolute inset-0 bg-[#121212] overflow-hidden">
                    <MapScreen
                      pins={filteredPins.map((p) => ({
                        ...p,
                        icon: getCategoryIcon(p.category),
                      }))}
                      onPinSelect={(pin) => setSelectedPin(pin)}
                      selectedPinId={activePin?.id || null}
                    />

                    {/* Filter Pills at the top (Fixed Overlay) */}
                    <div className="absolute top-4 inset-x-0 px-3 overflow-x-auto flex gap-1.5 z-20 no-scrollbar pointer-events-auto">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setFilterCategory(c.id)}
                          className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 border",
                            filterCategory === c.id
                              ? "bg-white text-black border-white shadow-md"
                              : "bg-black/40 text-white/70 border-white/10 backdrop-blur-md hover:bg-black/60"
                          )}
                        >
                          {c.id !== "todos" && (
                            <span 
                              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" 
                              style={{ backgroundColor: c.color }}
                            />
                          )}
                          {c.label}
                        </button>
                      ))}
                    </div>

                    {/* Map Label overlays */}
                    <div className="absolute top-16 left-4 bg-black/40 border border-white/5 px-2 py-0.5 rounded text-[8px] text-white/50 backdrop-blur-md z-20">
                      📍 Campus UCSM
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/40 border border-white/5 px-2 py-0.5 rounded text-[8px] text-white/50 backdrop-blur-md z-20 font-medium">
                      Radio: 1.5 km
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  /* TAB 1: LIST / EXPLORE FEED */
                  <div className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-6 space-y-3 bg-[#121212]">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-bold font-display text-white">Feed de PINs</h2>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                        <Search className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {filteredPins.length === 0 ? (
                      <div className="text-center py-10 text-white/40 text-sm">
                        No hay publicaciones en esta categoría.
                      </div>
                    ) : (
                      filteredPins.map((pin) => (
                        <div 
                          key={pin.id}
                          onClick={() => setSelectedPin(pin)}
                          className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer space-y-3 bg-white/[0.02]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span 
                                className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-black flex items-center gap-1"
                                style={{ backgroundColor: pin.color }}
                              >
                                {pin.category.toUpperCase()}
                              </span>
                              <span className={cn(
                                "px-2 py-0.2 rounded-full text-[8px] font-bold uppercase tracking-wider border",
                                pin.isLocationProtected
                                  ? "bg-white/5 text-white/40 border-white/10"
                                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                              )}>
                                {pin.isLocationProtected ? "🛡️ PROTEGIDA" : "📍 EXACTA"}
                              </span>
                            </div>
                            <span className="text-[10px] text-white/40">{pin.time}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-white">{pin.title}</h3>
                            <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{pin.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-white/40">
                            <span>{pin.author}</span>
                            <span>📍 {pin.distance}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 3 && (
                  /* TAB 3: CHATS LIST */
                  <div className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-6 space-y-4 bg-[#121212]">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-bold font-display text-white">Conversaciones</h2>
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
                        <div key={idx} className="glass-panel p-3 rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors cursor-pointer bg-white/[0.01]">
                          <div className="flex items-center gap-3">
                            {/* Avatar placeholder */}
                            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center relative">
                              <User className="w-5 h-5 text-white/40" />
                              {chat.online && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#121212]" />
                              )}
                            </div>
                            <div className="text-left">
                              <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                                {chat.name}
                                <span className="text-[8px] px-1 py-0.2 bg-white/5 rounded text-white/40 font-normal">{chat.dept}</span>
                              </h4>
                              <p className={cn("text-[10px] truncate max-w-[150px] mt-0.5", chat.unread ? "text-white font-medium" : "text-white/50")}>
                                {chat.msg}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[8px] text-white/30">{chat.time}</span>
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
                  <div className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-6 space-y-4 bg-[#121212]">
                    {/* Header profile cards */}
                    <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col items-center text-center space-y-3 relative overflow-hidden bg-white/[0.01]">
                      
                      {/* Badge elite */}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-[8px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-2.5 h-2.5" />
                        Fundador
                      </span>

                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-900/30">
                        <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center">
                          <User className="w-8 h-8 text-white/70" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                          Hans Cueva
                        </h3>
                        <p className="text-[10px] text-white/50">UCSM · Ing. de Sistemas · Arequipa</p>
                      </div>

                      {/* Bio */}
                      <p className="text-[10px] text-white/70 italic max-w-xs leading-relaxed">
                        "Fronteras locales, conexiones infinitas. Construyendo el futuro de WARPIN 🚀"
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "47", label: "Vibras" },
                        { value: "18", label: "Pines Creados" },
                        { value: "127", label: "Karma" },
                      ].map((stat, idx) => (
                        <div key={idx} className="glass-panel py-2.5 px-1 rounded-2xl text-center border border-white/5 bg-white/[0.01]">
                          <span className="block text-sm font-bold text-white">{stat.value}</span>
                          <span className="block text-[8px] text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* User Achievements */}
                    <div className="glass-panel p-3 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 text-left">Logros Desbloqueados</h4>
                      <div className="space-y-2">
                        {[
                          { title: "Primer Drop Reclamado", desc: "Aseguraste tu código en el drop fundadores.", icon: Zap, color: "text-amber-400" },
                          { title: "Beta Élite UCSM", desc: "Usuario pionero en el campus central.", icon: GraduationCap, color: "text-cyan-400" },
                        ].map((ach, idx) => {
                          const Icon = ach.icon;
                          return (
                            <div key={idx} className="flex items-center gap-2.5 text-left bg-white/5 p-2 rounded-xl border border-white/5">
                              <div className={cn("p-1.5 rounded-lg bg-black/40", ach.color)}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-[10px] font-semibold text-white">{ach.title}</h5>
                                <p className="text-[8px] text-white/40 mt-0.5">{ach.desc}</p>
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
              <BottomNavBar 
                activeIndex={activeTab} 
                onChange={(idx) => {
                  setActiveTab(idx);
                  setSelectedPin(null);
                }} 
                onFabClick={() => setIsCreateOpen(true)}
              />

              {/* Mobile Home indicator */}
              <div className="absolute bottom-1.5 inset-x-0 h-1 flex justify-center pointer-events-none z-30">
                <div className="w-24 h-1 bg-white/20 rounded-full" />
              </div>

            </div>

            {/* INTERACTIVE BOTTOM SHEET (PIN DETAIL) */}
            <AnimatePresence>
              {selectedPin && (() => {
                const activePin = selectedPinsList[carouselIndex] || selectedPin;
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
                    className="absolute inset-x-3 bottom-[82px] max-h-[300px] rounded-3xl border border-white/20 bg-black/60 backdrop-blur-xl z-40 p-5 space-y-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col text-left pointer-events-auto"
                  >
                    {/* Top Drag Handle Bar */}
                    <div className="w-12 h-1 bg-white/25 rounded-full mx-auto" />

                    {/* Selector de Pines Solapados (Carrusel) */}
                    {selectedPinsList.length > 1 && (
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5 text-[10px]">
                        <span className="text-white/45 font-semibold font-display">Publicaciones aquí</span>
                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur border border-white/10 rounded-full px-2.5 py-0.5">
                          <button
                            onClick={() => {
                              triggerHaptic();
                              setCarouselIndex(prev => (prev > 0 ? prev - 1 : selectedPinsList.length - 1));
                            }}
                            className="text-white/60 hover:text-white px-1 active:scale-95 transition-transform cursor-pointer"
                          >
                            ◀
                          </button>
                          <span className="text-white font-bold px-1.5 font-display text-[9px]">{carouselIndex + 1} de {selectedPinsList.length}</span>
                          <button
                            onClick={() => {
                              triggerHaptic();
                              setCarouselIndex(prev => (prev < selectedPinsList.length - 1 ? prev + 1 : 0));
                            }}
                            className="text-white/60 hover:text-white px-1 active:scale-95 transition-transform cursor-pointer"
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
                              ? "bg-white/5 text-white/40 border-white/10"
                              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          )}>
                            {activePin.isLocationProtected ? "🛡️ PROTEGIDA" : "📍 EXACTA"}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5 leading-tight">{activePin.title}</h3>
                        <p className="text-[9px] text-white/40">{activePin.author}</p>
                      </div>

                      {/* Close button */}
                      <button 
                        onClick={() => setSelectedPin(null)}
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Body Text */}
                    <p className="text-xs text-white/70 leading-relaxed overflow-y-auto max-h-[70px]">
                      {activePin.description}
                    </p>

                    {/* Footer interaction bar (Brand Book) */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px]">
                      <span className="text-white/40">📍 {activePin.distance} · {activePin.time}</span>
                      
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
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white border border-white/5 active:scale-95 transition-transform cursor-pointer"
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
                  className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 pointer-events-auto"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="glass-panel w-full max-w-sm rounded-[32px] border border-white/20 p-5 space-y-4 text-left shadow-2xl relative bg-[#121212]/90"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Plus className="w-4 h-4 text-cyan-400" />
                        Crear Nuevo PIN
                      </h3>
                      <button 
                        onClick={() => setIsCreateOpen(false)}
                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50"
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
                    }} className="space-y-3 text-xs">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/50 font-semibold uppercase">Título</label>
                        <input 
                          type="text" 
                          name="title" 
                          placeholder="¿Qué está pasando?" 
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-white/50 font-semibold uppercase">Categoría</label>
                        <select 
                          name="category"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 appearance-none"
                        >
                          <option value="socializar">Socializar (Naranja)</option>
                          <option value="transporte">Transporte (Azul)</option>
                          <option value="eventos">Eventos (Púrpura)</option>
                          <option value="ayuda">Ayuda (Rojo)</option>
                          <option value="academico">Académico (Verde)</option>
                          <option value="perdidos">Perdidos (Amarillo)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-white/50 font-semibold uppercase">Descripción</label>
                        <textarea 
                          name="description" 
                          rows={3}
                          placeholder="Añade detalles, ubicación específica, horarios..." 
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 resize-none"
                        />
                      </div>

                      {/* Location Protection Toggle Switch */}
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 my-2">
                        <div className="space-y-0.5 text-left pr-4">
                          <label className="text-[10px] text-white font-bold flex items-center gap-1">
                            Ubicación Protegida 🛡️
                          </label>
                          <span className="text-[9px] text-white/45 leading-tight block">
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
