import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { MapPin, Compass, ShieldAlert, Award } from "lucide-react";
import { WarpinPin } from "@/components/WarpinPin";
import { cn } from "@/utils/cn";

interface Pin {
  id: string;
  category: "socializar" | "transporte" | "eventos" | "ayuda" | "academico" | "perdidos";
  title: string;
  description: string;
  time: string;
  distance: string;
  author: string;
  color: string;
  x: number; // pixel coordinate on 1200x1200px canvas
  y: number; // pixel coordinate on 1200x1200px canvas
  icon: any;
  vibes: number;
  x2: number;
}

interface MapScreenProps {
  pins: Pin[];
  onPinSelect: (pin: Pin) => void;
  selectedPinId: string | null;
}

export function MapScreen({
  pins,
  onPinSelect,
  selectedPinId,
}: MapScreenProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Obtener el pin activo y su grupo cercano para la sincronización visual en el mapa
  const activePin = useMemo(() => {
    return pins.find(p => p.id === selectedPinId) || null;
  }, [pins, selectedPinId]);

  const selectedGroupIds = useMemo(() => {
    if (!activePin) return new Set<string>();
    return new Set(
      pins
        .filter(p => Math.sqrt(Math.pow(p.x - activePin.x, 2) + Math.pow(p.y - activePin.y, 2)) < 5)
        .map(p => p.id)
    );
  }, [pins, activePin]);

  // Rastrear posición de arrastre del mapa en tiempo real
  const mapX = useMotionValue(-430);
  const mapY = useMotionValue(-430);

  // Estado reactivo de desfase para recalcular los glows de borde al arrastrar
  const [mapOffset, setMapOffset] = useState({ x: -430, y: -430 });
  const [containerSize, setContainerSize] = useState({ width: 345, height: 600 });

  useEffect(() => {
    if (constraintsRef.current) {
      const rect = constraintsRef.current.getBoundingClientRect();
      setContainerSize({
        width: rect.width || 345,
        height: rect.height || 600,
      });
    }

    const unsubscribeX = mapX.on("change", (latest) => {
      setMapOffset((prev) => ({ ...prev, x: latest }));
    });
    const unsubscribeY = mapY.on("change", (latest) => {
      setMapOffset((prev) => ({ ...prev, y: latest }));
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mapX, mapY]);

  const prevSelectedPinIdRef = useRef<string | null>(null);

  const centerOnCoordinate = (xPercent: number, yPercent: number) => {
    const px = (xPercent / 100) * 1200;
    const py = (yPercent / 100) * 1200;
    const targetX = containerSize.width / 2 - px;
    const targetY = containerSize.height / 2 - py;
    
    const clampedX = Math.max(-860, Math.min(0, targetX));
    const clampedY = Math.max(-860, Math.min(0, targetY));

    animate(mapX, clampedX, { type: "spring", damping: 28, stiffness: 180 });
    animate(mapY, clampedY, { type: "spring", damping: 28, stiffness: 180 });
  };

  useEffect(() => {
    if (selectedPinId && prevSelectedPinIdRef.current === null) {
      const pin = pins.find(p => p.id === selectedPinId);
      if (pin) {
        centerOnCoordinate(pin.x, pin.y);
      }
    }
    prevSelectedPinIdRef.current = selectedPinId;
  }, [selectedPinId, pins, containerSize]);

  // Algoritmo de clustering simple para la web con mezcla de colores
  const clusteredItems = useMemo(() => {
    const clusterRadius = 80; // píxeles en el canvas de 1200x1200px (equivale a ~23px en pantalla, >20% de solapamiento)
    const clusters: Array<{
      id: string;
      x: number;
      y: number;
      pins: Pin[];
    }> = [];

    pins.forEach((pin) => {
      const px = (pin.x / 100) * 1200;
      const py = (pin.y / 100) * 1200;

      let closestCluster: any = null;
      let minDistance = Infinity;

      clusters.forEach((cluster) => {
        const cx = (cluster.x / 100) * 1200;
        const cy = (cluster.y / 100) * 1200;
        const dist = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        if (dist < clusterRadius && dist < minDistance) {
          minDistance = dist;
          closestCluster = cluster;
        }
      });

      if (closestCluster) {
        closestCluster.pins.push(pin);
        const totalX = closestCluster.pins.reduce((sum: number, p: Pin) => sum + p.x, 0);
        const totalY = closestCluster.pins.reduce((sum: number, p: Pin) => sum + p.y, 0);
        closestCluster.x = totalX / closestCluster.pins.length;
        closestCluster.y = totalY / closestCluster.pins.length;
      } else {
        clusters.push({
          id: `cluster-${pin.id}`,
          x: pin.x,
          y: pin.y,
          pins: [pin],
        });
      }
    });

    return clusters.map((c) => {
      if (c.pins.length === 1) {
        return {
          ...c.pins[0],
          isCluster: false,
        };
      }
      // Obtener lista única de colores de los pines en este clúster
      const colors = Array.from(new Set(c.pins.map((p) => p.color)));
      return {
        id: c.id,
        isCluster: true,
        x: c.x,
        y: c.y,
        pins: c.pins,
        colors: colors,
      };
    });
  }, [pins]);

  // Calcular glows de borde para pines fuera de la vista
  const edgeGlows = useMemo(() => {
    const center = { x: containerSize.width / 2, y: containerSize.height / 2 };
    const edgePadding = 12; // Margen interno para el centro de los glows
    const rect = {
      left: edgePadding,
      right: containerSize.width - edgePadding,
      top: edgePadding,
      bottom: containerSize.height - edgePadding,
    };

    const glowsList: Array<{ id: string; color: string; x: number; y: number }> = [];
    const paintedPositions: Array<{ x: number; y: number }> = [];

    pins.forEach((pin) => {
      // Posición física del pin en el canvas (escala de 1200px)
      const px = (pin.x / 100) * 1200;
      const py = (pin.y / 100) * 1200;

      // Posición del pin en el viewport de la pantalla
      const screenX = px + mapOffset.x;
      const screenY = py + mapOffset.y;

      const isOffScreen =
        screenX < 0 ||
        screenX > containerSize.width ||
        screenY < 0 ||
        screenY > containerSize.height;

      if (isOffScreen) {
        const target = { x: screenX, y: screenY };
        const intersection = getEdgeIntersection(center, target, rect);

        // Agrupación de auras del mismo color muy cercanas (< 30px)
        const tooClose = paintedPositions.some(
          (pos) =>
            Math.sqrt(
              Math.pow(pos.x - intersection.x, 2) + Math.pow(pos.y - intersection.y, 2)
            ) < 30
        );

        if (!tooClose) {
          paintedPositions.push(intersection);
          glowsList.push({
            id: pin.id,
            color: pin.color,
            x: intersection.x,
            y: intersection.y,
          });
        }
      }
    });

    return glowsList;
  }, [pins, mapOffset, containerSize]);

  return (
    <div 
      ref={constraintsRef} 
      className="w-full h-full bg-[#0f1d2c] overflow-hidden relative select-none cursor-grab active:cursor-grabbing"
    >
      {/* 
        The Map Canvas (1200x1200px)
        We allow dragging it within the bounds of the phone frame (typically ~345x640px).
      */}
      <motion.div
        drag
        dragConstraints={{
          left: -860, // 1200 - 340
          right: 0,
          top: -860, // 1200 - 340 (notch/nav offset)
          bottom: 0,
        }}
        style={{ x: mapX, y: mapY }}
        className="w-[1200px] h-[1200px] bg-[#0f1d2c] relative overflow-hidden flex items-center justify-center animate-none"
      >
        
        {/* Cyberpunk grid streets system of Arequipa */}
        <svg 
          width="1200" 
          height="1200" 
          viewBox="0 0 1200 1200" 
          fill="none" 
          className="absolute inset-0 pointer-events-none"
        >
          {/* Grid background */}
          <defs>
            <pattern id="dark-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            </pattern>
            {/* Máscara de foco radial 3km centrada en UCSM (595, 425) con radio 240px */}
            <mask id="radial-focus-mask">
              <rect width="1200" height="1200" fill="white" />
              <circle cx="595" cy="425" r="240" fill="black" />
            </mask>
            <filter id="svg-blur">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#dark-grid)" />

          {/* Rio Chili (Río cuerpo de agua al este) */}
          <path
            d="M 100 -50 Q 250 350 200 650 T 400 1250"
            fill="none"
            stroke="#11293a"
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* Main Avenues (Calles y avenidas principales) */}
          {/* Av. Metropolitana */}
          <path d="M -50 450 L 1250 450" fill="none" stroke="#2e4960" strokeWidth="16" />
          <path d="M -50 450 L 1250 450" fill="none" stroke="#0f1d2c" strokeWidth="2" strokeDasharray="6 8" />

          {/* Av. Venezuela */}
          <path d="M 500 -50 L 500 1250" fill="none" stroke="#2e4960" strokeWidth="14" />
          
          {/* Av. Ejercito */}
          <path d="M -50 200 C 350 250, 750 150, 1250 350" fill="none" stroke="#2e4960" strokeWidth="18" />
          
          {/* Diagonal Blocks Streets Grid */}
          <g stroke="#2e4960" strokeWidth="4">
            {/* Horizontal-ish streets */}
            <line x1="-50" y1="100" x2="1250" y2="100" />
            <line x1="-50" y1="300" x2="1250" y2="300" />
            <line x1="-50" y1="580" x2="1250" y2="580" />
            <line x1="-50" y1="700" x2="1250" y2="700" />
            <line x1="-50" y1="850" x2="1250" y2="850" />
            <line x1="-50" y1="1000" x2="1250" y2="1000" />

            {/* Vertical-ish streets */}
            <line x1="150" y1="-50" x2="150" y2="1250" />
            <line x1="320" y1="-50" x2="320" y2="1250" />
            <line x1="680" y1="-50" x2="680" y2="1250" />
            <line x1="850" y1="-50" x2="850" y2="1250" />
            <line x1="1050" y1="-50" x2="1050" y2="1250" />
          </g>

          {/* Ovalos / Roundabouts */}
          <circle cx="500" cy="450" r="24" fill="#0f1d2c" stroke="#2e4960" strokeWidth="4" />
          <circle cx="200" cy="650" r="16" fill="#0f1d2c" stroke="#2e4960" strokeWidth="4" />

          {/* Foco radial 3km: oscurece y difumina todo fuera del radio de UCSM */}
          <rect
            width="1200"
            height="1200"
            fill="#0f1d2c"
            fillOpacity="0.65"
            filter="url(#svg-blur)"
            mask="url(#radial-focus-mask)"
          />
        </svg>

        {/* Green Zones (Parks / Plaza) */}
        {/* Plaza de Yanahuara */}
        <div className="absolute left-[360px] top-[240px] w-24 h-20 rounded-[28px] bg-[#194d4a] border border-[#194d4a]/50 flex items-center justify-center text-[9px] text-cyan-400/50 pointer-events-none font-bold">
          Yanahuara
        </div>

        {/* Plaza de Armas de Arequipa */}
        <div className="absolute left-[480px] top-[540px] w-20 h-20 rounded-xl bg-[#194d4a] border border-[#194d4a]/50 flex items-center justify-center text-[9px] text-cyan-400/50 pointer-events-none font-bold">
          Plaza de Armas
        </div>

        {/* UCSM Campus (The epic center) */}
        <div className="absolute left-[540px] top-[390px] w-[110px] h-[75px] rounded-[24px] bg-cyan-400/[0.02] border border-cyan-400/20 flex flex-col items-center justify-center text-center pointer-events-none select-none">
          <span className="text-[10px] font-extrabold text-cyan-400/80 font-display">CAMPUS UCSM</span>
          <span className="text-[7px] text-white/30 uppercase mt-0.5">Zona Cero</span>
        </div>

        {/* User Current Position Dot */}
        <div className="absolute left-[595px] top-[425px] w-4 h-4 rounded-full bg-cyan-400 border border-white flex items-center justify-center shadow-[0_0_12px_#00E5FF] z-10 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </div>

        {/* Map Pins & Clusters */}
        {clusteredItems.map((item: any) => {
          if (item.isCluster) {
            // Mezclar colores de los pines internos en degradado
            const gradientBackground = item.colors.length === 1
              ? `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[0]}b3 100%)`
              : `linear-gradient(135deg, ${item.colors.join(", ")})`;
            const primaryColor = item.colors[0];

            return (
              <div
                key={item.id}
                className="absolute z-20 cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{ 
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                onClick={() => {
                  centerOnCoordinate(item.x, item.y);
                  if (item.pins && item.pins.length > 0) {
                    onPinSelect(item.pins[0]);
                  }
                }}
              >
                {/* Cluster Bubble (Similar a los pines de 32px, con una ligera grandeza leve de 36px) */}
                <div 
                  className="rounded-full flex items-center justify-center font-bold text-[11px] text-white animate-pulse"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: gradientBackground,
                    boxShadow: `0 0 4px 1.2px rgba(255, 255, 255, 0.45), 0 0 8px ${primaryColor}80`
                  }}
                >
                  {item.pins.length}
                </div>
              </div>
            );
          } else {
            const pin = item as Pin;
            const isSelectedGroup = selectedGroupIds.has(pin.id);
            const isActivePin = pin.id === selectedPinId;
            const opacity = isSelectedGroup && !isActivePin ? 0.45 : 1.0;
            const scale = isActivePin ? 1.15 : 1.0;
            const pinSize = isActivePin ? 35 : 32;

            return (
              <div
                key={pin.id}
                className="absolute z-20 transition-all duration-300"
                style={{ 
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity: opacity,
                }}
              >
                <WarpinPin
                  color={pin.color}
                  icon={pin.icon}
                  size={pinSize}
                  title={pin.title}
                  onClick={() => {
                  centerOnCoordinate(pin.x, pin.y);
                  onPinSelect(pin);
                }}
                />
              </div>
            );
          }
        })}

      </motion.div>

      {/* Overlay de Resplandores en los Bordes (Off-screen Glows) */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {edgeGlows.map((glow) => (
          <div
            key={glow.id}
            className="absolute rounded-full pointer-events-none blur-2xl opacity-40 transition-opacity duration-300"
            style={{
              width: "120px",
              height: "120px",
              left: `${glow.x}px`,
              top: `${glow.y}px`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${glow.color} 0%, ${glow.color}40 50%, transparent 100%)`,
            }}
          />
        ))}
      </div>

      {/* Info indicator in UI corner */}
      <div className="absolute bottom-20 left-4 pointer-events-none z-10 bg-black/50 border border-white/5 px-2 py-1 rounded-xl text-[9px] text-white/50 backdrop-blur-md">
        👋 Arrastra para explorar Arequipa
      </div>
    </div>
  );
}

// Función geométrica para encontrar la intersección del rayo centro -> target con el recuadro límite
function getEdgeIntersection(
  center: { x: number; y: number },
  target: { x: number; y: number },
  rect: { left: number; right: number; top: number; bottom: number }
) {
  const dx = target.x - center.x;
  const dy = target.y - center.y;

  if (dx === 0 && dy === 0) return center;

  let tX = Infinity;
  let tY = Infinity;

  if (dx > 0) {
    tX = (rect.right - center.x) / dx;
  } else if (dx < 0) {
    tX = (rect.left - center.x) / dx;
  }

  if (dy > 0) {
    tY = (rect.bottom - center.y) / dy;
  } else if (dy < 0) {
    tY = (rect.top - center.y) / dy;
  }

  const t = Math.min(tX, tY);
  return {
    x: center.x + t * dx,
    y: center.y + t * dy,
  };
}
