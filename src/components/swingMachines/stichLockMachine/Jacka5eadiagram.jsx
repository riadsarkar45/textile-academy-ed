import React, { useState, useRef, useCallback, useEffect } from "react";

/**
 * JackA5EADiagram
 *
 * An original schematic illustration (not a photo/logo reproduction) of the
 * Jack A5E-A Single Needle Direct Drive Fully Automatic Drop Feed Lockstitch
 * Industrial Sewing Machine, built from its published spec sheet:
 *  - Built-in 3/4HP 550W direct drive motor (no external clutch motor/belt)
 *  - AI chip "Auto Tissue Adaptive System" (AMH) reads fabric in real time
 *  - Digital control panel: stitch length, backtack, presser foot lift, counter
 *  - Under-bed thread trimmer + electric thread clamp
 *  - Auto-lubricated rotary hook, sealed oil pan
 *  - Drop feed mechanism, DBx1 needle system, max 5000 SPM
 *
 * Same two-layer interactivity as before: ambient motion (needle, take-up
 * lever, feed dog, handwheel) runs continuously, and hovering/tapping a dot
 * shows a cursor-following tooltip with the part's name and function.
 */

const PARTS = [
  { id: 1, name: "Thread Stand & Spool Pins", fn: "Freestanding pole mounted through the table that holds the thread cone(s) above the machine head.", x: 300, y: 24 },
  { id: 2, name: "Thread Guide", fn: "Routes thread down from the stand into the tension assembly and take-up lever.", x: 210, y: 56 },
  { id: 3, name: "Tension Assembly", fn: "Spring-loaded discs that set top-thread tension for a balanced lockstitch.", x: 196, y: 82 },
  { id: 4, name: "Take-Up Lever", fn: "Rises and falls each cycle to draw up slack thread and set the stitch.", x: 178, y: 96 },
  { id: 5, name: "Built-in Bobbin Winder", fn: "Winds thread onto an empty bobbin directly on the machine, no separate winder needed.", x: 220, y: 58 },
  { id: 6, name: "Digital Control Panel", fn: "AI-assisted panel for digital stitch length, silent backtack, foot-lift level, and stitch count.", x: 224, y: 96 },
  { id: 7, name: "Needle Clamp", fn: "Secures a DBx1 system needle (size 11-18) to the needle bar.", x: 118, y: 108 },
  { id: 8, name: "Needle", fn: "Carries the top thread through the fabric; sews up to 5000 stitches per minute.", x: 118, y: 132 },
  { id: 9, name: "Digital Presser Foot Lifter", fn: "Stepper-motor-controlled foot lift, adjustable up to 13 levels from the panel (1-13mm).", x: 132, y: 148 },
  { id: 10, name: "Feed Dog (Drop Feed)", fn: "Moves fabric forward under the needle using the standard drop-feed mechanism.", x: 100, y: 176 },
  { id: 11, name: "Needle / Throat Plate", fn: "Flat plate around the feed dog and needle hole; swapped out for heavier fabrics like denim.", x: 86, y: 176 },
  { id: 12, name: "Rotary Hook (under bed)", fn: "Auto-lubricated hook beneath the needle plate that catches the top thread to form the lockstitch.", x: 90, y: 194 },
  { id: 13, name: "Under-Bed Thread Trimmer", fn: "Automatically cuts both threads after each seam, right under the throat plate.", x: 106, y: 194 },
  { id: 14, name: "Electric Thread Clamp", fn: "Holds the thread tail after trimming so it doesn't pull out on the next stitch.", x: 122, y: 194 },
  { id: 15, name: "Handwheel & Direct Drive Motor", fn: "3/4HP 550W motor built directly into the head; no external clutch motor or belt.", x: 268, y: 130 },
  { id: 16, name: "Built-in LED Light", fn: "Adjustable-brightness LED with on/off switch, lighting the needle area.", x: 148, y: 100 },
  { id: 17, name: "Electric / Treadle Foot Lifter", fn: "Treadle under the table (or the panel button) raises the presser foot hands-free.", x: 60, y: 208 },
  { id: 18, name: "Sealed Oil Pan", fn: "Enclosed reservoir with high-pressure recirculating lubrication; keeps oil off the table and fabric.", x: 150, y: 190 },
];

