import React, { useState, useRef, useCallback } from "react";

/**
 * SoftFlowDyeingMachineDiagram
 *
 * An original schematic of a fabric Jet / Soft-Flow Dyeing Machine, the
 * standard machine for rope-form dyeing of knitted and woven fabric
 * (polyester with disperse dyes, cotton with reactive/vat dyes, etc.)
 *
 * The defining mechanism: fabric travels as an endless rope, lifted by a
 * winch reel into a jet nozzle where high-speed dye liquor (via venturi)
 * propels it through a transport tube back down into the vessel — a
 * continuous loop. That loop is animated here with a moving marker.
 */

const PARTS = [
  { id: 1, name: "Main Dyeing Vessel (Kier)", fn: "Pressure vessel holding the dye liquor and the plaited fabric rope; rated for high-temperature, high-pressure dyeing.", x: 130, y: 175 },
  { id: 2, name: "Winch Reel", fn: "Rotating reel that lifts the fabric rope out of the liquor and feeds it into the jet nozzle.", x: 118, y: 55 },
  { id: 3, name: "Jet Nozzle (Venturi)", fn: "Narrow throat where high-speed liquor jets against the fabric, creating turbulence that drives dye penetration without harsh mechanical action.", x: 150, y: 50 },
  { id: 4, name: "Fabric Transport Tube", fn: "Closed tube guiding the fabric rope from the nozzle back down into the vessel, completing the circulation loop.", x: 190, y: 90 },
  { id: 5, name: "Circulation Pump", fn: "Centrifugal pump that draws liquor from the vessel and forces it through the nozzle at high pressure.", x: 245, y: 182 },
  { id: 6, name: "Heat Exchanger", fn: "Plate or tube exchanger that rapidly heats or cools the circulating liquor to hit the dyeing recipe's temperature profile.", x: 245, y: 148 },
  { id: 7, name: "Reserve / Dosing Tank", fn: "Holds dye or chemical solutions that are metered into the main liquor during the process without opening the vessel.", x: 178, y: 22 },
  { id: 8, name: "Drain Valve", fn: "Bottom valve used to empty spent dye liquor between process steps.", x: 122, y: 205 },
  { id: 9, name: "Steam Inlet Pipe", fn: "Supplies steam, usually to the heat exchanger, for fast heating of the liquor to dyeing temperature.", x: 218, y: 205 },
  { id: 10, name: "Sight Glass", fn: "Small viewing window that lets the operator watch the fabric rope circulate without opening the vessel.", x: 92, y: 178 },
  { id: 11, name: "Liquor Level Indicator", fn: "External sight tube marked with a scale showing the dye liquor level inside the vessel.", x: 58, y: 175 },
  { id: 12, name: "Lint Filter / Strainer", fn: "Screens fibre lint and debris out of the liquor before it's recirculated through the pump and nozzle.", x: 268, y: 168 },
  { id: 13, name: "Control Panel (PLC)", fn: "Programs and monitors the full dyeing cycle: temperature ramp, liquor ratio, dosing timing, and process time.", x: 30, y: 165 },
  { id: 14, name: "Winch Drive Motor", fn: "Motor that turns the winch reel at a controlled speed matched to the fabric type.", x: 168, y: 32 },
  { id: 15, name: "Sample Valve", fn: "Small tap used to draw a liquor sample mid-process to check shade or pH without stopping the machine.", x: 148, y: 198 },
  { id: 16, name: "Loading / Unloading Door", fn: "Hatch on the vessel's end cap used to load the fabric rope in and take the dyed fabric out.", x: 205, y: 178 },
];