export default function StichLockMachine() {
  const [active, setActive] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(680);
  const containerRef = useRef(null);

  const isActive = (id) => active === id;
  const activePart = PARTS.find((p) => p.id === active);
  const dim = (id) => (active && !isActive(id) ? 0.35 : 1);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  const handleMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
    containerWidth - TOOLTIP_W - 8
  );
  const clampedTop = Math.max(cursor.y - 12, 8);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#F4F5F3] rounded-2xl border border-[#DCDED6]">
      <style>{`
        @keyframes needleBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(18px); } }
        @keyframes takeUpSwing { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-16deg); } }
        @keyframes wheelSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes feedShift { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
        @keyframes ledPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes idlePulse { 0%,100% { r: 4.5; opacity: 0.9; } 50% { r: 6.5; opacity: 0.3; } }

        .anim-needle { animation: needleBob 700ms cubic-bezier(.45,0,.55,1) infinite; transform-origin: top center; }
        .anim-takeup { animation: takeUpSwing 700ms cubic-bezier(.45,0,.55,1) infinite; transform-origin: 178px 88px; }
        .anim-wheel  { animation: wheelSpin 700ms linear infinite; transform-origin: 268px 130px; }
        .anim-feed   { animation: feedShift 700ms ease-in-out infinite; }
        .anim-led    { animation: ledPulse 1.8s ease-in-out infinite; }
        .hotspot-pulse { animation: idlePulse 2.2s ease-in-out infinite; transform-origin: center; }
        .hotspot-core, .part-shape { transition: fill 150ms ease, opacity 150ms ease, r 150ms ease; }
        .tooltip-card { animation: tooltipIn 140ms ease-out; pointer-events: none; }
        @keyframes tooltipIn { from { opacity: 0; transform: translateY(4px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div className="mb-4">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#8A8F82] font-mono">
          Textile Engineering &mdash; Industrial Machinery
        </p>
        <h2 className="text-2xl font-semibold text-[#292B26]">
          Jack A5E-A &mdash; Direct Drive Lockstitch Machine
        </h2>
        <p className="text-sm text-[#5F6459] mt-1">
          Single needle, drop feed, AI-assisted industrial lockstitch machine. Hover any dot for its name and function.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative bg-white rounded-xl border border-[#E4E6DE] p-3 select-none"
        onMouseMove={handleMove}
      >
        <svg viewBox="0 0 340 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M14 0 H0 V14" fill="none" stroke="#EEF0E8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="340" height="230" fill="url(#grid)" />

          {/* Table top */}
          <rect x="10" y="200" width="320" height="8" fill="#C9CDBF" />
          <rect x="14" y="208" width="6" height="18" fill="#B4B8A9" />
          <rect x="320" y="208" width="6" height="18" fill="#B4B8A9" />

          {/* Sealed oil pan (under the bed) */}
          <rect className="part-shape" x="120" y="184" width="90" height="10" rx="2"
            fill={isActive(18) ? "#C2410C" : "#94988A"} opacity={dim(18)} />

          {/* Bed (flatbed, sits into the table) */}
          <rect x="40" y="178" width="180" height="14" rx="3" fill="#4B4F44" />

          {/* Rotary hook, under-bed trimmer, thread clamp - hidden parts, dashed */}
          <circle className="part-shape" cx="90" cy="196" r="7" fill="none" stroke={isActive(12) ? "#C2410C" : "#94988A"}
            strokeDasharray="2 2" strokeWidth="1.4" opacity={dim(12)} />
          <rect className="part-shape" x="102" y="192" width="8" height="6" rx="1" fill="none"
            stroke={isActive(13) ? "#C2410C" : "#94988A"} strokeDasharray="2 2" strokeWidth="1.2" opacity={dim(13)} />
          <rect className="part-shape" x="118" y="192" width="8" height="6" rx="1" fill="none"
            stroke={isActive(14) ? "#C2410C" : "#94988A"} strokeDasharray="2 2" strokeWidth="1.2" opacity={dim(14)} />

          {/* Needle/throat plate */}
          <rect className="part-shape" x="70" y="174" width="32" height="7" rx="1.5"
            fill={isActive(11) ? "#C2410C" : "#CBD0C3"} opacity={dim(11)} />

          {/* Feed dog teeth (shifts) */}
          <g className="anim-feed">
            <g opacity={dim(10)}>
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={76 + i * 7} y="176" width="3" height="4"
                  fill={isActive(10) ? "#C2410C" : "#1F231D"} />
              ))}
            </g>
          </g>

          {/* Machine head silhouette: bed -> arm -> pillar -> handwheel housing */}
          <path
            d="M60 178
               C60 140 68 108 100 100
               L150 92
               C154 68 172 50 200 50
               C232 50 254 68 258 96
               L282 96
               C292 96 296 104 296 114
               L296 176
               L60 176 Z"
            fill="#3A3E33"
          />

          {/* Digital control panel on the pillar face */}
          <rect className="part-shape" x="204" y="70" width="40" height="24" rx="3"
            fill={isActive(6) ? "#C2410C" : "#111411"} opacity={dim(6)} />
          <rect x="207" y="73" width="34" height="18" rx="2" fill="#1E2A22" opacity={dim(6)} />
          <path d="M210 84 l3 -4 l3 4 l3 -7 l3 7 l3 -3" stroke="#7DE0B0" strokeWidth="1" fill="none" opacity={dim(6)} />

          {/* Bobbin winder */}
          <circle className="part-shape" cx="220" cy="58" r="5"
            fill={isActive(5) ? "#C2410C" : "#94988A"} opacity={dim(5)} />

          {/* Built-in LED light (pulses like it's lit) */}
          <circle className="part-shape anim-led" cx="148" cy="100" r="4"
            fill={isActive(16) ? "#C2410C" : "#FDE68A"} opacity={dim(16)} />

          {/* Tension assembly */}
          <circle className="part-shape" cx="196" cy="82" r="5"
            fill={isActive(3) ? "#C2410C" : "#94988A"} opacity={dim(3)} />

          {/* Take-up lever (swings) */}
          <g className="anim-takeup">
            <rect className="part-shape" x="176" y="82" width="4" height="16" rx="1.5"
              fill={isActive(4) ? "#C2410C" : "#7A7E6E"} opacity={dim(4)} />
          </g>

          {/* Thread guide + thread path */}
          <path className="part-shape" d="M300 40 C300 50 214 52 210 56 C206 60 198 66 196 78"
            stroke={isActive(2) ? "#C2410C" : "#94988A"} strokeWidth="1.6" fill="none"
            strokeDasharray="3 2" opacity={dim(2)} />

          {/* Thread stand pole + spool */}
          <line x1="300" y1="200" x2="300" y2="30" stroke="#4B4F44" strokeWidth="3" />
          <rect className="part-shape" x="288" y="16" width="24" height="16" rx="2"
            fill={isActive(1) ? "#C2410C" : "#EAB308"} opacity={dim(1)} />

          {/* Needle clamp + needle bar (bobs) */}
          <g className="anim-needle">
            <rect className="part-shape" x="113" y="98" width="10" height="12" rx="2"
              fill={isActive(7) ? "#C2410C" : "#111411"} opacity={dim(7)} />
            <rect className="part-shape" x="116.5" y="110" width="3" height="30"
              fill={isActive(8) ? "#C2410C" : "#7A7E6E"} opacity={dim(8)} />
          </g>

          {/* Digital / stepper presser foot lifter + presser foot */}
          <path className="part-shape" d="M128 138 L142 138 L138 176 L130 176 Z"
            fill={isActive(9) ? "#C2410C" : "#94988A"} opacity={dim(9)} />

          {/* Treadle / electric foot lifter (under table, front) */}
          <rect className="part-shape" x="50" y="200" width="20" height="6" rx="2"
            fill={isActive(17) ? "#C2410C" : "#7A7E6E"} opacity={dim(17)} />
          <line x1="60" y1="206" x2="60" y2="222" stroke={isActive(17) ? "#C2410C" : "#7A7E6E"} strokeWidth="3" opacity={dim(17)} />

          {/* Handwheel + built-in direct drive motor (spins) */}
          <rect className="part-shape" x="282" y="106" width="14" height="48" rx="4"
            fill={isActive(15) ? "#C2410C" : "#24261F"} opacity={dim(15)} />
          <circle className="part-shape" cx="268" cy="130" r="18" fill="none"
            stroke={isActive(15) ? "#C2410C" : "#111411"} strokeWidth="4" opacity={dim(15)} />
          <g className="anim-wheel">
            <line x1="268" y1="130" x2="268" y2="114" stroke={isActive(15) ? "#C2410C" : "#7A7E6E"} strokeWidth="3" strokeLinecap="round" opacity={dim(15)} />
          </g>

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
                <circle className="hotspot-pulse" cx={p.x} cy={p.y} r="4.5" fill="#C2410C" opacity="0.35" />
              )}
              <circle
                className="hotspot-core"
                cx={p.x}
                cy={p.y}
                r={isActive(p.id) ? 6 : 3.2}
                fill={isActive(p.id) ? "#C2410C" : "#292B26"}
                stroke="white"
                strokeWidth="1.2"
              />
            </g>
          ))}
        </svg>

        {activePart && (
          <div
            className="tooltip-card absolute z-10 bg-[#1F231D] text-white rounded-lg shadow-lg px-3 py-2"
            style={{ left: clampedLeft, top: clampedTop, width: TOOLTIP_W }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-[#F97316] font-bold">
                {String(activePart.id).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold">{activePart.name}</span>
            </div>
            <p className="text-xs text-[#CBD0C3] mt-1 leading-snug">{activePart.fn}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-[#8A8F82] mt-3">
        {PARTS.length} labeled parts &middot; Max 5000 SPM &middot; DBx1 needle system &middot; 3/4HP 550W direct drive motor
      </p>
    </div>
  );
}