export default function DyeingMachine() {
  const [active, setActive] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(680);

  const isActive = (id) => active === id;
  const activePart = PARTS.find((p) => p.id === active);
  const dim = (id) => (active && !isActive(id) ? 0.35 : 1);

  const handleMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    // keep container width in sync without reading ref during render
    setContainerWidth(rect.width || 680);
  }, []);

  const handleTouch = useCallback((id, e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    setCursor({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    setActive(id);
  }, []);

  const TOOLTIP_W = 250;
  const clampedLeft = Math.min(
    Math.max(cursor.x + 16, 8),
    (containerWidth || 680) - TOOLTIP_W - 8
  );
  const clampedTop = Math.max(cursor.y - 12, 8);

  // Path the fabric rope follows: up the intake leg, through the nozzle
  // housing, down the inclined discharge tube, back into the vessel.
  const ropePath = "M126 172 L126 65 C126 50 140 45 150 50 C170 58 195 62 198 85 C200 100 198 130 198 172";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#F1F5F8] rounded-2xl border border-[#D7E1E9]">
      <style>{`
        @keyframes reelSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ropeMove { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        @keyframes pumpPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes steamRise { 0% { transform: translateY(0); opacity: 0.8; } 100% { transform: translateY(-10px); opacity: 0; } }
        @keyframes idlePulse { 0%,100% { r: 4.5; opacity: 0.9; } 50% { r: 6.5; opacity: 0.3; } }

        .anim-reel { animation: reelSpin 2600ms linear infinite; transform-origin: 118px 55px; }
        .anim-rope { offset-path: path('${ropePath}'); animation: ropeMove 3200ms linear infinite; offset-rotate: 0deg; }
        .anim-pump { animation: pumpPulse 1400ms ease-in-out infinite; }
        .anim-steam { animation: steamRise 1600ms ease-out infinite; }
        .hotspot-pulse { animation: idlePulse 2.2s ease-in-out infinite; transform-origin: center; }
        .hotspot-core, .part-shape { transition: fill 150ms ease, opacity 150ms ease, r 150ms ease; }
        .tooltip-card { animation: tooltipIn 140ms ease-out; pointer-events: none; }
        @keyframes tooltipIn { from { opacity: 0; transform: translateY(4px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div className="mb-4">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#7A8B99] font-mono">
          Textile Engineering &mdash; Wet Processing Machinery
        </p>
        <h2 className="text-2xl font-semibold text-[#1E2A33]">
          Fabric Jet / Soft-Flow Dyeing Machine
        </h2>
        <p className="text-sm text-[#5A6B78] mt-1">
          Watch the fabric rope circulate through the jet loop. Hover any dot for its name and function.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative bg-white rounded-xl border border-[#DCE6ED] p-3 select-none"
        onMouseMove={handleMove}
      >
        <svg viewBox="0 0 320 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M14 0 H0 V14" fill="none" stroke="#EEF3F6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="320" height="230" fill="url(#grid)" />

          {/* Floor */}
          <rect x="10" y="210" width="300" height="6" fill="#D7E1E9" />

          {/* Support legs */}
          <rect x="90" y="196" width="8" height="16" fill="#8A97A2" />
          <rect x="212" y="196" width="8" height="16" fill="#8A97A2" />

          {/* Main dyeing vessel (capsule shape) */}
          <rect className="part-shape" x="70" y="150" width="150" height="48" rx="24"
            fill={isActive(1) ? "#0284C7" : "#64748B"} opacity={dim(1)} />

          {/* Loading/unloading door (end cap) */}
          <circle className="part-shape" cx="205" cy="174" r="17"
            fill={isActive(16) ? "#0EA5E9" : "#94A3B8"} stroke="#475569" strokeWidth="1.5" opacity={dim(16)} />
          <circle cx="205" cy="174" r="12" fill="none" stroke="#475569" strokeWidth="1" opacity={dim(16) * 0.6} />

          {/* Sight glass */}
          <circle className="part-shape" cx="92" cy="178" r="8"
            fill={isActive(10) ? "#7DD3FC" : "#CBD5E1"} stroke="#475569" strokeWidth="1.3" opacity={dim(10)} />

          {/* Liquor level indicator (side tube with scale) */}
          <rect className="part-shape" x="55" y="150" width="6" height="48" rx="2"
            fill={isActive(11) ? "#0EA5E9" : "#94A3B8"} opacity={dim(11)} />
          {[0, 1, 2].map((i) => (
            <line key={i} x1="52" y1={160 + i * 12} x2="60" y2={160 + i * 12} stroke="#475569" strokeWidth="0.8" opacity={dim(11)} />
          ))}

          {/* Drain valve */}
          <circle className="part-shape" cx="122" cy="204" r="6"
            fill={isActive(8) ? "#0EA5E9" : "#475569"} opacity={dim(8)} />
          <line x1="122" y1="198" x2="122" y2="204" stroke="#475569" strokeWidth="2" opacity={dim(8)} />

          {/* Sample valve */}
          <rect className="part-shape" x="144" y="196" width="10" height="6" rx="1.5"
            fill={isActive(15) ? "#0EA5E9" : "#94A3B8"} opacity={dim(15)} />

          {/* Intake leg (vertical) */}
          <rect x="120" y="62" width="12" height="108" rx="4" fill="#94A3B8" opacity="0.9" />
          {/* Nozzle/winch housing */}
          <rect x="96" y="38" width="70" height="30" rx="10" fill="#475569" />
          {/* Discharge tube (inclined) */}
          <path d="M162 50 C182 58 200 66 200 90 C200 116 196 145 194 170"
            stroke="#94A3B8" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9" />

          {/* Winch reel (spins) */}
          <g>
            <circle className="part-shape" cx="118" cy="55" r="12" fill="none"
              stroke={isActive(2) ? "#0EA5E9" : "#CBD5E1"} strokeWidth="3.5" opacity={dim(2)} />
            <g className="anim-reel">
              <line x1="118" y1="55" x2="118" y2="45" stroke={isActive(2) ? "#0EA5E9" : "#E2E8F0"} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>

          {/* Winch drive motor */}
          <rect className="part-shape" x="160" y="24" width="16" height="14" rx="2"
            fill={isActive(14) ? "#0EA5E9" : "#334155"} opacity={dim(14)} />

          {/* Jet nozzle (venturi) marker */}
          <circle className="part-shape" cx="150" cy="50" r="6"
            fill={isActive(3) ? "#0EA5E9" : "#CBD5E1"} stroke="#475569" strokeWidth="1" opacity={dim(3)} />

          {/* Fabric transport tube label anchor */}
          <circle className="part-shape" cx="190" cy="90" r="2" fill="transparent" opacity={dim(4)} />

          {/* Reserve / dosing tank */}
          <path className="part-shape" d="M168 14 L188 14 L184 30 L172 30 Z"
            fill={isActive(7) ? "#0EA5E9" : "#94A3B8"} opacity={dim(7)} />

          {/* Steam inlet pipe with rising steam */}
          <rect className="part-shape" x="214" y="198" width="6" height="20" rx="2"
            fill={isActive(9) ? "#0EA5E9" : "#94A3B8"} opacity={dim(9)} />
          <g opacity={dim(9)}>
            {[0, 1].map((i) => (
              <circle key={i} className="anim-steam" cx={217 + i * 3} cy="196" r="2" fill="#BAE6FD"
                style={{ animationDelay: `${i * 500}ms` }} />
            ))}
          </g>

          {/* Heat exchanger */}
          <rect className="part-shape" x="232" y="136" width="30" height="26" rx="3"
            fill={isActive(6) ? "#0EA5E9" : "#94A3B8"} opacity={dim(6)} />
          {[0, 1, 2].map((i) => (
            <line key={i} x1="236" y1={142 + i * 6} x2="258" y2={142 + i * 6} stroke="#1E293B" strokeWidth="1" opacity={dim(6) * 0.5} />
          ))}

          {/* Pipe from vessel to heat exchanger / pump */}
          <path d="M220 178 C230 178 232 170 240 160" stroke="#94A3B8" strokeWidth="5" fill="none" opacity="0.8" />
          <path d="M247 162 L247 170" stroke="#94A3B8" strokeWidth="5" fill="none" opacity="0.8" />

          {/* Circulation pump (pulses) */}
          <circle className="part-shape anim-pump" cx="247" cy="182" r="12"
            fill={isActive(5) ? "#0EA5E9" : "#334155"} opacity={dim(5)} />

          {/* Lint filter / strainer */}
          <rect className="part-shape" x="266" y="158" width="14" height="22" rx="4"
            fill={isActive(12) ? "#0EA5E9" : "#94A3B8"} opacity={dim(12)} />

          {/* Control panel on a stand */}
          <rect className="part-shape" x="18" y="140" width="26" height="40" rx="3"
            fill={isActive(13) ? "#0EA5E9" : "#1E293B"} opacity={dim(13)} />
          <rect x="21" y="144" width="20" height="16" rx="2" fill="#0369A1" opacity={dim(13)} />
          <rect x="20" y="200" width="4" height="10" fill="#8A97A2" opacity={dim(13)} />
          <rect x="38" y="200" width="4" height="10" fill="#8A97A2" opacity={dim(13)} />

          {/* Fabric rope: moving marker travelling around the circulation loop */}
          <circle className="anim-rope" r="4" fill="#F97316" />
          <circle className="anim-rope" r="3" fill="#FDBA74" style={{ animationDelay: "-400ms" }} />
          <circle className="anim-rope" r="3" fill="#FDBA74" style={{ animationDelay: "-800ms" }} />

          {/* Hotspots */}
          {PARTS.map((p) => (
            <g
              key={p.id}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onTouchStart={(e) => handleTouch(p.id, e)}
              onClick={() => setActive(isActive(p.id) ? null : p.id)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={p.x} cy={p.y} r="9" fill="transparent" />
              {!isActive(p.id) && (
                <circle className="hotspot-pulse" cx={p.x} cy={p.y} r="4.5" fill="#0284C7" opacity="0.35" />
              )}
              <circle
                className="hotspot-core"
                cx={p.x}
                cy={p.y}
                r={isActive(p.id) ? 6 : 3.2}
                fill={isActive(p.id) ? "#0284C7" : "#1E2A33"}
                stroke="white"
                strokeWidth="1.2"
              />
            </g>
          ))}
        </svg>

        {activePart && (
          <div
            className="tooltip-card absolute z-10 bg-[#0F1E29] text-white rounded-lg shadow-lg px-3 py-2"
            style={{ left: clampedLeft, top: clampedTop, width: TOOLTIP_W }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-[#38BDF8] font-bold">
                {String(activePart.id).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold">{activePart.name}</span>
            </div>
            <p className="text-xs text-[#CBD5E1] mt-1 leading-snug">{activePart.fn}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-[#7A8B99] mt-3">
        {PARTS.length} labeled parts &middot; orange dots trace the fabric rope's circulation loop
      </p>
    </div>
  );
}